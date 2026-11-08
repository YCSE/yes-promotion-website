#!/usr/bin/env bash
# YES 블로그 자동 생성 — Hermes 크론(no-agent)이 하루 세 번 실행한다(10·14·18시 KST).
# 오늘 글이 이미 origin/main에 있으면 아무것도 하지 않으므로, 뒤 슬롯은 앞 슬롯이
# 실패한 날(주로 GPU 메모리 경합으로 Qwen-Image를 못 올린 날)의 재시도가 된다.
#
# 등록:  ~/.hermes/scripts/yes_blog_daily.sh → 이 파일 (크론 전용 clone 안의 사본)
# 수동:  scripts/cron/daily-blog.sh [--no-push]
#
# 하는 일: 크론 전용 clone을 origin/main으로 맞춤 → (필요 시) npm ci →
#   node scripts/generate-content.js → 커밋 → push. push가 deploy.yml을 트리거해 배포된다.
#
# stdout은 Hermes가 그대로 전달한다: 성공 1줄, 실패 시 로그 끝부분. 나머지는 전부 로그 파일로.
# 전제: ~/.hermes/.env 의 ANTHROPIC_API_KEY, gh 로그인(YCSE) git 자격증명, ModelSwitcher(:18090).

set -euo pipefail

# 본문 전체를 함수로 감싼다: 아래 git reset이 실행 중인 이 파일(크론 clone 사본)을
# 바꿔도 bash는 이미 함수 전체를 읽어 둔 상태라 안전하다.
main() {
  NO_PUSH=false
  for arg in "$@"; do
    case "$arg" in
      --no-push) NO_PUSH=true ;;
      *) echo "usage: $0 [--no-push]" >&2; exit 2 ;;
    esac
  done

  export HOME=/home/mersoom-dgx
  export TZ=Asia/Seoul  # 글 slug 날짜(date-fns, 로컬 시각)와 아래 중복 가드의 날짜를 맞춘다
  export PATH="$HOME/.nvm/versions/node/v22.22.3/bin:$HOME/.local/bin:/usr/local/bin:/usr/bin:/bin"

  REPO_URL=https://github.com/YCSE/yes-promotion-website.git
  SITE_URL=https://yourenglishschool.co.kr
  BASE="$HOME/.cache/yes-blog-cron"
  REPO="$BASE/repo"
  LOGDIR="$BASE/logs"
  mkdir -p "$LOGDIR"
  LOG="$LOGDIR/run-$(date +%Y%m%d-%H%M%S).log"
  TODAY=$(date +%F)

  fail() {
    echo "❌ YES 블로그 생성 실패 ($TODAY): $1"
    echo "로그: $LOG"
    echo '```'
    tail -n 20 "$LOG"
    echo '```'
    exit 1
  }

  # 동시 실행 방지 (수동 실행과 크론이 겹칠 때)
  exec 9>"$BASE/lock"
  if ! flock -n 9; then
    echo "[$(date)] 다른 실행이 진행 중 — 종료" >> "$LOG"
    exit 0
  fi

  # 최근 30개 로그만 보존
  ls -1t "$LOGDIR"/run-*.log 2>/dev/null | tail -n +31 | xargs -r rm -f || true

  {
    echo "=== YES 블로그 크론 시작: $(date) (no-push=$NO_PUSH) ==="
    echo "node $(node --version)"
  } >> "$LOG"

  # --- 크론 전용 clone을 origin/main과 똑같이 맞춘다 (사용자 작업 디렉터리는 건드리지 않음) ---
  if [ ! -d "$REPO/.git" ]; then
    git clone -q "$REPO_URL" "$REPO" >> "$LOG" 2>&1 || fail "git clone 실패"
  fi
  cd "$REPO"
  {
    git fetch -q origin main &&
    git reset -q --hard origin/main &&
    git clean -qfd
  } >> "$LOG" 2>&1 || fail "origin/main 동기화 실패"
  echo "HEAD $(git rev-parse --short HEAD)" >> "$LOG"

  # --- 오늘 글이 이미 있으면 끝 (뒤 슬롯·catch-up·수동 재실행의 이중 게시 방지) ---
  if compgen -G "content/posts/${TODAY}-*.md" > /dev/null; then
    echo "오늘($TODAY) 글이 이미 있음 — 종료" >> "$LOG"
    exit 0
  fi

  # --- 의존성: package-lock.json이 바뀐 때만 npm ci ---
  LOCK_HASH=$(sha256sum package-lock.json | cut -d' ' -f1)
  if [ ! -d node_modules ] || [ "$(cat "$BASE/lock-hash" 2>/dev/null)" != "$LOCK_HASH" ]; then
    echo "npm ci" >> "$LOG"
    npm ci --no-audit --no-fund >> "$LOG" 2>&1 || fail "npm ci 실패"
    echo "$LOCK_HASH" > "$BASE/lock-hash"
  fi

  # --- API 키: ~/.hermes/.env 에서 이 한 줄만 읽는다 (파일 전체를 source 하지 않음) ---
  if [ -z "${ANTHROPIC_API_KEY:-}" ]; then
    ANTHROPIC_API_KEY=$(grep -m1 '^ANTHROPIC_API_KEY=' "$HOME/.hermes/.env" 2>/dev/null | cut -d= -f2- | sed -e 's/^["'\'']//' -e 's/["'\'']$//' || true)
    export ANTHROPIC_API_KEY
  fi
  [ -n "$ANTHROPIC_API_KEY" ] || fail "ANTHROPIC_API_KEY 없음 (~/.hermes/.env)"

  # --- 생성: Qwen-Image 로드(최대 60분 대기, 다른 GPU 작업과 경합) + Haiku 본문 + 이미지 ---
  export QWEN_IMAGE_LOAD_TIMEOUT_MS=$((60 * 60 * 1000))
  timeout --signal=TERM --kill-after=2m 100m node scripts/generate-content.js >> "$LOG" 2>&1 \
    || fail "generate-content.js 종료 코드 $?"

  POST=$(git ls-files --others --exclude-standard -- "content/posts/${TODAY}-*.md" | head -n1)
  [ -n "$POST" ] || fail "새 글 파일을 찾지 못함"
  SLUG=$(basename "$POST" .md)
  TITLE=$(sed -n 's/^title:[[:space:]]*//p' "$POST" | head -n1 | sed -e 's/^["'\'']//' -e 's/["'\'']$//')

  if [ "$NO_PUSH" = true ]; then
    echo "🧪 (no-push) $TITLE — $REPO/$POST"
    exit 0
  fi

  # --- 커밋 & push (실패 시 rebase 후 최대 3회) ---
  git add -- "$POST" public/images/blog/ >> "$LOG" 2>&1 || fail "git add 실패"
  git commit -q -m "🤖 Auto-generated blog post - $TODAY" >> "$LOG" 2>&1 || fail "git commit 실패"
  pushed=false
  for i in 1 2 3; do
    if git push -q origin HEAD:main >> "$LOG" 2>&1; then
      pushed=true
      break
    fi
    echo "push 실패 ($i/3) — rebase 후 재시도" >> "$LOG"
    sleep 5
    git pull -q --rebase origin main >> "$LOG" 2>&1 || true
  done
  [ "$pushed" = true ] || fail "git push 3회 실패"

  echo "push 완료: $(git rev-parse --short HEAD)" >> "$LOG"
  echo "✅ $TITLE — $SITE_URL/blog/$SLUG/"
}

main "$@"
exit $?

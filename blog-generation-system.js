/**
 * English Learning Blog Post Generation System
 * A comprehensive system for generating diverse and engaging English learning content
 */

// 70 영어 학습 주제 (한국어 제목 + 영어 slug)
const TOPICS = [
  // 문법 개념 (20개)
  { korean: '현재완료 vs 과거시제 - 언제 어떻게 쓸까?', slug: 'present-perfect-vs-past-simple' },
  { korean: '실전 회화를 위한 조건문 마스터하기', slug: 'conditional-sentences-real-conversations' },
  { korean: '비즈니스 커뮤니케이션을 위한 구동사', slug: 'phrasal-verbs-business-communication' },
  { korean: '영어 관사(A, An, The)의 비밀', slug: 'english-articles-mystery' },
  { korean: '조동사로 표현하는 가능성과 확실성', slug: 'modal-verbs-possibility-certainty' },
  { korean: '학술 영작문의 수동태 활용법', slug: 'passive-voice-academic-writing' },
  { korean: '동명사 vs 부정사 - 올바른 선택하기', slug: 'gerunds-vs-infinitives' },
  { korean: '현대 영어의 가정법 활용하기', slug: 'subjunctive-mood-modern-english' },
  { korean: '고급 화자를 위한 복잡한 문장 구조', slug: 'complex-sentence-structures' },
  { korean: '시간, 장소, 이동의 전치사 완벽 정리', slug: 'prepositions-time-place-movement' },
  { korean: '전문적인 환경에서의 간접 화법', slug: 'reported-speech-professional' },
  { korean: '부가의문문과 문화적 의미', slug: 'question-tags-cultural-significance' },
  { korean: '미래 시제 정복하기: Will, Going to, 현재진행형', slug: 'future-tenses-mastery' },
  { korean: '세련된 표현을 위한 관계절', slug: 'relative-clauses-sophisticated' },
  { korean: '지시와 요청에서의 명령법', slug: 'imperative-mood-instructions' },
  { korean: '비교급과 최상급 완벽 가이드', slug: 'comparative-superlative-forms' },
  { korean: '일상생활 속 영조건문과 일조건문', slug: 'zero-first-conditional-daily' },
  { korean: '과거완료와 과거완료진행형 이해하기', slug: 'past-perfect-continuous' },
  { korean: '사역동사 완벽 정리: Make, Have, Let, Get', slug: 'causative-verbs-guide' },
  { korean: '영어의 도치와 강조 표현', slug: 'inversion-emphasis-english' },

  // 어휘 주제 (15개)
  { korean: '글로벌 비즈니스 영어 어휘', slug: 'business-english-global-markets' },
  { korean: '여행 영어: 공항, 호텔, 레스토랑 표현', slug: 'travel-english-phrases' },
  { korean: '대학 성공을 위한 학술 어휘', slug: 'academic-vocabulary-university' },
  { korean: '환자와 전문가를 위한 의료 영어', slug: 'medical-english-healthcare' },
  { korean: '디지털 시대의 기술 영어 어휘', slug: 'technology-vocabulary-digital' },
  { korean: '일상생활을 위한 법률 영어 기초', slug: 'legal-english-basics' },
  { korean: '금융 영어: 은행과 투자 용어', slug: 'financial-english-banking' },
  { korean: '부동산 영어 완벽 가이드', slug: 'real-estate-english' },
  { korean: '음식과 요리 영어 고급 어휘', slug: 'food-cooking-vocabulary' },
  { korean: '스포츠와 피트니스 영어 표현', slug: 'sports-fitness-english' },
  { korean: '환경과 지속가능성 영어 토론', slug: 'environmental-english' },
  { korean: '패션과 쇼핑 영어 마스터하기', slug: 'fashion-shopping-english' },
  { korean: '자동차 관련 영어 표현', slug: 'automotive-english' },
  { korean: 'DIY 프로젝트를 위한 주택 관리 영어', slug: 'home-maintenance-english' },
  { korean: '엔터테인먼트 영어: 영화, 음악, 미디어', slug: 'entertainment-english-media' },

  // 말하기 상황 (15개)
  { korean: '영어 면접: 질문과 답변 완벽 준비', slug: 'job-interview-english' },
  { korean: '비원어민을 위한 프레젠테이션 스킬', slug: 'presentation-skills-non-native' },
  { korean: '스몰토크 완벽 마스터하기', slug: 'small-talk-mastery' },
  { korean: '비즈니스 협상 영어 전략', slug: 'negotiation-english-business' },
  { korean: '전문적인 전화 대화 스킬', slug: 'phone-conversation-professional' },
  { korean: '경력 개발을 위한 네트워킹 영어', slug: 'networking-english-career' },
  { korean: '직장 내 갈등 해결 언어', slug: 'conflict-resolution-workplace' },
  { korean: '서비스업을 위한 고객 응대 영어', slug: 'customer-service-english' },
  { korean: '데이트와 연애를 위한 영어 표현', slug: 'dating-relationship-english' },
  { korean: '학부모-교사 상담 영어', slug: 'parent-teacher-conference' },
  { korean: '병원 예약과 진료 영어', slug: 'medical-appointment-english' },
  { korean: '부동산 투어 영어 표현', slug: 'real-estate-viewing-english' },
  { korean: '레스토랑 주문 고급 표현', slug: 'restaurant-ordering-advanced' },
  { korean: '영어 학습자를 위한 대중 연설 자신감', slug: 'public-speaking-confidence' },
  { korean: '소비자를 위한 불만 처리 영어', slug: 'complaint-handling-english' },

  // 문화적 주제 (10개)
  { korean: '비원어민을 당황시키는 미국 관용구', slug: 'american-idioms-confusing' },
  { korean: '영국 영어 vs 미국 영어: 억양 그 이상의 차이', slug: 'british-vs-american-english' },
  { korean: '직장 문화와 커뮤니케이션 스타일', slug: 'workplace-culture-communication' },
  { korean: '영어권 국가의 사회적 에티켓', slug: 'social-etiquette-english-countries' },
  { korean: '영어 유머와 농담: 문화적 맥락 이해하기', slug: 'humor-jokes-cultural-context' },
  { korean: '지역 슬랭: 언제 쓰고 언제 피해야 할까', slug: 'regional-slang-usage' },
  { korean: '문화별 이메일 에티켓 차이', slug: 'email-etiquette-cultures' },
  { korean: '서구권 데이트 문화와 언어', slug: 'dating-culture-language-western' },
  { korean: '휴일 전통과 관련 어휘', slug: 'holiday-traditions-vocabulary' },
  { korean: '세대 간 언어 차이: 부머에서 Z세대까지', slug: 'generation-gap-language' },

  // 학습 전략 (10개)
  { korean: '어휘 암기를 위한 기억 기술', slug: 'memory-techniques-vocabulary' },
  { korean: '해외 거주 없이 몰입 학습하기', slug: 'immersion-learning-without-abroad' },
  { korean: '영화와 TV로 영어 학습하기', slug: 'movies-tv-language-learning' },
  { korean: '팟캐스트로 듣기 실력 향상시키기', slug: 'podcast-listening-skills' },
  { korean: '현대 학습자를 위한 소셜 미디어 영어', slug: 'social-media-english-learners' },
  { korean: '언어 교환 파트너 최대한 활용하기', slug: 'language-exchange-maximizing' },
  { korean: '다양한 텍스트 유형별 읽기 전략', slug: 'reading-strategies-text-types' },
  { korean: '영어 수업을 위한 노트 필기법', slug: 'note-taking-english-classes' },
  { korean: '언어 진척도 자가 평가 기법', slug: 'self-assessment-language-progress' },
  { korean: '지속 가능한 영어 학습 습관 만들기', slug: 'english-learning-habits-stick' }
];

// 70개의 글 작성 방향/접근법 (한국어)
const WRITING_DIRECTIONS = [
  // 스토리 기반 학습 (10개 방향)
  "학습 포인트를 자연스럽게 녹여낸 공감가는 이야기로 전개하기",
  "가상 인물의 성장 여정을 통해 언어 발전 과정 보여주기",
  "주제의 중요성을 조명하는 역사적 일화 공유하기",
  "학습 내용이 등장하는 일상 시나리오 만들기",
  "내러티브를 통해 가르치는 문제 해결 모험 전개하기",
  "비포 앤 애프터 변화 스토리 제시하기",
  "캐릭터 간 대화로 자연스러운 사용법 보여주기",
  "교훈이 담긴 문화적 오해 스토리 들려주기",
  "주제가 핵심인 전문적 시나리오 만들기",
  "중요한 언어 포인트를 가르치는 여행 실수담 공유하기",

  // 문제-해결 형식 (8개 방향)
  "일반적인 어려움을 파악하고 단계별 해결책 제공하기",
  "여러 문제에 대한 하나의 포괄적 해결 접근법 제시하기",
  "학습 장애물 해결을 위한 문제 해결 마인드셋 활용하기",
  "주제를 미스터리나 퍼즐 풀기로 프레이밍하기",
  "독자의 좌절감을 공감하며 직접적으로 해결하기",
  "다양한 학습 스타일을 위한 대안 해결책 제시하기",
  "진단적 접근법 만들기: 증상, 원인, 치료법",
  "언어 문제를 '치료'하는 의료 상담 형식 사용하기",

  // 상호작용과 참여 유도 (10개 방향)
  "포스트 전체에 도전 과제와 연습문제 배치하기",
  "즉각적인 피드백이 있는 퀴즈 형식 만들기",
  "레벨과 성취가 있는 게임 같은 진행 방식 사용하기",
  "독자가 선택하는 상호작용 시나리오 개발하기",
  "실행 가능한 항목이 있는 체크리스트 접근법 만들기",
  "'지금 해보세요' 실험적 접근법 사용하기",
  "콘텐츠 내 롤플레잉 연습 설계하기",
  "점진적 스킬 구축 챌린지 만들기",
  "언어의 보물을 찾는 보물찾기 형식 사용하기",
  "'코치와 학생' 대화 스타일 개발하기",

  // 비교와 분석 (8개 방향)
  "다양한 접근법이나 방법 비교 대조하기",
  "일반적 실수와 올바른 사용 패턴 분석하기",
  "초급, 중급, 고급 수준별 활용법 비교하기",
  "격식적 vs 비격식적 사용 맥락 대조하기",
  "언어 사용의 문화적 차이 비교하기",
  "성공적 vs 실패한 커뮤니케이션 예시 분석하기",
  "전통적 vs 현대적 학습 접근법 비교하기",
  "원어민 습관과 학습자 경향 대조하기",

  // 튜토리얼과 교육적 접근 (10개 방향)
  "종합적인 단계별 튜토리얼 형식 만들기",
  "워크숍 스타일의 실습 중심 학습 접근법 사용하기",
  "전문가 인사이트가 담긴 마스터클래스 형식 개발하기",
  "부트캠프 스타일의 집중 학습 경험 만들기",
  "언어 학습에 실험실 실험 접근법 사용하기",
  "실용적 적용을 위한 필드 가이드 설계하기",
  "다양한 리소스가 포함된 툴킷 접근법 만들기",
  "체계적 개선을 위한 청사진 형식 사용하기",
  "재료와 단계가 있는 레시피 스타일 접근법 개발하기",
  "문제 해결 섹션이 있는 매뉴얼 형식 만들기",

  // 동기부여와 영감 (8개 방향)
  "성공 스토리로 독자에게 영감과 동기 부여하기",
  "격려하는 마일스톤과 함께 자신감 구축 여정 만들기",
  "개인적 돌파구와 '아하' 순간 공유하기",
  "지속적인 격려로 응원단장 접근법 사용하기",
  "학습자에게 공감되는 언더독 스토리 만들기",
  "멘토-멘티 관계 다이내믹 활용하기",
  "영감을 주는 인용구와 실제 적용 사례 공유하기",
  "실용적 지원과 함께 '당신도 할 수 있다' 외치기",

  // 과학적이고 연구 기반 접근 (6개 방향)
  "연구 결과를 이해하기 쉬운 형식으로 제시하기",
  "언어 학습에 가설 검증 접근법 사용하기",
  "효과성 설명에 인지과학 원리 적용하기",
  "학습 전략 지원을 위한 데이터와 통계 사용하기",
  "과학적 근거가 있는 증거 기반 방법 제시하기",
  "언어 습득에 심리학 원리 적용하기",

  // 창의적이고 독특한 접근 (8개 방향)
  "복잡한 개념 설명에 은유와 비유 사용하기",
  "언어 진화를 탐구하는 시간여행 시나리오 만들기",
  "언어의 비밀을 밝혀내는 탐정 스토리 형식 사용하기",
  "언어 학습 레시피에 요리 은유 적용하기",
  "스킬 개발에 스포츠 코칭 멘탈리티 사용하기",
  "언어 성공에 비즈니스 사례 연구 접근법 만들기",
  "언어 퍼포먼스에 영화 감독의 관점 사용하기",
  "언어 창작에 예술적 창조 원리 적용하기",

  // 오해 바로잡기와 신화 파괴 (4개 방향)
  "증거로 일반적인 오해에 도전하기",
  "실용적 진실로 언어 학습 신화 파괴하기",
  "널리 퍼진 잘못된 믿음 바로잡기",
  "언어 학습의 사실과 허구 구분하기"
];

/**
 * Random Selection System
 */
class BlogPostGenerator {
  constructor() {
    this.topics = TOPICS;
    this.directions = WRITING_DIRECTIONS;
    this.usedCombinations = new Set();
  }

  /**
   * Get a random element from an array
   */
  getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  /**
   * Generate a random combination of topic and direction
   */
  generateRandomCombination() {
    const topicObj = this.getRandomElement(this.topics);
    const direction = this.getRandomElement(this.directions);
    
    const combination = `${topicObj.korean}|||${direction}`;
    
    // Ensure we don't repeat combinations (optional feature)
    if (this.usedCombinations.has(combination)) {
      return this.generateRandomCombination();
    }
    
    this.usedCombinations.add(combination);
    
    return {
      topic: topicObj.korean,
      slug: topicObj.slug,
      direction,
      combinationId: this.usedCombinations.size
    };
  }

  /**
   * Generate multiple random combinations
   */
  generateMultipleCombinations(count = 5) {
    const combinations = [];
    for (let i = 0; i < count; i++) {
      combinations.push(this.generateRandomCombination());
    }
    return combinations;
  }

  /**
   * Get statistics about the generation system
   */
  getSystemStats() {
    return {
      totalTopics: this.topics.length,
      totalDirections: this.directions.length,
      possibleCombinations: this.topics.length * this.directions.length,
      usedCombinations: this.usedCombinations.size,
      remainingCombinations: (this.topics.length * this.directions.length) - this.usedCombinations.size
    };
  }
}

// Example usage and demonstration
const generator = new BlogPostGenerator();

console.log("=== ENGLISH LEARNING BLOG POST GENERATION SYSTEM ===\n");

console.log("System Statistics:");
console.log(generator.getSystemStats());

console.log("\n=== RANDOM COMBINATION EXAMPLES ===");
const examples = generator.generateMultipleCombinations(3);
examples.forEach((example, index) => {
  console.log(`\nExample ${index + 1}:`);
  console.log(`Topic: ${example.topic}`);
  console.log(`Direction: ${example.direction}`);
  console.log(`Combination ID: ${example.combinationId}`);
});

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    BlogPostGenerator,
    TOPICS,
    WRITING_DIRECTIONS
  };
}
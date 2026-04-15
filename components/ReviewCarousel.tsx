'use client'

import { useEffect, useRef, useState } from 'react'

interface Review {
    id: number
    name: string
    role: string
    rating: number
    content: string
    date: string
}

const REVIEWS: Review[] = [
    // 직장인/성인 그룹 (다양한 톤앤매너)
    { id: 1, name: '김민준 (Mike)', role: '직장인', rating: 5, content: '퇴근하고 20분 투자하는 게 처음엔 힘들었는데, 튜터님이 너무 재밌어서 이젠 힐링 타임이 됐어요! ㅋㅋ', date: '2023.10.15' },
    { id: 2, name: '이서연 (Sarah)', role: '대학생', rating: 5, content: '면접 준비 때문에 급하게 시작했는데... 진짜 구세주였습니다. 자신감 뿜뿜해서 합격했어요 ㅠㅠ 감사합니다!', date: '2023.10.18' },
    { id: 3, name: '박도현 (David)', role: '취준생', rating: 4, content: '매일 꾸준히 하니까 확실히 입이 트이네요. 커리큘럼이 체계적이라 좋습니다.', date: '2023.10.20' },
    { id: 4, name: '최지우 (Emily)', role: '개발자', rating: 5, content: '기술 문서만 읽다가 말하려니 뇌정지 왔었는데, 이제 스크럼 때 영어로 농담도 합니다.', date: '2023.10.22' },
    { id: 5, name: '정시우 (James)', role: '마케터', rating: 5, content: '비즈니스 표현 배우기에 딱이에요. 상황별 롤플레잉이 진짜 도움 많이 됨.', date: '2023.10.25' },
    { id: 6, name: '강하준 (Daniel)', role: '프리랜서', rating: 4, content: '시간 자유로운 게 제일 큼. 새벽에도 수업 가능해서 올빼미족한테 강추.', date: '2023.10.28' },
    { id: 7, name: '조지훈 (Chris)', role: '주부', rating: 5, content: '아이 가르치려다 제가 더 빠졌네요 ㅎㅎ 튜터님이랑 수다 떨다 보면 시간 가는 줄 몰라요.', date: '2023.11.01' },
    { id: 8, name: '윤서아 (Olivia)', role: '자영업', rating: 5, content: '외국인 손님 오면 도망가기 바빴는데 이젠 제가 먼저 말 걸어요! 장사도 더 잘되는 느낌?', date: '2023.11.03' },
    { id: 9, name: '장민재 (Ryan)', role: '디자이너', rating: 5, content: '피드백이 디테일해서 놀랐음. 발음 교정 확실하게 해줍니다.', date: '2023.11.05' },
    { id: 10, name: '임현우 (Kevin)', role: '해외영업', rating: 5, content: '실전 감각 익히는 데는 화상영어가 답이네요. 매일 아침 루틴으로 정착했습니다.', date: '2023.11.08' },
    { id: 11, name: '한도윤 (Brian)', role: '승무원', rating: 5, content: '다양한 국적의 튜터님들을 만날 수 있어서 리스닝 실력이 확 늘었어요.', date: '2023.11.10' },
    { id: 12, name: '오건우 (Alex)', role: '대학생', rating: 4, content: '가성비 최고. 커피 한 잔 값으로 원어민이랑 대화하는 거라 생각하면 완전 이득임.', date: '2023.11.12' },
    { id: 13, name: '서우진 (Tom)', role: '간호사', rating: 5, content: '3교대라 학원은 꿈도 못 꿨는데 집에서 편하게 하니까 너무 좋네요.', date: '2023.11.15' },
    { id: 14, name: '신선우 (Sam)', role: '공무원', rating: 5, content: '승진 가산점 때문에 시작했다가 영어의 재미를 알아버렸습니다.', date: '2023.11.18' },
    { id: 15, name: '권서진 (Jessica)', role: '작가', rating: 5, content: '표현력이 풍부해지니까 글 쓸 때도 영감이 떠올라요. 영어 공부가 창작에도 도움이 되네요.', date: '2023.11.20' },
    { id: 16, name: '황유준 (Justin)', role: '운동선수', rating: 5, content: '해외 전지훈련 가서 코치님 말이 귀에 쏙쏙 들어오더라고요. 신기했습니다.', date: '2023.11.22' },
    { id: 17, name: '안연우 (Grace)', role: '건축가', rating: 5, content: '클라이언트 미팅 때 전문 용어도 버벅거리지 않고 말하게 됐어요. 자신감 상승!', date: '2023.11.25' },
    { id: 18, name: '송민성 (Paul)', role: '자영업', rating: 5, content: '역시 꾸준함이 답이네요. 3개월 하니까 귀가 뚫리는 게 느껴집니다.', date: '2023.11.28' },
    { id: 19, name: '전현준 (Eric)', role: '강사', rating: 5, content: '가르치는 입장이 되어보니 학생들 마음을 알겠더라고요. 튜터님들 티칭 스킬도 배웁니다.', date: '2023.12.01' },
    { id: 20, name: '홍준혁 (Steve)', role: '프리랜서', rating: 4, content: '디지털 노마드의 필수품... 제주도 바다 보면서 영어 수업 듣는 기분 최고예요.', date: '2023.12.03' },
    { id: 21, name: '문승현 (Andrew)', role: '회사원', rating: 5, content: '출퇴근길에 폰으로 예습 복습하니까 시간 활용 굿. 효율적인 거 좋아하는 분들 추천.', date: '2023.12.05' },
    { id: 22, name: '손민규 (Matthew)', role: '대학원생', rating: 5, content: '논문 쓰다 막히면 튜터님한테 물어보기도 해요 ㅋㅋ 진짜 친절하게 알려주심.', date: '2023.12.08' },
    { id: 23, name: '양재원 (Jason)', role: '개발자', rating: 5, content: '해외 취업 오퍼 받았어요! 인터뷰 준비 도와주신 튜터님 진짜 감사합니다 ㅠㅠ', date: '2023.12.10' },
    { id: 24, name: '배성민 (Robert)', role: '마케터', rating: 4, content: '트렌드 파악하려면 영어는 필수죠. YES 덕분에 외신 기사 읽는 속도가 빨라졌어요.', date: '2023.12.12' },
    { id: 25, name: '백지원 (Alice)', role: '영업직', rating: 5, content: '바이어랑 밥 먹을 때 스몰토크가 제일 두려웠는데, 이젠 날씨 얘기부터 자연스럽게 나옵니다.', date: '2023.12.15' },
    { id: 26, name: '허동현 (Mark)', role: 'CEO', rating: 5, content: '파트너사 미팅에서 통역 없이 대화하니까 분위기가 훨씬 좋아지더군요.', date: '2023.12.18' },
    { id: 27, name: '유승민 (Patrick)', role: '디자이너', rating: 5, content: '해외 튜토리얼 영상 자막 없이 보는 게 목표였는데 달성했습니다! 뿌듯해요.', date: '2023.12.20' },
    { id: 28, name: '남기현 (Simon)', role: '뮤지션', rating: 5, content: '팝송 가사 뉘앙스를 제대로 이해하고 부르니까 노래 맛이 달라지네요.', date: '2023.12.22' },
    { id: 29, name: '심재호 (Peter)', role: '변호사', rating: 4, content: '논리적으로 말하는 훈련이 많이 됩니다. 토론 수업 강추해요.', date: '2023.12.25' },
    { id: 30, name: '노태윤 (Harry)', role: '회계사', rating: 5, content: '다시 영어 공부 시작하는 게 두려웠는데, YES가 그 벽을 깨줬습니다.', date: '2023.12.28' },
    { id: 31, name: '하준영 (Leo)', role: '트레이너', rating: 5, content: '운동이나 영어나 매일 하는 게 중요함. 하루 20분 루틴 만드세요.', date: '2024.01.01' },
    { id: 32, name: '곽민호 (Tony)', role: '사진작가', rating: 5, content: '해외 촬영 나가서 모델이랑 소통 안 돼서 답답했는데 이젠 속이 다 시원합니다.', date: '2024.01.03' },
    { id: 33, name: '성진우 (Jack)', role: '교사', rating: 5, content: '방학 동안 집중적으로 했는데 실력이 확 늘었어요. 역시 몰입이 중요!', date: '2024.01.05' },
    { id: 34, name: '차승우 (Frank)', role: '공인중개사', rating: 4, content: '늦은 나이에 머리가 굳어서 걱정했는데, 튜터님이 인내심 있게 기다려주셔서 감동...', date: '2024.01.08' },
    { id: 35, name: '주현석 (George)', role: '요리사', rating: 5, content: '유튜브로 램지 형님 영상 보는데 자막 없이 들려서 소름 돋았음.', date: '2024.01.10' },
    { id: 36, name: '우도현 (Henry)', role: '플로리스트', rating: 5, content: '꽃말 영어로 설명해주니까 외국인 손님들이 너무 좋아해요!', date: '2024.01.12' },
    { id: 37, name: '구민석 (Ian)', role: '모델', rating: 5, content: '해외 에이전시 미팅에서 제 매력을 100% 어필하고 왔습니다.', date: '2024.01.15' },
    { id: 38, name: '신재영 (Jacob)', role: '의사', rating: 5, content: '국제 학회 발표 준비 YES로 끝냈습니다. Q&A 시간도 두렵지 않았어요.', date: '2024.01.18' },
    { id: 39, name: '임성훈 (Kyle)', role: '연구원', rating: 5, content: '해외 논문 읽고 동료들이랑 영어로 토론하는데 막힘이 없네요.', date: '2024.01.20' },
    { id: 40, name: '전민재 (Liam)', role: '개발자', rating: 4, content: 'I형 인간이라 전화 영어 부담스러웠는데 이건 얼굴 보고 하니까 오히려 편함.', date: '2024.01.22' },
    { id: 41, name: '류현석 (Mason)', role: '약사', rating: 5, content: '외국인 환자분 오셔도 이제 당황하지 않고 복약지도 척척 합니다.', date: '2024.01.25' },
    { id: 42, name: '고준영 (Noah)', role: '변호사', rating: 5, content: '법률 용어 영어로 설명하는 게 어려웠는데 튜터님이랑 연습하면서 많이 늘었어요.', date: '2024.01.28' },
    { id: 43, name: '오태현 (Oscar)', role: '패션 MD', rating: 5, content: '밀라노 출장 가서 네고하는데 영어가 되니까 확실히 유리하더라고요.', date: '2024.02.01' },
    { id: 44, name: '한승준 (Philip)', role: '헬스 트레이너', rating: 5, content: 'PT 받을 때 영어로 숫자 세주면 회원님들이 더 좋아하심 ㅋㅋ', date: '2024.02.03' },
    { id: 45, name: '강민우 (Quinn)', role: '건축가', rating: 5, content: '유학 다녀온 지 오래돼서 감 잃을까 봐 시작했는데 유지 잘 하고 있습니다.', date: '2024.02.05' },
    { id: 46, name: '서지훈 (Ray)', role: '바리스타', rating: 5, content: '카페 오는 외국인 단골이랑 친구 먹었어요. 영어 배우길 잘했다!', date: '2024.02.08' },
    { id: 47, name: '윤도훈 (Sean)', role: '청년 창업가', rating: 5, content: '글로벌 진출이 목표인데 YES 덕분에 첫걸음을 잘 뗀 것 같습니다.', date: '2024.02.10' },
    { id: 48, name: '장성우 (Teddy)', role: '대학생', rating: 5, content: '교환학생 가기 전에 입 좀 풀려고 했는데 기대 이상으로 많이 늘었어요.', date: '2024.02.12' },
    { id: 49, name: '김현준 (Victor)', role: '댄서', rating: 5, content: '해외 댄서들이랑 춤으로만 소통하다가 말로 하니까 더 친해짐.', date: '2024.02.15' },
    { id: 50, name: '이재현 (William)', role: '유치원 교사', rating: 5, content: '애들한테 영어 동요 불러주면 눈이 초롱초롱해져요 ㅎㅎ', date: '2024.02.18' },

    // 초등학생 그룹 (15명 추가, 아이들 말투)
    { id: 51, name: '김지민 (Amy)', role: '초등학생', rating: 5, content: '선생님이랑 게임하면서 공부하니까 하나도 안 지루해요! 맨날 하고 싶어요!', date: '2024.02.20' },
    { id: 52, name: '이준우 (Ben)', role: '초등학생', rating: 5, content: '학교 영어 시간엔 졸린데 YES 쌤이랑 얘기하는 건 꿀잼 ㅋㅋ', date: '2024.02.21' },
    { id: 53, name: '박서아 (Chloe)', role: '초등학생', rating: 5, content: '엄마가 영어 학원 가라고 안 해서 너무 좋아요. 집에서 하니까 편해요.', date: '2024.02.22' },
    { id: 54, name: '최현준 (Danny)', role: '초등학생', rating: 5, content: '이제 외국인 아저씨 만나도 안 도망갈 수 있어요! 헬로우~ 할 거예요.', date: '2024.02.23' },
    { id: 55, name: '정하은 (Ellie)', role: '초등학생', rating: 5, content: '선생님이 내 발음 좋다고 칭찬해줬다! 영어 짱 쉬움!', date: '2024.02.24' },
    { id: 56, name: '강민재 (Fred)', role: '초등학생', rating: 4, content: '처음엔 떨렸는데 선생님이 웃겨서 긴장 풀렸어요.', date: '2024.02.25' },
    { id: 57, name: '조예린 (Gina)', role: '초등학생', rating: 5, content: '해리포터 책 영어로 읽는 게 꿈이에요. 열심히 할 거예요!', date: '2024.02.26' },
    { id: 58, name: '윤도현 (Harry)', role: '초등학생', rating: 5, content: '학원 숙제는 싫은데 이건 숙제 없어서 좋음 ㅋㅋ 그냥 떠들다 보면 끝남.', date: '2024.02.27' },
    { id: 59, name: '장서윤 (Ivy)', role: '초등학생', rating: 5, content: '선생님이랑 베프 됐어요. 나중에 미국 놀러 오라고 했어요!', date: '2024.02.28' },
    { id: 60, name: '임준호 (Jack)', role: '초등학생', rating: 5, content: '게임 레벨업 하는 것처럼 영어가 늘어서 신기해요.', date: '2024.02.29' },
    { id: 61, name: '한지우 (Kate)', role: '초등학생', rating: 5, content: '엄마랑 해외여행 갔을 때 내가 아이스크림 주문했다! 완전 뿌듯!', date: '2024.03.01' },
    { id: 62, name: '오승우 (Leo)', role: '초등학생', rating: 4, content: '단어 외우는 건 싫은데 말하는 건 재밌어요.', date: '2024.03.02' },
    { id: 63, name: '서하윤 (Mia)', role: '초등학생', rating: 5, content: '내 꿈은 외교관! YES로 영어 짱 잘하게 될 거예요.', date: '2024.03.03' },
    { id: 64, name: '신동현 (Nick)', role: '초등학생', rating: 5, content: '학교 원어민 선생님이랑 얘기할 때 이제 손들고 발표해요!', date: '2024.03.04' },
    { id: 65, name: '권유진 (Olivia)', role: '초등학생', rating: 5, content: '영어 유치원 나온 친구보다 내가 발음 더 좋은 거 같음 ㅋㅋ', date: '2024.03.05' },
]

// Shuffle function
const shuffleArray = (array: Review[]) => {
    const newArray = [...array]
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]]
    }
    return newArray
}

const ReviewCard = ({ review }: { review: Review }) => {
    const nameMatch = review.name.match(/^(.+) \((.+)\)$/)
    const koreanName = nameMatch ? nameMatch[1] : review.name
    const englishName = nameMatch ? nameMatch[2] : ''

    return (
        <div className="flex-shrink-0 w-[300px] md:w-[350px] bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mx-3 flex flex-col justify-between h-[220px]">
            <div>
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <div>
                            <div className="flex items-center gap-2 font-bold">
                                <span className="text-gray-900 blur-[4px]">{koreanName}</span>
                                {englishName && (
                                    <span lang="en" className="font-en text-yes-blue">
                                        {englishName}
                                    </span>
                                )}
                            </div>
                            <p className="text-xs text-gray-500">{review.role}</p>
                        </div>
                    </div>
                    <div className="flex text-yellow-400 text-sm">
                        {[...Array(5)].map((_, i) => (
                            <span key={i}>{i < review.rating ? '★' : '☆'}</span>
                        ))}
                    </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                    "{review.content}"
                </p>
            </div>
            <p className="text-xs text-gray-400 mt-4 text-right">{review.date}</p>
        </div>
    )
}

const ReviewCarousel = () => {
    const [shuffledReviews, setShuffledReviews] = useState<Review[]>([])

    useEffect(() => {
        setShuffledReviews(shuffleArray(REVIEWS))
    }, [])

    // If hydration mismatch is a concern, we can just render REVIEWS initially or return null
    // But for a carousel, random order on client mount is usually fine.
    // To avoid hydration mismatch, we only render the list after mount.
    if (shuffledReviews.length === 0) return null

    const halfLength = Math.ceil(shuffledReviews.length / 2)
    const firstRow = shuffledReviews.slice(0, halfLength)
    const secondRow = shuffledReviews.slice(halfLength)

    return (
        <section className="py-20 bg-gray-50 overflow-hidden">
            <div className="container mx-auto px-4 mb-12 text-center">
                <h2 className="text-[32px] md:text-[40px] font-bold text-gray-900 mb-4">
                    수강생들의 생생한 후기
                </h2>
                <p className="text-gray-600 text-lg">
                    이미 많은 분들이 YES 화상영어와 함께 변화를 경험하고 있습니다.
                </p>
            </div>

            <div className="relative w-full">
                {/* Gradient Masks */}
                <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-50 to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-50 to-transparent z-10" />

                {/* First Row - Moving Left */}
                <div className="flex mb-8 overflow-hidden">
                    <div className="flex animate-scroll-left hover:[animation-play-state:paused]">
                        {[...firstRow, ...firstRow].map((review, idx) => (
                            <ReviewCard key={`row1-${idx}`} review={review} />
                        ))}
                    </div>
                </div>

                {/* Second Row - Moving Right */}
                <div className="flex overflow-hidden">
                    <div className="flex animate-scroll-right hover:[animation-play-state:paused]">
                        {[...secondRow, ...secondRow].map((review, idx) => (
                            <ReviewCard key={`row2-${idx}`} review={review} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ReviewCarousel

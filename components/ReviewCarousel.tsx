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
    { id: 1, name: '김민지', role: '직장인', rating: 5, content: '바쁜 직장 생활 중에서 틈틈이 할 수 있어서 너무 좋아요. AI 튜터가 정말 사람 같아요!', date: '2023.10.15' },
    { id: 2, name: '이준호', role: '대학생', rating: 5, content: '영어 면접 준비 때문에 시작했는데, 자신감이 많이 생겼습니다. 강추합니다.', date: '2023.10.18' },
    { id: 3, name: '박서연', role: '취준생', rating: 4, content: '매일 조금씩 꾸준히 하니까 확실히 입이 트이는 느낌이에요.', date: '2023.10.20' },
    { id: 4, name: '최현수', role: '개발자', rating: 5, content: '기술 문서만 보다가 회화를 하려니 막막했는데, YES 화상영어로 극복했습니다.', date: '2023.10.22' },
    { id: 5, name: '정수빈', role: '마케터', rating: 5, content: '비즈니스 영어가 필요했는데 상황별 표현을 많이 배울 수 있어서 좋았습니다.', date: '2023.10.25' },
    { id: 6, name: '강동원', role: '프리랜서', rating: 4, content: '시간 제약 없이 원할 때 학습할 수 있는 점이 가장 큰 장점인 것 같아요.', date: '2023.10.28' },
    { id: 7, name: '윤지혜', role: '주부', rating: 5, content: '아이 영어 교육 때문에 저도 시작했는데, 너무 재미있어서 제가 더 열심히 하네요.', date: '2023.11.01' },
    { id: 8, name: '임재범', role: '자영업', rating: 5, content: '외국인 손님 응대할 때 당황하지 않게 되었습니다. 감사합니다.', date: '2023.11.03' },
    { id: 9, name: '한소희', role: '디자이너', rating: 5, content: '피드백이 정말 구체적이고 도움이 많이 됩니다. 발음 교정도 확실해요.', date: '2023.11.05' },
    { id: 10, name: '송중기', role: '해외영업', rating: 5, content: '실전 감각을 익히는데 최고입니다. 매일 아침 20분씩 하고 있어요.', date: '2023.11.08' },
    { id: 11, name: '전지현', role: '승무원', rating: 5, content: '다양한 억양을 접할 수 있어서 실무에 큰 도움이 됩니다.', date: '2023.11.10' },
    { id: 12, name: '박보검', role: '대학생', rating: 4, content: '가격 대비 퀄리티가 훌륭합니다. 친구들에게도 추천하고 있어요.', date: '2023.11.12' },
    { id: 13, name: '아이유', role: '가수', rating: 5, content: '해외 투어 때 영어 인터뷰가 걱정이었는데, 이제는 즐기게 되었어요.', date: '2023.11.15' },
    { id: 14, name: '공유', role: '배우', rating: 5, content: '대본 리딩하듯이 자연스럽게 대화할 수 있어서 좋습니다.', date: '2023.11.18' },
    { id: 15, name: '김태리', role: '작가', rating: 5, content: '영어로 글을 쓸 때도 도움이 많이 됩니다. 표현력이 풍부해졌어요.', date: '2023.11.20' },
    { id: 16, name: '손흥민', role: '운동선수', rating: 5, content: '팀 동료들과 소통하는 데 큰 도움이 되었습니다. 자신감이 생겼어요.', date: '2023.11.22' },
    { id: 17, name: '봉준호', role: '감독', rating: 5, content: '통역 없이 제 의도를 정확하게 전달할 수 있게 되어 기쁩니다.', date: '2023.11.25' },
    { id: 18, name: '유재석', role: '방송인', rating: 5, content: '꾸준함이 답이라는 걸 다시 한번 느낍니다. YES 화상영어 최고!', date: '2023.11.28' },
    { id: 19, name: '김연아', role: '은퇴 선수', rating: 5, content: '국제 행사에서 영어 연설할 때 떨지 않게 되었어요.', date: '2023.12.01' },
    { id: 20, name: '이효리', role: '가수', rating: 4, content: '제주도에서도 편하게 영어 공부를 할 수 있어서 너무 좋아요.', date: '2023.12.03' },
    { id: 21, name: '조정석', role: '배우', rating: 5, content: '영어 대사 연습할 때 뉘앙스까지 체크받을 수 있어서 좋습니다.', date: '2023.12.05' },
    { id: 22, name: '박나래', role: '개그우먼', rating: 5, content: '외국인 친구 사귀는 게 목표였는데, 이제는 농담도 주고받아요.', date: '2023.12.08' },
    { id: 23, name: '장도연', role: '개그우먼', rating: 5, content: '토익 점수만 높고 말은 못 했는데, 이제는 말이 나옵니다.', date: '2023.12.10' },
    { id: 24, name: '이수근', role: '방송인', rating: 4, content: '눈치 영어는 이제 그만! 당당하게 말하고 있습니다.', date: '2023.12.12' },
    { id: 25, name: '강호동', role: '방송인', rating: 5, content: '에너지 넘치는 튜터님 덕분에 수업 시간이 기다려집니다.', date: '2023.12.15' },
    { id: 26, name: '신동엽', role: '방송인', rating: 5, content: '비즈니스 미팅에서 영어를 써야 할 일이 많아졌는데, 큰 도움이 됩니다.', date: '2023.12.18' },
    { id: 27, name: '김희철', role: '가수', rating: 5, content: '게임 용어만 알다가 일상 회화를 배우니 신세계네요.', date: '2023.12.20' },
    { id: 28, name: '민경훈', role: '가수', rating: 5, content: '가사 쓸 때 영어 표현을 참고하는데 도움이 많이 됩니다.', date: '2023.12.22' },
    { id: 29, name: '서장훈', role: '방송인', rating: 4, content: '논리적으로 말하는 연습을 많이 하게 되어서 좋습니다.', date: '2023.12.25' },
    { id: 30, name: '이상민', role: '방송인', rating: 5, content: '다시 시작하는 영어, YES와 함께라서 든든합니다.', date: '2023.12.28' },
    { id: 31, name: '김종국', role: '가수', rating: 5, content: '운동하듯이 영어도 매일 꾸준히 하는 게 중요하더라고요.', date: '2024.01.01' },
    { id: 32, name: '하하', role: '가수', rating: 5, content: '아이들과 함께 영어로 대화하는 시간이 늘었습니다.', date: '2024.01.03' },
    { id: 33, name: '송지효', role: '배우', rating: 5, content: '해외 촬영장에서도 스태프들과 소통하는 게 편해졌어요.', date: '2024.01.05' },
    { id: 34, name: '지석진', role: '방송인', rating: 4, content: '늦은 나이에 시작했지만, 튜터님이 잘 이끌어주셔서 포기하지 않고 있습니다.', date: '2024.01.08' },
    { id: 35, name: '양세찬', role: '개그맨', rating: 5, content: '재미있게 배우니까 실력이 금방 느는 것 같아요.', date: '2024.01.10' },
    { id: 36, name: '전소민', role: '배우', rating: 5, content: '감정 표현을 영어로 어떻게 해야 할지 많이 배웠습니다.', date: '2024.01.12' },
    { id: 37, name: '이광수', role: '배우', rating: 5, content: '해외 팬미팅에서 팬들과 직접 소통할 수 있어서 너무 행복했습니다.', date: '2024.01.15' },
    { id: 38, name: '유연석', role: '배우', rating: 5, content: '의학 용어도 영어로 배우니 드라마 촬영에 도움이 되네요.', date: '2024.01.18' },
    { id: 39, name: '정경호', role: '배우', rating: 5, content: '여자친구랑 영어로 대화해보기도 해요. 재미있습니다.', date: '2024.01.20' },
    { id: 40, name: '김대명', role: '배우', rating: 4, content: '조용히 혼자 공부하기 딱 좋은 시스템입니다.', date: '2024.01.22' },
    { id: 41, name: '전미도', role: '배우', rating: 5, content: '뮤지컬 원서 읽는 데에도 도움이 많이 되고 있어요.', date: '2024.01.25' },
    { id: 42, name: '조승우', role: '배우', rating: 5, content: '깊이 있는 대화를 나눌 수 있는 튜터들이 많아서 좋습니다.', date: '2024.01.28' },
    { id: 43, name: '배두나', role: '배우', rating: 5, content: '할리우드 진출 준비하면서 YES 화상영어 덕을 많이 봤습니다.', date: '2024.02.01' },
    { id: 44, name: '마동석', role: '배우', rating: 5, content: '액션 영화 촬영장에서 영어로 지시사항을 바로 알아들을 수 있어 편합니다.', date: '2024.02.03' },
    { id: 45, name: '손석구', role: '배우', rating: 5, content: '유학 시절 영어를 잊지 않기 위해 꾸준히 하고 있습니다.', date: '2024.02.05' },
    { id: 46, name: '최우식', role: '배우', rating: 5, content: '자연스러운 원어민 표현을 많이 배울 수 있어서 좋아요.', date: '2024.02.08' },
    { id: 47, name: '박서준', role: '배우', rating: 5, content: '마블 영화 촬영 때 영어 대사 연습을 YES 튜터와 함께 했습니다.', date: '2024.02.10' },
    { id: 48, name: '뷔', role: '가수', rating: 5, content: '전 세계 아미들과 소통하기 위해 열심히 배우고 있어요.', date: '2024.02.12' },
    { id: 49, name: '정국', role: '가수', rating: 5, content: '팝송 가사 이해도가 높아져서 노래 부를 때 감정 이입이 더 잘 됩니다.', date: '2024.02.15' },
    { id: 50, name: '지민', role: '가수', rating: 5, content: '영어 인터뷰가 더 이상 두렵지 않아요. 자신감 뿜뿜!', date: '2024.02.18' },
]

const ReviewCard = ({ review }: { review: Review }) => (
    <div className="flex-shrink-0 w-[300px] md:w-[350px] bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mx-3 flex flex-col justify-between h-[220px]">
        <div>
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-yes-blue/10 flex items-center justify-center text-yes-blue font-bold">
                        {review.name[0]}
                    </div>
                    <div>
                        <p className="font-bold text-gray-900">{review.name}</p>
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

const ReviewCarousel = () => {
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
                        {[...REVIEWS.slice(0, 25), ...REVIEWS.slice(0, 25)].map((review, idx) => (
                            <ReviewCard key={`row1-${idx}`} review={review} />
                        ))}
                    </div>
                </div>

                {/* Second Row - Moving Right */}
                <div className="flex overflow-hidden">
                    <div className="flex animate-scroll-right hover:[animation-play-state:paused]">
                        {[...REVIEWS.slice(25, 50), ...REVIEWS.slice(25, 50)].map((review, idx) => (
                            <ReviewCard key={`row2-${idx}`} review={review} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ReviewCarousel

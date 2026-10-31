// JSON-LD를 정적 HTML에 포함시키는 서버 컴포넌트.
// - next/script는 hydration 후 주입되어 export된 HTML에 남지 않으므로 일반 <script>를 쓴다.
// - JSON.stringify는 '<'를 이스케이프하지 않아 값(글 제목 등)에 '</script>'가 들어가면
//   태그가 조기 종료되고 뒤 내용이 HTML로 해석된다. '<'를 <로 바꿔 막는다(JSON 의미는 동일).
export default function JsonLd({ id, data }: { id: string; data: unknown }) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  )
}

import Image from 'next/image'
import Link from 'next/link'

/**
 * Custom MDX Components with YES branding
 * These components are used with Tailwind Typography plugin
 */

export const MDXComponents = {
  // Headings
  h1: ({ children, ...props }: any) => (
    <h1
      className="text-[32px] md:text-[42px] font-extrabold leading-tight tracking-tight mt-0 mb-6"
      {...props}
    >
      {children}
    </h1>
  ),

  h2: ({ children, ...props }: any) => (
    <h2
      className="text-[28px] md:text-[36px] font-extrabold leading-tight tracking-tight mt-12 mb-6"
      {...props}
    >
      {children}
    </h2>
  ),

  h3: ({ children, ...props }: any) => (
    <h3
      className="text-[24px] md:text-[28px] font-bold leading-snug tracking-tight mt-10 mb-4 text-yes-blue"
      {...props}
    >
      {children}
    </h3>
  ),

  h4: ({ children, ...props }: any) => (
    <h4
      className="text-[20px] md:text-[24px] font-bold leading-snug tracking-tight mt-8 mb-3"
      {...props}
    >
      {children}
    </h4>
  ),

  // Paragraphs
  p: ({ children, ...props }: any) => (
    <p
      className="text-[16px] md:text-[18px] leading-relaxed text-gray-700 mb-6"
      {...props}
    >
      {children}
    </p>
  ),

  // Links
  a: ({ href, children, ...props }: any) => {
    const isExternal = href?.startsWith('http')

    if (isExternal) {
      return (
        <a
          href={href}
          className="text-yes-blue font-semibold hover:underline decoration-2 decoration-yes-blue underline-offset-2 transition-all"
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        >
          {children}
        </a>
      )
    }

    return (
      <Link
        href={href || '#'}
        className="text-yes-blue font-semibold hover:underline decoration-2 decoration-yes-blue underline-offset-2 transition-all"
        {...props}
      >
        {children}
      </Link>
    )
  },

  // Lists
  ul: ({ children, ...props }: any) => (
    <ul
      className="space-y-3 my-6 ml-6"
      {...props}
    >
      {children}
    </ul>
  ),

  ol: ({ children, ...props }: any) => (
    <ol
      className="space-y-3 my-6 ml-6"
      {...props}
    >
      {children}
    </ol>
  ),

  li: ({ children, ...props }: any) => (
    <li
      className="text-[16px] md:text-[18px] leading-relaxed text-gray-700"
      {...props}
    >
      {children}
    </li>
  ),

  // Blockquote
  blockquote: ({ children, ...props }: any) => (
    <blockquote
      className="border-l-4 border-yes-blue bg-gray-50 pl-6 pr-4 py-4 my-6 rounded-r-lg italic"
      {...props}
    >
      {children}
    </blockquote>
  ),

  // Code
  code: ({ children, className, ...props }: any) => {
    const isInline = !className

    if (isInline) {
      return (
        <code
          className="bg-gray-100 text-yes-blue px-2 py-1 rounded font-semibold text-[15px] md:text-[16px]"
          {...props}
        >
          {children}
        </code>
      )
    }

    // Block code
    return (
      <code
        className={`${className} block`}
        {...props}
      >
        {children}
      </code>
    )
  },

  pre: ({ children, ...props }: any) => (
    <pre
      className="bg-gray-900 text-gray-100 p-5 rounded-lg overflow-x-auto my-6"
      {...props}
    >
      {children}
    </pre>
  ),

  // Emphasis
  strong: ({ children, ...props }: any) => (
    <strong
      className="font-bold text-yes-blue"
      {...props}
    >
      {children}
    </strong>
  ),

  em: ({ children, ...props }: any) => (
    <em
      className="italic text-gray-800"
      {...props}
    >
      {children}
    </em>
  ),

  // Horizontal Rule
  hr: (props: any) => (
    <hr
      className="border-t-2 border-yes-blue my-12"
      {...props}
    />
  ),

  // Images
  img: ({ src, alt, ...props }: any) => (
    <span className="block my-8">
      <Image
        src={src || ''}
        alt={alt || ''}
        width={900}
        height={500}
        className="rounded-lg w-full h-auto"
        {...props}
      />
    </span>
  ),

  // Tables
  table: ({ children, ...props }: any) => (
    <div className="overflow-x-auto my-8">
      <table
        className="min-w-full border-collapse"
        {...props}
      >
        {children}
      </table>
    </div>
  ),

  thead: ({ children, ...props }: any) => (
    <thead
      className="border-b-2 border-yes-blue"
      {...props}
    >
      {children}
    </thead>
  ),

  tbody: ({ children, ...props }: any) => (
    <tbody {...props}>
      {children}
    </tbody>
  ),

  tr: ({ children, ...props }: any) => (
    <tr
      className="border-b border-gray-200"
      {...props}
    >
      {children}
    </tr>
  ),

  th: ({ children, ...props }: any) => (
    <th
      className="px-6 py-3 text-left font-bold text-gray-900 bg-gray-50"
      {...props}
    >
      {children}
    </th>
  ),

  td: ({ children, ...props }: any) => (
    <td
      className="px-6 py-4 text-gray-700"
      {...props}
    >
      {children}
    </td>
  ),

  // Special: English Examples Box (using blockquote with special marker)
  ExampleBox: ({ children, title }: { children: React.ReactNode; title?: string }) => (
    <div className="bg-blue-50 border-l-4 border-yes-blue rounded-r-lg p-6 my-6">
      {title && (
        <div className="text-yes-blue font-bold text-[18px] mb-3">{title}</div>
      )}
      <div className="text-gray-800 text-[16px] md:text-[18px] leading-relaxed">
        {children}
      </div>
    </div>
  ),

  // Special: Practice Exercise Box
  PracticeBox: ({ children, title }: { children: React.ReactNode; title?: string }) => (
    <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-6 my-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">✏️</span>
        <span className="text-yellow-800 font-bold text-[18px]">
          {title || '연습 문제'}
        </span>
      </div>
      <div className="text-gray-800 text-[16px] md:text-[18px] leading-relaxed">
        {children}
      </div>
    </div>
  ),

  // Special: Tip Box
  TipBox: ({ children, title }: { children: React.ReactNode; title?: string }) => (
    <div className="bg-green-50 border-l-4 border-green-500 rounded-r-lg p-6 my-6">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xl">💡</span>
        <span className="text-green-800 font-bold text-[18px]">
          {title || 'YES 팁'}
        </span>
      </div>
      <div className="text-gray-800 text-[16px] md:text-[18px] leading-relaxed">
        {children}
      </div>
    </div>
  ),
}

export default MDXComponents

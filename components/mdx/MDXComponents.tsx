import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

/**
 * Custom MDX Components with YES branding
 * These components are used with Tailwind Typography plugin
 */

export const MDXComponents = {
  // Headings - Let Typography plugin handle most of it, just add specific overrides if needed
  h1: ({ children, node, ...props }: any) => (
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-8 mt-2 text-gray-900" {...props}>
      {children}
    </h1>
  ),

  h2: ({ children, node, ...props }: any) => (
    <h2 className="scroll-m-20 border-b border-gray-100 pb-2 text-3xl font-bold tracking-tight first:mt-0 mt-12 mb-6 text-gray-900" {...props}>
      {children}
    </h2>
  ),

  h3: ({ children, node, ...props }: any) => (
    <h3 className="scroll-m-20 text-2xl font-bold tracking-tight mt-10 mb-4 text-yes-blue" {...props}>
      {children}
    </h3>
  ),

  h4: ({ children, node, ...props }: any) => (
    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mt-8 mb-4 text-gray-800" {...props}>
      {children}
    </h4>
  ),

  // Paragraphs
  p: ({ children, node, ...props }: any) => (
    <p className="leading-8 [&:not(:first-child)]:mt-6 text-gray-700 font-light text-lg" {...props}>
      {children}
    </p>
  ),

  // Links
  a: ({ href, children, node, ...props }: any) => {
    const isExternal = href?.startsWith('http')
    const className = "font-medium text-yes-blue underline underline-offset-4 hover:text-bg-dark transition-colors"

    if (isExternal) {
      return (
        <a
          href={href}
          className={className}
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        >
          {children}
        </a>
      )
    }

    return (
      <Link href={href || '#'} className={className} {...props}>
        {children}
      </Link>
    )
  },

  // Lists - Clean and simple
  ul: ({ children, node, ...props }: any) => (
    <ul className="my-6 ml-6 list-disc [&>li]:mt-2 marker:text-yes-blue" {...props}>
      {children}
    </ul>
  ),

  ol: ({ children, node, ...props }: any) => (
    <ol className="my-6 ml-6 list-decimal [&>li]:mt-2 marker:text-yes-blue marker:font-bold" {...props}>
      {children}
    </ol>
  ),

  li: ({ children, node, ...props }: any) => (
    <li className="text-gray-700 leading-7 pl-2" {...props}>
      {children}
    </li>
  ),

  // Blockquote
  blockquote: ({ children, node, ...props }: any) => (
    <blockquote className="mt-6 border-l-4 border-yes-blue pl-6 italic text-gray-700 bg-gray-50 py-4 pr-4 rounded-r-lg" {...props}>
      {children}
    </blockquote>
  ),

  // Code
  code: ({ children, className, node, ...props }: any) => {
    const isInline = !className
    if (isInline) {
      return (
        <code lang="en" className="font-en relative rounded bg-gray-100 px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold text-pink-600" {...props}>
          {children}
        </code>
      )
    }
    return (
      <code lang="en" className={`font-en ${className} block font-mono text-sm`} {...props}>
        {children}
      </code>
    )
  },

  pre: ({ children, node, ...props }: any) => (
    <pre className="mb-4 mt-6 overflow-x-auto rounded-lg border border-gray-200 bg-gray-900 p-4 shadow-sm" {...props}>
      {children}
    </pre>
  ),

  // Images
  img: ({ src, alt, node, ...props }: any) => (
    <span className="block my-8">
      <Image
        src={src || ''}
        alt={alt || ''}
        width={900}
        height={500}
        className="rounded-xl border border-gray-100 shadow-md w-full h-auto"
        {...props}
      />
      {alt && <span className="block text-center text-sm text-gray-500 mt-2 italic">{alt}</span>}
    </span>
  ),

  // Tables
  table: ({ children, node, ...props }: any) => (
    <div className="my-6 w-full overflow-y-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="w-full" {...props}>
        {children}
      </table>
    </div>
  ),

  thead: ({ children, node, ...props }: any) => (
    <thead className="bg-gray-50 border-b border-gray-200" {...props}>
      {children}
    </thead>
  ),

  tbody: ({ children, node, ...props }: any) => (
    <tbody className="divide-y divide-gray-100" {...props}>
      {children}
    </tbody>
  ),

  tr: ({ children, node, ...props }: any) => (
    <tr className="hover:bg-gray-50/50 transition-colors" {...props}>
      {children}
    </tr>
  ),

  th: ({ children, node, ...props }: any) => (
    <th className="px-4 py-3 text-left font-semibold text-gray-900" {...props}>
      {children}
    </th>
  ),

  td: ({ children, node, ...props }: any) => (
    <td className="px-4 py-3 text-gray-700" {...props}>
      {children}
    </td>
  ),

  // Special: English Examples Box (Clean, Professional)
  ExampleBox: ({ children, title }: { children: React.ReactNode; title?: string }) => (
    <div className="my-8 rounded-lg border border-blue-100 bg-blue-50/50 p-6 shadow-sm">
      {title && (
        <div className="flex items-center gap-2 mb-3 text-yes-blue font-bold text-lg">
          <span className="text-xl">📝</span>
          {title}
        </div>
      )}
      <div className="text-gray-800 leading-relaxed font-light">
        {children}
      </div>
    </div>
  ),

  // Special: Practice Exercise Box
  PracticeBox: ({ children, title }: { children: React.ReactNode; title?: string }) => (
    <div className="my-8 rounded-lg border border-amber-200 bg-amber-50/50 p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-3 text-amber-800 font-bold text-lg">
        <span className="text-xl">✏️</span>
        {title || '연습 문제'}
      </div>
      <div className="text-gray-800 leading-relaxed font-light">
        {children}
      </div>
    </div>
  ),

  // Special: Tip Box
  TipBox: ({ children, title }: { children: React.ReactNode; title?: string }) => (
    <div className="my-8 rounded-lg border-l-4 border-emerald-500 bg-emerald-50 p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-3 text-emerald-800 font-bold text-lg">
        <span className="text-xl">💡</span>
        {title || 'YES 팁'}
      </div>
      <div className="text-gray-800 leading-relaxed font-light">
        {children}
      </div>
    </div>
  ),
}

export default MDXComponents

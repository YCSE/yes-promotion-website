import Script from 'next/script'

export default function BlogPostLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: { slug: string }
}) {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: '{{title}}',
    description: '{{description}}',
    image: '{{image}}',
    datePublished: '{{datePublished}}',
    dateModified: '{{dateModified}}',
    author: {
      '@type': 'Organization',
      name: 'YES 화상영어',
      url: 'https://yourenglishschool.co.kr'
    },
    publisher: {
      '@type': 'Organization',
      name: 'YES 화상영어',
      logo: {
        '@type': 'ImageObject',
        url: 'https://yourenglishschool.co.kr/ogimage.jpg'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://yourenglishschool.co.kr/blog/${params.slug}`
    }
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: '홈',
        item: 'https://yourenglishschool.co.kr'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: '블로그',
        item: 'https://yourenglishschool.co.kr/blog'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: '{{title}}',
        item: `https://yourenglishschool.co.kr/blog/${params.slug}`
      }
    ]
  }

  return (
    <>
      <Script
        id={`article-structured-data-${params.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd)
        }}
        strategy="afterInteractive"
      />
      <Script
        id={`breadcrumb-structured-data-${params.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd)
        }}
        strategy="afterInteractive"
      />
      {children}
    </>
  )
}
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

function getAllBlogPosts() {
  const postsDirectory = path.join(process.cwd(), 'content/posts')
  
  try {
    if (!fs.existsSync(postsDirectory)) {
      return []
    }
    
    const fileNames = fs.readdirSync(postsDirectory)
    
    const posts = fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map(fileName => {
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data, content } = matter(fileContents)
        
        // Get first 200 characters of content as description
        const plainContent = content
          .replace(/[#*\[\]`]/g, '')
          .replace(/\n/g, ' ')
          .trim()
        const description = data.subtitle || plainContent.slice(0, 200) + '...'
        
        return {
          slug: fileName.replace(/\.md$/, ''),
          title: data.title || 'Untitled',
          date: data.date || new Date().toISOString(),
          author: data.author || 'YES 화상영어',
          description: description,
          featuredImage: data.featuredImage || null
        }
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    
    return posts
  } catch (error) {
    console.error('Error reading blog posts for RSS:', error)
    return []
  }
}

function escapeXml(unsafe: string) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

export async function GET() {
  const baseUrl = 'https://yourenglishschool.co.kr'
  const posts = getAllBlogPosts()
  
  // Create RSS items for each post
  const rssItems = posts.map(post => {
    const pubDate = new Date(post.date).toUTCString()
    const imageTag = post.featuredImage 
      ? `<enclosure url="${baseUrl}${post.featuredImage}" type="image/jpeg" />`
      : ''
    
    return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
      <description><![CDATA[${post.description}]]></description>
      <author>noreply@yourenglishschool.co.kr (${escapeXml(post.author)})</author>
      <pubDate>${pubDate}</pubDate>
      ${imageTag}
      <category>화상영어</category>
      <category>영어학습</category>
      <category>영어회화</category>
    </item>`
  }).join('')

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:dc="http://purl.org/dc/elements/1.1/"
     xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>YES 화상영어 블로그</title>
    <link>${baseUrl}/blog</link>
    <description>YES 화상영어 블로그 - 효과적인 영어학습법과 온라인 영어회화 수업 팁, 실전 영어 회화 노하우를 공유합니다.</description>
    <language>ko</language>
    <copyright>Copyright 2025 YES 화상영어</copyright>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <generator>YES 화상영어 Blog System</generator>
    <webMaster>admin@yourenglishschool.co.kr</webMaster>
    <managingEditor>editor@yourenglishschool.co.kr</managingEditor>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${baseUrl}/ogimage.jpg</url>
      <title>YES 화상영어 블로그</title>
      <link>${baseUrl}</link>
      <description>YES 화상영어 - 원어민과 1:1 화상영어 수업</description>
    </image>
    <ttl>60</ttl>
    ${rssItems}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      'X-Content-Type-Options': 'nosniff'
    }
  })
}
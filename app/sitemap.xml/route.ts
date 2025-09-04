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
        const { data } = matter(fileContents)
        
        return {
          slug: fileName.replace(/\.md$/, ''),
          date: data.date || new Date().toISOString(),
          title: data.title || 'Untitled',
          subtitle: data.subtitle || ''
        }
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    
    return posts
  } catch (error) {
    console.error('Error reading blog posts for sitemap:', error)
    return []
  }
}

export async function GET() {
  const baseUrl = 'https://yourenglishschool.co.kr'
  const currentDate = new Date().toISOString()
  
  // Get all blog posts
  const blogPosts = getAllBlogPosts()
  
  // Create XML for blog posts
  const blogPostsXml = blogPosts.map(post => `
  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${new Date(post.date).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <news:news>
      <news:publication>
        <news:name>YES 화상영어 블로그</news:name>
        <news:language>ko</news:language>
      </news:publication>
      <news:publication_date>${new Date(post.date).toISOString()}</news:publication_date>
      <news:title><![CDATA[${post.title}]]></news:title>
      <news:keywords>화상영어, 영어학습, 영어회화, YES화상영어</news:keywords>
    </news:news>
    <mobile:mobile/>
  </url>`).join('')
  
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
    <image:image>
      <image:loc>${baseUrl}/ogimage.jpg</image:loc>
      <image:title>YES 화상영어 - 원어민 화상영어 1:1 수업</image:title>
      <image:caption>YES 화상영어로 원어민과 실시간 화상영어회화 수업</image:caption>
    </image:image>
    <mobile:mobile/>
  </url>
  
  <url>
    <loc>${baseUrl}/blog</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
    <mobile:mobile/>
  </url>
  ${blogPostsXml}
</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600'
    }
  })
}
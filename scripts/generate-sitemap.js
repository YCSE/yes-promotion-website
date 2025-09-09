const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// 블로그 포스트 디렉토리
const postsDirectory = path.join(process.cwd(), 'content', 'posts');
const publicDirectory = path.join(process.cwd(), 'public');

// 오늘 날짜 가져오기
const today = new Date().toISOString().split('T')[0];

// 블로그 포스트 읽기
function getAllPosts() {
  try {
    const fileNames = fs.readdirSync(postsDirectory);
    const posts = fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map(fileName => {
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data } = matter(fileContents);
        
        return {
          slug: fileName.replace(/\.md$/, ''),
          date: data.date || today,
          title: data.title || '',
          description: data.description || ''
        };
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));
    
    return posts;
  } catch (error) {
    console.log('No blog posts found, creating sitemap with main pages only');
    return [];
  }
}

// Sitemap XML 생성
function generateSitemap() {
  const posts = getAllPosts();
  const baseUrl = 'https://yourenglishschool.co.kr';
  
  // 기본 페이지들
  const staticPages = [
    {
      loc: '/',
      changefreq: 'daily',
      priority: '1.0',
      images: [
        {
          loc: '/images/thumbnail_PC.webp',
          title: 'YES 화상영어 - 원어민과 1:1 화상영어회화',
          caption: 'YES 화상영어로 실시간 원어민 영어회화 수업'
        }
      ]
    },
    {
      loc: '/blog/',
      changefreq: 'daily',
      priority: '0.9'
    }
  ];
  
  // 섹션 앵커들 (SEO를 위한 디프링크)
  const sectionAnchors = [
    { loc: '/#features', changefreq: 'weekly', priority: '0.7' },
    { loc: '/#tia', changefreq: 'weekly', priority: '0.7' },
    { loc: '/#level-test', changefreq: 'weekly', priority: '0.7' },
    { loc: '/#faq', changefreq: 'weekly', priority: '0.7' }
  ];
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0">`;
  
  // 정적 페이지 추가
  staticPages.forEach(page => {
    xml += `
  <url>
    <loc>${baseUrl}${page.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>`;
    
    if (page.images) {
      page.images.forEach(image => {
        xml += `
    <image:image>
      <image:loc>${baseUrl}${image.loc}</image:loc>
      <image:title>${image.title}</image:title>
      <image:caption>${image.caption}</image:caption>
    </image:image>`;
      });
    }
    
    xml += `
  </url>`;
  });
  
  // 블로그 포스트 추가
  posts.forEach(post => {
    xml += `
  <url>
    <loc>${baseUrl}/blog/${post.slug}/</loc>
    <lastmod>${post.date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
  });
  
  // 섹션 앵커 추가
  sectionAnchors.forEach(anchor => {
    xml += `
  <url>
    <loc>${baseUrl}${anchor.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${anchor.changefreq}</changefreq>
    <priority>${anchor.priority}</priority>
  </url>`;
  });
  
  xml += `
</urlset>`;
  
  // 파일 저장
  fs.writeFileSync(path.join(publicDirectory, 'sitemap.xml'), xml);
  console.log('✅ Sitemap generated successfully at public/sitemap.xml');
  
  // robots.txt 업데이트 확인
  updateRobotsTxt();
}

// robots.txt에 sitemap 참조 추가
function updateRobotsTxt() {
  const robotsPath = path.join(publicDirectory, 'robots.txt');
  const robotsContent = fs.readFileSync(robotsPath, 'utf8');
  
  if (!robotsContent.includes('Sitemap:')) {
    const updatedContent = robotsContent + '\n\n# Sitemap\nSitemap: https://yourenglishschool.co.kr/sitemap.xml\n';
    fs.writeFileSync(robotsPath, updatedContent);
    console.log('✅ robots.txt updated with sitemap reference');
  }
}

// 실행
generateSitemap();
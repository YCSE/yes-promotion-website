"use strict";(()=>{var e={};e.id=246,e.ids=[246],e.modules={399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},8893:e=>{e.exports=require("buffer")},2048:e=>{e.exports=require("fs")},5315:e=>{e.exports=require("path")},3477:(e,t,r)=>{r.r(t),r.d(t,{originalPathname:()=>c,patchFetch:()=>d,requestAsyncStorage:()=>p,routeModule:()=>s,serverHooks:()=>g,staticGenerationAsyncStorage:()=>u});var o={};r.r(o),r.d(o,{GET:()=>l.GET});var n=r(9303),i=r(8716),a=r(3131),l=r(1452);let s=new n.AppRouteRouteModule({definition:{kind:i.x.APP_ROUTE,page:"/feed.xml/route",pathname:"/feed.xml",filename:"route",bundlePath:"app/feed.xml/route"},resolvedPagePath:"C:\\dev\\yes-promotion-website\\app\\feed.xml\\route.ts",nextConfigOutput:"export",userland:o}),{requestAsyncStorage:p,staticGenerationAsyncStorage:u,serverHooks:g}=s,c="/feed.xml/route";function d(){return(0,a.patchFetch)({serverHooks:g,staticGenerationAsyncStorage:u})}},1452:(e,t,r)=>{r.r(t),r.d(t,{GET:()=>p});var o=r(2048),n=r.n(o),i=r(5315),a=r.n(i),l=r(3673),s=r.n(l);async function p(){let e="https://yourenglishschool.co.kr",t=(function(){let e=a().join(process.cwd(),"content/posts");try{if(!n().existsSync(e))return[];return n().readdirSync(e).filter(e=>e.endsWith(".md")).map(t=>{let r=a().join(e,t),o=n().readFileSync(r,"utf8"),{data:i,content:l}=s()(o),p=l.replace(/[#*\[\]`]/g,"").replace(/\n/g," ").trim(),u=i.subtitle||p.slice(0,200)+"...";return{slug:t.replace(/\.md$/,""),title:i.title||"Untitled",date:i.date||new Date().toISOString(),author:i.author||"YES 화상영어",description:u,featuredImage:i.featuredImage||null}}).sort((e,t)=>new Date(t.date).getTime()-new Date(e.date).getTime())}catch(e){return console.error("Error reading blog posts for RSS:",e),[]}})().map(t=>{let r=new Date(t.date).toUTCString(),o=t.featuredImage?`<enclosure url="${e}${t.featuredImage}" type="image/jpeg" length="0" />`:"";return`
    <item>
      <title><![CDATA[${t.title}]]></title>
      <link>${e}/blog/${t.slug}/</link>
      <guid isPermaLink="true">${e}/blog/${t.slug}/</guid>
      <description><![CDATA[${t.description}]]></description>
      <author>noreply@yourenglishschool.co.kr (${t.author.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")})</author>
      <pubDate>${r}</pubDate>
      ${o}
      <category>화상영어</category>
      <category>영어학습</category>
      <category>영어회화</category>
    </item>`}).join("");return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:dc="http://purl.org/dc/elements/1.1/"
     xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>YES 화상영어 블로그</title>
    <link>${e}/blog/</link>
    <description>YES 화상영어 블로그 - 효과적인 영어학습법과 온라인 영어회화 수업 팁, 실전 영어 회화 노하우를 공유합니다.</description>
    <language>ko</language>
    <copyright>Copyright 2025 YES 화상영어</copyright>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <generator>YES 화상영어 Blog System</generator>
    <webMaster>admin@yourenglishschool.co.kr</webMaster>
    <managingEditor>editor@yourenglishschool.co.kr</managingEditor>
    <atom:link href="${e}/rss.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${e}/ogimage.jpg</url>
      <title>YES 화상영어 블로그</title>
      <link>${e}</link>
      <description>YES 화상영어 - 원어민과 1:1 화상영어 수업</description>
    </image>
    <ttl>60</ttl>
    ${t}
  </channel>
</rss>`,{headers:{"Content-Type":"application/xml; charset=utf-8","Cache-Control":"public, max-age=3600, s-maxage=3600","X-Content-Type-Options":"nosniff"}})}},9303:(e,t,r)=>{e.exports=r(517)}};var t=require("../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),o=t.X(0,[948,673],()=>r(3477));module.exports=o})();
"use strict";(()=>{var e={};e.id=287,e.ids=[287],e.modules={399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},8893:e=>{e.exports=require("buffer")},2048:e=>{e.exports=require("fs")},5315:e=>{e.exports=require("path")},3333:(e,t,r)=>{r.r(t),r.d(t,{originalPathname:()=>g,patchFetch:()=>c,requestAsyncStorage:()=>l,routeModule:()=>s,serverHooks:()=>u,staticGenerationAsyncStorage:()=>p});var o=r(9303),n=r(8716),i=r(3131),a=r(1452);let s=new o.AppRouteRouteModule({definition:{kind:n.x.APP_ROUTE,page:"/rss.xml/route",pathname:"/rss.xml",filename:"route",bundlePath:"app/rss.xml/route"},resolvedPagePath:"C:\\dev\\yes-promotion-website\\app\\rss.xml\\route.ts",nextConfigOutput:"export",userland:a}),{requestAsyncStorage:l,staticGenerationAsyncStorage:p,serverHooks:u}=s,g="/rss.xml/route";function c(){return(0,i.patchFetch)({serverHooks:u,staticGenerationAsyncStorage:p})}},1452:(e,t,r)=>{r.r(t),r.d(t,{GET:()=>p});var o=r(2048),n=r.n(o),i=r(5315),a=r.n(i),s=r(3673),l=r.n(s);async function p(){let e="https://yourenglishschool.co.kr",t=(function(){let e=a().join(process.cwd(),"content/posts");try{if(!n().existsSync(e))return[];return n().readdirSync(e).filter(e=>e.endsWith(".md")).map(t=>{let r=a().join(e,t),o=n().readFileSync(r,"utf8"),{data:i,content:s}=l()(o),p=s.replace(/[#*\[\]`]/g,"").replace(/\n/g," ").trim(),u=i.subtitle||p.slice(0,200)+"...";return{slug:t.replace(/\.md$/,""),title:i.title||"Untitled",date:i.date||new Date().toISOString(),author:i.author||"YES 화상영어",description:u,featuredImage:i.featuredImage||null}}).sort((e,t)=>new Date(t.date).getTime()-new Date(e.date).getTime())}catch(e){return console.error("Error reading blog posts for RSS:",e),[]}})().map(t=>{let r=new Date(t.date).toUTCString(),o=t.featuredImage?`<enclosure url="${e}${t.featuredImage}" type="image/jpeg" length="0" />`:"";return`
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
</rss>`,{headers:{"Content-Type":"application/xml; charset=utf-8","Cache-Control":"public, max-age=3600, s-maxage=3600","X-Content-Type-Options":"nosniff"}})}},9303:(e,t,r)=>{e.exports=r(517)}};var t=require("../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),o=t.X(0,[948,673],()=>r(3333));module.exports=o})();
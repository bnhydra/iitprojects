#!/usr/bin/env node
// Generates robots.txt and sitemap.xml using:
//   1. DEPLOY_URL env variable   (e.g. DEPLOY_URL=https://civil.iitm.ac.in/faculty/nbalaji node build-seo.js)
//   2. DEPLOY_DOMAIN env variable (e.g. DEPLOY_DOMAIN=mysite.com node build-seo.js)
//   3. CNAME file in the same directory
//   4. Falls back to localhost

const fs = require('fs');

let base;
if (process.env.DEPLOY_URL) {
  base = process.env.DEPLOY_URL.replace(/\/$/, '');
} else {
  const domain = (
    process.env.DEPLOY_DOMAIN ||
    (fs.existsSync('CNAME') && fs.readFileSync('CNAME', 'utf8').trim()) ||
    'localhost'
  ).replace(/^https?:\/\//, '').replace(/\/$/, '');
  base = `https://${domain}`;
}

const pages = [
  { loc: 'index.html',        priority: '1.0', changefreq: 'monthly' },
  { loc: 'research.html',     priority: '0.9', changefreq: 'monthly' },
  { loc: 'publications.html', priority: '0.9', changefreq: 'monthly' },
  { loc: 'projects.html',     priority: '0.8', changefreq: 'monthly' },
  { loc: 'team.html',         priority: '0.8', changefreq: 'monthly' },
  { loc: 'achievements.html', priority: '0.7', changefreq: 'yearly'  },
  { loc: 'consultancy.html',  priority: '0.7', changefreq: 'yearly'  },
  { loc: 'teaching.html',     priority: '0.7', changefreq: 'yearly'  },
  { loc: 'outreach.html',     priority: '0.6', changefreq: 'yearly'  },
  { loc: 'joinus.html',       priority: '0.6', changefreq: 'monthly' },
];

// --- robots.txt ---
fs.writeFileSync('robots.txt',
`User-agent: *
Allow: /

Sitemap: ${base}/sitemap.xml
`);

// --- sitemap.xml ---
const urls = pages.map(p => `  <url>
    <loc>${base}/${p.loc}</loc>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('\n');

fs.writeFileSync('sitemap.xml',
`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`);

console.log(`✅ robots.txt and sitemap.xml generated for: ${base}`);
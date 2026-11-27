// Writes public/sitemap.xml and public/robots.txt from the tools registry.
import { writeFileSync } from 'node:fs';
import { tools } from '../src/data/tools.js';
import { site } from '../src/data/site.js';

const base = (process.env.SITE_URL || site.url).replace(/\/$/, '');
const today = new Date().toISOString().slice(0, 10);

const urls = ['/', ...tools.map((t) => `/tools/${t.slug}`)];
const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls.map((u) => `  <url><loc>${base}${u}</loc><lastmod>${today}</lastmod></url>`).join('\n') +
  `\n</urlset>\n`;

writeFileSync(new URL('../public/sitemap.xml', import.meta.url), xml);
writeFileSync(new URL('../public/robots.txt', import.meta.url), `User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`);
console.log(`✔ sitemap.xml + robots.txt written for ${base} (${urls.length} URLs)`);

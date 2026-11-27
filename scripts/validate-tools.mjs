// Fails the build with a clear message if src/data/tools.js has a mistake,
// so a typo can never silently break the live site.
import { readFileSync } from 'node:fs';
import { tools, CATEGORIES, PRIVACY } from '../src/data/tools.js';

// Read the icon keys straight from the file (avoids importing React icons in Node)
const iconSrc = readFileSync(new URL('../src/lib/icons.js', import.meta.url), 'utf8');
const iconBlock = iconSrc.match(/export const ICONS = \{([\s\S]*?)\};/)?.[1] ?? '';
const ICON_KEYS = new Set(iconBlock.split(/[\s,]+/).filter(Boolean));

const errors = [];
const seen = new Set();
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

tools.forEach((t, i) => {
  const id = `tools[${i}] (${t.slug || t.name || 'unnamed'})`;
  const fail = (msg) => errors.push(`${id}: ${msg}`);

  for (const field of ['slug', 'name', 'tagline', 'description', 'category', 'icon', 'status', 'privacy']) {
    if (!t[field] || typeof t[field] !== 'string') fail(`missing "${field}"`);
  }
  if (t.slug) {
    if (!SLUG.test(t.slug)) fail('slug must be lowercase-with-dashes');
    if (seen.has(t.slug)) fail('duplicate slug');
    seen.add(t.slug);
  }
  if (t.category && !CATEGORIES.includes(t.category)) fail(`category "${t.category}" not in CATEGORIES (${CATEGORIES.join(', ')})`);
  if (t.icon && !ICON_KEYS.has(t.icon)) fail(`icon "${t.icon}" not found in src/lib/icons.js`);
  if (t.privacy && !PRIVACY[t.privacy]) fail(`privacy must be one of: ${Object.keys(PRIVACY).join(', ')}`);
  if (!['live', 'soon'].includes(t.status)) fail('status must be "live" or "soon"');
  if (t.status === 'live' && !/^https:\/\/\S+$/.test(t.url || '')) fail('live tools need an https:// url');
  if (t.addedAt && Number.isNaN(new Date(t.addedAt).getTime())) fail('addedAt must be YYYY-MM-DD');
  if (t.week !== undefined && !Number.isInteger(t.week)) fail('week must be a whole number');
  if (!Array.isArray(t.features) || t.features.length === 0) fail('features must be a non-empty array');
  if (t.tagline && t.tagline.length > 70) fail(`tagline is ${t.tagline.length} chars (keep it under 70 so cards stay tidy)`);
});

if (errors.length) {
  console.error('\n✖ tools.js has problems:\n');
  errors.forEach((e) => console.error('  • ' + e));
  console.error('');
  process.exit(1);
}
console.log(`✔ tools.js OK — ${tools.length} tools (${tools.filter((t) => t.status === 'live').length} live)`);

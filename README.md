# 🧰 ToolShelf

One home for every tool in the **Useful Web Tools** series. Visitors browse, search, and open tools; you add a new one by editing a single file.

React + Vite + Tailwind + React Router. No backend, no database.

## Add a new tool (30 seconds)

1. Open `src/data/tools.js`
2. Copy any object in the `tools` array and paste it at the **top** (newest first)
3. Change `slug`, `name`, `tagline`, `description`, `url`, `features`
4. `git push` — Vercel redeploys automatically

```js
{
  slug: 'my-new-tool',            // becomes /tools/my-new-tool
  name: 'My New Tool',
  tagline: 'One line, under 70 characters',
  description: 'One or two sentences for the tool page.',
  category: 'PDF',                // PDF | Images | Files | Utilities
  icon: 'Wrench',                 // a key from src/lib/icons.js
  url: 'https://my-new-tool.vercel.app/',
  status: 'live',                 // 'live' | 'soon'
  privacy: 'local',               // 'local' | 'server'
  week: 6,                        // optional
  addedAt: '2026-12-01',          // optional: shows a "New" badge for 14 days
  features: ['Does this', 'And that'],
  tags: ['extra', 'search', 'words'],
}
```

- **Teasing a future tool?** Use `status: 'soon'` and `url: ''`. It shows as a greyed "Coming soon" card.
- **Need a new category?** Add it to `CATEGORIES` in `tools.js`.
- **Need a new icon?** Import it from `lucide-react` in `src/lib/icons.js` and add it to `ICONS`.
- **Made a typo?** `npm run build` validates the file and fails with a clear message instead of shipping a broken site (run `npm run validate` any time).

## Run locally

```bash
npm install
npm run dev
```

## Deploy on Vercel

1. Push this folder to a GitHub repo
2. Import it at [vercel.com/new](https://vercel.com/new). Vite is auto-detected (build `npm run build`, output `dist`)
3. Add an environment variable `SITE_URL` = your final domain (e.g. `https://toolshelf.vercel.app`) so the sitemap has the right URLs
4. Deploy

`vercel.json` already contains the rewrite that makes direct links like `/tools/quickdrop` work.

## What's inside

- **Home**: hero, search (`Ctrl/⌘ K` or `/` from anywhere), category filters, tool grid, "coming soon" section. Search and filter live in the URL (`/?q=pdf&c=PDF`) so results are shareable
- **Tool page** (`/tools/:slug`): description, highlights, honest privacy note, Launch button, Share, and a lazy-loaded "Try it here" preview
- **Dark / light mode**, remembered between visits, no flash on load
- **Privacy badges**: "Runs in your browser" vs "Temporary upload"
- `sitemap.xml` and `robots.txt` are generated from the registry on every build

## Good to know

- It's a client-rendered React app. Google does render JavaScript, but if SEO becomes a priority later, pre-rendering the tool pages is the upgrade path.
- "Try it here" embeds the tool in an iframe. If you ever add `X-Frame-Options` headers to a tool, its preview will be blocked; the Launch button still works.
- Each tool keeps its own deployment and URL. ToolShelf only links to them.

## Structure

```
src/
├── data/tools.js        ← the only file you edit regularly
├── data/site.js         ← name, tagline, LinkedIn link
├── lib/icons.js         ← icon registry
├── components/          ← Header, Footer, ToolCard, SearchBar, Badges
├── pages/               ← Home, ToolPage, NotFound
scripts/
├── validate-tools.mjs   ← runs before every build
└── generate-sitemap.mjs ← runs before every build
```

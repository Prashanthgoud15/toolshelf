# ToolShelf

A single home for the **Useful Web Tools** series: free online tools for PDFs, images and files. No ads, no sign-ups, and most tools run entirely in your browser.

**Live site:** _add your Vercel URL here_

---

## Tools

| Tool | What it does | Privacy |
| --- | --- | --- |
| [QuickDrop](https://quickdrop-woad.vercel.app/) | Send text or files to any device with a 4-digit code | Temporary upload |
| [QR Generator](https://qrgenerator-indol-chi.vercel.app/) | Turn any link or text into a QR code | In your browser |
| [PDF Merger](https://pdfmerger-snowy.vercel.app/) | Combine multiple PDFs into one file | In your browser |
| [Image Compressor](https://image-compressor-blond-two.vercel.app/) | Shrink images to an exact size, like under 50 KB | In your browser |
| [Image to PDF](https://image-to-pdf-gray.vercel.app/) | Turn any image format into one clean PDF | In your browser |
| [PDF Splitter](https://pdf-splitter-pied.vercel.app/) | Pick the pages you need and download a new PDF | In your browser |

Each tool is its own app with its own URL. ToolShelf is the directory that links them together.

## Features

- Search with `Ctrl/Cmd + K` or `/` from any page
- Category filters; search and filters live in the URL, so results are shareable
- A page for every tool with highlights, a privacy note, a Share button and an optional "Try it here" preview
- Dark and light mode, remembered between visits
- Privacy label on every tool: runs in your browser, or uses temporary upload
- `sitemap.xml` and `robots.txt` generated automatically on every build
- The tool list is validated before each build, so a typo can't break the site

## Tech stack

- [React](https://react.dev/) 18
- [Vite](https://vite.dev/)
- [Tailwind CSS](https://tailwindcss.com/) 3
- [React Router](https://reactrouter.com/) 7
- [lucide-react](https://lucide.dev/) icons

No backend and no database.

## Getting started

```bash
git clone https://github.com/<your-username>/toolshelf.git
cd toolshelf
npm install
npm run dev
```

Open the local URL that Vite prints (usually `http://localhost:5173`).

### Build for production

```bash
npm run build
```

The build validates the tool list, regenerates the sitemap, and outputs to `dist/`.

## Adding a new tool

Every tool is one object in `src/data/tools.js`. That is the only file you need to edit.

1. Open `src/data/tools.js`.
2. Copy an existing object and paste it at the top of the `tools` array (newest first).
3. Change the fields.
4. Push to GitHub. Vercel redeploys automatically.

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
  week: 6,                        // optional: shows a "Week 6" label
  addedAt: '2026-12-01',          // optional: shows a "New" label for 14 days
  features: ['Does this', 'And that'],
  tags: ['extra', 'search', 'words'],
}
```

- **Announcing a tool early:** use `status: 'soon'` and `url: ''`. It appears as a greyed-out "Coming soon" card.
- **New category:** add it to `CATEGORIES` in `src/data/tools.js`.
- **New icon:** import it from `lucide-react` in `src/lib/icons.js` and add it to `ICONS`.
- **Check your changes:** run `npm run validate`. It reports any mistake in plain language.

## Deploy on Vercel

1. Push the repo to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new). Vite is detected automatically (build command `npm run build`, output directory `dist`).
3. Add an environment variable `SITE_URL` set to your final domain, for example `https://toolshelf.vercel.app`. It is used for the sitemap.
4. Click **Deploy**.

`vercel.json` already includes the rewrite that makes direct links such as `/tools/quickdrop` work.

## Project structure

```
toolshelf/
├── public/
│   └── favicon.svg
├── scripts/
│   ├── validate-tools.mjs     # checks tools.js before every build
│   └── generate-sitemap.mjs   # writes sitemap.xml and robots.txt
├── src/
│   ├── components/            # Header, Footer, ToolCard, SearchBar, Badges
│   ├── data/
│   │   ├── tools.js           # the tool list (edit this)
│   │   └── site.js            # site name and links
│   ├── lib/                   # icons, theme, helpers
│   ├── pages/                 # Home, ToolPage, NotFound
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── vercel.json
└── package.json
```

## Notes

- ToolShelf is a client-rendered React app. Search engines can render it, but if SEO becomes a priority, pre-rendering the tool pages is the next step.
- "Try it here" embeds a tool in an iframe. If a tool ever blocks being embedded (the `X-Frame-Options` header), the preview will be empty. The Launch button still works.

## Author

Built by **Prashanth Goud** · [LinkedIn](https://www.linkedin.com/in/prashanth-goud-372485294/)
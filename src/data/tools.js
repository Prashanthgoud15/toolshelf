/**
 * ============================================================
 *  TOOL REGISTRY  —  the only file you edit to add a new tool
 * ============================================================
 *
 * To ship Week N:
 *   1. Copy any object below and paste it at the TOP of `tools`
 *      (newest first = shown first on the home page).
 *   2. Change slug, name, tagline, description, url, etc.
 *   3. git push → Vercel redeploys in ~30 seconds.
 *
 * Fields
 *   slug        unique, lowercase-with-dashes. Becomes /tools/<slug>
 *   name        display name
 *   tagline     one line shown on the card (keep it under ~60 chars)
 *   description 1–2 sentences shown on the tool page
 *   category    one of CATEGORIES below
 *   icon        a key from src/lib/icons.js (add new icons there)
 *   url         the live link of the tool (https://…)
 *   status      "live" | "soon"   ("soon" = greyed-out card, no link)
 *   privacy     "local"  → runs fully in the browser
 *               "server" → temporarily uploads data to a server
 *   week        (optional) series week number, shows a "Week N" pill
 *   addedAt     (optional) "YYYY-MM-DD" → shows a "New" badge for 14 days
 *   features    short bullet points shown on the tool page
 *   tags        extra search keywords (not shown)
 *
 * Typos are caught automatically: `npm run build` validates this file.
 */

export const CATEGORIES = ['PDF', 'Images', 'Files', 'Utilities'];

export const PRIVACY = {
  local: {
    label: 'Runs in your browser',
    detail: 'Your files are processed on your device and never uploaded.',
  },
  server: {
    label: 'Temporary upload',
    detail: 'Content is stored briefly on a server so another device can fetch it, then deleted automatically.',
  },
};

export const tools = [
  {
    slug: 'quickdrop',
    name: 'QuickDrop',
    tagline: 'Send text or files to any device with a 4-digit code',
    description:
      'Paste text or drop files, get a four-digit code, and enter it on any other device to retrieve everything. No account, no app, no hassle.',
    category: 'Files',
    icon: 'Send',
    url: 'https://quickdrop-woad.vercel.app/',
    status: 'live',
    privacy: 'server',
    features: [
      'Share text, images, documents and more',
      'Works across different networks and devices',
      'No account or install required',
      'Transfers are deleted automatically',
    ],
    tags: ['share', 'transfer', 'clipboard', 'send files', 'airdrop'],
  },
  {
    slug: 'qr-generator',
    name: 'QR Generator',
    tagline: 'Turn any link or text into a QR code instantly',
    description: 'Generate a clean QR code for a link or text in a couple of seconds, right in your browser.',
    category: 'Utilities',
    icon: 'QrCode',
    url: 'https://qrgenerator-indol-chi.vercel.app/',
    status: 'live',
    privacy: 'local',
    features: ['Generate QR codes instantly', 'No sign-up, no watermark'],
    tags: ['qr', 'qrcode', 'link', 'barcode'],
  },
  {
    slug: 'pdf-merger',
    name: 'PDF Merger',
    tagline: 'Combine multiple PDFs into a single file',
    description: 'Merge several PDF files into one document quickly, without uploading anything.',
    category: 'PDF',
    icon: 'Combine',
    url: 'https://pdfmerger-snowy.vercel.app/',
    status: 'live',
    privacy: 'local',
    features: ['Merge multiple PDF files', 'Processed entirely in your browser'],
    tags: ['merge', 'combine', 'join', 'pdf'],
  },
  {
    slug: 'image-compressor',
    name: 'Image Compressor',
    tagline: 'Shrink images to an exact size, like under 50 KB',
    description:
      'Compress by quality or type the exact file size you need. Perfect for government forms and college portals with strict upload limits.',
    category: 'Images',
    icon: 'Minimize2',
    url: 'https://image-compressor-blond-two.vercel.app/',
    status: 'live',
    privacy: 'local',
    week: 3,
    features: [
      'Hit an exact target size in KB or MB',
      'Or just drag a quality slider',
      'Batch compress and download as one ZIP',
      'Auto, WebP or JPEG output',
    ],
    tags: ['compress', 'reduce size', 'resize', 'kb', 'jpg', 'png', 'webp'],
  },
  {
    slug: 'image-to-pdf',
    name: 'Image to PDF',
    tagline: 'Turn any image format into one clean PDF',
    description:
      'Drop in JPG, PNG, WEBP, GIF, BMP or SVG images, reorder them, and download a single PDF.',
    category: 'PDF',
    icon: 'FileImage',
    url: 'https://image-to-pdf-gray.vercel.app/',
    status: 'live',
    privacy: 'local',
    week: 2,
    features: [
      'Works with any image format your browser can open',
      'Drag to reorder pages',
      'Fit-to-image or A4 page sizes',
      'Dark mode and keyboard shortcuts',
    ],
    tags: ['jpg to pdf', 'png to pdf', 'convert', 'photos to pdf', 'scan'],
  },
  {
    slug: 'pdf-splitter',
    name: 'PDF Splitter',
    tagline: 'Pick the pages you need and download a new PDF',
    description:
      'Upload a PDF, preview every page, select exactly the ones you want, and download them as a new PDF in seconds.',
    category: 'PDF',
    icon: 'Scissors',
    url: 'https://pdf-splitter-pied.vercel.app/',
    status: 'live',
    privacy: 'local',
    week: 1,
    features: [
      'Preview every page before you choose',
      'Select any combination of pages',
      'Dark mode and keyboard shortcuts',
    ],
    tags: ['split', 'extract pages', 'cut', 'pdf'],
  },
  {
    slug: 'image-studio',
    name: 'Image Studio',
    tagline: 'Crop, resize, remove backgrounds and upscale in one place',
    description:
      'A full in-browser image workspace: crop, resize, adjust, AI background removal, AI upscaling, passport photos and captions.',
    category: 'Images',
    icon: 'Sparkles',
    url: '',
    status: 'soon',
    privacy: 'local',
    week: 4,
    features: [
      'Crop, resize, flip and adjust',
      'AI background remover and upscaler',
      'Passport photo maker',
      'Full undo/redo history',
    ],
    tags: ['editor', 'background remover', 'upscale', 'passport photo', 'crop'],
  },
];

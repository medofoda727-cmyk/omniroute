# Foda Agency — Website

Cinematic bilingual (English / Arabic) portfolio site for **Foda للدعاية والإعلان**, Damietta, Egypt.

Built with Next.js 16 (App Router, static export), React 19, TypeScript, Tailwind CSS v4, Motion and Lenis.

```bash
npm install
npm run dev      # http://localhost:3000  (Arabic at /ar/)
npm run build    # static site → ./out  (upload anywhere: Netlify, Vercel, Cloudflare Pages, cPanel…)
npm run lint
```

## Hosting

- **GitHub Pages (automatic):** every push to `main` builds and publishes the site to
  `https://medofoda727-cmyk.github.io/agency/` (workflow: `.github/workflows/deploy-pages.yml`).
  One-time setup: repo **Settings → Pages → Source: GitHub Actions**.
- **Vercel / Netlify / custom domain:** import the repo with the default settings. No base path is needed.
  If you host under a sub-path, set `NEXT_PUBLIC_BASE_PATH` (e.g. `/agency`).

## Where to edit things

All content lives in `src/content/`. You never need to touch the layout components to update the site.

| File | What it controls |
| --- | --- |
| `src/content/portfolio.ts` | **Every portfolio project.** Add one object per project. |
| `src/content/categories.ts` | Portfolio categories and their EN/AR labels, plus the filter order. A category only appears once it has at least one project. |
| `src/content/site.ts` | Phone, WhatsApp, Facebook, email, Google Maps, stats, showreel, hero background video, domain. |
| `src/content/dictionary.ts` | All interface text in English and Arabic. |
| `public/brand/` | Logo files (the gold mark was cut from the official logo). |

### Add a project

```ts
{
  id: "food-01",                                   // unique
  title: { en: "Burger Launch", ar: "إطلاق برجر" },
  category: "food",                                // an id from categories.ts
  type: "video",                                   // "video" | "image" | "gallery"
  videoUrl: "https://drive.google.com/file/d/XXXX/view", // Drive, YouTube, Vimeo or .mp4
  thumbnail: "/work/food-01.jpg",                  // optional (recommended)
  aspectRatio: "9:16",                             // "9:16" | "16:9" | "1:1" | "4:5" | "4:3"
  featured: true,                                  // optional: shown first
}
```

For design work, use `type: "image"` or `"gallery"` with `images: ["/work/a.jpg", "/work/b.jpg"]`.
To hide a project without deleting it, set `published: false`.
To add a muted hover preview, set `previewUrl: "/work/clip.mp4"`.

## Placeholders still to fill in (`src/content/site.ts`)

- [ ] **Domain**: set `NEXT_PUBLIC_SITE_URL` (or edit the fallback), used for SEO, canonical URLs and the sitemap.
- [ ] **Facebook page URL** (`contact.facebook`): hidden until set.
- [ ] **Email** (`contact.email`), optional: hidden until set.
- [ ] **Google Maps embed** (`location.mapEmbedUrl`), optional. In Google Maps, choose Share → Embed a map and copy the `src` value. The short Maps link is already wired in.
- [ ] **Showreel** (`showreel.videoUrl`). Until it is set, the showreel section presents the first featured project as "Featured film".
- [ ] **Project titles**: the current titles are descriptive placeholders ("Furniture Reel 01"…). Rename them in `portfolio.ts`.
- [ ] **Custom thumbnails** (recommended): put JPG/WebP files in `public/work/` and reference them with `thumbnail`.

## About video hosting

The portfolio currently plays videos straight from the shared Google Drive folder. For this to work, the files must stay shared as "Anyone with the link". Drive is fine to start with, but it can throttle playback and thumbnails on busy sites. For the public launch, it's better to upload the videos to YouTube (unlisted) or Vimeo, or to a video CDN such as Bunny or Cloudflare Stream, and paste those links instead. No code changes are needed.

## Structure

```
src/
  app/(en)/          English root layout + page   →  /
  app/(ar)/ar/       Arabic root layout + page    →  /ar/   (RTL)
  app/sitemap.ts, robots.ts, manifest.ts, global-not-found.tsx
  components/
    sections/        Hero, Marquee, Showreel, Work, About, Stats, Contact
    layout/          Nav, Footer
    video/           VideoModal (accessible cinematic player)
    media/           Thumb, Magnetic
    providers/       SmoothScroll (Lenis + scroll reveals)
  content/           ← all editable content
  lib/               media helpers (Drive/YouTube/Vimeo detection), fonts
```

The language choice is remembered. Visitors whose browser is set to Arabic are sent to `/ar/` automatically. Motion is turned off for visitors who prefer reduced motion.

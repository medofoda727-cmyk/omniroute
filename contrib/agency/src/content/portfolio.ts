import type { CategoryId } from "./categories";

/**
 * ─────────────────────────────────────────────────────────────
 *  PORTFOLIO — the single source of truth for the Work section.
 *
 *  Add a project = add one object to `portfolioItems`. No layout
 *  code needs to change.
 *
 *  videoUrl accepts:
 *    • Google Drive share links  https://drive.google.com/file/d/<ID>/view
 *      (file must be shared as "Anyone with the link")
 *    • YouTube links            https://youtu.be/<ID> | youtube.com/watch?v=<ID> | /shorts/<ID>
 *    • Vimeo links              https://vimeo.com/<ID>
 *    • Direct video files       /videos/file.mp4  or  https://cdn…/file.mp4
 *
 *  thumbnail: optional. Drive + YouTube thumbnails are generated
 *  automatically; set a custom image (e.g. /work/project.jpg) for
 *  the best quality — recommended for the final launch.
 *
 *  images: for design / gallery items (type "image" | "gallery").
 *  previewUrl: optional short muted .mp4 that plays on hover.
 * ─────────────────────────────────────────────────────────────
 */

export type AspectRatio = "9:16" | "16:9" | "1:1" | "4:5" | "4:3";
export type MediaType = "video" | "image" | "gallery";

export interface PortfolioItem {
  id: string;
  title: { en: string; ar: string };
  category: CategoryId;
  type: MediaType;
  videoUrl?: string;
  thumbnail?: string;
  images?: string[];
  previewUrl?: string;
  aspectRatio?: AspectRatio;
  description?: { en: string; ar: string };
  featured?: boolean;
  /** Set false to hide an item without deleting it. */
  published?: boolean;
}

const drive = (id: string) => `https://drive.google.com/file/d/${id}/view`;

export const portfolioItems: PortfolioItem[] = [
  /* ── Furniture & Interiors ─────────────────────────────── */
  {
    id: "furniture-01",
    title: { en: "Furniture Reel 01", ar: "ريل أثاث ٠١" },
    category: "furniture",
    type: "video",
    videoUrl: drive("1TC5W8-kDP5bWY7pxgI6pV2purJ6YFn1i"),
    aspectRatio: "9:16",
    featured: true,
  },
  {
    id: "furniture-02",
    title: { en: "Furniture Reel 02", ar: "ريل أثاث ٠٢" },
    category: "furniture",
    type: "video",
    videoUrl: drive("1FcRFo8mz46KxUw0ImjQrEfRsDg1z2qZ-"),
    aspectRatio: "9:16",
  },
  {
    id: "furniture-03",
    title: { en: "Furniture Reel 03", ar: "ريل أثاث ٠٣" },
    category: "furniture",
    type: "video",
    videoUrl: drive("1v1tMCa1NMCsgg8rdu4b-40vbMGBgZq1X"),
    aspectRatio: "9:16",
  },
  {
    id: "furniture-04",
    title: { en: "Furniture Reel 04", ar: "ريل أثاث ٠٤" },
    category: "furniture",
    type: "video",
    videoUrl: drive("1vN0D2c95YGIxEh04c8fM8fqp9bOeF54t"),
    aspectRatio: "9:16",
  },
  {
    id: "furniture-05",
    title: { en: "Furniture Reel 05", ar: "ريل أثاث ٠٥" },
    category: "furniture",
    type: "video",
    videoUrl: drive("1S27MSpQY9HYu3riW8Y0ue787Ms7PovVS"),
    aspectRatio: "9:16",
  },
  {
    id: "furniture-06",
    title: { en: "Furniture Spot", ar: "إعلان أثاث" },
    category: "furniture",
    type: "video",
    videoUrl: drive("1OHv6Z26rvSCMsy6P0GMc8MNg-Wou1NeE"),
    aspectRatio: "9:16",
  },

  /* ── Curtains ───────────────────────────────────────────── */
  {
    id: "curtains-01",
    title: { en: "Curtains Film 01", ar: "فيلم ستائر ٠١" },
    category: "curtains",
    type: "video",
    videoUrl: drive("1HB6K7WRh-UJHQFavXZCH5naDhbM-DbSi"),
    aspectRatio: "9:16",
    featured: true,
  },
  {
    id: "curtains-02",
    title: { en: "Curtains Film 02", ar: "فيلم ستائر ٠٢" },
    category: "curtains",
    type: "video",
    videoUrl: drive("1q8NB2DJ2p0QkkcltLwMAWiEdE2366wt2"),
    aspectRatio: "9:16",
  },

  /* ── Education ──────────────────────────────────────────── */
  {
    id: "education-01",
    title: { en: "Education Reel 01", ar: "ريل تعليمي ٠١" },
    category: "education",
    type: "video",
    videoUrl: drive("12PVl7YfQWnL_FfFsPnigU_g4xY1PTia-"),
    aspectRatio: "9:16",
    featured: true,
  },
  {
    id: "education-02",
    title: { en: "Education Reel 02", ar: "ريل تعليمي ٠٢" },
    category: "education",
    type: "video",
    videoUrl: drive("1bvQ1W7rIRGQEgMr1YFrv3YvnqA3B9vAP"),
    aspectRatio: "9:16",
  },
  {
    id: "education-03",
    title: { en: "Education Reel 03", ar: "ريل تعليمي ٠٣" },
    category: "education",
    type: "video",
    videoUrl: drive("1_reIQSOjz_AYIGo_yhVt78wlzWUsw7rz"),
    aspectRatio: "9:16",
  },
  {
    id: "education-04",
    title: { en: "Education Reel 04", ar: "ريل تعليمي ٠٤" },
    category: "education",
    type: "video",
    videoUrl: drive("1nHxu54xJDTzUAmgB1sUQxqpxG08z2vjh"),
    aspectRatio: "9:16",
  },
  {
    id: "education-05",
    title: { en: "Education Reel 05", ar: "ريل تعليمي ٠٥" },
    category: "education",
    type: "video",
    videoUrl: drive("1kcsqk7bgOJZ35HZVp-XDCFhhxSkhfPCa"),
    aspectRatio: "9:16",
  },
  {
    id: "education-06",
    title: { en: "Education Reel 06", ar: "ريل تعليمي ٠٦" },
    category: "education",
    type: "video",
    videoUrl: drive("1MEcnLcfBJS2i33S0sHPAjnbSEfZShumm"),
    aspectRatio: "9:16",
  },
  {
    id: "education-07",
    title: { en: "Education Reel 07", ar: "ريل تعليمي ٠٧" },
    category: "education",
    type: "video",
    videoUrl: drive("1ip2a5gOpJH6GJNyIvEm_0BGJbK-0syf9"),
    aspectRatio: "9:16",
  },
  {
    id: "education-08",
    title: { en: "Education Reel 08", ar: "ريل تعليمي ٠٨" },
    category: "education",
    type: "video",
    videoUrl: drive("1hnXT3uKUDhAoJdCf0KmgQLGNuobgn0fi"),
    aspectRatio: "9:16",
  },

  /* ── AI Videos ──────────────────────────────────────────── */
  {
    id: "ai-agri-waste",
    title: { en: "Agricultural Waste — AI Film", ar: "المخلفات الزراعية — فيلم AI" },
    category: "ai",
    type: "video",
    videoUrl: drive("1tLg3jewV2TyLqjMmk5yG4ko9y378JarC"),
    aspectRatio: "9:16",
    featured: true,
  },
  {
    id: "ai-engineering",
    title: { en: "Engineering — AI Film", ar: "هندسي — فيلم AI" },
    category: "ai",
    type: "video",
    videoUrl: drive("1HXUCVpFKFB_Gzq2LpdEGVrxYkOSELF6z"),
    aspectRatio: "9:16",
  },
  {
    id: "ai-learning-center",
    title: { en: "Learning Center — AI Promo", ar: "سنتر تعليمي — إعلان AI" },
    category: "ai",
    type: "video",
    videoUrl: drive("1amlmTZhi10bEk6j5BNY8nPvXNTe8xuF3"),
    aspectRatio: "9:16",
  },
  {
    id: "ai-education",
    title: { en: "Education — AI Promo", ar: "تعليمي — إعلان AI" },
    category: "ai",
    type: "video",
    videoUrl: drive("1kRCrTxanS_TlKOUQKQaXWXmdBR7N6X78"),
    aspectRatio: "9:16",
  },
  {
    id: "ai-teacher",
    title: { en: "The Teacher — AI Promo", ar: "مدرس — إعلان AI" },
    category: "ai",
    type: "video",
    videoUrl: drive("1xynoQ2_J0mQAWQEeHa81r-WQgw8wvJfh"),
    aspectRatio: "9:16",
  },
  {
    id: "ai-spot-01",
    title: { en: "AI Spot 01", ar: "إعلان AI ٠١" },
    category: "ai",
    type: "video",
    videoUrl: drive("1ZqzgS_AeSnQd6w8xg85dWON-Zcnk6VEL"),
    aspectRatio: "9:16",
  },
  {
    id: "ai-spot-02",
    title: { en: "AI Spot 02", ar: "إعلان AI ٠٢" },
    category: "ai",
    type: "video",
    videoUrl: drive("1X7SuX9qkEecRZSCA6j5KgpqAT5QCz1_C"),
    aspectRatio: "9:16",
  },

  /* ── Other ──────────────────────────────────────────────── */
  {
    id: "other-01",
    title: { en: "Brand Reel", ar: "ريل براند" },
    category: "other",
    type: "video",
    videoUrl: drive("1KdJKLXz36gHsFjWY9U2NAzULA9Ze6ios"),
    aspectRatio: "9:16",
  },
];

export const publishedItems = portfolioItems.filter((i) => i.published !== false);

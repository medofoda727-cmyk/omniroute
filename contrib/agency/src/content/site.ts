/**
 * ─────────────────────────────────────────────────────────────
 *  FODA AGENCY — SITE CONFIGURATION
 *  Everything business-related lives here: contact channels,
 *  stats, showreel, hero media. Edit values, not components.
 *
 *  Anything marked `TODO` is a placeholder waiting for real data.
 *  Empty strings ('') are treated as "not configured" and the
 *  related UI is hidden automatically (no dead links).
 * ─────────────────────────────────────────────────────────────
 */

export const siteConfig = {
  name: "Foda Agency",
  nameAr: "Foda للدعاية والإعلان",

  /**
   * Public URL of the site, used for SEO (canonical, sitemap, Open Graph).
   * TODO: set NEXT_PUBLIC_SITE_URL (or edit the fallback) once the domain is registered.
   */
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://foda-agency.example").replace(/\/$/, ""),

  /** Approx. years of experience — also used in the copy. */
  yearsOfExperience: 6,

  contact: {
    /** Display format of the phone number. */
    phoneDisplay: "0108 068 9406",
    /** E.164 format, used for tel: links and structured data. */
    phoneE164: "+201080689406",
    /** WhatsApp number in international format, digits only (no +, no spaces). */
    whatsapp: "201080689406",
    /** Pre-filled WhatsApp message, per language. */
    whatsappMessage: {
      en: "Hello Foda Agency, I would like to discuss a project.",
      ar: "أهلاً Foda، حابب أتكلم معاكم عن مشروع.",
    },
    /** TODO: add the official Facebook page URL. Hidden while empty. */
    facebook: "",
    /** TODO: optional email address. Hidden while empty. */
    email: "",
    /** TODO: optional Instagram URL. Hidden while empty. */
    instagram: "",
  },

  location: {
    city: { en: "Damietta", ar: "دمياط" },
    country: { en: "Egypt", ar: "مصر" },
    /** Google Maps share link (opens the agency location). */
    mapsUrl: "https://maps.app.goo.gl/bZUfxFZ3LZQxGkfM6?g_st=ic",
    /**
     * TODO: optional Google Maps embed URL.
     * Google Maps → Share → "Embed a map" → copy only the src="…" value.
     * When set, an interactive map is shown in the contact section.
     */
    mapEmbedUrl: "",
  },

  /** Statistics — shown with animated counters. */
  stats: [
    { value: 136, suffix: "+", label: { en: "Clients", ar: "عميل" } },
    { value: 400, suffix: "+", label: { en: "Video projects", ar: "مشروع فيديو" } },
    { value: 6, suffix: "", label: { en: "Years of experience", ar: "سنين خبرة" } },
    { value: 600, suffix: "+", label: { en: "Ad campaigns", ar: "حملة إعلانية" } },
  ],

  showreel: {
    /**
     * TODO: the official agency showreel (YouTube, Vimeo, Google Drive or .mp4 URL).
     * While empty, the section presents the first `featured` portfolio item
     * and labels it "Featured film" instead of "Showreel".
     */
    videoUrl: "",
    /** Optional poster image for the showreel (otherwise derived from the video). */
    poster: "",
  },

  hero: {
    /**
     * Optional muted background loop for the hero (.mp4 / .webm, ideally < 4 MB, no audio).
     * While empty, the hero uses an animated composition of the real portfolio thumbnails.
     */
    backgroundVideo: "",
  },
} as const;

export type SiteConfig = typeof siteConfig;

export function whatsappLink(lang: "en" | "ar") {
  const msg = encodeURIComponent(siteConfig.contact.whatsappMessage[lang]);
  return `https://wa.me/${siteConfig.contact.whatsapp}?text=${msg}`;
}

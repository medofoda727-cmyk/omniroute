import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = { en: `${siteConfig.url}/`, ar: `${siteConfig.url}/ar/` };
  return [
    { url: `${siteConfig.url}/`, changeFrequency: "monthly", priority: 1, alternates: { languages } },
    { url: `${siteConfig.url}/ar/`, changeFrequency: "monthly", priority: 0.9, alternates: { languages } },
  ];
}

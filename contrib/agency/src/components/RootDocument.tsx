import type { Metadata, Viewport } from "next";
import type { CSSProperties, ReactNode } from "react";
import { getDictionary, langPath, type Lang } from "@/content/dictionary";
import { siteConfig } from "@/content/site";
import { publishedItems } from "@/content/portfolio";
import { thumbnailFor } from "@/lib/media";
import { asset, basePath } from "@/lib/base";

export const viewport: Viewport = {
  themeColor: "#09090a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export function buildMetadata(lang: Lang): Metadata {
  const t = getDictionary(lang);
  const url = `${siteConfig.url}${langPath(lang)}`;
  return {
    metadataBase: new URL(siteConfig.url),
    title: t.meta.title,
    description: t.meta.description,
    applicationName: siteConfig.name,
    keywords:
      lang === "ar"
        ? ["دعاية وإعلان دمياط", "شركة دعاية دمياط", "إنتاج فيديو", "تصوير إعلانات", "تسويق إلكتروني", "ريلز", "فودة"]
        : ["advertising agency Damietta", "media production Egypt", "video production Damietta", "creative agency Egypt", "reels", "AI video", "Foda Agency"],
    alternates: {
      canonical: url,
      languages: { en: `${siteConfig.url}/`, ar: `${siteConfig.url}/ar/`, "x-default": `${siteConfig.url}/` },
    },
    openGraph: {
      type: "website",
      url,
      siteName: siteConfig.name,
      title: t.meta.title,
      description: t.meta.description,
      locale: lang === "ar" ? "ar_EG" : "en_US",
      alternateLocale: lang === "ar" ? "en_US" : "ar_EG",
      images: [{ url: `${siteConfig.url}/brand/og.jpg`, width: 1200, height: 630, alt: t.meta.ogAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: t.meta.title,
      description: t.meta.description,
      images: [`${siteConfig.url}/brand/og.jpg`],
    },
    icons: {
      icon: [{ url: asset("/icon.png"), type: "image/png" }],
      apple: asset("/brand/apple-icon.png"),
    },
    robots: { index: true, follow: true },
    formatDetection: { telephone: false },
  };
}

function jsonLd(lang: Lang) {
  const t = getDictionary(lang);
  const c = siteConfig.contact;
  const sameAs = [c.facebook, c.instagram].filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["ProfessionalService", "LocalBusiness"],
        "@id": `${siteConfig.url}/#business`,
        name: lang === "ar" ? siteConfig.nameAr : siteConfig.name,
        alternateName: lang === "ar" ? siteConfig.name : siteConfig.nameAr,
        description: t.meta.description,
        url: `${siteConfig.url}${langPath(lang)}`,
        logo: `${siteConfig.url}/brand/icon-512.png`,
        image: `${siteConfig.url}/brand/og.jpg`,
        telephone: c.phoneE164,
        ...(c.email ? { email: c.email } : {}),
        address: {
          "@type": "PostalAddress",
          addressLocality: siteConfig.location.city.en,
          addressCountry: "EG",
        },
        areaServed: [
          { "@type": "City", name: "Damietta" },
          { "@type": "Country", name: "Egypt" },
        ],
        hasMap: siteConfig.location.mapsUrl,
        knowsAbout: ["Advertising", "Video production", "Digital marketing", "Content creation", "Graphic design", "AI video"],
        ...(sameAs.length ? { sameAs } : {}),
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        inLanguage: ["en", "ar"],
        publisher: { "@id": `${siteConfig.url}/#business` },
      },
      {
        "@type": "ItemList",
        name: t.work.title,
        itemListElement: publishedItems.slice(0, 30).map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": item.type === "video" ? "VideoObject" : "ImageObject",
            name: item.title[lang],
            ...(item.type === "video"
              ? { thumbnailUrl: thumbnailFor(item, 1080), contentUrl: item.videoUrl }
              : { contentUrl: thumbnailFor(item, 1080) }),
          },
        })),
      },
    ],
  };
}

/** Runs before paint: JS flag, intro skip on repeat visits, language preference. */
const bootScript = (lang: Lang) => `(function(){try{var d=document.documentElement;d.classList.add('js');
var s=sessionStorage;if(s.getItem('foda-intro')){d.classList.add('skip-intro')}else{s.setItem('foda-intro','1')}
if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('skip-intro')}
${
  lang === "en"
    ? `var p=localStorage.getItem('foda-lang');if(!p&&(navigator.language||'').toLowerCase().indexOf('ar')===0){p='ar'}
var b='${basePath}';if(p==='ar'&&(location.pathname===b+'/'||location.pathname===b)){d.classList.add('skip-intro');location.replace(b+'/ar/'+location.hash)}`
    : ""
}}catch(e){}})();`;

export function RootDocument({
  lang,
  fontVars,
  children,
}: {
  lang: Lang;
  fontVars: string;
  children: ReactNode;
}) {
  const style =
    lang === "en"
      ? ({ "--font-display-family": "var(--font-latin-family)", "--font-body-family": "var(--font-latin-family)" } as CSSProperties)
      : undefined;
  return (
    <html lang={lang} dir={lang === "ar" ? "rtl" : "ltr"} className={fontVars} style={style} suppressHydrationWarning>
      {/* eslint-disable-next-line @next/next/no-head-element -- App Router root layout */}
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript(lang) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(lang)) }} />
      </head>
      <body>{children}</body>
    </html>
  );
}

import type { Lang } from "@/content/dictionary";
import { getDictionary } from "@/content/dictionary";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { VideoModalProvider } from "@/components/video/VideoModal";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Showreel } from "@/components/sections/Showreel";
import { Work } from "@/components/sections/Work";
import { About } from "@/components/sections/About";
import { Stats } from "@/components/sections/Stats";
import { Contact } from "@/components/sections/Contact";
import { asset } from "@/lib/base";

export function SitePage({ lang }: { lang: Lang }) {
  const t = getDictionary(lang);
  return (
    <VideoModalProvider lang={lang}>
      <SmoothScroll />
      <div className="preloader" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={asset("/brand/logo-mark.webp")} alt="" className="preloader__mark" width={360} height={325} />
        <span className="preloader__bar" />
      </div>
      <div className="grain" aria-hidden="true" />
      <a
        href="#main"
        className="fixed start-4 top-4 z-[100] -translate-y-24 rounded-full bg-gold px-5 py-3 text-sm font-medium text-ink transition-transform focus:translate-y-0"
      >
        {t.a11y.skip}
      </a>
      <Nav lang={lang} />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero lang={lang} />
        <Marquee lang={lang} />
        <Showreel lang={lang} />
        <Work lang={lang} />
        <About lang={lang} />
        <Stats lang={lang} />
        <Contact lang={lang} />
      </main>
      <Footer lang={lang} />
    </VideoModalProvider>
  );
}

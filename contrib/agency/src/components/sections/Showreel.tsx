"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Play } from "lucide-react";
import { getDictionary, type Lang } from "@/content/dictionary";
import { siteConfig } from "@/content/site";
import { publishedItems } from "@/content/portfolio";
import { categories } from "@/content/categories";
import { ratioValue, thumbnailFor } from "@/lib/media";
import { Thumb } from "@/components/media/Thumb";
import { useVideoModal } from "@/components/video/VideoModal";

export function Showreel({ lang }: { lang: Lang }) {
  const t = getDictionary(lang).showreel;
  const { open } = useVideoModal();
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Real showreel if configured, otherwise the first featured project.
  const hasReel = Boolean(siteConfig.showreel.videoUrl);
  const featured = publishedItems.find((i) => i.featured && i.videoUrl) ?? publishedItems.find((i) => i.videoUrl);
  const videoUrl = hasReel ? siteConfig.showreel.videoUrl : featured?.videoUrl;
  const poster = hasReel
    ? siteConfig.showreel.poster || thumbnailFor({ videoUrl: siteConfig.showreel.videoUrl }, 1600)
    : featured && thumbnailFor(featured, 1080);
  const title = hasReel ? `${siteConfig.name} — ${t.label}` : (featured?.title[lang] ?? t.label);
  const category = !hasReel && featured ? categories.find((c) => c.id === featured.category)?.label[lang] : undefined;
  const [ratio, setRatio] = useState(hasReel ? 16 / 9 : ratioValue(featured?.aspectRatio));

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.84, 1]);
  const radius = useTransform(scrollYProgress, [0, 1], [36, 14]);
  const y = useTransform(scrollYProgress, [0, 1], [-60, 0]);

  if (!videoUrl) return null;
  const portraitPoster = !hasReel && ratio < 1;

  return (
    <section className="relative py-24 md:py-36" aria-labelledby="showreel-title">
      <div className="mx-auto max-w-[1920px] px-[var(--gutter)]">
        <div className="mb-10 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <p className="eyebrow reveal flex items-center gap-3 text-gold">
            <span className="h-px w-10 bg-gold" aria-hidden="true" />
            {hasReel ? t.label : t.fallbackLabel}
          </p>
          <h2 id="showreel-title" className="font-display text-big max-w-[14ch] font-semibold md:text-end">
            <span className="reveal-line block overflow-hidden">
              <span style={{ ["--i" as string]: 0 }}>{t.title[0]}</span>
            </span>
            <span className="reveal-line block overflow-hidden">
              <span style={{ ["--i" as string]: 1 }} className="accent">
                {t.title[1]}
              </span>
            </span>
          </h2>
        </div>

        <div ref={ref}>
          <motion.button
            type="button"
            onClick={(e) => open({ title, category, videoUrl, ratio }, e.currentTarget)}
            aria-label={`${t.play}: ${title}`}
            style={reduce ? undefined : { scale, borderRadius: radius }}
            className="group relative block aspect-[4/5] w-full overflow-hidden bg-coal text-start sm:aspect-video"
          >
            {/* Poster: vertical posters are staged on a blurred bed of themselves */}
            {portraitPoster && poster && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={poster} alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 size-full scale-125 object-cover opacity-40 blur-3xl" />
            )}
            <motion.div style={reduce ? undefined : { y }} className="absolute inset-0">
              {portraitPoster ? (
                <div className="absolute inset-y-[6%] start-1/2 aspect-[9/16] -translate-x-1/2 overflow-hidden rounded-xl shadow-2xl ring-1 ring-white/10 rtl:translate-x-1/2">
                  <Thumb src={poster} alt={title} label={title} onRatio={setRatio} className="transition-transform duration-[1.6s] ease-[var(--ease-out-expo)] group-hover:scale-105" />
                </div>
              ) : (
                <Thumb src={poster} alt={title} label={title} onRatio={hasReel ? undefined : setRatio} className="transition-transform duration-[1.6s] ease-[var(--ease-out-expo)] group-hover:scale-105" />
              )}
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/20" />

            {/* Play disc with orbiting label */}
            <span className="absolute start-1/2 top-1/2 grid size-32 -translate-x-1/2 -translate-y-1/2 place-items-center md:size-44 rtl:translate-x-1/2">
              <svg viewBox="0 0 200 200" className="absolute inset-0 size-full animate-[spin_18s_linear_infinite] motion-reduce:animate-none" aria-hidden="true">
                <defs>
                  <path id="reel-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
                </defs>
                <text className={`fill-bone ${lang === "ar" ? "text-[17px]" : "font-latin text-[15px] uppercase tracking-[0.32em]"}`}>
                  <textPath href="#reel-circle">
                    {lang === "ar"
                      ? `${t.play} ${hasReel ? "الشوريل" : "الفيلم"} • Foda للدعاية والإعلان • `
                      : `Play ${hasReel ? "showreel" : "film"} • Foda Agency • `}
                  </textPath>
                </text>
              </svg>
              <span className="flex size-16 items-center justify-center rounded-full bg-gold text-ink transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-110 md:size-20">
                <Play className="ms-1 size-6 fill-current md:size-7" />
              </span>
            </span>

            <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 md:p-8">
              <span>
                {category && <span className="eyebrow block text-gold">{category}</span>}
                <span className="font-display mt-1 block text-lg font-medium md:text-2xl">{title}</span>
              </span>
              <span className="hidden text-sm text-mute md:block">{t.caption}</span>
            </span>
          </motion.button>
        </div>
      </div>
    </section>
  );
}

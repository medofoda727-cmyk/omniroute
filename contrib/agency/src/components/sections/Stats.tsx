"use client";

import { useEffect, useRef, useState } from "react";
import { getDictionary, type Lang } from "@/content/dictionary";
import { siteConfig } from "@/content/site";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  // Server-rendered with the final value (SEO / no-JS); animated once visible.
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) return; // already visible — don't reset
    setDisplay(0);
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const dur = 2000;
        const tick = (now: number) => {
          const p = Math.min((now - start) / dur, 1);
          const eased = 1 - Math.pow(2, -10 * p);
          setDisplay(Math.round(value * (p === 1 ? 1 : eased)));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  return (
    <span ref={ref} className="font-latin tabular-nums" dir="ltr">
      {display}
      {suffix && <span className="text-gold">{suffix}</span>}
    </span>
  );
}

export function Stats({ lang }: { lang: Lang }) {
  const t = getDictionary(lang).stats;
  return (
    <section className="relative border-y border-[var(--line)] bg-coal py-20 md:py-32" aria-labelledby="stats-title">
      <div className="mx-auto max-w-[1920px] px-[var(--gutter)]">
        <div className="mb-14 grid gap-6 md:mb-24 md:grid-cols-12">
          <p className="eyebrow reveal flex items-center gap-3 text-gold md:col-span-3">
            <span className="h-px w-10 bg-gold" aria-hidden="true" />
            {t.eyebrow}
          </p>
          <h2 id="stats-title" className="font-display reveal text-big max-w-[18ch] font-semibold md:col-span-8">
            {t.title}
          </h2>
        </div>

        <dl className="grid grid-cols-2 lg:grid-cols-4">
          {siteConfig.stats.map((s, i) => (
            <div
              key={s.label.en}
              className={`reveal flex flex-col-reverse gap-3 border-[var(--line)] px-1 py-8 md:px-8 md:py-4 lg:border-s lg:first:border-s-0 lg:first:ps-0 ${
                i % 2 === 1 ? "border-s ps-5 lg:ps-8" : ""
              } ${i < 2 ? "border-b lg:border-b-0" : ""}`}
              style={{ ["--delay" as string]: `${i * 0.1}s` }}
            >
              <dt className="text-sm text-mute md:text-base">{s.label[lang]}</dt>
              <dd className="font-light text-[clamp(3.2rem,8vw,7.5rem)] leading-none tracking-[-0.05em]">
                <Counter value={s.value} suffix={s.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

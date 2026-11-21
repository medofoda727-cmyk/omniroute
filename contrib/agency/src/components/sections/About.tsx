"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { getDictionary, type Lang } from "@/content/dictionary";
import { asset } from "@/lib/base";

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <span className="relative">
      <motion.span style={{ opacity }}>{children}</motion.span>{" "}
    </span>
  );
}

export function About({ lang }: { lang: Lang }) {
  const t = getDictionary(lang).about;
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = t.statement.split(" ");

  return (
    <section id="about" className="relative overflow-hidden py-24 md:py-40" aria-labelledby="about-title">
      <div className="mx-auto grid max-w-[1920px] gap-12 px-[var(--gutter)] md:grid-cols-12">
        <div className="md:col-span-3">
          <h2 id="about-title" className="eyebrow reveal flex items-center gap-3 text-gold">
            <span className="h-px w-10 bg-gold" aria-hidden="true" />
            {t.eyebrow}
          </h2>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset("/brand/logo-mark.webp")}
            alt=""
            aria-hidden="true"
            loading="lazy"
            width={360}
            height={325}
            className="reveal mt-10 hidden w-28 opacity-90 md:block lg:w-36"
            style={{ ["--delay" as string]: "0.2s" }}
          />
        </div>

        <p ref={ref} className="font-display text-big font-medium md:col-span-9">
          {reduce
            ? t.statement
            : words.map((w, i) => (
                <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
                  {w}
                </Word>
              ))}
        </p>
      </div>

      {/* Process */}
      <div className="mx-auto mt-24 max-w-[1920px] px-[var(--gutter)] md:mt-36">
        <div className="mb-10 flex items-end justify-between gap-6 md:mb-14">
          <h3 className="font-display reveal text-2xl font-semibold md:text-4xl">
            <span className="accent text-[1.2em]">{t.processTitle}</span>
          </h3>
        </div>
        <ol className="grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
          {t.steps.map((step, i) => (
            <li key={step.title} className="reveal group relative pb-10 pt-8" style={{ ["--delay" as string]: `${i * 0.1}s` }}>
              <span className="absolute inset-x-0 top-0 h-px bg-[var(--line-strong)]" aria-hidden="true" />
              <span
                className="absolute start-0 top-0 h-px w-0 bg-gold transition-[width] duration-1000 ease-[var(--ease-out-expo)] group-hover:w-full"
                aria-hidden="true"
              />
              <span className="font-latin text-sm tabular-nums text-gold">0{i + 1}</span>
              <p className="font-display mt-6 text-xl font-semibold md:text-2xl">{step.title}</p>
              <p className="mt-3 max-w-[30ch] text-bone/65">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

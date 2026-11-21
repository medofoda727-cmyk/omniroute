"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { Play, Plus, Minus } from "lucide-react";
import { getDictionary, type Lang } from "@/content/dictionary";
import { categories, type CategoryId } from "@/content/categories";
import { publishedItems, type PortfolioItem } from "@/content/portfolio";
import { local, ratioValue, thumbnailFor, thumbnailSrcSet } from "@/lib/media";
import { Thumb } from "@/components/media/Thumb";
import { useVideoModal } from "@/components/video/VideoModal";
import { scrollToId } from "@/components/providers/SmoothScroll";

const INITIAL_COUNT = 12;
type Filter = "all" | CategoryId;

/** Featured first, then round-robin across categories so "All" feels curated, not grouped. */
function curate(items: PortfolioItem[]) {
  const featured = items.filter((i) => i.featured);
  const rest = items.filter((i) => !i.featured);
  const buckets = new Map<string, PortfolioItem[]>();
  rest.forEach((i) => buckets.set(i.category, [...(buckets.get(i.category) ?? []), i]));
  const queues = [...buckets.values()];
  const mixed: PortfolioItem[] = [];
  while (queues.some((q) => q.length)) queues.forEach((q) => q.length && mixed.push(q.shift()!));
  return [...featured, ...mixed];
}

function useColumns() {
  const [cols, setCols] = useState(2);
  useEffect(() => {
    const xl = window.matchMedia("(min-width: 1280px)");
    const md = window.matchMedia("(min-width: 768px)");
    const update = () => setCols(xl.matches ? 4 : md.matches ? 3 : 2);
    update();
    xl.addEventListener("change", update);
    md.addEventListener("change", update);
    return () => {
      xl.removeEventListener("change", update);
      md.removeEventListener("change", update);
    };
  }, []);
  return cols;
}

export function Work({ lang }: { lang: Lang }) {
  const t = getDictionary(lang).work;
  const curated = useMemo(() => curate(publishedItems), []);
  const available = useMemo(() => categories.filter((c) => curated.some((i) => i.category === c.id)), [curated]);
  const [filter, setFilter] = useState<Filter>("all");
  const [expanded, setExpanded] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLUListElement>(null);
  const [minH, setMinH] = useState<number | undefined>();
  const cols = useColumns();
  const reduce = useReducedMotion();

  const filtered = filter === "all" ? curated : curated.filter((i) => i.category === filter);
  const visible = expanded ? filtered : filtered.slice(0, INITIAL_COUNT);
  const catLabel = (id: CategoryId) => categories.find((c) => c.id === id)?.label[lang] ?? id;

  // Column parallax (desktop only)
  const { scrollYProgress } = useScroll({ target: gridRef, offset: ["start end", "end start"] });
  const drift = useTransform(scrollYProgress, [0, 1], [70, -70]);
  const parallaxOn = !reduce && cols >= 3;

  // Cursor follower
  const cx = useMotionValue(-200);
  const cy = useMotionValue(-200);
  const sx = useSpring(cx, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(cy, { stiffness: 500, damping: 40, mass: 0.4 });
  const [hovering, setHovering] = useState(false);

  const choose = (f: Filter) => {
    if (f === filter) return;
    if (wrapRef.current) setMinH(wrapRef.current.offsetHeight);
    setFilter(f);
    setExpanded(false);
    const top = wrapRef.current?.getBoundingClientRect().top ?? 0;
    if (top < 0) scrollToId("work-filters");
  };

  useEffect(() => {
    if (minH === undefined) return;
    const id = window.setTimeout(() => setMinH(undefined), 700);
    return () => window.clearTimeout(id);
  }, [minH]);

  return (
    <section id="work" className="relative py-20 md:py-32" aria-labelledby="work-title">
      <div className="mx-auto max-w-[1920px] px-[var(--gutter)]">
        {/* Header */}
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="eyebrow reveal flex items-center gap-3 text-gold">
              <span className="h-px w-10 bg-gold" aria-hidden="true" />
              {t.eyebrow}
            </p>
            <h2 id="work-title" className="font-display text-giant mt-6 font-bold uppercase tracking-display">
              <span className="reveal-line block overflow-hidden">
                <span>{t.title}</span>
              </span>
            </h2>
          </div>
          <div className="reveal md:col-span-4 md:col-start-9" style={{ ["--delay" as string]: "0.15s" }}>
            <p className="max-w-[40ch] text-bone/70 md:text-lg">{t.intro}</p>
            <p className="font-latin mt-4 text-sm tabular-nums text-mute" aria-live="polite">
              {t.projects(filtered.length)}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div id="work-filters" className="reveal -mx-[var(--gutter)] mt-12 scroll-mt-24 md:mx-0 md:mt-16">
          <div
            role="group"
            aria-label={t.filterLabel}
            className="flex snap-x gap-2 overflow-x-auto px-[var(--gutter)] pb-2 [scrollbar-width:none] md:flex-wrap md:px-0 [&::-webkit-scrollbar]:hidden"
          >
            {(["all", ...available.map((c) => c.id)] as Filter[]).map((f) => {
              const active = f === filter;
              const count = f === "all" ? curated.length : curated.filter((i) => i.category === f).length;
              return (
                <button
                  key={f}
                  type="button"
                  aria-pressed={active}
                  onClick={() => choose(f)}
                  className={`relative isolate shrink-0 snap-start rounded-full border px-5 py-2.5 text-sm transition-colors duration-300 ${
                    active ? "border-transparent text-ink" : "border-[var(--line-strong)] text-bone/80 hover:border-bone/50 hover:text-bone"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="filter-pill"
                      className="absolute inset-0 -z-[1] rounded-full bg-gold"
                      transition={{ type: "spring", stiffness: 400, damping: 36 }}
                    />
                  )}
                  {f === "all" ? t.all : catLabel(f)}
                  <sup className="font-latin ms-1.5 text-[0.65em] tabular-nums opacity-70">{count}</sup>
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid */}
        <div ref={wrapRef} className="relative mt-10 md:mt-14" style={{ minHeight: minH }}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.ul
              key={filter}
              ref={gridRef}
              className="work-grid grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-4 md:grid-cols-3 md:gap-x-6 md:gap-y-12 xl:grid-cols-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, filter: "blur(6px)", transition: { duration: 0.25 } }}
              onPointerMove={(e) => {
                cx.set(e.clientX);
                cy.set(e.clientY);
              }}
            >
              {visible.map((item, i) => (
                <Card
                  key={item.id}
                  item={item}
                  index={curated.indexOf(item) + 1}
                  order={i}
                  lang={lang}
                  category={catLabel(item.category)}
                  watchLabel={t.watch}
                  drift={parallaxOn && (i % cols) % 2 === 1 ? drift : undefined}
                  onHover={setHovering}
                />
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>

        {filtered.length > INITIAL_COUNT && (
          <div className="mt-16 flex justify-center md:mt-24">
            <button
              type="button"
              onClick={() => {
                if (expanded) scrollToId("work-filters");
                setExpanded((v) => !v);
              }}
              aria-expanded={expanded}
              className="group inline-flex h-14 items-center gap-3 rounded-full border border-[var(--line-strong)] ps-7 pe-2 text-sm transition-colors hover:border-gold hover:text-gold"
            >
              {expanded ? t.less : `${t.more} (${filtered.length - INITIAL_COUNT})`}
              <span className="flex size-10 items-center justify-center rounded-full bg-bone text-ink transition-colors group-hover:bg-gold">
                {expanded ? <Minus className="size-4" /> : <Plus className="size-4" />}
              </span>
            </button>
          </div>
        )}
      </div>

      {/* Cursor follower (fine pointers only) */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed start-0 top-0 z-[55] hidden [@media(pointer:fine)]:block"
        style={{ x: sx, y: sy, left: 0, right: "auto" }}
      >
        <motion.span
          className="flex size-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-1.5 rounded-full bg-gold text-sm font-medium text-ink"
          animate={{ scale: hovering ? 1 : 0, opacity: hovering ? 1 : 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <Play className="size-3.5 fill-current" />
          {t.watch}
        </motion.span>
      </motion.div>
    </section>
  );
}

function Card({
  item,
  index,
  order,
  lang,
  category,
  watchLabel,
  drift,
  onHover,
}: {
  item: PortfolioItem;
  index: number;
  order: number;
  lang: Lang;
  category: string;
  watchLabel: string;
  drift?: MotionValue<number>;
  onHover: (v: boolean) => void;
}) {
  const { open } = useVideoModal();
  const [ratio, setRatio] = useState(ratioValue(item.aspectRatio));
  const previewRef = useRef<HTMLVideoElement>(null);
  const title = item.title[lang];
  const declared = item.aspectRatio ?? "9:16";
  const aspect = declared.replace(":", " / ");

  const play = (e: React.MouseEvent<HTMLButtonElement>) =>
    open(
      {
        title,
        category,
        videoUrl: item.videoUrl,
        images: item.images?.map(local),
        ratio: item.type === "video" ? ratio : ratioValue(item.aspectRatio ?? "4:5"),
      },
      e.currentTarget,
    );

  return (
    <motion.li
      className="work-item"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -6% 0px" }}
      transition={{ duration: 1, delay: Math.min(order % 4, 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div style={drift ? { y: drift } : undefined}>
      <button
        type="button"
        onClick={play}
        onPointerEnter={(e) => {
          if (e.pointerType === "mouse") onHover(true);
          previewRef.current?.play().catch(() => {});
        }}
        onPointerLeave={() => {
          onHover(false);
          if (previewRef.current) {
            previewRef.current.pause();
            previewRef.current.currentTime = 0;
          }
        }}
        onFocus={() => onHover(false)}
        aria-label={`${watchLabel}: ${title} — ${category}`}
        className="group block w-full text-start [@media(pointer:fine)]:cursor-none"
      >
        <div className="relative overflow-hidden rounded-[clamp(8px,1vw,14px)] bg-graphite" style={{ aspectRatio: aspect }}>
          <div className="absolute inset-0 transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-[1.06]">
            <Thumb
              src={thumbnailFor(item, 720)}
              srcSet={thumbnailSrcSet(item)}
              sizes="(min-width:1280px) 24vw, (min-width:768px) 32vw, 50vw"
              alt={title}
              label={title}
              onRatio={setRatio}
            />
            {item.previewUrl && (
              <video
                ref={previewRef}
                src={local(item.previewUrl)}
                muted
                loop
                playsInline
                preload="none"
                className="absolute inset-0 size-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
            )}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-80 transition-opacity duration-700 group-hover:opacity-40" />
          <span className="font-latin absolute start-3 top-3 text-[0.7rem] tabular-nums tracking-widest text-bone/70 md:start-4 md:top-4">
            {String(index).padStart(2, "0")}
          </span>
          {/* Touch / keyboard play affordance */}
          <span className="absolute bottom-3 end-3 flex size-9 items-center justify-center rounded-full bg-bone/90 text-ink transition-all duration-500 group-focus-visible:scale-110 group-focus-visible:bg-gold md:bottom-4 md:end-4 md:size-10 [@media(pointer:fine)]:scale-0 [@media(pointer:fine)]:group-focus-visible:scale-100">
            <Play className="ms-0.5 size-3.5 fill-current" />
          </span>
        </div>
        <div className="mt-3 flex flex-col gap-1 md:mt-4">
          <span className="eyebrow text-[0.62rem] text-gold md:text-[0.68rem]">{category}</span>
          <h3 className="font-display text-[0.95rem] font-medium leading-snug transition-colors duration-300 group-hover:text-gold-soft md:text-lg">
            {title}
          </h3>
        </div>
      </button>
      </motion.div>
    </motion.li>
  );
}

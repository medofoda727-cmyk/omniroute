import { ArrowDown } from "lucide-react";
import { getDictionary, type Lang } from "@/content/dictionary";
import { siteConfig, whatsappLink } from "@/content/site";
import { publishedItems } from "@/content/portfolio";
import { local, thumbnailFor } from "@/lib/media";
import { Thumb } from "@/components/media/Thumb";
import { Diamond, WhatsAppIcon } from "@/components/icons";
import { LocalTime } from "@/components/sections/LocalTime";

/** Spread items across the three reel columns so neighbours differ. */
function reelColumns() {
  const items = publishedItems.filter((i) => thumbnailFor(i));
  const cols: (typeof items)[] = [[], [], []];
  items.slice(0, 15).forEach((item, i) => cols[i % 3].push(item));
  return cols;
}

export function Hero({ lang }: { lang: Lang }) {
  const t = getDictionary(lang).hero;
  const bgVideo = siteConfig.hero.backgroundVideo;
  const cols = reelColumns();

  return (
    <section id="top" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden pt-[var(--nav-h)]" aria-labelledby="hero-title">
      {/* ── Background ───────────────────────────── */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute -start-[20%] -top-[30%] h-[80vh] w-[80vw] rounded-full bg-[radial-gradient(closest-side,rgb(201_163_91/0.13),transparent)] blur-2xl" />
        {bgVideo ? (
          <>
            <video className="absolute inset-0 size-full object-cover opacity-40" src={local(bgVideo)} autoPlay muted loop playsInline preload="metadata" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/30" />
          </>
        ) : (
          <div className="absolute inset-y-0 end-0 w-full opacity-30 md:w-[62%] md:opacity-70 lg:w-[48%]">
            <div className="fade-intro h-full [--d:0.2s]">
            <div className="flex h-[140%] -translate-y-[12%] -rotate-[7deg] gap-3 md:gap-4 rtl:rotate-[7deg]">
              {cols.map((col, ci) => (
                <div key={ci} className={`flex-1 ${ci === 1 ? "-mt-24" : ""}`}>
                  <div className={ci % 2 === 0 ? "reel-up" : "reel-down"} style={{ ["--dur" as string]: `${70 + ci * 14}s` }}>
                    {[...col, ...col].map((item, i) => (
                      <div key={`${item.id}-${i}`} className="relative mb-3 aspect-[9/16] overflow-hidden rounded-xl md:mb-4">
                        <Thumb src={thumbnailFor(item, 400)} alt="" className="grayscale-[35%]" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            </div>
          </div>
        )}
        {/* Fades so type stays legible */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,var(--color-ink)_0%,transparent_22%,transparent_60%,var(--color-ink)_100%)]" />
        <div className="absolute inset-0 hidden bg-[linear-gradient(to_right,var(--color-ink)_30%,transparent_75%)] md:block rtl:bg-[linear-gradient(to_left,var(--color-ink)_30%,transparent_75%)]" />
      </div>

      {/* ── Top meta row ─────────────────────────── */}
      <div className="mx-auto flex w-full max-w-[1920px] items-center justify-between gap-4 px-[var(--gutter)] pt-6 md:pt-10">
        <p className="eyebrow fade-intro flex items-center gap-3 text-mute [--d:0.1s]">
          <Diamond className="text-[1.6rem]" />
          {t.eyebrow}
        </p>
        <p className="eyebrow fade-intro hidden text-mute [--d:0.2s] sm:block">
          {t.location} <span className="text-dim">·</span> <LocalTime />
        </p>
      </div>

      {/* ── Headline ─────────────────────────────── */}
      <div className="mx-auto flex w-full max-w-[1920px] flex-1 flex-col justify-center px-[var(--gutter)] py-10 md:py-14">
        <h1 id="hero-title" className="font-display text-mega font-bold uppercase tracking-display">
          {t.lines.map((line, i) => (
            <span key={i} className={`line-mask ${i === 1 ? "ps-[8vw] md:ps-[14vw]" : ""}`}>
              <span style={{ ["--i" as string]: i }} className={i === t.accentLine ? "accent normal-case" : ""}>
                {line}
              </span>
            </span>
          ))}
        </h1>
      </div>

      {/* ── Bottom row ───────────────────────────── */}
      <div className="mx-auto grid w-full max-w-[1920px] gap-8 px-[var(--gutter)] pb-8 md:grid-cols-12 md:items-end md:pb-12">
        <p className="fade-intro max-w-[38ch] text-[1.02rem] leading-relaxed text-bone/80 [--d:0.55s] md:col-span-5 md:text-lg">{t.intro}</p>

        <div className="fade-intro flex flex-wrap items-center gap-3 [--d:0.7s] md:col-span-4 md:col-start-7">
          <a
            href="#work"
            className="group inline-flex h-13 items-center gap-3 rounded-full bg-bone ps-6 pe-2 text-[0.95rem] font-medium text-ink transition-colors hover:bg-gold"
          >
            {t.ctaWork}
            <span className="flex size-9 items-center justify-center rounded-full bg-ink text-bone transition-transform duration-500 group-hover:translate-y-0.5">
              <ArrowDown className="size-4" />
            </span>
          </a>
          <a
            href={whatsappLink(lang)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-13 items-center gap-2.5 rounded-full border border-[var(--line-strong)] px-6 text-[0.95rem] transition-colors hover:border-gold hover:text-gold"
          >
            <WhatsAppIcon size={18} />
            {t.ctaTalk}
          </a>
        </div>

        <div className="fade-intro hidden items-end justify-end gap-4 [--d:0.85s] md:col-span-2 md:col-start-11 md:flex">
          <span className="eyebrow text-mute">{t.scroll}</span>
          <span className="scroll-cue" aria-hidden="true" />
        </div>
      </div>

      <ul className="fade-intro mx-auto flex w-full max-w-[1920px] flex-wrap gap-x-6 gap-y-2 border-t border-[var(--line)] px-[var(--gutter)] py-4 text-sm text-mute [--d:0.95s]">
        {t.tags.map((tag) => (
          <li key={tag} className="flex items-center gap-2">
            <span className="size-1 rounded-full bg-gold" aria-hidden="true" />
            {tag}
          </li>
        ))}
      </ul>
    </section>
  );
}

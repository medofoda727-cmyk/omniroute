import { getDictionary, type Lang } from "@/content/dictionary";
import { Diamond } from "@/components/icons";

export function Marquee({ lang }: { lang: Lang }) {
  const words = getDictionary(lang).marquee;
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {words.map((w) => (
        <li key={w} className="flex items-center">
          <span className="font-display px-[0.5em] text-[clamp(2rem,6vw,5.5rem)] font-semibold uppercase leading-[1.3] tracking-display text-transparent [-webkit-text-stroke:1px_rgb(236_232_225/0.35)] transition-colors duration-500 hover:text-bone">
            {w}
          </span>
          <Diamond className="text-[clamp(2rem,6vw,5.5rem)]" />
        </li>
      ))}
    </ul>
  );
  return (
    <div className="marquee-pause relative overflow-hidden border-y border-[var(--line)] py-4 md:py-6">
      <div className="marquee" style={{ ["--dur" as string]: "46s" }}>
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

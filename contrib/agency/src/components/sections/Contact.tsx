import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { getDictionary, type Lang } from "@/content/dictionary";
import { siteConfig, whatsappLink } from "@/content/site";
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from "@/components/icons";
import { Magnetic } from "@/components/media/Magnetic";

function Channel({ href, icon, label, value, external = true, ltr = false }: { href: string; icon: ReactNode; label: string; value: string; external?: boolean; ltr?: boolean }) {
  return (
    <li>
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="group flex items-center justify-between gap-4 border-b border-[var(--line)] py-5 transition-colors hover:border-gold md:py-6"
      >
        <span className="flex items-center gap-4">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-[var(--line-strong)] text-bone/80 transition-colors group-hover:border-gold group-hover:bg-gold group-hover:text-ink">
            {icon}
          </span>
          <span>
            <span className="eyebrow block text-mute">{label}</span>
            <span className={`mt-1 block text-lg md:text-xl ${ltr ? "font-latin tracking-wide" : ""}`} dir={ltr ? "ltr" : undefined}>
              {value}
            </span>
          </span>
        </span>
        <ArrowUpRight className="size-5 shrink-0 text-mute transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5" />
      </a>
    </li>
  );
}

export function Contact({ lang }: { lang: Lang }) {
  const t = getDictionary(lang).contact;
  const c = siteConfig.contact;
  const loc = siteConfig.location;
  const place = `${loc.city[lang]}${lang === "ar" ? "،" : ","} ${loc.country[lang]}`;

  return (
    <section id="contact" className="relative overflow-hidden pb-16 pt-24 md:pb-24 md:pt-40" aria-labelledby="contact-title">
      <div
        className="pointer-events-none absolute -end-[25%] top-0 -z-10 h-[90vh] w-[90vw] rounded-full bg-[radial-gradient(closest-side,rgb(201_163_91/0.1),transparent)] blur-2xl"
        aria-hidden="true"
      />
      <div className="mx-auto max-w-[1920px] px-[var(--gutter)]">
        <p className="eyebrow reveal flex items-center gap-3 text-gold">
          <span className="h-px w-10 bg-gold" aria-hidden="true" />
          {t.eyebrow}
        </p>

        <h2 id="contact-title" className="font-display text-giant mt-8 font-bold uppercase tracking-display">
          {t.titleLines.map((line, i) => (
            <span key={i} className={`reveal-line block overflow-hidden ${i === 1 ? "ps-[6vw]" : ""}`}>
              <span style={{ ["--i" as string]: i }} className={i === t.accentLine ? "accent normal-case" : ""}>
                {line}
              </span>
            </span>
          ))}
        </h2>

        <div className="mt-14 grid gap-14 md:mt-20 lg:grid-cols-12">
          <div className="reveal lg:col-span-5">
            <p className="max-w-[40ch] text-lg text-bone/75 md:text-xl">{t.text}</p>
            <Magnetic className="mt-10">
              <a
                href={whatsappLink(lang)}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex h-16 items-center gap-4 overflow-hidden rounded-full bg-gold ps-7 pe-2.5 text-lg font-medium text-ink md:h-20 md:ps-9 md:text-xl"
              >
                <span className="absolute inset-0 origin-bottom scale-y-0 bg-bone transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-y-100" aria-hidden="true" />
                <span className="relative">{t.whatsapp}</span>
                <span className="relative flex size-11 items-center justify-center rounded-full bg-ink text-gold md:size-15">
                  <WhatsAppIcon size={24} />
                </span>
              </a>
            </Magnetic>
          </div>

          <ul className="reveal lg:col-span-6 lg:col-start-7" style={{ ["--delay" as string]: "0.15s" }}>
            <Channel href={whatsappLink(lang)} icon={<WhatsAppIcon size={18} />} label={t.whatsappLabel} value={c.phoneDisplay} ltr />
            <Channel href={`tel:${c.phoneE164}`} icon={<Phone className="size-[18px]" />} label={t.phone} value={c.phoneDisplay} external={false} ltr />
            {c.facebook && <Channel href={c.facebook} icon={<FacebookIcon size={18} />} label={t.facebook} value="Foda Agency" />}
            {c.instagram && <Channel href={c.instagram} icon={<InstagramIcon size={18} />} label={t.instagram} value="Foda Agency" />}
            {c.email && <Channel href={`mailto:${c.email}`} icon={<Mail className="size-[18px]" />} label={t.email} value={c.email} external={false} ltr />}
            {loc.mapsUrl && <Channel href={loc.mapsUrl} icon={<MapPin className="size-[18px]" />} label={t.location} value={`${place} — ${t.openMaps}`} />}
          </ul>
        </div>

        {loc.mapEmbedUrl && (
          <div className="reveal relative mt-16 aspect-[16/10] overflow-hidden rounded-2xl ring-1 ring-[var(--line)] md:mt-24 md:aspect-[21/8]">
            <iframe
              src={loc.mapEmbedUrl}
              title={t.mapTitle}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 size-full grayscale invert-[0.92] hue-rotate-180 contrast-[0.9]"
            />
          </div>
        )}
      </div>
    </section>
  );
}

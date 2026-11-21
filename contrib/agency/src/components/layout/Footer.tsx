import { ArrowUp } from "lucide-react";
import { getDictionary, type Lang } from "@/content/dictionary";
import { siteConfig, whatsappLink } from "@/content/site";
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from "@/components/icons";
import { asset } from "@/lib/base";

export function Footer({ lang }: { lang: Lang }) {
  const t = getDictionary(lang);
  const c = siteConfig.contact;
  const year = new Date().getFullYear();

  const nav = [
    { id: "work", label: t.nav.work },
    { id: "about", label: t.nav.about },
    { id: "contact", label: t.nav.contact },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-[var(--line)] pt-16 md:pt-20">
      <div className="mx-auto grid max-w-[1920px] gap-12 px-[var(--gutter)] md:grid-cols-12">
        <div className="md:col-span-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset("/brand/logo-full.webp")} alt={siteConfig.nameAr} width={360} height={382} loading="lazy" className="h-auto w-24" />
          <p className="mt-6 text-sm text-mute">
            {siteConfig.name} — {t.footer.tagline}
          </p>
        </div>

        <nav className="md:col-span-2" aria-label="Footer">
          <ul className="space-y-3">
            {nav.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`} className="u-link text-bone/80 hover:text-bone">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-3 md:col-span-3">
          <a href={`tel:${c.phoneE164}`} className="u-link font-latin block w-fit tracking-wide text-bone/80 hover:text-bone" dir="ltr">
            {c.phoneDisplay}
          </a>
          <a href={whatsappLink(lang)} target="_blank" rel="noopener noreferrer" className="u-link block w-fit text-bone/80 hover:text-bone">
            {t.contact.whatsappLabel}
          </a>
          <a href={siteConfig.location.mapsUrl} target="_blank" rel="noopener noreferrer" className="u-link block w-fit text-bone/80 hover:text-bone">
            {siteConfig.location.city[lang]}
            {lang === "ar" ? "، " : ", "}
            {siteConfig.location.country[lang]}
          </a>
          {c.email && (
            <a href={`mailto:${c.email}`} className="u-link block w-fit text-bone/80 hover:text-bone">
              {c.email}
            </a>
          )}
        </div>

        <div className="flex items-start gap-3 md:col-span-3 md:justify-end">
          <a
            href={whatsappLink(lang)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.contact.whatsappLabel}
            className="flex size-11 items-center justify-center rounded-full border border-[var(--line-strong)] transition-colors hover:border-gold hover:text-gold"
          >
            <WhatsAppIcon size={18} />
          </a>
          {c.facebook && (
            <a
              href={c.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.contact.facebook}
              className="flex size-11 items-center justify-center rounded-full border border-[var(--line-strong)] transition-colors hover:border-gold hover:text-gold"
            >
              <FacebookIcon size={18} />
            </a>
          )}
          {c.instagram && (
            <a
              href={c.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.contact.instagram}
              className="flex size-11 items-center justify-center rounded-full border border-[var(--line-strong)] transition-colors hover:border-gold hover:text-gold"
            >
              <InstagramIcon size={18} />
            </a>
          )}
          <a
            href="#top"
            aria-label={t.footer.top}
            className="flex size-11 items-center justify-center rounded-full bg-bone text-ink transition-colors hover:bg-gold"
          >
            <ArrowUp className="size-4" />
          </a>
        </div>
      </div>

      {/* Signature wordmark */}
      <div className="relative mt-16 select-none md:mt-20" aria-hidden="true" dir="ltr">
        <p className="font-latin bg-gradient-to-b from-bone/[0.14] to-transparent bg-clip-text text-center text-[27vw] font-extrabold leading-[0.78] tracking-[-0.06em] text-transparent">
          FODA
        </p>
      </div>

      <div className="mx-auto flex max-w-[1920px] flex-col gap-2 border-t border-[var(--line)] px-[var(--gutter)] py-6 text-xs text-mute sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {lang === "ar" ? siteConfig.nameAr : siteConfig.name}. {t.footer.rights}
        </p>
        <p>{t.footer.tagline}</p>
      </div>
    </footer>
  );
}

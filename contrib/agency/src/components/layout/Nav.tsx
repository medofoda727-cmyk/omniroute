"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { getDictionary, langPath, type Lang } from "@/content/dictionary";
import { siteConfig, whatsappLink } from "@/content/site";
import { WhatsAppIcon, FacebookIcon, InstagramIcon } from "@/components/icons";
import { lockScroll, scrollToId } from "@/components/providers/SmoothScroll";
import { asset } from "@/lib/base";

const SECTIONS = ["top", "work", "about", "contact"] as const;
type SectionId = (typeof SECTIONS)[number];

export function Nav({ lang }: { lang: Lang }) {
  const t = getDictionary(lang);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<SectionId>("top");
  const lastY = useRef(0);
  const menuBtn = useRef<HTMLButtonElement>(null);

  const links: { id: SectionId; label: string }[] = [
    { id: "top", label: t.nav.home },
    { id: "work", label: t.nav.work },
    { id: "about", label: t.nav.about },
    { id: "contact", label: t.nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      const goingDown = y > lastY.current + 4;
      const goingUp = y < lastY.current - 4;
      if (goingDown && y > window.innerHeight * 0.8) setHidden(true);
      else if (goingUp || y < 100) setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id as SectionId);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    lockScroll(true);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      lockScroll(false);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const go = (id: SectionId) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    // let the menu start closing before scrolling
    setTimeout(() => scrollToId(id), open ? 350 : 0);
    history.replaceState(null, "", id === "top" ? location.pathname : `#${id}`);
  };

  const other: Lang = lang === "en" ? "ar" : "en";
  const switchHref = `${asset(langPath(other))}${active !== "top" ? `#${active}` : ""}`;
  const remember = () => {
    try {
      localStorage.setItem("foda-lang", other);
    } catch {}
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,border-color] duration-700 ease-[var(--ease-out-expo)] ${
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        } ${scrolled && !open ? "border-b border-[var(--line)] bg-ink/70 backdrop-blur-xl" : "border-b border-transparent"}`}
      >
        <div className="mx-auto flex h-[var(--nav-h)] max-w-[1920px] items-center justify-between gap-6 px-[var(--gutter)]">
          <a href="#top" onClick={go("top")} className="group flex items-center gap-3" aria-label={`${siteConfig.name} — ${t.nav.home}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset("/brand/logo-mark-sm.webp")} alt="" width={112} height={101} className="h-8 w-auto transition-transform duration-700 group-hover:-rotate-6" />
            <span className="font-latin flex items-baseline gap-1.5 text-[0.95rem] font-semibold tracking-[0.2em]" dir="ltr">
              FODA
              <span className="hidden text-[0.62rem] font-medium tracking-[0.28em] text-mute sm:inline">AGENCY</span>
            </span>
          </a>

          <nav aria-label={t.a11y.primaryNav} className="hidden md:block">
            <ul className="flex items-center gap-1 rounded-full border border-[var(--line)] bg-coal/40 p-1 backdrop-blur-md">
              {links.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    onClick={go(l.id)}
                    aria-current={active === l.id ? "true" : undefined}
                    className={`relative isolate block rounded-full px-4 py-2 text-sm transition-colors duration-300 ${
                      active === l.id ? "text-ink" : "text-bone/75 hover:text-bone"
                    }`}
                  >
                    {active === l.id && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-[1] rounded-full bg-bone"
                        transition={{ type: "spring", stiffness: 380, damping: 34 }}
                      />
                    )}
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={switchHref}
              onClick={remember}
              hrefLang={other}
              lang={other}
              aria-label={t.a11y.switchToLabel}
              className={`flex h-10 min-w-10 items-center justify-center rounded-full border border-[var(--line-strong)] px-3 text-sm transition-colors hover:border-gold hover:text-gold ${
                other === "ar" ? "font-[family-name:var(--font-accent)] text-base" : "font-latin font-medium tracking-wider"
              }`}
            >
              {other === "ar" ? "عربي" : "EN"}
            </a>
            <a
              href={whatsappLink(lang)}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden h-10 items-center gap-2 rounded-full bg-gold px-4 text-sm font-medium text-ink transition-colors hover:bg-gold-soft sm:flex"
            >
              <WhatsAppIcon size={16} />
              {t.nav.cta}
            </a>
            <button
              ref={menuBtn}
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? t.a11y.closeMenu : t.a11y.menu}
              className="relative flex size-10 items-center justify-center rounded-full border border-[var(--line-strong)] md:hidden"
            >
              <span className={`absolute h-px w-4 bg-bone transition-transform duration-500 ${open ? "rotate-45" : "-translate-y-[3px]"}`} />
              <span className={`absolute h-px w-4 bg-bone transition-transform duration-500 ${open ? "-rotate-45" : "translate-y-[3px]"}`} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col bg-ink px-[var(--gutter)] pb-8 pt-[calc(var(--nav-h)+2rem)] md:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav aria-label={t.a11y.primaryNav}>
              <ul className="space-y-1">
                {links.map((l, i) => (
                  <li key={l.id} className="overflow-hidden">
                    <motion.a
                      href={`#${l.id}`}
                      onClick={go(l.id)}
                      className="font-display flex items-baseline gap-4 py-1 text-[clamp(2.6rem,13vw,4.5rem)] font-semibold leading-[1.05] tracking-display"
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "100%" }}
                      transition={{ duration: 0.8, delay: 0.15 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <span className="font-latin text-xs font-normal text-gold">0{i + 1}</span>
                      <span className={active === l.id ? "accent" : ""}>{l.label}</span>
                    </motion.a>
                  </li>
                ))}
              </ul>
            </nav>
            <motion.div
              className="mt-auto space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.45 } }}
              exit={{ opacity: 0 }}
            >
              <a
                href={whatsappLink(lang)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-14 items-center justify-center gap-3 rounded-full bg-gold text-base font-medium text-ink"
              >
                <WhatsAppIcon size={20} />
                {t.contact.whatsapp}
              </a>
              <div className="flex items-center justify-between text-sm text-mute">
                <a href={`tel:${siteConfig.contact.phoneE164}`} dir="ltr" className="font-latin tracking-wider">
                  {siteConfig.contact.phoneDisplay}
                </a>
                <div className="flex gap-4">
                  {siteConfig.contact.facebook && (
                    <a href={siteConfig.contact.facebook} target="_blank" rel="noopener noreferrer" aria-label={t.contact.facebook}>
                      <FacebookIcon />
                    </a>
                  )}
                  {siteConfig.contact.instagram && (
                    <a href={siteConfig.contact.instagram} target="_blank" rel="noopener noreferrer" aria-label={t.contact.instagram}>
                      <InstagramIcon />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

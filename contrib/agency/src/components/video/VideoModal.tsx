"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { resolveVideo } from "@/lib/media";
import { lockScroll } from "@/components/providers/SmoothScroll";
import { getDictionary, type Lang } from "@/content/dictionary";

export interface ModalMedia {
  title: string;
  category?: string;
  videoUrl?: string;
  images?: string[];
  /** width / height */
  ratio: number;
}

interface Ctx {
  open: (media: ModalMedia, trigger?: HTMLElement | null) => void;
}

const VideoModalContext = createContext<Ctx | null>(null);

export function useVideoModal() {
  const ctx = useContext(VideoModalContext);
  if (!ctx) throw new Error("useVideoModal must be used inside <VideoModalProvider>");
  return ctx;
}

export function VideoModalProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  const [media, setMedia] = useState<ModalMedia | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const open = useCallback((m: ModalMedia, trigger?: HTMLElement | null) => {
    triggerRef.current = trigger ?? (document.activeElement as HTMLElement | null);
    setMedia(m);
  }, []);

  const close = useCallback(() => setMedia(null), []);

  return (
    <VideoModalContext.Provider value={{ open }}>
      {children}
      <AnimatePresence
        onExitComplete={() => {
          triggerRef.current?.focus({ preventScroll: true });
        }}
      >
        {media && <Modal key="modal" media={media} onClose={close} lang={lang} />}
      </AnimatePresence>
    </VideoModalContext.Provider>
  );
}

function Modal({ media, onClose, lang }: { media: ModalMedia; onClose: () => void; lang: Lang }) {
  const t = getDictionary(lang);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [index, setIndex] = useState(0);
  const video = resolveVideo(media.videoUrl);
  const images = media.images ?? [];

  useEffect(() => {
    lockScroll(true);
    closeRef.current?.focus({ preventScroll: true });
    return () => lockScroll(false);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
      if (images.length > 1 && (e.key === "ArrowRight" || e.key === "ArrowLeft")) {
        const dir = (e.key === "ArrowRight" ? 1 : -1) * (lang === "ar" ? -1 : 1);
        setIndex((i) => (i + dir + images.length) % images.length);
      }
      if (e.key === "Tab" && dialogRef.current) {
        const f = dialogRef.current.querySelectorAll<HTMLElement>('button, [href], iframe, video, [tabindex]:not([tabindex="-1"])');
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, images.length, lang]);

  // Fit the frame inside the viewport while keeping the media ratio.
  const frameStyle = {
    aspectRatio: String(media.ratio),
    width: `min(92vw, calc((100svh - 9rem) * ${media.ratio}))`,
  };

  return (
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={media.title}
      className="fixed inset-0 z-[90] flex flex-col items-center justify-center px-4 pb-6 pt-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.35, delay: 0.1 } }}
      transition={{ duration: 0.4 }}
    >
      {/* Backdrop — click to close */}
      <button
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 cursor-zoom-out bg-ink/95 backdrop-blur-xl"
      />

      <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between gap-4 px-[var(--gutter)] py-4">
        <div className="min-w-0">
          {media.category && <p className="eyebrow text-gold">{media.category}</p>}
          <p className="font-display truncate text-base font-medium md:text-lg">{media.title}</p>
        </div>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="group flex size-12 shrink-0 items-center justify-center rounded-full border border-[var(--line-strong)] bg-coal/60 transition-colors hover:border-gold hover:text-gold"
          aria-label={t.a11y.close}
        >
          <X className="size-5 transition-transform duration-500 group-hover:rotate-90" />
        </button>
      </div>

      <motion.div
        className="relative z-[1] overflow-hidden rounded-[clamp(10px,1.4vw,18px)] bg-black shadow-[0_40px_120px_-20px_rgb(0_0_0/0.9)] ring-1 ring-white/10"
        style={frameStyle}
        initial={{ clipPath: "inset(12% 12% 12% 12% round 24px)", scale: 0.96 }}
        animate={{ clipPath: "inset(0% 0% 0% 0% round 0px)", scale: 1 }}
        exit={{ clipPath: "inset(10% 10% 10% 10% round 24px)", opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {!loaded && video.kind !== "none" && (
          <div className="absolute inset-0 grid place-items-center" aria-hidden="true">
            <span className="size-10 animate-spin rounded-full border border-white/15 border-t-gold" />
          </div>
        )}

        {(video.kind === "drive" || video.kind === "youtube" || video.kind === "vimeo") && (
          <iframe
            src={video.embed}
            title={media.title}
            className="absolute inset-0 size-full"
            allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
            allowFullScreen
            onLoad={() => setLoaded(true)}
          />
        )}

        {video.kind === "file" && (
          <video
            src={video.src}
            className="absolute inset-0 size-full bg-black object-contain"
            controls
            autoPlay
            playsInline
            onLoadedData={() => setLoaded(true)}
          />
        )}

        {video.kind === "none" && images.length > 0 && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={images[index]} alt={`${media.title} — ${index + 1}/${images.length}`} className="absolute inset-0 size-full object-contain" />
            {images.length > 1 && (
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-3">
                <button
                  type="button"
                  className="flex size-11 items-center justify-center rounded-full bg-ink/70 hover:text-gold"
                  onClick={() => setIndex((i) => (i - 1 + images.length) % images.length)}
                  aria-label="Previous"
                >
                  <ChevronLeft className="size-5 rtl:-scale-x-100" />
                </button>
                <span className="font-latin text-xs tabular-nums text-mute">
                  {index + 1} / {images.length}
                </span>
                <button
                  type="button"
                  className="flex size-11 items-center justify-center rounded-full bg-ink/70 hover:text-gold"
                  onClick={() => setIndex((i) => (i + 1) % images.length)}
                  aria-label="Next"
                >
                  <ChevronRight className="size-5 rtl:-scale-x-100" />
                </button>
              </div>
            )}
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

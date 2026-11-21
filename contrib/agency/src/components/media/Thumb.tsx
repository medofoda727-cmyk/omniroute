"use client";

import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/base";

/**
 * Lazy thumbnail with an art-directed fallback (never a broken image).
 * Reports the natural ratio so players can size themselves correctly.
 */
export function Thumb({
  src,
  srcSet,
  sizes,
  alt,
  className = "",
  label,
  eager = false,
  onRatio,
}: {
  src?: string;
  srcSet?: string;
  sizes?: string;
  alt: string;
  className?: string;
  label?: string;
  eager?: boolean;
  onRatio?: (ratio: number) => void;
}) {
  const [state, setState] = useState<"loading" | "ok" | "error">(src ? "loading" : "error");
  const ref = useRef<HTMLImageElement>(null);

  // The image may finish loading before hydration — sync the state once mounted.
  useEffect(() => {
    const img = ref.current;
    if (!img || !img.complete) return;
    if (img.naturalWidth > 0) {
      setState("ok");
      onRatio?.(img.naturalWidth / img.naturalHeight);
    } else setState("error");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`thumb-fallback absolute inset-0 ${className}`}>
      {state !== "ok" && label && (
        <div className="absolute inset-0 grid place-items-center p-4 text-center" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset("/brand/logo-mark-sm.webp")} alt="" className="w-[22%] max-w-14 opacity-25" />
        </div>
      )}
      {src && state !== "error" && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={ref}
          src={src}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          referrerPolicy="no-referrer"
          onLoad={(e) => {
            const img = e.currentTarget;
            setState("ok");
            if (img.naturalWidth && img.naturalHeight) onRatio?.(img.naturalWidth / img.naturalHeight);
          }}
          onError={() => setState("error")}
          className={`absolute inset-0 size-full object-cover transition-opacity duration-700 ${state === "ok" ? "opacity-100" : "opacity-0"}`}
        />
      )}
    </div>
  );
}

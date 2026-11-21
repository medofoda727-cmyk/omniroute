import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { enFontVars } from "@/lib/fonts-en";
import { asset } from "@/lib/base";

export const metadata: Metadata = {
  title: "404 — Foda Agency",
  robots: { index: false },
};

export default function GlobalNotFound() {
  return (
    <html
      lang="en"
      className={enFontVars}
      style={{ ["--font-display-family" as string]: "var(--font-latin-family)", ["--font-body-family" as string]: "var(--font-latin-family)" }}
    >
      <body className="grid min-h-svh place-items-center px-6 text-center">
        <main>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset("/brand/logo-mark.webp")} alt="Foda Agency" width={96} height={87} className="mx-auto mb-10 h-auto w-20" />
          <p className="eyebrow text-gold">404</p>
          <h1 className="font-display text-big mt-4 font-semibold">
            This frame doesn’t exist. <span className="accent block" lang="ar" dir="rtl">الكادر ده مش موجود.</span>
          </h1>
          <div className="mt-10 flex justify-center gap-6 text-sm">
            <Link className="u-link" href="/">Back home</Link>
            <Link className="u-link" href="/ar/" lang="ar">الرئيسية</Link>
          </div>
        </main>
      </body>
    </html>
  );
}

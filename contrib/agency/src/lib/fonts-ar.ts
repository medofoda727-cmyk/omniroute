import { Alexandria, IBM_Plex_Sans_Arabic, Aref_Ruqaa, Inter_Tight } from "next/font/google";

export const alexandria = Alexandria({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-display-family",
  display: "swap",
});

export const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body-family",
  display: "swap",
});

export const arefRuqaa = Aref_Ruqaa({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-accent-family",
  display: "swap",
});

export const interTightAr = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-latin-family",
  display: "swap",
});

export const arFontVars = `${alexandria.variable} ${plexArabic.variable} ${arefRuqaa.variable} ${interTightAr.variable}`;

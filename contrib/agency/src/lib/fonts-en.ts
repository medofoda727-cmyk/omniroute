import { Inter_Tight, Instrument_Serif } from "next/font/google";

export const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-latin-family",
  display: "swap",
});

export const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-accent-family",
  display: "swap",
});

export const enFontVars = `${interTight.variable} ${instrumentSerif.variable}`;

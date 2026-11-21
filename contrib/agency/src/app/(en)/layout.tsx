import type { ReactNode } from "react";
import "../globals.css";
import { RootDocument, buildMetadata } from "@/components/RootDocument";
import { enFontVars } from "@/lib/fonts-en";

export { viewport } from "@/components/RootDocument";
export const metadata = buildMetadata("en");

export default function EnglishLayout({ children }: { children: ReactNode }) {
  return (
    <RootDocument lang="en" fontVars={enFontVars}>
      {children}
    </RootDocument>
  );
}

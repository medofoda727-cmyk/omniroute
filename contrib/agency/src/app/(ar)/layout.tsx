import type { ReactNode } from "react";
import "../globals.css";
import { RootDocument, buildMetadata } from "@/components/RootDocument";
import { arFontVars } from "@/lib/fonts-ar";

export { viewport } from "@/components/RootDocument";
export const metadata = buildMetadata("ar");

export default function ArabicLayout({ children }: { children: ReactNode }) {
  return (
    <RootDocument lang="ar" fontVars={arFontVars}>
      {children}
    </RootDocument>
  );
}

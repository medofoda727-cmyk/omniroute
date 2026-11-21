import type { AspectRatio, PortfolioItem } from "@/content/portfolio";
import { asset } from "@/lib/base";

/** Root-relative local files ("/work/a.jpg") get the base path; full URLs pass through. */
export const local = (src: string) => (src.startsWith("/") && !src.startsWith("//") ? asset(src) : src);

export type ResolvedVideo =
  | { kind: "drive"; id: string; embed: string }
  | { kind: "youtube"; id: string; embed: string }
  | { kind: "vimeo"; id: string; embed: string }
  | { kind: "file"; src: string }
  | { kind: "none" };

export function resolveVideo(url?: string): ResolvedVideo {
  if (!url) return { kind: "none" };
  const u = url.trim();

  const drive = u.match(/drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?(?:export=\w+&)?id=)([\w-]{10,})/);
  if (drive) return { kind: "drive", id: drive[1], embed: `https://drive.google.com/file/d/${drive[1]}/preview` };

  const yt =
    u.match(/youtu\.be\/([\w-]{6,})/) ||
    u.match(/youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/|live\/)([\w-]{6,})/);
  if (yt)
    return {
      kind: "youtube",
      id: yt[1],
      embed: `https://www.youtube-nocookie.com/embed/${yt[1]}?autoplay=1&rel=0&modestbranding=1&playsinline=1`,
    };

  const vimeo = u.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo)
    return { kind: "vimeo", id: vimeo[1], embed: `https://player.vimeo.com/video/${vimeo[1]}?autoplay=1&title=0&byline=0&portrait=0` };

  return { kind: "file", src: local(u) };
}

/** Best-effort thumbnail: explicit > first image > derived from the video host. */
export function thumbnailFor(item: Pick<PortfolioItem, "thumbnail" | "images" | "videoUrl">, width = 720): string | undefined {
  if (item.thumbnail) return local(item.thumbnail);
  if (item.images?.length) return local(item.images[0]);
  const v = resolveVideo(item.videoUrl);
  if (v.kind === "drive") return `https://drive.google.com/thumbnail?id=${v.id}&sz=w${width}`;
  if (v.kind === "youtube") return `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`;
  return undefined;
}

export function thumbnailSrcSet(item: Pick<PortfolioItem, "thumbnail" | "images" | "videoUrl">): string | undefined {
  if (item.thumbnail || item.images?.length) return undefined;
  const v = resolveVideo(item.videoUrl);
  if (v.kind !== "drive") return undefined;
  return [400, 720, 1080].map((w) => `https://drive.google.com/thumbnail?id=${v.id}&sz=w${w} ${w}w`).join(", ");
}

export function ratioValue(r: AspectRatio = "9:16"): number {
  const [w, h] = r.split(":").map(Number);
  return w / h;
}

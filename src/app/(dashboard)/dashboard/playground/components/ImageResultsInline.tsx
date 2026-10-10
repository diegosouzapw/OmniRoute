"use client";

import { useTranslations } from "next-intl";

export interface PlaygroundImageResult {
  src: string;
  revisedPrompt?: string;
}

const RASTER_DATA_PREFIXES = [
  "data:image/avif;base64,",
  "data:image/gif;base64,",
  "data:image/jpeg;base64,",
  "data:image/jpg;base64,",
  "data:image/png;base64,",
  "data:image/webp;base64,",
];

function safeImageSource(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const source = value.trim();
  if (!source) return null;
  const lowerSource = source.toLowerCase();
  if (
    RASTER_DATA_PREFIXES.some(
      (prefix) => lowerSource.startsWith(prefix) && source.length > prefix.length
    )
  ) {
    return source;
  }

  try {
    const protocol = new URL(source, "http://localhost").protocol;
    return protocol === "http:" || protocol === "https:" ? source : null;
  } catch {
    return null;
  }
}

export function extractPlaygroundImageResults(data: unknown): PlaygroundImageResult[] {
  if (!data || typeof data !== "object") return [];
  const items = (data as { data?: unknown }).data;
  if (!Array.isArray(items)) return [];

  const results: PlaygroundImageResult[] = [];
  for (const item of items) {
    if (!item || typeof item !== "object") continue;
    const record = item as { url?: unknown; b64_json?: unknown; revised_prompt?: unknown };
    const base64 = typeof record.b64_json === "string" ? record.b64_json.trim() : "";
    const src = safeImageSource(record.url) || (base64 ? `data:image/png;base64,${base64}` : null);
    if (!src) continue;
    results.push({
      src,
      ...(typeof record.revised_prompt === "string" && record.revised_prompt.trim()
        ? { revisedPrompt: record.revised_prompt }
        : {}),
    });
  }
  return results;
}

export default function ImageResultsInline({ images }: { images: PlaygroundImageResult[] }) {
  const t = useTranslations("playground");
  const safeImages = images.flatMap((image) => {
    const src = safeImageSource(image.src);
    return src ? [{ ...image, src }] : [];
  });
  if (safeImages.length === 0) return null;

  return (
    <div className="p-4 space-y-3">
      <p className="text-xs text-text-muted font-medium uppercase tracking-wider">
        {t("imagesGenerated", { count: safeImages.length })}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {safeImages.map((image, index) => (
          <div
            key={index}
            className="relative group rounded-lg overflow-hidden border border-border"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image.src}
              alt={image.revisedPrompt || t("generatedImage", { index: index + 1 })}
              className="w-full"
            />
            <a
              href={image.src}
              download={`image-${index + 1}.png`}
              className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[13px]">download</span>
              {t("save")}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

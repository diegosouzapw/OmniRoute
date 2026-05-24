"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

export type MediaKind =
  | "embedding"
  | "image"
  | "imageToText"
  | "tts"
  | "stt"
  | "webSearch"
  | "webFetch"
  | "video"
  | "music";

export const MEDIA_KINDS: MediaKind[] = [
  "embedding",
  "image",
  "imageToText",
  "tts",
  "stt",
  "webSearch",
  "webFetch",
  "video",
  "music",
];

interface MediaProviderKindNavProps {
  activeKind: MediaKind;
}

export default function MediaProviderKindNav({ activeKind }: MediaProviderKindNavProps) {
  const t = useTranslations("media");

  return (
    <div className="flex flex-wrap gap-2 border-b border-border pb-3">
      {MEDIA_KINDS.map((kind) => {
        const isActive = kind === activeKind;
        const label = t(`kinds.${kind}`);
        return (
          <Link
            key={kind}
            href={`/dashboard/media-providers/${kind}`}
            className={`flex items-center px-3 py-1.5 rounded-full border text-xs font-medium transition-colors ${
              isActive
                ? "bg-primary text-white border-primary"
                : "bg-bg-subtle border-border text-text-muted hover:text-text-primary hover:border-primary/30"
            }`}
            aria-current={isActive ? "page" : undefined}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}

"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { PlayView } from "./PlayView";
import { CompareView } from "./CompareView";
export default function CompressionStudioPage() {
  const t = useTranslations("compressionStudio");
  const [tab, setTab] = useState<"play" | "compare">("play");
  const [text, setText] = useState("");
  return (
    <div className="flex h-[calc(100dvh-6rem)] min-h-[480px] flex-col p-4">
      <div className="mb-3 flex gap-2">
        <button data-testid="tab-play" aria-pressed={tab === "play"} onClick={() => setTab("play")}>
          {t("playTab")}
        </button>
        <button
          data-testid="tab-compare"
          aria-pressed={tab === "compare"}
          onClick={() => setTab("compare")}
        >
          {t("compareTab")}
        </button>
      </div>
      <div className="min-h-0 flex-1">
        {tab === "play" ? <PlayView text={text} onText={setText} /> : <CompareView text={text} />}
      </div>
    </div>
  );
}

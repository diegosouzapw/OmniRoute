"use client";

import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import Image from "next/image";

export function TierFlowDiagram() {
  const t = useTranslations("onboarding.tier");
  const tOnboarding = useTranslations("onboarding");
  const { resolvedTheme } = useTheme();
  const src =
    resolvedTheme === "dark" ? "/images/tier-flow-dark.svg" : "/images/tier-flow-light.svg";

  return (
    <div className="flex flex-col items-center gap-3 my-4">
      <Image
        src={src}
        alt={tOnboarding("tierFlowDiagramAlt")}
        width={800}
        height={420}
        priority
        className="w-full max-w-2xl rounded-lg border border-white/[0.06]"
      />
      <p className="mx-auto max-w-md text-xs leading-relaxed text-text-muted text-center text-balance">
        {t("flowCaption")}
      </p>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { cn } from "@/shared/utils/cn";
import type { CliConceptType } from "./CliConceptCard";

export interface CliComparisonCardProps {
  currentType: CliConceptType;
}

const TYPE_HREFS: Record<CliConceptType, string> = {
  code: "/dashboard/cli-code",
  agent: "/dashboard/cli-agents",
  acp: "/dashboard/acp-agents",
};

export default function CliComparisonCard({ currentType }: CliComparisonCardProps) {
  const t = useTranslations("cliCommon");

  const types: CliConceptType[] = ["code", "agent", "acp"];

  return (
    <div className="bg-surface border border-black/5 dark:border-white/5 rounded-lg shadow-sm p-4">
      <div className="grid grid-cols-3 gap-3">
        {types.map((type) => {
          const isCurrent = type === currentType;
          return (
            <div
              key={type}
              className={cn(
                "flex flex-col gap-2 p-3 rounded-lg",
                isCurrent
                  ? "bg-primary/10 border border-primary/30"
                  : "bg-black/[0.02] dark:bg-white/[0.02] border border-transparent"
              )}
            >
              {/* Title */}
              <div className="flex items-center justify-between gap-1 flex-wrap">
                <span
                  className={cn(
                    "text-xs font-semibold uppercase tracking-wider",
                    isCurrent ? "text-primary" : "text-text-muted"
                  )}
                >
                  {t(`comparison.${type}.title`)}
                </span>
                {isCurrent ? (
                  <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-medium rounded-full bg-primary/20 text-primary whitespace-nowrap">
                    {t("comparison.thisPage")} ✓
                  </span>
                ) : (
                  <Link
                    href={TYPE_HREFS[type]}
                    className="inline-flex items-center px-1.5 py-0.5 text-[10px] font-medium rounded-full bg-black/5 dark:bg-white/5 text-text-muted hover:text-primary hover:bg-primary/10 transition-colors whitespace-nowrap"
                  >
                    {t("comparison.open")}
                  </Link>
                )}
              </div>

              {/* Description */}
              <p className="text-[11px] text-text-muted leading-relaxed">
                {t(`comparison.${type}.desc`)}
              </p>

              {/* Flow */}
              <p className="text-[10px] text-text-muted font-mono">
                {t(`comparison.${type}.flow`)}
              </p>

              {/* Examples */}
              <p className="text-[10px] text-text-muted italic">
                {t(`comparison.${type}.examples`)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

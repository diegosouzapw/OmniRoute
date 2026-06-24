"use client";

import { useTranslations } from "next-intl";
import type { SkillCoverage } from "@/lib/agentSkills/types";

interface CoverageBarProps {
  coverage: SkillCoverage;
}

function barColor(have: number, total: number): string {
  const pct = total > 0 ? have / total : 0;
  if (pct >= 1) return "bg-emerald-500";
  if (pct >= 0.75) return "bg-amber-400";
  return "bg-red-500";
}

function trackColor(have: number, total: number): string {
  const pct = total > 0 ? have / total : 0;
  if (pct >= 1) return "bg-emerald-500/20";
  if (pct >= 0.75) return "bg-amber-400/20";
  return "bg-red-500/20";
}

export function CoverageBar({ coverage }: CoverageBarProps): JSX.Element {
  const t = useTranslations("agentSkills");
  const { api, cli } = coverage;

  return (
    <div className="flex flex-col gap-2 text-xs" data-testid="coverage-bar">
      <div className="flex items-center justify-between gap-2">
        <span className="font-medium text-text-muted shrink-0">
          {t("categoryApi")} {api.have}/{api.total}
        </span>
        <div
          className={`flex-1 h-2 rounded-full overflow-hidden ${trackColor(api.have, api.total)}`}
        >
          <div
            role="progressbar"
            aria-valuenow={api.have}
            aria-valuemin={0}
            aria-valuemax={api.total}
            aria-label={`${t("categoryApi")} ${api.have}/${api.total}`}
            className={`h-full rounded-full transition-all duration-500 ${barColor(api.have, api.total)}`}
            style={{ width: `${api.total > 0 ? (api.have / api.total) * 100 : 0}%` }}
          />
        </div>
        <span className="shrink-0 text-text-muted w-12 text-right">
          {api.total > 0 ? Math.round((api.have / api.total) * 100) : 0}%
        </span>
      </div>

      <div className="flex items-center justify-between gap-2">
        <span className="font-medium text-text-muted shrink-0">
          {t("categoryCli")} {cli.have}/{cli.total}
        </span>
        <div
          className={`flex-1 h-2 rounded-full overflow-hidden ${trackColor(cli.have, cli.total)}`}
        >
          <div
            role="progressbar"
            aria-valuenow={cli.have}
            aria-valuemin={0}
            aria-valuemax={cli.total}
            aria-label={`${t("categoryCli")} ${cli.have}/${cli.total}`}
            className={`h-full rounded-full transition-all duration-500 ${barColor(cli.have, cli.total)}`}
            style={{ width: `${cli.total > 0 ? (cli.have / cli.total) * 100 : 0}%` }}
          />
        </div>
        <span className="shrink-0 text-text-muted w-12 text-right">
          {cli.total > 0 ? Math.round((cli.have / cli.total) * 100) : 0}%
        </span>
      </div>
    </div>
  );
}

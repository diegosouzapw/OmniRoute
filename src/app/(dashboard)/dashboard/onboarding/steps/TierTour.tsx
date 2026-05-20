"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { TierFlowDiagram } from "../components/TierFlowDiagram";

type TierCardProps = {
  number: number;
  colorClass: string;
  label: string;
  description: string;
  examples: string[];
};

function TierCard({ number, colorClass, label, description, examples }: TierCardProps) {
  return (
    <div className={`p-4 rounded-xl border-2 ${colorClass}`}>
      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-2xl font-bold">{number}</span>
        <span className="font-semibold text-sm">{label}</span>
      </div>
      <p className="text-xs text-text-muted mb-3">{description}</p>
      <ul className="text-xs space-y-0.5 text-text-muted">
        {examples.map((e) => (
          <li key={e}>· {e}</li>
        ))}
      </ul>
    </div>
  );
}

export function TierTour() {
  const t = useTranslations("onboarding.tier");

  return (
    <div className="space-y-5">
      <div className="text-center">
        <p className="text-sm text-text-muted">{t("subtitle")}</p>
      </div>

      <TierFlowDiagram />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <TierCard
          number={1}
          colorClass="border-amber-500/60 bg-amber-500/[0.06]"
          label={t("tier1.label")}
          description={t("tier1.description")}
          examples={["Claude Code", "Codex", "Copilot", "Cursor"]}
        />
        <TierCard
          number={2}
          colorClass="border-green-500/60 bg-green-500/[0.06]"
          label={t("tier2.label")}
          description={t("tier2.description")}
          examples={["DeepSeek", "GLM", "MiniMax", "Qwen"]}
        />
        <TierCard
          number={3}
          colorClass="border-indigo-500/60 bg-indigo-500/[0.06]"
          label={t("tier3.label")}
          description={t("tier3.description")}
          examples={["Kiro", "OpenCode", "Gemini CLI", "Vertex"]}
        />
      </div>

      <p className="text-xs text-text-muted/60 text-center">
        <Link href="/dashboard/providers/new" className="underline hover:text-text-muted">
          {t("configure")}
        </Link>{" "}
        after setup.
      </p>
    </div>
  );
}

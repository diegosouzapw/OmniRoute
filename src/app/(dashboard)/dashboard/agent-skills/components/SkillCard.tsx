"use client";

import { useCallback } from "react";
import { useTranslations } from "next-intl";
import type { AgentSkill } from "@/lib/agentSkills/types";

interface SkillCardProps {
  skill: AgentSkill;
  selected: boolean;
  onClick: () => void;
}

export function SkillCard({ skill, selected, onClick }: SkillCardProps): JSX.Element {
  const t = useTranslations("agentSkills");

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onClick();
      }
    },
    [onClick],
  );

  const previewItems: string[] =
    skill.category === "api"
      ? (skill.endpoints ?? []).slice(0, 2)
      : skill.category === "cli"
        ? (skill.cliCommands ?? []).slice(0, 2)
        : [];

  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={selected}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      data-testid={`skill-card-${skill.id}`}
      className={`flex items-start gap-3 rounded-lg border p-3 cursor-pointer transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
        selected
          ? "border-primary/40 bg-primary/5"
          : "border-border bg-bg hover:bg-bg-subtle hover:border-border"
      }`}
    >
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
          selected ? "bg-primary/15" : "bg-bg-subtle"
        }`}
      >
        <span
          className={`material-symbols-outlined text-[18px] ${
            selected ? "text-primary" : "text-text-muted"
          }`}
        >
          {skill.icon ?? "article"}
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <div className="mb-0.5 flex flex-wrap items-center gap-1.5">
          <span className="text-sm font-semibold text-text-main">{skill.name}</span>

          <span
            className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
              skill.category === "api"
                ? "bg-blue-500/10 text-blue-700 dark:text-blue-400"
                : skill.category === "cli"
                  ? "bg-violet-500/10 text-violet-700 dark:text-violet-400"
                  : "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
            }`}
          >
            {skill.category === "api"
              ? t("categoryApi")
              : skill.category === "cli"
                ? t("categoryCli")
                : t("categoryConfig")}
          </span>

          {skill.isEntry && (
            <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary">
              start
            </span>
          )}

          {skill.isNew && (
            <span className="rounded-full bg-amber-500/10 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-700 dark:text-amber-400">
              new
            </span>
          )}
        </div>

        <p className="text-xs leading-relaxed text-text-muted line-clamp-2">{skill.description}</p>

        {previewItems.length > 0 && (
          <div className="mt-1.5 flex flex-wrap gap-1">
            {previewItems.map((item) => (
              <code
                key={item}
                className="rounded bg-bg-subtle px-1.5 py-0.5 font-mono text-[10px] text-text-muted border border-border/50"
              >
                {item}
              </code>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SkillCard;

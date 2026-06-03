"use client";

import { useTranslations } from "next-intl";
import { Card } from "@/shared/components";
import { OmniSkillCard } from "./OmniSkillCard";
import { SkillInspectorPane } from "./SkillInspectorPane";
import type { OmniSkill } from "./OmniSkillCard";

interface OmniSkillsListProps {
  skills: OmniSkill[];
  skillsTotal: number;
  skillsPage: number;
  skillsTotalPages: number;
  popularDefaults: string[];
  searchTerm: string;
  modeFilter: "all" | "on" | "off" | "auto";
  selectedSkillId: string | null;
  onSearchTermChange: (v: string) => void;
  onModeFilterChange: (v: "all" | "on" | "off" | "auto") => void;
  onApplyFilters: () => void;
  onPagePrev: () => void;
  onPageNext: () => void;
  onSelectSkill: (id: string) => void;
  onSetMode: (skillId: string, mode: "on" | "off" | "auto") => void;
  onUninstall: (skillId: string) => void;
}

export function OmniSkillsList({
  skills,
  skillsTotal,
  skillsPage,
  skillsTotalPages,
  popularDefaults,
  searchTerm,
  modeFilter,
  selectedSkillId,
  onSearchTermChange,
  onModeFilterChange,
  onApplyFilters,
  onPagePrev,
  onPageNext,
  onSelectSkill,
  onSetMode,
  onUninstall,
}: OmniSkillsListProps): JSX.Element {
  const t = useTranslations("skills");

  const selectedSkill = selectedSkillId
    ? (skills.find((s) => s.id === selectedSkillId) ?? null)
    : null;

  return (
    <div className="grid grid-cols-12 gap-4">
      {/* Left: grid + filters */}
      <div className="col-span-12 lg:col-span-7 flex flex-col gap-4">
        <Card>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 items-center">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchTermChange(e.target.value)}
              placeholder={t("filterSkillsPlaceholder")}
              className="px-3 py-2 rounded-lg bg-background border border-border text-sm focus:outline-none focus:ring-1 focus:ring-violet-500"
            />
            <select
              value={modeFilter}
              onChange={(e) => onModeFilterChange(e.target.value as "all" | "on" | "off" | "auto")}
              className="px-3 py-2 rounded-lg bg-background border border-border text-sm focus:outline-none focus:ring-1 focus:ring-violet-500"
            >
              <option value="all">{t("allModes")}</option>
              <option value="on">{t("onMode")}</option>
              <option value="auto">{t("autoMode")}</option>
              <option value="off">{t("offMode")}</option>
            </select>
            <button
              onClick={onApplyFilters}
              className="px-4 py-2 text-sm font-medium rounded-lg bg-violet-500 text-white hover:bg-violet-600 transition-colors"
            >
              {t("applyFilters")}
            </button>
          </div>

          {popularDefaults.length > 0 && (
            <div className="mt-3">
              <p className="text-xs text-text-muted mb-2">{t("popularDefaultsLabel")}</p>
              <div className="flex flex-wrap gap-2">
                {popularDefaults.map((name) => (
                  <span
                    key={name}
                    className="text-xs px-2 py-1 rounded bg-violet-500/10 text-violet-300 border border-violet-500/20"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </Card>

        {skills.length === 0 ? (
          <Card>
            <div className="text-center py-8 text-text-muted">{t("noSkills")}</div>
          </Card>
        ) : (
          <div className="flex flex-col gap-2">
            {skills.map((skill) => (
              <OmniSkillCard
                key={skill.id}
                skill={skill}
                selected={selectedSkillId === skill.id}
                onClick={() => onSelectSkill(skill.id)}
              />
            ))}
          </div>
        )}

        <div className="flex items-center justify-between pt-2 border-t border-border">
          <span className="text-sm text-text-muted">
            {t("pageInfo", {
              page: skillsPage,
              totalPages: skillsTotalPages,
              total: skillsTotal,
            })}
          </span>
          <div className="flex gap-2">
            <button
              onClick={onPagePrev}
              disabled={skillsPage === 1}
              className="px-3 py-1 text-sm rounded border border-border text-text-muted hover:text-text-main disabled:opacity-40 transition-colors"
            >
              {t("previous")}
            </button>
            <button
              onClick={onPageNext}
              disabled={skillsPage === skillsTotalPages || skillsTotalPages === 0}
              className="px-3 py-1 text-sm rounded border border-border text-text-muted hover:text-text-main disabled:opacity-40 transition-colors"
            >
              {t("next")}
            </button>
          </div>
        </div>
      </div>

      {/* Right: inspector pane */}
      <div className="col-span-12 lg:col-span-5">
        <div className="sticky top-4 rounded-xl border border-border bg-surface/30 overflow-hidden min-h-[400px]">
          <SkillInspectorPane
            selectedSkillId={selectedSkillId}
            skill={selectedSkill}
            onSetMode={onSetMode}
            onUninstall={onUninstall}
          />
        </div>
      </div>
    </div>
  );
}

export default OmniSkillsList;

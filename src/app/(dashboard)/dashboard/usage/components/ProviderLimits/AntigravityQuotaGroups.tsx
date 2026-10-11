"use client";

import { useState } from "react";
import { formatCountdown, getBarColor } from "./utils";

export type QuotaWindow = {
  remainingPercentage?: number;
  resetAt?: string | null;
};

export type QuotaGroup = {
  id: string;
  displayName: string;
  windows?: { session?: QuotaWindow; weekly?: QuotaWindow };
  models?: string[];
};

export function resolveAntigravityQuotaGroups(
  rawGroups?: Array<Record<string, unknown>>,
  quotas?: any[]
): QuotaGroup[] {
  if (Array.isArray(rawGroups) && rawGroups.length > 0) {
    return rawGroups as QuotaGroup[];
  }

  if (!Array.isArray(quotas) || quotas.length === 0) {
    return [];
  }

  const geminiSession = quotas.find(
    (q) => q.name === "gemini_session" || q.modelKey === "gemini_session"
  );
  const geminiWeekly = quotas.find(
    (q) => q.name === "gemini_weekly" || q.modelKey === "gemini_weekly"
  );
  const claudeSession = quotas.find(
    (q) => q.name === "claude_gpt_session" || q.modelKey === "claude_gpt_session"
  );
  const claudeWeekly = quotas.find(
    (q) => q.name === "claude_gpt_weekly" || q.modelKey === "claude_gpt_weekly"
  );

  const isGeminiModel = (name: string) =>
    name.includes("gemini") && name !== "gemini_session" && name !== "gemini_weekly";
  const isClaudeModel = (name: string) =>
    (name.includes("claude") || name.includes("gpt")) &&
    name !== "claude_gpt_session" &&
    name !== "claude_gpt_weekly";

  const geminiModels = quotas
    .map((q) => q.modelKey || q.name || "")
    .filter(isGeminiModel);
  const claudeModels = quotas
    .map((q) => q.modelKey || q.name || "")
    .filter(isClaudeModel);

  const fallbackGeminiSession = !geminiSession
    ? quotas.find((q) => isGeminiModel(q.modelKey || q.name || ""))
    : undefined;
  const fallbackClaudeSession = !claudeSession
    ? quotas.find((q) => isClaudeModel(q.modelKey || q.name || ""))
    : undefined;

  const effectiveGeminiSession = geminiSession || fallbackGeminiSession;
  const effectiveClaudeSession = claudeSession || fallbackClaudeSession;

  const groups: QuotaGroup[] = [];

  if (effectiveGeminiSession || geminiWeekly || geminiModels.length > 0) {
    groups.push({
      id: "gemini",
      displayName: "Gemini Models",
      windows: {
        ...(effectiveGeminiSession
          ? {
              session: {
                remainingPercentage: effectiveGeminiSession.remainingPercentage,
                resetAt: effectiveGeminiSession.resetAt,
              },
            }
          : {}),
        ...(geminiWeekly
          ? {
              weekly: {
                remainingPercentage: geminiWeekly.remainingPercentage,
                resetAt: geminiWeekly.resetAt,
              },
            }
          : {}),
      },
      models: geminiModels,
    });
  }

  if (effectiveClaudeSession || claudeWeekly || claudeModels.length > 0) {
    groups.push({
      id: "claude_gpt",
      displayName: "Claude & GPT Models",
      windows: {
        ...(effectiveClaudeSession
          ? {
              session: {
                remainingPercentage: effectiveClaudeSession.remainingPercentage,
                resetAt: effectiveClaudeSession.resetAt,
              },
            }
          : {}),
        ...(claudeWeekly
          ? {
              weekly: {
                remainingPercentage: claudeWeekly.remainingPercentage,
                resetAt: claudeWeekly.resetAt,
              },
            }
          : {}),
      },
      models: claudeModels,
    });
  }

  return groups;
}

function formatModelName(model: string): string {
  return model
    .split("-")
    .map((part) => (part === "gpt" ? "GPT" : part === "gemini" ? "Gemini" : part))
    .join(" ");
}

function QuotaWindowRow({ label, window }: { label: string; window?: QuotaWindow }) {
  if (!window) {
    return <p className="text-[11px] text-text-muted">{label}: unavailable from upstream</p>;
  }

  const remaining = Math.max(0, Math.min(100, Number(window.remainingPercentage) || 0));
  const countdown = formatCountdown(window.resetAt || null);
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between text-[11px] text-text-main">
        <span>{label}</span>
        <span className="font-medium">{Math.round(remaining)}% left</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-bg-muted">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${remaining}%`, backgroundColor: getBarColor(remaining).bar }}
        />
      </div>
      {countdown ? (
        <span className="text-[10px] text-text-muted">Resets in {countdown}</span>
      ) : null}
    </div>
  );
}

export default function AntigravityQuotaGroups({ groups }: { groups: QuotaGroup[] }) {
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});

  return (
    <div className="flex flex-col gap-3">
      {groups.map((group) => {
        const models = group.models || [];
        const expanded = expandedGroups[group.id] === true;
        const visibleModels = expanded ? models : models.slice(0, 4);
        return (
          <section
            key={group.id}
            className="rounded-md border border-border/60 bg-bg-subtle/40 p-2"
          >
            <h4 className="mb-2 text-xs font-semibold text-text-main">{group.displayName}</h4>
            <div className="flex flex-col gap-2">
              <QuotaWindowRow label="5 hour" window={group.windows?.session} />
              <QuotaWindowRow label="Weekly" window={group.windows?.weekly} />
            </div>
            <div className="mt-2 border-t border-border/40 pt-2 text-[11px] text-text-muted">
              <p>Models available: {models.length}</p>
              {visibleModels.map((model) => (
                <p key={model} className="truncate text-text-main" title={model}>
                  {formatModelName(model)}
                </p>
              ))}
              {models.length > visibleModels.length ? (
                <button
                  type="button"
                  className="mt-1 text-primary hover:underline"
                  onClick={() => setExpandedGroups((current) => ({ ...current, [group.id]: true }))}
                >
                  Show {models.length - visibleModels.length} more
                </button>
              ) : expanded && models.length > 4 ? (
                <button
                  type="button"
                  className="mt-1 text-primary hover:underline"
                  onClick={() =>
                    setExpandedGroups((current) => ({ ...current, [group.id]: false }))
                  }
                >
                  Show less
                </button>
              ) : null}
            </div>
          </section>
        );
      })}
    </div>
  );
}

"use client";

import { useCallback } from "react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";

// Lazy-load react-markdown to reduce initial bundle size.
const ReactMarkdown = dynamic(() => import("react-markdown"), {
  loading: () => <SkeletonLines lines={6} />,
});

// remark-gfm loaded lazily alongside ReactMarkdown via remarkPlugins prop.
// We avoid rehype-raw to prevent XSS (Hard Rule #7 context).

interface SkillPreviewPaneProps {
  skillId: string | null;
  markdown: string | null;
  loading: boolean;
  onRefresh?: () => void;
}

function SkeletonLines({ lines }: { lines: number }): JSX.Element {
  return (
    <div className="space-y-2 animate-pulse" aria-hidden="true">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-3 rounded bg-bg-subtle"
          style={{ width: `${60 + ((i * 17) % 40)}%` }}
        />
      ))}
    </div>
  );
}

export function SkillPreviewPane({
  skillId,
  markdown,
  loading,
  onRefresh,
}: SkillPreviewPaneProps): JSX.Element {
  const t = useTranslations("agentSkills");

  const handleCopyRawUrl = useCallback(async () => {
    if (!skillId) return;
    const rawUrl = `https://raw.githubusercontent.com/diegosouzapw/OmniRoute/refs/heads/main/skills/${skillId}/SKILL.md`;
    try {
      await navigator.clipboard.writeText(rawUrl);
    } catch {
      // clipboard not available — silently ignore
    }
  }, [skillId]);

  const githubUrl = skillId
    ? `https://github.com/diegosouzapw/OmniRoute/blob/main/skills/${skillId}/SKILL.md`
    : null;

  // Empty state
  if (!skillId) {
    return (
      <div
        className="flex flex-col items-center justify-center h-full min-h-[300px] rounded-xl border border-dashed border-border bg-bg-subtle/30 p-8 text-center"
        data-testid="skill-preview-empty"
      >
        <span className="material-symbols-outlined text-[32px] text-text-muted mb-3">article</span>
        <p className="text-sm text-text-muted">{t("previewEmpty")}</p>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col rounded-xl border border-border bg-bg h-full"
      data-testid="skill-preview-pane"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-2 border-b border-border px-4 py-2.5 shrink-0">
        <span className="text-xs font-mono font-semibold text-text-muted truncate">
          {skillId}/SKILL.md
        </span>
        <div className="flex items-center gap-1 shrink-0">
          {onRefresh && (
            <button
              onClick={onRefresh}
              disabled={loading}
              className="flex items-center gap-1 rounded px-2 py-1 text-xs text-text-muted hover:text-text-main hover:bg-bg-subtle transition-colors disabled:opacity-50"
              aria-label={t("refresh")}
            >
              <span
                className={`material-symbols-outlined text-[14px] ${loading ? "animate-spin" : ""}`}
              >
                refresh
              </span>
            </button>
          )}
          <button
            onClick={() => void handleCopyRawUrl()}
            disabled={!skillId}
            className="flex items-center gap-1 rounded px-2 py-1 text-xs text-text-muted hover:text-text-main hover:bg-bg-subtle transition-colors"
            title={t("copyUrl")}
            aria-label={t("copyUrl")}
          >
            <span className="material-symbols-outlined text-[14px]">content_copy</span>
          </button>
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 rounded px-2 py-1 text-xs text-text-muted hover:text-text-main hover:bg-bg-subtle transition-colors"
              title={t("viewOnGithub")}
              aria-label={t("viewOnGithub")}
            >
              <span className="material-symbols-outlined text-[14px]">open_in_new</span>
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 min-h-0">
        {loading ? (
          <SkeletonLines lines={12} />
        ) : markdown ? (
          <div
            className="prose prose-sm dark:prose-invert max-w-none text-text-main"
            data-testid="skill-preview-markdown"
          >
            <ReactMarkdown>{markdown}</ReactMarkdown>
          </div>
        ) : (
          <div
            className="flex items-center gap-2 rounded-lg border border-red-300 bg-red-50 dark:bg-red-950/30 p-3 text-xs text-red-700 dark:text-red-400"
            data-testid="skill-preview-error"
          >
            <span className="material-symbols-outlined text-[16px]">error</span>
            {t("previewError")}
          </div>
        )}
      </div>
    </div>
  );
}

export default SkillPreviewPane;

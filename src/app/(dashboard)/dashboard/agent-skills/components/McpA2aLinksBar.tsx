"use client";

import { useCallback, useState, useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";

// SSR-safe origin via useSyncExternalStore.
// Server snapshot returns "" (avoids hydration mismatch).
function useOrigin(): string {
  return useSyncExternalStore(
    () => () => {}, // no external subscription needed
    () => (typeof window !== "undefined" ? window.location.origin : ""),
    () => "" // server snapshot
  );
}

interface LinkCardProps {
  label: string;
  url: string;
  icon: string;
  prompt: string;
}

function LinkCard({ label, url, icon, prompt }: LinkCardProps): JSX.Element {
  const t = useTranslations("agentSkills");
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard not available — silently ignore
    }
  }, [url]);

  return (
    <div className="flex-1 flex items-start gap-3 rounded-lg border border-border bg-bg-subtle p-3 min-w-0">
      <div className="flex items-center justify-center size-8 rounded-lg bg-primary/10 shrink-0">
        <span className="material-symbols-outlined text-primary text-[16px]">{icon}</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-1 mb-1">
          <span className="text-xs font-semibold text-text-main">{label}</span>
          <button
            onClick={() => void handleCopy()}
            className={`flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-medium transition-colors shrink-0 ${
              copied
                ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                : "bg-bg text-text-muted hover:text-text-main"
            }`}
            title={t("copyUrl")}
            aria-label={`${t("copyUrl")} ${label}`}
          >
            <span className="material-symbols-outlined text-[11px]">
              {copied ? "check" : "content_copy"}
            </span>
            {copied ? "✓" : t("copyUrl")}
          </button>
        </div>
        <code className="block truncate text-[10px] font-mono text-text-muted">{url}</code>
        <p className="mt-1 text-[10px] text-text-muted leading-relaxed italic">{prompt}</p>
      </div>
    </div>
  );
}

export function McpA2aLinksBar(): JSX.Element {
  const t = useTranslations("agentSkills");
  const origin = useOrigin();

  const mcpUrl = origin ? `${origin}/api/mcp/sse` : "/api/mcp/sse";
  const a2aUrl = origin ? `${origin}/.well-known/agent.json` : "/.well-known/agent.json";

  return (
    <div className="flex flex-col sm:flex-row gap-2" data-testid="mcp-a2a-links-bar">
      <LinkCard
        label={t("mcpUrl")}
        url={mcpUrl}
        icon="electrical_services"
        prompt={t("mcpPrompt")}
      />
      <LinkCard label={t("a2aLink")} url={a2aUrl} icon="hub" prompt={t("a2aPrompt")} />
    </div>
  );
}

export default McpA2aLinksBar;

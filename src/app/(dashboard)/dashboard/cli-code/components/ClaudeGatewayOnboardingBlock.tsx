"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { buildClaudeDiscoverySettingsSnippet } from "@/shared/services/claudeCliConfig";

/**
 * ClaudeGatewayOnboardingBlock — the copy-paste `settings.json` fragment that points
 * Claude Code at this OmniRoute with gateway model discovery enabled.
 *
 * Sits next to ClaudeCcDiscoveryInfoButton on the Claude tool card: that button explains
 * the discovery-alias gate and links to the flag, this block gives the operator the exact
 * config to paste. The key is never rendered — a placeholder goes in its slot, because
 * this card is shown before a key is necessarily chosen and a real key in copyable text
 * is an easy way to leak one into a screenshot or a pasted snippet.
 */
export default function ClaudeGatewayOnboardingBlock({ baseUrl }: { baseUrl: string }) {
  const t = useTranslations("cliTools");
  const [copied, setCopied] = useState(false);

  const snippet = buildClaudeDiscoverySettingsSnippet({
    baseUrl,
    apiKeyPlaceholder: t("ccOnboardingKeyPlaceholder"),
  });

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard denied (insecure origin / permission) — the snippet stays selectable.
    }
  };

  return (
    <div className="rounded-lg border border-border bg-sidebar/40 p-3">
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="text-[12px] font-medium text-text-main">{t("ccOnboardingTitle")}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 text-[11px] text-text-main hover:border-primary/40 transition-colors"
        >
          <span className="material-symbols-outlined text-[14px]">
            {copied ? "check" : "content_copy"}
          </span>
          {copied ? t("ccOnboardingCopied") : t("ccOnboardingCopy")}
        </button>
      </div>

      <pre className="overflow-x-auto rounded-md bg-black/5 p-2 font-mono text-[11px] leading-relaxed text-text-main dark:bg-white/5">
        {snippet}
      </pre>

      <p className="mt-2 text-[11px] text-text-muted">{t("ccOnboardingWindowNote")}</p>
    </div>
  );
}

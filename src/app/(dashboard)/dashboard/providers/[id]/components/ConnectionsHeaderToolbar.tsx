"use client";

import { Button, Toggle } from "@/shared/components";
import { providerText, type ProviderMessageTranslator } from "../providerPageHelpers";
import type { CodexGlobalServiceMode } from "@/lib/providers/codexFastTier";

type ConnectionsHeaderToolbarProps = {
  providerId: string;
  providerInfo: any; // resolveDashboardProviderInfo result
  isCompatible: boolean;
  isCommandCode: boolean;
  isOAuth: boolean;
  providerSupportsPat: boolean;
  connections: any[]; // ConnectionRowConnection[]
  batchTesting: boolean;
  batchRetesting: boolean;
  retestingId: string | null;
  distributingProxies: boolean;
  proxyConfig: any;
  // from useProviderSettings
  preferClaudeCodeForUnprefixedClaudeModels: boolean;
  claudeRoutingSettingsLoaded: boolean;
  claudeRoutingSettingsLoadError: string | null;
  savingClaudeRoutingPreference: boolean;
  handleToggleClaudeRoutingPreference: () => void;
  loadClaudeRoutingSettings: () => Promise<void>;
  codexGlobalServiceMode: string;
  codexGlobalServiceModeOptions: Array<{ value: string; label: string }>;
  codexSettingsLoaded: boolean;
  codexSettingsLoadError: string | null;
  savingCodexGlobalServiceMode: boolean;
  handleChangeCodexGlobalServiceMode: (mode: any) => void;
  loadCodexSettings: () => Promise<void>;
  // Modal triggers
  onSetProxyTarget: (target: { level: string; id: string; label: string }) => void;
  handleDistributeProxies: () => void;
  handleBatchTestAll: () => void;
  gateConnectionFlow: (callback: () => void) => void;
  openApiKeyAddFlow: () => void;
  openPrimaryAddFlow: () => void;
  openExternalLinkFlow: () => void;
  handleOpenCommandCodeConnect: () => void;
  commandCodeAuthState: { phase: string };
  onOpenOAuthModal: () => void;
  onOpenCodexCliGuide: () => void;
  onOpenImportCodex: () => void;
  onOpenImportClaude: () => void;
  onOpenImportGemini: () => void;
  t: ProviderMessageTranslator;
};

export default function ConnectionsHeaderToolbar({
  providerId,
  providerInfo,
  isCompatible,
  isCommandCode,
  isOAuth,
  providerSupportsPat,
  connections,
  batchTesting,
  batchRetesting,
  retestingId,
  distributingProxies,
  proxyConfig,
  preferClaudeCodeForUnprefixedClaudeModels,
  claudeRoutingSettingsLoaded,
  claudeRoutingSettingsLoadError,
  savingClaudeRoutingPreference,
  handleToggleClaudeRoutingPreference,
  loadClaudeRoutingSettings,
  codexGlobalServiceMode,
  codexGlobalServiceModeOptions,
  codexSettingsLoaded,
  codexSettingsLoadError,
  savingCodexGlobalServiceMode,
  handleChangeCodexGlobalServiceMode,
  loadCodexSettings,
  onSetProxyTarget,
  handleDistributeProxies,
  handleBatchTestAll,
  gateConnectionFlow,
  openApiKeyAddFlow,
  openPrimaryAddFlow,
  openExternalLinkFlow,
  handleOpenCommandCodeConnect,
  commandCodeAuthState,
  onOpenOAuthModal,
  onOpenCodexCliGuide,
  onOpenImportCodex,
  onOpenImportClaude,
  onOpenImportGemini,
  t,
}: ConnectionsHeaderToolbarProps) {
  return (
    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 flex-wrap items-center gap-2">
        <h2 className="text-lg font-semibold">{t("connections")}</h2>
        {providerId === "claude" && (
          <div
            className="inline-flex items-center gap-2 rounded-lg border border-orange-500/20 bg-orange-500/5 px-2 py-1 text-xs font-medium text-text-muted"
            title={providerText(
              t,
              "preferClaudeCodeForUnprefixedClaudeModelsTooltip",
              "Route bare claude-* model IDs from Claude Code clients through the Claude Code account instead of asking for a provider prefix."
            )}
          >
            <span className="material-symbols-outlined text-[14px] text-orange-500">
              alt_route
            </span>
            <span>
              {providerText(
                t,
                "preferClaudeCodeForUnprefixedClaudeModelsLabel",
                "Claude Code default"
              )}
            </span>
            <Toggle
              size="sm"
              checked={preferClaudeCodeForUnprefixedClaudeModels}
              onChange={handleToggleClaudeRoutingPreference}
              disabled={savingClaudeRoutingPreference || !claudeRoutingSettingsLoaded}
              ariaLabel={providerText(
                t,
                "preferClaudeCodeForUnprefixedClaudeModelsAria",
                "Prefer Claude Code for unprefixed Claude models"
              )}
              title={
                preferClaudeCodeForUnprefixedClaudeModels
                  ? providerText(
                      t,
                      "preferClaudeCodeForUnprefixedClaudeModelsDisable",
                      "Disable Claude Code preference for bare claude-* model IDs"
                    )
                  : providerText(
                      t,
                      "preferClaudeCodeForUnprefixedClaudeModelsEnable",
                      "Enable Claude Code preference for bare claude-* model IDs"
                    )
              }
            />
            <span className="text-[11px] text-text-muted/70">
              {preferClaudeCodeForUnprefixedClaudeModels
                ? providerText(t, "toggleOnShort", "On")
                : providerText(t, "toggleOffShort", "Off")}
            </span>
            {claudeRoutingSettingsLoadError ? (
              <button
                type="button"
                onClick={() => void loadClaudeRoutingSettings()}
                className="rounded border border-orange-500/30 px-2 py-0.5 text-[11px] font-medium text-orange-600 hover:bg-orange-500/10 dark:text-orange-300"
                title={claudeRoutingSettingsLoadError}
              >
                {providerText(t, "retry", "Retry")}
              </button>
            ) : null}
          </div>
        )}
        {providerId === "codex" && (
          <div
            className="inline-flex items-center gap-2 rounded-lg border border-sky-500/20 bg-sky-500/5 px-2 py-1 text-xs font-medium text-text-muted"
            title={providerText(
              t,
              "providerDetailServiceModeTooltip",
              "Set a global Codex service mode, or leave accounts on their individual service-tier setting."
            )}
          >
            <span>
              {providerText(t, "providerDetailServiceModeLabel", "Global service mode:")}
            </span>
            <select
              value={codexGlobalServiceMode}
              onChange={(event) =>
                handleChangeCodexGlobalServiceMode(event.target.value as CodexGlobalServiceMode)
              }
              disabled={savingCodexGlobalServiceMode || !codexSettingsLoaded}
              aria-label="Global Codex service mode"
              className="rounded-md border border-border bg-bg px-2 py-1 text-xs text-text-main outline-none transition-colors focus:border-primary disabled:opacity-60"
            >
              {codexGlobalServiceModeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {codexSettingsLoadError ? (
              <button
                type="button"
                onClick={() => void loadCodexSettings()}
                className="rounded border border-sky-500/30 px-2 py-0.5 text-[11px] font-medium text-sky-600 hover:bg-sky-500/10 dark:text-sky-300"
                title={codexSettingsLoadError}
              >
                {providerText(t, "retry", "Retry")}
              </button>
            ) : null}
          </div>
        )}
        {/* Provider-level proxy indicator/button */}
        <button
          onClick={() =>
            onSetProxyTarget({
              level: "provider",
              id: providerId,
              label: providerInfo?.name || providerId,
            })
          }
          className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium transition-all ${
            proxyConfig?.providers?.[providerId]
              ? "bg-amber-500/15 text-amber-500 hover:bg-amber-500/25"
              : "bg-black/[0.03] dark:bg-white/[0.03] text-text-muted/50 hover:text-text-muted hover:bg-black/[0.06] dark:hover:bg-white/[0.06]"
          }`}
          title={
            proxyConfig?.providers?.[providerId]
              ? t("providerProxyTitleConfigured", {
                  host: proxyConfig.providers[providerId].host || t("configured"),
                })
              : t("providerProxyConfigureHint")
          }
        >
          <span className="material-symbols-outlined text-[14px]">vpn_lock</span>
          {proxyConfig?.providers?.[providerId]
            ? proxyConfig.providers[providerId].host || t("providerProxy")
            : t("providerProxy")}
        </button>
      </div>
      <div className="flex shrink-0 flex-wrap items-center justify-end gap-2">
        {connections.length > 0 && (
          <button
            onClick={() => handleDistributeProxies()}
            disabled={distributingProxies || batchTesting || !!retestingId}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              distributingProxies
                ? "bg-primary/20 border-primary/40 text-primary animate-pulse"
                : "bg-bg-subtle border-border text-text-muted hover:text-text-primary hover:border-primary/40"
            }`}
            title={t("distributeProxies")}
            aria-label={t("distributeProxies")}
          >
            <span className="material-symbols-outlined text-[14px]">
              {distributingProxies ? "sync" : "swap_horiz"}
            </span>
            {distributingProxies ? t("distributing") : t("distributeProxies")}
          </button>
        )}
        {connections.length > 1 && (
          <button
            onClick={handleBatchTestAll}
            disabled={batchTesting || batchRetesting || !!retestingId}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              batchTesting
                ? "bg-primary/20 border-primary/40 text-primary animate-pulse"
                : "bg-bg-subtle border-border text-text-muted hover:text-text-primary hover:border-primary/40"
            }`}
            title={t("testAll")}
            aria-label={t("testAll")}
          >
            <span className="material-symbols-outlined text-[14px]">
              {batchTesting ? "sync" : "play_arrow"}
            </span>
            {batchTesting ? t("testing") : t("testAll")}
          </button>
        )}
        {!isCompatible ? (
          <>
            {isCommandCode ? (
              <>
                <Button
                  size="sm"
                  icon="open_in_new"
                  loading={
                    commandCodeAuthState.phase === "starting" ||
                    commandCodeAuthState.phase === "polling" ||
                    commandCodeAuthState.phase === "applying"
                  }
                  onClick={() => gateConnectionFlow(handleOpenCommandCodeConnect)}
                >
                  Connect
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  icon="add"
                  onClick={() => gateConnectionFlow(openApiKeyAddFlow)}
                >
                  Manual API key
                </Button>
              </>
            ) : (
              <>
                <Button
                  size="sm"
                  icon="add"
                  onClick={() => gateConnectionFlow(openPrimaryAddFlow)}
                >
                  {providerSupportsPat ? "Add PAT" : t("add")}
                </Button>
                {providerId === "qoder" && (
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => gateConnectionFlow(onOpenOAuthModal)}
                  >
                    Experimental OAuth
                  </Button>
                )}
                {providerId === "codex" && (
                  <Button
                    size="sm"
                    variant="secondary"
                    icon="menu_book"
                    onClick={() => onOpenCodexCliGuide()}
                  >
                    Codex CLI Guide
                  </Button>
                )}
                {providerId === "codex" && (
                  <Button
                    size="sm"
                    variant="secondary"
                    icon="share"
                    onClick={() => gateConnectionFlow(openExternalLinkFlow)}
                  >
                    Adicionar Externo
                  </Button>
                )}
                {providerId === "codex" && (
                  <Button
                    size="sm"
                    variant="secondary"
                    icon="upload_file"
                    onClick={() => gateConnectionFlow(onOpenImportCodex)}
                  >
                    {typeof (t as any).has === "function" && (t as any).has("importCodexAuth")
                      ? t("importCodexAuth")
                      : "Import auth"}
                  </Button>
                )}
                {providerId === "claude" && (
                  <Button
                    size="sm"
                    variant="secondary"
                    icon="upload_file"
                    onClick={() => gateConnectionFlow(onOpenImportClaude)}
                  >
                    {typeof (t as any).has === "function" && (t as any).has("importClaudeAuth")
                      ? t("importClaudeAuth")
                      : "Import auth"}
                  </Button>
                )}
                {providerId === "gemini-cli" && (
                  <Button
                    size="sm"
                    variant="secondary"
                    icon="upload_file"
                    onClick={() => gateConnectionFlow(onOpenImportGemini)}
                  >
                    {typeof (t as any).has === "function" && (t as any).has("importGeminiAuth")
                      ? t("importGeminiAuth")
                      : "Import auth"}
                  </Button>
                )}
              </>
            )}
          </>
        ) : (
          connections.length === 0 && (
            <Button
              size="sm"
              icon="add"
              onClick={() => gateConnectionFlow(openApiKeyAddFlow)}
            >
              {t("add")}
            </Button>
          )
        )}
      </div>
    </div>
  );
}

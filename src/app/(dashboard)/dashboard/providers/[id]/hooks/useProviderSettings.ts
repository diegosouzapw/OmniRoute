"use client";

/**
 * useProviderSettings — Phase 1f extraction for Issue #3501.
 *
 * Owns provider-specific global settings state that were previously inline in
 * ProviderDetailPageClient:
 *  - Codex: global service mode, supported models, load/save/error state
 *  - Claude: preferClaudeCodeForUnprefixedClaudeModels toggle, load/save/error state
 *
 * Cycle-safe: imports only from leaf modules (no client imports).
 */

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useTranslations } from "next-intl";
import { useNotificationStore } from "@/store/notificationStore";
import {
  CODEX_FAST_TIER_DEFAULT_SUPPORTED_MODELS,
  getCodexGlobalServiceMode,
  resolveCodexGlobalFastServiceTier,
  type CodexGlobalServiceMode,
} from "@/lib/providers/codexFastTier";
import {
  CODEX_GLOBAL_SERVICE_MODE_VALUES,
  getCodexServiceTierLabel,
  providerText,
} from "../providerPageHelpers";

// Shared /api/settings fetch with error-as-value semantics so the loaders
// below only touch state after the await (no synchronous setState reachable
// from the load effects).
async function fetchSettingsPayload(): Promise<{
  ok: boolean;
  data?: Record<string, unknown>;
  message?: string;
}> {
  try {
    const response = await fetch("/api/settings", { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Settings request failed with HTTP ${response.status}`);
    }
    const data = await response.json();
    if (!data || typeof data !== "object") {
      throw new Error("Settings response was empty");
    }
    return { ok: true, data };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Failed to load settings",
    };
  }
}

// ──── types ─────────────────────────────────────────────────────────────────

export interface UseProviderSettingsReturn {
  // Codex
  codexGlobalServiceMode: CodexGlobalServiceMode;
  codexGlobalSupportedModels: string[];
  codexSettingsLoaded: boolean;
  codexSettingsLoadError: string | null;
  savingCodexGlobalServiceMode: boolean;
  codexGlobalServiceModeOptions: Array<{ value: string; label: string }>;
  loadCodexSettings: () => Promise<void>;
  handleChangeCodexGlobalServiceMode: (mode: CodexGlobalServiceMode) => Promise<void>;

  // Claude routing
  preferClaudeCodeForUnprefixedClaudeModels: boolean;
  claudeRoutingSettingsLoaded: boolean;
  claudeRoutingSettingsLoadError: string | null;
  savingClaudeRoutingPreference: boolean;
  loadClaudeRoutingSettings: () => Promise<void>;
  handleToggleClaudeRoutingPreference: (enabled: boolean) => Promise<void>;
}

export function useProviderSettings(providerId: string): UseProviderSettingsReturn {
  const t = useTranslations("providers");
  const notify = useNotificationStore();

  // ── Codex state ──────────────────────────────────────────────────────────
  const codexSettingsRequestSeqRef = useRef(0);

  const [codexGlobalServiceMode, setCodexGlobalServiceMode] =
    useState<CodexGlobalServiceMode>("none");
  const [codexGlobalSupportedModels, setCodexGlobalSupportedModels] = useState<string[]>([
    ...CODEX_FAST_TIER_DEFAULT_SUPPORTED_MODELS,
  ]);
  const [codexSettingsLoaded, setCodexSettingsLoaded] = useState(false);
  const [codexSettingsLoadError, setCodexSettingsLoadError] = useState<string | null>(null);
  const [savingCodexGlobalServiceMode, setSavingCodexGlobalServiceMode] = useState(false);

  // ── Claude routing state ─────────────────────────────────────────────────
  const [preferClaudeCodeForUnprefixedClaudeModels, setPreferClaudeCodeForUnprefixedClaudeModels] =
    useState(false);
  const [claudeRoutingSettingsLoaded, setClaudeRoutingSettingsLoaded] = useState(false);
  const [claudeRoutingSettingsLoadError, setClaudeRoutingSettingsLoadError] = useState<
    string | null
  >(null);
  const [savingClaudeRoutingPreference, setSavingClaudeRoutingPreference] = useState(false);

  // Reset the per-provider load flags when the provider changes — a
  // render-phase adjustment guarded by the previous providerId (react.dev
  // "adjusting state when a prop changes"), replacing the synchronous resets
  // that used to run inside the load effects.
  const [settingsProviderId, setSettingsProviderId] = useState(providerId);
  if (settingsProviderId !== providerId) {
    setSettingsProviderId(providerId);
    setCodexSettingsLoaded(false);
    setCodexSettingsLoadError(null);
    setClaudeRoutingSettingsLoaded(false);
    setClaudeRoutingSettingsLoadError(null);
  }

  // ── derived ──────────────────────────────────────────────────────────────
  const codexGlobalServiceModeOptions = useMemo(
    () =>
      CODEX_GLOBAL_SERVICE_MODE_VALUES.map((value) => ({
        value,
        label: getCodexServiceTierLabel(t, value),
      })),
    [t]
  );

  // ── Codex settings loader ────────────────────────────────────────────────
  const loadCodexSettings = useCallback(async () => {
    const requestSeq = codexSettingsRequestSeqRef.current + 1;
    codexSettingsRequestSeqRef.current = requestSeq;
    const isCurrentRequest = () => codexSettingsRequestSeqRef.current === requestSeq;

    // Non-codex providers keep the initial false/null flags (also restored by
    // the render-phase reset above when providerId changes).
    if (providerId !== "codex") return;

    const outcome = await fetchSettingsPayload();
    if (!isCurrentRequest()) return;
    if (!outcome.ok) {
      setCodexSettingsLoaded(false);
      setCodexSettingsLoadError(outcome.message);
      return;
    }
    const resolvedCodexServiceTier = resolveCodexGlobalFastServiceTier(outcome.data);
    setCodexGlobalServiceMode(getCodexGlobalServiceMode(outcome.data));
    setCodexGlobalSupportedModels([...resolvedCodexServiceTier.supportedModels]);
    setCodexSettingsLoadError(null);
    setCodexSettingsLoaded(true);
  }, [providerId]);

  // The async work is duplicated INSIDE the effect (calling the exposed
  // loadCodexSettings callback synchronously from an effect is rejected by the
  // compiler rules); every setState here runs after the await.
  useEffect(() => {
    if (providerId !== "codex") return;
    const requestSeq = codexSettingsRequestSeqRef.current + 1;
    codexSettingsRequestSeqRef.current = requestSeq;
    const isCurrentRequest = () => codexSettingsRequestSeqRef.current === requestSeq;
    const run = async () => {
      const outcome = await fetchSettingsPayload();
      if (!isCurrentRequest()) return;
      if (!outcome.ok) {
        setCodexSettingsLoaded(false);
        setCodexSettingsLoadError(outcome.message);
        return;
      }
      const resolvedCodexServiceTier = resolveCodexGlobalFastServiceTier(outcome.data);
      setCodexGlobalServiceMode(getCodexGlobalServiceMode(outcome.data));
      setCodexGlobalSupportedModels([...resolvedCodexServiceTier.supportedModels]);
      setCodexSettingsLoadError(null);
      setCodexSettingsLoaded(true);
    };
    void run();
  }, [providerId]);

  // ── Claude routing settings loader ───────────────────────────────────────
  const loadClaudeRoutingSettings = useCallback(async () => {
    // Non-claude providers keep the initial false/null flags (also restored by
    // the render-phase reset above when providerId changes).
    if (providerId !== "claude") return;

    const outcome = await fetchSettingsPayload();
    if (!outcome.ok) {
      setClaudeRoutingSettingsLoaded(false);
      setClaudeRoutingSettingsLoadError(outcome.message);
      return;
    }
    setPreferClaudeCodeForUnprefixedClaudeModels(
      outcome.data.preferClaudeCodeForUnprefixedClaudeModels === true
    );
    setClaudeRoutingSettingsLoadError(null);
    setClaudeRoutingSettingsLoaded(true);
  }, [providerId]);

  // Same inline-in-effect shape as the codex loader above.
  useEffect(() => {
    if (providerId !== "claude") return;
    const run = async () => {
      const outcome = await fetchSettingsPayload();
      if (!outcome.ok) {
        setClaudeRoutingSettingsLoaded(false);
        setClaudeRoutingSettingsLoadError(outcome.message);
        return;
      }
      setPreferClaudeCodeForUnprefixedClaudeModels(
        outcome.data.preferClaudeCodeForUnprefixedClaudeModels === true
      );
      setClaudeRoutingSettingsLoadError(null);
      setClaudeRoutingSettingsLoaded(true);
    };
    void run();
  }, [providerId]);

  // ── Codex service mode handler ───────────────────────────────────────────
  const handleChangeCodexGlobalServiceMode = async (mode: CodexGlobalServiceMode) => {
    if (savingCodexGlobalServiceMode || !codexSettingsLoaded) return;
    setSavingCodexGlobalServiceMode(true);
    const previousMode = codexGlobalServiceMode;
    setCodexGlobalServiceMode(mode);
    try {
      const tier = mode === "none" ? (previousMode !== "none" ? previousMode : undefined) : mode;
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          codexServiceTier: {
            enabled: mode !== "none",
            ...(tier ? { tier } : {}),
            supportedModels: codexGlobalSupportedModels,
          },
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setCodexGlobalServiceMode(previousMode);
        notify.error(
          data.error ||
            providerText(t, "failedUpdateCodexServiceMode", "Failed to update Codex service mode")
        );
        return;
      }

      notify.success(providerText(t, "codexServiceModeUpdated", "Codex service mode updated"));
    } catch (error) {
      setCodexGlobalServiceMode(previousMode);
      console.error("Error updating Codex service mode:", error);
      notify.error(
        providerText(t, "failedUpdateCodexServiceMode", "Failed to update Codex service mode")
      );
    } finally {
      setSavingCodexGlobalServiceMode(false);
    }
  };

  // ── Claude routing preference handler ───────────────────────────────────
  const handleToggleClaudeRoutingPreference = async (enabled: boolean) => {
    if (savingClaudeRoutingPreference || !claudeRoutingSettingsLoaded) return;
    setSavingClaudeRoutingPreference(true);
    const previous = preferClaudeCodeForUnprefixedClaudeModels;
    setPreferClaudeCodeForUnprefixedClaudeModels(enabled);

    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ preferClaudeCodeForUnprefixedClaudeModels: enabled }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setPreferClaudeCodeForUnprefixedClaudeModels(previous);
        notify.error(
          data.error ||
            providerText(
              t,
              "failedUpdateClaudeRoutingPreference",
              "Failed to update Claude Code routing preference"
            )
        );
        return;
      }

      const data = await res.json().catch(() => null);
      if (data && typeof data === "object") {
        setPreferClaudeCodeForUnprefixedClaudeModels(
          data.preferClaudeCodeForUnprefixedClaudeModels === true
        );
      }
      notify.success(
        enabled
          ? providerText(
              t,
              "claudeRoutingPreferenceEnabled",
              "Unprefixed Claude models now prefer Claude Code"
            )
          : providerText(
              t,
              "claudeRoutingPreferenceDisabled",
              "Unprefixed Claude models no longer prefer Claude Code"
            )
      );
    } catch (error) {
      setPreferClaudeCodeForUnprefixedClaudeModels(previous);
      console.error("Error updating Claude Code routing preference:", error);
      notify.error(
        providerText(
          t,
          "failedUpdateClaudeRoutingPreference",
          "Failed to update Claude Code routing preference"
        )
      );
    } finally {
      setSavingClaudeRoutingPreference(false);
    }
  };

  return {
    // Codex
    codexGlobalServiceMode,
    codexGlobalSupportedModels,
    codexSettingsLoaded,
    codexSettingsLoadError,
    savingCodexGlobalServiceMode,
    codexGlobalServiceModeOptions,
    loadCodexSettings,
    handleChangeCodexGlobalServiceMode,

    // Claude routing
    preferClaudeCodeForUnprefixedClaudeModels,
    claudeRoutingSettingsLoaded,
    claudeRoutingSettingsLoadError,
    savingClaudeRoutingPreference,
    loadClaudeRoutingSettings,
    handleToggleClaudeRoutingPreference,
  };
}

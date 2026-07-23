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

    if (providerId !== "codex") {
      setCodexSettingsLoaded(false);
      setCodexSettingsLoadError(null);
      return;
    }

    setCodexSettingsLoaded(false);
    setCodexSettingsLoadError(null);

    try {
      const response = await fetch("/api/settings", { cache: "no-store" });
      if (!response.ok) {
        throw new Error(`Settings request failed with HTTP ${response.status}`);
      }
      const data = await response.json();
      if (!data || typeof data !== "object") {
        throw new Error("Settings response was empty");
      }
      if (!isCurrentRequest()) return;
      const resolvedCodexServiceTier = resolveCodexGlobalFastServiceTier(data);
      setCodexGlobalServiceMode(getCodexGlobalServiceMode(data));
      setCodexGlobalSupportedModels([...resolvedCodexServiceTier.supportedModels]);
      setCodexSettingsLoaded(true);
    } catch (error) {
      if (!isCurrentRequest()) return;
      setCodexSettingsLoaded(false);
      setCodexSettingsLoadError(
        error instanceof Error ? error.message : "Failed to load settings"
      );
    }
  }, [providerId]);

  useEffect(() => {
    void loadCodexSettings();
  }, [loadCodexSettings]);

  // ── Claude routing settings loader ───────────────────────────────────────
  const loadClaudeRoutingSettings = useCallback(async () => {
    if (providerId !== "claude") {
      setClaudeRoutingSettingsLoaded(false);
      setClaudeRoutingSettingsLoadError(null);
      return;
    }

    setClaudeRoutingSettingsLoaded(false);
    setClaudeRoutingSettingsLoadError(null);

    try {
      const response = await fetch("/api/settings", { cache: "no-store" });
      if (!response.ok) {
        throw new Error(`Settings request failed with HTTP ${response.status}`);
      }
      const data = await response.json();
      if (!data || typeof data !== "object") {
        throw new Error("Settings response was empty");
      }
      setPreferClaudeCodeForUnprefixedClaudeModels(
        data.preferClaudeCodeForUnprefixedClaudeModels === true
      );
      setClaudeRoutingSettingsLoaded(true);
    } catch (error) {
      setClaudeRoutingSettingsLoaded(false);
      setClaudeRoutingSettingsLoadError(
        error instanceof Error ? error.message : "Failed to load settings"
      );
    }
  }, [providerId]);

  useEffect(() => {
    void loadClaudeRoutingSettings();
  }, [loadClaudeRoutingSettings]);

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
        notify.error(data.error || "Failed to update Codex service mode");
        return;
      }

      notify.success("Codex service mode updated");
    } catch (error) {
      setCodexGlobalServiceMode(previousMode);
      console.error("Error updating Codex service mode:", error);
      notify.error("Failed to update Codex service mode");
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
        notify.error(data.error || "Failed to update Claude Code routing preference");
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
          ? "Unprefixed Claude models now prefer Claude Code"
          : "Unprefixed Claude models no longer prefer Claude Code"
      );
    } catch (error) {
      setPreferClaudeCodeForUnprefixedClaudeModels(previous);
      console.error("Error updating Claude Code routing preference:", error);
      notify.error(
        providerText(t, "failedUpdateClaudeRoutingPreference", "Failed to update Claude Code routing preference")
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

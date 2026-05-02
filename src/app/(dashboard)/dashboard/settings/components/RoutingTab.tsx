"use client";

import { useEffect, useMemo, useState } from "react";
import { Button, Card } from "@/shared/components";
import { useTranslations } from "next-intl";
import FallbackChainsEditor from "./FallbackChainsEditor";
import {
  CLI_COMPAT_PROVIDER_DISPLAY,
  CLI_COMPAT_TOGGLE_IDS,
  normalizeCliCompatProviderId,
} from "@/shared/constants/cliCompatProviders";

export default function RoutingTab() {
  const [settings, setSettings] = useState<any>({
    alwaysPreserveClientCache: "auto",
    antigravitySignatureCacheMode: "enabled",
    cliCompatProviders: [],
  });
  const [loading, setLoading] = useState(true);
  const [lkgpCacheLoading, setLkgpCacheLoading] = useState(false);
  const [lkgpCacheStatus, setLkgpCacheStatus] = useState({ type: "", message: "" });
  const t = useTranslations("settings");

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        setSettings(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const updateSetting = async (patch) => {
    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      if (res.ok) {
        setSettings((prev) => ({ ...prev, ...patch }));
      }
    } catch (err) {
      console.error("Failed to update settings:", err);
    }
  };

  const cliCompatProviders = useMemo(
    () =>
      Array.isArray(settings.cliCompatProviders)
        ? settings.cliCompatProviders.map((providerId: string) => normalizeCliCompatProviderId(providerId))
        : [],
    [settings.cliCompatProviders]
  );
  const cliCompatProviderSet = useMemo(() => new Set(cliCompatProviders), [cliCompatProviders]);

  const toggleCliCompatProvider = (providerId: string, enabled: boolean) => {
    const normalizedProviderId = normalizeCliCompatProviderId(providerId);
    const nextProviders = new Set(cliCompatProviders);
    if (enabled) {
      nextProviders.add(normalizedProviderId);
    } else {
      nextProviders.delete(normalizedProviderId);
    }
    updateSetting({ cliCompatProviders: Array.from(nextProviders) });
  };

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500 h-fit">
              <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                network_ping
              </span>
            </div>
            <div>
              <h3 className="text-lg font-semibold">
                {t("adaptiveVolumeRouting") || "Adaptive Volume Routing"}
              </h3>
              <p className="text-sm text-text-muted mt-1">
                {t("adaptiveVolumeRoutingDesc") ||
                  "Automatically adjusts traffic volume between providers based on real-time latency and error rates."}
              </p>
            </div>
          </div>
          <div className="pt-1">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={!!settings.adaptiveVolumeRouting}
                onChange={(e) => updateSetting({ adaptiveVolumeRouting: e.target.checked })}
                disabled={loading}
              />
              <div className="w-11 h-6 bg-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500 h-fit">
              <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                verified
              </span>
            </div>
            <div>
              <h3 className="text-lg font-semibold">
                {t("lkgpToggleTitle") || "Last Known Good Provider (LKGP)"}
              </h3>
              <p className="text-sm text-text-muted mt-1">
                {t("lkgpToggleDesc") ||
                  "When enabled, the router remembers which provider last served a successful response and tries it first on subsequent requests."}
              </p>
            </div>
          </div>
          <div className="pt-1">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={settings.lkgpEnabled !== false}
                onChange={(e) => updateSetting({ lkgpEnabled: e.target.checked })}
                disabled={loading}
              />
              <div className="w-11 h-6 bg-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-border/30 flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            loading={lkgpCacheLoading}
            onClick={async () => {
              setLkgpCacheLoading(true);
              setLkgpCacheStatus({ type: "", message: "" });
              try {
                const res = await fetch("/api/settings/lkgp-cache", { method: "DELETE" });
                const data = await res.json();
                if (res.ok) {
                  setLkgpCacheStatus({
                    type: "success",
                    message: t("lkgpCacheCleared") || "LKGP cache cleared successfully",
                  });
                } else {
                  setLkgpCacheStatus({
                    type: "error",
                    message:
                      data.error || t("lkgpCacheClearFailed") || "Failed to clear LKGP cache",
                  });
                }
              } catch {
                setLkgpCacheStatus({
                  type: "error",
                  message: t("errorOccurred") || "An error occurred",
                });
              } finally {
                setLkgpCacheLoading(false);
              }
            }}
          >
            <span className="material-symbols-outlined text-[14px] mr-1" aria-hidden="true">
              delete_sweep
            </span>
            {t("clearLkgpCache") || "Clear LKGP Cache"}
          </Button>
          {lkgpCacheStatus.message && (
            <span
              className={`text-xs ${lkgpCacheStatus.type === "success" ? "text-green-500" : "text-red-500"}`}
            >
              {lkgpCacheStatus.message}
            </span>
          )}
        </div>
      </Card>

      <FallbackChainsEditor />

      <Card>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-sky-500/10 text-sky-500">
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              fingerprint
            </span>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Antigravity Signature Cache Mode</h3>
            <p className="text-sm text-text-muted">
              Control whether OmniRoute reuses only stored Gemini thought signatures or accepts
              validated client-provided signatures in Antigravity-compatible tool-call flows.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {[
            {
              value: "enabled",
              label: "Enabled",
              desc: "Current behavior. Ignore client-provided signatures and keep using the stored OmniRoute flow.",
            },
            {
              value: "bypass",
              label: "Bypass",
              desc: "Accept client-provided signatures after lightweight validation and fall back to the stored signature when invalid.",
            },
            {
              value: "bypass-strict",
              label: "Bypass Strict",
              desc: "Require full protobuf validation before accepting a client-provided signature.",
            },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => updateSetting({ antigravitySignatureCacheMode: option.value })}
              disabled={loading}
              className={`w-full flex flex-col items-start gap-1 p-3 rounded-lg border text-left transition-all ${
                settings.antigravitySignatureCacheMode === option.value
                  ? "border-sky-500/50 bg-sky-500/5 ring-1 ring-sky-500/20"
                  : "border-border/50 hover:border-border hover:bg-surface/30"
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`material-symbols-outlined text-[16px] ${
                    settings.antigravitySignatureCacheMode === option.value
                      ? "text-sky-400"
                      : "text-text-muted"
                  }`}
                >
                  {settings.antigravitySignatureCacheMode === option.value
                    ? "check_circle"
                    : "radio_button_unchecked"}
                </span>
                <span
                  className={`text-sm font-medium ${settings.antigravitySignatureCacheMode === option.value ? "text-sky-400" : ""}`}
                >
                  {option.label}
                </span>
              </div>
              <p className="text-xs text-text-muted ml-7">{option.desc}</p>
            </button>
          ))}
        </div>
      </Card>

      <Card>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-500">
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              fingerprint
            </span>
          </div>
          <div>
            <h3 className="text-lg font-semibold">{t("cliFingerprint")}</h3>
            <p className="text-sm text-text-muted">{t("cliFingerprintDesc")}</p>
            <p className="mt-1 text-xs text-text-muted">
              {t("cliFingerprintEnabled", { count: cliCompatProviderSet.size })}
            </p>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          {CLI_COMPAT_TOGGLE_IDS.map((providerId) => {
            const normalizedProviderId = normalizeCliCompatProviderId(providerId);
            const providerDisplay = CLI_COMPAT_PROVIDER_DISPLAY[providerId];
            const checked = cliCompatProviderSet.has(normalizedProviderId);
            const label = providerDisplay?.name || providerId;
            const description = providerDisplay?.description || providerId;

            return (
              <button
                key={providerId}
                type="button"
                onClick={() => toggleCliCompatProvider(providerId, !checked)}
                disabled={loading}
                aria-pressed={checked}
                title={checked ? t("disableFingerprintTitle", { provider: label }) : t("enableFingerprintTitle", { provider: label })}
                className={`flex items-start gap-3 rounded-lg border p-3 text-left transition-all ${
                  checked
                    ? "border-indigo-500/50 bg-indigo-500/5 ring-1 ring-indigo-500/20"
                    : "border-border/50 hover:border-border hover:bg-surface/30"
                } ${loading ? "cursor-not-allowed opacity-60" : ""}`}
              >
                <span
                  className={`material-symbols-outlined mt-0.5 text-[18px] ${checked ? "text-indigo-400" : "text-text-muted"}`}
                  aria-hidden="true"
                >
                  {checked ? "check_circle" : "radio_button_unchecked"}
                </span>
                <span className="min-w-0 flex-1">
                  <span className={`block text-sm font-medium ${checked ? "text-indigo-400" : ""}`}>
                    {label}
                  </span>
                  <span className="mt-1 block text-xs text-text-muted">{description}</span>
                </span>
              </button>
            );
          })}
        </div>
      </Card>

      <Card>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-green-500/10 text-green-500">
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              cached
            </span>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Client Cache Control</h3>
            <p className="text-sm text-text-muted">
              Configure whether OmniRoute preserves client-provided cache_control markers
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {[
            {
              value: "auto",
              label: "Auto (Recommended)",
              desc: "For deterministic Claude-compatible flows, preserve client-provided cache_control as-is. If the request has no cache_control, OmniRoute does not inject any bridge-owned markers for CC-compatible third-party proxy compatibility.",
            },
            {
              value: "always",
              label: "Always Preserve",
              desc: "Always forward client-provided cache_control headers to upstream providers as-is.",
            },
            {
              value: "never",
              label: "Never Preserve",
              desc: "Always remove client cache_control headers and let OmniRoute manage caching where native provider flows support it.",
            },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => updateSetting({ alwaysPreserveClientCache: option.value })}
              disabled={loading}
              className={`w-full flex flex-col items-start gap-1 p-3 rounded-lg border text-left transition-all ${
                settings.alwaysPreserveClientCache === option.value
                  ? "border-green-500/50 bg-green-500/5 ring-1 ring-green-500/20"
                  : "border-border/50 hover:border-border hover:bg-surface/30"
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`material-symbols-outlined text-[16px] ${
                    settings.alwaysPreserveClientCache === option.value
                      ? "text-green-400"
                      : "text-text-muted"
                  }`}
                >
                  {settings.alwaysPreserveClientCache === option.value
                    ? "check_circle"
                    : "radio_button_unchecked"}
                </span>
                <span
                  className={`text-sm font-medium ${settings.alwaysPreserveClientCache === option.value ? "text-green-400" : ""}`}
                >
                  {option.label}
                </span>
              </div>
              <p className="text-xs text-text-muted ml-7">{option.desc}</p>
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}

"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Card } from "@/shared/components";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/**
 * Localized text: either a plain string or an {en, pt?} object.
 * The renderer resolves the best locale with EN fallback (D25 compat).
 */
type LocalizedText = string | { en: string; pt?: string };

interface SetupInfo {
  keyUrl: string | null;
  steps: LocalizedText[];
}

interface ProviderSetupData {
  provider: string;
  setup: SetupInfo | null;
  configured: boolean;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Resolve a LocalizedText to a display string. */
function resolveText(text: LocalizedText, locale: string): string {
  if (typeof text === "string") return text;
  if (locale === "pt" && text.pt) return text.pt;
  return text.en;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function RadarSetupPage() {
  const t = useTranslations("radarSetupPage");
  const searchParams = useSearchParams();
  const provider = searchParams.get("provider");
  const locale = "en"; // Could be derived from next-intl locale later

  const [setupData, setSetupData] = useState<ProviderSetupData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ ok: boolean; message: string } | null>(null);

  // Fetch catalog to find the provider's setup data
  useEffect(() => {
    if (!provider) {
      setLoading(false);
      return;
    }

    async function load() {
      try {
        const res = await fetch("/api/radar/catalog");
        if (res.status === 404) {
          setError(t("flagDisabled"));
          setLoading(false);
          return;
        }
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        // Find ALL entries for this provider and extract setup from the first one that has it
        const providerEntries = data.entries.filter(
          (e: { provider: string }) => e.provider === provider,
        );

        if (providerEntries.length === 0) {
          setError(t("providerNotFound", { provider }));
          setLoading(false);
          return;
        }

        // Find setup info from feed entries (they carry the setup field)
        const entryWithSetup = providerEntries.find(
          (e: { setup?: SetupInfo | null }) => e.setup && (e.setup.steps.length > 0 || e.setup.keyUrl),
        );

        // Check if provider is configured (has connections)
        // We infer this from whether the provider exists in the catalog at all
        // The actual connection check would need a separate API — for now we show
        // the guide regardless
        setSetupData({
          provider,
          setup: entryWithSetup?.setup ?? null,
          configured: false, // Will be enriched when connection-status API is available
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : t("loadFailed"));
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [provider, t]);

  // Test connection — uses the EXISTING connection-test endpoint
  const handleTestConnection = useCallback(async () => {
    if (!provider) return;
    setTesting(true);
    setTestResult(null);
    try {
      // The existing test endpoint is POST /api/providers/[id]/test
      // We need the connection ID — for now we use the provider ID as a proxy.
      // In a full implementation, the setup page would list connections for
      // this provider and test each one. Here we test the first connection.
      const res = await fetch(`/api/providers/${encodeURIComponent(provider)}/test`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      if (res.ok) {
        setTestResult({ ok: true, message: t("testSuccess") });
      } else {
        const data = await res.json().catch(() => null);
        setTestResult({
          ok: false,
          message: data?.error?.message || t("testFailed"),
        });
      }
    } catch {
      setTestResult({ ok: false, message: t("testFailed") });
    } finally {
      setTesting(false);
    }
  }, [provider, t]);

  if (!provider) {
    return (
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold">{t("title")}</h1>
        <Card>
          <div className="text-center py-12 text-text-muted">{t("noProvider")}</div>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link
          href="/dashboard/radar"
          className="text-sm text-text-muted hover:text-text-main transition-colors"
        >
          ← {t("backToCatalog")}
        </Link>
      </div>
      <div>
        <h1 className="text-2xl font-bold">{t("setupTitle", { provider })}</h1>
        <p className="text-sm text-text-muted mt-1">{t("setupSubtitle")}</p>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-red-500/10 text-red-400 text-sm">{error}</div>
      )}

      {loading ? (
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="text-text-muted">{t("loading")}</div>
        </div>
      ) : setupData ? (
        <>
          {/* Configured indicator */}
          {setupData.configured && (
            <Card>
              <div className="flex items-center gap-3 py-2">
                <span className="text-green-400 text-xl">✓</span>
                <span className="text-green-400 font-medium">{t("providerConfigured")}</span>
              </div>
            </Card>
          )}

          {/* Key URL */}
          {setupData.setup?.keyUrl && (
            <Card>
              <div className="flex flex-col gap-2">
                <h2 className="font-semibold">{t("getApiKey")}</h2>
                <a
                  href={setupData.setup.keyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-violet-400 hover:underline break-all"
                >
                  {setupData.setup.keyUrl}
                </a>
              </div>
            </Card>
          )}

          {/* Steps */}
          {setupData.setup && setupData.setup.steps.length > 0 && (
            <Card>
              <div className="flex flex-col gap-4">
                <h2 className="font-semibold">{t("setupSteps")}</h2>
                <ol className="flex flex-col gap-3">
                  {setupData.setup.steps.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-7 h-7 rounded-full bg-violet-500/10 text-violet-400 flex items-center justify-center text-sm font-medium">
                        {idx + 1}
                      </span>
                      <span className="text-sm text-text-muted pt-1">
                        {resolveText(step, locale)}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </Card>
          )}

          {/* No guide available */}
          {(!setupData.setup || setupData.setup.steps.length === 0) && !setupData.setup?.keyUrl && (
            <Card>
              <div className="text-center py-8 text-text-muted">
                <p>{t("noGuide")}</p>
                <a
                  href={`https://${provider}.com`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-violet-400 hover:underline mt-2 inline-block"
                >
                  {t("visitDocs")}
                </a>
              </div>
            </Card>
          )}

          {/* Test connection */}
          <Card>
            <div className="flex flex-col gap-3">
              <h2 className="font-semibold">{t("testConnection")}</h2>
              <p className="text-sm text-text-muted">{t("testDescription")}</p>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleTestConnection}
                  disabled={testing}
                  className="px-4 py-2 text-sm font-medium rounded-lg border border-violet-500 text-violet-400 hover:bg-violet-500/10 transition-colors disabled:opacity-50"
                >
                  {testing ? t("testing") : t("testButton")}
                </button>
                {testResult && (
                  <span
                    className={`text-sm ${testResult.ok ? "text-green-400" : "text-red-400"}`}
                  >
                    {testResult.message}
                  </span>
                )}
              </div>
            </div>
          </Card>

          {/* Add connection link */}
          <Card>
            <div className="flex flex-col gap-2">
              <h2 className="font-semibold">{t("addConnection")}</h2>
              <p className="text-sm text-text-muted">{t("addConnectionDescription")}</p>
              <Link
                href={`/dashboard/providers?add=${encodeURIComponent(provider)}`}
                className="text-violet-400 hover:underline text-sm"
              >
                {t("addConnectionLink")}
              </Link>
            </div>
          </Card>
        </>
      ) : null}
    </div>
  );
}

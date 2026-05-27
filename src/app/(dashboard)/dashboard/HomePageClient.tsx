"use client";

import { useTranslations } from "next-intl";

import { useState, useEffect, useMemo, useCallback, useRef, Suspense } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardSkeleton, Button, Modal } from "@/shared/components";
import ProviderIcon from "@/shared/components/ProviderIcon";
import { AI_PROVIDERS, NOAUTH_PROVIDERS, OAUTH_PROVIDERS } from "@/shared/constants/providers";
import { useNotificationStore } from "@/store/notificationStore";
import { copyToClipboard } from "@/shared/utils/clipboard";
import { useIsElectron, useOpenExternal } from "@/shared/hooks/useElectron";

const ProviderTopology = dynamic(() => import("../home/ProviderTopology"), { ssr: false });
const ProviderLimits = dynamic(() => import("./usage/components/ProviderLimits"), { ssr: false });
import type { NewsAnnouncement } from "@/shared/utils/releaseNotes";

type UpdateStep = {
  step: string;
  status: string;
  message: string;
};

type VersionInfo = {
  current: string;
  latest: string;
  updateAvailable: boolean;
  channel: string;
  autoUpdateSupported: boolean;
  autoUpdateError?: string | null;
  news?: NewsAnnouncement | null;
};

type HomePageClientProps = {
  machineId?: string;
};

type ProviderSummaryItem = {
  id: string;
  provider: {
    id: string;
    name: string;
    color?: string;
    textIcon?: string;
    alias?: string;
  };
  total: number;
  connected: number;
  errors: number;
  modelCount: number;
  authType: "free" | "oauth" | "apikey" | string;
};

type ProviderMetricSummary = {
  totalRequests?: number;
  totalSuccesses?: number;
  successRate?: number;
  avgLatencyMs?: number;
  lastRequestAt?: string | null;
  lastErrorAt?: string | null;
  lastStatus?: number | null;
  lastErrorStatus?: number | null;
};

type ActiveRequestSummary = {
  provider?: string;
  model?: string;
};

type ProviderModelSummary = {
  fullModel: string;
  alias?: string;
  model?: string;
};

const PROVIDER_ALIAS_TO_ID = new Map(
  Object.entries(AI_PROVIDERS)
    .flatMap(([providerId, providerInfo]) =>
      providerInfo.alias ? [[providerInfo.alias.toLowerCase(), providerId]] : []
    )
    .filter((entry): entry is [string, string] => entry.length === 2)
);

function normalizeProviderId(providerId?: string | null): string {
  const normalized = typeof providerId === "string" ? providerId.trim().toLowerCase() : "";
  if (!normalized) return "";
  return AI_PROVIDERS[normalized] ? normalized : PROVIDER_ALIAS_TO_ID.get(normalized) || normalized;
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function mergeUpdateStep(steps: UpdateStep[], nextStep: UpdateStep) {
  const idx = steps.findIndex((step) => step.step === nextStep.step);
  if (idx === -1) {
    return [...steps, nextStep];
  }

  const next = [...steps];
  next[idx] = nextStep;
  return next;
}

export default function HomePageClient({ machineId }: HomePageClientProps) {
  const router = useRouter();
  const isElectron = useIsElectron();
  const { openExternal } = useOpenExternal();
  const t = useTranslations("home");
  const tc = useTranslations("common");
  const ts = useTranslations("sidebar");
  const tp = useTranslations("providers");
  const [providerConnections, setProviderConnections] = useState([]);
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [baseUrl, setBaseUrl] = useState("/v1");
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [providerMetrics, setProviderMetrics] = useState<Record<string, ProviderMetricSummary>>({});
  const [activeRequests, setActiveRequests] = useState<ActiveRequestSummary[]>([]);

  const [versionInfo, setVersionInfo] = useState<VersionInfo | null>(null);
  const [updating, setUpdating] = useState(false);

  // Platform detection and download links for Electron
  const platform = typeof window !== "undefined" ? window.electronAPI?.platform : undefined;
  const electronDownload = useMemo(() => {
    const latest = versionInfo?.latest || "";
    const cleanLatest = latest.replace(/^v/, "");
    if (platform === "darwin") {
      return {
        label: "Download DMG (macOS)",
        url: `https://github.com/diegosouzapw/OmniRoute/releases/download/v${cleanLatest}/OmniRoute-${cleanLatest}.dmg`,
        desc: `A new version of the OmniRoute desktop app is available. Please download and install the macOS DMG installer to update (current: v${versionInfo?.current || ""}).`,
      };
    }
    if (platform === "win32") {
      return {
        label: "Download EXE (Windows)",
        url: `https://github.com/diegosouzapw/OmniRoute/releases/download/v${cleanLatest}/OmniRoute.Setup.${cleanLatest}.exe`,
        desc: `A new version of the OmniRoute desktop app is available. Please download and install the Windows EXE installer to update (current: v${versionInfo?.current || ""}).`,
      };
    }
    if (platform === "linux") {
      return {
        label: "Download AppImage (Linux)",
        url: `https://github.com/diegosouzapw/OmniRoute/releases/download/v${cleanLatest}/OmniRoute-${cleanLatest}.AppImage`,
        desc: `A new version of the OmniRoute desktop app is available. Please download the Linux AppImage package to update (current: v${versionInfo?.current || ""}).`,
      };
    }
    return {
      label: "Download Update",
      url: `https://github.com/diegosouzapw/OmniRoute/releases/tag/v${cleanLatest}`,
      desc: `A new version of the OmniRoute desktop app is available. Please download the respective app format for your system to update (current: v${versionInfo?.current || ""}).`,
    };
  }, [platform, versionInfo?.latest, versionInfo?.current]);

  // Electron internal auto-updater state and listeners
  const [electronUpdateStatus, setElectronUpdateStatus] = useState<{
    status:
      | "idle"
      | "checking"
      | "available"
      | "not-available"
      | "downloading"
      | "downloaded"
      | "error";
    version?: string;
    percent?: number;
    message?: string;
  }>({ status: "idle" });

  useEffect(() => {
    if (!isElectron || typeof window === "undefined" || !window.electronAPI) return;

    // Trigger initial check silently on mount
    window.electronAPI.checkForUpdates().catch((err: any) => {
      console.error("[Electron] Check for updates failed:", err);
    });

    const dispose = window.electronAPI.onUpdateStatus((data: any) => {
      setElectronUpdateStatus({
        status: data.status,
        version: data.version,
        percent: data.percent,
        message: data.message,
      });
    });

    return dispose;
  }, [isElectron]);

  const [updateSteps, setUpdateSteps] = useState<UpdateStep[]>([]);
  const [updatePhase, setUpdatePhase] = useState<"idle" | "running" | "done" | "failed">("idle");

  // Appearance settings for home page pinning
  const [pinProviderQuotaToHome, setPinProviderQuotaToHome] = useState(false);
  const [showQuickStartOnHome, setShowQuickStartOnHome] = useState(true); // default on
  const [showProviderTopologyOnHome, setShowProviderTopologyOnHome] = useState(true); // default on

  useEffect(() => {
    // Fetch the pin settings (lightweight)
    fetch("/api/settings")
      .then((r) => (r.ok ? r.json() : {}))
      .then((data) => {
        if (data) {
          if (typeof data.pinProviderQuotaToHome === "boolean") {
            setPinProviderQuotaToHome(data.pinProviderQuotaToHome);
          }
          if (typeof data.showQuickStartOnHome === "boolean") {
            setShowQuickStartOnHome(data.showQuickStartOnHome);
          }
          if (typeof data.showProviderTopologyOnHome === "boolean") {
            setShowProviderTopologyOnHome(data.showProviderTopologyOnHome);
          }
        }
      })
      .catch(() => {
        /* ignore — defaults stay */
      });
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setBaseUrl(`${window.location.origin}/v1`);
    }
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const [provRes, modelsRes, metricsRes, versionRes] = await Promise.all([
        fetch("/api/providers"),
        fetch("/api/models"),
        fetch("/api/provider-metrics"),
        fetch("/api/system/version"),
      ]);
      if (provRes.ok) {
        const provData = await provRes.json();
        setProviderConnections(provData.connections || []);
      }
      if (modelsRes.ok) {
        const modelsData = await modelsRes.json();
        setModels(modelsData.models || []);
      }
      if (metricsRes.ok) {
        const metricsData = await metricsRes.json();
        setProviderMetrics(metricsData.metrics || {});
      }
      if (versionRes.ok) {
        const versionData = await versionRes.json();
        setVersionInfo(versionData);
      }
    } catch (e) {
      console.log("Error fetching data:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let controller: AbortController | null = null;

    const loadTopologyActivity = async () => {
      const currentController = new AbortController();
      controller = currentController;
      try {
        const [activeRes, metricsRes] = await Promise.all([
          fetch("/api/logs/active", { cache: "no-store", signal: currentController.signal }),
          fetch("/api/provider-metrics", { cache: "no-store", signal: currentController.signal }),
        ]);

        if (activeRes.ok) {
          const data = await activeRes.json();
          if (!cancelled) {
            setActiveRequests(Array.isArray(data.activeRequests) ? data.activeRequests : []);
          }
        }

        if (metricsRes.ok) {
          const data = await metricsRes.json();
          if (!cancelled) {
            setProviderMetrics(data.metrics || {});
          }
        }
      } catch (error) {
        const isAbortError = error instanceof DOMException && error.name === "AbortError";
        if (!cancelled && !isAbortError) {
          console.error("Failed to load topology activity:", error);
        }
      } finally {
        if (controller === currentController) {
          controller = null;
        }
        if (!cancelled) {
          timeoutId = setTimeout(loadTopologyActivity, 3000);
        }
      }
    };

    loadTopologyActivity();
    return () => {
      cancelled = true;
      if (timeoutId) clearTimeout(timeoutId);
      controller?.abort();
    };
  }, []);

  // T07: Check for unhealthy API keys and show notification (once per session)
  const notifiedUnhealthyKeys = useRef<Set<string>>(new Set());
  useEffect(() => {
    const checkApiKeyHealth = () => {
      const newUnhealthyKeys = new Set<string>();
      const unhealthyProviderIds = new Set<string>();
      const unhealthyConnections: string[] = [];
      let firstUnhealthyProviderId: string | null = null;
      let hasWarning = false;

      for (const conn of providerConnections) {
        const health = conn.providerSpecificData?.apiKeyHealth as
          | Record<
              string,
              {
                status: "active" | "warning" | "invalid";
                failures: number;
                lastFailure: string | null;
              }
            >
          | undefined;
        if (!health) continue;

        // Defense-in-depth: skip stale extra_N health entries whose index
        // is out of range of the current extraApiKeys list.
        // The backend cleans this up on PATCH, but existing stale data from
        // before the fix or other code paths could still have orphan entries.
        const extras: string[] = conn.providerSpecificData?.extraApiKeys ?? [];
        const extraKeyCount = Array.isArray(extras) ? extras.length : 0;

        const unhealthyKeys = Object.entries(health).filter(([keyId, h]) => {
          if (h.status !== "invalid" && h.status !== "warning") return false;
          // extra_N entries: only flag if the index is still within bounds
          if (keyId.startsWith("extra_")) {
            const idx = parseInt(keyId.slice(6), 10);
            if (isNaN(idx) || idx >= extraKeyCount) return false;
          }
          return true;
        });

        if (unhealthyKeys.length > 0) {
          for (const [, h] of unhealthyKeys) {
            if (h.status === "warning") hasWarning = true;
            break;
          }
          for (const [keyId] of unhealthyKeys) {
            newUnhealthyKeys.add(`${conn.id}:${keyId}`);
          }
          if (firstUnhealthyProviderId === null) {
            firstUnhealthyProviderId = conn.provider;
          }
          unhealthyConnections.push(conn.name || conn.id);
          unhealthyProviderIds.add(conn.provider);
        }
      }

      // Only notify for newly unhealthy keys (not already notified)
      const hasNewUnhealthy = Array.from(newUnhealthyKeys).some(
        (k) => !notifiedUnhealthyKeys.current.has(k)
      );
      if (hasNewUnhealthy) {
        const navigateTo =
          newUnhealthyKeys.size === 1 && firstUnhealthyProviderId
            ? `/dashboard/providers/${firstUnhealthyProviderId}`
            : `/dashboard/providers?search=${encodeURIComponent(Array.from(unhealthyProviderIds).join(" "))}`;

        const notificationType = hasWarning ? "warning" : "error";

        useNotificationStore.getState().addNotification({
          type: notificationType,
          message: tp(hasWarning ? "apiKeyWarningAlert" : "apiKeyInvalidAlert", {
            count: newUnhealthyKeys.size,
            connections: unhealthyConnections.join(", "),
          }),
          title: tp(hasWarning ? "apiKeyWarningAlertTitle" : "apiKeyInvalidAlertTitle"),
          duration: 10000,
          onClick: () => router.push(navigateTo),
        });
        // Mark all current unhealthy keys as notified
        newUnhealthyKeys.forEach((k) => notifiedUnhealthyKeys.current.add(k));
      }
    };

    if (providerConnections.length > 0) {
      checkApiKeyHealth();
    }
  }, [providerConnections, t, tp, router]);

  const providerStats = useMemo(() => {
    return Object.entries(AI_PROVIDERS).map(([providerId, providerInfo]) => {
      const connections = providerConnections.filter((conn) => conn.provider === providerId);
      const connected = connections.filter(
        (conn) =>
          conn.isActive !== false &&
          (conn.testStatus === "active" ||
            conn.testStatus === "success" ||
            conn.testStatus === "unknown")
      ).length;
      const errors = connections.filter(
        (conn) =>
          conn.isActive !== false &&
          (conn.testStatus === "error" ||
            conn.testStatus === "expired" ||
            conn.testStatus === "unavailable")
      ).length;

      const providerKeys = new Set([providerId, providerInfo.alias].filter(Boolean));
      const providerModels = models.filter((m) => providerKeys.has(m.provider));

      const authType = NOAUTH_PROVIDERS[providerId]
        ? "no-auth"
        : OAUTH_PROVIDERS[providerId]
          ? "oauth"
          : "apikey";

      return {
        id: providerId,
        provider: providerInfo,
        total: connections.length,
        connected,
        errors,
        modelCount: providerModels.length,
        authType,
      };
    });
  }, [providerConnections, models]);

  const selectedProviderModels = useMemo(() => {
    if (!selectedProvider) return [];
    const providerKeys = new Set(
      [selectedProvider.id, selectedProvider.provider?.alias].filter(Boolean)
    );
    return models.filter((m) => providerKeys.has(m.provider));
  }, [selectedProvider, models]);

  const topologyProviders = useMemo(() => {
    const byProvider = new Map<string, { id: string; provider: string; name?: string }>();
    const providerConfig = AI_PROVIDERS as Record<string, { name?: string }>;

    const addProvider = (providerId?: string | null, name?: string) => {
      const rawProviderId = typeof providerId === "string" ? providerId.trim() : "";
      if (!rawProviderId) return;

      const canonicalProviderId = normalizeProviderId(rawProviderId);
      if (!canonicalProviderId || byProvider.has(canonicalProviderId)) return;

      byProvider.set(canonicalProviderId, {
        id: canonicalProviderId,
        provider: canonicalProviderId,
        name: name || providerConfig[canonicalProviderId]?.name || rawProviderId,
      });
    };

    providerStats
      .filter((provider) => provider.total > 0)
      .forEach((provider) => addProvider(provider.id, provider.provider.name));
    Object.keys(providerMetrics).forEach((provider) => addProvider(provider));
    activeRequests.forEach((request) => addProvider(request.provider));

    return Array.from(byProvider.values());
  }, [providerStats, providerMetrics, activeRequests]);

  const topologyActiveRequests = useMemo(
    () =>
      activeRequests.map((request) => ({
        ...request,
        provider: normalizeProviderId(request.provider),
      })),
    [activeRequests]
  );

  const { lastProvider, errorProvider } = useMemo(() => {
    let recentProvider = "";
    let recentTimestamp = 0;
    let recentErrorProvider = "";
    let recentErrorTimestamp = 0;

    for (const [provider, metrics] of Object.entries(providerMetrics)) {
      const requestTimestamp = metrics.lastRequestAt ? Date.parse(metrics.lastRequestAt) : 0;
      if (Number.isFinite(requestTimestamp) && requestTimestamp > recentTimestamp) {
        recentProvider = normalizeProviderId(provider);
        recentTimestamp = requestTimestamp;
      }

      const errorTimestamp = metrics.lastErrorAt ? Date.parse(metrics.lastErrorAt) : 0;
      if (Number.isFinite(errorTimestamp) && errorTimestamp > recentErrorTimestamp) {
        recentErrorProvider = normalizeProviderId(provider);
        recentErrorTimestamp = errorTimestamp;
      }
    }

    return { lastProvider: recentProvider, errorProvider: recentErrorProvider };
  }, [providerMetrics]);

  const pollBackgroundUpdate = useCallback(
    async ({
      channel,
      message,
      targetVersion,
    }: {
      channel: string;
      message: string;
      targetVersion: string;
    }) => {
      const notify = useNotificationStore.getState();
      const initialSteps =
        channel === "docker-compose"
          ? [
              {
                step: "install",
                status: "done",
                message: message || `Queued update to v${targetVersion}.`,
              },
              {
                step: "rebuild",
                status: "running",
                message: "Docker image is rebuilding in the background.",
              },
              {
                step: "restart",
                status: "pending",
                message: "Waiting for OmniRoute to restart with the new version.",
              },
            ]
          : [
              {
                step: "install",
                status: "running",
                message: message || `Installing v${targetVersion}.`,
              },
              {
                step: "restart",
                status: "pending",
                message: "Waiting for OmniRoute to restart with the new version.",
              },
            ];

      setUpdateSteps(initialSteps);

      const maxAttempts = channel === "docker-compose" ? 72 : 36;

      for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
        await wait(5000);

        try {
          const versionRes = await fetch("/api/system/version", { cache: "no-store" });
          if (!versionRes.ok) {
            throw new Error(`Version check returned ${versionRes.status}`);
          }

          const latestInfo = await versionRes.json();
          setVersionInfo(latestInfo);

          if (latestInfo.current === targetVersion) {
            setUpdateSteps((prev) => {
              let next = prev.map((step) => {
                if (step.step === "install" || step.step === "rebuild" || step.step === "restart") {
                  return { ...step, status: "done" };
                }
                return step;
              });

              next = mergeUpdateStep(next, {
                step: "complete",
                status: "done",
                message: `OmniRoute is now running v${targetVersion}.`,
              });

              return next;
            });
            setUpdating(false);
            setUpdatePhase("done");
            notify.success(`OmniRoute updated to v${targetVersion}.`);
            await fetchData();
            return;
          }

          setUpdateSteps((prev) => {
            let next = prev;
            if (channel === "docker-compose") {
              next = mergeUpdateStep(next, {
                step: "rebuild",
                status: "running",
                message: `Docker image is still rebuilding for v${targetVersion}.`,
              });
            } else {
              next = mergeUpdateStep(next, {
                step: "install",
                status: "running",
                message: `Installing v${targetVersion} in the background.`,
              });
            }

            next = mergeUpdateStep(next, {
              step: "restart",
              status: "pending",
              message: `Waiting for OmniRoute to come back on v${targetVersion}.`,
            });

            return next;
          });
        } catch {
          setUpdateSteps((prev) => {
            let next = prev;
            if (channel === "docker-compose") {
              next = mergeUpdateStep(next, {
                step: "rebuild",
                status: "running",
                message: "Docker rebuild is still in progress.",
              });
            } else {
              next = mergeUpdateStep(next, {
                step: "install",
                status: "running",
                message: `Installing v${targetVersion} in the background.`,
              });
            }

            next = mergeUpdateStep(next, {
              step: "restart",
              status: "running",
              message: "Service restart in progress. Waiting for OmniRoute to come back online...",
            });

            return next;
          });
        }
      }

      setUpdateSteps((prev) =>
        mergeUpdateStep(prev, {
          step: "error",
          status: "failed",
          message: `Update started, but v${targetVersion} did not become available before timeout. Refresh the page or check server logs.`,
        })
      );
      setUpdating(false);
      setUpdatePhase("failed");
      notify.error(`Update to v${targetVersion} timed out.`);
    },
    [fetchData]
  );

  const handleUpdate = async () => {
    const notify = useNotificationStore.getState();
    setUpdating(true);
    setUpdatePhase("running");
    setUpdateSteps([]);

    try {
      const res = await fetch("/api/system/version", { method: "POST" });

      // If response is JSON (error/already up to date)
      const contentType = res.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        const data = await res.json();
        if (!res.ok || !data.success) {
          notify.error(data.error || "Failed to start update.");
          setUpdating(false);
          setUpdatePhase("idle");
          return;
        }
        notify.success(data.message || "Update started.");
        await pollBackgroundUpdate({
          channel: data.channel || "docker-compose",
          message: data.message || "",
          targetVersion: data.to || data.latest,
        });
        return;
      }

      // SSE stream — read progress events
      if (!res.body) {
        notify.error("No response stream received.");
        setUpdating(false);
        setUpdatePhase("idle");
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          try {
            const event = JSON.parse(line.slice(6));

            setUpdateSteps((prev) => {
              return mergeUpdateStep(prev, event);
            });

            if (event.step === "complete") {
              setUpdatePhase("done");
              setUpdating(false);
              notify.success(event.message || "Update complete!");
            } else if (event.step === "error") {
              setUpdatePhase("failed");
              notify.error(event.message || "Update failed.");
              setUpdating(false);
            }
          } catch {
            // ignore parse errors
          }
        }
      }
    } catch {
      setUpdatePhase("failed");
      setUpdateSteps((prev) => [
        ...prev,
        {
          step: "error",
          status: "failed",
          message: "Network error — connection lost during update.",
        },
      ]);
      setUpdating(false);
    }
  };

  // Auto-reload after successful update (service restarts, need new page)
  useEffect(() => {
    if (updatePhase !== "done") return;
    const timer = setTimeout(() => {
      window.location.reload();
    }, 8000);
    return () => clearTimeout(timer);
  }, [updatePhase]);

  const stepIcons: Record<string, string> = {
    install: "download",
    rebuild: "build",
    restart: "restart_alt",
    complete: "check_circle",
    error: "error",
  };

  const stepLabels: Record<string, string> = {
    install: "Install Package",
    rebuild: "Rebuild Native Modules",
    restart: "Restart Service",
    complete: "Complete",
    error: "Error",
  };
  const showUpdateOverlay = updatePhase !== "idle";

  if (loading) {
    return (
      <div className="flex flex-col gap-8">
        <CardSkeleton />
        <CardSkeleton />
      </div>
    );
  }

  const currentEndpoint = baseUrl;

  return (
    <div className="flex flex-col gap-8">
      {/* Update Progress Overlay */}
      {showUpdateOverlay && (
        <div className="fixed inset-0 z-[999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-bg-main border border-border rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-5">
              <span className="material-symbols-outlined text-primary text-[28px] animate-spin">
                progress_activity
              </span>
              <div>
                <h3 className="text-lg font-bold">
                  {updatePhase === "done"
                    ? "Update Complete!"
                    : updatePhase === "failed"
                      ? "Update Failed"
                      : "Updating OmniRoute..."}
                </h3>
                <p className="text-xs text-text-muted mt-0.5">
                  {updatePhase === "done"
                    ? "The page will reload automatically in a few seconds."
                    : updatePhase === "failed"
                      ? "Please try again or update manually via the CLI."
                      : "Do not close this page. The system will restart automatically."}
                </p>
              </div>
            </div>

            {/* Step list */}
            <div className="flex flex-col gap-2">
              {updateSteps
                .filter((s) => s.step !== "complete" && s.step !== "error")
                .map((s) => (
                  <div
                    key={s.step}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg border transition-all ${
                      s.status === "running"
                        ? "border-primary/40 bg-primary/5"
                        : s.status === "done"
                          ? "border-green-500/30 bg-green-500/5"
                          : s.status === "failed"
                            ? "border-red-500/30 bg-red-500/5"
                            : "border-border bg-bg-subtle"
                    }`}
                  >
                    {s.status === "running" ? (
                      <span className="material-symbols-outlined text-primary text-[18px] animate-spin">
                        progress_activity
                      </span>
                    ) : s.status === "done" ? (
                      <span className="material-symbols-outlined text-green-500 text-[18px]">
                        check_circle
                      </span>
                    ) : s.status === "failed" ? (
                      <span className="material-symbols-outlined text-red-500 text-[18px]">
                        error
                      </span>
                    ) : (
                      <span className="material-symbols-outlined text-yellow-500 text-[18px]">
                        warning
                      </span>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">{stepLabels[s.step] || s.step}</p>
                      <p className="text-xs text-text-muted truncate">{s.message}</p>
                    </div>
                  </div>
                ))}

              {/* Error message */}
              {updateSteps.find((s) => s.step === "error") && (
                <div className="mt-1 px-3 py-2.5 rounded-lg border border-red-500/30 bg-red-500/5 text-red-500">
                  <p className="text-xs font-mono break-all">
                    {updateSteps.find((s) => s.step === "error")?.message}
                  </p>
                </div>
              )}

              {/* Completion message */}
              {updatePhase === "done" && (
                <div className="mt-1 px-3 py-2.5 rounded-lg border border-green-500/30 bg-green-500/5">
                  <p className="text-sm font-semibold text-green-500 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">check_circle</span>
                    {updateSteps.find((s) => s.step === "complete")?.message || "Update complete!"}
                  </p>
                  <p className="text-xs text-text-muted mt-1">{t("reloadingPageAutomatically")}</p>
                </div>
              )}
            </div>

            {/* Actions */}
            {(updatePhase === "failed" || updatePhase === "done") && (
              <div className="flex gap-2 mt-4">
                <Button
                  size="sm"
                  fullWidth
                  onClick={() => {
                    setUpdating(false);
                    setUpdatePhase("idle");
                    setUpdateSteps([]);
                    if (updatePhase === "done") window.location.reload();
                  }}
                >
                  {updatePhase === "done" ? "Reload Now" : "Close"}
                </Button>
                {updatePhase === "failed" && (
                  <Button size="sm" variant="secondary" fullWidth onClick={handleUpdate}>
                    Retry
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Update Notification Banner */}
      {versionInfo?.updateAvailable && !showUpdateOverlay && (
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-3 rounded-lg border border-primary/20 bg-primary/10 px-5 py-4 text-primary">
            <div className="flex min-h-[48px] items-center justify-between">
              <div className="flex min-w-0 items-center gap-4">
                <span className="material-symbols-outlined shrink-0 text-[24px]">
                  {isElectron && electronUpdateStatus.status === "downloading"
                    ? "downloading"
                    : "system_update_alt"}
                </span>
                <div>
                  <p className="font-semibold text-sm">
                    Update Available: v{versionInfo.latest} {isElectron && "(Desktop App)"}
                  </p>
                  <p className="text-xs opacity-80 mt-0.5">
                    {isElectron ? (
                      <>
                        {electronUpdateStatus.status === "checking" && "Checking for updates..."}
                        {electronUpdateStatus.status === "available" &&
                          `Version v${versionInfo.latest} is available for download.`}
                        {electronUpdateStatus.status === "downloading" &&
                          `Downloading update... ${electronUpdateStatus.percent || 0}% complete.`}
                        {electronUpdateStatus.status === "downloaded" &&
                          "Update downloaded successfully! Click Restart & Install to apply."}
                        {electronUpdateStatus.status === "error" &&
                          `Auto-update failed: ${electronUpdateStatus.message || "Unknown error"}.`}
                        {(electronUpdateStatus.status === "idle" ||
                          electronUpdateStatus.status === "not-available") &&
                          `Version v${versionInfo.latest} is available for the desktop app.`}
                      </>
                    ) : versionInfo.autoUpdateSupported ? (
                      t("updateAvailableDesc") ||
                      `You are currently using v${versionInfo.current}. Update to access the latest features and bug fixes.`
                    ) : (
                      versionInfo.autoUpdateError ||
                      "Manual update required for this installation type."
                    )}
                  </p>
                </div>
              </div>

              {isElectron ? (
                <div className="flex gap-2 shrink-0 ml-4">
                  {electronUpdateStatus.status === "available" && (
                    <Button
                      size="sm"
                      onClick={() => window.electronAPI?.downloadUpdate()}
                      className="font-semibold"
                    >
                      Download Update
                    </Button>
                  )}
                  {electronUpdateStatus.status === "downloading" && (
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/20">
                      <span className="material-symbols-outlined text-primary text-[16px] animate-spin">
                        progress_activity
                      </span>
                      <span className="text-xs font-semibold">
                        {electronUpdateStatus.percent || 0}%
                      </span>
                    </div>
                  )}
                  {electronUpdateStatus.status === "downloaded" && (
                    <Button
                      size="sm"
                      onClick={() => window.electronAPI?.installUpdate()}
                      className="font-semibold animate-pulse"
                    >
                      Restart & Install
                    </Button>
                  )}
                  {(electronUpdateStatus.status === "error" ||
                    electronUpdateStatus.status === "idle" ||
                    electronUpdateStatus.status === "not-available") && (
                    <Button
                      size="sm"
                      onClick={() => {
                        setElectronUpdateStatus({ status: "checking" });
                        window.electronAPI?.checkForUpdates().catch((err: any) => {
                          setElectronUpdateStatus({ status: "error", message: err.message });
                        });
                      }}
                      className="font-semibold"
                    >
                      Check for Update
                    </Button>
                  )}
                </div>
              ) : (
                <Button
                  size="sm"
                  onClick={versionInfo.autoUpdateSupported ? handleUpdate : undefined}
                  disabled={updating || !versionInfo.autoUpdateSupported}
                  className="ml-4 shrink-0 font-semibold"
                  title={versionInfo.autoUpdateError || ""}
                >
                  {versionInfo.autoUpdateSupported
                    ? t("updateNow") || "Update Now"
                    : "Manual Update"}
                </Button>
              )}
            </div>

            {/* Direct download fallback links shown if in Electron and auto-updater has failed, is idle, or has completed check */}
            {isElectron &&
              (electronUpdateStatus.status === "error" ||
                electronUpdateStatus.status === "idle" ||
                electronUpdateStatus.status === "available" ||
                electronUpdateStatus.status === "not-available") && (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-primary/20 mt-2 pt-3 gap-2">
                  <p className="text-xs opacity-75">
                    Or download the respective installer format directly:
                  </p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() =>
                        openExternal(
                          `https://github.com/diegosouzapw/OmniRoute/releases/tag/v${versionInfo.latest}`
                        )
                      }
                      className="font-semibold text-xs py-1"
                    >
                      Release Notes
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => openExternal(electronDownload.url)}
                      className="font-semibold text-xs py-1"
                    >
                      {electronDownload.label}
                    </Button>
                  </div>
                </div>
              )}
          </div>

          {/* News Notification Banner */}
          {versionInfo?.news && (
            <div className="flex min-h-[64px] items-center justify-between rounded-lg border border-border bg-surface px-5 py-4">
              <div className="flex min-w-0 items-center gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-bg text-text-muted">
                  <span className="material-symbols-outlined text-[22px] text-primary">
                    {versionInfo.news.icon || "campaign"}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-text-main">{versionInfo.news.title}</p>
                  <p className="mt-0.5 max-w-[560px] text-xs leading-relaxed text-text-muted">
                    {versionInfo.news.message}
                  </p>
                </div>
              </div>

              {versionInfo.news.link && (
                <a
                  href={versionInfo.news.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-4 inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-border bg-bg px-4 py-2 text-xs font-semibold text-text-main transition-colors hover:border-primary/30 hover:text-primary"
                >
                  {versionInfo.news.linkLabel || "Ler Mais"}
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </a>
              )}
            </div>
          )}
        </div>
      )}

      {/* Pinned Provider Quota Limits (compact, no filters) */}
      {pinProviderQuotaToHome && (
        <Suspense fallback={<CardSkeleton />}>
          <ProviderLimits showFilters={false} />
        </Suspense>
      )}

      {/* Quick Start (controlled by Appearance setting, default on) */}
      {showQuickStartOnHome && (
        <Card>
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">{t("quickStart")}</h2>
                <p className="text-sm text-text-muted">{t("quickStartDesc")}</p>
              </div>
              <Link
                href="/docs"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-border text-text-muted hover:text-text-main hover:bg-bg-subtle transition-colors"
              >
                <span className="material-symbols-outlined text-[14px]">menu_book</span>
                {t("fullDocs")}
              </Link>
            </div>

            <ol className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <li className="rounded-lg border border-border bg-bg-subtle p-4 flex gap-3">
                <div className="flex items-center justify-center size-8 rounded-lg bg-primary/10 text-primary shrink-0">
                  <span className="material-symbols-outlined text-[18px]">key</span>
                </div>
                <div>
                  <span className="font-semibold">{t("step1Title")}</span>
                  <p className="text-text-muted mt-0.5">
                    {t.rich("step1Desc", {
                      endpoint: (chunks) => (
                        <Link href="/dashboard/endpoint" className="text-primary hover:underline">
                          {chunks}
                        </Link>
                      ),
                    })}
                  </p>
                </div>
              </li>
              <li className="rounded-lg border border-border bg-bg-subtle p-4 flex gap-3">
                <div className="flex items-center justify-center size-8 rounded-lg bg-green-500/10 text-green-500 shrink-0">
                  <span className="material-symbols-outlined text-[18px]">dns</span>
                </div>
                <div>
                  <span className="font-semibold">{t("step2Title")}</span>
                  <p className="text-text-muted mt-0.5">
                    {t.rich("step2Desc", {
                      providers: (chunks) => (
                        <Link href="/dashboard/providers" className="text-primary hover:underline">
                          {chunks}
                        </Link>
                      ),
                    })}
                  </p>
                </div>
              </li>
              <li className="rounded-lg border border-border bg-bg-subtle p-4 flex gap-3">
                <div className="flex items-center justify-center size-8 rounded-lg bg-blue-500/10 text-blue-500 shrink-0">
                  <span className="material-symbols-outlined text-[18px]">link</span>
                </div>
                <div>
                  <span className="font-semibold">{t("step3Title")}</span>
                  <p className="text-text-muted mt-0.5">
                    {t("step3Desc", { url: currentEndpoint })}
                  </p>
                </div>
              </li>
              <li className="rounded-lg border border-border bg-bg-subtle p-4 flex gap-3">
                <div className="flex items-center justify-center size-8 rounded-lg bg-amber-500/10 text-amber-500 shrink-0">
                  <span className="material-symbols-outlined text-[18px]">analytics</span>
                </div>
                <div>
                  <span className="font-semibold">{t("step4Title")}</span>
                  <p className="text-text-muted mt-0.5">
                    {t.rich("step4Desc", {
                      logs: (chunks) => (
                        <Link href="/dashboard/logs" className="text-primary hover:underline">
                          {chunks}
                        </Link>
                      ),
                      analytics: (chunks) => (
                        <Link href="/dashboard/analytics" className="text-primary hover:underline">
                          {chunks}
                        </Link>
                      ),
                    })}
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </Card>
      )}

      {/* Provider Topology (controlled by Appearance setting, default on) */}
      {showProviderTopologyOnHome && (
        <Card>
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-base font-semibold">{t("providerTopology")}</h2>
              <p className="text-xs text-text-muted">
                Connected providers routing through OmniRoute in real time
              </p>
            </div>
            <div className="flex items-center gap-3 text-[11px] text-text-muted">
              <span className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-green-500" /> Active
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-amber-500" /> Recent
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-red-500" /> Error
              </span>
            </div>
          </div>
          <ProviderTopology
            providers={topologyProviders}
            activeRequests={topologyActiveRequests}
            lastProvider={lastProvider}
            errorProvider={errorProvider}
          />
        </Card>
      )}

      {/* Provider Models Modal */}
      {selectedProvider && (
        <ProviderModelsModal
          provider={selectedProvider}
          models={selectedProviderModels}
          onClose={() => setSelectedProvider(null)}
        />
      )}
    </div>
  );
}

function ProviderOverviewCard({
  item,
  metrics,
  onClick,
}: {
  item: ProviderSummaryItem;
  metrics?: ProviderMetricSummary;
  onClick: () => void;
}) {
  const t = useTranslations("home");
  const tc = useTranslations("common");

  const statusVariant =
    item.errors > 0 ? "text-red-500" : item.connected > 0 ? "text-green-500" : "text-text-muted";

  const authTypeConfig = {
    "no-auth": { color: "bg-stone-500", label: "No Auth" },
    free: { color: "bg-green-500", label: tc("free") },
    oauth: { color: "bg-blue-500", label: t("oauthLabel") },
    apikey: { color: "bg-amber-500", label: t("apiKeyLabel") },
  };
  const authInfo = authTypeConfig[item.authType] || authTypeConfig.apikey;

  return (
    <button
      onClick={onClick}
      className="border border-border rounded-lg p-3 hover:bg-surface/40 transition-colors text-left cursor-pointer w-full"
    >
      <div className="flex items-center gap-2.5">
        <div
          className="size-8 rounded-lg flex items-center justify-center shrink-0"
          style={{ backgroundColor: `${item.provider.color || "#888"}15` }}
        >
          <ProviderIcon providerId={item.provider.id} size={26} type="color" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <p className="text-sm font-semibold truncate">{item.provider.name}</p>
            <span
              className={`size-2 rounded-full ${authInfo.color} shrink-0`}
              title={authInfo.label}
            />
          </div>
          <p className={`text-xs ${statusVariant}`}>
            {item.total === 0
              ? tc("notConfigured")
              : t("activeError", { active: item.connected, errors: item.errors })}
          </p>
          {metrics && metrics.totalRequests > 0 && (
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-[10px] text-text-muted">
                <span className="text-emerald-500">{metrics.totalSuccesses}</span>/
                {t("requestsShort", { count: metrics.totalRequests })}
              </span>
              <span className="text-[10px] text-text-muted">{metrics.successRate}%</span>
              <span className="text-[10px] text-text-muted">~{metrics.avgLatencyMs}ms</span>
            </div>
          )}
        </div>

        <div className="text-right shrink-0">
          <p className="text-xs font-medium text-text-main">{item.modelCount}</p>
          <p className="text-[10px] text-text-muted">{tc("models")}</p>
        </div>
      </div>
    </button>
  );
}

function ProviderModelsModal({
  provider,
  models,
  onClose,
}: {
  provider: ProviderSummaryItem;
  models: ProviderModelSummary[];
  onClose: () => void;
}) {
  const [copiedModel, setCopiedModel] = useState(null);
  const notify = useNotificationStore();
  const router = useRouter();
  const t = useTranslations("home");
  const tc = useTranslations("common");
  const ts = useTranslations("sidebar");

  const navigateTo = (path) => {
    onClose();
    router.push(path);
  };

  const handleCopy = async (text) => {
    await copyToClipboard(text);
    setCopiedModel(text);
    notify.success(t("copiedModel", { model: text }));
    setTimeout(() => setCopiedModel(null), 2000);
  };

  return (
    <Modal
      isOpen={true}
      title={t("providerModelsTitle", { provider: provider.provider.name })}
      onClose={onClose}
    >
      <div className="flex flex-col gap-3">
        {/* Summary */}
        <div className="flex items-center gap-2 text-sm text-text-muted">
          <span className="material-symbols-outlined text-[16px]">token</span>
          {models.length === 1
            ? t("modelAvailable", { count: models.length })
            : t("modelsAvailable", { count: models.length })}
          {provider.total > 0 && (
            <span className="ml-auto text-xs text-green-500">
              ●{" "}
              {provider.connected === 1
                ? t("connectionsActive", { count: provider.connected })
                : t("connectionsActivePlural", { count: provider.connected })}
            </span>
          )}
        </div>

        {models.length === 0 ? (
          <div className="text-center py-6">
            <span className="material-symbols-outlined text-[32px] text-text-muted mb-2">
              search_off
            </span>
            <p className="text-sm text-text-muted">{t("noModelsAvailable")}</p>
            <p className="text-xs text-text-muted mt-1">
              {t("configureFirst", { providers: ts("providers") })}
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-1 max-h-[400px] overflow-y-auto">
            {models.map((m) => (
              <div
                key={m.fullModel}
                className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-surface/50 transition-colors group"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-sm text-text-main truncate">{m.fullModel}</p>
                  {m.alias !== m.model && (
                    <p className="text-[10px] text-text-muted">
                      {t("aliasLabel")}: {m.alias}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => handleCopy(m.fullModel)}
                  className="shrink-0 ml-2 p-1.5 rounded-lg text-text-muted hover:text-text-main hover:bg-bg-subtle transition-colors opacity-0 group-hover:opacity-100"
                  title={t("copyModelName")}
                >
                  <span className="material-symbols-outlined text-[14px]">
                    {copiedModel === m.fullModel ? "check" : "content_copy"}
                  </span>
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-2 border-t border-border">
          <Button
            variant="secondary"
            fullWidth
            size="sm"
            onClick={() => navigateTo(`/dashboard/providers/${provider.id}`)}
            className="flex-1"
          >
            <span className="material-symbols-outlined text-[14px] mr-1">settings</span>
            {t("configureProvider")}
          </Button>
          <Button variant="ghost" size="sm" onClick={onClose}>
            {tc("close")}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

"use client";

import { useTranslations } from "next-intl";

import { useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardSkeleton, Button, Modal } from "@/shared/components";
import ProviderIcon from "@/shared/components/ProviderIcon";
import { AI_PROVIDERS, FREE_PROVIDERS, OAUTH_PROVIDERS } from "@/shared/constants/providers";
import { useNotificationStore } from "@/store/notificationStore";
import { copyToClipboard } from "@/shared/utils/clipboard";
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
};

type ProviderModelSummary = {
  fullModel: string;
  alias?: string;
  model?: string;
};

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
  const t = useTranslations("home");
  const tc = useTranslations("common");
  const ts = useTranslations("sidebar");
  const [providerConnections, setProviderConnections] = useState([]);
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [baseUrl, setBaseUrl] = useState("/v1");
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [providerMetrics, setProviderMetrics] = useState({});

  const [versionInfo, setVersionInfo] = useState<VersionInfo | null>(null);
  const [updating, setUpdating] = useState(false);
  const [updateSteps, setUpdateSteps] = useState<UpdateStep[]>([]);
  const [updatePhase, setUpdatePhase] = useState<"idle" | "running" | "done" | "failed">("idle");

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

      const authType = FREE_PROVIDERS[providerId]
        ? "free"
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

  const quickStartLinks = [
    { label: t("documentation"), href: "/docs", icon: "menu_book" },
    { label: ts("providers"), href: "/dashboard/providers", icon: "dns" },
    { label: ts("combos"), href: "/dashboard/combos", icon: "layers" },
    { label: ts("analytics"), href: "/dashboard/analytics", icon: "analytics" },
    { label: t("healthMonitor"), href: "/dashboard/health", icon: "health_and_safety" },
    { label: ts("cliTools"), href: "/dashboard/cli-tools", icon: "terminal" },
    {
      label: t("reportIssue"),
      href: "https://github.com/diegosouzapw/OmniRoute/issues",
      external: true,
      icon: "bug_report",
    },
  ];

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
                  <p className="text-xs text-text-muted mt-1">Reloading page automatically...</p>
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
          <div className="flex min-h-[64px] items-center justify-between rounded-lg border border-primary/20 bg-primary/10 px-5 py-4 text-primary">
            <div className="flex min-w-0 items-center gap-4">
              <span className="material-symbols-outlined shrink-0 text-[24px]">
                system_update_alt
              </span>
              <div>
                <p className="font-semibold text-sm">Update Available: v{versionInfo.latest}</p>
                <p className="text-xs opacity-80 mt-0.5">
                  {versionInfo.autoUpdateSupported
                    ? t("updateAvailableDesc") ||
                      `You are currently using v${versionInfo.current}. Update to access the latest features and bug fixes.`
                    : versionInfo.autoUpdateError ||
                      "Manual update required for this installation type."}
                </p>
              </div>
            </div>
            <Button
              size="sm"
              onClick={versionInfo.autoUpdateSupported ? handleUpdate : undefined}
              disabled={updating || !versionInfo.autoUpdateSupported}
              className="ml-4 shrink-0 font-semibold"
              title={versionInfo.autoUpdateError || ""}
            >
              {versionInfo.autoUpdateSupported ? t("updateNow") || "Update Now" : "Manual Update"}
            </Button>
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

      {/* Quick Start */}
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
                <p className="text-text-muted mt-0.5">{t("step3Desc", { url: currentEndpoint })}</p>
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

          <div className="flex flex-wrap gap-2">
            {quickStartLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-border text-text-muted hover:text-text-main hover:bg-bg-subtle transition-colors"
              >
                <span className="material-symbols-outlined text-[14px]">
                  {link.icon || (link.external ? "open_in_new" : "arrow_forward")}
                </span>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </Card>

      {/* Providers Overview */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold">{t("providersOverview")}</h2>
            <p className="text-sm text-text-muted">
              {t("configuredOf", {
                configured: providerStats.filter((item) => item.total > 0).length,
                total: providerStats.length,
              })}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-3 text-[11px] text-text-muted">
              <span className="flex items-center gap-1">
                <span className="size-2 rounded-full bg-green-500" /> {tc("free")}
              </span>
              <span className="flex items-center gap-1">
                <span className="size-2 rounded-full bg-blue-500" /> {t("oauthLabel")}
              </span>
              <span className="flex items-center gap-1">
                <span className="size-2 rounded-full bg-amber-500" /> {t("apiKeyLabel")}
              </span>
            </div>
            <Link
              href="/dashboard/providers"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-border text-text-muted hover:text-text-main hover:bg-bg-subtle transition-colors"
            >
              <span className="material-symbols-outlined text-[14px]">settings</span>
              {tc("manage")}
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {providerStats.map((item) => (
            <ProviderOverviewCard
              key={item.id}
              item={item}
              metrics={providerMetrics[item.provider.alias] || providerMetrics[item.id]}
              onClick={() => setSelectedProvider(item)}
            />
          ))}
        </div>
      </Card>

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

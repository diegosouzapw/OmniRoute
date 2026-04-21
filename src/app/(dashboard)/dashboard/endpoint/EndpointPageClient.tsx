"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { Card, Button, Input, Modal, CardSkeleton, SegmentedControl } from "@/shared/components";
import { useCopyToClipboard } from "@/shared/hooks/useCopyToClipboard";
import { AI_PROVIDERS, getProviderByAlias } from "@/shared/constants/providers";
import { useTranslations } from "next-intl";

const BUILD_TIME_CLOUD_URL = process.env.NEXT_PUBLIC_CLOUD_URL || null;
const CLOUD_ACTION_TIMEOUT_MS = 15000;
const TAILSCALE_POLL_INTERVAL_MS = 3000;
const TAILSCALE_POLL_ATTEMPTS = 40;
const TAILSCALE_REACHABILITY_TIMEOUT_MS = 60000;

type TranslationValues = Record<string, string | number | boolean | Date>;
type CloudflaredTunnelPhase =
  | "unsupported"
  | "not_installed"
  | "stopped"
  | "starting"
  | "running"
  | "error";

type CloudflaredTunnelStatus = {
  supported: boolean;
  installed: boolean;
  managedInstall: boolean;
  installSource: string | null;
  binaryPath: string | null;
  running: boolean;
  pid: number | null;
  publicUrl: string | null;
  apiUrl: string | null;
  targetUrl: string;
  phase: CloudflaredTunnelPhase;
  lastError: string | null;
  logPath: string;
};

type TunnelNotice = {
  type: "success" | "error" | "info" | "warning";
  message: string;
};

type TailscaleTunnelPhase =
  | "unsupported"
  | "not_installed"
  | "needs_daemon"
  | "needs_login"
  | "stopped"
  | "running"
  | "error";

type TailscaleTunnelStatus = {
  supported: boolean;
  platform: "darwin" | "linux" | "win32" | string;
  installed: boolean;
  binaryPath: string | null;
  brewAvailable: boolean;
  daemonRunning: boolean;
  loggedIn: boolean;
  running: boolean;
  tunnelUrl: string | null;
  apiUrl: string | null;
  targetUrl: string;
  phase: TailscaleTunnelPhase;
  enabled: boolean;
  lastError: string | null;
};

export default function APIPageClient({ machineId }) {
  const [resolvedMachineId, setResolvedMachineId] = useState(machineId || "");
  const t = useTranslations("endpoint");
  const tc = useTranslations("common");
  const [loading, setLoading] = useState(true);

  // Endpoints / models state
  const [allModels, setAllModels] = useState([]);
  const [expandedEndpoint, setExpandedEndpoint] = useState(null);

  // Cloud sync state
  const [cloudEnabled, setCloudEnabled] = useState(false);
  const [showCloudModal, setShowCloudModal] = useState(false);
  const [showDisableModal, setShowDisableModal] = useState(false);
  const [cloudSyncing, setCloudSyncing] = useState(false);
  const [cloudStatus, setCloudStatus] = useState(null);
  const [syncStep, setSyncStep] = useState(""); // "syncing" | "verifying" | "disabling" | "done" | ""
  const [modalSuccess, setModalSuccess] = useState(false); // show success state in modal before closing
  const [selectedProvider, setSelectedProvider] = useState(null); // for provider models popup
  const [cloudBaseUrl, setCloudBaseUrl] = useState(BUILD_TIME_CLOUD_URL); // dynamic cloud URL from API response
  const [cloudConfigured, setCloudConfigured] = useState(Boolean(BUILD_TIME_CLOUD_URL));
  const [viewTab, setViewTab] = useState("api");
  const [mcpStatus, setMcpStatus] = useState<any>(null);
  const [a2aStatus, setA2aStatus] = useState<any>(null);
  const [searchProviders, setSearchProviders] = useState<any[]>([]);
  const [cloudflaredStatus, setCloudflaredStatus] = useState<CloudflaredTunnelStatus | null>(null);
  const [cloudflaredBusy, setCloudflaredBusy] = useState(false);
  const [cloudflaredNotice, setCloudflaredNotice] = useState<TunnelNotice | null>(null);
  const [tailscaleStatus, setTailscaleStatus] = useState<TailscaleTunnelStatus | null>(null);
  const [tailscaleBusy, setTailscaleBusy] = useState(false);
  const [tailscaleInstallBusy, setTailscaleInstallBusy] = useState(false);
  const [tailscaleProgress, setTailscaleProgress] = useState("");
  const [tailscaleNotice, setTailscaleNotice] = useState<TunnelNotice | null>(null);
  const [tailscaleInstallLog, setTailscaleInstallLog] = useState<string[]>([]);
  const [tailscaleSudoPassword, setTailscaleSudoPassword] = useState("");
  const [showTailscaleModal, setShowTailscaleModal] = useState(false);
  const [showDisableTailscaleModal, setShowDisableTailscaleModal] = useState(false);
  const tailscaleLogRef = useRef<HTMLDivElement | null>(null);

  const { copied, copy } = useCopyToClipboard();

  const translateOrFallback = useCallback(
    (key: string, fallback: string, values?: TranslationValues) => {
      try {
        const message = values ? t(key as never, values as never) : t(key as never);
        if (!message || message === key || message === `endpoint.${key}`) {
          return fallback;
        }
        return message;
      } catch {
        return fallback;
      }
    },
    [t]
  );

  const fetchSearchProviders = async () => {
    try {
      const res = await fetch("/api/search/providers");
      if (res.ok) {
        const data = await res.json();
        setSearchProviders(data.providers || []);
      }
    } catch {
      // Search endpoint may not be available
    }
  };

  const fetchCloudflaredStatus = useCallback(
    async (silent = false) => {
      try {
        const res = await fetch("/api/tunnels/cloudflared", { cache: "no-store" });
        const data = await res.json().catch(() => null);
        if (!res.ok) {
          throw new Error(
            data?.error ||
              translateOrFallback(
                "cloudflaredRequestFailed",
                "Failed to load Cloudflare tunnel status"
              )
          );
        }

        setCloudflaredStatus(data);
        return data as CloudflaredTunnelStatus;
      } catch (error) {
        if (!silent) {
          setCloudflaredNotice({
            type: "error",
            message:
              error instanceof Error
                ? error.message
                : translateOrFallback(
                    "cloudflaredRequestFailed",
                    "Failed to load Cloudflare tunnel status"
                  ),
          });
        }
        return null;
      }
    },
    [translateOrFallback]
  );

  const fetchTailscaleStatus = useCallback(
    async (silent = false) => {
      try {
        const res = await fetch("/api/tunnel/status", { cache: "no-store" });
        const data = await res.json().catch(() => null);
        if (!res.ok) {
          throw new Error(
            data?.error ||
              translateOrFallback("tailscaleRequestFailed", "Failed to load Tailscale status")
          );
        }

        setTailscaleStatus(data?.tailscale || null);
        return (data?.tailscale || null) as TailscaleTunnelStatus | null;
      } catch (error) {
        if (!silent) {
          setTailscaleNotice({
            type: "error",
            message:
              error instanceof Error
                ? error.message
                : translateOrFallback("tailscaleRequestFailed", "Failed to load Tailscale status"),
          });
        }
        return null;
      }
    },
    [translateOrFallback]
  );

  const openTailscaleAuthWindow = useCallback((message: string) => {
    if (typeof window === "undefined") return null;

    const authWindow = window.open("", "tailscale_auth", "width=640,height=760");
    if (authWindow) {
      authWindow.document.write(
        `<p style="font-family:sans-serif;text-align:center;margin-top:40px">${message}</p>`
      );
    }

    return authWindow;
  }, []);

  const closeTailscaleAuthWindow = useCallback((authWindow: Window | null) => {
    if (!authWindow || authWindow.closed) return;

    try {
      authWindow.close();
    } catch {
      // Ignore browser close failures.
    }
  }, []);

  const waitForTailscaleReachability = useCallback(async (url: string) => {
    const startedAt = Date.now();
    while (Date.now() - startedAt < TAILSCALE_REACHABILITY_TIMEOUT_MS) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      try {
        const response = await fetch(url, { mode: "no-cors", cache: "no-store" });
        if (response.ok || response.type === "opaque") {
          return true;
        }
      } catch {
        // Keep polling until the timeout is hit.
      }
    }

    return false;
  }, []);

  const requestTailscaleEnable = useCallback(async () => {
    const res = await fetch("/api/tunnel/tailscale-enable", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sudoPassword: tailscaleSudoPassword || undefined }),
    });
    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      throw new Error(
        data?.error ||
          translateOrFallback("tailscaleEnableFailed", "Failed to enable Tailscale Funnel")
      );
    }

    return data;
  }, [tailscaleSudoPassword, translateOrFallback]);

  const pollForTailscaleLogin = useCallback(async () => {
    for (let attempt = 0; attempt < TAILSCALE_POLL_ATTEMPTS; attempt += 1) {
      await new Promise((resolve) => setTimeout(resolve, TAILSCALE_POLL_INTERVAL_MS));
      const status = await fetchTailscaleStatus(true);
      if (status?.loggedIn) {
        return status;
      }
    }

    return null;
  }, [fetchTailscaleStatus]);

  const pollForTailscaleFunnel = useCallback(
    async (enableUrl: string, authWindow: Window | null) => {
      if (authWindow && !authWindow.closed) {
        authWindow.location.href = enableUrl;
      } else if (typeof window !== "undefined") {
        window.open(enableUrl, "tailscale_auth", "width=640,height=760");
      }

      setTailscaleProgress(
        translateOrFallback(
          "tailscaleWaitingForFunnel",
          "Enable Funnel in the browser, then return here"
        )
      );

      for (let attempt = 0; attempt < TAILSCALE_POLL_ATTEMPTS; attempt += 1) {
        await new Promise((resolve) => setTimeout(resolve, TAILSCALE_POLL_INTERVAL_MS));
        const result = await requestTailscaleEnable();
        if (result?.success) {
          return result;
        }
        if (result?.funnelNotEnabled) {
          continue;
        }
        throw new Error(
          result?.error ||
            translateOrFallback("tailscaleEnableFailed", "Failed to enable Tailscale Funnel")
        );
      }

      throw new Error(
        translateOrFallback(
          "tailscaleFunnelTimeout",
          "Timed out waiting for Tailscale Funnel to be enabled"
        )
      );
    },
    [requestTailscaleEnable, translateOrFallback]
  );

  const finalizeTailscaleSuccess = useCallback(
    async (tunnelUrl: string, successMessage: string) => {
      const status = await fetchTailscaleStatus(true);
      const reachable = await waitForTailscaleReachability(tunnelUrl);
      setTailscaleStatus(status);
      setTailscaleNotice({
        type: reachable ? "success" : "warning",
        message: reachable
          ? successMessage
          : translateOrFallback(
              "tailscaleReachabilityPending",
              "Tailscale is connected, but the public URL is still warming up"
            ),
      });
      setShowTailscaleModal(false);
    },
    [fetchTailscaleStatus, translateOrFallback, waitForTailscaleReachability]
  );

  useEffect(() => {
    Promise.allSettled([
      loadCloudSettings(),
      fetchModels(),
      fetchProtocolStatus(),
      fetchSearchProviders(),
      fetchCloudflaredStatus(true),
      fetchTailscaleStatus(true),
    ]).finally(() => {
      setLoading(false);
    });
  }, [fetchCloudflaredStatus, fetchTailscaleStatus]);

  const fetchModels = async () => {
    try {
      const res = await fetch("/v1/models");
      if (res.ok) {
        const data = await res.json();
        setAllModels(data.data || []);
      }
    } catch (e) {
      console.log("Error fetching models:", e);
    }
  };

  const fetchProtocolStatus = async () => {
    try {
      const [mcpRes, a2aRes] = await Promise.allSettled([
        fetch("/api/mcp/status"),
        fetch("/api/a2a/status"),
      ]);

      if (mcpRes.status === "fulfilled" && mcpRes.value.ok) {
        setMcpStatus(await mcpRes.value.json());
      }
      if (a2aRes.status === "fulfilled" && a2aRes.value.ok) {
        setA2aStatus(await a2aRes.value.json());
      }
    } catch {
      // Ignore status failures; protocols panel has fallback text.
    }
  };

  // Categorize models by endpoint type
  // Filter out parent models (models with parent field set) to avoid showing duplicates
  const endpointData = useMemo(() => {
    const chat = allModels.filter((m) => !m.type && !m.parent);
    const embeddings = allModels.filter((m) => m.type === "embedding" && !m.parent);
    const images = allModels.filter((m) => m.type === "image" && !m.parent);
    const rerank = allModels.filter((m) => m.type === "rerank" && !m.parent);
    const audioTranscription = allModels.filter(
      (m) => m.type === "audio" && m.subtype === "transcription" && !m.parent
    );
    const audioSpeech = allModels.filter(
      (m) => m.type === "audio" && m.subtype === "speech" && !m.parent
    );
    const moderation = allModels.filter((m) => m.type === "moderation" && !m.parent);
    const music = allModels.filter((m) => m.type === "music" && !m.parent);
    return { chat, embeddings, images, rerank, audioTranscription, audioSpeech, moderation, music };
  }, [allModels]);

  const postCloudAction = async (action, timeoutMs = CLOUD_ACTION_TIMEOUT_MS) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const res = await fetch("/api/sync/cloud", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
        signal: controller.signal,
      });
      const data = await res.json().catch(() => ({}));
      return { ok: res.ok, status: res.status, data };
    } catch (error) {
      if (error?.name === "AbortError") {
        return { ok: false, status: 408, data: { error: t("cloudRequestTimeout") } };
      }
      return { ok: false, status: 500, data: { error: error.message || t("cloudRequestFailed") } };
    } finally {
      clearTimeout(timeoutId);
    }
  };

  const loadCloudSettings = async () => {
    try {
      const res = await fetch("/api/settings");
      if (res.ok) {
        const data = await res.json();
        setCloudEnabled(data.cloudEnabled || false);
        if (typeof data.cloudConfigured === "boolean") {
          setCloudConfigured(data.cloudConfigured);
        }
        if (data.cloudUrl) {
          setCloudBaseUrl(data.cloudUrl);
        }
        if (data.machineId) {
          setResolvedMachineId(data.machineId);
        }
      }
    } catch (error) {
      console.log("Error loading cloud settings:", error);
    }
  };

  const handleCloudToggle = (checked) => {
    if (checked) {
      if (!cloudConfigured) {
        setCloudStatus({
          type: "warning",
          message: "Cloud sync is not configured on this instance.",
        });
        return;
      }
      setShowCloudModal(true);
    } else {
      setShowDisableModal(true);
    }
  };

  // Auto-dismiss cloudStatus after 5s
  useEffect(() => {
    if (cloudStatus) {
      const timer = setTimeout(() => setCloudStatus(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [cloudStatus]);

  useEffect(() => {
    if (cloudflaredNotice) {
      const timer = setTimeout(() => setCloudflaredNotice(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [cloudflaredNotice]);

  useEffect(() => {
    if (tailscaleNotice) {
      const timer = setTimeout(() => setTailscaleNotice(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [tailscaleNotice]);

  useEffect(() => {
    if (tailscaleLogRef.current) {
      tailscaleLogRef.current.scrollTop = tailscaleLogRef.current.scrollHeight;
    }
  }, [tailscaleInstallLog]);

  useEffect(() => {
    const interval = setInterval(() => {
      void fetchProtocolStatus();
      void fetchCloudflaredStatus(true);
      void fetchTailscaleStatus(true);
    }, 30000);
    return () => clearInterval(interval);
  }, [fetchCloudflaredStatus, fetchTailscaleStatus]);

  const dispatchCloudChange = () => {
    globalThis.dispatchEvent(new Event("cloud-status-changed"));
  };

  const handleEnableCloud = async () => {
    setCloudSyncing(true);
    setModalSuccess(false);
    setSyncStep("syncing");
    try {
      const { ok, status, data } = await postCloudAction("enable");
      if (ok) {
        setSyncStep("verifying");

        // Brief delay so user sees the verifying step
        await new Promise((r) => setTimeout(r, 600));

        // Sync succeeded — mark as enabled regardless of verify result
        setCloudEnabled(true);
        setSyncStep("done");
        setModalSuccess(true);
        setCloudSyncing(false);
        dispatchCloudChange();

        // Show success in modal for a moment, then close
        await new Promise((r) => setTimeout(r, 1200));
        setShowCloudModal(false);
        setModalSuccess(false);

        if (data.verified) {
          setCloudStatus({ type: "success", message: t("cloudConnectedVerified") });
        } else {
          setCloudStatus({
            type: "warning",
            message: data.verifyError
              ? t("connectedVerificationPendingWithError", { error: data.verifyError })
              : t("connectedVerificationPending"),
          });
        }

        // Update cloud URL from API response (fixes undefined/v1 when env var not set)
        if (data.cloudUrl) {
          setCloudBaseUrl(data.cloudUrl);
        }
        // Reload settings to ensure fresh state
        await loadCloudSettings();
      } else {
        // Sync failed — provide a helpful error message
        let errorMessage = data.error || t("failedEnable");
        if (status === 502 || status === 408) {
          errorMessage = t("cloudWorkerUnreachable");
        }
        setCloudStatus({ type: "error", message: errorMessage });
        setShowCloudModal(false);
      }
    } catch (error) {
      setCloudStatus({ type: "error", message: error.message || t("connectionFailed") });
      setShowCloudModal(false);
    } finally {
      setCloudSyncing(false);
      setSyncStep("");
    }
  };

  const handleConfirmDisable = async () => {
    setCloudSyncing(true);
    setSyncStep("syncing");

    try {
      // Step 1: Sync latest data from cloud
      await postCloudAction("sync");

      setSyncStep("disabling");

      // Step 2: Disable cloud
      const { ok, data } = await postCloudAction("disable");

      if (ok) {
        setCloudEnabled(false);
        setCloudStatus({ type: "success", message: t("cloudDisabledSuccess") });
        setShowDisableModal(false);
        dispatchCloudChange();
        await loadCloudSettings();
      } else {
        setCloudStatus({ type: "error", message: data.error || t("failedDisable") });
      }
    } catch (error) {
      console.log("Error disabling cloud:", error);
      setCloudStatus({ type: "error", message: t("failedDisable") });
    } finally {
      setCloudSyncing(false);
      setSyncStep("");
    }
  };

  const handleCloudflaredAction = async (action: "enable" | "disable") => {
    setCloudflaredBusy(true);
    setCloudflaredNotice(null);

    try {
      const res = await fetch("/api/tunnels/cloudflared", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(
          data?.error ||
            translateOrFallback("cloudflaredRequestFailed", "Failed to update Cloudflare tunnel")
        );
      }

      if (data?.status) {
        setCloudflaredStatus(data.status);
      }

      setCloudflaredNotice({
        type: "success",
        message:
          action === "enable"
            ? translateOrFallback("cloudflaredStarted", "Cloudflare tunnel started")
            : translateOrFallback("cloudflaredStopped", "Cloudflare tunnel stopped"),
      });
    } catch (error) {
      setCloudflaredNotice({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : translateOrFallback("cloudflaredRequestFailed", "Failed to update Cloudflare tunnel"),
      });
    } finally {
      setCloudflaredBusy(false);
      await fetchCloudflaredStatus(true);
    }
  };

  const handleOpenTailscaleModal = async () => {
    setShowTailscaleModal(true);
    setTailscaleProgress("");
    setTailscaleInstallLog([]);
    setTailscaleNotice(null);
    await fetchTailscaleStatus(true);
  };

  const handleInstallTailscale = async () => {
    setTailscaleInstallBusy(true);
    setTailscaleNotice(null);
    setTailscaleInstallLog([]);

    try {
      const res = await fetch("/api/tunnel/tailscale-install", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sudoPassword: tailscaleSudoPassword || undefined }),
      });

      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => ({}));
        throw new Error(
          data?.error ||
            translateOrFallback("tailscaleInstallFailed", "Failed to install Tailscale")
        );
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const parts = buffer.split("\n\n");
        buffer = parts.pop() || "";

        for (const part of parts) {
          const lines = part.split("\n");
          let eventName = "progress";
          let payload: Record<string, unknown> | null = null;

          for (const line of lines) {
            if (line.startsWith("event: ")) {
              eventName = line.slice(7).trim();
            }
            if (line.startsWith("data: ")) {
              try {
                payload = JSON.parse(line.slice(6)) as Record<string, unknown>;
              } catch {
                payload = null;
              }
            }
          }

          if (!payload) continue;

          if (eventName === "progress" && typeof payload.message === "string") {
            setTailscaleInstallLog((previous) => [
              ...previous.slice(-49),
              payload.message as string,
            ]);
            continue;
          }

          if (eventName === "done") {
            await fetchTailscaleStatus(true);
            setTailscaleNotice({
              type: "success",
              message: translateOrFallback("tailscaleInstalled", "Tailscale installed"),
            });
            setTailscaleSudoPassword("");
            return;
          }

          if (eventName === "error") {
            throw new Error(
              typeof payload.error === "string"
                ? payload.error
                : translateOrFallback("tailscaleInstallFailed", "Failed to install Tailscale")
            );
          }
        }
      }

      await fetchTailscaleStatus(true);
    } catch (error) {
      setTailscaleNotice({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : translateOrFallback("tailscaleInstallFailed", "Failed to install Tailscale"),
      });
    } finally {
      setTailscaleInstallBusy(false);
    }
  };

  const handleEnableTailscale = async () => {
    const authWindow = openTailscaleAuthWindow(
      translateOrFallback("tailscaleBrowserConnecting", "Connecting to Tailscale...")
    );

    setTailscaleBusy(true);
    setTailscaleNotice(null);
    setTailscaleProgress(translateOrFallback("tailscaleConnecting", "Connecting..."));

    try {
      let result = await requestTailscaleEnable();

      if (result?.success) {
        closeTailscaleAuthWindow(authWindow);
        const tunnelUrl = result.tunnelUrl || result.status?.tunnelUrl;
        if (!tunnelUrl) {
          throw new Error(
            translateOrFallback("tailscaleMissingUrl", "Tailscale did not return a public URL")
          );
        }
        await finalizeTailscaleSuccess(
          tunnelUrl,
          translateOrFallback("tailscaleEnabled", "Tailscale Funnel enabled")
        );
        return;
      }

      if (result?.needsLogin && result?.authUrl) {
        if (authWindow && !authWindow.closed) {
          authWindow.location.href = result.authUrl;
        } else if (typeof window !== "undefined") {
          window.open(result.authUrl, "tailscale_auth", "width=640,height=760");
        }

        setTailscaleProgress(
          translateOrFallback("tailscaleWaitingLogin", "Waiting for Tailscale login...")
        );
        const loggedInStatus = await pollForTailscaleLogin();
        if (!loggedInStatus?.loggedIn) {
          throw new Error(
            translateOrFallback("tailscaleLoginTimeout", "Timed out waiting for Tailscale login")
          );
        }

        setTailscaleProgress(
          translateOrFallback("tailscaleStartingFunnel", "Starting Tailscale Funnel...")
        );
        result = await requestTailscaleEnable();
      }

      if (result?.funnelNotEnabled && result?.enableUrl) {
        result = await pollForTailscaleFunnel(result.enableUrl, authWindow);
      }

      if (result?.success) {
        closeTailscaleAuthWindow(authWindow);
        const tunnelUrl = result.tunnelUrl || result.status?.tunnelUrl;
        if (!tunnelUrl) {
          throw new Error(
            translateOrFallback("tailscaleMissingUrl", "Tailscale did not return a public URL")
          );
        }
        await finalizeTailscaleSuccess(
          tunnelUrl,
          translateOrFallback("tailscaleEnabled", "Tailscale Funnel enabled")
        );
        return;
      }

      throw new Error(
        result?.error ||
          translateOrFallback("tailscaleEnableFailed", "Failed to enable Tailscale Funnel")
      );
    } catch (error) {
      closeTailscaleAuthWindow(authWindow);
      setTailscaleNotice({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : translateOrFallback("tailscaleEnableFailed", "Failed to enable Tailscale Funnel"),
      });
    } finally {
      setTailscaleBusy(false);
      setTailscaleProgress("");
      setTailscaleSudoPassword("");
      await fetchTailscaleStatus(true);
    }
  };

  const handleDisableTailscale = async () => {
    setTailscaleBusy(true);
    setTailscaleNotice(null);

    try {
      const res = await fetch("/api/tunnel/tailscale-disable", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sudoPassword: tailscaleSudoPassword || undefined }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(
          data?.error ||
            translateOrFallback("tailscaleDisableFailed", "Failed to disable Tailscale Funnel")
        );
      }

      if (data?.status) {
        setTailscaleStatus(data.status);
      }
      setShowDisableTailscaleModal(false);
      setTailscaleNotice({
        type: "success",
        message: translateOrFallback("tailscaleDisabled", "Tailscale Funnel disabled"),
      });
      setTailscaleSudoPassword("");
    } catch (error) {
      setTailscaleNotice({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : translateOrFallback("tailscaleDisableFailed", "Failed to disable Tailscale Funnel"),
      });
    } finally {
      setTailscaleBusy(false);
      await fetchTailscaleStatus(true);
    }
  };

  const [baseUrl, setBaseUrl] = useState("/v1");
  const normalizedCloudBaseUrl = cloudBaseUrl
    ? resolvedMachineId && !cloudBaseUrl.endsWith(`/${resolvedMachineId}`)
      ? `${cloudBaseUrl}/${resolvedMachineId}`
      : cloudBaseUrl
    : null;
  const cloudEndpointNew = normalizedCloudBaseUrl ? `${normalizedCloudBaseUrl}/v1` : null;

  // Hydration fix: Only access window on client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      setBaseUrl(`${window.location.origin}/v1`);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col gap-8">
        <CardSkeleton />
        <CardSkeleton />
      </div>
    );
  }

  // Use new format endpoint (machineId embedded in key)
  const currentEndpoint = cloudEnabled && cloudEndpointNew ? cloudEndpointNew : baseUrl;
  const mcpOnline = Boolean(mcpStatus?.online);
  const a2aOnline = a2aStatus?.status === "ok";
  const mcpToolCount = Number(mcpStatus?.heartbeat?.toolCount || 0);
  const a2aActiveStreams = Number(a2aStatus?.tasks?.activeStreams || 0);
  const cloudflaredPhase = cloudflaredStatus?.phase || "not_installed";
  const cloudflaredPhaseMeta: Record<CloudflaredTunnelPhase, { label: string; className: string }> =
    {
      running: {
        label: translateOrFallback("cloudflaredRunning", "Running"),
        className: "bg-green-500/10 border-green-500/30 text-green-400",
      },
      starting: {
        label: translateOrFallback("cloudflaredStarting", "Starting"),
        className: "bg-blue-500/10 border-blue-500/30 text-blue-400",
      },
      stopped: {
        label: translateOrFallback("cloudflaredStoppedState", "Stopped"),
        className: "bg-surface border-border/70 text-text-muted",
      },
      not_installed: {
        label: translateOrFallback("cloudflaredNotInstalled", "Not installed"),
        className: "bg-surface border-border/70 text-text-muted",
      },
      unsupported: {
        label: translateOrFallback("cloudflaredUnsupported", "Unsupported"),
        className: "bg-amber-500/10 border-amber-500/30 text-amber-400",
      },
      error: {
        label: translateOrFallback("cloudflaredError", "Error"),
        className: "bg-red-500/10 border-red-500/30 text-red-400",
      },
    };
  const cloudflaredActionLabel = cloudflaredStatus?.running
    ? translateOrFallback("cloudflaredDisable", "Stop Tunnel")
    : cloudflaredStatus?.installed
      ? translateOrFallback("cloudflaredEnable", "Enable Tunnel")
      : translateOrFallback("cloudflaredInstallAndEnable", "Install & Enable");
  const cloudflaredUrlNotice = translateOrFallback(
    "cloudflaredUrlNotice",
    "Creates a temporary Cloudflare Quick Tunnel. The URL changes after every restart."
  );
  const tailscalePhase = tailscaleStatus?.phase || "not_installed";
  const tailscalePhaseMeta: Record<TailscaleTunnelPhase, { label: string; className: string }> = {
    running: {
      label: translateOrFallback("tailscaleRunning", "Running"),
      className: "bg-green-500/10 border-green-500/30 text-green-400",
    },
    stopped: {
      label: translateOrFallback("tailscaleStopped", "Stopped"),
      className: "bg-surface border-border/70 text-text-muted",
    },
    not_installed: {
      label: translateOrFallback("tailscaleNotInstalled", "Not installed"),
      className: "bg-surface border-border/70 text-text-muted",
    },
    needs_daemon: {
      label: translateOrFallback("tailscaleNeedsDaemon", "Needs daemon"),
      className: "bg-amber-500/10 border-amber-500/30 text-amber-400",
    },
    needs_login: {
      label: translateOrFallback("tailscaleNeedsLogin", "Needs login"),
      className: "bg-blue-500/10 border-blue-500/30 text-blue-400",
    },
    unsupported: {
      label: translateOrFallback("tailscaleUnsupported", "Unsupported"),
      className: "bg-amber-500/10 border-amber-500/30 text-amber-400",
    },
    error: {
      label: translateOrFallback("tailscaleError", "Error"),
      className: "bg-red-500/10 border-red-500/30 text-red-400",
    },
  };
  const tailscaleActionLabel = tailscaleStatus?.running
    ? translateOrFallback("tailscaleDisable", "Disable Funnel")
    : tailscaleStatus?.installed
      ? translateOrFallback("tailscaleConnect", "Connect Tailscale")
      : translateOrFallback("tailscaleInstallAndConnect", "Install & Connect");
  const tailscaleUrlNotice = translateOrFallback(
    "tailscaleUrlNotice",
    "Uses your tailnet and can keep a stable .ts.net address after restarts."
  );
  const tailscaleNeedsSudo =
    tailscaleStatus?.platform === "linux" ||
    (tailscaleStatus?.platform === "darwin" && !tailscaleStatus?.brewAvailable);

  return (
    <div className="flex flex-col gap-8">
      {/* Endpoint Card */}
      <Card className={cloudEnabled ? "" : ""}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold">{t("title")}</h2>
            <div className="mt-2">
              <Button
                size="sm"
                variant={cloudEnabled ? "primary" : "secondary"}
                icon={cloudEnabled ? "cloud_done" : "dns"}
                onClick={() => handleCloudToggle(!cloudEnabled)}
                disabled={cloudSyncing || (!cloudEnabled && !cloudConfigured)}
                className={
                  cloudEnabled ? "" : "border-border/70! text-text-muted! hover:text-text!"
                }
              >
                {cloudEnabled ? t("usingCloudProxy") : t("usingLocalServer")}
              </Button>
            </div>
            {resolvedMachineId && (
              <p className="text-xs text-text-muted mt-2">
                {t("machineId", { id: resolvedMachineId.slice(0, 8) })}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            {cloudEnabled ? (
              <Button
                size="sm"
                variant="secondary"
                icon="cloud_off"
                onClick={() => handleCloudToggle(false)}
                disabled={cloudSyncing}
                className="bg-red-500/10! text-red-500! hover:bg-red-500/20! border-red-500/30!"
              >
                {t("disableCloud")}
              </Button>
            ) : cloudConfigured ? (
              <Button
                variant="primary"
                icon="cloud_upload"
                onClick={() => handleCloudToggle(true)}
                disabled={cloudSyncing}
                className="bg-linear-to-r from-primary to-blue-500 hover:from-primary-hover hover:to-blue-600"
              >
                {t("enableCloud")}
              </Button>
            ) : (
              <span className="text-xs px-2 py-1 rounded-full bg-surface text-text-muted border border-border/70">
                Cloud not configured
              </span>
            )}
          </div>
        </div>

        {/* Cloud Status Toast */}
        {cloudStatus && (
          <div
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg mb-4 text-sm font-medium animate-in fade-in slide-in-from-top-2 duration-300 ${
              cloudStatus.type === "success"
                ? "bg-green-500/10 border border-green-500/30 text-green-400"
                : cloudStatus.type === "warning"
                  ? "bg-amber-500/10 border border-amber-500/30 text-amber-400"
                  : "bg-red-500/10 border border-red-500/30 text-red-400"
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
              {cloudStatus.type === "success"
                ? "check_circle"
                : cloudStatus.type === "warning"
                  ? "warning"
                  : "error"}
            </span>
            <span className="flex-1">{cloudStatus.message}</span>
            <button
              onClick={() => setCloudStatus(null)}
              className="p-0.5 hover:bg-white/10 rounded transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          </div>
        )}

        {/* Endpoint URL */}
        <div className="flex flex-col sm:flex-row gap-2 mb-3">
          <Input
            value={currentEndpoint}
            readOnly
            className={`flex-1 min-w-0 font-mono text-sm ${cloudEnabled ? "animate-border-glow" : ""}`}
          />
          <Button
            variant="secondary"
            icon={copied === "endpoint_url" ? "check" : "content_copy"}
            onClick={() => copy(currentEndpoint, "endpoint_url")}
            className="shrink-0 self-start sm:self-auto"
          >
            {copied === "endpoint_url" ? tc("copied") : tc("copy")}
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          <div className="rounded-xl border border-border/70 bg-surface/40 p-4">
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-sm font-semibold">
                      {translateOrFallback("cloudflaredTitle", "Cloudflare Quick Tunnel")}
                    </h3>
                    <span
                      className={`inline-flex items-center rounded-full border px-2 py-1 text-xs font-medium ${cloudflaredPhaseMeta[cloudflaredPhase].className}`}
                    >
                      {cloudflaredPhaseMeta[cloudflaredPhase].label}
                    </span>
                  </div>
                </div>

                {cloudflaredStatus?.supported !== false && (
                  <Button
                    size="sm"
                    variant={cloudflaredStatus?.running ? "secondary" : "primary"}
                    icon={cloudflaredStatus?.running ? "cloud_off" : "cloud_upload"}
                    onClick={() =>
                      handleCloudflaredAction(cloudflaredStatus?.running ? "disable" : "enable")
                    }
                    loading={cloudflaredBusy}
                    className={
                      cloudflaredStatus?.running
                        ? "border-border/70! text-text-muted! hover:text-text!"
                        : "bg-linear-to-r from-primary to-cyan-500 hover:from-primary-hover hover:to-cyan-600"
                    }
                  >
                    {cloudflaredActionLabel}
                  </Button>
                )}
              </div>

              {cloudflaredNotice && (
                <div
                  className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm ${
                    cloudflaredNotice.type === "success"
                      ? "border-green-500/30 bg-green-500/10 text-green-400"
                      : cloudflaredNotice.type === "info"
                        ? "border-blue-500/30 bg-blue-500/10 text-blue-400"
                        : cloudflaredNotice.type === "warning"
                          ? "border-amber-500/30 bg-amber-500/10 text-amber-400"
                          : "border-red-500/30 bg-red-500/10 text-red-400"
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {cloudflaredNotice.type === "success"
                      ? "check_circle"
                      : cloudflaredNotice.type === "info"
                        ? "info"
                        : cloudflaredNotice.type === "warning"
                          ? "warning"
                          : "error"}
                  </span>
                  <span className="flex-1">{cloudflaredNotice.message}</span>
                  <button
                    onClick={() => setCloudflaredNotice(null)}
                    className="rounded p-0.5 transition-colors hover:bg-white/10"
                  >
                    <span className="material-symbols-outlined text-[16px]">close</span>
                  </button>
                </div>
              )}

              <p className="text-xs text-text-muted">{cloudflaredUrlNotice}</p>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Input
                  value={cloudflaredStatus?.apiUrl || ""}
                  readOnly
                  placeholder="https://*.trycloudflare.com/v1"
                  className="flex-1 min-w-0 font-mono text-sm"
                />
                <Button
                  variant="secondary"
                  icon={copied === "cloudflared_url" ? "check" : "content_copy"}
                  onClick={() =>
                    cloudflaredStatus?.apiUrl && copy(cloudflaredStatus.apiUrl, "cloudflared_url")
                  }
                  disabled={!cloudflaredStatus?.apiUrl}
                  className="shrink-0 self-start sm:self-auto"
                >
                  {copied === "cloudflared_url" ? tc("copied") : tc("copy")}
                </Button>
              </div>
              {cloudflaredStatus?.lastError && (
                <p className="text-xs text-red-400">
                  {translateOrFallback("cloudflaredLastError", "Last error: {error}", {
                    error: cloudflaredStatus.lastError,
                  })}
                </p>
              )}
            </div>
          </div>

          <div className="rounded-xl border border-border/70 bg-surface/40 p-4">
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-sm font-semibold">
                      {translateOrFallback("tailscaleTitle", "Tailscale Funnel")}
                    </h3>
                    <span
                      className={`inline-flex items-center rounded-full border px-2 py-1 text-xs font-medium ${tailscalePhaseMeta[tailscalePhase].className}`}
                    >
                      {tailscalePhaseMeta[tailscalePhase].label}
                    </span>
                  </div>
                </div>

                {tailscaleStatus?.supported !== false && (
                  <Button
                    size="sm"
                    variant={tailscaleStatus?.running ? "secondary" : "primary"}
                    icon={tailscaleStatus?.running ? "vpn_key_off" : "vpn_lock"}
                    onClick={() =>
                      tailscaleStatus?.running
                        ? setShowDisableTailscaleModal(true)
                        : void handleOpenTailscaleModal()
                    }
                    loading={tailscaleBusy}
                    className={
                      tailscaleStatus?.running
                        ? "border-border/70! text-text-muted! hover:text-text!"
                        : "bg-linear-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600"
                    }
                  >
                    {tailscaleActionLabel}
                  </Button>
                )}
              </div>

              {tailscaleNotice && (
                <div
                  className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm ${
                    tailscaleNotice.type === "success"
                      ? "border-green-500/30 bg-green-500/10 text-green-400"
                      : tailscaleNotice.type === "info"
                        ? "border-blue-500/30 bg-blue-500/10 text-blue-400"
                        : tailscaleNotice.type === "warning"
                          ? "border-amber-500/30 bg-amber-500/10 text-amber-400"
                          : "border-red-500/30 bg-red-500/10 text-red-400"
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {tailscaleNotice.type === "success"
                      ? "check_circle"
                      : tailscaleNotice.type === "info"
                        ? "info"
                        : tailscaleNotice.type === "warning"
                          ? "warning"
                          : "error"}
                  </span>
                  <span className="flex-1">{tailscaleNotice.message}</span>
                  <button
                    onClick={() => setTailscaleNotice(null)}
                    className="rounded p-0.5 transition-colors hover:bg-white/10"
                  >
                    <span className="material-symbols-outlined text-[16px]">close</span>
                  </button>
                </div>
              )}

              <p className="text-xs text-text-muted">{tailscaleUrlNotice}</p>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Input
                  value={tailscaleStatus?.apiUrl || ""}
                  readOnly
                  placeholder="https://your-device.your-tailnet.ts.net/v1"
                  className="flex-1 min-w-0 font-mono text-sm"
                />
                <Button
                  variant="secondary"
                  icon={copied === "tailscale_url" ? "check" : "content_copy"}
                  onClick={() =>
                    tailscaleStatus?.apiUrl && copy(tailscaleStatus.apiUrl, "tailscale_url")
                  }
                  disabled={!tailscaleStatus?.apiUrl}
                  className="shrink-0 self-start sm:self-auto"
                >
                  {copied === "tailscale_url" ? tc("copied") : tc("copy")}
                </Button>
              </div>
              {tailscaleStatus?.binaryPath && (
                <p className="text-xs text-text-muted">
                  {translateOrFallback("tailscaleBinaryPath", "Binary: {path}", {
                    path: tailscaleStatus.binaryPath,
                  })}
                </p>
              )}
              {tailscaleStatus?.lastError && (
                <p className="text-xs text-red-400">
                  {translateOrFallback("tailscaleLastError", "Last error: {error}", {
                    error: tailscaleStatus.lastError,
                  })}
                </p>
              )}
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex flex-wrap gap-3 items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">{t("sectionTitle") || "Integration Surface"}</h2>
            <p className="text-sm text-text-muted">
              {t("sectionDescription") ||
                "OpenAI-compatible APIs and operational protocol endpoints"}
            </p>
          </div>
          <SegmentedControl
            options={[
              { value: "api", label: t("tabApis") || "OpenAI-compatible APIs", icon: "api" },
              { value: "protocols", label: t("tabProtocols") || "Protocols", icon: "hub" },
            ]}
            value={viewTab}
            onChange={setViewTab}
            aria-label={t("tabsAria") || "Endpoint sections"}
          />
        </div>
      </Card>

      {viewTab === "api" ? (
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold">{t("available")}</h2>
              <p className="text-sm text-text-muted">
                {t("modelsAcrossEndpoints", {
                  models: Object.values(endpointData).reduce(
                    (acc, models) => acc + models.length,
                    0
                  ),
                  endpoints:
                    [
                      endpointData.chat,
                      endpointData.embeddings,
                      endpointData.images,
                      endpointData.rerank,
                      endpointData.audioTranscription,
                      endpointData.audioSpeech,
                      endpointData.moderation,
                      endpointData.music,
                    ].filter((a) => a.length > 0).length + 2,
                })}
              </p>
            </div>
          </div>

          {/* Core APIs */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined text-sm text-primary">hub</span>
              <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                {t("categoryCore") || "Core APIs"}
              </h3>
              <div className="flex-1 h-px bg-border/50" />
            </div>
            <div className="flex flex-col gap-3">
              {/* Chat Completions */}
              <EndpointSection
                icon="chat"
                iconColor="text-blue-500"
                iconBg="bg-blue-500/10"
                title={t("chatCompletions")}
                path="/v1/chat/completions"
                description={t("chatDesc")}
                models={endpointData.chat}
                expanded={expandedEndpoint === "chat"}
                onToggle={() => setExpandedEndpoint(expandedEndpoint === "chat" ? null : "chat")}
                copy={copy}
                copied={copied}
                baseUrl={currentEndpoint}
              />

              {/* Responses API */}
              <EndpointSection
                icon="code"
                iconColor="text-indigo-500"
                iconBg="bg-indigo-500/10"
                title={t("responses") || "Responses API"}
                path="/v1/responses"
                description={
                  t("responsesDesc") ||
                  "OpenAI Responses API for Codex and advanced agentic workflows"
                }
                models={endpointData.chat}
                expanded={expandedEndpoint === "responses"}
                onToggle={() =>
                  setExpandedEndpoint(expandedEndpoint === "responses" ? null : "responses")
                }
                copy={copy}
                copied={copied}
                baseUrl={currentEndpoint}
              />

              {/* Legacy Completions */}
              <EndpointSection
                icon="text_fields"
                iconColor="text-orange-500"
                iconBg="bg-orange-500/10"
                title={t("completionsLegacy") || "Completions (Legacy)"}
                path="/v1/completions"
                description={
                  t("completionsLegacyDesc") ||
                  "Legacy OpenAI text completions — accepts both prompt and messages format"
                }
                models={endpointData.chat}
                expanded={expandedEndpoint === "completions"}
                onToggle={() =>
                  setExpandedEndpoint(expandedEndpoint === "completions" ? null : "completions")
                }
                copy={copy}
                copied={copied}
                baseUrl={currentEndpoint}
              />
            </div>
          </div>

          {/* Media & Multi-Modal */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined text-sm text-purple-400">perm_media</span>
              <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                {t("categoryMedia") || "Media & Multi-Modal"}
              </h3>
              <div className="flex-1 h-px bg-border/50" />
            </div>
            <div className="flex flex-col gap-3">
              {/* Embeddings */}
              <EndpointSection
                icon="data_array"
                iconColor="text-emerald-500"
                iconBg="bg-emerald-500/10"
                title={t("embeddings")}
                path="/v1/embeddings"
                description={t("embeddingsDesc")}
                models={endpointData.embeddings}
                expanded={expandedEndpoint === "embeddings"}
                onToggle={() =>
                  setExpandedEndpoint(expandedEndpoint === "embeddings" ? null : "embeddings")
                }
                copy={copy}
                copied={copied}
                baseUrl={currentEndpoint}
              />

              {/* Image Generation */}
              <EndpointSection
                icon="image"
                iconColor="text-purple-500"
                iconBg="bg-purple-500/10"
                title={t("imageGeneration")}
                path="/v1/images/generations"
                description={t("imageDesc")}
                models={endpointData.images}
                expanded={expandedEndpoint === "images"}
                onToggle={() =>
                  setExpandedEndpoint(expandedEndpoint === "images" ? null : "images")
                }
                copy={copy}
                copied={copied}
                baseUrl={currentEndpoint}
              />

              {/* Audio Transcription */}
              <EndpointSection
                icon="mic"
                iconColor="text-rose-500"
                iconBg="bg-rose-500/10"
                title={t("audioTranscription")}
                path="/v1/audio/transcriptions"
                description={t("audioTranscriptionDesc")}
                models={endpointData.audioTranscription}
                expanded={expandedEndpoint === "audioTranscription"}
                onToggle={() =>
                  setExpandedEndpoint(
                    expandedEndpoint === "audioTranscription" ? null : "audioTranscription"
                  )
                }
                copy={copy}
                copied={copied}
                baseUrl={currentEndpoint}
              />

              {/* Audio Speech (TTS) */}
              <EndpointSection
                icon="record_voice_over"
                iconColor="text-cyan-500"
                iconBg="bg-cyan-500/10"
                title={t("textToSpeech")}
                path="/v1/audio/speech"
                description={t("textToSpeechDesc")}
                models={endpointData.audioSpeech}
                expanded={expandedEndpoint === "audioSpeech"}
                onToggle={() =>
                  setExpandedEndpoint(expandedEndpoint === "audioSpeech" ? null : "audioSpeech")
                }
                copy={copy}
                copied={copied}
                baseUrl={currentEndpoint}
              />

              {/* Music Generation */}
              <EndpointSection
                icon="music_note"
                iconColor="text-fuchsia-500"
                iconBg="bg-fuchsia-500/10"
                title={t("musicGeneration") || "Music Generation"}
                path="/v1/music/generations"
                description={
                  t("musicDesc") ||
                  "Generate music and audio tracks via ComfyUI (Stable Audio, MusicGen)"
                }
                models={endpointData.music}
                expanded={expandedEndpoint === "music"}
                onToggle={() => setExpandedEndpoint(expandedEndpoint === "music" ? null : "music")}
                copy={copy}
                copied={copied}
                baseUrl={currentEndpoint}
              />
            </div>
          </div>

          {/* Search & Discovery */}
          {searchProviders.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-sm text-cyan-400">
                  travel_explore
                </span>
                <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                  {t("categorySearch") || "Search & Discovery"}
                </h3>
                <div className="flex-1 h-px bg-border/50" />
              </div>
              <div className="flex flex-col gap-3">
                <EndpointSection
                  icon="search"
                  iconColor="text-cyan-500"
                  iconBg="bg-cyan-500/10"
                  title={t("webSearch") || "Web Search"}
                  path="/v1/search"
                  description={
                    t("webSearchDesc") ||
                    "Unified web search across multiple providers with automatic failover and caching"
                  }
                  models={searchProviders.map((p) => ({
                    id: p.id,
                    name: p.name,
                    owned_by: p.id,
                    type: "search",
                  }))}
                  expanded={expandedEndpoint === "search"}
                  onToggle={() =>
                    setExpandedEndpoint(expandedEndpoint === "search" ? null : "search")
                  }
                  copy={copy}
                  copied={copied}
                  baseUrl={currentEndpoint}
                />
              </div>
            </div>
          )}

          {/* Utility & Management */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined text-sm text-amber-400">build</span>
              <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                {t("categoryUtility") || "Utility & Management"}
              </h3>
              <div className="flex-1 h-px bg-border/50" />
            </div>
            <div className="flex flex-col gap-3">
              {/* Rerank */}
              <EndpointSection
                icon="sort"
                iconColor="text-amber-500"
                iconBg="bg-amber-500/10"
                title={t("rerank")}
                path="/v1/rerank"
                description={t("rerankDesc")}
                models={endpointData.rerank}
                expanded={expandedEndpoint === "rerank"}
                onToggle={() =>
                  setExpandedEndpoint(expandedEndpoint === "rerank" ? null : "rerank")
                }
                copy={copy}
                copied={copied}
                baseUrl={currentEndpoint}
              />

              {/* Moderations */}
              <EndpointSection
                icon="shield"
                iconColor="text-orange-500"
                iconBg="bg-orange-500/10"
                title={t("moderations")}
                path="/v1/moderations"
                description={t("moderationsDesc")}
                models={endpointData.moderation}
                expanded={expandedEndpoint === "moderation"}
                onToggle={() =>
                  setExpandedEndpoint(expandedEndpoint === "moderation" ? null : "moderation")
                }
                copy={copy}
                copied={copied}
                baseUrl={currentEndpoint}
              />

              {/* List Models */}
              <EndpointSection
                icon="list"
                iconColor="text-teal-500"
                iconBg="bg-teal-500/10"
                title={t("listModels") || "List Models"}
                path="/v1/models"
                description={
                  t("listModelsDesc") || "List all available models across all connected providers"
                }
                models={[]}
                expanded={expandedEndpoint === "models"}
                onToggle={() =>
                  setExpandedEndpoint(expandedEndpoint === "models" ? null : "models")
                }
                copy={copy}
                copied={copied}
                baseUrl={currentEndpoint}
              />
            </div>
          </div>
        </Card>
      ) : (
        <Card>
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-lg font-semibold">{t("protocolsTitle") || "Protocols"}</h2>
              <p className="text-sm text-text-muted mt-1">
                {t("protocolsDescription") ||
                  "MCP and A2A are first-class endpoints with dedicated observability and controls."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-border p-4 bg-bg-subtle">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-[18px]">
                        hub
                      </span>
                      {t("mcpCardTitle") || "MCP Server"}
                    </h3>
                    <p className="text-xs text-text-muted mt-1">
                      {t("mcpCardDescription") || "Model Context Protocol over stdio"}
                    </p>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-semibold ${
                      mcpOnline ? "bg-green-500/15 text-green-500" : "bg-red-500/15 text-red-500"
                    }`}
                  >
                    {mcpOnline ? tc("active") : tc("inactive")}
                  </span>
                </div>
                <div className="mt-3 text-xs text-text-muted space-y-1">
                  <p>
                    {t("protocolToolsLabel") || "Tools"}:{" "}
                    <span className="text-text-main font-semibold">{mcpToolCount || 16}</span>
                  </p>
                  <p>
                    {t("protocolLastActivity") || "Last activity"}:{" "}
                    <span className="text-text-main">
                      {mcpStatus?.activity?.lastCallAt
                        ? new Date(mcpStatus.activity.lastCallAt).toLocaleString()
                        : "—"}
                    </span>
                  </p>
                </div>
                <div className="mt-3 rounded-lg bg-bg p-3 border border-border/70">
                  <p className="text-xs font-semibold mb-1">{t("quickStart") || "Quick Start"}</p>
                  <code className="text-xs font-mono break-all">omniroute --mcp</code>
                </div>
                <div className="mt-3">
                  <Link
                    href="/dashboard/mcp"
                    className="text-sm text-primary hover:text-primary-hover transition-colors"
                  >
                    {t("openMcpDashboard") || "Open MCP management"} →
                  </Link>
                </div>
              </div>

              <div className="rounded-xl border border-border p-4 bg-bg-subtle">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-[18px]">
                        group_work
                      </span>
                      {t("a2aCardTitle") || "A2A Server"}
                    </h3>
                    <p className="text-xs text-text-muted mt-1">
                      {t("a2aCardDescription") || "Agent2Agent JSON-RPC endpoint"}
                    </p>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-semibold ${
                      a2aOnline ? "bg-green-500/15 text-green-500" : "bg-red-500/15 text-red-500"
                    }`}
                  >
                    {a2aOnline ? tc("active") : tc("inactive")}
                  </span>
                </div>
                <div className="mt-3 text-xs text-text-muted space-y-1">
                  <p>
                    {t("protocolTasksLabel") || "Tasks"}:{" "}
                    <span className="text-text-main font-semibold">
                      {a2aStatus?.tasks?.total || 0}
                    </span>
                  </p>
                  <p>
                    {t("protocolActiveStreamsLabel") || "Active streams"}:{" "}
                    <span className="text-text-main font-semibold">{a2aActiveStreams}</span>
                  </p>
                </div>
                <div className="mt-3 rounded-lg bg-bg p-3 border border-border/70">
                  <p className="text-xs font-semibold mb-1">{t("quickStart") || "Quick Start"}</p>
                  <code className="text-xs font-mono break-all">
                    {baseUrl.replace(/\/v1$/, "")}/a2a
                  </code>
                </div>
                <div className="mt-3">
                  <Link
                    href="/dashboard/a2a"
                    className="text-sm text-primary hover:text-primary-hover transition-colors"
                  >
                    {t("openA2aDashboard") || "Open A2A management"} →
                  </Link>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="rounded-xl border border-border p-4 bg-bg-subtle">
                <h4 className="font-semibold mb-2">
                  {t("mcpQuickStartTitle") || "MCP Quick Start"}
                </h4>
                <ol className="text-sm text-text-muted space-y-1 list-decimal list-inside">
                  <li>{t("mcpQuickStartStep1") || "Run the MCP server via `omniroute --mcp`."}</li>
                  <li>
                    {t("mcpQuickStartStep2") ||
                      "Configure your MCP client to connect over stdio transport."}
                  </li>
                  <li>
                    {t("mcpQuickStartStep3") ||
                      "Invoke tools such as `omniroute_get_health` and `omniroute_list_combos`."}
                  </li>
                </ol>
              </div>
              <div className="rounded-xl border border-border p-4 bg-bg-subtle">
                <h4 className="font-semibold mb-2">
                  {t("a2aQuickStartTitle") || "A2A Quick Start"}
                </h4>
                <ol className="text-sm text-text-muted space-y-1 list-decimal list-inside">
                  <li>
                    {t("a2aQuickStartStep1") ||
                      "Discover the agent card at `/.well-known/agent.json`."}
                  </li>
                  <li>
                    {t("a2aQuickStartStep2") ||
                      "Send JSON-RPC requests to `POST /a2a` using `message/send` or `message/stream`."}
                  </li>
                  <li>
                    {t("a2aQuickStartStep3") ||
                      "Track and control tasks using `tasks/get` and `tasks/cancel`."}
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Cloud Enable Modal */}
      <Modal
        isOpen={showCloudModal}
        title={t("enableCloudTitle")}
        onClose={() => setShowCloudModal(false)}
      >
        <div className="flex flex-col gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <p className="text-sm text-blue-800 dark:text-blue-200 font-medium mb-2">
              {t("whatYouGet")}
            </p>
            <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
              <li>• {t("cloudBenefitAccess")}</li>
              <li>• {t("cloudBenefitShare")}</li>
              <li>• {t("cloudBenefitPorts")}</li>
              <li>• {t("cloudBenefitEdge")}</li>
            </ul>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <p className="text-sm text-yellow-800 dark:text-yellow-200 font-medium mb-1">
              {tc("note")}
            </p>
            <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
              <li>• {t("cloudSessionNote")}</li>
              <li>• {t("cloudUnstableNote")}</li>
            </ul>
          </div>

          {/* Sync Progress / Success */}
          {(cloudSyncing || modalSuccess) && (
            <div
              className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-300 ${
                modalSuccess
                  ? "bg-green-500/10 border-green-500/30"
                  : "bg-primary/10 border-primary/30"
              }`}
            >
              {modalSuccess ? (
                <span className="material-symbols-outlined text-green-500 text-xl">
                  check_circle
                </span>
              ) : (
                <span className="material-symbols-outlined animate-spin text-primary">
                  progress_activity
                </span>
              )}
              <div className="flex-1">
                <p
                  className={`text-sm font-medium ${
                    modalSuccess ? "text-green-500" : "text-primary"
                  }`}
                >
                  {modalSuccess && t("cloudConnected")}
                  {!modalSuccess && syncStep === "syncing" && t("connectingToCloud")}
                  {!modalSuccess && syncStep === "verifying" && t("verifyingConnection")}
                </p>
              </div>
            </div>
          )}

          <div className="flex gap-2">
            <Button onClick={handleEnableCloud} fullWidth disabled={cloudSyncing || modalSuccess}>
              {cloudSyncing ? (
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined animate-spin text-sm">
                    progress_activity
                  </span>
                  {syncStep === "syncing" ? t("connecting") : t("verifying")}
                </span>
              ) : modalSuccess ? (
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">check</span>
                  {t("connected")}
                </span>
              ) : (
                t("enableCloud")
              )}
            </Button>
            <Button
              onClick={() => setShowCloudModal(false)}
              variant="ghost"
              fullWidth
              disabled={cloudSyncing || modalSuccess}
            >
              {tc("cancel")}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Disable Cloud Modal */}
      <Modal
        isOpen={showDisableModal}
        title={t("disableCloudTitle")}
        onClose={() => !cloudSyncing && setShowDisableModal(false)}
      >
        <div className="flex flex-col gap-4">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-red-600 dark:text-red-400">
                warning
              </span>
              <div>
                <p className="text-sm text-red-800 dark:text-red-200 font-medium mb-1">
                  {tc("warning")}
                </p>
                <p className="text-sm text-red-700 dark:text-red-300">{t("disableWarning")}</p>
              </div>
            </div>
          </div>

          {/* Sync Progress */}
          {cloudSyncing && (
            <div className="flex items-center gap-3 p-3 bg-primary/10 border border-primary/30 rounded-lg">
              <span className="material-symbols-outlined animate-spin text-primary">
                progress_activity
              </span>
              <div className="flex-1">
                <p className="text-sm font-medium text-primary">
                  {syncStep === "syncing" && t("syncingData")}
                  {syncStep === "disabling" && t("disablingCloud")}
                </p>
              </div>
            </div>
          )}

          <p className="text-sm text-text-muted">{t("disableConfirm")}</p>

          <div className="flex gap-2">
            <Button
              onClick={handleConfirmDisable}
              fullWidth
              disabled={cloudSyncing}
              className="bg-red-500! hover:bg-red-600! text-white!"
            >
              {cloudSyncing ? (
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined animate-spin text-sm">
                    progress_activity
                  </span>
                  {syncStep === "syncing" ? t("syncing") : t("disabling")}
                </span>
              ) : (
                t("disableCloud")
              )}
            </Button>
            <Button
              onClick={() => setShowDisableModal(false)}
              variant="ghost"
              fullWidth
              disabled={cloudSyncing}
            >
              {tc("cancel")}
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={showTailscaleModal}
        title={translateOrFallback("tailscaleTitle", "Tailscale Funnel")}
        onClose={() => {
          if (!tailscaleBusy && !tailscaleInstallBusy) {
            setShowTailscaleModal(false);
            setTailscaleProgress("");
            setTailscaleInstallLog([]);
            setTailscaleSudoPassword("");
          }
        }}
      >
        <div className="flex flex-col gap-4">
          <div className="rounded-lg border border-indigo-500/20 bg-indigo-500/10 p-4">
            <p className="text-sm font-medium text-indigo-300">
              {translateOrFallback("tailscaleModalTitle", "Expose OmniRoute through your tailnet")}
            </p>
            <p className="mt-1 text-sm text-text-muted">
              {translateOrFallback(
                "tailscaleModalBody",
                "Install Tailscale if needed, log this machine into your tailnet, then enable Funnel for a stable remote HTTPS URL."
              )}
            </p>
          </div>

          {tailscaleNeedsSudo && (
            <Input
              type="password"
              label={translateOrFallback("tailscaleSudoPassword", "Sudo password")}
              value={tailscaleSudoPassword}
              onChange={(event) => setTailscaleSudoPassword(event.target.value)}
              placeholder={translateOrFallback(
                "tailscaleSudoPasswordPlaceholder",
                "Required for install/start on this platform"
              )}
              disabled={tailscaleBusy || tailscaleInstallBusy}
            />
          )}

          {!tailscaleStatus ? (
            <div className="flex items-center gap-2 rounded-lg border border-border/70 px-3 py-2 text-sm text-text-muted">
              <span className="material-symbols-outlined animate-spin text-sm">
                progress_activity
              </span>
              {translateOrFallback("tailscaleChecking", "Checking Tailscale status...")}
            </div>
          ) : (
            <>
              <div className="rounded-lg border border-border/70 bg-surface/60 p-3 text-sm text-text-muted">
                <div className="flex items-center justify-between gap-2">
                  <span>{translateOrFallback("tailscalePlatform", "Platform")}</span>
                  <span className="font-mono uppercase">{tailscaleStatus.platform}</span>
                </div>
                <div className="mt-2 flex items-center justify-between gap-2">
                  <span>{translateOrFallback("tailscaleInstalledLabel", "Installed")}</span>
                  <span>{tailscaleStatus.installed ? "Yes" : "No"}</span>
                </div>
                <div className="mt-2 flex items-center justify-between gap-2">
                  <span>{translateOrFallback("tailscaleLoggedInLabel", "Logged in")}</span>
                  <span>{tailscaleStatus.loggedIn ? "Yes" : "No"}</span>
                </div>
                <div className="mt-2 flex items-center justify-between gap-2">
                  <span>{translateOrFallback("tailscaleDaemonLabel", "Daemon running")}</span>
                  <span>{tailscaleStatus.daemonRunning ? "Yes" : "No"}</span>
                </div>
              </div>

              {tailscaleProgress && (
                <div className="flex items-center gap-3 rounded-lg border border-primary/30 bg-primary/10 p-3">
                  <span className="material-symbols-outlined animate-spin text-primary">
                    progress_activity
                  </span>
                  <p className="text-sm font-medium text-primary">{tailscaleProgress}</p>
                </div>
              )}

              {tailscaleInstallBusy && (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-sm text-text-muted">
                    <span className="material-symbols-outlined animate-spin text-sm">
                      progress_activity
                    </span>
                    {translateOrFallback("tailscaleInstalling", "Installing Tailscale...")}
                  </div>
                  <div
                    ref={tailscaleLogRef}
                    className="max-h-40 overflow-y-auto rounded-lg bg-black/20 p-3 font-mono text-xs text-text-muted"
                  >
                    {tailscaleInstallLog.length > 0 ? (
                      tailscaleInstallLog.map((line, index) => (
                        <div key={`${line}-${index}`}>{line}</div>
                      ))
                    ) : (
                      <div>
                        {translateOrFallback("tailscaleInstallPreparing", "Preparing installer...")}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {!tailscaleInstallBusy && !tailscaleStatus.installed && (
                <p className="text-sm text-text-muted">
                  {translateOrFallback(
                    "tailscaleInstallHint",
                    "Tailscale is not installed on this machine yet."
                  )}
                </p>
              )}
            </>
          )}

          <div className="flex gap-2">
            {!tailscaleStatus?.installed ? (
              <Button
                onClick={handleInstallTailscale}
                fullWidth
                disabled={tailscaleInstallBusy || tailscaleBusy}
                className="bg-linear-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600"
              >
                {tailscaleInstallBusy
                  ? translateOrFallback("tailscaleInstalling", "Installing Tailscale...")
                  : translateOrFallback("tailscaleInstallAction", "Install Tailscale")}
              </Button>
            ) : (
              <Button
                onClick={handleEnableTailscale}
                fullWidth
                disabled={tailscaleBusy || tailscaleInstallBusy}
                className="bg-linear-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600"
              >
                {tailscaleBusy
                  ? translateOrFallback("tailscaleConnecting", "Connecting...")
                  : translateOrFallback("tailscaleConnect", "Connect Tailscale")}
              </Button>
            )}
            <Button
              onClick={() => {
                setShowTailscaleModal(false);
                setTailscaleSudoPassword("");
              }}
              variant="ghost"
              fullWidth
              disabled={tailscaleBusy || tailscaleInstallBusy}
            >
              {tc("cancel")}
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={showDisableTailscaleModal}
        title={translateOrFallback("tailscaleDisable", "Disable Funnel")}
        onClose={() => {
          if (!tailscaleBusy) {
            setShowDisableTailscaleModal(false);
            setTailscaleSudoPassword("");
          }
        }}
      >
        <div className="flex flex-col gap-4">
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4">
            <p className="text-sm font-medium text-red-400">
              {translateOrFallback("tailscaleDisableWarningTitle", "Disable Tailscale Funnel")}
            </p>
            <p className="mt-1 text-sm text-text-muted">
              {translateOrFallback(
                "tailscaleDisableWarningBody",
                "Remote access through the Tailscale URL will stop working until Funnel is enabled again."
              )}
            </p>
          </div>

          {tailscaleNeedsSudo && (
            <Input
              type="password"
              label={translateOrFallback(
                "tailscaleSudoPasswordOptional",
                "Sudo password (optional)"
              )}
              value={tailscaleSudoPassword}
              onChange={(event) => setTailscaleSudoPassword(event.target.value)}
              placeholder={translateOrFallback(
                "tailscaleSudoPasswordDisablePlaceholder",
                "Use if you want to stop the local tailscaled daemon too"
              )}
              disabled={tailscaleBusy}
            />
          )}

          <div className="flex gap-2">
            <Button
              onClick={handleDisableTailscale}
              fullWidth
              disabled={tailscaleBusy}
              className="bg-red-500! text-white! hover:bg-red-600!"
            >
              {tailscaleBusy
                ? translateOrFallback("tailscaleDisabling", "Disabling...")
                : translateOrFallback("tailscaleDisable", "Disable Funnel")}
            </Button>
            <Button
              onClick={() => {
                setShowDisableTailscaleModal(false);
                setTailscaleSudoPassword("");
              }}
              variant="ghost"
              fullWidth
              disabled={tailscaleBusy}
            >
              {tc("cancel")}
            </Button>
          </div>
        </div>
      </Modal>
      {/* Provider Models Popup */}
      {selectedProvider && (
        <ProviderModelsModal
          provider={selectedProvider}
          models={allModels}
          copy={copy}
          copied={copied}
          onClose={() => setSelectedProvider(null)}
        />
      )}
    </div>
  );
}

APIPageClient.propTypes = {
  machineId: PropTypes.string.isRequired,
};

// -- Sub-component: Provider Models Modal ------------------------------------------

function ProviderModelsModal({ provider, models, copy, copied, onClose }) {
  const t = useTranslations("endpoint");
  const tc = useTranslations("common");
  // Get provider alias for matching models
  // Filter out parent models (models with parent field set) to avoid showing duplicates
  const providerAlias = provider.provider.alias || provider.id;
  const providerModels = useMemo(() => {
    return models.filter(
      (m) => !m.parent && (m.owned_by === providerAlias || m.owned_by === provider.id)
    );
  }, [models, providerAlias, provider.id]);

  const chatModels = providerModels.filter((m) => !m.type);
  const embeddingModels = providerModels.filter((m) => m.type === "embedding");
  const imageModels = providerModels.filter((m) => m.type === "image");

  const renderModelGroup = (title, icon, groupModels) => {
    if (groupModels.length === 0) return null;
    return (
      <div className="mb-4">
        <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <span className="material-symbols-outlined text-sm">{icon}</span>
          {title} ({groupModels.length})
        </h4>
        <div className="flex flex-col gap-1">
          {groupModels.map((m) => {
            const copyKey = `modal-${m.id}`;
            return (
              <div
                key={m.id}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-surface/60 group"
              >
                <code className="text-sm font-mono flex-1 truncate">{m.id}</code>
                {m.custom && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary">
                    {t("custom")}
                  </span>
                )}
                <button
                  onClick={() => copy(m.id, copyKey)}
                  className="p-1 hover:bg-sidebar rounded text-text-muted hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                  title={tc("copy")}
                >
                  <span className="material-symbols-outlined text-sm">
                    {copied === copyKey ? "check" : "content_copy"}
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <Modal
      isOpen
      onClose={onClose}
      title={t("providerModelsTitle", { provider: provider.provider.name })}
    >
      <div className="max-h-[60vh] overflow-y-auto">
        {providerModels.length === 0 ? (
          <p className="text-sm text-text-muted py-4 text-center">{t("noModelsForProvider")}</p>
        ) : (
          <>
            {renderModelGroup(t("chat"), "chat", chatModels)}
            {renderModelGroup(t("embedding"), "data_array", embeddingModels)}
            {renderModelGroup(t("image"), "image", imageModels)}
          </>
        )}
      </div>
    </Modal>
  );
}

ProviderModelsModal.propTypes = {
  provider: PropTypes.object.isRequired,
  models: PropTypes.array.isRequired,
  copy: PropTypes.func.isRequired,
  copied: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

// -- Sub-component: Endpoint Section ------------------------------------------

function EndpointSection({
  icon,
  iconColor,
  iconBg,
  title,
  path,
  description,
  models,
  expanded,
  onToggle,
  copy,
  copied,
  baseUrl,
}) {
  const t = useTranslations("endpoint");
  const grouped = useMemo(() => {
    const map = {};
    for (const m of models) {
      const owner = m.owned_by || "unknown";
      if (!map[owner]) map[owner] = [];
      map[owner].push(m);
    }
    return Object.entries(map).sort(
      (a: any, b: any) => (b[1] as any).length - (a[1] as any).length
    );
  }, [models]);

  const resolveProvider = (id) => AI_PROVIDERS[id] || getProviderByAlias(id);
  const providerColor = (id) => resolveProvider(id)?.color || "#888";
  const providerName = (id) => resolveProvider(id)?.name || id;
  const copyId = `endpoint_${path}`;

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      {/* Header (always visible) */}
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 p-4 hover:bg-surface/50 transition-colors text-left"
      >
        <div className={`flex items-center justify-center size-10 rounded-lg ${iconBg} shrink-0`}>
          <span className={`material-symbols-outlined text-xl ${iconColor}`}>{icon}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm">{title}</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-surface text-text-muted font-medium">
              {t("modelsCount", { count: models.length })}
            </span>
          </div>
          <p className="text-xs text-text-muted mt-0.5">{description}</p>
        </div>
        <span
          className={`material-symbols-outlined text-text-muted text-lg transition-transform ${expanded ? "rotate-180" : ""}`}
        >
          expand_more
        </span>
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="border-t border-border px-4 pb-4">
          {/* Endpoint path + copy */}
          <div className="flex items-center gap-2 mt-3 mb-3">
            <code className="flex-1 text-xs font-mono text-text-muted bg-surface/80 px-3 py-1.5 rounded-lg truncate">
              {baseUrl.replace(/\/v1$/, "")}
              {path}
            </code>
            <button
              onClick={() => copy(`${baseUrl.replace(/\/v1$/, "")}${path}`, copyId)}
              className="p-1.5 hover:bg-surface rounded-lg text-text-muted hover:text-primary transition-colors shrink-0"
            >
              <span className="material-symbols-outlined text-[16px]">
                {copied === copyId ? "check" : "content_copy"}
              </span>
            </button>
          </div>

          {/* Models grouped by provider */}
          <div className="flex flex-col gap-2">
            {grouped.map(([providerId, providerModels]) => (
              <div key={providerId}>
                <div className="flex items-center gap-2 mb-1">
                  <div
                    className="size-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: providerColor(providerId) }}
                  />
                  <span className="text-xs font-semibold text-text-main">
                    {providerName(providerId)}
                  </span>
                  <span className="text-xs text-text-muted">
                    ({(providerModels as any).length})
                  </span>
                </div>
                <div className="ml-5 flex flex-wrap gap-1.5">
                  {(providerModels as any).map((m) => (
                    <span
                      key={m.id}
                      className="text-xs px-2 py-0.5 rounded-md bg-surface/80 text-text-muted font-mono"
                      title={m.id}
                    >
                      {m.root || m.id.split("/").pop()}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

EndpointSection.propTypes = {
  icon: PropTypes.string.isRequired,
  iconColor: PropTypes.string.isRequired,
  iconBg: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  models: PropTypes.array.isRequired,
  expanded: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  copy: PropTypes.func.isRequired,
  copied: PropTypes.string,
  baseUrl: PropTypes.string.isRequired,
};

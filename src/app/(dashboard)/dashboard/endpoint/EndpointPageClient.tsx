"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import { Card, Button, Input, Modal, CardSkeleton, SegmentedControl } from "@/shared/components";
import { useCopyToClipboard } from "@/shared/hooks/useCopyToClipboard";
import { useDisplayBaseUrl } from "@/shared/hooks";
import { AI_PROVIDERS, getProviderByAlias } from "@/shared/constants/providers";
import { getProviderDisplayName } from "@/lib/display/names";
import { useTranslations } from "next-intl";

const BUILD_TIME_CLOUD_URL = process.env.NEXT_PUBLIC_CLOUD_URL || null;
const CLOUD_ACTION_TIMEOUT_MS = 15000;

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

type TailscaleTunnelPhase =
  | "unsupported"
  | "not_installed"
  | "needs_login"
  | "stopped"
  | "running"
  | "error";

type TailscaleTunnelStatus = {
  supported: boolean;
  installed: boolean;
  managedInstall: boolean;
  installSource: string | null;
  binaryPath: string | null;
  loggedIn: boolean;
  daemonRunning: boolean;
  running: boolean;
  enabled: boolean;
  tunnelUrl: string | null;
  apiUrl: string | null;
  phase: TailscaleTunnelPhase;
  platform: string;
  brewAvailable: boolean;
  lastError: string | null;
  pid: number | null;
};

type NgrokTunnelPhase =
  | "unsupported"
  | "not_installed"
  | "stopped"
  | "needs_auth"
  | "starting"
  | "running"
  | "error";

type NgrokTunnelStatus = {
  supported: boolean;
  installed: boolean;
  running: boolean;
  publicUrl: string | null;
  apiUrl: string | null;
  targetUrl: string;
  phase: NgrokTunnelPhase;
  lastError: string | null;
};

type TunnelNotice = {
  type: "success" | "error" | "info";
  message: string;
};

type APIPageClientProps = {
  machineId: string;
};

type EndpointProviderSummary = {
  id: string;
  provider: {
    name: string;
    alias?: string;
  };
};

type EndpointModelSummary = {
  id: string;
  owned_by?: string;
  parent?: string;
  type?: string;
  custom?: boolean;
  root?: string;
};

type CopyHandler = (text: string, key?: string) => void | Promise<void>;

type EndpointTunnelVisibility = {
  showCloudflaredTunnel: boolean;
  showTailscaleFunnel: boolean;
  showNgrokTunnel: boolean;
};

const DEFAULT_TUNNEL_VISIBILITY: EndpointTunnelVisibility = {
  showCloudflaredTunnel: true,
  showTailscaleFunnel: true,
  showNgrokTunnel: true,
};

function runEndpointBackgroundTask(taskName: string, task: () => Promise<unknown>) {
  void task().catch((error) => {
    console.log("Error running endpoint background task:", taskName, error);
  });
}

export default function APIPageClient({ machineId }: Readonly<APIPageClientProps>) {
  const [resolvedMachineId, setResolvedMachineId] = useState(machineId || "");
  const t = useTranslations("endpoint");
  const tc = useTranslations("common");
  const [loading, setLoading] = useState(true);

  // Endpoints / models state
  const [allModels, setAllModels] = useState([]);
  const [modelsLoading, setModelsLoading] = useState(true);
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
  const [mcpStatus, setMcpStatus] = useState<any>(null);
  const [a2aStatus, setA2aStatus] = useState<any>(null);
  const [searchProviders, setSearchProviders] = useState<any[]>([]);
  const [cloudflaredStatus, setCloudflaredStatus] = useState<CloudflaredTunnelStatus | null>(null);
  const [cloudflaredBusy, setCloudflaredBusy] = useState(false);
  const [cloudflaredNotice, setCloudflaredNotice] = useState<TunnelNotice | null>(null);
  const [tailscaleStatus, setTailscaleStatus] = useState<TailscaleTunnelStatus | null>(null);
  const [tailscaleBusy, setTailscaleBusy] = useState(false);
  const [tailscaleNotice, setTailscaleNotice] = useState<TunnelNotice | null>(null);
  const [showTailscaleInstallModal, setShowTailscaleInstallModal] = useState(false);
  const [tailscaleInstallBusy, setTailscaleInstallBusy] = useState(false);
  const [tailscaleInstallLog, setTailscaleInstallLog] = useState<string[]>([]);
  const [tailscalePassword, setTailscalePassword] = useState("");
  const [showCloudflaredTunnel, setShowCloudflaredTunnel] = useState(true);
  const [showTailscaleFunnel, setShowTailscaleFunnel] = useState(true);
  const [ngrokStatus, setNgrokStatus] = useState<NgrokTunnelStatus | null>(null);
  const [ngrokBusy, setNgrokBusy] = useState(false);
  const [ngrokNotice, setNgrokNotice] = useState<TunnelNotice | null>(null);
  const [ngrokToken, setNgrokToken] = useState("");
  const [showNgrokTunnel, setShowNgrokTunnel] = useState(true);
  const [expandedTunnel, setExpandedTunnel] = useState<string | null>(null);
  const [lanUrls, setLanUrls] = useState<string[]>([]);
  const [tailscaleIpUrl, setTailscaleIpUrl] = useState<string | null>(null);

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
        const res = await fetch("/api/tunnels/tailscale", { cache: "no-store" });
        const data = await res.json().catch(() => null);
        if (!res.ok) {
          throw new Error(
            data?.error ||
              translateOrFallback("tailscaleRequestFailed", "Failed to load Tailscale status")
          );
        }

        setTailscaleStatus(data);
        return data as TailscaleTunnelStatus;
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

  const fetchNgrokStatus = useCallback(
    async (silent = false) => {
      try {
        const res = await fetch("/api/tunnels/ngrok", { cache: "no-store" });
        const data = await res.json().catch(() => null);
        if (!res.ok) {
          throw new Error(
            data?.error || translateOrFallback("ngrokRequestFailed", "Failed to load ngrok status")
          );
        }

        setNgrokStatus(data);
        return data as NgrokTunnelStatus;
      } catch (error) {
        if (!silent) {
          setNgrokNotice({
            type: "error",
            message:
              error instanceof Error
                ? error.message
                : translateOrFallback("ngrokRequestFailed", "Failed to load ngrok status"),
          });
        }
        return null;
      }
    },
    [translateOrFallback]
  );

  useEffect(() => {
    let mounted = true;

    const loadPage = async () => {
      const tunnelVisibility = await loadCloudSettings(() => mounted);

      if (!mounted) return;
      setLoading(false);

      runEndpointBackgroundTask("models", fetchModels);
      runEndpointBackgroundTask("protocol-status", fetchProtocolStatus);
      runEndpointBackgroundTask("search-providers", fetchSearchProviders);
      runEndpointBackgroundTask("network-info", async () => {
        try {
          const res = await fetch("/api/network/info");
          if (res.ok) {
            const data = await res.json();
            if (mounted) {
              setLanUrls(data.lanUrls ?? []);
              if (data.tailscaleIpUrl) setTailscaleIpUrl(data.tailscaleIpUrl);
            }
          }
        } catch {
          // non-critical
        }
      });

      if (tunnelVisibility.showCloudflaredTunnel) {
        runEndpointBackgroundTask("cloudflared-status", () => fetchCloudflaredStatus(true));
      }
      if (tunnelVisibility.showTailscaleFunnel) {
        runEndpointBackgroundTask("tailscale-status", () => fetchTailscaleStatus(true));
      }
      if (tunnelVisibility.showNgrokTunnel) {
        runEndpointBackgroundTask("ngrok-status", () => fetchNgrokStatus(true));
      }
    };

    void loadPage();

    return () => {
      mounted = false;
    };
  }, [fetchCloudflaredStatus, fetchTailscaleStatus, fetchNgrokStatus]);

  const fetchModels = async () => {
    setModelsLoading(true);
    try {
      const res = await fetch("/v1/models");
      if (res.ok) {
        const data = await res.json();
        setAllModels(data.data || []);
      }
    } catch (e) {
      console.log("Error fetching models:", e);
    } finally {
      setModelsLoading(false);
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
    const video = allModels.filter((m) => m.type === "video" && !m.parent);
    const rerank = allModels.filter((m) => m.type === "rerank" && !m.parent);
    const audioTranscription = allModels.filter(
      (m) => m.type === "audio" && m.subtype === "transcription" && !m.parent
    );
    const audioSpeech = allModels.filter(
      (m) => m.type === "audio" && m.subtype === "speech" && !m.parent
    );
    const moderation = allModels.filter((m) => m.type === "moderation" && !m.parent);
    const music = allModels.filter((m) => m.type === "music" && !m.parent);
    return {
      chat,
      embeddings,
      images,
      video,
      rerank,
      audioTranscription,
      audioSpeech,
      moderation,
      music,
    };
  }, [allModels]);

  const totalEndpointModelCount = useMemo(
    () => Object.values(endpointData).reduce((acc, models) => acc + models.length, 0),
    [endpointData]
  );

  const availableEndpointCount = useMemo(() => {
    const chatCount = endpointData.chat.length > 0 ? 4 : 0; // chat + responses + completions + messages
    const imageCount = endpointData.images.length > 0 ? 2 : 0; // image gen + image edits
    const otherMedia = [
      endpointData.embeddings,
      endpointData.audioTranscription,
      endpointData.audioSpeech,
      endpointData.music,
      endpointData.video,
    ].filter((m) => m.length > 0).length;
    const utilityFixed = 3; // batch + files + list models (always available)
    const modelUtility =
      (endpointData.rerank.length > 0 ? 1 : 0) + (endpointData.moderation.length > 0 ? 1 : 0);
    const searchCount = searchProviders.length > 0 ? 1 : 0;
    return chatCount + imageCount + otherMedia + utilityFixed + modelUtility + searchCount;
  }, [endpointData, searchProviders]);

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

  const loadCloudSettings = async (
    shouldApplyState: () => boolean = () => true
  ): Promise<EndpointTunnelVisibility> => {
    try {
      const res = await fetch("/api/settings");
      if (res.ok) {
        const data = await res.json();
        const tunnelVisibility = {
          showCloudflaredTunnel: data.hideEndpointCloudflaredTunnel !== true,
          showTailscaleFunnel: data.hideEndpointTailscaleFunnel !== true,
          showNgrokTunnel: data.hideEndpointNgrokTunnel !== true,
        };

        if (!shouldApplyState()) {
          return tunnelVisibility;
        }

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
        setShowCloudflaredTunnel(tunnelVisibility.showCloudflaredTunnel);
        setShowTailscaleFunnel(tunnelVisibility.showTailscaleFunnel);
        setShowNgrokTunnel(tunnelVisibility.showNgrokTunnel);
        if (data.ngrokAuthToken) setNgrokToken(data.ngrokAuthToken);

        if (!tunnelVisibility.showCloudflaredTunnel) {
          setCloudflaredStatus(null);
          setCloudflaredNotice(null);
        }
        if (!tunnelVisibility.showTailscaleFunnel) {
          setTailscaleStatus(null);
          setTailscaleNotice(null);
        }
        if (!tunnelVisibility.showNgrokTunnel) {
          setNgrokStatus(null);
          setNgrokNotice(null);
        }

        return tunnelVisibility;
      }
    } catch (error) {
      console.log("Error loading cloud settings:", error);
    }

    return DEFAULT_TUNNEL_VISIBILITY;
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
    if (ngrokNotice) {
      const timer = setTimeout(() => setNgrokNotice(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [ngrokNotice]);

  useEffect(() => {
    const interval = setInterval(() => {
      void fetchProtocolStatus();
      if (showCloudflaredTunnel) {
        void fetchCloudflaredStatus(true);
      }
      if (showTailscaleFunnel) {
        void fetchTailscaleStatus(true);
      }
      if (showNgrokTunnel) {
        void fetchNgrokStatus(true);
      }
    }, 30000);
    return () => clearInterval(interval);
  }, [
    fetchCloudflaredStatus,
    fetchNgrokStatus,
    fetchTailscaleStatus,
    showCloudflaredTunnel,
    showNgrokTunnel,
    showTailscaleFunnel,
  ]);

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

  const handleNgrokAction = async (action: "enable" | "disable") => {
    setNgrokBusy(true);
    setNgrokNotice(null);

    try {
      const res = await fetch("/api/tunnels/ngrok", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, authToken: action === "enable" ? ngrokToken : undefined }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(
          data?.error || translateOrFallback("ngrokRequestFailed", "Failed to update ngrok tunnel")
        );
      }

      if (data?.status) {
        setNgrokStatus(data.status);
      }

      setNgrokNotice({
        type: "success",
        message:
          action === "enable"
            ? translateOrFallback("ngrokStarted", "ngrok tunnel started")
            : translateOrFallback("ngrokStopped", "ngrok tunnel stopped"),
      });
      if (action === "enable" && ngrokToken) {
        await fetch("/api/settings", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ngrokAuthToken: ngrokToken }),
        });
      }
    } catch (error) {
      setNgrokNotice({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : translateOrFallback("ngrokRequestFailed", "Failed to update ngrok tunnel"),
      });
    } finally {
      setNgrokBusy(false);
      await fetchNgrokStatus(true);
    }
  };

  const waitForTailscale = useCallback(
    async (
      predicate: (status: TailscaleTunnelStatus) => boolean,
      attempts = 40,
      delayMs = 3000
    ) => {
      for (let attempt = 0; attempt < attempts; attempt += 1) {
        await new Promise((resolve) => setTimeout(resolve, delayMs));
        const status = await fetchTailscaleStatus(true);
        if (status && predicate(status)) {
          return status;
        }
      }
      return null;
    },
    [fetchTailscaleStatus]
  );

  const requestTailscaleEnable = useCallback(async (payload: Record<string, unknown> = {}) => {
    const res = await fetch("/api/tunnels/tailscale/enable", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => ({}));
    return { res, data };
  }, []);

  const handleTailscaleEnable = useCallback(async () => {
    setTailscaleBusy(true);
    setTailscaleNotice(null);

    try {
      let { res, data } = await requestTailscaleEnable({
        sudoPassword: tailscalePassword || undefined,
      });
      if (!res.ok) {
        throw new Error(
          data?.error ||
            translateOrFallback("tailscaleEnableFailed", "Failed to enable Tailscale Funnel")
        );
      }

      if (data?.needsLogin && data?.authUrl) {
        window.open(data.authUrl, "tailscale_auth", "width=680,height=780");
        setTailscaleNotice({
          type: "info",
          message: translateOrFallback(
            "tailscaleWaitingForLogin",
            "Complete the Tailscale login in the opened browser tab. OmniRoute will retry automatically."
          ),
        });

        const loggedIn = await waitForTailscale((status) => status.loggedIn);
        if (!loggedIn) {
          throw new Error(
            translateOrFallback("tailscaleLoginTimedOut", "Timed out waiting for Tailscale login")
          );
        }

        ({ res, data } = await requestTailscaleEnable({
          sudoPassword: tailscalePassword || undefined,
        }));
        if (!res.ok) {
          throw new Error(
            data?.error ||
              translateOrFallback("tailscaleEnableFailed", "Failed to enable Tailscale Funnel")
          );
        }
      }

      if (data?.funnelNotEnabled && data?.enableUrl) {
        window.open(data.enableUrl, "tailscale_funnel", "width=680,height=780");
        setTailscaleNotice({
          type: "info",
          message: translateOrFallback(
            "tailscaleWaitingForFunnel",
            "Enable Funnel for this device in the opened browser tab. OmniRoute will keep polling."
          ),
        });

        let enabled = null;
        for (let attempt = 0; attempt < 40; attempt += 1) {
          await new Promise((resolve) => setTimeout(resolve, 3000));
          const next = await requestTailscaleEnable({
            sudoPassword: tailscalePassword || undefined,
          });
          if (!next.res.ok) {
            throw new Error(
              next.data?.error ||
                translateOrFallback("tailscaleEnableFailed", "Failed to enable Tailscale Funnel")
            );
          }
          if (next.data?.success) {
            enabled = next;
            break;
          }
          if (!next.data?.funnelNotEnabled) {
            enabled = next;
            break;
          }
        }

        if (!enabled?.data?.success) {
          throw new Error(
            translateOrFallback(
              "tailscaleFunnelTimedOut",
              "Timed out waiting for Tailscale Funnel to be enabled"
            )
          );
        }

        data = enabled.data;
      }

      if (!data?.success) {
        throw new Error(
          data?.error ||
            translateOrFallback("tailscaleEnableFailed", "Failed to enable Tailscale Funnel")
        );
      }

      if (data?.status) {
        setTailscaleStatus(data.status);
      }
      setTailscaleNotice({
        type: "success",
        message: translateOrFallback("tailscaleStarted", "Tailscale Funnel enabled"),
      });
    } catch (error) {
      setTailscaleNotice({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : translateOrFallback("tailscaleEnableFailed", "Failed to enable Tailscale Funnel"),
      });
    } finally {
      setTailscaleBusy(false);
      await fetchTailscaleStatus(true);
    }
  }, [
    fetchTailscaleStatus,
    requestTailscaleEnable,
    tailscalePassword,
    translateOrFallback,
    waitForTailscale,
  ]);

  const handleTailscaleDisable = useCallback(async () => {
    setTailscaleBusy(true);
    setTailscaleNotice(null);

    try {
      const res = await fetch("/api/tunnels/tailscale/disable", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sudoPassword: tailscalePassword || undefined }),
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
      setTailscaleNotice({
        type: "success",
        message: translateOrFallback("tailscaleStopped", "Tailscale Funnel disabled"),
      });
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
  }, [fetchTailscaleStatus, tailscalePassword, translateOrFallback]);

  const handleTailscaleInstall = useCallback(async () => {
    setTailscaleInstallBusy(true);
    setTailscaleInstallLog([]);
    setTailscaleNotice(null);

    try {
      const res = await fetch("/api/tunnels/tailscale/install", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sudoPassword: tailscalePassword || undefined }),
      });

      if (!res.body) {
        throw new Error(
          translateOrFallback("tailscaleInstallFailed", "Failed to install Tailscale")
        );
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let installSucceeded = false;

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
            } else if (line.startsWith("data: ")) {
              payload = JSON.parse(line.slice(6));
            }
          }

          if (!payload) continue;

          if (eventName === "progress") {
            const message =
              typeof payload.message === "string"
                ? payload.message
                : translateOrFallback("tailscaleInstallProgress", "Working...");
            setTailscaleInstallLog((current) => [...current.slice(-79), message]);
          } else if (eventName === "done") {
            installSucceeded = true;
            if (payload.status) {
              setTailscaleStatus(payload.status as TailscaleTunnelStatus);
            }
          } else if (eventName === "error") {
            throw new Error(
              typeof payload.error === "string"
                ? payload.error
                : translateOrFallback("tailscaleInstallFailed", "Failed to install Tailscale")
            );
          }
        }
      }

      if (!installSucceeded) {
        throw new Error(
          translateOrFallback("tailscaleInstallFailed", "Failed to install Tailscale")
        );
      }

      setShowTailscaleInstallModal(false);
      setTailscalePassword("");
      setTailscaleNotice({
        type: "success",
        message: translateOrFallback("tailscaleInstalled", "Tailscale installed successfully"),
      });
      await fetchTailscaleStatus(true);
      await handleTailscaleEnable();
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
  }, [fetchTailscaleStatus, handleTailscaleEnable, tailscalePassword, translateOrFallback]);

  const displayBaseUrl = useDisplayBaseUrl();
  const baseUrl = `${displayBaseUrl}/v1`;
  const normalizedCloudBaseUrl = cloudBaseUrl
    ? resolvedMachineId && !cloudBaseUrl.endsWith(`/${resolvedMachineId}`)
      ? `${cloudBaseUrl}/${resolvedMachineId}`
      : cloudBaseUrl
    : null;
  const cloudEndpointNew = normalizedCloudBaseUrl ? `${normalizedCloudBaseUrl}/v1` : null;

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

  const activeUrls = [
    { label: "Local", url: baseUrl, key: "active_local" },
    ...(cloudEnabled && cloudEndpointNew
      ? [{ label: "Cloud", url: cloudEndpointNew, key: "active_cloud" }]
      : []),
    ...(cloudflaredStatus?.running && cloudflaredStatus.apiUrl
      ? [{ label: "Cloudflare", url: cloudflaredStatus.apiUrl, key: "active_cf" }]
      : []),
    ...(tailscaleStatus?.running && (tailscaleStatus.apiUrl ?? tailscaleStatus.tunnelUrl)
      ? [
          {
            label: "Tailscale",
            url: tailscaleStatus.apiUrl ?? tailscaleStatus.tunnelUrl ?? "",
            key: "active_ts",
          },
        ]
      : []),
    ...(ngrokStatus?.running && ngrokStatus.apiUrl
      ? [{ label: "ngrok", url: ngrokStatus.apiUrl, key: "active_ngrok" }]
      : []),
  ];
  const visibleTunnelCount = [showCloudflaredTunnel, showTailscaleFunnel, showNgrokTunnel].filter(
    Boolean
  ).length;
  const activeTunnelCount = [
    showCloudflaredTunnel && cloudflaredStatus?.running,
    showTailscaleFunnel && tailscaleStatus?.running,
    showNgrokTunnel && ngrokStatus?.running,
  ].filter(Boolean).length;

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
    needs_login: {
      label: translateOrFallback("tailscaleNeedsLogin", "Needs Login"),
      className: "bg-blue-500/10 border-blue-500/30 text-blue-400",
    },
    stopped: {
      label: translateOrFallback("tailscaleStoppedState", "Stopped"),
      className: "bg-surface border-border/70 text-text-muted",
    },
    not_installed: {
      label: translateOrFallback("tailscaleNotInstalled", "Not installed"),
      className: "bg-surface border-border/70 text-text-muted",
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
    ? translateOrFallback("tailscaleDisable", "Stop Funnel")
    : tailscaleStatus?.installed
      ? tailscaleStatus?.loggedIn
        ? translateOrFallback("tailscaleEnable", "Enable Funnel")
        : translateOrFallback("tailscaleLoginAndEnable", "Login & Enable")
      : translateOrFallback("tailscaleInstallAndEnable", "Install & Enable");
  const tailscaleUrlNotice = translateOrFallback(
    "tailscaleUrlNotice",
    "Uses your Tailscale .ts.net address. Login and Funnel approval may be required on first use."
  );

  const ngrokPhase = ngrokStatus?.phase || "not_installed";
  const ngrokPhaseMeta: Record<NgrokTunnelPhase, { label: string; className: string }> = {
    running: {
      label: translateOrFallback("ngrokRunning", "Running"),
      className: "bg-green-500/10 border-green-500/30 text-green-400",
    },
    starting: {
      label: translateOrFallback("ngrokStarting", "Starting"),
      className: "bg-blue-500/10 border-blue-500/30 text-blue-400",
    },
    stopped: {
      label: translateOrFallback("ngrokStoppedState", "Stopped"),
      className: "bg-surface border-border/70 text-text-muted",
    },
    needs_auth: {
      label: translateOrFallback("ngrokNeedsAuth", "Needs Auth"),
      className: "bg-amber-500/10 border-amber-500/30 text-amber-400",
    },
    not_installed: {
      label: translateOrFallback("ngrokNotInstalled", "Not installed"),
      className: "bg-surface border-border/70 text-text-muted",
    },
    unsupported: {
      label: translateOrFallback("ngrokUnsupported", "Unsupported"),
      className: "bg-amber-500/10 border-amber-500/30 text-amber-400",
    },
    error: {
      label: translateOrFallback("ngrokError", "Error"),
      className: "bg-red-500/10 border-red-500/30 text-red-400",
    },
  };
  const ngrokActionLabel = ngrokStatus?.running
    ? translateOrFallback("ngrokDisable", "Stop Tunnel")
    : translateOrFallback("ngrokEnable", "Enable Tunnel");
  const ngrokUrlNotice = translateOrFallback("ngrokUrlNotice", "Creates a public ngrok tunnel.");

  return (
    <div className="flex flex-col gap-8">
      {/* Endpoint Card */}
      <Card>
        <h2 className="text-lg font-semibold mb-4">{t("title")}</h2>

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

        {/* Active URLs bar */}
        {activeUrls.length > 0 && (
          <div className="mb-4 rounded-lg border border-primary/20 bg-primary/5 p-3">
            <p className="text-[10px] font-semibold text-primary uppercase tracking-wider mb-2">
              Active Endpoints
            </p>
            <div className="flex flex-col gap-1.5">
              {activeUrls.map(({ label, url, key }) => (
                <div key={key} className="flex items-center gap-2 min-w-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" />
                  <span className="text-xs text-text-muted w-20 shrink-0">{label}</span>
                  <code className="text-xs font-mono text-text-main flex-1 truncate min-w-0">
                    {url}
                  </code>
                  <button
                    onClick={() => void copy(url, key)}
                    className="shrink-0 flex items-center gap-1 px-2 py-0.5 rounded border border-border/70 text-text-muted hover:text-text transition-colors"
                  >
                    <span className="material-symbols-outlined text-[12px]">
                      {copied === key ? "check" : "content_copy"}
                    </span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Connection rows */}
        <div className="flex flex-col">
          {/* Local Server */}
          <div className="flex items-center gap-3 py-3">
            <span className="material-symbols-outlined text-[18px] text-emerald-500 shrink-0">
              computer
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-1 flex-wrap">
                <span className="text-sm font-medium">Local Server</span>
                {resolvedMachineId && (
                  <span className="text-xs text-text-muted">· {resolvedMachineId.slice(0, 8)}</span>
                )}
                {lanUrls.map((url) => (
                  <button
                    key={url}
                    onClick={() => void copy(url, `lan_${url}`)}
                    title={`Copy ${url}`}
                    className="inline-flex items-center gap-0.5 text-[10px] text-text-muted hover:text-text transition-colors"
                  >
                    <code className="font-mono">{url.replace(/^https?:\/\//, "")}</code>
                    <span className="material-symbols-outlined text-[10px] opacity-60">
                      {copied === `lan_${url}` ? "check" : "content_copy"}
                    </span>
                  </button>
                ))}
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium bg-green-500/10 border border-green-500/30 text-green-400 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Running
            </span>
            <button
              onClick={() => void copy(baseUrl, "endpoint_url")}
              className="shrink-0 flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-md border border-border/70 text-text-muted hover:text-text hover:border-border transition-colors"
            >
              <span className="material-symbols-outlined text-[14px]">
                {copied === "endpoint_url" ? "check" : "content_copy"}
              </span>
              {copied === "endpoint_url" ? tc("copied") : tc("copy")}
            </button>
          </div>

          {/* Tunnels section header */}
          <div className="flex items-center gap-2 pt-4 pb-1 border-t border-border/50">
            <span className="material-symbols-outlined text-[14px] text-text-muted">
              network_node
            </span>
            <span className="text-[10px] font-semibold text-text-muted uppercase tracking-wider">
              Tunnels
            </span>
            <div className="flex-1 h-px bg-border/50" />
            <span className="text-[10px] text-text-muted">
              {activeTunnelCount} / {visibleTunnelCount} active
            </span>
          </div>

          {/* Cloud OmniRoute */}
          <div className="flex items-center gap-3 py-3">
            <span className="material-symbols-outlined text-[18px] text-blue-400 shrink-0">
              cloud
            </span>
            <div className="flex-1 min-w-0">
              <span className="text-sm font-medium">Cloud OmniRoute</span>
            </div>
            <span
              className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium border shrink-0 ${
                cloudEnabled
                  ? "bg-green-500/10 border-green-500/30 text-green-400"
                  : "bg-surface border-border/70 text-text-muted"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full shrink-0 ${cloudEnabled ? "bg-green-400 animate-pulse" : "bg-text-muted"}`}
              />
              {cloudEnabled ? "Active" : "Disabled"}
            </span>
            {cloudEnabled ? (
              <Button
                size="sm"
                variant="secondary"
                icon="cloud_off"
                onClick={() => handleCloudToggle(false)}
                disabled={cloudSyncing}
                className="shrink-0 bg-red-500/10! text-red-500! hover:bg-red-500/20! border-red-500/30!"
              >
                {t("disableCloud")}
              </Button>
            ) : cloudConfigured ? (
              <Button
                size="sm"
                variant="primary"
                icon="cloud_upload"
                onClick={() => handleCloudToggle(true)}
                disabled={cloudSyncing}
                className="shrink-0"
              >
                {t("enableCloud")}
              </Button>
            ) : (
              <span className="text-xs text-text-muted shrink-0 px-2 py-1 rounded border border-border/70 bg-surface">
                Not configured
              </span>
            )}
          </div>

          {/* Cloudflare Quick Tunnel */}
          {showCloudflaredTunnel && (
            <div className="border-t border-border/30">
              <div className="flex items-center gap-3 py-3">
                <span className="material-symbols-outlined text-[18px] text-orange-400 shrink-0">
                  cloud_queue
                </span>
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-medium">
                    {translateOrFallback("cloudflaredTitle", "Cloudflare Quick Tunnel")}
                  </span>
                </div>
                <span
                  className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium shrink-0 ${cloudflaredPhaseMeta[cloudflaredPhase].className}`}
                >
                  {cloudflaredPhaseMeta[cloudflaredPhase].label}
                </span>
                {cloudflaredStatus?.supported !== false && (
                  <Button
                    size="sm"
                    variant={cloudflaredStatus?.running ? "secondary" : "primary"}
                    icon={cloudflaredStatus?.running ? "cloud_off" : "cloud_upload"}
                    loading={cloudflaredBusy}
                    onClick={() => {
                      void handleCloudflaredAction(
                        cloudflaredStatus?.running ? "disable" : "enable"
                      );
                    }}
                    className={`shrink-0 ${cloudflaredStatus?.running ? "border-border/70! text-text-muted! hover:text-text!" : ""}`}
                  >
                    {cloudflaredActionLabel}
                  </Button>
                )}
              </div>
              {cloudflaredNotice && (
                <div
                  className={`mb-2 ml-7 flex items-center gap-2 rounded-lg border px-3 py-2 text-sm ${
                    cloudflaredNotice.type === "success"
                      ? "border-green-500/30 bg-green-500/10 text-green-400"
                      : cloudflaredNotice.type === "info"
                        ? "border-blue-500/30 bg-blue-500/10 text-blue-400"
                        : "border-red-500/30 bg-red-500/10 text-red-400"
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {cloudflaredNotice.type === "success"
                      ? "check_circle"
                      : cloudflaredNotice.type === "info"
                        ? "info"
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
              {cloudflaredStatus?.lastError && (
                <p className="mb-2 ml-7 text-xs text-red-400">
                  {translateOrFallback("cloudflaredLastError", "Last error: {error}", {
                    error: cloudflaredStatus.lastError,
                  })}
                </p>
              )}
            </div>
          )}

          {/* Tailscale Funnel */}
          {showTailscaleFunnel && (
            <div className={showCloudflaredTunnel ? "border-t border-border/30" : ""}>
              <div
                role="button"
                tabIndex={0}
                className="w-full flex items-center gap-3 py-3 hover:bg-surface/40 transition-colors rounded -mx-1 px-1 text-left cursor-pointer"
                onClick={() => setExpandedTunnel(expandedTunnel === "ts" ? null : "ts")}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setExpandedTunnel(expandedTunnel === "ts" ? null : "ts");
                  }
                }}
              >
                <span className="material-symbols-outlined text-[18px] text-indigo-400 shrink-0">
                  vpn_lock
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-1 flex-wrap">
                    <span className="text-sm font-medium">
                      {translateOrFallback("tailscaleTitle", "Tailscale Funnel")}
                    </span>
                    {tailscaleIpUrl && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          void copy(tailscaleIpUrl, "tailscale_ip_inline");
                        }}
                        title={`Copy ${tailscaleIpUrl}`}
                        className="inline-flex items-center gap-0.5 text-[10px] text-text-muted hover:text-text transition-colors"
                      >
                        <code className="font-mono">
                          {tailscaleIpUrl.replace(/^https?:\/\//, "")}
                        </code>
                        <span className="material-symbols-outlined text-[10px] opacity-60">
                          {copied === "tailscale_ip_inline" ? "check" : "content_copy"}
                        </span>
                      </button>
                    )}
                  </div>
                </div>
                <span
                  className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium shrink-0 ${tailscalePhaseMeta[tailscalePhase].className}`}
                >
                  {tailscalePhaseMeta[tailscalePhase].label}
                </span>
                {tailscaleStatus?.supported !== false && (
                  <Button
                    size="sm"
                    variant={tailscaleStatus?.running ? "secondary" : "primary"}
                    icon={tailscaleStatus?.running ? "vpn_key_off" : "vpn_lock"}
                    loading={tailscaleBusy}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (tailscaleStatus?.running) {
                        void handleTailscaleDisable();
                      } else if (tailscaleStatus?.installed) {
                        void handleTailscaleEnable();
                      } else {
                        setShowTailscaleInstallModal(true);
                      }
                    }}
                    className={`shrink-0 ${tailscaleStatus?.running ? "border-border/70! text-text-muted! hover:text-text!" : ""}`}
                  >
                    {tailscaleActionLabel}
                  </Button>
                )}
                <span
                  className="material-symbols-outlined text-[18px] text-text-muted shrink-0 transition-transform duration-200"
                  style={{
                    transform: expandedTunnel === "ts" ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                >
                  expand_more
                </span>
              </div>
              {expandedTunnel === "ts" && (
                <div className="pb-3 pl-7 pr-1 flex flex-col gap-2">
                  {tailscaleNotice && (
                    <div
                      className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm ${
                        tailscaleNotice.type === "success"
                          ? "border-green-500/30 bg-green-500/10 text-green-400"
                          : tailscaleNotice.type === "info"
                            ? "border-blue-500/30 bg-blue-500/10 text-blue-400"
                            : "border-red-500/30 bg-red-500/10 text-red-400"
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {tailscaleNotice.type === "success"
                          ? "check_circle"
                          : tailscaleNotice.type === "info"
                            ? "info"
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
                  {tailscaleStatus?.phase === "needs_login" && (
                    <p className="text-xs text-blue-400">
                      {translateOrFallback(
                        "tailscaleNeedsLoginHint",
                        "Authenticate this machine with Tailscale, then enable Funnel."
                      )}
                    </p>
                  )}
                  {tailscaleStatus?.installed && tailscaleStatus?.platform !== "win32" && (
                    <div className="flex flex-col gap-1">
                      <label className="text-xs text-text-muted">
                        {translateOrFallback(
                          "tailscaleSudoLabel",
                          "Sudo Password (required on macOS/Linux)"
                        )}
                      </label>
                      <Input
                        type="password"
                        value={tailscalePassword}
                        onChange={(event) => setTailscalePassword(event.target.value)}
                        placeholder={translateOrFallback(
                          "tailscaleSudoPlaceholder",
                          "Optional sudo password"
                        )}
                        disabled={tailscaleBusy}
                        className="font-mono text-sm"
                      />
                    </div>
                  )}
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
              )}
            </div>
          )}

          {/* ngrok Tunnel */}
          {showNgrokTunnel && (
            <div
              className={
                showCloudflaredTunnel || showTailscaleFunnel ? "border-t border-border/30" : ""
              }
            >
              <div
                role="button"
                tabIndex={0}
                className="w-full flex items-center gap-3 py-3 hover:bg-surface/40 transition-colors rounded -mx-1 px-1 text-left cursor-pointer"
                onClick={() => setExpandedTunnel(expandedTunnel === "ngrok" ? null : "ngrok")}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setExpandedTunnel(expandedTunnel === "ngrok" ? null : "ngrok");
                  }
                }}
              >
                <span className="material-symbols-outlined text-[18px] text-purple-400 shrink-0">
                  public
                </span>
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-medium">
                    {translateOrFallback("ngrokTitle", "ngrok Tunnel")}
                  </span>
                </div>
                <span
                  className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium shrink-0 ${ngrokPhaseMeta[ngrokPhase].className}`}
                >
                  {ngrokPhaseMeta[ngrokPhase].label}
                </span>
                {ngrokStatus?.supported !== false && (
                  <Button
                    size="sm"
                    variant={ngrokStatus?.running ? "secondary" : "primary"}
                    icon={ngrokStatus?.running ? "public_off" : "public"}
                    loading={ngrokBusy}
                    onClick={(e) => {
                      e.stopPropagation();
                      void handleNgrokAction(ngrokStatus?.running ? "disable" : "enable");
                    }}
                    className={`shrink-0 ${ngrokStatus?.running ? "border-border/70! text-text-muted! hover:text-text!" : ""}`}
                  >
                    {ngrokActionLabel}
                  </Button>
                )}
                <span
                  className="material-symbols-outlined text-[18px] text-text-muted shrink-0 transition-transform duration-200"
                  style={{
                    transform: expandedTunnel === "ngrok" ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                >
                  expand_more
                </span>
              </div>
              {expandedTunnel === "ngrok" && (
                <div className="pb-3 pl-7 pr-1 flex flex-col gap-2">
                  {ngrokNotice && (
                    <div
                      className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm ${
                        ngrokNotice.type === "success"
                          ? "border-green-500/30 bg-green-500/10 text-green-400"
                          : ngrokNotice.type === "info"
                            ? "border-blue-500/30 bg-blue-500/10 text-blue-400"
                            : "border-red-500/30 bg-red-500/10 text-red-400"
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {ngrokNotice.type === "success"
                          ? "check_circle"
                          : ngrokNotice.type === "info"
                            ? "info"
                            : "error"}
                      </span>
                      <span className="flex-1">{ngrokNotice.message}</span>
                      <button
                        onClick={() => setNgrokNotice(null)}
                        className="rounded p-0.5 transition-colors hover:bg-white/10"
                      >
                        <span className="material-symbols-outlined text-[16px]">close</span>
                      </button>
                    </div>
                  )}
                  <p className="text-xs text-text-muted">{ngrokUrlNotice}</p>
                  {ngrokStatus?.phase === "needs_auth" && (
                    <div className="flex flex-col gap-1">
                      <label className="text-xs text-text-muted">
                        {translateOrFallback(
                          "ngrokAuthTokenLabel",
                          "Authtoken (Required if NGROK_AUTHTOKEN not set in environment)"
                        )}
                      </label>
                      <Input
                        type="password"
                        value={ngrokToken}
                        onChange={(event) => setNgrokToken(event.target.value)}
                        placeholder={translateOrFallback(
                          "ngrokAuthTokenPlaceholder",
                          "Enter your ngrok authtoken"
                        )}
                        disabled={ngrokBusy}
                        className="font-mono text-sm"
                      />
                    </div>
                  )}
                  {ngrokStatus?.lastError && (
                    <p className="text-xs text-red-400">
                      {translateOrFallback("ngrokLastError", "Last error: {error}", {
                        error: ngrokStatus.lastError,
                      })}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </Card>

      <Card>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-semibold">{t("available")}</h2>
            <p className="text-sm text-text-muted">
              {modelsLoading
                ? translateOrFallback("loadingModels", "Loading available models...")
                : t("modelsAcrossEndpoints", {
                    models: totalEndpointModelCount,
                    endpoints: availableEndpointCount,
                  })}
            </p>
          </div>
        </div>

        {/* Core APIs */}
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="material-symbols-outlined text-sm text-primary">hub</span>
            <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider">
              {t("categoryCore") || "Core APIs"}
            </h3>
            <div className="flex-1 h-px bg-border/50" />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
            <EndpointCard
              icon="chat"
              iconColor="text-blue-500"
              iconBg="bg-blue-500/10"
              title={t("chatCompletions")}
              path="/v1/chat/completions"
              models={endpointData.chat}
              copy={copy}
              copied={copied}
              baseUrl={currentEndpoint}
              modelsLoading={modelsLoading}
            />
            <EndpointCard
              icon="code"
              iconColor="text-indigo-500"
              iconBg="bg-indigo-500/10"
              title={t("responses") || "Responses API"}
              path="/v1/responses"
              models={endpointData.chat}
              copy={copy}
              copied={copied}
              baseUrl={currentEndpoint}
              modelsLoading={modelsLoading}
            />
            <EndpointCard
              icon="text_fields"
              iconColor="text-orange-500"
              iconBg="bg-orange-500/10"
              title={t("completionsLegacy") || "Completions (Legacy)"}
              path="/v1/completions"
              models={endpointData.chat}
              copy={copy}
              copied={copied}
              baseUrl={currentEndpoint}
              modelsLoading={modelsLoading}
            />
            <EndpointCard
              icon="psychology"
              iconColor="text-violet-500"
              iconBg="bg-violet-500/10"
              title={t("messagesApi") || "Messages"}
              path="/v1/messages"
              models={null}
              badge="Anthropic"
              copy={copy}
              copied={copied}
              baseUrl={currentEndpoint}
            />
          </div>
        </div>

        {/* Media & Multi-Modal */}
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="material-symbols-outlined text-sm text-purple-400">perm_media</span>
            <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider">
              {t("categoryMedia") || "Media & Multi-Modal"}
            </h3>
            <div className="flex-1 h-px bg-border/50" />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
            <EndpointCard
              icon="data_array"
              iconColor="text-emerald-500"
              iconBg="bg-emerald-500/10"
              title={t("embeddings")}
              path="/v1/embeddings"
              models={endpointData.embeddings}
              copy={copy}
              copied={copied}
              baseUrl={currentEndpoint}
              modelsLoading={modelsLoading}
            />
            <EndpointCard
              icon="image"
              iconColor="text-purple-500"
              iconBg="bg-purple-500/10"
              title={t("imageGeneration")}
              path="/v1/images/generations"
              models={endpointData.images}
              copy={copy}
              copied={copied}
              baseUrl={currentEndpoint}
              modelsLoading={modelsLoading}
            />
            <EndpointCard
              icon="edit_square"
              iconColor="text-violet-500"
              iconBg="bg-violet-500/10"
              title={t("imageEdits") || "Image Edits"}
              path="/v1/images/edits"
              models={endpointData.images}
              copy={copy}
              copied={copied}
              baseUrl={currentEndpoint}
              modelsLoading={modelsLoading}
            />
            <EndpointCard
              icon="mic"
              iconColor="text-rose-500"
              iconBg="bg-rose-500/10"
              title={t("audioTranscription")}
              path="/v1/audio/transcriptions"
              models={endpointData.audioTranscription}
              copy={copy}
              copied={copied}
              baseUrl={currentEndpoint}
              modelsLoading={modelsLoading}
            />
            <EndpointCard
              icon="record_voice_over"
              iconColor="text-cyan-500"
              iconBg="bg-cyan-500/10"
              title={t("textToSpeech")}
              path="/v1/audio/speech"
              models={endpointData.audioSpeech}
              copy={copy}
              copied={copied}
              baseUrl={currentEndpoint}
              modelsLoading={modelsLoading}
            />
            <EndpointCard
              icon="music_note"
              iconColor="text-fuchsia-500"
              iconBg="bg-fuchsia-500/10"
              title={t("musicGeneration") || "Music Generation"}
              path="/v1/music/generations"
              models={endpointData.music}
              copy={copy}
              copied={copied}
              baseUrl={currentEndpoint}
              modelsLoading={modelsLoading}
            />
            <EndpointCard
              icon="videocam"
              iconColor="text-red-500"
              iconBg="bg-red-500/10"
              title={t("videoGeneration") || "Video Generation"}
              path="/v1/videos/generations"
              models={endpointData.video}
              copy={copy}
              copied={copied}
              baseUrl={currentEndpoint}
              modelsLoading={modelsLoading}
            />
          </div>
        </div>

        {/* Search & Discovery */}
        {searchProviders.length > 0 && (
          <div className="mb-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined text-sm text-cyan-400">
                travel_explore
              </span>
              <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                {t("categorySearch") || "Search & Discovery"}
              </h3>
              <div className="flex-1 h-px bg-border/50" />
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
              <EndpointCard
                icon="search"
                iconColor="text-cyan-500"
                iconBg="bg-cyan-500/10"
                title={t("webSearch") || "Web Search"}
                path="/v1/search"
                models={searchProviders.map((p) => ({ id: p.id, owned_by: p.id, type: "search" }))}
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
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
            <EndpointCard
              icon="sort"
              iconColor="text-amber-500"
              iconBg="bg-amber-500/10"
              title={t("rerank")}
              path="/v1/rerank"
              models={endpointData.rerank}
              copy={copy}
              copied={copied}
              baseUrl={currentEndpoint}
              modelsLoading={modelsLoading}
            />
            <EndpointCard
              icon="shield"
              iconColor="text-orange-500"
              iconBg="bg-orange-500/10"
              title={t("moderations")}
              path="/v1/moderations"
              models={endpointData.moderation}
              copy={copy}
              copied={copied}
              baseUrl={currentEndpoint}
              modelsLoading={modelsLoading}
            />
            <EndpointCard
              icon="view_list"
              iconColor="text-teal-500"
              iconBg="bg-teal-500/10"
              title={t("batchApi") || "Batch API"}
              path="/v1/batches"
              models={null}
              badge="OpenAI"
              copy={copy}
              copied={copied}
              baseUrl={currentEndpoint}
            />
            <EndpointCard
              icon="folder"
              iconColor="text-yellow-500"
              iconBg="bg-yellow-500/10"
              title={t("filesApi") || "Files API"}
              path="/v1/files"
              models={null}
              copy={copy}
              copied={copied}
              baseUrl={currentEndpoint}
            />
            <EndpointCard
              icon="list"
              iconColor="text-teal-500"
              iconBg="bg-teal-500/10"
              title={t("listModels") || "List Models"}
              path="/v1/models"
              models={null}
              copy={copy}
              copied={copied}
              baseUrl={currentEndpoint}
            />
          </div>
        </div>
      </Card>

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
        isOpen={showTailscaleInstallModal}
        title={translateOrFallback("tailscaleInstallTitle", "Install Tailscale")}
        onClose={() => !tailscaleInstallBusy && setShowTailscaleInstallModal(false)}
      >
        <div className="flex flex-col gap-4">
          <div className="rounded-lg border border-blue-500/30 bg-blue-500/10 p-4">
            <p className="text-sm font-medium text-blue-300">
              {translateOrFallback(
                "tailscaleInstallIntro",
                "Installs Tailscale on this machine and prepares OmniRoute to enable Funnel."
              )}
            </p>
            <p className="mt-2 text-sm text-blue-200/80">
              {translateOrFallback(
                "tailscaleInstallPasswordHint",
                "On macOS and Linux, sudo may be required for the package install and daemon start."
              )}
            </p>
          </div>

          <Input
            type="password"
            value={tailscalePassword}
            onChange={(event) => setTailscalePassword(event.target.value)}
            placeholder={translateOrFallback("tailscaleSudoPlaceholder", "Optional sudo password")}
            disabled={tailscaleInstallBusy}
          />

          {tailscaleInstallLog.length > 0 && (
            <div className="max-h-48 overflow-auto rounded-lg border border-border/70 bg-surface/60 p-3">
              <pre className="whitespace-pre-wrap text-xs text-text-muted">
                {tailscaleInstallLog.join("\n")}
              </pre>
            </div>
          )}

          <div className="flex gap-2">
            <Button
              onClick={() => void handleTailscaleInstall()}
              fullWidth
              disabled={tailscaleInstallBusy}
            >
              {tailscaleInstallBusy ? (
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined animate-spin text-sm">
                    progress_activity
                  </span>
                  {translateOrFallback("tailscaleInstalling", "Installing")}
                </span>
              ) : (
                translateOrFallback("tailscaleInstallAndEnable", "Install & Enable")
              )}
            </Button>
            <Button
              onClick={() => setShowTailscaleInstallModal(false)}
              variant="ghost"
              fullWidth
              disabled={tailscaleInstallBusy}
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

// -- Sub-component: Provider Models Modal ------------------------------------------

function ProviderModelsModal({
  provider,
  models,
  copy,
  copied,
  onClose,
}: Readonly<{
  provider: EndpointProviderSummary;
  models: EndpointModelSummary[];
  copy: CopyHandler;
  copied?: string | null;
  onClose: () => void;
}>) {
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

// -- Sub-component: Endpoint Section ------------------------------------------

function EndpointCard({
  icon,
  iconColor,
  iconBg,
  title,
  path,
  models,
  copy,
  copied,
  baseUrl,
  badge,
  modelsLoading = false,
}: Readonly<{
  icon: string;
  iconColor: string;
  iconBg: string;
  title: string;
  path: string;
  models: EndpointModelSummary[] | null;
  copy: CopyHandler;
  copied?: string | null;
  baseUrl: string;
  badge?: string;
  modelsLoading?: boolean;
}>) {
  const t = useTranslations("endpoint");
  const copyId = `endpoint_${path}`;
  const fullUrl = `${baseUrl.replace(/\/v1$/, "")}${path}`;

  return (
    <div className="border border-border rounded-lg p-3 hover:bg-surface/30 transition-colors flex flex-col gap-2">
      <div className="flex items-start gap-2.5">
        <div className={`flex items-center justify-center size-8 rounded-lg ${iconBg} shrink-0`}>
          <span className={`material-symbols-outlined text-base ${iconColor}`}>{icon}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-semibold text-xs leading-tight">{title}</span>
            {badge && (
              <span className="text-[9px] px-1.5 py-0.5 rounded-full border border-border/60 text-text-muted font-medium uppercase tracking-wider leading-none">
                {badge}
              </span>
            )}
          </div>
          <span className="text-xs text-text-muted mt-0.5 block">
            {models === null
              ? "—"
              : modelsLoading
                ? "..."
                : t("modelsCount", { count: models.length })}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-1.5">
        <code className="flex-1 text-[10px] font-mono text-text-muted bg-surface/80 px-2 py-1 rounded truncate">
          {path}
        </code>
        <button
          onClick={() => void copy(fullUrl, copyId)}
          className="shrink-0 flex items-center justify-center size-6 rounded hover:bg-sidebar transition-colors"
          title="Copy URL"
        >
          <span className="material-symbols-outlined text-[12px] text-text-muted">
            {copied === copyId ? "check" : "content_copy"}
          </span>
        </button>
      </div>
    </div>
  );
}

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
  modelsLoading = false,
}: Readonly<{
  icon: string;
  iconColor: string;
  iconBg: string;
  title: string;
  path: string;
  description: string;
  models: EndpointModelSummary[];
  expanded: boolean;
  onToggle: () => void;
  copy: CopyHandler;
  copied?: string | null;
  baseUrl: string;
  modelsLoading?: boolean;
}>) {
  const t = useTranslations("endpoint");
  const grouped = useMemo(() => {
    const map = {};
    for (const m of models) {
      const owner = m.owned_by || "unknown";
      if (!map[owner]) map[owner] = [];
      map[owner].push(m);
    }
    return Object.entries(map).sort((a: any, b: any) => b[1].length - a[1].length);
  }, [models]);

  const resolveProvider = (id) => AI_PROVIDERS[id] || getProviderByAlias(id);
  const providerColor = (id) => resolveProvider(id)?.color || "#888";
  const providerName = (id) => getProviderDisplayName(id, resolveProvider(id));
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
              {modelsLoading ? "..." : t("modelsCount", { count: models.length })}
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
          {modelsLoading ? (
            <div className="flex items-center gap-2 rounded-lg border border-border/70 bg-surface/40 px-3 py-2 text-xs text-text-muted">
              <span className="material-symbols-outlined animate-spin text-sm">
                progress_activity
              </span>
              <span>{t("loadingModels")}</span>
            </div>
          ) : (
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
          )}
        </div>
      )}
    </div>
  );
}

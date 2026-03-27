"use client";

import { useState, useEffect } from "react";
import { Card, Button, Badge } from "@/shared/components";
import { useTranslations } from "next-intl";

interface Patch {
  name: string;
  description: string;
  enabled: boolean;
  loaded: boolean;
}

const PATCH_METADATA: Record<string, { description: string; category: string }> = {
  "antigravity-no-projectid": {
    description: "Removes project ID requirement for Antigravity provider",
    category: "provider",
  },
  "api-auth": {
    description: "Adds API key authentication to protect endpoints",
    category: "security",
  },
  "cost-tracker": {
    description: "Tracks API costs per request, provider, and time period",
    category: "analytics",
  },
  "endpoint-router": {
    description: "Advanced endpoint routing with fallback support",
    category: "routing",
  },
  "enhanced-logging": {
    description: "Enhanced logging with detailed request/response tracking",
    category: "logging",
  },
  "health-check": {
    description: "Proactive health check for providers and tokens",
    category: "monitoring",
  },
  "image-api-normalizer": {
    description: "Normalizes image generation API responses across providers",
    category: "compatibility",
  },
  "prometheus-metrics": {
    description: "Exposes Prometheus metrics for monitoring",
    category: "monitoring",
  },
  "prompt-cache-anthropic": {
    description: "Enables prompt caching for Anthropic models",
    category: "performance",
  },
  "prompt-cache-openai": {
    description: "Enables prompt caching for OpenAI models",
    category: "performance",
  },
  "provider-circuit-breaker": {
    description: "Implements circuit breaker pattern for provider failures",
    category: "resilience",
  },
  "provider-monitor": {
    description: "Monitors provider health and tracks failures",
    category: "monitoring",
  },
  "request-logger": { description: "Logs all incoming requests with details", category: "logging" },
  "response-cache": {
    description: "Caches responses for identical requests",
    category: "performance",
  },
  "semantic-cache": {
    description: "Semantically similar request caching",
    category: "performance",
  },
  "strip-cache-control-gemini": {
    description: "Removes cache-control headers from Gemini responses",
    category: "compatibility",
  },
  "telegram-alerts": {
    description: "Sends alerts via Telegram when issues detected",
    category: "notifications",
  },
  "video-api-normalizer": {
    description: "Normalizes video generation API responses across providers",
    category: "compatibility",
  },
};

export default function PatchesTab() {
  const t = useTranslations("settings");
  const [patches, setPatches] = useState<Patch[]>([]);
  const [loading, setLoading] = useState(true);
  const [applyingPatch, setApplyingPatch] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error" | "info";
    message: string;
  } | null>(null);

  useEffect(() => {
    loadPatches();
  }, []);

  const loadPatches = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/patches/toggle");
      if (response.ok) {
        const data = await response.json();
        const patchList: Patch[] = (data.patches || []).map(
          (p: { name: string; enabled: boolean; loaded: boolean }) => ({
            name: p.name,
            description: PATCH_METADATA[p.name]?.description || "No description available",
            enabled: p.enabled,
            loaded: p.loaded,
          })
        );
        const knownPatches = Object.keys(PATCH_METADATA);
        const apiPatchNames = new Set(patchList.map((p) => p.name));
        for (const name of knownPatches) {
          if (!apiPatchNames.has(name)) {
            patchList.push({
              name,
              description: PATCH_METADATA[name]?.description || "No description available",
              enabled: true,
              loaded: false,
            });
          }
        }
        setPatches(patchList.sort((a, b) => a.name.localeCompare(b.name)));
      } else {
        const patchFiles = Object.keys(PATCH_METADATA);
        const patchList: Patch[] = patchFiles.map((name) => ({
          name,
          description: PATCH_METADATA[name]?.description || "No description available",
          enabled: true,
          loaded: true,
        }));
        setPatches(patchList);
      }
    } catch (err) {
      console.error("Failed to load patches:", err);
      const patchFiles = Object.keys(PATCH_METADATA);
      const patchList: Patch[] = patchFiles.map((name) => ({
        name,
        description: PATCH_METADATA[name]?.description || "No description available",
        enabled: true,
        loaded: true,
      }));
      setPatches(patchList);
      setStatusMessage({
        type: "error",
        message: "Failed to load patches from API, using defaults",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePatch = async (patchName: string) => {
    setApplyingPatch(patchName);
    setStatusMessage(null);

    try {
      const response = await fetch("/api/patches/toggle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ patchName }),
      });

      if (response.ok) {
        setPatches((prev) =>
          prev.map((p) => (p.name === patchName ? { ...p, enabled: !p.enabled } : p))
        );
        setStatusMessage({
          type: "success",
          message: `Patch ${patchName} toggled successfully. Restart required for changes to take effect.`,
        });
      } else {
        throw new Error("Failed to toggle patch");
      }
    } catch (err) {
      setStatusMessage({
        type: "error",
        message: `Failed to toggle patch: ${(err as Error).message}`,
      });
    } finally {
      setApplyingPatch(null);
    }
  };

  const handleReloadPatches = async () => {
    setLoading(true);
    setStatusMessage(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStatusMessage({ type: "success", message: "Patches reloaded successfully" });
      await loadPatches();
    } catch (err) {
      setStatusMessage({ type: "error", message: "Failed to reload patches" });
    } finally {
      setLoading(false);
    }
  };

  const handleEnableAll = async () => {
    setApplyingPatch("__all__");
    setStatusMessage(null);
    try {
      const response = await fetch("/api/patches/toggle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enableAll: true }),
      });

      if (response.ok) {
        setPatches((prev) => prev.map((p) => ({ ...p, enabled: true })));
        setStatusMessage({
          type: "success",
          message: "All patches enabled. Restart required for changes to take effect.",
        });
      } else {
        throw new Error("Failed to enable all patches");
      }
    } catch (err) {
      setStatusMessage({
        type: "error",
        message: `Failed to enable all patches: ${(err as Error).message}`,
      });
    } finally {
      setApplyingPatch(null);
    }
  };

  const handleDisableAll = async () => {
    setApplyingPatch("__all__");
    setStatusMessage(null);
    try {
      const response = await fetch("/api/patches/toggle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ disableAll: true }),
      });

      if (response.ok) {
        setPatches((prev) => prev.map((p) => ({ ...p, enabled: false })));
        setStatusMessage({
          type: "success",
          message: "All patches disabled. Restart required for changes to take effect.",
        });
      } else {
        throw new Error("Failed to disable all patches");
      }
    } catch (err) {
      setStatusMessage({
        type: "error",
        message: `Failed to disable all patches: ${(err as Error).message}`,
      });
    } finally {
      setApplyingPatch(null);
    }
  };

  const enabledCount = patches.filter((p) => p.enabled).length;
  const categories = [...new Set(Object.values(PATCH_METADATA).map((m) => m.category))];

  return (
    <Card>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500">
          <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
            puzzle_extension
          </span>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold">Patch Management</h3>
          <p className="text-xs text-text-muted">Manage custom patches and modifications</p>
        </div>
        <Badge variant={enabledCount > 0 ? "success" : "default"} size="sm">
          {enabledCount} active
        </Badge>
      </div>

      {statusMessage && (
        <div
          className={`p-3 rounded-lg mb-4 text-sm ${
            statusMessage.type === "success"
              ? "bg-green-500/10 text-green-500 border border-green-500/20"
              : statusMessage.type === "error"
                ? "bg-red-500/10 text-red-500 border border-red-500/20"
                : "bg-blue-500/10 text-blue-500 border border-blue-500/20"
          }`}
          role="alert"
        >
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
              {statusMessage.type === "success"
                ? "check_circle"
                : statusMessage.type === "error"
                  ? "error"
                  : "info"}
            </span>
            {statusMessage.message}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        <div className="p-3 rounded-lg bg-bg border border-border">
          <p className="text-[11px] text-text-muted uppercase tracking-wide mb-1">Total Patches</p>
          <p className="text-2xl font-bold text-text-main">{patches.length}</p>
        </div>
        <div className="p-3 rounded-lg bg-bg border border-border">
          <p className="text-[11px] text-text-muted uppercase tracking-wide mb-1">Active</p>
          <p className="text-2xl font-bold text-green-500">{enabledCount}</p>
        </div>
        <div className="p-3 rounded-lg bg-bg border border-border">
          <p className="text-[11px] text-text-muted uppercase tracking-wide mb-1">Categories</p>
          <p className="text-2xl font-bold text-text-main">{categories.length}</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-4">
        <Button variant="outline" size="sm" onClick={handleReloadPatches} loading={loading}>
          <span className="material-symbols-outlined text-[14px] mr-1" aria-hidden="true">
            refresh
          </span>
          Reload
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleEnableAll}
          disabled={applyingPatch !== null || enabledCount === patches.length}
          loading={applyingPatch === "__all__" && statusMessage?.type === "success"}
        >
          <span className="material-symbols-outlined text-[14px] mr-1" aria-hidden="true">
            check_circle
          </span>
          Enable All
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleDisableAll}
          disabled={applyingPatch !== null || enabledCount === 0}
          loading={applyingPatch === "__all__" && statusMessage?.type !== "success"}
        >
          <span className="material-symbols-outlined text-[14px] mr-1" aria-hidden="true">
            cancel
          </span>
          Disable All
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            window.open("https://github.com/openclaw/1ai-omniroute/patches", "_blank");
          }}
        >
          <span className="material-symbols-outlined text-[14px] mr-1" aria-hidden="true">
            open_in_new
          </span>
          GitHub
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-8 text-text-muted">
          <span
            className="material-symbols-outlined animate-spin text-[20px] mr-2"
            aria-hidden="true"
          >
            progress_activity
          </span>
          Loading patches...
        </div>
      ) : (
        <div className="space-y-2">
          {patches.map((patch) => {
            const metadata = PATCH_METADATA[patch.name];
            return (
              <div
                key={patch.name}
                className="flex items-center justify-between p-3 rounded-lg bg-black/[0.02] dark:bg-white/[0.02] border border-border/50 hover:border-border transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="material-symbols-outlined text-[16px] text-purple-500"
                      aria-hidden="true"
                    >
                      puzzle_extension
                    </span>
                    <span className="text-sm font-medium truncate font-mono">{patch.name}</span>
                    {patch.enabled && (
                      <Badge variant="success" size="sm">
                        Active
                      </Badge>
                    )}
                    {patch.loaded && (
                      <Badge variant="default" size="sm">
                        Loaded
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-text-muted ml-6">
                    <span>{metadata?.description || patch.description}</span>
                    <span>•</span>
                    <Badge variant="default" size="sm">
                      {metadata?.category || "unknown"}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleTogglePatch(patch.name)}
                    disabled={applyingPatch === patch.name}
                    loading={applyingPatch === patch.name}
                  >
                    <span className="material-symbols-outlined text-[14px] mr-1" aria-hidden="true">
                      {patch.enabled ? "pause" : "play_arrow"}
                    </span>
                    {patch.enabled ? "Disable" : "Enable"}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-4 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
        <div className="flex items-start gap-2">
          <span
            className="material-symbols-outlined text-[18px] text-blue-500 mt-0.5"
            aria-hidden="true"
          >
            info
          </span>
          <div className="text-sm">
            <p className="font-medium text-blue-500 mb-1">About Patches</p>
            <p className="text-text-muted text-xs">
              Patches are custom modifications that extend OmniRoute functionality. Patches are
              loaded at startup from the patches directory. Changes to patch enable/disable state
              require a restart to take effect.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}

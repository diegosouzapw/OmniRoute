"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/shared/utils/cn";
import { CustomHostsManager } from "./CustomHostsManager";
import { HttpProxySnippetCard } from "./HttpProxySnippetCard";
import {
  fetchTproxyStatus,
  startTproxyCaptureMode,
  stopTproxyCaptureMode,
} from "@/lib/inspector/tproxyCaptureApi";

interface CaptureModeState {
  agentBridge: boolean; // always on, cannot disable
  customHosts: boolean;
  httpProxy: boolean;
  systemWide: boolean;
}

interface CaptureModesToolbarProps {
  customHostCount: number;
}

export function CaptureModesToolbar({ customHostCount }: CaptureModesToolbarProps) {
  const t = useTranslations("trafficInspector");
  const [modes, setModes] = useState<CaptureModeState>({
    agentBridge: true,
    customHosts: false,
    httpProxy: false,
    systemWide: false,
  });
  const [showHosts, setShowHosts] = useState(false);
  const [showProxy, setShowProxy] = useState(false);
  const [proxyPort] = useState(8080);

  // TPROXY decrypt capture is real backend state (route #4211), gated on the
  // native addon (Linux + root). Reflect the server status and drive start/stop.
  const [tproxy, setTproxy] = useState<{
    running: boolean;
    available: boolean;
    interceptCount?: number;
  }>({ running: false, available: false });
  const [tproxyBusy, setTproxyBusy] = useState(false);

  useEffect(() => {
    let alive = true;
    fetchTproxyStatus()
      .then((s) => {
        if (alive) {
          setTproxy({ running: s.running, available: s.available, interceptCount: s.interceptCount });
        }
      })
      .catch(() => {
        // status route unreachable → leave defaults (disabled toggle)
      });
    return () => {
      alive = false;
    };
  }, []);

  const toggleMode = (key: keyof CaptureModeState) => {
    if (key === "agentBridge") return; // always on
    setModes((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleTproxy = async () => {
    if (!tproxy.available || tproxyBusy) return;
    setTproxyBusy(true);
    try {
      const status = tproxy.running
        ? await stopTproxyCaptureMode()
        : await startTproxyCaptureMode();
      setTproxy({
        running: status.running,
        available: status.available,
        interceptCount: status.interceptCount,
      });
    } catch {
      // keep the prior state; the route sanitizes + reports its own errors
    } finally {
      setTproxyBusy(false);
    }
  };

  const buttons: Array<{
    key: keyof CaptureModeState;
    label: string;
    alwaysOn?: boolean;
    warn?: boolean;
    extra?: React.ReactNode;
  }> = [
    { key: "agentBridge", label: t("agentBridgeMode"), alwaysOn: true },
    {
      key: "customHosts",
      label: `${t("customHostsMode")} (${customHostCount})`,
    },
    {
      key: "httpProxy",
      label: `${t("httpProxyMode")} :${proxyPort}`,
    },
    {
      key: "systemWide",
      label: t("systemWideMode"),
      warn: true,
    },
  ];

  return (
    <>
      <div className="flex flex-wrap items-center gap-2 rounded-lg border border-border bg-bg-subtle px-3 py-2">
        {buttons.map(({ key, label, alwaysOn, warn }) => {
          const active = modes[key];
          return (
            <button
              key={key}
              type="button"
              onClick={() => toggleMode(key)}
              disabled={alwaysOn}
              className={cn(
                "inline-flex items-center gap-1.5 rounded border px-2.5 py-1 text-xs font-medium transition-colors",
                "focus-ring disabled:cursor-default",
                active
                  ? warn
                    ? "border-amber-500/50 bg-amber-900/30 text-amber-300"
                    : "border-green-500/50 bg-green-900/30 text-green-300"
                  : "border-border text-text-muted hover:text-text-main hover:bg-surface"
              )}
            >
              <span
                className={cn(
                  "inline-block h-1.5 w-1.5 rounded-full",
                  active ? (warn ? "bg-amber-400" : "bg-green-400") : "bg-gray-600"
                )}
              />
              {label}
              {warn && <span className="text-amber-400">⚠</span>}
            </button>
          );
        })}

        <button
          type="button"
          onClick={toggleTproxy}
          disabled={!tproxy.available || tproxyBusy}
          title={!tproxy.available ? t("tproxyModeUnavailable") : undefined}
          className={cn(
            "inline-flex items-center gap-1.5 rounded border px-2.5 py-1 text-xs font-medium transition-colors",
            "focus-ring disabled:cursor-not-allowed disabled:opacity-50",
            tproxy.running
              ? "border-amber-500/50 bg-amber-900/30 text-amber-300"
              : "border-border text-text-muted hover:text-text-main hover:bg-surface"
          )}
        >
          <span
            className={cn(
              "inline-block h-1.5 w-1.5 rounded-full",
              tproxy.running ? "bg-amber-400" : "bg-gray-600"
            )}
          />
          {t("tproxyMode")}
          {tproxy.running && typeof tproxy.interceptCount === "number" && (
            <span className="text-amber-400">· {tproxy.interceptCount}</span>
          )}
          <span className="text-amber-400">⚠</span>
        </button>

        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowHosts(true)}
            className="text-xs text-text-muted hover:text-text-main focus-ring rounded"
          >
            ⚙ {t("manageHosts")}
          </button>
          <button
            type="button"
            onClick={() => setShowProxy(true)}
            className="text-xs text-text-muted hover:text-text-main focus-ring rounded"
          >
            ⬇ {t("copySnippet")}
          </button>
        </div>
      </div>

      {showHosts && <CustomHostsManager onClose={() => setShowHosts(false)} />}
      {showProxy && <HttpProxySnippetCard port={proxyPort} onClose={() => setShowProxy(false)} />}
    </>
  );
}

"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/shared/utils/cn";
import { CustomHostsManager } from "./CustomHostsManager";
import { HttpProxySnippetCard } from "./HttpProxySnippetCard";

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

  const toggleMode = (key: keyof CaptureModeState) => {
    if (key === "agentBridge") return; // always on
    setModes((prev) => ({ ...prev, [key]: !prev[key] }));
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

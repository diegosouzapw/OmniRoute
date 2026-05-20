"use client";

import { useState, useEffect, useCallback } from "react";
import { Card } from "@/shared/components";
import { copyToClipboard } from "@/shared/utils/clipboard";
import McpDashboardPage from "../endpoint/components/MCPDashboard";

type ServiceStatus = { online: boolean; loading: boolean };
type McpTransport = "stdio" | "sse" | "streamable-http";

function ServiceToggle({
  label,
  status,
  enabled,
  onToggle,
  toggling,
}: {
  label: string;
  status: ServiceStatus;
  enabled: boolean;
  onToggle: () => void;
  toggling: boolean;
}) {
  const online = enabled && status.online;
  const loading = enabled && status.loading;

  return (
    <div className="flex items-center gap-3">
      <div
        className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border"
        style={{
          borderColor: loading
            ? "var(--color-border)"
            : online
              ? "rgba(34,197,94,0.3)"
              : "rgba(239,68,68,0.3)",
          background: loading
            ? "transparent"
            : online
              ? "rgba(34,197,94,0.1)"
              : "rgba(239,68,68,0.1)",
          color: loading ? "var(--color-text-muted)" : online ? "rgb(34,197,94)" : "rgb(239,68,68)",
        }}
      >
        <span
          className="inline-block w-2 h-2 rounded-full"
          style={{
            background: loading
              ? "var(--color-text-muted)"
              : online
                ? "rgb(34,197,94)"
                : "rgb(239,68,68)",
            animation: online ? "pulse 2s infinite" : "none",
          }}
        />
        {loading ? "..." : online ? "Online" : "Offline"}
      </div>

      <button
        onClick={onToggle}
        disabled={toggling}
        className="relative inline-flex items-center h-7 w-[52px] rounded-full transition-all duration-300 focus:outline-none border"
        style={{
          background: enabled ? "rgb(34,197,94)" : "var(--color-bg-tertiary)",
          borderColor: enabled ? "rgba(34,197,94,0.5)" : "var(--color-border)",
          opacity: toggling ? 0.6 : 1,
          cursor: toggling ? "wait" : "pointer",
        }}
        title={enabled ? `Disable ${label}` : `Enable ${label}`}
      >
        <span
          className="inline-block w-5 h-5 rounded-full shadow-md transition-all duration-300"
          style={{
            transform: enabled ? "translateX(26px)" : "translateX(3px)",
            background: enabled ? "#fff" : "var(--color-text-muted)",
          }}
        />
      </button>

      <span
        className="text-xs font-medium min-w-[24px]"
        style={{ color: enabled ? "rgb(34,197,94)" : "var(--color-text-muted)" }}
      >
        {toggling ? "..." : enabled ? "ON" : "OFF"}
      </span>
    </div>
  );
}

function TransportSelector({
  value,
  onChange,
  disabled,
  baseUrl,
}: {
  value: McpTransport;
  onChange: (t: McpTransport) => void;
  disabled: boolean;
  baseUrl: string;
}) {
  const options: { value: McpTransport; label: string; desc: string }[] = [
    { value: "stdio", label: "stdio", desc: "Local — IDE spawns process via omniroute --mcp" },
    { value: "sse", label: "SSE", desc: "Remote — Server-Sent Events over HTTP" },
    {
      value: "streamable-http",
      label: "Streamable HTTP",
      desc: "Remote — Modern bidirectional HTTP",
    },
  ];

  const urlMap: Record<McpTransport, string> = {
    stdio: "omniroute --mcp",
    sse: `${baseUrl}/api/mcp/sse`,
    "streamable-http": `${baseUrl}/api/mcp/stream`,
  };

  return (
    <div
      className="rounded-lg border p-4"
      style={{ borderColor: "var(--color-border)", background: "var(--color-bg-secondary)" }}
    >
      <div className="flex items-center gap-2 mb-3">
        <span
          className="material-symbols-rounded text-base"
          style={{ color: "var(--color-primary)" }}
        >
          swap_horiz
        </span>
        <span className="text-sm font-medium" style={{ color: "var(--color-text)" }}>
          Transport Mode
        </span>
      </div>

      <div className="flex gap-2 flex-wrap">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            disabled={disabled}
            className="flex flex-col items-start px-4 py-2.5 rounded-lg border transition-all duration-200 text-left"
            style={{
              borderColor: value === opt.value ? "var(--color-primary)" : "var(--color-border)",
              background:
                value === opt.value
                  ? "rgba(var(--color-primary-rgb, 99,102,241), 0.1)"
                  : "transparent",
              opacity: disabled ? 0.5 : 1,
              cursor: disabled ? "wait" : "pointer",
            }}
          >
            <span
              className="text-sm font-semibold"
              style={{
                color: value === opt.value ? "var(--color-primary)" : "var(--color-text)",
              }}
            >
              {opt.label}
            </span>
            <span className="text-xs mt-0.5" style={{ color: "var(--color-text-muted)" }}>
              {opt.desc}
            </span>
          </button>
        ))}
      </div>

      <div
        className="mt-3 rounded-md px-3 py-2 flex items-center gap-2"
        style={{ background: "var(--color-bg-tertiary)" }}
      >
        <span
          className="material-symbols-rounded text-sm"
          style={{ color: "var(--color-text-muted)" }}
        >
          {value === "stdio" ? "terminal" : "link"}
        </span>
        <code className="text-xs break-all" style={{ color: "var(--color-text-muted)" }}>
          {urlMap[value]}
        </code>
        {value !== "stdio" && (
          <button
            className="ml-auto text-xs px-2 py-0.5 rounded border hover:opacity-80 transition-opacity"
            style={{ borderColor: "var(--color-border)", color: "var(--color-text-muted)" }}
            onClick={() => void copyToClipboard(urlMap[value])}
            title="Copy URL"
          >
            Copy
          </button>
        )}
      </div>
    </div>
  );
}

function DisabledPanel() {
  return (
    <Card className="p-6">
      <div className="flex items-start gap-3">
        <div
          className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-lg"
          style={{ background: "var(--color-bg-tertiary)" }}
        >
          <span
            aria-hidden="true"
            className="relative block size-5 rounded-full border-2"
            style={{ borderColor: "var(--color-text-muted)" }}
          >
            <span
              className="absolute left-1/2 top-[-3px] h-3 w-0.5 -translate-x-1/2 rounded-full"
              style={{ background: "var(--color-text-muted)" }}
            />
          </span>
        </div>
        <div>
          <h2 className="text-base font-semibold" style={{ color: "var(--color-text)" }}>
            MCP is disabled
          </h2>
          <p className="text-sm mt-1" style={{ color: "var(--color-text-muted)" }}>
            Enable MCP above to configure transport mode and view server telemetry.
          </p>
        </div>
      </div>
    </Card>
  );
}

export default function McpPage() {
  const [mcpStatus, setMcpStatus] = useState<ServiceStatus>({ online: false, loading: true });
  const [mcpEnabled, setMcpEnabled] = useState(false);
  const [mcpToggling, setMcpToggling] = useState(false);
  const [mcpTransport, setMcpTransport] = useState<McpTransport>("stdio");
  const [transportSaving, setTransportSaving] = useState(false);
  const [baseUrl, setBaseUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setBaseUrl(`${window.location.protocol}//${window.location.host}`);
    }
  }, []);

  const patchSetting = useCallback(async (body: Record<string, unknown>) => {
    return fetch("/api/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  }, []);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch("/api/settings");
        if (res.ok) {
          const data = await res.json();
          setMcpEnabled(!!data.mcpEnabled);
          setMcpTransport((data.mcpTransport as McpTransport) || "stdio");
        }
      } catch {
        // defaults stay
      }
    };
    void fetchSettings();
  }, []);

  const refreshStatus = useCallback(async () => {
    setMcpStatus((prev) => ({ ...prev, loading: true }));
    try {
      const res = await fetch("/api/mcp/status");
      setMcpStatus({ online: res.ok ? !!(await res.json()).online : false, loading: false });
    } catch {
      setMcpStatus({ online: false, loading: false });
    }
  }, []);

  useEffect(() => {
    void refreshStatus();
    const interval = setInterval(() => void refreshStatus(), 30000);
    return () => clearInterval(interval);
  }, [refreshStatus]);

  const toggleMcp = useCallback(async () => {
    const newValue = !mcpEnabled;
    setMcpToggling(true);
    try {
      const res = await patchSetting({ mcpEnabled: newValue });
      if (res.ok) setMcpEnabled(newValue);
    } catch {
      // keep current
    } finally {
      setMcpToggling(false);
    }
  }, [mcpEnabled, patchSetting]);

  const changeTransport = useCallback(
    async (newTransport: McpTransport) => {
      setTransportSaving(true);
      try {
        const res = await patchSetting({ mcpTransport: newTransport });
        if (res.ok) setMcpTransport(newTransport);
      } catch {
        // keep current
      } finally {
        setTransportSaving(false);
      }
    },
    [patchSetting]
  );

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
              Model Context Protocol — 37 tools across 13 scopes, 3 transports (stdio / SSE /
              Streamable HTTP).
            </p>
            <ol
              className="mt-2 text-sm space-y-0.5 list-decimal list-inside"
              style={{ color: "var(--color-text-muted)" }}
            >
              <li>
                Run via <code className="text-xs">omniroute --mcp</code>
              </li>
              <li>Configure your MCP client to connect over stdio transport.</li>
              <li>
                Invoke tools like <code className="text-xs">omniroute_get_health</code> and{" "}
                <code className="text-xs">omniroute_list_combos</code>.
              </li>
            </ol>
          </div>
          <div className="shrink-0">
            <ServiceToggle
              label="MCP"
              status={mcpStatus}
              enabled={mcpEnabled}
              onToggle={() => void toggleMcp()}
              toggling={mcpToggling}
            />
          </div>
        </div>
      </Card>

      {mcpEnabled && (
        <TransportSelector
          value={mcpTransport}
          onChange={(t) => void changeTransport(t)}
          disabled={transportSaving}
          baseUrl={baseUrl}
        />
      )}

      {mcpEnabled ? <McpDashboardPage /> : <DisabledPanel />}
    </div>
  );
}

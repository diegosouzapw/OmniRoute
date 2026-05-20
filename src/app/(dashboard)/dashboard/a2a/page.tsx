"use client";

import { useState, useEffect, useCallback } from "react";
import { Card } from "@/shared/components";
import A2ADashboardPage from "../endpoint/components/A2ADashboard";

type ServiceStatus = { online: boolean; loading: boolean };

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
            A2A is disabled
          </h2>
          <p className="text-sm mt-1" style={{ color: "var(--color-text-muted)" }}>
            Enable A2A above to view task telemetry, agent details, and validation tools.
          </p>
        </div>
      </div>
    </Card>
  );
}

export default function A2APage() {
  const [a2aStatus, setA2aStatus] = useState<ServiceStatus>({ online: false, loading: true });
  const [a2aEnabled, setA2aEnabled] = useState(false);
  const [a2aToggling, setA2aToggling] = useState(false);

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
          setA2aEnabled(!!data.a2aEnabled);
        }
      } catch {
        // defaults stay
      }
    };
    void fetchSettings();
  }, []);

  const refreshStatus = useCallback(async () => {
    setA2aStatus((prev) => ({ ...prev, loading: true }));
    try {
      const res = await fetch("/api/a2a/status");
      const data = res.ok ? await res.json() : null;
      setA2aStatus({ online: data?.status === "ok", loading: false });
    } catch {
      setA2aStatus({ online: false, loading: false });
    }
  }, []);

  useEffect(() => {
    void refreshStatus();
    const interval = setInterval(() => void refreshStatus(), 30000);
    return () => clearInterval(interval);
  }, [refreshStatus]);

  const toggleA2a = useCallback(async () => {
    const newValue = !a2aEnabled;
    setA2aToggling(true);
    try {
      const res = await patchSetting({ a2aEnabled: newValue });
      if (res.ok) setA2aEnabled(newValue);
    } catch {
      // keep current
    } finally {
      setA2aToggling(false);
    }
  }, [a2aEnabled, patchSetting]);

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
              Agent2Agent JSON-RPC 2.0 endpoint — send tasks, stream responses, cancel in-flight
              jobs.
            </p>
            <ol
              className="mt-2 text-sm space-y-0.5 list-decimal list-inside"
              style={{ color: "var(--color-text-muted)" }}
            >
              <li>
                Discover the agent card at <code className="text-xs">/.well-known/agent.json</code>.
              </li>
              <li>
                Send JSON-RPC to <code className="text-xs">POST /a2a</code> using{" "}
                <code className="text-xs">message/send</code> or{" "}
                <code className="text-xs">message/stream</code>.
              </li>
              <li>
                Track and cancel tasks with <code className="text-xs">tasks/get</code> and{" "}
                <code className="text-xs">tasks/cancel</code>.
              </li>
            </ol>
          </div>
          <div className="shrink-0">
            <ServiceToggle
              label="A2A"
              status={a2aStatus}
              enabled={a2aEnabled}
              onToggle={() => void toggleA2a()}
              toggling={a2aToggling}
            />
          </div>
        </div>
      </Card>

      {a2aEnabled ? <A2ADashboardPage /> : <DisabledPanel />}
    </div>
  );
}

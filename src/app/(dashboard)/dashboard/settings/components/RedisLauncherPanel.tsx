"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/shared/components";

type LaunchState = "idle" | "checking" | "launching" | "ready" | "error";

type Status = {
  exists?: boolean;
  running?: boolean;
  reachable?: boolean;
  message?: string;
  detail?: string;
};

async function apiCall(endpoint: string, options: RequestInit = {}) {
  const res = await fetch(`/api/local/redis${endpoint}`, {
    method: options.method || "GET",
    headers: { "Content-Type": "application/json" },
    body: options.body,
    cache: "no-store",
  });
  if (!res.ok) {
    let detail = `HTTP ${res.status}`;
    try {
      const json = await res.json();
      if (json?.error) detail = json.error;
    } catch {
      // ignore
    }
    throw new Error(detail);
  }
  return res.json();
}

/**
 * Compact 1-click Redis control. Sits inside the resilience settings tab and
 * shells out to the same logic exposed via the `omniroute redis` CLI command.
 * The actual container management is delegated to the server-side endpoint
 * at /api/local/redis/* so the browser never executes podman/docker directly.
 */
export default function RedisLauncherPanel() {
  const t = useTranslations("settings");
  const [state, setState] = useState<LaunchState>("idle");
  const [status, setStatus] = useState<Status | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function refresh() {
    setState("checking");
    setError(null);
    try {
      const data = await apiCall("/status");
      setStatus(data);
      setState(data.running ? "ready" : "idle");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to query status");
      setState("error");
    }
  }

  async function launch() {
    setState("launching");
    setError(null);
    try {
      const data = await apiCall("/start", { method: "POST" });
      setStatus(data);
      setState("ready");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to launch Redis");
      setState("error");
    }
  }

  async function stop() {
    setState("launching");
    setError(null);
    try {
      await apiCall("/stop", { method: "POST" });
      setStatus({ exists: false, running: false, reachable: false });
      setState("idle");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to stop Redis");
      setState("error");
    }
  }

  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-base font-semibold text-text-main">
            {t("redisLauncherTitle", "Local Redis")}
          </h3>
          <p className="mt-1 text-sm text-text-muted">
            {t(
              "redisLauncherDesc",
              "One-click launch a Redis 7 container (Podman or Docker) for response cache, quota tracking, and rate limiting."
            )}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="outline" onClick={refresh} disabled={state === "checking"}>
            {state === "checking" ? "…" : t("redisLauncherRefresh", "Refresh")}
          </Button>
          {status?.running ? (
            <Button size="sm" variant="outline" onClick={stop} disabled={state === "launching"}>
              {state === "launching" ? "…" : t("redisLauncherStop", "Stop")}
            </Button>
          ) : (
            <Button size="sm" onClick={launch} disabled={state === "launching"}>
              {state === "launching"
                ? t("redisLauncherLaunching", "Launching…")
                : t("redisLauncherLaunch", "Launch Redis")}
            </Button>
          )}
        </div>
      </div>

      {status && (
        <dl className="mt-4 grid grid-cols-1 gap-3 text-sm md:grid-cols-3">
          <Stat
            label={t("redisLauncherContainer", "Container")}
            value={status.exists ? "present" : "missing"}
            tone={status.exists ? "ok" : "warn"}
          />
          <Stat
            label={t("redisLauncherRunning", "Running")}
            value={status.running ? "yes" : "no"}
            tone={status.running ? "ok" : "warn"}
          />
          <Stat
            label={t("redisLauncherReachable", "Reachable")}
            value={status.reachable ? "yes" : "no"}
            tone={status.reachable ? "ok" : "warn"}
          />
        </dl>
      )}

      {error && (
        <p className="mt-3 text-sm text-red-400">
          {t("redisLauncherError", "Error: {{message}}", { message: error })}
        </p>
      )}

      <p className="mt-3 text-xs text-text-muted">
        {t(
          "redisLauncherHint",
          "Equivalent to running `omniroute redis up`. The container is named `omniroute-redis` and listens on 127.0.0.1:6379."
        )}
      </p>
    </div>
  );
}

function Stat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "ok" | "warn";
}) {
  const color = tone === "ok" ? "text-emerald-400" : "text-amber-400";
  return (
    <div className="rounded-lg border border-border bg-bg-subtle p-3">
      <dt className="text-[10px] uppercase tracking-wide text-text-muted">{label}</dt>
      <dd className={`mt-1 font-mono text-sm ${color}`}>{value}</dd>
    </div>
  );
}
"use client";

import { Card } from "@/shared/components";
import { useTranslations } from "next-intl";
import { cn } from "@/shared/utils/cn";
import { useServiceStatus } from "../hooks/useServiceStatus";

function StateDot({ state, health }: { state: string; health: string }) {
  const color =
    state === "running" && health === "ok"
      ? "bg-green-500"
      : state === "running"
        ? "bg-yellow-500"
        : state === "starting"
          ? "bg-blue-400 animate-pulse"
          : state === "error"
            ? "bg-red-500"
            : "bg-border";

  return <span className={cn("inline-block size-2 rounded-full shrink-0", color)} />;
}

interface ServiceStatusCardProps {
  name: string;
}

export function ServiceStatusCard({ name }: ServiceStatusCardProps) {
  const t = useTranslations("embeddedServices");
  const { data, isLoading, error } = useServiceStatus(name);

  if (isLoading && !data) {
    return (
      <Card padding="md">
        <div className="h-20 animate-pulse bg-bg-subtle rounded" />
      </Card>
    );
  }

  if (error && !data) {
    return (
      <Card padding="md">
        <p className="text-xs text-red-500">{error}</p>
      </Card>
    );
  }

  if (!data) return null;

  const stateKey =
    {
      running: "stateRunning",
      stopped: "stateStopped",
      starting: "stateStarting",
      stopping: "stateStopping",
      error: "stateError",
      not_installed: "stateNotInstalled",
      unknown: "stateUnknown",
    }[data.state] ?? "stateUnknown";

  return (
    <Card padding="md">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-2 min-w-0">
          <StateDot state={data.state} health={data.health} />
          <div className="min-w-0">
            <p className="text-sm font-medium">{t(stateKey)}</p>
            <p className="text-xs text-text-muted truncate">
              {t("port", { port: data.port })}
              {data.pid ? ` · PID ${data.pid}` : ""}
            </p>
          </div>
        </div>

        {data.installedVersion && (
          <div className="text-right shrink-0">
            <p className="text-xs font-mono text-text-muted">v{data.installedVersion}</p>
            {data.updateAvailable && data.latestVersion && (
              <p className="text-xs text-yellow-600 dark:text-yellow-400">
                → v{data.latestVersion}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Adopted-process note — English literal, not an i18n key; see
          AutoRestartAdoptedToggle.tsx's header comment for why. */}
      {data.adopted && (
        <p className="mt-2 text-xs text-yellow-600 dark:text-yellow-400 flex items-start gap-1">
          <span className="material-symbols-outlined text-[14px] shrink-0 mt-0.5">info</span>
          <span>
            This process was adopted from an already-running instance, not started by this
            supervisor — live log tailing isn&apos;t available until you restart it (Stop, then
            Start), or turn on Auto-restart adopted process below.
          </span>
        </p>
      )}

      {data.lastError && <p className="mt-2 text-xs text-red-500 break-words">{data.lastError}</p>}
    </Card>
  );
}

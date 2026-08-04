"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/shared/components";
import { useServiceStatus } from "../hooks/useServiceStatus";

interface ServiceLifecycleButtonsProps {
  name: string;
}

type Action = "start" | "stop" | "restart" | "update" | "install";

export function ServiceLifecycleButtons({ name }: ServiceLifecycleButtonsProps) {
  const t = useTranslations("embeddedServices");
  const { data, mutate } = useServiceStatus(name);
  const [pending, setPending] = useState<Action | null>(null);
  const [error, setError] = useState<string | null>(null);

  const running = data?.state === "running";
  const starting = data?.state === "starting";
  const notInstalled = !data?.installedVersion;
  const busy = pending !== null || starting;

  async function action(verb: Action) {
    setPending(verb);
    setError(null);
    try {
      const res = await fetch(`/api/services/${name}/${verb}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      if (!res.ok) {
        const payload = (await res.json().catch(() => null)) as {
          error?: { message?: string };
        } | null;
        throw new Error(payload?.error?.message || `HTTP ${res.status}`);
      }
      mutate();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setPending(null);
    }
  }

  if (notInstalled) {
    return <LifecycleButtonGroup error={error} />;
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        <Button size="sm" disabled={busy || running} onClick={() => action("start")}>
          {pending === "start" ? t("starting") : t("start")}
        </Button>
        <Button
          size="sm"
          variant="outline"
          disabled={busy || !running}
          onClick={() => action("stop")}
        >
          {pending === "stop" ? t("stopping") : t("stop")}
        </Button>
        <Button
          size="sm"
          variant="outline"
          disabled={busy || !running}
          onClick={() => action("restart")}
        >
          {pending === "restart" ? t("restarting") : t("restart")}
        </Button>
        <Button size="sm" variant="outline" disabled={busy} onClick={() => action("update")}>
          {pending === "update" ? t("updating") : t("update")}
        </Button>
      </div>
      {error && <p className="text-xs text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );

  function LifecycleButtonGroup({ error }: { error: string | null }) {
    return (
      <div className="space-y-2">
        <Button size="sm" disabled={busy} onClick={() => action("install")}>
          {pending === "install" ? t("installing") : t("install")}
        </Button>
        {error && <p className="text-xs text-red-600 dark:text-red-400">{error}</p>}
      </div>
    );
  }
}

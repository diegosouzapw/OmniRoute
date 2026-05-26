"use client";

import { useState } from "react";
import { Button } from "@/shared/components";
import { useServiceStatus } from "../hooks/useServiceStatus";

interface ServiceLifecycleButtonsProps {
  name: string;
}

type Action = "start" | "stop" | "restart" | "update" | "install";

export function ServiceLifecycleButtons({ name }: ServiceLifecycleButtonsProps) {
  const { data, mutate } = useServiceStatus(name);
  const [pending, setPending] = useState<Action | null>(null);

  const running = data?.state === "running";
  const starting = data?.state === "starting";
  const notInstalled = !data?.installedVersion;
  const busy = pending !== null || starting;

  async function action(verb: Action) {
    setPending(verb);
    try {
      await fetch(`/api/services/${name}/${verb}`, { method: "POST" });
      mutate();
    } finally {
      setPending(null);
    }
  }

  if (notInstalled) {
    return (
      <Button size="sm" disabled={busy} onClick={() => action("install")}>
        {pending === "install" ? "Installing…" : "Install"}
      </Button>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button size="sm" disabled={busy || running} onClick={() => action("start")}>
        {pending === "start" ? "Starting…" : "Start"}
      </Button>
      <Button
        size="sm"
        variant="outline"
        disabled={busy || !running}
        onClick={() => action("stop")}
      >
        {pending === "stop" ? "Stopping…" : "Stop"}
      </Button>
      <Button
        size="sm"
        variant="outline"
        disabled={busy || !running}
        onClick={() => action("restart")}
      >
        {pending === "restart" ? "Restarting…" : "Restart"}
      </Button>
      <Button size="sm" variant="outline" disabled={busy} onClick={() => action("update")}>
        {pending === "update" ? "Updating…" : "Update"}
      </Button>
    </div>
  );
}

"use client";

/**
 * Toggle for "auto-restart an adopted process." When a supervisor's
 * probeBeforeSpawn finds a healthy instance already on its port, it adopts
 * that process rather than spawning a new one — but an adopted process has
 * no piped stdout/stderr (nothing was ever spawned to pipe from), so the
 * Logs panel stays empty for its whole lifetime. Enabling this immediately
 * kills an adopted process and spawns a fresh one this supervisor actually
 * owns, trading one restart for working log capture. Off by default —
 * killing a process the operator didn't ask to be killed should be opt-in.
 *
 * English literals used inline rather than i18n keys — mirrors the same
 * choice in DarioAccountPanel.tsx (avoids a translation-drift gate for a
 * single new control; see that file's header comment for the precedent).
 */

import { useState } from "react";
import { Card, Toggle } from "@/shared/components";
import { useServiceStatus } from "../hooks/useServiceStatus";

interface AutoRestartAdoptedToggleProps {
  name: string;
}

export function AutoRestartAdoptedToggle({ name }: AutoRestartAdoptedToggleProps) {
  const { data, mutate } = useServiceStatus(name);
  const [pending, setPending] = useState(false);

  async function handleToggle(enabled: boolean) {
    setPending(true);
    try {
      await fetch(`/api/services/${name}/auto-restart-adopted`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enabled }),
      });
      mutate();
    } finally {
      setPending(false);
    }
  }

  return (
    <Card padding="md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium">Auto-restart adopted process</p>
          <p className="text-xs text-text-muted mt-0.5">
            If this service is found already running (adopted instead of started fresh), kill and
            restart it automatically so logs can be captured. Off by default.
          </p>
        </div>
        <Toggle
          checked={data?.autoRestartAdopted ?? false}
          onChange={handleToggle}
          disabled={pending || !data}
        />
      </div>
    </Card>
  );
}

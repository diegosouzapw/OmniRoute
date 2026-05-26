"use client";

import { useState } from "react";
import { Card, Toggle } from "@/shared/components";
import { useServiceStatus } from "../hooks/useServiceStatus";

interface AutoStartToggleProps {
  name: string;
  label?: string;
  description?: string;
}

export function AutoStartToggle({ name, label, description }: AutoStartToggleProps) {
  const { data, mutate } = useServiceStatus(name);
  const [pending, setPending] = useState(false);

  const displayLabel = label ?? "Auto-start";
  const displayDescription = description ?? `Launch ${name} automatically when OmniRoute starts`;

  async function handleToggle(enabled: boolean) {
    setPending(true);
    try {
      await fetch(`/api/services/${name}/auto-start`, {
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
          <p className="text-sm font-medium">{displayLabel}</p>
          <p className="text-xs text-text-muted mt-0.5">{displayDescription}</p>
        </div>
        <Toggle
          checked={data?.autoStart ?? false}
          onChange={handleToggle}
          disabled={pending || !data}
        />
      </div>
    </Card>
  );
}

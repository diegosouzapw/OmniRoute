"use client";

import { useState } from "react";
import { Card, Button } from "@/shared/components";
import { useServiceStatus } from "../hooks/useServiceStatus";

interface ApiKeyFieldProps {
  name: string;
  serviceLabel?: string;
}

export function ApiKeyField({ name, serviceLabel }: ApiKeyFieldProps) {
  const { data, mutate } = useServiceStatus(name);
  const [pending, setPending] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const label = serviceLabel ?? name;

  async function rotateKey() {
    setPending(true);
    setMsg(null);
    try {
      const res = await fetch(`/api/services/${name}/rotate-key`, { method: "POST" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setMsg({ ok: true, text: `Key rotated — ${label} restarted to apply the new key` });
      mutate();
    } catch {
      setMsg({ ok: false, text: "Failed to rotate key" });
    } finally {
      setPending(false);
    }
  }

  return (
    <Card padding="md">
      <div className="flex items-center gap-3 mb-3">
        <div className="size-8 rounded-lg flex items-center justify-center bg-amber-500/10">
          <span className="material-symbols-outlined text-amber-500 text-xl">key</span>
        </div>
        <div>
          <h3 className="font-medium text-sm">API Key</h3>
          <p className="text-xs text-text-muted">
            Key used by OmniRoute to authenticate with {label}
          </p>
        </div>
      </div>

      {msg && (
        <div
          className={`flex items-center gap-1.5 mb-3 px-2 py-1.5 rounded text-xs ${
            msg.ok
              ? "bg-green-500/10 text-green-600 dark:text-green-400"
              : "bg-red-500/10 text-red-600 dark:text-red-400"
          }`}
        >
          <span className="material-symbols-outlined text-[12px]">
            {msg.ok ? "check_circle" : "error"}
          </span>
          {msg.text}
        </div>
      )}

      <div className="flex items-center gap-3">
        <code className="flex-1 truncate text-xs font-mono bg-bg-subtle px-2 py-1.5 rounded text-text-muted">
          {data?.apiKeyMasked ?? "—"}
        </code>
        <Button
          variant="secondary"
          size="sm"
          onClick={rotateKey}
          disabled={pending || !data?.installedVersion}
          className="shrink-0"
        >
          {pending ? "Rotating…" : "Rotate key"}
        </Button>
      </div>
    </Card>
  );
}

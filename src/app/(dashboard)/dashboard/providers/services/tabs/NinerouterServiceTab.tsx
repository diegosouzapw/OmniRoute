"use client";

import { useState } from "react";
import { Card, Toggle, Button } from "@/shared/components";
import { ServiceStatusCard } from "../components/ServiceStatusCard";
import { ServiceLifecycleButtons } from "../components/ServiceLifecycleButtons";
import { ServiceLogsPanel } from "../components/ServiceLogsPanel";
import { NinerouterInstallWizard } from "../components/NinerouterInstallWizard";
import { NinerouterProviderExposureCard } from "../components/NinerouterProviderExposureCard";
import { NinerouterModelList } from "../components/NinerouterModelList";
import { useServiceStatus } from "../hooks/useServiceStatus";

const NAME = "9router";

function AutoStartCard() {
  const { data, mutate } = useServiceStatus(NAME);
  const [pending, setPending] = useState(false);

  async function handleToggle(enabled: boolean) {
    setPending(true);
    try {
      await fetch(`/api/services/${NAME}/auto-start`, {
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
          <p className="text-sm font-medium">Auto-start</p>
          <p className="text-xs text-text-muted mt-0.5">
            Launch 9Router automatically when OmniRoute starts
          </p>
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

function ApiKeyCard() {
  const { data, mutate } = useServiceStatus(NAME);
  const [pending, setPending] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  async function rotateKey() {
    setPending(true);
    setMsg(null);
    try {
      const res = await fetch(`/api/services/${NAME}/rotate-key`, { method: "POST" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setMsg({ ok: true, text: "Key rotated — 9Router restarted to apply the new key" });
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
            Key used by OmniRoute to authenticate with 9Router
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

/**
 * G-10: iframe now points to our reverse proxy, NOT directly to 127.0.0.1:port.
 * CSP exception (`frame-ancestors 'self'`) is applied to this proxy path in next.config.mjs.
 */
function EmbeddedUiCard() {
  const { data } = useServiceStatus(NAME);
  const [expanded, setExpanded] = useState(false);

  const isRunning = data?.state === "running";

  if (!isRunning) return null;

  return (
    <Card padding="none" className="overflow-hidden">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium hover:bg-bg-subtle transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[16px] text-text-muted">web</span>
          9Router Web UI
          <a
            href="/dashboard/providers/services/9router/embed/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-normal text-primary hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            open in new tab
          </a>
        </div>
        <span className="material-symbols-outlined text-[16px] text-text-muted">
          {expanded ? "expand_less" : "expand_more"}
        </span>
      </button>

      {expanded && (
        <iframe
          src="/dashboard/providers/services/9router/embed/"
          title="9Router Web UI"
          className="h-[600px] w-full border-t border-border"
          sandbox="allow-scripts allow-same-origin allow-forms"
        />
      )}
    </Card>
  );
}

export function NinerouterServiceTab() {
  const { data } = useServiceStatus(NAME);

  // Show only the install wizard when not yet installed.
  if (data?.state === "not_installed") {
    return (
      <div className="space-y-4">
        <NinerouterInstallWizard />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <ServiceStatusCard name={NAME} />
      <ServiceLifecycleButtons name={NAME} />
      <AutoStartCard />
      <ApiKeyCard />
      <NinerouterProviderExposureCard />
      <NinerouterModelList />
      <EmbeddedUiCard />
      <ServiceLogsPanel name={NAME} />
    </div>
  );
}

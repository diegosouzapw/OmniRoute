"use client";

import { useState, useEffect, useRef } from "react";
import { Card, Button, ConfirmModal } from "@/shared/components";
import { useServiceStatus } from "../hooks/useServiceStatus";

interface ApiKeyFieldProps {
  name: string;
  serviceLabel?: string;
  showReveal?: boolean;
}

export function ApiKeyField({ name, serviceLabel, showReveal = false }: ApiKeyFieldProps) {
  const { data, mutate } = useServiceStatus(name);
  const [pending, setPending] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  // Reveal state
  const [revealModalOpen, setRevealModalOpen] = useState(false);
  const [revealPending, setRevealPending] = useState(false);
  const [plainKey, setPlainKey] = useState<string | null>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const label = serviceLabel ?? name;

  // Auto-hide plain key after 30s
  useEffect(() => {
    if (plainKey) {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      hideTimerRef.current = setTimeout(() => {
        setPlainKey(null);
      }, 30_000);
    }
    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, [plainKey]);

  async function rotateKey() {
    setPending(true);
    setMsg(null);
    setPlainKey(null);
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

  async function confirmReveal() {
    setRevealPending(true);
    try {
      const res = await fetch(`/api/services/${name}/status?reveal=key`, {
        headers: { "X-Reveal-Confirm": "yes" },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const body = await res.json();
      if (typeof body.apiKeyPlain === "string") {
        setPlainKey(body.apiKeyPlain);
        setMsg(null);
      } else {
        setMsg({ ok: false, text: "Reveal failed: key not returned" });
      }
    } catch {
      setMsg({ ok: false, text: "Failed to reveal key" });
    } finally {
      setRevealPending(false);
      setRevealModalOpen(false);
    }
  }

  return (
    <>
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
            {plainKey ?? data?.apiKeyMasked ?? "—"}
          </code>
          {showReveal && !plainKey && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setRevealModalOpen(true)}
              disabled={revealPending || !data?.installedVersion}
              className="shrink-0"
            >
              Reveal
            </Button>
          )}
          {plainKey && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setPlainKey(null)}
              className="shrink-0"
            >
              Hide
            </Button>
          )}
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

        {plainKey && (
          <p className="mt-2 text-[11px] text-text-muted">
            Key will be hidden automatically in 30 seconds.
          </p>
        )}
      </Card>

      {showReveal && (
        <ConfirmModal
          isOpen={revealModalOpen}
          onClose={() => setRevealModalOpen(false)}
          onConfirm={confirmReveal}
          title="Reveal API Key"
          message="Revealing the API key will be logged in the audit trail. Continue?"
          confirmText={revealPending ? "Revealing…" : "Reveal"}
          cancelText="Cancel"
          variant="secondary"
          loading={revealPending}
        />
      )}
    </>
  );
}

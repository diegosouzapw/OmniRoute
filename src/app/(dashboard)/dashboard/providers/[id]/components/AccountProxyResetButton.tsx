"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import Button from "@/shared/components/Button";
import { ConfirmModal } from "@/shared/components/Modal";
import { useNotificationStore } from "@/store/notificationStore";

type Props = {
  connectionIds: string[];
  disabled?: boolean;
  onReset: () => Promise<void>;
};

export default function AccountProxyResetButton({ connectionIds, disabled, onReset }: Props) {
  const t = useTranslations("providers");
  const notify = useNotificationStore();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const inFlight = useRef(false);

  async function reset() {
    if (inFlight.current || disabled || connectionIds.length === 0) return;
    inFlight.current = true;
    setBusy(true);
    let failed = 0;
    try {
      for (const id of new Set(connectionIds)) {
        try {
          const assignment = await fetch("/api/settings/proxies/assignments", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ scope: "account", scopeId: id, proxyId: null }),
          });
          if (!assignment.ok) throw new Error("Assignment removal failed");
          const legacy = await fetch(
            `/api/settings/proxy?${new URLSearchParams({ level: "key", id })}`,
            { method: "DELETE" }
          );
          if (!legacy.ok) throw new Error("Legacy proxy removal failed");
          const connection = await fetch(`/api/providers/${encodeURIComponent(id)}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ perKeyProxyEnabled: false }),
          });
          if (!connection.ok) throw new Error("Account proxy toggle update failed");
        } catch {
          failed++;
        }
      }
      // Re-read actual state even after a partial failure.
      await onReset();
      if (failed) {
        notify.error(t("clearAccountProxiesPartial", { count: failed }));
      } else {
        notify.success(t("accountProxiesCleared"));
        setConfirmOpen(false);
      }
    } catch {
      notify.error(t("clearAccountProxiesError"));
    } finally {
      inFlight.current = false;
      setBusy(false);
    }
  }

  return (
    <>
      <Button
        size="sm"
        variant="secondary"
        icon="link_off"
        disabled={disabled || busy || connectionIds.length === 0}
        onClick={() => setConfirmOpen(true)}
      >
        {t("clearAccountProxies")}
      </Button>
      <ConfirmModal
        isOpen={confirmOpen}
        onClose={() => {
          if (!busy) setConfirmOpen(false);
        }}
        onConfirm={reset}
        title={t("clearAccountProxies")}
        message={t("clearAccountProxiesConfirm", { count: connectionIds.length })}
        confirmText={t("clearAccountProxyAssignments")}
        loading={busy}
      />
    </>
  );
}

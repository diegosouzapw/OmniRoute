"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Button, Card, ConfirmModal } from "@/shared/components";
import { useNotificationStore } from "@/store/notificationStore";
import type { DeprecatedProviderLeftoverGroup } from "@/lib/providers/deprecatedProviderCleanup";

type ProviderMessageTranslator = ((
  key: string,
  values?: Record<string, unknown>
) => string) & {
  has?: (key: string) => boolean;
};

function providerText(
  t: ProviderMessageTranslator,
  key: string,
  fallback: string,
  values?: Record<string, unknown>
): string {
  if (typeof t.has === "function" && t.has(key)) {
    return t(key, values);
  }
  if (values) {
    return Object.entries(values).reduce(
      (acc, [name, value]) => acc.replaceAll(`{${name}}`, String(value)),
      fallback
    );
  }
  return fallback;
}


export default function DeprecatedProviderBanner() {
  const t = useTranslations("providers") as ProviderMessageTranslator;
  const notify = useNotificationStore();
  const [leftovers, setLeftovers] = useState<DeprecatedProviderLeftoverGroup[]>([]);
  const [dismissed, setDismissed] = useState<Record<string, boolean>>({});
  const [pending, setPending] = useState<DeprecatedProviderLeftoverGroup | null>(null);
  const [purging, setPurging] = useState(false);

  useEffect(() => {
    let cancelled = false;
    void fetch("/api/providers/deprecated", { credentials: "same-origin" })
      .then((res) => (res.ok ? res.json() : { leftovers: [] }))
      .then((body: { leftovers?: DeprecatedProviderLeftoverGroup[] }) => {
        if (cancelled) return;
        setLeftovers(Array.isArray(body?.leftovers) ? body.leftovers : []);
      })
      .catch(() => {
        if (!cancelled) setLeftovers([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const visible = leftovers.filter((row) => !dismissed[row.provider]);
  if (visible.length === 0) return null;

  async function purge(provider: string) {
    setPurging(true);
    try {
      const res = await fetch("/api/providers/deprecated", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ provider }),
      });
      if (res.ok) {
        setLeftovers((prev) => prev.filter((row) => row.provider !== provider));
        notify.success(
          providerText(t, "purgeLeftoversSuccess", "Leftover connections removed.")
        );
      } else {
        notify.error(
          providerText(t, "purgeLeftoversFailed", "Failed to purge leftover connections.")
        );
      }
    } catch {
      notify.error(
        providerText(t, "purgeLeftoversFailed", "Failed to purge leftover connections.")
      );
    } finally {
      setPurging(false);
      setPending(null);
    }
  }

  return (
    <>
      {visible.map((row) => {
        const n = row.connectionIds.length;
        return (
          <Card key={row.provider} padding="lg">
            <p className="text-sm text-text-main">
              {providerText(
                t,
                "deprecatedProviderLeftover",
                "Provider {name} was removed from OmniRoute. {n} leftover connection(s) are still in the database and cannot be opened from a card. Re-add the account under {migrateTo}, then remove leftovers.",
                { name: row.provider, n, migrateTo: row.migrateTo }
              )}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Button variant="danger" size="sm" onClick={() => setPending(row)}>
                {providerText(t, "purgeLeftovers", "Purge leftovers")}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  setDismissed((prev) => ({ ...prev, [row.provider]: true }))
                }
              >
                {providerText(t, "dismissForSession", "Dismiss for this session")}
              </Button>
            </div>
          </Card>
        );
      })}
      <ConfirmModal
        isOpen={pending !== null}
        onClose={() => setPending(null)}
        onConfirm={() => {
          if (pending) return purge(pending.provider);
        }}
        title={providerText(t, "purgeLeftovers", "Purge leftovers")}
        message={
          pending
            ? providerText(
                t,
                "purgeLeftoversConfirm",
                "Remove {n} leftover {name} connection(s)? This cannot be undone.",
                { name: pending.provider, n: pending.connectionIds.length }
              )
            : ""
        }
        confirmText={providerText(t, "purgeLeftovers", "Purge leftovers")}
        cancelText={providerText(t, "cancel", "Cancel")}
        loading={purging}
      />
    </>
  );
}

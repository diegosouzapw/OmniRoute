"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button } from "@/shared/components";
import { useNotificationStore } from "@/store/notificationStore";
import {
  countKeysAllowing,
  getComboAccess,
  getModelAccess,
  type AccessKind,
} from "./keyAccessAssignUtils";
import type { ApiKeyAccessIndex } from "./useApiKeyAccessIndex";

export default function CatalogKeyAccessButton({
  kind,
  id,
  index,
}: {
  kind: AccessKind;
  id: string;
  index: ApiKeyAccessIndex;
}) {
  const t = useTranslations("modelCatalog");
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState<string | null>(null);
  const container = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (event: MouseEvent) => {
      if (!container.current?.contains(event.target as Node)) setOpen(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", escape);
    };
  }, [open]);
  return (
    <div ref={container} className="relative">
      <button
        ref={trigger}
        type="button"
        data-testid={`key-access-${kind}-${id}`}
        aria-expanded={open}
        className="rounded px-2 py-1 text-xs text-primary hover:bg-primary/10"
        onClick={() => {
          setOpen(!open);
          void index.ensureLoaded();
        }}
      >
        {index.keys.length
          ? t("allowedInKeys", { count: countKeysAllowing(index.keys, kind, id) })
          : t("keyAccessButton")}
      </button>
      {open && (
        <div className="absolute right-0 z-30 max-h-80 w-80 overflow-auto rounded-lg border border-border bg-surface p-3 shadow-xl">
          {index.loading && <p>{t("keysLoading")}</p>}
          {index.error && <Button onClick={() => void index.refresh()}>{t("keysRetry")}</Button>}
          {index.keys.map((key) => {
            const access = kind === "models" ? getModelAccess(key, id) : getComboAccess(key, id);
            const disabled = access.via === "all" || access.via === "pattern" || pending !== null;
            return (
              <div
                key={key.id}
                data-testid={`key-access-row-${key.id}`}
                className="flex items-center justify-between gap-2 border-b border-border py-2"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm">{key.name}</p>
                  {access.via === "pattern" && (
                    <p className="text-xs text-text-muted">
                      {t("accessViaPattern", { pattern: access.pattern! })}
                    </p>
                  )}
                  {access.via === "all" && (
                    <Link
                      className="text-xs text-primary"
                      href={`/dashboard/api-manager/${encodeURIComponent(key.id)}/access`}
                    >
                      {t("editKeyAccess")}
                    </Link>
                  )}
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={access.allowed}
                  aria-label={t("toggleKeyAccess", { item: id, name: key.name })}
                  disabled={disabled}
                  className="rounded border border-border px-3 py-1 text-sm disabled:opacity-50"
                  onClick={async () => {
                    setPending(key.id);
                    const outcome = await index.toggle(key, kind, id, !access.allowed);
                    setPending(null);
                    if (outcome.status === "error" || outcome.status === "needs_switch")
                      useNotificationStore
                        .getState()
                        .error(outcome.message || t("resultNetworkError"));
                  }}
                >
                  {access.allowed ? "✓" : "−"}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

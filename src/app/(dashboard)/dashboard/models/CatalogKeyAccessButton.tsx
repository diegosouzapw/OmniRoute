"use client";

import { useEffect, useId, useRef, useState, type RefObject } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button } from "@/shared/components";
import { useNotificationStore } from "@/store/notificationStore";
import {
  countKeysAllowing,
  getComboAccess,
  getModelAccess,
  isKeyUsable,
  planKeyAssignment,
  type AccessKey,
  type AccessKind,
} from "./keyAccessAssignUtils";
import type { ApiKeyAccessIndex } from "./useApiKeyAccessIndex";

const POPOVER_WIDTH = 320;
const POPOVER_MAX_HEIGHT = 320;
const GAP = 4;

type PopoverPosition = { top?: number; bottom?: number; right: number };

/** Fixed coordinates next to the trigger, so the table's scroll container cannot clip it. */
function popoverPosition(trigger: HTMLElement): PopoverPosition {
  const rect = trigger.getBoundingClientRect();
  const right = Math.max(
    GAP,
    Math.min(window.innerWidth - rect.right, window.innerWidth - POPOVER_WIDTH - GAP)
  );
  const fitsBelow = rect.bottom + GAP + POPOVER_MAX_HEIGHT <= window.innerHeight;
  return fitsBelow || rect.top < POPOVER_MAX_HEIGHT
    ? { top: rect.bottom + GAP, right }
    : { bottom: window.innerHeight - rect.top + GAP, right };
}

function isInside(refs: RefObject<HTMLElement | null>[], node: EventTarget | null): boolean {
  return node instanceof Node && refs.some((ref) => ref.current?.contains(node));
}

function KeyAccessRow({
  accessKey,
  kind,
  id,
  providerId,
  index,
}: {
  accessKey: AccessKey;
  kind: AccessKind;
  id: string;
  providerId?: string;
  index: ApiKeyAccessIndex;
}) {
  const t = useTranslations("modelCatalog");
  const access =
    kind === "models" ? getModelAccess(accessKey, id, providerId) : getComboAccess(accessKey, id);
  const lastItem =
    access.via === "exact" &&
    planKeyAssignment({ key: accessKey, kind, action: "remove", items: [id], switchOptIn: false })
      .type === "skip";
  const hint =
    access.via === "pattern"
      ? t("accessViaPattern", { pattern: access.pattern ?? "" })
      : access.via === "blocked"
        ? t("accessBlocked", { pattern: access.pattern ?? "" })
        : lastItem
          ? t(kind === "models" ? "resultWouldEmptyModels" : "resultWouldEmptyCombos")
          : null;
  const disabled = access.via === "all" || access.via === "pattern" || access.via === "blocked";
  const pending = index.pendingKeys.has(accessKey.id);
  const toggle = async () => {
    const outcome = await index.toggle(accessKey, kind, id, !access.allowed);
    const notify = useNotificationStore.getState();
    if (outcome.reason === "pending") notify.info(t("keyUpdatePending", { name: accessKey.name }));
    else if (outcome.status === "error" || outcome.status === "needs_switch")
      notify.error(outcome.message || t("resultNetworkError"));
  };
  return (
    <div
      data-testid={`key-access-row-${accessKey.id}`}
      className="flex items-center justify-between gap-2 border-b border-border py-2"
    >
      <div className="min-w-0">
        <p className="truncate text-sm">{accessKey.name}</p>
        {hint && <p className="text-xs text-text-muted">{hint}</p>}
        {(access.via === "all" || access.via === "blocked" || lastItem) && (
          <Link
            className="text-xs text-primary"
            href={`/dashboard/api-manager/${encodeURIComponent(accessKey.id)}/access`}
          >
            {t("editKeyAccess")}
          </Link>
        )}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={access.allowed}
        aria-label={t("toggleKeyAccess", { item: id, name: accessKey.name })}
        aria-busy={pending || undefined}
        title={hint ?? undefined}
        disabled={disabled || lastItem}
        className="rounded border border-border px-3 py-1 text-sm disabled:opacity-50 aria-busy:opacity-60"
        onClick={() => void toggle()}
      >
        {access.allowed ? "✓" : "−"}
      </button>
    </div>
  );
}

export default function CatalogKeyAccessButton({
  kind,
  id,
  providerId,
  index,
}: {
  kind: AccessKind;
  id: string;
  providerId?: string;
  index: ApiKeyAccessIndex;
}) {
  const t = useTranslations("modelCatalog");
  const cliTools = useTranslations("cliTools");
  const popoverId = useId();
  const [position, setPosition] = useState<PopoverPosition | null>(null);
  const open = position !== null;
  const container = useRef<HTMLDivElement>(null);
  const popover = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (event: MouseEvent) => {
      if (!isInside([container, popover], event.target)) setPosition(null);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setPosition(null);
        trigger.current?.focus();
      }
    };
    const follow = () => {
      if (trigger.current) setPosition(popoverPosition(trigger.current));
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", escape);
    window.addEventListener("resize", follow);
    window.addEventListener("scroll", follow, true);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", escape);
      window.removeEventListener("resize", follow);
      window.removeEventListener("scroll", follow, true);
    };
  }, [open]);
  const now = index.checkedAt;
  const usableKeys = index.keys.filter((key) => isKeyUsable(key, now));
  return (
    // React forwards focus events from the portal, so focus leaving both parts closes it.
    <div
      ref={container}
      className="relative inline-block"
      onBlur={(event) => {
        if (open && !isInside([container, popover], event.relatedTarget)) setPosition(null);
      }}
    >
      <button
        ref={trigger}
        type="button"
        data-testid={`key-access-${kind}-${id}`}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? popoverId : undefined}
        className="rounded px-2 py-1 text-xs text-primary hover:bg-primary/10"
        onClick={() => {
          setPosition(open || !trigger.current ? null : popoverPosition(trigger.current));
          void index.ensureLoaded();
        }}
      >
        {index.keys.length
          ? t("allowedInKeys", {
              count: countKeysAllowing(index.keys, kind, id, providerId, now),
            })
          : t("keyAccessButton")}
      </button>
      {open &&
        createPortal(
          <div
            ref={popover}
            id={popoverId}
            role="dialog"
            aria-label={t("keyAccessButton")}
            tabIndex={-1}
            style={{
              position: "fixed",
              ...position,
              width: POPOVER_WIDTH,
              maxHeight: POPOVER_MAX_HEIGHT,
            }}
            className="z-40 overflow-auto rounded-lg border border-border bg-surface p-3 text-left shadow-xl"
          >
            {index.loading && <p className="text-sm text-text-muted">{t("keysLoading")}</p>}
            {index.error && <Button onClick={() => void index.refresh()}>{t("keysRetry")}</Button>}
            {!index.loading && !index.error && usableKeys.length === 0 && (
              <p className="text-sm text-text-muted">{cliTools("noApiKeysAvailable")}</p>
            )}
            {usableKeys.map((key) => (
              <KeyAccessRow
                key={key.id}
                accessKey={key}
                kind={kind}
                id={id}
                providerId={providerId}
                index={index}
              />
            ))}
          </div>,
          document.body
        )}
    </div>
  );
}

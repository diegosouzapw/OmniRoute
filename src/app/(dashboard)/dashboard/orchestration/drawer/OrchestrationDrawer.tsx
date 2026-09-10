"use client";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { StatusDot } from "@/shared/components/flow/StatusDot";
import { orchStateColor, type OrchNode, type OrchState } from "../model/orchestrationTypes";
import { useDrawerDetail } from "./useDrawerDetail";
import type { DrawerError } from "./useDrawerDetail";
import type { CloudAgentTask } from "@/lib/cloudAgent/types";
import type { A2ATask } from "@/lib/a2a/taskManager";

const TOAST_MS = 2500;
const REPEAT_CONFIRM_MS = 3000;

/** Timeline normalized by source — the same data the Timeline component displays. */
function normalizedTimeline(node: OrchNode, detail: unknown): unknown {
  if (node.source === "cloud-agent") return (detail as CloudAgentTask | null)?.activities ?? [];
  if (node.source === "a2a") return (detail as A2ATask | null)?.events ?? [];
  return null; // conductor/overflow: the raw payload already is the trace
}

/** Builds the copy-to-clipboard JSON payload for the drawer's "copy trace" action. */
export function buildTraceJson(node: OrchNode, detail: unknown): string {
  return JSON.stringify(
    {
      node: { id: node.id, source: node.source, state: node.state, label: node.label },
      timeline: normalizedTimeline(node, detail),
      raw: detail ?? node.raw ?? null,
    },
    null,
    2
  );
}

type Translate = ReturnType<typeof useTranslations>;

const STATE_KEY: Record<OrchState, string> = {
  queued: "stateQueued",
  running: "stateRunning",
  waiting_approval: "stateWaitingApproval",
  succeeded: "stateSucceeded",
  failed: "stateFailed",
  cancelled: "stateCancelled",
};
const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

/**
 * `result.prUrl` is upstream-provider-controlled (Cloud Agent task result). Only
 * render it as a clickable `<a href>` when it's a plain http(s) URL — anything
 * else (e.g. `javascript:`) renders as inert text instead, so a malicious/buggy
 * provider response can never become a click-to-execute link (review r1 finding).
 */
function isHttpUrl(url: string | undefined): url is string {
  return !!url && /^https?:\/\//i.test(url);
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <div className="text-[10px] font-semibold uppercase text-muted mb-1">{title}</div>
      {children}
    </div>
  );
}

function Timeline({ node, detail }: { node: OrchNode; detail: unknown }) {
  if (node.source === "cloud-agent") {
    const t = detail as CloudAgentTask | null;
    return (
      <ol className="text-xs flex flex-col gap-1.5">
        {(t?.activities ?? []).map((a) => (
          <li key={a.id} className="flex gap-2">
            <code className="text-[9px] shrink-0 text-muted">{a.type}</code>
            <span className="break-words">{a.content}</span>
          </li>
        ))}
      </ol>
    );
  }
  if (node.source === "a2a") {
    const t = detail as A2ATask | null;
    return (
      <ol className="text-xs flex flex-col gap-1">
        {(t?.events ?? []).map((e, i) => (
          <li key={i}>
            <code className="text-[9px] text-muted mr-1">{e.state}</code>
            {e.message ?? e.timestamp}
          </li>
        ))}
      </ol>
    );
  }
  return (
    <pre className="text-[10px] bg-surface-muted rounded p-2 overflow-x-auto">
      {JSON.stringify(detail, null, 2)}
    </pre>
  );
}

/** Header row: status dot, label/source/state, copy-trace + close buttons. */
function DrawerHeader({
  node,
  detail,
  state,
  t,
  onClose,
  onToast,
}: {
  node: OrchNode;
  detail: unknown;
  state: OrchState;
  t: Translate;
  onClose: () => void;
  onToast: (text: string) => void;
}) {
  const copyTrace = async () => {
    try {
      await navigator.clipboard.writeText(buildTraceJson(node, detail));
      onToast(t("actionDone"));
    } catch {
      onToast(t("actionFailed", { error: "clipboard" }));
    }
  };
  return (
    <div className="flex items-center gap-2 mb-4">
      <StatusDot
        color={orchStateColor(state)}
        error={state === "failed"}
        pulse={state === "running"}
      />
      <div className="min-w-0">
        <div className="text-sm font-semibold truncate">{node.label}</div>
        <div className="text-[10px] text-muted">
          {node.source} · {t(STATE_KEY[state])}
        </div>
      </div>
      <button className="ml-auto text-muted" onClick={copyTrace} aria-label={t("copyTrace")}>
        ⧉
      </button>
      <button className="text-muted" onClick={onClose} aria-label={t("drawerClose")}>
        ✕
      </button>
    </div>
  );
}

/**
 * Narrows the loaded detail payload to the typed shape of the node's source — the
 * non-matching one is always `null`, so each section can read its own shape safely.
 */
function narrowDetail(
  node: OrchNode,
  detail: unknown
): { ca: CloudAgentTask | null; a2a: A2ATask | null } {
  return {
    ca: node.source === "cloud-agent" ? (detail as CloudAgentTask | null) : null,
    a2a: node.source === "a2a" ? (detail as A2ATask | null) : null,
  };
}

/** Objective section: the agent prompt / first A2A message, falling back to the node labels. */
function DrawerObjective({
  node,
  ca,
  a2a,
  t,
}: {
  node: OrchNode;
  ca: CloudAgentTask | null;
  a2a: A2ATask | null;
  t: Translate;
}) {
  return (
    <Section title={t("drawerObjective")}>
      <p className="text-xs break-words">
        {ca?.prompt ?? a2a?.input?.messages[0]?.content ?? node.sublabel ?? node.label}
      </p>
    </Section>
  );
}

/** Transient banners above the sections: toast, load/action error, loading placeholder. */
function DrawerBanners({
  toast,
  error,
  errorKind,
  isLoading,
  t,
}: {
  toast: string | null;
  error: string | null;
  errorKind: DrawerError["kind"] | null;
  isLoading: boolean;
  t: Translate;
}) {
  return (
    <>
      {toast && <div className="text-xs text-success mb-3">{toast}</div>}
      {error && (
        <div className="text-xs text-error mb-3">
          {t(errorKind === "detail" ? "detailFailed" : "actionFailed", { error })}
        </div>
      )}
      {isLoading && <div className="text-xs text-muted mb-3">…</div>}
    </>
  );
}

/** Cost/duration metrics section — omitted entirely when neither value is present. */
function DrawerMetrics({
  node,
  ca,
  t,
}: {
  node: OrchNode;
  ca: CloudAgentTask | null;
  t: Translate;
}) {
  if (node.cost == null && ca?.result?.duration == null) return null;
  return (
    <Section title={t("drawerMetrics")}>
      <p className="text-xs">
        {node.cost != null && usd.format(node.cost)}
        {ca?.result?.duration != null && ` · ${ca.result.duration}s`}
      </p>
    </Section>
  );
}

/** Result section: Cloud Agent PR link (sanitized, see `isHttpUrl`) + A2A artifacts. */
function DrawerResult({
  ca,
  a2a,
  t,
}: {
  ca: CloudAgentTask | null;
  a2a: A2ATask | null;
  t: Translate;
}) {
  const hasResult = !!ca?.result?.prUrl || (a2a?.artifacts?.length ?? 0) > 0;
  if (!hasResult) return null;
  return (
    <Section title={t("drawerResult")}>
      {ca?.result?.prUrl &&
        (isHttpUrl(ca.result.prUrl) ? (
          <a className="text-xs underline" href={ca.result.prUrl} target="_blank" rel="noreferrer">
            {ca.result.prUrl}
          </a>
        ) : (
          <span className="text-xs break-words">{ca.result.prUrl}</span>
        ))}
      {a2a?.artifacts?.map((art, i) => (
        <pre key={i} className="text-[10px] bg-surface-muted rounded p-2 mt-1 overflow-x-auto">
          {art.content}
        </pre>
      ))}
    </Section>
  );
}

/**
 * "Memory used" section (Task D4, PR-C): lists the memories consulted for an a2a task's
 * last user message (`task.metadata.memoryHits`, written by `collectMemoryHits` in
 * `src/lib/a2a/taskExecution.ts` — observability only, never injected into a skill's
 * behavior). `metadata` is caller-supplied and unvalidated end to end
 * (`src/app/a2a/route.ts` passes `params?.metadata` straight through, and
 * `collectMemoryHits` only overwrites it when it finds hits), so `memoryHits` cannot be
 * trusted at the `A2ATask` type — a malicious/buggy A2A client could post
 * `metadata: { memoryHits: "boom" }` (a string's `.length` is truthy, so a plain
 * `!hits || hits.length === 0` guard would let it through) or an array containing
 * malformed entries. Every entry is validated defensively before it is ever rendered, so a
 * bad payload silently drops that entry instead of crashing the drawer — and the check
 * covers ALL FOUR fields, not just `id`: `type`, `key` and `snippet` are rendered as React
 * children, so `{ id: "x", key: { a: 1 } }` (a validated id next to an object field) would
 * throw "Objects are not valid as a React child" and take the whole drawer down.
 */
const MEMORY_HIT_FIELDS = ["id", "key", "type", "snippet"] as const;

function DrawerMemory({ a2a, t }: { a2a: A2ATask | null; t: Translate }) {
  const raw = a2a?.metadata?.memoryHits;
  const hits = (Array.isArray(raw) ? raw : []).filter(
    (h): h is { id: string; key: string; type: string; snippet: string } =>
      !!h &&
      typeof h === "object" &&
      MEMORY_HIT_FIELDS.every((f) => typeof (h as Record<string, unknown>)[f] === "string")
  );
  if (hits.length === 0) return null;
  return (
    <Section title={t("drawerMemory")}>
      <ul className="text-xs flex flex-col gap-1.5">
        {hits.map((h) => (
          <li key={h.id}>
            <code className="text-[9px] text-muted mr-1">{h.type}</code>
            <span className="font-medium">{h.key}</span>
            <div className="text-[10px] text-muted break-words">{h.snippet}</div>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/**
 * Two-click confirm for a single non-idempotent action — deliberately NOT
 * `window.confirm`, since modal dialogs block browser automation. The first click
 * arms `confirming` for `REPEAT_CONFIRM_MS`; a second click within that window runs
 * `onConfirm`. The timer is cleared before it can fire again (a stale timeout must
 * never flip an already-fired confirmation back) and on unmount.
 */
function useTwoClickConfirm(onConfirm: () => void) {
  const [confirming, setConfirming] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = null;
  };

  const onClick = () => {
    if (confirming) {
      clearTimer();
      setConfirming(false);
      onConfirm();
      return;
    }
    setConfirming(true);
    timerRef.current = setTimeout(() => setConfirming(false), REPEAT_CONFIRM_MS);
  };

  useEffect(() => clearTimer, []);

  return { confirming, onClick };
}

/**
 * Repeat button: two-click confirm, disabled + tooltip when the input isn't recoverable.
 * `canRepeat` already folds in `!busy` (so the button is disabled while a repeat POST is
 * in flight), but the tooltip must not claim the input is unrecoverable in that case — a
 * successful repeat is legitimately busy, not unavailable. `busy` is threaded through
 * separately so the title can tell the two apart: silent (no title) while busy, the real
 * `repeatUnavailable` message only when the input truly can't be recovered.
 */
function RepeatButton({
  canRepeat,
  busy,
  repeat,
  onActionDone,
  onToast,
  t,
}: {
  canRepeat: boolean;
  busy: boolean;
  repeat: () => Promise<boolean>;
  onActionDone: () => void;
  onToast: (text: string) => void;
  t: Translate;
}) {
  const { confirming, onClick } = useTwoClickConfirm(() => {
    void (async () => {
      if (await repeat()) {
        onActionDone();
        onToast(t("repeatDone"));
      }
    })();
  });
  return (
    <button
      className="text-xs rounded border border-border px-2 py-1 disabled:opacity-50"
      onClick={onClick}
      disabled={!canRepeat}
      title={canRepeat || busy ? undefined : t("repeatUnavailable")}
    >
      {confirming ? t("repeatConfirm") : t("actionRepeat")}
    </button>
  );
}

/** Approve/cancel/repeat action buttons — omitted when none of them apply. */
function DrawerActions({
  canApprove,
  canCancel,
  showRepeat,
  canRepeat,
  busy,
  approve,
  cancel,
  repeat,
  onActionDone,
  onToast,
  t,
}: {
  canApprove: boolean;
  canCancel: boolean;
  showRepeat: boolean;
  canRepeat: boolean;
  busy: boolean;
  approve: () => Promise<boolean>;
  cancel: () => Promise<boolean>;
  repeat: () => Promise<boolean>;
  onActionDone: () => void;
  onToast: (text: string) => void;
  t: Translate;
}) {
  if (!canApprove && !canCancel && !showRepeat) return null;
  const run = async (fn: () => Promise<boolean>) => {
    if (await fn()) {
      onActionDone();
      onToast(t("actionDone"));
    }
  };
  return (
    <Section title={t("drawerActions")}>
      <div className="flex gap-2">
        {canApprove && (
          <button
            className="text-xs rounded border border-success px-2 py-1 disabled:opacity-50"
            onClick={() => run(approve)}
            disabled={busy}
          >
            {t("actionApprove")}
          </button>
        )}
        {canCancel && (
          <button
            className="text-xs rounded border border-error px-2 py-1 disabled:opacity-50"
            onClick={() => run(cancel)}
            disabled={busy}
          >
            {t("actionCancel")}
          </button>
        )}
        {showRepeat && (
          <RepeatButton
            canRepeat={canRepeat}
            busy={busy}
            repeat={repeat}
            onActionDone={onActionDone}
            onToast={onToast}
            t={t}
          />
        )}
      </div>
    </Section>
  );
}

/** Closes the drawer on Escape while `node` is set. Rebinds by id, not by object
 * identity, so a fresh `node` reference for the same task (e.g. a refetch) does not
 * tear down and re-add the listener. */
function useCloseOnEscape(node: OrchNode | null, onClose: () => void) {
  const nodeId = node?.id ?? null;
  useEffect(() => {
    if (!nodeId) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [nodeId, onClose]);
}

/**
 * Local, self-clearing toast state. `showToast` starts the timer synchronously in the
 * same handler that sets the message (button onClick / async action callback) — never
 * inside an effect body — so the only thing the unmount effect does is clear a pending
 * timer, with no setState call of its own (keeps `react-hooks/set-state-in-effect` clean).
 */
function useDrawerToast() {
  const [toast, setToast] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = (text: string) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setToast(text);
    timerRef.current = setTimeout(() => setToast(null), TOAST_MS);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return { toast, showToast };
}

export function OrchestrationDrawer({
  node,
  onClose,
  onActionDone,
}: {
  node: OrchNode | null;
  onClose: () => void;
  onActionDone: () => void;
}) {
  const t = useTranslations("orchestration");
  const {
    detail,
    isLoading,
    busy,
    error,
    errorKind,
    canApprove,
    canCancel,
    canRepeat,
    approve,
    cancel,
    repeat,
  } = useDrawerDetail(node);
  useCloseOnEscape(node, onClose);
  const { toast, showToast } = useDrawerToast();

  if (!node) return null;
  const state = node.state ?? "queued";
  const { ca, a2a } = narrowDetail(node, detail);
  const showRepeat =
    node.source === "cloud-agent" || node.source === "a2a" || node.source === "conductor";

  return (
    <>
      <div className="fixed inset-0 bg-black/20 z-30" onClick={onClose} aria-hidden />
      <aside
        className="fixed right-0 top-0 h-full w-[380px] bg-surface border-l border-border z-40 overflow-y-auto p-4"
        role="dialog"
        aria-label={node.label}
      >
        <DrawerHeader
          node={node}
          detail={detail}
          state={state}
          t={t}
          onClose={onClose}
          onToast={showToast}
        />

        <DrawerBanners
          toast={toast}
          error={error}
          errorKind={errorKind}
          isLoading={isLoading}
          t={t}
        />

        <DrawerObjective node={node} ca={ca} a2a={a2a} t={t} />
        <Section title={t("drawerTimeline")}>
          <Timeline node={node} detail={detail} />
        </Section>
        <DrawerMetrics node={node} ca={ca} t={t} />
        <DrawerResult ca={ca} a2a={a2a} t={t} />
        <DrawerMemory a2a={a2a} t={t} />
        <DrawerActions
          canApprove={canApprove}
          canCancel={canCancel}
          showRepeat={showRepeat}
          canRepeat={canRepeat}
          busy={busy}
          approve={approve}
          cancel={cancel}
          repeat={repeat}
          onActionDone={onActionDone}
          onToast={showToast}
          t={t}
        />
      </aside>
    </>
  );
}

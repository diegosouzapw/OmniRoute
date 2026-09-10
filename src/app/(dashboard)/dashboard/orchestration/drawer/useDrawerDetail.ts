"use client";
/** Fetches per-source task detail on drawer open + approve/cancel/repeat actions. */
import { useEffect, useState } from "react";
import type { OrchNode } from "../model/orchestrationTypes";
import type { CloudAgentTask } from "@/lib/cloudAgent/types";
import type { A2ATask } from "@/lib/a2a/taskManager";
import type { ConductorTaskDetail } from "@/lib/conductor/hubProxy";

// Client-safe stand-in for sanitizeErrorMessage (server-only, breaks the client bundle — #10692): only our own `HTTP <status>` / `RPC <code>` errors and AbortError pass through verbatim, everything else collapses to a generic string. `RPC <code>` carries the JSON-RPC error CODE only — never the upstream `error.message`, which is attacker/upstream-controlled text (Hard Rule #12).
function toSafeErrorText(err: unknown): string {
  if (err instanceof Error) {
    if (/^HTTP \d{3}$/.test(err.message)) return err.message;
    if (/^RPC -?\d{1,6}$/.test(err.message)) return err.message;
    if (err.name === "AbortError") return "Request cancelled";
  }
  return "Request failed";
}

interface SourceRoute {
  detailUrl: string | null;
  cancelReq: { url: string; init: RequestInit } | null;
  approveReq: { url: string; init: RequestInit } | null;
}

const TERMINAL_STATES = new Set(["succeeded", "failed", "cancelled"]);

function routeFor(node: OrchNode): SourceRoute {
  const post = (body?: unknown): RequestInit => ({
    method: "POST",
    ...(body
      ? { headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }
      : {}),
  });
  if (node.id.startsWith("cloud-agent:")) {
    const id = node.id.slice("cloud-agent:".length).replace(/:activity$/, "");
    const url = `/api/v1/agents/tasks/${encodeURIComponent(id)}`;
    return {
      detailUrl: url,
      cancelReq: { url, init: post({ action: "cancel" }) },
      approveReq: { url, init: post({ action: "approve" }) },
    };
  }
  if (node.id.startsWith("a2a:")) {
    const id = node.id.slice("a2a:".length);
    return {
      detailUrl: `/api/a2a/tasks/${encodeURIComponent(id)}`,
      cancelReq: { url: `/api/a2a/tasks/${encodeURIComponent(id)}/cancel`, init: post() },
      approveReq: null,
    };
  }
  if (node.id.startsWith("conductor:task:")) {
    const id = node.id.slice("conductor:task:".length);
    return {
      detailUrl: `/api/conductor/tasks/${encodeURIComponent(id)}`,
      cancelReq: { url: `/api/conductor/tasks/${encodeURIComponent(id)}/cancel`, init: post() },
      approveReq: null,
    };
  }
  return { detailUrl: null, cancelReq: null, approveReq: null }; // runners/overflow: raw only
}

/**
 * Builds the POST request that recreates a task with the same input, from the LOADED
 * DETAIL — never from `node` (the node only carries display fields, not the full
 * original request). Returns `null` when the original input cannot be recovered, so
 * the caller can render the "Repeat" action disabled instead of firing a bad request.
 * Contracts, verified against the live routes (not assumed) — the null-guard requires
 * EVERY field the target route treats as mandatory, not merely one of them (a partially
 * recoverable detail is not recoverable: a POST missing one required field 400s, which is
 * an enabled button that cannot work):
 *   - cloud-agent → `POST /api/v1/agents/tasks`, `CreateCloudAgentTaskSchema` shape
 *     (`src/lib/cloudAgent/types.ts`) — `providerId`, `prompt` and `source` are all
 *     required there; `options` is optional.
 *   - a2a → `POST /a2a`, JSON-RPC `message/send` (`src/app/a2a/route.ts`) — only
 *     `messages` is required (`skill` defaults to `"smart-routing"`, `metadata` is
 *     optional), so that is the only field guarded here.
 *   - conductor → `POST /api/conductor/tasks` (D1, `src/app/api/conductor/tasks/route.ts`)
 *     — `repoUrl` and `prompt` are both `z.string().min(1)` (required); `ConductorTaskDetail`
 *     leaves `repo`/`prompt` independently nullable, so either one missing must null out
 *     the whole request.
 */
/**
 * Strips `memoryHits` from the metadata a repeat re-sends. `metadata.memoryHits` is
 * OBSERVABILITY written by the previous run (`src/lib/a2a/taskExecution.ts`) — never
 * caller input — so echoing it back would make the new task be born carrying the old
 * run's memory snippets, and would keep showing them in the drawer even with the
 * `OMNIROUTE_A2A_MEMORY_HITS=0` kill-switch on. `taskManager.createTask` no longer aliases
 * `metadata` into `input`, but historical tasks persisted before that fix still carry the
 * hits inside `input.metadata`, so the repeat path must drop them too.
 * Returns `undefined` for a missing/non-object metadata so the JSON body omits the field
 * entirely (the route treats `params.metadata` as optional).
 */
function withoutMemoryHits(metadata: unknown): Record<string, unknown> | undefined {
  if (!metadata || typeof metadata !== "object" || Array.isArray(metadata)) return undefined;
  const rest = { ...(metadata as Record<string, unknown>) };
  delete rest.memoryHits;
  return rest;
}

/** Builds the JSON-body `RequestInit` shared by every `repeatReqFor*` source builder below. */
function postJson(body: unknown): RequestInit {
  return {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
}

/** cloud-agent repeat builder — `POST /api/v1/agents/tasks`, `CreateCloudAgentTaskSchema` shape. */
function repeatReqForCloudAgent(detail: unknown): { url: string; init: RequestInit } | null {
  const d = detail as CloudAgentTask | null;
  if (!d?.providerId || !d?.prompt || !d?.source) return null;
  return {
    url: "/api/v1/agents/tasks",
    init: postJson({
      providerId: d.providerId,
      prompt: d.prompt,
      source: d.source,
      options: d.options,
    }),
  };
}

/** a2a repeat builder — `POST /a2a`, JSON-RPC `message/send` from `detail.input`. */
function repeatReqForA2a(
  nodeId: string,
  detail: unknown
): { url: string; init: RequestInit } | null {
  const d = detail as A2ATask | null;
  if (!d?.input?.messages?.length) return null;
  return {
    url: "/a2a",
    init: postJson({
      jsonrpc: "2.0",
      id: nodeId,
      method: "message/send",
      params: {
        skill: d.input.skill,
        messages: d.input.messages,
        metadata: withoutMemoryHits(d.input.metadata),
      },
    }),
  };
}

/** conductor repeat builder — `POST /api/conductor/tasks` (D1 task-creation route). */
function repeatReqForConductor(detail: unknown): { url: string; init: RequestInit } | null {
  const d = detail as ConductorTaskDetail | null;
  if (!d?.repo || !d?.prompt) return null;
  return {
    url: "/api/conductor/tasks",
    init: postJson({
      repoUrl: d.repo,
      prompt: d.prompt,
      baseRef: d.base_ref ?? undefined,
      mode: d.mode,
    }),
  };
}

export function repeatReqFor(
  node: OrchNode,
  detail: unknown
): { url: string; init: RequestInit } | null {
  if (node.id.startsWith("cloud-agent:")) return repeatReqForCloudAgent(detail);
  if (node.id.startsWith("a2a:")) return repeatReqForA2a(node.id, detail);
  if (node.id.startsWith("conductor:task:")) return repeatReqForConductor(detail);
  return null;
}

/**
 * Unwraps a task-detail GET response to the actual task payload. Each source's
 * route has its own envelope — verified against the live handlers, not assumed:
 *   - cloud-agent (`GET /api/v1/agents/tasks/[id]`): `{ data: CloudAgentTask }`.
 *   - a2a (`GET /api/a2a/tasks/[id]`): `{ task: A2ATask }` — NOT `{ data }`. A
 *     generic `.data` fallback silently keeps the whole `{ task }` wrapper as
 *     `detail`, which every downstream `detail as A2ATask` read then crashes on
 *     (review r1 finding — `input`/`events`/`artifacts` all end up `undefined`).
 *   - conductor (`GET /api/conductor/tasks/[id]`): the task object itself, no
 *     envelope — `body.data` is `undefined` there so the generic fallback to
 *     `body` was already correct.
 */
function unwrapDetailBody(nodeId: string, body: unknown): unknown {
  const b = body as { data?: unknown; task?: unknown };
  if (nodeId.startsWith("a2a:")) return b.task ?? body;
  return b.data ?? body;
}

/** Derives approve/cancel availability from the route + node state. */
function deriveActionAvailability(route: SourceRoute | null, node: OrchNode | null) {
  const canApprove = !!route?.approveReq && node?.state === "waiting_approval";
  const isTerminal = !!node?.state && TERMINAL_STATES.has(node.state);
  const canCancel = !!route?.cancelReq && !!node?.state && !isTerminal;
  return { canApprove, canCancel };
}

/** Origin-tagged detail error, so the drawer can pick `detailFailed` vs `actionFailed` honestly. */
export interface DrawerError {
  kind: "detail" | "action";
  text: string;
}

/**
 * Resets `detail`/`error`/`isLoading` during render when the selected node
 * identity changes — React's documented "adjust state when a prop changes"
 * idiom, kept out of the fetch effect below (see `useFetchDetail`).
 */
function useSyncedNodeIdentity(
  node: OrchNode | null,
  route: SourceRoute | null,
  setDetail: (d: unknown | null) => void,
  setError: (e: DrawerError | null) => void,
  setIsLoading: (b: boolean) => void
) {
  const [syncedId, setSyncedId] = useState<string | undefined>(undefined);
  if (node?.id !== syncedId) {
    setSyncedId(node?.id);
    setDetail(node?.raw ?? null);
    setError(null);
    setIsLoading(!!(node && route?.detailUrl));
  }
}

/**
 * Fetches the detail payload for `node` whenever its id changes; aborts on
 * unmount/change. Kept as a pure "subscribe to node.id, fetch, setState from
 * the async .then/.catch callbacks" shape with no synchronous setState call
 * in its body, so it lints clean under `react-hooks/set-state-in-effect` with
 * zero suppressions (same technique as the dashboard/cli-code and
 * dashboard/settings react-hooks compiler-rule batches on this release, #12146).
 */
function useFetchDetail(
  node: OrchNode | null,
  route: SourceRoute | null,
  setDetail: (d: unknown | null) => void,
  setDetailError: (text: string) => void,
  setIsLoading: (b: boolean) => void
) {
  useEffect(() => {
    if (!node || !route?.detailUrl) return;
    const controller = new AbortController();
    fetch(route.detailUrl, { signal: controller.signal, cache: "no-store" })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`HTTP ${res.status}`))))
      .then((body) => setDetail(unwrapDetailBody(node.id, body)))
      .catch((err) => {
        if (!controller.signal.aborted) setDetailError(toSafeErrorText(err));
      })
      .finally(() => setIsLoading(false));
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- keyed by node identity
  }, [node?.id]);
}

/**
 * A JSON-RPC endpoint can report a failure with an HTTP 200: `/a2a`'s `jsonRpcError()`
 * only maps a few codes to 4xx/5xx and defaults to `status: 200`
 * (`src/app/a2a/route.ts`). `res.ok` alone would then render the success toast for a run
 * that never happened, so the `/a2a` action also inspects the envelope. Only the numeric
 * `error.code` is surfaced (`RPC <code>`) — never the upstream `error.message`.
 */
async function jsonRpcErrorCode(res: {
  json?: () => Promise<unknown>;
}): Promise<number | undefined> {
  try {
    const body = (await res.json?.()) as { error?: { code?: unknown } } | undefined;
    const code = body?.error?.code;
    return typeof code === "number" ? code : body?.error ? -32603 : undefined;
  } catch {
    // A non-JSON / already-consumed body is not evidence of failure — the status stands.
    return undefined;
  }
}

async function performAction(
  req: { url: string; init: RequestInit } | null,
  setActionError: (text: string) => void
): Promise<boolean> {
  if (!req) return false;
  try {
    const res = await fetch(req.url, req.init);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    if (req.url === "/a2a") {
      const code = await jsonRpcErrorCode(res);
      if (code !== undefined) throw new Error(`RPC ${code}`);
    }
    return true;
  } catch (err) {
    setActionError(toSafeErrorText(err));
    return false;
  }
}

export function useDrawerDetail(node: OrchNode | null) {
  const [detail, setDetail] = useState<unknown | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setErrorState] = useState<DrawerError | null>(null);
  const route = node ? routeFor(node) : null;

  const setDetailError = (text: string) => setErrorState({ kind: "detail", text });
  const setActionError = (text: string) => setErrorState({ kind: "action", text });

  useSyncedNodeIdentity(node, route, setDetail, setErrorState, setIsLoading);
  useFetchDetail(node, route, setDetail, setDetailError, setIsLoading);

  const { canApprove, canCancel } = deriveActionAvailability(route, node);
  const repeatReq = node ? repeatReqFor(node, detail) : null;

  const runAction = async (req: { url: string; init: RequestInit } | null): Promise<boolean> => {
    if (busy) return false;
    setBusy(true);
    try {
      return await performAction(req, setActionError);
    } finally {
      setBusy(false);
    }
  };

  return {
    detail,
    isLoading,
    busy,
    error: error?.text ?? null,
    errorKind: error?.kind ?? null,
    canApprove,
    canCancel,
    canRepeat: !!repeatReq && !busy,
    approve: () => runAction(route?.approveReq ?? null),
    cancel: () => runAction(route?.cancelReq ?? null),
    repeat: () => runAction(repeatReq),
  };
}

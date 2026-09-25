/**
 * Shared handleChat adaptive-admission lifecycle wrapper.
 *
 * Owns a per-call context that acquires exactly once after API-key policy and
 * attaches/releases the admitted lease around the handler response or throw.
 * No AsyncLocalStorage, no route registry — one higher-order wrapper only.
 */

import {
  getAdaptiveAdmissionRuntime,
  type AdaptiveAdmissionAdmitted,
  type AdaptiveAdmissionFailureOutcome,
  type AdaptiveAdmissionRuntime,
} from "@omniroute/open-sse/services/admission/runtime.ts";
import type { PerTargetAdmissionHook } from "@omniroute/open-sse/services/admission/types.ts";
import {
  releaseChatAdmissionWhenDone,
  type ChatAdmissionLease,
} from "@/shared/middleware/chatBodyAdmission";

/** Single fairness bucket for unauthenticated / keyless traffic. Opaque; never a raw key. */
export const ANONYMOUS_ADMISSION_TENANT_KEY = "anonymous";

export type ChatAdmissionContext = {
  /**
   * Acquire once against the process runtime.
   * Returns a sanitized rejection Response, or null when admitted / already acquired.
   */
  acquire(
    apiKeyId: string | null | undefined,
    request: { signal?: AbortSignal | null },
    body: unknown
  ): Promise<Response | null>;
  /**
   * #9654 Wave 2: build a per-target lane-aware admission probe for combo /
   * fusion fan-out dispatch. Strictly non-blocking (maxWaitMs 0 — skip, never
   * queue), a no-op when virtual lanes are off, and keyed to the PARENT's
   * tenantKey so it gates the same per-tenant lane as this request's lease.
   */
  createPerTargetAdmissionHook(
    apiKeyId: string | null | undefined,
    request: { signal?: AbortSignal | null }
  ): PerTargetAdmissionHook;
  attachFlightLease(lease: ChatAdmissionLease): void;
};

/**
 * #9654 Wave 2: per-target fan-out admission probe.
 *
 * Combo and fusion dispatch N targets without consulting the adaptive-admission
 * layer — the parent request holds one lease, but every fan-out target is
 * dispatched unconditionally. With virtual lanes on, a tenant whose lane is
 * full should SKIP additional fan-out targets instead of piling more queued work
 * onto an already-congested lane.
 *
 * Probe semantics:
 *   - strictly non-blocking: maxWaitMs 0 — if the lane can't admit right now,
 *     the target is skipped, never queued;
 *   - release-on-admit: the probe is a capacity gate, not a hold — the parent's
 *     lease covers the fan-out, so the probe lease is released immediately;
 *   - lanes-off no-op: the shared queue is the only gate, and the parent already
 *     holds one lease there — probing would double-count and reject combo targets.
 */
function createPerTargetAdmissionHookImpl(
  runtime: AdaptiveAdmissionRuntime,
  tenantKey: string,
  signal?: AbortSignal | null
): PerTargetAdmissionHook {
  // Lanes-off no-op: never probe the shared queue for fan-out targets (the
  // parent request already holds the one lease that matters there). The flag
  // comes from startup config, so read it once here — building a snapshot per
  // fan-out target would be pure overhead on the default (lanes-off) path.
  const lanesEnabled = runtime.snapshot().virtualLanes === true;

  return async (target) => {
    if (!lanesEnabled) return true;

    try {
      const streaming =
        target.body !== null &&
        typeof target.body === "object" &&
        (target.body as { stream?: unknown }).stream === true;

      const result = await runtime.acquire({
        tenantKey,
        body: target.body,
        signal: signal ?? undefined,
        // Price the class of the request the target will actually dispatch: fusion
        // panel bodies carry stream:false (non-streaming class), priority/RR carry
        // the user's flag. Without this the probe would under-estimate cost and
        // admit more fan-out targets than the lane can truly afford (#9654 Q4).
        streaming,
        maxWaitMs: 0,
      });
      if (result.status === "admitted") {
        // Capacity gate only — release the probe lease immediately.
        result.lease.release("success");
        return true;
      }
      return false;
    } catch {
      // Fail-open: admission is a capacity gate, not the source of truth. A
      // hiccup in the admission layer must not take down the fan-out — the
      // target simply dispatches ungated.
      return true;
    }
  };
}

/** Public factory — build a probe against an explicit runtime (test seam). */
export const createPerTargetAdmissionHook = createPerTargetAdmissionHookImpl;

/**
 * Module-level convenience for paths without a ChatAdmissionContext in scope
 * (e.g. the safety-net combo redirect inside handleSingleModelChat). Resolves
 * the process-global runtime + tenant key from the API key id, like the
 * context method does.
 */
export function createPerTargetAdmissionHookForRequest(
  apiKeyId: string | null | undefined,
  request: { signal?: AbortSignal | null }
): PerTargetAdmissionHook {
  return createPerTargetAdmissionHookImpl(
    getAdaptiveAdmissionRuntime(),
    resolveAdmissionTenantKey(apiKeyId),
    request?.signal ?? null
  );
}

type AdmittedState = {
  runtime: AdaptiveAdmissionRuntime;
  admitted: AdaptiveAdmissionAdmitted;
};

export function resolveAdmissionTenantKey(apiKeyId: string | null | undefined): string {
  return typeof apiKeyId === "string" && apiKeyId.length > 0
    ? apiKeyId
    : ANONYMOUS_ADMISSION_TENANT_KEY;
}

const CANCEL_NAMES = new Set(["AbortError"]);
const CANCEL_CODES = new Set(["ABORT_ERR", "ERR_CANCELED"]);
const TIMEOUT_NAMES = new Set(["TimeoutError"]);
const TIMEOUT_CODES = new Set(["ETIMEDOUT", "ESOCKETTIMEDOUT", "TIMEOUT", "ERR_TIMEOUT"]);

function asStringField(err: object, key: string): string {
  const value = (err as Record<string, unknown>)[key];
  return typeof value === "string" ? value : "";
}

function asStatus(err: object): number | null {
  const status = (err as Record<string, unknown>).status;
  if (typeof status === "number") return status;
  const statusCode = (err as Record<string, unknown>).statusCode;
  return typeof statusCode === "number" ? statusCode : null;
}

/** Classify thrown handler failure; never exposes raw errors to clients. */
export function classifyHandlerFailure(
  err: unknown,
  signal?: AbortSignal | null
): AdaptiveAdmissionFailureOutcome {
  if (signal?.aborted) return "cancelled";
  if (!err || typeof err !== "object") return "upstream_error";

  const name = asStringField(err, "name");
  const code = asStringField(err, "code");
  if (CANCEL_NAMES.has(name) || CANCEL_CODES.has(code)) return "cancelled";
  if (TIMEOUT_NAMES.has(name) || TIMEOUT_CODES.has(code)) return "timeout";

  const status = asStatus(err);
  if (status === 408 || status === 504) return "timeout";
  if (status !== null && status >= 400 && status < 500) return "local_reject";
  return "upstream_error";
}

const CLIENT_RAW_MUTABLE_FIELDS = ["model", "reasoning", "reasoning_effort", "thinking"] as const;
type ClientRawFieldState = {
  key: (typeof CLIENT_RAW_MUTABLE_FIELDS)[number];
  present: boolean;
  value: unknown;
};

function captureClientRawFields(body: Record<string, unknown>): ClientRawFieldState[] {
  return CLIENT_RAW_MUTABLE_FIELDS.map((key) => {
    const present = Object.hasOwn(body, key);
    return { key, present, value: present ? body[key] : undefined };
  });
}

function clientRawFieldsEqual(a: ClientRawFieldState[], b: ClientRawFieldState[]): boolean {
  return a.every(
    (field, index) =>
      field.key === b[index]?.key &&
      field.present === b[index]?.present &&
      Object.is(field.value, b[index]?.value)
  );
}

function applyClientRawFields(body: Record<string, unknown>, fields: ClientRawFieldState[]): void {
  for (const field of fields) {
    if (field.present) body[field.key] = field.value;
    else delete body[field.key];
  }
}

/**
 * Capture only the fixed fields mutated before admission. The full bounded observability
 * snapshot is built after admission without enumerating or cloning the body beforehand.
 */
export function captureDeferredClientRawBody(body: unknown): {
  withClientBody<T>(build: (clientBody: unknown) => T): T;
} {
  const target =
    body !== null && typeof body === "object" ? (body as Record<string, unknown>) : null;
  const originalFields = target ? captureClientRawFields(target) : null;

  return {
    withClientBody(build) {
      if (!target || !originalFields) return build(body);
      const workingFields = captureClientRawFields(target);
      if (clientRawFieldsEqual(originalFields, workingFields)) return build(target);

      applyClientRawFields(target, originalFields);
      try {
        return build(target);
      } finally {
        applyClientRawFields(target, workingFields);
      }
    },
  };
}

/** Resolve lazy/eager client-raw after admission; invoke factories at most once. */
export function resolveClientRawAfterAdmission(
  clientRawRequest: unknown,
  build: () => unknown
): unknown {
  if (typeof clientRawRequest === "function") {
    return (clientRawRequest as () => unknown)();
  }
  if (clientRawRequest) return clientRawRequest;
  return build();
}

export function createChatAdmissionContext(
  getRuntime: () => AdaptiveAdmissionRuntime = getAdaptiveAdmissionRuntime
): ChatAdmissionContext & {
  getAdmittedState(): AdmittedState | null;
  getFlightLease(): ChatAdmissionLease | null;
} {
  let state: AdmittedState | null = null;
  let acquireStarted = false;
  let flightLease: ChatAdmissionLease | null = null;

  return {
    getAdmittedState: () => state,
    getFlightLease: () => flightLease,
    attachFlightLease(lease) {
      if (flightLease === lease) return;
      flightLease?.release();
      flightLease = lease;
    },
    async acquire(apiKeyId, request, body) {
      // Exactly once per logical request — never re-enter the runtime.
      if (state || acquireStarted) return null;
      acquireStarted = true;

      const runtime = getRuntime();
      const streaming =
        body !== null && typeof body === "object" && (body as { stream?: unknown }).stream === true;

      const result = await runtime.acquire({
        tenantKey: resolveAdmissionTenantKey(apiKeyId),
        body,
        signal: request?.signal ?? undefined,
        streaming,
      });

      if (result.status === "rejected") {
        return result.response;
      }

      state = { runtime, admitted: result };
      return null;
    },
    createPerTargetAdmissionHook(apiKeyId, request) {
      return createPerTargetAdmissionHookImpl(
        getRuntime(),
        resolveAdmissionTenantKey(apiKeyId),
        request?.signal ?? null
      );
    },
  };
}

type HandleChatImplementation = (
  request: any,
  clientRawRequest: any,
  preParsedBody: any,
  correlationId: string | undefined,
  admissionContext: ChatAdmissionContext
) => Promise<Response>;

export type WithChatAdmissionOptions = {
  /** Test seam: override process-global runtime resolution. */
  getRuntime?: () => AdaptiveAdmissionRuntime;
};

/**
 * Thin public wrapper: create per-call context, run implementation, attach/release lease.
 */
export function withChatAdmission(
  implementation: HandleChatImplementation,
  options: WithChatAdmissionOptions = {}
) {
  return async function handleChat(
    request: any,
    clientRawRequest: any = null,
    preParsedBody: any = null,
    correlationId?: string
  ): Promise<Response> {
    const admissionContext = createChatAdmissionContext(
      options.getRuntime ?? getAdaptiveAdmissionRuntime
    );
    try {
      const response = await implementation(
        request,
        clientRawRequest,
        preParsedBody,
        correlationId,
        admissionContext
      );
      const admittedState = admissionContext.getAdmittedState();
      const withFlight = releaseChatAdmissionWhenDone(
        response,
        admissionContext.getFlightLease()
      );
      if (!admittedState) return withFlight;

      const { runtime, admitted } = admittedState;
      return runtime.attachResponseLifecycle(withFlight, admitted.lease, {
        admittedAtMs: admitted.admittedAtMs,
        signal: request?.signal ?? undefined,
      });
    } catch (err) {
      admissionContext.getFlightLease()?.release();
      const admittedState = admissionContext.getAdmittedState();
      if (admittedState) {
        const { runtime, admitted } = admittedState;
        runtime.releaseHandlerFailure(
          admitted.lease,
          classifyHandlerFailure(err, request?.signal),
          { admittedAtMs: admitted.admittedAtMs }
        );
      }
      throw err;
    }
  };
}

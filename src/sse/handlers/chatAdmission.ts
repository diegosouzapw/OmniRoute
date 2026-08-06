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
};

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
): ChatAdmissionContext & { getAdmittedState(): AdmittedState | null } {
  let state: AdmittedState | null = null;
  let acquireStarted = false;

  return {
    getAdmittedState: () => state,
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
      if (!admittedState) return response;

      const { runtime, admitted } = admittedState;
      return runtime.attachResponseLifecycle(response, admitted.lease, {
        admittedAtMs: admitted.admittedAtMs,
        signal: request?.signal ?? undefined,
      });
    } catch (err) {
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

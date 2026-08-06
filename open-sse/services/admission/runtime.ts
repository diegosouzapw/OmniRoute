/**
 * Process-local adaptive admission runtime facade around the pure controller.
 * No HTTP route wiring — suitable for later shared handleChat integration.
 */

import { AdaptiveAdmissionController } from "./controller.ts";
import { validateConfig } from "./config.ts";
import { extractAdmissionCostFeatures } from "./requestFeatures.ts";
import {
  type AdaptiveAdmissionConfig,
  type AdmissionAcquireResult,
  type AdmissionClock,
  type AdmissionLease,
  type AdmissionMode,
  type AdmissionPressure,
  type AdmissionRejectCode,
  type AdmissionReleaseOutcome,
  type AdmissionSnapshot,
  type ShadowDecision,
} from "./types.ts";
import { buildErrorBody } from "../../utils/error.ts";
import { CORS_HEADERS } from "../../utils/cors.ts";
import {
  checkResourcePressureGuard,
  getResourcePressureObservation,
  type ResourcePressureGuardResult,
  type ResourcePressureObservation,
} from "../../utils/resourcePressure.ts";
import type { PressureReason, PressureSeverity } from "../../utils/resourcePressurePolicy.ts";

export { extractAdmissionCostFeatures } from "./requestFeatures.ts";

export const DEFAULT_ADAPTIVE_ADMISSION_CONFIG: Readonly<AdaptiveAdmissionConfig> = Object.freeze({
  mode: "shadow",
  minLimit: 8,
  initialLimit: 64,
  maxLimit: 1000,
  maxQueueCount: 128,
  maxQueueCost: 2000,
  defaultMaxWaitMs: 5_000,
  windowMs: 1_000,
});

const RUNTIME_STORE_KEY = Symbol.for("omniroute.adaptiveAdmission.runtime");

type RuntimeStore = {
  runtime: AdaptiveAdmissionRuntime | null;
};

type GlobalWithRuntimeStore = typeof globalThis & {
  [RUNTIME_STORE_KEY]?: RuntimeStore;
};

function getRuntimeStore(): RuntimeStore {
  const globalWithStore = globalThis as GlobalWithRuntimeStore;
  let store = globalWithStore[RUNTIME_STORE_KEY];
  if (!store) {
    store = { runtime: null };
    globalWithStore[RUNTIME_STORE_KEY] = store;
  }
  return store;
}

const ENV_KEYS = {
  mode: "ADAPTIVE_ADMISSION_MODE",
  minLimit: "ADAPTIVE_ADMISSION_MIN_LIMIT",
  initialLimit: "ADAPTIVE_ADMISSION_INITIAL_LIMIT",
  maxLimit: "ADAPTIVE_ADMISSION_MAX_LIMIT",
  maxQueueCount: "ADAPTIVE_ADMISSION_MAX_QUEUE_COUNT",
  maxQueueCost: "ADAPTIVE_ADMISSION_MAX_QUEUE_COST",
  defaultMaxWaitMs: "ADAPTIVE_ADMISSION_MAX_WAIT_MS",
  windowMs: "ADAPTIVE_ADMISSION_WINDOW_MS",
} as const;

function parsePositiveSafeInt(name: string, raw: string): number {
  if (!/^[0-9]+$/.test(raw)) {
    throw new RangeError(`${name} must be a positive safe integer`);
  }
  const value = Number(raw);
  if (!Number.isSafeInteger(value) || value <= 0) {
    throw new RangeError(`${name} must be a positive safe integer`);
  }
  return value;
}

/** Strict env → config resolver. Throws clear config errors for direct callers. */
export function resolveAdaptiveAdmissionConfigFromEnv(
  env: NodeJS.ProcessEnv | Record<string, string | undefined> = process.env
): AdaptiveAdmissionConfig {
  const cfg: AdaptiveAdmissionConfig = { ...DEFAULT_ADAPTIVE_ADMISSION_CONFIG };

  const modeRaw = env[ENV_KEYS.mode];
  if (modeRaw !== undefined && modeRaw !== "") {
    if (modeRaw !== "off" && modeRaw !== "shadow" && modeRaw !== "enforce") {
      throw new RangeError(`${ENV_KEYS.mode} must be off|shadow|enforce`);
    }
    cfg.mode = modeRaw;
  }

  // Numeric env keys only — typed assignment without index-signature cast (TS2352).
  type EnvIntField = Exclude<keyof typeof ENV_KEYS, "mode">;
  const intFields = [
    "minLimit",
    "initialLimit",
    "maxLimit",
    "maxQueueCount",
    "maxQueueCost",
    "defaultMaxWaitMs",
    "windowMs",
  ] as const satisfies ReadonlyArray<EnvIntField>;
  for (const field of intFields) {
    const envName = ENV_KEYS[field];
    const raw = env[envName];
    if (raw === undefined || raw === "") continue;
    cfg[field] = parsePositiveSafeInt(envName, raw);
  }

  // Shared pure validation — accept exact documented maxima, reject core-invalid configs.
  validateConfig(cfg);
  return cfg;
}

export type AdaptiveAdmissionAcquireInput = {
  /** Opaque fairness key; never exposed in snapshots or client errors. */
  tenantKey: string;
  /** Already-parsed request body — must not be re-read or stringified for cost. */
  body: unknown;
  signal?: AbortSignal;
  maxWaitMs?: number;
  /** Authoritative streaming class; wins body stream inference when set. */
  streaming?: boolean;
};

export type AdaptiveAdmissionAdmitted = {
  status: "admitted";
  mode: AdmissionMode;
  lease: AdmissionLease;
  admittedAtMs: number;
  shadowDecision?: ShadowDecision;
};

export type AdaptiveAdmissionRejected = {
  status: "rejected";
  code: string;
  response: Response;
};

export type AdaptiveAdmissionAcquireResult = AdaptiveAdmissionAdmitted | AdaptiveAdmissionRejected;

export type AdaptiveAdmissionPublicSnapshot = AdmissionSnapshot & {
  resourceSeverity: PressureSeverity;
  resourceReason: PressureReason;
  resourceObservedAtMs: number;
  pressureGuardRejectCount: number;
};

export type AdaptiveAdmissionLifecycleOptions = {
  admittedAtMs: number;
  signal?: AbortSignal;
  nowMs?: () => number;
};

export type AdaptiveAdmissionRuntimeOptions = {
  config?: AdaptiveAdmissionConfig;
  env?: NodeJS.ProcessEnv | Record<string, string | undefined>;
  clock?: Partial<AdmissionClock>;
  checkResourcePressure?: () => ResourcePressureGuardResult | null;
  getResourcePressureObservation?: () => ResourcePressureObservation;
  /** Test seam: observe pressure values fed into the controller after dedupe. */
  onPressureObserved?: (pressure: AdmissionPressure) => void;
  warn?: (message: string) => void;
  nowMs?: () => number;
};

/** Non-success release outcomes callers must choose explicitly for handler failures. */
export type AdaptiveAdmissionFailureOutcome = Exclude<AdmissionReleaseOutcome, "success">;

export type AdaptiveAdmissionRuntime = {
  acquire(input: AdaptiveAdmissionAcquireInput): Promise<AdaptiveAdmissionAcquireResult>;
  snapshot(): AdaptiveAdmissionPublicSnapshot;
  dispose(): void;
  /**
   * Release an admitted lease after a handler failure before any HTTP response exists.
   * Callers must supply the concrete non-success outcome — never defaults to local_reject.
   */
  releaseHandlerFailure(
    lease: AdmissionLease,
    outcome: AdaptiveAdmissionFailureOutcome,
    options?: { admittedAtMs?: number; nowMs?: () => number }
  ): void;
  attachResponseLifecycle(
    response: Response,
    lease: AdmissionLease,
    options: AdaptiveAdmissionLifecycleOptions
  ): Response;
};

type RejectHttpMapping = {
  status: number;
  code: string;
  message: string;
  retryAfter?: string;
};

const REJECT_MAP: Record<AdmissionRejectCode, RejectHttpMapping> = {
  ADMISSION_ABORTED: {
    status: 499,
    code: "admission_aborted",
    message: "Request aborted",
  },
  ADMISSION_OVERSIZED: {
    status: 503,
    code: "admission_oversized",
    message: "Request too large for current capacity",
  },
  ADMISSION_QUEUE_FULL: {
    status: 503,
    code: "admission_queue_full",
    message: "Service temporarily unavailable",
    retryAfter: "1",
  },
  ADMISSION_DEADLINE: {
    status: 503,
    code: "admission_deadline",
    message: "Service temporarily unavailable",
    retryAfter: "1",
  },
  ADMISSION_SHUTDOWN: {
    status: 503,
    code: "admission_shutdown",
    message: "Service temporarily unavailable",
  },
  ADMISSION_UNAVAILABLE: {
    status: 503,
    code: "admission_unavailable",
    message: "Service temporarily unavailable",
    retryAfter: "1",
  },
};

function isAdmissionRejectError(
  err: unknown
): err is { code: AdmissionRejectCode; name: string; message: string } {
  return (
    !!err &&
    typeof err === "object" &&
    (err as { name?: string }).name === "AdmissionRejectError" &&
    typeof (err as { code?: unknown }).code === "string"
  );
}

function buildAdmissionRejectResponse(code: AdmissionRejectCode): AdaptiveAdmissionRejected {
  const mapping = REJECT_MAP[code] ?? REJECT_MAP.ADMISSION_UNAVAILABLE;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...CORS_HEADERS,
  };
  if (mapping.retryAfter) headers["Retry-After"] = mapping.retryAfter;
  const body = buildErrorBody(mapping.status, mapping.message, undefined, {
    type: mapping.status === 499 ? "client_disconnected" : "server_error",
    code: mapping.code,
  });
  return {
    status: "rejected",
    code: mapping.code,
    response: new Response(JSON.stringify(body), {
      status: mapping.status,
      headers,
    }),
  };
}

function observationIdentity(state: ResourcePressureObservation["state"]): string {
  return `${state.observedAtMs}|${state.severity}|${state.reason}`;
}

function toAdmissionPressure(severity: PressureSeverity): AdmissionPressure {
  if (severity === "critical") return "critical";
  if (severity === "high") return "high";
  return "normal";
}

function isSseResponse(response: Response): boolean {
  const contentType = response.headers.get("content-type") ?? "";
  return contentType.toLowerCase().includes("text/event-stream");
}

function releaseOnce(
  lease: AdmissionLease,
  outcome: AdmissionReleaseOutcome,
  admittedAtMs: number | undefined,
  nowMs: () => number
): void {
  if (lease.released) return;
  const latencyMs = admittedAtMs === undefined ? undefined : Math.max(0, nowMs() - admittedAtMs);
  lease.release(outcome, latencyMs === undefined ? undefined : { latencyMs });
}

/**
 * Map HTTP status (+ optional request signal) to admission release outcome.
 * Cancellation always wins over status classification.
 */
function classifyHttpOutcome(status: number, signal?: AbortSignal): AdmissionReleaseOutcome {
  if (signal?.aborted || status === 499) return "cancelled";
  if (status === 408 || status === 504) return "timeout";
  if (status >= 500) return "upstream_error";
  if (status >= 400) return "local_reject";
  // 2xx / 3xx (and rare 1xx) complete successfully from admission's perspective.
  return "success";
}

class AdaptiveAdmissionRuntimeImpl implements AdaptiveAdmissionRuntime {
  private readonly controller: AdaptiveAdmissionController;
  private readonly checkResourcePressure: () => ResourcePressureGuardResult | null;
  private readonly getResourcePressureObservation: () => ResourcePressureObservation;
  private readonly onPressureObserved?: (pressure: AdmissionPressure) => void;
  private readonly nowMs: () => number;
  private lastObservationKey: string | null = null;
  private lastResource: {
    severity: PressureSeverity;
    reason: PressureReason;
    observedAtMs: number;
  } = { severity: "normal", reason: "none", observedAtMs: 0 };
  private pressureGuardRejectCount = 0;
  private disposed = false;

  constructor(options: AdaptiveAdmissionRuntimeOptions, config: AdaptiveAdmissionConfig) {
    this.controller = new AdaptiveAdmissionController(config, options.clock);
    this.checkResourcePressure = options.checkResourcePressure ?? checkResourcePressureGuard;
    this.getResourcePressureObservation =
      options.getResourcePressureObservation ?? getResourcePressureObservation;
    this.onPressureObserved = options.onPressureObserved;
    this.nowMs = options.nowMs ?? options.clock?.now ?? (() => Date.now());
  }

  async acquire(input: AdaptiveAdmissionAcquireInput): Promise<AdaptiveAdmissionAcquireResult> {
    if (this.disposed) {
      return buildAdmissionRejectResponse("ADMISSION_SHUTDOWN");
    }

    // Independent safety fuse first — never acquire provider work on critical guard.
    // Still feed pressure observations so the controller learns from critical samples.
    let guard: ResourcePressureGuardResult | null = null;
    try {
      guard = this.checkResourcePressure();
    } catch {
      // Fail open on sampling/check failures.
    }

    this.feedFreshPressureObservation();

    if (guard) {
      this.pressureGuardRejectCount += 1;
      return {
        status: "rejected",
        code: "resource_pressure",
        response: guard.response,
      };
    }

    const features = extractAdmissionCostFeatures(
      input.body,
      input.streaming === undefined ? undefined : { streaming: input.streaming }
    );
    let result: AdmissionAcquireResult;
    try {
      result = await this.controller.acquire({
        tenantKey: input.tenantKey,
        features,
        signal: input.signal,
        maxWaitMs: input.maxWaitMs,
      });
    } catch (err) {
      if (isAdmissionRejectError(err)) {
        return buildAdmissionRejectResponse(err.code);
      }
      return buildAdmissionRejectResponse("ADMISSION_UNAVAILABLE");
    }

    if (result.status === "rejected") {
      return buildAdmissionRejectResponse(result.code);
    }

    if (result.status === "queued") {
      try {
        const admitted = await result.promise;
        return {
          status: "admitted",
          mode: this.controller.snapshot().mode,
          lease: admitted.lease,
          admittedAtMs: this.nowMs(),
          shadowDecision: admitted.shadowDecision,
        };
      } catch (err) {
        if (isAdmissionRejectError(err)) {
          return buildAdmissionRejectResponse(err.code);
        }
        return buildAdmissionRejectResponse("ADMISSION_UNAVAILABLE");
      }
    }

    return {
      status: "admitted",
      mode: this.controller.snapshot().mode,
      lease: result.lease,
      admittedAtMs: this.nowMs(),
      shadowDecision: result.shadowDecision,
    };
  }

  snapshot(): AdaptiveAdmissionPublicSnapshot {
    const core = this.controller.snapshot();
    return {
      ...core,
      resourceSeverity: this.lastResource.severity,
      resourceReason: this.lastResource.reason,
      resourceObservedAtMs: this.lastResource.observedAtMs,
      pressureGuardRejectCount: this.pressureGuardRejectCount,
    };
  }

  dispose(): void {
    if (this.disposed) return;
    this.disposed = true;
    this.controller.shutdown();
  }

  releaseHandlerFailure(
    lease: AdmissionLease,
    outcome: AdaptiveAdmissionFailureOutcome,
    options?: { admittedAtMs?: number; nowMs?: () => number }
  ): void {
    releaseOnce(lease, outcome, options?.admittedAtMs, options?.nowMs ?? this.nowMs);
  }

  attachResponseLifecycle(
    response: Response,
    lease: AdmissionLease,
    options: AdaptiveAdmissionLifecycleOptions
  ): Response {
    const nowMs = options.nowMs ?? this.nowMs;
    const admittedAtMs = options.admittedAtMs;

    if (!response.body || !isSseResponse(response)) {
      releaseOnce(lease, classifyHttpOutcome(response.status, options.signal), admittedAtMs, nowMs);
      return response;
    }

    const upstream = response.body;
    const reader = upstream.getReader();
    let settled = false;
    let readerCancelled = false;

    const settle = (outcome: AdmissionReleaseOutcome): void => {
      if (settled) return;
      settled = true;
      releaseOnce(lease, outcome, admittedAtMs, nowMs);
    };

    const cancelReader = (reason?: unknown): void => {
      if (readerCancelled) return;
      readerCancelled = true;
      void reader.cancel(reason).catch(() => {
        /* ignore cancel races */
      });
    };

    const onAbort = (): void => {
      cancelReader(options.signal?.reason);
      settle("cancelled");
    };

    if (options.signal) {
      if (options.signal.aborted) {
        onAbort();
      } else {
        options.signal.addEventListener("abort", onAbort, { once: true });
      }
    }

    const detachAbort = (): void => {
      options.signal?.removeEventListener("abort", onAbort);
    };

    const stream = new ReadableStream<Uint8Array>({
      async pull(controller) {
        if (settled) {
          controller.close();
          return;
        }
        try {
          const { done, value } = await reader.read();
          if (done) {
            detachAbort();
            settle(classifyHttpOutcome(response.status, options.signal));
            controller.close();
            return;
          }
          controller.enqueue(value);
        } catch (err) {
          detachAbort();
          settle(options.signal?.aborted ? "cancelled" : "upstream_error");
          controller.error(err);
        }
      },
      cancel(reason) {
        detachAbort();
        cancelReader(reason);
        settle("cancelled");
      },
    });

    return new Response(stream, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
  }

  private feedFreshPressureObservation(): void {
    try {
      const observation = this.getResourcePressureObservation();
      const state = observation.state;
      this.lastResource = {
        severity: state.severity,
        reason: state.reason,
        observedAtMs: state.observedAtMs,
      };
      const key = observationIdentity(state);
      if (state.observedAtMs <= 0) return;
      if (key === this.lastObservationKey) return;
      this.lastObservationKey = key;
      const pressure = toAdmissionPressure(state.severity);
      this.controller.observePressure(pressure);
      this.onPressureObserved?.(pressure);
    } catch {
      // Fail open.
    }
  }
}

function createRuntimeFromResolvedConfig(
  options: AdaptiveAdmissionRuntimeOptions,
  config: AdaptiveAdmissionConfig
): AdaptiveAdmissionRuntime {
  return new AdaptiveAdmissionRuntimeImpl(options, config);
}

/**
 * Create an injected adaptive-admission runtime for tests or process use.
 * Invalid explicit `config` still throws (direct callers want fail-fast).
 */
export function createAdaptiveAdmissionRuntime(
  options: AdaptiveAdmissionRuntimeOptions = {}
): AdaptiveAdmissionRuntime {
  const config =
    options.config ??
    (options.env
      ? resolveAdaptiveAdmissionConfigFromEnv(options.env)
      : { ...DEFAULT_ADAPTIVE_ADMISSION_CONFIG });
  return createRuntimeFromResolvedConfig(options, config);
}

function warnInvalidDefaultConfig(warn: ((message: string) => void) | undefined): void {
  const message =
    "[adaptiveAdmission] invalid environment configuration; using default shadow admission settings";
  if (warn) {
    warn(message);
    return;
  }
  console.warn(message);
}

function createDefaultProcessRuntime(
  options: AdaptiveAdmissionRuntimeOptions = {}
): AdaptiveAdmissionRuntime {
  const warn = options.warn;
  try {
    const config =
      options.config ?? resolveAdaptiveAdmissionConfigFromEnv(options.env ?? process.env);
    return createRuntimeFromResolvedConfig(options, config);
  } catch {
    warnInvalidDefaultConfig(warn);
    return createRuntimeFromResolvedConfig(options, {
      ...DEFAULT_ADAPTIVE_ADMISSION_CONFIG,
    });
  }
}

/** Call-time process-global runtime (HMR-safe via globalThis symbol store). */
export function getAdaptiveAdmissionRuntime(): AdaptiveAdmissionRuntime {
  const store = getRuntimeStore();
  if (!store.runtime) {
    store.runtime = createDefaultProcessRuntime();
  }
  return store.runtime;
}

/** Dispose previous controller and replace the process-global runtime. */
export function reloadAdaptiveAdmissionRuntime(
  options: AdaptiveAdmissionRuntimeOptions = {}
): AdaptiveAdmissionRuntime {
  const store = getRuntimeStore();
  store.runtime?.dispose();
  store.runtime = createDefaultProcessRuntime(options);
  return store.runtime;
}

/** Test isolation: dispose and clear the process-global runtime slot. */
export function resetAdaptiveAdmissionRuntimeForTests(): void {
  const store = getRuntimeStore();
  store.runtime?.dispose();
  store.runtime = null;
}

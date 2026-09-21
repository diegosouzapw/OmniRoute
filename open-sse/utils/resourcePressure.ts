import { checkHeapPressureGuard, HEAP_PRESSURE_THRESHOLD_MB } from "./heapPressure.ts";
import { buildErrorBody } from "./error.ts";
import {
  createResourcePressureTracker,
  resolveResourcePressureThresholds,
  type PressureReason,
  type ResourcePressureState,
  type ResourcePressureThresholds,
  type ResourceSignals,
} from "./resourcePressurePolicy.ts";
import {
  sampleResourceSignals,
  type SampleResourceSignalsDeps,
} from "./resourcePressureSampler.ts";

const MB = 1024 * 1024;
const RETRY_AFTER_SECONDS = "5";
const PRESSURE_MESSAGE = "Service temporarily unavailable due to resource pressure. Retry shortly.";

export type ResourcePressureGuardResult = {
  success: false;
  status: 503;
  error: string;
  response: Response;
};

export type ResourcePressureObservation = {
  signals: ResourceSignals | null;
  state: ResourcePressureState;
};

export type ResourcePressureRuntimeOptions = {
  thresholds?: Partial<ResourcePressureThresholds>;
  heapThresholdMb?: number | null;
  immediateHeapUsedMb?: () => number;
  sample?: () => Promise<ResourceSignals>;
  nowMs?: () => number;
  schedule?: (refresh: () => void) => void;
  staleAfterMs?: number;
  maxStaleMs?: number;
  retryAfterMs?: number;
  samplerDeps?: SampleResourceSignalsDeps;
  selfRestart?: {
    enabled?: boolean;
    afterMs?: number;
    exitCode?: number;
    exitFn?: (code: number) => void;
  };
};

type ResolvedSelfRestart = {
  enabled: boolean;
  afterMs: number;
  exitCode: number;
  exitFn: (code: number) => void;
};

const SELF_RESTART_DEFAULT_AFTER_MS = 120_000;

function envFlagEnabled(raw: string | undefined): boolean {
  return raw != null && /^(1|true|yes|on)$/i.test(raw.trim());
}

function resolveSelfRestartOptions(
  option: ResourcePressureRuntimeOptions["selfRestart"]
): ResolvedSelfRestart {
  const enabled = option?.enabled ?? envFlagEnabled(process.env.OMNIROUTE_PRESSURE_SELF_RESTART);
  const rawAfter = process.env.OMNIROUTE_PRESSURE_SELF_RESTART_AFTER_MS;
  const envAfter =
    rawAfter != null && rawAfter.trim().length > 0 && Number.isFinite(Number(rawAfter))
      ? Number(rawAfter)
      : undefined;
  const afterMs = requireDuration(
    "selfRestart.afterMs",
    option?.afterMs ?? envAfter ?? SELF_RESTART_DEFAULT_AFTER_MS
  );
  const exitCode = option?.exitCode ?? 1;
  if (!Number.isInteger(exitCode) || exitCode < 1 || exitCode > 255) {
    throw new RangeError("selfRestart.exitCode must be an integer between 1 and 255");
  }
  return {
    enabled,
    afterMs,
    exitCode,
    exitFn: option?.exitFn ?? ((code) => process.exit(code)),
  };
}

/**
 * One structured line when the tracker first enters critical. The 2026-09-07
 * P0 (cgroup working set pinned at the 5 GiB cap for 36 minutes, then a full
 * HTTP stall) reached us with zero diagnostic context beyond the shed reason,
 * so the first transition now dumps the numbers an operator needs to tell a
 * real leak from a mistuned guard.
 */
function logCriticalTransitionDiagnostics(
  reason: PressureReason,
  signals: ResourceSignals | null
): void {
  const usage = process.memoryUsage();
  const cgroup = signals?.cgroup;
  console.warn(
    `[resourcePressure] entered critical (reason=${reason}) ` +
      formatPressureDetail({
        heapUsedMb: Math.round(usage.heapUsed / MB),
        heapTotalMb: Math.round(usage.heapTotal / MB),
        rssMb: Math.round(usage.rss / MB),
        externalMb: Math.round(usage.external / MB),
        arrayBuffersMb: Math.round(usage.arrayBuffers / MB),
        cgroupCurrentMb: cgroup?.currentBytes != null ? Math.round(cgroup.currentBytes / MB) : null,
        cgroupFileMb: cgroup?.fileBytes != null ? Math.round(cgroup.fileBytes / MB) : null,
        cgroupMaxMb: cgroup?.maxBytes != null ? Math.round(cgroup.maxBytes / MB) : null,
        psiSomeAvg10: signals?.psi?.someAvg10 ?? null,
        psiFullAvg10: signals?.psi?.fullAvg10 ?? null,
      })
  );
}

export type ResourcePressureRuntime = {
  check: () => ResourcePressureGuardResult | null;
  getObservation: () => ResourcePressureObservation;
  whenRefreshSettled: () => Promise<void>;
  dispose: () => void;
};

function emptyState(): ResourcePressureState {
  return {
    severity: "normal",
    reason: "none",
    elevatedStreak: 0,
    recoveryStreak: 0,
    lastTransitionAtMs: 0,
    observedAtMs: 0,
  };
}

function requireDuration(name: string, value: number): number {
  if (!Number.isFinite(value) || !Number.isInteger(value) || value < 0 || value > 3_600_000) {
    throw new RangeError(`${name} must be an integer between 0 and 3600000`);
  }
  return value;
}

/**
 * Human-readable key=value detail appended to the rejection log line. Every
 * rejection (immediate heap trip AND cached-critical-state reuse) goes
 * through here, so this is the one place that needs the actual numbers —
 * the bare reason code alone ("psi_some") gives an operator nothing to act
 * on when deciding whether the guard is mistuned vs. genuinely saturated.
 */
function formatPressureDetail(detail: Record<string, number | string | null | undefined>): string {
  return Object.entries(detail)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => `${key}=${value ?? "null"}`)
    .join(" ");
}

/** Builds buildCriticalGuard's detail object for the cached-critical-state
 * reuse path in check() -- pulled out of check() itself so that function's
 * own cyclomatic complexity stays under the ratchet, not because this needs
 * to be reused anywhere else. */
function describeCachedPressure(params: {
  signals: ResourceSignals | null;
  recoveryStreak: number;
  cacheAgeMs: number;
}): Record<string, number | string | null> {
  const cgroup = params.signals?.cgroup;
  return {
    psiSomeAvg10: params.signals?.psi?.someAvg10 ?? null,
    psiFullAvg10: params.signals?.psi?.fullAvg10 ?? null,
    cgroupCurrentMb: cgroup?.currentBytes ? Math.round(cgroup.currentBytes / MB) : null,
    cgroupMaxMb: cgroup?.maxBytes ? Math.round(cgroup.maxBytes / MB) : null,
    recoveryStreak: params.recoveryStreak,
    sampleAgeMs: params.cacheAgeMs,
  };
}

function buildCriticalGuard(
  reason: PressureReason,
  detail: Record<string, number | string | null | undefined> = {}
): ResourcePressureGuardResult {
  const detailText = formatPressureDetail(detail);
  console.warn(
    `[resourcePressure] critical pressure guard tripped (reason=${reason}${detailText ? " " + detailText : ""}); returning 503`
  );
  return {
    success: false,
    status: 503,
    error: PRESSURE_MESSAGE,
    response: new Response(
      JSON.stringify(
        buildErrorBody(503, PRESSURE_MESSAGE, undefined, {
          type: "server_error",
          code: "resource_pressure",
        })
      ),
      {
        status: 503,
        headers: { "Content-Type": "application/json", "Retry-After": RETRY_AFTER_SECONDS },
      }
    ),
  };
}

function immediateHeapGuard(
  heapUsedMb: number,
  thresholdMb: number | null
): ResourcePressureGuardResult | null {
  if (thresholdMb == null) return null;
  const guard = checkHeapPressureGuard(heapUsedMb, thresholdMb);
  if (!guard) return null;
  return buildCriticalGuard("v8_heap_absolute", {
    heapUsedMb: Math.round(heapUsedMb),
    thresholdMb: Math.round(thresholdMb),
  });
}

export function createResourcePressureRuntime(
  options: ResourcePressureRuntimeOptions = {}
): ResourcePressureRuntime {
  const heapThresholdMb =
    options.heapThresholdMb === undefined ? HEAP_PRESSURE_THRESHOLD_MB : options.heapThresholdMb;
  if (heapThresholdMb !== null && (!Number.isFinite(heapThresholdMb) || heapThresholdMb <= 0)) {
    throw new RangeError("heapThresholdMb must be positive and finite or null");
  }
  const thresholds = resolveResourcePressureThresholds({
    ...options.thresholds,
    heapAbsoluteThresholdMb:
      options.thresholds?.heapAbsoluteThresholdMb === undefined
        ? null
        : options.thresholds.heapAbsoluteThresholdMb,
  });
  const staleAfterMs = requireDuration("staleAfterMs", options.staleAfterMs ?? 1_000);
  const maxStaleMs = requireDuration("maxStaleMs", options.maxStaleMs ?? 30_000);
  const retryAfterMs = requireDuration("retryAfterMs", options.retryAfterMs ?? 1_000);
  if (maxStaleMs < staleAfterMs) {
    throw new RangeError("maxStaleMs must be greater than or equal to staleAfterMs");
  }

  const nowMs = options.nowMs ?? Date.now;
  const immediateHeapUsedMb =
    options.immediateHeapUsedMb ?? (() => process.memoryUsage().heapUsed / MB);
  const sample = options.sample ?? (() => sampleResourceSignals(options.samplerDeps));
  const schedule =
    options.schedule ??
    ((refresh) => {
      const handle = setImmediate(refresh);
      handle.unref();
    });
  const tracker = createResourcePressureTracker(thresholds);
  const selfRestart = resolveSelfRestartOptions(options.selfRestart);

  let lastSignals: ResourceSignals | null = null;
  let state = emptyState();
  let lastRefreshAtMs = Number.NEGATIVE_INFINITY;
  let nextRefreshAtMs = Number.NEGATIVE_INFINITY;
  let scheduled = false;
  let inFlight: Promise<void> | null = null;
  let disposed = false;
  let criticalSinceMs: number | null = null;
  let selfRestartFired = false;

  const observeSelfRestart = (settledAtMs: number): void => {
    if (state.severity !== "critical") {
      criticalSinceMs = null;
      return;
    }
    if (criticalSinceMs === null) {
      criticalSinceMs = settledAtMs;
      logCriticalTransitionDiagnostics(state.reason, lastSignals);
      return;
    }
    if (
      !selfRestart.enabled ||
      selfRestartFired ||
      settledAtMs - criticalSinceMs < selfRestart.afterMs
    ) {
      return;
    }
    // Sustained critical means the process can no longer serve reliably (the
    // 2026-09-07 outage: 36 minutes of global 503s, then a fully stalled event
    // loop until an operator restarted the container by hand). Exiting lets the
    // supervisor (systemd Restart=always) bring back a clean process in seconds
    // instead of leaving every caller wedged until human intervention.
    console.error(
      `[resourcePressure] critical pressure sustained for ${settledAtMs - criticalSinceMs}ms ` +
        `(>= ${selfRestart.afterMs}ms); exiting with code ${selfRestart.exitCode} so the supervisor restarts a clean process`
    );
    try {
      selfRestart.exitFn(selfRestart.exitCode);
      // Only reached when a custom exitFn returns (tests); process.exit never does.
      selfRestartFired = true;
    } catch (error: unknown) {
      // A throwing exitFn must not brick the circuit: reset so the next sustained
      // critical window retries, and log loudly since the pre-exit line above
      // already claimed the process was leaving.
      criticalSinceMs = null;
      const message = error instanceof Error ? error.message : String(error);
      console.error(`[resourcePressure] self-restart exit failed, circuit re-armed: ${message}`);
    }
  };

  const refresh = (): void => {
    if (disposed || inFlight) return;
    scheduled = false;
    inFlight = Promise.resolve()
      .then(sample)
      .then((signals) => {
        if (disposed) return;
        const settledAtMs = nowMs();
        lastSignals = signals;
        state = tracker.observe(signals);
        observeSelfRestart(settledAtMs);
        lastRefreshAtMs = settledAtMs;
        nextRefreshAtMs = settledAtMs + staleAfterMs;
      })
      .catch(() => {
        if (!disposed) nextRefreshAtMs = nowMs() + retryAfterMs;
      })
      .finally(() => {
        inFlight = null;
      });
  };

  const scheduleRefresh = (): void => {
    if (disposed || scheduled || inFlight) return;
    scheduled = true;
    schedule(refresh);
  };

  // The self-restart circuit measures *sustained* critical time, so it must not
  // depend on incoming requests to advance: during an outage clients back off and
  // check() may not be called for long stretches. An unref'd driver re-arms the
  // refresh whenever the circuit is armed. A fully stalled event loop still can't
  // be unwedged from inside the process — that case belongs to the supervisor's
  // own watchdog, not to this circuit.
  let selfRestartDriver: NodeJS.Timeout | null = null;
  if (selfRestart.enabled) {
    const driverIntervalMs = Math.max(1_000, Math.min(staleAfterMs, 10_000));
    selfRestartDriver = setInterval(() => {
      if (disposed) return;
      nextRefreshAtMs = Math.min(nextRefreshAtMs, nowMs());
      scheduleRefresh();
    }, driverIntervalMs);
    selfRestartDriver.unref?.();
  }

  return {
    check() {
      let heapUsedMb = 0;
      try {
        heapUsedMb = immediateHeapUsedMb();
      } catch {
        heapUsedMb = 0;
      }
      const immediate = immediateHeapGuard(heapUsedMb, heapThresholdMb);
      const now = nowMs();
      if (now >= nextRefreshAtMs) scheduleRefresh();
      if (immediate) {
        state = {
          severity: "critical",
          reason: "v8_heap_absolute",
          elevatedStreak: 0,
          recoveryStreak: 0,
          lastTransitionAtMs: now,
          observedAtMs: now,
        };
        return immediate;
      }
      const cacheAge = lastSignals ? Math.max(0, now - lastRefreshAtMs) : Number.POSITIVE_INFINITY;
      if (cacheAge > maxStaleMs || state.severity !== "critical") {
        return null;
      }
      return buildCriticalGuard(
        state.reason,
        describeCachedPressure({
          signals: lastSignals,
          recoveryStreak: state.recoveryStreak,
          cacheAgeMs: cacheAge,
        })
      );
    },
    getObservation: () => ({ signals: lastSignals, state }),
    whenRefreshSettled: async () => {
      if (scheduled) await new Promise<void>((resolve) => setImmediate(resolve));
      if (inFlight) await inFlight;
    },
    dispose() {
      disposed = true;
      scheduled = false;
      if (selfRestartDriver) {
        clearInterval(selfRestartDriver);
        selfRestartDriver = null;
      }
    },
  };
}

let defaultRuntime = createResourcePressureRuntime();

export function checkResourcePressureGuard(): ResourcePressureGuardResult | null {
  return defaultRuntime.check();
}

export function getResourcePressureObservation(): ResourcePressureObservation {
  return defaultRuntime.getObservation();
}

/** Replaces and disposes the process singleton when configuration is reloaded. */
export function reloadResourcePressureRuntime(
  options: ResourcePressureRuntimeOptions = {}
): ResourcePressureRuntime {
  defaultRuntime.dispose();
  defaultRuntime = createResourcePressureRuntime(options);
  return defaultRuntime;
}

export type {
  PressureReason,
  PressureSeverity,
  ResourceMetricBytes,
  ResourcePressureState,
  ResourcePressureThresholds,
  ResourcePressureTracker,
  ResourceSignals,
} from "./resourcePressurePolicy.ts";
export {
  classifyAdaptiveResourcePressure as classifyResourcePressure,
  createResourcePressureTracker,
  resolveResourcePressureThresholds,
} from "./resourcePressurePolicy.ts";
export {
  sampleResourceSignals,
  sanitizeMemoryBytes,
  type ResourcePressureFs,
  type SampleResourceSignalsDeps,
} from "./resourcePressureSampler.ts";

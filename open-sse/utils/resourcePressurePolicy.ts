const MB = 1024 * 1024;
const MAX_SUSTAINED_SAMPLES = 10_000;

export type PressureSeverity = "normal" | "high" | "critical";

export type PressureReason =
  | "none"
  | "v8_heap_ratio"
  | "v8_heap_absolute"
  | "cgroup_ratio"
  | "cgroup_high"
  | "psi_some"
  | "psi_full"
  | "oom_event";

export type ResourceMetricBytes = number | null;

export type ResourceSignals = {
  observedAtMs: number;
  v8: { heapUsedBytes: number; heapLimitBytes: number };
  process: {
    rssBytes: number;
    externalBytes: number;
    arrayBuffersBytes: number;
    availableBytes: ResourceMetricBytes;
    constrainedBytes: ResourceMetricBytes;
  };
  cgroup: {
    currentBytes: ResourceMetricBytes;
    maxBytes: ResourceMetricBytes;
    highBytes: ResourceMetricBytes;
    events: {
      low: ResourceMetricBytes;
      high: ResourceMetricBytes;
      max: ResourceMetricBytes;
      oom: ResourceMetricBytes;
      oom_kill: ResourceMetricBytes;
    } | null;
  };
  psi: {
    someAvg10: number | null;
    someAvg60: number | null;
    someAvg300: number | null;
    fullAvg10: number | null;
    fullAvg60: number | null;
    fullAvg300: number | null;
  } | null;
};

export type ResourcePressureState = {
  severity: PressureSeverity;
  reason: PressureReason;
  elevatedStreak: number;
  recoveryStreak: number;
  lastTransitionAtMs: number;
  observedAtMs: number;
};

export type ResourcePressureThresholds = {
  highRatio: number;
  criticalRatio: number;
  recoveryRatio: number;
  highPsiAvg10: number;
  criticalPsiAvg10: number;
  recoveryPsiAvg10: number;
  sustainedSamplesHigh: number;
  sustainedSamplesCritical: number;
  sustainedSamplesRecovery: number;
  heapAbsoluteThresholdMb: number | null;
};

export const DEFAULT_RESOURCE_PRESSURE_THRESHOLDS: ResourcePressureThresholds = {
  highRatio: 0.85,
  criticalRatio: 0.92,
  recoveryRatio: 0.75,
  highPsiAvg10: 20,
  criticalPsiAvg10: 40,
  recoveryPsiAvg10: 10,
  sustainedSamplesHigh: 2,
  sustainedSamplesCritical: 2,
  sustainedSamplesRecovery: 3,
  heapAbsoluteThresholdMb: null,
};

type RawLevel = { severity: PressureSeverity; reason: PressureReason };
type OomCounters = { oom: number | null; oomKill: number | null };

function requireFiniteRange(name: string, value: number, minimum: number, maximum: number): void {
  if (!Number.isFinite(value) || value < minimum || value > maximum) {
    throw new RangeError(`${name} must be finite and between ${minimum} and ${maximum}`);
  }
}

function requirePositiveInteger(name: string, value: number): void {
  if (!Number.isInteger(value) || value < 1 || value > MAX_SUSTAINED_SAMPLES) {
    throw new RangeError(`${name} must be an integer between 1 and ${MAX_SUSTAINED_SAMPLES}`);
  }
}

export function resolveResourcePressureThresholds(
  partial: Partial<ResourcePressureThresholds> = {}
): ResourcePressureThresholds {
  const resolved = { ...DEFAULT_RESOURCE_PRESSURE_THRESHOLDS, ...partial };
  requireFiniteRange("recoveryRatio", resolved.recoveryRatio, 0, 1);
  requireFiniteRange("highRatio", resolved.highRatio, 0, 1);
  requireFiniteRange("criticalRatio", resolved.criticalRatio, 0, 1);
  if (!(
    resolved.recoveryRatio < resolved.highRatio && resolved.highRatio < resolved.criticalRatio
  )) {
    throw new RangeError("ratio thresholds must satisfy recovery < high < critical");
  }

  requireFiniteRange("recoveryPsiAvg10", resolved.recoveryPsiAvg10, 0, 100);
  requireFiniteRange("highPsiAvg10", resolved.highPsiAvg10, 0, 100);
  requireFiniteRange("criticalPsiAvg10", resolved.criticalPsiAvg10, 0, 100);
  if (!(
    resolved.recoveryPsiAvg10 < resolved.highPsiAvg10 &&
    resolved.highPsiAvg10 < resolved.criticalPsiAvg10
  )) {
    throw new RangeError("PSI thresholds must satisfy recovery < high < critical");
  }

  requirePositiveInteger("sustainedSamplesHigh", resolved.sustainedSamplesHigh);
  requirePositiveInteger("sustainedSamplesCritical", resolved.sustainedSamplesCritical);
  requirePositiveInteger("sustainedSamplesRecovery", resolved.sustainedSamplesRecovery);
  if (
    resolved.heapAbsoluteThresholdMb !== null &&
    (!Number.isFinite(resolved.heapAbsoluteThresholdMb) || resolved.heapAbsoluteThresholdMb <= 0)
  ) {
    throw new RangeError("heapAbsoluteThresholdMb must be positive and finite or null");
  }
  return resolved;
}

function severityRank(severity: PressureSeverity): number {
  return severity === "critical" ? 2 : severity === "high" ? 1 : 0;
}

function maxLevel(current: RawLevel, candidate: RawLevel | null): RawLevel {
  if (!candidate || severityRank(candidate.severity) <= severityRank(current.severity)) {
    return current;
  }
  return candidate;
}

function ratioLevel(
  used: number | null,
  limit: number | null,
  thresholds: ResourcePressureThresholds,
  reason: PressureReason
): RawLevel | null {
  if (used == null || limit == null || used < 0 || limit <= 0) return null;
  const ratio = used / limit;
  if (ratio >= thresholds.criticalRatio) return { severity: "critical", reason };
  if (ratio >= thresholds.highRatio) return { severity: "high", reason };
  return null;
}

function psiLevel(
  value: number | null,
  thresholds: ResourcePressureThresholds,
  reason: Extract<PressureReason, "psi_some" | "psi_full">
): RawLevel | null {
  if (value == null || !Number.isFinite(value)) return null;
  if (value >= thresholds.criticalPsiAvg10) return { severity: "critical", reason };
  if (value >= thresholds.highPsiAvg10) return { severity: "high", reason };
  return null;
}

export function classifyAdaptiveResourcePressure(
  signals: ResourceSignals,
  thresholds: ResourcePressureThresholds
): RawLevel {
  let best: RawLevel = { severity: "normal", reason: "none" };
  best = maxLevel(
    best,
    ratioLevel(signals.v8.heapUsedBytes, signals.v8.heapLimitBytes, thresholds, "v8_heap_ratio")
  );
  best = maxLevel(
    best,
    ratioLevel(signals.cgroup.currentBytes, signals.cgroup.maxBytes, thresholds, "cgroup_ratio")
  );
  best = maxLevel(
    best,
    ratioLevel(signals.cgroup.currentBytes, signals.cgroup.highBytes, thresholds, "cgroup_high")
  );
  best = maxLevel(best, psiLevel(signals.psi?.someAvg10 ?? null, thresholds, "psi_some"));
  return maxLevel(best, psiLevel(signals.psi?.fullAvg10 ?? null, thresholds, "psi_full"));
}

function isRecovered(signals: ResourceSignals, thresholds: ResourcePressureThresholds): boolean {
  const ratios: Array<readonly [number | null, number | null]> = [
    [signals.v8.heapUsedBytes, signals.v8.heapLimitBytes],
    [signals.cgroup.currentBytes, signals.cgroup.maxBytes],
    [signals.cgroup.currentBytes, signals.cgroup.highBytes],
  ];
  if (
    ratios.some(
      ([used, limit]) =>
        used != null && limit != null && limit > 0 && used / limit > thresholds.recoveryRatio
    )
  ) {
    return false;
  }
  if (
    thresholds.heapAbsoluteThresholdMb != null &&
    signals.v8.heapUsedBytes / MB > thresholds.heapAbsoluteThresholdMb * thresholds.recoveryRatio
  ) {
    return false;
  }
  return ![signals.psi?.someAvg10, signals.psi?.fullAvg10].some(
    (value) => value != null && value > thresholds.recoveryPsiAvg10
  );
}

function hasCounterIncrease(previous: OomCounters, current: OomCounters): boolean {
  return (
    (previous.oom != null && current.oom != null && current.oom > previous.oom) ||
    (previous.oomKill != null && current.oomKill != null && current.oomKill > previous.oomKill)
  );
}

function countersReset(previous: OomCounters, current: OomCounters): boolean {
  return (
    (previous.oom != null && current.oom != null && current.oom < previous.oom) ||
    (previous.oomKill != null && current.oomKill != null && current.oomKill < previous.oomKill)
  );
}

function initialState(): ResourcePressureState {
  return {
    severity: "normal",
    reason: "none",
    elevatedStreak: 0,
    recoveryStreak: 0,
    lastTransitionAtMs: 0,
    observedAtMs: 0,
  };
}

export type ResourcePressureTracker = {
  observe: (signals: ResourceSignals) => ResourcePressureState;
  getState: () => ResourcePressureState;
};

export function createResourcePressureTracker(
  partialThresholds: Partial<ResourcePressureThresholds> = {}
): ResourcePressureTracker {
  const thresholds = resolveResourcePressureThresholds(partialThresholds);
  let state = initialState();
  let pending: RawLevel | null = null;
  let previousOom: OomCounters | null = null;

  return {
    observe(signals) {
      const events = signals.cgroup.events;
      const currentOom = events ? { oom: events.oom, oomKill: events.oom_kill } : null;
      let oomEvent = false;
      if (currentOom) {
        if (previousOom && !countersReset(previousOom, currentOom)) {
          oomEvent = hasCounterIncrease(previousOom, currentOom);
        }
        previousOom = currentOom;
      } else {
        previousOom = null;
      }

      const raw = oomEvent
        ? ({ severity: "critical", reason: "oom_event" } as const)
        : classifyAdaptiveResourcePressure(signals, thresholds);
      let { severity, reason, elevatedStreak, recoveryStreak } = state;

      if (oomEvent) {
        severity = "critical";
        reason = "oom_event";
        elevatedStreak = 0;
        recoveryStreak = 0;
        pending = null;
      } else if (severity === "normal") {
        recoveryStreak = 0;
        if (raw.severity === "normal") {
          pending = null;
          elevatedStreak = 0;
          reason = "none";
        } else {
          const samePending = pending?.severity === raw.severity && pending.reason === raw.reason;
          pending = raw;
          elevatedStreak = samePending ? elevatedStreak + 1 : 1;
          const needed =
            raw.severity === "critical"
              ? thresholds.sustainedSamplesCritical
              : thresholds.sustainedSamplesHigh;
          if (elevatedStreak >= needed) {
            severity = raw.severity;
            reason = raw.reason;
            elevatedStreak = 0;
            pending = null;
          }
        }
      } else if (severity === "high" && raw.severity === "critical") {
        recoveryStreak = 0;
        const samePending = pending?.severity === "critical" && pending.reason === raw.reason;
        pending = raw;
        elevatedStreak = samePending ? elevatedStreak + 1 : 1;
        if (elevatedStreak >= thresholds.sustainedSamplesCritical) {
          severity = "critical";
          reason = raw.reason;
          elevatedStreak = 0;
          pending = null;
        }
      } else if (raw.severity === severity) {
        reason = raw.reason;
        pending = null;
        elevatedStreak = 0;
        recoveryStreak = 0;
      } else if (isRecovered(signals, thresholds)) {
        pending = null;
        elevatedStreak = 0;
        recoveryStreak += 1;
        if (recoveryStreak >= thresholds.sustainedSamplesRecovery) {
          severity = "normal";
          reason = "none";
          recoveryStreak = 0;
        }
      } else {
        pending = null;
        elevatedStreak = 0;
        recoveryStreak = 0;
      }

      const transitioned = severity !== state.severity || reason !== state.reason;
      state = {
        severity,
        reason,
        elevatedStreak,
        recoveryStreak,
        lastTransitionAtMs: transitioned ? signals.observedAtMs : state.lastTransitionAtMs,
        observedAtMs: signals.observedAtMs,
      };
      return state;
    },
    getState: () => state,
  };
}

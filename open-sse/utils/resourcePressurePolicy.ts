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
    fileBytes: ResourceMetricBytes;
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
    psiSource?: "cgroup" | "host" | null;
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

/** #13124: host-wide PSI is not this process. Operators can ignore it. */
export function psiPressureDisabled(): boolean {
  const raw = process.env.OMNIROUTE_PRESSURE_PSI_DISABLED?.trim().toLowerCase();
  return raw === "1" || raw === "true" || raw === "yes" || raw === "on";
}

export const DEFAULT_RESOURCE_PRESSURE_THRESHOLDS: ResourcePressureThresholds = {
  highRatio: 0.85,
  criticalRatio: 0.92,
  recoveryRatio: 0.75,
  // Bumped 50% (20/40/10 -> 30/60/15): /proc/pressure/memory reflects
  // HOST-wide PSI, not this process's own cgroup pressure (confirmed by
  // comparing /proc/pressure/memory against /sys/fs/cgroup/memory.pressure
  // from inside a running container -- the two differ). On a shared host
  // running many unrelated workloads, host-wide memory contention from
  // OTHER processes was tripping this guard even while OmniRoute's own
  // usage stayed trivial. The ratio-based thresholds above stay untouched
  // -- they're this process's own real OOM safety margin and unaffected by
  // noisy neighbors.
  highPsiAvg10: 30,
  criticalPsiAvg10: 60,
  recoveryPsiAvg10: 15,
  sustainedSamplesHigh: 2,
  sustainedSamplesCritical: 2,
  // PSI's own avg10 is a kernel-computed 10s rolling average, so it already
  // lags real recovery by design -- requiring 3 consecutive samples *on top*
  // of that (at the ~1s default sample cadence) stacked another ~2-3s of
  // guard-still-shedding time after the process was actually fine again.
  // isRecovered() already requires every tracked ratio/PSI value to clear
  // the separate, more conservative recoveryRatio/recoveryPsiAvg10
  // thresholds (not just dip under the critical ones), so a single clean
  // sample is real signal, not noise -- the streak requirement was adding
  // redundant delay on top of an already-conservative bar.
  sustainedSamplesRecovery: 1,
  heapAbsoluteThresholdMb: null,
};

type RawLevel = { severity: PressureSeverity; reason: PressureReason };
type OomCounters = { oom: number | null; oomKill: number | null };
type ThrottleCounters = { high: number | null; max: number | null };

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

export type ThrottleProof = true | false | null;

function hasCounterIncreaseGeneric(previous: ThrottleCounters, current: ThrottleCounters): boolean {
  return (
    (previous.high != null && current.high != null && current.high > previous.high) ||
    (previous.max != null && current.max != null && current.max > previous.max)
  );
}

function throttleCountersReset(previous: ThrottleCounters, current: ThrottleCounters): boolean {
  return (
    (previous.high != null && current.high != null && current.high < previous.high) ||
    (previous.max != null && current.max != null && current.max < previous.max)
  );
}

// True only on kernel evidence of real throttling: a memory.events high/max
// increase across the sample window, or cgroup memory PSI above zero. Host PSI
// alone never counts while cgroup events are readable (noisy neighbors), and
// the operator PSI opt-out disables the PSI safety net entirely. Null means
// proof is unavailable (no events and no PSI): the caller keeps the raw ratio.
export function hasKernelThrottleProof(
  signals: ResourceSignals,
  previousEvents: ThrottleCounters | null = null
): ThrottleProof {
  const events = signals.cgroup.events;
  const psi = signals.psi;
  const psiAboveZero =
    (psi?.someAvg10 != null && psi.someAvg10 > 0) || (psi?.fullAvg10 != null && psi.fullAvg10 > 0);
  const cgroupPsi = psi?.psiSource === "cgroup";
  if (events == null) {
    if (psi == null) return null;
    if (psiPressureDisabled()) return null;
    return psiAboveZero ? true : false;
  }
  const current: ThrottleCounters = { high: events.high, max: events.max };
  if (previousEvents) {
    if (throttleCountersReset(previousEvents, current)) return false;
    if (hasCounterIncreaseGeneric(previousEvents, current)) return true;
    if (psi == null || psiPressureDisabled()) return false;
    if (cgroupPsi && psiAboveZero) return true;
    return false;
  }
  if (psi == null) return events.high == null && events.max == null ? null : false;
  if (psiPressureDisabled()) return false;
  if (psiAboveZero && (cgroupPsi || events == null)) return true;
  return false;
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
  // memory.current includes reclaimable page cache; the kernel drops those
  // pages under allocation pressure (memory.events high/max stay 0). Ratio the
  // working set (current minus file cache) so cache-heavy-but-healthy hosts do
  // not trip the guard. Without memory.stat, fall back to the raw ratio.
  // memory.high keeps the raw current: the kernel throttles on TOTAL charge
  // (file cache included) when crossing high, so a workingset ratio there
  // would miss kernel-side reclaim stalls.
  const cgroupWorkingSetBytes = workingSetBytes(signals.cgroup);
  best = maxLevel(
    best,
    ratioLevel(cgroupWorkingSetBytes, signals.cgroup.maxBytes, thresholds, "cgroup_ratio")
  );
  best = maxLevel(best, cgroupHighLevel(signals, thresholds));
  if (psiPressureDisabled()) return best;
  best = maxLevel(best, psiLevel(signals.psi?.someAvg10 ?? null, thresholds, "psi_some"));
  return maxLevel(best, psiLevel(signals.psi?.fullAvg10 ?? null, thresholds, "psi_full"));
}

export function classifyAdaptiveResourcePressureWithHistory(
  signals: ResourceSignals,
  thresholds: ResourcePressureThresholds,
  previousEvents: ThrottleCounters | null = null
): RawLevel {
  let best: RawLevel = { severity: "normal", reason: "none" };
  best = maxLevel(
    best,
    ratioLevel(signals.v8.heapUsedBytes, signals.v8.heapLimitBytes, thresholds, "v8_heap_ratio")
  );
  const cgroupWorkingSetBytes = workingSetBytes(signals.cgroup);
  best = maxLevel(
    best,
    ratioLevel(cgroupWorkingSetBytes, signals.cgroup.maxBytes, thresholds, "cgroup_ratio")
  );
  const highRatio = ratioLevel(
    signals.cgroup.currentBytes,
    signals.cgroup.highBytes,
    thresholds,
    "cgroup_high"
  );
  // A raw total above the high mark only becomes critical on kernel proof of
  // real throttling; without proof it stays an informative high that never
  // returns 503. Hosts without memory.events keep the raw ratio (fallback).
  // NOTE: events == null with PSI present still consults the proof: PSI > 0
  // proves (recovery net), PSI == 0 caps at high. Only events == null AND
  // PSI == null keeps the raw critical (no signal at all: fail open toward
  // the old behavior).
  if (highRatio?.severity === "critical") {
    const proof = hasKernelThrottleProof(signals, previousEvents);
    best = maxLevel(
      best,
      proof === false ? { severity: "high", reason: "cgroup_high" } : highRatio
    );
  } else {
    best = maxLevel(best, highRatio);
  }
  if (psiPressureDisabled()) return best;
  best = maxLevel(best, psiLevel(signals.psi?.someAvg10 ?? null, thresholds, "psi_some"));
  return maxLevel(best, psiLevel(signals.psi?.fullAvg10 ?? null, thresholds, "psi_full"));
}

function cgroupHighLevel(
  signals: ResourceSignals,
  thresholds: ResourcePressureThresholds
): RawLevel | null {
  const highRatio = ratioLevel(
    signals.cgroup.currentBytes,
    signals.cgroup.highBytes,
    thresholds,
    "cgroup_high"
  );
  if (highRatio?.severity === "critical") {
    // No event history on the stateless path: without proof the raw total
    // above high stays an informative high, never critical.
    return { severity: "high", reason: "cgroup_high" };
  }
  return highRatio;
}

function workingSetBytes(cgroup: ResourceSignals["cgroup"]): number | null {
  if (cgroup.currentBytes == null) return null;
  if (cgroup.fileBytes == null || cgroup.fileBytes <= 0) return cgroup.currentBytes;
  // memory.current and memory.stat are separate, non-atomic reads; under churn
  // file can momentarily exceed a fresher current. Treat that as a bad sample
  // and fall back to the raw ratio rather than clamping to 0, which would
  // read as zero pressure and could force a premature recovery.
  if (cgroup.fileBytes > cgroup.currentBytes) return cgroup.currentBytes;
  return cgroup.currentBytes - cgroup.fileBytes;
}

function isRecovered(signals: ResourceSignals, thresholds: ResourcePressureThresholds): boolean {
  const cgroupWorkingSetBytes = workingSetBytes(signals.cgroup);
  const ratios: Array<readonly [number | null, number | null]> = [
    [signals.v8.heapUsedBytes, signals.v8.heapLimitBytes],
    [cgroupWorkingSetBytes, signals.cgroup.maxBytes],
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
  if (psiPressureDisabled()) return true;
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
  let previousEvents: ThrottleCounters | null = null;

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

      const currentEvents: ThrottleCounters | null = events
        ? { high: events.high, max: events.max }
        : null;
      if (previousEvents && currentEvents && throttleCountersReset(previousEvents, currentEvents)) {
        previousEvents = currentEvents;
      }

      const raw = oomEvent
        ? ({ severity: "critical", reason: "oom_event" } as const)
        : classifyAdaptiveResourcePressureWithHistory(signals, thresholds, previousEvents);
      if (currentEvents) {
        previousEvents = currentEvents;
      } else {
        previousEvents = null;
      }
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

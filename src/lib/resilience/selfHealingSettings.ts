/**
 * selfHealingSettings.ts — Phase 3 self-healing v2 tunables.
 *
 * One self-contained settings bucket per the resilience/nested-settings
 * convention. Stored in the same settings table as the rest of
 * ResilienceSettings — read at boot time by SelfHealingManager.
 *
 * Note the `enabled` flag at the top: even with everything else set, the
 * rest of the surfaces (anomaly detection, persistence, playbooks) all
 * skip work when this is false.
 */

type JsonRecord = Record<string, unknown>;

// ─────────────────── Tunables ───────────────────

export interface SelfHealingSettings {
  /** Phase 3 self-healing v2 master switch. When false, AnomalyDetector
   *  is not invoked and PlaybookDispatcher just noops. Default: false. */
  enabled: boolean;
  /** Rolling detector window length (samples). Default: 60. */
  windowSize: number;
  /** Default z-score threshold for "warn" tier. Default: 2.5. */
  warnThreshold: number;
  /** Default z-score threshold for "critical" tier. Default: 4.0. */
  criticalThreshold: number;
  /** Cold-start guard: samples required before detection fires. Default: 15. */
  minSamplesForDetection: number;
  /** How long to retain historical samples in the SQLite log (seconds).
   *  SelfHealingManager prunes older rows on boot and at each detection
   *  cycle. Default: 86400 (24h). */
  retentionSeconds: number;
  /** Master switch for the playbook dispatcher. Even when `enabled` is
   *  true, the playbook dispatcher can be turned off independently. */
  playbookEnabled: boolean;
  /** Number of distinct anomaly signals required before the same provider
   *  is playbook-dispatched within a single cycle. Default: 1 — bias
   *  toward acting. */
  minSignalsPerDispatch: number;
  /** Cooldown between playbook actions on the same provider (ms).
   *  Prevents runaway loops when an anomaly persists. Default: 60000. */
  interActionCooldownMs: number;
  /** Legacy manager threshold retained for the self-healing coordinator. */
  zScoreThreshold: number;
  /** Legacy manager sample guard retained for the self-healing coordinator. */
  minSamplesBeforeAlert: number;
  /** Legacy dry-run switch retained for persisted playbook dispatch. */
  dryRun: boolean;
  /** Legacy per-provider action cap retained for update detection. */
  maxActionsPerProviderPerHour: number;
}

export const DEFAULT_SELF_HEALING_SETTINGS: SelfHealingSettings = {
  enabled: false,
  windowSize: 60,
  warnThreshold: 2.5,
  criticalThreshold: 4.0,
  minSamplesForDetection: 15,
  retentionSeconds: 86_400,
  playbookEnabled: true,
  minSignalsPerDispatch: 1,
  interActionCooldownMs: 60_000,
  zScoreThreshold: 2.5,
  minSamplesBeforeAlert: 15,
  dryRun: false,
  maxActionsPerProviderPerHour: 3,
};

// ─────────────────── Normalizer ───────────────────

export function normalizeSelfHealingSettings(
  raw: unknown
): SelfHealingSettings {
  const rec = asRecord(raw);
  const defaults = DEFAULT_SELF_HEALING_SETTINGS;
  return {
    enabled:
      typeof rec.enabled === "boolean" ? rec.enabled : defaults.enabled,
    windowSize: toInteger(rec.windowSize, defaults.windowSize, {
      min: 5,
      max: 4_000,
    }),
    warnThreshold: numberOr(rec.warnThreshold, defaults.warnThreshold, {
      min: 1.0,
      max: 20.0,
    }),
    criticalThreshold: numberOr(
      rec.criticalThreshold,
      defaults.criticalThreshold,
      { min: 1.0, max: 20.0 }
    ),
    minSamplesForDetection: toInteger(
      rec.minSamplesForDetection,
      defaults.minSamplesForDetection,
      { min: 2, max: 1_000 }
    ),
    retentionSeconds: toInteger(rec.retentionSeconds, defaults.retentionSeconds, {
      min: 60,
      max: 7 * 86_400,
    }),
    playbookEnabled:
      typeof rec.playbookEnabled === "boolean"
        ? rec.playbookEnabled
        : defaults.playbookEnabled,
    minSignalsPerDispatch: toInteger(
      rec.minSignalsPerDispatch,
      defaults.minSignalsPerDispatch,
      { min: 1, max: 20 }
    ),
    interActionCooldownMs: toInteger(
      rec.interActionCooldownMs,
      defaults.interActionCooldownMs,
      { min: 0, max: 24 * 60 * 60 * 1000 }
    ),
    zScoreThreshold: numberOr(
      rec.zScoreThreshold,
      defaults.zScoreThreshold,
      { min: 1.0, max: 20.0 }
    ),
    minSamplesBeforeAlert: toInteger(
      rec.minSamplesBeforeAlert,
      defaults.minSamplesBeforeAlert,
      { min: 2, max: 1_000 }
    ),
    dryRun: typeof rec.dryRun === "boolean" ? rec.dryRun : defaults.dryRun,
    maxActionsPerProviderPerHour: toInteger(
      rec.maxActionsPerProviderPerHour,
      defaults.maxActionsPerProviderPerHour,
      { min: 1, max: 1_000 }
    ),
  };
}

export const resolveSelfHealingSettings = normalizeSelfHealingSettings;

export function selfHealingSettingsToJson(
  settings: SelfHealingSettings
): JsonRecord {
  return {
    enabled: settings.enabled,
    windowSize: settings.windowSize,
    warnThreshold: settings.warnThreshold,
    criticalThreshold: settings.criticalThreshold,
    minSamplesForDetection: settings.minSamplesForDetection,
    retentionSeconds: settings.retentionSeconds,
    playbookEnabled: settings.playbookEnabled,
    minSignalsPerDispatch: settings.minSignalsPerDispatch,
    interActionCooldownMs: settings.interActionCooldownMs,
    zScoreThreshold: settings.zScoreThreshold,
    minSamplesBeforeAlert: settings.minSamplesBeforeAlert,
    dryRun: settings.dryRun,
    maxActionsPerProviderPerHour: settings.maxActionsPerProviderPerHour,
  };
}

// ─────────────────── Local helpers ───────────────────

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as JsonRecord)
    : {};
}

function toInteger(
  value: unknown,
  fallback: number,
  options: { min?: number; max?: number } = {}
): number {
  const min = options.min ?? 0;
  const max = options.max ?? Number.MAX_SAFE_INTEGER;
  const parsed =
    typeof value === "number"
      ? value
      : typeof value === "string" && value.trim().length > 0
        ? Number(value)
        : Number.NaN;
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(max, Math.max(min, Math.trunc(parsed)));
}

function numberOr(
  raw: unknown,
  fallback: number,
  bounds: { min: number; max: number }
): number {
  const parsed =
    typeof raw === "number"
      ? raw
      : typeof raw === "string" && raw.trim().length > 0
        ? Number(raw)
        : Number.NaN;
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(bounds.max, Math.max(bounds.min, parsed));
}

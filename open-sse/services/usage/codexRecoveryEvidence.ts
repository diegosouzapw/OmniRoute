/** Strict recovery evidence is separate from tolerant quota display normalization. */
export interface CodexRecoveryWindow {
  readonly usedPercent: number;
  readonly resetAt: number;
  readonly windowSeconds: number;
}
export interface CodexRecoveryEvidence {
  readonly windows: Readonly<Partial<Record<"session" | "weekly", CodexRecoveryWindow>>>;
}
const evidence = new WeakMap<object, CodexRecoveryEvidence>();
function record(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

/** Called only on the actual successful Codex usage response, before coercion. */
export function retainCodexRecoveryEvidence(raw: unknown, usage: object): void {
  const rate = record(record(raw)?.rate_limit);
  if (!rate || rate.limit_reached !== false) return;
  const windows: Partial<Record<"session" | "weekly", CodexRecoveryWindow>> = {};
  for (const [rawKey, key] of [
    ["primary_window", "session"],
    ["secondary_window", "weekly"],
  ] as const) {
    if (!Object.hasOwn(rate, rawKey)) return;
    if (rate[rawKey] === null) continue;
    const w = record(rate[rawKey]);
    if (!w) return;
    const used = w.used_percent,
      reset = w.reset_at,
      seconds = w.limit_window_seconds;
    if (
      typeof used !== "number" ||
      !Number.isFinite(used) ||
      used < 0 ||
      used > 100 ||
      typeof reset !== "number" ||
      !Number.isFinite(reset) ||
      reset <= 0 ||
      reset * 1000 > 8.64e15 ||
      typeof seconds !== "number" ||
      !Number.isFinite(seconds) ||
      seconds <= 0
    )
      return;
    windows[key] = Object.freeze({
      usedPercent: used,
      resetAt: reset * 1000,
      windowSeconds: seconds,
    });
  }
  if (Object.keys(windows).length === 0) return;
  evidence.set(usage, Object.freeze({ windows: Object.freeze(windows) }));
}

/** Normalized or caller-created display objects do not possess this evidence. */
export function getCodexRecoveryEvidence(usage: unknown): CodexRecoveryEvidence | null {
  return usage !== null && typeof usage === "object" ? (evidence.get(usage) ?? null) : null;
}

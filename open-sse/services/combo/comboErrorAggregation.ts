/**
 * Shared combo terminal-error aggregation.
 *
 * #10314 — combo error aggregation mixes quality and auth. Prior to this module
 * the combo terminal message was built as a single `lastError` string (last
 * writer wins — it can only ever represent ONE target's reason) concatenated
 * with a raw `[model (status)]` suffix. A quality-failure reason from one
 * target and a sibling's 401 were collapsed into one client-facing sentence
 * (`invalid_api_key [openai/proxy-account-b (401)]`) and a quality reason that
 * was not the final failing target was dropped entirely.
 *
 * This module gives each per-target failure a structured {model, status, error,
 * kind} entry, so the terminal message can list every distinct reason
 * separately (and classification-labelled) instead of mashing them, and it
 * redacts connection/account identifiers that, on openai-compatible proxy
 * connections, used to surface verbatim in client-visible and shared-warn
 * strings (ops/PII leak).
 */

export type ComboOutcomeKind =
  "quality" | "auth" | "rate_limit" | "model" | "provider" | "timeout" | "skipped" | "upstream";

export interface ComboErrorEntry {
  model: string;
  status: number;
  error: string;
  kind: ComboOutcomeKind;
  code?: string;
}

const KIND_LABELS: Record<ComboOutcomeKind, string> = {
  quality: "quality validation",
  auth: "auth",
  rate_limit: "rate limit",
  model: "model",
  provider: "provider",
  timeout: "timeout",
  skipped: "skipped",
  upstream: "upstream",
};

/**
 * Classify a single target's terminal outcome for the client-facing message.
 * Auth-class errors (401/403 or auth-sounding text) are kept distinct from
 * model-class (400/422) and provider-class (5xx) so a sibling's 401 is never
 * presented as "quality failed". Fall through to `model` for everything else.
 *
 * #10501: the ordering below is deliberate and load-bearing — the timeout
 * check MUST use an exact match (408 / 499), never `status >= 499`. A `>=`
 * comparison there swallows every 5xx status too (500 >= 499), which made the
 * `status >= 500` branch permanently unreachable and silently mislabeled every
 * real provider outage (500/502/503/504) as a client-side "timeout". 429 is
 * also given its own explicit branch: a rate-limit/quota signal is neither a
 * "the client's request is invalid" (`model`) nor a hard provider outage, and
 * lumping it into `model` would make `resolveComboTerminalStatus` treat a
 * heterogeneous 429 mix as a genuinely-invalid-request case by accident.
 */
export function classifyComboOutcome(status: number, errorText: string): ComboOutcomeKind {
  const text = typeof errorText === "string" ? errorText : "";
  if (
    status === 401 ||
    status === 403 ||
    /(invalid.?api.?key|unauthorized|not.?authorized|auth(entication|orization)?)/i.test(text)
  ) {
    return "auth";
  }
  if (status === 429) return "rate_limit";
  if (status === 408 || status === 499) return "timeout";
  if (status >= 500) return "provider";
  return "model";
}

/**
 * Redact connection/account identifiers that can ride inside a proxy target's
 * model string (openai-compatible proxy model names often carry a connection
 * label). UUIDs and long hex hashes are truncated to a short `conn:` prefix.
 * Provider/model names operators need for debugging are left intact.
 */
export function redactConnectionLabel(modelStr: string | null | undefined): string {
  const label = typeof modelStr === "string" && modelStr ? modelStr : "unknown";
  return label
    .replace(
      /\b[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}\b/g,
      (m) => `conn:${m.slice(0, 8)}`
    )
    .replace(/\b[0-9a-fA-F]{16,}\b/g, (m) => `conn:${m.slice(0, 8)}`);
}

/** Build the redacted, collision-free `model (status)` summary used by the
 *  global-combo-timeout diagnostics path. */
export function buildRedactedSummary(
  entries:
    Array<{ model: string; status: number }> | ReadonlyArray<{ model: string; status: number }>
): string {
  const slice = entries.slice(0, 5);
  const parts = slice.map((e) => `${redactConnectionLabel(e.model)} (${e.status})`).join(", ");
  return entries.length > 5 ? `${parts}... (+${entries.length - 5})` : parts;
}

/**
 * Format per-target terminal outcomes into one client-facing sentence that keeps
 * every distinct reason separate (and classification-labelled) instead of
 * mashing a single `lastError` with raw status markers. Always redacts
 * connection identifiers unless `{ redact: false }` is explicitly passed.
 */
export function formatComboOutcomes(
  entries: ReadonlyArray<{ model: string; status: number; error: string; kind?: ComboOutcomeKind }>,
  opts?: { redact?: boolean }
): string {
  if (!entries.length) return "";
  const redact = opts?.redact !== false;
  const slice = entries.slice(0, 5);
  const parts = slice.map((e) => {
    const label = redact ? redactConnectionLabel(e.model) : e.model;
    const kind = e.kind ? (KIND_LABELS[e.kind] ?? e.kind) : null;
    // #10501: the raw upstream error TEXT can itself carry a connection/account
    // identifier (some openai-compatible proxies echo it back in the error body,
    // e.g. "invalid key for connection <uuid>") — redact it here too, not just
    // the model label above, or the identifier leaks into the client-facing
    // terminal message regardless of the label redaction.
    const rawReason = e.error || `HTTP ${e.status}`;
    const reason = redact ? redactConnectionLabel(rawReason) : rawReason;
    const statusTxt = ` (HTTP ${e.status})`;
    return kind ? `${label}: ${kind} — ${reason}${statusTxt}` : `${label}: ${reason}${statusTxt}`;
  });
  return entries.length > 5
    ? `${parts.join("; ")}... (+${entries.length - 5} more)`
    : parts.join("; ");
}

/**
 * #10501: explicit terminal-status policy for heterogeneous combo target
 * exhaustion. Prior behavior returned `lastStatus` — whichever target
 * happened to fail LAST, independent of what the other targets failed with.
 * That let an unrelated target's config-class 4xx (or a target's own auth
 * failure) masquerade as the combo's overall verdict, and vice versa.
 *
 * Policy:
 *  - No structured entries: keep the caller's fallback status unchanged.
 *  - Every entry is `model`-class AND a genuine 4xx (the request itself is
 *    invalid on EVERY eligible target, homogeneous or not): preserve that
 *    4xx — this is a real client-request error, not an infra problem.
 *  - All entries share the SAME kind (any kind, e.g. every target failed
 *    with `auth`, or every target was `rate_limit`): preserve that shared
 *    class's own status — a uniform reason across all targets is still a
 *    single, well-defined verdict.
 *  - Otherwise (a genuine MIX of different failure classes — e.g. a quality
 *    failure on one target and a 401 on a sibling): this is heterogeneous by
 *    definition, so it is normalized to a 5xx-class infra/provider status
 *    instead of surfacing whichever target's status happened to be recorded
 *    last. `timeout` present anywhere in the mix maps to 504 (Gateway
 *    Timeout); otherwise 502 (Bad Gateway) — combo routing itself is the
 *    "gateway" that could not complete the request via any target.
 */
export function resolveComboTerminalStatus(
  entries: ReadonlyArray<ComboErrorEntry>,
  fallbackStatus: number
): number {
  if (!entries.length) return fallbackStatus;

  const allGenuinelyInvalidRequest = entries.every(
    (e) => e.kind === "model" && e.status >= 400 && e.status < 500
  );
  if (allGenuinelyInvalidRequest) {
    return entries[entries.length - 1].status;
  }

  const distinctKinds = new Set(entries.map((e) => e.kind));
  if (distinctKinds.size === 1) {
    return entries[entries.length - 1].status;
  }

  return entries.some((e) => e.kind === "timeout") ? 504 : 502;
}

/** Preserve the terminal target's code only when it represents the aggregate verdict. */
export function resolveComboTerminalCode(
  entries: ReadonlyArray<ComboErrorEntry>,
  status: number
): string | undefined {
  const terminal = entries.at(-1);
  if (terminal?.status !== status || entries.some((entry) => entry.kind !== terminal.kind)) {
    return undefined;
  }
  return terminal.code;
}

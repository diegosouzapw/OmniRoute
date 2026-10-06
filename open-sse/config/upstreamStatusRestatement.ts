/**
 * Upstream status restatement — registry of gateways that MISSTATE temporary
 * quota exhaustion as a non-retryable HTTP status.
 *
 * agentrouter.org signals "user quota exhausted" with 403 (sometimes 400) and
 * a Chinese body ("用户额度不足") instead of the standard 429. Clients like
 * Claude Code treat 403 as permanent and abort the whole session, and our own
 * fallback engine classifies it as AUTH_ERROR instead of a quota event.
 *
 * applyStatusRestatement() is called from exactly ONE place — the
 * `providerFailure:` block in open-sse/handlers/chatCore.ts, right after
 * parseUpstreamError() parses an upstream response with an error HTTP status
 * (!providerResponse.ok), and before any classification runs — so every
 * downstream consumer (checkFallbackError, combo aggregation, the client
 * response) sees the corrected status. Errors embedded inside a 200 SSE
 * stream follow a separate, later stream-parsing path and are NOT covered by
 * this hook today (known limitation; not yet needed for agentrouter's
 * misstatus, which surfaces as an error HTTP status). 429 is
 * Retry-After-eligible in
 * open-sse/services/combo/unavailableRetryGate.ts, so the client also gets a
 * retry window instead of a dead 403.
 *
 * Adding a future gateway with the same defect = register ONE rule array
 * below (and, for cooldown-scope refinement, one entry in
 * providerErrorRules.ts). No pipeline changes.
 *
 * Marker discipline: keep textMarkers provider-specific (the Chinese strings
 * are upstream error literals, not UI copy). Generic English phrases like
 * "insufficient_quota" are in CREDITS_EXHAUSTED_SIGNALS
 * (accountFallback.ts) and would flip the connection into a terminal
 * credits_exhausted state — never use them as markers here.
 *
 * Accepted trade-off: matching only on response body text means a
 * legitimate 400 whose body ECHOES user-supplied content containing a
 * marker (e.g. a prompt that itself contains "额度不足") would be restated to
 * 429 and lose the combo's 400 stop-guard. This is treated as an acceptable
 * risk because these markers are rare outside a genuine upstream error;
 * keeping markers short, provider-specific, and non-generic (as above)
 * minimizes false-positive restatement.
 */

export type UpstreamStatusRestatementRule = {
  id: string;
  fromStatuses: ReadonlySet<number>;
  toStatus: number;
  /** Lowercase markers matched against lowercased `message` + JSON(body). Any hit → restate. */
  textMarkers: readonly string[];
  /** Lowercase markers that VETO the rule even when textMarkers hit (permanent errors). */
  excludeMarkers?: readonly string[];
  /** Synthetic Retry-After used ONLY when the upstream provided none. */
  defaultRetryAfterMs?: number;
};

export type StatusRestatementInput = {
  provider: string | null | undefined;
  status: number;
  message: string | null | undefined;
  body?: unknown;
  retryAfterMs?: number | null;
};

export type StatusRestatementResult = {
  status: number;
  retryAfterMs: number | null;
  ruleId: string | null;
  fromStatus: number;
};

// ─── agentrouter ────────────────────────────────────────────────────────────
// Observed misstatus (ClaudeShield field reports + upstream behavior):
//   403 "用户额度不足" / "额度不足"  → temporary user-quota exhaustion → 429
//   400 variants carrying the same quota text                        → 429
//   403 "无权访问模型" (no access to this model) → genuinely permanent, NEVER
//   restated — it must keep flowing as 403 so nothing retries it forever.
const AGENTROUTER_RULES: UpstreamStatusRestatementRule[] = [
  {
    id: "agentrouter-quota-misstatus",
    fromStatuses: new Set([403, 400]),
    toStatus: 429,
    textMarkers: ["额度不足"],
    excludeMarkers: ["无权访问"],
    defaultRetryAfterMs: 60_000,
  },
];

/** Provider id (lowercase) → ordered rules; first match wins. */
export const statusRestatementRegistry = new Map<string, UpstreamStatusRestatementRule[]>([
  ["agentrouter", AGENTROUTER_RULES],
]);

function stringifyBody(body: unknown): string {
  if (body === null || body === undefined) return "";
  if (typeof body === "string") return body;
  try {
    return JSON.stringify(body);
  } catch {
    return "";
  }
}

export function applyStatusRestatement(input: StatusRestatementInput): StatusRestatementResult {
  const passthrough: StatusRestatementResult = {
    status: input.status,
    retryAfterMs: input.retryAfterMs ?? null,
    ruleId: null,
    fromStatus: input.status,
  };
  if (!input.provider) return passthrough;
  const rules = statusRestatementRegistry.get(input.provider.toLowerCase());
  if (!rules) return passthrough;

  const haystack = `${input.message ?? ""} ${stringifyBody(input.body)}`.toLowerCase();
  if (!haystack.trim()) return passthrough;

  for (const rule of rules) {
    if (!rule.fromStatuses.has(input.status)) continue;
    if (!rule.textMarkers.some((marker) => haystack.includes(marker))) continue;
    if (rule.excludeMarkers?.some((marker) => haystack.includes(marker))) continue;
    const upstreamRetryAfterMs =
      typeof input.retryAfterMs === "number" && input.retryAfterMs > 0 ? input.retryAfterMs : null;
    return {
      status: rule.toStatus,
      retryAfterMs: upstreamRetryAfterMs ?? rule.defaultRetryAfterMs ?? null,
      ruleId: rule.id,
      fromStatus: input.status,
    };
  }
  return passthrough;
}

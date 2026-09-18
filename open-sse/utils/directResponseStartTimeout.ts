type DirectFetchOptions = RequestInit & { dispatcher?: unknown };
type DirectFetch = (input: RequestInfo | URL, options: DirectFetchOptions) => Promise<Response>;

const DEFAULT_DIRECT_HEADERS_TIMEOUT_MS = 30_000;
const DIRECT_RESPONSE_START_TIMEOUT_CODE = "DIRECT_RESPONSE_START_TIMEOUT";

// Reasoning models (GLM-5.2/5.3 reasoning.effort=high/max, codex-gpt-5.x-high,
// third-party Claude-format replicas) warm up with a ~78s+ TTFB before emitting
// the first byte. The stream-readiness layer (streamReadinessPolicy.ts) already
// budgets 180s for this class (claude_format_heavy_reasoning /
// codex_gpt_5_5_high_reasoning +30s bumps over an 80s base). This fetch-layer
// guard must align to the SAME ceiling so it does not pre-empt a warm reasoning
// response that the readiness layer would have permitted — that mismatch is the
// 504 regression introduced by 142ae9349 (flat 30s cut a 78s+ reasoning TTFB).
const REASONING_READINESS_CEILING_MS = 180_000;
// Bounded, non-overlapping pattern: a quoted "reasoning_effort" or nested
// "effort" field whose value is high or max. No variable-length quantifier
// overlap → no ReDoS surface (project PII rule #1).
const HIGH_REASONING_EFFORT_PATTERN = /"(?:reasoning_effort|effort)"\s*:\s*"(?:high|max)"/i;

function hasHighReasoningEffort(body?: string | null): boolean {
  if (!body || typeof body !== "string") return false;
  return HIGH_REASONING_EFFORT_PATTERN.test(body);
}

export function resolveDirectHeadersTimeoutMs(
  env: Record<string, string | undefined> = process.env,
  body?: string | null
): number {
  const raw = env.OMNIROUTE_DIRECT_HEADERS_TIMEOUT_MS;
  const base =
    raw == null || raw.trim() === ""
      ? DEFAULT_DIRECT_HEADERS_TIMEOUT_MS
      : Number.isFinite(Number(raw)) && Number(raw) > 0
        ? Math.floor(Number(raw))
        : 0;
  // Operator override is a FLOOR: reasoning awareness only raises the budget,
  // never lowers it. An override above the ceiling (e.g. 240s) is preserved.
  if (hasHighReasoningEffort(body)) {
    return Math.max(base, REASONING_READINESS_CEILING_MS);
  }
  return base;
}

function createDirectResponseStartTimeout(timeoutMs: number): Error & { code: string } {
  const err = new Error(
    `Direct response did not start within ${timeoutMs}ms — retrying on a fresh socket`
  ) as Error & { code: string };
  err.name = "TimeoutError";
  err.code = DIRECT_RESPONSE_START_TIMEOUT_CODE;
  return err;
}

export function isDirectResponseStartTimeout(err: unknown): boolean {
  return (
    !!err &&
    typeof err === "object" &&
    "code" in err &&
    err.code === DIRECT_RESPONSE_START_TIMEOUT_CODE
  );
}

function mergeAbortSignals(
  primary: AbortSignal | null | undefined,
  secondary: AbortSignal
): AbortSignal {
  if (!primary) return secondary;
  if (primary.aborted) return primary;
  const controller = new AbortController();
  const onPrimaryAbort = () => controller.abort(primary.reason);
  const onSecondaryAbort = () => controller.abort(secondary.reason);
  const cleanup = () => {
    primary.removeEventListener("abort", onPrimaryAbort);
    secondary.removeEventListener("abort", onSecondaryAbort);
  };
  primary.addEventListener("abort", onPrimaryAbort, { once: true });
  secondary.addEventListener("abort", onSecondaryAbort, { once: true });
  controller.signal.addEventListener("abort", cleanup, { once: true });
  return controller.signal;
}

export async function directFetchWithBoundedResponseStart(
  input: RequestInfo | URL,
  options: DirectFetchOptions,
  fetchImpl: DirectFetch,
  timeoutMs: number
): Promise<Response> {
  if (!timeoutMs || timeoutMs <= 0) return fetchImpl(input, options);
  const attemptController = new AbortController();
  const timer = setTimeout(
    () => attemptController.abort(createDirectResponseStartTimeout(timeoutMs)),
    timeoutMs
  );
  timer.unref?.();
  try {
    return await fetchImpl(input, {
      ...options,
      signal: mergeAbortSignals(options.signal, attemptController.signal),
    });
  } finally {
    clearTimeout(timer);
  }
}

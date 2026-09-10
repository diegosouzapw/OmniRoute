import { sanitizeErrorMessage } from "../../utils/errorSanitization.ts";

/**
 * Rate-limited fail-open notifier for the compression worker paths.
 *
 * Lives in its own module (not inside strategySelector.ts) so the worker pool
 * and the llmlingua worker can import it without creating an import cycle:
 * strategySelector statically pulls the engines (including llmlingua), while
 * the pool/worker must be importable from underneath it.
 *
 * The catch around runCompressionInWorker used to be fully silent, which made
 * a structurally broken worker pool (issue #2: Turbopack MODULE_NOT_FOUND)
 * leak GBs of heap for hours with zero log evidence. Logs at most once per
 * window per distinct detail, so a recurring new failure mode is never
 * swallowed by an earlier, different one.
 */
let failOpenLastLoggedAt = 0;
const failOpenLastDetail = new Map<string, number>();
const FAIL_OPEN_LOG_INTERVAL_MS = 60_000;
/** Cap the per-detail map so pathological detail diversity cannot grow it unbounded. */
const MAX_TRACKED_DETAILS = 16;

export function notifyCompressionFailOpen(rawDetail?: string): void {
  // Every call site funnels here, so sanitize once, centrally: raw error text
  // may carry absolute paths or multiline runtime messages into the log.
  const detail = sanitizeErrorMessage(rawDetail ?? "unknown");
  const key = detail.length > 0 ? detail : "unknown";
  const now = Date.now();
  if (now - failOpenLastLoggedAt >= FAIL_OPEN_LOG_INTERVAL_MS) {
    failOpenLastLoggedAt = now;
    failOpenLastDetail.clear();
    failOpenLastDetail.set(key, now);
    console.warn(`[compression] worker path failed open — serving uncompressed (detail: ${key})`);
    return;
  }
  const lastAt = failOpenLastDetail.get(key) ?? 0;
  if (now - lastAt < FAIL_OPEN_LOG_INTERVAL_MS) return;
  // Preserve the existing suppression set until the global window rolls over.
  // Clearing it here would let high-cardinality failures bypass the rate limit.
  if (failOpenLastDetail.size >= MAX_TRACKED_DETAILS) return;
  failOpenLastDetail.set(key, now);
  console.warn(`[compression] worker path failed open — serving uncompressed (detail: ${key})`);
}

export function __resetCompressionFailOpenNotifierForTests(): void {
  failOpenLastLoggedAt = 0;
  failOpenLastDetail.clear();
}

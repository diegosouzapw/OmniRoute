import type { RenderResult, CommandDetectionResult } from "./types.ts";
import { NO_RENDER } from "./types.ts";

/**
 * RTK semantic renderer for test suite output (pytest, jest, vitest, eslint).
 *
 * CRITICAL safety guard: only collapses when output indicates TOTAL success.
 * ANY sign of failure forces a no-op to preserve full diagnostics.
 *
 * Failure signals (force no-op):
 *  - /\bFAIL\b/ in the text
 *  - /failed/i paired with a nonzero count (e.g. "1 failed")
 *  - ✖ symbol
 *  - "Error" anywhere
 *  - "Traceback" (Python)
 *  - "AssertionError"
 *
 * When green, extract the summary line and return it.
 * If no recognizable summary line is found, no-op.
 */
export function renderTestGreen(text: string, _detection: CommandDetectionResult): RenderResult {
  // Failure guard — must check FIRST; never weaken
  if (/\bFAIL\b/.test(text)) return NO_RENDER(text);
  if (/✖/.test(text)) return NO_RENDER(text);
  if (/Error/.test(text)) return NO_RENDER(text);
  if (/Traceback/.test(text)) return NO_RENDER(text);
  if (/AssertionError/.test(text)) return NO_RENDER(text);

  // "failed" with a nonzero count, e.g. "1 failed" or "failed: 3"
  const failedMatch = text.match(/(\d+)\s+failed/i) ?? text.match(/failed[:\s]+(\d+)/i);
  if (failedMatch && parseInt(failedMatch[1], 10) > 0) return NO_RENDER(text);

  // Try to extract a recognised summary line
  const summary = extractSummaryLine(text);
  if (!summary) return NO_RENDER(text);

  return { text: summary, changed: true, renderer: "test-green" };
}

function extractSummaryLine(text: string): string | null {
  const lines = text.split("\n");

  // pytest: === N passed in X.Xs ===  (also handles variants like  === N passed, M warning ===)
  for (const line of lines) {
    if (/={3,}\s+\d+\s+passed/.test(line)) return line.trim();
  }

  // jest / vitest: "Tests: N passed, N total" or "Test Suites: ... Tests: ..."
  for (const line of lines) {
    if (/Tests:\s+\d+\s+passed/.test(line)) return line.trim();
  }

  // vitest / jest run summary line: "✓ N tests passed"
  for (const line of lines) {
    if (/\d+\s+tests?\s+passed/i.test(line)) return line.trim();
  }

  // eslint / build-eslint: empty output = clean; if we reach here with no failures, synthesize
  if (text.trim() === "" || text.trim().startsWith("\n")) {
    return "ESLint: 0 problems found";
  }

  return null;
}

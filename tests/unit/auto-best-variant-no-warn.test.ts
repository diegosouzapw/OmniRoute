/**
 * Regression: a recognized built-in auto variant (e.g. `auto/best-coding`) must
 * NOT emit the spurious "Invalid auto prefix format" warning.
 *
 * Root cause: `resolveAutoRoutingState` → `applyAutoPrefix` (in
 * `src/sse/handlers/autoRouting.ts`) called `parseAutoPrefix()`, whose
 * `VALID_VARIANTS` set only covers the short aliases (`coding`, `fast`, `cheap`,
 * `offline`, `smart`, `lkgp`, `chaos`). The `best-*` built-in aliases that
 * `AUTO_TEMPLATE_VARIANTS` recognizes (e.g. `auto/best-coding`) are not in that
 * set, so `parseAutoPrefix` returned `{ valid: false }` and every such request
 * logged the misleading "Invalid auto prefix format: auto/best-*" warning even
 * though the routing state was actually resolved correctly by
 * `classifyAutoModel()` beforehand.
 *
 * The fix makes `applyAutoPrefix` skip the warning for any model that
 * `AUTO_TEMPLATE_VARIANTS` already recognizes as a built-in variant.
 *
 * The routing variant was never actually broken (the early-return preserved
 * the already-correct classified state); the regression here is purely the
 * spurious warning log. We verify by writing to a known log file and asserting
 * the warning text does NOT appear for a recognized built-in variant, while a
 * genuinely unknown auto variant DOES still produce it (proving the probe works).
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

// Configure file logging BEFORE importing the logger (the shared logger builds
// its transports at import time).
const dir = mkdtempSync(join(tmpdir(), "omniroute-auto-best-no-warn-"));
const logFile = join(dir, "app.log");
process.env.NODE_ENV = "production"; // JSON to file, simplest single-directory path
process.env.APP_LOG_TO_FILE = "true";
process.env.APP_LOG_FILE_PATH = logFile;
process.env.APP_LOG_LEVEL = "debug";

const { resolveAutoRoutingState } = await import("../../src/sse/handlers/autoRouting.ts");

/** Poll the (worker-thread-written) log file until the predicate holds or timeout. */
async function readLogWhen(
  predicate: (contents: string) => boolean,
  timeoutMs = 4000
): Promise<string> {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    if (existsSync(logFile)) {
      const contents = readFileSync(logFile, "utf8");
      if (predicate(contents)) return contents;
    }
    await new Promise((r) => setTimeout(r, 50));
  }
  return existsSync(logFile) ? readFileSync(logFile, "utf8") : "";
}

test(
  "built-in auto/best-* variant does NOT log 'Invalid auto prefix format'",
  async () => {
    // Recognized built-in variant -> must resolve without the spurious warning.
    const state = await resolveAutoRoutingState("auto/best-coding");
    assert.equal(state.recognizedBuiltInAuto, true);
    assert.equal(state.variant, "coding");
    assert.equal(state.response, null);

    // Known-good stream: the variant log line proves the request took the happy
    // path (and flushed the worker before we read the file).
    await readLogWhen((c) => c.includes("Zero-config routing variant"));
    const contents = readFileSync(logFile, "utf8");

    assert.doesNotMatch(
      contents,
      /Invalid auto prefix format: auto\/best-coding/,
      "a recognized built-in auto/best-* variant must not trigger the misleading invalid-prefix warning"
    );
  }
);

test("genuinely unknown auto variant still logs 'Invalid auto prefix format' (probe has teeth)", async () => {
  // A truly unrecognized prefix must still warn — proves this probe is able to
  // detect the warning and that we're not simply missing it due to logging setup.
  const state = await resolveAutoRoutingState("auto/not-a-real-variant");
  assert.equal(state.recognizedBuiltInAuto, false);

  const contents = await readLogWhen((c) =>
    c.includes("Invalid auto prefix format: auto/not-a-real-variant")
  );

  assert.match(
    contents,
    /Invalid auto prefix format: auto\/not-a-real-variant/,
    "an unknown auto variant must still produce the invalid-prefix warning"
  );
});
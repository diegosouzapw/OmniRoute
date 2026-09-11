/**
 * Follow-up to #11503 / #11507: `DEFAULT_DEGRADATION_MAP` (backgroundTaskDetector.ts) is the
 * third hand-maintained routing table that names model ids, and it was outside the
 * retired-model gate. A retired *source* is a dead row — `checkLifecycle` answers 410
 * `model_shutdown` before `resolveBackgroundTaskRedirect` runs — and a retired *target*
 * is normally rejected with 410 when lifecycle validation runs again after the redirect,
 * unless alias resolution maps it to an accepted id.
 *
 * Table-driven over the production default map and the checked-in lifecycle snapshot, mirroring
 * `model-deprecation-aliases-11503.test.ts`, so a new dead row fails by name.
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { getDefaultDegradationMap } from "../../open-sse/services/backgroundTaskDetector.ts";
import { isVendorRetiredId } from "../../open-sse/services/modelLifecycle.ts";

const lifecycle = JSON.parse(
  readFileSync(
    fileURLToPath(new URL("../../config/quality/model-lifecycle.json", import.meta.url)),
    "utf8"
  )
) as { retired: Record<string, { status: string }> };

const retiredIds = new Set(
  Object.entries(lifecycle.retired)
    .filter(([, entry]) => entry.status === "retired")
    .map(([id]) => id.toLowerCase())
);

describe("DEFAULT_DEGRADATION_MAP names no retired model id", () => {
  const rows = Object.entries(getDefaultDegradationMap());

  it("has rows to check", () => {
    assert.ok(rows.length > 0);
  });

  for (const [source, target] of rows) {
    it(`degrades from ${source}, an id the vendor has not retired`, () => {
      assert.ok(
        !retiredIds.has(source.toLowerCase()),
        `"${source}" → "${target}" is dead: the vendor has retired "${source}", so checkLifecycle rejects the request before the background redirect runs`
      );
      assert.equal(isVendorRetiredId(source), false);
    });

    it(`degrades ${source} to ${target}, an id the vendor has not retired`, () => {
      assert.ok(
        !retiredIds.has(target.toLowerCase()),
        `"${source}" → "${target}" forwards background tasks to "${target}", which the vendor has retired`
      );
      assert.equal(isVendorRetiredId(target), false);
    });
  }
});

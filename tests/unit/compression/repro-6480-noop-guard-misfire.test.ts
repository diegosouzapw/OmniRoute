import test from "node:test";
import assert from "node:assert/strict";

import { applyStackedCompression } from "../../../open-sse/services/compression/strategySelector.ts";

/**
 * Regression coverage for #6480: `finalizeStackedResult` in `strategySelector.ts` used to run
 * the aggregate `guardPipelineInflation` check unconditionally, even when the loop-level
 * `compressed` flag was `false` (i.e. no engine in the pipeline ever produced/advanced a
 * candidate). Since `compressedTokens === originalTokens` trivially holds when nothing ran, the
 * guard mislabeled a genuine no-op as `fallbackApplied: true` with a misleading
 * "pipeline-inflation-guard ... reverted to original" warning, even though nothing was ever
 * computed to revert.
 */
test("#6480: session-dedup no-op on out-of-charter single message does not fire the pipeline-inflation-guard", () => {
  const body = {
    messages: [
      {
        role: "user",
        content:
          "This is a single message with no prior session history and no internally " +
          "repeated content whatsoever, so the session-dedup engine has nothing to do.",
      },
    ],
  };

  const result = applyStackedCompression(body, [{ engine: "session-dedup" }]);

  assert.equal(
    result.stats?.fallbackApplied,
    undefined,
    "expected no fallbackApplied flag on a trivial no-op pipeline (engine never advanced)"
  );
  assert.equal(
    (result.stats?.validationWarnings ?? []).some((w) => w.includes("pipeline-inflation-guard")),
    false,
    "expected no misleading pipeline-inflation-guard warning when nothing was ever compressed"
  );
});

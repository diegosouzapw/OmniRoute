import test from "node:test";
import assert from "node:assert/strict";

const { buildRecoveryHint } = await import("../../../open-sse/services/combo/pinRecovery.ts");

test(
  "#9303: buildRecoveryHint('all_targets_skipped') must return an actionable " +
    "hint, not the generic 'transient, just retry' default",
  () => {
    const hint = buildRecoveryHint("all_targets_skipped");

    assert.notEqual(
      hint.action,
      "retry",
      "the pre-dispatch full-exhaustion terminal reason must not be classified as a " +
        "generically 'retry'-able transient failure — the reporter's log shows the " +
        "identical exhaustion recurring across ~9 consecutive requests with no recovery"
    );
    assert.doesNotMatch(
      hint.next_step,
      /failed transiently/i,
      "must not tell the client this was transient when the whole target pool was " +
        "pre-filtered/quota-exhausted before a single dispatch attempt was made"
    );
    assert.match(
      hint.next_step,
      /quota|availability|provider/s,
      "the hint must point at the provider quota/availability as the actionable next step"
    );
  }
);
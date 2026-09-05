/**
 * Regression: `auto/best-free` must carry `spec.tier = "free"` so the
 * virtualFactory candidate filter (buildAutoCandidateFilter) excludes paid
 * backends from the pool.
 *
 * Root cause: `classifyAutoModel` in `src/sse/handlers/autoRouting.ts` returns
 * only `{ variant: "cheap" }` for `auto/best-free` (via AUTO_TEMPLATE_VARIANTS),
 * WITHOUT setting `spec.tier = "free"`. The sibling path `createBuiltinAutoCombo`
 * in `open-sse/services/autoCombo/builtinCatalog.ts` has a hardcoded special case
 * `modelStr === "auto/best-free" ? { tier: "free" as const } : undefined`, but
 * `chat.ts` routes through `resolveAutoRoutingState` → `createVirtualAutoCombo`
 * (autoRouting.ts), NOT through `createBuiltinAutoCombo`. So the chat path
 * skipped the tier filter entirely and `auto/best-free` behaved as plain
 * `auto/cheap`, allowing paid models (e.g. antigravity/gemini-3.7-flash-high)
 * to be selected from the full pool.
 *
 * classifyAutoModel() is module-private, so this exercises it through the public
 * resolveAutoRoutingState() — same pattern as auto-family-classification-8866.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { resolveAutoRoutingState } from "../../../src/sse/handlers/autoRouting.ts";

test("auto/best-free carries spec.tier='free' so the candidate filter excludes paid backends", async () => {
  const state = await resolveAutoRoutingState("auto/best-free");
  assert.equal(state.recognizedBuiltInAuto, true);
  assert.equal(state.variant, "cheap");
  assert.equal(
    state.spec?.tier,
    "free",
    "auto/best-free must carry spec.tier='free' to trigger the free-tier candidate filter in virtualFactory"
  );
});

test("auto/best-coding does NOT carry a free tier spec (only auto/best-free is free-tier)", async () => {
  const state = await resolveAutoRoutingState("auto/best-coding");
  assert.equal(state.recognizedBuiltInAuto, true);
  assert.equal(state.variant, "coding");
  assert.notEqual(state.spec?.tier, "free");
});

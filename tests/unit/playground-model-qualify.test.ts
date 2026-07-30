import test from "node:test";
import assert from "node:assert/strict";

const { qualifyPlaygroundModel } =
  await import("../../src/app/(dashboard)/dashboard/media-providers/components/LlmChatCard.tsx");

// #3050 — vendor-namespaced model ids already contain a "/", so the old
// `.includes("/")` heuristic skipped the provider prefix and the request was
// rejected with "Ambiguous model 'moonshotai/kimi-k2.6'".
test("qualifyPlaygroundModel prefixes a vendor-namespaced model with providerId (#3050)", () => {
  assert.equal(qualifyPlaygroundModel("moonshotai/kimi-k2.6", "nim"), "nim/moonshotai/kimi-k2.6");
  assert.equal(
    qualifyPlaygroundModel("nvidia/zyphra/zamba2-7b-instruct", "nim"),
    "nim/nvidia/zyphra/zamba2-7b-instruct"
  );
});

test("qualifyPlaygroundModel prefixes a bare model", () => {
  assert.equal(qualifyPlaygroundModel("gpt-4o", "openai"), "openai/gpt-4o");
});

test("qualifyPlaygroundModel does not double-prefix an already-qualified model", () => {
  assert.equal(
    qualifyPlaygroundModel("nim/moonshotai/kimi-k2.6", "nim"),
    "nim/moonshotai/kimi-k2.6"
  );
  assert.equal(qualifyPlaygroundModel("nim", "nim"), "nim");
});

test("qualifyPlaygroundModel returns the model unchanged without a providerId", () => {
  assert.equal(qualifyPlaygroundModel("moonshotai/kimi-k2.6", ""), "moonshotai/kimi-k2.6");
  assert.equal(qualifyPlaygroundModel("", "nim"), "");
});

test("OpenCode Free playground uses its routing alias instead of the reserved provider id", async () => {
  const { getProviderAlias } = await import("../../src/shared/constants/providers.ts");
  assert.equal(getProviderAlias("opencode"), "oc");
  assert.equal(qualifyPlaygroundModel("big-pickle", getProviderAlias("opencode")), "oc/big-pickle");
});

test("qualifyPlaygroundModel inserts the provider after the no-think prefix, not before it", () => {
  assert.equal(
    qualifyPlaygroundModel("no-think/claude-sonnet-5", "vertex"),
    "no-think/vertex/claude-sonnet-5"
  );
});

test("qualifyPlaygroundModel does not double-qualify an already-qualified no-think id", () => {
  assert.equal(
    qualifyPlaygroundModel("no-think/vertex/claude-sonnet-5", "vertex"),
    "no-think/vertex/claude-sonnet-5"
  );
});

test("qualifyPlaygroundModel does not mistake a provider-name-prefix collision for already-qualified", () => {
  // routingPrefix "vertex" must not match "vertex-eu/..." as already-qualified just because
  // it starts with the same characters — the check requires an exact "vertex/" segment
  // boundary. A naive `inner.startsWith(routingPrefix)` (no slash) would wrongly skip
  // qualification here and leave the provider segment un-inserted.
  assert.equal(
    qualifyPlaygroundModel("no-think/vertex-eu/claude-sonnet-5", "vertex"),
    "no-think/vertex/vertex-eu/claude-sonnet-5"
  );
});

test("LlmChatCard's local NO_THINKING_PREFIX literal matches the canonical constant", async () => {
  // Drift guard: LlmChatCard.tsx deliberately hardcodes "no-think/" as a literal instead
  // of importing NO_THINKING_PREFIX from open-sse/utils/noThinkingAlias.ts (avoids pulling
  // server-side catalog modules into the client bundle — see Step 1). This test file is not
  // client-bundled, so it can safely import the real constant and assert they never drift.
  const { NO_THINKING_PREFIX } = await import("../../open-sse/utils/noThinkingAlias.ts");
  assert.equal(NO_THINKING_PREFIX, "no-think/");
});

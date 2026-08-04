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

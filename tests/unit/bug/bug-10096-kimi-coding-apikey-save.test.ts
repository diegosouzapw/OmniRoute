import test from "node:test";
import assert from "node:assert/strict";

// Issue #10096: Kimi Code API key validates OK but Save returns 400 "Invalid provider".
//
// Root cause: the unified Kimi Code dashboard card's API-key branch posted
// provider: "kimi-coding" (an OAuth-primary managed id, NOT an admitted
// API-key connection id) to POST /api/providers, which the backend rejects.
// The dedicated managed API-key id "kimi-coding-apikey" IS admitted.
//
// Fix: resolveApiKeySaveProviderId() in useApiKeySave.ts remaps the posted
// provider id to "kimi-coding-apikey" for the API-key save flow only, while
// the OAuth flow (which never calls this hook) keeps posting "kimi-coding".

const { isManagedProviderConnectionId } = await import("../../../src/lib/providers/catalog.ts");
const { resolveApiKeySaveProviderId } = await import(
  "../../../src/app/(dashboard)/dashboard/providers/[id]/hooks/useApiKeySave.ts"
);

test("Kimi Code API-key save flow remaps to the admitted managed API-key id", () => {
  assert.equal(
    resolveApiKeySaveProviderId("kimi-coding"),
    "kimi-coding-apikey",
    "the unified Kimi Code card's API-key save flow must post kimi-coding-apikey, not kimi-coding"
  );
  assert.equal(
    isManagedProviderConnectionId(resolveApiKeySaveProviderId("kimi-coding")),
    true,
    "the remapped id must be an admitted managed provider connection id (POST /api/providers accepts it)"
  );
});

test("resolveApiKeySaveProviderId leaves every other provider id untouched", () => {
  assert.equal(resolveApiKeySaveProviderId("openai"), "openai");
  assert.equal(resolveApiKeySaveProviderId("kimi-coding-apikey"), "kimi-coding-apikey");
  assert.equal(resolveApiKeySaveProviderId("qoder"), "qoder");
});

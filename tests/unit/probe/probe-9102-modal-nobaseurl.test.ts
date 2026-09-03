import test from "node:test";
import assert from "node:assert/strict";

const { validateProviderApiKey } = await import("../../../src/lib/providers/validation.ts");

test("modal validation without baseUrl returns clear actionable error (not Invalid outbound URL)", async () => {
  // Ensure no actual fetch ever happens — the bug is a pre-fetch URL parse failure
  globalThis.fetch = async (_url: RequestInfo | URL, _init?: RequestInit) => {
    throw new Error("unexpected fetch: validation should fail before any network request");
  };

  const result = await validateProviderApiKey({
    provider: "modal",
    apiKey: "ak-test:as-test",
    providerSpecificData: {},
  });

  // The bug: when baseUrl is empty, validateOpenAILikeProvider gets an empty URL,
  // parseOutboundUrl throws "Invalid outbound URL: " — a raw guard message.
  // The fix must return a clear actionable message mentioning Base URL.
  const errorMsg = result.error || "";
  assert.ok(
    !errorMsg.includes("Invalid outbound URL"),
    `bug: leaked raw guard message -> ${JSON.stringify(errorMsg)}`
  );
  assert.ok(
    errorMsg.toLowerCase().includes("base url") || errorMsg.toLowerCase().includes("base"),
    `expected error to mention Base URL, got: ${JSON.stringify(errorMsg)}`
  );
});

// Characterization of the validation.ts kiro runtime-probe split (god-file decomposition):
// validateKiroApiKeyRuntimeProbe moved into validation/kiro.ts as a top-level function (it was
// previously a module-private helper inside validation.ts). Behavior-preserving move — the lock
// here is module surface; the runtime behavior stays covered by the provider-validation-specialty
// kiro suites.
import { test } from "node:test";
import assert from "node:assert/strict";

const M = await import("../../src/lib/providers/validation/kiro.ts");
const HOST = await import("../../src/lib/providers/validation.ts");

test("kiro leaf exposes validateKiroApiKeyRuntimeProbe", () => {
  assert.equal(typeof M.validateKiroApiKeyRuntimeProbe, "function");
});

test("host dispatcher surface stays intact after the move", () => {
  assert.equal(typeof (HOST as Record<string, unknown>).validateProviderApiKey, "function");
});

test("validateKiroApiKeyRuntimeProbe: 200 returns valid with method tag", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async () =>
    new Response(new ReadableStream(), { status: 200 })) as typeof fetch;
  try {
    const result = await M.validateKiroApiKeyRuntimeProbe({
      apiKey: "ksk-valid",
      region: "us-east-1",
    });
    assert.equal(result.valid, true);
    assert.equal(result.error, null);
    assert.equal(result.method, "kiro_generate_assistant_response");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("validateKiroApiKeyRuntimeProbe: 401/403 → invalid Kiro key/region", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async () =>
    new Response(JSON.stringify({ message: "denied" }), { status: 403 })) as typeof fetch;
  try {
    const result = await M.validateKiroApiKeyRuntimeProbe({
      apiKey: "ksk-bad",
      region: "eu-west-1",
    });
    assert.equal(result.valid, false);
    assert.equal(result.error, "Invalid Kiro API key or AWS region");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("validateKiroApiKeyRuntimeProbe: 400/422/429 treated as valid (auth passed)", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async () => new Response("{}", { status: 429 })) as typeof fetch;
  try {
    const result = await M.validateKiroApiKeyRuntimeProbe({
      apiKey: "ksk-rate-limited",
      region: "us-east-1",
    });
    assert.equal(result.valid, true);
    assert.equal(result.error, null);
    assert.match(result.method || "", /kiro_generate_assistant_response_429/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("validateKiroApiKeyRuntimeProbe: us-east-1 targets the codewhisperer endpoint", async () => {
  const originalFetch = globalThis.fetch;
  let calledUrl = "";
  globalThis.fetch = (async (url: URL | string) => {
    calledUrl = String(url);
    return new Response(new ReadableStream(), { status: 200 });
  }) as typeof fetch;
  try {
    await M.validateKiroApiKeyRuntimeProbe({ apiKey: "k", region: "us-east-1" });
    assert.equal(
      calledUrl,
      "https://codewhisperer.us-east-1.amazonaws.com/generateAssistantResponse"
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("validateKiroApiKeyRuntimeProbe: non-us-east-1 targets the regional q endpoint", async () => {
  const originalFetch = globalThis.fetch;
  let calledUrl = "";
  globalThis.fetch = (async (url: URL | string) => {
    calledUrl = String(url);
    return new Response(new ReadableStream(), { status: 200 });
  }) as typeof fetch;
  try {
    await M.validateKiroApiKeyRuntimeProbe({ apiKey: "k", region: "eu-west-1" });
    assert.equal(calledUrl, "https://q.eu-west-1.amazonaws.com/generateAssistantResponse");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

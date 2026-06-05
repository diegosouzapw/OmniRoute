import test from "node:test";
import assert from "node:assert/strict";

// #2463 — NVIDIA NIM validation must not crash with `e.startsWith is not a function`
// when providerSpecificData has malformed shapes; and the validation must use a
// direct chat probe instead of the /models probe.

test("normalizeBaseUrl tolerates non-string baseUrl without throwing", async () => {
  // Indirect probe — call validation entrypoint with a non-string baseUrl in PSD;
  // the function should return a normal Validation result (not throw a TypeError
  // such as `e.startsWith is not a function` after minification — see #2463).
  const origFetch = globalThis.fetch;
  globalThis.fetch = (async () =>
    new Response(JSON.stringify({}), {
      status: 400,
      headers: { "content-type": "application/json" },
    })) as typeof fetch;

  try {
    const { validateProviderApiKey } = await import("../../src/lib/providers/validation.ts");
    const result = await validateProviderApiKey({
      provider: "nvidia",
      apiKey: "nv-test-key",
      // Malformed: baseUrl is an object instead of a string. Pre-fix this would
      // crash inside normalizeBaseUrl with `.trim is not a function`.
      providerSpecificData: { baseUrl: { not: "a string" } as any },
    });
    assert.equal(typeof result, "object");
    assert.equal(typeof result.valid, "boolean");
    // Whether the call succeeds (with default baseUrl) or fails gracefully with
    // an outbound URL guard error is fine — the contract is "no TypeError leak".
    if (!result.valid && typeof result.error === "string") {
      assert.ok(
        !result.error.includes("startsWith"),
        `error must not mention startsWith TypeError, got: ${result.error}`
      );
      assert.ok(
        !result.error.includes("is not a function"),
        `error must not mention TypeError, got: ${result.error}`
      );
    }
  } finally {
    globalThis.fetch = origFetch;
  }
});

test("nvidia specialty validator returns Invalid API key on 401", async () => {
  const origFetch = globalThis.fetch;
  globalThis.fetch = (async () =>
    new Response(JSON.stringify({ error: "unauthorized" }), {
      status: 401,
      headers: { "content-type": "application/json" },
    })) as typeof fetch;

  try {
    const { validateProviderApiKey } = await import("../../src/lib/providers/validation.ts");
    const result = await validateProviderApiKey({
      provider: "nvidia",
      apiKey: "nv-badkey",
      providerSpecificData: {},
    });
    assert.equal(result.valid, false);
    assert.equal(result.error, "Invalid API key");
  } finally {
    globalThis.fetch = origFetch;
  }
});

test("nvidia specialty validator skips /models probe entirely", async () => {
  const calls: string[] = [];
  const origFetch = globalThis.fetch;
  globalThis.fetch = (async (url: any) => {
    calls.push(String(url));
    return new Response(JSON.stringify({}), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  }) as typeof fetch;

  try {
    const { validateProviderApiKey } = await import("../../src/lib/providers/validation.ts");
    const result = await validateProviderApiKey({
      provider: "nvidia",
      apiKey: "nv-key",
      providerSpecificData: {},
    });
    assert.equal(result.valid, true);
    assert.ok(
      calls.every((u) => !u.endsWith("/v1/models")),
      `should not call /v1/models, called: ${JSON.stringify(calls)}`
    );
    assert.ok(
      calls.some((u) => u.endsWith("/chat/completions")),
      `should call /chat/completions, called: ${JSON.stringify(calls)}`
    );
  } finally {
    globalThis.fetch = origFetch;
  }
});

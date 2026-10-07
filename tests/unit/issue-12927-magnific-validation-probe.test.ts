// Repro for GitHub issue #12927: the Magnific image-provider key validation probe
// sends GET /v1/ai/mystic, which is a POST-only task-submission route. Once
// authentication passes, the API has no GET handler for that path and returns 404,
// so a VALID key is reported as invalid ("Validation failed: 404").
//
// Run: DATA_DIR=$(mktemp -d) node --import tsx/esm --test --test-force-exit \
//   tests/unit/issue-12927-magnific-validation-probe.test.ts

import assert from "node:assert/strict";
import { test } from "node:test";

// Simulates the real Magnific API auth-before-routing behavior described by the
// reporter: a bad key gets 401 on every route; a valid key gets routed and the
// POST-only /v1/ai/mystic path answers 404 to a GET, while /v1/ai/flows answers 200.
function mockMagnificFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  const url = String(input instanceof URL ? input.toString() : input);
  const method = String(init?.method || "GET").toUpperCase();
  const headers = new Headers(init?.headers);
  const apiKey = headers.get("x-magnific-api-key");

  if (apiKey !== "valid-magnific-key") {
    return Promise.resolve(
      new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 })
    );
  }

  if (url === "https://api.magnific.com/v1/ai/mystic" && method === "GET") {
    // Valid key, but this route is POST-only -> 404 once routed past auth.
    return Promise.resolve(new Response(JSON.stringify({ error: "Not found" }), { status: 404 }));
  }

  if (url === "https://api.magnific.com/v1/ai/flows" && method === "GET") {
    // The reporter's verified working read-only probe for personal accounts.
    return Promise.resolve(new Response(JSON.stringify({ flows: [] }), { status: 200 }));
  }

  return Promise.resolve(new Response(JSON.stringify({ error: "unexpected" }), { status: 500 }));
}

// NOTE: `open-sse/utils/proxyFetch.ts` unconditionally does
// `globalThis.fetch = patchedFetch` as a module-level side effect the first time it is
// imported (directly or transitively). imageValidation.ts pulls it in via
// safeOutboundFetch -> proxyFetch, so assigning our mock to globalThis.fetch BEFORE that
// first import gets silently clobbered. Import first, THEN install the mock so it is what
// `fetchWithTimeout` reads (`fetchFn || globalThis.fetch`, read at call time, not captured).
const { validateImageProviderApiKey } = await import("../../src/lib/providers/imageValidation.ts");
(globalThis as unknown as { fetch: typeof mockMagnificFetch }).fetch = mockMagnificFetch;

test("issue #12927: a genuinely valid Magnific key must validate as valid", async () => {
  const result = await validateImageProviderApiKey({
    provider: "magnific",
    apiKey: "valid-magnific-key",
    providerSpecificData: {},
  });

  // EXPECTED (post-fix): a valid key validates successfully.
  // Pre-fix, IMAGE_PROVIDER_VALIDATION_ENDPOINTS.magnific pointed GET at
  // /v1/ai/mystic, a POST-only task-submission route. Auth passed but routing 404s,
  // so validateImageProviderApiKey() reported `{ valid: false, error: "Validation failed: 404" }`
  // for a key that is genuinely valid — the false negative from the issue.
  assert.equal(
    result.valid,
    true,
    `expected a valid key to validate as valid, got: ${JSON.stringify(result)}`
  );
});

test("control: invalid Magnific key correctly fails with 401 -> Invalid API key", async () => {
  const { validateImageProviderApiKey } =
    await import("../../src/lib/providers/imageValidation.ts");

  const result = await validateImageProviderApiKey({
    provider: "magnific",
    apiKey: "totally-wrong-key",
    providerSpecificData: {},
  });

  assert.equal(result.valid, false);
  assert.equal(result.error, "Invalid API key");
});

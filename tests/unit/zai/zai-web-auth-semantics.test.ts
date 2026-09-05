import test from "node:test";
import assert from "node:assert/strict";

const originalFetch = globalThis.fetch;

const { validateProviderApiKey } = await import("../../../src/lib/providers/validation.ts");

let nextStatus = 200;
let lastRequest: {
  url: string;
  method: string;
  authorization: string;
  cookie: string;
} | null = null;

let lastResponse: Response | null = null;

globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
  const headers = new Headers(init?.headers);

  lastRequest = {
    url: String(input),
    method: String(init?.method || "GET"),
    authorization: headers.get("authorization") || "",
    cookie: headers.get("cookie") || "",
  };

  lastResponse = new Response(
    JSON.stringify({
      secret: "response-body-must-not-be-consumed",
    }),
    {
      status: nextStatus,
      headers: {
        "content-type": "application/json",
      },
    }
  );

  return lastResponse;
}) as typeof fetch;

test.after(() => {
  globalThis.fetch = originalFetch;
});

async function validate(status: number) {
  nextStatus = status;
  lastRequest = null;
  lastResponse = null;

  return validateProviderApiKey({
    provider: "zai-web",
    apiKey: "synthetic-zai-token",
    providerSpecificData: {},
  });
}

test("zai-web uses the token-only authenticated user-settings GET", async () => {
  const result = await validate(200);

  assert.equal(result.valid, true);

  assert.equal(lastRequest?.url, "https://chat.z.ai/api/v1/users/user/settings");

  assert.equal(lastRequest?.method, "GET");

  assert.equal(lastRequest?.authorization, "Bearer synthetic-zai-token");

  assert.equal(lastRequest?.cookie, "");

  assert.equal(lastResponse?.bodyUsed, false);
});

test("zai-web preserves exact 401 as credential rejection", async () => {
  const result = await validate(401);

  assert.equal(result.valid, false);
  assert.equal(result.statusCode, 401);

  assert.match(result.error, /invalid or expired/i);

  assert.equal(lastResponse?.bodyUsed, false);
});

test("zai-web preserves 403 without calling it expired", async () => {
  const result = await validate(403);

  assert.equal(result.valid, false);
  assert.equal(result.statusCode, 403);

  assert.doesNotMatch(result.error, /invalid or expired/i);

  assert.equal(lastResponse?.bodyUsed, false);
});

test("zai-web preserves rate-limit and server statuses", async () => {
  for (const status of [429, 503]) {
    const result = await validate(status);

    assert.equal(result.valid, false);
    assert.equal(result.statusCode, status);

    assert.doesNotMatch(result.error, /invalid or expired/i);

    assert.equal(lastResponse?.bodyUsed, false);
  }
});

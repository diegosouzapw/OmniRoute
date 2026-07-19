/**
 * #6929 — eliminate the redundant getApiKeyMetadata DB read in the embeddings route.
 *
 * src/app/api/v1/embeddings/route.ts used to do a THIRD DB lookup
 * (`apiKeyMeta = apiKeyRaw ? await getApiKeyMetadata(apiKeyRaw) : null`) even though
 * `enforceApiKeyPolicy()` already fetches the same metadata internally and returns it
 * as `policy.apiKeyInfo`. The fix replaces that call with `policy.apiKeyInfo` directly.
 *
 * Regression coverage: the old code gated the lookup on the ROUTE's own
 * `extractApiKey(request)` result (`apiKeyRaw`), which is null for a request
 * authenticated only via the dashboard-playground "test this key by id" fallback
 * (`resolvePlaygroundTestKey`, only reachable via an authenticated dashboard
 * session + `x-omniroute-playground-key-id`, no bearer key). In that case the old
 * code ALWAYS produced `apiKeyMeta = null` — so the downstream handler's call log
 * never carried apiKeyId/apiKeyName. `policy.apiKeyInfo` is a superset that also
 * covers this path, so the fixed code populates it correctly.
 *
 * This test drives that exact scenario end-to-end through the real POST handler and
 * asserts the persisted call_logs row (the observable sink that receives
 * `EmbeddingHandlerOptions.apiKeyId/apiKeyName`) carries the pre-fetched key's real
 * id/name — proving the downstream handler received `policy.apiKeyInfo`, not a
 * second/independent (and in this path, always-null) lookup.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { SignJWT } from "jose";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omr-embed-apikeymeta-6929-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "embed-6929-api-secret";
process.env.JWT_SECRET = "embed-6929-jwt-secret";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const { createProviderNode } = await import("../../src/lib/db/providers/nodes.ts");
const { getCallLogs } = await import("../../src/lib/usage/callLogs.ts");
const { POST } = await import("../../src/app/api/v1/embeddings/route.ts");

const PLAYGROUND_KEY_ID_HEADER = "x-omniroute-playground-key-id";

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

async function sessionCookie(): Promise<string> {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const jwt = await new SignJWT({ sub: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h")
    .sign(secret);
  return `auth_token=${jwt}`;
}

async function waitForCallLog(apiKeyId: string, timeoutMs = 2000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    const logs = await getCallLogs({ apiKey: apiKeyId, limit: 5 });
    const match = logs.find((l: { apiKeyId?: string | null }) => l.apiKeyId === apiKeyId);
    if (match) return match;
    await new Promise((resolve) => setTimeout(resolve, 25));
  }
  return null;
}

test("#6929: playground-test-key request forwards pre-fetched policy.apiKeyInfo to the downstream call log (no dependence on a second getApiKeyMetadata read)", async () => {
  const created = await apiKeysDb.createApiKey("embed-6929-playground-key", "machine-6929", []);

  await createProviderNode({
    type: "openai-compatible-embeddings",
    name: "LAN Embed 6929",
    prefix: "lanembed6929",
    apiType: "embeddings",
    baseUrl: "http://10.10.0.182:11434/v1",
  });

  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({
        data: [{ object: "embedding", embedding: [0.1, 0.2], index: 0 }],
        usage: { prompt_tokens: 3, total_tokens: 3 },
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );

  try {
    // No Authorization header at all — the route's own extractApiKey() returns null.
    // Only enforceApiKeyPolicy's resolvePlaygroundTestKey() fallback (authenticated
    // dashboard session + key-id header) resolves the key.
    const req = new Request("http://localhost/v1/embeddings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        [PLAYGROUND_KEY_ID_HEADER]: created.id,
        cookie: await sessionCookie(),
      },
      body: JSON.stringify({ model: "lanembed6929/nomic-embed-text", input: "hello world" }),
    });

    const res = await POST(req);
    assert.equal(res.status, 200, "playground-key-authenticated embeddings request should succeed");

    const logged = await waitForCallLog(created.id);
    assert.ok(logged, "expected a call_logs row for the playground-resolved api key id");
    assert.equal(
      logged!.apiKeyId,
      created.id,
      "downstream handler must receive policy.apiKeyInfo.id, not a null/independent lookup"
    );
    assert.equal(
      logged!.apiKeyName,
      "embed-6929-playground-key",
      "downstream handler must receive policy.apiKeyInfo.name"
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});

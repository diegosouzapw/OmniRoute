/**
 * #12328 — Vertex model discovery with a Vertex AI Express API key must not
 * surface the generic "API unavailable — using local catalog" when the
 * Generative Language API rejects the key. A Vertex-scoped Express key gets
 * 400 API_KEY_INVALID from generativelanguage.googleapis.com (different
 * service, different credential domain), while the connection test and
 * inference both succeed — so the generic warning sends users chasing
 * key/permission ghosts.
 *
 * The fix: on 400/403 with an Express key (queryKey path), the fallback names
 * the real cause and serves the local catalog as an intentional source
 * (localIntentional, #5460/#5465) so model-sync imports it instead of
 * treating it as a degraded remote fetch.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-12328-vertex-express-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "vertex-12328-test-secret";

const { createProviderConnection } = await import("../../src/lib/db/providers.ts");
const modelsRoute = await import("../../src/app/api/providers/[id]/models/route.ts");

const GOOGLE_400 = {
  error: {
    code: 400,
    message: "API key not valid. Please pass a valid API key.",
    status: "INVALID_ARGUMENT",
    details: [
      {
        "@type": "type.googleapis.com/google.rpc.ErrorInfo",
        reason: "API_KEY_INVALID",
        domain: "googleapis.com",
        metadata: { service: "generativelanguage.googleapis.com" },
      },
    ],
  },
};

const EXPRESS_KEY = "vertex-express-key-opaque-not-json";

async function createVertexConnection(): Promise<{ id: string }> {
  const row = await createProviderConnection({
    provider: "vertex",
    name: "12328-test",
    authType: "apikey",
    apiKey: EXPRESS_KEY,
    providerSpecificData: { region: "us-central1" },
  });
  return { id: String(row.id) };
}

function mockFetchOnce(status: number, body: unknown) {
  const calls: string[] = [];
  const original = globalThis.fetch;
  globalThis.fetch = (async (input: RequestInfo | URL) => {
    calls.push(String(input));
    return new Response(JSON.stringify(body), {
      status,
      headers: { "Content-Type": "application/json" },
    });
  }) as typeof fetch;
  return {
    calls,
    restore() {
      globalThis.fetch = original;
    },
  };
}

test("#12328 Express-key 400 serves local catalog as intentional with the real cause", async () => {
  const conn = await createVertexConnection();
  const mock = mockFetchOnce(400, GOOGLE_400);
  try {
    const res = await modelsRoute.GET(
      new Request(`http://localhost/api/providers/${conn.id}/models?refresh=true`),
      { params: Promise.resolve({ id: conn.id }) }
    );
    assert.equal(res.status, 200);

    const body = (await res.json()) as {
      models?: Array<{ id: string }>;
      source?: string;
      warning?: string;
      intentional?: boolean;
    };

    // Hit the Generative Language list endpoint exactly once, key in query.
    assert.equal(mock.calls.length, 1);
    assert.ok(mock.calls[0].startsWith("https://generativelanguage.googleapis.com/v1beta/models"));
    assert.ok(mock.calls[0].includes("key="));

    // Local catalog served, flagged intentional, warning names the real cause.
    assert.equal(body.source, "local_catalog");
    assert.equal(body.intentional, true);
    assert.ok(body.warning);
    assert.match(body.warning!, /API_KEY_INVALID/);
    assert.match(body.warning!, /local catalog/);
    assert.ok(Array.isArray(body.models) && body.models.length > 0, "local catalog is non-empty");
  } finally {
    mock.restore();
  }
});

test("#12328 Express-key 403 gets the same intentional fallback (not a degraded 502)", async () => {
  const conn = await createVertexConnection();
  const mock = mockFetchOnce(403, { error: { code: 403, message: "Permission denied" } });
  try {
    const res = await modelsRoute.GET(
      new Request(`http://localhost/api/providers/${conn.id}/models?refresh=true`),
      { params: Promise.resolve({ id: conn.id }) }
    );
    assert.equal(res.status, 200);
    const body = (await res.json()) as { source?: string; intentional?: boolean; warning?: string };
    assert.equal(body.source, "local_catalog");
    assert.equal(body.intentional, true);
    assert.match(body.warning!, /API_KEY_INVALID/);
  } finally {
    mock.restore();
  }
});

test("#12328 transient 500 keeps the generic degraded fallback (no behavior change)", async () => {
  const conn = await createVertexConnection();
  const mock = mockFetchOnce(500, { error: { code: 500, message: "Internal" } });
  try {
    const res = await modelsRoute.GET(
      new Request(`http://localhost/api/providers/${conn.id}/models?refresh=true`),
      { params: Promise.resolve({ id: conn.id }) }
    );
    const body = (await res.json()) as { source?: string; intentional?: boolean; warning?: string };
    if (res.status === 200) {
      // Local catalog exists for vertex → generic fallback served, NOT intentional.
      assert.equal(body.source, "local_catalog");
      assert.equal(body.intentional, undefined);
      if (body.warning) assert.doesNotMatch(body.warning, /API_KEY_INVALID/);
    } else {
      assert.equal(res.status, 500);
    }
  } finally {
    mock.restore();
  }
});

test("#12328 SA-JSON bearer path unaffected: live discovery still parses the GL list", async () => {
  // A real RSA key: importPKCS8 in getAccessToken rejects placeholder keys before
  // any fetch happens, which would (correctly) fall back with "credential unavailable".
  const { generateKeyPairSync } = await import("node:crypto");
  const { privateKey } = generateKeyPairSync("rsa", { modulusLength: 2048 });
  const SA_JSON = JSON.stringify({
    type: "service_account",
    project_id: "test-project",
    private_key_id: "kid12328",
    private_key: privateKey.export({ type: "pkcs8", format: "pem" }).toString(),
    client_email: "test-12328@test-project.iam.gserviceaccount.com",
    client_id: "123456789",
  });
  const conn = await createProviderConnection({
    provider: "vertex",
    name: "12328-sa-test",
    authType: "apikey",
    apiKey: SA_JSON,
    providerSpecificData: { region: "us-central1" },
  });

  // Mock the OAuth token endpoint (form POST → access_token), then the GL list.
  const original = globalThis.fetch;
  const calls: string[] = [];
  globalThis.fetch = (async (input: RequestInfo | URL) => {
    const url = String(input);
    calls.push(url);
    if (url.startsWith("https://oauth2.googleapis.com/token")) {
      return new Response(JSON.stringify({ access_token: "test-access-token", expires_in: 3600 }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response(
      JSON.stringify({
        models: [{ name: "models/gemini-3.7-flash", displayName: "Gemini 3.7 Flash" }],
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }) as typeof fetch;
  try {
    const res = await modelsRoute.GET(
      new Request(`http://localhost/api/providers/${conn.id}/models?refresh=true`),
      { params: Promise.resolve({ id: conn.id }) }
    );
    assert.equal(res.status, 200);
    const body = (await res.json()) as { source?: string; models?: Array<{ id: string }> };
    // Live discovery wins: parsed GL list, not the local catalog.
    assert.equal(body.source, "api");
    const ids = (body.models ?? []).map((m) => m.id);
    assert.ok(ids.includes("gemini-3.7-flash"), `expected parsed model, got: ${ids.join(",")}`);
    // Bearer path never puts the key in the query string.
    for (const c of calls) assert.ok(!c.includes("key="), "SA path must not use ?key=");
  } finally {
    globalThis.fetch = original;
  }
});

test.after(() => {
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

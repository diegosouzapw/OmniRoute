import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-ag-image-rotation-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "ag-image-rotation-test-secret";

const core = await import("../../src/lib/db/core.ts");
const providers = await import("../../src/lib/db/providers.ts");
const imageRoute = await import("../../src/app/api/v1/images/generations/route.ts");

type PersistedConnection = { id: string; rateLimitedUntil?: string | null };
type ErrorPayload = { error: { message: string } };
const originalFetch = globalThis.fetch;

async function resetStorage() {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function seedAntigravity(name: string, lastUsedAt: string | null) {
  return providers.createProviderConnection({
    provider: "antigravity",
    authType: "oauth",
    name,
    accessToken: `token-${name}`,
    refreshToken: `refresh-${name}`,
    projectId: `project-${name}`,
    isActive: true,
    testStatus: "active",
    priority: 1,
    lastUsedAt,
    providerSpecificData: {},
  });
}

function request(signal?: AbortSignal) {
  return new Request("http://localhost/api/v1/images/generations", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    signal,
    body: JSON.stringify({
      model: "antigravity/gemini-3.1-flash-image",
      prompt: "a rotation test",
      size: "1024x1024",
    }),
  });
}

function upstreamSuccess() {
  return new Response(
    JSON.stringify({
      response: { candidates: [{ content: { parts: [{ inlineData: { data: "aW1n" } }] } }] },
    }),
    { status: 200, headers: { "content-type": "application/json" } }
  );
}

test.beforeEach(resetStorage);
test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("Antigravity image quota 429 rotates to the other account without mutating production cooldown state", async () => {
  const a = await seedAntigravity("A", "2026-01-01T00:00:00.000Z");
  const b = await seedAntigravity("B", "2026-01-02T00:00:00.000Z");
  const tokens: string[] = [];
  globalThis.fetch = async (_url, options: RequestInit = {}) => {
    tokens.push(String((options.headers as Record<string, string>).Authorization));
    return tokens.length === 1
      ? new Response(JSON.stringify({ error: { message: "quota exhausted" } }), { status: 429 })
      : upstreamSuccess();
  };

  const response = await imageRoute.POST(request());
  assert.equal(response.status, 200);
  assert.equal(tokens.length, 2);
  assert.notEqual(tokens[0], tokens[1]);
  assert.deepEqual([...new Set(tokens)].sort(), ["Bearer token-A", "Bearer token-B"]);
  const persistedA = await providers.getProviderConnectionById((a as { id: string }).id);
  const persistedB = await providers.getProviderConnectionById((b as { id: string }).id);
  assert.equal((persistedA as PersistedConnection | null)?.rateLimitedUntil ?? null, null);
  assert.equal((persistedB as PersistedConnection | null)?.rateLimitedUntil ?? null, null);
});

test("Antigravity image all exhausted returns the final normalized error", async () => {
  await seedAntigravity("A", "2026-01-01T00:00:00.000Z");
  await seedAntigravity("B", "2026-01-02T00:00:00.000Z");
  let calls = 0;
  globalThis.fetch = async () => {
    calls++;
    return new Response(JSON.stringify({ error: { message: "quota exhausted" } }), { status: 429 });
  };

  const response = await imageRoute.POST(request());
  const body = (await response.json()) as ErrorPayload;
  assert.equal(response.status, 429);
  assert.equal(calls, 2);
  assert.match(body.error.message, /quota exhausted/i);
});

test("Antigravity image request-invalid error does not rotate accounts", async () => {
  await seedAntigravity("A", "2026-01-01T00:00:00.000Z");
  await seedAntigravity("B", "2026-01-02T00:00:00.000Z");
  let calls = 0;
  globalThis.fetch = async () => {
    calls++;
    return new Response(JSON.stringify({ error: { message: "invalid image configuration" } }), {
      status: 400,
    });
  };

  const response = await imageRoute.POST(request());
  assert.equal(response.status, 400);
  assert.equal(calls, 1);
});

test("Antigravity image ordinary 429 does not rotate accounts", async () => {
  await seedAntigravity("A", "2026-01-01T00:00:00.000Z");
  await seedAntigravity("B", "2026-01-02T00:00:00.000Z");
  let calls = 0;
  globalThis.fetch = async () => {
    calls++;
    return new Response(JSON.stringify({ error: { message: "too many requests; retry later" } }), {
      status: 429,
      headers: { "retry-after": "10" },
    });
  };

  const response = await imageRoute.POST(request());
  assert.equal(response.status, 429);
  assert.equal(calls, 1);
});

test("Antigravity image propagates an in-flight client abort to fetch without rotating", async () => {
  await seedAntigravity("A", "2026-01-01T00:00:00.000Z");
  await seedAntigravity("B", "2026-01-02T00:00:00.000Z");
  const controller = new AbortController();
  let calls = 0;
  let receivedSignal: AbortSignal | undefined;
  let markFetchStarted: (() => void) | undefined;
  const fetchStarted = new Promise<void>((resolve) => {
    markFetchStarted = resolve;
  });
  globalThis.fetch = async (_url, options: RequestInit = {}) => {
    calls++;
    receivedSignal = options.signal as AbortSignal;
    markFetchStarted?.();
    return new Promise((_resolve, reject) => {
      if (receivedSignal?.aborted) {
        reject(new DOMException("aborted", "AbortError"));
        return;
      }
      receivedSignal?.addEventListener(
        "abort",
        () => reject(new DOMException("aborted", "AbortError")),
        {
          once: true,
        }
      );
    });
  };

  const pending = imageRoute.POST(request(controller.signal));
  await fetchStarted;
  controller.abort();
  const response = await pending;
  assert.equal(response.status, 499);
  assert.equal(calls, 1);
  assert.equal(receivedSignal?.aborted, true);
});

import { describe, test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// A cursor-api connection (crsr_ user key) must discover Cursor's live catalog
// like an IDE-session `cursor` connection. Before this, the route had no
// cursor-api branch and served the static registry as "local_catalog"; the
// sync persisted that snapshot as the authoritative live catalog, so every
// model Cursor added after the snapshot (e.g. claude-opus-5-5-*) was rejected
// at dispatch as "not available in the active live catalog".

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cursor-api-models-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsRoute = await import("../../src/app/api/providers/[id]/models/route.ts");
const { __resetCursorApiKeyAuthForTest } =
  await import("../../open-sse/services/cursorApiKeyAuth.ts");

const USER_KEY = "crsr_test_user_key";
const SESSION_TOKEN = "session-token-from-exchange";

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

// Both cases replace global fetch. Keep them serial so a concurrent run cannot
// swap the mock out from under the other case.
describe("cursor-api model discovery", { concurrency: 1 }, () => {
  test("cursor-api discovers Cursor's live catalog with the exchanged session token", async () => {
    __resetCursorApiKeyAuthForTest();
    const connection = await providersDb.createProviderConnection({
      provider: "cursor-api",
      authType: "apikey",
      name: "cursor-api-live",
      apiKey: USER_KEY,
    });

    const calls: Array<{ url: string; authorization: string | null }> = [];
    const originalFetch = globalThis.fetch;
    globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      const authorization = new Headers(init?.headers).get("authorization");
      calls.push({ url, authorization });
      if (url.endsWith("/auth/exchange_user_api_key")) {
        return Response.json({ accessToken: SESSION_TOKEN, refreshToken: SESSION_TOKEN });
      }
      if (url.endsWith("/aiserver.v1.AiService/AvailableModels")) {
        return Response.json({
          models: [
            { name: "claude-opus-5-5-medium", displayName: "Claude Opus 5.5" },
            { name: "claude-4.6-opus-high", displayName: "Claude Opus 4.6" },
          ],
        });
      }
      throw new Error(`unexpected fetch ${url}`);
    }) as typeof globalThis.fetch;

    try {
      const response = await modelsRoute.GET(
        new Request(`http://localhost/api/providers/${connection.id}/models?refresh=true`),
        { params: { id: connection.id } }
      );
      assert.equal(response.status, 200);
      const body = await response.json();
      assert.notEqual(body.source, "local_catalog");
      const ids = body.models.map((model: { id: string }) => model.id);
      assert.ok(ids.includes("claude-opus-5-5-medium"), ids.join(","));
      assert.ok(ids.includes("claude-4.6-opus-high"), ids.join(","));

      const discovery = calls.find((call) => call.url.endsWith("/AvailableModels"));
      assert.equal(discovery?.authorization, `Bearer ${SESSION_TOKEN}`);
      assert.ok(
        calls.every(
          (call) => call.authorization !== `Bearer ${USER_KEY}` || call.url.includes("exchange")
        ),
        "the raw crsr_ key is only ever sent to the exchange endpoint"
      );
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  test("cursor discovery warnings do not leak stack paths", async () => {
    __resetCursorApiKeyAuthForTest();
    const connection = await providersDb.createProviderConnection({
      provider: "cursor-api",
      authType: "apikey",
      name: "cursor-api-discovery-error",
      apiKey: `${USER_KEY}_leak`,
    });

    const leak = "at /home/secret/file.ts:10";
    const originalFetch = globalThis.fetch;
    globalThis.fetch = (async (input: RequestInfo | URL) => {
      const url = String(input);
      if (url.endsWith("/auth/exchange_user_api_key")) {
        return Response.json({ accessToken: SESSION_TOKEN, refreshToken: SESSION_TOKEN });
      }
      if (url.endsWith("/aiserver.v1.AiService/AvailableModels")) {
        return new Response(`discovery failed ${leak}`, { status: 500 });
      }
      throw new Error(`unexpected fetch ${url}`);
    }) as typeof globalThis.fetch;

    try {
      const response = await modelsRoute.GET(
        new Request(`http://localhost/api/providers/${connection.id}/models?refresh=true`),
        { params: { id: connection.id } }
      );
      const body = await response.json();
      const warning = String(body.warning ?? body.error ?? "");
      assert.match(warning, /AvailableModels unavailable/);
      assert.equal(warning.includes("/home/secret/file.ts:10"), false);
      assert.equal(warning.includes("at /"), false);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });
});

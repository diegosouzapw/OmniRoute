// Regression test for #7522: POST /api/oauth/codex/import must validate the
// imported refresh_token BEFORE persisting a connection. Previously a payload
// carrying an already-invalidated refresh_token (e.g. `refresh_token_invalidated`
// / a dead-on-arrival `auth.json`) was imported as `active` and only failed
// confusingly on first real use.
//
// This test mocks global.fetch so `refreshCodexToken()` (open-sse/services/
// tokenRefresh.ts) talks to a fake OpenAI OAuth token endpoint instead of the
// network — the refresh exchange itself is reused, not reimplemented.
//
// DB handles are released in test.after (CLAUDE.md learning: unreleased
// SQLite handles hang node:test).

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-codex-import-refresh-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const route = await import("../../src/app/api/oauth/codex/import/route.ts");

test.before(async () => {
  await settingsDb.updateSettings({ requireLogin: false });
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

async function withMockedFetch<T>(impl: typeof fetch, fn: () => Promise<T>): Promise<T> {
  const original = globalThis.fetch;
  globalThis.fetch = impl;
  try {
    return await fn();
  } finally {
    globalThis.fetch = original;
  }
}

async function postImport(body: unknown) {
  const request = new Request("http://localhost:20128/api/oauth/codex/import", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const response = await route.POST(request);
  return { status: response.status, body: await response.json() };
}

const BASE_RECORD = {
  access_token: "seed-access-token",
  refresh_token: "seed-refresh-token-2026-07-10",
  email: "operator@example.com",
};

test("import: rejects a record whose refresh_token is already invalidated upstream (#7522)", async () => {
  await withMockedFetch(
    (async () =>
      jsonResponse({ error: { code: "refresh_token_invalidated" } }, 401)) as unknown as typeof fetch,
    async () => {
      const { status, body } = await postImport({ accounts: BASE_RECORD });

      assert.equal(status, 200);
      assert.equal(body.success, false);
      assert.equal(body.imported, 0);
      assert.equal(body.failed, 1);
      assert.equal(body.results[0].ok, false);
      assert.match(body.results[0].error, /expired|codex login/i);

      const rows = await providersDb.getProviderConnections({ provider: "codex" });
      const created = rows.find((r) => r.email === BASE_RECORD.email);
      assert.equal(created, undefined, "no connection should be persisted for a dead refresh_token");
    }
  );
});

test("import: rejects a record whose refresh_token was already consumed (refresh_token_reused)", async () => {
  await withMockedFetch(
    (async () =>
      jsonResponse({ error: { code: "refresh_token_reused" } }, 400)) as unknown as typeof fetch,
    async () => {
      const { status, body } = await postImport({
        accounts: { ...BASE_RECORD, email: "reused@example.com" },
      });

      assert.equal(status, 200);
      assert.equal(body.success, false);
      assert.equal(body.failed, 1);

      const rows = await providersDb.getProviderConnections({ provider: "codex" });
      const created = rows.find((r) => r.email === "reused@example.com");
      assert.equal(created, undefined);
    }
  );
});

test("import: creates the connection (with rotated tokens) when the refresh_token is still valid", async () => {
  await withMockedFetch(
    (async () =>
      jsonResponse({
        access_token: "rotated-access-token",
        refresh_token: "rotated-refresh-token",
        expires_in: 3600,
      })) as unknown as typeof fetch,
    async () => {
      const { status, body } = await postImport({
        accounts: { ...BASE_RECORD, email: "valid@example.com" },
      });

      assert.equal(status, 200);
      assert.equal(body.success, true);
      assert.equal(body.imported, 1);
      assert.equal(body.failed, 0);
      assert.equal(body.results[0].ok, true);

      const rows = await providersDb.getProviderConnections({ provider: "codex" });
      const created = rows.find((r) => r.email === "valid@example.com");
      assert.ok(created, "connection should be persisted for a valid refresh_token");
      assert.equal(created?.accessToken, "rotated-access-token");
      assert.equal(created?.refreshToken, "rotated-refresh-token");
    }
  );
});

test("import: a transient network error validating the refresh_token does not block the import", async () => {
  await withMockedFetch(
    (async () => {
      throw new Error("ECONNRESET");
    }) as unknown as typeof fetch,
    async () => {
      const { status, body } = await postImport({
        accounts: { ...BASE_RECORD, email: "transient@example.com" },
      });

      assert.equal(status, 200);
      assert.equal(body.success, true);
      assert.equal(body.imported, 1);

      const rows = await providersDb.getProviderConnections({ provider: "codex" });
      const created = rows.find((r) => r.email === "transient@example.com");
      assert.ok(created, "import should proceed with the original tokens on a transient failure");
      assert.equal(created?.accessToken, BASE_RECORD.access_token);
    }
  );
});

test("import: error responses never leak a stack trace", async () => {
  await withMockedFetch(
    (async () => jsonResponse({ error: { code: "refresh_token_invalidated" } }, 401)) as unknown as typeof fetch,
    async () => {
      const { body } = await postImport({
        accounts: { ...BASE_RECORD, email: "leak-check@example.com" },
      });
      assert.ok(!JSON.stringify(body).includes("at /"), "must not leak a stack trace");
      assert.ok(!JSON.stringify(body).includes(".ts:"), "must not leak a source location");
    }
  );
});

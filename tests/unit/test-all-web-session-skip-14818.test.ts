// #14780 / #14818 — web-session providers are skipped by the model test runner so a
// health probe never opens a real conversation on the user's account. The skip must
// not count as a model failure: with "auto-hide failed" on, Test All would otherwise
// hide every model of a web-session provider (server-side setModelIsHidden AND the
// dashboard's evaluateTestAllEntry) just because it was never probed.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-test-all-web-skip-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
const ORIGINAL_JWT_SECRET = process.env.JWT_SECRET;
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const route = await import("../../src/app/api/models/test-all/route.ts");
const { evaluateTestAllEntry } =
  await import("../../src/app/(dashboard)/dashboard/providers/[id]/providerPageHelpers.ts");

const originalFetch = globalThis.fetch;

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  if (ORIGINAL_JWT_SECRET === undefined) delete process.env.JWT_SECRET;
  else process.env.JWT_SECRET = ORIGINAL_JWT_SECRET;
});

test("Test All with autoHideFailed never hides a skipped web-session model", async () => {
  let fetchCalls = 0;
  globalThis.fetch = (async () => {
    fetchCalls += 1;
    throw new Error("web-session probe must not dispatch");
  }) as typeof fetch;

  const request = await makeManagementSessionRequest("http://localhost/api/models/test-all", {
    method: "POST",
    body: {
      providerId: "deepseek-web",
      modelIds: ["deepseek-v4-pro-think"],
      autoHideFailed: true,
    },
  });
  const response = await route.POST(request);
  assert.equal(response.status, 200);
  const body = (await response.json()) as {
    results: Record<string, { status: string; skipped?: boolean; hidden?: boolean }>;
  };
  const entry = body.results["deepseek-v4-pro-think"];

  assert.equal(fetchCalls, 0);
  assert.equal(entry.status, "error");
  assert.notEqual(entry.hidden, true);
  assert.equal(modelsDb.getModelIsHidden("deepseek-web", "deepseek-v4-pro-think"), false);

  // The dashboard applies the same decision client-side.
  assert.equal(evaluateTestAllEntry(entry as never, true).shouldHide, false);
  assert.equal(entry.skipped, true);
});

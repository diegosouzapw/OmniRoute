import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { NextRequest } from "next/server";
import { makeManagementSessionRequest } from "../../helpers/managementSession.ts";

// DATA_DIR must be set before the DB core module evaluates its singleton.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-provider-intel-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../../src/lib/db/core.ts");
const modelIntelligenceDb = await import("../../../src/lib/db/modelIntelligence.ts");
const settingsDb = await import("../../../src/lib/db/settings.ts");
const listRoute = await import("../../../src/app/api/provider-intelligence/route.ts");

const ORIGINAL_INITIAL_PASSWORD = process.env.INITIAL_PASSWORD;

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

function asNextRequest(request: Request): NextRequest {
  return new NextRequest(request);
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (ORIGINAL_INITIAL_PASSWORD === undefined) delete process.env.INITIAL_PASSWORD;
  else process.env.INITIAL_PASSWORD = ORIGINAL_INITIAL_PASSWORD;
});

function seed(model: string, score: number, eloRaw: number | null = null, confidence: string | null = null, category: string = "chat") {
  modelIntelligenceDb.upsertModelIntelligence({
    model,
    source: "arena_elo",
    category,
    score,
    eloRaw,
    confidence,
  });
}

// ── 401: unauthenticated ──────────────────────────────────────────────────────

test("GET rejects an unauthenticated request with 401", async () => {
  process.env.INITIAL_PASSWORD = "provider-intel-route-test-password";
  await settingsDb.updateSettings({ requireLogin: true });

  const res = await listRoute.GET(
    asNextRequest(new Request("http://localhost/api/provider-intelligence?provider=openai"))
  );
  assert.equal(res.status, 401);
  const body = (await res.json()) as { error: string };
  assert.ok(body.error, "expected an error body");
});

// ── 400: missing provider param ───────────────────────────────────────────────

test("GET returns 400 when the provider query parameter is missing", async () => {
  const res = await listRoute.GET(
    asNextRequest(await makeManagementSessionRequest("http://localhost/api/provider-intelligence"))
  );
  assert.equal(res.status, 400);
  const body = (await res.json()) as { error: string };
  assert.match(body.error, /Missing required query parameter: provider/);
});

test("GET returns 400 when the provider query parameter is empty", async () => {
  const res = await listRoute.GET(
    asNextRequest(await makeManagementSessionRequest("http://localhost/api/provider-intelligence?provider="))
  );
  assert.equal(res.status, 400);
  const body = (await res.json()) as { error: string };
  assert.match(body.error, /Missing required query parameter: provider/);
});

// ── 200: success ──────────────────────────────────────────────────────────────

test("GET returns sorted model intelligence for a provider", async () => {
  seed("kimi-k2.6", 0.92, 1520, "high");
  seed("kimi-k2.5", 0.71, 1380, "medium");
  seed("glm-4.7", 0.54, 1204, "low");

  const res = await listRoute.GET(
    asNextRequest(
      await makeManagementSessionRequest(
        "http://localhost/api/provider-intelligence?provider=kimi"
      )
    )
  );
  assert.equal(res.status, 200);
  const body = (await res.json()) as {
    modelId: string;
    modelName: string;
    score: number;
    eloRaw: number | null;
    confidence: string | null;
    category: string;
    isFree: boolean;
  }[];
  assert.ok(Array.isArray(body), "expected an array response");
  assert.ok(body.length > 0, "expected at least one model");

  // Sorted by score descending
  for (let i = 1; i < body.length; i++) {
    assert.ok(body[i - 1].score >= body[i].score, "expected scores in descending order");
  }

  const top = body[0];
  assert.equal(top.modelId, "kimi-k2.6");
  assert.equal(top.score, 0.92);
  assert.equal(top.eloRaw, 1520);
  assert.equal(top.confidence, "high");
  assert.equal(typeof top.isFree, "boolean");
});

test("GET returns an empty array when a provider has no models", async () => {
  const res = await listRoute.GET(
    asNextRequest(
      await makeManagementSessionRequest(
        "http://localhost/api/provider-intelligence?provider=nonexistent-provider"
      )
    )
  );
  assert.equal(res.status, 200);
  const body = (await res.json()) as unknown[];
  assert.deepEqual(body, []);
});

test("GET includes isFree flag for each model", async () => {
  seed("kimi-k2.6", 0.92, 1520, "high");

  const res = await listRoute.GET(
    asNextRequest(
      await makeManagementSessionRequest(
        "http://localhost/api/provider-intelligence?provider=kimi"
      )
    )
  );
  assert.equal(res.status, 200);
  const body = (await res.json()) as { isFree: boolean }[];
  for (const model of body) {
    assert.equal(typeof model.isFree, "boolean", `expected isFree boolean for ${model}`);
  }
});
/**
 * #14333 — GET /api/v1/auto-combo/[channel]/candidates must not widen for a
 * revoked (or expired/banned) API key.
 *
 * #13881 folds an invalid key into `{ apiKeyId: null }`, which for files/batches
 * is the correct fail-closed shape, but this route passes `scope.apiKeyId`
 * straight into `getAutoComboCandidates()` as the per-key exclusion scope, where
 * `null` means "apply no exclusions". A revoked key therefore received a wider
 * candidate pool than it did before #13881.
 *
 * Self-isolating: DATA_DIR points at a fresh temp dir before any db module loads.
 * Run: node --import tsx/esm --test tests/unit/api/auto-combo-candidates-revoked-key-14333.test.ts
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-14333-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "candidates-14333-secret";

const { resetDbInstance } = await import("../../../src/lib/db/core.ts");
const { createApiKey, revokeApiKey } = await import("../../../src/lib/db/apiKeys.ts");
const routeModule =
  await import("../../../src/app/api/v1/auto-combo/[channel]/candidates/route.ts");

function requestWithBearer(rawKey: string | null, channel: string) {
  const headers: Record<string, string> = { "content-type": "application/json" };
  if (rawKey) headers.Authorization = `Bearer ${rawKey}`;
  return new Request(
    `http://localhost/api/v1/auto-combo/${encodeURIComponent(channel)}/candidates`,
    { headers }
  );
}

async function callGET(rawKey: string | null, channel = "auto") {
  return routeModule.GET(requestWithBearer(rawKey, channel), {
    params: Promise.resolve({ channel }),
  });
}

test.after(() => {
  resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function seedRevokedKey(label: string) {
  const created = await createApiKey(label, `machine-14333-${label}`, []);
  await revokeApiKey(created.id);
  return created.key;
}

test("#14333: a revoked key is refused instead of getting the unfiltered candidate pool", async () => {
  const rawKey = await seedRevokedKey("revoked-candidates");

  const res = await callGET(rawKey);
  assert.equal(res.status, 401, `revoked key must not be served, got ${res.status}`);
  const body = await res.json();
  assert.ok(!String(body?.error?.message ?? "").includes("at /"), "no stack trace in the body");
  assert.ok(!Array.isArray(body?.candidates), "the refusal must not carry a candidate list at all");
});

test("#14333: an anonymous caller keeps the existing behaviour", async () => {
  const res = await callGET(null);
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.ok(Array.isArray(body.candidates));
});

test("#14333: a valid key still gets its own scoped candidate list", async () => {
  const created = await createApiKey("live-key", "machine-14333-live", []);
  const res = await callGET(created.key);
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.ok(Array.isArray(body.candidates));
});

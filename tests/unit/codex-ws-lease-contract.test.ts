/**
 * Regression guard for the Codex Responses-WS per-account concurrency lease
 * (non-queued per-account slot).
 *
 * Covers the route-level lease contract:
 *   1. the internal `release` action releases an acquired lease exactly once,
 *   2. a saturated account is excluded and prepare returns 503
 *      `codex_credentials_unavailable` instead of queuing,
 *   3. once the lease is released the same account is eligible again and
 *      prepare succeeds with a fresh leaseId.
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-codex-ws-lease-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "codex-ws-lease-api-key-secret";
process.env.OMNIROUTE_WS_BRIDGE_SECRET = "codex-ws-lease-bridge-secret";
process.env.OMNIROUTE_CODEX_WS_ENABLED = "true";

const coreDb = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const costRules = await import("../../src/domain/costRules.ts");
const rateLimiter = await import("../../src/shared/utils/rateLimiter.ts");
const route = await import("../../src/app/api/internal/codex-responses-ws/route.ts");
const codexWsLease = await import("../../src/sse/services/codexWsLease.ts");

rateLimiter.setRateLimiterTestMode(true);

type BridgeBody = Record<string, unknown>;

function getFsErrorCode(error: unknown): string | undefined {
  if (typeof error !== "object" || error === null || !("code" in error)) return undefined;
  const { code } = error as { code?: unknown };
  return typeof code === "string" ? code : undefined;
}

async function resetStorage() {
  apiKeysDb.resetApiKeyState();
  costRules.resetCostData();
  coreDb.resetDbInstance();

  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      if (fs.existsSync(TEST_DATA_DIR)) {
        fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
      }
      break;
    } catch (error: unknown) {
      const code = getFsErrorCode(error);
      if ((code === "EBUSY" || code === "EPERM") && attempt < 9) {
        await new Promise((resolve) => setTimeout(resolve, 50 * (attempt + 1)));
      } else {
        throw error;
      }
    }
  }

  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  codexWsLease.clearCodexWsLeasesForTest();
  await resetStorage();
});

test.after(async () => {
  codexWsLease.clearCodexWsLeasesForTest();
  apiKeysDb.resetApiKeyState();
  costRules.resetCostData();
  coreDb.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

function buildBridgeRequest(body: BridgeBody): Request {
  return new Request("http://localhost/api/internal/codex-responses-ws", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-omniroute-ws-bridge-secret": process.env.OMNIROUTE_WS_BRIDGE_SECRET as string,
    },
    body: JSON.stringify(body),
  });
}

function buildPrepareRequest(apiKey: string, model: string): Request {
  return buildBridgeRequest({
    action: "prepare",
    requestUrl: `/api/v1/responses?api_key=${encodeURIComponent(apiKey)}`,
    response: { model },
  });
}

async function seedCodexConnection(name = "Codex WS lease test") {
  const connection = (await providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    name,
    accessToken: "test-codex-access-token",
    refreshToken: "test-codex-refresh-token",
    expiresAt: Date.now() + 60 * 60 * 1000,
    isActive: true,
  })) as { id: string };
  return connection.id;
}

test("internal release action releases an acquired lease exactly once", async () => {
  const leaseId = await codexWsLease.acquireCodexWsLease("release-action-conn", 1);
  assert.ok(leaseId, "expected an acquired lease");

  const first = await route.POST(buildBridgeRequest({ action: "release", leaseId }));
  const firstBody = (await first.json()) as { ok?: boolean; released?: boolean };
  assert.equal(first.status, 200);
  assert.equal(firstBody.ok, true);
  assert.equal(firstBody.released, true);

  const second = await route.POST(buildBridgeRequest({ action: "release", leaseId }));
  const secondBody = (await second.json()) as { ok?: boolean; released?: boolean };
  assert.equal(secondBody.released, false, "a released lease must not release twice");
});

test("saturated account is excluded (503) instead of queued; eligible again after release", async () => {
  const key = await apiKeysDb.createApiKey("Lease Saturation Key", "machine-lease-sat");
  await apiKeysDb.updateApiKeyPermissions(key.id, {
    allowedModels: ["gpt-5.5"],
  });
  const connectionId = await seedCodexConnection();

  const lease = await codexWsLease.acquireCodexWsLease(connectionId, 1);
  assert.ok(lease, "expected to hold the account lease");

  const saturated = await route.POST(buildPrepareRequest(key.key, "gpt-5.5"));
  const saturatedBody = (await saturated.json()) as { error?: { code?: string } };
  assert.equal(
    saturated.status,
    503,
    `expected 503 on a saturated account, got ${saturated.status}: ${JSON.stringify(saturatedBody)}`
  );
  assert.equal(saturatedBody.error?.code, "codex_credentials_unavailable");

  assert.equal(codexWsLease.releaseCodexWsLease(lease), true);

  const ok = await route.POST(buildPrepareRequest(key.key, "gpt-5.5"));
  const okBody = (await ok.json()) as { ok?: boolean; leaseId?: string | null };
  assert.equal(
    ok.status,
    200,
    `expected prepare to succeed after release: ${JSON.stringify(okBody)}`
  );
  assert.equal(okBody.ok, true);
  assert.ok(okBody.leaseId, "a successful prepare must return a leaseId");
});

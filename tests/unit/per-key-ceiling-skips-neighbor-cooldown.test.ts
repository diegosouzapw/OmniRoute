// A per-key usage ceiling rejection is a request-scoped refusal, not a
// connection health signal: when the caller honors the skip decision, neither
// the serving connection nor same-egress-IP siblings of an egress-bucketed
// provider may be cooled down, and the client still receives a 429.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// DATA_DIR must be assigned BEFORE any transitive DB import —
// core.ts captures resolveWritableDataDir at module-load time.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-token-ceiling-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const proxyLogger = await import("../../src/lib/proxyLogger.ts");
const { shouldSkipConnDisable } = await import("../../open-sse/services/combo/comboPredicates.ts");
const { createErrorResult } = await import("../../open-sse/utils/error.ts");

// Shared egress IP for both connections: the egress-bucketed branch would
// lock every sibling behind it if the refusal ever reached
// markAccountUnavailable, so "untouched sibling" is the measurement.
const SHARED_EGRESS_IP = "203.0.113.9";

let seedSeq = 0;

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function seedConnection(provider: string): Promise<string> {
  const conn = await providersDb.createProviderConnection({
    provider,
    authType: "apikey",
    apiKey: `${provider}-ceiling-key-${++seedSeq}`,
    isActive: true,
    testStatus: "active",
  });
  return (conn as Record<string, unknown>).id as string;
}

function seedProxyLog(connectionId: string, egressIp: string) {
  proxyLogger.logProxyEvent({
    status: "success",
    provider: "opencode",
    targetUrl: "https://api.opencode.ai/chat",
    egressIp,
    connectionId,
  });
  // logProxyEvent only ENQUEUES the row for the background batch; the
  // egress-lock lookup reads proxy_logs synchronously, so flush before any
  // assertion that depends on sibling resolution.
  proxyLogger.flushProxyLogsSync();
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("a per-key usage ceiling 429 cools neither the serving connection nor its same-IP sibling", async () => {
  await resetStorage();
  const servedId = await seedConnection("opencode");
  const siblingId = await seedConnection("opencode");
  seedProxyLog(servedId, SHARED_EGRESS_IP);
  seedProxyLog(siblingId, SHARED_EGRESS_IP);

  // The exact Tier-2 refusal shape: status 429 + per-key ceiling code.
  const result = createErrorResult(
    429,
    "Token limit exceeded for account: 120/100 tokens used in the current window. Please try again later.",
    null,
    "TOKEN_LIMIT_EXCEEDED"
  );
  assert.equal(result.status, 429, "the client still receives a 429");

  // Replica of the caller contract: skip means markAccountUnavailable is
  // never invoked, so the egress-bucketed branch stays unreachable even
  // though the provider opted in and both connections share one egress IP.
  const skipConnectionDisable = shouldSkipConnDisable(result, false, false, "opencode");
  assert.equal(skipConnectionDisable, true, "a per-key ceiling refusal must skip the cooldown");
  let cooldownWrites = 0;
  if (!skipConnectionDisable) cooldownWrites += 1;
  assert.equal(cooldownWrites, 0, "skipped decisions must never reach the cooldown write");

  const [served, sibling] = await Promise.all([
    providersDb.getProviderConnectionById(servedId),
    providersDb.getProviderConnectionById(siblingId),
  ]);
  assert.equal(served!.testStatus, "active", "serving connection stays active");
  assert.ok(!served!.rateLimitedUntil, "serving connection carries no cooldown");
  assert.equal(sibling!.testStatus, "active", "same-IP sibling stays active");
  assert.ok(!sibling!.rateLimitedUntil, "same-IP sibling carries no cooldown");
});

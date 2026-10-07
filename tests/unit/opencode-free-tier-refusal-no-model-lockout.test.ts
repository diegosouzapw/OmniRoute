/**
 * A free-tier refusal must not be recorded as this model being forbidden.
 *
 * The executor already answers the refusal request-scoped: every sibling account returns
 * the same verdict for the same request, so the account it landed on is not the reason.
 * The per-model lockout arm (#3027/#12242) nevertheless fired on any 403 from a
 * passthrough provider, writing `Model <m> forbidden (per-model access/subscription)` on
 * the connection and taking that account out of rotation for the model. One refusal per
 * account is enough to empty the pool, after which requests that would have been served
 * are answered "no active credentials" instead.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-freetier-lockout-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const accountFallback = await import("../../open-sse/services/accountFallback.ts");
const auth = await import("../../src/sse/services/auth.ts");

const FREE_TIER_BODY =
  '{"error":{"type":"FreeTierError","message":"Error from provider (Console): OpenCode\'s free tier can only be used from within OpenCode"}}';
const FORBIDDEN_BODY = '{"error":{"message":"Model not available on your plan"}}';
const MODEL = "nemotron-3.5-lightning-free";

async function connection(provider = "opencode") {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  accountFallback.clearAllModelLockouts();
  const conn = await providersDb.createProviderConnection({
    provider,
    authType: "apikey",
    apiKey: "",
    isActive: true,
    testStatus: "active",
  });
  return String(conn.id);
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("a free-tier refusal leaves the model usable on the account it landed on", async () => {
  const connId = await connection();
  await auth.markAccountUnavailable(connId, 403, FREE_TIER_BODY, "opencode", MODEL);

  assert.equal(
    accountFallback.getModelLockoutInfo("opencode", connId, MODEL),
    null,
    "the refusal says nothing about this account and this model"
  );
  const conn = await providersDb.getProviderConnectionById(connId);
  assert.notEqual(
    conn?.lastErrorType,
    "forbidden",
    "the connection must not carry a per-model access error"
  );
  // Skipping the arm must not drop the request into a worse one: the connection stays
  // usable and uncooled, which is the whole point of answering the refusal request-scoped.
  assert.notEqual(conn?.testStatus, "unavailable", "the connection must stay usable");
  assert.ok(
    !conn?.rateLimitedUntil || new Date(conn.rateLimitedUntil).getTime() <= Date.now(),
    "the connection must not be put on cooldown"
  );
});

test("the recognition is scoped to the opencode family", async () => {
  // classifyProviderError scopes the same sentence to opencode* providers; the early
  // return mirrors that, so a foreign provider echoing it keeps the existing behaviour
  // and is still taken out of rotation.
  const connId = await connection("groq");
  await auth.markAccountUnavailable(connId, 403, FREE_TIER_BODY, "groq", MODEL);
  const conn = await providersDb.getProviderConnectionById(connId);
  assert.equal(conn?.testStatus, "unavailable", "the early return must not fire here");
});

test("an unrelated 403 on the same provider still locks the model out", async () => {
  const connId = await connection();
  await auth.markAccountUnavailable(connId, 403, FORBIDDEN_BODY, "opencode", MODEL);

  assert.notEqual(
    accountFallback.getModelLockoutInfo("opencode", connId, MODEL),
    null,
    "the existing per-model arm must keep firing for a real per-model refusal"
  );
});

test("a 402 on the same provider still locks the model out", async () => {
  // The arm this guard sits next to handles 402 as well as 403, and the early return
  // fires on neither 402 nor a non-refusal body. Pinned so a later widening of the
  // recognition cannot silently swallow the per-model credit path.
  const connId = await connection();
  // Same body as the refusal, different status: if the recognition were ever widened to
  // 402, the early return would fire here and this case would fail.
  await auth.markAccountUnavailable(connId, 402, FREE_TIER_BODY, "opencode", MODEL);
  assert.notEqual(accountFallback.getModelLockoutInfo("opencode", connId, MODEL), null);
});

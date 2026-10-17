/**
 * #14981 — opt-in quota session recovery: the 202 ticket path of
 * maybeQueueQuotaSessionRecovery() and the owner-scoped poll/cancel handler at
 * /api/v1/quota-recoveries/[id].
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-quota-recovery-route-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.STORAGE_ENCRYPTION_KEY = "quota-recovery-route-test-key";
process.env.API_KEY_SECRET = "quota-recovery-route-api-key-secret";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const tickets = await import("../../src/lib/db/quotaRecoveryTickets.ts");
const { maybeQueueQuotaSessionRecovery } =
  await import("../../src/lib/quota/quotaSessionRecovery.ts");
const route = await import("../../src/app/api/v1/quota-recoveries/[id]/route.ts");

const owner = await apiKeysDb.createApiKey("recovery-owner", "machine-quota-recovery");
const other = await apiKeysDb.createApiKey("recovery-other", "machine-quota-recovery");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const BODY = {
  model: "openai/gpt-4o-mini",
  stream: false,
  messages: [{ role: "user", content: "hi" }],
};

function quotaResponse(): Response {
  return new Response(JSON.stringify({ error: { message: "Quota exhausted for all accounts" } }), {
    status: 429,
    headers: { "Content-Type": "application/json", "Retry-After": "120" },
  });
}

function chatRequest(key: string | null, headers: Record<string, string> = {}): Request {
  return new Request("http://localhost/api/v1/chat/completions", {
    method: "POST",
    headers: {
      ...(key ? { Authorization: `Bearer ${key}` } : {}),
      "x-omniroute-quota-recovery": "auto",
      "x-omniroute-session": "session-1",
      "x-omniroute-recovery-turn": "turn-1",
      ...headers,
    },
  });
}

function pollRequest(key: string | null, method = "GET"): Request {
  return new Request("http://localhost/api/v1/quota-recoveries/x", {
    method,
    headers: key ? { Authorization: `Bearer ${key}` } : {},
  });
}

const ctx = (id: string) => ({ params: Promise.resolve({ id }) });

let ticketId = "";

test("terminal quota failure with the opt-in headers returns 202 and a poll ticket", async () => {
  const response = await maybeQueueQuotaSessionRecovery({
    request: chatRequest(owner.key),
    body: BODY,
    response: quotaResponse(),
    endpoint: "chat/completions",
  });
  assert.equal(response.status, 202);
  const payload = (await response.json()) as {
    recovery: { id: string; state: string; poll: string };
  };
  assert.equal(payload.recovery.state, "pending");
  assert.equal(payload.recovery.poll, `/api/v1/quota-recoveries/${payload.recovery.id}`);
  ticketId = payload.recovery.id;
});

test("without the opt-in header, or with an invalid key, the original response passes through", async () => {
  const original = quotaResponse();
  const notOptedIn = await maybeQueueQuotaSessionRecovery({
    request: chatRequest(owner.key, { "x-omniroute-quota-recovery": "off" }),
    body: BODY,
    response: original,
    endpoint: "chat/completions",
  });
  assert.equal(notOptedIn, original);

  const badKey = quotaResponse();
  assert.equal(
    await maybeQueueQuotaSessionRecovery({
      request: chatRequest("sk-not-a-real-key", { "x-omniroute-recovery-turn": "turn-2" }),
      body: BODY,
      response: badKey,
      endpoint: "chat/completions",
    }),
    badKey
  );
});

test("poll requires a valid API key (401)", async () => {
  const res = await route.GET(pollRequest(null), ctx(ticketId));
  assert.equal(res.status, 401);
  const body = (await res.json()) as { error: string };
  assert.ok(!body.error.includes("at /"));
});

test("another key's ticket is invisible (404) for GET and DELETE", async () => {
  assert.equal((await route.GET(pollRequest(other.key), ctx(ticketId))).status, 404);
  assert.equal((await route.DELETE(pollRequest(other.key, "DELETE"), ctx(ticketId))).status, 404);
});

test("a pending ticket polls as 202 for its owner", async () => {
  const res = await route.GET(pollRequest(owner.key), ctx(ticketId));
  assert.equal(res.status, 202);
  const body = (await res.json()) as { recovery: { state: string } };
  assert.equal(body.recovery.state, "pending");
});

test("a completed ticket returns the recovered response body (200)", async () => {
  assert.ok(tickets.claimQuotaRecoveryTicket(ticketId, new Date(Date.now() + 10 * 60_000)));
  assert.equal(tickets.completeQuotaRecoveryTicket(ticketId, '{"id":"chatcmpl-1"}'), true);
  const res = await route.GET(pollRequest(owner.key), ctx(ticketId));
  assert.equal(res.status, 200);
  assert.equal(res.headers.get("X-OmniRoute-Recovery-State"), "completed");
  assert.deepEqual(await res.json(), { id: "chatcmpl-1" });
});

test("cancelling a ticket that is no longer pending is a 409", async () => {
  const res = await route.DELETE(pollRequest(owner.key, "DELETE"), ctx(ticketId));
  assert.equal(res.status, 409);
});

test("a pending ticket can be cancelled by its owner", async () => {
  const queued = await maybeQueueQuotaSessionRecovery({
    request: chatRequest(owner.key, { "x-omniroute-recovery-turn": "turn-3" }),
    body: BODY,
    response: quotaResponse(),
    endpoint: "chat/completions",
  });
  const { recovery } = (await queued.json()) as { recovery: { id: string } };
  const res = await route.DELETE(pollRequest(owner.key, "DELETE"), ctx(recovery.id));
  assert.equal(res.status, 200);
  assert.equal(((await res.json()) as { recovery: { state: string } }).recovery.state, "cancelled");
});

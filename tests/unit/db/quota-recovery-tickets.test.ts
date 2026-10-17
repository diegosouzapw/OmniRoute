import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-quota-recovery-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.STORAGE_ENCRYPTION_KEY = "quota-recovery-test-key";

const core = await import("../../../src/lib/db/core.ts");
const tickets = await import("../../../src/lib/db/quotaRecoveryTickets.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

test("deduplicates a pending turn and stores only encrypted payload", () => {
  const input = {
    apiKeyId: "key-a",
    turnKey: "session-1/turn-1",
    endpoint: "responses" as const,
    requestPayload: JSON.stringify({ prompt: "private prompt" }),
    nextAttemptAt: "2026-09-28T09:00:00.000Z",
    expiresAt: "2026-09-29T09:00:00.000Z",
  };
  const first = tickets.enqueueQuotaRecoveryTicket(input);
  const second = tickets.enqueueQuotaRecoveryTicket(input);
  assert.equal(first.id, second.id);
  assert.throws(
    () => tickets.enqueueQuotaRecoveryTicket({ ...input, requestPayload: "different" }),
    /identity was reused/
  );
  assert.equal(tickets.getQuotaRecoveryTicket(first.id, "key-b"), null);

  const raw = core
    .getDbInstance()
    .prepare("SELECT request_ciphertext FROM quota_recovery_tickets WHERE id = ?")
    .get(first.id) as { request_ciphertext: string };
  assert.match(raw.request_ciphertext, /^enc:v1:/);
  assert.doesNotMatch(raw.request_ciphertext, /private prompt/);
});

test("claims once, retains a failed attempt, and exposes a result only to its owner", () => {
  const input = {
    apiKeyId: "key-a",
    turnKey: "session-1/turn-2",
    endpoint: "chat/completions" as const,
    requestPayload: JSON.stringify({ messages: [{ role: "user", content: "hello" }] }),
    nextAttemptAt: "2026-09-28T09:00:00.000Z",
    expiresAt: "2026-09-29T09:00:00.000Z",
  };
  const item = tickets.enqueueQuotaRecoveryTicket(input);
  assert.equal(tickets.listDueQuotaRecoveryTickets(new Date("2026-09-28T08:59:59Z")).length, 0);
  assert.ok(
    tickets
      .listDueQuotaRecoveryTickets(new Date("2026-09-28T09:00:00Z"))
      .some((due) => due.id === item.id)
  );
  assert.equal(
    tickets.claimQuotaRecoveryTicket(item.id, new Date("2026-09-28T09:00:00Z"))?.attemptCount,
    1
  );
  assert.equal(tickets.claimQuotaRecoveryTicket(item.id, new Date("2026-09-28T09:00:00Z")), null);
  assert.equal(tickets.readQuotaRecoveryRequest(item.id), input.requestPayload);
  assert.equal(tickets.rescheduleQuotaRecoveryTicket(item.id, "2026-09-28T09:01:00.000Z"), true);
  assert.equal(
    tickets.claimQuotaRecoveryTicket(item.id, new Date("2026-09-28T09:01:00Z"))?.attemptCount,
    2
  );
  assert.equal(tickets.completeQuotaRecoveryTicket(item.id, '{"answer":"done"}'), true);
  assert.equal(tickets.readQuotaRecoveryResult(item.id, "key-b"), null);
  assert.equal(tickets.readQuotaRecoveryResult(item.id, "key-a"), '{"answer":"done"}');
  assert.equal(tickets.readQuotaRecoveryRequest(item.id), null);
});

test("interrupted dispatch requires confirmation instead of replay", () => {
  const item = tickets.enqueueQuotaRecoveryTicket({
    apiKeyId: "key-a",
    turnKey: "session-1/turn-3",
    endpoint: "responses",
    requestPayload: "{}",
    nextAttemptAt: "2026-09-28T09:00:00.000Z",
    expiresAt: "2026-09-29T09:00:00.000Z",
  });
  assert.ok(tickets.claimQuotaRecoveryTicket(item.id, new Date("2026-09-28T09:00:00Z")));
  assert.equal(tickets.reconcileInterruptedQuotaRecoveries(), 1);
  assert.equal(tickets.getQuotaRecoveryTicket(item.id, "key-a")?.state, "needs_confirmation");
  assert.equal(tickets.claimQuotaRecoveryTicket(item.id, new Date("2026-09-28T09:02:00Z")), null);
  assert.equal(tickets.cancelQuotaRecoveryTicket(item.id, "key-a"), true);
  assert.equal(tickets.getQuotaRecoveryTicket(item.id, "key-a")?.state, "cancelled");
});

test("pending owner may cancel; expired payloads are erased", () => {
  const item = tickets.enqueueQuotaRecoveryTicket({
    apiKeyId: "key-a",
    turnKey: "session-1/turn-4",
    endpoint: "responses",
    requestPayload: "{}",
    nextAttemptAt: "2026-09-28T09:00:00.000Z",
    expiresAt: "2026-09-28T10:00:00.000Z",
  });
  assert.equal(tickets.cancelQuotaRecoveryTicket(item.id, "key-b"), false);
  assert.equal(tickets.cancelQuotaRecoveryTicket(item.id, "key-a"), true);
  assert.equal(tickets.getQuotaRecoveryTicket(item.id, "key-a")?.state, "cancelled");
  assert.ok(tickets.expireQuotaRecoveryTickets(new Date("2026-09-30T00:00:00Z")) >= 2);
  const raw = core
    .getDbInstance()
    .prepare(
      "SELECT request_ciphertext, result_ciphertext FROM quota_recovery_tickets WHERE turn_key = ?"
    )
    .get("session-1/turn-2") as { request_ciphertext: string; result_ciphertext: string | null };
  assert.equal(raw.request_ciphertext, "");
  assert.equal(raw.result_ciphertext, null);
});

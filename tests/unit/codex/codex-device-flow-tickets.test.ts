import test from "node:test";
import assert from "node:assert/strict";

import {
  createDeviceFlowTicket,
  peekDeviceFlowTicket,
  claimDeviceFlowTicket,
  completeDeviceFlowTicket,
  releaseDeviceFlowTicket,
  getDeviceFlowTicketStatus,
} from "@/lib/oauth/deviceFlowTickets";

test("createDeviceFlowTicket returns a token + future expiry and starts pending", () => {
  const { token, expiresAt } = createDeviceFlowTicket("codex", "conn-1");
  assert.ok(token.length >= 32);
  assert.ok(expiresAt > Date.now());

  const ticket = peekDeviceFlowTicket(token);
  assert.ok(ticket);
  assert.equal(ticket!.provider, "codex");
  assert.equal(ticket!.connectionId, "conn-1");
  assert.equal(ticket!.status, "pending");
});

test("claimDeviceFlowTicket is single-use (second claim rejected)", () => {
  const { token } = createDeviceFlowTicket("codex");
  const first = claimDeviceFlowTicket(token, "codex");
  assert.ok(first);
  assert.equal(first!.status, "claimed");

  // Second claim must fail — it is no longer pending.
  assert.equal(claimDeviceFlowTicket(token, "codex"), null);
});

test("complete records the result and surfaces it via status", () => {
  const { token } = createDeviceFlowTicket("codex");
  claimDeviceFlowTicket(token, "codex");
  completeDeviceFlowTicket(token, { connectionId: "c-9", email: "u@example.com" });

  const status = getDeviceFlowTicketStatus(token);
  assert.equal(status.status, "completed");
  assert.deepEqual(status.result, { connectionId: "c-9", email: "u@example.com" });
});

test("release reverts a claimed ticket to pending so the visitor can retry", () => {
  const { token } = createDeviceFlowTicket("codex");
  claimDeviceFlowTicket(token, "codex");
  releaseDeviceFlowTicket(token);

  assert.equal(getDeviceFlowTicketStatus(token).status, "pending");
  // Claimable again after release.
  assert.ok(claimDeviceFlowTicket(token, "codex"));
});

test("claimDeviceFlowTicket rejects a provider mismatch without claiming", () => {
  const { token } = createDeviceFlowTicket("codex");
  assert.equal(claimDeviceFlowTicket(token, "claude"), null);
  // Still pending + claimable for the correct provider.
  assert.equal(peekDeviceFlowTicket(token)!.status, "pending");
  assert.ok(claimDeviceFlowTicket(token, "codex"));
});

test("status is 'expired' for unknown tokens", () => {
  assert.equal(peekDeviceFlowTicket("nope"), null);
  assert.equal(getDeviceFlowTicketStatus("nope").status, "expired");
  assert.equal(claimDeviceFlowTicket("nope", "codex"), null);
});

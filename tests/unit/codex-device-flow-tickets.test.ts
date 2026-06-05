import test from "node:test";
import assert from "node:assert/strict";

import {
  createDeviceFlowTicket,
  peekDeviceFlowTicket,
  consumeDeviceFlowTicket,
} from "@/lib/oauth/deviceFlowTickets";

test("createDeviceFlowTicket returns a token + future expiry and is peekable", () => {
  const { token, expiresAt } = createDeviceFlowTicket("codex", "conn-1");
  assert.ok(token.length >= 32);
  assert.ok(expiresAt > Date.now());

  const ticket = peekDeviceFlowTicket(token);
  assert.ok(ticket);
  assert.equal(ticket!.provider, "codex");
  assert.equal(ticket!.connectionId, "conn-1");
  assert.equal(ticket!.used, false);
});

test("consumeDeviceFlowTicket is single-use", () => {
  const { token } = createDeviceFlowTicket("codex");
  const first = consumeDeviceFlowTicket(token, "codex");
  assert.ok(first);
  assert.equal(first!.token, token);

  // Second consume + any peek must fail (single-use).
  assert.equal(consumeDeviceFlowTicket(token, "codex"), null);
  assert.equal(peekDeviceFlowTicket(token), null);
});

test("consumeDeviceFlowTicket rejects a provider mismatch without consuming", () => {
  const { token } = createDeviceFlowTicket("codex");
  assert.equal(consumeDeviceFlowTicket(token, "claude"), null);
  // Still valid for the correct provider since the mismatch did not consume it.
  assert.ok(consumeDeviceFlowTicket(token, "codex"));
});

test("peek/consume return null for unknown tokens", () => {
  assert.equal(peekDeviceFlowTicket("nope"), null);
  assert.equal(consumeDeviceFlowTicket("nope", "codex"), null);
});

import test from "node:test";
import assert from "node:assert/strict";

import { resolveForcedConnectionForCredentialPool } from "../../src/sse/services/sessionAffinityPin.ts";

const conn = (id: string, rateLimitedUntil: string | null = null) => ({
  id,
  rateLimitedUntil,
});

test("resolveForcedConnectionForCredentialPool drops forced id when excluded after 429 fallback", () => {
  const excluded = new Set(["dead-account"]);
  assert.equal(
    resolveForcedConnectionForCredentialPool({
      forcedConnectionId: "dead-account",
      excludedConnectionIds: excluded,
      connections: [conn("dead-account"), conn("healthy-account")],
      allowRateLimitedConnections: false,
      bypassQuotaPolicy: false,
      isQuotaExhausted: () => false,
      isQuotaPolicyBlocked: () => false,
    }),
    null
  );
});

test("resolveForcedConnectionForCredentialPool keeps forced id when eligible", () => {
  assert.equal(
    resolveForcedConnectionForCredentialPool({
      forcedConnectionId: "healthy-account",
      excludedConnectionIds: new Set(),
      connections: [conn("healthy-account"), conn("other-account")],
      allowRateLimitedConnections: false,
      bypassQuotaPolicy: false,
      isQuotaExhausted: () => false,
      isQuotaPolicyBlocked: () => false,
    }),
    "healthy-account"
  );
});

test("resolveForcedConnectionForCredentialPool drops forced id on cooldown", () => {
  const future = new Date(Date.now() + 60_000).toISOString();
  assert.equal(
    resolveForcedConnectionForCredentialPool({
      forcedConnectionId: "cooling-account",
      excludedConnectionIds: new Set(),
      connections: [conn("cooling-account", future)],
      allowRateLimitedConnections: false,
      bypassQuotaPolicy: false,
      isQuotaExhausted: () => false,
      isQuotaPolicyBlocked: () => false,
    }),
    null
  );
});

test("resolveForcedConnectionForCredentialPool drops forced id when quota exhausted", () => {
  assert.equal(
    resolveForcedConnectionForCredentialPool({
      forcedConnectionId: "exhausted-account",
      excludedConnectionIds: new Set(),
      connections: [conn("exhausted-account")],
      allowRateLimitedConnections: false,
      bypassQuotaPolicy: false,
      isQuotaExhausted: (id) => id === "exhausted-account",
      isQuotaPolicyBlocked: () => false,
    }),
    null
  );
});

test("resolveForcedConnectionForCredentialPool with empty connections only checks exclusion", () => {
  assert.equal(
    resolveForcedConnectionForCredentialPool({
      forcedConnectionId: "pinned-account",
      excludedConnectionIds: new Set(),
      connections: [],
      allowRateLimitedConnections: false,
      bypassQuotaPolicy: false,
      isQuotaExhausted: () => true,
      isQuotaPolicyBlocked: () => true,
    }),
    "pinned-account"
  );
});

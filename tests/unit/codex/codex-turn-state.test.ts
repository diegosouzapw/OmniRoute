import test from "node:test";
import assert from "node:assert/strict";

import {
  __resetCodexTurnStateOriginsForTesting,
  isCrossAccountCodexTurnState,
  noteCodexTurnStateProvenance,
  readCodexTurnStateHeader,
} from "../../../open-sse/config/codexTurnState.ts";
import {
  resolveCodexTurnStateEcho,
  withCodexFingerprintCredentials,
} from "../../../open-sse/config/codexIdentity.ts";
import { buildStreamingResponseHeaders } from "../../../open-sse/handlers/chatCore/responseHeaders.ts";

const TURN_STATE = "ts-blob-0123456789";

function reset() {
  __resetCodexTurnStateOriginsForTesting();
}

test("readCodexTurnStateHeader reads Headers and plain records case-insensitively", () => {
  reset();
  assert.equal(readCodexTurnStateHeader(null), null);
  assert.equal(readCodexTurnStateHeader({}), null);
  assert.equal(readCodexTurnStateHeader({ "x-codex-turn-state": "  " }), null);
  assert.equal(
    readCodexTurnStateHeader(new Headers({ "x-codex-turn-state": TURN_STATE })),
    TURN_STATE
  );
  assert.equal(readCodexTurnStateHeader({ "X-Codex-Turn-State": TURN_STATE }), TURN_STATE);
});

test("provenance: same account passes, cross account is flagged, unknown session passes", () => {
  reset();
  noteCodexTurnStateProvenance("session-1", "conn-a");
  assert.equal(isCrossAccountCodexTurnState("session-1", "conn-a"), false);
  assert.equal(isCrossAccountCodexTurnState("session-1", "conn-b"), true);
  assert.equal(isCrossAccountCodexTurnState("session-unknown", "conn-b"), false);
});

test("provenance: missing session or account does not track", () => {
  reset();
  noteCodexTurnStateProvenance("", "conn-a");
  noteCodexTurnStateProvenance("session-1", "");
  noteCodexTurnStateProvenance(null, "conn-a");
  assert.equal(isCrossAccountCodexTurnState("session-1", "conn-b"), false);
});

test("provenance: expired records stop guarding", () => {
  reset();
  const t0 = 1_000_000;
  noteCodexTurnStateProvenance("session-1", "conn-a", t0);
  assert.equal(isCrossAccountCodexTurnState("session-1", "conn-b", t0 + 1000), true);
  // 2h TTL — after it lapses the record is lazily dropped and the echo passes.
  assert.equal(
    isCrossAccountCodexTurnState("session-1", "conn-b", t0 + 2 * 60 * 60 * 1000 + 1),
    false
  );
});

test("provenance: newest commit wins for a re-minted session blob", () => {
  reset();
  noteCodexTurnStateProvenance("session-1", "conn-a");
  // Failover committed a response from conn-b — the client now holds b's blob.
  noteCodexTurnStateProvenance("session-1", "conn-b");
  assert.equal(isCrossAccountCodexTurnState("session-1", "conn-b"), false);
  assert.equal(isCrossAccountCodexTurnState("session-1", "conn-a"), true);
});

test("resolveCodexTurnStateEcho strips only known cross-account echoes", () => {
  reset();
  const clientHeaders = {
    "session-id": "session-1",
    "x-codex-turn-state": TURN_STATE,
  };
  // No provenance yet → pass through unchanged.
  assert.equal(resolveCodexTurnStateEcho(clientHeaders, "conn-a"), TURN_STATE);

  // Blob minted by conn-a and client now served by conn-a again → pass.
  noteCodexTurnStateProvenance("session-1", "conn-a");
  assert.equal(resolveCodexTurnStateEcho(clientHeaders, "conn-a"), TURN_STATE);

  // Failover to conn-b while the client echoes conn-a's blob → strip.
  assert.equal(resolveCodexTurnStateEcho(clientHeaders, "conn-b"), null);

  // No echo header → nothing to forward.
  assert.equal(resolveCodexTurnStateEcho({ "session-id": "session-1" }, "conn-a"), null);

  // Echo without a session id cannot be provenance-checked → pass through
  // (same as sub2api: no tracking key, keep passthrough behavior).
  assert.equal(
    resolveCodexTurnStateEcho({ "x-codex-turn-state": TURN_STATE }, "conn-b"),
    TURN_STATE
  );
});

test("withCodexFingerprintCredentials stashes the allowed echo independent of mode", () => {
  reset();
  noteCodexTurnStateProvenance("session-1", "conn-a");

  const baseCredentials = {
    accessToken: "oauth-token",
    connectionId: "conn-a",
    providerSpecificData: { codexFingerprintMode: "off" as const },
  };
  const clientHeaders = { "session-id": "session-1", "x-codex-turn-state": TURN_STATE };

  // Same account, explicit off: echo survives alongside original identity passthrough.
  const sameAccount = withCodexFingerprintCredentials(baseCredentials, clientHeaders, {});
  assert.equal(sameAccount.providerSpecificData?.codexTurnStateEcho, TURN_STATE);
  assert.ok(sameAccount.providerSpecificData?.codexOriginalIdentityHeaders);
  assert.equal(sameAccount.providerSpecificData?.codexClientIdentity, undefined);

  // Cross account: echo stripped, original client identity still preserved.
  const crossAccount = withCodexFingerprintCredentials(
    { ...baseCredentials, connectionId: "conn-b" },
    clientHeaders,
    {}
  );
  assert.equal(crossAccount.providerSpecificData?.codexTurnStateEcho, undefined);

  // Compact endpoint: convergence identity is skipped but the echo guard still runs.
  const compact = withCodexFingerprintCredentials(
    { ...baseCredentials, requestEndpointPath: "/responses/compact" },
    clientHeaders,
    {}
  );
  assert.equal(compact.providerSpecificData?.codexClientIdentity, undefined);
  assert.equal(compact.providerSpecificData?.codexTurnStateEcho, TURN_STATE);
});

test("streaming response headers forward x-codex-turn-state outside the byte budget", () => {
  reset();
  const upstream = new Headers();
  upstream.set("x-codex-turn-state", "s".repeat(300));
  // Fill the budget with low-priority noise the blob would otherwise evict into.
  for (let index = 0; index < 12; index += 1) {
    upstream.set(`x-noise-${index}`, "n".repeat(60));
  }
  upstream.set("x-codex-primary-used-percent", "41");

  const out = buildStreamingResponseHeaders(upstream, {}, null);
  const record = out as Record<string, string>;
  assert.equal(record["x-codex-turn-state"], "s".repeat(300));
  assert.equal(record["x-codex-primary-used-percent"], "41");
});

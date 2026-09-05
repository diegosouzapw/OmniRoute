// tests/unit/combo-diag-exhausted-connection-10967.test.ts
// #10967: buildComboDiag (open-sse/services/combo.ts) formats exhaustedConnections
// entries via formatExhaustedConnectionKey (open-sse/services/combo/comboDiagFormat.ts).
// Repro: exhaustedConnections is a Set<string> keyed as `${provider}:${connectionId}`
// (open-sse/services/combo/targetExhaustion.ts — markAuthLevelExhaustion /
// markAgentrouterConnectionQuotaExhaustion / markConnectionLevelExhaustion, all three
// call `sets.exhaustedConnections.add(`${provider}:${connId}`)`).
//
// Before the fix, the diagnostics formatter hardcoded `provider: "unknown"` and did
// `String(c).slice(0, 8)` on the WHOLE key, so a real-world key like
// `jina-ai:3f9a1c2e-...` (7-char provider id + colon = 8 chars) produced
// `{ provider: "unknown", reason: "exhausted_connection:jina-ai:" }` — the UUID
// entirely dropped and the real provider id discarded.
//
// This test imports the REAL exported function used by buildComboDiag's
// `excluded` mapping — not a re-implementation of the truncation logic.

import test from "node:test";
import assert from "node:assert/strict";
import { formatExhaustedConnectionKey } from "../../../open-sse/services/combo/comboDiagFormat.ts";

test("formatExhaustedConnectionKey: real jina-ai UUID key keeps the provider id and truncates only the connection id", () => {
  const key = "jina-ai:3f9a1c2e-8b7d-4e11-9c2a-1a2b3c4d5e6f";
  const { provider, reason } = formatExhaustedConnectionKey(key);

  // The exact #10967 regression: provider must NOT be "unknown" when the key
  // carries a real provider prefix, and the reason must not read as an empty
  // truncated "provider:" artifact.
  assert.equal(provider, "jina-ai");
  assert.notEqual(provider, "unknown");
  assert.doesNotMatch(reason, /exhausted_connection:jina-ai:$/);
  assert.equal(reason, "exhausted_connection:3f9a1c2e");
});

test("formatExhaustedConnectionKey: connection id is truncated to 8 chars, never leaking the full UUID", () => {
  const { reason } = formatExhaustedConnectionKey("openai:aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee");
  assert.equal(reason, "exhausted_connection:aaaaaaaa");
  assert.ok(!reason.includes("bbbb-cccc-dddd"), "must not leak the full connection UUID");
});

test("formatExhaustedConnectionKey: short provider ids (e.g. glm) still resolve correctly", () => {
  const { provider, reason } = formatExhaustedConnectionKey("glm:0123456789abcdef");
  assert.equal(provider, "glm");
  assert.equal(reason, "exhausted_connection:01234567");
});

test("formatExhaustedConnectionKey: falls back to unknown when the key carries no provider prefix", () => {
  const { provider, reason } = formatExhaustedConnectionKey("no-colon-here");
  assert.equal(provider, "unknown");
  assert.equal(reason, "exhausted_connection:no-colon");
});

test("formatExhaustedConnectionKey: builds the same excluded-entry shape buildComboDiag emits", () => {
  // Mirrors the Set-of-keys -> excluded[] mapping that lives inline in
  // buildComboDiag (open-sse/services/combo.ts), proving the exported helper
  // produces exactly the shape the diagnostics payload expects.
  const exhaustedConnections = new Set(["jina-ai:3f9a1c2e-8b7d-4e11-9c2a-1a2b3c4d5e6f"]);
  const excluded = [...exhaustedConnections].map((c) => formatExhaustedConnectionKey(String(c)));
  assert.deepEqual(excluded, [
    { provider: "jina-ai", reason: "exhausted_connection:3f9a1c2e" },
  ]);
});

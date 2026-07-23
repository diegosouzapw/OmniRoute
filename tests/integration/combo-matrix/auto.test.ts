// tests/integration/combo-matrix/auto.test.ts
//
// Integration tests for `model: "auto"` and `model: "auto/<variant>"` routing.
//
// How auto routing works:
//   - model:"auto" → chat.ts detects isAutoRouting → calls createVirtualAutoCombo(undefined)
//     which reads active connections from DB and builds a virtual combo (name="auto", id="auto").
//   - The virtual combo's default routerStrategy is "lkgp".
//   - combo.ts fetches getLKGP(combo.name, combo.id) = getLKGP("auto", "auto") → key "auto:auto".
//   - LKGPStrategy: if a LKGP record exists for that provider AND the provider is in the
//     candidate pool, it pins that provider deterministically (no randomness).
//   - Without a LKGP record, falls back to "rules" 9-factor scorer.
//
// Test 1 strategy: single-request, deterministic.
//   We seed a LKGP record pointing to "openai" via settingsDb.setLKGP("auto","auto","openai").
//   The assertion h.providersSeen()[0] === "openai" is guaranteed by the LKGP pin
//   and will FAIL if the LKGP lookup or the LKGPStrategy routing is broken.
//
// Test 2 strategy: pool-resolution check (not provider-specific).
//   Send model:"auto/coding" → virtual combo for the "coding" variant (MODE_PACKS quality-first).
//   Assert status 200 AND a seeded provider was dispatched.  The pool should resolve from the
//   DB connections; this test fails if the variant is unrecognised (400) or the pool is empty.

import test from "node:test";
import assert from "node:assert/strict";
import { createComboRoutingHarness } from "../_comboRoutingHarness.ts";

const h = await createComboRoutingHarness("combo-auto");
const { BaseExecutor, handleChat, buildRequest, seedConnection, resetStorage, settingsDb } = h;

function body(model: string) {
  return { model, stream: false, messages: [{ role: "user", content: "hello" }] };
}

// No-auth providers (#6557 / #7622) join the auto-combo pool without any seeded
// connection, because their credential is synthetic — see NOAUTH_PROVIDERS in
// src/shared/constants/providers.ts and the candidate build in
// open-sse/services/autoCombo/virtualFactory.ts. That is intended production
// behavior, but it makes these tests non-deterministic: the pool would contain
// providers this file never seeded, and the dispatch could legitimately land on
// one of them instead of the connection under test.
//
// Blocking them via settings.blockedProviders closes the pool to exactly the
// connections each test seeds, which is what these assertions are actually
// about (LKGP pinning and variant pool resolution) — rather than weakening the
// assertions to accept whatever the open pool happens to pick.
const NO_AUTH_PROVIDER_IDS = [
  "opencode",
  "duckduckgo-web",
  "felo-web",
  "theoldllm",
  "chipotle",
  "veoaifree-web",
  "mimocode",
  "auggie",
];

test.beforeEach(async () => {
  BaseExecutor.RETRY_CONFIG.delayMs = 0;
  await resetStorage();
  await settingsDb.updateSettings({ blockedProviders: NO_AUTH_PROVIDER_IDS });
});
test.afterEach(async () => {
  BaseExecutor.RETRY_CONFIG.delayMs = h.originalRetryDelayMs;
  await resetStorage();
});
test.after(async () => {
  await h.cleanup();
});

// ── Test 1: auto picks the LKGP-biased provider ─────────────────────────────
//
// Strategy: single-request, deterministic via LKGP seed.
// The virtual auto-combo for model:"auto" has name="auto" and id="auto".
// getLKGP("auto","auto") reads key "auto:auto" in the key_value table.
// LKGPStrategy pins the seeded provider when it is healthy + in the pool.
// This assertion fails if LKGP lookup, LKGPStrategy, or candidate resolution breaks.
test("auto: LKGP record biases dispatch toward the seeded provider", async () => {
  await seedConnection("openai", { apiKey: "sk-openai-auto" });
  await seedConnection("claude", { apiKey: "sk-claude-auto" });

  // Bias toward openai by writing a LKGP record before the request.
  await settingsDb.setLKGP("auto", "auto", "openai");

  h.installRecordingFetch();
  const r = await handleChat(buildRequest({ body: body("auto") }));
  assert.equal(r.status, 200, `Expected 200, got ${r.status}`);

  const seen = h.providersSeen();
  assert.ok(seen.length > 0, "Expected at least one upstream dispatch");
  assert.equal(
    seen[0],
    "openai",
    `Expected openai to be dispatched first (LKGP-biased), got: ${JSON.stringify(seen)}`
  );
});

// ── Test 2: auto/coding resolves a virtual pool from seeded connections ──────
//
// "auto/coding" is a recognized variant (VALID_AUTO_VARIANTS has "coding").
// createVirtualAutoCombo("coding") applies MODE_PACKS["quality-first"] weights
// and uses the same DB connections as candidates.
// This test fails if:
//   - the variant is not recognized and returns a 400, or
//   - the virtual pool is empty (no candidates resolved from DB connections), or
//   - the dispatched provider is not one of the seeded ones.
test("auto/coding: virtual pool resolves and dispatches a seeded provider", async () => {
  await seedConnection("openai", { apiKey: "sk-openai-coding" });
  await seedConnection("claude", { apiKey: "sk-claude-coding" });

  h.installRecordingFetch();
  const r = await handleChat(buildRequest({ body: body("auto/coding") }));
  assert.equal(r.status, 200, `Expected 200 from auto/coding, got ${r.status}`);

  const seen = h.providersSeen();
  assert.ok(seen.length > 0, "Expected at least one upstream dispatch for auto/coding");

  const seededProviders = new Set(["openai", "claude"]);
  assert.ok(
    seededProviders.has(seen[0]),
    `Expected a seeded provider (openai or claude), got: ${seen[0]} (all: ${JSON.stringify(seen)})`
  );
});

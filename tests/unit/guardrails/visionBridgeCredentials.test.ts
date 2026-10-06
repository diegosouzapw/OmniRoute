/**
 * Vision Bridge credential checks — #10702 regression tests.
 *
 * `hasUsableCredentialsForModel()` gates which vision-capable catalog
 * candidates the bridge may use. Before the fix:
 *
 *   1. The provider prefix was used verbatim against `provider_connections`
 *      (an exact SQL `provider = ?` match), so alias-keyed model ids like
 *      `oc/mimo-v2.5-free` queried `provider = "oc"` — but the row is stored
 *      under the canonical id `opencode` — returning zero rows and excluding
 *      every candidate, which surfaced as
 *      "No vision-capable provider connected, cannot process image request".
 *
 *   2. No-auth providers (`oc`/`opencode`, `ddgw`/`duckduckgo-web`, ...) were
 *      judged by the same "must have a usable stored API key" bar as keyed
 *      providers, even though their effective credential is the synthetic
 *      "noauth" connection (src/sse/services/auth.ts) and they carry no key.
 *
 * This suite exercises the real DB-backed path (createProviderConnection +
 * getProviderConnections) — same pattern as
 * tests/unit/8779-agy-prefix-credential-lookup.test.ts. Isolated DATA_DIR per
 * PII learnings §3: resetDbInstance() + cleanup in test.after so the node:test
 * runner doesn't hang on open handles.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-vb-cred-"));

// Set before any db import so getDbInstance() picks the temp dir.
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../../src/lib/db/core.ts");
const providersDb = await import("../../../src/lib/db/providers.ts");
const { hasUsableCredentialsForModel, hasTerminalConnectionStatus } =
  await import("../../../src/lib/guardrails/visionBridgeCredentials.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

// ── alias → canonical id resolution (#10702) ────────────────────────────────

test("alias-keyed model finds a row stored under the canonical provider id (#10702)", async () => {
  await resetStorage();
  // The connection is stored under the canonical id "command-code".
  await providersDb.createProviderConnection({
    provider: "command-code",
    authType: "apikey",
    apiKey: "cc-real-key",
    isActive: true,
    testStatus: "active",
  });

  // The model id uses the public alias prefix "cmd" — before the fix this
  // queried provider = "cmd", found no row, and returned false.
  const usable = await hasUsableCredentialsForModel("cmd/deepseek-v4-flash");
  assert.equal(usable, true, "alias prefix must resolve to the canonical provider id");
});

test("alias-keyed noauth model is usable with NO stored row (#10702)", async () => {
  await resetStorage();
  // No `provider_connections` row at all — the noauth provider is served by
  // the synthetic "noauth" connection, so it must still be usable.
  const usable = await hasUsableCredentialsForModel("oc/mimo-v2.5-free");
  assert.equal(usable, true, "noauth provider must not require a stored connection row");
});

test("canonical-id noauth model is usable with NO stored row", async () => {
  await resetStorage();
  const usable = await hasUsableCredentialsForModel("opencode/mimo-v2.5-free");
  assert.equal(usable, true);
});

// ── noauth terminal-status blocking ─────────────────────────────────────────

test("noauth provider is NOT usable when a row carries a terminal status", async () => {
  await resetStorage();
  await providersDb.createProviderConnection({
    provider: "opencode",
    authType: "no-auth",
    name: "opencode-account",
    isActive: true,
    testStatus: "banned",
  });
  const usable = await hasUsableCredentialsForModel("oc/mimo-v2.5-free");
  assert.equal(usable, false, "a banned noauth row must block the provider");
});

test("noauth provider with a healthy row is usable", async () => {
  await resetStorage();
  await providersDb.createProviderConnection({
    provider: "opencode",
    authType: "no-auth",
    name: "opencode-account",
    isActive: true,
    testStatus: "active",
  });
  const usable = await hasUsableCredentialsForModel("oc/mimo-v2.5-free");
  assert.equal(usable, true);
});

// ── keyed providers keep the original gate ──────────────────────────────────

test("keyed provider with no active connection is NOT usable", async () => {
  await resetStorage();
  const usable = await hasUsableCredentialsForModel("openai/gpt-4o-mini");
  assert.equal(usable, false, "no openai row seeded → definitively unusable");
});

test("keyed provider with a usable active connection is usable", async () => {
  await resetStorage();
  await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    apiKey: "sk-real-key",
    isActive: true,
    testStatus: "active",
  });
  const usable = await hasUsableCredentialsForModel("openai/gpt-4o-mini");
  assert.equal(usable, true);
});

test("keyed provider with only a banned connection is NOT usable", async () => {
  await resetStorage();
  await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    apiKey: "sk-dead-key",
    isActive: true,
    testStatus: "banned",
  });
  const usable = await hasUsableCredentialsForModel("openai/gpt-4o-mini");
  assert.equal(usable, false);
});

test("non-existent provider returns false (definitive, table readable)", async () => {
  await resetStorage();
  const usable = await hasUsableCredentialsForModel("no-such-provider/model");
  assert.equal(usable, false);
});

// ── helper: hasTerminalConnectionStatus ─────────────────────────────────────

test("hasTerminalConnectionStatus recognizes terminal statuses", () => {
  assert.equal(hasTerminalConnectionStatus({ testStatus: "disabled" }), true);
  assert.equal(hasTerminalConnectionStatus({ testStatus: "banned" }), true);
  assert.equal(hasTerminalConnectionStatus({ testStatus: "expired" }), true);
  assert.equal(hasTerminalConnectionStatus({ testStatus: "active" }), false);
  assert.equal(hasTerminalConnectionStatus({ testStatus: null }), false);
  assert.equal(hasTerminalConnectionStatus({}), false);
});

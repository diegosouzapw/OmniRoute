/**
 * Vision Bridge credential checks — provider-prefix → node-id resolution.
 *
 * Re-land of the lost fix 932002580 (2026-08-19, never merged). A compatible
 * provider node (openai-compatible-chat-<uuid>) is stored in
 * `provider_connections` under its generated node id, while the
 * operator-facing model id uses the node's configured public prefix
 * (e.g. `skhynix/HCP-Vision-Latest`). `hasUsableCredentialsForModel` queried
 * the bare prefix → 0 rows → false → `getBestVisionModel` discarded the
 * configured fixed model and auto-selected a noauth candidate
 * (cloudflare-playground/moonshotai/kimi-k2.7-code) → whole-request reroute
 * to an unreachable executor → 502 on every image-bearing request.
 *
 * This suite lives in its OWN file/process on purpose: the fix caches the
 * prefix index for 60s, and node:test runs each file in its own process —
 * seeding must happen before the first index read in this process, so the
 * integration test must not share a process with tests that warm the cache
 * against an empty node table.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-vb-cred-prefix-"));

// Set before any db import so getDbInstance() picks the temp dir.
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../../src/lib/db/core.ts");
const providersDb = await import("../../../src/lib/db/providers.ts");
const { hasUsableCredentialsForModel, resolveProviderCredentialIds } =
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

// ── resolveProviderCredentialIds (pure prefix→node id resolution) ───────────

test("resolveProviderCredentialIds returns the literal provider when no prefix mapping exists", () => {
  assert.deepEqual(resolveProviderCredentialIds("openai", new Map()), ["openai"]);
});

test("resolveProviderCredentialIds appends the mapped node id for a known prefix", () => {
  const prefixToNode = new Map([["skhynix", "openai-compatible-chat-abc-123"]]);
  assert.deepEqual(resolveProviderCredentialIds("skhynix", prefixToNode), [
    "skhynix",
    "openai-compatible-chat-abc-123",
  ]);
});

test("resolveProviderCredentialIds dedupes when the mapping targets the literal provider", () => {
  const prefixToNode = new Map([["openai", "openai"]]);
  assert.deepEqual(resolveProviderCredentialIds("openai", prefixToNode), ["openai"]);
});

test("resolveProviderCredentialIds tolerates undefined prefix index", () => {
  assert.deepEqual(resolveProviderCredentialIds("skhynix", undefined), ["skhynix"]);
});

// ── integration: node-id-stored connection found through the prefix (#re-land) ──

test("prefix-keyed model finds a row stored under the compatible node id (skhynix reroute regression)", async () => {
  await resetStorage();
  const uniq = `itest-${process.pid}-${Date.now()}`;
  const nodeId = `openai-compatible-chat-${uniq}`;
  const prefix = `skhynix-${uniq}`;
  await providersDb.createProviderNode({
    id: nodeId,
    type: "openai-compatible",
    name: "SK hynix (test)",
    prefix,
    apiType: "chat",
    baseUrl: "http://localhost:1/v1",
  });

  // Phase 1 (negative): only a banned connection under the node id — the
  // prefix must map to the node and the terminal row must still block it.
  await providersDb.createProviderConnection({
    provider: nodeId,
    authType: "apikey",
    apiKey: "sk-dead-key",
    isActive: true,
    testStatus: "banned",
  });
  assert.equal(
    await hasUsableCredentialsForModel(`${prefix}/HCP-Vision-Latest`),
    false,
    "a banned connection under the mapped node id must not count as usable"
  );

  // Phase 2 (positive): an active keyed connection under the node id must be
  // found through the prefix mapping. Before the fix this queried
  // provider = "<prefix>" → 0 rows → false, so the Vision Bridge discarded
  // the operator-configured model and auto-selected another provider.
  await providersDb.createProviderConnection({
    provider: nodeId,
    authType: "apikey",
    apiKey: "sk-hynix-key",
    isActive: true,
    testStatus: "active",
  });
  const usable = await hasUsableCredentialsForModel(`${prefix}/HCP-Vision-Latest`);
  assert.equal(
    usable,
    true,
    "prefix-keyed model must find the connection stored under the node id"
  );
});

/**
 * tests/unit/chat-routing-synced-inventory-11089.test.ts
 *
 * #11089 — Chat routing ignores per-connection model inventory on multi-host
 * local providers.
 *
 * One self-hosted provider (`ollama-local`) with TWO connections pointing at
 * different hosts and DISJOINT synced inventories:
 *
 *   studio (priority 1) → gemma3:4b, flux2-klein:9b
 *   jetson (priority 2) → gemma3:4b
 *
 * `getProviderCredentials` only ever consulted the manual `excludedModels`
 * denylist, never the synced inventory persisted per connection, so a request
 * for `flux2-klein:9b` could land on jetson — a host that never had the model.
 *
 * Cases:
 * 1. Model advertised by only one connection → the other is never selected.
 * 2. Higher-priority host cooling → must NOT preemptively fall to a host that
 *    lacks the model.
 * 3. The advertising connection stays selectable.
 * 4. Model advertised by both → both remain eligible (no over-filtering).
 * 5. Provider with NO synced inventory at all → fail open, selection unchanged.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-chat-synced-11089-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const auth = await import("../../src/sse/services/auth.ts");

const PROVIDER = "ollama-local";

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function createConnection(data: Record<string, unknown>): Promise<string> {
  const created = (await providersDb.createProviderConnection(data)) as { id: string };
  return created.id;
}

/** The connection id the selector handed back, or null if it returned no account. */
function selectedConnectionId(selected: unknown): string | null {
  if (!selected || typeof selected !== "object") return null;
  const id = (selected as { connectionId?: unknown }).connectionId;
  return typeof id === "string" ? id : null;
}

/** Create the two-host ollama-local topology from the issue report. */
async function seedTwoHosts(options: { studioRateLimitedUntil?: string } = {}) {
  const studioId = await createConnection({
    provider: PROVIDER,
    authType: "none",
    name: "Mac Studio",
    baseUrl: "http://studio.lan:11434/v1",
    priority: 1,
    isActive: true,
  });
  const jetsonId = await createConnection({
    provider: PROVIDER,
    authType: "none",
    name: "Jetson",
    baseUrl: "http://jetson.lan:11434/v1",
    priority: 2,
    isActive: true,
  });

  await modelsDb.replaceSyncedAvailableModelsForConnection(PROVIDER, studioId, [
    { id: "gemma3:4b", name: "gemma3:4b" },
    { id: "flux2-klein:9b", name: "flux2-klein:9b" },
  ]);
  await modelsDb.replaceSyncedAvailableModelsForConnection(PROVIDER, jetsonId, [
    { id: "gemma3:4b", name: "gemma3:4b" },
  ]);

  if (options.studioRateLimitedUntil) {
    await providersDb.updateProviderConnection(studioId, {
      rateLimitedUntil: options.studioRateLimitedUntil,
    });
  }

  return { studioId, jetsonId };
}

test("#11089 selects only the host whose synced inventory advertises the model", async () => {
  await resetStorage();
  const { studioId, jetsonId } = await seedTwoHosts();

  // Exclude studio to force the selector to look elsewhere. Jetson does not
  // advertise flux2-klein:9b, so it must NOT be handed back.
  const selected = await auth.getProviderCredentials(PROVIDER, studioId, null, "flux2-klein:9b");

  assert.notEqual(
    selectedConnectionId(selected),
    jetsonId,
    "jetson never synced flux2-klein:9b and must not be selected for it"
  );
});

test("#11089 does not preemptively fail over to a host lacking the model when the owner is cooling", async () => {
  await resetStorage();
  const coolingUntil = new Date(Date.now() + 10 * 60 * 1000).toISOString();
  const { jetsonId } = await seedTwoHosts({ studioRateLimitedUntil: coolingUntil });

  const selected = await auth.getProviderCredentials(PROVIDER, null, null, "flux2-klein:9b");

  assert.notEqual(
    selectedConnectionId(selected),
    jetsonId,
    "a cooling studio must surface a cooldown, not silently route to a host without the model"
  );
});

test("#11089 keeps the connection that does advertise the model selectable", async () => {
  await resetStorage();
  const { studioId } = await seedTwoHosts();

  const selected = await auth.getProviderCredentials(PROVIDER, null, null, "flux2-klein:9b");

  assert.equal(
    selectedConnectionId(selected),
    studioId,
    "studio advertises flux2-klein:9b and must be selected"
  );
});

test("#11089 a model advertised by every host leaves both connections eligible", async () => {
  await resetStorage();
  const { studioId, jetsonId } = await seedTwoHosts();

  const first = await auth.getProviderCredentials(PROVIDER, null, null, "gemma3:4b");
  assert.equal(
    selectedConnectionId(first),
    studioId,
    "fill-first prefers priority 1 for a shared model"
  );

  // Excluding studio (the normal account-fallback path) must still reach jetson,
  // because jetson genuinely advertises gemma3:4b.
  const second = await auth.getProviderCredentials(PROVIDER, studioId, null, "gemma3:4b");
  assert.equal(
    selectedConnectionId(second),
    jetsonId,
    "jetson advertises gemma3:4b and must remain a valid failover"
  );
});

test("#11089 fails open when the provider has no synced inventory at all", async () => {
  await resetStorage();

  const connectionId = await createConnection({
    provider: PROVIDER,
    authType: "none",
    baseUrl: "http://127.0.0.1:11434/v1",
    priority: 1,
    isActive: true,
  });

  // No replaceSyncedAvailableModelsForConnection call: discovery never ran.
  // Routing must behave exactly as before rather than filtering everything out.
  const selected = await auth.getProviderCredentials(PROVIDER, null, null, "never-synced-model");

  assert.equal(
    selectedConnectionId(selected),
    connectionId,
    "an unsynced provider must not be filtered to zero candidates"
  );
});

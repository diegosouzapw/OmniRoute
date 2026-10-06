/**
 * Persistent local Radar overrides and tombstones.
 *
 * These tests exercise the real migration-backed DB module and the production
 * getRadarCatalog() wiring. They deliberately do not inject local merge state.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-radar-local-state-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.RADAR_ENABLED = "true";

const core = await import("../../src/lib/db/core.ts");
const {
  clearRadarLocalModelOverride,
  getRadarLocalMergeState,
  listRadarLocalModelState,
  setRadarLocalModelOverride,
  setRadarModelTombstone,
  setRadarCache,
} = await import("../../src/lib/db/radar.ts");
const { getRadarCatalog } = await import("../../src/lib/radar/index.ts");

async function resetStorage(): Promise<void> {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(resetStorage);

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  delete process.env.DATA_DIR;
  delete process.env.RADAR_ENABLED;
});

test("migration 153 creates the closed local model state schema", () => {
  const db = core.getDbInstance();
  const columns = db.prepare("PRAGMA table_info(radar_local_model_state)").all() as Array<{
    name: string;
  }>;

  assert.deepEqual(
    columns.map((column) => column.name),
    ["provider", "model_id", "display_name", "enabled", "tombstoned", "updated_at"]
  );
});

test("legacy Radar migration 143 is rehomed before the canonical API-key migration runs", () => {
  const db = core.getDbInstance();
  db.prepare("DELETE FROM _omniroute_migrations WHERE version IN ('143', '153')").run();
  db.prepare(
    "INSERT INTO _omniroute_migrations (version, name) VALUES ('143', 'radar_local_model_state')"
  ).run();

  core.resetDbInstance();
  const reopened = core.getDbInstance();
  const rows = reopened
    .prepare("SELECT version, name FROM _omniroute_migrations WHERE version IN ('143', '153')")
    .all() as Array<{ version: string; name: string }>;

  assert.deepEqual(rows, [
    { version: "143", name: "api_key_cache_default_mode" },
    { version: "153", name: "radar_local_model_state" },
  ]);
  assert.equal(
    reopened
      .prepare("SELECT COUNT(*) AS count FROM sqlite_master WHERE type = 'table' AND name = ?")
      .get("radar_local_model_state")?.count,
    1
  );
});

test("local overrides round-trip, merge partial updates, and clear without stale fields", () => {
  assert.equal(
    setRadarLocalModelOverride(" groq ", " llama-3.3-70b-versatile ", {
      displayName: " My Groq model ",
      enabled: false,
    }),
    true
  );

  const initial = listRadarLocalModelState();
  assert.equal(initial.length, 1);
  assert.deepEqual(
    { ...initial[0], updatedAt: undefined },
    {
      provider: "groq",
      modelId: "llama-3.3-70b-versatile",
      displayName: "My Groq model",
      enabled: false,
      tombstoned: false,
      updatedAt: undefined,
    }
  );
  assert.match(initial[0].updatedAt, /^\d{4}-\d{2}-\d{2}/);

  assert.equal(
    setRadarLocalModelOverride("groq", "llama-3.3-70b-versatile", { enabled: true }),
    true
  );
  const updated = listRadarLocalModelState()[0];
  assert.equal(updated.displayName, "My Groq model", "partial updates preserve the other field");
  assert.equal(updated.enabled, true);

  assert.equal(
    setRadarLocalModelOverride("groq", "llama-3.3-70b-versatile", { displayName: null }),
    true
  );
  assert.equal(listRadarLocalModelState()[0].displayName, null, "null explicitly clears a field");

  assert.equal(clearRadarLocalModelOverride("groq", "llama-3.3-70b-versatile"), true);
  assert.deepEqual(listRadarLocalModelState(), [], "an empty non-tombstoned row is deleted");
});

test("tombstones survive override resets and restoring the last field removes the row", () => {
  assert.equal(
    setRadarLocalModelOverride("groq", "llama-3.3-70b-versatile", {
      displayName: "Local name",
    }),
    true
  );
  assert.equal(setRadarModelTombstone("groq", "llama-3.3-70b-versatile", true), true);
  assert.equal(clearRadarLocalModelOverride("groq", "llama-3.3-70b-versatile"), true);

  const hidden = listRadarLocalModelState()[0];
  assert.equal(hidden.tombstoned, true);
  assert.equal(hidden.displayName, null);
  assert.equal(hidden.enabled, null);

  const mergeState = getRadarLocalMergeState();
  assert.deepEqual([...mergeState.localOverrides], []);
  assert.deepEqual([...mergeState.tombstones], ["groq:llama-3.3-70b-versatile"]);

  assert.equal(setRadarModelTombstone("groq", "llama-3.3-70b-versatile", false), true);
  assert.deepEqual(listRadarLocalModelState(), []);
});

test("invalid identities and empty override patches fail closed", () => {
  assert.equal(setRadarLocalModelOverride("", "model", { displayName: "name" }), false);
  assert.equal(setRadarLocalModelOverride("groq", "", { displayName: "name" }), false);
  assert.equal(setRadarLocalModelOverride("groq", "model", {}), false);
  assert.equal(setRadarLocalModelOverride("groq", "model", { displayName: "   " }), false);
  assert.equal(setRadarModelTombstone("bad provider", "model", true), false);
  assert.deepEqual(listRadarLocalModelState(), []);
});

test("production getRadarCatalog loads persisted overrides and tombstones", () => {
  const fixturePath = path.join(process.cwd(), "tests/fixtures/radar-feed-canonical.json");
  const payload = fs.readFileSync(fixturePath, "utf8");
  const fixture = JSON.parse(payload) as {
    version: string;
    tier: string;
    models: Array<{ provider: string; modelId: string; enabled: boolean }>;
  };
  const visible = fixture.models.find((model) => model.enabled);
  const hidden = fixture.models.find(
    (model) =>
      model.enabled &&
      `${model.provider}:${model.modelId}` !== `${visible?.provider}:${visible?.modelId}`
  );
  assert.ok(visible && hidden, "fixture must contain two enabled models");

  setRadarCache({
    version: fixture.version,
    tier: fixture.tier,
    payload,
    signature: "test-signature",
  });
  assert.equal(
    setRadarLocalModelOverride(visible.provider, visible.modelId, {
      displayName: "Persisted local name",
      enabled: false,
    }),
    true
  );
  assert.equal(setRadarModelTombstone(hidden.provider, hidden.modelId, true), true);

  const catalog = getRadarCatalog();
  const overridden = catalog.entries.find(
    (entry) => entry.provider === visible.provider && entry.modelId === visible.modelId
  );
  assert.ok(overridden);
  assert.equal(overridden.displayName, "Persisted local name");
  assert.equal(overridden.enabled, false);
  assert.equal(overridden.origin, "local");
  assert.equal(
    catalog.entries.some(
      (entry) => entry.provider === hidden.provider && entry.modelId === hidden.modelId
    ),
    false,
    "a persisted tombstone must remove the model from the production catalog"
  );
});

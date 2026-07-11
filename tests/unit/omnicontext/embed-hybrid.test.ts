import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omni-omnicontext-embed-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const coreDb = await import("../../../src/lib/db/core.ts");
const {
  invalidateOmniContextSettingsCache,
  saveOmniContextSettings,
  DEFAULT_OMNICONTEXT_SETTINGS,
} = await import("../../../src/lib/omnicontext/settings.ts");
const { embedForOmniContext, embedLocalHash } =
  await import("../../../src/lib/omnicontext/embed.ts");
const { LOCAL_EMBED_MODEL } = await import("../../../src/lib/omnicontext/localEmbed.ts");
const { indexArtifactEmbeddingAsync, retrieveHybridAsync } =
  await import("../../../src/lib/omnicontext/hybridRetrieve.ts");
const { createProject, addProjectMember } =
  await import("../../../src/lib/db/omnicontextProjects.ts");
const { createArtifact } = await import("../../../src/lib/db/omnicontextArtifacts.ts");

test.beforeEach(() => {
  invalidateOmniContextSettingsCache();
  coreDb.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.after(() => {
  coreDb.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

function createTestApiKey(id: string) {
  const db = coreDb.getDbInstance();
  db.prepare(
    "INSERT OR IGNORE INTO api_keys (id, name, key, machine_id, scopes, created_at) VALUES (?, ?, ?, ?, ?, ?)"
  ).run(id, id, `sk-test-${id}`, "test-machine", "[]", new Date().toISOString());
}

test("embedLocalHash is deterministic and tagged local", () => {
  const a = embedLocalHash("hello continuity plane");
  const b = embedLocalHash("hello continuity plane");
  assert.equal(a.model, LOCAL_EMBED_MODEL);
  assert.equal(a.source, "local");
  assert.deepEqual(a.vector, b.vector);
  assert.equal(a.vector.length, 64);
});

test("embedForOmniContext defaults to local hash", async () => {
  const result = await embedForOmniContext("widgets routing");
  assert.equal(result.model, LOCAL_EMBED_MODEL);
  assert.ok(result.source === "local" || result.source === "local-fallback");
});

test("memory-auto falls back to local when Memory has no embed source", async () => {
  await saveOmniContextSettings({ embedSource: "memory-auto" });
  const result = await embedForOmniContext("fallback when memory empty");
  assert.equal(result.model, LOCAL_EMBED_MODEL);
  assert.ok(result.source === "local-fallback" || result.source === "local");
  assert.equal(DEFAULT_OMNICONTEXT_SETTINGS.embedSource, "local");
});

test("async hybrid index+retrieve works with local embedSource", async () => {
  createTestApiKey("k1");
  await saveOmniContextSettings({ hybridRetrieve: true, embedSource: "local" });
  const project = createProject({ name: "P", slug: "p-embed" });
  addProjectMember(project.id, "k1", "member");
  const art = createArtifact({
    projectId: project.id,
    type: "summary",
    title: "Hybrid embed widgets",
    body: "widgets about continuity hybrid retrieve",
    trustTier: "member",
    status: "active",
    createdByApiKeyId: "k1",
  });
  assert.equal(await indexArtifactEmbeddingAsync(art.id), true);
  const hits = await retrieveHybridAsync({
    projectId: project.id,
    query: "widgets continuity",
    viewerApiKeyId: "k1",
  });
  assert.ok(hits.dynamic.some((h) => h.artifact.id === art.id));
});

// Regression guard for #14159 (re-land of #12630, dual-layer semantic cache).
//
// The original PR wired the new vector-similarity layer to the pre-existing
// `semanticCacheEnabled` toggle (default ON), so every installation started
// calling an embedding endpoint (lemonade @ localhost:13305 by default) on every
// temperature=0 request — two extra `fetch()`es per chat call, visible as
// `fetchCalls.length === 3` in tests/unit/chat-combo-live-test.test.ts.
//
// Contract enforced here:
//   1. The manager config is OFF by default (no env, no DB override).
//   2. The DB bridge only enables the manager when BOTH the master toggle and the
//      new `semanticCacheVectorEnabled` opt-in are on.
//   3. A model whose upstream record declares a chat endpoint is never downgraded
//      to embedding/rerank/image by the modality heuristics, and chat models keep
//      the tip's row shape (no `modelType`/`supportedInputTypes` defaults).
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-semcache-optin-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
delete process.env.OMNIROUTE_SEMANTIC_CACHE_ENABLED;

const core = await import("../../src/lib/db/core.ts");
const { DEFAULT_SEMANTIC_CACHE_CONFIG, resolveSemanticCacheConfig } =
  await import("../../open-sse/config/semanticCacheConfig.ts");
const { ensureSemanticCacheDbBridge } =
  await import("../../src/lib/cache/semanticCacheDbBridge.ts");
const { getDatabaseSettings, updateDatabaseSettings } =
  await import("../../src/lib/db/databaseSettings.ts");
const { DEFAULT_DATABASE_SETTINGS } = await import("../../src/types/databaseSettings.ts");
const { detectModelModality, normalizeDiscoveredModels } =
  await import("../../src/lib/providerModels/modelDiscovery.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("dual-layer manager is off by default (no env, no DB override)", () => {
  assert.equal(DEFAULT_SEMANTIC_CACHE_CONFIG.enabled, false);
  assert.equal(DEFAULT_DATABASE_SETTINGS.cache.semanticCacheVectorEnabled, false);
  // Legacy exact-match cache default is untouched (tip contract).
  assert.equal(DEFAULT_DATABASE_SETTINGS.cache.semanticCacheEnabled, true);
});

test("DB bridge enables the vector layer only when master + vector toggles are both on", () => {
  ensureSemanticCacheDbBridge();

  // Fresh install: master on (legacy default), vector opt-in absent → manager off.
  assert.equal(getDatabaseSettings().cache.semanticCacheEnabled, true);
  assert.equal(resolveSemanticCacheConfig().enabled, false);

  updateDatabaseSettings({ cache: { semanticCacheVectorEnabled: true } });
  assert.equal(resolveSemanticCacheConfig().enabled, true);

  // Master off wins even when the vector opt-in is on.
  updateDatabaseSettings({ cache: { semanticCacheEnabled: false } });
  assert.equal(resolveSemanticCacheConfig().enabled, false);
});

test("an explicit chat endpoint vetoes the embedding/rerank/image modality heuristics", () => {
  const modality = detectModelModality(
    { id: "gemini-custom-preview", supportedEndpoints: ["chat", "embeddings"] },
    "gemini"
  );
  assert.equal(modality.isEmbedding, false);
  assert.equal(modality.isRerank, false);
  assert.equal(modality.isImage, false);

  const [chatModel] = normalizeDiscoveredModels(
    [{ id: "gemini-custom-preview", supportedEndpoints: ["chat", "embeddings"] }],
    "gemini"
  );
  assert.equal(chatModel.modelType, undefined, "chat models carry no modelType stamp");
  assert.equal(chatModel.apiFormat, undefined, "chat models carry no synthesized apiFormat");
  assert.equal(
    chatModel.supportedInputTypes,
    undefined,
    "chat models carry no supportedInputTypes default"
  );

  // A pure embedding record still gets its modality metadata.
  const [embeddingModel] = normalizeDiscoveredModels(
    [{ id: "text-embedding-3-small", supportedEndpoints: ["embeddings"] }],
    "openai"
  );
  assert.equal(embeddingModel.modelType, "embedding");
  assert.equal(embeddingModel.apiFormat, "embeddings");
  assert.deepEqual(embeddingModel.supportedInputTypes, ["text"]);
});

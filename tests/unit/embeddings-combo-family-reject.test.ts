import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

// Real DB-backed integration: seed a mixed-dimension embedding combo, then prove
// the service rejects it before any upstream dispatch (no vector-store corruption
// path is reachable). Uses a throwaway DATA_DIR so migrations run against a temp DB.
process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-embed-combo-reject-"));

const { createCombo } = await import("../../src/lib/db/combos.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { createEmbeddingResponse } = await import("../../src/lib/embeddings/service.ts");

test.after(() => {
  // Release the SQLite handle so the native test runner can exit (CLAUDE.md #3).
  resetDbInstance();
});

test("createEmbeddingResponse rejects a mixed-dimension embedding combo without dispatching upstream", async () => {
  await createCombo({
    name: "mixed-embeds-combo",
    strategy: "priority",
    models: [
      "openai/text-embedding-3-small", // 1536
      "nebius/Qwen/Qwen3-Embedding-8B", // 4096
    ],
  });

  const originalFetch = globalThis.fetch;
  let fetchCalls = 0;
  globalThis.fetch = async (...args: Parameters<typeof originalFetch>) => {
    fetchCalls++;
    return originalFetch(...args);
  };

  try {
    const res = await createEmbeddingResponse({
      model: "mixed-embeds-combo",
      input: "hello world",
    });

    assert.equal(res.status, 400);
    const body = JSON.stringify(await res.json());
    assert.match(body, /incompatible vector dimensions/);
    assert.match(body, /1536/);
    assert.match(body, /4096/);
    assert.equal(fetchCalls, 0, "must not dispatch upstream for a mixed-dimension combo");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("createEmbeddingResponse allows a uniform-dimension embedding combo to proceed", async () => {
  await createCombo({
    name: "uniform-embeds-combo",
    strategy: "priority",
    models: [
      "openai/text-embedding-3-small", // 1536
      "openrouter/openai/text-embedding-3-small", // 1536
    ],
  });

  // Uniform combo must NOT be blocked by the family guard — it should pass the
  // guard and attempt real dispatch (which then fails on missing credentials,
  // a 4xx that proves the guard did not short-circuit with the 400 dimension error).
  const res = await createEmbeddingResponse({
    model: "uniform-embeds-combo",
    input: "hello world",
  });
  const body = JSON.stringify(await res.json());
  assert.doesNotMatch(
    body,
    /incompatible vector dimensions/,
    "uniform combo must not trip the dimension guard"
  );
});

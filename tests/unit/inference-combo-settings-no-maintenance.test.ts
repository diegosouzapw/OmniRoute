import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-settings-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../src/lib/db/core.ts");
const { createCombo } = await import("../../src/lib/db/combos.ts");
const { createProviderNode, createProviderConnection } =
  await import("../../src/lib/db/providers.ts");
const { waitForCallLogSaves } = await import("../../src/lib/usage/callLogs.ts");
const { createEmbeddingResponse } = await import("../../src/lib/embeddings/service.ts");
const { handleValidatedRerankRequestBody } = await import("../../src/app/api/v1/rerank/route.ts");
const transcriptions = await import("../../src/app/api/v1/audio/transcriptions/route.ts");
const translations = await import("../../src/app/api/v1/audio/translations/route.ts");
const originalFetch = globalThis.fetch;

test.before(async () => {
  for (const [prefix, apiType] of [
    ["scanembed", "embeddings"],
    ["scanrank", "rerank"],
    ["scanaudio", "audio-transcriptions"],
  ]) {
    await createProviderNode({
      id: `openai-compatible-${prefix}`,
      type: "openai-compatible",
      name: prefix,
      prefix,
      apiType,
      baseUrl: "http://localhost:9000/v1",
    } as Parameters<typeof createProviderNode>[0]);
    await createCombo({
      name: `${prefix}-combo`,
      strategy: "priority",
      models: [{ provider: prefix, model: "test-model" }],
    } as Parameters<typeof createCombo>[0]);
  }
  await createProviderConnection({
    provider: "openai-compatible-scanrank",
    authType: "apikey",
    name: "synthetic rerank",
    apiKey: "synthetic-test-key",
  });
});

test.after(async () => {
  await waitForCallLogSaves(5000);
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function audioRequest(endpoint: string): Request {
  const form = new FormData();
  form.set("model", "scanaudio-combo");
  form.set("file", new Blob([new Uint8Array(64)], { type: "audio/wav" }), "sample.wav");
  return new Request(`http://localhost/v1/audio/${endpoint}`, { method: "POST", body: form });
}

const cases: Array<{ name: string; run: () => Promise<Response>; upstream: string }> = [
  {
    name: "embeddings",
    run: () => createEmbeddingResponse({ model: "scanembed-combo", input: "synthetic input" }),
    upstream: "/embeddings",
  },
  {
    name: "rerank",
    run: () =>
      handleValidatedRerankRequestBody({
        model: "scanrank-combo",
        query: "synthetic query",
        documents: ["synthetic document"],
      }),
    upstream: "/rerank",
  },
  {
    name: "transcriptions",
    run: () => transcriptions.POST(audioRequest("transcriptions")),
    upstream: "/audio/transcriptions",
  },
  {
    name: "translations",
    run: () => translations.POST(audioRequest("translations")),
    upstream: "/audio/translations",
  },
];

for (const example of cases) {
  test(`${example.name} combo dispatch does not collect database diagnostics`, async () => {
    const calls: string[] = [];
    globalThis.fetch = async (input) => {
      const url = String(input);
      calls.push(url);
      assert.ok(url.startsWith("http://localhost:9000/"), "no real upstream requests");
      const result = url.endsWith("/embeddings")
        ? {
            object: "list",
            model: "test-model",
            data: [{ object: "embedding", index: 0, embedding: [0.1, 0.2] }],
            usage: { prompt_tokens: 1, total_tokens: 1 },
          }
        : url.endsWith("/rerank")
          ? { results: [{ index: 0, relevance_score: 0.9 }] }
          : { text: "ok" };
      return Response.json(result);
    };
    const db = core.getDbInstance();
    const originalPrepare = db.prepare;
    const originalPragma = db.pragma;
    const maintenance: string[] = [];
    db.prepare = (sql) => {
      if (/\bdbstat\b|SELECT COUNT\(\*\) as count FROM/i.test(sql)) maintenance.push(sql);
      return originalPrepare.call(db, sql);
    };
    db.pragma = (sql, options) => {
      if (/quick_check|integrity_check/i.test(sql)) maintenance.push(sql);
      return originalPragma.call(db, sql, options);
    };
    try {
      const response = await example.run();
      assert.equal(response.status, 200, await response.text());
      assert.ok(
        calls.some((url) => url.endsWith(example.upstream)),
        "combo target dispatched"
      );
      assert.equal(
        maintenance.length,
        0,
        `unexpected maintenance: ${maintenance.slice(0, 3).join("; ")}`
      );
    } finally {
      db.prepare = originalPrepare;
      db.pragma = originalPragma;
      globalThis.fetch = originalFetch;
    }
  });
}

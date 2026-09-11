import assert from "node:assert/strict";
import test from "node:test";

import { normalizeDiscoveredModels } from "../../src/lib/providerModels/modelDiscovery.ts";
import {
  clearVertexModelMetadataCache,
  enrichVertexModelsWithMetadata,
  parseVertexModelDocsHtml,
  resolveVertexModelDocsUrls,
} from "../../src/lib/providerModels/vertexModelMetadata.ts";

function modelDocsHtml(rows: string): string {
  return `<html><body><table><tbody>${rows}</tbody></table></body></html>`;
}

test.beforeEach(() => clearVertexModelMetadataCache());

test("Vertex docs resolver maps native and MaaS model IDs only to the official docs host", () => {
  assert.deepEqual(resolveVertexModelDocsUrls("gemini-3.7-flash"), [
    "https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-7-flash?hl=en",
  ]);
  assert.deepEqual(resolveVertexModelDocsUrls("claude-opus-4-1"), [
    "https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/partner-models/claude/opus-4-1?hl=en",
  ]);
  assert.deepEqual(resolveVertexModelDocsUrls("xai/grok-4.20-reasoning"), [
    "https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/partner-models/grok/grok-4-20?hl=en",
  ]);
  assert.deepEqual(resolveVertexModelDocsUrls("deepseek-ai/deepseek-v3.2-maas"), [
    "https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/maas/deepseek-ai/deepseek-v3-2-maas?hl=en",
    "https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/maas/deepseek-ai/deepseek-v3-2?hl=en",
  ]);
  assert.ok(
    resolveVertexModelDocsUrls("xai/grok-4.6").every((url) =>
      url.startsWith("https://docs.cloud.google.com/")
    )
  );
});

test("Vertex docs parser extracts distinct context, input, and output limits", () => {
  const gemini = parseVertexModelDocsHtml(
    modelDocsHtml(`
      <tr><th>Model ID</th><td><code>gemini-3.7-flash</code></td></tr>
      <tr><th>Token limits</th><td>Context window</td><td>1,048,576</td></tr>
      <tr><th>Maximum output tokens</th><td>65,536</td></tr>
    `),
    "gemini-3.7-flash"
  );
  assert.deepEqual(gemini, { contextWindow: 1048576, outputTokenLimit: 65536 });

  const claude = parseVertexModelDocsHtml(
    modelDocsHtml(`
      <tr><th>Model ID</th><td>claude-opus-4-1</td></tr>
      <tr><th>Token limits</th><td>
        Maximum input tokens: 200,000 Maximum output tokens: 32,000
      </td></tr>
      <tr><th>Quota limits</th><td>Context length: 200,000</td></tr>
    `),
    "claude-opus-4-1"
  );
  assert.deepEqual(claude, {
    contextWindow: 200000,
    inputTokenLimit: 200000,
    outputTokenLimit: 32000,
  });
});

test("Vertex docs parser rejects a page without the exact live model ID", () => {
  const html = modelDocsHtml(`
    <tr><th>Model ID</th><td>gemini-3.7-flash-lite</td></tr>
    <tr><th>Token limits</th><td>Context window</td><td>1,048,576</td></tr>
  `);
  assert.equal(parseVertexModelDocsHtml(html, "gemini-3.7-flash"), null);
});

test("Vertex enrichment deduplicates shared docs fetches and preserves structured API limits", async () => {
  const html = modelDocsHtml(`
    <tr><th>Model ID</th><td>grok-4.20-reasoning</td></tr>
    <tr><th>Model ID</th><td>grok-4.20-non-reasoning</td></tr>
    <tr><th>Quota limits</th><td>Context length: 2,000,000</td></tr>
    <tr><th>Maximum output tokens</th><td>80,000</td></tr>
  `);
  let fetchCalls = 0;
  const models = await enrichVertexModelsWithMetadata({
    models: [
      { id: "xai/grok-4.20-reasoning", name: "Reasoning", outputTokenLimit: 12345 },
      { id: "xai/grok-4.20-non-reasoning", name: "Non-Reasoning" },
    ],
    now: new Date("2026-09-04T12:00:00.000Z"),
    fetchImpl: async () => {
      fetchCalls += 1;
      return new Response(html, {
        status: 200,
        headers: { "Last-Modified": "Thu, 03 Sep 2026 10:00:00 GMT" },
      });
    },
  });

  assert.equal(fetchCalls, 1);
  assert.equal(models[0]?.contextWindow, 2000000);
  assert.equal(models[0]?.outputTokenLimit, 12345);
  assert.equal(models[1]?.outputTokenLimit, 80000);
  assert.deepEqual(models[1]?.metadataProvenance?.vertexDocs.fields, [
    "contextWindow",
    "outputTokenLimit",
  ]);
  assert.equal(
    models[1]?.metadataProvenance?.vertexDocs.sourceUrl,
    "https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/partner-models/grok/grok-4-20?hl=en"
  );
});

test("Vertex enrichment reuses only recently verified persisted metadata on docs failure", async () => {
  const staleModel = {
    id: "gemini-3.7-flash",
    contextWindow: 1048576,
    outputTokenLimit: 65536,
    metadataProvenance: {
      vertexDocs: {
        source: "google-cloud-docs" as const,
        sourceUrl:
          "https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-7-flash?hl=en",
        fetchedAt: "2026-09-01T12:00:00.000Z",
        parserVersion: "vertex-docs-v1" as const,
        confidence: "verified" as const,
        fields: ["contextWindow", "outputTokenLimit"] as const,
      },
    },
  };
  const [withinTtl] = await enrichVertexModelsWithMetadata({
    models: [{ id: staleModel.id }],
    staleModels: [staleModel],
    now: new Date("2026-09-04T12:00:00.000Z"),
    fetchImpl: async () => new Response("unavailable", { status: 503 }),
  });
  assert.equal(withinTtl?.contextWindow, 1048576);
  assert.equal(withinTtl?.outputTokenLimit, 65536);

  clearVertexModelMetadataCache();
  const [expired] = await enrichVertexModelsWithMetadata({
    models: [{ id: staleModel.id }],
    staleModels: [staleModel],
    now: new Date("2026-09-10T12:00:00.001Z"),
    fetchImpl: async () => new Response("unavailable", { status: 503 }),
  });
  assert.equal(expired?.contextWindow, undefined);
  assert.equal(expired?.outputTokenLimit, undefined);
});

test("Vertex normalization persists context separately while legacy providers retain compatibility", () => {
  const metadata = {
    id: "gemini-3.7-flash",
    contextWindow: 1048576,
    outputTokenLimit: 65536,
  };
  assert.deepEqual(normalizeDiscoveredModels([metadata], "vertex"), [
    {
      id: "gemini-3.7-flash",
      name: "gemini-3.7-flash",
      source: "imported",
      contextWindow: 1048576,
      outputTokenLimit: 65536,
    },
  ]);
  assert.equal(normalizeDiscoveredModels([metadata], "openrouter")[0]?.inputTokenLimit, 1048576);
});

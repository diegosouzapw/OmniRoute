/**
 * #13070 -- the dashboard's per-model health test ignored a provider node's
 * `apiType: "responses"`.
 *
 * `detectTestKind` mapped a node's apiType to audio, rerank and embeddings only,
 * so every text model on a Responses node fell through to the chat branch and
 * `buildInternalChatRequest` posted a Chat Completions body to
 * /v1/chat/completions. A Responses-native upstream can answer 200 to that and
 * still carry nothing a Chat Completions reader recognises, so the model went
 * red with "Provider returned HTTP 200 but no text content" while the same
 * model answered normally through /v1/responses.
 *
 * The classification tests below are cheap, but on their own they prove
 * nothing: reverting the dispatch in runSingleModelTest and leaving
 * detectTestKind alone keeps them all green. The last test is the one that
 * fails in that case -- it reads the body that actually leaves for the
 * upstream and asserts it is Responses-shaped.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-13070-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const nodesDb = await import("../../src/lib/db/providers/nodes.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const runner = await import("../../src/lib/api/modelTestRunner.ts");

const NODE_ID = "openai-compatible-responses-13070-0000-4000-8000-000000000000";
const MODEL_ID = "opaque-text-model";

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

// ---------------------------------------------------------------------------
// detectTestKind — a Responses node must be recognised, and must not steal the
// endpoints that were already right for it.
// ---------------------------------------------------------------------------

test("detectTestKind reports a Responses node, whichever field carries the signal", () => {
  // An imported model has no per-model metadata at all; the node's apiType is
  // the only signal available, which is exactly the reported case.
  assert.equal(runner.detectTestKind("vendor/opaque-guid", null, "responses").isResponses, true);
  assert.equal(
    runner.detectTestKind("vendor/opaque-guid", { apiFormat: "responses" }).isResponses,
    true
  );
  assert.equal(
    runner.detectTestKind("vendor/opaque-guid", { supportedEndpoints: ["responses"] }).isResponses,
    true
  );
});

test("detectTestKind leaves an ordinary chat model alone", () => {
  const kind = runner.detectTestKind("openai/gpt-4o", null);
  assert.equal(kind.isResponses, false);
  assert.equal(kind.isRerank, false);
  assert.equal(kind.isEmbedding, false);
  assert.equal(kind.isAudioTranscription, false);
});

test("embeddings, rerank and audio still win over a Responses node type", () => {
  // A Responses-typed node can host these too, and /v1/responses is the wrong
  // endpoint for all three. Losing this ordering would break working setups
  // rather than fix a broken one.
  assert.equal(
    runner.detectTestKind("baai/bge-m3", null, "responses").isEmbedding,
    true,
    "embedding id must still route to embeddings"
  );
  assert.equal(runner.detectTestKind("baai/bge-m3", null, "responses").isResponses, false);

  assert.equal(runner.detectTestKind("jina/jina-reranker-v2", null, "responses").isRerank, true);
  assert.equal(
    runner.detectTestKind("jina/jina-reranker-v2", null, "responses").isResponses,
    false
  );

  const audio = runner.detectTestKind(
    "vendor/whisper",
    { apiFormat: "audio-transcriptions" },
    "responses"
  );
  assert.equal(audio.isAudioTranscription, true);
  assert.equal(audio.isResponses, false);
});

// ---------------------------------------------------------------------------
// buildInternalResponsesRequest — the endpoint, and the bypass headers the
// other builders carry. A health check that lost X-Internal-Test would be
// rejected by strict mode instead of testing anything.
// ---------------------------------------------------------------------------

test("buildInternalResponsesRequest targets /v1/responses with the health-check headers", async () => {
  const controller = new AbortController();
  const req = runner.buildInternalResponsesRequest(
    { model: "vendor/opaque", input: "hi" },
    controller.signal,
    "conn-1"
  );

  assert.equal(new URL(req.url).pathname, "/v1/responses");
  assert.equal(req.method, "POST");
  assert.equal(req.headers.get("X-Internal-Test"), "combo-health-check");
  assert.equal(req.headers.get("X-OmniRoute-No-Cache"), "true");
  assert.equal(req.headers.get("X-OmniRoute-Compression"), "off");
  assert.equal(req.headers.get("X-OmniRoute-Connection"), "conn-1");
  assert.deepEqual(await req.json(), { model: "vendor/opaque", input: "hi" });
});

test("buildInternalResponsesRequest omits the connection header when there is no connection", () => {
  const req = runner.buildInternalResponsesRequest({ model: "m" }, new AbortController().signal);
  assert.equal(req.headers.get("X-OmniRoute-Connection"), null);
});

// ---------------------------------------------------------------------------
// The wiring. Everything above passes against the unfixed runner as long as
// detectTestKind alone is changed; this one does not.
// ---------------------------------------------------------------------------

test("a model on a Responses node is tested with a Responses body, not a chat one", async () => {
  await nodesDb.createProviderNode({
    id: NODE_ID,
    type: "openai-compatible",
    name: "Responses Node 13070",
    prefix: "resp13070",
    apiType: "responses",
    baseUrl: "https://example.test/v1",
  });
  const connection = await providersDb.createProviderConnection({
    provider: NODE_ID,
    authType: "apikey",
    name: "responses-node-13070",
    apiKey: "sk-responses-node-13070",
    isActive: true,
    testStatus: "active",
  });

  const originalFetch = globalThis.fetch;
  let upstreamUrl = "";
  let upstreamBody: Record<string, unknown> = {};

  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    upstreamUrl =
      typeof input === "string"
        ? input
        : input instanceof URL
          ? input.href
          : (input as Request).url;
    try {
      upstreamBody = JSON.parse(String(init?.body ?? "{}"));
    } catch {
      upstreamBody = {};
    }
    // A minimal Responses reply. `output_text` is the field the existing
    // extractor already understands, which is why this fix needs no reader
    // change -- only the request side was wrong.
    return new Response(JSON.stringify({ output_text: "4" }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  }) as typeof globalThis.fetch;

  try {
    await runner.runSingleModelTest({
      providerId: NODE_ID,
      modelId: MODEL_ID,
      connectionId: String(connection.id),
      timeoutMs: 15_000,
    });
  } catch {
    // The assertions below are about what was sent, not about whether the
    // whole pipeline completed in this environment.
  } finally {
    globalThis.fetch = originalFetch;
  }

  assert.ok(upstreamUrl, "the model test should have reached an upstream request");
  assert.ok(
    !upstreamUrl.includes("/chat/completions"),
    `a Responses node must not be probed on chat completions (got ${upstreamUrl})`
  );
  assert.ok(
    "input" in upstreamBody,
    `a Responses test body carries input (got keys: ${Object.keys(upstreamBody).join(", ")})`
  );
  assert.ok(
    !("messages" in upstreamBody),
    "a Responses test body must not carry Chat Completions messages"
  );
  assert.equal(
    upstreamBody.stream,
    false,
    "the Responses probe is non-streaming: the reader cannot parse Responses stream events"
  );
});

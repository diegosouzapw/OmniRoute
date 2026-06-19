import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Isolated DATA_DIR before any module that may open the SQLite singleton.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-media-cost-h-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "media-cost-h-test-api-key-secret";

const core = await import("../../src/lib/db/core.ts");
const { OMNIROUTE_RESPONSE_HEADERS } = await import("../../src/shared/constants/headers.ts");
const rerankHandler = await import("../../open-sse/handlers/rerank.ts");
const moderationHandler = await import("../../open-sse/handlers/moderations.ts");
const speechRoute = await import("../../src/app/api/v1/audio/speech/route.ts");
const transcriptionRoute = await import("../../src/app/api/v1/audio/transcriptions/route.ts");

const originalFetch = globalThis.fetch;

function restoreGlobals() {
  globalThis.fetch = originalFetch;
}

test.afterEach(() => {
  restoreGlobals();
});

test.after(() => {
  restoreGlobals();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

// Shared assertions: every successful media Response must carry the
// X-OmniRoute-* cost telemetry headers (parity with chat/embeddings).
// Cost may legitimately be 0 (free / unpriced modality) — formatOmniRouteCost
// still emits a fixed-10-decimal string ("0.0000000000"), so the format check
// holds regardless.
function assertCostTelemetryHeaders(response: Response) {
  assert.equal(response.status, 200);

  const cost = response.headers.get(OMNIROUTE_RESPONSE_HEADERS.responseCost);
  assert.ok(cost, "response cost header must be present");
  assert.match(
    cost as string,
    /^\d+\.\d{10}$/,
    `cost header must be a fixed-10-decimal number, got: ${cost}`
  );

  const version = response.headers.get(OMNIROUTE_RESPONSE_HEADERS.version);
  assert.ok(version && version.trim().length > 0, "version header must be non-empty");

  const provider = response.headers.get(OMNIROUTE_RESPONSE_HEADERS.provider);
  assert.ok(provider && provider.trim().length > 0, "provider header must be present");
}

test("rerank handler success Response carries cost telemetry headers", async () => {
  globalThis.fetch = (async (url: unknown) => {
    const stringUrl = String(url);
    if (stringUrl === "https://api.cohere.com/v2/rerank") {
      return new Response(
        JSON.stringify({
          id: "rerank-1",
          results: [
            { index: 0, relevance_score: 0.9 },
            { index: 1, relevance_score: 0.1 },
          ],
          meta: { api_version: { version: "2" }, billed_units: { search_units: 1 } },
        }),
        { status: 200, headers: { "content-type": "application/json" } }
      );
    }
    throw new Error(`Unexpected URL: ${stringUrl}`);
  }) as typeof fetch;

  const response = (await rerankHandler.handleRerank({
    model: "cohere/rerank-v3.5",
    query: "telemetry rerank",
    documents: ["doc a", "doc b"],
    credentials: { apiKey: "test-key" },
  })) as Response;

  assertCostTelemetryHeaders(response);
  assert.equal(
    response.headers.get(OMNIROUTE_RESPONSE_HEADERS.provider),
    "cohere",
    "provider header must reflect the resolved rerank provider"
  );
  const body = (await response.json()) as { results?: unknown[] };
  assert.ok(Array.isArray(body.results) && body.results.length === 2, "should return rerank results");
});

test("moderation handler success Response carries cost telemetry headers (cost 0)", async () => {
  globalThis.fetch = (async (url: unknown) => {
    const stringUrl = String(url);
    if (stringUrl === "https://api.openai.com/v1/moderations") {
      return new Response(
        JSON.stringify({
          id: "modr-1",
          model: "omni-moderation-latest",
          results: [{ flagged: false }],
        }),
        { status: 200, headers: { "content-type": "application/json" } }
      );
    }
    throw new Error(`Unexpected URL: ${stringUrl}`);
  }) as typeof fetch;

  const response = (await moderationHandler.handleModeration({
    body: { model: "omni-moderation-latest", input: "telemetry moderation" },
    credentials: { apiKey: "test-key" },
  })) as Response;

  assertCostTelemetryHeaders(response);
  assert.equal(
    response.headers.get(OMNIROUTE_RESPONSE_HEADERS.responseCost),
    "0.0000000000",
    "moderation is free → cost must be exactly 0"
  );
});

test("v1 audio speech success Response carries cost telemetry headers", async () => {
  globalThis.fetch = (async (url: unknown) => {
    const stringUrl = String(url);
    if (stringUrl === "http://localhost:8000/v1/audio/speech") {
      return new Response(new Uint8Array([1, 2, 3, 4]), {
        status: 200,
        headers: { "content-type": "audio/mpeg" },
      });
    }
    throw new Error(`Unexpected URL: ${stringUrl}`);
  }) as typeof fetch;

  const response = await speechRoute.POST(
    new Request("http://localhost/api/v1/audio/speech", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "qwen/qwen3-tts",
        input: "telemetry speech text",
      }),
    }),
    {}
  );

  assertCostTelemetryHeaders(response);
  assert.equal(
    response.headers.get("Content-Type"),
    "audio/mpeg",
    "audio Content-Type must be preserved"
  );
});

test("v1 audio transcription success Response carries cost telemetry headers (cost 0)", async () => {
  globalThis.fetch = (async (url: unknown) => {
    const stringUrl = String(url);
    if (stringUrl === "http://localhost:8000/v1/audio/transcriptions") {
      return new Response(JSON.stringify({ text: "transcribed telemetry" }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }
    throw new Error(`Unexpected URL: ${stringUrl}`);
  }) as typeof fetch;

  const formData = new FormData();
  formData.set("model", "qwen/qwen3-asr");
  formData.set("file", new Blob([new Uint8Array([1, 2, 3])], { type: "audio/wav" }), "clip.wav");

  const response = await transcriptionRoute.POST(
    new Request("http://localhost/api/v1/audio/transcriptions", {
      method: "POST",
      body: formData,
    })
  );

  assertCostTelemetryHeaders(response);
  assert.equal(
    response.headers.get(OMNIROUTE_RESPONSE_HEADERS.responseCost),
    "0.0000000000",
    "transcription duration unavailable → cost must be 0"
  );
});

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { useDecollidedMigrationsDir } from "./helpers/decollidedMigrationsDir.ts";

useDecollidedMigrationsDir();
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-call-log-bodies-first-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { writeCallArtifact, readCallArtifact, isSizeLimitOmissionMarker } = await import(
  "../../src/lib/usage/callLogArtifacts.ts"
);

const OMITTED = "[omitted: call log artifact size limit exceeded]";
const PIPELINE_MARKER = {
  error: {
    _omniroute_truncated: true,
    reason: "call_log_artifact_size_limit_exceeded",
  },
};

// Pin the budget env for determinism (save/restore idiom per
// call-log-cap.test.ts:32/43-51); never hardcode bytes near 512 KB.
const ORIGINAL_PIPELINE_MAX = process.env.CALL_LOG_PIPELINE_MAX_SIZE_KB;
test.beforeEach(() => {
  process.env.CALL_LOG_PIPELINE_MAX_SIZE_KB = "512";
});
test.afterEach(() => {
  if (ORIGINAL_PIPELINE_MAX === undefined) delete process.env.CALL_LOG_PIPELINE_MAX_SIZE_KB;
  else process.env.CALL_LOG_PIPELINE_MAX_SIZE_KB = ORIGINAL_PIPELINE_MAX;
});

function artifact(overrides: Record<string, unknown> = {}) {
  return {
    schemaVersion: 5 as const,
    summary: {
      id: `bodies-first-${Math.random().toString(16).slice(2)}`,
      timestamp: new Date().toISOString(),
      method: "POST",
      path: "/v1/messages",
      status: 200,
      model: "openai/gpt-4.1",
      requestedModel: null,
    },
    error: null,
    ...overrides,
  } as never;
}

function roundTrip(input: ReturnType<typeof artifact>) {
  const relativePath = `bodies-first/${(input as { summary: { id: string } }).summary.id}.json`;
  assert.ok(writeCallArtifact(input, relativePath), "artifact should be written");
  const { artifact: stored, state } = readCallArtifact(relativePath);
  assert.equal(state, "ready");
  assert.ok(stored, "artifact should be readable");
  return stored as unknown as Record<string, unknown>;
}

test("artifact bodies-first eviction", async (t) => {
  await t.test("body overflow keeps pipeline.providerResponse", async () => {
    // Fixture mirrors the observed shape (not a 900KB/tiny toy alone):
    // requestBody O(200KB) next to a pipeline sized so the TOTAL just
    // exceeds the cap. The bodies are what tripped the cap, so they go
    // first and the pipeline survives.
    const providerResponse = {
      status: 200,
      body: { data: "p".repeat(330 * 1024) },
    };
    const stored = roundTrip(
      artifact({
        requestBody: "r".repeat(200 * 1024),
        responseBody: { output: "response" },
        pipeline: {
          providerRequest: { url: "https://provider.example/v1/messages", method: "POST" },
          providerResponse,
        },
      })
    );

    assert.equal(stored.requestBody, OMITTED);
    assert.equal(stored.responseBody, OMITTED);
    // camelCase per requestLogger.ts:19.
    assert.deepEqual(
      (stored.pipeline as Record<string, unknown>).providerResponse,
      providerResponse
    );
  });

  await t.test("pipeline-only overflow keeps current behavior", async () => {
    // Small bodies, huge pipeline: the pipeline is what tripped the cap,
    // so it is replaced by the marker while the bodies are kept verbatim
    // (same contract as call-log-cap.test.ts:597).
    const requestBody = { payload: "request" };
    const responseBody = { output: "response" };
    const stored = roundTrip(
      artifact({
        requestBody,
        responseBody,
        pipeline: {
          providerRequest: { body: "x".repeat(300 * 1024) },
          providerResponse: { body: "y".repeat(300 * 1024) },
        },
      })
    );

    assert.deepEqual(stored.requestBody, requestBody);
    assert.deepEqual(stored.responseBody, responseBody);
    assert.deepEqual(stored.pipeline, PIPELINE_MARKER);
  });

  await t.test("both-large falls through to current minimal", async () => {
    // Body AND pipeline each over budget: omitting the bodies alone still
    // leaves the pipeline over budget, so the stored form is bodies
    // omitted plus the pipeline marker.
    const stored = roundTrip(
      artifact({
        requestBody: "r".repeat(600 * 1024),
        responseBody: { output: "response" },
        pipeline: {
          providerRequest: { body: "x".repeat(600 * 1024) },
          providerResponse: { body: "y".repeat(600 * 1024) },
        },
      })
    );

    assert.equal(stored.requestBody, OMITTED);
    assert.equal(stored.responseBody, OMITTED);
    assert.deepEqual(stored.pipeline, PIPELINE_MARKER);
  });
  await t.test("no pipeline: the stage is skipped, storage is unchanged", async () => {
    // Without a pipeline there is nothing for the new stage to save, and its
    // output would be byte-identical to the minimal stage below it -- it must
    // not fire at all, so an artifact that never had a pipeline keeps exactly
    // the shape it had before this change.
    const stored = roundTrip(
      artifact({
        requestBody: "r".repeat(600 * 1024),
        responseBody: { output: "response" },
        error: { message: "upstream 500" },
      })
    );

    assert.equal(stored.requestBody, OMITTED);
    assert.equal(stored.responseBody, OMITTED);
    assert.deepEqual(stored.error, { message: "upstream 500" });
    assert.equal(stored.pipeline, undefined);
  });

  await t.test("an omitted body is detectable by consumers, not just truthy", async () => {
    // maybeEnrichCompletedDetail (usage/completedRequestDetails.ts) falls back
    // from pipeline.providerResponse to responseBody. The marker is a
    // non-empty string, so a truthiness check "recovers" it and overwrites the
    // pipeline payload this change exists to keep; the shared predicate is the
    // contract that stops it.
    const stored = roundTrip(
      artifact({
        requestBody: "r".repeat(200 * 1024),
        responseBody: { output: "response" },
        pipeline: { providerResponse: { status: 200, body: { data: "p".repeat(330 * 1024) } } },
      })
    );

    assert.ok(stored.responseBody, "the marker is truthy -- that is the trap");
    assert.equal(isSizeLimitOmissionMarker(stored.responseBody), true);
    assert.equal(isSizeLimitOmissionMarker(stored.requestBody), true);
    assert.equal(isSizeLimitOmissionMarker({ output: "response" }), false);
    assert.equal(isSizeLimitOmissionMarker(null), false);
  });
});

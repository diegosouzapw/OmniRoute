import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";

const ROOT = path.resolve(import.meta.dirname, "../../..");
const read = (p) => readFileSync(path.join(ROOT, p), "utf8");
const LEAF = "open-sse/handlers/chatCore/streamingResponse.ts";
const BARREL = "open-sse/handlers/chatCore.ts";

test("the streaming path lives in its own leaf", () => {
  const leaf = read(LEAF);
  assert.match(leaf, /export async function runStreamingResponse\(/);
  assert.doesNotMatch(read(BARREL), /const pipelineOutcome = await runProviderExecutionPipeline/);
});

test("the barrel calls the leaf and writes the carried state back", () => {
  const barrel = read(BARREL);
  assert.match(barrel, /runStreamingResponse\(/);
  for (const name of ["translatedBody", "currentModel", "providerUrl", "pipelineRecovered"]) {
    assert.match(barrel, new RegExp("carry\\." + name + "\\b"));
  }
});

test("the barrel imports the leaf (no-undef is disabled for TS, so assert it)", () => {
  const barrel = read(BARREL);
  assert.match(barrel, /import \{\s*runStreamingResponse,?\s*\} from "\.\/chatCore\/streamingResponse\.ts";/);
});

test("message stays block-local (declared inside providerFailure, never carried)", () => {
  const leaf = read(LEAF);
  const barrel = read(BARREL);
  assert.doesNotMatch(leaf, /finalBody, message, pipelineRecovered/);
  assert.doesNotMatch(barrel, /message = streamingOutcome\.carry\.message/);
});

test("streaming cost accounting stays out of the response leaf", () => {
  // It lives in the streaming tail (see streaming-tail.test.ts); the response
  // leaf only executes the provider call and must not touch the ledger.
  const leaf = read(LEAF);
  assert.doesNotMatch(leaf, /recordStreamingCost\(/);
});

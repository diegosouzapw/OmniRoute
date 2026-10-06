import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";

const ROOT = path.resolve(import.meta.dirname, "../../..");
const read = (p) => readFileSync(path.join(ROOT, p), "utf8");
const LEAF = "open-sse/handlers/chatCore/streamingTail.ts";
const BARREL = "open-sse/handlers/chatCore.ts";

test("the streaming tail lives in its own leaf", () => {
  const leaf = read(LEAF);
  assert.match(leaf, /export async function runStreamingTail\(/);
  assert.doesNotMatch(read(BARREL), /const onStreamComplete = \(\{/);
});

test("the barrel calls the leaf and writes the carried state back", () => {
  const barrel = read(BARREL);
  assert.match(barrel, /runStreamingTail\(/);
  for (const name of [
    "onPipelineStreamError",
    "onClientDisconnectFinalize",
    "turnExecutionHandedOffToStream",
  ]) {
    assert.match(barrel, new RegExp("carry\\." + name + "\\b"));
  }
});

test("the barrel imports the leaf (no-undef is disabled for TS, so assert it)", () => {
  const barrel = read(BARREL);
  assert.match(
    barrel,
    /import \{\s*runStreamingTail,?\s*\} from "\.\/chatCore\/streamingTail\.ts";/
  );
});

test("streaming cost accounting lives in the tail leaf, not the barrel", () => {
  const leaf = read(LEAF);
  assert.match(leaf, /recordStreamingCost\(/);
  assert.match(leaf, /buildStreamLedgerDetails\(/);
  const barrel = read(BARREL);
  assert.doesNotMatch(barrel, /recordStreamingCost\(/);
});

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");
const BARREL = path.join(ROOT, "open-sse/handlers/chatCore.ts");
const LEAF = path.join(ROOT, "open-sse/handlers/chatCore/executeProviderRequest.ts");

function read(file: string): string {
  return fs.readFileSync(file, "utf8");
}

test("executeProviderRequest lives in its own leaf", () => {
  assert.equal(fs.existsSync(LEAF), true);
  const leaf = read(LEAF);
  assert.match(leaf, /export async function executeProviderRequest\(/);
  assert.equal(
    /const executeProviderRequest = async/.test(read(BARREL)),
    false
  );
});

test("the leaf keeps the tip send shape", () => {
  const leaf = read(LEAF);
  assert.match(leaf, /prepareUpstreamBody\(/);
  assert.match(leaf, /injectSystemPromptPostTranslation\(/);
  assert.equal(
    leaf.includes("isClaudePassthrough"),
    false,
    "tip executor.execute does not take isClaudePassthrough"
  );
});

test("handleChatCore calls the leaf and still records the cost ledger", () => {
  const barrel = read(BARREL);
  assert.match(barrel, /executeProviderRequestLeaf\(executeProviderRequestDeps/);
  const nonStreaming = read(path.join(ROOT, "open-sse/handlers/chatCore/nonStreamingResponse.ts"));
  assert.match(nonStreaming, /recordChatCallCost\(/);
  const tail = read(path.join(ROOT, "open-sse/handlers/chatCore/streamingTail.ts"));
  assert.match(tail, /buildStreamLedgerDetails\(/);
  assert.match(nonStreaming, /buildCostCtx\(/);
});

test("syncExecuteTranslatedBody seam keeps executeProviderRequestDeps synchronized across rebindings", () => {
  const barrel = read(BARREL);
  assert.match(
    barrel,
    /const syncExecuteTranslatedBody = \(next: unknown\) => \{[\s\S]*?executeProviderRequestDeps\.translatedBody = next as Record<string, unknown>;/,
    "chatCore must define syncExecuteTranslatedBody and update executeProviderRequestDeps.translatedBody"
  );

  // Functional simulation of the closure / deps reference seam:
  const executeProviderRequestDeps: Record<string, unknown> = {
    translatedBody: { model: "base-model", messages: [] },
  };
  const syncExecuteTranslatedBody = (next: unknown) => {
    executeProviderRequestDeps.translatedBody = next as Record<string, unknown>;
  };
  const simulateDispatch = (deps: typeof executeProviderRequestDeps) => {
    return deps.translatedBody;
  };

  assert.deepEqual(simulateDispatch(executeProviderRequestDeps), {
    model: "base-model",
    messages: [],
  });

  // Rebind via syncExecuteTranslatedBody (e.g. tool follow-up or pipeline wire update):
  const reboundBody = { model: "base-model", messages: [{ role: "assistant", content: "followup" }] };
  syncExecuteTranslatedBody(reboundBody);

  assert.strictEqual(
    simulateDispatch(executeProviderRequestDeps),
    reboundBody,
    "subsequent dispatches must observe the rebound translatedBody reference"
  );

  // Verify that the seam is wired into both streaming and non-streaming response leaves:
  assert.match(
    barrel,
    /runNonStreamingResponse\(\{[\s\S]*?syncExecuteTranslatedBody,/,
    "runNonStreamingResponse must receive syncExecuteTranslatedBody"
  );
  assert.match(
    barrel,
    /runStreamingResponse\(\{[\s\S]*?syncExecuteTranslatedBody,/,
    "runStreamingResponse must receive syncExecuteTranslatedBody"
  );

  // Invariant: every reassignment of translatedBody in the leaves must immediately sync back
  const nonStreaming = read(path.join(ROOT, "open-sse/handlers/chatCore/nonStreamingResponse.ts"));
  const streaming = read(path.join(ROOT, "open-sse/handlers/chatCore/streamingResponse.ts"));

  const nonStreamingSyncCount = (nonStreaming.match(/syncExecuteTranslatedBody\(translatedBody\)/g) ?? []).length;
  assert.ok(nonStreamingSyncCount >= 5, "nonStreamingResponse must sync on every translatedBody rebinding");

  const streamingSyncCount = (streaming.match(/syncExecuteTranslatedBody\(translatedBody\)/g) ?? []).length;
  assert.ok(streamingSyncCount >= 2, "streamingResponse must sync on every translatedBody rebinding");
});

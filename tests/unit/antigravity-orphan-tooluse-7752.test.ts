/**
 * Regression test for #7752.
 *
 * The mainline `claude` / Claude-Code-compatible executor path (`BaseExecutor.execute()`,
 * `open-sse/executors/base.ts:1118-1136`) defends against a client history that ships a
 * genuinely orphaned `tool_use`/`tool_call` block (no matching `tool_result` anywhere in
 * history — e.g. from OpenCode's known client-side bug of leaving a stale tool_use after
 * an aborted/cancelled tool call, anomalyco/opencode#8312) by running `fixToolPairs` on the
 * outgoing messages before serialization. This is the #2382/#4714 fix class.
 *
 * `AntigravityExecutor.execute()` fully overrides `BaseExecutor.execute()` and never calls
 * `super.execute()`, so for Claude-branded Antigravity models the request built by
 * `openaiToAntigravityRequest` → `openaiToCloudCodeGeminiRequest` → `openaiToGeminiBase`
 * (`open-sse/translator/request/openai-to-gemini.ts`) never applied that guard — the orphan
 * tool_use survived as an unpaired `functionCall` part with no matching `functionResponse`,
 * which Vertex's Claude backend rejects with HTTP 400.
 *
 * This is the mirror image of #6026 (orphan tool_RESULT, incoming antigravity→openai
 * direction, fixed by wiring `fixToolPairs` into `antigravityToOpenAIRequest`). #7752 fixes
 * the same missing-defense pattern on the OUTGOING openai→antigravity direction.
 *
 * PURE-FUNCTION ONLY — this test imports the translator + sanitizer functions directly.
 * It must NEVER start the MITM proxy, bind :443/:80, touch /etc/hosts, or install a CA.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-ag-orphan-tooluse-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-ag-orphan-tooluse-secret";

const { openaiToAntigravityRequest } = await import(
  "../../open-sse/translator/request/openai-to-gemini.ts"
);
const { fixToolPairs } = await import("../../open-sse/services/contextManager.ts");

type GeminiEnvelope = {
  request: { contents: Array<{ role: string; parts: Array<Record<string, unknown>> }> };
};

function buildOpenCodeStyleBody() {
  return {
    model: "agy/claude-opus-4-6-thinking",
    stream: true,
    messages: [
      { role: "system", content: "You are a coding agent." },
      { role: "user", content: "Read config.ts and then update the version string." },
      {
        role: "assistant",
        content: "",
        tool_calls: [
          {
            id: "toolu_vrtx_019zAAAA",
            type: "function",
            function: { name: "read_file", arguments: '{"path":"config.ts"}' },
          },
          {
            id: "toolu_vrtx_01P1BBBB",
            type: "function",
            function: { name: "write_file", arguments: '{"path":"config.ts","content":"..."}' },
          },
        ],
      },
      { role: "tool", tool_call_id: "toolu_vrtx_019zAAAA", content: "export const X = 1;" },
      { role: "user", content: "Now also check the changelog." },
    ],
  };
}

function collectFunctionCallAndResponseIds(envelope: GeminiEnvelope) {
  const functionCallIds = new Set<string>();
  const functionResponseIds = new Set<string>();
  for (const entry of envelope.request.contents) {
    for (const part of entry.parts) {
      const fc = part.functionCall as { id?: string } | undefined;
      const fr = part.functionResponse as { id?: string } | undefined;
      if (fc?.id) functionCallIds.add(fc.id);
      if (fr?.id) functionResponseIds.add(fr.id);
    }
  }
  return { functionCallIds, functionResponseIds };
}

test("#7752: openaiToAntigravityRequest strips an orphan functionCall (no functionResponse) for a Claude-branded Antigravity model", () => {
  const body = buildOpenCodeStyleBody();
  const envelope = openaiToAntigravityRequest(
    "agy/claude-opus-4-6-thinking",
    body,
    true,
    null
  ) as GeminiEnvelope;

  const { functionCallIds, functionResponseIds } = collectFunctionCallAndResponseIds(envelope);

  // The paired tool_call must survive untouched.
  assert.ok(functionCallIds.has("toolu_vrtx_019zAAAA"));
  const orphanIds = [...functionCallIds].filter((id) => !functionResponseIds.has(id));
  assert.deepEqual(
    orphanIds,
    [],
    "every functionCall id should have a matching functionResponse or be stripped"
  );
});

test("#7752: a still-in-flight trailing tool_call (no tool_result yet, at the very end of history) is NOT stripped", () => {
  const body = {
    model: "agy/claude-opus-4-6-thinking",
    stream: true,
    messages: [
      { role: "system", content: "You are a coding agent." },
      { role: "user", content: "Read config.ts." },
      {
        role: "assistant",
        content: "",
        tool_calls: [
          {
            id: "toolu_vrtx_pending",
            type: "function",
            function: { name: "read_file", arguments: '{"path":"config.ts"}' },
          },
        ],
      },
    ],
  };
  const envelope = openaiToAntigravityRequest(
    "agy/claude-opus-4-6-thinking",
    body,
    true,
    null
  ) as GeminiEnvelope;
  const { functionCallIds } = collectFunctionCallAndResponseIds(envelope);
  assert.ok(
    functionCallIds.has("toolu_vrtx_pending"),
    "a trailing in-flight tool_call must survive — it has not been orphaned yet"
  );
});

test("control: the mainline Claude executor's fixToolPairs DOES strip the same orphan tool_call", () => {
  const body = buildOpenCodeStyleBody();
  const fixed = fixToolPairs(body.messages as Record<string, unknown>[]) as Array<
    Record<string, unknown>
  >;
  const assistantMsg = fixed.find((m) => m.role === "assistant") as
    | { tool_calls?: Array<{ id: string }> }
    | undefined;
  const survivingIds = (assistantMsg?.tool_calls ?? []).map((tc) => tc.id);
  assert.deepEqual(survivingIds, ["toolu_vrtx_019zAAAA"]);
});

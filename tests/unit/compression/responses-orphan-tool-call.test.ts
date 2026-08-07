/**
 * #8946 — "No tool output found" for custom tool calls (Codex desktop)
 *
 * Compaction Layer-3 purify_history drops oldest messages. The restore path's
 * orphan-call cleanup only removed function_call items whose outputs vanished.
 * custom_tool_call / local_shell_call / apply_patch_call were left orphaned,
 * causing a 400 from the upstream Responses API.
 *
 * These tests pin the fix: the compaction restore co-drops any tool-call item
 * whose output was removed, mirroring the existing function_call logic.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { adaptBodyForCompression } from "../../../open-sse/services/compression/bodyAdapter.ts";
import { compressContext, estimateTokens } from "../../../open-sse/services/contextManager.ts";

function isRecord(v: unknown): v is Record<string, unknown> {
  return !!v && typeof v === "object" && !Array.isArray(v);
}

const TOOL_CALL_TYPES = new Set([
  "function_call",
  "custom_tool_call",
  "local_shell_call",
  "apply_patch_call",
]);

const OUTPUT_TYPES = new Set([
  "function_call_output",
  "custom_tool_call_output",
  "local_shell_call_output",
  "apply_patch_call_output",
]);

/**
 * Scan restored input for orphaned tool calls (a call item whose matching
 * output is absent). Returns an array of descriptive strings, empty = clean.
 */
function findOrphanToolCalls(input: unknown[]): string[] {
  const orphans: string[] = [];
  for (const item of input) {
    if (!isRecord(item)) continue;
    if (!TOOL_CALL_TYPES.has(String(item.type))) continue;
    const callId = typeof item.call_id === "string" && item.call_id.length > 0 ? item.call_id : "";
    if (!callId) continue;

    const hasMatchingOutput = input.some(
      (other) => isRecord(other) && OUTPUT_TYPES.has(String(other.type)) && other.call_id === callId
    );
    if (!hasMatchingOutput) {
      orphans.push(`${String(item.type)} ${callId}`);
    }
  }
  return orphans.sort();
}

/**
 * Build a Responses body with N tool-using turns.
 * Each turn: tool_call + tool_call_output + assistant message + user message.
 * The user messages carry substantial text to survive Layer-1 trim_tools and
 * force Layer-3 purify_history to engage.
 */
function buildToolTurnBody(
  numTurns: number,
  outputText: string,
  userText: string
): { input: Record<string, unknown>[] } {
  const input: Record<string, unknown>[] = [];
  for (let i = 0; i < numTurns; i++) {
    // Each turn has one of each tool call type, cycling through them
    const toolTypes: Array<{
      callType: string;
      outputType: string;
      name: string;
    }> = [
      { callType: "custom_tool_call", outputType: "custom_tool_call_output", name: "my_tool" },
      { callType: "function_call", outputType: "function_call_output", name: "run_command" },
      { callType: "local_shell_call", outputType: "local_shell_call_output", name: "run_shell" },
      { callType: "apply_patch_call", outputType: "apply_patch_call_output", name: "apply_diff" },
    ];
    const t = toolTypes[i % toolTypes.length];
    const callId = `${t.callType}-${i}`;

    input.push({ type: t.callType, call_id: callId, name: t.name, arguments: "{}" });
    input.push({ type: t.outputType, call_id: callId, output: outputText });
    input.push({
      type: "message",
      role: "assistant",
      content: [{ type: "output_text", text: `response ${i}` }],
    });
    input.push({
      type: "message",
      role: "user",
      content: [{ type: "input_text", text: `${userText} turn ${i}` }],
    });
  }
  return { input };
}

test("#8946: compaction drops orphan custom_tool_call / local_shell_call / apply_patch_call with vanished outputs", () => {
  // Build many turns: user messages carry enough text to survive Layer-1
  // trim_tools (which only trims role:"tool" content) so the aggregate
  // token count still exceeds the compact target after trimming, forcing
  // Layer-3 purify_history to engage.
  const outputText = "result: ok";
  const userText = "x".repeat(3_000); // ~750 tokens each
  const body = buildToolTurnBody(8, outputText, userText);

  const adapter = adaptBodyForCompression(body);
  assert.equal(adapter.adapted, true);

  // Calculate before so we can set a target that forces Layer-3.
  const before = estimateTokens(adapter.body.messages as Record<string, unknown>[]);
  const target = Math.max(5_000, Math.floor(before * 0.5));

  const result = compressContext(adapter.body as Record<string, unknown>, {
    provider: "codex",
    model: "gpt-5.6-terra",
    maxTokens: target,
    reserveTokens: 0,
  });

  assert.equal(
    result.compressed,
    true,
    `compression should engage (before=${before}, target=${target}, stats=${JSON.stringify(result.stats)})`
  );

  const restored = adapter.restore(result.body as Record<string, unknown>, {
    dropMissingMappedItems: true,
  });

  const input = Array.isArray(restored.input) ? restored.input : [];
  const orphans = findOrphanToolCalls(input);

  // Before the fix: custom_tool_call, local_shell_call, apply_patch_call
  // orphans survive. After the fix: none survive.
  assert.equal(
    orphans.length,
    0,
    `restored input contains orphaned tool calls whose outputs were dropped: ${JSON.stringify(orphans)} ` +
      `(restored input length: ${input.length})`
  );
});

// Repairs Codex Responses-API `input` arrays that are missing an output item for a
// function/custom tool call, which upstream rejects. Extracted from codex.ts to keep
// the executor chokepoint file under the file-size gate (leaf module, no `this` usage).

type ResponsesInputItem = Record<string, unknown>;

const TOOL_CALL_OUTPUT_TYPES = new Set(["function_call_output", "custom_tool_call_output"]);

function outputTypeForCall(callType: "function_call" | "custom_tool_call"): string {
  return callType === "custom_tool_call" ? "custom_tool_call_output" : "function_call_output";
}

/**
 * Mutates `body.input` in place, inserting an empty output item immediately after
 * any `function_call`/`custom_tool_call` item that has no matching output item.
 */
export function repairMissingCodexToolCallOutputs(body: Record<string, unknown>): void {
  if (!Array.isArray(body.input)) return;

  const existingOutputKeys = new Set<string>();
  for (const item of body.input) {
    if (!item || typeof item !== "object" || Array.isArray(item)) continue;
    const record = item as ResponsesInputItem;
    if (typeof record.type !== "string" || !TOOL_CALL_OUTPUT_TYPES.has(record.type)) continue;
    if (typeof record.call_id === "string" && record.call_id.trim()) {
      existingOutputKeys.add(`${record.type}:${record.call_id.trim()}`);
    }
  }

  const repaired: unknown[] = [];
  let insertedCount = 0;
  for (const item of body.input) {
    repaired.push(item);
    if (!item || typeof item !== "object" || Array.isArray(item)) continue;
    const record = item as ResponsesInputItem;
    if (record.type !== "function_call" && record.type !== "custom_tool_call") continue;
    const callId = typeof record.call_id === "string" ? record.call_id.trim() : "";
    const outputType = outputTypeForCall(record.type);
    const outputKey = `${outputType}:${callId}`;
    if (!callId || existingOutputKeys.has(outputKey)) continue;

    repaired.push({
      type: outputType,
      call_id: callId,
      output: "",
    });
    existingOutputKeys.add(outputKey);
    insertedCount++;
  }

  if (insertedCount > 0) {
    body.input = repaired;
    console.debug(
      `[Codex] repairMissingCodexToolCallOutputs: inserted ${insertedCount} empty tool output item(s)`
    );
  }
}

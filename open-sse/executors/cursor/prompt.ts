// Pure prompt/constraint builders for the Cursor executor (verbatim, no host imports).

export function isRecordLike(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}

/**
 * Translate OpenAI `tool_choice` into an extra directive line — cursor's agent
 * endpoint has no native equivalent. `"required"` forces some tool; a specific
 * `{type:"function", function:{name}}` forces that tool. `"auto"`/`"none"`/
 * absent add nothing here ("none" is handled by dropping tools entirely).
 * Ported from composer-api (directToolChoiceHint / tool_choice === "required").
 */
export function toolChoiceDirectiveLine(toolChoice: unknown): string {
  if (toolChoice === "required") {
    return "\nYou MUST call at least one of the available tools now; do not answer without calling a tool.";
  }
  if (
    isRecordLike(toolChoice) &&
    toolChoice.type === "function" &&
    isRecordLike(toolChoice.function) &&
    typeof toolChoice.function.name === "string" &&
    toolChoice.function.name
  ) {
    return `\nYou MUST call the \`${toolChoice.function.name}\` tool now and not any other tool.`;
  }
  return "";
}

/**
 * Build an OUTPUT CONSTRAINTS block from OpenAI request params that cursor's
 * agent endpoint silently ignores (response_format / max_tokens / stop), so
 * they're surfaced to the model as prompt instructions instead. Ported from
 * composer-api (appendChatOptions / appendJsonConstraint / appendStopConstraint).
 * Returns "" when no constraints apply.
 */
export function buildCursorOutputConstraints(body: {
  max_tokens?: unknown;
  max_completion_tokens?: unknown;
  stop?: unknown;
  response_format?: unknown;
}): string {
  const constraints: string[] = [];

  const rawMax = body.max_completion_tokens ?? body.max_tokens;
  const maxTokens = typeof rawMax === "number" && Number.isFinite(rawMax) ? Math.floor(rawMax) : 0;
  if (maxTokens > 0) {
    constraints.push(`Keep the answer within about ${maxTokens} output tokens.`);
  }

  const stop = body.stop;
  if (typeof stop === "string" && stop) {
    constraints.push(`Do not include any text at or after this stop sequence: ${stop}`);
  } else if (Array.isArray(stop) && stop.length) {
    constraints.push(`Stop before any of these sequences: ${stop.filter(Boolean).join(", ")}`);
  }

  const fmt = body.response_format;
  if (isRecordLike(fmt)) {
    if (fmt.type === "json_object") {
      constraints.push(
        "Return a single valid JSON object and no surrounding prose or code fences."
      );
    } else if (fmt.type === "json_schema") {
      const js = isRecordLike(fmt.json_schema) ? fmt.json_schema.schema : fmt.schema;
      constraints.push(
        `Return only valid JSON (no prose or code fences) matching this schema: ${JSON.stringify(js ?? fmt)}`
      );
    }
  }

  return constraints.length
    ? `\n\nOUTPUT CONSTRAINTS:\n${constraints.map((c) => `- ${c}`).join("\n")}`
    : "";
}

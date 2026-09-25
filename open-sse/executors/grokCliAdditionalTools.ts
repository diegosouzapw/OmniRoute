/**
 * Responses `additional_tools` input items for Grok Build (grok-cli).
 *
 * Codex in its lite request mode (gpt-5.6+/gpt-6 model metadata) declares its tools in
 * `{ type: "additional_tools", tools: [...] }` input items instead of the top-level `tools`
 * array. Grok Build rejects the item with `422 input[0]: unknown item type
 * "additional_tools"`. The Chat translator merges these items through
 * collectResponsesTools(), but grok-cli is a same-format Responses lane, so merge them here,
 * before the custom and namespace conversions run over the combined list.
 */
import { collectResponsesTools } from "../translator/request/openai-responses/additionalTools.ts";

type JsonRecord = Record<string, unknown>;

function isAdditionalToolsItem(item: unknown): boolean {
  return (
    !!item &&
    typeof item === "object" &&
    !Array.isArray(item) &&
    (item as JsonRecord).type === "additional_tools"
  );
}

/**
 * Return a copy of a Responses request body with every `additional_tools` input item merged
 * into `tools` (explicit top-level tools win on name collisions) and removed from `input`.
 * The input body is never mutated, and a body without such items is returned as is.
 */
export function hoistGrokBuildAdditionalTools(body: unknown): unknown {
  if (!body || typeof body !== "object" || Array.isArray(body)) return body;
  const record = body as JsonRecord;
  if (!Array.isArray(record.input) || !record.input.some(isAdditionalToolsItem)) return body;

  const next: JsonRecord = {
    ...record,
    input: record.input.filter((item) => !isAdditionalToolsItem(item)),
  };
  const tools = collectResponsesTools(record.tools, record.input);
  if (tools.length > 0) next.tools = tools;
  return next;
}

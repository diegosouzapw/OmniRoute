/**
 * Give the native Claude OAuth / Claude Code block in `execute()` its own copies of
 * every container it rewrites in place (#16631).
 *
 * `transformRequest` only clones the top level, so `tools[]`, `messages[]` and their
 * content blocks, `system[]`, `tool_choice`, `metadata`, `output_config` and each
 * `cache_control` are still the caller's objects. That block renames tools
 * (`stripProxyToolPrefix`, `remapToolNamesInRequest`), drops tool `cache_control`,
 * defaults `cache_control.ttl` (`normalizeCacheControlTtl`), strips server-tool model
 * prefixes (`stripVersionedToolModelPrefix`), prepends the billing line and sentinel to
 * `system[]`, runs the system transforms and `obfuscateInBody` over block text, and
 * writes `metadata.user_id` and `output_config.effort`. A combo replays the caller's
 * body on its next step, so those writes reached the fallback provider: `Read` without
 * the `_toolNameMap` that maps it back to the client's `read`.
 *
 * One level per container is enough: the leaves (`input_schema`, tool inputs, image
 * data, strings) are only ever replaced, never written into.
 */

type JsonRecord = Record<string, unknown>;

const isJsonRecord = (value: unknown): value is JsonRecord =>
  typeof value === "object" && value !== null && !Array.isArray(value);

export function detachClaudeCodeRewriteTargets(body: JsonRecord): void {
  const copyBlock = (block: unknown): unknown => {
    if (!isJsonRecord(block)) return block;
    const copy: JsonRecord = { ...block };
    if (isJsonRecord(copy.cache_control)) copy.cache_control = { ...copy.cache_control };
    return copy;
  };

  if (Array.isArray(body.tools)) {
    body.tools = body.tools.map((tool) => {
      const copy = copyBlock(tool);
      if (isJsonRecord(copy) && isJsonRecord(copy.function)) copy.function = { ...copy.function };
      return copy;
    });
  }
  if (Array.isArray(body.system)) body.system = body.system.map(copyBlock);
  if (Array.isArray(body.messages)) {
    body.messages = body.messages.map((message) => {
      if (!isJsonRecord(message)) return message;
      const copy: JsonRecord = { ...message };
      if (Array.isArray(copy.content)) copy.content = copy.content.map(copyBlock);
      return copy;
    });
  }
  for (const key of ["tool_choice", "metadata", "output_config"] as const) {
    if (isJsonRecord(body[key])) body[key] = { ...body[key] };
  }
}

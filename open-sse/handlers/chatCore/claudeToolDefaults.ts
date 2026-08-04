// Claude (Anthropic Messages) tool-definition normalization for outbound requests.

type UnknownRecord = Record<string, unknown>;

/**
 * Claude's tool schema requires every tool to carry an explicit `type` discriminator
 * (e.g. "custom", "computer_20241022", "bash_20241022"). Anthropic's own API infers
 * "custom" when it's omitted, but strict Anthropic-compatible gateways (e.g. MiniMax)
 * enforce the documented schema and reject payloads whose tools lack `type` with
 * HTTP 400. Default a missing `type` to "custom" so legacy Claude-format tool
 * definitions survive strict gateways, while leaving any tool that already declares a
 * type (incl. built-in tool types) untouched. (port from 9router#2195)
 *
 * Non-array input is returned unchanged; defaulted entries are new objects so the
 * caller's original tool objects are not mutated. Non-object array entries (null,
 * primitives, arrays) are passed through untouched rather than wrapped — spreading
 * a primitive would fabricate a garbage tool (e.g. `{ type: "custom", '0': 'h' }`).
 */
export function defaultClaudeToolType(tools: unknown): unknown {
  if (!Array.isArray(tools)) return tools;
  return tools.map((tool) => {
    if (tool && typeof tool === "object" && !Array.isArray(tool)) {
      return (tool as UnknownRecord).type ? tool : { type: "custom", ...(tool as UnknownRecord) };
    }
    return tool;
  });
}

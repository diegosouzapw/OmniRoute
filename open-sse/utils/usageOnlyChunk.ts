/**
 * Canonical OpenAI trailing usage-only chunk (`choices: []`) sent before `[DONE]`
 * when the upstream never reported usage, so metered chat clients still see
 * token counts (#12151). Shared by the passthrough and translate flushes.
 */
export function buildUsageOnlyChunk(id: unknown, model: unknown, usage: unknown) {
  return {
    id: id ?? `chatcmpl-${Date.now()}`,
    object: "chat.completion.chunk",
    created: Math.floor(Date.now() / 1000),
    model,
    choices: [],
    usage,
  };
}

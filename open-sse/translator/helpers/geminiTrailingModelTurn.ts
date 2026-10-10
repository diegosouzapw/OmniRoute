/**
 * Newer Gemini chat families (Gemini 3.x and `gemini-pro-agent`) reject a request whose
 * `contents` end on a `model` turn with HTTP 400 "Requests ending with a model turn are
 * not supported" (#10104, 9router#4345). OpenAI/Claude clients legitimately end a
 * conversation on an assistant turn (prefill, or a tool call not yet answered), so every
 * path that emits Gemini `contents` for these models must drop the trailing model turn.
 *
 * The gate is deliberately explicit rather than matching every id containing "gemini":
 * image generation has a separate request contract, and the older 2.5 family accepts the
 * trailing turn and is not part of the rejection evidence.
 */
export function isGeminiTrailingModelTurnRejectingModel(model: unknown): boolean {
  if (typeof model !== "string") return false;
  const normalizedModel = model.toLowerCase();
  if (/(?:^|-)image(?:-|$)/.test(normalizedModel)) {
    return false;
  }
  return /^gemini-(?:3(?:\.\d+)?(?:-[a-z0-9-]+)?|pro-agent)$/.test(normalizedModel);
}

/**
 * Pops trailing `model` turns from `contents` in place and returns the same array.
 *
 * Guard: never strips `contents` down to empty — an empty `contents` array is itself an
 * invalid request, so at least one entry (even a lone trailing "model" turn) is kept.
 */
export function stripTrailingGeminiModelTurns<T>(contents: T[]): T[] {
  if (!Array.isArray(contents)) return contents;
  while (
    contents.length > 1 &&
    (contents[contents.length - 1] as { role?: unknown } | null)?.role === "model"
  ) {
    contents.pop();
  }
  return contents;
}

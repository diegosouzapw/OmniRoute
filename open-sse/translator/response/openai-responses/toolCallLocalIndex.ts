/**
 * Remap a turn's raw upstream tool_calls delta `index` onto a local,
 * contiguous, 0-based sequence in first-seen order.
 *
 * Live incident (2026-09-02, minimax-m3:free via OpenRouter/GMICloud): the
 * upstream's own `index` doesn't reliably start at 0 or stay contiguous per
 * turn — this turn's two calls arrived with raw index 1 and 2 (never 0).
 * Adding that raw index straight onto toolCallOutputIndexBase() left a GAP
 * in the emitted output_index sequence (0 for the message, then 2 and 3 for
 * the calls — index 1 never used). A client that reads response.completed's
 * final `output[]` array by ARRAY POSITION and expects position to equal
 * output_index (the Responses API's own contract) reads output[1] (this
 * turn's first call, real output_index 2) while looking it up under
 * output_index 1, misses it, then reads output[2] (the second call, real
 * output_index 3) under output_index 2 — landing on the FIRST call's tracked
 * slot with a different call_id, which a spec-following client correctly
 * treats as "stream changed output item identity" and aborts.
 */

export type ToolCallLocalIndexState = {
  toolCallLocalIndex?: Record<string, number>;
  toolCallLocalIndexNext?: number;
};

export function resolveLocalToolCallIndex(
  state: ToolCallLocalIndexState,
  tcIdx: string | number
): number {
  if (!state.toolCallLocalIndex) state.toolCallLocalIndex = {};
  if (state.toolCallLocalIndex[tcIdx] === undefined) {
    state.toolCallLocalIndex[tcIdx] = state.toolCallLocalIndexNext ?? 0;
    state.toolCallLocalIndexNext = state.toolCallLocalIndex[tcIdx] + 1;
  }
  return state.toolCallLocalIndex[tcIdx];
}

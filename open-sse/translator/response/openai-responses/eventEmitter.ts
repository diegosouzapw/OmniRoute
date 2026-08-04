// Shared event-collector for the OpenAI Responses response translator's three emission
// sites (main per-chunk pass, the deferred-completion empty-choices branch introduced by
// #6906, and flushEvents at stream end) — avoids duplicating the events/emit boilerplate.
// Carries stream state (state.seq), so it lives outside the stateless pureHelpers.ts leaf.
export function createEventEmitter(state: { seq: number }) {
  const events: Array<{ event: string; data: Record<string, unknown> }> = [];
  const emit = (eventType: string, data: Record<string, unknown>) => {
    data.sequence_number = ++state.seq;
    events.push({ event: eventType, data });
  };
  return { events, emit };
}

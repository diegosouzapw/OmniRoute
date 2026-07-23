/**
 * chatCore request gamification event (Quality Gate v2 / Fase 9 — chatCore god-file
 * decomposition, #3501).
 *
 * Extracted from handleChatCore: emits the per-request "request" gamification event,
 * fire-and-forget and fail-open. Shared by the non-streaming and streaming success paths (the
 * inline block was duplicated verbatim in both). Guards on a missing api-key id and never throws
 * to the caller — the underlying emit is intentionally not awaited; behaviour is byte-identical to
 * the previous inline blocks.
 */

export async function emitRequestGamificationEvent(args: {
  apiKeyId: string | null | undefined;
  model: string | null | undefined;
  provider: string | null | undefined;
}): Promise<void> {
  if (!args.apiKeyId) return;
  try {
    const { emitGamificationEvent } = await import("@/lib/gamification/events");
    emitGamificationEvent({
      apiKeyId: args.apiKeyId,
      action: "request",
      metadata: { model: args.model, provider: args.provider },
    });
  } catch (_) {
    /* gamification optional */
  }
}

/**
 * chatCore streaming per-request cost recording (Quality Gate v2 / Fase 9 — chatCore god-file
 * decomposition, #3501).
 *
 * Extracted from handleChatCore's onStreamComplete: resolves the real per-request cost for a
 * completed streaming response and records it against the api key. onStreamComplete is synchronous,
 * so this is a sync fire-and-forget driven through calculateCost().then().catch() that never throws
 * to the caller. calculateCost and recordCost are injected so the hook stays decoupled. Behaviour
 * is byte-identical to the previous inline block.
 */

type CostResolver = (
  provider: string,
  model: string,
  usage: Record<string, number | undefined> | null | undefined,
  options: { serviceTier?: string }
) => Promise<number>;

export function recordStreamingCost(args: {
  apiKeyId: string | null | undefined;
  provider: string | null | undefined;
  model: string | null | undefined;
  streamUsage: Record<string, number | undefined> | null | undefined;
  serviceTier?: string;
  calculateCost: CostResolver;
  recordCost: (apiKeyId: string, cost: number) => void;
}): void {
  if (!args.apiKeyId || !args.streamUsage) return;

  const apiKeyId = args.apiKeyId;
  args
    .calculateCost(args.provider, args.model, args.streamUsage, { serviceTier: args.serviceTier })
    .then((estimatedCost) => {
      if (estimatedCost > 0) args.recordCost(apiKeyId, estimatedCost);
    })
    .catch(() => {});
}

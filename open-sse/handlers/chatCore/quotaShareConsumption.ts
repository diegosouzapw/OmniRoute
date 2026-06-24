/**
 * chatCore quota-share consumption POST-hook (Quality Gate v2 / Fase 9 — chatCore god-file
 * decomposition, #3501).
 *
 * Extracted from handleChatCore's non-streaming success path (B/F7): schedules a shared-quota
 * consumption record for a completed non-streaming response. Fire-and-forget and fail-open — guards
 * on a missing api-key id / connection id and never throws to the caller. Behaviour is
 * byte-identical to the previous inline block.
 */

type LoggerLike = { warn?: (...args: unknown[]) => void } | null | undefined;

export async function scheduleQuotaShareConsumption(args: {
  apiKeyId: string | null | undefined;
  connectionId: string | null | undefined;
  provider: string | null | undefined;
  model?: string | null | undefined;
  usage: unknown;
  estimatedCost: number;
  log?: LoggerLike;
}): Promise<void> {
  if (!args.apiKeyId || !args.connectionId) return;
  try {
    const { scheduleRecordConsumption, buildConsumptionCost } = await import(
      "@/lib/quota/spendRecorder"
    );
    scheduleRecordConsumption(
      {
        apiKeyId: args.apiKeyId,
        connectionId: args.connectionId,
        provider: args.provider ?? "unknown",
        // Per-(key,model) cap accounting — same resolved model id used at enforce time.
        model: args.model ?? undefined,
        cost: buildConsumptionCost(args.usage, args.estimatedCost),
      },
      args.log
    );
  } catch (_) {
    // Outer fail-open — never throws to caller
  }
}

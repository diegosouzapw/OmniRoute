/**
 * chatCore context-editing telemetry hook (Quality Gate v2 / Fase 9 — chatCore god-file
 * decomposition, #3501).
 *
 * Extracted from handleChatCore's non-streaming success path: when the delegated server-side
 * context-clear actually ran (Claude-only), record the provider's cleared-token receipt under the
 * "context-editing" engine so it surfaces in compression analytics. Best-effort, fire-and-forget,
 * and must never affect the response — the inner work is an un-awaited IIFE that swallows its own
 * errors. Behaviour is byte-identical to the previous inline block.
 */

type LoggerLike = { debug?: (...args: unknown[]) => void } | null | undefined;

export function recordContextEditingTelemetryHook(args: {
  contextEditingEnabled: boolean;
  provider: string | null | undefined;
  responseBody: unknown;
  skillRequestId: string;
  log?: LoggerLike;
}): void {
  const { contextEditingEnabled, provider, responseBody, skillRequestId, log } = args;
  if (!contextEditingEnabled || provider !== "claude") return;

  void (async () => {
    try {
      const { extractContextEditingTelemetry } = await import("../../config/contextEditing.ts");
      const tele = extractContextEditingTelemetry(responseBody);
      if (tele) {
        const { recordContextEditingTelemetry } = await import("@/lib/db/compressionAnalytics");
        recordContextEditingTelemetry(skillRequestId, tele, provider);
        log?.debug?.(
          "CONTEXT_EDITING",
          `cleared ${tele.clearedInputTokens} input tokens / ${tele.clearedToolUses} tool uses (${tele.editCount} edits)`
        );
      }
    } catch {
      // Telemetry is best-effort and must never affect the response.
    }
  })();
}

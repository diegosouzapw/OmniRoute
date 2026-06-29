/**
 * chatCore per-request stage trace (Quality Gate v2 / Fase 9 — chatCore god-file decomposition,
 * #3501).
 *
 * Extracted from handleChatCore: emits a `[STAGE_TRACE]` checkpoint log (trace id + elapsed ms +
 * optional serialized extra) when tracing is enabled, so a hung request reveals which await it was
 * sitting on. Per-request inputs (enable flag, start time, trace id, logger) are threaded via `ctx`
 * so the call sites stay byte-identical; behaviour is unchanged.
 */

type LoggerLike = { info?: (...args: unknown[]) => void } | null | undefined;

export function stageTrace(
  label: string,
  extra: Record<string, unknown> | undefined,
  ctx: { traceEnabled: boolean; startTime: number; traceId: string; log: LoggerLike }
) {
  const { traceEnabled, startTime, traceId, log } = ctx;
  if (!traceEnabled) return;
  const elapsed = Date.now() - startTime;
  let suffix = "";
  if (extra) {
    try {
      suffix = ` ${JSON.stringify(extra)}`;
    } catch {
      suffix = " [unserializable]";
    }
  }
  log?.info?.("STAGE_TRACE", `${traceId} ${label} t=${elapsed}ms${suffix}`);
}

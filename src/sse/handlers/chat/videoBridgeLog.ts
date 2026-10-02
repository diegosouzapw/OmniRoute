import type { VideoBridgeLogRedactionEntry } from "@/lib/guardrails/videoBridge";
import { reanchorVideoBridgeRedaction } from "@/lib/guardrails/videoBridge";

/** Shape of the videoBridgeLog param threaded to executeChatWithBreaker -> handleChatCore (#12150 P1b). */
export type VideoBridgeLog = { observed: boolean; redaction: VideoBridgeLogRedactionEntry[] };

/**
 * #12150 P1b: derive the video-bridge log/Memory shadow from
 * preCallGuardrails.results. Returns undefined only when the video-bridge
 * guardrail did not run (disabled, no video parts, or the request was
 * blocked/failed before meta was set); a replaced ordinary video returns
 * `{ observed: false, redaction: [] }`. So every non-video request threads
 * `undefined` through the dispatch chain, byte-identical to before this param
 * existed.
 *
 * `finalBody` is the payload AFTER the whole pre-call chain
 * (`preCallGuardrails.payload`): #12150 P1 final-review fix re-anchors each
 * redaction entry's `fullText` from it so the log sink's content-match still
 * finds the part after the PII/credential maskers (priorities 10/95) rewrote
 * the description text in place.
 *
 * `results` is typed as a structural subset of GuardrailExecutionResult
 * (src/lib/guardrails/base.ts), the same "no type dependency on the
 * guardrail core" pattern already used by buildModalityBridgeHeader
 * (modalityBridge/bridgeStats.ts).
 */
export function deriveVideoBridgeLog(
  results: Array<{ guardrail: string; meta?: Record<string, unknown> | null }>,
  finalBody: unknown
): VideoBridgeLog | undefined {
  const entry = results.find((r) => r.guardrail === "video-bridge");
  const meta = entry?.meta;
  if (!meta || typeof meta.videoBridgeObserved !== "boolean") return undefined;
  const rawRedaction = Array.isArray(meta.videoBridgeLogRedaction)
    ? (meta.videoBridgeLogRedaction as VideoBridgeLogRedactionEntry[])
    : [];
  const redaction = reanchorVideoBridgeRedaction(rawRedaction, finalBody);
  return { observed: meta.videoBridgeObserved, redaction };
}

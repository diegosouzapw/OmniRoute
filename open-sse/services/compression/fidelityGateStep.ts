import { extractTextContent } from "./messageContent.ts";
import { checkFidelity, type FidelityGateConfig } from "./fidelityGate.ts";
import type { CompressionResult } from "./types.ts";
import type { StackAccumulator } from "./stackedStepCore.ts";
import { getCompressionEngine } from "./engines/registry.ts";

function bodyToText(body: Record<string, unknown>): string {
  const messages = body.messages;
  if (!Array.isArray(messages)) return "";
  return messages
    .map((m) => extractTextContent((m as { content?: unknown }).content as never))
    .join("\n");
}

/**
 * Fidelity gate (opt-in, independent of TV1). Called at each advance point AFTER mergeStackStep
 * pushed the step's breakdown entry. Off → zero-cost `return true` (byte-identical legacy). On a
 * fidelity failure it marks the just-pushed breakdown entry rejected (no advance) and returns false.
 */
export function gateAdvance(
  result: CompressionResult,
  inputBody: Record<string, unknown>,
  fidelityGate: FidelityGateConfig | undefined,
  acc: StackAccumulator,
  engineId?: string
): boolean {
  if (!fidelityGate?.enabled) return true;
  if (engineId && getCompressionEngine(engineId)?.sampling) return true; // lossy-by-design, CCR-recoverable
  const verdict = checkFidelity(bodyToText(inputBody), bodyToText(result.body), fidelityGate);
  if (verdict.passed) return true;
  // mergeStackStep only pushed a breakdown entry when result.stats exists; only then is
  // acc.breakdown's last entry THIS step's (else it would be the prior engine's — don't touch it).
  if (result.stats) {
    const last = acc.breakdown[acc.breakdown.length - 1];
    if (last) {
      last.rejected = true;
      last.rejectReason = verdict.detail ?? verdict.failedInvariant;
      last.compressedTokens = last.originalTokens;
      last.savingsPercent = 0;
    }
  }
  acc.fallbackApplied = true;
  return false;
}

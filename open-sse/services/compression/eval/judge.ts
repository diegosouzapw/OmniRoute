import type { ChatTurn, JudgeVerdict, ModelClient } from "./types.ts";

/**
 * Fidelity judge prompt (D-D2a). Asks the judge to decide whether the compressed-context
 * answer MATERIALLY differs from the full-context answer — wording differences that do not
 * change the substance are "SAME". The judge must end with a single `VERDICT:` line.
 */
export function buildJudgePrompt(fullAnswer: string, compressedAnswer: string): ChatTurn[] {
  return [
    {
      role: "system",
      content:
        "You are a strict evaluation judge. You are given two answers to the same question: " +
        "answer A produced from the full context, and answer B produced from a compressed context. " +
        "Decide whether B MATERIALLY differs from A (a difference that changes the substance, " +
        "correctness, or key facts — NOT mere wording/format). Reply with exactly one final line: " +
        "`VERDICT: SAME` or `VERDICT: MATERIALLY_DIFFERS`.",
    },
    {
      role: "user",
      content: `Answer A (full context):\n${fullAnswer}\n\nAnswer B (compressed context):\n${compressedAnswer}`,
    },
  ];
}

/** PURE verdict parser. Tolerant of case/format; unrecognized output => "unparseable" (never guessed). */
export function parseJudgeVerdict(raw: string): JudgeVerdict {
  const text = raw.toLowerCase();
  const differs = /materially[_\s-]*differs|differs[_\s]+materially|\bdiffers\b/.test(text);
  const same = /verdict:\s*same|\bsame\b/.test(text);
  if (differs) return "materially-differs";
  if (same) return "same";
  return "unparseable";
}

/**
 * Control pair for the self-test (D-D3 / ponytail discipline). The judge must rank the
 * KNOWN-DEGRADED answer as MATERIALLY_DIFFERS and the KNOWN-GOOD answer as SAME, both relative
 * to the same reference. A judge that mis-ranks either is untrusted and aborts the run.
 */
export const CONTROL_PAIR = {
  reference: "The function returns 3 because the input is clamped to the upper bound.",
  good: "It returns 3 since the value is clamped to the maximum allowed.",
  degraded: "It returns 0 because the value is set to zero.",
} as const;

export interface SelfTestResult { passed: boolean; detail: string; }

/**
 * Run the control pair through the judge. PASS requires: degraded => materially-differs AND
 * good => same. Any other outcome (including unparseable) FAILS, so the runner aborts before
 * emitting untrusted scores.
 */
export async function runSelfTest(client: ModelClient, judgeModel: string): Promise<SelfTestResult> {
  const goodVerdict = parseJudgeVerdict(
    (await client.complete(judgeModel, buildJudgePrompt(CONTROL_PAIR.reference, CONTROL_PAIR.good))).text
  );
  const degradedVerdict = parseJudgeVerdict(
    (await client.complete(judgeModel, buildJudgePrompt(CONTROL_PAIR.reference, CONTROL_PAIR.degraded))).text
  );
  if (degradedVerdict !== "materially-differs") {
    return { passed: false, detail: `judge failed to flag the known-degraded control (got "${degradedVerdict}")` };
  }
  if (goodVerdict !== "same") {
    return { passed: false, detail: `judge flagged the known-good control as "${goodVerdict}" (expected same)` };
  }
  return { passed: true, detail: "control pair ranked correctly" };
}

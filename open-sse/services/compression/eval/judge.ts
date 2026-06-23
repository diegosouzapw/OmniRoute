import type { ChatTurn, JudgeVerdict } from "./types.ts";

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

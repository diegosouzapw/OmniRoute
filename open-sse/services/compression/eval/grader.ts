import type { ChatTurn, GradeVerdict } from "./types.ts";

/**
 * Gold grader prompt (D-D2b). Grades a single answer against the gold answer — semantically,
 * so a DIFFERENT-but-correct phrasing still grades CORRECT (catches "different but still right"),
 * while a wrong fact grades INCORRECT. The grader must end with `VERDICT: CORRECT|INCORRECT`.
 */
export function buildGradePrompt(answer: string, gold: string): ChatTurn[] {
  return [
    {
      role: "system",
      content:
        "You are a strict grader. Decide whether the candidate answer is CORRECT with respect " +
        "to the gold answer — judge meaning, not wording (a correctly-phrased-differently answer " +
        "is CORRECT). Reply with exactly one final line: `VERDICT: CORRECT` or `VERDICT: INCORRECT`.",
    },
    { role: "user", content: `Gold answer:\n${gold}\n\nCandidate answer:\n${answer}` },
  ];
}

/** PURE grade parser. Conservative: anything not clearly CORRECT grades INCORRECT (no benefit of doubt). */
export function parseGradeVerdict(raw: string): GradeVerdict {
  const text = raw.toLowerCase();
  if (/\bincorrect\b/.test(text)) return { correct: false, raw };
  if (/\bcorrect\b/.test(text)) return { correct: true, raw };
  return { correct: false, raw };
}

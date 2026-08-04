import type { EvalCase } from "./types.ts";

/**
 * Curated seed corpus (D-D5). Small, diverse content kinds; pinned for reproducible runs.
 * Anonymized captured cases append to this array with `captured: true` (loader vets PII).
 * Keep every `context` synthetic / public so the corpus carries no real user data.
 */
export const SEED_CORPUS: EvalCase[] = [
  {
    id: "prose-1",
    kind: "prose",
    context:
      "The deployment pipeline has three stages. First, the build stage compiles the " +
      "TypeScript sources and bundles them. Second, the test stage runs the unit suite " +
      "and the integration suite in parallel. Third, the deploy stage pushes the artifact " +
      "to the staging environment and waits for a manual approval before promoting to prod.",
    question: "How many stages does the deployment pipeline have, and what is the last stage?",
    gold: "Three stages; the last is the deploy stage (push to staging, manual approval before prod).",
  },
  {
    id: "code-1",
    kind: "code",
    context:
      "export function clamp(n: number, lo: number, hi: number): number {\n" +
      "  if (n < lo) return lo;\n  if (n > hi) return hi;\n  return n;\n}",
    question: "What does clamp(5, 0, 3) return?",
    gold: "3",
  },
  {
    id: "tool-output-json-1",
    kind: "tool-output-json",
    context:
      '{"status":"ok","results":[{"id":1,"name":"alpha","score":0.91},' +
      '{"id":2,"name":"beta","score":0.42},{"id":3,"name":"gamma","score":0.77}]}',
    question: "Which result has the highest score?",
    gold: "alpha (score 0.91)",
  },
  {
    id: "logs-1",
    kind: "logs",
    context:
      "2026-06-22T10:00:01Z INFO  worker started pid=4821\n" +
      "2026-06-22T10:00:02Z WARN  retrying upstream attempt=1\n" +
      "2026-06-22T10:00:03Z ERROR upstream timeout after=30000ms\n" +
      "2026-06-22T10:00:04Z INFO  fell back to secondary provider",
    question: "What error occurred and what happened after it?",
    gold: "An upstream timeout after 30000ms; the worker then fell back to the secondary provider.",
  },
  {
    id: "multi-turn-1",
    kind: "multi-turn",
    context:
      "User: I need to rename the column user_name to username in the users table.\n" +
      "Assistant: You can run ALTER TABLE users RENAME COLUMN user_name TO username.\n" +
      "User: Will that drop the data in the column?\n" +
      "Assistant: No — RENAME COLUMN only changes the column name; the data is preserved.",
    question: "Does renaming the column drop its data?",
    gold: "No; RENAME COLUMN preserves the data.",
  },
];

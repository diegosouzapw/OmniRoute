/**
 * Deterministic coding-agent request corpus for the #7847 heap benchmark.
 *
 * Kept separate from `request-body-heap.ts` so it can be imported with zero side effects:
 * the benchmark redirects DATA_DIR and transitively boots SQLite at import time, which a unit
 * test must not do just to assert corpus stability.
 *
 * Determinism is the point. A benchmark corpus built with Math.random() would make a
 * before/after comparison measure noise instead of the change under test, so the generator uses
 * a fixed-seed LCG and is covered by tests/unit/heap-benchmark-corpus.test.ts.
 */

/** Defaults reproduce the #7847 production incident: 3.05 MiB, 729 messages, 86 tools. */
export const INCIDENT_SHAPE = {
  messages: 729,
  tools: 86,
  /** Calibrated so the defaults land on the incident's wire size. */
  contentWords: 527,
} as const;

function lcg(seed: number): () => number {
  let s = seed >>> 0;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 0x100000000);
}

const WORDS = [
  "refactor",
  "handler",
  "provider",
  "combo",
  "stream",
  "token",
  "context",
  "payload",
  "upstream",
  "fallback",
  "quota",
  "retry",
  "executor",
  "translate",
  "compression",
  "cache",
];

function sentence(rnd: () => number, words: number): string {
  const out: string[] = [];
  for (let i = 0; i < words; i++) out.push(WORDS[Math.floor(rnd() * WORDS.length)]);
  return out.join(" ");
}

/** A coding-agent shaped request: long alternating history plus a large tool catalog. */
export function buildAgentPayload(
  messages: number = INCIDENT_SHAPE.messages,
  tools: number = INCIDENT_SHAPE.tools,
  contentWords: number = INCIDENT_SHAPE.contentWords
): Record<string, unknown> {
  const rnd = lcg(0x5eed);
  return {
    model: "claude-opus-5",
    stream: true,
    messages: Array.from({ length: messages }, (_, i) => ({
      role: i % 2 === 0 ? "user" : "assistant",
      content: sentence(rnd, contentWords),
    })),
    tools: Array.from({ length: tools }, (_, i) => ({
      type: "function",
      function: {
        name: `tool_${i}`,
        description: sentence(rnd, 25),
        parameters: {
          type: "object",
          properties: Object.fromEntries(
            Array.from({ length: 8 }, (_, p) => [
              `param_${p}`,
              { type: "string", description: sentence(rnd, 10) },
            ])
          ),
          required: ["param_0"],
        },
      },
    })),
  };
}

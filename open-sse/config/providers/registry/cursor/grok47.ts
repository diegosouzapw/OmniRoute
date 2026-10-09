/** Public variants supplied in #15366's Cursor model catalog. */
export const GROK_47_CONTEXTS = { "256k": 256_000, "500k": 500_000 } as const;
export const GROK_47_EFFORTS = ["low", "medium", "high", "xhigh"] as const;

export type Grok47Context = keyof typeof GROK_47_CONTEXTS;
export type Grok47Effort = (typeof GROK_47_EFFORTS)[number];

export function cursorGrok47Variant(context: Grok47Context, effort: Grok47Effort, fast: boolean) {
  return {
    id: `cursor-grok-4.7-${effort}${fast ? "-fast" : ""}-${context}`,
    name: `Cursor Grok 4.7 ${context.toUpperCase()} ${effort[0].toUpperCase()}${effort.slice(1)}${fast ? " Fast" : ""}`,
    contextLength: GROK_47_CONTEXTS[context],
    liveCatalogIds: ["grok-4.7"],
    supportedThinkingEfforts: [effort],
  };
}

export const CURSOR_GROK_47_MODELS = (Object.keys(GROK_47_CONTEXTS) as Grok47Context[]).flatMap(
  (context) =>
    GROK_47_EFFORTS.flatMap((effort) =>
      [false, true].map((fast) => cursorGrok47Variant(context, effort, fast))
    )
);

/** Synthetic context ids are decoded before exact live-id passthrough. */
export function resolveCursorGrok47Variant(id: string) {
  const match = /^cursor-grok-4\.7-(low|medium|high|xhigh)(-fast)?-(256k|500k)$/.exec(id);
  if (!match) return null;
  return {
    modelId: "grok-4.7",
    parameters: [
      { id: "context", value: match[3] },
      { id: "effort", value: match[1] },
      { id: "fast", value: String(Boolean(match[2])) },
    ],
  };
}

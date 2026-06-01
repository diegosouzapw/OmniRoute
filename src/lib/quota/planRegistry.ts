import type { QuotaDimension } from "./dimensions";

interface KnownPlanShape {
  provider: string;
  dimensions: QuotaDimension[];
}

const KNOWN_PLANS: Record<string, KnownPlanShape> = {
  codex: {
    provider: "codex",
    dimensions: [
      { unit: "percent", window: "5h", limit: 100 },
      { unit: "percent", window: "weekly", limit: 100 },
    ],
  },
  glm: {
    provider: "glm",
    dimensions: [
      // limit=0 = desconhecido; documentado. Mantido para correta detecção pelo planResolver.
      // Sliding window / fair-share devem tratar limit=0 como "manual obrigatório".
      { unit: "tokens", window: "5h", limit: Number.EPSILON },
      { unit: "tokens", window: "weekly", limit: Number.EPSILON },
    ],
  },
  minimax: {
    provider: "minimax",
    dimensions: [
      { unit: "tokens", window: "5h", limit: Number.EPSILON },
      { unit: "tokens", window: "weekly", limit: Number.EPSILON },
    ],
  },
  bailian: {
    provider: "bailian",
    dimensions: [
      { unit: "percent", window: "5h", limit: 100 },
      { unit: "percent", window: "weekly", limit: 100 },
      { unit: "percent", window: "monthly", limit: 100 },
    ],
  },
  kimi: {
    provider: "kimi",
    dimensions: [{ unit: "requests", window: "hourly", limit: 1500 }],
  },
  alibaba: {
    provider: "alibaba",
    dimensions: [{ unit: "requests", window: "monthly", limit: 90_000 }],
  },
};

export function getKnownPlan(provider: string): KnownPlanShape | null {
  return KNOWN_PLANS[provider] ?? null;
}

export function knownProviders(): readonly string[] {
  return Object.keys(KNOWN_PLANS);
}

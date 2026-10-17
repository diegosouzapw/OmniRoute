/** Relative plan capacity estimated from monthly price, with a $20 baseline. */
const CODEX_CAPACITY = new Map<string, number>([
  ["plus", 1], // Plus — $20/month.
  ["prolite", 5], // Pro 100 — $100/month.
  ["pro", 10], // Pro 200 — $200/month.
  ["promax", 25], // Pro 500 — $500/month.
  ["team", 1], // Business Standard — $20/seat/month, billed annually.
  ["self_serve_business_prolite", 5], // Business Premium — $100/seat/month, billed annually.
]);

const CLAUDE_CAPACITY = new Map<string, number>([
  ["claude_ai", 1], // Pro — $20/month.
  ["claude_pro", 1], // Pro — $20/month.
  ["claude_max_5x", 5], // Max 5x — $100/month.
  ["claude_max_20x", 10], // Max 20x — $200/month.
]);

export function resolvePlanCapacity(provider: string | null | undefined, plan: unknown): number {
  if (typeof plan !== "string") return 1;
  const normalized = plan.trim().toLowerCase();
  if (provider === "codex") return CODEX_CAPACITY.get(normalized) ?? 1;
  if (provider === "claude") {
    return CLAUDE_CAPACITY.get(normalized.replace(/^default_/, "")) ?? 1;
  }
  return 1;
}

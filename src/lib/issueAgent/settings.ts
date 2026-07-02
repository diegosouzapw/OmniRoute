export const ISSUE_AGENT_DEFAULTS = {
  mode: "triage",
  maxBudgetUsd: 5,
  maxIterations: 3,
} as const;

export const ISSUE_AGENT_BUDGET_BOUNDS = {
  minUsd: 0,
  maxUsd: 100,
} as const;

export type IssueAgentMode = "report" | "triage" | "fix" | "triage-and-fix";

export type IssueAgentSettingsInput = {
  mode?: IssueAgentMode;
  maxBudgetUsd?: number;
  maxIterations?: number;
  provider?: string;
  model?: string;
  routingPolicy?: string;
  githubRepository?: string;
  defaultBaseBranch?: string;
  dockerWorkerImage?: string;
  retentionDays?: number;
  budgets?: {
    maxRuntimeSeconds?: number;
    maxTokens?: number;
    maxCostUsd?: number;
  };
};

export type IssueAgentSettings = {
  mode: IssueAgentMode;
  maxBudgetUsd: number;
  maxIterations: number;
  provider: string;
  model: string;
  routingPolicy: string;
  githubRepository: string;
  defaultBaseBranch: string;
  dockerWorkerImage: string;
  retentionDays: number;
  budgets: {
    maxRuntimeSeconds: number;
    maxTokens: number;
    maxCostUsd: number;
  };
};

function clampNumber(value: unknown, fallback: number, min: number, max: number): number {
  const numeric = typeof value === "number" && Number.isFinite(value) ? value : fallback;
  return Math.min(max, Math.max(min, numeric));
}

export function normalizeIssueAgentSettings(
  input: IssueAgentSettingsInput = {}
): IssueAgentSettings {
  const rawBudget =
    typeof input.maxBudgetUsd === "number" && Number.isFinite(input.maxBudgetUsd)
      ? input.maxBudgetUsd
      : ISSUE_AGENT_DEFAULTS.maxBudgetUsd;

  const rawIterations =
    typeof input.maxIterations === "number" && Number.isFinite(input.maxIterations)
      ? input.maxIterations
      : ISSUE_AGENT_DEFAULTS.maxIterations;

  return {
    mode: input.mode ?? ISSUE_AGENT_DEFAULTS.mode,
    maxBudgetUsd: Math.min(
      ISSUE_AGENT_BUDGET_BOUNDS.maxUsd,
      Math.max(ISSUE_AGENT_BUDGET_BOUNDS.minUsd, rawBudget)
    ),
    maxIterations: Math.max(1, Math.floor(rawIterations)),
    provider: input.provider || "omniroute",
    model: input.model || "",
    routingPolicy: input.routingPolicy || "default",
    githubRepository: input.githubRepository || "",
    defaultBaseBranch: input.defaultBaseBranch || "main",
    dockerWorkerImage: input.dockerWorkerImage || "ghcr.io/omniroute/issue-agent-worker:latest",
    retentionDays: Math.floor(clampNumber(input.retentionDays, 7, 1, 365)),
    budgets: {
      maxRuntimeSeconds: Math.floor(clampNumber(input.budgets?.maxRuntimeSeconds, 900, 30, 86_400)),
      maxTokens: Math.floor(clampNumber(input.budgets?.maxTokens, 200_000, 1_000, 50_000_000)),
      maxCostUsd: clampNumber(input.budgets?.maxCostUsd, rawBudget, 0, 100_000),
    },
  };
}

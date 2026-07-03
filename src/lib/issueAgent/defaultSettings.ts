export const DEFAULT_ISSUE_AGENT_SETTINGS = {
  automaticReportsEnabled: false,
  manualActionsEnabled: true,
  fixPrCreationEnabled: false,
  provider: "omniroute",
  model: "",
  routingPolicy: "default",
  githubRepository: "",
  defaultBaseBranch: "main",
  dockerWorkerImage: "ghcr.io/omniroute/issue-agent-worker:latest",
  retentionDays: 7,
  budgets: {
    maxRuntimeSeconds: 900,
    maxTokens: 200000,
    maxCostUsd: 10,
  },
} as const;

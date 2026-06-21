export type EvalTargetType = "suite-default" | "model" | "combo";

export interface EvalTargetOption {
  key: string;
  type: EvalTargetType;
  id: string | null;
  label: string;
  description: string;
}

export interface EvalApiKeyOption {
  id: string;
  name: string;
  isActive: boolean;
}

export interface EvalCasePreview {
  id: string;
  name: string;
  model?: string;
  input?: {
    messages?: Array<{ role: string; content: string }>;
  };
  expected?: {
    strategy?: string;
    value?: string;
  };
  tags?: string[];
}

export interface EvalSuite {
  id: string;
  name: string;
  description?: string;
  source?: "built-in" | "custom";
  caseCount?: number;
  cases?: EvalCasePreview[];
  updatedAt?: string;
}

export interface EvalResult {
  caseId: string;
  caseName: string;
  passed: boolean;
  durationMs: number;
  error?: string;
  details?: {
    expected?: string;
    actual?: string;
    actualSnippet?: string;
    searchTerm?: string;
    pattern?: string;
  };
}

export interface EvalRunSummary {
  total: number;
  passed: number;
  failed: number;
  passRate: number;
}

export interface EvalRun {
  id: string;
  runGroupId: string | null;
  suiteId: string;
  suiteName: string;
  target: {
    type: EvalTargetType;
    id: string | null;
    key: string;
    label: string;
  };
  avgLatencyMs: number;
  summary: EvalRunSummary;
  results: EvalResult[];
  outputs: Record<string, string>;
  createdAt: string;
}

export interface EvalScorecard {
  suites: number;
  totalCases: number;
  totalPassed: number;
  overallPassRate: number;
  perSuite: Array<{ id: string; name: string; passRate: number }>;
}

export interface EvalSuiteRunState {
  runs: EvalRun[];
  scorecard: EvalScorecard | null;
}

export interface EvalsDashboardPayload {
  suites: EvalSuite[];
  recentRuns: EvalRun[];
  scorecard: EvalScorecard | null;
  targets: EvalTargetOption[];
  apiKeys: EvalApiKeyOption[];
}

export type BuilderStrategy = "contains" | "exact" | "regex";

export interface EvalCaseDraft {
  id: string;
  name: string;
  model: string;
  systemPrompt: string;
  userPrompt: string;
  strategy: BuilderStrategy;
  expectedValue: string;
  tags: string;
}

export interface EvalSuiteDraft {
  id?: string;
  name: string;
  description: string;
  cases: EvalCaseDraft[];
}

export interface ImportedEvalCase {
  id?: string;
  name?: string;
  model?: string;
  input?: {
    messages?: Array<{ role?: string; content?: string }>;
  };
  expected?: {
    strategy?: string;
    value?: string;
  };
  tags?: string[];
}

export interface ImportedEvalSuiteFile {
  name?: string;
  description?: string;
  cases?: ImportedEvalCase[];
}

export interface RunAllProgress {
  current: number;
  total: number;
  suiteName: string;
  completed: number;
  failedSuites: number;
}

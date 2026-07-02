/**
 * Deterministic FSM for Multi-Step Workflows
 *
 * Orchestrates plan -> review -> execute -> verify using rules, not LLM decisions.
 * Risk-based phase skipping: high=all phases, medium=skip planner, low=execute+test only.
 */

export type Phase =
  | "classify"
  | "plan"
  | "plan_review"
  | "execute"
  | "code_review"
  | "quality_review"
  | "security"
  | "test"
  | "output_review"
  | "done"
  | "failed"
  | "paused";
export type RiskLevel = "low" | "medium" | "high";
export type Verdict = "approve" | "approve_with_notes" | "request_changes" | "reject" | "block";

export interface PhaseRecord {
  phase: Phase;
  enteredAt: string;
  exitedAt: string | null;
  verdict: Verdict | null;
  provider: string | null;
  model: string | null;
  retryCount: number;
  notes: string | null;
}

export interface WorkflowContext {
  id: string;
  currentPhase: Phase;
  risk: RiskLevel;
  lastVerdict: Verdict | null;
  retries: Record<string, number>;
  maxRetries: number;
  testsPass: boolean;
  history: PhaseRecord[];
  createdAt: string;
  metadata: Record<string, unknown>;
}

interface Transition {
  from: Phase;
  to: Phase;
  condition: (ctx: WorkflowContext) => boolean;
  description: string;
}

const HIGH_KEYWORDS = [
  "schema",
  "migration",
  "deploy",
  "delete",
  "drop",
  "env",
  "database",
  "refactor",
  "security",
  "auth",
  "production",
  "secrets",
  "credentials",
  "permission",
];
const MED_KEYWORDS = [
  "endpoint",
  "feature",
  "service",
  "model",
  "api",
  "integration",
  "webhook",
  "middleware",
  "route",
];

export function classifyRisk(desc: string): RiskLevel {
  const l = desc.toLowerCase();
  if (HIGH_KEYWORDS.some((k) => l.includes(k))) return "high";
  if (MED_KEYWORDS.some((k) => l.includes(k))) return "medium";
  return "low";
}

const PHASE_ORDER: Phase[] = [
  "classify",
  "plan",
  "plan_review",
  "execute",
  "code_review",
  "quality_review",
  "security",
  "test",
  "output_review",
];

const T: Transition[] = [
  {
    from: "classify",
    to: "plan",
    condition: (c) => c.risk === "high",
    description: "High risk -> full planning",
  },
  {
    from: "classify",
    to: "execute",
    condition: (c) => c.risk === "medium",
    description: "Medium risk -> skip planner",
  },
  {
    from: "classify",
    to: "execute",
    condition: (c) => c.risk === "low",
    description: "Low risk -> direct execute",
  },
  { from: "plan", to: "plan_review", condition: () => true, description: "Plan -> review" },
  {
    from: "plan_review",
    to: "execute",
    condition: (c) => c.lastVerdict === "approve" || c.lastVerdict === "approve_with_notes",
    description: "Plan approved -> execute",
  },
  {
    from: "plan_review",
    to: "plan",
    condition: (c) =>
      (c.lastVerdict === "reject" || c.lastVerdict === "request_changes") &&
      (c.retries["plan"] ?? 0) < c.maxRetries,
    description: "Plan rejected -> retry",
  },
  {
    from: "plan_review",
    to: "failed",
    condition: (c) =>
      (c.lastVerdict === "reject" || c.lastVerdict === "request_changes") &&
      (c.retries["plan"] ?? 0) >= c.maxRetries,
    description: "Plan rejected max retries",
  },
  {
    from: "execute",
    to: "code_review",
    condition: (c) => c.risk !== "low",
    description: "Non-low -> code review",
  },
  {
    from: "execute",
    to: "test",
    condition: (c) => c.risk === "low",
    description: "Low -> skip reviews",
  },
  {
    from: "code_review",
    to: "quality_review",
    condition: (c) => c.lastVerdict === "approve" || c.lastVerdict === "approve_with_notes",
    description: "Code approved -> quality",
  },
  {
    from: "code_review",
    to: "execute",
    condition: (c) =>
      (c.lastVerdict === "reject" || c.lastVerdict === "request_changes") &&
      (c.retries["execute"] ?? 0) < c.maxRetries,
    description: "Code rejected -> re-execute",
  },
  {
    from: "code_review",
    to: "failed",
    condition: (c) =>
      (c.lastVerdict === "reject" || c.lastVerdict === "request_changes") &&
      (c.retries["execute"] ?? 0) >= c.maxRetries,
    description: "Code rejected max retries",
  },
  {
    from: "quality_review",
    to: "security",
    condition: (c) => c.risk === "high",
    description: "High -> security audit",
  },
  {
    from: "quality_review",
    to: "test",
    condition: (c) => c.risk !== "high",
    description: "Non-high -> skip security",
  },
  {
    from: "security",
    to: "failed",
    condition: (c) => c.lastVerdict === "block",
    description: "Security BLOCK -> failed",
  },
  {
    from: "security",
    to: "test",
    condition: (c) => c.lastVerdict !== "block",
    description: "Security passed -> test",
  },
  {
    from: "test",
    to: "output_review",
    condition: (c) => c.testsPass,
    description: "Tests pass -> output review",
  },
  {
    from: "test",
    to: "execute",
    condition: (c) => !c.testsPass && (c.retries["execute"] ?? 0) < c.maxRetries,
    description: "Tests fail -> re-execute",
  },
  {
    from: "test",
    to: "failed",
    condition: (c) => !c.testsPass && (c.retries["execute"] ?? 0) >= c.maxRetries,
    description: "Tests fail max retries",
  },
  {
    from: "output_review",
    to: "done",
    condition: () => true,
    description: "Output reviewed -> done",
  },
];

export function createWorkflow(
  id: string,
  description: string,
  opts?: { maxRetries?: number; metadata?: Record<string, unknown> }
): WorkflowContext {
  const risk = classifyRisk(description);
  return {
    id,
    currentPhase: "classify",
    risk,
    lastVerdict: null,
    retries: {},
    maxRetries: opts?.maxRetries ?? 3,
    testsPass: false,
    history: [
      {
        phase: "classify",
        enteredAt: new Date().toISOString(),
        exitedAt: null,
        verdict: null,
        provider: null,
        model: null,
        retryCount: 0,
        notes: `Risk: ${risk}`,
      },
    ],
    createdAt: new Date().toISOString(),
    metadata: opts?.metadata ?? {},
  };
}

export function advance(
  ctx: WorkflowContext,
  result?: {
    verdict?: Verdict;
    testsPass?: boolean;
    provider?: string;
    model?: string;
    notes?: string;
  }
): Phase | null {
  if (result?.verdict != null) ctx.lastVerdict = result.verdict;
  if (result?.testsPass != null) ctx.testsPass = result.testsPass;
  const cur = ctx.history[ctx.history.length - 1];
  if (cur) {
    cur.exitedAt = new Date().toISOString();
    cur.verdict = result?.verdict ?? null;
    cur.provider = result?.provider ?? null;
    cur.model = result?.model ?? null;
    cur.notes = result?.notes ?? null;
  }
  for (const t of T) {
    if (t.from === ctx.currentPhase && t.condition(ctx)) {
      const fi = PHASE_ORDER.indexOf(t.from),
        ti = PHASE_ORDER.indexOf(t.to);
      if (ti >= 0 && fi >= 0 && ti <= fi) ctx.retries[t.to] = (ctx.retries[t.to] ?? 0) + 1;
      ctx.currentPhase = t.to;
      ctx.history.push({
        phase: t.to,
        enteredAt: new Date().toISOString(),
        exitedAt: null,
        verdict: null,
        provider: null,
        model: null,
        retryCount: ctx.retries[t.to] ?? 0,
        notes: t.description,
      });
      return t.to;
    }
  }
  return null;
}

export function pause(ctx: WorkflowContext, reason: string): void {
  ctx.currentPhase = "paused";
  ctx.history.push({
    phase: "paused",
    enteredAt: new Date().toISOString(),
    exitedAt: null,
    verdict: null,
    provider: null,
    model: null,
    retryCount: 0,
    notes: reason,
  });
}

export function resume(ctx: WorkflowContext, phase: Phase): void {
  const p = ctx.history[ctx.history.length - 1];
  if (p) p.exitedAt = new Date().toISOString();
  ctx.currentPhase = phase;
  ctx.history.push({
    phase,
    enteredAt: new Date().toISOString(),
    exitedAt: null,
    verdict: null,
    provider: null,
    model: null,
    retryCount: ctx.retries[phase] ?? 0,
    notes: "Resumed",
  });
}

export function isTerminated(ctx: WorkflowContext): boolean {
  return ctx.currentPhase === "done" || ctx.currentPhase === "failed";
}
export function getPhaseSequence(ctx: WorkflowContext): Phase[] {
  return ctx.history.map((r) => r.phase);
}
export function getLLMCallCount(ctx: WorkflowContext): number {
  const sys: Phase[] = ["classify", "paused", "done", "failed"];
  return ctx.history.filter((r) => !sys.includes(r.phase) && r.exitedAt != null).length;
}

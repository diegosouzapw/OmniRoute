import {
  IssueAgentMode,
  IssueAgentSettingsInput,
  normalizeIssueAgentSettings,
} from "./settings.ts";
import { redactSecrets } from "./redaction.ts";

export type IssueAgentRun = {
  id: string;
  mode: IssueAgentMode;
  issueRef: string;
  settings: ReturnType<typeof normalizeIssueAgentSettings>;
  source: string;
  status: "queued" | "blocked" | "cancelled";
  diagnostics: {
    summary: string;
    redactedPreview: string;
  };
  prerequisiteCheck?: {
    ok: boolean;
    missing: string[];
  };
  dockerWorkerPlan?: {
    required: boolean;
    image: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type CreateIssueAgentRunInput = {
  issueRef?: string;
  mode: IssueAgentMode;
  source?: string;
  log?: unknown;
  detail?: unknown;
  settings?: IssueAgentSettingsInput;
  prerequisiteCheck?: {
    ok: boolean;
    missing: string[];
  };
  dockerDetected?: boolean;
  now?: () => Date;
  idFactory?: () => string;
};

let nextRunId = 1;

export function createIssueAgentRun(input: CreateIssueAgentRunInput): IssueAgentRun {
  const now = input.now ?? (() => new Date());
  const idFactory = input.idFactory ?? (() => `issue-agent-run-${nextRunId++}`);
  const settings = normalizeIssueAgentSettings({
    ...input.settings,
    mode: input.mode,
  });
  const redactedPreview = redactSecrets(
    JSON.stringify({ log: input.log ?? null, detail: input.detail ?? null }).slice(0, 12000)
  );
  const timestamp = now().toISOString();
  const blocked =
    (input.mode === "fix" || input.mode === "triage-and-fix") &&
    input.prerequisiteCheck &&
    !input.prerequisiteCheck.ok;

  return {
    id: idFactory(),
    mode: input.mode,
    issueRef: input.issueRef || "unfiled",
    settings,
    source: input.source || "manual",
    status: blocked ? "blocked" : "queued",
    diagnostics: {
      summary: buildDiagnosticSummary(input.log, input.detail),
      redactedPreview,
    },
    prerequisiteCheck: input.prerequisiteCheck,
    dockerWorkerPlan:
      input.dockerDetected || settings.dockerWorkerImage
        ? { required: Boolean(input.dockerDetected), image: settings.dockerWorkerImage }
        : undefined,
    createdAt: timestamp,
    updatedAt: timestamp,
  };
}

function buildDiagnosticSummary(log: unknown, detail: unknown): string {
  const record = log && typeof log === "object" ? (log as Record<string, unknown>) : {};
  const detailRecord =
    detail && typeof detail === "object" ? (detail as Record<string, unknown>) : {};
  const parts = [
    record.method,
    record.path,
    record.status ? `status=${record.status}` : null,
    record.provider ? `provider=${record.provider}` : null,
    record.model ? `model=${record.model}` : null,
    detailRecord.detailState ? `detail=${detailRecord.detailState}` : null,
  ].filter(Boolean);
  return parts.length ? String(parts.join(" ")) : "Manual issue-agent run";
}

const runs = new Map<string, IssueAgentRun>();

export function saveIssueAgentRun(run: IssueAgentRun): IssueAgentRun {
  runs.set(run.id, run);
  return run;
}

export function listIssueAgentRuns(): IssueAgentRun[] {
  return Array.from(runs.values()).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function getIssueAgentRun(id: string): IssueAgentRun | null {
  return runs.get(id) ?? null;
}

export function cancelIssueAgentRun(id: string): IssueAgentRun | null {
  const run = runs.get(id);
  if (!run) return null;
  const next = { ...run, status: "cancelled" as const, updatedAt: new Date().toISOString() };
  runs.set(id, next);
  return next;
}

export function resetIssueAgentRunsForTests() {
  runs.clear();
  nextRunId = 1;
}

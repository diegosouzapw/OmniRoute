import { createHash } from "node:crypto";

export interface RecordedTriageInput {
  issueUrl?: string;
  dryRun?: boolean;
}

export interface RecordedTriageRun {
  accepted: true;
  mode: "recorded-triage";
  runner: "deterministic-recorded-triage";
  runId: string;
  issueUrl: string;
  repository: string;
  issueNumber: number;
  dryRun: boolean;
  steps: string[];
}

const GITHUB_ISSUE_URL =
  /^https:\/\/(?:[^@/\s]+@)?github\.com\/([^/\s]+)\/([^/\s]+)\/(?:issues|pull)\/(\d+)(?:[/?#].*)?$/i;

const RECORDED_TRIAGE_STEPS = [
  "load-recorded-github-context",
  "classify-mention-intent",
  "draft-safe-response-plan",
  "emit-audit-record",
];

function redactUrlCredentials(issueUrl: string): string {
  return issueUrl.replace(/^https:\/\/[^@/\s]+@github\.com\//i, "https://[REDACTED]@github.com/");
}

function buildRunId(repository: string, issueNumber: number): string {
  const digest = createHash("sha256")
    .update(`${repository}#${issueNumber}`)
    .digest("hex")
    .slice(0, 16);
  return `issue-agent-recorded-triage-${digest}`;
}

export function createRecordedTriageRun(input: RecordedTriageInput): RecordedTriageRun {
  const issueUrl = typeof input.issueUrl === "string" ? input.issueUrl.trim() : "";
  const match = GITHUB_ISSUE_URL.exec(issueUrl);
  if (!match) {
    throw new Error("Expected a GitHub issue or pull request URL");
  }

  const owner = match[1]!;
  const repo = match[2]!;
  const issueNumber = Number(match[3]);
  const repository = `${owner}/${repo}`;

  return {
    accepted: true,
    mode: "recorded-triage",
    runner: "deterministic-recorded-triage",
    runId: buildRunId(repository, issueNumber),
    issueUrl: redactUrlCredentials(issueUrl),
    repository,
    issueNumber,
    dryRun: input.dryRun !== false,
    steps: [...RECORDED_TRIAGE_STEPS],
  };
}

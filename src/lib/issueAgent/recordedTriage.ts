import { createHash } from "node:crypto";
import { redactSecrets } from "@/shared/utils/logRedaction";

export interface RecordedTriageComment {
  author?: string;
  body?: string;
  isBot?: boolean;
}

export interface RecordedTriageContextInput {
  title?: string;
  body?: string;
  comments?: RecordedTriageComment[];
}

export interface RecordedTriageInput {
  issueUrl?: string;
  dryRun?: boolean;
  recordedContext?: RecordedTriageContextInput;
}

export interface RecordedTriageContextSummary {
  issueTitle: string | null;
  commentCount: number;
  humanCommentCount: number;
  botCommentCount: number;
  intent: "bugfix" | "review" | "question" | "unknown";
  redactedDigestSource: string;
}

export interface RecordedTriageRun {
  accepted: true;
  mode: "recorded-triage";
  runner: "deterministic-recorded-triage" | "omniroute-chat-completions";
  runId: string;
  issueUrl: string;
  repository: string;
  issueNumber: number;
  dryRun: boolean;
  context: RecordedTriageContextSummary;
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

function normalizeText(value: unknown, maxLength = 400): string {
  if (typeof value !== "string") return "";
  return value.trim().replace(/\s+/g, " ").slice(0, maxLength);
}

function classifyIntent(text: string): RecordedTriageContextSummary["intent"] {
  const lower = text.toLowerCase();
  if (/\b(bug|fix|failing|regression|broken|patch)\b/.test(lower)) return "bugfix";
  if (/\b(review|pr|pull request|approve|merge)\b/.test(lower)) return "review";
  if (/\b(question|why|how|what|help)\b/.test(lower)) return "question";
  return "unknown";
}

function summarizeContext(
  input: RecordedTriageContextInput | undefined
): RecordedTriageContextSummary {
  const comments = Array.isArray(input?.comments) ? input.comments.slice(0, 50) : [];
  const title = normalizeText(input?.title, 160);
  const body = normalizeText(input?.body);
  const commentTexts = comments.map((comment) => normalizeText(comment.body, 200)).filter(Boolean);
  const digestSource = redactSecrets([title, body, ...commentTexts].filter(Boolean).join("\n"));
  const botCommentCount = comments.filter((comment) => comment.isBot === true).length;
  const humanCommentCount = comments.length - botCommentCount;

  return {
    issueTitle: title || null,
    commentCount: comments.length,
    humanCommentCount,
    botCommentCount,
    intent: classifyIntent(digestSource),
    redactedDigestSource: digestSource.slice(0, 1200),
  };
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
    context: summarizeContext(input.recordedContext),
    steps: [...RECORDED_TRIAGE_STEPS],
  };
}

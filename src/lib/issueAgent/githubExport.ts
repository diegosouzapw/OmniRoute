import type { RecordedTriageComment, RecordedTriageContextInput } from "./recordedTriage";

export interface NormalizedGitHubIssueExport {
  issueUrl: string;
  recordedContext: RecordedTriageContextInput;
}

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" ? (value as Record<string, unknown>) : {};
}

function readString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim().length > 0 ? value : undefined;
}

function isBotUser(user: Record<string, unknown>, fallbackAuthor: string | undefined): boolean {
  const type = readString(user.type);
  if (type?.toLowerCase() === "bot") return true;
  return /\[bot\]$/i.test(fallbackAuthor ?? "");
}

function normalizeComment(value: unknown): RecordedTriageComment {
  const row = asRecord(value);
  const user = asRecord(row.user);
  const author = readString(row.author) ?? readString(row.user_login) ?? readString(user.login);
  const body = readString(row.body) ?? "";
  const explicitBot = typeof row.isBot === "boolean" ? row.isBot : undefined;
  return {
    author,
    body,
    isBot: explicitBot ?? isBotUser(user, author),
  };
}

export function normalizeGitHubIssueExport(value: unknown): NormalizedGitHubIssueExport {
  const root = asRecord(value);
  const issue = asRecord(root.issue ?? root.pull_request ?? root.pr ?? root);
  const issueUrl = readString(issue.html_url) ?? readString(issue.url) ?? readString(root.html_url) ?? readString(root.url);
  if (!issueUrl) {
    throw new Error("Recorded GitHub export must include html_url or url");
  }

  const rawComments = Array.isArray(root.comments)
    ? root.comments
    : Array.isArray(issue.comments)
      ? issue.comments
      : [];

  return {
    issueUrl,
    recordedContext: {
      title: readString(issue.title),
      body: readString(issue.body),
      comments: rawComments.slice(0, 100).map(normalizeComment),
    },
  };
}

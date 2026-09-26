/**
 * Agent context: which coding-agent session a request belongs to and which project it works
 * on, so usage can be attributed per session and per project.
 *
 * Resolution order (first match wins):
 *   project  `x-omniroute-project` / `x-omniroute-project-repo` headers (set by the client's
 *            launch wrapper through ANTHROPIC_CUSTOM_HEADERS), then the working directory the
 *            agent announces in its prompt: Claude Code's "Primary working directory:" line in a
 *            `role: "system"` message (2.1.28x, mid-conversation-system beta), "Working
 *            directory:" in the top-level `system` field (older builds), or Codex's `<cwd>` inside
 *            `<environment_context>`.
 *   session  x-omniroute-session-id, x-claude-code-session-id, the Claude Code
 *            `metadata.user_id` JSON `session_id`, x-codex-session-id, x-opencode-session,
 *            `metadata.session_id`.
 *
 * Prompt text is untrusted and can be hundreds of KB, so scanning is bounded to the first
 * entries and the first MAX_SCAN_CHARS of each text, and uses indexOf rather than regexes.
 */

import { isFeatureFlagEnabled } from "@/shared/utils/featureFlags";

import { defaultLogger } from "../../utils/logger.ts";
import { extractAgentSessionTurn, type AgentSessionTurn } from "./agentSessionTurn.ts";
import { getHeaderValueCaseInsensitive } from "./headers.ts";

type HeaderSource = Record<string, unknown> | Headers | null | undefined;
type JsonRecord = Record<string, unknown>;

export interface AgentContext {
  client: string | null;
  clientSessionId: string | null;
  projectName: string | null;
  projectRepo: string | null;
  projectPath: string | null;
  projectSource: "header" | "path" | null;
  gitBranch: string | null;
}

const MAX_SCAN_CHARS = 64_000;
const MAX_SCANNED_ENTRIES = 12;
const MAX_PATH_CHARS = 512;
const MAX_NAME_CHARS = 120;
const MAX_REPO_CHARS = 200;
const MAX_SESSION_ID_CHARS = 128;
const MAX_USER_ID_JSON_CHARS = 2_000;
const WORKING_DIRECTORY_MARKERS = ["Primary working directory:", "Working directory:"];
const WORKTREE_SEGMENTS = ["/.claude/worktrees/", "/.worktrees/"];
const INSTRUCTION_ROLES: ReadonlySet<string> = new Set(["system", "developer"]);
const USER_ROLES: ReadonlySet<string> = new Set(["user"]);

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

/** Single line, no control characters, capped length; null when nothing usable is left. */
function cleanValue(value: unknown, maxChars: number): string | null {
  if (typeof value !== "string") return null;
  const cleaned = value.replace(/[\u0000-\u001f\u007f]/g, " ").trim();
  return cleaned ? cleaned.slice(0, maxChars) : null;
}

function readHeader(headers: HeaderSource, name: string, maxChars: number): string | null {
  return cleanValue(getHeaderValueCaseInsensitive(headers, name), maxChars);
}

function textOfContent(content: unknown): string {
  if (typeof content === "string") return content.slice(0, MAX_SCAN_CHARS);
  if (!Array.isArray(content)) return "";
  let text = "";
  for (const part of content) {
    const partText = asRecord(part).text;
    if (typeof partText === "string") text += `${partText.slice(0, MAX_SCAN_CHARS)}\n`;
    if (text.length >= MAX_SCAN_CHARS) break;
  }
  return text.slice(0, MAX_SCAN_CHARS);
}

/** Chat `messages` or Responses `input` entries, capped to the first few. */
function conversationEntries(body: JsonRecord): JsonRecord[] {
  const entries = Array.isArray(body.messages)
    ? body.messages
    : Array.isArray(body.input)
      ? body.input
      : [];
  return entries.slice(0, MAX_SCANNED_ENTRIES).map(asRecord);
}

function textsByRole(body: JsonRecord, roles: ReadonlySet<string>): string[] {
  return conversationEntries(body)
    .filter((entry) => roles.has(String(entry.role)))
    .map((entry) => textOfContent(entry.content))
    .filter(Boolean);
}

function lineAfterMarker(text: string, marker: string): string | null {
  const start = text.indexOf(marker);
  if (start < 0) return null;
  const valueStart = start + marker.length;
  const lineEnd = text.indexOf("\n", valueStart);
  return text.slice(valueStart, lineEnd < 0 ? undefined : lineEnd).trim() || null;
}

function textBetween(text: string, open: string, close: string): string | null {
  const start = text.indexOf(open);
  if (start < 0) return null;
  const end = text.indexOf(close, start + open.length);
  return end < 0 ? null : text.slice(start + open.length, end).trim() || null;
}

/** Absolute POSIX, home-relative or Windows drive paths only, so prose never matches. */
function looksLikePath(value: string): boolean {
  return value.startsWith("/") || value.startsWith("~") || /^[A-Za-z]:[\\/]/.test(value);
}

function asPath(candidate: string | null): string | null {
  return candidate && looksLikePath(candidate) ? cleanValue(candidate, MAX_PATH_CHARS) : null;
}

/** Claude Code / OpenCode announce the directory in system or developer text. */
function workingDirectoryFromInstructions(body: JsonRecord): string | null {
  const texts = [textOfContent(body.system), ...textsByRole(body, INSTRUCTION_ROLES)];
  for (const text of texts) {
    for (const marker of WORKING_DIRECTORY_MARKERS) {
      const path = asPath(lineAfterMarker(text, marker));
      if (path) return path;
    }
  }
  return null;
}

/**
 * Codex sends `<environment_context><cwd>…</cwd>` as a user message. Only that envelope is
 * trusted in user text, because the first user message also carries arbitrary files (CLAUDE.md).
 */
function workingDirectoryFromCodexEnvironment(body: JsonRecord): string | null {
  for (const text of textsByRole(body, USER_ROLES)) {
    const environment = textBetween(text, "<environment_context>", "</environment_context>");
    const path = environment ? asPath(textBetween(environment, "<cwd>", "</cwd>")) : null;
    if (path) return path;
  }
  return null;
}

/** Repository folder name for a working directory, skipping known worktree folders. */
export function projectNameFromPath(path: string): string | null {
  let normalized = path.replace(/\\/g, "/").replace(/\/+$/, "");
  for (const segment of WORKTREE_SEGMENTS) {
    const index = normalized.indexOf(segment);
    if (index > 0) normalized = normalized.slice(0, index);
  }
  const name = normalized.slice(normalized.lastIndexOf("/") + 1);
  return cleanValue(name, MAX_NAME_CHARS);
}

function sessionIdFromUserIdMetadata(metadata: JsonRecord): string | null {
  const userId = metadata.user_id;
  if (typeof userId !== "string" || userId.length > MAX_USER_ID_JSON_CHARS) return null;
  try {
    return cleanValue(asRecord(JSON.parse(userId)).session_id, MAX_SESSION_ID_CHARS);
  } catch {
    return null; // plain-string user ids are not session carriers
  }
}

function resolveClientSessionId(body: JsonRecord, headers: HeaderSource): string | null {
  const metadata = asRecord(body.metadata);
  const header = (name: string) => readHeader(headers, name, MAX_SESSION_ID_CHARS);
  return (
    header("x-omniroute-session-id") ||
    header("x-claude-code-session-id") ||
    sessionIdFromUserIdMetadata(metadata) ||
    header("x-codex-session-id") ||
    header("x-opencode-session") ||
    cleanValue(metadata.session_id, MAX_SESSION_ID_CHARS)
  );
}

function resolveClient(headers: HeaderSource): string | null {
  const userAgent = readHeader(headers, "user-agent", 200)?.toLowerCase();
  if (!userAgent) return null;
  if (userAgent.startsWith("claude-cli/") || userAgent.includes("claude-code")) {
    return "claude-code";
  }
  if (userAgent.startsWith("codex")) return "codex";
  if (userAgent.startsWith("opencode")) return "opencode";
  return cleanValue(userAgent.split(/[/\s]/)[0], 40);
}

function resolveGitBranch(body: JsonRecord): string | null {
  const firstUser = conversationEntries(body).find((entry) => USER_ROLES.has(String(entry.role)));
  if (!firstUser) return null;
  return cleanValue(lineAfterMarker(textOfContent(firstUser.content), "Current branch:"), 200);
}

export function extractAgentContext(body: unknown, headers: HeaderSource): AgentContext {
  const record = asRecord(body);
  const headerProject = readHeader(headers, "x-omniroute-project", MAX_NAME_CHARS);
  const projectPath =
    workingDirectoryFromInstructions(record) || workingDirectoryFromCodexEnvironment(record);
  const pathProject = projectPath ? projectNameFromPath(projectPath) : null;
  const projectName = headerProject || pathProject;
  return {
    client: resolveClient(headers),
    clientSessionId: resolveClientSessionId(record, headers),
    projectName,
    projectRepo: readHeader(headers, "x-omniroute-project-repo", MAX_REPO_CHARS),
    projectPath,
    projectSource: headerProject ? "header" : pathProject ? "path" : null,
    gitBranch: resolveGitBranch(record),
  };
}

/** Drops everything read from prompt text, keeping only header-supplied identifiers. */
export function withoutPromptDerivedFields(context: AgentContext): AgentContext {
  const fromHeader = context.projectSource === "header";
  return {
    ...context,
    projectName: fromHeader ? context.projectName : null,
    projectSource: fromHeader ? "header" : null,
    projectPath: null,
    gitBranch: null,
  };
}

/**
 * Agent context for usage attribution. Keys with `noLog` never persist prompt-derived fields
 * (working directory, branch); explicit header identifiers are still kept.
 */
export function resolveUsageAgentContext(
  body: unknown,
  headers: HeaderSource,
  apiKeyInfo: { noLog?: boolean } | null | undefined
): AgentContext {
  const context = extractAgentContext(body, headers);
  return apiKeyInfo?.noLog === true ? withoutPromptDerivedFields(context) : context;
}

export function hasAgentIdentity(
  context: AgentContext | null | undefined
): context is AgentContext {
  return Boolean(context?.clientSessionId || context?.projectName);
}

/** One key per client request: every combo or fallback attempt reuses the raw request body. */
const requestKeysByRawBody = new WeakMap<object, string>();

function sessionTurnRequestKey(rawBody: unknown): string | null {
  if (!rawBody || typeof rawBody !== "object") return null;
  let key = requestKeysByRawBody.get(rawBody);
  if (!key) {
    key = globalThis.crypto.randomUUID();
    requestKeysByRawBody.set(rawBody, key);
  }
  return key;
}

export interface SessionTurnInput {
  /** The client's request as received; its body is the prompt source and the attempt key. */
  clientRawRequest?: { body?: unknown } | null;
  /** Pipeline body, used only when there is no raw client body. */
  body: unknown;
  /** Alternative representations of the client-visible reply (see extractAgentSessionTurn). */
  responses: readonly unknown[];
  /** Streaming completion status; a stream that did not end with 200 stores no turn. */
  streamStatus?: number;
  agentContext: AgentContext | null | undefined;
  apiKeyInfo: { noLog?: boolean } | null | undefined;
}

/**
 * Simplified conversation turn to store for the request's agent session, or null. Stored only
 * when AGENT_SESSION_MESSAGES_ENABLED is on, the request has an agent identity, the key is not
 * `noLog` and a streamed reply finished with 200. The prompt comes from the raw client body
 * (compression and compaction rewrite the pipeline body), like call logs.
 */
export function resolveSessionTurn(input: SessionTurnInput): AgentSessionTurn | null {
  if (!hasAgentIdentity(input.agentContext) || input.apiKeyInfo?.noLog === true) return null;
  if (input.streamStatus !== undefined && input.streamStatus !== 200) return null;
  if (!isFeatureFlagEnabled("AGENT_SESSION_MESSAGES_ENABLED")) return null;
  try {
    const rawBody = input.clientRawRequest?.body ?? input.body;
    const turn = extractAgentSessionTurn(rawBody, ...input.responses);
    return turn
      ? { ...turn, requestKey: sessionTurnRequestKey(input.clientRawRequest?.body) }
      : null;
  } catch (error) {
    defaultLogger.debug("AGENT_SESSION", "session turn extraction failed", {
      error: error instanceof Error ? error.message : String(error),
    });
    return null;
  }
}

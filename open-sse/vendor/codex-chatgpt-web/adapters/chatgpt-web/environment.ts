/* Adapted from miuuyy/codex-chatgpt-web v4.0.7 commit b59d7dc51b84fb1f465ff1d00f5207f3b2b4a494 (MIT). */
import { homedir } from "node:os";
import { isAbsolute, join, relative, resolve, sep } from "node:path";
import {
  isReadableCompactionSummaryText,
  OPAQUE_COMPACTION_NOTE,
} from "../../responses/compaction";
import type { CodexContentPart, CodexParsedRequest, CodexTool } from "../../types";

export type ChatGptSandboxPolicy =
  | { type: "dangerFullAccess" }
  | { type: "readOnly"; networkAccess: boolean }
  | { type: "workspaceWrite"; writableRoots: string[]; networkAccess: boolean };

export interface ChatGptTurnEnvironment {
  cwd: string;
  roots: string[];
  writableRoots: string[];
  sandboxPolicy: ChatGptSandboxPolicy;
  tools: CodexTool[];
}

export interface ChatGptTurnIdentity {
  threadId?: string;
  turnId?: string;
  parentThreadId?: string;
  agentName?: string;
  subagentKind?: string;
  promptCacheKey?: string;
}

export interface ChatGptThreadSpawnLineage {
  threadId: string;
  parentThreadId: string;
  agentName: string;
  sandboxType: ChatGptSandboxPolicy["type"];
  workspaceRoots: string[];
}

export interface ChatGptTurnUserRevision {
  content: unknown;
  turnId?: string;
}

export const CHATGPT_TURN_REVISION_CONFLICT_MESSAGE =
  "ChatGPT web current user message conflicts with native Codex turn_id metadata";

export class MissingTrustedCodexEnvironmentError extends Error {
  constructor(field: string) {
    super(`ChatGPT web turn is missing ${field} in trusted Codex environment context`);
    this.name = "MissingTrustedCodexEnvironmentError";
  }
}

function contentText(content: string | CodexContentPart[]): string {
  if (typeof content === "string") return content;
  return content
    .filter((part) => part.type === "text")
    .map((part) => part.text)
    .join("\n");
}

function record(value: unknown): Record<string, unknown> | undefined {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : undefined;
}

function pathIdentity(value: string): string {
  const normalized = resolve(value);
  return process.platform === "win32" ? normalized.toLowerCase() : normalized;
}

function clientTurnMetadata(parsed: CodexParsedRequest): Record<string, unknown> | undefined {
  const body = record(parsed._rawBody);
  const metadata = record(body?.client_metadata);
  const raw = metadata?.["x-codex-turn-metadata"];
  if (typeof raw === "string") {
    try {
      return record(JSON.parse(raw));
    } catch {
      return undefined;
    }
  }
  return record(raw);
}

function itemTurnId(value: unknown): string | undefined {
  const turnId = record(record(value)?.internal_chat_message_metadata_passthrough)?.turn_id;
  return typeof turnId === "string" ? turnId : undefined;
}

function rawMessageText(value: Record<string, unknown>): string {
  if (typeof value.content === "string") return value.content;
  if (!Array.isArray(value.content)) return "";
  return value.content
    .map((part) => record(part)?.text)
    .filter((text): text is string => typeof text === "string")
    .join("\n");
}

function contextualUserMessage(value: Record<string, unknown>): boolean {
  const text = rawMessageText(value).trim();
  return (
    /^<environment_context>[\s\S]*<\/environment_context>$/.test(text) ||
    /^<subagent_notification>[\s\S]*<\/subagent_notification>$/.test(text) ||
    isReadableCompactionSummaryText(text) ||
    text === OPAQUE_COMPACTION_NOTE
  );
}

function isTurnAbortedNotice(value: Record<string, unknown>): boolean {
  return /^<turn_aborted>[\s\S]*<\/turn_aborted>$/.test(rawMessageText(value).trim());
}

/**
 * Return the latest real user instruction owned by the current native Codex turn.
 *
 * Provider rounds replay the same instruction and steering appends a newer one. Remote
 * compaction uses this revision to identify and stop the superseded browser response; once Codex
 * installs the replacement history, the immediate continuation starts a fresh browser response
 * under the same logical task revision.
 */
export function extractChatGptTurnUserRevision(parsed: CodexParsedRequest): unknown {
  const turnId = extractChatGptTurnIdentity(parsed).turnId;
  if (!turnId) {
    throw new Error(
      "ChatGPT web requires native Codex turn_id metadata for browser-session replay"
    );
  }
  const revision = latestChatGptTurnUserRevision(parsed, turnId);
  if (!revision) {
    throw new Error("ChatGPT web requires a current-turn user message for browser-session replay");
  }
  if (revision.turnId !== undefined && revision.turnId !== turnId) {
    throw new Error(CHATGPT_TURN_REVISION_CONFLICT_MESSAGE);
  }
  return revision.content;
}

function latestChatGptTurnUserRevision(
  parsed: CodexParsedRequest,
  expectedTurnId?: string
): ChatGptTurnUserRevision | undefined {
  const body = record(parsed._rawBody);
  const input = Array.isArray(body?.input) ? body.input : [];
  for (let index = input.length - 1; index >= 0; index -= 1) {
    const item = record(input[index]);
    if (item?.type !== "message" || item.role !== "user") continue;
    const messageTurnId = itemTurnId(item);
    // Codex appends an abort report as a user-shaped item carrying the interrupted turn's id. Only
    // suppress that synthetic notice when its metadata proves it belongs to a different turn; a
    // human is still allowed to submit the same XML-looking text as their current instruction.
    if (
      isTurnAbortedNotice(item) &&
      expectedTurnId !== undefined &&
      messageTurnId !== undefined &&
      messageTurnId !== expectedTurnId
    )
      continue;
    if (contextualUserMessage(item)) continue;
    const serverOwnedId = typeof item.id === "string" && item.id.length > 0;
    if (messageTurnId === undefined && !serverOwnedId) continue;
    return { content: item.content, ...(messageTurnId ? { turnId: messageTurnId } : {}) };
  }
  return undefined;
}

/** The human instruction summarized by a remote compaction request belongs to an earlier turn. */
export function extractChatGptCompactionSourceRevision(
  parsed: CodexParsedRequest
): ChatGptTurnUserRevision {
  if (!parsed._compactionRequest) {
    throw new Error("ChatGPT web compaction source requires a compaction request");
  }
  const revision = latestChatGptTurnUserRevision(parsed, extractChatGptTurnIdentity(parsed).turnId);
  if (!revision) throw new Error("ChatGPT web compaction requires a source user message");
  return revision;
}

function environmentBeforeUser(
  input: unknown[],
  userIndex: number,
  expectedTurnId?: string
): string | undefined {
  if (userIndex <= 0) return undefined;
  const user = record(input[userIndex]);
  if (user?.type !== "message" || user.role !== "user") return undefined;

  const userTurnId = itemTurnId(user);
  if (!userTurnId || (expectedTurnId && userTurnId !== expectedTurnId)) return undefined;

  let candidateIndex = userIndex - 1;
  let candidate = record(input[candidateIndex]);
  while (candidate?.type === "message" && candidate.role === "developer") {
    const developerTurnId = itemTurnId(candidate);
    if (developerTurnId !== userTurnId) return undefined;
    candidateIndex -= 1;
    candidate = record(input[candidateIndex]);
  }
  if (candidate?.type !== "message" || candidate.role !== "user") return undefined;

  const candidateTurnId = itemTurnId(candidate);
  if (candidateTurnId !== userTurnId) return undefined;

  const content = Array.isArray(candidate.content) ? candidate.content : [];
  for (const part of content) {
    const text = record(part)?.text;
    if (typeof text !== "string") continue;
    const trimmed = text.trim();
    if (/^<environment_context>[\s\S]*<\/environment_context>$/.test(trimmed)) return trimmed;
  }
  return undefined;
}

function sandboxTypeFromEnvironment(text: string): ChatGptSandboxPolicy["type"] | undefined {
  const unrestricted =
    /<permission_profile\s+type=["']disabled["'][^>]*>[\s\S]*?<file_system\s+type=["']unrestricted["'][^>]*\/?\s*>/i.test(
      text
    ) || /<sandbox_mode>danger-full-access<\/sandbox_mode>/i.test(text);
  const restrictedFileSystem =
    /<permission_profile\s+type=["']managed["'][^>]*>[\s\S]*?<file_system\s+type=["']restricted["'][^>]*>([\s\S]*?)<\/file_system>/i.exec(
      text
    );
  const restrictedHasWriteEntry =
    restrictedFileSystem !== null &&
    /<entry\s+access=["']write["'][^>]*>/i.test(restrictedFileSystem[1]!);
  const workspaceWrite =
    /<sandbox_mode>workspace-write<\/sandbox_mode>/i.test(text) || restrictedHasWriteEntry;
  const readOnly =
    /<sandbox_mode>read-only<\/sandbox_mode>/i.test(text) ||
    (restrictedFileSystem !== null && !restrictedHasWriteEntry);
  if (Number(unrestricted) + Number(workspaceWrite) + Number(readOnly) !== 1) return undefined;
  return unrestricted ? "dangerFullAccess" : workspaceWrite ? "workspaceWrite" : "readOnly";
}

type ChatGptMetadataSandbox = ChatGptSandboxPolicy["type"] | "platform";

function canonicalSandboxMetadata(metadata: Record<string, unknown>): unknown {
  return metadata.sandbox_mode ?? metadata.sandbox;
}

function sandboxTypeFromMetadata(value: unknown): ChatGptMetadataSandbox | undefined {
  if (typeof value !== "string") return undefined;
  switch (value.trim().toLowerCase().replaceAll("_", "-")) {
    case "none":
    case "unrestricted":
    case "danger-full-access":
      return "dangerFullAccess";
    case "workspace-write":
      return "workspaceWrite";
    case "read-only":
      return "readOnly";
    // Codex CLI reports the host sandbox mechanism here, while the XML envelope carries the
    // effective filesystem policy. Keep the platform tag as a separate class and validate the
    // actual policy below instead of guessing write access from the platform name.
    case "windows-sandbox":
    case "windows-elevated":
    case "seatbelt":
    case "seccomp":
      return "platform";
    default:
      return undefined;
  }
}

function sandboxMetadataMatchesEnvironment(
  metadataValue: unknown,
  environmentText: string
): boolean {
  const metadataSandbox = sandboxTypeFromMetadata(metadataValue);
  const environmentSandbox = sandboxTypeFromEnvironment(environmentText);
  if (!metadataSandbox || !environmentSandbox) return false;
  if (metadataSandbox === "platform") {
    return environmentSandbox === "workspaceWrite" || environmentSandbox === "readOnly";
  }
  return metadataSandbox === environmentSandbox;
}

function environmentMatchesCanonicalMetadata(
  environmentText: string,
  metadata: Record<string, unknown>,
  requireMetadataBoundRoots: boolean
): boolean {
  const metadataSandboxValue = canonicalSandboxMetadata(metadata);
  const metadataSandbox = sandboxTypeFromMetadata(metadataSandboxValue);
  if (!metadataSandbox) return false;
  const workspaces = record(metadata.workspaces);
  const metadataRoots = workspaces ? Object.keys(workspaces) : [];
  if (metadataRoots.some((path) => !isAbsolute(path))) return false;
  const normalizedMetadataRoots = [...new Set(metadataRoots.map(pathIdentity))];

  let cwdMatches: string[];
  try {
    cwdMatches = environmentCwdMatches(environmentText, normalizedMetadataRoots).map((value) =>
      decodeXmlText(value.trim())
    );
  } catch {
    return false;
  }
  if (cwdMatches.length !== 1 || !isAbsolute(cwdMatches[0]!)) return false;
  const rootMatches = [
    ...environmentText.matchAll(/<workspace_roots>[\s\S]*?<\/workspace_roots>/g),
  ].flatMap((section) =>
    [...section[0].matchAll(/<root>([^<]+)<\/root>/g)].map((match) =>
      decodeXmlText(match[1]!.trim())
    )
  );
  const declaredRootValues = rootMatches.length > 0 ? rootMatches : cwdMatches;
  if (declaredRootValues.some((path) => !isAbsolute(path))) return false;
  const declaredRoots = [...new Set(declaredRootValues.map(pathIdentity))];
  const cwd = pathIdentity(cwdMatches[0]!);
  if (
    normalizedMetadataRoots.length > 0 &&
    !normalizedMetadataRoots.some((root) => matchesPath(root, cwd))
  )
    return false;
  if (
    requireMetadataBoundRoots &&
    (normalizedMetadataRoots.length === 0 ||
      declaredRoots.some(
        (root) =>
          !normalizedMetadataRoots.some((metadataRoot) => matchesPath(metadataRoot, root)) &&
          !isCurrentThreadVisualizationRoot(root, metadata)
      ))
  )
    return false;
  if (!declaredRoots.some((root) => matchesPath(root, cwd))) return false;
  return sandboxMetadataMatchesEnvironment(metadataSandboxValue, environmentText);
}

function isCurrentThreadVisualizationRoot(
  path: string,
  metadata: Record<string, unknown>
): boolean {
  const threadId = typeof metadata.thread_id === "string" ? metadata.thread_id.trim() : "";
  if (!threadId) return false;

  // Codex advertises its task-scoped visualization output directory in workspace_roots but omits
  // it from Git-oriented turn metadata. Authenticate that one auxiliary shape by both its private
  // Codex home and current thread id; arbitrary roots and another task's output remain untrusted.
  const configuredCodexHome = process.env.CODEX_HOME?.trim();
  const codexHome = resolve(configuredCodexHome || join(homedir(), ".codex"));
  const visualizationBase = pathIdentity(join(codexHome, "visualizations"));
  const rel = relative(visualizationBase, pathIdentity(path));
  if (!rel || rel.startsWith("..") || isAbsolute(rel)) return false;

  const parts = rel.split(sep);
  const expectedThreadId = process.platform === "win32" ? threadId.toLowerCase() : threadId;
  return (
    parts.length === 4 &&
    /^\d{4}$/.test(parts[0]!) &&
    /^(?:0[1-9]|1[0-2])$/.test(parts[1]!) &&
    /^(?:0[1-9]|[12]\d|3[01])$/.test(parts[2]!) &&
    parts[3] === expectedThreadId
  );
}

function canonicalMetadataEnvironmentBeforeUser(
  input: unknown[],
  userIndex: number,
  metadata: Record<string, unknown> | undefined,
  requireMetadataBoundRoots = false
): string | undefined {
  if (userIndex <= 0 || !metadata) return undefined;
  const metadataTurnId = typeof metadata.turn_id === "string" ? metadata.turn_id.trim() : "";
  const metadataSandbox = sandboxTypeFromMetadata(canonicalSandboxMetadata(metadata));
  if (!metadataTurnId || !metadataSandbox) return undefined;

  const user = record(input[userIndex]);
  if (user?.type !== "message" || user.role !== "user" || typeof user.id !== "string" || !user.id)
    return undefined;
  const userTurnId = itemTurnId(user);
  if (userTurnId !== undefined && userTurnId !== metadataTurnId) return undefined;

  let candidateIndex = userIndex - 1;
  let candidate = record(input[candidateIndex]);
  while (candidate?.type === "message" && candidate.role === "developer") {
    const developerTurnId = itemTurnId(candidate);
    const serverOwnedId = typeof candidate.id === "string" && candidate.id.length > 0;
    if (developerTurnId === undefined ? !serverOwnedId : developerTurnId !== metadataTurnId)
      return undefined;
    candidateIndex -= 1;
    candidate = record(input[candidateIndex]);
  }
  if (
    candidate?.type !== "message" ||
    candidate.role !== "user" ||
    typeof candidate.id !== "string" ||
    !candidate.id
  )
    return undefined;
  const candidateTurnId = itemTurnId(candidate);
  if (candidateTurnId !== undefined && candidateTurnId !== metadataTurnId) return undefined;

  const content = Array.isArray(candidate.content) ? candidate.content : [];
  for (const part of content) {
    const text = record(part)?.text;
    if (typeof text !== "string") continue;
    const trimmed = text.trim();
    if (!/^<environment_context>[\s\S]*<\/environment_context>$/.test(trimmed)) continue;
    // Current Codex stamps server-owned item IDs but not per-item turn IDs on the initial request,
    // and canonical workspaces contains Git enrichment rather than filesystem authority. Bind the
    // structurally adjacent context (allowing only provenance-checked developer messages) to
    // canonical turn/sandbox metadata; when Git roots are present, require the primary cwd to agree
    // with them as an additional check.
    if (!environmentMatchesCanonicalMetadata(trimmed, metadata, requireMetadataBoundRoots))
      continue;
    return trimmed;
  }
  return undefined;
}

function hasAssistantOutputBetween(
  input: unknown[],
  startIndex: number,
  endIndex: number
): boolean {
  for (let index = startIndex; index < endIndex; index += 1) {
    const item = record(input[index]);
    if (!item) continue;
    if (item.type === "message" && item.role === "assistant") return true;
    if (item.type === "function_call" || item.type === "reasoning") return true;
  }
  return false;
}

function rawEnvironmentText(parsed: CodexParsedRequest): string | undefined {
  const body = record(parsed._rawBody);
  const input = Array.isArray(body?.input) ? body.input : [];
  let activeUserIndex = -1;
  for (let index = input.length - 1; index >= 0; index -= 1) {
    if (record(input[index])?.role === "user") {
      activeUserIndex = index;
      break;
    }
  }
  const turnId = clientTurnMetadata(parsed)?.turn_id;
  const currentByTurn = environmentBeforeUser(
    input,
    activeUserIndex,
    typeof turnId === "string" ? turnId : undefined
  );
  if (currentByTurn) return currentByTurn;

  const current = canonicalMetadataEnvironmentBeforeUser(
    input,
    activeUserIndex,
    clientTurnMetadata(parsed)
  );
  if (current) return current;

  // A skill invocation appends another server-owned user item after the real instruction. Recover
  // the earlier current-turn environment/prompt pair only through canonical metadata, and bind all
  // declared roots to metadata workspaces so user-authored XML cannot widen filesystem authority.
  const metadata = clientTurnMetadata(parsed);
  for (let index = activeUserIndex - 1; index > 0; index -= 1) {
    const sameTurn = canonicalMetadataEnvironmentBeforeUser(input, index, metadata, true);
    if (sameTurn) return sameTurn;
  }

  const replayPrefixLen = Math.min(parsed._replayPrefixLen ?? 0, input.length);
  for (let index = replayPrefixLen - 1; index > 0; index -= 1) {
    const replayed = environmentBeforeUser(input, index);
    if (replayed) return replayed;
  }

  // Codex can resume a local task by explicitly replaying its native transcript instead of
  // sending previous_response_id. In that shape, accept a historical environment/user pair only
  // when both items carry the same native turn_id and either completed assistant output separates
  // that turn from the active user or the complete historical pair is server-owned and its
  // filesystem authority still matches the current thread's canonical workspace/sandbox metadata.
  // A user-authored <environment_context> inside one chat message cannot satisfy this structure.
  const currentTurnId = typeof turnId === "string" ? turnId : undefined;
  const currentThreadId =
    typeof metadata?.thread_id === "string" && metadata.thread_id.trim()
      ? metadata.thread_id
      : undefined;
  const activeUser = record(input[activeUserIndex]);
  const activeUserOwned =
    activeUser?.type === "message" &&
    activeUser.role === "user" &&
    typeof activeUser.id === "string" &&
    activeUser.id.length > 0 &&
    itemTurnId(activeUser) === currentTurnId;
  if (currentTurnId && itemTurnId(activeUser) === currentTurnId) {
    for (let index = activeUserIndex - 1; index > 0; index -= 1) {
      const historicalUser = record(input[index]);
      const historicalTurnId = itemTurnId(historicalUser);
      if (!historicalTurnId || historicalTurnId === currentTurnId) continue;
      const historical = environmentBeforeUser(input, index);
      if (!historical) continue;
      if (hasAssistantOutputBetween(input, index + 1, activeUserIndex)) return historical;
      if (!currentThreadId || !metadata || !activeUserOwned) continue;
      const bounded = canonicalMetadataEnvironmentBeforeUser(
        input,
        index,
        { ...metadata, turn_id: historicalTurnId, sandbox: canonicalSandboxMetadata(metadata) },
        true
      );
      if (bounded === historical) return bounded;
    }
  }
  return undefined;
}

function clientMetadataWorkspaceRoots(parsed: CodexParsedRequest): string[] {
  const workspaces = record(clientTurnMetadata(parsed)?.workspaces);
  if (!workspaces) return [];
  const roots = Object.keys(workspaces);
  if (roots.some((path) => !isAbsolute(path))) return [];
  return [...new Set(roots.map(pathIdentity))];
}

function trustedEnvironmentText(parsed: CodexParsedRequest): string {
  const raw = rawEnvironmentText(parsed);
  if (raw) return raw;
  const system = parsed.context.systemPrompt ?? [];
  const developer = parsed.context.messages
    .filter((message) => message.role === "developer")
    .map((message) => contentText(message.content));
  return [...system, ...developer].join("\n");
}

function decodeXmlText(value: string): string {
  return value
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&amp;", "&");
}

function environmentCwdMatches(text: string, preferredRoots: string[] = []): string[] {
  const sections = [...text.matchAll(/<environments>([\s\S]*?)<\/environments>/gi)];
  if (sections.length === 0) {
    return [...text.matchAll(/<cwd>([^<]+)<\/cwd>/gi)].map((match) => match[1] ?? "");
  }
  if (sections.length !== 1) return [];

  const section = sections[0]!;
  const outside = text.replace(section[0], "");
  if (/<cwd>[^<]*<\/cwd>/i.test(outside)) return [];

  const environments = [
    ...section[1]!.matchAll(/<environment\b([^>]*)>([\s\S]*?)<\/environment>/gi),
  ];
  const primary = environments.filter((match) =>
    /\bprimary\s*=\s*["']true["']/i.test(match[1] ?? "")
  );
  if (primary.length === 1) {
    return [...primary[0]![2]!.matchAll(/<cwd>([^<]+)<\/cwd>/gi)].map((match) => match[1] ?? "");
  }
  if (primary.length > 1) return [];

  // Codex 0.146.x emitted multiple environments without a primary attribute. Only use that
  // legacy shape when canonical workspace metadata identifies one candidate; never pick by order.
  const candidates = environments.flatMap((environment) => {
    const cwdMatches = [...environment[2]!.matchAll(/<cwd>([^<]+)<\/cwd>/gi)].map(
      (match) => match[1] ?? ""
    );
    return cwdMatches.length === 1 ? cwdMatches : [];
  });
  if (candidates.length === 1) return candidates;
  if (preferredRoots.length === 0) return [];

  const exact = candidates.filter((candidate) =>
    preferredRoots.some((root) => pathIdentity(root) === pathIdentity(candidate))
  );
  if (exact.length === 1) return exact;
  const contained = candidates.filter((candidate) =>
    preferredRoots.some((root) => matchesPath(root, candidate))
  );
  return contained.length === 1 ? contained : [];
}

function uniqueAbsolutePaths(values: string[], field: string): string[] {
  const decoded = values.map((value) => decodeXmlText(value.trim()));
  if (decoded.length === 0) throw new MissingTrustedCodexEnvironmentError(field);
  if (decoded.some((path) => !isAbsolute(path)))
    throw new Error(`ChatGPT web ${field} must contain absolute paths`);
  const unique = new Map<string, string>();
  for (const path of decoded.map((value) => resolve(value))) {
    if (!unique.has(pathIdentity(path))) unique.set(pathIdentity(path), path);
  }
  return [...unique.values()];
}

function matchesPath(root: string, path: string): boolean {
  const rel = relative(pathIdentity(root), pathIdentity(path));
  return rel === "" || (!rel.startsWith("..") && !isAbsolute(rel));
}

export function extractChatGptTurnEnvironment(parsed: CodexParsedRequest): ChatGptTurnEnvironment {
  const text = trustedEnvironmentText(parsed);
  const cwdMatches = environmentCwdMatches(text, clientMetadataWorkspaceRoots(parsed));
  const cwdCandidates = uniqueAbsolutePaths(cwdMatches, "cwd");
  if (cwdCandidates.length !== 1)
    throw new Error("ChatGPT web turn has conflicting trusted Codex cwd values");
  const cwd = cwdCandidates[0]!;

  const rootMatches = [...text.matchAll(/<workspace_roots>[\s\S]*?<\/workspace_roots>/g)].flatMap(
    (section) => [...section[0].matchAll(/<root>([^<]+)<\/root>/g)].map((match) => match[1] ?? "")
  );
  const roots =
    rootMatches.length > 0 ? uniqueAbsolutePaths(rootMatches, "workspace_roots") : [cwd];
  if (!roots.some((root) => matchesPath(root, cwd))) {
    throw new Error("ChatGPT web cwd is outside the trusted Codex workspace roots");
  }

  const sandboxType = sandboxTypeFromEnvironment(text);
  const networkAccess =
    /<network_access>enabled<\/network_access>/i.test(text) ||
    /network access is enabled/i.test(text);

  if (!sandboxType) {
    throw new Error("ChatGPT web turn requires one explicit trusted Codex sandbox mode");
  }
  if (sandboxType === "dangerFullAccess") {
    return {
      cwd,
      roots,
      writableRoots: roots,
      sandboxPolicy: { type: "dangerFullAccess" },
      tools: parsed.context.tools ?? [],
    };
  }
  if (sandboxType === "workspaceWrite") {
    return {
      cwd,
      roots,
      writableRoots: roots,
      sandboxPolicy: { type: "workspaceWrite", writableRoots: roots, networkAccess },
      tools: parsed.context.tools ?? [],
    };
  }
  return {
    cwd,
    roots,
    writableRoots: [],
    sandboxPolicy: { type: "readOnly", networkAccess },
    tools: parsed.context.tools ?? [],
  };
}

export function extractChatGptTurnIdentity(parsed: CodexParsedRequest): ChatGptTurnIdentity {
  const body = record(parsed._rawBody);
  const metadata = clientTurnMetadata(parsed);
  return {
    ...(typeof metadata?.thread_id === "string" ? { threadId: metadata.thread_id } : {}),
    ...(typeof metadata?.turn_id === "string" ? { turnId: metadata.turn_id } : {}),
    ...(typeof metadata?.parent_thread_id === "string"
      ? { parentThreadId: metadata.parent_thread_id }
      : {}),
    ...(typeof metadata?.agent_name === "string" ? { agentName: metadata.agent_name } : {}),
    ...(typeof metadata?.subagent_kind === "string"
      ? { subagentKind: metadata.subagent_kind }
      : {}),
    ...(typeof body?.prompt_cache_key === "string"
      ? { promptCacheKey: body.prompt_cache_key }
      : {}),
  };
}

/**
 * Return the canonical parent link carried by a native Codex thread-spawn request.
 * This is deliberately stricter than generic metadata parsing: only a real child turn with an
 * agent path, explicit turn purpose, sandbox policy, and absolute workspace evidence can inherit
 * filesystem authority from a previously verified parent thread.
 */
export function extractChatGptThreadSpawnLineage(
  parsed: CodexParsedRequest
): ChatGptThreadSpawnLineage | undefined {
  const metadata = clientTurnMetadata(parsed);
  if (!metadata || metadata.request_kind !== "turn" || metadata.subagent_kind !== "thread_spawn")
    return undefined;
  const threadId = typeof metadata.thread_id === "string" ? metadata.thread_id.trim() : "";
  const parentThreadId =
    typeof metadata.parent_thread_id === "string" ? metadata.parent_thread_id.trim() : "";
  const agentName = typeof metadata.agent_name === "string" ? metadata.agent_name.trim() : "";
  if (!threadId || !parentThreadId || threadId === parentThreadId || !/^\/root\/.+/.test(agentName))
    return undefined;

  const sandboxType = sandboxTypeFromMetadata(canonicalSandboxMetadata(metadata));
  if (!sandboxType || sandboxType === "platform") return undefined;
  const workspaces = record(metadata.workspaces);
  const workspacePaths = workspaces ? Object.keys(workspaces) : [];
  if (workspacePaths.some((path) => !isAbsolute(path))) return undefined;
  const workspaceRoots = [...new Set(workspacePaths.map((path) => resolve(path)))];
  return { threadId, parentThreadId, agentName, sandboxType, workspaceRoots };
}

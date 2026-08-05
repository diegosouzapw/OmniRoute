/* Adapted from miuuyy/codex-chatgpt-web commit 55592fca0ba19a27f1b769cec8fff61ff340a785 (MIT). */
export interface CodexParsedRequest {
  modelId: string;
  previousResponseId?: string;
  context: CodexContext;
  stream: boolean;
  options: CodexRequestOptions;
  _rawBody?: unknown;
  /** Number of leading raw input items restored from local previous_response_id state. */
  _replayPrefixLen?: number;
  /** True when the proxy expanded a previous_response_id request into a full input replay. */
  _previousResponseInputExpanded?: boolean;
  /** Stable upstream client thread identity, used only to derive provider-scoped continuation ids. */
  _clientThreadId?: string;
  /**
   * The hosted `{type:"web_search", ...}` tool config, stashed when Codex enables web search. Routed
   * (non-OpenAI) providers can't run it server-side, so the proxy re-exposes it as a function tool and
   * executes searches via the gpt-5.4-mini sidecar (see src/web-search). Absent when not requested.
   */
  _webSearch?: Record<string, unknown>;
  /**
   * True when Codex requested structured output (`text.format` = json_schema/json_object). The
   * web-search tool_result is then rendered as compact JSON instead of markdown prose, so its
   * answer/"Sources:" text can't bleed into and corrupt the model's schema-constrained output.
   */
  _structuredOutput?: boolean;
  /**
   * True when the input carried `{type:"compaction_trigger"}` — Codex remote compaction v2 asking
   * this turn to produce a `{type:"compaction"}` output item. Routed adapters can't natively;
   * the server runs the model as a summarizer and the bridge emits a synthetic compaction item
   * (see src/responses/compaction.ts).
   */
  _compactionRequest?: boolean;
  /**
   * True when the current request newly introduced a stored compaction summary/marker. Historical
   * markers restored by previous_response_id expansion were already acknowledged and do not reset
   * provider-private continuation caches again on every later turn.
   */
  _contextCompactionBoundary?: boolean;
}

export interface CodexContext {
  systemPrompt?: string[];
  messages: CodexMessage[];
  tools?: CodexTool[];
}

export type CodexMessage =
  CodexUserMessage | CodexAssistantMessage | CodexDeveloperMessage | CodexToolResultMessage;

export interface CodexUserMessage {
  role: "user";
  content: string | CodexContentPart[];
  timestamp: number;
}

export interface CodexAssistantMessage {
  role: "assistant";
  content: CodexAssistantContentPart[];
  /** Responses message phase, preserved when replaying translated provider output. */
  phase?: CodexMessagePhase;
  model?: string;
  timestamp: number;
}

export interface CodexDeveloperMessage {
  role: "developer";
  content: string | CodexContentPart[];
  timestamp: number;
}

export interface CodexToolResultMessage {
  role: "toolResult";
  toolCallId: string;
  toolName: string;
  /** MCP namespace from the originating tool call, if any. */
  toolNamespace?: string;
  /** Text, or content parts when a tool (e.g. Codex view_image) returns an image in its output. */
  content: string | CodexContentPart[];
  /** True when the Responses result contained opaque encrypted output this browser bridge cannot translate. */
  containsEncryptedContent?: boolean;
  isError: boolean;
  timestamp: number;
}

export interface CodexTextContent {
  type: "text";
  text: string;
}

export interface CodexImageContent {
  type: "image";
  /** A `data:` URL (base64) or a remote https URL — passed through from Codex verbatim, NEVER inlined as text. */
  imageUrl: string;
  /** Fidelity hint from Codex: "low" | "high" | "auto". */
  detail?: string;
}

/** A user/developer message content part: text or an image (vision). */
export type CodexContentPart = CodexTextContent | CodexImageContent;

export interface CodexThinkingContent {
  type: "thinking";
  thinking: string;
  signature?: string;
  itemId?: string;
  /** Raw opaque reasoning blocks to replay verbatim (order preserved). */
  redacted?: string[];
}

export interface CodexToolCall {
  type: "toolCall";
  id: string;
  name: string;
  arguments: Record<string, unknown>;
  customWireName?: string;
  thoughtSignature?: string;
  /** MCP namespace (e.g. "mcp__context7") when this call targets a namespaced tool. */
  namespace?: string;
}

export type CodexAssistantContentPart = CodexTextContent | CodexThinkingContent | CodexToolCall;

export interface CodexTool {
  name: string;
  description: string;
  parameters: Record<string, unknown>;
  strict?: boolean;
  /** MCP namespace (e.g. "mcp__context7") for tools flattened out of a Responses "namespace" tool. */
  namespace?: string;
  /** Freeform/custom tool (e.g. apply_patch): the model's call must be relayed as a custom_tool_call. */
  freeform?: boolean;
  /** Client-executed tool discovery (tool_search): the model's call must be relayed as a tool_search_call. */
  toolSearch?: boolean;
  /** Tool definition restored from a prior tool_search output; transports may prioritize it when catalogs are bounded. */
  loadedFromToolSearch?: boolean;
  /** Synthetic web_search tool: the model's call is executed by the gpt-5.4-mini sidecar, not relayed to Codex. */
  webSearch?: boolean;
}

/**
 * Wire name a chat model sees for a tool. Namespaced (MCP) tools are flattened to
 * "<namespace>__<name>" so they survive the chat-completions function-tool format;
 * the proxy maps this back to {namespace, name} on the return trip (Codex routes MCP
 * calls by an explicit `namespace` field, not by parsing the name).
 */
export function namespacedToolName(namespace: string | undefined, name: string): string {
  return namespace ? `${namespace}__${name}` : name;
}

export function toolChoiceAliases(tool: Pick<CodexTool, "namespace" | "name">): string[] {
  const wireName = namespacedToolName(tool.namespace, tool.name);
  return tool.namespace ? [wireName, `${tool.namespace}.${tool.name}`] : [wireName];
}

export function toolAllowedByChoice(
  tool: Pick<CodexTool, "namespace" | "name">,
  allowedTools: ReadonlySet<string>
): boolean {
  return toolChoiceAliases(tool).some((name) => allowedTools.has(name));
}

export function resolveToolChoiceWireName(
  tools: readonly Pick<CodexTool, "namespace" | "name">[] | undefined,
  name: string
): string {
  const match = tools?.find((tool) => toolChoiceAliases(tool).includes(name));
  return match ? namespacedToolName(match.namespace, match.name) : name;
}

export type CodexToolChoice =
  | "auto"
  | "none"
  | "required"
  | { name: string }
  | { allowedTools: string[]; mode: "auto" | "required" };

export function isAllowedToolChoice(
  value: CodexToolChoice | undefined
): value is { allowedTools: string[]; mode: "auto" | "required" } {
  return typeof value === "object" && value !== null && "allowedTools" in value;
}

export interface CodexRequestOptions {
  maxOutputTokens?: number;
  temperature?: number;
  topP?: number;
  stopSequences?: string[];
  toolChoice?: CodexToolChoice;
  parallelToolCalls?: boolean;
  reasoning?: string;
  hideThinkingSummary?: boolean;
  serviceTier?: string;
  presencePenalty?: number;
  frequencyPenalty?: number;
  /** Responses prompt-cache affinity key. Passthrough preserves it via _rawBody; routed adapters do not consume it unless their upstream wire supports it. */
  promptCacheKey?: string;
}

export type CodexMessagePhase = "commentary" | "final_answer";

/**
 * Provider-private state that must follow a locally expanded `previous_response_id` chain.
 * Kept out of public Responses output and persisted only in the bounded local continuation cache.
 */
export interface CodexProviderContinuationState {
  [provider: string]: Record<string, unknown> | undefined;
}

export type AdapterEvent =
  | { type: "heartbeat" }
  | { type: "text_delta"; text: string; phase?: CodexMessagePhase }
  | { type: "thinking_delta"; thinking: string }
  // Opaque signed-reasoning metadata preserved when it appears in a Codex history.
  | { type: "thinking_signature"; signature: string }
  | { type: "redacted_thinking"; data: string }
  | { type: "reasoning_raw_delta"; text: string }
  | { type: "tool_call_start"; id: string; name: string }
  | { type: "tool_call_delta"; arguments: string }
  | { type: "tool_call_end" }
  /** Internal boundary between a guarded first pass and its one-shot continuation. */
  | { type: "assistant_boundary" }
  // Native web-search activity surfaced by the web-search sidecar so Codex renders a "Searched the
  // web" cell. Emitted as a lifecycle PAIR at real wall-clock moments by src/web-search/loop.ts
  // (routed adapters never emit these): `begin` right before the sidecar runs so Codex shows the
  // "Searching the web" spinner, then `end` once it resolves. The bridge maps begin → an
  // output_item.added(in_progress) and end → the matching output_item.done(completed|failed) under
  // the SAME output index, so the activity animates instead of flashing completed instantly.
  | { type: "web_search_call_begin"; id: string }
  | {
      type: "web_search_call_end";
      id: string;
      queries: string[];
      status?: "completed" | "failed";
      sources?: CodexUrlCitation[];
    }
  | {
      type: "done";
      usage?: CodexUsage;
      stopReason?: string;
      endTurn?: boolean;
      providerState?: CodexProviderContinuationState;
    }
  | {
      type: "incomplete";
      reason: string;
      message?: string;
      usage?: CodexUsage;
      retryable?: boolean;
      endTurn?: boolean;
      providerState?: CodexProviderContinuationState;
    }
  // `usage` carries best-effort partial consumption when a turn dies before a clean done
  // so failed requests can log best-effort token counts.
  | {
      type: "error";
      message: string;
      usage?: CodexUsage;
      /** Authoritative upstream/proxy status when known; avoids message-based classification. */
      status?: number;
      /** Responses error type and code when the adapter has a structured provider failure. */
      errorType?: string;
      code?: string;
      retryable?: boolean;
    };

/**
 * A web source backing a search answer. Surfaced on the search-end event and rendered by the bridge
 * as a `url_citation` annotation on the following assistant message (the desktop app's Sources chip
 * reads these; the TUI ignores annotations, so this is additive).
 */
export interface CodexUrlCitation {
  url: string;
  title?: string;
}

/**
 * Canonical Responses usage convention:
 * - `inputTokens` is the TOTAL prompt size, INCLUDING cache reads and cache writes
 *   (OpenAI Responses convention).
 * - `cachedInputTokens` is cache READ tokens only (a subset of `inputTokens`).
 * - `cacheReadInputTokens`/`cacheCreationInputTokens` carry the read/write split when
 *   the provider reports both; reads mirror `cachedInputTokens`.
 * - `totalTokens` = inputTokens + outputTokens. Never re-add cache detail on top.
 */
export interface CodexUsage {
  inputTokens: number;
  outputTokens: number;
  totalTokens?: number;
  cachedInputTokens?: number;
  cacheReadInputTokens?: number;
  cacheCreationInputTokens?: number;
  reasoningOutputTokens?: number;
  estimated?: boolean;
}

/** The only provider configuration supported by this focused runtime. */
export interface CodexProviderConfig {
  adapter: "chatgpt-web";
  baseUrl: string;
  defaultModel?: string;
  models?: string[];
  liveModels?: boolean;
  contextWindow?: number;
  modelContextWindows?: Record<string, number>;
  modelInputModalities?: Record<string, string[]>;
  modelReasoningEfforts?: Record<string, string[]>;
  modelDefaultReasoningEfforts?: Record<string, string>;
  noReasoningModels?: string[];
  chatgptWeb?: {
    /** ChatGPT custom connector attached to tool-capable temporary chats. */
    appName?: string;
    /** Playwright storage-state file created by the explicit browser login. */
    storageStatePath?: string;
    /** System Chrome executable. The runtime never downloads a browser. */
    chromeExecutablePath?: string;
    /** Internal-only Chromium DevTools endpoint used by the Docker sidecar. */
    cdpEndpoint?: string;
    /** Unix socket bridging the turn-bound MCP capability into outer Codex tools. */
    brokerSocketPath?: string;
    /** Persisted, trusted Codex task authority used for follow-up turns that omit the envelope. */
    threadEnvironmentStatePath?: string;
    /** Maximum duration of one complete browser response. */
    turnTimeoutMs?: number;
    /** Keep the single controlled browser visible. */
    headed?: boolean;
    /** Attach the turn-bound Codex MCP capability for non-Pro efforts. */
    localToolsEnabled?: boolean;
    /** Account capability proven by the authenticated browser probe. */
    proAvailable?: boolean;
    /** Authorize per-call "Allow once" confirmation clicks for this connector. */
    autoApproveToolCalls?: boolean;
  };
}

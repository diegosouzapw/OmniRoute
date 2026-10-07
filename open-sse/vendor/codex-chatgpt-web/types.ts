/* Adapted from miuuyy/codex-chatgpt-web v4.0.7 commit b59d7dc51b84fb1f465ff1d00f5207f3b2b4a494 (MIT). */
export interface CodexParsedRequest {
  modelId: string;
  previousResponseId?: string;
  context: CodexContext;
  stream: boolean;
  options: CodexRequestOptions;
  _rawBody?: unknown;
  /** Number of leading raw input items restored from local previous_response_id state. */
  _replayPrefixLen?: number;
  /**
   * True when the input carried `{type:"compaction_trigger"}` — Codex remote compaction v2 asking
   * this turn to produce a `{type:"compaction"}` output item. Routed adapters can't natively;
   * the server runs the model as a summarizer and the bridge emits a synthetic compaction item
   * (see src/responses/compaction.ts).
   */
  _compactionRequest?: boolean;
  /**
   * True when Codex MultiAgent V2 delegated an agent_message as provider-private encrypted_content.
   * ChatGPT Web has no OpenAI backend key for that blob; the Responses HTTP boundary rejects it
   * before constructing the browser adapter.
   */
  _opaqueMultiAgentV2Payload?: boolean;
}

export interface CodexContext {
  systemPrompt?: string[];
  messages: CodexMessage[];
  tools?: CodexTool[];
}

export type CodexMessage =
  | CodexUserMessage
  | CodexAgentMessage
  | CodexAssistantMessage
  | CodexDeveloperMessage
  | CodexToolResultMessage;

export interface CodexUserMessage {
  role: "user";
  content: string | CodexContentPart[];
  timestamp: number;
}

/** A readable MultiAgent message delivered between native Codex agents. */
export interface CodexAgentMessage {
  role: "agentMessage";
  author?: string;
  recipient?: string;
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

export interface CodexFileContent {
  type: "file";
  /** Inline base64 bytes, optionally wrapped in a data URL. Never inline these bytes as prompt text. */
  fileData: string;
  filename: string;
}

/** A user/developer message content part: text, image (vision), or browser-uploaded file. */
export type CodexContentPart = CodexTextContent | CodexImageContent | CodexFileContent;

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

export type CodexToolChoice =
  | "auto"
  | "none"
  | "required"
  | { name: string }
  | { allowedTools: string[]; mode: "auto" | "required" };

export type CodexVerbosity = "low" | "medium" | "high";

export interface CodexJsonSchemaOutputFormat {
  type: "json_schema";
  name: string;
  strict: boolean;
  schema: unknown;
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
  /** Native Responses text verbosity requested by Codex. */
  verbosity?: CodexVerbosity;
  /** Native Responses JSON-schema output contract requested by Codex. */
  outputFormat?: CodexJsonSchemaOutputFormat;
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
    /** Explicit browser owner. Launcher mode attaches to the embedded Electron ChatGPT surface. */
    browserHost?: "managed-chrome" | "launcher";
    /** Owner-only descriptor containing the launcher's loopback CDP and control endpoints. */
    browserHostDescriptorPath?: string;
    /** Explicit browser-helper bundle. DEV builds current source; the launcher still supplies Electron-as-Node. */
    browserHelperScriptPath?: string;
    /** Explicit private diagnostic root for isolated harnesses. */
    browserDiagnosticsPath?: string;
    /** Playwright storage-state file created by the explicit browser login. */
    storageStatePath?: string;
    /** System Chrome executable. The runtime never downloads a browser. */
    chromeExecutablePath?: string;
    /** Internal-only Chromium DevTools endpoint used by the OmniRoute Docker sidecar. */
    cdpEndpoint?: string;
    /** Unix socket bridging the turn-bound MCP capability into outer Codex tools. */
    brokerSocketPath?: string;
    /** Persisted, trusted Codex task authority used for follow-up turns that omit the envelope. */
    threadEnvironmentStatePath?: string;
    /** Persisted exact-parent rolling checkpoints used only by Free/Luna turns. */
    lunaCheckpointStatePath?: string;
    /** Optional explicit safety ceiling. Browser turns have no absolute deadline by default. */
    turnTimeoutMs?: number;
    /**
     * Seconds of adapter silence before the Responses bridge cancels a turn as a hung upstream.
     * The adapter heartbeats every CHATGPT_WEB_ADAPTER_HEARTBEAT_MS for the whole of a turn, so a
     * healthy turn never approaches this no matter how long it thinks; raise it only to tolerate a
     * genuinely unresponsive upstream for longer. Defaults to DEFAULT_STALL_TIMEOUT_SEC.
     */
    stallTimeoutSec?: number;
    /** Keep the single controlled browser visible. */
    headed?: boolean;
    /** Attach the turn-bound Codex MCP capability for every connector-capable Web model. */
    localToolsEnabled?: boolean;
    /** Account capability proven by the authenticated browser probe. */
    solAvailable?: boolean;
    /** Account capability proven by the authenticated browser probe. */
    proAvailable?: boolean;
    /** Authorize per-call "Allow once" confirmation clicks for this connector. */
    autoApproveToolCalls?: boolean;
    /** DEV-only experimental transport: adapt one context across one, two, or three ChatGPT messages. */
    experimentalBiggerContext?: boolean;
  };
}

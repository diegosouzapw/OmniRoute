/**
 * Microsoft 365 Copilot (BizChat / Substrate) SignalR-over-WebSocket framing.
 *
 * Pure, transport-free helpers that translate between the OpenAI chat shape and
 * the Substrate BizChat SignalR JSON protocol observed on the individual M365
 * path (`m365.cloud.microsoft/chat` → `wss://substrate.office.com/m365Copilot/
 * Chathub/...`). Keeping these pure lets us unit-test the wire format against the
 * real frame captures contributed in #4042 without opening a live socket — the
 * live round-trip is the separate Rule #18 validation gate for the executor.
 *
 * Protocol (from @skyzea1's #4042 capture):
 *   - JSON messages terminated with the SignalR record separator `\x1e`.
 *   - Handshake: → {"protocol":"json","version":1}  ← {}  → {"type":6}
 *   - Send: type:4 invocation to target "chat" with arguments[0] = { message, ... },
 *     immediately followed by a type:1 target:"Metrics" frame in the SAME socket
 *     write (#10718 — an invocation without its Metrics pair is silently dropped).
 *   - Stream: type:1 target:"update" deltas (bot text at arguments[0].messages[].text,
 *     accumulated — NOT incremental) → isLastUpdate:true → type:2 final → type:3 completion.
 */

type JsonRecord = Record<string, unknown>;

/** SignalR record separator (0x1e) terminating every JSON frame. */
export const RECORD_SEPARATOR = String.fromCharCode(0x1e);

/** SignalR handshake request — the first frame the client must send. */
export const HANDSHAKE_REQUEST = { protocol: "json", version: 1 } as const;

/** SignalR keepalive ping frame. */
export const KEEPALIVE_PING = { type: 6 } as const;

/**
 * Allowed message types observed in a 2026-08-21 live capture of a working
 * `m365.cloud.microsoft/chat` session (issue: "Stream ended before producing a
 * non-ping SSE event" on every individual/consumer M365 Copilot call). The
 * #10718 6-entry shape above no longer produces a `type:1 target:"update"`
 * frame at all — the socket only replies with SignalR keepalive pings and then
 * closes, which is exactly what surfaces client-side as that generic stream
 * error. 30 entries, up from 6.
 */
export const ALLOWED_MESSAGE_TYPES = [
  "Chat",
  "Suggestion",
  "InternalSearchQuery",
  "Disengaged",
  "InternalLoaderMessage",
  "Progress",
  "GeneratedCode",
  "RenderCardRequest",
  "AdsQuery",
  "SemanticSerp",
  "GenerateContentQuery",
  "GenerateGraphicArt",
  "SearchQuery",
  "ConfirmationCard",
  "AuthError",
  "DeveloperLogs",
  "TriggerPlugin",
  "HintInvocation",
  "MemoryUpdate",
  "EndOfRequest",
  "TriggerConfirmation",
  "ResumeInvokeAction",
  "ResumeUserInputRequest",
  "TriggerUserInputRequest",
  "EscapeHatch",
  "TriggerPluginAuth",
  "ResumePluginAuth",
  "SideBySide",
  "ReferencesListComplete",
  "SwitchRespondingEndpoint",
] as const;

/**
 * Enterprise / "work" tier option sets (#7870), captured from @OfflinePing's HAR of the
 * real Microsoft 365 Copilot for work web UI (Discussion #7850). Unlike
 * {@link M365_DEFAULT_OPTION_SETS} (a consumer/MSA set), this omits `enable_msa_user` and
 * the `cwc_*` consumer entries and declares the `enterprise_*`/`bizchat_*` work-surface
 * flags the capture showed — the individual/consumer set never produces a turn on an AAD
 * enterprise tenant because it advertises the wrong account surface.
 */
export const M365_ENTERPRISE_OPTION_SETS = [
  "enterprise_flux_image",
  "enterprise_flux_web",
  "enterprise_flux_work",
  "enterprise_toolbox_with_skdsstore",
  "enterprise_pagination_support",
  "enterprise_flux_work_code_interpreter",
  "enterprise_code_interpreter_citation_fix",
  "bizchat_enable_federated_connectors",
  "at_mention_plugins_enable",
] as const;

/**
 * Additional SignalR message types observed on the enterprise capture beyond
 * {@link ALLOWED_MESSAGE_TYPES} (#7870) — the server actively emits `ReferencesListComplete`
 * on that tenant, a type we did not previously declare as allowed.
 */
export const M365_ENTERPRISE_EXTRA_MESSAGE_TYPES = [
  "ReferencesListComplete",
  "EndOfRequest",
  "MemoryUpdate",
  "TriggerPlugin",
  "AuthError",
  "SwitchRespondingEndpoint",
] as const;

/**
 * Individual / EDU option sets from a 2026-08-21 live capture — 34 entries, up
 * from the #10718 14-entry shape (which itself superseded an earlier 25-entry
 * shape). Each recapture so far has been additive/reshuffled rather than a
 * wholesale replacement — treat this as the protocol continuing to drift, not
 * a one-time fix; a future capture may again need to update this list.
 */
export const M365_DEFAULT_OPTION_SETS = [
  "search_result_progress_messages_with_search_queries",
  "update_textdoc_response_after_streaming",
  "deepleo_networking_timeout_10minutes_canmore",
  "cwc_flux_image",
  "cwc_code_interpreter",
  "cwc_code_interpreter_amsfix",
  "cwcfluxgptv",
  "flux_v3_gptv_enable_upload_multi_image_in_turn_wo_ch",
  "gptvnorm2048",
  "cwc_code_interpreter_citation_fix",
  "code_interpreter_interactive_charts",
  "cwc_code_interpreter_interactive_charts_inline_image",
  "code_interpreter_matplotlib_patching",
  "cwc_fileupload_odb",
  "update_memory_plugin",
  "add_custom_instructions",
  "cwc_flux_v3",
  "flux_v3_progress_messages",
  "enable_batch_token_processing",
  "enable_gg_gpt",
  "async_client_interaction",
  "flux_v3_references",
  "flux_v3_references_entities",
  "flux_v3_references_ci",
  "add_filestore_filetype",
  "cwc_code_interpreter_citation_sourceannotations",
  "cdxcwc_code_interpreter_hallucinated_url_filter",
  "flux_v3_image_gen_enable_dimensions",
  "flux_v3_image_gen_enable_non_watermarked_storage",
  "flux_v3_image_gen_enable_icon_dimensions",
  "flux_v3_image_gen_enable_system_text_with_params",
  "flux_v3_image_gen_enable_designer_dimensions_meta_prompting_in_system_prompts",
  "flux_v3_image_gen_enable_story",
  "rich_responses",
] as const;

/** Append the record separator to a JSON-serializable frame. */
export function encodeFrame(obj: unknown): string {
  return JSON.stringify(obj) + RECORD_SEPARATOR;
}

/** Serialized handshake request frame. */
export function handshakeFrame(): string {
  return encodeFrame(HANDSHAKE_REQUEST);
}

/** Serialized keepalive ping frame. */
export function keepaliveFrame(): string {
  return encodeFrame(KEEPALIVE_PING);
}

/**
 * #10718 — the browser follows the type:4 chat invocation with this type:1
 * target:"Metrics" frame in the SAME socket write. Sending the invocation alone
 * gets it silently ignored (no update frames at all), so the executor must
 * concatenate `metricsFrame()` onto the invocation payload.
 */
export const CHAT_METRICS_FRAME = {
  arguments: [
    {
      Timestamps: {
        ConnectionEstablished: "",
        ConnectionStart: "",
        UserInputStart: "",
        UserInputSubmit: "",
      },
    },
  ],
  target: "Metrics",
  type: 1,
} as const;

/** Serialized Metrics follow-up frame (see {@link CHAT_METRICS_FRAME}). */
export function metricsFrame(): string {
  return encodeFrame(CHAT_METRICS_FRAME);
}

/**
 * Split a raw socket buffer into complete `\x1e`-terminated frames, returning any
 * trailing partial frame as `rest` so it can be prepended to the next chunk.
 */
export function splitFrames(buffer: string): { frames: string[]; rest: string } {
  const parts = buffer.split(RECORD_SEPARATOR);
  // The last element is either "" (buffer ended on a separator) or a partial frame.
  const rest = parts.pop() ?? "";
  const frames = parts.filter((p) => p.length > 0);
  return { frames, rest };
}

/** Safely JSON.parse a single frame body; returns null on malformed input. */
export function parseFrame(frame: string): Record<string, unknown> | null {
  const trimmed = frame.trim();
  if (!trimmed) return null;
  try {
    const parsed = JSON.parse(trimmed);
    return parsed && typeof parsed === "object" && !Array.isArray(parsed)
      ? (parsed as Record<string, unknown>)
      : null;
  } catch {
    return null;
  }
}

/**
 * A SignalR handshake response is `{}` on success, or `{ error: "..." }` on
 * failure. Returns the error string, or null when the handshake succeeded.
 */
export function handshakeError(frame: Record<string, unknown> | null): string | null {
  if (!frame) return null;
  const err = frame.error;
  return typeof err === "string" && err.length > 0 ? err : null;
}

export interface ChatInvocationOptions {
  text: string;
  /** Per-invocation trace id (GUID). */
  traceId: string;
  /** Client correlation id; defaults to {@link ChatInvocationOptions.traceId}. */
  clientCorrelationId?: string;
  /** Per-session id (GUID, == the WS URL X-SessionId query). */
  sessionId: string;
  /** Per-request id (== the WS URL chatsessionid/clientrequestid query). */
  requestId: string;
  /**
   * Conversation id — MUST match the ConversationId query of the WS URL the
   * invocation rides on (#10718: the server cross-checks the two).
   */
  conversationId: string;
  /** BCP-47 locale echoed in message.locale; defaults to "en-us". */
  locale?: string;
  /** IANA time zone for message.locationInfo; defaults to "UTC". */
  timeZone?: string;
  /** Hour offset for message.locationInfo; defaults to 0. */
  timeZoneOffset?: number;
  /** Whether this is the first turn of the conversation. */
  isStartOfSession?: boolean;
  /** Tier-specific option flags; defaults to {@link M365_DEFAULT_OPTION_SETS}. */
  optionsSets?: string[];
  tone?: string;
  /** Tier-specific allowed message types; defaults to {@link ALLOWED_MESSAGE_TYPES}. */
  allowedMessageTypes?: readonly string[];
  /**
   * Tier-specific disconnect behavior sent in the type:4 chat invocation. The work
   * surface rejects any value other than exactly "continue" (#8971), so the
   * enterprise tier sends it; the 2026-08 recapture shows the individual/EDU
   * surface omits the key entirely, so it is left out unless set (#10718).
   */
  disconnectBehavior?: string;
  /** Client-declared tool plugins (see {@link clientPlugins}); defaults to `[]`. */
  plugins?: JsonRecord[];
  /** OpenAI `tool_choice` echoed to the substrate; defaults to `null`. */
  toolChoice?: unknown;
  /** Tool-use nudge sent as `customInstructions` when tools are declared. */
  customInstructions?: string;
}

/** A client-declared tool in the normalized shape produced by `extractToolSpec`. */
export interface M365ToolDecl {
  name: string;
  description: string;
  parameters: JsonRecord | null;
}

/**
 * Map normalized OpenAI function tools to the M365 `plugins[]` invocation entries
 * (`{Id, Source:"API", Description, Parameters}`), mirroring the community M365
 * convention. Entries without a name are skipped by the extractor upstream.
 */
export function clientPlugins(tools: M365ToolDecl[]): JsonRecord[] {
  return tools.map((t) => ({
    Id: t.name,
    Source: "API",
    Description: t.description,
    Parameters: t.parameters ?? {},
  }));
}

/** True when `toolChoice` permits calling `name` (string / typed / "required"/"auto"). */
function toolChoiceAllows(toolChoice: unknown, name: string): boolean {
  if (toolChoice == null || toolChoice === "auto" || toolChoice === "required") return true;
  if (typeof toolChoice === "string") return toolChoice === name;
  const fn = (toolChoice as JsonRecord)?.function as JsonRecord | undefined;
  return typeof fn?.name === "string" && fn.name === name;
}

/** A tool call parsed from the model's fenced-block or router output. */
export interface M365ParsedToolCall {
  id: string;
  type: string;
  name: string;
  /** JSON-stringified arguments object, as the OpenAI `tool_calls` shape expects. */
  arguments: string;
}

const SHELL_TOOL_NAMES = ["bash", "sh", "shell", "powershell", "cmd"] as const;
const FENCED_BLOCK = /```([A-Za-z0-9_-]+)[ \t]*\r?\n([\s\S]*?)\r?\n```/g;

/**
 * Parse the model's fenced-block tool calls out of a completed turn
 * (```` ```toolname\n{json args}\n``` ```` — the protocol taught by the prompt).
 * Only names the client actually declared are accepted (undeclared names such as
 * a hallucinated `unknown_tool` must never reach the caller), and `tool_choice`
 * restrictions are enforced the same way. A shell-family block emitted for a
 * DECLARED shell tool is normalized into `{command: "..."}`.
 */
export function parseFencedToolCalls(
  text: string,
  tools: M365ToolDecl[],
  toolChoice: unknown
): M365ParsedToolCall[] {
  const allowed = new Set(tools.map((t) => t.name));
  const declaredShell = SHELL_TOOL_NAMES.find((n) => allowed.has(n));
  const out: M365ParsedToolCall[] = [];
  for (const m of text.matchAll(FENCED_BLOCK)) {
    const name = m[1]!;
    const body = m[2]!.trim();
    let parsed: unknown;
    try {
      parsed = JSON.parse(body);
    } catch {
      parsed = undefined;
    }
    // Shell-family blocks: keep only for a declared shell tool, normalizing a
    // plain-text body (or {"command": ...}) into the canonical arguments object.
    if ((SHELL_TOOL_NAMES as readonly string[]).includes(name)) {
      const target = allowed.has(name) ? name : declaredShell;
      if (!target) continue;
      const args =
        parsed && typeof parsed === "object" && "command" in (parsed as JsonRecord)
          ? (parsed as JsonRecord)
          : { command: body };
      out.push({
        id: `call_${crypto.randomUUID()}`,
        type: "function",
        name: target,
        arguments: JSON.stringify(args),
      });
      continue;
    }
    if (!allowed.has(name) || !toolChoiceAllows(toolChoice, name)) continue;
    if (parsed == null || typeof parsed !== "object") continue;
    out.push({
      id: `call_${crypto.randomUUID()}`,
      type: "function",
      name,
      arguments: JSON.stringify(parsed),
    });
  }
  return out;
}

/** A router-turn decision: `decided:false` means the output was unparseable. */
export interface M365RouterDecision {
  decided: boolean;
  calls: M365ParsedToolCall[];
}

function allowedName(tools: M365ToolDecl[], name: string): boolean {
  return tools.some((t) => t.name === name);
}

function validCall(
  name: string,
  args: unknown,
  tools: M365ToolDecl[],
  toolChoice: unknown
): M365ParsedToolCall | null {
  if (!name || !allowedName(tools, name) || !toolChoiceAllows(toolChoice, name)) return null;
  if (!args || typeof args !== "object") return null;
  return {
    id: `call_${crypto.randomUUID()}`,
    type: "function",
    name,
    arguments: JSON.stringify(args),
  };
}

/**
 * Parse the router turn's decision (`CALL_TOOL: name({...})` lines /
 * `NO_TOOL_NEEDED`), validating every call against the declared tools and
 * `tool_choice`. Falls back to the `{"calls":[...]}` JSON envelope. Returns
 * `decided:false` when the output is neither shape, so the caller can fall
 * through to a plain answer turn instead of guessing.
 */
export function parseToolRouterDecision(
  text: string,
  tools: M365ToolDecl[],
  toolChoice: unknown
): M365RouterDecision {
  const trimmed = text.trim();
  const calls: M365ParsedToolCall[] = [];
  for (const line of trimmed.split(/\r?\n/)) {
    const m = /^CALL_TOOL:\s*(.+)$/i.exec(line.trim());
    if (!m) continue;
    const rest = m[1]!;
    const start = rest.indexOf("(");
    const end = rest.lastIndexOf(")");
    if (start <= 0 || end <= start) continue;
    const name = rest.slice(0, start).trim();
    try {
      const args = JSON.parse(rest.slice(start + 1, end));
      const call = validCall(name, args, tools, toolChoice);
      if (call) calls.push(call);
    } catch {
      /* malformed JSON on this line — skip */
    }
  }
  if (calls.length > 0) return { decided: true, calls };
  if (/^no_tool_needed$/i.test(trimmed) || trimmed.toLowerCase().includes("no_tool_needed")) {
    return { decided: true, calls: [] };
  }
  // Fallback: the {"calls":[{"name","arguments"}]} envelope, optionally fenced.
  let probe = trimmed;
  const fence = probe.indexOf("```");
  if (fence >= 0) {
    probe = probe
      .slice(fence + 3)
      .replace(/```$/, "")
      .trim();
    probe = probe.replace(/^(json|JSON)\s*/, "");
  }
  const start = probe.indexOf("{");
  const end = probe.lastIndexOf("}");
  if (start >= 0 && end > start) {
    try {
      const parsed = JSON.parse(probe.slice(start, end + 1)) as {
        calls?: Array<{ name?: unknown; arguments?: unknown }>;
      };
      if (Array.isArray(parsed.calls)) {
        for (const c of parsed.calls) {
          const call = validCall(
            typeof c?.name === "string" ? c.name : "",
            c?.arguments,
            tools,
            toolChoice
          );
          if (call) calls.push(call);
        }
        return { decided: true, calls };
      }
    } catch {
      /* not JSON — undecided */
    }
  }
  return { decided: false, calls: [] };
}

/**
 * Resolve the tier-specific `optionsSets` / `tone` / `allowedMessageTypes` overrides for
 * the `type:4` chat invocation (#7870). Mirrors how `resolveConnectionParams`/`buildWsUrl`
 * already branch on tier for the WS URL — this is the request-payload counterpart so an
 * enterprise tier actually changes what is sent, not just where it is sent.
 */
export function resolveChatInvocationOverrides(tier: string | undefined): {
  optionsSets: string[];
  tone: string;
  allowedMessageTypes: readonly string[];
  disconnectBehavior: string | undefined;
} {
  if (tier === "enterprise") {
    return {
      optionsSets: [...M365_ENTERPRISE_OPTION_SETS],
      tone: "Magic",
      allowedMessageTypes: [...ALLOWED_MESSAGE_TYPES, ...M365_ENTERPRISE_EXTRA_MESSAGE_TYPES],
      disconnectBehavior: "continue",
    };
  }
  return {
    optionsSets: [...M365_DEFAULT_OPTION_SETS],
    // 2026-08-21 capture — the individual/consumer surface now sends "Magic"
    // (capitalized), matching the enterprise tone literal. The #10718
    // lowercase "magic" is part of the shape that gets silently dropped.
    tone: "Magic",
    allowedMessageTypes: ALLOWED_MESSAGE_TYPES,
    // 2026-08-21 capture — disconnectBehavior:"continue" is now present on the
    // individual/consumer wire too, not just enterprise (see ChatInvocationOptions).
    disconnectBehavior: "continue",
  };
}

/**
 * BizChat exposes several models selected by the `tone` field of the `type:4` chat
 * invocation (#7872, values confirmed against a real enterprise tenant in #7850). Each
 * tone-selected variant is registered as its own model id; the bare `copilot-m365` id is
 * intentionally absent here so it keeps the tier default tone (`Magic` on enterprise, `magic`
 * otherwise) resolved by {@link resolveChatInvocationOverrides}.
 */
export const M365_MODEL_TONE_MAP: Readonly<Record<string, string>> = {
  "copilot-m365-claude-opus": "Claude_Opus",
  "copilot-m365-gpt-5-6-reasoning": "Gpt_5_6_Reasoning",
  "copilot-m365-gpt-5-5-chat": "Gpt_5_5_Chat",
};

/**
 * Resolve the `tone` for a requested model id, or `undefined` when the id is the bare
 * `copilot-m365` / unknown — callers then fall back to the tier default tone. Model-driven
 * tone takes precedence over the tier default (see the executor wiring).
 */
export function resolveToneForModel(model: string | undefined): string | undefined {
  if (!model) return undefined;
  return M365_MODEL_TONE_MAP[model];
}

/**
 * Build the `type:4` chat invocation frame body (not yet `\x1e`-terminated).
 * Base shape from the #10718 recapture (populated `clientInfo` +
 * `productThreadType:"Office"`, a `conversationId` matching the WS URL query, a
 * rich `message` object), extended per a 2026-08-21 live capture that found the
 * #10718 shape alone no longer produces a `type:1 target:"update"` frame — the
 * socket only replies with keepalive pings and closes. The additions below
 * (richer `clientInfo`, non-empty `plugins`, `extraExtensionParameters`,
 * `isSbsSupported`, `renderReferencesBehindEOS`,
 * `message.connectedFederatedConnections`, and `disconnectBehavior` on every
 * tier) are exactly the fields the 2026-08-21 capture had that this shape was
 * missing; the #10718 fields (`conversationId`, `productThreadType`,
 * `toolChoice`, `message.attachments`) are kept as-is since removing them was
 * not verified against a live socket.
 */
export function buildChatInvocation(opts: ChatInvocationOptions): Record<string, unknown> {
  const clientInfo = {
    clientAppName: "Office",
    clientPlatform: "mcmcopilot-web",
    clientEntrypoint: "mcmcopilot-officeweb",
    clientSessionId: opts.sessionId,
    ProductCategory: "Chat",
    clientAppType: "Web",
    productEntryPoint: "ChatPanel",
    deviceOS: "Windows",
    deviceType: "Desktop",
    clientPlatformVersion: "10",
  };

  return {
    type: 4,
    target: "chat",
    invocationId: "0",
    arguments: [
      {
        allowedMessageTypes: opts.allowedMessageTypes
          ? [...opts.allowedMessageTypes]
          : [...ALLOWED_MESSAGE_TYPES],
        clientCorrelationId: opts.clientCorrelationId ?? opts.traceId,
        clientInfo,
        conversationId: opts.conversationId,
        extraExtensionParameters: {},
        isStartOfSession: opts.isStartOfSession ?? true,
        message: {
          adaptiveCards: [],
          attachments: null,
          author: "user",
          clientInfo,
          clientPreferences: {},
          connectedFederatedConnections: ["dummyId"],
          entityAnnotationTypes: ["People", "File", "Event", "Email", "TeamsMessage"],
          experienceType: "Default",
          inputMethod: "Keyboard",
          locale: opts.locale ?? "en-us",
          locationInfo: {
            timeZone: opts.timeZone ?? "UTC",
            timeZoneOffset: opts.timeZoneOffset ?? 0,
          },
          messageType: "Chat",
          requestId: opts.requestId,
          text: opts.text,
        },
        isSbsSupported: true,
        options: {},
        optionsSets: opts.optionsSets ?? [...M365_DEFAULT_OPTION_SETS],
        // 2026-08-21 capture (#11069): BingWebSearch is now the universal
        // BuiltIn plugin on individual/consumer tier; keep an opt-out override.
        plugins: opts.plugins ?? [{ Id: "BingWebSearch", Source: "BuiltIn" }],
        ...(opts.customInstructions ? { customInstructions: opts.customInstructions } : {}),
        productThreadType: "Office",
        renderReferencesBehindEOS: true,
        sessionId: opts.sessionId,
        sliceIds: [],
        source: "officeweb",
        streamingMode: "ConciseWithPadding",
        threadLevelGptId: {},
        // 2026-08-21 capture (#11069): tone is now capitalized "Magic" on both tiers.
        tone: opts.tone ?? "Magic",
        toolChoice: opts.toolChoice ?? null,
        traceId: opts.traceId,
        // 2026-08-21 capture — disconnectBehavior:"continue" is sent on every
        // tier now, not gated to enterprise as the #8971 comment described.
        disconnectBehavior: opts.disconnectBehavior ?? "continue",
      },
    ],
  };
}

/** True when the frame is a SignalR invocation/streamItem (`type:1`) update. */
export function isUpdateFrame(frame: Record<string, unknown> | null): boolean {
  return !!frame && frame.type === 1 && frame.target === "update";
}

/** True when the frame is the SignalR completion (`type:3`) for the chat invocation. */
export function isCompletionFrame(frame: Record<string, unknown> | null): boolean {
  return !!frame && frame.type === 3;
}

/**
 * Extract the error message from a `type:3` completion frame that carries one
 * (`frame.error.message` / `frame.error`). A clean completion returns null —
 * without this check a server-side invocation error surfaces as a silent empty
 * `stop`, indistinguishable from a genuine empty reply.
 */
export function extractCompletionError(frame: Record<string, unknown> | null): string | null {
  if (!frame || frame.type !== 3) return null;
  const error = frame.error;
  if (!error || typeof error !== "object") return null;
  const message = (error as JsonRecord).message;
  return typeof message === "string" && message.length > 0 ? message : JSON.stringify(error);
}

/**
 * True for messages that carry tool/search/code PROGRESS rather than answer text
 * (`messageType:"Progress"`, or the SearchResults/Code/ToolCall content types).
 * Such text must never be folded into the streamed answer.
 */
function isToolProgressMessage(m: Record<string, unknown>): boolean {
  if (m.messageType === "Progress") return true;
  const ct = m.contentType;
  return ct === "SearchResults" || ct === "Code" || ct === "ToolCall" || ct === "EarlyProgress";
}

/**
 * True when an update frame is a tool-progress frame — it carries Progress /
 * SearchResults / Code / ToolCall messages alongside (possibly) a `writeAtCursor`
 * increment that belongs to that progress, not to the answer (the browser client
 * suppresses such writeAtCursor deltas; so must we).
 */
export function isToolProgressFrame(frame: Record<string, unknown> | null): boolean {
  if (!isUpdateFrame(frame)) return false;
  const args = frame.arguments;
  const first = Array.isArray(args) ? (args[0] as Record<string, unknown> | undefined) : undefined;
  const messages = first?.messages;
  if (!Array.isArray(messages)) return false;
  return messages.some(
    (m) => !!m && typeof m === "object" && isToolProgressMessage(m as Record<string, unknown>)
  );
}

/** True when an update frame is flagged as the last update of the turn. */
export function isLastUpdate(frame: Record<string, unknown> | null): boolean {
  if (!isUpdateFrame(frame)) return false;
  const args = (frame as Record<string, unknown>).arguments;
  const first = Array.isArray(args) ? (args[0] as Record<string, unknown> | undefined) : undefined;
  return first?.isLastUpdate === true;
}

/**
 * Extract the accumulated bot text from a `type:1` update frame, reading the last
 * bot-authored message's `.text`. Returns null when the frame carries no bot text
 * (Progress/Suggestion/ReferencesListComplete updates, throttling-only frames, etc.).
 */
export function extractBotText(frame: Record<string, unknown> | null): string | null {
  if (!isUpdateFrame(frame)) return null;
  const args = (frame as Record<string, unknown>).arguments;
  const first = Array.isArray(args) ? (args[0] as Record<string, unknown> | undefined) : undefined;
  const messages = first?.messages;
  if (!Array.isArray(messages)) return null;
  // Prefer the last bot-authored message with non-empty text.
  for (let i = messages.length - 1; i >= 0; i--) {
    const m = messages[i] as Record<string, unknown> | undefined;
    if (!m) continue;
    const author = m.author;
    const text = m.text;
    if (isToolProgressMessage(m)) continue;
    if ((author === "bot" || author === undefined) && typeof text === "string" && text.length > 0) {
      return text;
    }
  }
  return null;
}

/**
 * BizChat update frames carry the FULL accumulated answer each time, not an
 * incremental delta. Given the previously-emitted text and the new accumulated
 * text, return the new suffix to stream. When the new text does not extend the
 * previous (a replace/rewrite), the whole new text is returned so nothing is lost.
 */
export function incrementalDelta(previous: string, next: string): string {
  if (!next) return "";
  if (next === previous) return "";
  if (next.startsWith(previous)) return next.slice(previous.length);
  return next;
}

/**
 * Extract an incremental `writeAtCursor` delta from a `type:1` update frame. The EDU /
 * GPT-5.5 path (`OfficeWebIncludedCopilot`, feature.bizchatfluxv3) streams response text
 * as `arguments[0].writeAtCursor` INCREMENTS instead of only accumulated `messages[].text`
 * snapshots. Returns null when the frame carries no writeAtCursor delta. (#6210)
 */
export function extractWriteAtCursor(frame: Record<string, unknown> | null): string | null {
  if (!isUpdateFrame(frame)) return null;
  const args = (frame as Record<string, unknown>).arguments;
  const first = Array.isArray(args) ? (args[0] as Record<string, unknown> | undefined) : undefined;
  const wac = first?.writeAtCursor;
  return typeof wac === "string" && wac.length > 0 ? wac : null;
}

/**
 * Extract the final answer from a `type:2` invocation-result frame
 * (`item.result.message`). Used as a last-resort fallback when a turn emitted no
 * streamed content (some EDU turns only surface the answer here). (#6210)
 */
export function extractFinalResultMessage(frame: Record<string, unknown> | null): string | null {
  if (!frame || frame.type !== 2) return null;
  const item = frame.item as Record<string, unknown> | undefined;
  const result = item?.result as Record<string, unknown> | undefined;
  const message = result?.message;
  return typeof message === "string" && message.length > 0 ? message : null;
}

/**
 * Fold a single incoming frame into the running bot answer, returning the suffix to
 * stream (`delta`) and the new accumulated text (`next`). Handles both wire formats:
 * `messages[].text` snapshots are the full accumulated answer (diffed via
 * {@link incrementalDelta}), while `writeAtCursor` frames are incremental and are
 * appended. Non-content frames leave the state unchanged. (#6210)
 */
export function accumulateBotContent(
  previous: string,
  frame: Record<string, unknown> | null
): { delta: string; next: string } {
  // A tool-progress frame's writeAtCursor belongs to the progress card (search
  // queries, code interpreter output…), not to the answer text.
  if (isToolProgressFrame(frame)) return { delta: "", next: previous };
  const snapshot = extractBotText(frame);
  if (snapshot) {
    return { delta: incrementalDelta(previous, snapshot), next: snapshot };
  }
  const wac = extractWriteAtCursor(frame);
  if (wac) {
    return { delta: wac, next: previous + wac };
  }
  return { delta: "", next: previous };
}

/**
 * Hand-rolled protobuf encoder/decoder for Cursor's `agent.v1.AgentService/Run`
 * RPC, the endpoint cursor-agent uses for everything (chat + composer + auto).
 *
 * Replaces the legacy aiserver.v1.ChatService/StreamUnifiedChatWithTools path,
 * which doesn't accept "auto" or "composer-*" model ids.
 *
 * Schema sourced from:
 *   - On-the-wire captures of cursor-agent (decoded against the protobuf
 *     descriptor shipped in cursor-agent's bundle)
 *   - Cross-checked against router-for-me/CLIProxyAPI's reference Go impl
 *     and KooshaPari/cliproxyapi-plusplus's hand-rolled field tables
 *
 * The endpoint is a Connect-RPC client-streaming RPC. We send one frame
 * (AgentClientMessage with a RunRequest) and end the stream; the server
 * streams back an AgentServerMessage per chunk.
 */

import zlib from "node:zlib";
import crypto from "node:crypto";
import { decodeNativeTodoWriteCompletion } from "./cursorAgentProtobuf/nativeTodoWrite.ts";
import {
  cursorImageAttachmentPath,
  encodeSelectedImageBody,
  type EncodedImage,
} from "./cursorAgentProtobuf/imageEncoding.ts";
import {
  CURSOR_EFFORT_SUFFIXES,
  resolveOneMillionContextModel,
} from "./cursorAgentProtobuf/requestedModelParameters.ts";
import {
  WT_VARINT,
  WT_LEN,
  encodeVarint,
  encodeTag,
  encodeBytes,
  encodeString,
  encodeMessage,
  encodeUInt32Field,
  encodeBoolField,
  encodeDoubleField,
  decodeVarint,
  checkedLen,
  decodeFields,
  findField,
  decodeStringField,
  decodeVarintField,
  type Field,
} from "./cursorAgentProtobuf/wire.ts";

// ─── Field numbers (from agent.proto descriptor) ───────────────────────────

const ACM_RUN_REQUEST = 1; // AgentClientMessage.run_request

const ARR_CONVERSATION_STATE = 1; // AgentRunRequest.conversation_state
const ARR_ACTION = 2; // AgentRunRequest.action
const ARR_MODEL_DETAILS = 3; // AgentRunRequest.model_details (ModelDetails, msg 88)
const ARR_CONVERSATION_ID = 5; // AgentRunRequest.conversation_id
const ARR_MCP_TOOLS = 4; // AgentRunRequest.mcp_tools (empty placeholder required)
const ARR_REQUESTED_MODEL = 9; // AgentRunRequest.requested_model
const ARR_UNKNOWN_12 = 12; // observed varint=0 in cursor-agent traffic
const ARR_REQUEST_ID = 16; // observed UUID, same value as conversation_id

const CSS_ROOT_PROMPT = 1; // ConversationStateStructure.root_prompt_messages_json
const CSS_TURNS = 8; // ConversationStateStructure.turns

const CA_USER_MESSAGE_ACTION = 1; // ConversationAction.user_message_action

const UMA_USER_MESSAGE = 1; // UserMessageAction.user_message

const UM_TEXT = 1; // UserMessage.text
const UM_MESSAGE_ID = 2; // UserMessage.message_id
const UM_SELECTED_CONTEXT = 3; // UserMessage.selected_context (empty placeholder required)
const UM_MODE = 4; // UserMessage.mode (cursor-agent sends 1)

const SC_SELECTED_IMAGES = 1; // SelectedContext.selected_images [repeated SelectedImage]

const RM_MODEL_ID = 1; // RequestedModel.model_id
const RM_PARAMETERS = 3; // RequestedModel.parameters [repeated]

// ModelDetails (msg 88) — the model envelope cursor-agent actually uses to resolve
// pinned model variants. Field numbers pinned from the cursor-agent descriptor (and
// CLIProxyAPIPlus's cursor proto). #3714: pinned Claude/GPT *thinking* variants returned
// an empty turn when sent only via RequestedModel (field 9) with a bare model_id; the
// working reference sends them as ModelDetails with all three string fields set.
const MD_MODEL_ID = 1; // ModelDetails.model_id
const MD_DISPLAY_MODEL_ID = 3; // ModelDetails.display_model_id
const MD_DISPLAY_NAME = 4; // ModelDetails.display_name

const RMP_ID = 1; // RequestedModel.ModelParameter.id
const RMP_VALUE = 2; // RequestedModel.ModelParameter.value

const ACM_EXEC_CLIENT_MESSAGE = 2; // AgentClientMessage.exec_client_message

const ECM_ID = 1; // ExecClientMessage.id
const ECM_EXEC_ID = 15; // ExecClientMessage.exec_id
const ECM_REQUEST_CONTEXT_RESULT = 10; // ExecClientMessage.request_context_result

const RCR_SUCCESS = 1; // RequestContextResult.success
const RCS_REQUEST_CONTEXT = 1; // RequestContextSuccess.request_context

const ASM_INTERACTION_UPDATE = 1; // AgentServerMessage.interaction_update
const ASM_EXEC_SERVER_MESSAGE = 2; // AgentServerMessage.exec_server_message
const ASM_KV_SERVER_MESSAGE = 4; // AgentServerMessage.kv_server_message
// Cursor sends kv_server_message frames once the model stops generating
// (it saves the assistant turn into a blob). For non-tool-calling chats
// this functions as our end-of-response marker.

const ESM_ID = 1; // ExecServerMessage.id
const ESM_EXEC_ID = 15; // ExecServerMessage.exec_id
const ESM_REQUEST_CONTEXT_ARGS = 10; // ExecServerMessage.request_context_args

const IU_TEXT_DELTA = 1; // InteractionUpdate.text_delta
const IU_THINKING_DELTA = 4; // InteractionUpdate.thinking_delta
const IU_THINKING_COMPLETED = 5;
const IU_TOOL_CALL_STARTED = 2;
const IU_TOOL_CALL_COMPLETED = 3;
const IU_TOKEN_DELTA = 8;
const IU_HEARTBEAT = 13;
const IU_TURN_ENDED = 14;

const TDU_TEXT = 1; // TextDeltaUpdate.text

// ─── Phase 1+: tool-use field numbers ──────────────────────────────────────
// Field numbers in result-message oneof discriminators (RES_*) are best-known
// values; verified against wire-tap captures during integration testing.

const ACM_KV_CLIENT_MESSAGE = 3; // AgentClientMessage.kv_client_message

// CSS_ROOT_PROMPT and CSS_TURNS already declared above (lines 34-35)
// CSS_TURNS_OLD = 2 is deprecated; CSS_TURNS = 8 is current.

// ExecClientMessage payload variants (mirror ESM_*)
const ECM_SHELL_RESULT = 2;
const ECM_WRITE_RESULT = 3;
const ECM_DELETE_RESULT = 4;
const ECM_GREP_RESULT = 5;
const ECM_READ_RESULT = 7;
const ECM_LS_RESULT = 8;
const ECM_DIAGNOSTICS_RESULT = 9;
const ECM_MCP_RESULT = 11;
const ECM_BACKGROUND_SHELL_SPAWN_RES = 16;
const ECM_FETCH_RESULT = 20;
const ECM_WRITE_SHELL_STDIN_RESULT = 23;

// ExecServerMessage variant tags (used by exec router in Phase 2)
const ESM_SHELL_ARGS = 2;
const ESM_WRITE_ARGS = 3;
const ESM_DELETE_ARGS = 4;
const ESM_GREP_ARGS = 5;
const ESM_READ_ARGS = 7;
const ESM_LS_ARGS = 8;
const ESM_DIAGNOSTICS_ARGS = 9;
const ESM_MCP_ARGS = 11;
const ESM_SHELL_STREAM_ARGS = 14;
const ESM_BACKGROUND_SHELL_SPAWN = 16;
const ESM_FETCH_ARGS = 20;
const ESM_WRITE_SHELL_STDIN_ARGS = 23;

// Args sub-message field numbers (path and shell variants)
const ARG_PATH = 1; // ReadArgs.path / WriteArgs.path / DeleteArgs.path / LsArgs.path
const ARG_SHELL_COMMAND = 1; // ShellArgs.command
const ARG_SHELL_WORKING_DIR = 2; // ShellArgs.working_directory
const ARG_SHELL_TIMEOUT = 3; // ShellArgs.timeout
const ARG_SHELL_IS_BACKGROUND = 11; // ShellArgs.is_background
const ARG_SHELL_HARD_TIMEOUT = 14; // ShellArgs.hard_timeout
const ARG_FETCH_URL = 1; // FetchArgs.url

// KvServerMessage / KvClientMessage
const KSM_ID = 1;
const KSM_GET_BLOB_ARGS = 2;
const KSM_SET_BLOB_ARGS = 3;
// Field 4 of KvServerMessage is an opaque request-correlation/metadata
// envelope — observed in real wire captures. The exact schema isn't
// public; we capture its raw bytes and echo them back in our reply
// so cursor can match request to response.
const KSM_REQUEST_METADATA = 4;
const KCM_ID = 1;
const KCM_GET_BLOB_RESULT = 2;
const KCM_SET_BLOB_RESULT = 3;
const KCM_REQUEST_METADATA = 4;

// GetBlobArgs / GetBlobResult / SetBlobArgs
const GBA_BLOB_ID = 1; // GetBlobArgs.blob_id (bytes)
const SBA_BLOB_ID = 1; // SetBlobArgs.blob_id (bytes)
const SBA_BLOB_DATA = 2; // SetBlobArgs.blob_data (bytes)
const GBR_BLOB_DATA = 1; // GetBlobResult.blob_data (bytes) — verified by wire test (cursor parses field 1 as JSON)

// Rejection sub-messages (path-based: read/write/delete/ls)
const REJ_PATH = 1;
const REJ_REASON = 2;

// ShellRejected (command + working_dir + reason)
const SREJ_COMMAND = 1;
const SREJ_WORKING_DIR = 2;
const SREJ_REASON = 3;

// Generic error sub-messages
const ERR_MESSAGE = 1; // GrepError.error / WriteShellStdinError.error
const FERR_URL = 1; // FetchError.url
const FERR_ERROR = 2; // FetchError.error

// Result-message variant discriminators (oneof). field 1 = success/accepted,
// field 2 = rejected/error. Matches existing RCR_SUCCESS=1 pattern.
const RES_REJECTED = 2; // rejected variant for read/write/delete/ls/shell/bg_shell

// McpToolDefinition
const MTD_NAME = 1;
const MTD_DESCRIPTION = 2;
const MTD_INPUT_SCHEMA = 3;
const MTD_PROVIDER_IDENTIFIER = 4;
const MTD_TOOL_NAME = 5;

// McpArgs (used by Phase 5 decoder)
const MCA_NAME = 1;
const MCA_ARGS = 2; // map<string, bytes>
const MCA_TOOL_CALL_ID = 3;
const MCA_PROVIDER_IDENTIFIER = 4;
const MCA_TOOL_NAME = 5;

// McpResult variants
const MCR_SUCCESS = 1;
const MCR_ERROR = 2;
const MCS_CONTENT = 1; // McpSuccess.content (repeated McpToolResultContentItem)
const MCS_IS_ERROR = 2;
const MCC_TEXT = 1; // McpToolResultContentItem.text (oneof) -> McpTextContent
const MTC_TEXT = 1; // McpTextContent.text

// google.protobuf.Value (well-known type)
const VAL_NULL = 1;
const VAL_NUMBER = 2;
const VAL_STRING = 3;
const VAL_BOOL = 4;
const VAL_STRUCT = 5;
const VAL_LIST = 6;
const STRUCT_FIELDS = 1; // Struct.fields = map<string, Value>
const LIST_VALUES = 1; // ListValue.values = repeated Value

// proto3 map<K,V> serializes as repeated FieldsEntry { key=1, value=2 }
const MAP_KEY = 1;
const MAP_VALUE = 2;

// ─── Connect-RPC framing ───────────────────────────────────────────────────

const FLAG_NONE = 0x00;
const FLAG_GZIP = 0x01;

export function wrapConnectFrame(payload: Buffer, compressed = false): Buffer {
  const data = compressed ? zlib.gzipSync(payload) : payload;
  const header = Buffer.alloc(5);
  header[0] = compressed ? FLAG_GZIP : FLAG_NONE;
  header.writeUInt32BE(data.length, 1);
  return Buffer.concat([header, data]);
}

export type ConnectFrame = {
  flags: number;
  payload: Buffer;
};

export function* iterateConnectFrames(stream: Buffer): Generator<ConnectFrame> {
  let pos = 0;
  while (pos + 5 <= stream.length) {
    const flags = stream[pos];
    const length = stream.readUInt32BE(pos + 1);
    if (pos + 5 + length > stream.length) return;
    const raw = stream.subarray(pos + 5, pos + 5 + length);
    const payload = flags & FLAG_GZIP ? zlib.gunzipSync(raw) : raw;
    yield { flags, payload };
    pos += 5 + length;
  }
}

// ─── Model id translation ──────────────────────────────────────────────────

/**
 * Canonicalize common spelling variants of cursor's composer model ids to the
 * exact ids cursor's server accepts. Without this, an off-by-a-character id
 * (composer-2-5, composer-2.5-sdk, composer-latest, or an empty model) reaches
 * cursor verbatim and is rejected. Only these known-equivalent spellings are
 * remapped (case-insensitively); every other id — including the canonical
 * composer-2.5/composer-2.5-fast and all claude, gpt, and gemini ids — passes
 * through unchanged, so existing behavior is preserved exactly.
 */
const CURSOR_MODEL_ALIASES: Record<string, string> = {
  "": "composer-2.5",
  "composer-2-5": "composer-2.5",
  "composer-2.5-sdk": "composer-2.5",
  "composer-latest": "composer-2.5",
  "composer-2-5-fast": "composer-2.5-fast",
  "composer-2.5-sdk-fast": "composer-2.5-fast",
  "composer-latest-fast": "composer-2.5-fast",
  "grok-4.5-medium": "cursor-grok-4.5-medium",
  "grok-4.5-fast-medium": "cursor-grok-4.5-medium-fast",
  "grok-4.5-high": "cursor-grok-4.5-high",
  "grok-4.5-fast-high": "cursor-grok-4.5-high-fast",
  "grok-4.5-xhigh": "cursor-grok-4.5-xhigh",
  "grok-4.5-fast-xhigh": "cursor-grok-4.5-xhigh-fast",
};

export function normalizeCursorModelId(modelId: string): string {
  const id = (modelId ?? "").trim();
  const alias = CURSOR_MODEL_ALIASES[id.toLowerCase()];
  return alias ?? id;
}

// #7289: pinned Claude/GPT model ids carry an effort/reasoning suffix
// (e.g. "claude-opus-4-8-high", "gpt-5.5-high"). cursor's server has no route
// for the suffixed id — it only accepts the base id plus an out-of-band
// ModelParameter. Ground truth captured from the real cursor-agent client:
// Claude ids surface the suffix as {id:"effort", value:<suffix>}, GPT ids as
// {id:"reasoning", value:<suffix>}. "-fast"/"-thinking" are separate toggles
// (already handled elsewhere / not covered by this suffix set) and must not
// be misread as an effort value.
//
// Grok (`cursor-grok-*` / legacy `grok-*`) follows the Claude-style `effort`
// parameter. Without the split, ids like `cursor-grok-4.5-high` return empty
// turns (same symptom as #7289). Combined `-high-fast` is supported.
/**
 * If `normalized` starts with `prefix` and ends with one of the known effort
 * suffixes, split it into the base model id plus a `{id: paramId, value}`
 * ModelParameter. Returns null when no known suffix matches, leaving the id
 * untouched (e.g. "claude-2.5" with no suffix, or an unrecognized tail).
 */
function splitCursorEffortSuffix(
  normalized: string,
  prefix: string,
  paramId: string
): { modelId: string; parameters: Array<{ id: string; value: string }> } | null {
  if (!normalized.startsWith(prefix)) {
    return null;
  }
  for (const suffix of CURSOR_EFFORT_SUFFIXES) {
    const marker = `-${suffix}`;
    if (normalized.endsWith(marker) && normalized.length > prefix.length + marker.length) {
      return {
        modelId: normalized.slice(0, -marker.length),
        parameters: [{ id: paramId, value: suffix }],
      };
    }
  }
  return null;
}

/**
 * Grok family: strip optional `-fast`, then effort suffix → ModelParameters.
 * Prefer `cursor-grok-` over bare `grok-` so `cursor-grok-*` is not mis-matched.
 */
function resolveGrokRequestedModel(
  normalized: string
): { modelId: string; parameters: Array<{ id: string; value: string }> } | null {
  const prefix = normalized.startsWith("cursor-grok-")
    ? "cursor-grok-"
    : normalized.startsWith("grok-")
      ? "grok-"
      : null;
  if (!prefix) return null;

  let id = normalized;
  const extraParams: Array<{ id: string; value: string }> = [];
  if (id.endsWith("-fast") && id.length > prefix.length + "-fast".length) {
    id = id.slice(0, -"-fast".length);
    extraParams.push({ id: "fast", value: "true" });
  }

  const effortSplit = splitCursorEffortSuffix(id, prefix, "effort");
  if (effortSplit) {
    return {
      modelId: effortSplit.modelId,
      parameters: [...effortSplit.parameters, ...extraParams],
    };
  }
  if (extraParams.length > 0) {
    return { modelId: id, parameters: extraParams };
  }
  return null;
}

/**
 * cursor-agent rewrites model ids before putting them on the wire:
 *   "auto"                 → RequestedModel { model_id: "default" }
 *   "auto-cost"            → RequestedModel { model_id: "default",
 *                                             parameters: [{id: "optimization", value: "cost"}] }
 *   "composer-2-fast"      → RequestedModel { model_id: "composer-2",
 *                                             parameters: [{id: "fast", value: "true"}] }
 *   "claude-opus-4-8-high" → RequestedModel { model_id: "claude-opus-4-8",
 *                                             parameters: [{id: "effort", value: "high"}] }
 *   "gpt-5.5-high"         → RequestedModel { model_id: "gpt-5.5",
 *                                             parameters: [{id: "reasoning", value: "high"}] }
 *   "cursor-grok-4.5-high" → RequestedModel { model_id: "cursor-grok-4.5",
 *                                             parameters: [{id: "effort", value: "high"}] }
 *
 * Other ids are passed through verbatim after spelling-variant normalization
 * (see normalizeCursorModelId).
 */
/** Cursor Router optimization levels (OpenCodex `CURSOR_ROUTING_LEVELS`). */
export const CURSOR_ROUTING_LEVELS = ["cost", "balance", "intelligence"] as const;
export type CursorRoutingLevel = (typeof CURSOR_ROUTING_LEVELS)[number];

/**
 * ModelParameter id for Cursor's Cost/Balance/Intelligence control on wire model
 * `default` (OpenCodex `CURSOR_ROUTING_LEVEL_PARAMETER_ID`).
 */
export const CURSOR_ROUTING_LEVEL_PARAMETER_ID = "optimization";

export type ResolveRequestedModelOptions = {
  /**
   * When set and containing the normalized client model id, send that id
   * verbatim on AgentRun (skip composer-fast / Claude / GPT splits).
   * Live AvailableModels returns flattened effort-suffixed ids; stripping them
   * to a missing base causes Cursor `AI Model Not Found`. Auto / auto-* still
   * map to wire `default` (+ optimization) even when present in this set.
   */
  liveCatalogIds?: ReadonlySet<string>;
};

export function resolveRequestedModel(
  modelId: string,
  opts?: ResolveRequestedModelOptions
): {
  modelId: string;
  parameters: Array<{ id: string; value: string }>;
} {
  const normalized = normalizeCursorModelId(modelId);
  if (normalized === "auto") {
    return { modelId: "default", parameters: [] };
  }
  // OpenCodex-style router variants: auto-cost / auto-balance / auto-intelligence
  // → wire `default` + ModelParameter { id: "optimization", value: <level> }.
  for (const level of CURSOR_ROUTING_LEVELS) {
    if (normalized === `auto-${level}`) {
      return {
        modelId: "default",
        parameters: [{ id: CURSOR_ROUTING_LEVEL_PARAMETER_ID, value: level }],
      };
    }
  }
  const oneMillionContext = resolveOneMillionContextModel(normalized);
  if (oneMillionContext) return oneMillionContext;
  // Live catalog is authoritative for exact ids (flattened effort variants).
  if (opts?.liveCatalogIds?.has(normalized)) {
    return { modelId: normalized, parameters: [] };
  }
  // Strip the "-fast" suffix and surface it as a parameter — only the composer
  // family observably needs this split today, but the protocol field is generic.
  if (normalized.startsWith("composer-") && normalized.endsWith("-fast")) {
    return {
      modelId: normalized.slice(0, -"-fast".length),
      parameters: [{ id: "fast", value: "true" }],
    };
  }
  const grokSplit = resolveGrokRequestedModel(normalized);
  if (grokSplit) {
    return grokSplit;
  }
  const claudeSplit = splitCursorEffortSuffix(normalized, "claude-", "effort");
  if (claudeSplit) {
    return claudeSplit;
  }
  const gptSplit = splitCursorEffortSuffix(normalized, "gpt-", "reasoning");
  if (gptSplit) {
    return gptSplit;
  }
  return { modelId: normalized, parameters: [] };
}

// ─── Request encoder ───────────────────────────────────────────────────────

/**
 * OpenAI tool shape (subset OmniRoute receives from clients). Cursor's
 * AgentRunRequest carries declared tools as McpToolDefinition entries; the
 * model uses these to know what's invocable, then emits ExecServerMessage
 * mcp_args when it wants to call one (Phase 5 surfaces those as OpenAI
 * tool_calls deltas).
 */
export type OpenAITool = {
  type?: string;
  function: {
    name: string;
    description?: string;
    parameters?: unknown;
  };
};

export type AgentRunInput = {
  modelId: string;
  userText: string;
  conversationId?: string;
  messageId?: string;
  tools?: OpenAITool[];
  // Phase 7: when systemPrompt is set, the encoder hashes
  // {role:"system", content:<prompt>} into a blob, stores it in blobStore
  // (keyed by hex sha256), and embeds the blob id in the
  // ConversationStateStructure.root_prompt_messages_json field. Cursor's
  // server then sends a KvServerMessage.GetBlobArgs requesting the blob,
  // which the executor's processFrame replies to with the stored bytes.
  systemPrompt?: string;
  blobStore?: Map<string, Buffer>;
  // Vision input: images attached to the current user turn. Encoded as
  // SelectedContext.selected_images[] via blobIdWithData (see
  // encodeSelectedImageBody). Empty / undefined keeps the request
  // byte-identical to the text-only path.
  images?: EncodedImage[];
  /** Exact live AvailableModels ids — see resolveRequestedModel liveCatalogIds. */
  liveCatalogIds?: ReadonlySet<string>;
};

export { cursorImageAttachmentPath, encodeSelectedImageBody };
export type { EncodedImage };

/**
 * Convert OpenAI tool definitions to cursor McpToolDefinition bodies. Used
 * both by the AgentRunRequest builder (mcp_tools field) and by the request
 * context ack (request_context.tools field) — the model needs both to see
 * the tools as available.
 */
export function openAIToolsToMcpDefs(tools: OpenAITool[]): McpToolDefinition[] {
  return tools.map((t) => {
    const params = t.function?.parameters ?? { type: "object", properties: {} };
    return {
      name: t.function.name,
      description: t.function.description ?? "",
      inputSchemaBytes: jsonSchemaToProtobufValue(params),
      providerIdentifier: "omniroute",
      toolName: t.function.name,
    };
  });
}

export function encodeAgentRunRequest(input: AgentRunInput): Buffer {
  const conversationId = input.conversationId || crypto.randomUUID();
  const messageId = input.messageId || crypto.randomUUID();
  const { modelId, parameters } = resolveRequestedModel(input.modelId, {
    liveCatalogIds: input.liveCatalogIds,
  });

  // UserMessage { text, message_id, selected_context, mode=1 }.
  // selected_context is normally an empty placeholder (required by the server
  // even when empty — see below), but when the turn carries vision input we
  // populate its selected_images[] with blobIdWithData-encoded images (and
  // store the bytes in blobStore for getBlob). The empty-images path produces
  // byte-identical output to the text-only request.
  const selectedContextParts: Buffer[] = [];
  if (input.images && input.images.length > 0) {
    for (const img of input.images) {
      selectedContextParts.push(
        encodeMessage(SC_SELECTED_IMAGES, [encodeSelectedImageBody(img, input.blobStore)])
      );
    }
  }
  // The empty selected_context placeholder and mode=1 match cursor-agent's
  // wire format; without them the server accepts the request but never
  // streams a response.
  const userMessage = encodeMessage(UMA_USER_MESSAGE, [
    encodeString(UM_TEXT, input.userText),
    encodeString(UM_MESSAGE_ID, messageId),
    encodeMessage(UM_SELECTED_CONTEXT, selectedContextParts),
    Buffer.concat([encodeTag(UM_MODE, WT_VARINT), encodeVarint(1)]),
  ]);
  // UserMessageAction { user_message }
  const userMessageAction = encodeMessage(CA_USER_MESSAGE_ACTION, [userMessage]);
  // ConversationAction { user_message_action }
  const action = encodeMessage(ARR_ACTION, [userMessageAction]);

  // ConversationStateStructure. When a system prompt is present, hash it to
  // a sha256 blob id and reference the blob from root_prompt_messages_json;
  // the server requests the blob over the KV channel during the turn.
  const cssParts: Buffer[] = [];
  if (input.systemPrompt && input.blobStore) {
    const systemJson = JSON.stringify({ role: "system", content: input.systemPrompt });
    const blobBytes = Buffer.from(systemJson, "utf8");
    const blobId = crypto.createHash("sha256").update(blobBytes).digest();
    input.blobStore.set(blobId.toString("hex"), blobBytes);
    cssParts.push(encodeBytes(CSS_ROOT_PROMPT, blobId));
  }
  const conversationState = encodeMessage(ARR_CONVERSATION_STATE, cssParts);

  // RequestedModel { model_id, [parameters...] }
  const rmParts: Buffer[] = [encodeString(RM_MODEL_ID, modelId)];
  for (const param of parameters) {
    rmParts.push(
      encodeMessage(RM_PARAMETERS, [
        encodeString(RMP_ID, param.id),
        encodeString(RMP_VALUE, param.value),
      ])
    );
  }
  const requestedModel = encodeMessage(ARR_REQUESTED_MODEL, rmParts);

  // ModelDetails { model_id, display_model_id, display_name } — all set to the resolved
  // model id. #3714: RequestedModel (field 9) alone resolves server-routed ids
  // (auto → default, composer-*) but pinned Claude/GPT *thinking* variants returned an
  // empty turn without this envelope. cursor-agent's working wire format sends both, so
  // we keep RequestedModel (preserves the -fast `parameters` it carries) and add this.
  const modelDetails = encodeMessage(ARR_MODEL_DETAILS, [
    encodeString(MD_MODEL_ID, modelId),
    encodeString(MD_DISPLAY_MODEL_ID, modelId),
    encodeString(MD_DISPLAY_NAME, modelId),
  ]);

  // mcp_tools: McpTools envelope at field 4 of AgentRunRequest. Each tool
  // is packed inside the envelope at field 1 (repeated McpToolDefinition).
  // Empty placeholder for non-tool calls (the field is observably required
  // even when empty — cursor errors if it's omitted entirely).
  const mcpToolDefs = input.tools ? openAIToolsToMcpDefs(input.tools) : [];
  const mcpToolsBlock = encodeMessage(
    ARR_MCP_TOOLS,
    mcpToolDefs.map((def) => encodeMessage(ARR_MCP_TOOLS_INNER, [encodeMcpToolDefinitionBody(def)]))
  );

  // AgentRunRequest. Field order mirrors cursor-agent's wire format; empty
  // placeholders for mcp_tools and request_id are observably required.
  const agentRunRequest = [
    conversationState,
    action,
    modelDetails,
    mcpToolsBlock,
    encodeString(ARR_CONVERSATION_ID, conversationId),
    requestedModel,
    Buffer.concat([encodeTag(ARR_UNKNOWN_12, WT_VARINT), encodeVarint(0)]),
    encodeString(ARR_REQUEST_ID, conversationId),
  ];

  // AgentClientMessage { run_request }
  const acm = encodeMessage(ACM_RUN_REQUEST, agentRunRequest);
  return acm;
}

// McpTools.tool field number — repeated McpToolDefinition entries go under
// field 1 of the McpTools wrapper (which itself is field 4 of AgentRunRequest).
const ARR_MCP_TOOLS_INNER = 1;

export function buildAgentRequestBody(input: AgentRunInput): Buffer {
  return wrapConnectFrame(encodeAgentRunRequest(input));
}

// ─── Response decoder ──────────────────────────────────────────────────────

export type DecodedDelta =
  | { kind: "text"; text: string }
  | { kind: "thinking"; text: string }
  | { kind: "thinking_complete" }
  | { kind: "token_delta"; tokens: number }
  | { kind: "turn_ended" }
  | { kind: "heartbeat" }
  | { kind: "tool_call_started" }
  | { kind: "tool_call_completed" }
  | {
      kind: "native_todo_write";
      toolCallId: string;
      merge: boolean;
      todos: Array<{
        content: string;
        status: "pending" | "in_progress" | "completed" | "cancelled";
      }>;
    }
  | { kind: "kv_server_message" }
  | { kind: "unknown"; field: number };

type InteractionUpdateDecoder = (field: Field) => DecodedDelta[];

const INTERACTION_UPDATE_DECODERS: Partial<Record<number, InteractionUpdateDecoder>> = {
  [IU_TEXT_DELTA]: (field) =>
    field.wireType === WT_LEN
      ? [{ kind: "text", text: decodeStringField(field.bytes, TDU_TEXT) }]
      : [],
  [IU_THINKING_DELTA]: (field) =>
    field.wireType === WT_LEN
      ? [{ kind: "thinking", text: decodeStringField(field.bytes, TDU_TEXT) }]
      : [],
  [IU_THINKING_COMPLETED]: () => [{ kind: "thinking_complete" }],
  [IU_TOOL_CALL_STARTED]: () => [{ kind: "tool_call_started" }],
  [IU_TOOL_CALL_COMPLETED]: (field) => {
    const deltas: DecodedDelta[] = [];
    if (field.wireType === WT_LEN) {
      const todoWrite = decodeNativeTodoWriteCompletion(field.bytes);
      if (todoWrite) deltas.push(todoWrite);
    }
    deltas.push({ kind: "tool_call_completed" });
    return deltas;
  },
  [IU_TOKEN_DELTA]: (field) =>
    field.wireType === WT_LEN
      ? [{ kind: "token_delta", tokens: decodeVarintField(field.bytes, 1) }]
      : [],
  [IU_HEARTBEAT]: () => [{ kind: "heartbeat" }],
  [IU_TURN_ENDED]: () => [{ kind: "turn_ended" }],
};

function decodeInteractionUpdate(field: Field): DecodedDelta[] {
  const decoder = INTERACTION_UPDATE_DECODERS[field.fieldNumber];
  return decoder ? decoder(field) : [{ kind: "unknown", field: field.fieldNumber }];
}

export function decodeAgentServerMessage(payload: Buffer): DecodedDelta[] {
  const out: DecodedDelta[] = [];
  for (const top of decodeFields(payload)) {
    if (top.fieldNumber === ASM_KV_SERVER_MESSAGE && top.wireType === 2) {
      out.push({ kind: "kv_server_message" });
      continue;
    }
    if (top.fieldNumber !== ASM_INTERACTION_UPDATE || top.wireType !== 2) continue;
    for (const update of decodeFields(top.bytes)) {
      out.push(...decodeInteractionUpdate(update));
    }
  }
  return out;
}

// ─── Exec channel handshake ────────────────────────────────────────────────

/**
 * Parse an AgentServerMessage looking for an ExecServerMessage requesting
 * context (sent right after the init RunRequest). The server stalls until we
 * respond on the same h2 stream with an ExecClientMessage.RequestContextResult.
 *
 * Kept for backward compat — internally delegates to decodeExecServerEvent.
 */
export function decodeExecRequestContext(payload: Buffer): { id: number; execId: string } | null {
  const event = decodeExecServerEvent(payload);
  if (event && event.kind === "exec_request_context") {
    return { id: event.execMsgId, execId: event.execId };
  }
  return null;
}

// ─── Phase 7: KvServerMessage decoder ──────────────────────────────────────
//
// Cursor multiplexes a key-value channel through the same h2 stream. After
// the init RunRequest with a CSS root_prompt_messages_json blob, the server
// sends KvServerMessage.GetBlobArgs requesting the blob bytes; we look up
// the bytes in our request-scoped blobStore and reply on the same stream.
//
// SetBlobArgs is sent at end-of-turn (server saving the assistant message);
// we ack with an empty SetBlobResult.

export type KvServerEvent =
  | {
      kind: "kv_get_blob";
      kvId: number;
      blobId: Buffer;
      // Opaque metadata cursor sends with the request; echoed back in the
      // reply so cursor can match request/response correctly. Empty when
      // the request didn't include the metadata field.
      requestMetadata: Buffer | null;
    }
  | {
      kind: "kv_set_blob";
      kvId: number;
      blobId: Buffer;
      blobData: Buffer;
      requestMetadata: Buffer | null;
    };

function findLengthDelimitedField(fields: Field[], fieldNumber: number): Buffer | null {
  const field = findField(fields, fieldNumber);
  return field?.wireType === WT_LEN ? field.bytes : null;
}

function decodeBlobId(payload: Buffer, fieldNumber: number): Buffer {
  return findLengthDelimitedField(decodeFields(payload), fieldNumber) ?? Buffer.alloc(0);
}

function decodeSetBlobArgs(payload: Buffer): { blobId: Buffer; blobData: Buffer } {
  const fields = decodeFields(payload);
  return {
    blobId: findLengthDelimitedField(fields, SBA_BLOB_ID) ?? Buffer.alloc(0),
    blobData: findLengthDelimitedField(fields, SBA_BLOB_DATA) ?? Buffer.alloc(0),
  };
}

export function decodeKvServerEvent(payload: Buffer): KvServerEvent | null {
  const top = findField(decodeFields(payload), ASM_KV_SERVER_MESSAGE);
  if (top?.wireType !== WT_LEN) return null;

  const fields = decodeFields(top.bytes);
  const idField = findField(fields, KSM_ID);
  const kvId = idField?.wireType === WT_VARINT ? Number(idField.varint) : 0;
  const requestMetadata = findLengthDelimitedField(fields, KSM_REQUEST_METADATA);
  const getBlobArgs = findLengthDelimitedField(fields, KSM_GET_BLOB_ARGS);
  if (getBlobArgs) {
    return {
      kind: "kv_get_blob",
      kvId,
      blobId: decodeBlobId(getBlobArgs, GBA_BLOB_ID),
      requestMetadata,
    };
  }

  const setBlobArgs = findLengthDelimitedField(fields, KSM_SET_BLOB_ARGS);
  if (!setBlobArgs) return null;
  return { kind: "kv_set_blob", kvId, ...decodeSetBlobArgs(setBlobArgs), requestMetadata };
}

// ─── Phase 2: full ExecServerMessage variant decoder ───────────────────────
//
// Cursor's server multiplexes a tool channel through the h2 stream. After
// the init RunRequest, the server may emit any of:
//   - request_context_args (always first — context handshake)
//   - read/write/delete/ls/grep/diagnostics/shell/etc args (built-in tools)
//   - mcp_args (MCP tool the model wants to invoke — declared via Phase 3)
// All variants share the same ExecServerMessage envelope { id, exec_id, ... };
// only the discriminator field number differs.

export type ExecServerEvent =
  | { kind: "exec_request_context"; execMsgId: number; execId: string }
  | { kind: "exec_read"; execMsgId: number; execId: string; path: string }
  | { kind: "exec_write"; execMsgId: number; execId: string; path: string }
  | { kind: "exec_delete"; execMsgId: number; execId: string; path: string }
  | { kind: "exec_ls"; execMsgId: number; execId: string; path: string }
  | { kind: "exec_grep"; execMsgId: number; execId: string }
  | { kind: "exec_diagnostics"; execMsgId: number; execId: string }
  | {
      kind: "exec_shell";
      execMsgId: number;
      execId: string;
      command: string;
      workingDir: string;
      timeout: number;
      isBackground: boolean;
      hardTimeout: number;
    }
  | {
      kind: "exec_shell_stream";
      execMsgId: number;
      execId: string;
      command: string;
      workingDir: string;
      timeout: number;
      isBackground: boolean;
      hardTimeout: number;
    }
  | {
      kind: "exec_bg_shell";
      execMsgId: number;
      execId: string;
      command: string;
      workingDir: string;
      timeout: number;
      isBackground: boolean;
      hardTimeout: number;
    }
  | { kind: "exec_fetch"; execMsgId: number; execId: string; url: string }
  | { kind: "exec_write_shell_stdin"; execMsgId: number; execId: string }
  | {
      kind: "exec_mcp";
      execMsgId: number;
      execId: string;
      toolName: string;
      toolCallId: string;
      // args populated by Phase 5 (decodeMcpArgs); empty {} until then.
      args: Record<string, unknown>;
    };

type DecodedShellArgs = {
  command: string;
  workingDir: string;
  timeout: number;
  isBackground: boolean;
  hardTimeout: number;
};

function decodeShellArgs(payload: Buffer): DecodedShellArgs {
  const decoded: DecodedShellArgs = {
    command: decodeStringField(payload, ARG_SHELL_COMMAND),
    workingDir: decodeStringField(payload, ARG_SHELL_WORKING_DIR),
    timeout: 0,
    isBackground: false,
    hardTimeout: 0,
  };
  for (const field of decodeFields(payload)) {
    if (field.wireType !== 0) continue;
    if (field.fieldNumber === ARG_SHELL_TIMEOUT) decoded.timeout = Number(field.varint);
    else if (field.fieldNumber === ARG_SHELL_IS_BACKGROUND) {
      decoded.isBackground = field.varint !== 0n;
    } else if (field.fieldNumber === ARG_SHELL_HARD_TIMEOUT) {
      decoded.hardTimeout = Number(field.varint);
    }
  }
  return decoded;
}

type ExecEventContext = {
  execMsgId: number;
  execId: string;
  variantBytes: Buffer;
};

type ExecEventDecoder = (context: ExecEventContext) => ExecServerEvent;
type PathExecKind = "exec_read" | "exec_write" | "exec_delete" | "exec_ls";
type ShellExecKind = "exec_shell" | "exec_shell_stream" | "exec_bg_shell";

function createPathExecEvent(kind: PathExecKind, context: ExecEventContext): ExecServerEvent {
  return {
    kind,
    execMsgId: context.execMsgId,
    execId: context.execId,
    path: decodeStringField(context.variantBytes, ARG_PATH),
  };
}

function createShellExecEvent(kind: ShellExecKind, context: ExecEventContext): ExecServerEvent {
  return {
    kind,
    execMsgId: context.execMsgId,
    execId: context.execId,
    ...decodeShellArgs(context.variantBytes),
  };
}

function decodeMcpMapEntry(payload: Buffer): { key: string; value: unknown } | null {
  const fields = decodeFields(payload);
  const key = findLengthDelimitedField(fields, MAP_KEY)?.toString("utf8") ?? "";
  const valueBytes = findLengthDelimitedField(fields, MAP_VALUE);
  return key && valueBytes ? { key, value: decodeProtobufValue(valueBytes) } : null;
}

function decodeMcpExecEvent(context: ExecEventContext): ExecServerEvent {
  const fields = decodeFields(context.variantBytes);
  const canonicalName = findLengthDelimitedField(fields, MCA_TOOL_NAME);
  const fallbackName = findLengthDelimitedField(fields, MCA_NAME);
  const toolName = (canonicalName ?? fallbackName)?.toString("utf8") ?? "";
  const toolCallId = findLengthDelimitedField(fields, MCA_TOOL_CALL_ID)?.toString("utf8") ?? "";
  const args: Record<string, unknown> = {};
  for (const field of fields) {
    if (field.fieldNumber !== MCA_ARGS || field.wireType !== WT_LEN) continue;
    const entry = decodeMcpMapEntry(field.bytes);
    if (entry) args[entry.key] = entry.value;
  }
  return {
    kind: "exec_mcp",
    execMsgId: context.execMsgId,
    execId: context.execId,
    toolName,
    toolCallId,
    args,
  };
}

const EXEC_EVENT_DECODERS: Partial<Record<number, ExecEventDecoder>> = {
  [ESM_REQUEST_CONTEXT_ARGS]: ({ execMsgId, execId }) => ({
    kind: "exec_request_context",
    execMsgId,
    execId,
  }),
  [ESM_READ_ARGS]: (context) => createPathExecEvent("exec_read", context),
  [ESM_WRITE_ARGS]: (context) => createPathExecEvent("exec_write", context),
  [ESM_DELETE_ARGS]: (context) => createPathExecEvent("exec_delete", context),
  [ESM_LS_ARGS]: (context) => createPathExecEvent("exec_ls", context),
  [ESM_GREP_ARGS]: ({ execMsgId, execId }) => ({ kind: "exec_grep", execMsgId, execId }),
  [ESM_DIAGNOSTICS_ARGS]: ({ execMsgId, execId }) => ({
    kind: "exec_diagnostics",
    execMsgId,
    execId,
  }),
  [ESM_SHELL_ARGS]: (context) => createShellExecEvent("exec_shell", context),
  [ESM_SHELL_STREAM_ARGS]: (context) => createShellExecEvent("exec_shell_stream", context),
  [ESM_BACKGROUND_SHELL_SPAWN]: (context) => createShellExecEvent("exec_bg_shell", context),
  [ESM_FETCH_ARGS]: ({ execMsgId, execId, variantBytes }) => ({
    kind: "exec_fetch",
    execMsgId,
    execId,
    url: decodeStringField(variantBytes, ARG_FETCH_URL),
  }),
  [ESM_WRITE_SHELL_STDIN_ARGS]: ({ execMsgId, execId }) => ({
    kind: "exec_write_shell_stdin",
    execMsgId,
    execId,
  }),
  [ESM_MCP_ARGS]: decodeMcpExecEvent,
};

function decodeExecEventContext(
  payload: Buffer
): (ExecEventContext & { variantField: number }) | null {
  const top = findField(decodeFields(payload), ASM_EXEC_SERVER_MESSAGE);
  if (top?.wireType !== WT_LEN) return null;

  const fields = decodeFields(top.bytes);
  const idField = findField(fields, ESM_ID);
  const variant = fields.find(
    (field) => field.wireType === WT_LEN && field.fieldNumber !== ESM_EXEC_ID
  );
  if (!variant || variant.wireType !== WT_LEN) return null;
  return {
    execMsgId: idField?.wireType === WT_VARINT ? Number(idField.varint) : 0,
    execId: findLengthDelimitedField(fields, ESM_EXEC_ID)?.toString("utf8") ?? "",
    variantField: variant.fieldNumber,
    variantBytes: variant.bytes,
  };
}

export function decodeExecServerEvent(payload: Buffer): ExecServerEvent | null {
  const context = decodeExecEventContext(payload);
  if (!context) return null;
  const decoder = EXEC_EVENT_DECODERS[context.variantField];
  return decoder?.(context) ?? null;
}

/**
 * Build the ack the server expects after sending RequestContextArgs. We
 * respond with a RequestContext (optionally containing the declared MCP
 * tools so cursor's model knows what's available); cursor's server then
 * proceeds to stream the model's response.
 *
 * The Phase 3 `tools` argument is what unblocks tool-calling — without it
 * cursor's server still streams text but the model never sees the tools as
 * available.
 */
export function encodeRequestContextResponse(
  id: number,
  execId: string,
  tools?: McpToolDefinition[]
): Buffer {
  const rcParts: Buffer[] = [];
  if (tools && tools.length > 0) {
    for (const tool of tools) {
      rcParts.push(encodeMessage(RCS_TOOLS, [encodeMcpToolDefinitionBody(tool)]));
    }
  }
  const requestContext = encodeMessage(RCS_REQUEST_CONTEXT, rcParts);
  const success = encodeMessage(RCR_SUCCESS, [requestContext]);
  const ecm = encodeMessage(ACM_EXEC_CLIENT_MESSAGE, [
    encodeUInt32Field(ECM_ID, id),
    encodeString(ECM_EXEC_ID, execId),
    encodeMessage(ECM_REQUEST_CONTEXT_RESULT, [success]),
  ]);
  return wrapConnectFrame(ecm);
}

// RequestContext.tools field number — multiple tool defs are repeated within
// the inner RequestContext message.
const RCS_TOOLS = 2;

// ─── ExecClientMessage wrapper ──────────────────────────────────────────────

/**
 * Build an ExecClientMessage frame:
 *   AgentClientMessage {
 *     exec_client_message (2): ExecClientMessage {
 *       id (1): execMsgId,
 *       exec_id (15): execId,
 *       <resultFieldNumber>: resultPayload,
 *     }
 *   }
 * Connect-RPC framed, ready to write to the h2 stream.
 *
 * `exec_id` is force-set even when empty (matches kaitranntt's behavior).
 */
function wrapExecClientMessage(
  execMsgId: number,
  execId: string,
  resultFieldNumber: number,
  resultPayload: Buffer
): Buffer {
  const ecm = encodeMessage(ACM_EXEC_CLIENT_MESSAGE, [
    encodeUInt32Field(ECM_ID, execMsgId),
    encodeString(ECM_EXEC_ID, execId),
    encodeMessage(resultFieldNumber, [resultPayload]),
  ]);
  return wrapConnectFrame(ecm);
}

// ─── Phase 1: built-in tool rejection encoders ─────────────────────────────
// Cursor's model invokes built-in tools (read/write/shell/grep/etc.) which we
// can't safely run inside the proxy. We respond with a typed rejection so the
// model continues without that tool — matches kaitranntt's stance and avoids
// stalling the h2 stream.

function encodePathRejection(path: string, reason: string): Buffer {
  return Buffer.concat([encodeString(REJ_PATH, path), encodeString(REJ_REASON, reason)]);
}

function encodeShellRejection(command: string, workingDir: string, reason: string): Buffer {
  return Buffer.concat([
    encodeString(SREJ_COMMAND, command),
    encodeString(SREJ_WORKING_DIR, workingDir),
    encodeString(SREJ_REASON, reason),
  ]);
}

export function encodeExecReadRejected(
  execMsgId: number,
  execId: string,
  path: string,
  reason: string
): Buffer {
  const rejected = encodeMessage(RES_REJECTED, [encodePathRejection(path, reason)]);
  return wrapExecClientMessage(execMsgId, execId, ECM_READ_RESULT, rejected);
}

export function encodeExecWriteRejected(
  execMsgId: number,
  execId: string,
  path: string,
  reason: string
): Buffer {
  const rejected = encodeMessage(RES_REJECTED, [encodePathRejection(path, reason)]);
  return wrapExecClientMessage(execMsgId, execId, ECM_WRITE_RESULT, rejected);
}

export function encodeExecDeleteRejected(
  execMsgId: number,
  execId: string,
  path: string,
  reason: string
): Buffer {
  const rejected = encodeMessage(RES_REJECTED, [encodePathRejection(path, reason)]);
  return wrapExecClientMessage(execMsgId, execId, ECM_DELETE_RESULT, rejected);
}

export function encodeExecLsRejected(
  execMsgId: number,
  execId: string,
  path: string,
  reason: string
): Buffer {
  const rejected = encodeMessage(RES_REJECTED, [encodePathRejection(path, reason)]);
  return wrapExecClientMessage(execMsgId, execId, ECM_LS_RESULT, rejected);
}

export function encodeExecShellRejected(
  execMsgId: number,
  execId: string,
  command: string,
  workingDir: string,
  reason: string
): Buffer {
  const rejected = encodeMessage(RES_REJECTED, [encodeShellRejection(command, workingDir, reason)]);
  return wrapExecClientMessage(execMsgId, execId, ECM_SHELL_RESULT, rejected);
}

export function encodeExecBackgroundShellSpawnRejected(
  execMsgId: number,
  execId: string,
  command: string,
  workingDir: string,
  reason: string
): Buffer {
  const rejected = encodeMessage(RES_REJECTED, [encodeShellRejection(command, workingDir, reason)]);
  return wrapExecClientMessage(execMsgId, execId, ECM_BACKGROUND_SHELL_SPAWN_RES, rejected);
}

export function encodeExecGrepError(execMsgId: number, execId: string, errMsg: string): Buffer {
  const grepError = encodeString(ERR_MESSAGE, errMsg);
  const errorVariant = encodeMessage(RES_REJECTED, [grepError]);
  return wrapExecClientMessage(execMsgId, execId, ECM_GREP_RESULT, errorVariant);
}

export function encodeExecFetchError(
  execMsgId: number,
  execId: string,
  url: string,
  errMsg: string
): Buffer {
  const fetchError = Buffer.concat([encodeString(FERR_URL, url), encodeString(FERR_ERROR, errMsg)]);
  const errorVariant = encodeMessage(RES_REJECTED, [fetchError]);
  return wrapExecClientMessage(execMsgId, execId, ECM_FETCH_RESULT, errorVariant);
}

export function encodeExecWriteShellStdinError(
  execMsgId: number,
  execId: string,
  errMsg: string
): Buffer {
  const stdinError = encodeString(ERR_MESSAGE, errMsg);
  const errorVariant = encodeMessage(RES_REJECTED, [stdinError]);
  return wrapExecClientMessage(execMsgId, execId, ECM_WRITE_SHELL_STDIN_RESULT, errorVariant);
}

export function encodeExecDiagnosticsResult(execMsgId: number, execId: string): Buffer {
  // DiagnosticsResult is empty — there's no rejection variant.
  return wrapExecClientMessage(execMsgId, execId, ECM_DIAGNOSTICS_RESULT, Buffer.alloc(0));
}

// ─── Phase 1: MCP result encoders (used when WE invoke a tool on behalf
// of the model — Phase 5 wires this to OpenAI tool_calls). ─────────────────

export function encodeExecMcpResult(
  execMsgId: number,
  execId: string,
  content: string,
  isError: boolean
): Buffer {
  // McpTextContent { text } → McpToolResultContentItem.text
  const textContent = encodeMessage(MCC_TEXT, [encodeString(MTC_TEXT, content)]);
  const successFields: Buffer[] = [encodeMessage(MCS_CONTENT, [textContent])];
  if (isError) successFields.push(encodeBoolField(MCS_IS_ERROR, true));
  const success = encodeMessage(MCR_SUCCESS, successFields);
  return wrapExecClientMessage(execMsgId, execId, ECM_MCP_RESULT, success);
}

export function encodeExecMcpError(execMsgId: number, execId: string, errMsg: string): Buffer {
  const mcpError = encodeString(ERR_MESSAGE, errMsg);
  const errorVariant = encodeMessage(MCR_ERROR, [mcpError]);
  return wrapExecClientMessage(execMsgId, execId, ECM_MCP_RESULT, errorVariant);
}

// ─── Phase 1: KV blob handshake encoders ───────────────────────────────────

/**
 * Reply to KvServerMessage.GetBlobArgs. Server sends `{ id, blob_id, ... }`;
 * we look up the blob in our request-scoped store and reply with the bytes.
 * Echoes the opaque request_metadata cursor sent so the server can match
 * request to response.
 */
export function encodeKvGetBlobResult(
  kvId: number,
  blobData: Buffer,
  requestMetadata: Buffer | null = null
): Buffer {
  const getBlobResult = encodeBytes(GBR_BLOB_DATA, blobData);
  const parts: Buffer[] = [];
  if (kvId !== 0) parts.push(encodeUInt32Field(KCM_ID, kvId));
  parts.push(encodeMessage(KCM_GET_BLOB_RESULT, [getBlobResult]));
  if (requestMetadata && requestMetadata.length > 0) {
    parts.push(encodeBytes(KCM_REQUEST_METADATA, requestMetadata));
  }
  const kcm = encodeMessage(ACM_KV_CLIENT_MESSAGE, parts);
  return wrapConnectFrame(kcm);
}

/**
 * Ack KvServerMessage.SetBlobArgs. Server is saving an assistant turn; we
 * acknowledge with an empty SetBlobResult so the stream proceeds.
 */
export function encodeKvSetBlobResult(kvId: number, requestMetadata: Buffer | null = null): Buffer {
  const parts: Buffer[] = [];
  if (kvId !== 0) parts.push(encodeUInt32Field(KCM_ID, kvId));
  parts.push(encodeMessage(KCM_SET_BLOB_RESULT, []));
  if (requestMetadata && requestMetadata.length > 0) {
    parts.push(encodeBytes(KCM_REQUEST_METADATA, requestMetadata));
  }
  const kcm = encodeMessage(ACM_KV_CLIENT_MESSAGE, parts);
  return wrapConnectFrame(kcm);
}

// ─── Phase 1: MCP tool definitions ─────────────────────────────────────────

export type McpToolDefinition = {
  name: string;
  description: string;
  inputSchemaBytes: Buffer;
  providerIdentifier?: string;
  toolName?: string;
};

/**
 * Encode the body of an McpToolDefinition (without the wrapping field tag).
 * Use this when embedding a tool def inside a parent message — the parent
 * supplies the field number via encodeMessage(parentField, [body]).
 */
export function encodeMcpToolDefinitionBody(def: McpToolDefinition): Buffer {
  const parts: Buffer[] = [
    encodeString(MTD_NAME, def.name),
    encodeString(MTD_DESCRIPTION, def.description),
    encodeBytes(MTD_INPUT_SCHEMA, def.inputSchemaBytes),
  ];
  if (def.providerIdentifier) {
    parts.push(encodeString(MTD_PROVIDER_IDENTIFIER, def.providerIdentifier));
  }
  if (def.toolName) {
    parts.push(encodeString(MTD_TOOL_NAME, def.toolName));
  }
  return Buffer.concat(parts);
}

// ─── Phase 1: JSON Schema → google.protobuf.Value ──────────────────────────

/**
 * Convert a JSON object (e.g. an OpenAI tool's input_schema) to bytes
 * encoding a google.protobuf.Value. The result is the body of a Value
 * message — one oneof field set, no outer tag.
 *
 * Used to populate McpToolDefinition.input_schema (which is bytes-typed
 * on the wire even though semantically it's a Value).
 */
export function jsonSchemaToProtobufValue(json: unknown): Buffer {
  return encodeProtobufValue(json);
}

/**
 * Reverse of jsonSchemaToProtobufValue: decode google.protobuf.Value bytes
 * back into a JSON-shape value. Used by Phase 5 to translate cursor's
 * McpArgs.args (map<string, bytes-encoded Value>) into the JSON object the
 * OpenAI tool_calls.function.arguments field expects.
 *
 * Handles all six Value variants: null, number (double), string, bool,
 * struct (object), list (array). Unknown fields are skipped.
 */
type ProtobufValueDecodeResult = { value: unknown; nextPos: number };
type ProtobufValueDecoder = (
  buf: Buffer,
  pos: number,
  wireType: number
) => ProtobufValueDecodeResult;

function readLengthDelimitedPayload(
  buf: Buffer,
  pos: number,
  wireType: number
): { payload: Buffer; nextPos: number } | null {
  if (wireType !== WT_LEN) return null;
  const [len, afterLength] = decodeVarint(buf, pos);
  const lenN = checkedLen(len, afterLength, buf);
  return {
    payload: buf.subarray(afterLength, afterLength + lenN),
    nextPos: afterLength + lenN,
  };
}

function decodeNullValue(buf: Buffer, pos: number, wireType: number): ProtobufValueDecodeResult {
  const nextPos = wireType === WT_VARINT ? decodeVarint(buf, pos)[1] : pos;
  return { value: null, nextPos };
}

function decodeNumberValue(buf: Buffer, pos: number, wireType: number): ProtobufValueDecodeResult {
  const valid = wireType === 1 && pos + 8 <= buf.length;
  return { value: valid ? buf.readDoubleLE(pos) : 0, nextPos: valid ? pos + 8 : pos };
}

function decodeStringValue(buf: Buffer, pos: number, wireType: number): ProtobufValueDecodeResult {
  const decoded = readLengthDelimitedPayload(buf, pos, wireType);
  return {
    value: decoded?.payload.toString("utf8") ?? "",
    nextPos: decoded?.nextPos ?? pos,
  };
}

function decodeBoolValue(buf: Buffer, pos: number, wireType: number): ProtobufValueDecodeResult {
  if (wireType !== WT_VARINT) return { value: false, nextPos: pos };
  const [value, nextPos] = decodeVarint(buf, pos);
  return { value: value !== 0n, nextPos };
}

function decodeStructValue(buf: Buffer, pos: number, wireType: number): ProtobufValueDecodeResult {
  const decoded = readLengthDelimitedPayload(buf, pos, wireType);
  return {
    value: decoded ? decodeProtobufStruct(decoded.payload) : {},
    nextPos: decoded?.nextPos ?? pos,
  };
}

function decodeListValue(buf: Buffer, pos: number, wireType: number): ProtobufValueDecodeResult {
  const decoded = readLengthDelimitedPayload(buf, pos, wireType);
  return {
    value: decoded ? decodeProtobufList(decoded.payload) : [],
    nextPos: decoded?.nextPos ?? pos,
  };
}

const PROTOBUF_VALUE_DECODERS: Partial<Record<number, ProtobufValueDecoder>> = {
  [VAL_NULL]: decodeNullValue,
  [VAL_NUMBER]: decodeNumberValue,
  [VAL_STRING]: decodeStringValue,
  [VAL_BOOL]: decodeBoolValue,
  [VAL_STRUCT]: decodeStructValue,
  [VAL_LIST]: decodeListValue,
};

function skipUnknownProtobufField(buf: Buffer, pos: number, wireType: number): number {
  if (wireType === WT_VARINT) return decodeVarint(buf, pos)[1];
  if (wireType === WT_LEN) {
    const [len, afterLength] = decodeVarint(buf, pos);
    return afterLength + checkedLen(len, afterLength, buf);
  }
  if (wireType === 1) return pos + 8;
  if (wireType === 5) return pos + 4;
  return pos;
}

export function decodeProtobufValue(buf: Buffer): unknown {
  let pos = 0;
  while (pos < buf.length) {
    const [t, np] = decodeVarint(buf, pos);
    pos = np;
    const fieldNumber = Number(t >> 3n);
    const wireType = Number(t & 0x7n);
    const decoder = PROTOBUF_VALUE_DECODERS[fieldNumber];
    if (decoder) return decoder(buf, pos, wireType).value;
    pos = skipUnknownProtobufField(buf, pos, wireType);
  }
  return null;
}

function decodeProtobufStructEntry(payload: Buffer): { key: string; value: unknown } | null {
  const fields = decodeFields(payload);
  const key = findLengthDelimitedField(fields, MAP_KEY)?.toString("utf8") ?? "";
  const valueBytes = findLengthDelimitedField(fields, MAP_VALUE);
  return key && valueBytes ? { key, value: decodeProtobufValue(valueBytes) } : null;
}

function decodeProtobufStruct(buf: Buffer): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const field of decodeFields(buf)) {
    if (field.fieldNumber !== STRUCT_FIELDS || field.wireType !== WT_LEN) continue;
    const entry = decodeProtobufStructEntry(field.bytes);
    if (entry) result[entry.key] = entry.value;
  }
  return result;
}

function decodeProtobufList(buf: Buffer): unknown[] {
  const result: unknown[] = [];
  for (const f of decodeFields(buf)) {
    if (f.fieldNumber === LIST_VALUES && f.wireType === 2) {
      result.push(decodeProtobufValue(f.bytes));
    }
  }
  return result;
}

function encodeProtobufValue(value: unknown): Buffer {
  if (value === null || value === undefined) {
    // null_value (1) = NULL_VALUE = 0 (enum)
    return Buffer.concat([encodeTag(VAL_NULL, WT_VARINT), encodeVarint(0)]);
  }
  if (typeof value === "number") {
    return encodeDoubleField(VAL_NUMBER, value);
  }
  if (typeof value === "string") {
    return encodeString(VAL_STRING, value);
  }
  if (typeof value === "boolean") {
    return Buffer.concat([encodeTag(VAL_BOOL, WT_VARINT), encodeVarint(value ? 1 : 0)]);
  }
  if (Array.isArray(value)) {
    // ListValue { values: repeated Value }
    const listParts = value.map((v) => encodeMessage(LIST_VALUES, [encodeProtobufValue(v)]));
    return encodeMessage(VAL_LIST, listParts);
  }
  if (typeof value === "object") {
    // Struct { fields: map<string, Value> }
    const obj = value as Record<string, unknown>;
    const structParts: Buffer[] = [];
    for (const [k, v] of Object.entries(obj)) {
      const entry = Buffer.concat([
        encodeString(MAP_KEY, k),
        encodeMessage(MAP_VALUE, [encodeProtobufValue(v)]),
      ]);
      structParts.push(encodeMessage(STRUCT_FIELDS, [entry]));
    }
    return encodeMessage(VAL_STRUCT, structParts);
  }
  // Fallback: encode as null
  return Buffer.concat([encodeTag(VAL_NULL, WT_VARINT), encodeVarint(0)]);
}

// ─── User message extractor (for chat-completions input) ───────────────────

export type ChatMessage = {
  role: "user" | "assistant" | "system" | "tool";
  content?: string | Array<{ type: string; text?: string }> | null;
  tool_calls?: Array<{
    id: string;
    type?: "function" | string;
    function: { name: string; arguments: string };
  }>;
  tool_call_id?: string;
};

function messageContentToText(content: ChatMessage["content"]): string {
  if (typeof content === "string") return content;
  if (!Array.isArray(content)) return "";
  return content
    .map((part) => (typeof part?.text === "string" ? part.text : ""))
    .filter(Boolean)
    .join("\n");
}

function assistantMessageLines(message: ChatMessage, text: string): string[] {
  const lines = text ? [`Assistant: ${text}`] : [];
  for (const toolCall of message.tool_calls ?? []) {
    const name = toolCall.function?.name ?? "(unknown)";
    const args = toolCall.function?.arguments ?? "";
    lines.push(`Assistant called tool ${name} (${toolCall.id}) with arguments: ${args}`);
  }
  return lines;
}

function chatMessageLines(message: ChatMessage): string[] {
  const text = messageContentToText(message.content);
  if (message.role === "user") return text ? [`User: ${text}`] : [];
  if (message.role === "assistant") return assistantMessageLines(message, text);
  if (message.role === "tool") {
    return [`Tool result (${message.tool_call_id ?? "(unknown)"}): ${text}`];
  }
  return text ? [`${message.role}: ${text}`] : [];
}

function joinSystemText(systemTexts: string[], body: string): string {
  return systemTexts.length > 0 ? `${systemTexts.join("\n\n")}\n\n${body}` : body;
}

/**
 * Flatten an OpenAI-shaped message list down to a single user-text string
 * suitable for cursor's UserMessage. The agent endpoint expects ONE user
 * message per Run; we concatenate prior conversation as context.
 *
 * Phase 6 cold-resume support: handles `role:"tool"` results and
 * `assistant.tool_calls` so that follow-up turns after an OpenAI tool call
 * round-trip coherently. Format follows kaitranntt's reference impl —
 * cursor's model has been observed to handle this layout reliably.
 */
export function flattenMessages(messages: ChatMessage[]): string {
  if (!Array.isArray(messages) || messages.length === 0) return "";

  // System instructions go first as a labeled prefix. (The cursor executor
  // routes system messages through the KV blob channel — see Phase 7 — but
  // this branch is kept for non-cursor callers.)
  const systemTexts = messages
    .filter((m) => m.role === "system")
    .map((m) => messageContentToText(m.content))
    .filter(Boolean);

  const turn = messages.filter((m) => m.role !== "system");

  // Single-user-message fast path (no tool_calls, no labels).
  if (turn.length === 1 && turn[0].role === "user" && !turn[0].tool_calls) {
    return joinSystemText(systemTexts, messageContentToText(turn[0].content));
  }

  // Multi-turn / tool-using format. Each message is labeled. Tool calls
  // and tool results get their own labeled lines.
  const labelled = turn.flatMap(chatMessageLines).join("\n\n");
  return joinSystemText(systemTexts, labelled);
}

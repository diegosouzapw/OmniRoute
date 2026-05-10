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

// ─── Field numbers (from agent.proto descriptor) ───────────────────────────

const ACM_RUN_REQUEST = 1; // AgentClientMessage.run_request

const ARR_CONVERSATION_STATE = 1; // AgentRunRequest.conversation_state
const ARR_ACTION = 2; // AgentRunRequest.action
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

const RM_MODEL_ID = 1; // RequestedModel.model_id
const RM_PARAMETERS = 3; // RequestedModel.parameters [repeated]

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

// ─── Wire-type constants ───────────────────────────────────────────────────

const WT_VARINT = 0;
const WT_LEN = 2;

// ─── Primitive encoders ────────────────────────────────────────────────────

function encodeVarint(value: number | bigint): Buffer {
  let v = typeof value === "bigint" ? value : BigInt(value);
  const bytes: number[] = [];
  while (v > 0x7fn) {
    bytes.push(Number(v & 0x7fn) | 0x80);
    v >>= 7n;
  }
  bytes.push(Number(v));
  return Buffer.from(bytes);
}

function encodeTag(fieldNumber: number, wireType: number): Buffer {
  return encodeVarint((fieldNumber << 3) | wireType);
}

function encodeBytes(fieldNumber: number, value: Buffer | Uint8Array): Buffer {
  const buf = Buffer.isBuffer(value) ? value : Buffer.from(value);
  return Buffer.concat([encodeTag(fieldNumber, WT_LEN), encodeVarint(buf.length), buf]);
}

function encodeString(fieldNumber: number, value: string): Buffer {
  return encodeBytes(fieldNumber, Buffer.from(value, "utf8"));
}

function encodeMessage(fieldNumber: number, parts: Buffer[]): Buffer {
  const inner = Buffer.concat(parts);
  return Buffer.concat([encodeTag(fieldNumber, WT_LEN), encodeVarint(inner.length), inner]);
}

function encodeUInt32Field(fieldNumber: number, value: number): Buffer {
  return Buffer.concat([encodeTag(fieldNumber, WT_VARINT), encodeVarint(value)]);
}

function encodeBoolField(fieldNumber: number, value: boolean): Buffer {
  return Buffer.concat([encodeTag(fieldNumber, WT_VARINT), encodeVarint(value ? 1 : 0)]);
}

function encodeDoubleField(fieldNumber: number, value: number): Buffer {
  // wire type 1 = 64-bit fixed (double)
  const buf = Buffer.alloc(8);
  buf.writeDoubleLE(value, 0);
  return Buffer.concat([encodeTag(fieldNumber, 1), buf]);
}

// ─── Primitive decoders ────────────────────────────────────────────────────

function decodeVarint(buf: Buffer, offset: number): [bigint, number] {
  let result = 0n;
  let shift = 0n;
  let pos = offset;
  while (pos < buf.length) {
    const byte = buf[pos++];
    result |= BigInt(byte & 0x7f) << shift;
    if ((byte & 0x80) === 0) return [result, pos];
    shift += 7n;
  }
  throw new Error("varint truncated");
}

type Field =
  | { fieldNumber: number; wireType: 0; varint: bigint }
  | { fieldNumber: number; wireType: 2; bytes: Buffer };

function decodeFields(buf: Buffer): Field[] {
  const fields: Field[] = [];
  let pos = 0;
  while (pos < buf.length) {
    const [tag, np] = decodeVarint(buf, pos);
    pos = np;
    const fieldNumber = Number(tag >> 3n);
    const wireType = Number(tag & 0x7n);
    if (wireType === WT_VARINT) {
      const [v, np2] = decodeVarint(buf, pos);
      pos = np2;
      fields.push({ fieldNumber, wireType: 0, varint: v });
    } else if (wireType === WT_LEN) {
      const [len, np2] = decodeVarint(buf, pos);
      pos = np2;
      const lenN = Number(len);
      fields.push({ fieldNumber, wireType: 2, bytes: buf.subarray(pos, pos + lenN) });
      pos += lenN;
    } else if (wireType === 5) {
      pos += 4;
    } else if (wireType === 1) {
      pos += 8;
    } else {
      throw new Error(`unsupported wireType ${wireType}`);
    }
  }
  return fields;
}

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
 * cursor-agent rewrites model ids before putting them on the wire:
 *   "auto"            → RequestedModel { model_id: "default" }
 *   "composer-2-fast" → RequestedModel { model_id: "composer-2",
 *                                        parameters: [{id: "fast", value: "true"}] }
 *
 * Other ids (e.g. "claude-4.6-sonnet-medium") are passed through verbatim.
 */
export function resolveRequestedModel(modelId: string): {
  modelId: string;
  parameters: Array<{ id: string; value: string }>;
} {
  if (modelId === "auto") {
    return { modelId: "default", parameters: [] };
  }
  // Strip the "-fast" suffix and surface it as a parameter — only the composer
  // family observably needs this split today, but the protocol field is generic.
  if (modelId.startsWith("composer-") && modelId.endsWith("-fast")) {
    return {
      modelId: modelId.slice(0, -"-fast".length),
      parameters: [{ id: "fast", value: "true" }],
    };
  }
  return { modelId, parameters: [] };
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
};

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
  const { modelId, parameters } = resolveRequestedModel(input.modelId);

  // UserMessage { text, message_id, selected_context: empty, mode=1 }.
  // The empty selected_context placeholder and mode=1 match cursor-agent's
  // wire format; without them the server accepts the request but never
  // streams a response.
  const userMessage = encodeMessage(UMA_USER_MESSAGE, [
    encodeString(UM_TEXT, input.userText),
    encodeString(UM_MESSAGE_ID, messageId),
    encodeMessage(UM_SELECTED_CONTEXT, []),
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
  | { kind: "kv_server_message" }
  | { kind: "unknown"; field: number };

function findField(fields: Field[], fieldNumber: number): Field | undefined {
  return fields.find((f) => f.fieldNumber === fieldNumber);
}

function decodeStringField(buf: Buffer, fieldNumber: number): string {
  const fields = decodeFields(buf);
  const f = findField(fields, fieldNumber);
  if (f && f.wireType === 2) return f.bytes.toString("utf8");
  return "";
}

function decodeVarintField(buf: Buffer, fieldNumber: number): number {
  const fields = decodeFields(buf);
  const f = findField(fields, fieldNumber);
  if (f && f.wireType === 0) return Number(f.varint);
  return 0;
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
      if (update.wireType !== 2 && update.wireType !== 0) continue;
      switch (update.fieldNumber) {
        case IU_TEXT_DELTA:
          if (update.wireType === 2) {
            out.push({ kind: "text", text: decodeStringField(update.bytes, TDU_TEXT) });
          }
          break;
        case IU_THINKING_DELTA:
          if (update.wireType === 2) {
            out.push({ kind: "thinking", text: decodeStringField(update.bytes, TDU_TEXT) });
          }
          break;
        case IU_THINKING_COMPLETED:
          out.push({ kind: "thinking_complete" });
          break;
        case IU_TOOL_CALL_STARTED:
          out.push({ kind: "tool_call_started" });
          break;
        case IU_TOOL_CALL_COMPLETED:
          out.push({ kind: "tool_call_completed" });
          break;
        case IU_TOKEN_DELTA:
          if (update.wireType === 2) {
            out.push({ kind: "token_delta", tokens: decodeVarintField(update.bytes, 1) });
          }
          break;
        case IU_HEARTBEAT:
          out.push({ kind: "heartbeat" });
          break;
        case IU_TURN_ENDED:
          out.push({ kind: "turn_ended" });
          break;
        default:
          out.push({ kind: "unknown", field: update.fieldNumber });
      }
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

export function decodeKvServerEvent(payload: Buffer): KvServerEvent | null {
  for (const top of decodeFields(payload)) {
    if (top.fieldNumber !== ASM_KV_SERVER_MESSAGE || top.wireType !== 2) continue;

    let kvId = 0;
    let getBlobArgs: Buffer | null = null;
    let setBlobArgs: Buffer | null = null;
    let requestMetadata: Buffer | null = null;

    for (const f of decodeFields(top.bytes)) {
      if (f.fieldNumber === KSM_ID && f.wireType === 0) {
        kvId = Number(f.varint);
      } else if (f.fieldNumber === KSM_GET_BLOB_ARGS && f.wireType === 2) {
        getBlobArgs = f.bytes;
      } else if (f.fieldNumber === KSM_SET_BLOB_ARGS && f.wireType === 2) {
        setBlobArgs = f.bytes;
      } else if (f.fieldNumber === KSM_REQUEST_METADATA && f.wireType === 2) {
        requestMetadata = f.bytes;
      }
    }

    if (getBlobArgs) {
      // GetBlobArgs { blob_id (1): bytes }
      let blobId = Buffer.alloc(0);
      for (const f of decodeFields(getBlobArgs)) {
        if (f.fieldNumber === GBA_BLOB_ID && f.wireType === 2) {
          blobId = f.bytes;
        }
      }
      return { kind: "kv_get_blob", kvId, blobId, requestMetadata };
    }
    if (setBlobArgs) {
      // SetBlobArgs { blob_id (1): bytes, blob_data (2): bytes }
      let blobId = Buffer.alloc(0);
      let blobData = Buffer.alloc(0);
      for (const f of decodeFields(setBlobArgs)) {
        if (f.fieldNumber === SBA_BLOB_ID && f.wireType === 2) {
          blobId = f.bytes;
        } else if (f.fieldNumber === SBA_BLOB_DATA && f.wireType === 2) {
          blobData = f.bytes;
        }
      }
      return { kind: "kv_set_blob", kvId, blobId, blobData, requestMetadata };
    }
  }
  return null;
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
    }
  | {
      kind: "exec_shell_stream";
      execMsgId: number;
      execId: string;
      command: string;
      workingDir: string;
    }
  | {
      kind: "exec_bg_shell";
      execMsgId: number;
      execId: string;
      command: string;
      workingDir: string;
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

export function decodeExecServerEvent(payload: Buffer): ExecServerEvent | null {
  for (const top of decodeFields(payload)) {
    if (top.fieldNumber !== ASM_EXEC_SERVER_MESSAGE || top.wireType !== 2) continue;

    let execMsgId = 0;
    let execId = "";
    let variantField = 0;
    let variantBytes: Buffer | null = null;

    for (const f of decodeFields(top.bytes)) {
      if (f.fieldNumber === ESM_ID && f.wireType === 0) {
        execMsgId = Number(f.varint);
      } else if (f.fieldNumber === ESM_EXEC_ID && f.wireType === 2) {
        execId = f.bytes.toString("utf8");
      } else if (f.wireType === 2) {
        // Any other LEN field is the variant payload. Take the first one we
        // see — variants don't co-occur in a well-formed message.
        if (variantField === 0) {
          variantField = f.fieldNumber;
          variantBytes = f.bytes;
        }
      }
    }

    if (variantBytes === null) continue;

    switch (variantField) {
      case ESM_REQUEST_CONTEXT_ARGS:
        return { kind: "exec_request_context", execMsgId, execId };
      case ESM_READ_ARGS:
        return {
          kind: "exec_read",
          execMsgId,
          execId,
          path: decodeStringField(variantBytes, ARG_PATH),
        };
      case ESM_WRITE_ARGS:
        return {
          kind: "exec_write",
          execMsgId,
          execId,
          path: decodeStringField(variantBytes, ARG_PATH),
        };
      case ESM_DELETE_ARGS:
        return {
          kind: "exec_delete",
          execMsgId,
          execId,
          path: decodeStringField(variantBytes, ARG_PATH),
        };
      case ESM_LS_ARGS:
        return {
          kind: "exec_ls",
          execMsgId,
          execId,
          path: decodeStringField(variantBytes, ARG_PATH),
        };
      case ESM_GREP_ARGS:
        return { kind: "exec_grep", execMsgId, execId };
      case ESM_DIAGNOSTICS_ARGS:
        return { kind: "exec_diagnostics", execMsgId, execId };
      case ESM_SHELL_ARGS:
        return {
          kind: "exec_shell",
          execMsgId,
          execId,
          command: decodeStringField(variantBytes, ARG_SHELL_COMMAND),
          workingDir: decodeStringField(variantBytes, ARG_SHELL_WORKING_DIR),
        };
      case ESM_SHELL_STREAM_ARGS:
        return {
          kind: "exec_shell_stream",
          execMsgId,
          execId,
          command: decodeStringField(variantBytes, ARG_SHELL_COMMAND),
          workingDir: decodeStringField(variantBytes, ARG_SHELL_WORKING_DIR),
        };
      case ESM_BACKGROUND_SHELL_SPAWN:
        return {
          kind: "exec_bg_shell",
          execMsgId,
          execId,
          command: decodeStringField(variantBytes, ARG_SHELL_COMMAND),
          workingDir: decodeStringField(variantBytes, ARG_SHELL_WORKING_DIR),
        };
      case ESM_FETCH_ARGS:
        return {
          kind: "exec_fetch",
          execMsgId,
          execId,
          url: decodeStringField(variantBytes, ARG_FETCH_URL),
        };
      case ESM_WRITE_SHELL_STDIN_ARGS:
        return { kind: "exec_write_shell_stdin", execMsgId, execId };
      case ESM_MCP_ARGS: {
        // McpArgs.args is map<string, bytes>; each value is a protobuf-
        // encoded google.protobuf.Value. Decode keys and value-bytes here,
        // then convert each Value to its JSON shape.
        let toolName = "";
        let toolCallId = "";
        const args: Record<string, unknown> = {};
        for (const f of decodeFields(variantBytes)) {
          if (f.wireType !== 2) continue;
          if (f.fieldNumber === MCA_TOOL_NAME) {
            toolName = f.bytes.toString("utf8");
          } else if (f.fieldNumber === MCA_NAME && !toolName) {
            // tool_name (5) takes precedence; fall back to name (1)
            toolName = f.bytes.toString("utf8");
          } else if (f.fieldNumber === MCA_TOOL_CALL_ID) {
            toolCallId = f.bytes.toString("utf8");
          } else if (f.fieldNumber === MCA_ARGS) {
            // FieldsEntry { key (1): string, value (2): bytes }
            let key = "";
            let valueBytes: Buffer | null = null;
            for (const entry of decodeFields(f.bytes)) {
              if (entry.fieldNumber === MAP_KEY && entry.wireType === 2) {
                key = entry.bytes.toString("utf8");
              } else if (entry.fieldNumber === MAP_VALUE && entry.wireType === 2) {
                valueBytes = entry.bytes;
              }
            }
            if (key && valueBytes !== null) {
              args[key] = decodeProtobufValue(valueBytes);
            }
          }
        }
        return { kind: "exec_mcp", execMsgId, execId, toolName, toolCallId, args };
      }
      default:
        // Unknown variant — return null so caller can keep buffering.
        return null;
    }
  }
  return null;
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
export function decodeProtobufValue(buf: Buffer): unknown {
  let pos = 0;
  while (pos < buf.length) {
    const [t, np] = decodeVarint(buf, pos);
    pos = np;
    const fieldNumber = Number(t >> 3n);
    const wireType = Number(t & 0x7n);
    switch (fieldNumber) {
      case VAL_NULL: {
        if (wireType === WT_VARINT) {
          [, pos] = decodeVarint(buf, pos);
        }
        return null;
      }
      case VAL_NUMBER: {
        if (wireType === 1 && pos + 8 <= buf.length) {
          const value = buf.readDoubleLE(pos);
          pos += 8;
          return value;
        }
        return 0;
      }
      case VAL_STRING: {
        if (wireType === WT_LEN) {
          const [len, np2] = decodeVarint(buf, pos);
          pos = np2;
          const lenN = Number(len);
          const value = buf.subarray(pos, pos + lenN).toString("utf8");
          pos += lenN;
          return value;
        }
        return "";
      }
      case VAL_BOOL: {
        if (wireType === WT_VARINT) {
          const [val, np2] = decodeVarint(buf, pos);
          pos = np2;
          return val !== 0n;
        }
        return false;
      }
      case VAL_STRUCT: {
        if (wireType === WT_LEN) {
          const [len, np2] = decodeVarint(buf, pos);
          pos = np2;
          const lenN = Number(len);
          const inner = buf.subarray(pos, pos + lenN);
          pos += lenN;
          return decodeProtobufStruct(inner);
        }
        return {};
      }
      case VAL_LIST: {
        if (wireType === WT_LEN) {
          const [len, np2] = decodeVarint(buf, pos);
          pos = np2;
          const lenN = Number(len);
          const inner = buf.subarray(pos, pos + lenN);
          pos += lenN;
          return decodeProtobufList(inner);
        }
        return [];
      }
      default:
        // Skip unknown field
        if (wireType === WT_VARINT) {
          [, pos] = decodeVarint(buf, pos);
        } else if (wireType === WT_LEN) {
          const [len, np2] = decodeVarint(buf, pos);
          pos = np2;
          pos += Number(len);
        } else if (wireType === 1) {
          pos += 8;
        } else if (wireType === 5) {
          pos += 4;
        }
    }
  }
  return null;
}

function decodeProtobufStruct(buf: Buffer): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const f of decodeFields(buf)) {
    if (f.fieldNumber === STRUCT_FIELDS && f.wireType === 2) {
      let key = "";
      let valueBytes: Buffer | null = null;
      for (const entry of decodeFields(f.bytes)) {
        if (entry.fieldNumber === MAP_KEY && entry.wireType === 2) {
          key = entry.bytes.toString("utf8");
        } else if (entry.fieldNumber === MAP_VALUE && entry.wireType === 2) {
          valueBytes = entry.bytes;
        }
      }
      if (key && valueBytes) {
        result[key] = decodeProtobufValue(valueBytes);
      }
    }
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

  const partsToText = (content: ChatMessage["content"]): string => {
    if (typeof content === "string") return content;
    if (content == null) return "";
    if (!Array.isArray(content)) return "";
    return content
      .map((p) => (typeof p?.text === "string" ? p.text : ""))
      .filter(Boolean)
      .join("\n");
  };

  // System instructions go first as a labeled prefix. (The cursor executor
  // routes system messages through the KV blob channel — see Phase 7 — but
  // this branch is kept for non-cursor callers.)
  const systemTexts = messages
    .filter((m) => m.role === "system")
    .map((m) => partsToText(m.content))
    .filter(Boolean);

  const turn = messages.filter((m) => m.role !== "system");

  // Single-user-message fast path (no tool_calls, no labels).
  if (turn.length === 1 && turn[0].role === "user" && !turn[0].tool_calls) {
    const userText = partsToText(turn[0].content);
    return systemTexts.length > 0 ? `${systemTexts.join("\n\n")}\n\n${userText}` : userText;
  }

  // Multi-turn / tool-using format. Each message is labeled. Tool calls
  // and tool results get their own labeled lines.
  const lines: string[] = [];
  for (const m of turn) {
    const text = partsToText(m.content);
    if (m.role === "user") {
      if (text) lines.push(`User: ${text}`);
    } else if (m.role === "assistant") {
      if (text) lines.push(`Assistant: ${text}`);
      if (Array.isArray(m.tool_calls)) {
        for (const tc of m.tool_calls) {
          const args = tc.function?.arguments ?? "";
          lines.push(
            `Assistant called tool ${tc.function?.name ?? "(unknown)"} ` +
              `(${tc.id}) with arguments: ${args}`
          );
        }
      }
    } else if (m.role === "tool") {
      const callId = m.tool_call_id ?? "(unknown)";
      lines.push(`Tool result (${callId}): ${text}`);
    } else {
      if (text) lines.push(`${m.role}: ${text}`);
    }
  }
  const labelled = lines.join("\n\n");
  return systemTexts.length > 0 ? `${systemTexts.join("\n\n")}\n\n${labelled}` : labelled;
}

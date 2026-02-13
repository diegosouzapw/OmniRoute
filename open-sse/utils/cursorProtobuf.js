/**
 * Cursor Protobuf Encoder/Decoder
 * Implements ConnectRPC protobuf wire format for Cursor API
 *
 * Schema Version: reverse-engineered from Cursor client traffic.
 * If Cursor updates their protocol, unknown field warnings will appear
 * in the logs — update the FIELD map and bump the version below.
 */

import { v4 as uuidv4 } from "uuid";
import zlib from "zlib";

const DEBUG = true;
const log = (tag, ...args) => DEBUG && console.log(`[PROTOBUF:${tag}]`, ...args);

/**
 * Schema version — bump when updating field definitions.
 * Logged in warnings to help correlate unknown fields with Cursor client versions.
 */
const PROTOBUF_SCHEMA_VERSION = "1.1.3";

// ==================== SCHEMAS ====================

const WIRE_TYPE = { VARINT: 0, FIXED64: 1, LEN: 2, FIXED32: 5 };

const ROLE = { USER: 1, ASSISTANT: 2 };

const UNIFIED_MODE = { CHAT: 1, AGENT: 2 };

const THINKING_LEVEL = { UNSPECIFIED: 0, MEDIUM: 1, HIGH: 2 };

const FIELD = {
  // StreamUnifiedChatRequestWithTools (top level)
  REQUEST: 1,

  // StreamUnifiedChatRequest
  MESSAGES: 1,
  UNKNOWN_2: 2,
  INSTRUCTION: 3,
  UNKNOWN_4: 4,
  MODEL: 5,
  WEB_TOOL: 8,
  UNKNOWN_13: 13,
  CURSOR_SETTING: 15,
  UNKNOWN_19: 19,
  CONVERSATION_ID: 23,
  METADATA: 26,
  IS_AGENTIC: 27,
  SUPPORTED_TOOLS: 29,
  MESSAGE_IDS: 30,
  MCP_TOOLS: 34,
  LARGE_CONTEXT: 35,
  UNKNOWN_38: 38,
  UNIFIED_MODE: 46,
  UNKNOWN_47: 47,
  SHOULD_DISABLE_TOOLS: 48,
  THINKING_LEVEL: 49,
  UNKNOWN_51: 51,
  UNKNOWN_53: 53,
  UNIFIED_MODE_NAME: 54,

  // ConversationMessage
  MSG_CONTENT: 1,
  MSG_ROLE: 2,
  MSG_ID: 13,
  MSG_TOOL_RESULTS: 18,
  MSG_IS_AGENTIC: 29,
  MSG_UNIFIED_MODE: 47,
  MSG_SUPPORTED_TOOLS: 51,

  // ConversationMessage.ToolResult
  TOOL_RESULT_CALL_ID: 1,
  TOOL_RESULT_NAME: 2,
  TOOL_RESULT_INDEX: 3,
  TOOL_RESULT_RAW_ARGS: 5,
  TOOL_RESULT_RESULT: 8,

  // Model
  MODEL_NAME: 1,
  MODEL_EMPTY: 4,

  // Instruction
  INSTRUCTION_TEXT: 1,

  // CursorSetting
  SETTING_PATH: 1,
  SETTING_UNKNOWN_3: 3,
  SETTING_UNKNOWN_6: 6,
  SETTING_UNKNOWN_8: 8,
  SETTING_UNKNOWN_9: 9,

  // CursorSetting.Unknown6
  SETTING6_FIELD_1: 1,
  SETTING6_FIELD_2: 2,

  // Metadata
  META_PLATFORM: 1,
  META_ARCH: 2,
  META_VERSION: 3,
  META_CWD: 4,
  META_TIMESTAMP: 5,

  // MessageId
  MSGID_ID: 1,
  MSGID_SUMMARY: 2,
  MSGID_ROLE: 3,

  // MCPTool
  MCP_TOOL_NAME: 1,
  MCP_TOOL_DESC: 2,
  MCP_TOOL_PARAMS: 3,
  MCP_TOOL_SERVER: 4,

  // StreamUnifiedChatResponseWithTools (response)
  TOOL_CALL: 1,
  RESPONSE: 2,

  // ClientSideToolV2Call
  TOOL_ID: 3,
  TOOL_NAME: 9,
  TOOL_RAW_ARGS: 10,
  TOOL_IS_LAST: 11,
  TOOL_MCP_PARAMS: 27,

  // MCPParams
  MCP_TOOLS_LIST: 1,

  // MCPParams.Tool (nested)
  MCP_NESTED_NAME: 1,
  MCP_NESTED_PARAMS: 3,

  // StreamUnifiedChatResponse
  RESPONSE_TEXT: 1,
  THINKING: 25,

  // Thinking
  THINKING_TEXT: 1,
};

// Known response field numbers — used to detect unknown fields from protocol updates
const KNOWN_RESPONSE_FIELDS = new Set([
  FIELD.TOOL_CALL,
  FIELD.RESPONSE,
  FIELD.TOOL_ID,
  FIELD.TOOL_NAME,
  FIELD.TOOL_RAW_ARGS,
  FIELD.TOOL_IS_LAST,
  FIELD.TOOL_MCP_PARAMS,
  FIELD.RESPONSE_TEXT,
  FIELD.THINKING,
]);

// ==================== PRIMITIVE ENCODING ====================

export function encodeVarint(value) {
  const bytes = [];
  while (value >= 0x80) {
    bytes.push((value & 0x7f) | 0x80);
    value >>>= 7;
  }
  bytes.push(value & 0x7f);
  return new Uint8Array(bytes);
}

export function encodeField(fieldNum, wireType, value) {
  const tag = (fieldNum << 3) | wireType;
  const tagBytes = encodeVarint(tag);

  if (wireType === WIRE_TYPE.VARINT) {
    const valueBytes = encodeVarint(value);
    return concatArrays(tagBytes, valueBytes);
  }

  if (wireType === WIRE_TYPE.LEN) {
    const dataBytes =
      typeof value === "string"
        ? new TextEncoder().encode(value)
        : value instanceof Uint8Array
          ? value
          : Buffer.isBuffer(value)
            ? new Uint8Array(value)
            : new Uint8Array(0);

    const lengthBytes = encodeVarint(dataBytes.length);
    return concatArrays(tagBytes, lengthBytes, dataBytes);
  }

  return new Uint8Array(0);
}

function concatArrays(...arrays) {
  const totalLength = arrays.reduce((sum, arr) => sum + arr.length, 0);
  const result = new Uint8Array(totalLength);
  let offset = 0;
  for (const arr of arrays) {
    result.set(arr, offset);
    offset += arr.length;
  }
  return result;
}

// ==================== MESSAGE ENCODING ====================

export function encodeToolResult(toolResult) {
  const toolCallId = toolResult.tool_call_id || "";
  const toolName = toolResult.name || "";
  const toolIndex = toolResult.index || 0;
  const rawArgs = toolResult.raw_args || "{}";

  return concatArrays(
    encodeField(FIELD.TOOL_RESULT_CALL_ID, WIRE_TYPE.LEN, toolCallId),
    encodeField(FIELD.TOOL_RESULT_NAME, WIRE_TYPE.LEN, toolName),
    encodeField(FIELD.TOOL_RESULT_INDEX, WIRE_TYPE.VARINT, toolIndex),
    encodeField(FIELD.TOOL_RESULT_RAW_ARGS, WIRE_TYPE.LEN, rawArgs)
  );
}

export function encodeMessage(
  content,
  role,
  messageId,
  chatModeEnum = null,
  isLast = false,
  hasTools = false,
  toolResults = []
) {
  return concatArrays(
    encodeField(FIELD.MSG_CONTENT, WIRE_TYPE.LEN, content),
    encodeField(FIELD.MSG_ROLE, WIRE_TYPE.VARINT, role),
    encodeField(FIELD.MSG_ID, WIRE_TYPE.LEN, messageId),
    ...(toolResults.length > 0
      ? toolResults.map((tr) =>
          encodeField(FIELD.MSG_TOOL_RESULTS, WIRE_TYPE.LEN, encodeToolResult(tr))
        )
      : []),
    encodeField(FIELD.MSG_IS_AGENTIC, WIRE_TYPE.VARINT, hasTools ? 1 : 0),
    encodeField(
      FIELD.MSG_UNIFIED_MODE,
      WIRE_TYPE.VARINT,
      hasTools ? UNIFIED_MODE.AGENT : UNIFIED_MODE.CHAT
    ),
    ...(isLast && hasTools
      ? [encodeField(FIELD.MSG_SUPPORTED_TOOLS, WIRE_TYPE.LEN, encodeVarint(1))]
      : [])
  );
}

export function encodeInstruction(text) {
  return text ? encodeField(FIELD.INSTRUCTION_TEXT, WIRE_TYPE.LEN, text) : new Uint8Array(0);
}

export function encodeModel(modelName) {
  return concatArrays(
    encodeField(FIELD.MODEL_NAME, WIRE_TYPE.LEN, modelName),
    encodeField(FIELD.MODEL_EMPTY, WIRE_TYPE.LEN, new Uint8Array(0))
  );
}

export function encodeCursorSetting() {
  const unknown6 = concatArrays(
    encodeField(FIELD.SETTING6_FIELD_1, WIRE_TYPE.LEN, new Uint8Array(0)),
    encodeField(FIELD.SETTING6_FIELD_2, WIRE_TYPE.LEN, new Uint8Array(0))
  );

  return concatArrays(
    encodeField(FIELD.SETTING_PATH, WIRE_TYPE.LEN, "cursor\\aisettings"),
    encodeField(FIELD.SETTING_UNKNOWN_3, WIRE_TYPE.LEN, new Uint8Array(0)),
    encodeField(FIELD.SETTING_UNKNOWN_6, WIRE_TYPE.LEN, unknown6),
    encodeField(FIELD.SETTING_UNKNOWN_8, WIRE_TYPE.VARINT, 1),
    encodeField(FIELD.SETTING_UNKNOWN_9, WIRE_TYPE.VARINT, 1)
  );
}

export function encodeMetadata() {
  return concatArrays(
    encodeField(FIELD.META_PLATFORM, WIRE_TYPE.LEN, process.platform || "linux"),
    encodeField(FIELD.META_ARCH, WIRE_TYPE.LEN, process.arch || "x64"),
    encodeField(FIELD.META_VERSION, WIRE_TYPE.LEN, process.version || "v20.0.0"),
    encodeField(FIELD.META_CWD, WIRE_TYPE.LEN, process.cwd?.() || "/"),
    encodeField(FIELD.META_TIMESTAMP, WIRE_TYPE.LEN, new Date().toISOString())
  );
}

export function encodeMessageId(messageId, role, summaryId = null) {
  return concatArrays(
    encodeField(FIELD.MSGID_ID, WIRE_TYPE.LEN, messageId),
    ...(summaryId ? [encodeField(FIELD.MSGID_SUMMARY, WIRE_TYPE.LEN, summaryId)] : []),
    encodeField(FIELD.MSGID_ROLE, WIRE_TYPE.VARINT, role)
  );
}

export function encodeMcpTool(tool) {
  const toolName = tool.function?.name || tool.name || "";
  const toolDesc = tool.function?.description || tool.description || "";
  const inputSchema = tool.function?.parameters || tool.input_schema || {};

  return concatArrays(
    ...(toolName ? [encodeField(FIELD.MCP_TOOL_NAME, WIRE_TYPE.LEN, toolName)] : []),
    ...(toolDesc ? [encodeField(FIELD.MCP_TOOL_DESC, WIRE_TYPE.LEN, toolDesc)] : []),
    ...(Object.keys(inputSchema).length > 0
      ? [encodeField(FIELD.MCP_TOOL_PARAMS, WIRE_TYPE.LEN, JSON.stringify(inputSchema))]
      : []),
    encodeField(FIELD.MCP_TOOL_SERVER, WIRE_TYPE.LEN, "custom")
  );
}

// ==================== REQUEST BUILDING ====================

export function encodeRequest(messages, modelName, tools = [], reasoningEffort = null) {
  const hasTools = tools?.length > 0;
  const isAgentic = hasTools;
  const formattedMessages = [];
  const messageIds = [];

  // Prepare messages
  for (let i = 0; i < messages.length; i++) {
    const msg = messages[i];
    const role = msg.role === "user" ? ROLE.USER : ROLE.ASSISTANT;
    const msgId = uuidv4();
    const isLast = i === messages.length - 1;

    formattedMessages.push({
      content: msg.content,
      role,
      messageId: msgId,
      isLast,
      hasTools,
      toolResults: msg.tool_results || [],
    });

    messageIds.push({ messageId: msgId, role });
  }

  // Map reasoning effort to thinking level
  let thinkingLevel = THINKING_LEVEL.UNSPECIFIED;
  if (reasoningEffort === "medium") thinkingLevel = THINKING_LEVEL.MEDIUM;
  else if (reasoningEffort === "high") thinkingLevel = THINKING_LEVEL.HIGH;

  // Build request
  return concatArrays(
    // Messages
    ...formattedMessages.map((fm) =>
      encodeField(
        FIELD.MESSAGES,
        WIRE_TYPE.LEN,
        encodeMessage(
          fm.content,
          fm.role,
          fm.messageId,
          null,
          fm.isLast,
          fm.hasTools,
          fm.toolResults
        )
      )
    ),

    // Static fields
    encodeField(FIELD.UNKNOWN_2, WIRE_TYPE.VARINT, 1),
    encodeField(FIELD.INSTRUCTION, WIRE_TYPE.LEN, encodeInstruction("")),
    encodeField(FIELD.UNKNOWN_4, WIRE_TYPE.VARINT, 1),
    encodeField(FIELD.MODEL, WIRE_TYPE.LEN, encodeModel(modelName)),
    encodeField(FIELD.WEB_TOOL, WIRE_TYPE.LEN, ""),
    encodeField(FIELD.UNKNOWN_13, WIRE_TYPE.VARINT, 1),
    encodeField(FIELD.CURSOR_SETTING, WIRE_TYPE.LEN, encodeCursorSetting()),
    encodeField(FIELD.UNKNOWN_19, WIRE_TYPE.VARINT, 1),
    encodeField(FIELD.CONVERSATION_ID, WIRE_TYPE.LEN, uuidv4()),
    encodeField(FIELD.METADATA, WIRE_TYPE.LEN, encodeMetadata()),

    // Tool-related fields
    encodeField(FIELD.IS_AGENTIC, WIRE_TYPE.VARINT, isAgentic ? 1 : 0),
    ...(isAgentic ? [encodeField(FIELD.SUPPORTED_TOOLS, WIRE_TYPE.LEN, encodeVarint(1))] : []),

    // Message IDs
    ...messageIds.map((mid) =>
      encodeField(FIELD.MESSAGE_IDS, WIRE_TYPE.LEN, encodeMessageId(mid.messageId, mid.role))
    ),

    // MCP Tools
    ...(tools?.length > 0
      ? tools.map((tool) => encodeField(FIELD.MCP_TOOLS, WIRE_TYPE.LEN, encodeMcpTool(tool)))
      : []),

    // Mode fields
    encodeField(FIELD.LARGE_CONTEXT, WIRE_TYPE.VARINT, 0),
    encodeField(FIELD.UNKNOWN_38, WIRE_TYPE.VARINT, 0),
    encodeField(
      FIELD.UNIFIED_MODE,
      WIRE_TYPE.VARINT,
      isAgentic ? UNIFIED_MODE.AGENT : UNIFIED_MODE.CHAT
    ),
    encodeField(FIELD.UNKNOWN_47, WIRE_TYPE.LEN, ""),
    encodeField(FIELD.SHOULD_DISABLE_TOOLS, WIRE_TYPE.VARINT, isAgentic ? 0 : 1),
    encodeField(FIELD.THINKING_LEVEL, WIRE_TYPE.VARINT, thinkingLevel),
    encodeField(FIELD.UNKNOWN_51, WIRE_TYPE.VARINT, 0),
    encodeField(FIELD.UNKNOWN_53, WIRE_TYPE.VARINT, 1),
    encodeField(FIELD.UNIFIED_MODE_NAME, WIRE_TYPE.LEN, isAgentic ? "Agent" : "Ask")
  );
}

export function buildChatRequest(messages, modelName, tools = [], reasoningEffort = null) {
  return encodeField(
    FIELD.REQUEST,
    WIRE_TYPE.LEN,
    encodeRequest(messages, modelName, tools, reasoningEffort)
  );
}

export function wrapConnectRPCFrame(payload, compress = false) {
  let finalPayload = payload;
  let flags = 0x00;

  if (compress) {
    finalPayload = new Uint8Array(zlib.gzipSync(Buffer.from(payload)));
    flags = 0x01;
  }

  const frame = new Uint8Array(5 + finalPayload.length);
  frame[0] = flags;
  frame[1] = (finalPayload.length >> 24) & 0xff;
  frame[2] = (finalPayload.length >> 16) & 0xff;
  frame[3] = (finalPayload.length >> 8) & 0xff;
  frame[4] = finalPayload.length & 0xff;
  frame.set(finalPayload, 5);

  return frame;
}

export function generateCursorBody(messages, modelName, tools = [], reasoningEffort = null) {
  log(
    "BODY",
    `Generating: ${messages.length} msgs, model=${modelName}, tools=${tools.length}, reasoning=${reasoningEffort || "none"}`
  );

  const protobuf = buildChatRequest(messages, modelName, tools, reasoningEffort);
  const framed = wrapConnectRPCFrame(protobuf, false); // Cursor doesn't support compressed requests

  log("BODY", `Protobuf=${protobuf.length}B, Framed=${framed.length}B`);
  return framed;
}

// ==================== PRIMITIVE DECODING ====================

export function decodeVarint(buffer, offset) {
  let result = 0;
  let shift = 0;
  let pos = offset;

  while (pos < buffer.length) {
    const b = buffer[pos];
    result |= (b & 0x7f) << shift;
    pos++;
    if (!(b & 0x80)) break;
    shift += 7;
  }

  return [result, pos];
}

export function decodeField(buffer, offset) {
  if (offset >= buffer.length) return [null, null, null, offset];

  const [tag, pos1] = decodeVarint(buffer, offset);
  const fieldNum = tag >> 3;
  const wireType = tag & 0x07;

  let value;
  let pos = pos1;

  if (wireType === WIRE_TYPE.VARINT) {
    [value, pos] = decodeVarint(buffer, pos);
  } else if (wireType === WIRE_TYPE.LEN) {
    const [length, pos2] = decodeVarint(buffer, pos);
    value = buffer.slice(pos2, pos2 + length);
    pos = pos2 + length;
  } else if (wireType === WIRE_TYPE.FIXED64) {
    value = buffer.slice(pos, pos + 8);
    pos += 8;
  } else if (wireType === WIRE_TYPE.FIXED32) {
    value = buffer.slice(pos, pos + 4);
    pos += 4;
  } else {
    value = null;
  }

  return [fieldNum, wireType, value, pos];
}

export function decodeMessage(data) {
  const fields = new Map();
  let pos = 0;

  while (pos < data.length) {
    const [fieldNum, wireType, value, newPos] = decodeField(data, pos);
    if (fieldNum === null) break;

    if (!fields.has(fieldNum)) fields.set(fieldNum, []);
    fields.get(fieldNum).push({ wireType, value });
    pos = newPos;
  }

  return fields;
}

// ==================== RESPONSE PARSING ====================

export function parseConnectRPCFrame(buffer) {
  if (buffer.length < 5) return null;

  const flags = buffer[0];
  const length = (buffer[1] << 24) | (buffer[2] << 16) | (buffer[3] << 8) | buffer[4];

  if (buffer.length < 5 + length) return null;

  let payload = buffer.slice(5, 5 + length);

  // Decompress if gzip
  if (flags === 0x01) {
    try {
      payload = new Uint8Array(zlib.gunzipSync(Buffer.from(payload)));
    } catch (err) {
      log("PARSE", `Decompression failed: ${err.message}`);
    }
  }

  return { flags, length, payload, consumed: 5 + length };
}

function extractToolCall(toolCallData) {
  const toolCall = decodeMessage(toolCallData);
  let toolCallId = "";
  let toolName = "";
  let rawArgs = "";
  let isLast = false;

  // Extract tool call ID
  if (toolCall.has(FIELD.TOOL_ID)) {
    const fullId = new TextDecoder().decode(toolCall.get(FIELD.TOOL_ID)[0].value);
    toolCallId = fullId.split("\n")[0]; // Cursor returns multi-line ID, take first line
  }

  // Extract tool name
  if (toolCall.has(FIELD.TOOL_NAME)) {
    toolName = new TextDecoder().decode(toolCall.get(FIELD.TOOL_NAME)[0].value);
  }

  // Extract is_last flag
  if (toolCall.has(FIELD.TOOL_IS_LAST)) {
    isLast = toolCall.get(FIELD.TOOL_IS_LAST)[0].value !== 0;
  }

  // Extract MCP params - nested real tool info
  if (toolCall.has(FIELD.TOOL_MCP_PARAMS)) {
    try {
      const mcpParams = decodeMessage(toolCall.get(FIELD.TOOL_MCP_PARAMS)[0].value);

      if (mcpParams.has(FIELD.MCP_TOOLS_LIST)) {
        const tool = decodeMessage(mcpParams.get(FIELD.MCP_TOOLS_LIST)[0].value);

        if (tool.has(FIELD.MCP_NESTED_NAME)) {
          toolName = new TextDecoder().decode(tool.get(FIELD.MCP_NESTED_NAME)[0].value);
        }

        if (tool.has(FIELD.MCP_NESTED_PARAMS)) {
          rawArgs = new TextDecoder().decode(tool.get(FIELD.MCP_NESTED_PARAMS)[0].value);
        }
      }
    } catch (err) {
      log("EXTRACT", `MCP parse error: ${err.message}`);
    }
  }

  // Fallback to raw_args
  if (!rawArgs && toolCall.has(FIELD.TOOL_RAW_ARGS)) {
    rawArgs = new TextDecoder().decode(toolCall.get(FIELD.TOOL_RAW_ARGS)[0].value);
  }

  if (toolCallId && toolName) {
    return {
      id: toolCallId,
      type: "function",
      function: {
        name: toolName,
        arguments: rawArgs || "{}",
      },
      isLast,
    };
  }

  return null;
}

function extractTextAndThinking(responseData) {
  const nested = decodeMessage(responseData);
  let text = null;
  let thinking = null;

  // Extract text
  if (nested.has(FIELD.RESPONSE_TEXT)) {
    text = new TextDecoder().decode(nested.get(FIELD.RESPONSE_TEXT)[0].value);
  }

  // Extract thinking
  if (nested.has(FIELD.THINKING)) {
    try {
      const thinkingMsg = decodeMessage(nested.get(FIELD.THINKING)[0].value);
      if (thinkingMsg.has(FIELD.THINKING_TEXT)) {
        thinking = new TextDecoder().decode(thinkingMsg.get(FIELD.THINKING_TEXT)[0].value);
      }
    } catch (err) {
      log("EXTRACT", `Thinking parse error: ${err.message}`);
    }
  }

  return { text, thinking };
}

export function extractTextFromResponse(payload) {
  try {
    const fields = decodeMessage(payload);

    // Warn about unknown field numbers — may indicate a Cursor protocol update
    for (const fieldNum of fields.keys()) {
      if (!KNOWN_RESPONSE_FIELDS.has(fieldNum)) {
        log(
          "SCHEMA",
          `Unknown response field #${fieldNum} detected. Schema v${PROTOBUF_SCHEMA_VERSION} may be outdated.`
        );
      }
    }

    // Field 1: ClientSideToolV2Call
    if (fields.has(FIELD.TOOL_CALL)) {
      const toolCall = extractToolCall(fields.get(FIELD.TOOL_CALL)[0].value);
      if (toolCall) {
        log("EXTRACT", `Tool call: ${toolCall.function.name}`);
        return { text: null, error: null, toolCall, thinking: null };
      }
    }

    // Field 2: StreamUnifiedChatResponse
    if (fields.has(FIELD.RESPONSE)) {
      const { text, thinking } = extractTextAndThinking(fields.get(FIELD.RESPONSE)[0].value);

      if (text || thinking) {
        return { text, error: null, toolCall: null, thinking };
      }
    }

    return { text: null, error: null, toolCall: null, thinking: null };
  } catch (err) {
    // Graceful fallback — return raw payload instead of crashing
    log("EXTRACT", `Decode failed (schema v${PROTOBUF_SCHEMA_VERSION}): ${err.message}`);
    return {
      text: null,
      error: null,
      toolCall: null,
      thinking: null,
      raw: Buffer.from(payload).toString("base64"),
      decodeError: err.message,
    };
  }
}

// ==================== EXPORTS ====================

const cursorProtobufUtils = {
  encodeVarint,
  encodeField,
  encodeMessage,
  buildChatRequest,
  wrapConnectRPCFrame,
  generateCursorBody,
  decodeVarint,
  decodeField,
  decodeMessage,
  parseConnectRPCFrame,
  extractTextFromResponse,
};

export default cursorProtobufUtils;

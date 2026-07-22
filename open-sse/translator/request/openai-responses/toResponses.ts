/**
 * Translator: OpenAI Chat Completions -> OpenAI Responses API
 *
 * Extracted verbatim from openai-responses.ts. Registration stays in the host.
 */
import { isOpenAIResponsesStoreEnabled } from "@/lib/providers/requestDefaults";
import { generateToolCallId } from "../../helpers/toolCallHelper.ts";
import {
  JsonRecord,
  RESPONSES_STORE_MARKER,
  toRecord,
  toArray,
  toString,
  clampCallId,
  imageUrlToText,
  normalizeVerbosity,
  normalizeResponsesReasoningEffort,
} from "./helpers.ts";

// A Chat-Completions client can only express reasoning via the top-level
// `reasoning_effort` hint; it has no way to request a reasoning summary. When we
// promote that hint to the Responses API's `reasoning.effort`, default the
// summary (plus the encrypted-content include that actually streams it) so a
// downstream chat client still sees a thinking stream instead of an empty
// summary. Mirrors the Codex executor's `ensureCodexReasoningSummary`. An
// explicit `reasoning` object from a Responses-shaped client is preserved as-is.
const DEFAULT_RESPONSES_REASONING_SUMMARY = "auto";
const RESPONSES_REASONING_ENCRYPTED_CONTENT_INCLUDE = "reasoning.encrypted_content";

// Chat Completions `response_format: { type: "json_schema" }` → Responses API `text.format`.
// Merges into any existing `result.text` (e.g. verbosity) so structured-output schemas from
// Chat clients survive the translation to the Responses/Codex upstream (#5933).
function mapChatResponseFormatToResponsesText(body: JsonRecord, result: JsonRecord): void {
  const responseFormat = toRecord(body.response_format);
  if (responseFormat.type !== "json_schema") return;

  const jsonSchema = toRecord(responseFormat.json_schema);
  if (jsonSchema.schema === undefined) return;

  const existingText = toRecord(result.text);
  const format: JsonRecord = {
    type: "json_schema",
    name: toString(jsonSchema.name, "codex_output_schema"),
    schema: jsonSchema.schema,
  };
  if (jsonSchema.description !== undefined) format.description = jsonSchema.description;
  if (jsonSchema.strict !== undefined) format.strict = jsonSchema.strict;

  result.text = { ...existingText, format };
}

// Convert a Chat-Completions content block (string or text-part array) into the
// Responses API `input_text` part array used by message input items.
function buildResponsesTextParts(content: unknown): unknown[] {
  if (typeof content === "string") {
    return [{ type: "input_text", text: content }];
  }
  if (Array.isArray(content)) {
    const parts: unknown[] = [];
    for (const partValue of content) {
      // A bare string inside the content array is a real text instruction
      // (e.g. a harness-injected system reminder), not a structured part.
      // Silently dropping it lost the instruction (#6954 follow-up).
      if (typeof partValue === "string") {
        parts.push({ type: "input_text", text: partValue });
        continue;
      }
      const part = toRecord(partValue);
      if (part.type === "text" || typeof part.text === "string") {
        parts.push({ type: "input_text", text: toString(part.text) });
      }
    }
    return parts.length > 0 ? parts : [{ type: "input_text", text: "" }];
  }
  return [{ type: "input_text", text: "" }];
}

export function openaiToOpenAIResponsesRequest(
  model: unknown,
  body: unknown,
  stream: unknown,
  credentials: unknown
): unknown {
  void stream;

  const root = toRecord(body);
  const credentialRecord = toRecord(credentials);
  const storeEnabled = isOpenAIResponsesStoreEnabled(credentialRecord.providerSpecificData);
  const result: JsonRecord = {
    model,
    input: [],
    stream: true,
  };
  if (!storeEnabled) {
    result.store = false;
  }

  const input = result.input as JsonRecord[];

  // Extract first system message as instructions
  let hasSystemMessage = false;
  const messages = toArray(root.messages);

  for (const messageValue of messages) {
    const msg = toRecord(messageValue);
    const role = toString(msg.role);

    if (role === "system" || role === "developer") {
      if (!hasSystemMessage) {
        result.instructions = typeof msg.content === "string" ? msg.content : "";
        hasSystemMessage = true;
        continue;
      }
      // Mid-conversation system/developer turns (e.g. harness-injected reminders
      // from Claude Code) must survive as developer-role input items. The
      // Responses API supports the `developer` role for exactly this; mapping
      // them to `assistant` misattributes harness instructions as model output,
      // and silently dropping them loses them entirely (#6954).
      input.push({
        type: "message",
        role: "developer",
        content: buildResponsesTextParts(msg.content),
      });
      continue;
    }

    // Convert user messages
    if (role === "user") {
      const content =
        typeof msg.content === "string"
          ? [{ type: "input_text", text: msg.content }]
          : Array.isArray(msg.content)
            ? msg.content.map((contentValue) => {
                const contentItem = toRecord(contentValue);
                if (contentItem.type === "text") {
                  return { type: "input_text", text: toString(contentItem.text) };
                }
                if (contentItem.type === "image_url") {
                  const imgUrl = contentItem.image_url as
                    string | { url?: string; detail?: string };
                  const imgResult: JsonRecord = {
                    type: "input_image",
                    image_url: typeof imgUrl === "string" ? imgUrl : imgUrl?.url || "",
                  };
                  if (typeof imgUrl === "object" && imgUrl?.detail !== undefined) {
                    imgResult.detail = imgUrl.detail;
                  }
                  return imgResult;
                }
                if (
                  contentItem.type === "image" &&
                  typeof contentItem.image === "string" &&
                  /^data:([^;]+);base64,(.+)$/.test(contentItem.image)
                ) {
                  // AI SDK-style image part: { type: "image", image: "data:...;base64,..." } (#1330)
                  const imgResult: JsonRecord = {
                    type: "input_image",
                    image_url: contentItem.image,
                    detail: contentItem.detail !== undefined ? contentItem.detail : "auto",
                  };
                  return imgResult;
                }
                if (contentItem.type === "file" || contentItem.type === "document") {
                  // Accept both the OpenAI `file` shape and the Gemini-style `document` shape,
                  // and map the bare `data`/`url` fields too, so a PDF reaches Codex/Responses
                  // regardless of which content-part name the client used (#2515).
                  const file = toRecord(
                    contentItem.type === "document" ? contentItem.document : contentItem.file
                  );
                  const fileResult: JsonRecord = { type: "input_file" };
                  if (file.file_data !== undefined) fileResult.file_data = file.file_data;
                  else if (file.data !== undefined) fileResult.file_data = file.data;
                  if (file.file_id !== undefined) fileResult.file_id = file.file_id;
                  if (file.file_url !== undefined) fileResult.file_url = file.file_url;
                  else if (file.url !== undefined) fileResult.file_url = file.url;
                  if (file.filename !== undefined) fileResult.filename = file.filename;
                  else if (file.name !== undefined) fileResult.filename = file.name;
                  return fileResult;
                }
                return contentValue;
              })
            : [{ type: "input_text", text: "" }];

      input.push({
        type: "message",
        role: "user",
        content,
      });
    }

    // Convert assistant messages
    if (role === "assistant") {
      // Skip reasoning_content — OpenAI Responses API requires server-generated
      // rs_* IDs for reasoning items. Synthesizing client-side IDs (e.g. reasoning_N)
      // causes 400 errors from Responses-compatible upstreams. (#224)

      // Skip thinking blocks in array content — same rs_* ID constraint applies

      // Build assistant output content
      const outputContent: unknown[] = [];
      if (typeof msg.content === "string" && msg.content) {
        outputContent.push({ type: "output_text", text: msg.content });
      } else if (Array.isArray(msg.content)) {
        for (const contentValue of msg.content) {
          const contentItem = toRecord(contentValue);
          if (contentItem.type === "text") {
            outputContent.push({ type: "output_text", text: toString(contentItem.text) });
          } else if (contentItem.type === "image_url") {
            const url = imageUrlToText(contentItem.image_url);
            outputContent.push({ type: "output_text", text: url ? `[Image: ${url}]` : "[Image]" });
          } else if (contentItem.type === "thinking" || contentItem.type === "redacted_thinking") {
            // Reasoning already moved above
            continue;
          } else {
            outputContent.push(contentValue);
          }
        }
      }

      // Only add assistant message if content exists
      if (outputContent.length > 0) {
        input.push({
          type: "message",
          role: "assistant",
          content: outputContent,
        });
      }

      // Convert tool_calls to function_call items
      if (Array.isArray(msg.tool_calls)) {
        for (const toolCallValue of msg.tool_calls) {
          const toolCall = toRecord(toolCallValue);
          const fn = toRecord(toolCall.function);
          // Skip tool calls with empty names to avoid infinite placeholder_tool loops
          const fnName = toString(fn.name).trim();
          if (!fnName) {
            continue;
          }
          input.push({
            type: "function_call",
            call_id: clampCallId(toString(toolCall.id).trim() || generateToolCallId()),
            name: fnName,
            arguments: toString(fn.arguments, "{}"),
          });
        }
      }

      // Handle deprecated function_call field (pre-tool_calls API)
      if (msg.function_call && !msg.tool_calls) {
        const fc = toRecord(msg.function_call);
        const fnName = toString(fc.name).trim();
        if (fnName) {
          input.push({
            type: "function_call",
            call_id: clampCallId(`call_${fnName}`),
            name: fnName,
            arguments: toString(fc.arguments, "{}"),
          });
        }
      }
    }

    // Convert tool results
    if (role === "tool") {
      input.push({
        type: "function_call_output",
        call_id: clampCallId(toString(msg.tool_call_id)),
        output:
          typeof msg.content === "string"
            ? msg.content
            : Array.isArray(msg.content)
              ? msg.content.map((c) => {
                  const part = toRecord(c);
                  if (part.type === "text")
                    return { type: "input_text", text: toString(part.text) };
                  return c;
                })
              : String(msg.content ?? ""),
      });
    }

    // Handle deprecated function role messages
    if (role === "function") {
      input.push({
        type: "function_call_output",
        call_id: clampCallId(`call_${toString(msg.name)}`),
        output: typeof msg.content === "string" ? msg.content : String(msg.content ?? ""),
      });
    }
  }

  // Filter orphaned function_call_output items (no matching function_call)
  // This happens when Claude Code compaction removes messages but leaves tool results
  const knownCallIds = new Set(
    input
      .filter(
        (item: { type?: string; call_id?: string }) => item.type === "function_call" && item.call_id
      )
      .map((item: { type?: string; call_id?: string }) => item.call_id)
  );
  result.input = input.filter((item: { type?: string; call_id?: string }) => {
    if (item.type === "function_call_output" && item.call_id) {
      return knownCallIds.has(item.call_id);
    }
    return true;
  });

  // If no system message, keep empty instructions
  if (!hasSystemMessage) {
    result.instructions = "";
  }

  // Convert tools format
  if (Array.isArray(root.tools)) {
    result.tools = root.tools.map((toolValue) => {
      const tool = toRecord(toolValue);
      if (tool.type === "function") {
        const fn = toRecord(tool.function);
        const name = toString(fn.name);
        return {
          type: "function",
          name,
          description: toString(fn.description),
          parameters: fn.parameters,
          strict: fn.strict,
        };
      }
      return toolValue;
    });
  }

  // Translate tool_choice: Chat {type,function:{name}} → Responses {type,name}
  if (root.tool_choice !== undefined) {
    if (typeof root.tool_choice === "string") {
      result.tool_choice = root.tool_choice;
    } else if (typeof root.tool_choice === "object" && !Array.isArray(root.tool_choice)) {
      const tc = toRecord(root.tool_choice);
      if (tc.type === "function" && tc.function) {
        const fn = toRecord(tc.function);
        result.tool_choice = { type: "function", name: fn.name };
      } else {
        result.tool_choice = root.tool_choice;
      }
    } else {
      result.tool_choice = root.tool_choice;
    }
  }

  // Pass through relevant fields
  if (root.previous_response_id !== undefined) {
    result.previous_response_id = root.previous_response_id;
  }
  if (root.prompt_cache_key !== undefined) {
    result.prompt_cache_key = root.prompt_cache_key;
  }
  if (root.session_id !== undefined) {
    result.session_id = root.session_id;
  }
  if (root.conversation_id !== undefined) {
    result.conversation_id = root.conversation_id;
  }
  if (root.service_tier !== undefined) result.service_tier = root.service_tier;
  if (root.temperature !== undefined) result.temperature = root.temperature;
  // Translate max_tokens / max_completion_tokens → max_output_tokens for Responses API.
  // The Responses API does not accept max_tokens or max_completion_tokens; it requires
  // max_output_tokens. max_completion_tokens takes priority as the newer Chat Completions field.
  if (root.max_completion_tokens !== undefined) {
    result.max_output_tokens = root.max_completion_tokens;
  } else if (root.max_tokens !== undefined) {
    result.max_output_tokens = root.max_tokens;
  }
  if (root.top_p !== undefined) result.top_p = root.top_p;
  mapChatResponseFormatToResponsesText(root, result);
  // GPT-5 verbosity: Chat Completions `verbosity` → Responses `text.verbosity`.
  const chatVerbosity = normalizeVerbosity(root.verbosity);
  if (chatVerbosity) {
    result.text = { ...toRecord(result.text), verbosity: chatVerbosity };
  }
  let defaultedReasoningSummary = false;
  if (root.reasoning !== undefined) {
    result.reasoning = root.reasoning;
  } else if (root.reasoning_effort !== undefined) {
    const effort = normalizeResponsesReasoningEffort(root.reasoning_effort, model ?? root.model);
    if (effort && effort !== "none") {
      // Effort-only chat request: default a reasoning summary so the upstream
      // streams thinking back (see the constant's note above).
      result.reasoning = { effort, summary: DEFAULT_RESPONSES_REASONING_SUMMARY };
      defaultedReasoningSummary = true;
    } else if (effort) {
      result.reasoning = { effort };
    }
  }

  // Propagate Responses-API-only fields when a chat client sent them.
  // Without this, e.g. `include: ["reasoning.encrypted_content"]` is lost on
  // the way upstream and Codex returns an empty reasoning summary, so clients
  // (OpenCode, Cursor, etc.) see no thinking stream.
  if (Array.isArray(root.include) && root.include.length > 0) {
    result.include = root.include;
  }
  // When we defaulted a reasoning summary above, also request the encrypted
  // reasoning content so the summary actually streams back to the chat client.
  if (defaultedReasoningSummary) {
    const include = Array.isArray(result.include) ? (result.include as unknown[]) : [];
    if (!include.includes(RESPONSES_REASONING_ENCRYPTED_CONTENT_INCLUDE)) {
      result.include = [...include, RESPONSES_REASONING_ENCRYPTED_CONTENT_INCLUDE];
    }
  }
  if (storeEnabled) {
    if (root[RESPONSES_STORE_MARKER] !== undefined) {
      result.store = root[RESPONSES_STORE_MARKER];
    } else if (root.store !== undefined) {
      result.store = root.store;
    }
  }

  return result;
}

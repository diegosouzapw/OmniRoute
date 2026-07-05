/**
 * Translator: OpenAI Responses API -> OpenAI Chat Completions
 *
 * Responses API uses: { input: [...], instructions: "..." }
 * Chat API uses: { messages: [...] }
 */
import { isOpenAIResponsesStoreEnabled } from "@/lib/providers/requestDefaults";
import { FORMATS } from "../formats.ts";
import { register } from "../registry.ts";
import { normalizeResponsesInputForChat } from "../../utils/responsesInputNormalization.ts";
import { openaiToOpenAIResponsesRequest } from "./openai-responses/toResponses.ts";
import {
  JsonRecord,
  RESPONSES_STORE_MARKER,
  COPILOT_REASONING_SUMMARY_MARKER,
  WEB_SEARCH_TOOL_TYPES,
  TOOL_SEARCH_TOOL_TYPES,
  IMAGE_GENERATION_TOOL_TYPES,
  toRecord,
  toArray,
  toString,
  normalizeVerbosity,
  normalizeResponsesReasoningEffort,
  shouldRequestClaudeSummarizedThinking,
  unsupportedFeature,
} from "./openai-responses/helpers.ts";

// chat -> Responses direction extracted to a pure leaf; re-exported for external
// importers (tests). Host imports it back for registration below.
export { openaiToOpenAIResponsesRequest } from "./openai-responses/toResponses.ts";

/**
 * Convert OpenAI Responses API request to OpenAI Chat Completions format
 */
export function openaiResponsesToOpenAIRequest(
  model: unknown,
  body: unknown,
  stream: unknown,
  credentials: unknown
): unknown {
  void model;
  void stream;
  void credentials;

  const root = toRecord(body);
  if (root.input === undefined) return body;
  const credentialRecord = toRecord(credentials);
  const storeEnabled = isOpenAIResponsesStoreEnabled(credentialRecord.providerSpecificData);

  // Validate tool types — only function tools can be translated to Chat Completions
  const tools = toArray(root.tools);
  if (tools.length > 0) {
    for (const toolValue of tools) {
      const tool = toRecord(toolValue);
      const toolType = toString(tool.type);
      // Allow: function tools, tools already in Chat format (have .function property), CLI subagent tools,
      // namespace tools (MCP tool groups used by Codex/OpenAI Responses API), and web_search server tools
      // (Anthropic versioned: web_search_20250305, web_search_20250101, etc. — or plain web_search).
      // tool_search is a Responses API built-in sent by newer Codex clients; silently skip it here
      // (it will be filtered out during tools conversion below).
      if (
        toolType &&
        toolType !== "function" &&
        toolType !== "custom" &&
        toolType !== "command" &&
        toolType !== "namespace" &&
        toolType !== "local_shell" &&
        !WEB_SEARCH_TOOL_TYPES.test(toolType) &&
        !TOOL_SEARCH_TOOL_TYPES.test(toolType) &&
        !IMAGE_GENERATION_TOOL_TYPES.test(toolType) &&
        !tool.function
      ) {
        throw unsupportedFeature(
          `Unsupported Responses API feature: ${toolType} tool type is not supported by omniroute`
        );
      }
    }
  }

  const result: JsonRecord = { ...root };

  // GPT-5 verbosity: Responses `text.verbosity` → Chat Completions top-level `verbosity`.
  // Chat has no `text` wrapper, so carry the level across and drop the Responses-only
  // `text` object (a strict Chat endpoint 400s on unknown fields).
  const responsesVerbosity = normalizeVerbosity(toRecord(result.text).verbosity);
  if (responsesVerbosity) result.verbosity = responsesVerbosity;
  delete result.text;

  // background: true requests a deferred Responses API run (the upstream
  // returns 202 with response_id and the client polls GET /responses/<id>).
  // OmniRoute is a forward proxy that streams responses synchronously —
  // implementing the queue/poll contract would require persistence and a
  // separate retrieval surface. Degrade: log a marker when true was
  // actually requested (operators can observe clients that should be
  // reconfigured) and strip the flag. Clients that set background=true
  // opportunistically (Capy Captain Pro, Codex agents) work unchanged.
  // Clients that strictly require the async contract still observe a
  // completed response on the first poll and can adapt.
  if (result.background === true) {
    const providerStr = toString(credentialRecord.provider);
    const modelStr = toString(model);
    console.warn(
      `BACKGROUND_DEGRADE provider=${providerStr || "unknown"} model=${modelStr || "unknown"}`
    );
  }
  if (result.background !== undefined) {
    delete result.background;
  }
  const messages: JsonRecord[] = [];
  result.messages = messages;

  // Convert instructions to system message
  if (typeof root.instructions === "string" && root.instructions.length > 0) {
    messages.push({ role: "system", content: root.instructions });
  }

  // Group items by conversation turn
  let currentAssistantMsg: JsonRecord | null = null;
  let pendingToolResults: JsonRecord[] = [];

  // Upstream providers reject messages:[] with "400: at least one message is required".
  // When the client sends input:[] (empty), inject a placeholder user message — mirrors
  // upstream 9router#419 (and the existing empty-string handling elsewhere in this file).
  const rawInputItems = normalizeResponsesInputForChat(root.input);
  const inputItems: unknown[] =
    rawInputItems.length === 0
      ? [{ type: "message", role: "user", content: [{ type: "input_text", text: "..." }] }]
      : rawInputItems;
  for (const itemValue of inputItems) {
    const item = toRecord(itemValue);

    // Determine item type - Droid CLI sends role-based items without 'type' field
    // Fallback: if no type but has role property, treat as message
    const itemType = toString(item.type) || (item.role ? "message" : "");

    if (itemType === "message") {
      // Flush pending assistant message with tool calls
      if (currentAssistantMsg) {
        messages.push(currentAssistantMsg);
        currentAssistantMsg = null;
      }

      // Flush pending tool results
      if (pendingToolResults.length > 0) {
        for (const toolResult of pendingToolResults) {
          messages.push(toolResult);
        }
        pendingToolResults = [];
      }

      // Convert content: input_text -> text, output_text -> text
      const content = Array.isArray(item.content)
        ? item.content.map((contentValue) => {
            const contentItem = toRecord(contentValue);
            if (contentItem.type === "input_text") {
              return { type: "text", text: toString(contentItem.text) };
            }
            if (contentItem.type === "output_text") {
              return { type: "text", text: toString(contentItem.text) };
            }
            if (contentItem.type === "input_image") {
              const imgResult: JsonRecord = {
                type: "image_url",
                image_url: { url: toString(contentItem.image_url) },
              };
              if (contentItem.detail !== undefined) {
                (imgResult.image_url as JsonRecord).detail = contentItem.detail;
              }
              return imgResult;
            }
            if (contentItem.type === "input_file") {
              const fileObj: JsonRecord = {};
              if (contentItem.file_data !== undefined) fileObj.file_data = contentItem.file_data;
              if (contentItem.file_id !== undefined) fileObj.file_id = contentItem.file_id;
              if (contentItem.file_url !== undefined) fileObj.file_url = contentItem.file_url;
              if (contentItem.filename !== undefined) fileObj.filename = contentItem.filename;
              return { type: "file", file: fileObj };
            }
            return contentValue;
          })
        : item.content;

      messages.push({ role: toString(item.role), content });
      continue;
    }

    if (itemType === "function_call") {
      // Skip tool calls with empty names to avoid infinite placeholder_tool loops
      const fnName = toString(item.name).trim();
      if (!fnName) {
        continue;
      }
      // #2893: Skip tool calls with an empty call_id — they can never be matched
      // to their function_call_output, so the upstream rejects the orphaned tool
      // result with "Messages with role 'tool' must be a response to a preceding
      // message with 'tool_calls'". Dropping the unmatched pair avoids the 400.
      if (!toString(item.call_id).trim()) {
        continue;
      }

      // Start or append assistant message with tool_calls
      if (!currentAssistantMsg) {
        currentAssistantMsg = {
          role: "assistant",
          content: null,
          tool_calls: [],
        };
      }

      const toolCalls = Array.isArray(currentAssistantMsg.tool_calls)
        ? currentAssistantMsg.tool_calls
        : [];
      toolCalls.push({
        id: toString(item.call_id),
        type: "function",
        function: {
          name: fnName,
          arguments:
            typeof item.arguments === "string"
              ? item.arguments
              : JSON.stringify(item.arguments ?? {}),
        },
      });
      currentAssistantMsg.tool_calls = toolCalls;
      continue;
    }

    if (itemType === "function_call_output") {
      // Flush assistant message first if present
      if (currentAssistantMsg) {
        messages.push(currentAssistantMsg);
        currentAssistantMsg = null;
      }

      // Flush pending tool results first
      if (pendingToolResults.length > 0) {
        for (const toolResult of pendingToolResults) {
          messages.push(toolResult);
        }
        pendingToolResults = [];
      }

      // Add tool result immediately
      messages.push({
        role: "tool",
        tool_call_id: toString(item.call_id),
        content: typeof item.output === "string" ? item.output : JSON.stringify(item.output),
      });
      continue;
    }

    if (itemType === "custom_tool_call") {
      // Codex custom tool call (e.g. apply_patch): `input` is a raw string, not JSON
      // arguments. Map it onto the assistant tool_calls list as a function call whose
      // arguments wrap the raw string as { input }, matching the { input: string }
      // schema the request-side tools normalization advertises for custom tools.
      const fnName = toString(item.name).trim();
      if (!fnName) {
        continue;
      }
      if (!currentAssistantMsg) {
        currentAssistantMsg = {
          role: "assistant",
          content: null,
          tool_calls: [],
        };
      }
      const toolCalls = Array.isArray(currentAssistantMsg.tool_calls)
        ? currentAssistantMsg.tool_calls
        : [];
      toolCalls.push({
        id: toString(item.call_id),
        type: "function",
        function: {
          name: fnName,
          arguments: JSON.stringify({ input: item.input }),
        },
      });
      currentAssistantMsg.tool_calls = toolCalls;
      continue;
    }

    if (itemType === "custom_tool_call_output") {
      // Result of a custom tool call — translate the same way as function_call_output.
      if (currentAssistantMsg) {
        messages.push(currentAssistantMsg);
        currentAssistantMsg = null;
      }
      if (pendingToolResults.length > 0) {
        for (const toolResult of pendingToolResults) {
          messages.push(toolResult);
        }
        pendingToolResults = [];
      }
      // Unwrap JSON-wrapped output {"output":"...","metadata":{...}} → plain string.
      const rawOut = typeof item.output === "string" ? item.output : JSON.stringify(item.output);
      let toolContent = rawOut;
      try {
        const parsed = JSON.parse(rawOut);
        if (parsed && typeof parsed.output === "string") toolContent = parsed.output;
      } catch {
        // Not JSON — keep the raw output as the tool content.
      }
      messages.push({
        role: "tool",
        tool_call_id: toString(item.call_id),
        content: toolContent,
      });
      continue;
    }

    if (itemType === "reasoning") {
      // Skip reasoning items - they are display-only metadata
      continue;
    }
  }

  // Flush remainder
  if (currentAssistantMsg) {
    messages.push(currentAssistantMsg);
  }
  if (pendingToolResults.length > 0) {
    for (const toolResult of pendingToolResults) {
      messages.push(toolResult);
    }
  }

  // Convert tools format
  if (Array.isArray(root.tools)) {
    result.tools = root.tools
      .filter((toolValue) => {
        const tool = toRecord(toolValue);
        const toolType = toString(tool.type);
        // tool_search (#2766) and image_generation (#2950) are Responses API built-ins
        // with no Chat Completions equivalent; drop them silently.
        return (
          !TOOL_SEARCH_TOOL_TYPES.test(toolType) && !IMAGE_GENERATION_TOOL_TYPES.test(toolType)
        );
      })
      .flatMap((toolValue) => {
        const tool = toRecord(toolValue);
        if (tool.function) return toolValue;
        const toolType = toString(tool.type);
        // MCP tool groups: Codex/OpenAI Responses clients declare each MCP server as a
        // `namespace` tool — { type:"namespace", name, tools:[{name, description, parameters}] }.
        // Non-Codex backends (Kiro/Claude) have no `namespace` type, so flatten each sub-tool
        // into a standalone Chat function (#1534). Without this the whole group collapsed into
        // one empty-schema function named `mcp__<server>__` and every MCP call failed with
        // `unsupported call: mcp__<server>__`.
        if (toolType === "namespace") {
          const subTools = Array.isArray(tool.tools) ? tool.tools : [];
          return subTools
            .map((subValue) => toRecord(subValue))
            .filter((sub) => toString(sub.name))
            .map((sub) => ({
              type: "function",
              function: {
                name: toString(sub.name),
                description: toString(sub.description),
                parameters: sub.parameters ??
                  sub.input_schema ?? {
                    type: "object",
                    properties: {},
                  },
              },
            }));
        }
        // Pass web_search server tools through with their original type (versioned or plain).
        // These have no Chat Completions equivalent; preserve as-is so upstreams that understand
        // Anthropic-style web_search_YYYYMMDD naming receive the exact name they expect.
        if (WEB_SEARCH_TOOL_TYPES.test(toolType)) {
          return toolValue;
        }
        // local_shell is a Responses API built-in (Codex CLI injects it for shell
        // execution). Non-OpenAI upstreams (Kiro/Claude) have no local_shell type,
        // so map it to a regular "shell" function tool. The response translator
        // already emits these as function_call, which Codex maps back to a shell call.
        if (toolType === "local_shell") {
          return {
            type: "function",
            function: {
              name: "shell",
              description: "Run a shell command and return its output.",
              parameters: {
                type: "object",
                properties: {
                  command: {
                    type: "array",
                    items: { type: "string" },
                    description: "Command and arguments to execute.",
                  },
                  workdir: { type: "string", description: "Working directory." },
                  timeout_ms: { type: "number", description: "Timeout in milliseconds." },
                },
                required: ["command"],
              },
            },
          };
        }
        // Responses API "hosted" tools (e.g. Codex's request_user_input,
        // { type: "request_user_input" }) carry no explicit `name` and cannot be
        // represented as a Chat Completions function declaration. Emitting them with
        // an empty name produces an anonymous functionDeclaration that downstream
        // providers such as Gemini reject with a 400 ("Invalid function name").
        // Skip any tool without a non-empty string name; named tools are unaffected.
        const name = tool.name;
        if (typeof name !== "string" || name.trim() === "") return [];

        // Custom/freeform tools (e.g. Codex apply_patch with type:"custom" and a grammar
        // format) carry no `parameters` field. Converting them to an empty function schema
        // makes downstream models invoke them with {}, but the Codex runtime expects
        // { input: string }. Normalize all custom tools to a well-defined { input: string }
        // schema so the model produces valid arguments. (#1007)
        if (toolType === "custom") {
          return {
            type: "function",
            function: {
              name: toString(tool.name),
              description: toString(tool.description),
              parameters: {
                type: "object",
                properties: {
                  input: { type: "string" },
                },
                required: ["input"],
                additionalProperties: false,
              },
              strict: tool.strict,
            },
          };
        }
        return {
          type: "function",
          function: {
            name,
            description: toString(tool.description),
            parameters: tool.parameters,
            strict: tool.strict,
          },
        };
      });
  }

  // Filter orphaned tool results (no matching tool_call in assistant messages)
  const allToolCallIds = new Set<string>();
  for (const m of messages) {
    const rec = toRecord(m);
    if (Array.isArray(rec.tool_calls)) {
      for (const tc of rec.tool_calls as { id?: string }[]) {
        if (tc.id) allToolCallIds.add(String(tc.id));
      }
    }
  }
  result.messages = messages.filter((m) => {
    const rec = toRecord(m);
    // #2893: drop ANY tool result whose tool_call_id has no matching tool_call —
    // including empty/missing ids (the previous `&& rec.tool_call_id` guard let
    // empty-id orphans slip through and triggered an upstream 400).
    if (rec.role === "tool") {
      return allToolCallIds.has(String(rec.tool_call_id ?? ""));
    }
    return true;
  });

  // Translate tool_choice object format: Responses {type,name} → Chat {type,function:{name}}
  if (
    result.tool_choice &&
    typeof result.tool_choice === "object" &&
    !Array.isArray(result.tool_choice)
  ) {
    const tc = toRecord(result.tool_choice);
    const tcType = toString(tc.type);
    if (tcType === "function" && tc.name !== undefined && !tc.function) {
      result.tool_choice = { type: "function", function: { name: tc.name } };
    } else if (tcType === "local_shell") {
      result.tool_choice = { type: "function", function: { name: "shell" } };
    } else if (tcType && tcType !== "function" && tcType !== "allowed_tools") {
      // Built-in tool types (web_search_preview, file_search, etc.) have no Chat equivalent
      throw unsupportedFeature(
        `Unsupported Responses API feature: tool_choice type '${tcType}' is not supported by omniroute`
      );
    }
  }

  // Cleanup Responses API specific fields
  // Note: prompt_cache_key is intentionally preserved — it is used by Codex and other
  // providers as a cache-affinity signal. Stripping it breaks prompt caching (#517).
  delete result.input;
  delete result.instructions;
  delete result.include;
  if (storeEnabled && root.store !== undefined) {
    result[RESPONSES_STORE_MARKER] = root.store;
  }
  delete result.store;

  // Promote Responses `reasoning.effort` to the Chat-Completions-native
  // `reasoning_effort` field so OpenAI-family upstreams (and the downstream
  // openai-to-claude translator's extended-thinking path) keep the hint when a
  // Responses client is routed across formats. The Copilot-only `summary` ->
  // Claude summarized-thinking marker stays behind the UA gate from
  // translateRequest because it is Copilot-specific glue, not an OpenAI-native
  // field. Ported from upstream PR decolua/9router#1817 (ryanngit).
  if (root.reasoning && typeof root.reasoning === "object" && !Array.isArray(root.reasoning)) {
    const reasoningRec = toRecord(root.reasoning);
    const effort = toString(reasoningRec.effort);
    if (effort && result.reasoning_effort === undefined) {
      result.reasoning_effort = normalizeResponsesReasoningEffort(effort);
    }
    if (
      credentialRecord._copilotClient === true &&
      shouldRequestClaudeSummarizedThinking(reasoningRec.summary)
    ) {
      result[COPILOT_REASONING_SUMMARY_MARKER] = "summarized";
    }
  }
  delete result.reasoning;
  // Strip Responses-API-only fields that Chat Completions rejects with 400.
  // safety_identifier is sent by LobeHub and has no Chat Completions equivalent (#2770).
  delete result.safety_identifier;
  // client_metadata is sent by Codex CLI and has no Chat Completions equivalent.
  // Strict upstreams (e.g. Mistral) reject it with HTTP 422 extra_forbidden.
  delete result.client_metadata;
  // truncation ("auto"/"disabled") is a Responses-API-only field with no Chat
  // Completions equivalent. Strict non-OpenAI upstreams (e.g. NVIDIA NIM) reject
  // it with HTTP 400 "Unsupported parameter(s): truncation" (#2311).
  delete result.truncation;

  return result;
}

// Register both directions
register(FORMATS.OPENAI_RESPONSES, FORMATS.OPENAI, openaiResponsesToOpenAIRequest, null);
register(FORMATS.OPENAI, FORMATS.OPENAI_RESPONSES, openaiToOpenAIResponsesRequest, null);

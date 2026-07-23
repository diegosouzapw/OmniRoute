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
import {
  getRegisteredProviders,
  requiresPlainStringContent,
} from "../../config/providerRegistry.ts";
import { collectResponsesTools } from "./openai-responses/additionalTools.ts";
import { openaiToOpenAIResponsesRequest } from "./openai-responses/toResponses.ts";
import {
  JsonRecord,
  RESPONSES_STORE_MARKER,
  COPILOT_REASONING_SUMMARY_MARKER,
  WEB_SEARCH_TOOL_TYPES,
  TOOL_SEARCH_TOOL_TYPES,
  IMAGE_GENERATION_TOOL_TYPES,
  toRecord,
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
  void stream;
  void credentials;
  const collapseToPlainString = requiresPlainStringContent(extractProviderHint(model));

  const root = toRecord(body);
  if (root.input === undefined) return body;
  const credentialRecord = toRecord(credentials);
  const storeEnabled = isOpenAIResponsesStoreEnabled(credentialRecord.providerSpecificData);
  const rawInputItems = normalizeResponsesInputForChat(root.input);

  // Tools may be declared at the Responses top level or in one or more
  // `additional_tools` input items. Normalize both forms before validation/conversion so
  // every downgraded provider receives the same available tool set.
  const tools = collectResponsesTools(root.tools, rawInputItems);
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

  // Request-scoped response-side identity for Responses namespace child tools.
  // The Chat wire `tool.function.name` is the bare leaf (per #7905 #7936), and
  // the original `{namespace, name}` pair is retained in this side-band map so
  // the response translator can emit codex-compatible `namespace` + `name`
  // fields without reparsing the wire name.
  const namespaceToolIdentityMap = new Map<string, { namespace: string; name: string }>();

  // #7533: `verbosity` and `prompt_cache_key` are GPT-5/OpenAI-only Chat Completions
  // parameters. A strict-protocol non-OpenAI upstream (NVIDIA confirmed by the reporter;
  // likely also GLM/Kimi/Deepseek direct endpoints) 400s on unrecognized top-level
  // parameters, so they must only survive the downgrade when the destination really is
  // an OpenAI-operated endpoint.
  //
  // Allowlist, NOT a denylist: over-stripping costs a cache hit, over-preserving costs a
  // hard 400. `codex` is in the list because it IS an OpenAI upstream
  // (chatgpt.com/backend-api/codex) and is precisely the destination #517 needed
  // `prompt_cache_key` preserved for — /v1/responses runs every request through this
  // downgrade (handleResponsesCore -> convertResponsesApiFormat) regardless of provider,
  // so gating on "openai" alone silently re-broke Codex prompt caching. Other
  // OpenAI-compatible passthroughs (e.g. Azure OpenAI) are deliberately NOT assumed in —
  // add them only with evidence that the endpoint accepts these fields.
  const OPENAI_PARAM_DESTINATIONS = new Set(["openai", "codex"]);
  const isOpenAIDestination = OPENAI_PARAM_DESTINATIONS.has(toString(credentialRecord.provider));

  // GPT-5 verbosity: Responses `text.verbosity` → Chat Completions top-level `verbosity`.
  // Chat has no `text` wrapper, so carry the level across and drop the Responses-only
  // `text` object (a strict Chat endpoint 400s on unknown fields).
  const responsesVerbosity = normalizeVerbosity(toRecord(result.text).verbosity);
  if (responsesVerbosity && isOpenAIDestination) result.verbosity = responsesVerbosity;
  const responsesTextFormat = toRecord(toRecord(result.text).format);
  if (responsesTextFormat.type === "json_schema" && responsesTextFormat.schema !== undefined) {
    const jsonSchema: JsonRecord = {
      name: toString(responsesTextFormat.name, "response"),
      schema: responsesTextFormat.schema,
    };
    if (responsesTextFormat.description !== undefined) {
      jsonSchema.description = responsesTextFormat.description;
    }
    if (responsesTextFormat.strict !== undefined) jsonSchema.strict = responsesTextFormat.strict;
    result.response_format = { type: "json_schema", json_schema: jsonSchema };
  } else if (responsesTextFormat.type === "json_object") {
    result.response_format = { type: "json_object" };
  }
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
            if (contentItem.type === "refusal") {
              return { type: "text", text: toString(contentItem.refusal) };
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

    // Skip tool_search_call items. These are Responses-API-only metadata items
    // emitted by Codex's dynamic tool-search optimization: they record that the
    // model queried a subset of available tools, but carry no content that Chat
    // Completions can represent. Throwing here would break every multi-turn
    // conversation where Codex previously used tool_search (the whole session
    // would carry tool_search_call items forward in `input`). Skipping matches
    // the reasoning-item policy: display-only metadata, no chat side-effect.
    if (itemType === "tool_search_call" || itemType === "tool_search_result") {
      continue;
    }

    if (itemType === "additional_tools") {
      // Already consumed by collectResponsesTools() before message conversion.
      continue;
    }

    throw unsupportedFeature(
      `Unsupported Responses API feature: input item type '${itemType || "missing"}' cannot be represented in Chat Completions`
    );
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
  if (tools.length > 0) {
    result.tools = tools
      .filter((toolValue) => {
        const tool = toRecord(toolValue);
        const toolType = toString(tool.type);
        // image_generation (#2950) is a Responses API server-side hosted tool with no
        // Chat Completions equivalent; drop it silently. tool_search (#2766) used to be
        // dropped here too, but it is a CLIENT-executed tool (Codex sends it with
        // `execution: "client"`) — see the flatMap branch below (#7532) for why it is
        // now mapped onto a Chat function tool instead of discarded.
        return !IMAGE_GENERATION_TOOL_TYPES.test(toolType);
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
          const nsName = toString(tool.name);
          const subTools = Array.isArray(tool.tools) ? tool.tools : [];
          return subTools
            .map((subValue) => toRecord(subValue))
            .filter((sub) => toString(sub.name))
            .map((sub) => {
              const leaf = toString(sub.name);
              // Stamp the identity for the response-side seam. The wire name
              // remains the bare leaf (matching #7905), so `namespaceToolIdentityMap`
              // keys on the leaf. A later child that shares the same leaf name
              // with a different namespace is ambiguous: drop the conflicting
              // entry rather than silently overwriting.
              if (nsName && leaf) {
                const identity = { namespace: nsName, name: leaf };
                const existingIdentity = namespaceToolIdentityMap.get(leaf);
                if (
                  !existingIdentity ||
                  (existingIdentity.namespace === identity.namespace &&
                    existingIdentity.name === identity.name)
                ) {
                  namespaceToolIdentityMap.set(leaf, identity);
                } else {
                  namespaceToolIdentityMap.delete(leaf);
                }
              }
              return {
                type: "function",
                function: {
                  name: leaf,
                  description: toString(sub.description),
                  parameters:
                    toString(sub.type) === "custom"
                      ? {
                          type: "object",
                          properties: { input: { type: "string" } },
                          required: ["input"],
                          additionalProperties: false,
                        }
                      : (sub.parameters ??
                        sub.input_schema ?? {
                          type: "object",
                          properties: {},
                        }),
                  strict: sub.strict,
                },
              };
            });
        }
        // tool_search (#2766) is a Responses API built-in Codex sends with
        // `execution: "client"` — the CLIENT (Codex CLI) resolves the call locally,
        // regardless of whether the wire format is Responses `{type:"tool_search"}` or
        // Chat `{type:"function"}`. Dropping it silently (as before) hid the tool from
        // the model entirely and broke Codex's lazy/deferred tool-loading protocol for
        // any provider downgraded to Chat Completions (#7532). Map it onto a normal
        // Chat function tool instead, mirroring the local_shell -> shell pattern below.
        if (TOOL_SEARCH_TOOL_TYPES.test(toolType)) {
          return {
            type: "function",
            function: {
              name: toString(tool.name) || "tool_search",
              description:
                toString(tool.description) || "Search for additional deferred tools by query.",
              parameters: tool.parameters ?? {
                type: "object",
                properties: {
                  query: {
                    type: "string",
                    description: "Natural-language or keyword query over available tools.",
                  },
                },
                required: ["query"],
              },
            },
          };
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
    } else if (tcType === "allowed_tools") {
      const mode = toString(tc.mode);
      if (mode !== "auto" && mode !== "required") {
        throw unsupportedFeature(
          `Unsupported Responses API feature: allowed_tools mode '${mode || "missing"}' is not supported by omniroute`
        );
      }
      if (!Array.isArray(tc.tools) || tc.tools.length === 0) {
        throw unsupportedFeature(
          "Unsupported Responses API feature: allowed_tools requires at least one function tool"
        );
      }

      const allowedNames = new Set<string>();
      for (const allowedValue of tc.tools) {
        const allowed = toRecord(allowedValue);
        const allowedType = toString(allowed.type);
        const allowedName = toString(allowed.name).trim();
        if (allowedType !== "function" || !allowedName) {
          throw unsupportedFeature(
            `Unsupported Responses API feature: allowed_tools descriptor type '${allowedType || "missing"}' cannot be represented in Chat Completions`
          );
        }
        allowedNames.add(allowedName);
      }

      const chatTools = Array.isArray(result.tools) ? result.tools : [];
      const availableNames = new Set(
        chatTools
          .map((toolValue) => toString(toRecord(toRecord(toolValue).function).name))
          .filter(Boolean)
      );
      const missingNames = [...allowedNames].filter((name) => !availableNames.has(name));
      if (missingNames.length > 0) {
        throw unsupportedFeature(
          `Unsupported Responses API feature: allowed_tools references unavailable function tool(s): ${missingNames.join(", ")}`
        );
      }

      result.tools = chatTools.filter((toolValue) =>
        allowedNames.has(toString(toRecord(toRecord(toolValue).function).name))
      );
      if (result.tools.length === 0) {
        throw unsupportedFeature(
          "Unsupported Responses API feature: allowed_tools resolved to zero Chat Completions function tools"
        );
      }
      result.tool_choice = mode;
    } else if (tcType && tcType !== "function") {
      // Built-in tool types (web_search_preview, file_search, etc.) have no Chat equivalent
      throw unsupportedFeature(
        `Unsupported Responses API feature: tool_choice type '${tcType}' is not supported by omniroute`
      );
    }
  }

  // Cleanup Responses API specific fields
  // Note: prompt_cache_key is intentionally preserved for OpenAI destinations — it is
  // used by Codex as a cache-affinity signal and stripping it unconditionally broke
  // prompt caching (#517). But #517's fix never added a provider gate, so it leaked to
  // every destination, OpenAI or not — a strict non-OpenAI upstream (NVIDIA) 400s on the
  // unrecognized field (#7533). Strip it for any non-OpenAI destination.
  if (!isOpenAIDestination) delete result.prompt_cache_key;
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
  // These fields configure Responses-owned state, caching, and tool execution limits.
  // Chat Completions has no equivalent and strict compatible endpoints reject them.
  delete result.max_tool_calls;
  delete result.conversation;
  delete result.prompt_cache_options;
  delete result.prompt_cache_retention;

  if (namespaceToolIdentityMap.size > 0) {
    // chatCore extracts and deletes this transient side channel before dispatch.
    // Non-enumerability keeps internal request metadata off the upstream wire.
    Object.defineProperty(result, "_toolNameMap", {
      value: namespaceToolIdentityMap,
      enumerable: false,
      configurable: true,
      writable: true,
    });
  }

  // Every Responses-API input — even a plain string — gets wrapped upstream as a
  // single-element content array (`[{ type: "input_text", text }]` via
  // normalizeResponsesInputForChat), which this function maps straight through to
  // `content: [{ type: "text", text }]`. That's spec-valid (OpenAI's own API
  // accepts both shapes) but several strict/naive OpenAI-compatible backends only
  // implement the plain-string form and reject the array form with a 500 — hit
  // live via AI Horde's Aphrodite facade rejecting every /v1/responses request,
  // including the simplest single-string input. A single-text-part array and a
  // plain string are semantically identical, so collapsing is safe there; real
  // multi-part messages (text+image, text+file) are left untouched. Scoped to
  // providers that declare `requiresPlainStringContent` — most OpenAI-compatible
  // backends (and several existing tests) expect the standard array shape to
  // survive translation unchanged.
  if (collapseToPlainString) {
    for (const message of messages) {
      const content = (message as JsonRecord).content;
      if (Array.isArray(content) && content.length === 1) {
        const part = content[0];
        if (
          part &&
          typeof part === "object" &&
          !Array.isArray(part) &&
          (part as JsonRecord).type === "text" &&
          typeof (part as JsonRecord).text === "string"
        ) {
          (message as JsonRecord).content = (part as JsonRecord).text;
        }
      }
    }
  }

  return result;
}

/**
 * `model` is sometimes a bare provider id (e.g. "aihorde"), sometimes a
 * provider-prefixed model string (e.g. "aihorde/aphrodite/..."), and often
 * null/a bare model id with no provider info at all (the generic translator
 * dispatcher passes model id alone; provider is tracked separately there).
 * Only the first two carry a usable provider hint.
 */
function extractProviderHint(model: unknown): string {
  if (typeof model !== "string" || model.length === 0) return "";
  if (getRegisteredProviders().includes(model)) return model;
  const prefix = model.split("/")[0];
  return getRegisteredProviders().includes(prefix) ? prefix : "";
}

// Register both directions
register(FORMATS.OPENAI_RESPONSES, FORMATS.OPENAI, openaiResponsesToOpenAIRequest, null);
register(FORMATS.OPENAI, FORMATS.OPENAI_RESPONSES, openaiToOpenAIResponsesRequest, null);

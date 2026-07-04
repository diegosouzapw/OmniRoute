import { register } from "../registry.ts";
import { FORMATS } from "../formats.ts";
import { adjustMaxTokens } from "../helpers/maxTokensHelper.ts";
import { fixToolPairs } from "../../services/contextManager.ts";

type JsonRecord = Record<string, unknown>;

// Convert Antigravity request to OpenAI format
// Antigravity body: { project, model, userAgent, requestType, requestId, request: { contents, systemInstruction, tools, toolConfig, generationConfig, sessionId } }
export function antigravityToOpenAIRequest(model, body, stream) {
  const req = body.request || body;
  const result: {
    model: string;
    messages: JsonRecord[];
    stream: unknown;
    tools?: JsonRecord[];
    [key: string]: unknown;
  } = {
    model: model,
    messages: [],
    stream: stream,
  };

  // Generation config
  if (req.generationConfig) {
    const config = req.generationConfig;
    if (config.maxOutputTokens) {
      const tempBody = { max_tokens: config.maxOutputTokens, tools: req.tools };
      result.max_tokens = adjustMaxTokens(tempBody);
    }
    if (config.temperature !== undefined) {
      result.temperature = config.temperature;
    }
    if (config.topP !== undefined) {
      result.top_p = config.topP;
    }
    if (config.topK !== undefined) {
      result.top_k = config.topK;
    }

    // Thinking config → reasoning_effort
    if (config.thinkingConfig) {
      const budget = config.thinkingConfig.thinkingBudget || 0;
      if (budget > 0) {
        if (budget <= 2048) {
          result.reasoning_effort = "low";
        } else if (budget <= 16384) {
          result.reasoning_effort = "medium";
        } else {
          result.reasoning_effort = "high";
        }
      }
    }
  }

  // System instruction
  if (req.systemInstruction) {
    const systemText = extractText(req.systemInstruction);
    if (systemText) {
      result.messages.push({ role: "system", content: systemText });
    }
  }

  // Convert contents to messages
  if (req.contents && Array.isArray(req.contents)) {
    for (const content of req.contents) {
      const converted = convertContent(content);
      if (converted) {
        if (Array.isArray(converted)) {
          result.messages.push(...converted);
        } else {
          result.messages.push(converted);
        }
      }
    }
  }

  // Tools
  if (req.tools && Array.isArray(req.tools)) {
    result.tools = [];
    for (const tool of req.tools) {
      if (tool.functionDeclarations) {
        for (const func of tool.functionDeclarations) {
          result.tools.push({
            type: "function",
            function: {
              name: func.name,
              description: func.description || "",
              parameters: cleanSchemaPreservingRequired(func.parameters) || {
                type: "object",
                properties: {},
              },
            },
          });
        }
      }
    }
  }

  // Guard against orphan tool_result/tool_use pairs (#6026). Antigravity IDE can ship a
  // truncated history whose first turn is a `functionResponse` with no preceding
  // `functionCall`. Left untouched, that becomes an orphan `role:"tool"` message here and,
  // after the openai→claude step, an orphan `tool_result` block — which Anthropic (Vertex
  // `claude-opus-4.6`) rejects with `unexpected tool_use_id found in tool_result blocks`.
  // `fixToolPairs` strips only genuine orphans and is idempotent on well-formed histories,
  // so paired functionCall/functionResponse turns pass through unchanged. This mirrors the
  // executor-side guard in `executors/base.ts` / `services/claudeCodeCompatible.ts`; the
  // Antigravity MITM path did not run it (no `fixToolPairs` under `src/mitm/`). We do NOT
  // run `fixToolAdjacency` here because this stage still emits OpenAI-format messages and
  // Claude's adjacency rule is enforced downstream per provider.
  result.messages = fixToolPairs(result.messages) as JsonRecord[];

  return result;
}

// Recursively convert Antigravity schema types (OBJECT, STRING, etc.) to lowercase
// and strip unsupported fields like enumDescriptions.
function normalizeSchemaTypes(schema: unknown): unknown {
  if (!schema || typeof schema !== "object") return schema;

  const result: JsonRecord = Array.isArray(schema)
    ? ([...(schema as unknown[])] as unknown as JsonRecord)
    : { ...(schema as JsonRecord) };

  if (typeof result.type === "string") {
    result.type = result.type.toLowerCase();
  }

  // Strip enumDescriptions — not supported by upstream APIs
  delete result.enumDescriptions;

  if (result.properties && typeof result.properties === "object") {
    const normalized: JsonRecord = {};
    for (const [key, val] of Object.entries(result.properties as JsonRecord)) {
      normalized[key] = normalizeSchemaTypes(val);
    }
    result.properties = normalized;
  }

  if (result.items) {
    result.items = normalizeSchemaTypes(result.items);
  }

  return result;
}

// Clean a JSON Schema for Antigravity while PRESERVING the `required` array at every level.
// Unlike the type-lowering pass alone, this strips JSON Schema Draft 2020-12 meta keywords
// ($schema, $defs, $ref, additionalProperties, patternProperties, title, x-*, ...) that the
// Antigravity upstream does not accept, yet keeps `required` so the model still treats
// mandatory tool arguments as mandatory. Clients such as OpenCode send full Draft 2020-12
// tool schemas; dropping `required` lets the model call tools without their required args.
function cleanSchemaPreservingRequired(schema: unknown): unknown {
  if (!schema || typeof schema !== "object") return schema;

  // Reuse the existing recursion to lowercase types + strip enumDescriptions, then
  // remove draft-meta keywords and reconcile `required` against the surviving properties.
  const normalized = normalizeSchemaTypes(structuredClone(schema));
  stripDraftMeta(normalized);
  preserveRequired(normalized);
  return normalized;
}

// Draft 2020-12 / JSON Schema meta keywords the Antigravity upstream does not accept.
const DRAFT_META_KEYS = new Set([
  "$schema",
  "$defs",
  "definitions",
  "$ref",
  "$comment",
  "const",
  "additionalProperties",
  "propertyNames",
  "patternProperties",
  "title",
]);

function stripDraftMeta(obj: unknown): void {
  if (!obj || typeof obj !== "object") return;
  if (Array.isArray(obj)) {
    for (const item of obj) stripDraftMeta(item);
    return;
  }
  const record = obj as JsonRecord;
  for (const key of Object.keys(record)) {
    if (DRAFT_META_KEYS.has(key) || key.startsWith("x-")) {
      delete record[key];
    }
  }
  for (const value of Object.values(record)) {
    if (value && typeof value === "object") stripDraftMeta(value);
  }
}

// Preserve `required` even when referenced fields were stripped from constraint blocks.
// At each node where both `required` and `properties` are present, keep only the entries
// that still exist in `properties`; drop `required` entirely if none survive. This avoids
// emitting a `required` array that references fields removed by stripDraftMeta.
function preserveRequired(obj: unknown): void {
  if (!obj || typeof obj !== "object") return;
  if (Array.isArray(obj)) {
    for (const item of obj) preserveRequired(item);
    return;
  }
  const record = obj as JsonRecord;
  if (Array.isArray(record.required) && record.properties && typeof record.properties === "object") {
    const properties = record.properties as JsonRecord;
    const valid = (record.required as unknown[]).filter(
      (field) =>
        typeof field === "string" &&
        Object.prototype.hasOwnProperty.call(properties, field)
    );
    if (valid.length === 0) {
      delete record.required;
    } else {
      record.required = valid;
    }
  }
  for (const value of Object.values(record)) {
    if (value && typeof value === "object") preserveRequired(value);
  }
}

// Convert Antigravity content to OpenAI message
// Handles: text, thought, thoughtSignature, functionCall, functionResponse, inlineData
function convertContent(content) {
  const role =
    content.role === "model" ? "assistant" : content.role === "user" ? "user" : content.role;

  if (!content.parts || !Array.isArray(content.parts)) {
    return null;
  }

  const textParts = [];
  const toolCalls = [];
  const toolResults = [];
  let reasoningContent = "";

  for (const part of content.parts) {
    // Thinking content (thought: true)
    if (part.thought === true && part.text) {
      reasoningContent += part.text;
      continue;
    }

    // Text with thoughtSignature = regular text after thinking.
    // Skip empty text — Anthropic rejects empty content blocks with a 400.
    if (part.thoughtSignature && part.text !== undefined) {
      if (part.text) {
        textParts.push({ type: "text", text: part.text });
      }
      continue;
    }

    // Regular text — skip empty strings (Anthropic rejects empty content blocks).
    if (part.text !== undefined && part.text !== "") {
      textParts.push({ type: "text", text: part.text });
    }

    // Inline data (images)
    if (part.inlineData) {
      textParts.push({
        type: "image_url",
        image_url: {
          url: `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`,
        },
      });
    }

    // Function call
    if (part.functionCall) {
      toolCalls.push({
        id: part.functionCall.id || `call_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
        type: "function",
        function: {
          name: part.functionCall.name,
          arguments: JSON.stringify(part.functionCall.args || {}),
        },
      });
    }

    // Function response → collect all, each becomes a separate tool message
    if (part.functionResponse) {
      toolResults.push({
        role: "tool",
        tool_call_id: part.functionResponse.id || part.functionResponse.name,
        content: JSON.stringify(
          part.functionResponse.response?.result || part.functionResponse.response || {}
        ),
      });
    }
  }

  // Function responses may be co-located with function calls / text / reasoning in
  // the same content. Emit the tool messages AND the accompanying assistant message so
  // nothing is dropped (previously only the tool messages survived).
  if (toolResults.length > 0) {
    if (toolCalls.length > 0 || textParts.length > 0 || reasoningContent) {
      const assistantMsg: JsonRecord = { role: "assistant" };
      if (textParts.length > 0) {
        assistantMsg.content =
          textParts.length === 1 && textParts[0].type === "text"
            ? textParts[0].text
            : textParts;
      }
      if (reasoningContent) {
        assistantMsg.reasoning_content = reasoningContent;
      }
      if (toolCalls.length > 0) {
        assistantMsg.tool_calls = toolCalls;
      }
      return [...toolResults, assistantMsg];
    }
    return toolResults;
  }

  // Assistant with tool calls
  if (toolCalls.length > 0) {
    const msg: JsonRecord = { role: "assistant" };
    if (textParts.length > 0) {
      msg.content =
        textParts.length === 1 && textParts[0].type === "text" ? textParts[0].text : textParts;
    }
    if (reasoningContent) {
      msg.reasoning_content = reasoningContent;
    }
    msg.tool_calls = toolCalls;
    return msg;
  }

  // Regular message
  if (textParts.length > 0 || reasoningContent) {
    const msg: JsonRecord = { role };
    if (textParts.length > 0) {
      msg.content =
        textParts.length === 1 && textParts[0].type === "text" ? textParts[0].text : textParts;
    }
    if (reasoningContent) {
      msg.reasoning_content = reasoningContent;
    }
    return msg;
  }

  return null;
}

// Extract text from systemInstruction
function extractText(instruction) {
  if (typeof instruction === "string") return instruction;
  if (instruction.parts && Array.isArray(instruction.parts)) {
    return instruction.parts.map((p) => p.text || "").join("");
  }
  return "";
}

// Register
register(FORMATS.ANTIGRAVITY, FORMATS.OPENAI, antigravityToOpenAIRequest, null);

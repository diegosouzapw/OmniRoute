/**
 * Convert a native Gemini `generateContent` request body into the internal
 * OpenAI Chat Completions shape consumed by `handleChat`.
 *
 * Extracted from the route handler so the (pure) conversion can be unit-tested
 * without importing the full chat-handler graph (which keeps timers alive and
 * hangs the node:test runner). See feature #6222.
 *
 * Tool/function calling is preserved in the request direction:
 *   - `tools[].functionDeclarations` → OpenAI `tools[{type:"function",...}]`
 *   - prior `functionCall` parts       → assistant `tool_calls`
 *   - `functionResponse` parts         → `tool`-role messages
 *
 * `inlineData` parts of non-model turns become `image_url` data URLs.
 *
 * Mirrors the shapes already used by the request translator
 * `open-sse/translator/request/gemini-to-openai.ts`.
 */

import { createGeminiToolCallIdPairing } from "@omniroute/open-sse/translator/helpers/geminiToolCallIds.ts";

interface GeminiFunctionCall {
  name?: string;
  args?: Record<string, unknown>;
  id?: string;
}

interface GeminiFunctionResponse {
  name?: string;
  id?: string;
  response?: { result?: unknown } & Record<string, unknown>;
}

interface GeminiPart {
  text?: string;
  functionCall?: GeminiFunctionCall;
  functionResponse?: GeminiFunctionResponse;
  [key: string]: unknown;
}

interface GeminiContent {
  role?: string;
  parts?: GeminiPart[];
}

interface GeminiTool {
  functionDeclarations?: Array<{
    name?: string;
    description?: string;
    parameters?: unknown;
  }>;
}

interface GeminiGenerateBody {
  systemInstruction?: { parts?: GeminiPart[] };
  contents?: GeminiContent[];
  tools?: GeminiTool[];
  generationConfig?: {
    maxOutputTokens?: number;
    temperature?: number;
    topP?: number;
  };
}

type InternalContentPart =
  { type: "text"; text: string } | { type: "image_url"; image_url: { url: string } };

interface InternalMessage {
  role: string;
  content?: string | InternalContentPart[] | null;
  tool_calls?: Array<{
    id: string;
    type: "function";
    function: { name: string; arguments: string };
  }>;
  tool_call_id?: string;
}

interface InternalTool {
  type: "function";
  function: { name: string; description: string; parameters: unknown };
}

export interface InternalChatBody {
  model: string;
  messages: InternalMessage[];
  stream: boolean;
  max_tokens?: number;
  temperature?: number;
  top_p?: number;
  tools?: InternalTool[];
}

let toolCallSeq = 0;

function newToolCallId(): string {
  toolCallSeq += 1;
  return `call_${Date.now()}_${toolCallSeq}_${Math.random().toString(36).slice(2, 8)}`;
}

/**
 * Convert a single Gemini `content` entry into internal messages.
 *
 * `functionResponse` parts become `tool` messages; `functionCall` parts become
 * an assistant message carrying `tool_calls`; otherwise a plain text message.
 * In a non-model content, `inlineData` parts become `image_url` data URLs, as in
 * the Gemini translator. Returns `null` when the content has nothing to contribute.
 */
function convertContent(
  content: GeminiContent,
  toolCallIds: ReturnType<typeof createGeminiToolCallIdPairing>
): InternalMessage | InternalMessage[] | null {
  const parts = content.parts;
  if (!parts || !Array.isArray(parts)) return null;

  // A functionResponse turn maps to `tool` role messages, one per response: Gemini answers
  // parallel calls with several functionResponse parts in a single content.
  const toolMessages: InternalMessage[] = [];
  for (const part of parts) {
    if (part.functionResponse) {
      const fr = part.functionResponse;
      const payload =
        fr.response && "result" in fr.response ? fr.response.result : fr.response ?? {};
      toolMessages.push({
        role: "tool",
        tool_call_id: toolCallIds.responseId(fr),
        content: JSON.stringify(payload ?? {}),
      });
    }
  }
  if (toolMessages.length > 0) return toolMessages;

  const textSegments: string[] = [];
  const contentParts: InternalContentPart[] = [];
  const toolCalls: InternalMessage["tool_calls"] = [];
  // Chat Completions takes image parts in user content only, so a model turn keeps its text.
  const acceptsInlineData = content.role !== "model";

  for (const part of parts) {
    if (typeof part.text === "string") {
      textSegments.push(part.text);
      contentParts.push({ type: "text", text: part.text });
    }
    const inlineData = (acceptsInlineData ? (part.inlineData ?? part.inline_data) : undefined) as
      { mimeType?: string; mime_type?: string; data?: unknown } | undefined;
    if (inlineData && typeof inlineData.data === "string") {
      const mimeType = inlineData.mimeType || inlineData.mime_type || "image/png";
      contentParts.push({
        type: "image_url",
        image_url: { url: `data:${mimeType};base64,${inlineData.data}` },
      });
    }
    if (part.functionCall) {
      toolCalls.push({
        id: toolCallIds.callId(part.functionCall),
        type: "function",
        function: {
          name: part.functionCall.name || "",
          arguments: JSON.stringify(part.functionCall.args || {}),
        },
      });
    }
  }

  const text = textSegments.join("\n");
  const hasInlineData = contentParts.some((part) => part.type === "image_url");

  if (toolCalls.length > 0) {
    const msg: InternalMessage = { role: "assistant" };
    if (hasInlineData) msg.content = contentParts;
    else if (text) msg.content = text;
    msg.tool_calls = toolCalls;
    return msg;
  }

  const role = content.role === "model" ? "assistant" : "user";
  return { role, content: hasInlineData ? contentParts : text };
}

/**
 * Split a content holding `functionResponse` parts next to other parts into one content with
 * the responses and one with the rest, as `splitCoLocatedFunctionResponses()` does in the
 * Gemini translator. gemini-cli sends a binary file a tool read that way: the
 * functionResponse, then the file as inlineData.
 */
function splitFunctionResponses(
  content: GeminiContent
): Array<{ content: GeminiContent; coLocated: boolean }> {
  const parts = content?.parts;
  if (!Array.isArray(parts) || !parts.some((part) => part?.functionResponse)) {
    return [{ content, coLocated: false }];
  }
  const others = parts.filter((part) => !part?.functionResponse);
  const pieces = [
    {
      content: { ...content, parts: parts.filter((part) => part?.functionResponse) },
      coLocated: false,
    },
  ];
  if (others.length > 0) pieces.push({ content: { ...content, parts: others }, coLocated: true });
  return pieces;
}

/**
 * Convert Gemini request format to OpenAI/internal format.
 *
 * @param geminiBody parsed Gemini request body
 * @param model      resolved model string (e.g. "gemini/gemini-pro")
 * @param stream     whether to stream (derived from URL action suffix)
 */
export function convertGeminiToInternal(
  geminiBody: GeminiGenerateBody,
  model: string,
  stream: boolean
): InternalChatBody {
  const messages: InternalMessage[] = [];

  // Convert system instruction
  if (geminiBody.systemInstruction) {
    const systemText =
      geminiBody.systemInstruction.parts?.map((p) => p.text ?? "").join("\n") || "";
    if (systemText) {
      messages.push({ role: "system", content: systemText });
    }
  }

  // Convert contents to messages (text + tool calls + tool responses)
  if (geminiBody.contents) {
    const toolCallIds = createGeminiToolCallIdPairing(newToolCallId);
    for (const original of geminiBody.contents) {
      for (const { content, coLocated } of splitFunctionResponses(original)) {
        toolCallIds.beginContent(content);
        const converted = convertContent(content, toolCallIds);
        if (Array.isArray(converted)) messages.push(...converted);
        // Parts next to the responses that yield nothing (an empty text part) add no message.
        else if (converted && (!coLocated || converted.content || converted.tool_calls)) {
          messages.push(converted);
        }
      }
    }
  }

  const result: InternalChatBody = {
    model,
    messages,
    stream,
    max_tokens: geminiBody.generationConfig?.maxOutputTokens,
    temperature: geminiBody.generationConfig?.temperature,
    top_p: geminiBody.generationConfig?.topP,
  };

  // Convert tool declarations → OpenAI tools.
  if (Array.isArray(geminiBody.tools)) {
    const tools: InternalTool[] = [];
    for (const tool of geminiBody.tools) {
      if (!tool.functionDeclarations) continue;
      for (const func of tool.functionDeclarations) {
        tools.push({
          type: "function",
          function: {
            name: func.name || "",
            description: func.description || "",
            parameters: func.parameters || { type: "object", properties: {} },
          },
        });
      }
    }
    if (tools.length > 0) result.tools = tools;
  }

  return result;
}

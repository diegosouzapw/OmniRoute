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
 * Mirrors the shapes already used by the request translator
 * `open-sse/translator/request/gemini-to-openai.ts`.
 */

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

interface InternalMessage {
  role: string;
  content?: string | null;
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
 * Convert a single Gemini `content` entry into one internal message.
 *
 * `functionResponse` parts become a `tool` message; `functionCall` parts become
 * an assistant message carrying `tool_calls`; otherwise a plain text message.
 * Returns `null` when the content has nothing to contribute.
 */
function convertContent(content: GeminiContent): InternalMessage | null {
  const parts = content.parts;
  if (!parts || !Array.isArray(parts)) return null;

  // A functionResponse turn maps to a `tool` role message.
  for (const part of parts) {
    if (part.functionResponse) {
      const fr = part.functionResponse;
      const payload =
        fr.response && "result" in fr.response ? fr.response.result : fr.response ?? {};
      return {
        role: "tool",
        tool_call_id: fr.id || fr.name || "",
        content: JSON.stringify(payload ?? {}),
      };
    }
  }

  const textSegments: string[] = [];
  const toolCalls: InternalMessage["tool_calls"] = [];

  for (const part of parts) {
    if (typeof part.text === "string") {
      textSegments.push(part.text);
    }
    if (part.functionCall) {
      toolCalls.push({
        id: part.functionCall.id || newToolCallId(),
        type: "function",
        function: {
          name: part.functionCall.name || "",
          arguments: JSON.stringify(part.functionCall.args || {}),
        },
      });
    }
  }

  const text = textSegments.join("\n");

  if (toolCalls.length > 0) {
    const msg: InternalMessage = { role: "assistant" };
    if (text) msg.content = text;
    msg.tool_calls = toolCalls;
    return msg;
  }

  const role = content.role === "model" ? "assistant" : "user";
  return { role, content: text };
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
    for (const content of geminiBody.contents) {
      const converted = convertContent(content);
      if (converted) messages.push(converted);
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

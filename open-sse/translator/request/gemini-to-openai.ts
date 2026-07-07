import { register } from "../registry.ts";
import { FORMATS } from "../formats.ts";
import { adjustMaxTokens } from "../helpers/maxTokensHelper.ts";

// Convert Gemini request to OpenAI format
export function geminiToOpenAIRequest(model, body, stream) {
  const result: {
    model: string;
    messages: Array<Record<string, unknown>>;
    stream: boolean;
    max_tokens?: number;
    temperature?: number;
    top_p?: number;
    tools?: Array<Record<string, unknown>>;
  } = {
    model: model,
    messages: [],
    stream: stream,
  };

  // Generation config
  if (body.generationConfig) {
    const config = body.generationConfig;
    if (config.maxOutputTokens) {
      const tempBody = { max_tokens: config.maxOutputTokens, tools: body.tools };
      result.max_tokens = adjustMaxTokens(tempBody);
    }
    if (config.temperature !== undefined) {
      result.temperature = config.temperature;
    }
    if (config.topP !== undefined) {
      result.top_p = config.topP;
    }
  }

  // System instruction
  if (body.systemInstruction) {
    const systemText = extractGeminiText(body.systemInstruction);
    if (systemText) {
      result.messages.push({
        role: "system",
        content: systemText,
      });
    }
  }

  // Convert contents to messages
  if (body.contents && Array.isArray(body.contents)) {
    for (const content of splitCoLocatedFunctionResponses(body.contents)) {
      const converted = convertGeminiContent(content);
      if (converted) {
        result.messages.push(converted);
      }
    }
  }

  // Tools
  if (body.tools && Array.isArray(body.tools)) {
    result.tools = [];
    for (const tool of body.tools) {
      if (tool.functionDeclarations) {
        for (const func of tool.functionDeclarations) {
          result.tools.push({
            type: "function",
            function: {
              name: func.name,
              description: func.description || "",
              parameters: func.parameters || { type: "object", properties: {} },
            },
          });
        }
      }
    }
  }

  return result;
}

// Convert Gemini content to OpenAI message
// convertGeminiContent() early-returns the tool message on the first
// `functionResponse` part in a content, dropping any co-located parts
// (another functionCall, or trailing text). Gemini clients can send those
// co-located. Pre-split each such content into: one single-part content per
// functionResponse (each early-returns cleanly as a tool message, emitted
// first to keep tool-result-before-next-turn ordering) plus one content for
// the remaining non-functionResponse parts.
function splitCoLocatedFunctionResponses(contents) {
  const out = [];
  for (const content of contents) {
    if (!content || !Array.isArray(content.parts)) {
      out.push(content);
      continue;
    }
    const hasFunctionResponse = content.parts.some((p) => p && p.functionResponse);
    if (!hasFunctionResponse) {
      out.push(content);
      continue;
    }
    for (const part of content.parts) {
      if (part && part.functionResponse) {
        out.push({ ...content, parts: [part] });
      }
    }
    const nonFRParts = content.parts.filter((p) => !(p && p.functionResponse));
    if (nonFRParts.length > 0) {
      out.push({ ...content, parts: nonFRParts });
    }
  }
  return out;
}

function convertGeminiContent(content) {
  const role = content.role === "user" ? "user" : "assistant";

  if (!content.parts || !Array.isArray(content.parts)) {
    return null;
  }

  const parts = [];
  const toolCalls = [];

  for (const part of content.parts) {
    if (part.text !== undefined) {
      parts.push({ type: "text", text: part.text });
    }

    if (part.inlineData || part.inline_data) {
      const data = part.inlineData || part.inline_data;
      const mimeType = data.mimeType || data.mime_type || "image/png";
      parts.push({
        type: "image_url",
        image_url: {
          url: `data:${mimeType};base64,${data.data}`,
        },
      });
    }

    if (part.functionCall) {
      toolCalls.push({
        id: `call_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
        type: "function",
        function: {
          name: part.functionCall.name,
          arguments: JSON.stringify(part.functionCall.args || {}),
        },
      });
    }

    if (part.functionResponse) {
      return {
        role: "tool",
        tool_call_id: part.functionResponse.id || part.functionResponse.name,
        content: JSON.stringify(
          part.functionResponse.response?.result || part.functionResponse.response || {}
        ),
      };
    }
  }

  if (toolCalls.length > 0) {
    const result: {
      role: string;
      content?: string | Array<Record<string, unknown>>;
      tool_calls?: Array<Record<string, unknown>>;
    } = { role: "assistant" };
    if (parts.length > 0) {
      result.content = parts.length === 1 ? parts[0].text : parts;
    }
    result.tool_calls = toolCalls;
    return result;
  }

  if (parts.length > 0) {
    return {
      role,
      content: parts.length === 1 && parts[0].type === "text" ? parts[0].text : parts,
    };
  }

  return null;
}

// Extract text from Gemini content
function extractGeminiText(content) {
  if (typeof content === "string") return content;
  if (content.parts && Array.isArray(content.parts)) {
    return content.parts.map((p) => p.text || "").join("");
  }
  return "";
}

// Register
register(FORMATS.GEMINI, FORMATS.OPENAI, geminiToOpenAIRequest, null);

import { register } from "../registry.ts";
import { FORMATS } from "../formats.ts";
import { DEFAULT_THINKING_GEMINI_SIGNATURE } from "../../config/defaultThinkingSignature.ts";
import { ANTIGRAVITY_DEFAULT_SYSTEM } from "../../config/constants.ts";
import { resolveGeminiThoughtSignature } from "../../services/geminiThoughtSignatureStore.ts";
import { openaiToClaudeRequestForAntigravity } from "./openai-to-claude.ts";
import {
  capMaxOutputTokens,
  capThinkingBudget,
  getDefaultThinkingBudget,
} from "../../../src/lib/modelCapabilities.ts";

import * as crypto from "crypto";

function generateUUID() {
  return crypto.randomUUID();
}

import {
  DEFAULT_SAFETY_SETTINGS,
  convertOpenAIContentToParts,
  extractTextContent,
  tryParseJSON,
  generateRequestId,
  generateSessionId,
  cleanJSONSchemaForAntigravity,
} from "../helpers/geminiHelper.ts";
import { buildGeminiTools, sanitizeGeminiToolName } from "../helpers/geminiToolsSanitizer.ts";

type GeminiPart = Record<string, unknown>;
type GeminiContent = { role: string; parts: GeminiPart[] };

type GeminiGenerationConfig = {
  temperature?: unknown;
  topP?: unknown;
  topK?: unknown;
  maxOutputTokens?: unknown;
  thinkingConfig?: {
    thinkingBudget: number;
    includeThoughts: boolean;
  };
  responseMimeType?: string;
  responseSchema?: unknown;
  stopSequences?: string[] | unknown[];
};

type GeminiFunctionDeclaration = {
  name: string;
  description: string;
  parameters: unknown;
};

type GeminiRequest = {
  model: string;
  contents: GeminiContent[];
  generationConfig: GeminiGenerationConfig;
  safetySettings: unknown;
  systemInstruction?: GeminiContent;
  tools?: Array<{
    functionDeclarations?: GeminiFunctionDeclaration[];
    googleSearch?: Record<string, unknown>;
  }>;
  cachedContent?: string;
  _toolNameMap?: Map<string, string>;
};

type CloudCodeEnvelope = {
  project: string;
  model: string;
  userAgent: string;
  requestId: string;
  requestType?: string;
  request: {
    sessionId: string;
    contents: GeminiContent[];
    systemInstruction?: GeminiContent;
    generationConfig: GeminiGenerationConfig;
    tools?: Array<{
      functionDeclarations?: GeminiFunctionDeclaration[];
      googleSearch?: Record<string, unknown>;
    }>;
    safetySettings?: unknown;
    toolConfig?: {
      functionCallingConfig: { mode: string };
    };
  };
  _toolNameMap?: Map<string, string>;
};

type GeminiToolNameOptions = {
  stripNamespace?: boolean;
};

function buildChangedToolNameMap(toolNameMap: Map<string, string>): Map<string, string> | null {
  const changedEntries = [...toolNameMap.entries()].filter(
    ([sanitizedName, originalName]) => sanitizedName !== originalName
  );
  return changedEntries.length > 0 ? new Map(changedEntries) : null;
}

function extractClientThoughtSignature(toolCall) {
  if (!toolCall || typeof toolCall !== "object") return null;

  return (
    toolCall.thoughtSignature ||
    toolCall.thought_signature ||
    toolCall.function?.thoughtSignature ||
    toolCall.function?.thought_signature ||
    null
  );
}

// Core: Convert OpenAI request to Gemini format (base for all variants)
function openaiToGeminiBase(model, body, stream, toolNameOptions: GeminiToolNameOptions = {}) {
  const result: GeminiRequest = {
    model: model,
    contents: [],
    generationConfig: {},
    safetySettings: body.safetySettings || DEFAULT_SAFETY_SETTINGS,
  };
  const toolNameMap = new Map<string, string>();
  const sanitizeToolName = (name: string) =>
    sanitizeGeminiToolName(name, {
      ...toolNameOptions,
      toolNameMap,
    });

  // Preserve cachedContent if provided by client (for explicit Gemini caching)
  if (body.cachedContent) {
    result.cachedContent = body.cachedContent;
  }

  // Generation config
  if (body.temperature !== undefined) {
    result.generationConfig.temperature = body.temperature;
  }
  if (body.top_p !== undefined) {
    result.generationConfig.topP = body.top_p;
  }
  if (body.top_k !== undefined) {
    result.generationConfig.topK = body.top_k;
  }
  if (body.stop !== undefined) {
    result.generationConfig.stopSequences = Array.isArray(body.stop) ? body.stop : [body.stop];
  }
  const requestedMaxOutputTokens = body.max_tokens ?? body.max_completion_tokens;
  if (requestedMaxOutputTokens !== undefined) {
    result.generationConfig.maxOutputTokens = capMaxOutputTokens(model, requestedMaxOutputTokens);
  } else {
    result.generationConfig.maxOutputTokens = capMaxOutputTokens(model);
  }

  // Build tool_call_id -> name map
  const tcID2Name = {};
  if (body.messages && Array.isArray(body.messages)) {
    for (const msg of body.messages) {
      if (msg.role === "assistant" && msg.tool_calls) {
        for (const tc of msg.tool_calls) {
          if (tc.type === "function" && tc.id && tc.function?.name) {
            tcID2Name[tc.id] = tc.function.name;
          }
        }
      }
    }
  }

  // Build tool responses cache
  const toolResponses = {};
  if (body.messages && Array.isArray(body.messages)) {
    for (const msg of body.messages) {
      if (msg.role === "tool" && msg.tool_call_id) {
        toolResponses[msg.tool_call_id] = msg.content;
      }
    }
  }

  // Convert messages
  if (body.messages && Array.isArray(body.messages)) {
    for (let i = 0; i < body.messages.length; i++) {
      const msg = body.messages[i];
      const role = msg.role;
      const content = msg.content;

      if (role === "system" && body.messages.length > 1) {
        const systemText = typeof content === "string" ? content : extractTextContent(content);
        if (systemText) {
          if (!result.systemInstruction) {
            result.systemInstruction = {
              role: "user",
              parts: [{ text: systemText }],
            };
          } else {
            result.systemInstruction.parts.push({ text: systemText });
          }
        }
      } else if (role === "user" || (role === "system" && body.messages.length === 1)) {
        const parts = convertOpenAIContentToParts(content);
        if (parts.length > 0) {
          result.contents.push({ role: "user", parts });
        }
      } else if (role === "assistant") {
        const parts = [];

        // Thinking/reasoning → thought part with signature
        if (msg.reasoning_content) {
          parts.push({
            thought: true,
            text: msg.reasoning_content,
          });
        }

        if (content) {
          const text = typeof content === "string" ? content : extractTextContent(content);
          if (text) {
            parts.push({ text });
          }
        }

        if (msg.tool_calls && Array.isArray(msg.tool_calls)) {
          const toolCallIds = [];
          const firstPersistedSignature = msg.tool_calls
            .map((tc) => resolveGeminiThoughtSignature(tc.id, extractClientThoughtSignature(tc)))
            .find((signature) => typeof signature === "string" && signature.length > 0);

          let shouldUseEmbeddedSignature = !parts.some((p) => p.thoughtSignature);

          for (const tc of msg.tool_calls) {
            if (tc.type !== "function") continue;

            const args = tryParseJSON(tc.function?.arguments || "{}");
            const signatureForToolCall = resolveGeminiThoughtSignature(
              tc.id,
              extractClientThoughtSignature(tc)
            );
            const embeddedThoughtSignature = shouldUseEmbeddedSignature
              ? firstPersistedSignature || signatureForToolCall
              : undefined;

            if (embeddedThoughtSignature) {
              shouldUseEmbeddedSignature = false;
            }

            // Gemini expects the signature on the functionCall part itself.
            parts.push({
              ...(embeddedThoughtSignature ? { thoughtSignature: embeddedThoughtSignature } : {}),
              functionCall: {
                id: tc.id,
                name: sanitizeToolName(tc.function.name),
                args: args,
              },
            });

            toolCallIds.push(tc.id);
          }

          if (parts.length > 0) {
            result.contents.push({ role: "model", parts });
          }

          // Check if there are actual tool responses in the next messages
          const hasActualResponses = toolCallIds.some((fid) => toolResponses[fid]);

          if (hasActualResponses) {
            const toolParts = [];
            for (const fid of toolCallIds) {
              if (!toolResponses[fid]) continue;

              let name = tcID2Name[fid];
              if (!name) {
                const idParts = fid.split("-");
                if (idParts.length > 2) {
                  name = idParts.slice(0, -2).join("-");
                } else {
                  name = fid;
                }
              }
              name = sanitizeToolName(name);

              let resp = toolResponses[fid];
              let parsedResp = tryParseJSON(resp);
              if (parsedResp === null) {
                parsedResp = { result: resp };
              } else if (typeof parsedResp !== "object") {
                parsedResp = { result: parsedResp };
              }

              toolParts.push({
                functionResponse: {
                  id: fid,
                  name: name,
                  response: { result: parsedResp },
                },
              });
            }
            if (toolParts.length > 0) {
              result.contents.push({ role: "user", parts: toolParts });
            }
          }
        } else if (parts.length > 0) {
          result.contents.push({ role: "model", parts });
        }
      }
    }
  }

  // Convert tools
  const geminiTools = buildGeminiTools(body.tools, {
    ...toolNameOptions,
    toolNameMap,
  });
  if (geminiTools) {
    result.tools = geminiTools;
  }

  // Convert response_format to Gemini's responseMimeType/responseSchema
  if (body.response_format) {
    if (body.response_format.type === "json_schema" && body.response_format.json_schema) {
      result.generationConfig.responseMimeType = "application/json";
      // Extract the schema (may be nested under .schema key)
      const schema = body.response_format.json_schema.schema || body.response_format.json_schema;
      if (schema && typeof schema === "object") {
        result.generationConfig.responseSchema = cleanJSONSchemaForAntigravity(schema);
      }
    } else if (body.response_format.type === "json_object") {
      result.generationConfig.responseMimeType = "application/json";
    } else if (body.response_format.type === "text") {
      result.generationConfig.responseMimeType = "text/plain";
    }
  }

  const changedToolNameMap = buildChangedToolNameMap(toolNameMap);
  if (changedToolNameMap) {
    result._toolNameMap = changedToolNameMap;
  }

  return result;
}

// OpenAI -> Gemini (standard API)
export function openaiToGeminiRequest(model, body, stream) {
  return openaiToGeminiBase(model, body, stream);
}

// OpenAI -> Gemini CLI (Cloud Code Assist)
export function openaiToGeminiCLIRequest(model, body, stream) {
  const gemini = openaiToGeminiBase(model, body, stream, { stripNamespace: true });

  // Add thinking config for CLI
  if (body.reasoning_effort) {
    const budgetMap = {
      low: 1024,
      medium: getDefaultThinkingBudget(model) || 8192,
      high: capThinkingBudget(model, 32768),
    };
    const budget = budgetMap[body.reasoning_effort] || getDefaultThinkingBudget(model) || 8192;
    gemini.generationConfig.thinkingConfig = {
      thinkingBudget: budget,
      includeThoughts: true,
    };
  }

  // Thinking config from Claude format
  if (body.thinking?.type === "enabled" && body.thinking.budget_tokens) {
    gemini.generationConfig.thinkingConfig = {
      thinkingBudget: body.thinking.budget_tokens,
      includeThoughts: true,
    };
  }

  return gemini;
}

// Wrap Gemini CLI format in Cloud Code wrapper
function wrapInCloudCodeEnvelope(model, geminiCLI, credentials = null, isAntigravity = false) {
  // Both Antigravity and Gemini CLI need the project field for the Cloud Code API.
  // For Gemini CLI, the stored projectId may be stale; the executor's transformRequest
  // refreshes it via loadCodeAssist before the request is sent to the API.
  let projectId = credentials?.projectId;

  if (!projectId) {
    console.warn(
      `[OmniRoute] ${isAntigravity ? "Antigravity" : "GeminiCLI"} account is missing projectId. ` +
        `Attempting request with empty project — reconnect OAuth to resolve.`
    );
    projectId = "";
  }

  const cleanModel = model.includes("/") ? model.split("/").pop()! : model;

  const envelope: CloudCodeEnvelope = {
    project: projectId,
    model: cleanModel,
    userAgent: isAntigravity ? "antigravity" : "gemini-cli",
    requestId: isAntigravity ? `agent-${generateUUID()}` : generateRequestId(),
    request: {
      sessionId: generateSessionId(),
      contents: geminiCLI.contents,
      systemInstruction: geminiCLI.systemInstruction,
      generationConfig: geminiCLI.generationConfig,
      tools: geminiCLI.tools,
    },
  };
  if (geminiCLI._toolNameMap instanceof Map && geminiCLI._toolNameMap.size > 0) {
    envelope._toolNameMap = geminiCLI._toolNameMap;
  }

  // Antigravity specific fields
  if (isAntigravity) {
    envelope.requestType = "agent";

    // Inject required default system prompt for Antigravity
    const defaultPart: GeminiPart = { text: ANTIGRAVITY_DEFAULT_SYSTEM };
    if (envelope.request.systemInstruction?.parts) {
      envelope.request.systemInstruction.parts.unshift(defaultPart);
    } else {
      envelope.request.systemInstruction = { role: "user", parts: [defaultPart] };
    }

    // Add toolConfig for Antigravity
    if (geminiCLI.tools?.some((tool) => Array.isArray(tool.functionDeclarations))) {
      envelope.request.toolConfig = {
        functionCallingConfig: { mode: "VALIDATED" },
      };
    }
  } else {
    // Keep safetySettings for Gemini CLI
    envelope.request.safetySettings = geminiCLI.safetySettings;
  }

  return envelope;
}

function wrapInCloudCodeEnvelopeForClaude(model, claudeRequest, credentials = null) {
  const toolNameMap = new Map<string, string>();
  const sanitizeToolName = (name: string) =>
    sanitizeGeminiToolName(name, {
      stripNamespace: true,
      toolNameMap,
    });
  let projectId = credentials?.projectId;

  if (!projectId) {
    console.warn(
      `[OmniRoute] Antigravity/Claude account is missing projectId. ` +
        `Attempting request with empty project — reconnect OAuth to resolve.`
    );
    projectId = "";
  }

  const cleanModel = model.includes("/") ? model.split("/").pop()! : model;

  const envelope: CloudCodeEnvelope = {
    project: projectId,
    model: cleanModel,
    userAgent: "antigravity",
    requestId: `agent-${generateUUID()}`,
    requestType: "agent",
    request: {
      sessionId: generateSessionId(),
      contents: [],
      generationConfig: {
        temperature: claudeRequest.temperature || 1,
        maxOutputTokens: claudeRequest.max_tokens || 4096,
      },
    },
  };

  const toolUseNames: Record<string, string> = {};
  if (claudeRequest.messages && Array.isArray(claudeRequest.messages)) {
    for (const msg of claudeRequest.messages) {
      if (!Array.isArray(msg.content)) continue;
      for (const block of msg.content) {
        if (block.type === "tool_use" && block.id && typeof block.name === "string") {
          toolUseNames[block.id] = sanitizeToolName(block.name);
        }
      }
    }
  }

  // Convert Claude messages to Gemini contents
  if (claudeRequest.messages && Array.isArray(claudeRequest.messages)) {
    for (const msg of claudeRequest.messages) {
      const parts = [];

      if (Array.isArray(msg.content)) {
        for (const block of msg.content) {
          if (block.type === "text") {
            parts.push({ text: block.text });
          } else if (block.type === "image" && block.source) {
            parts.push({
              inlineData: {
                mimeType: block.source.media_type,
                data: block.source.data,
              },
            });
          } else if (block.type === "tool_use") {
            parts.push({
              functionCall: {
                id: block.id,
                name: sanitizeToolName(block.name),
                args: block.input || {},
              },
            });
          } else if (block.type === "tool_result") {
            let content = block.content;
            if (Array.isArray(content)) {
              content = content
                .map((c) => (c.type === "text" ? c.text : JSON.stringify(c)))
                .join("\n");
            }
            parts.push({
              functionResponse: {
                id: block.tool_use_id,
                name: toolUseNames[block.tool_use_id] || "unknown",
                response: { result: tryParseJSON(content) || content },
              },
            });
          }
        }
      } else if (typeof msg.content === "string") {
        parts.push({ text: msg.content });
      }

      if (parts.length > 0) {
        envelope.request.contents.push({
          role: msg.role === "assistant" ? "model" : "user",
          parts,
        });
      }
    }
  }

  // Convert Claude tools to Gemini functionDeclarations
  if (claudeRequest.tools && Array.isArray(claudeRequest.tools)) {
    const geminiTools = buildGeminiTools(claudeRequest.tools, {
      stripNamespace: true,
      toolNameMap,
    });
    if (geminiTools) {
      envelope.request.tools = geminiTools;
      envelope.request.toolConfig = {
        functionCallingConfig: { mode: "VALIDATED" },
      };
    }
  }

  // Add system instruction (Antigravity default)
  const defaultPart = { text: ANTIGRAVITY_DEFAULT_SYSTEM };
  const systemParts = [defaultPart];

  if (claudeRequest.system) {
    if (Array.isArray(claudeRequest.system)) {
      for (const block of claudeRequest.system) {
        if (block.text) systemParts.push({ text: block.text });
      }
    } else if (typeof claudeRequest.system === "string") {
      systemParts.push({ text: claudeRequest.system });
    }
  }

  envelope.request.systemInstruction = { role: "user", parts: systemParts };

  const changedToolNameMap = buildChangedToolNameMap(toolNameMap);
  if (changedToolNameMap) {
    envelope._toolNameMap = changedToolNameMap;
  }

  return envelope;
}

// OpenAI -> Antigravity (Sandbox Cloud Code with wrapper)
export function openaiToAntigravityRequest(model, body, stream, credentials = null) {
  const isClaude = model.toLowerCase().includes("claude");

  if (isClaude) {
    const claudeRequest = openaiToClaudeRequestForAntigravity(model, body, stream);
    return wrapInCloudCodeEnvelopeForClaude(model, claudeRequest, credentials);
  }

  const geminiCLI = openaiToGeminiCLIRequest(model, body, stream);
  return wrapInCloudCodeEnvelope(model, geminiCLI, credentials, true);
}

// Register
register(FORMATS.OPENAI, FORMATS.GEMINI, openaiToGeminiRequest, null);
register(
  FORMATS.OPENAI,
  FORMATS.GEMINI_CLI,
  (model, body, stream, credentials) =>
    wrapInCloudCodeEnvelope(model, openaiToGeminiCLIRequest(model, body, stream), credentials),
  null
);
register(FORMATS.OPENAI, FORMATS.ANTIGRAVITY, openaiToAntigravityRequest, null);

import { register } from "../registry.ts";
import { FORMATS } from "../formats.ts";
import { DEFAULT_THINKING_GEMINI_SIGNATURE } from "../../config/defaultThinkingSignature.ts";
import { ANTIGRAVITY_DEFAULT_SYSTEM } from "../../config/constants.ts";
import { resolveGeminiThoughtSignature } from "../../services/geminiThoughtSignatureStore.ts";
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
  generateSessionId,
  cleanJSONSchemaForAntigravity,
} from "../helpers/geminiHelper.ts";
import { buildGeminiTools, sanitizeGeminiToolName } from "../helpers/geminiToolsSanitizer.ts";

// Observed Antigravity wrapper output cap, not an underlying model capability.
// Keep this bridge-local: capMaxOutputTokens() falls back to OmniRoute's generic
// 8192 default for unknown Claude-family IDs, while Antigravity currently caps
// visible output around 16K. See: https://github.com/keisksw/antigravity-output-analysis
const ANTIGRAVITY_CLAUDE_MAX_OUTPUT_TOKENS = 16_384;

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
  contents?: GeminiContent[];
  [key: string]: unknown;
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
  user_prompt_id?: string;
  userAgent?: string;
  requestId?: string;
  requestType?: string;
  request: {
    session_id?: string;
    sessionId?: string;
    contents?: GeminiContent[];
    [key: string]: unknown;
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
  functionResponseShape?: "result" | "output";
};

type OpenAIToolCallLike = {
  thoughtSignature?: unknown;
  thought_signature?: unknown;
  function?: {
    thoughtSignature?: unknown;
    thought_signature?: unknown;
  };
};

function buildChangedToolNameMap(toolNameMap: Map<string, string>): Map<string, string> | null {
  const changedEntries = [...toolNameMap.entries()].filter(
    ([sanitizedName, originalName]) => sanitizedName !== originalName
  );
  return changedEntries.length > 0 ? new Map(changedEntries) : null;
}

function extractClientThoughtSignature(toolCall: unknown): string | null {
  if (!toolCall || typeof toolCall !== "object") return null;
  const candidate = toolCall as OpenAIToolCallLike;

  const signature =
    candidate.thoughtSignature ||
    candidate.thought_signature ||
    candidate.function?.thoughtSignature ||
    candidate.function?.thought_signature ||
    null;
  return typeof signature === "string" && signature.length > 0 ? signature : null;
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
              role: "system",
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
                  response:
                    toolNameOptions.functionResponseShape === "output"
                      ? { output: typeof resp === "string" ? resp : JSON.stringify(resp) }
                      : { result: parsedResp },
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
export function openaiToGeminiCLIRequest(
  model,
  body,
  stream,
  options: { functionResponseShape?: "result" | "output" } = {}
) {
  const gemini = openaiToGeminiBase(model, body, stream, {
    stripNamespace: true,
    functionResponseShape: options.functionResponseShape,
  });

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

  const envelope: CloudCodeEnvelope = isAntigravity
    ? {
        project: projectId,
        model: cleanModel,
        userAgent: "antigravity",
        requestType: "agent",
        requestId: `agent-${generateUUID()}`,
        request: {
          sessionId: generateSessionId(),
          contents: geminiCLI.contents,
          systemInstruction: geminiCLI.systemInstruction,
          generationConfig: geminiCLI.generationConfig,
          tools: geminiCLI.tools,
        },
      }
    : {
        model: cleanModel,
        project: projectId,
        user_prompt_id: generateUUID(),
        request: {
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
    // Inject required default system prompt for Antigravity
    const defaultPart: GeminiPart = { text: ANTIGRAVITY_DEFAULT_SYSTEM };
    if (envelope.request.systemInstruction?.parts) {
      envelope.request.systemInstruction.parts.unshift(defaultPart);
    } else {
      envelope.request.systemInstruction = { role: "system", parts: [defaultPart] };
    }

    // Add toolConfig for Antigravity
    if (geminiCLI.tools?.some((tool) => Array.isArray(tool.functionDeclarations))) {
      envelope.request.toolConfig = {
        functionCallingConfig: { mode: "VALIDATED" },
      };
    }
  } else {
    // Gemini CLI's native Cloud Code envelope uses snake_case identifiers.
    envelope.request.session_id = envelope.user_prompt_id;
    envelope.request.safetySettings = geminiCLI.safetySettings;
  }

  return envelope;
}

function getAntigravityClaudeOutputTokens(body: Record<string, unknown>): number {
  const requested = body.max_tokens ?? body.max_completion_tokens;
  if (typeof requested === "number" && Number.isFinite(requested) && requested >= 1) {
    return Math.min(Math.floor(requested), ANTIGRAVITY_CLAUDE_MAX_OUTPUT_TOKENS);
  }
  return ANTIGRAVITY_CLAUDE_MAX_OUTPUT_TOKENS;
}

// OpenAI -> Antigravity (Sandbox Cloud Code with wrapper)
export function openaiToAntigravityRequest(model, body, stream, credentials = null) {
  const isClaude = model.toLowerCase().includes("claude");
  const geminiCLI = openaiToGeminiCLIRequest(model, body, stream);

  if (isClaude) {
    geminiCLI.generationConfig.maxOutputTokens = getAntigravityClaudeOutputTokens(body);
  }

  return wrapInCloudCodeEnvelope(model, geminiCLI, credentials, true);
}

// Register
register(FORMATS.OPENAI, FORMATS.GEMINI, openaiToGeminiRequest, null);
register(
  FORMATS.OPENAI,
  FORMATS.GEMINI_CLI,
  (model, body, stream, credentials) =>
    wrapInCloudCodeEnvelope(
      model,
      openaiToGeminiCLIRequest(model, body, stream, { functionResponseShape: "output" }),
      credentials
    ),
  null
);
register(FORMATS.OPENAI, FORMATS.ANTIGRAVITY, openaiToAntigravityRequest, null);

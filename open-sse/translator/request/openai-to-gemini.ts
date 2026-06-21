import { register } from "../registry.ts";
import { FORMATS } from "../formats.ts";
import { ANTIGRAVITY_DEFAULT_SYSTEM } from "../../config/constants.ts";
import {
  buildGeminiThoughtSignatureKey,
  resolveGeminiThoughtSignature,
} from "../../services/geminiThoughtSignatureStore.ts";
import {
  generateAntigravityRequestId,
  getAntigravityEnvelopeUserAgent,
  getAntigravitySessionId,
} from "../../services/antigravityIdentity.ts";
import {
  capMaxOutputTokens,
  capThinkingBudget,
  getDefaultThinkingBudget,
} from "../../../src/lib/modelCapabilities.ts";

import * as crypto from "node:crypto";

function generateUUID() {
  return crypto.randomUUID();
}

import {
  DEFAULT_SAFETY_SETTINGS,
  convertOpenAIContentToParts,
  extractTextContent,
  tryParseJSON,
  cleanJSONSchemaForAntigravity,
} from "../helpers/geminiHelper.ts";
import { buildGeminiTools, sanitizeGeminiToolName } from "../helpers/geminiToolsSanitizer.ts";

// Observed Antigravity wrapper output cap, not an underlying model capability.
// Keep this bridge-local: Antigravity currently caps visible output around 16K.
// See: https://github.com/keisksw/antigravity-output-analysis
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
  model?: string;
  user_prompt_id?: string;
  userAgent?: "antigravity" | "jetski" | string;
  requestId?: string;
  requestType?: string;
  enabledCreditTypes?: string[];
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
  signatureNamespace?: string | null;
  signaturelessToolCallMode?: "native" | "text" | "context";
  // Vertex AI's FunctionCall/FunctionResponse protos have no `id` field; emitting it
  // makes Vertex reject the request with 400 "Unknown name id" (#3440). The public
  // Gemini API DOES use `id` for Gemini 3+ signature matching, so this is scoped to
  // the vertex provider only.
  stripFunctionCallId?: boolean;
  /** Only Antigravity/Gemini CLI support the thoughtSignature field. Standard Gemini rejects it with 400. */
  supportsSignatureBypass?: boolean;
};

// Vertex AI (and Vertex Partner models) reject the OpenAI-style `id` field inside
// function_call / function_response parts. Detect these by the routed provider id.
function isVertexGeminiProvider(provider: unknown): boolean {
  return provider === "vertex" || provider === "vertex-partner";
}

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

function deepCleanUndefined(value: unknown, depth = 0): void {
  if (depth > 10 || !value || typeof value !== "object") {
    return;
  }
  if (Array.isArray(value)) {
    for (const item of value) {
      deepCleanUndefined(item, depth + 1);
    }
  } else {
    const obj = value as Record<string, unknown>;
    for (const key of Object.keys(obj)) {
      const val = obj[key];
      if (typeof val === "string" && val === "[undefined]") {
        delete obj[key];
      } else {
        deepCleanUndefined(val, depth + 1);
      }
    }
  }
}

function applyAntigravityGenerationDefaults(generationConfig: GeminiGenerationConfig) {
  const config = { ...generationConfig };
  if (config.topK === undefined) {
    config.topK = 40;
  }
  if (config.topP === undefined) {
    config.topP = 1;
  }

  const thinkingBudget = Number(config.thinkingConfig?.thinkingBudget);
  const maxOutputTokens = Number(config.maxOutputTokens);
  if (
    Number.isFinite(thinkingBudget) &&
    thinkingBudget > 0 &&
    (!Number.isFinite(maxOutputTokens) || maxOutputTokens <= thinkingBudget)
  ) {
    config.maxOutputTokens = Math.floor(thinkingBudget) + 1;
  }

  return config;
}

function stringifyHistoricalToolArguments(value: unknown): string {
  if (typeof value === "string") return value;
  try {
    return JSON.stringify(value ?? {});
  } catch {
    return String(value ?? "{}");
  }
}

function buildInertHistoricalToolCallText(name: string | undefined, args: unknown): string {
  const toolName = name || "unknown";
  return `[tool_history_call: ${toolName}] ${stringifyHistoricalToolArguments(args || "{}")}`;
}

function buildInertHistoricalToolResponseText(name: string, response: unknown): string {
  return `[tool_history_result: ${name || "unknown"}] ${typeof response === "string" ? response : stringifyHistoricalToolArguments(response)}`;
}

function escapeHistoricalContextAttribute(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function escapeHistoricalContextContent(value: string): string {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function buildHistoricalToolResultContext(name: string, response: unknown): string {
  const source = escapeHistoricalContextAttribute(name || "unknown");
  const rawResult =
    typeof response === "string" ? response : stringifyHistoricalToolArguments(response);
  const result = escapeHistoricalContextContent(rawResult);
  return [
    `<previous_tool_result_context source="${source}">`,
    result,
    "</previous_tool_result_context>",
  ].join("\n");
}

// Core: Convert OpenAI request to Gemini format (base for all variants)
function openaiToGeminiBase(
  model: string,
  body: Record<string, unknown>,
  stream: boolean,
  toolNameOptions: GeminiToolNameOptions = {}
) {
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
    result.cachedContent = body.cachedContent as string;
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
  const requestedMaxOutputTokens = (body.max_tokens ?? body.max_completion_tokens) as
    | number
    | undefined;
  if (requestedMaxOutputTokens !== undefined) {
    const maxOutputTokens = capMaxOutputTokens(model, requestedMaxOutputTokens);
    if (maxOutputTokens !== null) {
      result.generationConfig.maxOutputTokens = maxOutputTokens;
    }
  } else {
    const maxOutputTokens = capMaxOutputTokens(model);
    if (maxOutputTokens !== null) {
      result.generationConfig.maxOutputTokens = maxOutputTokens;
    }
  }

  // Thinking / Reasoning support (Google Gemini 2.0+ Thinking models)
  // 1. OpenAI format: reasoning_effort (low/medium/high)
  if (body.reasoning_effort) {
    const budgetMap: Record<string, number> = {
      low: 1024,
      medium: getDefaultThinkingBudget(model) || 8192,
      high: capThinkingBudget(model, 32768),
    };
    const budget =
      budgetMap[body.reasoning_effort as string] || getDefaultThinkingBudget(model) || 8192;
    result.generationConfig.thinkingConfig = {
      thinkingBudget: budget,
      includeThoughts: true,
    };
  }
  // 2. Claude format: thinking (type: enabled, budget_tokens)
  const thinking = body.thinking as { type?: string; budget_tokens?: number } | undefined;
  if (thinking?.type === "enabled" && thinking.budget_tokens) {
    result.generationConfig.thinkingConfig = {
      thinkingBudget: thinking.budget_tokens,
      includeThoughts: true,
    };
  }

  // 3. Default: all modern Gemini models (2.5+) have thinking capability.
  // If the client didn't explicitly request thinking (via reasoning_effort or
  // thinking.type), still set includeThoughts so the upstream marks thought
  // parts with thought:true. Without this, the model's reasoning leaks into
  // visible content instead of being routed to reasoning_content by the
  // response translator. (#4170)
  if (!result.generationConfig.thinkingConfig) {
    const modelLower = model.toLowerCase();
    if (
      modelLower.includes("gemini") &&
      !modelLower.includes("gemini-1") &&
      (!modelLower.includes("gemini-2.0") || modelLower.includes("thinking"))
    ) {
      result.generationConfig.thinkingConfig = {
        thinkingBudget: getDefaultThinkingBudget(model) || capThinkingBudget(model, 24576),
        includeThoughts: true,
      };
    }
  }

  // Build tool_call_id -> name map
  const tcID2Name: Record<string, string> = {};
  const messages = body.messages as Array<Record<string, unknown>> | undefined;
  if (messages && Array.isArray(messages)) {
    for (const msg of messages) {
      const toolCalls = msg.tool_calls as Array<Record<string, unknown>> | undefined;
      if (msg.role === "assistant" && toolCalls) {
        for (const tc of toolCalls) {
          const fn = tc.function as { name?: string } | undefined;
          if (tc.type === "function" && tc.id && fn?.name) {
            tcID2Name[tc.id as string] = fn.name;
          }
        }
      }
    }
  }

  // Build tool responses cache
  const toolResponses: Record<string, unknown> = {};
  if (messages && Array.isArray(messages)) {
    for (const msg of messages) {
      if (msg.role === "tool" && msg.tool_call_id) {
        toolResponses[msg.tool_call_id as string] = msg.content;
      }
    }
  }

  // Convert messages
  if (messages && Array.isArray(messages)) {
    for (const msg of messages) {
      const role = msg.role;
      const content = msg.content;

      if (role === "system" && messages.length > 1) {
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
      } else if (role === "user" || (role === "system" && messages.length === 1)) {
        const parts = convertOpenAIContentToParts(content);
        if (parts.length > 0) {
          result.contents.push({ role: "user", parts });
        }
      } else if (role === "assistant") {
        const parts: GeminiPart[] = [];

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

        const toolCalls = msg.tool_calls as Array<Record<string, unknown>> | undefined;
        if (toolCalls && Array.isArray(toolCalls)) {
          const toolCallIds: string[] = [];
          const resolvedSignatures = new Map<string, string>();
          let firstPersistedSignature: string | undefined;
          for (const tc of toolCalls) {
            const id = tc.id as string;
            const resolved = resolveGeminiThoughtSignature(
              buildGeminiThoughtSignatureKey(toolNameOptions.signatureNamespace, id),
              extractClientThoughtSignature(tc)
            );
            if (typeof resolved === "string" && resolved.length > 0) {
              resolvedSignatures.set(id, resolved);
              firstPersistedSignature ??= resolved;
            }
          }

          let shouldUseEmbeddedSignature = !parts.some((p) => p.thoughtSignature);
          const signaturelessToolCallMode = toolNameOptions.signaturelessToolCallMode;
          const stringifySignaturelessToolCalls = signaturelessToolCallMode === "text";
          const contextualizeSignaturelessToolResponses =
            signaturelessToolCallMode === "text" || signaturelessToolCallMode === "context";

          for (const tc of toolCalls) {
            if (tc.type !== "function") continue;

            const id = tc.id as string;
            const fn = tc.function as { name: string; arguments?: string } | undefined;
            if (!fn) continue;

            const signatureForToolCall = resolvedSignatures.get(id);

            // Non-bypass paths (standard Gemini direct, mode "text"/"context")
            // cannot send a thoughtSignature and reject signature-less native tool
            // parts, so historical signature-less tool calls are represented as
            // inert text/context (#3358). The Antigravity/CLI bypass path
            // (supportsSignatureBypass) instead emits native parts carrying the
            // skip_thought_signature_validator sentinel below.
            if (!toolNameOptions.supportsSignatureBypass) {
              if (!signatureForToolCall && contextualizeSignaturelessToolResponses) {
                if (!toolCallIds.includes(id)) toolCallIds.push(id);
              }
              if (!signatureForToolCall && stringifySignaturelessToolCalls) {
                parts.push({
                  text: buildInertHistoricalToolCallText(fn.name, fn.arguments || "{}"),
                });
                continue;
              }
              if (!signatureForToolCall && signaturelessToolCallMode === "context") {
                continue;
              }
            }

            const args = tryParseJSON(fn.arguments || "{}");
            const embeddedThoughtSignature = shouldUseEmbeddedSignature
              ? firstPersistedSignature || signatureForToolCall
              : undefined;

            if (embeddedThoughtSignature) {
              shouldUseEmbeddedSignature = false;
            }

            // Gemini expects the signature on the functionCall part itself.
            // If we are in a mode where missing signatures cause 400s (and we couldn't find one),
            // safely default to the bypass string to protect against 400s.
            const finalSignature =
              embeddedThoughtSignature ||
              (toolNameOptions.supportsSignatureBypass && signaturelessToolCallMode !== "text"
                ? "skip_thought_signature_validator"
                : undefined);
            parts.push({
              ...(finalSignature ? { thoughtSignature: finalSignature } : {}),
              functionCall: {
                ...(toolNameOptions.stripFunctionCallId ? {} : { id: id }),
                name: sanitizeToolName(fn.name),
                args: args,
              },
            });

            // Bypass path always emits the native response; non-bypass keeps the
            // contextualize-aware bookkeeping (signature-less ids handled as text).
            if (
              toolNameOptions.supportsSignatureBypass ||
              !contextualizeSignaturelessToolResponses ||
              signatureForToolCall
            ) {
              toolCallIds.push(id);
            }
          }

          if (parts.length > 0) {
            result.contents.push({ role: "model", parts });
          }

          // Check if there are actual tool responses in the next messages
          const hasSignaturelessTextResponses =
            contextualizeSignaturelessToolResponses &&
            toolCalls.some((tc) => {
              const id = tc.id as string;
              return tc.type === "function" && !resolvedSignatures.has(id) && toolResponses[id];
            });
          const hasActualResponses =
            toolCallIds.some((fid) => toolResponses[fid]) || hasSignaturelessTextResponses;

          if (hasActualResponses) {
            const toolParts: GeminiPart[] = [];
            for (const fid of toolCallIds) {
              if (!toolResponses[fid]) continue;
              if (
                !toolNameOptions.supportsSignatureBypass &&
                contextualizeSignaturelessToolResponses &&
                !resolvedSignatures.has(fid)
              )
                continue;

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

              const resp = toolResponses[fid];
              let parsedResp = tryParseJSON(resp);
              if (parsedResp === null) {
                parsedResp = { result: resp };
              } else if (typeof parsedResp !== "object") {
                parsedResp = { result: parsedResp };
              }

              toolParts.push({
                functionResponse: {
                  ...(toolNameOptions.stripFunctionCallId ? {} : { id: fid }),
                  name: name,
                  response:
                    toolNameOptions.functionResponseShape === "output"
                      ? { output: typeof resp === "string" ? resp : JSON.stringify(resp) }
                      : { result: parsedResp },
                },
              });
            }

            if (
              !toolNameOptions.supportsSignatureBypass &&
              contextualizeSignaturelessToolResponses
            ) {
              // Signature-less historical tool responses are represented as text
              // so strict standard-Gemini endpoints don't reject them as native
              // functionResponse parts missing a matching thoughtSignature.
              // In context mode the matching historical functionCall is omitted,
              // avoiding pseudo tool-call records that Gemini Flash can repeat as
              // the visible final answer.
              for (const tc of toolCalls) {
                const id = tc.id as string;
                if (tc.type !== "function" || !id) continue;
                if (!resolvedSignatures.has(id) && toolResponses[id]) {
                  const fn = tc.function as { name?: string } | undefined;
                  const name = tcID2Name[id] || fn?.name || "unknown";
                  const resp = toolResponses[id];
                  toolParts.push({
                    text:
                      signaturelessToolCallMode === "text"
                        ? buildInertHistoricalToolResponseText(name, resp)
                        : buildHistoricalToolResultContext(name, resp),
                  });
                }
              }
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
  const bodyTools = body.tools as Array<Record<string, unknown>> | undefined;
  const geminiTools = buildGeminiTools(bodyTools, {
    ...toolNameOptions,
    toolNameMap,
  });

  // Support for Google Search grounding if requested via 'google_search' tool
  const hasGoogleSearch = bodyTools?.some((t) => {
    const fn = t.function as { name?: string } | undefined;
    return t.type === "function" && (fn?.name === "google_search" || fn?.name === "googleSearch");
  });

  type ToolEntry = NonNullable<GeminiRequest["tools"]>[number];

  if (geminiTools && geminiTools.length > 0) {
    result.tools = geminiTools;
    if (hasGoogleSearch) {
      result.tools.push({ googleSearch: {} });
    }
    result.toolConfig = { functionCallingConfig: { mode: "VALIDATED" } };
  } else if (hasGoogleSearch) {
    result.tools = [{ googleSearch: {} }];
  }

  // Convert response_format to Gemini's responseMimeType/responseSchema
  const responseFormat = body.response_format as
    | {
        type?: string;
        json_schema?: { schema?: unknown; [key: string]: unknown };
      }
    | undefined;
  if (responseFormat) {
    if (responseFormat.type === "json_schema" && responseFormat.json_schema) {
      result.generationConfig.responseMimeType = "application/json";
      // Extract the schema (may be nested under .schema key)
      const schema = responseFormat.json_schema.schema || responseFormat.json_schema;
      if (schema && typeof schema === "object") {
        result.generationConfig.responseSchema = cleanJSONSchemaForAntigravity(schema);
      }
    } else if (responseFormat.type === "json_object") {
      result.generationConfig.responseMimeType = "application/json";
    } else if (responseFormat.type === "text") {
      result.generationConfig.responseMimeType = "text/plain";
    }
  }

  const changedToolNameMap = buildChangedToolNameMap(toolNameMap);
  if (changedToolNameMap) {
    result._toolNameMap = changedToolNameMap;
  }

  deepCleanUndefined(result);

  return result;
}

// OpenAI -> Gemini (standard API)
export function openaiToGeminiRequest(
  model: string,
  body: Record<string, unknown>,
  stream: boolean,
  credentials: Record<string, unknown> | null = null,
  options: {
    signaturelessToolCallMode?: "native" | "text" | "context";
  } = {}
) {
  // Thread the signature namespace so a thinking model's thoughtSignature (cached on the
  // response turn under `<connectionId>:<toolCallId>`) is found and re-attached to the
  // functionCall on the follow-up request. Without this the streaming lookup key didn't
  // match and Gemini rejected tool calls with 400 "missing thought_signature" (#2504).
  const signatureNamespace =
    credentials && typeof credentials["_signatureNamespace"] === "string"
      ? credentials["_signatureNamespace"]
      : null;
  return openaiToGeminiBase(model, body, stream, {
    signatureNamespace,
    signaturelessToolCallMode: options.signaturelessToolCallMode,
    stripFunctionCallId: isVertexGeminiProvider(credentials?._provider),
  });
}

// OpenAI -> Gemini CLI (Cloud Code Assist)
export function openaiToGeminiCLIRequest(
  model: string,
  body: Record<string, unknown>,
  stream: boolean,
  options: {
    functionResponseShape?: "result" | "output";
    signatureNamespace?: string | null;
    signaturelessToolCallMode?: "native" | "text" | "context";
  } = {}
) {
  return openaiToGeminiBase(model, body, stream, {
    stripNamespace: true,
    functionResponseShape: options.functionResponseShape,
    signatureNamespace: options.signatureNamespace,
    signaturelessToolCallMode: options.signaturelessToolCallMode,
    supportsSignatureBypass: true,
  });
}

// Wrap Gemini CLI format in Cloud Code wrapper
function wrapInCloudCodeEnvelope(model, geminiCLI, credentials = null, isAntigravity = false) {
  // Both Antigravity and Gemini CLI need the project field for the Cloud Code API.
  // For Gemini CLI, the stored projectId may be stale; the executor's transformRequest
  // refreshes it via loadCodeAssist before the request is sent to the API.
  // Fall back to providerSpecificData.projectId — some connections (and post-refresh
  // credentials) store it there rather than at the top level, which otherwise produced a
  // spurious 422 "Missing Google projectId" on the Antigravity /v1beta path (#2480).
  const providerSpecificProjectId = (
    credentials?.providerSpecificData as { projectId?: unknown } | undefined
  )?.projectId;
  let projectId =
    credentials?.projectId ||
    (typeof providerSpecificProjectId === "string" ? providerSpecificProjectId : "");

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
        requestId: generateAntigravityRequestId(),
        request: {
          sessionId: getAntigravitySessionId(credentials),
          contents: geminiCLI.contents,
          systemInstruction: geminiCLI.systemInstruction,
          generationConfig: applyAntigravityGenerationDefaults(geminiCLI.generationConfig),
          tools: geminiCLI.tools,
        },
        model: cleanModel,
        userAgent: getAntigravityEnvelopeUserAgent(credentials),
        requestType: "agent",
        enabledCreditTypes: ["GOOGLE_ONE_AI"],
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
  // All modern Gemini models (2.5+, 3.x, pro-agent, etc.) use thinking by default
  // and require thought_signature for multi-turn tool calls.
  // Safe default: all non-Claude models via Antigravity are thinking Gemini.
  const modelLower = model.toLowerCase();
  const isThinkingGemini =
    !isClaude &&
    (modelLower.includes("thinking") ||
      modelLower.includes("gemini-3") ||
      modelLower.includes("gemini-2.5") ||
      modelLower.includes("gemini-pro"));
  const signatureNamespace =
    credentials &&
    typeof credentials === "object" &&
    typeof (credentials as Record<string, unknown>)._signatureNamespace === "string"
      ? ((credentials as Record<string, unknown>)._signatureNamespace as string)
      : null;
  const geminiCLI = openaiToGeminiCLIRequest(model, body, stream, {
    signatureNamespace,
    signaturelessToolCallMode: isThinkingGemini ? "context" : "native",
  });

  if (isClaude) {
    geminiCLI.generationConfig.maxOutputTokens = getAntigravityClaudeOutputTokens(body);
  }

  const envelope = wrapInCloudCodeEnvelope(model, geminiCLI, credentials, true);

  // Match real Antigravity client: don't send maxOutputTokens when the user
  // hasn't explicitly specified max_tokens / max_completion_tokens.
  // The Cloud Code server decides the output limit on its own.
  // Note: read hasThinking BEFORE stripping thinkingConfig below — for Claude
  // models the Cloud Code envelope still carries a thinkingBudget set upstream
  // by applyAntigravityGenerationDefaults, which we must consult here so we
  // do not accidentally drop the maxOutputTokens it bumped for us.
  const clientRequestedMaxTokens = body.max_tokens ?? body.max_completion_tokens;
  const hasThinking = !!envelope.request?.generationConfig?.thinkingConfig?.thinkingBudget;
  if (
    clientRequestedMaxTokens === undefined &&
    !hasThinking &&
    envelope.request?.generationConfig
  ) {
    delete envelope.request.generationConfig.maxOutputTokens;
  }

  // Claude models on Antigravity use their own native thinking — Gemini's thinkingConfig
  // is not understood by the Cloud Code Claude endpoint and must be stripped.
  // applyAntigravityGenerationDefaults (inside wrapInCloudCodeEnvelope) already bumped
  // maxOutputTokens to thinkingBudget+1 before we get here, so the budget is preserved.
  // Must run AFTER the hasThinking-derived maxOutputTokens decision above so the
  // budget is accounted for before the field is removed.
  if (isClaude && envelope.request?.generationConfig) {
    delete envelope.request.generationConfig.thinkingConfig;
  }

  return envelope;
}

// Register
register(
  FORMATS.OPENAI,
  FORMATS.GEMINI,
  (model, body, stream = false, credentials = null) =>
    openaiToGeminiRequest(model, body, stream, credentials, {
      signaturelessToolCallMode: "context",
    }),
  null
);
register(
  FORMATS.OPENAI,
  FORMATS.GEMINI_CLI,
  (model, body, stream, credentials) =>
    wrapInCloudCodeEnvelope(
      model,
      openaiToGeminiCLIRequest(model, body, stream, {
        functionResponseShape: "output",
        // Forward the signature namespace so streaming thoughtSignatures round-trip (#2504).
        signatureNamespace:
          credentials &&
          typeof credentials === "object" &&
          typeof credentials["_signatureNamespace"] === "string"
            ? (credentials["_signatureNamespace"] as string)
            : null,
      }),
      credentials
    ),
  null
);
register(FORMATS.OPENAI, FORMATS.ANTIGRAVITY, openaiToAntigravityRequest, null);

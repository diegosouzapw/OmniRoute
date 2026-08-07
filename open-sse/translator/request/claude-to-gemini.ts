import { register } from "../registry.ts";
import { FORMATS } from "../formats.ts";
import {
  DEFAULT_SAFETY_SETTINGS,
  tryParseJSON,
  cleanJSONSchemaForAntigravity,
} from "../helpers/geminiHelper.ts";
import { buildGeminiTools, sanitizeGeminiToolName } from "../helpers/geminiToolsSanitizer.ts";
import {
  buildGeminiThoughtSignatureKey,
  resolveGeminiThoughtSignature,
} from "../../services/geminiThoughtSignatureStore.ts";
import { capMaxOutputTokens, capThinkingBudget } from "../../../src/lib/modelCapabilities.ts";
import { getModelSpec } from "../../../src/shared/constants/modelSpecs.ts";
import { buildHistoricalToolResultContext } from "./openai-to-gemini/helpers.ts";

/**
 * Direct Claude → Gemini request translator.
 * Converts Claude Messages API body directly to Gemini format,
 * skipping the OpenAI hub intermediate step.
 */
export function claudeToGeminiRequest(model, body, stream, credentials = null) {
  const toolNameMap = new Map<string, string>();
  const sanitizeToolName = (name: string) =>
    sanitizeGeminiToolName(name, {
      toolNameMap,
    });
  // Vertex AI rejects the `id` field inside function_call / function_response parts
  // (#3440). The public Gemini API keeps it for Gemini 3+ signature matching, so this
  // is scoped to the routed vertex provider only (threaded via credentials._provider).
  const provider = credentials && typeof credentials === "object" ? credentials._provider : null;
  const stripFunctionCallId = provider === "vertex" || provider === "vertex-partner";
  // Thread the signature namespace so a thinking model's thoughtSignature (cached on the
  // Gemini→Claude response turn under `<connectionId>:<toolUseId>`) is found and
  // re-attached on the follow-up Claude→Gemini request. Without this, Claude Desktop
  // combo turns hit HTTP 400 "missing thought_signature" (#8979 / #2504 parity).
  const signatureNamespace =
    credentials &&
    typeof credentials === "object" &&
    typeof credentials._signatureNamespace === "string"
      ? credentials._signatureNamespace
      : null;
  const result: {
    model: string;
    contents: Array<Record<string, unknown>>;
    generationConfig: Record<string, unknown>;
    safetySettings: unknown;
    systemInstruction?: { role: string; parts: Array<{ text: string }> };
    tools?: Array<{
      functionDeclarations?: Array<Record<string, unknown>>;
      googleSearch?: Record<string, unknown>;
      googleSearchRetrieval?: Record<string, unknown>;
    }>;
    _toolNameMap?: Map<string, string>;
  } = {
    model: model,
    contents: [],
    generationConfig: {},
    // Honor an explicit caller-supplied safetySettings (including one that itself
    // requests HARM_CATEGORY_CIVIC_INTEGRITY — the caller's explicit choice), matching
    // the openai-to-gemini.ts standard-path behavior. See DEFAULT_SAFETY_SETTINGS (#8231).
    safetySettings: body.safetySettings || DEFAULT_SAFETY_SETTINGS,
  };

  // ── Generation config ──────────────────────────────────────────
  if (body.temperature !== undefined) {
    result.generationConfig.temperature = body.temperature;
  }
  if (body.top_p !== undefined) {
    result.generationConfig.topP = body.top_p;
  }
  if (body.top_k !== undefined) {
    result.generationConfig.topK = body.top_k;
  }
  if (body.max_tokens !== undefined) {
    const maxOutputTokens = capMaxOutputTokens(model, body.max_tokens);
    if (maxOutputTokens !== null) {
      result.generationConfig.maxOutputTokens = maxOutputTokens;
    }
  }

  // ── System instruction ─────────────────────────────────────────
  if (body.system) {
    let systemText;
    if (Array.isArray(body.system)) {
      systemText = body.system.map((s) => s.text || "").join("\n");
    } else {
      systemText = String(body.system);
    }
    if (systemText) {
      result.systemInstruction = {
        role: "system",
        parts: [{ text: systemText }],
      };
    }
  }

  // ── Build tool_use name lookup + resolve thought signatures ────
  // Standard Gemini rejects signature-less native functionCall parts with
  // HTTP 400 (#8979). Match the OPENAI→GEMINI "context" policy (#3688): only
  // emit native functionCall/functionResponse when a real signature is
  // available; otherwise represent history as context text.
  const toolUseNames: Record<string, string> = {};
  const resolvedSignatures = new Map<string, string>();
  if (body.messages && Array.isArray(body.messages)) {
    for (const msg of body.messages) {
      if (msg.role === "assistant" && Array.isArray(msg.content)) {
        for (const block of msg.content) {
          if (block.type === "tool_use" && block.id && block.name) {
            toolUseNames[block.id] = sanitizeToolName(block.name);
            const clientSignature =
              (typeof block.thoughtSignature === "string" && block.thoughtSignature) ||
              (typeof block.thought_signature === "string" && block.thought_signature) ||
              null;
            const resolved = resolveGeminiThoughtSignature(
              buildGeminiThoughtSignatureKey(signatureNamespace, block.id),
              clientSignature
            );
            if (typeof resolved === "string" && resolved.length > 0) {
              resolvedSignatures.set(block.id, resolved);
            }
          }
        }
      }
    }
  }

  // ── Convert messages ───────────────────────────────────────────
  if (body.messages && Array.isArray(body.messages)) {
    // Tool-ids whose functionCall was omitted (no stored thought_signature) so the
    // matching tool_result becomes text instead of a Gemini-400'd functionResponse.
    const omittedToolCallIds = new Set<string>();
    for (const msg of body.messages) {
      const parts = [];
      let shouldUseEmbeddedSignature = true;

      if (Array.isArray(msg.content)) {
        for (const block of msg.content) {
          switch (block.type) {
            case "text":
              if (block.text) parts.push({ text: block.text });
              break;

            case "thinking":
              // Preserve thinking blocks as thought parts
              if (block.thinking) {
                parts.push({ thought: true, text: block.thinking });
              }
              break;

            case "tool_use": {
              const signatureForToolCall = resolvedSignatures.get(block.id);
              // Signature-less historical tool_use → omit native functionCall
              // (context mode). Matching tool_result becomes context text below.
              if (!signatureForToolCall) {
                break;
              }

              const embeddedThoughtSignature = shouldUseEmbeddedSignature
                ? signatureForToolCall
                : undefined;
              if (embeddedThoughtSignature) {
                shouldUseEmbeddedSignature = false;
              }

              parts.push({
                ...(embeddedThoughtSignature ? { thoughtSignature: embeddedThoughtSignature } : {}),
                functionCall: {
                  ...(stripFunctionCallId ? {} : { id: block.id }),
                  name: sanitizeToolName(block.name),
                  args: block.input || {},
                },
              });
              break;
            }

            case "tool_result": {
              let content = block.content;
              if (Array.isArray(content)) {
                content = content
                  .map((c) => (c.type === "text" ? c.text : JSON.stringify(c)))
                  .join("\n");
              }
              let parsedContent = tryParseJSON(content);
              if (parsedContent === null) {
                parsedContent = { result: content };
              } else if (typeof parsedContent !== "object") {
                parsedContent = { result: parsedContent };
              }

              const toolUseId = block.tool_use_id;
              const name = toolUseNames[toolUseId] || "unknown";

              // Signature-less history: represent as context text so Gemini 3+
              // does not reject a native functionResponse without a matching
              // signed functionCall (#8979 / #3688).
              if (!resolvedSignatures.has(toolUseId)) {
                parts.push({
                  text: buildHistoricalToolResultContext(name, content),
                });
                break;
              }

              parts.push({
                functionResponse: {
                  ...(stripFunctionCallId ? {} : { id: toolUseId }),
                  name,
                  response: { result: parsedContent },
                },
              });
              break;
            }

            case "image":
              // Base64 image → Gemini inlineData
              if (block.source?.type === "base64") {
                parts.push({
                  inlineData: {
                    mimeType: block.source.media_type,
                    data: block.source.data,
                  },
                });
              }
              break;
          }
        }
      } else if (typeof msg.content === "string" && msg.content) {
        parts.push({ text: msg.content });
      }

      if (parts.length > 0) {
        // Map Claude roles to Gemini roles
        const geminiRole = msg.role === "assistant" ? "model" : "user";
        result.contents.push({ role: geminiRole, parts });
      }
    }
  }

  // ── Convert tools ──────────────────────────────────────────────
  const geminiTools = buildGeminiTools(body.tools, {
    toolNameMap,
  });
  if (geminiTools) {
    result.tools = geminiTools;
  }

  // ── Thinking config ────────────────────────────────────────────
  // Priority: thinking.budget_tokens (Claude native) > output_config.effort (Claude Code).
  if (model.startsWith("gemma-4")) {
    // gemma-4 models returns - 400: Thinking budget is not supported for this model
  } else if (body.thinking?.type === "enabled" && typeof body.thinking.budget_tokens === "number") {
    // typeof check ensures only numeric budget_tokens triggers the thinking path;
    // non-numeric values (e.g. string "auto") fall through to the effort-based path.
    // #6813: a truthy check here dropped `budget_tokens: 0` (dynamic thinking).
    // `undefined` (no budget specified) still falls through to the effort branch.
    // #3842: cap to the model's real thinking-budget limit.
    const cappedBudget = capThinkingBudget(model, body.thinking.budget_tokens);
    // Only send thinkingConfig if the model supports thinking via budget.
    // Models with thinkingBudgetCap:0 (e.g. gemini-3-flash) reject
    // thinkingConfig even when capped to 0. The supportsThinking flag
    // tracks thinkingLevel support, not thinkingBudget; use thinkingBudgetCap
    // as the reliable indicator (gemini-2.5-flash has supportsThinking:false
    // but thinkingBudgetCap:24576, meaning it supports thinking via budget).
    // Models not in MODEL_SPECS (thinkingBudgetCap=undefined) default to allowed.
    if (cappedBudget > 0 || getModelSpec(model)?.thinkingBudgetCap !== 0) {
      result.generationConfig.thinkingConfig = {
        thinkingBudget: cappedBudget,
        // #6813: `budget_tokens: 0` on this explicit path is the client's dynamic-thinking
        // sentinel, not an off-switch — includeThoughts stays true regardless of the
        // (possibly cap-clamped) budget value. Only the reasoning_effort/output_config.effort
        // paths below treat a resulting budget of 0 as "thinking disabled".
        includeThoughts: true,
      };
    }
  } else if (typeof body.output_config?.effort === "string") {
    const effort = body.output_config.effort.toLowerCase();
    const effortBudgetMap: Record<string, number> = {
      none: 0,
      low: 1024,
      medium: 10240,
      high: 32768,
      max: 131072,
      xhigh: 131072,
    };
    const rawBudget = effortBudgetMap[effort];
    // #3842: clamp to the model's real thinking-budget cap. This path previously
    // sent the raw value with no cap, so a Claude-Code client hitting a Flash-tier
    // Gemini target via output_config.effort="high" sent 32768 (> 24576) → 400.
    // capThinkingBudget narrows 32768 to e.g. gemini-2.5-flash's 24576 while leaving
    // pro-tier (real cap 32768) untouched.
    const budget = rawBudget !== undefined ? capThinkingBudget(model, rawBudget) : undefined;
    if (budget !== undefined && budget > 0) {
      // Only send thinkingConfig if the model supports thinking via budget.
      // Models with thinkingBudgetCap:0 (e.g. gemini-3-flash) reject
      // thinkingConfig even for effort-based paths.
      if (getModelSpec(model)?.thinkingBudgetCap !== 0) {
        result.generationConfig.thinkingConfig = {
          thinkingBudget: budget,
          includeThoughts: true,
        };
      }
    }
  }

  const changedToolNameMap = new Map(
    [...toolNameMap.entries()].filter(
      ([sanitizedName, originalName]) => sanitizedName !== originalName
    )
  );
  if (changedToolNameMap.size > 0) {
    result._toolNameMap = changedToolNameMap;
  }

  return result;
}

// Register direct path only for plain Gemini API.
// Antigravity requires Cloud Code envelope wrapping,
// so they must use the existing hub path (Claude -> OpenAI -> target).
register(FORMATS.CLAUDE, FORMATS.GEMINI, claudeToGeminiRequest, null);

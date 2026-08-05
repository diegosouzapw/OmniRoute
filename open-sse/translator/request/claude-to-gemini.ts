import { register } from "../registry.ts";
import { FORMATS } from "../formats.ts";
import {
  DEFAULT_SAFETY_SETTINGS,
  tryParseJSON,
  cleanJSONSchemaForAntigravity,
} from "../helpers/geminiHelper.ts";
import { buildGeminiTools, sanitizeGeminiToolName } from "../helpers/geminiToolsSanitizer.ts";
import { capMaxOutputTokens, capThinkingBudget } from "../../../src/lib/modelCapabilities.ts";
import { getModelSpec } from "../../../src/shared/constants/modelSpecs.ts";
import {
  buildGeminiThoughtSignatureKey,
  getGeminiThoughtSignature,
} from "../../services/geminiThoughtSignatureStore.ts";
import {
  buildInertHistoricalToolCallText,
  buildInertHistoricalToolResponseText,
} from "./openai-to-gemini/helpers.ts";

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
  const signatureNamespace =
    credentials &&
    typeof credentials === "object" &&
    typeof (credentials as Record<string, unknown>)._signatureNamespace === "string"
      ? ((credentials as Record<string, unknown>)._signatureNamespace as string)
      : null;
  // All modern Gemini models (2.5+, 3.x, pro-agent, etc.) use thinking by default
  // and require a real thoughtSignature on functionCall parts in a multi-turn
  // tool-call history — sending one without a signature returns a strict 400.
  // Matches the isThinkingGemini heuristic used by the Antigravity path
  // (openai-to-gemini.ts) since Gemini's requirement is the same regardless of
  // which translator hop reaches it.
  const modelLower = model.toLowerCase();
  const requiresThoughtSignature =
    modelLower.includes("gemini-3") ||
    modelLower.includes("gemini-2.5") ||
    modelLower.includes("thinking") ||
    modelLower.includes("gemini-pro");
  // tool_use ids downgraded to inert text because no real signature was found
  // (e.g. the call originated from a different model via combo fallback) — the
  // matching tool_result must be downgraded the same way so Gemini never sees
  // a functionResponse referencing a functionCall id that isn't a native part.
  const contextualizedToolUseIds = new Set<string>();
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

  // ── Build tool_use name lookup (for tool_result matching) ──────
  const toolUseNames = {};
  if (body.messages && Array.isArray(body.messages)) {
    for (const msg of body.messages) {
      if (msg.role === "assistant" && Array.isArray(msg.content)) {
        for (const block of msg.content) {
          if (block.type === "tool_use" && block.id && block.name) {
            toolUseNames[block.id] = sanitizeToolName(block.name);
          }
        }
      }
    }
  }

  // ── Convert messages ───────────────────────────────────────────
  if (body.messages && Array.isArray(body.messages)) {
    for (const msg of body.messages) {
      const parts = [];

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
              const signature = getGeminiThoughtSignature(
                buildGeminiThoughtSignatureKey(signatureNamespace, block.id)
              );
              if (!signature && requiresThoughtSignature) {
                // No real signature available (e.g. this tool_use was made by a
                // different model before a combo fallback landed on Gemini) and
                // this model strictly validates it — represent it as inert text
                // instead of a native functionCall part, matching the "context"
                // fallback the OpenAI hub path uses for the same situation (#3358).
                contextualizedToolUseIds.add(block.id);
                parts.push({
                  text: buildInertHistoricalToolCallText(block.name, block.input || {}),
                });
                break;
              }
              parts.push({
                ...(signature ? { thoughtSignature: signature } : {}),
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
              if (contextualizedToolUseIds.has(block.tool_use_id)) {
                parts.push({
                  text: buildInertHistoricalToolResponseText(
                    toolUseNames[block.tool_use_id] || "unknown",
                    parsedContent
                  ),
                });
                break;
              }
              parts.push({
                functionResponse: {
                  ...(stripFunctionCallId ? {} : { id: block.tool_use_id }),
                  name: toolUseNames[block.tool_use_id] || "unknown",
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

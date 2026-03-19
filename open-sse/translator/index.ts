import { FORMATS } from "./formats.ts";
import { ensureToolCallIds, fixMissingToolResponses } from "./helpers/toolCallHelper.ts";
import { prepareClaudeRequest } from "./helpers/claudeHelper.ts";
import { filterToOpenAIFormat } from "./helpers/openaiHelper.ts";
import { getRequestTranslator, getResponseTranslator } from "./registry.ts";
import { bootstrapTranslatorRegistry } from "./bootstrap.ts";
import { normalizeThinkingConfig } from "../services/provider.ts";
import { applyThinkingBudget } from "../services/thinkingBudget.ts";
import { normalizeRoles } from "../services/roleNormalizer.ts";

bootstrapTranslatorRegistry();
export { register } from "./registry.ts";

function normalizeResponsesInputItem(item) {
  if (typeof item === "string") {
    return {
      type: "message",
      role: "user",
      content: [{ type: "input_text", text: item }],
    };
  }

  if (!item || typeof item !== "object") return item;

  if (item.type || item.role) {
    return item.type ? item : { type: "message", ...item };
  }

  if (typeof item.text === "string") {
    return {
      type: "message",
      role: "user",
      content: [{ type: "input_text", text: item.text }],
    };
  }

  return item;
}

function normalizeOpenAIResponsesRequest(body) {
  if (!body || typeof body !== "object") return body;

  const normalized = { ...body };

  if (typeof normalized.input === "string") {
    normalized.input = [
      {
        type: "message",
        role: "user",
        content: [{ type: "input_text", text: normalized.input }],
      },
    ];
    return normalized;
  }

  if (Array.isArray(normalized.input)) {
    normalized.input = normalized.input.map(normalizeResponsesInputItem);
    return normalized;
  }

  if (normalized.input && typeof normalized.input === "object") {
    normalized.input = [normalizeResponsesInputItem(normalized.input)];
    return normalized;
  }

  return normalized;
}

/** @param options.normalizeToolCallId - When true, use 9-char tool call ids (e.g. Mistral); when false, leave ids as-is */
// Translate request: source -> openai -> target
export function translateRequest(
  sourceFormat,
  targetFormat,
  model,
  body,
  stream = true,
  credentials = null,
  provider = null,
  reqLogger = null,
  options?: { normalizeToolCallId?: boolean }
) {
  let result = body;
  const use9CharId = options?.normalizeToolCallId === true;

  // Phase 2: Apply thinking budget control before normalization
  result = applyThinkingBudget(result);

  // Normalize thinking config: remove if lastMessage is not user
  normalizeThinkingConfig(result);

  // Ensure tool_calls have id; optionally normalize to 9-char for providers like Mistral
  ensureToolCallIds(result, { use9CharId });

  // Fix missing tool responses (insert empty tool_result if needed)
  fixMissingToolResponses(result);

  // Normalize roles: developer→system for non-OpenAI, system→user for incompatible models
  if (result.messages && Array.isArray(result.messages)) {
    result.messages = normalizeRoles(result.messages, provider || "", model || "", targetFormat);
  }

  // If same format, skip translation steps
  if (sourceFormat !== targetFormat) {
    // Check for direct translation path first (e.g., Claude → Gemini)
    const directTranslator = getRequestTranslator(sourceFormat, targetFormat);
    if (directTranslator && sourceFormat !== FORMATS.OPENAI && targetFormat !== FORMATS.OPENAI) {
      result = directTranslator(model, result, stream, credentials);
    } else {
      // Fallback: hub-and-spoke via OpenAI
      // Step 1: source -> openai (if source is not openai)
      if (sourceFormat !== FORMATS.OPENAI) {
        const toOpenAI = getRequestTranslator(sourceFormat, FORMATS.OPENAI);
        if (toOpenAI) {
          result = toOpenAI(model, result, stream, credentials);
          // Log OpenAI intermediate format
          reqLogger?.logOpenAIRequest?.(result);
        }
      }

      // Step 2: openai -> target (if target is not openai)
      if (targetFormat !== FORMATS.OPENAI) {
        const fromOpenAI = getRequestTranslator(FORMATS.OPENAI, targetFormat);
        if (fromOpenAI) {
          result = fromOpenAI(model, result, stream, credentials);
        }
      }
    }
  }

  // Always normalize to clean OpenAI format when target is OpenAI
  // This handles hybrid requests (e.g., OpenAI messages + Claude tools)
  if (targetFormat === FORMATS.OPENAI) {
    result = filterToOpenAIFormat(result);
  }

  // Final step: prepare request for Claude format endpoints
  if (targetFormat === FORMATS.CLAUDE && sourceFormat !== FORMATS.CLAUDE) {
    result = prepareClaudeRequest(result, provider);
  }

  // Normalize openai-responses input shape for providers that require list input.
  if (targetFormat === FORMATS.OPENAI_RESPONSES) {
    result = normalizeOpenAIResponsesRequest(result);
  }

  // Ensure unique tool_call ids on final payload (translators may have introduced duplicates)
  ensureToolCallIds(result, { use9CharId });
  fixMissingToolResponses(result);

  return result;
}

// Translate response chunk: target -> openai -> source
export function translateResponse(targetFormat, sourceFormat, chunk, state) {
  // If same format, return as-is
  if (sourceFormat === targetFormat) {
    return [chunk];
  }

  let results = [chunk];
  let openaiResults = null; // Store OpenAI intermediate results

  // Check for direct translation path first (e.g., Gemini → Claude)
  const directTranslator = getResponseTranslator(targetFormat, sourceFormat);
  if (directTranslator && targetFormat !== FORMATS.OPENAI && sourceFormat !== FORMATS.OPENAI) {
    const converted = directTranslator(chunk, state);
    if (converted) {
      results = Array.isArray(converted) ? converted : [converted];
    } else {
      results = [];
    }
    return results;
  }

  // Fallback: hub-and-spoke via OpenAI
  // Step 1: target -> openai (if target is not openai)
  if (targetFormat !== FORMATS.OPENAI) {
    const toOpenAI = getResponseTranslator(targetFormat, FORMATS.OPENAI);
    if (toOpenAI) {
      results = [];
      const converted = toOpenAI(chunk, state);
      if (converted) {
        results = Array.isArray(converted) ? converted : [converted];
        openaiResults = results; // Store OpenAI intermediate
      }
    }
  }

  // Step 2: openai -> source (if source is not openai)
  if (sourceFormat !== FORMATS.OPENAI) {
    const fromOpenAI = getResponseTranslator(FORMATS.OPENAI, sourceFormat);
    if (fromOpenAI) {
      const finalResults = [];
      for (const r of results) {
        const converted = fromOpenAI(r, state);
        if (converted) {
          finalResults.push(...(Array.isArray(converted) ? converted : [converted]));
        }
      }
      results = finalResults;
    }
  }

  // Attach OpenAI intermediate results for logging
  if (openaiResults && sourceFormat !== FORMATS.OPENAI && targetFormat !== FORMATS.OPENAI) {
    (results as { _openaiIntermediate?: unknown })._openaiIntermediate = openaiResults;
  }

  return results;
}

// Check if translation needed
export function needsTranslation(sourceFormat, targetFormat) {
  return sourceFormat !== targetFormat;
}

// Initialize state for streaming response based on format
export function initState(sourceFormat) {
  // Base state for all formats
  const base = {
    messageId: null,
    model: null,
    textBlockStarted: false,
    thinkingBlockStarted: false,
    inThinkingBlock: false,
    currentBlockIndex: null,
    toolCalls: new Map(),
    finishReason: null,
    finishReasonSent: false,
    usage: null,
    contentBlockIndex: -1,
  };

  // Add openai-responses specific fields
  if (sourceFormat === FORMATS.OPENAI_RESPONSES) {
    return {
      ...base,
      seq: 0,
      responseId: `resp_${Date.now()}`,
      created: Math.floor(Date.now() / 1000),
      started: false,
      msgTextBuf: {},
      msgItemAdded: {},
      msgContentAdded: {},
      msgItemDone: {},
      reasoningId: "",
      reasoningIndex: -1,
      reasoningBuf: "",
      reasoningPartAdded: false,
      reasoningDone: false,
      inThinking: false,
      funcArgsBuf: {},
      funcNames: {},
      funcCallIds: {},
      funcArgsDone: {},
      funcItemDone: {},
      completedSent: false,
    };
  }

  return base;
}

// Initialize all translators (no-op, kept for backward compatibility)
export function initTranslators() {
  bootstrapTranslatorRegistry();
}

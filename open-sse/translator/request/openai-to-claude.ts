import { register } from "../registry.ts";
import { FORMATS } from "../formats.ts";
// CLAUDE_SYSTEM_PROMPT import removed — no longer injected unconditionally (#1966/#2130)
import { supportsClaudeMaxEffort, supportsXHighEffort } from "../../config/providerModels.ts";
import { adjustMaxTokens } from "../helpers/maxTokensHelper.ts";
import { sanitizeToolId } from "../helpers/schemaCoercion.ts";
import { safeParseJSON } from "../helpers/jsonUtil.ts";
import { DEFAULT_THINKING_CLAUDE_SIGNATURE } from "../../config/defaultThinkingSignature.ts";
import { isAdaptiveThinkingOnly } from "../../../src/shared/constants/modelSpecs.ts";
import { fitThinkingToMaxTokens } from "./openai-to-claude/thinkingBudget.ts";
import { enforceToolResultAdjacency } from "./openai-to-claude/toolResultAdjacency.ts";

// Reasoning-effort levels Anthropic accepts on `output_config.effort`. Used to steer
// adaptive-only Claude models (Opus 4.7+/Fable 5) without ever emitting a manual budget.
const ADAPTIVE_EFFORT_LEVELS = new Set(["low", "medium", "high", "xhigh", "max"]);

// Prefix for Claude OAuth tool names to avoid conflicts
// Can be disabled per-request via body._disableToolPrefix = true
export const CLAUDE_OAUTH_TOOL_PREFIX = "proxy_";
const CLAUDE_TOOL_CHOICE_REQUIRED = "an" + "y";
const COPILOT_REASONING_SUMMARY_MARKER = "_omnirouteCopilotReasoningSummary";

function wantsCopilotSummarizedThinking(body: Record<string, unknown> | null | undefined): boolean {
  return body?.[COPILOT_REASONING_SUMMARY_MARKER] === "summarized";
}

function applyCopilotSummarizedThinkingDisplay(
  thinking: Record<string, unknown> | undefined,
  body: Record<string, unknown> | null | undefined
): Record<string, unknown> | undefined {
  if (!thinking || !wantsCopilotSummarizedThinking(body) || thinking.type === "disabled") {
    return thinking;
  }
  return {
    ...thinking,
    display: "summarized",
  };
}

// Thinking-budget fitting extracted to a pure leaf; re-exported for external
// importers (tests). Host also uses fitThinkingToMaxTokens internally.
export { fitThinkingToMaxTokens } from "./openai-to-claude/thinkingBudget.ts";

type ClaudeContentBlock = Record<string, unknown>;
type ClaudeMessage = {
  role: string;
  content: ClaudeContentBlock[];
};
type ClaudeSystemBlock = {
  type: string;
  text: string;
  cache_control?: { type: string; ttl?: string };
};
type ClaudeTool = {
  name: string;
  description: string;
  input_schema: Record<string, unknown>;
  cache_control?: { type: string; ttl?: string };
  defer_loading?: boolean;
};

/**
 * T02: Recursively strips empty text blocks from content arrays.
 * Anthropic returns 400 "text content blocks must be non-empty" when a
 * text block has text: "". Must also recurse into nested tool_result.content.
 * Ref: sub2api PR #1212
 */
export function stripEmptyTextBlocks(content: unknown[] | undefined): unknown[] {
  if (!Array.isArray(content)) return content ?? [];
  return content
    .filter((block: unknown) => {
      if (
        block &&
        typeof block === "object" &&
        (block as Record<string, unknown>).type === "text"
      ) {
        const text = (block as Record<string, unknown>).text;
        if (text === "" || text == null) return false;
      }
      return true;
    })
    .map((block: unknown) => {
      if (
        block &&
        typeof block === "object" &&
        (block as Record<string, unknown>).type === "tool_result" &&
        Array.isArray((block as Record<string, unknown>).content)
      ) {
        // Recurse into nested tool_result.content
        return {
          ...(block as Record<string, unknown>),
          content: stripEmptyTextBlocks((block as Record<string, unknown>).content as unknown[]),
        };
      }
      return block;
    });
}

/**
 * T15: Normalize content to string form.
 * Handles both string and array-of-blocks forms (Cursor, Codex 2.x, etc.).
 * Ref: sub2api PR #1197
 */
export function normalizeContentToString(content: string | unknown[] | null | undefined): string {
  if (!content) return "";
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    return (content as Array<Record<string, unknown>>)
      .filter((b) => b.type === "text")
      .map((b) => String(b.text ?? ""))
      .join("\n");
  }
  return "";
}

// Convert OpenAI request to Claude format
export function openaiToClaudeRequest(model, body, stream) {
  // Check if tool prefix should be disabled (configured per-provider or global)
  const disableToolPrefix = body?._disableToolPrefix === true;

  // Tool name mapping for Claude OAuth (capitalizedName → originalName)
  const toolNameMap = new Map();
  const result: {
    [key: string]: unknown;
    model: string;
    max_tokens: number;
    stream: boolean;
    messages: ClaudeMessage[];
    system?: ClaudeSystemBlock[];
    tools?: ClaudeTool[];
    tool_choice?: Record<string, unknown> | string;
    thinking?: Record<string, unknown>;
    output_config?: Record<string, unknown>;
    _toolNameMap?: Map<string, string>;
  } = {
    model: model,
    max_tokens: adjustMaxTokens(body),
    stream: stream,
    messages: [],
  };

  // Temperature
  //
  // Claude's Messages API rejects `temperature` when extended thinking is active.
  // Two cases where thinking is on:
  //   (a) Caller passes `body.thinking` or `body.reasoning_effort` (handled later —
  //       `result.thinking` becomes truthy, and we strip temperature at the end).
  //   (b) The request targets Claude OAuth (claude-code), which always sends
  //       `Anthropic-Beta: ...,interleaved-thinking-2025-05-14,...` in headers.
  //       The model is forced into thinking server-side, but neither `body.thinking`
  //       nor `result.thinking` will be set, so we detect this by model name. This
  //       affects claude-opus-4.x and claude-sonnet-4.x (the families that support
  //       extended thinking).
  //
  // For models that don't force thinking (haiku, older sonnets), preserve temperature.
  // Note: Opus 4.7+/Fable 5 already drop sampling params upstream of the translator via
  // the registry `unsupportedParams` strip; this covers the remaining 4.x families.
  const modelForcesThinking = /claude-(?:opus|sonnet)-4/i.test(String(model));
  if (body.temperature !== undefined && !modelForcesThinking) {
    result.temperature = body.temperature;
  }
  if (body.temperature === undefined && body.top_p !== undefined) {
    result.top_p = body.top_p;
  }
  if (body.stop !== undefined) {
    result.stop_sequences = Array.isArray(body.stop) ? body.stop : [body.stop];
  }

  // Thinking configuration
  // NOTE: computed BEFORE message-block conversion (below) so that
  // `getContentBlocksFromMessage` knows whether the outbound request actually has
  // extended thinking enabled — required to correctly gate the `redacted_thinking`
  // replay-placeholder injection (#5945). This block has no dependency on
  // `result.messages`/`toolNameMap`, so moving it earlier is safe.
  if (body.thinking) {
    result.thinking = {
      type: body.thinking.type || "enabled",
      ...(body.thinking.budget_tokens && { budget_tokens: body.thinking.budget_tokens }),
      ...(body.thinking.max_tokens && { max_tokens: body.thinking.max_tokens }),
    };
  } else if (body.reasoning_effort) {
    // Convert OpenAI reasoning_effort to Claude thinking format (#627)
    // Clients like OpenCode send reasoning_effort via @ai-sdk/openai-compatible
    const requestedEffort = String(body.reasoning_effort).toLowerCase();
    const normalizedEffort =
      requestedEffort === "max" && !supportsClaudeMaxEffort(model)
        ? "high"
        : requestedEffort === "xhigh" && !supportsXHighEffort("claude", model)
          ? "high"
          : requestedEffort;
    if (isAdaptiveThinkingOnly(model)) {
      // Opus 4.7+/Fable 5 removed manual extended thinking: a fixed `budget_tokens`
      // (or `type:"enabled"`) is a hard 400. Steer EVERY level via adaptive +
      // output_config.effort instead of the budget buckets below. Unrecognized levels
      // leave thinking unset so the model keeps its adaptive default rather than 400ing
      // on an invalid effort value.
      if (ADAPTIVE_EFFORT_LEVELS.has(normalizedEffort)) {
        result.thinking = {
          type: "adaptive",
        };
        result.output_config = {
          ...(result.output_config || {}),
          effort: normalizedEffort,
        };
      }
    } else if (normalizedEffort === "max" || normalizedEffort === "xhigh") {
      result.thinking = {
        type: "adaptive",
      };
      result.output_config = {
        ...(result.output_config || {}),
        effort: normalizedEffort,
      };
    } else {
      const effortBudgetMap: Record<string, number> = {
        low: 1024,
        medium: 10240,
        high: 131072,
        max: 131072,
      };
      const budget = effortBudgetMap[normalizedEffort];
      if (budget !== undefined && budget > 0) {
        result.thinking = {
          type: "enabled",
          budget_tokens: budget,
        };
      }
    }
  }

  // Fit thinking budget within the model's output cap and ensure
  // max_tokens > budget_tokens for all thinking configurations (#627).
  // Replaces the previous unconditional `budget + 8192` inflation, which
  // could exceed model caps (e.g. Opus 4.7's 128000 ceiling) and trigger
  // HTTP 400 from Anthropic.
  const fitted = fitThinkingToMaxTokens(model, Number(result.max_tokens) || 0, result.thinking);
  result.max_tokens = fitted.maxTokens;
  if (fitted.thinking === undefined) {
    delete result.thinking;
  } else {
    result.thinking = applyCopilotSummarizedThinkingDisplay(fitted.thinking, body);
  }

  delete result[COPILOT_REASONING_SUMMARY_MARKER];

  // Final guard: Claude rejects `temperature` whenever extended thinking is
  // enabled. If `result.thinking` was set above from `body.thinking` or
  // `body.reasoning_effort` (manual budget or adaptive effort), drop temperature
  // defensively. The model-name strip earlier already covers Claude OAuth's
  // forced-thinking case (claude-opus-4.x / claude-sonnet-4.x).
  if (result.thinking && result.temperature !== undefined) {
    delete result.temperature;
  }

  // Whether the OUTBOUND request actually has extended thinking enabled. Anthropic's
  // schema only requires a precursor thinking/redacted_thinking block before a tool_use
  // block when thinking mode is active for THIS request — never unconditionally (#5945).
  const thinkingEnabledForRequest = Boolean(result.thinking) && result.thinking.type !== "disabled";

  // Messages
  const systemParts = [];

  if (body.messages && Array.isArray(body.messages)) {
    // Extract system messages (T15: handle both string and array content)
    // Also treat "developer" role as system — OpenAI Responses API uses developer role
    // for system-level instructions, and it must reach the Claude system field, not become an assistant turn.
    for (const msg of body.messages) {
      if (msg.role === "system" || msg.role === "developer") {
        systemParts.push(
          typeof msg.content === "string" ? msg.content : normalizeContentToString(msg.content)
        );
      }
    }

    // Filter out system/developer messages for separate processing
    const nonSystemMessages = body.messages.filter(
      (m) => m.role !== "system" && m.role !== "developer"
    );

    // Process messages with merging logic
    // CRITICAL: tool_result must be in separate message immediately after tool_use
    let currentRole: string | undefined = undefined;
    let currentParts: ClaudeContentBlock[] = [];

    const flushCurrentMessage = () => {
      if (currentRole && currentParts.length > 0) {
        result.messages.push({ role: currentRole, content: currentParts });
        currentParts = [];
      }
    };

    for (const msg of nonSystemMessages) {
      const newRole = msg.role === "user" || msg.role === "tool" ? "user" : "assistant";
      const blocks = getContentBlocksFromMessage(
        msg,
        toolNameMap,
        disableToolPrefix,
        thinkingEnabledForRequest
      );
      const hasToolUse = blocks.some((b) => b.type === "tool_use");
      const hasToolResult = blocks.some((b) => b.type === "tool_result");

      // Separate tool_result from other content
      if (hasToolResult) {
        const toolResultBlocks = blocks.filter((b) => b.type === "tool_result");
        const otherBlocks = blocks.filter((b) => b.type !== "tool_result");

        flushCurrentMessage();

        if (toolResultBlocks.length > 0) {
          result.messages.push({ role: "user", content: toolResultBlocks });
        }

        if (otherBlocks.length > 0) {
          currentRole = newRole;
          currentParts.push(...otherBlocks);
        }
        continue;
      }

      if (currentRole !== newRole) {
        flushCurrentMessage();
        currentRole = newRole;
      }

      currentParts.push(...blocks);

      if (hasToolUse) {
        flushCurrentMessage();
      }
    }

    flushCurrentMessage();

    // Remove assistant messages with empty content (can happen when all tool_use blocks were skipped)
    result.messages = result.messages.filter((msg) => {
      if (msg.role === "assistant" && Array.isArray(msg.content) && msg.content.length === 0) {
        return false;
      }
      return true;
    });

    result.messages = enforceToolResultAdjacency(result.messages);

    // Add cache_control to last assistant message
    for (let i = result.messages.length - 1; i >= 0; i--) {
      const message = result.messages[i];
      if (
        message.role === "assistant" &&
        Array.isArray(message.content) &&
        message.content.length > 0
      ) {
        const lastBlock = message.content[message.content.length - 1];
        if (lastBlock) {
          lastBlock.cache_control = { type: "ephemeral" };
          break;
        }
      }
    }
  }

  // Tools - convert from OpenAI format to Claude format with prefix for OAuth
  if (body.tools && Array.isArray(body.tools)) {
    result.tools = body.tools
      .map((tool) => {
        // Function-shaped tools arrive in two flavors from real clients:
        //   (a) openai-spec: { type: "function", function: { name, ... } }
        //   (b) bare/loose:  { function: { name, ... } }   (no parent `type`)
        // Unwrap `tool.function` whenever it is present, regardless of the
        // parent `type` field — some OpenAI-shape clients omit the wrapper's
        // `type: "function"` entirely. Previously that bare shape fell
        // through to `toolData = tool` (the wrapper itself, with no `.name`),
        // producing an empty `originalName` and silently dropping the tool.
        const toolData = tool.function ?? tool;
        const originalName = typeof toolData.name === "string" ? toolData.name.trim() : "";

        if (!originalName) {
          return null;
        }

        // Claude OAuth requires prefixed tool names to avoid conflicts
        // When prefix is disabled (non-Claude backends), use original name
        const toolName = disableToolPrefix ? originalName : CLAUDE_OAUTH_TOOL_PREFIX + originalName;

        // Store mapping for response translation (prefixed → original)
        if (!disableToolPrefix) {
          toolNameMap.set(toolName, originalName);
        }

        // Normalize input_schema: Anthropic requires `properties` when type is "object" (#595).
        // MCP tools (e.g. pencil, computer_use) may omit properties on object-type schemas.
        const rawSchema: Record<string, unknown> = toolData.parameters ||
          toolData.input_schema || { type: "object", properties: {}, required: [] };
        const normalizedSchema =
          rawSchema.type === "object" && !rawSchema.properties
            ? { ...rawSchema, properties: {} }
            : rawSchema;

        return {
          name: toolName,
          description: toolData.description || "",
          input_schema: normalizedSchema,
        };
      })
      .filter((tool): tool is ClaudeTool => Boolean(tool));

    // Filter out tools with empty names (would cause Claude 400 error)
    result.tools = result.tools.filter((tool) => tool.name && tool.name?.trim());

    // Cache breakpoint on the last non-defer-loading tool — Anthropic
    // rejects cache_control on defer_loading tools.
    for (let i = result.tools.length - 1; i >= 0; i--) {
      if (!result.tools[i].defer_loading) {
        result.tools[i].cache_control = { type: "ephemeral", ttl: "1h" };
        break;
      }
    }
  }

  // Tool choice
  if (body.tool_choice) {
    result.tool_choice = convertOpenAIToolChoice(body.tool_choice);
  }

  // response_format: inject JSON structured output instruction into system prompt.
  // Claude doesn't natively support response_format, so we insert a system-level instruction.
  // NOTE: systemParts are consumed later (after this block) — they're accumulated here.
  if (body.response_format) {
    const fmt = body.response_format;
    if (fmt.type === "json_schema" && fmt.json_schema?.schema) {
      const schemaJson = JSON.stringify(fmt.json_schema.schema, null, 2);
      systemParts.push(
        `You must respond with valid JSON that strictly follows this JSON schema:\n\`\`\`json\n${schemaJson}\n\`\`\`\nRespond ONLY with the JSON object, no other text.`
      );
    } else if (fmt.type === "json_object") {
      systemParts.push(
        "You must respond with valid JSON. Respond ONLY with a JSON object, no other text."
      );
    }
  }

  // System messages and cache_control
  // Fix #2130: Preserve body.system when present (Claude Code sends system as native
  // Anthropic array through the /chat/completions endpoint). Without this, the system
  // prompt is silently dropped when no role="system" messages exist in body.messages.
  if (systemParts.length > 0) {
    const systemText = systemParts.join("\n");
    const systemBlock = {
      type: "text",
      text: systemText,
      cache_control: { type: "ephemeral", ttl: "1h" },
    };
    // Merge with existing body.system if present
    if (Array.isArray(body.system)) {
      result.system = [...body.system, systemBlock];
    } else if (typeof body.system === "string" && body.system.length > 0) {
      result.system = [{ type: "text", text: body.system }, systemBlock];
    } else {
      result.system = [systemBlock];
    }
  } else if (body.system) {
    // No role="system" messages, but body.system exists — pass through as-is
    result.system = Array.isArray(body.system)
      ? body.system
      : [{ type: "text", text: String(body.system) }];
  }

  // Attach toolNameMap to result for response translation
  if (toolNameMap.size > 0) {
    result._toolNameMap = toolNameMap;
  }

  // Empty-messages guard. Claude's Messages API rejects an empty `messages`
  // array with `400 messages: at least one message is required`. This happens
  // when the incoming OpenAI request carried only `system`/`developer` turns
  // (e.g. an all-system compaction or title-generation request from a client
  // like OpenCode): those are hoisted into `result.system` above, leaving
  // `messages` empty. Synthesize a minimal user turn so the request stays
  // valid — the system instructions still drive the response. (#5245)
  if (result.messages.length === 0) {
    result.messages.push({ role: "user", content: [{ type: "text", text: "." }] });
  }

  return result;
}

// Get content blocks from single message
function getContentBlocksFromMessage(
  msg,
  toolNameMap = new Map(),
  disableToolPrefix = false,
  thinkingEnabledForRequest = false
) {
  const blocks = [];

  if (msg.role === "tool") {
    // T02: Strip empty text blocks from nested tool_result content to avoid Anthropic 400
    const toolContent = Array.isArray(msg.content)
      ? stripEmptyTextBlocks(msg.content)
      : msg.content;
    blocks.push({
      type: "tool_result",
      tool_use_id: msg.tool_call_id,
      content: toolContent,
    });
  } else if (msg.role === "user") {
    if (typeof msg.content === "string") {
      if (msg.content) {
        blocks.push({ type: "text", text: msg.content });
      }
    } else if (Array.isArray(msg.content)) {
      for (const part of msg.content) {
        if (part.type === "text" && part.text) {
          blocks.push({ type: "text", text: part.text });
        } else if (part.type === "tool_result") {
          // Skip tool_result with no tool_use_id (would be useless and may cause errors)
          if (!part.tool_use_id) continue;
          // T02: strip empty text blocks from nested content before passing to Anthropic
          const resultContent = Array.isArray(part.content)
            ? stripEmptyTextBlocks(part.content)
            : part.content;
          blocks.push({
            type: "tool_result",
            tool_use_id: part.tool_use_id,
            content: resultContent,
            ...(part.is_error && { is_error: part.is_error }),
          });
        } else if (part.type === "image_url") {
          const url = part.image_url.url;
          const match = url.match(/^data:([^;]+);base64,(.+)$/);
          if (match) {
            blocks.push({
              type: "image",
              source: { type: "base64", media_type: match[1], data: match[2] },
            });
          } else if (typeof url === "string" && url.trim()) {
            blocks.push({
              type: "image",
              source: { type: "url", url },
            });
          }
        } else if (part.type === "image" && part.source) {
          blocks.push({ type: "image", source: part.source });
        } else if (part.type === "image" && typeof part.image === "string") {
          // AI SDK-style image part: { type: "image", image: "data:...;base64,..." } (#1330)
          const url = part.image;
          const match = url.match(/^data:([^;]+);base64,(.+)$/);
          if (match) {
            blocks.push({
              type: "image",
              source: { type: "base64", media_type: match[1], data: match[2] },
            });
          } else if (url.trim()) {
            blocks.push({ type: "image", source: { type: "url", url } });
          }
        } else if (part.type === "file" && (part.file?.file_data || part.file?.data)) {
          // OpenAI Chat Completions file block:
          // {type:"file", file:{filename, file_data:"data:<mime>;base64,..."}}.
          // Map PDFs to a Claude document block and image mimes to an image block so the
          // attachment reaches the model instead of being silently dropped. Claude has no
          // native video input, so non-pdf/non-image files are skipped here.
          const fileData = part.file.file_data || part.file.data;
          const fmatch =
            typeof fileData === "string" ? fileData.match(/^data:([^;]+);base64,(.+)$/) : null;
          if (fmatch) {
            const mediaType = fmatch[1];
            if (mediaType === "application/pdf") {
              blocks.push({
                type: "document",
                source: { type: "base64", media_type: mediaType, data: fmatch[2] },
                ...(part.file.filename ? { title: part.file.filename } : {}),
              });
            } else if (mediaType.startsWith("image/")) {
              blocks.push({
                type: "image",
                source: { type: "base64", media_type: mediaType, data: fmatch[2] },
              });
            }
          } else if (typeof fileData === "string" && /^https?:\/\//i.test(fileData)) {
            blocks.push({
              type: "document",
              source: { type: "url", url: fileData },
              ...(part.file.filename ? { title: part.file.filename } : {}),
            });
          }
        }
      }
    }
  } else if (msg.role === "assistant") {
    if (Array.isArray(msg.content)) {
      for (const part of msg.content) {
        if (part.type === "text" && part.text) {
          blocks.push({ type: "text", text: part.text });
        } else if (part.type === "thinking" || part.type === "redacted_thinking") {
          // #6953 — thinking blocks with signature:"" (empty string) come from non-Anthropic
          // providers (codex/gpt-5.x).  Anthropic rejects replayed `thinking` blocks that
          // carry a foreign or fabricated signature with HTTP 400.  Fabricating a default
          // signature (the old behaviour) made the poisoning permanent: once a codex-served
          // turn introduced a `signature:""` thinking block, every subsequent Anthropic leg
          // attempt 400'd and the router silently fell back to codex forever.
          //
          // Fix: strip thinking blocks whose signature is the empty string — that explicit
          // empty value is the hallmark of a synthesized block from a non-Anthropic provider.
          // Thinking blocks with `signature: undefined` (field absent) are legitimate Claude-
          // format messages and fall through to the DEFAULT_THINKING_CLAUDE_SIGNATURE fallback
          // as before.
          if (part.type === "thinking" && part.signature === "") {
            continue; // drop — synthesized by non-Anthropic provider, no valid signature
          }
          if (part.type === "redacted_thinking" && part.data === "") {
            continue; // drop — same: empty data from non-Anthropic provider
          }
          blocks.push({
            ...part,
            signature: part.signature || DEFAULT_THINKING_CLAUDE_SIGNATURE,
          });
        } else if (part.type === "tool_use") {
          // Tool name already has prefix from tool declarations, keep as-is
          // CRITICAL: Skip tool_use blocks with empty name (causes Claude 400 error)
          if (part.name && part.name.trim()) {
            blocks.push({
              type: "tool_use",
              id: sanitizeToolId(part.id),
              name: part.name,
              input: part.input,
            });
          }
        }
      }
    } else if (msg.content) {
      const text = typeof msg.content === "string" ? msg.content : extractTextContent(msg.content);
      if (text) {
        blocks.push({ type: "text", text });
      }
    }

    if (msg.tool_calls && Array.isArray(msg.tool_calls)) {
      for (const tc of msg.tool_calls) {
        if (tc.type === "function") {
          // CRITICAL: Skip tool_calls with empty function name (causes Claude 400 error)
          const fnName = tc.function?.name;
          if (!fnName || !fnName.trim()) continue;

          // Apply prefix to tool name (skip if disabled)
          const toolName = disableToolPrefix ? fnName : CLAUDE_OAUTH_TOOL_PREFIX + fnName;
          blocks.push({
            type: "tool_use",
            id: sanitizeToolId(tc.id),
            name: toolName,
            input: tryParseJSON(tc.function.arguments),
          });
        }
      }
    }

    // Add reasoning_content as a replay placeholder (OpenAI extended thinking format) —
    // ONLY when Anthropic's schema actually requires a precursor thinking block: the
    // outbound request has extended thinking enabled AND this assistant turn contains a
    // tool_use block (Anthropic rejects a tool_use turn without a preceding
    // thinking/redacted_thinking block when thinking is active). #5312 RC-D:
    // reasoning_content carries NO real Claude signature. Emitting a `thinking` block
    // with the fabricated DEFAULT signature makes Anthropic reject the replay with 400
    // "Invalid signature in thinking block" — and claudeHelper's latest-assistant guard
    // (prepareClaudeRequest) preserves it verbatim, so the fake signature leaks
    // upstream. Emit a signature-less redacted_thinking block instead (the same shape
    // prepareClaudeRequest produces for Anthropic-native replay, gated the same way at
    // claudeHelper.ts `thinkingEnabled && !hasThinking && hasToolUse`); Anthropic
    // accepts it without signature validation and non-Anthropic Claude-shape upstreams
    // re-hydrate the real text downstream from reasoningCache.
    // #5945: injecting this unconditionally — for ANY assistant turn carrying
    // reasoning_content, regardless of tool_use or thinking state — fabricates a content
    // block the client never sent. Some upstream clients (reported: Claude Sonnet 5 via
    // the "Pi" harness) detect the extra block and refuse the turn as prompt injection.
    // Drop reasoning_content silently when it is not required by the schema, mirroring
    // how other echo-only fields are dropped (see OPENAI_INCOMPATIBLE_ECHO_FIELDS).
    const hasThinkingBlock = blocks.some(
      (b) => b.type === "thinking" || b.type === "redacted_thinking"
    );
    const hasToolUseBlock = blocks.some((b) => b.type === "tool_use");
    if (
      msg.reasoning_content &&
      thinkingEnabledForRequest &&
      hasToolUseBlock &&
      !hasThinkingBlock
    ) {
      blocks.unshift({
        type: "redacted_thinking",
        data: DEFAULT_THINKING_CLAUDE_SIGNATURE,
      });
    }
  }

  return blocks;
}

// Convert OpenAI tool choice to Claude format
function convertOpenAIToolChoice(choice) {
  if (!choice) return { type: "auto" };
  if (typeof choice === "object" && choice.type) {
    // OpenAI sends {type: "function", function: {name}} — convert to Claude {type: "tool", name}
    if (choice.type === "function" && choice.function?.name) {
      return { type: "tool", name: choice.function.name };
    }
    // Map OpenAI string types to Claude equivalents
    if (choice.type === "auto" || choice.type === "none") return { type: "auto" };
    if (choice.type === "required" || choice.type === "any")
      return { type: CLAUDE_TOOL_CHOICE_REQUIRED };
    // If type is "tool" already (Claude-native), pass through
    if (choice.type === "tool" && choice.name) return choice;
    // Fallback: unknown object type — default to auto to avoid 400 errors
    return { type: "auto" };
  }
  if (choice === "auto" || choice === "none") return { type: "auto" };
  if (choice === "required") return { type: CLAUDE_TOOL_CHOICE_REQUIRED };
  if (typeof choice === "object" && choice.function) {
    return { type: "tool", name: choice.function.name };
  }
  return { type: "auto" };
}

// Extract text from content
function extractTextContent(content) {
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    return content
      .filter((c) => c.type === "text")
      .map((c) => c.text)
      .join("\n");
  }
  return "";
}

// Try parse JSON (passthrough fallback: return the raw input string on parse error).
function tryParseJSON(str: unknown): unknown {
  return safeParseJSON(str, str);
}

function stripCacheControl(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map((item) => stripCacheControl(item));
  }
  if (!value || typeof value !== "object") {
    return value;
  }

  const cleaned: Record<string, unknown> = {};
  for (const [key, child] of Object.entries(value as Record<string, unknown>)) {
    if (key === "cache_control") continue;
    cleaned[key] = stripCacheControl(child);
  }
  return cleaned;
}

// OpenAI -> Claude format for Antigravity (without system prompt modifications)
function openaiToClaudeRequestForAntigravity(model, body, stream) {
  const result = stripCacheControl(openaiToClaudeRequest(model, body, stream)) as ReturnType<
    typeof openaiToClaudeRequest
  >;

  // Strip prefix from tool names for Antigravity (doesn't use Claude OAuth)
  if (result.tools && Array.isArray(result.tools)) {
    result.tools = result.tools.map((tool) => {
      if (tool.name && tool.name.startsWith(CLAUDE_OAUTH_TOOL_PREFIX)) {
        return {
          ...tool,
          name: tool.name.slice(CLAUDE_OAUTH_TOOL_PREFIX.length),
        };
      }
      return tool;
    });
  }

  // Strip prefix from tool_use in messages
  if (result.messages && Array.isArray(result.messages)) {
    result.messages = result.messages.map((msg) => {
      if (!msg.content || !Array.isArray(msg.content)) {
        return msg;
      }

      const updatedContent = msg.content.map((block) => {
        const blockType = typeof block.type === "string" ? block.type : "";
        const blockName = typeof block.name === "string" ? block.name : "";
        if (
          blockType === "tool_use" &&
          blockName &&
          blockName.startsWith(CLAUDE_OAUTH_TOOL_PREFIX)
        ) {
          return {
            ...block,
            name: blockName.slice(CLAUDE_OAUTH_TOOL_PREFIX.length),
          };
        }
        return block;
      });

      return { ...msg, content: updatedContent };
    });
  }

  return result;
}

// Export for use in other translators
export { openaiToClaudeRequestForAntigravity };

// Register
register(FORMATS.OPENAI, FORMATS.CLAUDE, openaiToClaudeRequest, null);

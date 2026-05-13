/**
 * OpenAI to Kiro Request Translator
 * Converts OpenAI Chat Completions format to Kiro/AWS CodeWhisperer format
 */
import { register } from "../registry.ts";
import { FORMATS } from "../formats.ts";
import { v4 as uuidv4, v5 as uuidv5 } from "uuid";

function parseToolInput(value: unknown) {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value;
  }
  if (typeof value !== "string") {
    return {};
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return {};
  }

  try {
    const parsed = JSON.parse(trimmed);
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
  } catch {
    return {};
  }
}

function normalizeKiroToolSchema(schema: unknown) {
  if (!schema || typeof schema !== "object" || Array.isArray(schema)) {
    return { type: "object", properties: {}, required: [] };
  }

  return {
    type: "object",
    properties: {},
    ...(schema as Record<string, unknown>),
    required: Array.isArray((schema as { required?: unknown }).required)
      ? (schema as { required: unknown[] }).required
      : [],
  };
}

/**
 * Convert OpenAI messages to Kiro format
 * Rules: system/tool/user -> user role, merge consecutive same roles
 */
function convertMessages(messages, tools, model) {
  let history = [];
  let currentMessage = null;

  let pendingUserContent = [];
  let pendingAssistantContent = [];
  let pendingToolResults = [];
  let pendingImages: Array<{ format: string; source: { bytes: string } }> = [];
  let currentRole = null;
  let toolsAttached = false;

  const flushPending = () => {
    if (currentRole === "user") {
      const content = pendingUserContent.join("\n\n").trim() || "continue";
      const userMsg: {
        userInputMessage: {
          content: string;
          modelId: string;
          images?: Array<{ format: string; source: { bytes: string } }>;
          userInputMessageContext?: {
            toolResults?: Array<Record<string, unknown>>;
            tools?: Array<Record<string, unknown>>;
          };
        };
        _toolDocs?: string;
      } = {
        userInputMessage: {
          content: content,
          modelId: "",
        },
      };

      if (pendingToolResults.length > 0) {
        userMsg.userInputMessage.userInputMessageContext = {
          toolResults: pendingToolResults,
        };
      }

      // Attach images to userInputMessage (NOT userInputMessageContext)
      if (pendingImages.length > 0) {
        userMsg.userInputMessage.images = pendingImages;
      }

      // Add tools to the first emitted user turn. We track a flag instead of
      // relying on `history.length === 0` because the first few messages may
      // be assistant turns (e.g. when role=undefined collapses to a prior
      // assistant turn), in which case the first user flush would already see
      // a non-empty history and lose the tools schema.
      if (tools && tools.length > 0 && !toolsAttached) {
        if (!userMsg.userInputMessage.userInputMessageContext) {
          userMsg.userInputMessage.userInputMessageContext = {};
        }
        // Kiro API rejects requests with tool descriptions > ~10000 chars.
        // Move long descriptions to system prompt (same approach as kiro-gateway).
        const TOOL_DESC_MAX = 10000;
        const toolDocs: string[] = [];
        userMsg.userInputMessage.userInputMessageContext.tools = tools.map((t) => {
          const name = t.function?.name || t.name;
          let description = t.function?.description || t.description || "";

          if (!description.trim()) {
            description = `Tool: ${name}`;
          }

          if (description.length > TOOL_DESC_MAX) {
            toolDocs.push(`## Tool: ${name}\n\n${description}`);
            description = `[Full documentation in system prompt under '## Tool: ${name}']`;
          }

          return {
            toolSpecification: {
              name,
              description,
              inputSchema: {
                json: normalizeKiroToolSchema(
                  t.function?.parameters || t.parameters || t.input_schema || {}
                ),
              },
            },
          };
        });
        // Attach tool docs to message so buildKiroPayload can prepend to content
        if (toolDocs.length > 0) {
          userMsg._toolDocs = toolDocs.join("\n\n---\n\n");
        }
        toolsAttached = true;
      }

      history.push(userMsg);
      currentMessage = userMsg;
      pendingUserContent = [];
      pendingToolResults = [];
      pendingImages = [];
    } else if (currentRole === "assistant") {
      const content = pendingAssistantContent.join("\n\n").trim() || "...";
      const assistantMsg = {
        assistantResponseMessage: {
          content: content,
        },
      };
      history.push(assistantMsg);
      pendingAssistantContent = [];
    }
  };

  for (let i = 0; i < messages.length; i++) {
    const msg = messages[i];
    let role = msg.role;

    // Normalize: system/tool -> user
    if (role === "system" || role === "tool") {
      role = "user";
    }

    // If role changes, flush pending
    if (role !== currentRole && currentRole !== null) {
      flushPending();
    }
    currentRole = role;

    if (role === "user") {
      // Extract content
      let content = "";
      if (typeof msg.content === "string") {
        content = msg.content;
      } else if (Array.isArray(msg.content)) {
        const textParts = msg.content
          .filter((c) => c.type === "text" || c.text)
          .map((c) => c.text || "");
        content = textParts.join("\n");

        // Extract images (OpenAI image_url and Anthropic image formats)
        for (const block of msg.content) {
          if (block.type === "image_url") {
            const url: string = block.image_url?.url || "";
            if (url.startsWith("data:")) {
              // data:image/jpeg;base64,<data>
              const [header, bytes] = url.split(",", 2);
              const mediaType = header.split(";")[0].replace("data:", ""); // e.g. "image/jpeg"
              const format = mediaType.split("/")[1] || "jpeg";
              if (bytes) pendingImages.push({ format, source: { bytes } });
            }
          } else if (block.type === "image" && block.source?.type === "base64") {
            const format = (block.source.media_type || "image/jpeg").split("/")[1] || "jpeg";
            if (block.source.data)
              pendingImages.push({ format, source: { bytes: block.source.data } });
          }
        }

        // Check for tool_result blocks
        const toolResultBlocks = msg.content.filter((c) => c.type === "tool_result");
        if (toolResultBlocks.length > 0) {
          toolResultBlocks.forEach((block) => {
            const text = Array.isArray(block.content)
              ? block.content.map((c) => c.text || "").join("\n")
              : typeof block.content === "string"
                ? block.content
                : "";

            pendingToolResults.push({
              toolUseId: block.tool_use_id,
              status: "success",
              content: [{ text: text }],
            });
          });
        }
      }

      // Handle tool role (from normalized)
      if (msg.role === "tool") {
        const toolContent = typeof msg.content === "string" ? msg.content : "";
        pendingToolResults.push({
          toolUseId: msg.tool_call_id,
          status: "success",
          content: [{ text: toolContent }],
        });
      } else if (content) {
        pendingUserContent.push(content);
      }
    } else if (role === "assistant") {
      // Extract text content and tool uses
      let textContent = "";
      let toolUses = [];

      if (Array.isArray(msg.content)) {
        const textBlocks = msg.content.filter((c) => c.type === "text");
        textContent = textBlocks
          .map((b) => b.text)
          .join("\n")
          .trim();

        const toolUseBlocks = msg.content.filter((c) => c.type === "tool_use");
        toolUses = toolUseBlocks;
      } else if (typeof msg.content === "string") {
        textContent = msg.content.trim();
      }

      if (msg.tool_calls && msg.tool_calls.length > 0) {
        toolUses = msg.tool_calls;
      }

      if (textContent) {
        pendingAssistantContent.push(textContent);
      }

      // Store tool uses in last assistant message
      if (toolUses.length > 0) {
        if (pendingAssistantContent.length === 0) {
          // pendingAssistantContent.push("Call tools");
        }

        // Flush to create assistant message with toolUses
        flushPending();

        const lastMsg = history[history.length - 1];
        if (lastMsg?.assistantResponseMessage) {
          lastMsg.assistantResponseMessage.toolUses = toolUses.map((tc) => {
            if (tc.function) {
              return {
                toolUseId: tc.id || uuidv4(),
                name: tc.function.name,
                input: parseToolInput(tc.function.arguments),
              };
            } else {
              return {
                toolUseId: tc.id || uuidv4(),
                name: tc.name,
                input: parseToolInput(tc.input),
              };
            }
          });
        }

        currentRole = null;
      }
    }
  }

  // Flush remaining
  if (currentRole !== null) {
    flushPending();
  }

  // Kiro requires currentMessage to be a user turn. If the request ends with a
  // user turn, move that final turn into currentMessage. If it ends with an
  // assistant/tool turn, keep chronological history intact and ask Kiro to
  // continue instead of reordering prior turns.
  if (history.length > 0 && history[history.length - 1].userInputMessage) {
    currentMessage = history.pop();
  } else {
    currentMessage = {
      userInputMessage: {
        content: "Continue",
        modelId: model,
      },
    };
  }

  // Promote the tools schema to currentMessage. Tools may have been attached
  // to any user turn in history (e.g. when the first message was assistant or
  // had an undefined role, the first user flush lands further down). Scan the
  // whole history so we never lose the schema.
  if (!currentMessage?.userInputMessage?.userInputMessageContext?.tools) {
    const carrier = history.find((item) => item?.userInputMessage?.userInputMessageContext?.tools);
    if (carrier?.userInputMessage?.userInputMessageContext?.tools) {
      if (!currentMessage.userInputMessage.userInputMessageContext) {
        currentMessage.userInputMessage.userInputMessageContext = {};
      }
      currentMessage.userInputMessage.userInputMessageContext.tools =
        carrier.userInputMessage.userInputMessageContext.tools;
    }
  }

  // Fallback: if the schema was never attached to any user turn (e.g. the
  // input contained no user messages and currentMessage is a synthesized
  // "Continue" turn), attach the provided tools directly to currentMessage so
  // Kiro still sees the schema it needs to validate assistant.toolUses in
  // history.
  if (
    !toolsAttached &&
    tools &&
    tools.length > 0 &&
    !currentMessage?.userInputMessage?.userInputMessageContext?.tools
  ) {
    if (!currentMessage.userInputMessage.userInputMessageContext) {
      currentMessage.userInputMessage.userInputMessageContext = {};
    }
    currentMessage.userInputMessage.userInputMessageContext.tools = tools.map((t) => {
      const name = t.function?.name || t.name;
      const description = t.function?.description || t.description || `Tool: ${name}`;
      return {
        toolSpecification: {
          name,
          description,
          inputSchema: {
            json: normalizeKiroToolSchema(
              t.function?.parameters || t.parameters || t.input_schema || {}
            ),
          },
        },
      };
    });
    toolsAttached = true;
  }

  // Clean up history for Kiro API compatibility
  history.forEach((item) => {
    if (item.userInputMessage?.userInputMessageContext?.tools) {
      delete item.userInputMessage.userInputMessageContext.tools;
    }

    if (
      item.userInputMessage?.userInputMessageContext &&
      Object.keys(item.userInputMessage.userInputMessageContext).length === 0
    ) {
      delete item.userInputMessage.userInputMessageContext;
    }

    if (item.userInputMessage && !item.userInputMessage.modelId) {
      item.userInputMessage.modelId = model;
    }
  });

  // Kiro expects history to alternate between user and assistant turns. After
  // normalizing `system`/`tool` roles into `userInputMessage`, the history can
  // contain adjacent user turns, which Kiro can reject. Merge consecutive
  // `userInputMessage` entries by concatenating their content and preserving
  // any attached `userInputMessageContext` (e.g. accumulated toolResults).
  //
  // Why this is not redundant with the `flushPending` grouping in the main
  // loop: the assistant branch resets `currentRole = null` after emitting
  // `toolUses`. Any following `tool` role (normalized to user) and a
  // subsequent `user` role therefore each open their own flush, producing
  // two adjacent `userInputMessage` entries in history. This pass collapses
  // those.
  const mergedHistory: typeof history = [];
  for (const item of history) {
    const previous = mergedHistory[mergedHistory.length - 1];
    if (item.userInputMessage && previous?.userInputMessage) {
      const previousContent = previous.userInputMessage.content || "";
      const currentContent = item.userInputMessage.content || "";
      previous.userInputMessage.content = previousContent
        ? `${previousContent}\n\n${currentContent}`
        : currentContent;

      if (item.userInputMessage.userInputMessageContext) {
        const previousContext = previous.userInputMessage.userInputMessageContext || {};
        const nextContext = item.userInputMessage.userInputMessageContext;
        const mergedContext: Record<string, unknown> = { ...previousContext };

        for (const [key, value] of Object.entries(nextContext)) {
          const existing = (previousContext as Record<string, unknown>)[key];
          if (Array.isArray(existing) && Array.isArray(value)) {
            mergedContext[key] = [...existing, ...value];
          } else {
            mergedContext[key] = value;
          }
        }

        previous.userInputMessage.userInputMessageContext = mergedContext;
      }
    } else {
      mergedHistory.push(item);
    }
  }

  return { history: mergedHistory, currentMessage, toolsAttached };
}

/**
 * Build Kiro payload from OpenAI format
 */
export function buildKiroPayload(model, body, stream, credentials) {
  // Normalize model name: Claude Code sends dashes (claude-sonnet-4-6),
  // Kiro API expects dots (claude-sonnet-4.6). Convert trailing version segment.
  const normalizedModel = model.replace(
    /^(claude-(?:opus|sonnet|haiku|3-\d+)-\d+)-(\d+)$/,
    "$1.$2"
  );
  const messages = body.messages || [];
  let tools = body.tools || [];
  const maxTokens = body.max_tokens ?? body.max_completion_tokens ?? 32000;
  const temperature = body.temperature;
  const topP = body.top_p;

  // Kiro rejects history that references toolUses/toolResults without a tools
  // schema in userInputMessageContext. When callers omit body.tools but the
  // message history still contains assistant.tool_calls / role=tool turns,
  // synthesize a minimal tool schema from the tool names present in history
  // so Kiro accepts the request instead of returning `Improperly formed
  // request`. This preserves tool-call history and is a no-op when body.tools
  // is already populated.
  if (tools.length === 0) {
    const seen = new Set<string>();
    const synthesized: Array<Record<string, unknown>> = [];
    const pushName = (name: unknown) => {
      if (typeof name === "string" && name && !seen.has(name)) {
        seen.add(name);
        synthesized.push({
          type: "function",
          function: {
            name,
            description: `Tool: ${name}`,
            parameters: { type: "object", properties: {}, required: [] },
          },
        });
      }
    };
    for (const msg of messages) {
      if (msg?.role !== "assistant") continue;
      if (Array.isArray(msg.tool_calls)) {
        for (const tc of msg.tool_calls) {
          pushName(tc?.function?.name || tc?.name);
        }
      }
      // Anthropic-style assistant blocks: content:[{type:"tool_use", name, ...}]
      if (Array.isArray(msg.content)) {
        for (const block of msg.content) {
          if (block?.type === "tool_use") {
            pushName(block.name);
          }
        }
      }
    }
    if (synthesized.length > 0) {
      tools = synthesized;
    }
  }

  const { history, currentMessage, toolsAttached } = convertMessages(
    messages,
    tools,
    normalizedModel
  );

  const profileArn = credentials?.providerSpecificData?.profileArn || "";

  let finalContent = currentMessage?.userInputMessage?.content || "";
  const timestamp = new Date().toISOString();
  finalContent = `[Context: Current time is ${timestamp}]\n\n${finalContent}`;

  // Prepend tool documentation for tools with long descriptions (moved from toolSpecification)
  const toolDocs = (currentMessage as { _toolDocs?: string } | null)?._toolDocs;
  if (toolDocs) {
    finalContent = `# Tool Documentation\n\n${toolDocs}\n\n---\n\n${finalContent}`;
  }

  const payload: {
    conversationState: {
      chatTriggerType: string;
      conversationId: string;
      currentMessage: {
        userInputMessage: {
          content: string;
          modelId: string;
          origin: string;
          images?: Array<{ format: string; source: { bytes: string } }>;
          userInputMessageContext?: Record<string, unknown>;
        };
      };
      history: unknown[];
    };
    profileArn?: string;
    inferenceConfig?: {
      maxTokens?: number;
      temperature?: number;
      topP?: number;
    };
  } = {
    conversationState: {
      chatTriggerType: "MANUAL",
      conversationId: uuidv4(), // We must override this with deterministic ID
      currentMessage: {
        userInputMessage: {
          content: finalContent,
          modelId: normalizedModel,
          origin: "AI_EDITOR",
          ...(currentMessage?.userInputMessage?.images?.length && {
            images: currentMessage.userInputMessage.images,
          }),
          ...(currentMessage?.userInputMessage?.userInputMessageContext && {
            userInputMessageContext: currentMessage.userInputMessage.userInputMessageContext,
          }),
        },
      },
      history: history,
    },
  };

  // Determistic session caching for Kiro
  const NAMESPACE_KIRO = "34f7193f-561d-4050-bc84-9547d953d6bf";
  const firstContent =
    history.length > 0 && history[0].userInputMessage?.content
      ? history[0].userInputMessage.content
      : finalContent;

  // Use uuidv5 with the hash of the system prompt / first message to maintain AWS Builder ID context cache
  payload.conversationState.conversationId = uuidv5(
    (firstContent || "").substring(0, 4000),
    NAMESPACE_KIRO
  );

  if (profileArn) {
    payload.profileArn = profileArn;
  }

  if (maxTokens || temperature !== undefined || topP !== undefined) {
    payload.inferenceConfig = {};
    if (maxTokens) payload.inferenceConfig.maxTokens = maxTokens;
    if (temperature !== undefined) payload.inferenceConfig.temperature = temperature;
    if (topP !== undefined) payload.inferenceConfig.topP = topP;
  }

  return payload;
}

register(FORMATS.OPENAI, FORMATS.KIRO, buildKiroPayload, null);

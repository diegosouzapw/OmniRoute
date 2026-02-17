/**
 * OpenAI to Kiro Request Translator
 * Converts OpenAI Chat Completions format to Kiro/AWS CodeWhisperer format
 */
import { register } from "../index.ts";
import { FORMATS } from "../formats.ts";
import { v4 as uuidv4 } from "uuid";

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
  let currentRole = null;

  const flushPending = () => {
    if (currentRole === "user") {
      const content = pendingUserContent.join("\n\n").trim() || "continue";
      const userMsg: Record<string, any> = {
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

      // Add tools to first user message
      if (tools && tools.length > 0 && history.length === 0) {
        if (!userMsg.userInputMessage.userInputMessageContext) {
          userMsg.userInputMessage.userInputMessageContext = {};
        }
        userMsg.userInputMessage.userInputMessageContext.tools = tools.map((t) => {
          const name = t.function?.name || t.name;
          let description = t.function?.description || t.description || "";

          if (!description.trim()) {
            description = `Tool: ${name}`;
          }

          return {
            toolSpecification: {
              name,
              description,
              inputSchema: {
                json: t.function?.parameters || t.parameters || t.input_schema || {},
              },
            },
          };
        });
      }

      history.push(userMsg);
      currentMessage = userMsg;
      pendingUserContent = [];
      pendingToolResults = [];
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
                input:
                  typeof tc.function.arguments === "string"
                    ? JSON.parse(tc.function.arguments)
                    : tc.function.arguments || {},
              };
            } else {
              return {
                toolUseId: tc.id || uuidv4(),
                name: tc.name,
                input: tc.input || {},
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

  // If last message in history is userInputMessage, use it as currentMessage
  if (history.length > 0 && history[history.length - 1].userInputMessage) {
    currentMessage = history.pop();
  }

  const firstHistoryItem = history[0];
  if (
    firstHistoryItem?.userInputMessage?.userInputMessageContext?.tools &&
    !currentMessage?.userInputMessage?.userInputMessageContext?.tools
  ) {
    if (!currentMessage.userInputMessage.userInputMessageContext) {
      currentMessage.userInputMessage.userInputMessageContext = {};
    }
    currentMessage.userInputMessage.userInputMessageContext.tools =
      firstHistoryItem.userInputMessage.userInputMessageContext.tools;
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

  return { history, currentMessage };
}

/**
 * Build Kiro payload from OpenAI format
 */
export function buildKiroPayload(model, body, stream, credentials) {
  const messages = body.messages || [];
  const tools = body.tools || [];
  const maxTokens = 32000;
  const temperature = body.temperature;
  const topP = body.top_p;

  const { history, currentMessage } = convertMessages(messages, tools, model);

  const profileArn = credentials?.providerSpecificData?.profileArn || "";

  let finalContent = currentMessage?.userInputMessage?.content || "";
  const timestamp = new Date().toISOString();
  finalContent = `[Context: Current time is ${timestamp}]\n\n${finalContent}`;

  const payload: Record<string, any> = {
    conversationState: {
      chatTriggerType: "MANUAL",
      conversationId: uuidv4(),
      currentMessage: {
        userInputMessage: {
          content: finalContent,
          modelId: model,
          origin: "AI_EDITOR",
          ...(currentMessage?.userInputMessage?.userInputMessageContext && {
            userInputMessageContext: currentMessage.userInputMessage.userInputMessageContext,
          }),
        },
      },
      history: history,
    },
  };

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

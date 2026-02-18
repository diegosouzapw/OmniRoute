import { register } from "../index.ts";
import { FORMATS } from "../formats.ts";
import { DEFAULT_THINKING_GEMINI_SIGNATURE } from "../../config/defaultThinkingSignature.ts";
import { ANTIGRAVITY_DEFAULT_SYSTEM } from "../../config/constants.ts";
import { openaiToClaudeRequestForAntigravity } from "./openai-to-claude.ts";

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
  generateProjectId,
  cleanJSONSchemaForAntigravity,
} from "../helpers/geminiHelper.ts";

// Core: Convert OpenAI request to Gemini format (base for all variants)
function openaiToGeminiBase(model, body, stream) {
  const result: Record<string, any> = {
    model: model,
    contents: [],
    generationConfig: {},
    safetySettings: DEFAULT_SAFETY_SETTINGS,
  };

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
  if (body.max_tokens !== undefined) {
    result.generationConfig.maxOutputTokens = body.max_tokens;
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
        result.systemInstruction = {
          role: "user",
          parts: [{ text: typeof content === "string" ? content : extractTextContent(content) }],
        };
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
          parts.push({
            thoughtSignature: DEFAULT_THINKING_GEMINI_SIGNATURE,
            text: "",
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
          for (const tc of msg.tool_calls) {
            if (tc.type !== "function") continue;

            const args = tryParseJSON(tc.function?.arguments || "{}");
            parts.push({
              thoughtSignature: DEFAULT_THINKING_GEMINI_SIGNATURE,
              functionCall: {
                id: tc.id,
                name: tc.function.name,
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
  if (body.tools && Array.isArray(body.tools) && body.tools.length > 0) {
    const functionDeclarations = [];
    for (const t of body.tools) {
      // Check if already in Anthropic/Claude format (no type field, direct name/description/input_schema)
      if (t.name && t.input_schema) {
        functionDeclarations.push({
          name: t.name,
          description: t.description || "",
          parameters: t.input_schema || { type: "object", properties: {} },
        });
      }
      // OpenAI format
      else if (t.type === "function" && t.function) {
        const fn = t.function;
        functionDeclarations.push({
          name: fn.name,
          description: fn.description || "",
          parameters: fn.parameters || { type: "object", properties: {} },
        });
      }
    }

    if (functionDeclarations.length > 0) {
      result.tools = [{ functionDeclarations }];
    }
  }

  // Convert response_format to Gemini's responseMimeType/responseSchema
  if (body.response_format) {
    if (body.response_format.type === "json_schema" && body.response_format.json_schema) {
      result.generationConfig.responseMimeType = "application/json";
      // Extract the schema (may be nested under .schema key)
      const schema = body.response_format.json_schema.schema || body.response_format.json_schema;
      if (schema && typeof schema === "object") {
        // Remove unsupported keywords for Gemini (it uses a subset of JSON Schema)
        const { $schema, additionalProperties, ...cleanSchema } = schema;
        result.generationConfig.responseSchema = cleanSchema;
      }
    } else if (body.response_format.type === "json_object") {
      result.generationConfig.responseMimeType = "application/json";
    } else if (body.response_format.type === "text") {
      result.generationConfig.responseMimeType = "text/plain";
    }
  }

  return result;
}

// OpenAI -> Gemini (standard API)
export function openaiToGeminiRequest(model, body, stream) {
  return openaiToGeminiBase(model, body, stream);
}

// OpenAI -> Gemini CLI (Cloud Code Assist)
export function openaiToGeminiCLIRequest(model, body, stream) {
  const gemini = openaiToGeminiBase(model, body, stream);
  const isClaude = model.toLowerCase().includes("claude");

  // Add thinking config for CLI
  if (body.reasoning_effort) {
    const budgetMap = { low: 1024, medium: 8192, high: 32768 };
    const budget = budgetMap[body.reasoning_effort] || 8192;
    gemini.generationConfig.thinkingConfig = {
      thinkingBudget: budget,
      include_thoughts: true,
    };
  }

  // Thinking config from Claude format
  if (body.thinking?.type === "enabled" && body.thinking.budget_tokens) {
    gemini.generationConfig.thinkingConfig = {
      thinkingBudget: body.thinking.budget_tokens,
      include_thoughts: true,
    };
  }

  // Clean schema for tools
  if (gemini.tools?.[0]?.functionDeclarations) {
    for (const fn of gemini.tools[0].functionDeclarations) {
      if (fn.parameters) {
        const cleanedSchema = cleanJSONSchemaForAntigravity(fn.parameters);
        fn.parameters = cleanedSchema;
        // if (isClaude) {
        //   fn.parameters = cleanedSchema;
        // } else {
        //   fn.parametersJsonSchema = cleanedSchema;
        //   delete fn.parameters;
        // }
      }
    }
  }

  return gemini;
}

// Wrap Gemini CLI format in Cloud Code wrapper
function wrapInCloudCodeEnvelope(model, geminiCLI, credentials = null, isAntigravity = false) {
  const projectId = credentials?.projectId || generateProjectId();

  const envelope: Record<string, any> = {
    project: projectId,
    model: model,
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

  // Antigravity specific fields
  if (isAntigravity) {
    envelope.requestType = "agent";

    // Inject required default system prompt for Antigravity
    const defaultPart: Record<string, any> = { text: ANTIGRAVITY_DEFAULT_SYSTEM };
    if (envelope.request.systemInstruction?.parts) {
      envelope.request.systemInstruction.parts.unshift(defaultPart);
    } else {
      envelope.request.systemInstruction = { role: "user", parts: [defaultPart] };
    }

    // Add toolConfig for Antigravity
    if (geminiCLI.tools?.length > 0) {
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

// Wrap Claude format in Cloud Code envelope for Antigravity
function wrapInCloudCodeEnvelopeForClaude(model, claudeRequest, credentials = null) {
  const projectId = credentials?.projectId || generateProjectId();

  const envelope: Record<string, any> = {
    project: projectId,
    model: model,
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

  // Convert Claude messages to Gemini contents
  if (claudeRequest.messages && Array.isArray(claudeRequest.messages)) {
    for (const msg of claudeRequest.messages) {
      const parts = [];

      if (Array.isArray(msg.content)) {
        for (const block of msg.content) {
          if (block.type === "text") {
            parts.push({ text: block.text });
          } else if (block.type === "tool_use") {
            parts.push({
              functionCall: {
                id: block.id,
                name: block.name,
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
                name: "unknown",
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
    const functionDeclarations = [];
    for (const tool of claudeRequest.tools) {
      if (tool.name && tool.input_schema) {
        const cleanedSchema = cleanJSONSchemaForAntigravity(tool.input_schema);
        functionDeclarations.push({
          name: tool.name,
          description: tool.description || "",
          parameters: cleanedSchema,
        });
      }
    }
    if (functionDeclarations.length > 0) {
      envelope.request.tools = [{ functionDeclarations }];
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

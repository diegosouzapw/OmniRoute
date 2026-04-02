import { skillExecutor } from "./executor";
import { detectProvider } from "./injection";

interface ToolCall {
  id: string;
  name: string;
  arguments: Record<string, unknown>;
}

interface ExecutionContext {
  apiKeyId: string;
  sessionId: string;
  requestId: string;
}

export async function interceptToolCalls(
  toolCalls: ToolCall[],
  context: ExecutionContext
): Promise<{ id: string; result: unknown }[]> {
  const results = await Promise.all(
    toolCalls.map(async (call) => {
      try {
        const [name, version] = call.name.includes("@")
          ? call.name.split("@")
          : [call.name, "latest"];

        const skillName = version === "latest" ? name : `${name}@${version}`;

        const execution = await skillExecutor.execute(skillName, call.arguments, {
          apiKeyId: context.apiKeyId,
          sessionId: context.sessionId,
        });

        return {
          id: call.id,
          result: execution.output,
        };
      } catch (err) {
        return {
          id: call.id,
          result: { error: err instanceof Error ? err.message : String(err) },
        };
      }
    })
  );

  return results;
}

export function extractToolCalls(response: any, modelId: string): ToolCall[] {
  const provider = detectProvider(modelId);

  switch (provider) {
    case "openai":
      return (response.tool_calls || []).map((tc: any) => ({
        id: tc.id || `call_${Date.now()}`,
        name: tc.function?.name || "",
        arguments: parseArguments(tc.function?.arguments || "{}"),
      }));

    case "anthropic":
      return (response.content || [])
        .filter((c: any) => c.type === "tool_use")
        .map((tc: any) => ({
          id: tc.id,
          name: tc.name,
          arguments: tc.input || {},
        }));

    case "google":
      return (response.functionCalls || []).map((fc: any) => ({
        id: `call_${Date.now()}_${Math.random().toString(36).slice(2)}`,
        name: fc.name,
        arguments: fc.args || {},
      }));

    default:
      return [];
  }
}

function parseArguments(args: string | Record<string, unknown>): Record<string, unknown> {
  if (typeof args === "object") {
    return args;
  }

  try {
    return JSON.parse(args);
  } catch {
    return {};
  }
}

export async function handleToolCallExecution(
  response: any,
  modelId: string,
  context: ExecutionContext
): Promise<any> {
  const toolCalls = extractToolCalls(response, modelId);

  if (toolCalls.length === 0) {
    return response;
  }

  const results = await interceptToolCalls(toolCalls, context);

  const provider = detectProvider(modelId);

  switch (provider) {
    case "openai":
      return {
        ...response,
        tool_results: results.map((r) => ({
          tool_call_id: r.id,
          output: JSON.stringify(r.result),
        })),
      };

    case "anthropic":
      return {
        ...response,
        content: [
          ...response.content,
          ...results.map((r) => ({
            type: "tool_result",
            tool_use_id: r.id,
            content: JSON.stringify(r.result),
          })),
        ],
      };

    default:
      return response;
  }
}

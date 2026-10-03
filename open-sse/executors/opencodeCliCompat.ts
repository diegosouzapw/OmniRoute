import { adaptOpencodeResponsesBody } from "./opencodeResponsesCliCompat.ts";
import snapshot from "./opencodeCliSnapshot.json";

/** OpenCode 1.18.31 capture, with workstation paths, dates and installed skills removed. */
export const OPENCODE_CLI_SNAPSHOT_VERSION = snapshot.version;

/** Adapt generic Chat Completions clients; native main/title prompts remain unchanged. */
export function applyOpencodeCliCompat<T>(body: T, format: string | null): T {
  if (/^(0|false|no|off)$/i.test(process.env.OPENCODE_CLI_COMPAT?.trim() ?? "")) return body;
  if (format === "openai-responses")
    return hasOpencodeNativePrompt(body) ? body : adaptOpencodeResponsesBody(body);
  if (format !== "openai" && format !== null) return body;
  if (!body || typeof body !== "object" || Array.isArray(body)) return body;
  const input = body as Record<string, unknown>;
  if (!Array.isArray(input.messages)) return body;
  if (hasOpencodeNativePrompt(body)) return body;
  const hasTools = Array.isArray(input.tools) && input.tools.length > 0;
  const messages = [{ role: "system", content: snapshot.systemPrompt }, ...input.messages];
  if (!hasTools) {
    messages.push({
      role: "system",
      content:
        "The declared tools are transport compatibility declarations only. No tool execution is available for this request. Answer the user's question directly without calling tools. Follow the caller's instructions and requested response format.",
    });
  }
  return {
    ...input,
    messages,
    tools: hasTools ? input.tools : structuredClone(snapshot.tools),
    max_tokens: input.max_tokens ?? input.max_completion_tokens ?? 32000,
    stream: true,
    stream_options: { ...(input.stream_options as Record<string, unknown>), include_usage: true },
    ...(input.tool_choice === undefined ? { tool_choice: "auto" } : {}),
  } as T;
}

export function hasOpencodeNativePrompt(body: unknown): boolean {
  if (!body || typeof body !== "object" || Array.isArray(body)) return false;
  const record = body as Record<string, unknown>;
  const messages = record.messages ?? record.input;
  if (!Array.isArray(messages)) return false;
  return messages.some((message: unknown) => {
    if (!message || typeof message !== "object") return false;
    const m = message as Record<string, unknown>;
    return (
      (m.role === "system" || m.role === "developer") &&
      typeof m.content === "string" &&
      (m.content.startsWith("You are opencode, an interactive CLI tool") ||
        m.content.startsWith("You are a title generator.") ||
        m.content.startsWith("You are OpenCode, a coding agent"))
    );
  });
}

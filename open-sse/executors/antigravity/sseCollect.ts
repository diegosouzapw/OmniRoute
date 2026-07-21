// Pure SSE-payload -> collected-stream parsing for the Antigravity executor.
// Extracted verbatim from antigravity.ts (no host state, no fetch/auth).
import { normalizeOpenAICompatibleFinishReasonString } from "../../utils/finishReason.ts";

export type AntigravityCollectedStream = {
  textContent: string;
  finishReason: string;
  toolCalls: Array<{
    id: string;
    index: number;
    type: "function";
    function: { name: string; arguments: string };
  }>;
  usage: Record<string, unknown> | null;
  remainingCredits: Array<{ creditType: string; creditAmount: string }> | null;
};

export function stripZeroWidth(value: unknown): unknown {
  if (typeof value === "string") {
    return value.replace(/[\u200B-\u200D\uFEFF]/g, "");
  }
  if (Array.isArray(value)) {
    return value.map((item) => stripZeroWidth(item));
  }
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, item]) => [
        key,
        stripZeroWidth(item),
      ])
    );
  }
  return value;
}

export function parseAntigravityTextualToolCall(
  text: unknown
): { name: string; args: unknown } | null {
  if (typeof text !== "string") return null;
  const normalized = text.replace(/[\u200B-\u200D\uFEFF]/g, "");
  const match = normalized.match(
    /^[\s\S]*?\[Tool call:\s*([^\]\n]+)\]\s*\nArguments:\s*([\s\S]+?)\s*$/
  );
  if (!match) return null;
  const name = match[1]?.trim();
  const rawArgs = match[2]?.trim();
  if (!name || !rawArgs) return null;
  try {
    return { name, args: stripZeroWidth(JSON.parse(rawArgs)) };
  } catch {
    return null;
  }
}

export function addAntigravityTextualToolCall(
  collected: AntigravityCollectedStream,
  parsed: { name: string; args: unknown }
): void {
  collected.toolCalls.push({
    id: `${parsed.name}-${Date.now()}-${collected.toolCalls.length}`,
    index: collected.toolCalls.length,
    type: "function",
    function: {
      name: parsed.name,
      arguments: JSON.stringify(parsed.args || {}),
    },
  });
  collected.finishReason = "tool_calls";
}

export function processAntigravitySSEPayload(
  payload: string,
  collected: AntigravityCollectedStream,
  log?: { debug?: (scope: string, message: string) => void }
) {
  if (!payload || payload === "[DONE]") return;
  try {
    const parsed = JSON.parse(payload);
    const markdown =
      typeof parsed?.markdown === "string"
        ? parsed.markdown
        : typeof parsed?.response?.markdown === "string"
          ? parsed.response.markdown
          : null;
    if (markdown) {
      collected.textContent += markdown;
    }
    const candidate = parsed?.response?.candidates?.[0];
    if (candidate?.content?.parts) {
      for (const part of candidate.content.parts) {
        // Native function calls: Gemini 3.x responds to functionDeclarations with a
        // native functionCall part (usually carrying a thoughtSignature), NOT the
        // legacy "[Tool call: ...]" textual format. Dropping these left the collected
        // stream empty on every tools request → synthetic 502 "Provider returned
        // empty content" (Chatwit Captain Copilot / reply suggestion outage).
        if (part.functionCall && typeof part.functionCall.name === "string") {
          const fc = part.functionCall;
          collected.toolCalls.push({
            id:
              typeof fc.id === "string" && fc.id.length > 0
                ? fc.id
                : `${fc.name}-${Date.now()}-${collected.toolCalls.length}`,
            index: collected.toolCalls.length,
            type: "function",
            function: {
              name: fc.name,
              arguments: JSON.stringify(stripZeroWidth(fc.args ?? {})),
            },
          });
          collected.finishReason = "tool_calls";
          continue;
        }
        if (typeof part.text === "string" && !part.thought && !part.thoughtSignature) {
          const textualToolCall = parseAntigravityTextualToolCall(part.text);
          if (textualToolCall) {
            addAntigravityTextualToolCall(collected, textualToolCall);
          } else {
            collected.textContent += part.text;
          }
        }
        // Native Gemini function calls. Non-streaming responses (and some
        // streaming ones) carry the tool call as `part.functionCall` rather than
        // the textual `[Tool call: ...]` markdown. Without this, a tool-only
        // response produced empty content and a 502 Provider error (#7037).
        if (part.functionCall && typeof part.functionCall.name === "string") {
          addAntigravityTextualToolCall(collected, {
            name: part.functionCall.name,
            args: part.functionCall.args ?? {},
          });
        }
      }
    }
    // Preserve a tool-call finish reason: once a native `part.functionCall`
    // (or textual tool call) has populated `toolCalls`, the candidate's own
    // finish reason (often STOP) must not clobber it (#7037 — a tool-only
    // response would otherwise report STOP and lose its tool-call signal).
    if (candidate?.finishReason && collected.toolCalls.length === 0) {
      collected.finishReason = normalizeOpenAICompatibleFinishReasonString(
        String(candidate.finishReason).toLowerCase()
      );
    }
    if (parsed?.response?.usageMetadata) {
      const um = parsed.response.usageMetadata;
      collected.usage = {
        prompt_tokens: um.promptTokenCount || 0,
        completion_tokens: um.candidatesTokenCount || 0,
        total_tokens: um.totalTokenCount || 0,
      };
    }
    if (Array.isArray(parsed?.remainingCredits)) {
      collected.remainingCredits = parsed.remainingCredits;
    }
  } catch {
    log?.debug?.("SSE_PARSE", `Skipping malformed SSE line: ${payload.slice(0, 80)}`);
  }
}

export function processAntigravitySSEText(
  text: string,
  partialLine: { value: string },
  collected: AntigravityCollectedStream,
  log?: { debug?: (scope: string, message: string) => void }
) {
  partialLine.value += text;
  const lines = partialLine.value.split("\n");
  partialLine.value = lines.pop() || "";

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed.startsWith("data:")) continue;
    processAntigravitySSEPayload(trimmed.slice(5).trim(), collected, log);
  }
}

export function flushAntigravitySSEText(
  partialLine: { value: string },
  collected: AntigravityCollectedStream,
  log?: { debug?: (scope: string, message: string) => void }
) {
  const trimmed = partialLine.value.trim();
  partialLine.value = "";
  if (!trimmed.startsWith("data:")) return;
  processAntigravitySSEPayload(trimmed.slice(5).trim(), collected, log);
}

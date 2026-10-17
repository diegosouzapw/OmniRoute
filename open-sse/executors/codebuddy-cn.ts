import type { ProviderCredentials } from "./base.ts";
import { CodeBuddyBaseExecutor } from "./codebuddy/shared.ts";
import { requiresReasoningReplay } from "../services/reasoningCache.ts";

// Mirrors reasoningCache.ts's MAX_ENTRY_BYTES cap — keep the inlined block from
// unboundedly growing the outbound token count for very large reasoning traces.
const MAX_INLINED_REASONING_CHARS = 10000;
const THOUGHT_OPEN = "<thought>";
const THOUGHT_CLOSE = "</thought>";

function extractReasoningText(message: Record<string, unknown>): string | null {
  const raw = message.reasoning_content ?? message.reasoning;
  if (typeof raw !== "string") return null;
  const trimmed = raw.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function alreadyInlined(text: string): boolean {
  return text.trimStart().startsWith(THOUGHT_OPEN);
}

function buildThoughtBlock(reasoning: string): string {
  const capped =
    reasoning.length > MAX_INLINED_REASONING_CHARS
      ? reasoning.slice(0, MAX_INLINED_REASONING_CHARS)
      : reasoning;
  return `${THOUGHT_OPEN}\n${capped}\n${THOUGHT_CLOSE}\n\n`;
}

/**
 * injectAssistantReasoning — issue #13632.
 *
 * CodeBuddy CN's `/v2/chat/completions` gateway is reported to silently drop
 * unrecognized JSON fields on replayed assistant messages, including
 * `reasoning_content`. Unlike DeepSeek/Kimi's own endpoints (which 400 when
 * `reasoning_content` is missing — see `reasoningCache.ts`, issue #1628),
 * CodeBuddy CN degrades silently, so the existing field-replay cache does not
 * help here. This inlines the reasoning text as a visible `<thought>` block
 * at the front of the assistant message's `content` so it survives even if
 * the `reasoning_content` field itself gets stripped upstream. The field is
 * left in place too — harmless if dropped, redundant-but-safe if not.
 *
 * Only fires for models that actually require reasoning replay
 * (`requiresReasoningReplay()` — DeepSeek-V4/Kimi-K2 thinking families that
 * CodeBuddy CN re-exports), so non-thinking models in the catalog are
 * untouched. Idempotent: skips messages whose content already starts with a
 * `<thought>` block.
 */
function injectAssistantReasoning(model: string, messages: unknown): unknown {
  if (!Array.isArray(messages)) return messages;
  if (!requiresReasoningReplay({ provider: "codebuddy-cn", model })) return messages;

  let mutated = false;
  const next = messages.map((raw) => {
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) return raw;
    const message = raw as Record<string, unknown>;
    if (message.role !== "assistant") return message;

    const reasoning = extractReasoningText(message);
    if (!reasoning) return message;

    if (typeof message.content === "string") {
      if (alreadyInlined(message.content)) return message;
      mutated = true;
      return { ...message, content: buildThoughtBlock(reasoning) + message.content };
    }

    if (Array.isArray(message.content)) {
      const blocks = message.content as Array<Record<string, unknown>>;
      const firstTextIndex = blocks.findIndex(
        (block) => block && typeof block === "object" && block.type === "text"
      );
      if (firstTextIndex === -1) return message;
      const firstText = blocks[firstTextIndex];
      const text = typeof firstText.text === "string" ? firstText.text : "";
      if (alreadyInlined(text)) return message;
      mutated = true;
      const nextBlocks = blocks.slice();
      nextBlocks[firstTextIndex] = { ...firstText, text: buildThoughtBlock(reasoning) + text };
      return { ...message, content: nextBlocks };
    }

    return message;
  });

  return mutated ? next : messages;
}

/**
 * CodeBuddyCnExecutor — talks to https://copilot.tencent.com/v2/chat/completions
 *
 * CodeBuddy CN is an OpenAI-compatible Tencent gateway. Inherits all shared
 * CodeBuddy gateway behavior (forced stream, reasoning_summary, agent-prompt
 * sanitization, tool compaction), and additionally inlines replayed assistant
 * reasoning as a `<thought>` block (#13632).
 */
export class CodeBuddyCnExecutor extends CodeBuddyBaseExecutor {
  constructor(providerId: string = "codebuddy-cn") {
    super(providerId);
  }

  transformRequest(
    model: string,
    body: unknown,
    stream: boolean,
    credentials: ProviderCredentials
  ): unknown {
    const transformed = super.transformRequest(model, body, stream, credentials);
    if (!transformed || typeof transformed !== "object" || Array.isArray(transformed)) {
      return transformed;
    }
    const out = transformed as Record<string, unknown>;

    // --- Inline reasoning_content as a <thought> block (#13632) ---
    out.messages = injectAssistantReasoning(model, out.messages);

    return out;
  }
}

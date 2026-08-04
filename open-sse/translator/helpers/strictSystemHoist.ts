import { systemMessageMustBeFirst } from "../../../src/lib/memory/injection.ts";

type Message = { role: string; content: unknown; [key: string]: unknown };

function toTextContent(content: unknown): string {
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    return content
      .filter((part): part is { type: string; text?: unknown } => {
        return Boolean(part) && typeof part === "object" && (part as { type?: unknown }).type === "text";
      })
      .map((part) => String(part.text ?? ""))
      .join("\n");
  }
  return "";
}

/**
 * #7293: hoist every `system`-role message onto index 0 for providers that reject a
 * non-first system message (`systemMessageMustBeFirst()` — the single source of truth
 * already used by `src/lib/memory/injection.ts`'s memory-injection half, #6135/PR#6225).
 *
 * `translateRequest()` is the single outbound choke point every request passes through,
 * including same-format (OpenAI→OpenAI) passthrough where none of the format-specific
 * translators run — so a client-injected `system` message landing mid-array (OpenCode /
 * Kilo Code style clients, Discussion #6129) previously reached the upstream untouched.
 *
 * Merge, never drop: multiple offending system messages are folded (in original order)
 * into the single leading system message, mirroring `injectSystemFirst()`'s
 * `${memoryText}\n${first.content}` pattern and `openai-to-claude.ts`'s system-array-merge
 * pattern.
 *
 * No-op (same array reference) whenever the provider is not strict, or the request is
 * already compliant — required for prompt-cache prefix stability (#3890 class).
 */
export function hoistLeadingSystemMessage(
  messages: Message[],
  provider: string | null | undefined
): Message[] {
  if (!Array.isArray(messages) || messages.length === 0) return messages;
  if (!systemMessageMustBeFirst(provider)) return messages;

  const offendingIndices: number[] = [];
  for (let i = 1; i < messages.length; i++) {
    if (messages[i]?.role === "system") offendingIndices.push(i);
  }
  if (offendingIndices.length === 0) return messages;

  const offending = offendingIndices.map((i) => messages[i]);
  const rest = messages.filter((_, i) => !offendingIndices.includes(i));

  const mergedText = [
    rest[0]?.role === "system" ? toTextContent(rest[0].content) : null,
    ...offending.map((m) => toTextContent(m.content)),
  ]
    .filter((text): text is string => Boolean(text))
    .join("\n");

  if (rest[0]?.role === "system") {
    const mergedFirst: Message = { ...rest[0], content: mergedText };
    return [mergedFirst, ...rest.slice(1)];
  }

  const leadingSystem: Message = { role: "system", content: mergedText };
  return [leadingSystem, ...rest];
}

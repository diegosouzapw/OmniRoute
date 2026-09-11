/**
 * Strips Gemini's leaked leading planning JSON (e.g. `{"thought":"…"}`)
 * emitted into VISIBLE text rather than as a `thought` part.
 *
 * Scoped strictly to the definitive `thought` key signature to avoid
 * false positives with JSON mode or tool schemas.
 */

export function isPlanningLeakPrefix(text: string): boolean {
  const trimmed = text.trimStart();
  if (!trimmed.startsWith("{")) {
    return false;
  }
  const afterBrace = trimmed.slice(1).trimStart();
  if (afterBrace === "") {
    return trimmed.length <= 100;
  }
  if (afterBrace[0] !== '"') {
    return false;
  }
  const nextQuoteIndex = afterBrace.indexOf('"', 1);
  if (nextQuoteIndex === -1) {
    const keyPrefix = afterBrace.slice(1);
    return "thought".startsWith(keyPrefix) && trimmed.length <= 100;
  }
  const key = afterBrace.slice(1, nextQuoteIndex);
  if (key !== "thought") {
    return false;
  }
  const afterKey = afterBrace.slice(nextQuoteIndex + 1).trimStart();
  if (afterKey === "") {
    return trimmed.length <= 100;
  }
  if (afterKey[0] !== ":") {
    return false;
  }
  return true;
}

export function splitLeadingJsonObject(
  text: string
): { prefixLength: number; jsonText: string; rest: string } | undefined {
  const prefixLength = text.length - text.trimStart().length;
  const trimmed = text.slice(prefixLength);
  if (!trimmed.startsWith("{")) return undefined;

  let depth = 0;
  let inString = false;
  let escaped = false;

  for (let index = 0; index < trimmed.length; index += 1) {
    const ch = trimmed[index];
    if (inString) {
      if (escaped) {
        escaped = false;
        continue;
      }
      if (ch === "\\") {
        escaped = true;
        continue;
      }
      if (ch === '"') inString = false;
      continue;
    }
    if (ch === '"') {
      inString = true;
      continue;
    }
    if (ch === "{") {
      depth += 1;
      continue;
    }
    if (ch !== "}") continue;
    depth -= 1;
    if (depth !== 0) continue;

    const jsonText = trimmed.slice(0, index + 1);
    return {
      prefixLength: prefixLength + index + 1,
      jsonText,
      rest: trimmed.slice(index + 1),
    };
  }

  return undefined;
}

export type BufferedPlanningResult =
  | { kind: "incomplete" }
  | { kind: "plain"; visibleText: string }
  | { kind: "leak"; visibleText: string };

export function consumePlanningLeak(text: string, isFinal = false): BufferedPlanningResult {
  if (!isPlanningLeakPrefix(text)) {
    return { kind: "plain", visibleText: text };
  }

  const leading = splitLeadingJsonObject(text);

  if (!leading) {
    if (isFinal) {
      const trimmed = text.trim();
      if (trimmed.includes('"thought"')) {
        return { kind: "leak", visibleText: "" };
      }
      return { kind: "plain", visibleText: text };
    }
    return { kind: "incomplete" };
  }

  try {
    const parsed = JSON.parse(leading.jsonText);
    if (
      parsed &&
      typeof parsed === "object" &&
      typeof (parsed as Record<string, unknown>).thought === "string"
    ) {
      return { kind: "leak", visibleText: leading.rest };
    }
  } catch {
    return { kind: "plain", visibleText: text };
  }

  return { kind: "plain", visibleText: text };
}

export class GeminiPlanningLeakFilter {
  private buffer = "";
  private resolved = false;

  feed(delta: string): string {
    if (this.resolved) {
      return delta;
    }
    this.buffer += delta;

    const result = consumePlanningLeak(this.buffer, false);
    if (result.kind === "incomplete") {
      return "";
    }

    this.resolved = true;
    this.buffer = "";
    return result.visibleText;
  }

  flush(): string {
    if (this.resolved) {
      return "";
    }
    this.resolved = true;
    const result = consumePlanningLeak(this.buffer, true);
    this.buffer = "";
    return result.visibleText;
  }
}

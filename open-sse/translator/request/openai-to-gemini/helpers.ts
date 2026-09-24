// Pure, self-contained helpers extracted verbatim from ../openai-to-gemini.ts
// (god-file decomposition): historical-tool-context string builders, undefined-
// pruning, thought-signature extraction, tool-name remapping, and the Vertex
// provider check + Antigravity generation-config defaults. No I/O or module state;
// the host imports them back internally (these were module-private — no public API
// change). The GeminiGenerationConfig shape lives here with its only mutator.

export type GeminiGenerationConfig = {
  temperature?: unknown;
  topP?: unknown;
  topK?: unknown;
  maxOutputTokens?: unknown;
  thinkingConfig?: {
    thinkingBudget: number;
    includeThoughts: boolean;
  };
  responseMimeType?: string;
  responseSchema?: unknown;
  stopSequences?: string[] | unknown[];
};

// Vertex AI (and Vertex Partner models) reject the OpenAI-style `id` field inside
// function_call / function_response parts. Detect these by the routed provider id.
export function isVertexGeminiProvider(provider: unknown): boolean {
  return provider === "vertex" || provider === "vertex-partner";
}

type OpenAIToolCallLike = {
  thoughtSignature?: unknown;
  thought_signature?: unknown;
  function?: {
    thoughtSignature?: unknown;
    thought_signature?: unknown;
  };
};

export function buildChangedToolNameMap(
  toolNameMap: Map<string, string>
): Map<string, string> | null {
  if (toolNameMap.size === 0) return null;

  const result = new Map<string, string>();
  for (const [sanitizedName, originalName] of toolNameMap.entries()) {
    result.set(sanitizedName, originalName);
    // Add lowercase-keyed alias so Gemini's lowercased tool names find the original.
    // Gemini always lowercases tool names in functionCall responses, so even identity
    // entries (Bash → Bash) need a lowercase key ("bash" → "Bash") for the response
    // translator to look them up (#9568).
    const lower = sanitizedName.toLowerCase();
    if (lower !== sanitizedName && !result.has(lower)) {
      result.set(lower, originalName);
    }
  }

  return result;
}

export function extractClientThoughtSignature(toolCall: unknown): string | null {
  if (!toolCall || typeof toolCall !== "object") return null;
  const candidate = toolCall as OpenAIToolCallLike;

  const signature =
    candidate.thoughtSignature ||
    candidate.thought_signature ||
    candidate.function?.thoughtSignature ||
    candidate.function?.thought_signature ||
    null;
  return typeof signature === "string" && signature.length > 0 ? signature : null;
}

export function deepCleanUndefined(value: unknown, depth = 0): void {
  if (depth > 10 || !value || typeof value !== "object") {
    return;
  }
  if (Array.isArray(value)) {
    for (const item of value) {
      deepCleanUndefined(item, depth + 1);
    }
  } else {
    const obj = value as Record<string, unknown>;
    for (const key of Object.keys(obj)) {
      const val = obj[key];
      if (typeof val === "string" && val === "[undefined]") {
        delete obj[key];
      } else {
        deepCleanUndefined(val, depth + 1);
      }
    }
  }
}

export function applyAntigravityGenerationDefaults(generationConfig: GeminiGenerationConfig) {
  const config = { ...generationConfig };
  if (config.topK === undefined) {
    config.topK = 40;
  }
  if (config.topP === undefined) {
    config.topP = 1;
  }

  const thinkingBudget = Number(config.thinkingConfig?.thinkingBudget);
  const maxOutputTokens = Number(config.maxOutputTokens);
  if (
    Number.isFinite(thinkingBudget) &&
    thinkingBudget > 0 &&
    (!Number.isFinite(maxOutputTokens) || maxOutputTokens <= thinkingBudget)
  ) {
    config.maxOutputTokens = Math.floor(thinkingBudget) + 1;
  }

  return config;
}

export function stringifyHistoricalToolArguments(value: unknown): string {
  if (typeof value === "string") return value;
  try {
    return JSON.stringify(value ?? {});
  } catch {
    return String(value ?? "{}");
  }
}

export function buildInertHistoricalToolCallText(name: string | undefined, args: unknown): string {
  const toolName = name || "unknown";
  return `[tool_history_call: ${toolName}] ${stringifyHistoricalToolArguments(args || "{}")}`;
}

export function buildInertHistoricalToolResponseText(name: string, response: unknown): string {
  return `[tool_history_result: ${name || "unknown"}] ${typeof response === "string" ? response : stringifyHistoricalToolArguments(response)}`;
}

export function escapeHistoricalContextAttribute(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

export function escapeHistoricalContextContent(value: string): string {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

export function buildHistoricalToolResultContext(name: string, response: unknown): string {
  const source = escapeHistoricalContextAttribute(name || "unknown");
  const rawResult =
    typeof response === "string" ? response : stringifyHistoricalToolArguments(response);
  const result = escapeHistoricalContextContent(rawResult);
  return [
    `<previous_tool_result_context source="${source}">`,
    result,
    "</previous_tool_result_context>",
  ].join("\n");
}

export type GeminiPart = Record<string, unknown>;
export type GeminiContent = { role: string; parts: GeminiPart[] };

// Gemini-family APIs (incl. Antigravity / Vertex) reject a `contents[]` array that
// has two adjacent entries with the same role:
//   400 INVALID_ARGUMENT "Request contains consecutive messages with the same role".
// Client history that carries consecutive user turns — or a tool-result turn (mapped
// to role:"user") immediately followed by a plain user turn — would otherwise leak
// that invalid alternation through. Merge adjacent same-role entries by concatenating
// their parts, the same normalization the Kiro and Claude request paths already apply
// (9router#2191).
export function mergeConsecutiveSameRoleContents(contents: GeminiContent[]): GeminiContent[] {
  const merged: GeminiContent[] = [];
  for (const entry of contents) {
    const last = merged[merged.length - 1];
    if (last && last.role === entry.role) {
      last.parts.push(...entry.parts);
    } else {
      // Shallow-copy the entry and its `parts` array so a later same-role merge
      // (`last.parts.push(...)`) never mutates the caller's input objects.
      merged.push({ ...entry, parts: [...entry.parts] });
    }
  }
  return merged;
}

// Gemini also rejects a functionCall-bearing "model" turn with no preceding
// turn at all:
//   400 INVALID_ARGUMENT "Please ensure that function call turn comes
//   immediately after a user turn or after a function response turn."
// `contents[]` only ever uses role "user" or "model" here, and
// mergeConsecutiveSameRoleContents above guarantees no two adjacent entries
// share a role -- so for every index >= 1 the previous entry can only be
// "user", satisfying this rule automatically. The one case that slips
// through is history that OPENS with a functionCall-bearing "model" turn,
// e.g. because the true leading user turn was dropped somewhere upstream
// (continuation reconstruction, context compression, a truncated client
// history) while a mid-conversation assistant tool-call turn survived.
// Prepend a minimal synthetic user turn so Gemini accepts the request
// instead of rejecting it outright -- cheaper and more robust than trying to
// enumerate every possible upstream cause of a truncated leading turn.
export function ensureHistoryDoesNotOpenWithFunctionCall(
  contents: GeminiContent[]
): GeminiContent[] {
  const first = contents[0];
  if (!first || first.role !== "model") return contents;
  const opensWithFunctionCall = first.parts.some(
    (part) => part && typeof part === "object" && "functionCall" in part
  );
  if (!opensWithFunctionCall) return contents;
  return [{ role: "user", parts: [{ text: "(continuing the conversation)" }] }, ...contents];
}

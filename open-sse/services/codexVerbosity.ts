/**
 * Codex (OpenAI Responses) verbosity normalization.
 *
 * The GPT-5 series added an output-verbosity control: Chat Completions exposes it
 * as a top-level `verbosity` field, while the Responses API nests it as
 * `text.verbosity` (low/medium/high). The CodexExecutor builds a Responses body and
 * gates it through an allowlist that does NOT include `text`, so for translated
 * requests both shapes are dropped silently and the hint never reaches upstream.
 *
 * This helper runs on the translated path (before the allowlist) and folds whichever
 * shape arrived into a single, validated `text:{verbosity}`. `text` is then added to
 * the allowlist so the hint survives. Other Responses `text` keys, such as
 * `text.format` for structured output, are preserved.
 *
 * Ref: OpenAI GPT-5 docs (text.verbosity), Azure Foundry reasoning guide.
 */

type JsonRecord = Record<string, unknown>;

const VERBOSITY_LEVELS = new Set(["low", "medium", "high"]);

function asRecord(value: unknown): JsonRecord | null {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : null;
}

function normalizeLevel(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const level = value.toLowerCase();
  return VERBOSITY_LEVELS.has(level) ? level : undefined;
}

/**
 * Mutates `body` in place: resolves verbosity from `text.verbosity` (Responses) or
 * the top-level `verbosity` (Chat Completions, which takes precedence when both are
 * present), drops the Chat-only top-level field, and preserves any other existing
 * Responses `text` configuration.
 */
export function normalizeCodexVerbosity(body: Record<string, unknown>): void {
  const textRecord = asRecord(body.text);
  let verbosity = textRecord ? normalizeLevel(textRecord.verbosity) : undefined;

  const topLevel = normalizeLevel(body.verbosity);
  if (topLevel) verbosity = topLevel;

  delete body.verbosity;

  const nextText = textRecord ? { ...textRecord } : {};
  if (verbosity) {
    nextText.verbosity = verbosity;
  } else {
    delete nextText.verbosity;
  }

  if (Object.keys(nextText).length > 0) {
    body.text = nextText;
  } else {
    delete body.text;
  }
}

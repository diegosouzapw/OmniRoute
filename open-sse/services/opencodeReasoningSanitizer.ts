type JsonRecord = Record<string, unknown>;

/**
 * Strip boolean `reasoning` for opencode-go based providers.
 *
 * Providers backed by the opencode-go backend (ollama-cloud, opencode-go,
 * opencode, opencode-zen) use a Go ChatCompletionRequest struct where the
 * `reasoning` field is typed as `openai.Reasoning` (a structured type, not
 * a bool). When a client sends `reasoning: true` or `reasoning: false` —
 * which is valid per the OpenAI API for enabling/disabling reasoning — the
 * Go JSON decoder rejects it with:
 *
 *   400: json: cannot unmarshal bool into Go struct field
 *   ChatCompletionRequest.reasoning of type openai.Reasoning
 *
 * This strips the boolean `reasoning` field from the request body before it
 * is forwarded to these providers, allowing the upstream to apply its own
 * default reasoning behavior. If `reasoning` is already an object/string
 * (matching the Go struct), it is left untouched.
 *
 * Related: services/mimoThinking.ts uses the same pattern for Xiaomi MiMo.
 */

const OPENCODE_GO_PROVIDERS = new Set(["ollama-cloud", "opencode-go", "opencode", "opencode-zen"]);

/** True when the provider is backed by the opencode-go backend. */
export function isOpencodeGoProvider(provider: string): boolean {
  return OPENCODE_GO_PROVIDERS.has(provider);
}

/**
 * Remove a boolean `reasoning` field from the request body.
 * Returns the same object reference if no change is needed, or a shallow
 * clone with the field removed.
 */
export function stripBooleanReasoning(body: JsonRecord): JsonRecord {
  if (!body || typeof body !== "object") return body;
  if (!("reasoning" in body)) return body;
  const reasoning = body.reasoning;
  // Only strip when reasoning is a boolean — object/string forms are valid
  // for the Go struct and should be forwarded as-is.
  if (typeof reasoning !== "boolean") return body;
  const next = { ...body };
  delete next.reasoning;
  return next;
}

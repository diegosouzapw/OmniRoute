/**
 * Kiro/AWS CodeWhisperer only accepts the adaptive-thinking
 * `additionalModelRequestFields` envelope for a narrow allowlist of models —
 * NOT the same set the generic Anthropic-API capability table
 * (`supportsReasoning()` in `@/lib/modelCapabilities`) marks as
 * thinking-capable. That table is correct for Anthropic's own API, but Kiro
 * rejects the field for `claude-sonnet-4.5` and `claude-haiku-4.5` with a raw
 * upstream 400 (`additionalModelRequestFields is not supported for this
 * model`, issue #6576) even though both ARE thinking-capable on Anthropic's
 * direct API. `claude-sonnet-5` is confirmed to accept the adaptive envelope
 * on Kiro today. GPT-5.6 models use Kiro's separate `reasoning.effort` shape,
 * not this Claude adaptive envelope.
 */
const KIRO_ADAPTIVE_THINKING_MODELS = new Set(["claude-sonnet-5"]);
const KIRO_NATIVE_REASONING_MODELS = new Set(["gpt-5.6-sol", "gpt-5.6-terra", "gpt-5.6-luna"]);

export function supportsKiroAdaptiveThinking(normalizedModel: string): boolean {
  return KIRO_ADAPTIVE_THINKING_MODELS.has(normalizedModel);
}

export function supportsKiroNativeReasoning(normalizedModel: string): boolean {
  return KIRO_NATIVE_REASONING_MODELS.has(normalizedModel);
}

const KIRO_UNSUPPORTED_AGENTIC_MESSAGE =
  "Kiro agentic aliases are not supported. The '-agentic' suffix did not change the " +
  "upstream request; select a real Kiro model instead.";
const KIRO_UNSUPPORTED_THINKING_MESSAGE =
  "This Kiro model does not support the '-thinking' alias. Use a model returned by Kiro's " +
  "live catalog with Thinking capability.";
const KIRO_REMOVED_AUTO_ALIAS_MESSAGE =
  "'auto-kiro' is not a real Kiro upstream model. Select a model returned by the live catalog.";

export function resolveKiroModelAlias(model: unknown): { upstream: string; thinking: boolean } {
  let upstream = String(model || "");
  if (upstream.endsWith("-agentic")) throw new Error(KIRO_UNSUPPORTED_AGENTIC_MESSAGE);
  if (upstream === "auto-kiro") throw new Error(KIRO_REMOVED_AUTO_ALIAS_MESSAGE);

  const thinking = upstream.endsWith("-thinking");
  if (thinking) upstream = upstream.slice(0, -"-thinking".length);
  upstream = upstream.replace(/^(claude-(?:opus|sonnet|haiku|3-\d+)-\d+)-(\d{1,2})$/, "$1.$2");

  if (thinking && !supportsKiroAdaptiveThinking(upstream)) {
    throw new Error(KIRO_UNSUPPORTED_THINKING_MESSAGE);
  }
  return { upstream, thinking };
}

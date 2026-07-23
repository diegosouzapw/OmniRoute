/**
 * Kiro/AWS CodeWhisperer only accepts the adaptive-thinking
 * `additionalModelRequestFields` envelope for a narrow allowlist of models —
 * NOT the same set the generic Anthropic-API capability table
 * (`supportsReasoning()` in `@/lib/modelCapabilities`) marks as
 * thinking-capable. That table is correct for Anthropic's own API, but Kiro
 * rejects the field for `claude-sonnet-4.5` and `claude-haiku-4.5` with a raw
 * upstream 400 (`additionalModelRequestFields is not supported for this
 * model`, issue #6576) even though both ARE thinking-capable on Anthropic's
 * direct API. Only `claude-sonnet-5` is confirmed to accept the adaptive
 * envelope on Kiro today — keep this allowlist in sync with
 * `open-sse/config/providers/registry/kiro/index.ts` if Kiro's catalog or
 * upstream behavior changes.
 */
const KIRO_ADAPTIVE_THINKING_MODELS = new Set(["claude-sonnet-5"]);

export function supportsKiroAdaptiveThinking(normalizedModel: string): boolean {
  return KIRO_ADAPTIVE_THINKING_MODELS.has(normalizedModel);
}

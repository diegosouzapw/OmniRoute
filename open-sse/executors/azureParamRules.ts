/**
 * Azure Chat Completions param rules, shared by every Azure wire path.
 *
 * Azure's newer deployments reject a handful of stock OpenAI Chat Completions
 * params and return HTTP 400 rather than ignoring them:
 *
 *   - `max_tokens`      -> "Unsupported parameter: 'max_tokens' is not supported
 *                          with this model. Use 'max_completion_tokens' instead."
 *   - `temperature`     -> only the default (1) is accepted.
 *   - `reasoning_effort` -> "Function tools with reasoning_effort are not
 *                          supported ... Please use /v1/responses instead."
 *
 * This logic previously lived inline in `AzureOpenAIExecutor`, so it only
 * covered the `azure-openai` provider. `azure-ai` (Azure AI Foundry) routes
 * through `DefaultExecutor` and inherited none of it, which meant an identical
 * deployment 400'd on one connection and succeeded on the other. Extracted here
 * so both executors apply exactly the same rules.
 */

/**
 * Deployments that require `max_completion_tokens` instead of `max_tokens`.
 *
 * Matches the GPT-5 family and the o1/o3/o4 reasoning series at a token
 * boundary, so a deployment named `my-gpt-5-prod` matches while an unrelated
 * `piston-o4-legacy`-style name does not match by accident. `gpt-chat-latest`
 * is listed explicitly: it is a moving alias that currently resolves to a
 * GPT-5-era model and rejects `max_tokens`, but carries no version number for
 * the boundary pattern to key on.
 */
export const AZURE_COMPLETION_TOKEN_DEPLOYMENT =
  /(?:^|[/_-])(?:gpt-5|o(?:1|3|4))(?:[._-]|$)|^gpt-chat-latest$/i;

/**
 * Apply the Azure param rules to an already-translated Chat Completions body.
 *
 * `originalBody` is the pre-translation request, consulted only to recover a
 * caller-supplied token budget that translation may have moved or dropped.
 * Returns `transformed` untouched when the deployment is unaffected or the body
 * is not a plain object, and never mutates either input.
 */
export function applyAzureParamRules(
  model: string,
  originalBody: unknown,
  transformed: unknown
): unknown {
  if (!AZURE_COMPLETION_TOKEN_DEPLOYMENT.test(model)) return transformed;
  if (!transformed || typeof transformed !== "object" || Array.isArray(transformed)) {
    return transformed;
  }

  const original =
    originalBody && typeof originalBody === "object" && !Array.isArray(originalBody)
      ? (originalBody as Record<string, unknown>)
      : null;
  const normalized = { ...(transformed as Record<string, unknown>) };

  if (original?.max_completion_tokens !== undefined) {
    normalized.max_completion_tokens = original.max_completion_tokens;
  } else if (normalized.max_completion_tokens === undefined && original?.max_tokens !== undefined) {
    normalized.max_completion_tokens = original.max_tokens;
  }
  delete normalized.max_tokens;

  if (normalized.temperature !== undefined && normalized.temperature !== 1) {
    delete normalized.temperature;
  }

  // Azure 400s on reasoning_effort as soon as tools are present, which is every
  // agentic client (Claude Code, Cursor agent) on every turn.
  const hasTools = Array.isArray(normalized.tools) && normalized.tools.length > 0;
  if (hasTools || normalized.reasoning_effort === "none") {
    delete normalized.reasoning_effort;
  }

  return normalized;
}

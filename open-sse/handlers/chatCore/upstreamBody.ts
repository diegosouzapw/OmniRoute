/**
 * chatCore upstream body preparation (Quality Gate v2 / Fase 9 — chatCore god-file decomposition,
 * #3501 — first internal sub-slice of executeProviderRequest).
 *
 * Extracted from handleChatCore's execute() closure: prepares the body actually sent upstream for a
 * given target model. Pins the model id, applies the configured payload rules, truncates the tool
 * list to the provider's effective limit, backfills a default `user` for Qwen OAuth requests, and
 * injects an OpenAI `prompt_cache_key` for caching-capable providers. Pure with respect to handler
 * state (returns a fresh body, only logs as a side effect); behaviour is byte-identical to the
 * previous inline block. Split into small private steps so each stays under the complexity cap.
 */

import {
  applyConfiguredPayloadRules,
  resolvePayloadRuleProtocols,
} from "../../services/payloadRules.ts";
import { getEffectiveToolLimit } from "../../services/toolLimitDetector.ts";
import { providerSupportsCaching } from "../../utils/cacheControlPolicy.ts";
import { FORMATS } from "../../translator/formats.ts";

type LoggerLike = { debug?: (...args: unknown[]) => void } | null | undefined;
type Body = Record<string, unknown>;
type CredentialsLike = { apiKey?: unknown; accessToken?: unknown } | null | undefined;

function buildAppliedRulesSummary(
  applied: Array<{ type: string; path: string; value?: unknown }>
): string {
  return applied
    .map((rule) => {
      if (rule.type === "filter") return `${rule.type}:${rule.path}`;
      const serializedValue = JSON.stringify(rule.value);
      const safeValue =
        typeof serializedValue === "string" && serializedValue.length > 80
          ? `${serializedValue.slice(0, 77)}...`
          : serializedValue;
      return `${rule.type}:${rule.path}=${safeValue}`;
    })
    .join(", ");
}

function truncateToolList(
  bodyToSend: Body,
  provider: string | null | undefined,
  log?: LoggerLike
): Body {
  const effectiveToolLimit = getEffectiveToolLimit(provider);
  if (Array.isArray(bodyToSend.tools) && bodyToSend.tools.length > effectiveToolLimit) {
    const truncatedTools = bodyToSend.tools.slice(0, effectiveToolLimit);
    bodyToSend = { ...bodyToSend, tools: truncatedTools };
    log?.debug?.(
      "TOOL_LIMIT",
      `Truncated ${(bodyToSend.tools as unknown[]).length} tools to ${effectiveToolLimit} for ${provider}`
    );
  }
  return bodyToSend;
}

// Qwen OAuth rejects requests without a non-empty `user` field. Some minimal OpenAI-compatible
// clients omit it, so we backfill a stable default only for OAuth mode (API key mode is unaffected).
function backfillQwenOAuthUser(
  bodyToSend: Body,
  provider: string | null | undefined,
  credentials: CredentialsLike,
  log?: LoggerLike
): Body {
  const hasValidQwenUser = typeof bodyToSend.user === "string" && bodyToSend.user.trim().length > 0;
  const isQwenOAuthRequest =
    provider === "qwen" &&
    !credentials?.apiKey &&
    typeof credentials?.accessToken === "string" &&
    credentials.accessToken.trim().length > 0;
  if (isQwenOAuthRequest && !hasValidQwenUser) {
    bodyToSend = { ...bodyToSend, user: "omniroute-qwen-oauth" };
    log?.debug?.("QWEN", "Injected fallback user for OAuth request");
  }
  return bodyToSend;
}

// Inject prompt_cache_key only for providers that support it.
async function injectPromptCacheKey(
  bodyToSend: Body,
  provider: string | null | undefined,
  targetFormat: string
): Promise<Body> {
  if (
    targetFormat === FORMATS.OPENAI &&
    providerSupportsCaching(provider) &&
    !bodyToSend.prompt_cache_key &&
    Array.isArray(bodyToSend.messages) &&
    !["nvidia", "codex", "xai"].includes(provider)
  ) {
    const { generatePromptCacheKey } = await import("@/lib/promptCache");
    const cacheKey = generatePromptCacheKey(bodyToSend.messages);
    if (cacheKey) {
      bodyToSend = { ...bodyToSend, prompt_cache_key: cacheKey };
    }
  }
  return bodyToSend;
}

export async function prepareUpstreamBody(opts: {
  translatedBody: Body;
  modelToCall: string;
  provider: string | null | undefined;
  targetFormat: string;
  credentials: CredentialsLike;
  log?: LoggerLike;
}): Promise<Body> {
  const { translatedBody, modelToCall, provider, targetFormat, credentials, log } = opts;

  let bodyToSend: Body =
    translatedBody.model === modelToCall
      ? translatedBody
      : { ...translatedBody, model: modelToCall };
  const payloadRuleModel =
    typeof bodyToSend.model === "string" && bodyToSend.model.length > 0
      ? bodyToSend.model
      : modelToCall;
  const payloadRuleProtocols = resolvePayloadRuleProtocols({ provider, targetFormat });
  const payloadRuleResult = await applyConfiguredPayloadRules(
    bodyToSend,
    payloadRuleModel,
    payloadRuleProtocols
  );
  bodyToSend = payloadRuleResult.payload;

  if (payloadRuleResult.applied.length > 0) {
    log?.debug?.(
      "PAYLOAD_RULES",
      `Applied ${payloadRuleResult.applied.length} rule(s) for ${payloadRuleModel} (${payloadRuleProtocols.join(", ")}): ${buildAppliedRulesSummary(payloadRuleResult.applied)}`
    );
  }

  bodyToSend = truncateToolList(bodyToSend, provider, log);
  bodyToSend = backfillQwenOAuthUser(bodyToSend, provider, credentials, log);
  bodyToSend = await injectPromptCacheKey(bodyToSend, provider, targetFormat);

  return bodyToSend;
}

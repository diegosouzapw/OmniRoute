/**
 * chatCore upstream body preparation (Quality Gate v2 / Fase 9 — chatCore god-file decomposition,
 * #3501 — first internal sub-slice of executeProviderRequest).
 *
 * Extracted from handleChatCore's execute() closure: prepares the body actually sent upstream for a
 * given target model. Pins the model id, applies the configured payload rules, truncates the tool
 * list to the provider's effective limit and injects an OpenAI `prompt_cache_key` for
 * caching-capable providers. Pure with respect to handler
 * state (returns a fresh body, only logs as a side effect); behaviour is byte-identical to the
 * previous inline block. Split into small private steps so each stays under the complexity cap.
 */

import {
  applyConfiguredPayloadRules,
  resolvePayloadRuleProtocols,
} from "../../services/payloadRules.ts";
import { getEffectiveToolLimit, getKnownToolLimit } from "../../services/toolLimitDetector.ts";
import {
  providerSupportsCaching,
  resolveConnectionCacheOverride,
  type ConnectionCacheOverride,
} from "../../utils/cacheControlPolicy.ts";
import { FORMATS } from "../../translator/formats.ts";
import { sanitizeRequestForResolvedTarget } from "../../services/targetRequestSanitizer.ts";

type LoggerLike = { debug?: (...args: unknown[]) => void } | null | undefined;
type Body = Record<string, unknown>;
type CredentialsLike =
  | {
      apiKey?: unknown;
      accessToken?: unknown;
      providerSpecificData?: Record<string, unknown> | null;
    }
  | null
  | undefined;

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
  bypassDefaultToolLimit: boolean,
  log?: LoggerLike
): Body {
  if (!Array.isArray(bodyToSend.tools)) return bodyToSend;

  // #13190: Check bypass first — an operator's explicit override should take
  // precedence over any detected provider limit.
  if (bypassDefaultToolLimit === true) return bodyToSend;

  const knownLimit = getKnownToolLimit(provider);
  if (knownLimit !== null) {
    if (bodyToSend.tools.length > knownLimit) {
      const originalCount = bodyToSend.tools.length;
      const truncatedTools = bodyToSend.tools.slice(0, knownLimit);
      bodyToSend = { ...bodyToSend, tools: truncatedTools };
      log?.debug?.(
        "TOOL_LIMIT",
        `Truncated ${originalCount} tools to ${knownLimit} for ${provider}`
      );
    }
    return bodyToSend;
  }

  const effectiveToolLimit = getEffectiveToolLimit(provider);
  if (bodyToSend.tools.length > effectiveToolLimit) {
    const originalCount = bodyToSend.tools.length;
    const truncatedTools = bodyToSend.tools.slice(0, effectiveToolLimit);
    bodyToSend = { ...bodyToSend, tools: truncatedTools };
    log?.debug?.(
      "TOOL_LIMIT",
      `Truncated ${originalCount} tools to ${effectiveToolLimit} for ${provider}`
    );
  }
  return bodyToSend;
}

// OpenCode's AI SDK file-part serializer omits `image_url.detail`, which makes wide, text-dense
// screenshots fall back to low-detail vision sampling upstream. Gated on `isOpencodeClient` (the
// request's User-Agent / `x-opencode-*` header signal, not the `provider` field — `provider` is
// the upstream target and can be anything regardless of which client sent the request) so this
// override doesn't change the detail default for non-OpenCode callers on any provider.
function defaultImageDetail(bodyToSend: Body, isOpencodeClient: boolean): Body {
  if (!isOpencodeClient) return bodyToSend;

  let nextBody = bodyToSend;

  if (Array.isArray(bodyToSend.messages)) {
    const messages = bodyToSend.messages.map((message) => {
      if (!message || typeof message !== "object" || Array.isArray(message)) return message;
      const messageRecord = message as Record<string, unknown>;
      if (!Array.isArray(messageRecord.content)) return message;

      let changed = false;
      const content = messageRecord.content.map((part) => {
        if (!part || typeof part !== "object" || Array.isArray(part)) return part;
        const partRecord = part as Record<string, unknown>;
        const imageUrl = partRecord.image_url;
        if (
          partRecord.type !== "image_url" ||
          !imageUrl ||
          typeof imageUrl !== "object" ||
          Array.isArray(imageUrl)
        ) {
          return part;
        }

        const imageUrlRecord = imageUrl as Record<string, unknown>;
        if (imageUrlRecord.detail !== undefined) return part;
        changed = true;
        return { ...partRecord, image_url: { ...imageUrlRecord, detail: "high" } };
      });

      return changed ? { ...messageRecord, content } : message;
    });

    if (messages.some((message, index) => message !== bodyToSend.messages?.[index])) {
      nextBody = { ...nextBody, messages };
    }
  }

  if (Array.isArray(bodyToSend.input)) {
    const input = bodyToSend.input.map((item) => {
      if (!item || typeof item !== "object" || Array.isArray(item)) return item;
      const itemRecord = item as Record<string, unknown>;
      if (!Array.isArray(itemRecord.content)) return item;

      let changed = false;
      const content = itemRecord.content.map((part) => {
        if (!part || typeof part !== "object" || Array.isArray(part)) return part;
        const partRecord = part as Record<string, unknown>;
        if (partRecord.type !== "input_image" || partRecord.detail !== undefined) return part;
        changed = true;
        return { ...partRecord, detail: "high" };
      });

      return changed ? { ...itemRecord, content } : item;
    });

    if (input.some((item, index) => item !== bodyToSend.input?.[index])) {
      nextBody = { ...nextBody, input };
    }
  }

  return nextBody;
}

// Inject prompt_cache_key only for providers that support it.
async function injectPromptCacheKey(
  bodyToSend: Body,
  provider: string | null | undefined,
  targetFormat: string,
  connectionCacheOverride: ConnectionCacheOverride | null
): Promise<Body> {
  if (
    targetFormat === FORMATS.OPENAI &&
    providerSupportsCaching(provider, undefined, connectionCacheOverride) &&
    !bodyToSend.prompt_cache_key &&
    Array.isArray(bodyToSend.messages) &&
    !["nvidia", "xai"].includes(provider)
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
  bypassDefaultToolLimit?: boolean;
  isOpencodeClient?: boolean;
  log?: LoggerLike;
}): Promise<Body> {
  const {
    translatedBody,
    modelToCall,
    provider,
    targetFormat,
    credentials,
    bypassDefaultToolLimit = false,
    isOpencodeClient = false,
    log,
  } = opts;

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

  bodyToSend = sanitizeRequestForResolvedTarget(bodyToSend, {
    provider,
    model: payloadRuleModel,
    log,
  });
  bodyToSend = defaultImageDetail(bodyToSend, isOpencodeClient);
  bodyToSend = truncateToolList(bodyToSend, provider, bypassDefaultToolLimit ?? false, log);
  const connectionCacheOverride = resolveConnectionCacheOverride(credentials?.providerSpecificData);
  bodyToSend = await injectPromptCacheKey(
    bodyToSend,
    provider,
    targetFormat,
    connectionCacheOverride
  );

  return bodyToSend;
}

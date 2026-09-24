/**
 * Prepare an isolated body for one upstream attempt. Model constraints and defaults
 * run before operator payload rules; target sanitation and tool/cache/image handling
 * run afterward. The mutable recovery transcript never receives derived defaults.
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
import { stripInternalBodyFields } from "../../config/cliFingerprints.ts";
import { sanitizeRequestForResolvedTarget } from "../../services/targetRequestSanitizer.ts";
import { normalizeThinkingForModel } from "@/shared/constants/modelSpecs.ts";
import {
  normalizeClaudeAdaptiveThinking,
  normalizeClaudeDisabledThinkingEffort,
} from "../../services/claudeAdaptiveThinking.ts";
import { normalizeClaudeHaikuConstraints } from "../../services/claudeHaikuConstraints.ts";
import { applyDefaultReasoningEffort } from "../../services/defaultReasoningEffort.ts";
import { normalizeMimoThinking } from "../../services/mimoThinking.ts";
import {
  isOpencodeGoProvider,
  stripBooleanReasoning,
} from "../../services/opencodeReasoningSanitizer.ts";
import { getUnsupportedParams } from "../../config/providerRegistry.ts";
import { stripUnsupportedParams } from "./unsupportedParamsStrip.ts";
import {
  stripGpt5SamplingWhenReasoning,
  stripGpt5ReasoningWhenTools,
} from "../../services/gpt5SamplingGuard.ts";
import { wireAdaptiveEffort } from "./adaptiveEffortWiring.ts";

type LoggerLike =
  | { debug?: (...args: unknown[]) => void; warn?: (tag: string, message: string) => void }
  | null
  | undefined;
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

  if (bypassDefaultToolLimit === true) return bodyToSend;

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

type PrepareUpstreamBodyOptions = {
  translatedBody: Body;
  modelToCall: string;
  provider: string | null | undefined;
  targetFormat: string;
  credentials: CredentialsLike;
  originModel?: string | null;
  resolvedThinkingEffort?: string | null;
  defaultThinkingEffort?: string | null;
  bypassDefaultToolLimit?: boolean;
  isOpencodeClient?: boolean;
  /** Raw (pre-translation) request body — turn-scoped signals for adaptive effort (#13448). */
  rawBody?: { messages?: unknown } | undefined;
  /** Incoming client request — read for the x-omniroute-effort header (#13448). */
  clientRawRequest?: { headers?: unknown } | undefined;
  log?: LoggerLike;
};

function normalizeAttemptBody(opts: PrepareUpstreamBodyOptions): Body {
  const { translatedBody, modelToCall, provider, targetFormat, log } = opts;
  // Capture intent before constraints remove unsupported fields. Removed explicit
  // choices must not turn into permission to inject automatic defaults.
  const hadExplicitReasoning =
    translatedBody.reasoning_effort !== undefined ||
    translatedBody.reasoning !== undefined ||
    translatedBody.thinking !== undefined;
  let bodyToSend: Body = { ...structuredClone(translatedBody), model: modelToCall };
  bodyToSend = normalizeThinkingForModel(bodyToSend, modelToCall);
  bodyToSend = normalizeClaudeAdaptiveThinking(bodyToSend, modelToCall);
  bodyToSend = normalizeClaudeDisabledThinkingEffort(bodyToSend, modelToCall, provider);
  bodyToSend = normalizeClaudeHaikuConstraints(bodyToSend, modelToCall);
  if (targetFormat === FORMATS.OPENAI && !hadExplicitReasoning) {
    const isOriginModel = modelToCall === opts.originModel;
    bodyToSend = applyDefaultReasoningEffort(
      bodyToSend,
      modelToCall,
      isOriginModel ? opts.resolvedThinkingEffort : undefined,
      isOriginModel ? opts.defaultThinkingEffort : undefined
    );
  }
  // #13448: resolve an "auto" effort (X-OmniRoute-Effort header or ModelSpec default) to a
  // concrete level. Runs per attempt, right after applyDefaultReasoningEffort — the same
  // position it held inline in chatCore.ts before this chain moved here (#13720); it
  // self-scopes to FORMATS.OPENAI and no-ops when the body carries explicit reasoning.
  bodyToSend = wireAdaptiveEffort(bodyToSend, {
    rawBody: opts.rawBody as Parameters<typeof wireAdaptiveEffort>[1]["rawBody"],
    clientRawRequest: opts.clientRawRequest,
    targetFormat,
  });
  if (provider === "xiaomi-mimo") bodyToSend = normalizeMimoThinking(bodyToSend);
  if (isOpencodeGoProvider(provider)) bodyToSend = stripBooleanReasoning(bodyToSend);
  const { strippedParams } = stripUnsupportedParams(
    bodyToSend,
    getUnsupportedParams(provider, modelToCall)
  );
  if (strippedParams.length > 0) {
    log?.warn?.(
      "PARAMS",
      `Stripped unsupported params for ${modelToCall}: ${strippedParams.join(", ")}`
    );
  }
  bodyToSend = stripGpt5SamplingWhenReasoning(bodyToSend, provider, modelToCall, log);
  bodyToSend = stripGpt5ReasoningWhenTools(bodyToSend, provider, modelToCall, targetFormat, log);

  // All models, including universal/context-handoff summary models, pass through
  // this shared pre-executor boundary. Remove OmniRoute-only routing markers here
  // so custom executors that serialize their own request bodies cannot leak them.
  // keepExecutorMarkers: `_native*Passthrough` is read by the executor further down
  // (codex.ts/xai.ts) and deleted there; applyFingerprint() strips it at
  // serialization. Removing it here would disable native passthrough (#14496).
  stripInternalBodyFields(bodyToSend, { keepExecutorMarkers: true });
  return bodyToSend;
}

export async function prepareUpstreamBody(opts: PrepareUpstreamBodyOptions): Promise<Body> {
  const {
    modelToCall,
    provider,
    targetFormat,
    credentials,
    bypassDefaultToolLimit = false,
    isOpencodeClient = false,
    log,
  } = opts;

  let bodyToSend = normalizeAttemptBody(opts);
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

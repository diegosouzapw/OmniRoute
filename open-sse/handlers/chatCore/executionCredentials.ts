/**
 * chatCore execution-credentials resolver (Quality Gate v2 / Fase 9 — chatCore god-file
 * decomposition, #3501).
 *
 * Pure builder extracted from handleChatCore: derives the per-execution credentials object from the
 * resolved request context. Applies the native-Codex passthrough endpoint override, forces
 * apiType=responses (and the responses-upstream marker) for Azure AI Foundry / OCI when the model
 * routes to the OpenAI Responses format, and threads the Claude Code session id when present.
 * Side-effect-free; behaviour is byte-identical to the previous inline closure.
 */

import { getKimiCodeStaticThinkingPolicy } from "../../config/providers/registry/kimi/coding/runtime.ts";
import { FORMATS } from "../../translator/formats.ts";

type CredentialsLike =
  | {
      providerSpecificData?: Record<string, unknown> | null;
      [key: string]: unknown;
    }
  | null
  | undefined;

function buildKimiThinkingMetadata(
  modelInfo: Record<string, unknown> | null | undefined,
  staticThinkingPolicy: ReturnType<typeof getKimiCodeStaticThinkingPolicy>
): Record<string, unknown> {
  const { supportsThinking, supportedThinkingEfforts, defaultThinkingEffort } =
    resolveKimiThinkingPolicyValues(modelInfo, staticThinkingPolicy);
  const metadata: Record<string, unknown> = {};

  if (typeof supportsThinking === "boolean") metadata.supportsThinking = supportsThinking;
  if (modelInfo?.alwaysThinking === true || staticThinkingPolicy?.alwaysThinking === true) {
    metadata.alwaysThinking = true;
  }
  if (supportedThinkingEfforts) metadata.supportedThinkingEfforts = supportedThinkingEfforts;
  if (defaultThinkingEffort) metadata.defaultThinkingEffort = defaultThinkingEffort;
  return metadata;
}

function resolveKimiThinkingPolicyValues(
  modelInfo: Record<string, unknown> | null | undefined,
  staticThinkingPolicy: ReturnType<typeof getKimiCodeStaticThinkingPolicy>
) {
  const supportsThinking =
    typeof modelInfo?.supportsThinking === "boolean"
      ? modelInfo.supportsThinking
      : staticThinkingPolicy?.supportsThinking;
  const supportedThinkingEfforts = Array.isArray(modelInfo?.supportedThinkingEfforts)
    ? modelInfo.supportedThinkingEfforts
    : staticThinkingPolicy?.supportedThinkingEfforts;
  const defaultThinkingEffort =
    typeof modelInfo?.defaultThinkingEffort === "string"
      ? modelInfo.defaultThinkingEffort
      : staticThinkingPolicy?.defaultThinkingEffort;
  return { supportsThinking, supportedThinkingEfforts, defaultThinkingEffort };
}

function applyKimiExecutionMetadata(
  providerSpecificData: Record<string, unknown>,
  provider: string | null | undefined,
  targetFormat: string,
  modelInfo: Record<string, unknown> | null | undefined
): void {
  if (provider !== "kimi-coding" && provider !== "kimi-coding-apikey") return;

  const staticThinkingPolicy = getKimiCodeStaticThinkingPolicy(modelInfo?.model);
  providerSpecificData._omnirouteKimiTargetFormat = targetFormat;
  providerSpecificData._omnirouteKimiThinking = buildKimiThinkingMetadata(
    modelInfo,
    staticThinkingPolicy
  );
}

export function resolveExecutionCredentials(opts: {
  credentials: CredentialsLike;
  nativeCodexPassthrough: boolean;
  endpointPath: string;
  targetFormat: string;
  provider: string | null | undefined;
  ccSessionId: string | null;
  modelInfo?: Record<string, unknown> | null;
}) {
  const {
    credentials,
    nativeCodexPassthrough,
    endpointPath,
    targetFormat,
    provider,
    ccSessionId,
    modelInfo,
  } = opts;

  const nextCredentials = nativeCodexPassthrough
    ? { ...credentials, requestEndpointPath: endpointPath }
    : credentials;

  const providerSpecificData =
    nextCredentials?.providerSpecificData &&
    typeof nextCredentials.providerSpecificData === "object"
      ? { ...nextCredentials.providerSpecificData }
      : {};

  // Some providers (Azure AI Foundry, OCI OpenAI-compatible) choose upstream
  // endpoint path from providerSpecificData.apiType. When a model routes to
  // OpenAI Responses format, force apiType=responses unless explicitly set.
  if (
    targetFormat === FORMATS.OPENAI_RESPONSES &&
    (provider === "azure-ai" || provider === "oci") &&
    providerSpecificData.apiType !== "responses"
  ) {
    providerSpecificData.apiType = "responses";
  }

  if (
    targetFormat === FORMATS.OPENAI_RESPONSES &&
    (provider === "azure-ai" || provider === "oci")
  ) {
    providerSpecificData._omnirouteForceResponsesUpstream = true;
  }

  // #7364: "zai"/"glm-coding-apikey" default to the Anthropic Messages wire format
  // (registry format:"claude"), but a per-model targetFormat override (custom-model
  // dropdown, #2905) can resolve targetFormat to "openai" — e.g. for a vision model
  // like glm-4.6v that the operator wants routed through the OpenAI-compatible
  // endpoint. DefaultExecutor.buildUrl()'s "zai" branch has no other way to see that
  // override, so surface it on providerSpecificData for buildUrl to read.
  if (targetFormat === FORMATS.OPENAI && (provider === "zai" || provider === "glm-coding-apikey")) {
    providerSpecificData.targetFormat = targetFormat;
  }

  applyKimiExecutionMetadata(providerSpecificData, provider, targetFormat, modelInfo);

  const withApiType = {
    ...nextCredentials,
    providerSpecificData,
  };

  if (!ccSessionId) return withApiType;

  return {
    ...withApiType,
    providerSpecificData: {
      ...(withApiType?.providerSpecificData || {}),
      ccSessionId,
    },
  };
}

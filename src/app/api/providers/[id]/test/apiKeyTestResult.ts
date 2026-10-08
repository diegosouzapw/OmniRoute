import {
  getReasoningControlEndpointFingerprint,
  normalizeDetectedReasoningControl,
} from "@omniroute/open-sse/utils/reasoningControl.ts";

export interface ApiKeyValidationResult {
  valid: boolean;
  warning?: string | null;
  statusCode?: number | null;
  deployments?: unknown;
  detectedReasoningControl?: unknown;
  reasoningControlEndpointFingerprint?: unknown;
}

export interface ApiKeyTestDiagnosis {
  type: string;
  source: string;
  message: string | null;
  code: string | null;
}

export function applyDetectedControlUpdate(
  updateData: Record<string, unknown>,
  latestProviderSpecificData: unknown,
  result: ApiKeyValidationResult
): void {
  if (
    !result.valid ||
    !Object.hasOwn(result, "detectedReasoningControl") ||
    typeof result.reasoningControlEndpointFingerprint !== "string"
  ) {
    return;
  }

  const currentPsd = {
    ...(((updateData.providerSpecificData ?? latestProviderSpecificData) as Record<
      string,
      unknown
    > | null) || {}),
  };
  const explicitControl = currentPsd.reasoningControl;
  const currentFingerprint = getReasoningControlEndpointFingerprint(currentPsd);
  if (
    explicitControl === "chat-template" ||
    explicitControl === "openai" ||
    currentFingerprint !== result.reasoningControlEndpointFingerprint
  ) {
    return;
  }

  const detected = normalizeDetectedReasoningControl(result.detectedReasoningControl);
  if (detected) currentPsd.detectedReasoningControl = detected;
  else delete currentPsd.detectedReasoningControl;
  updateData.providerSpecificData = currentPsd;
}

export function buildApiKeyConnectionTestResult(
  result: ApiKeyValidationResult,
  error: string | null,
  diagnosis: ApiKeyTestDiagnosis
) {
  return {
    valid: !!result.valid,
    error,
    warning: result.warning || null,
    // Keep a valid 402 so CredentialHealth can lock only the probed model
    // instead of treating the whole openai-compatible connection as dead.
    statusCode: result.valid && result.statusCode !== 402 ? null : (result.statusCode ?? null),
    diagnosis,
    ...(Array.isArray(result.deployments) ? { deployments: result.deployments } : {}),
    ...(Object.hasOwn(result, "detectedReasoningControl")
      ? { detectedReasoningControl: result.detectedReasoningControl ?? null }
      : {}),
    ...(Object.hasOwn(result, "reasoningControlEndpointFingerprint")
      ? { reasoningControlEndpointFingerprint: result.reasoningControlEndpointFingerprint ?? null }
      : {}),
  };
}

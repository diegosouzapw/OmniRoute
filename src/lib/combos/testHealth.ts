import { validateProviderApiKey } from "@/lib/providers/validation";
import { getProviderCredentials } from "@/sse/services/auth";
import { getModelInfo } from "@/sse/services/model";

const SOFT_REACHABILITY_STATUSES = new Set([400, 405, 406, 409, 422]);

export function buildComboTestRequestBody(modelStr: string) {
  return {
    model: modelStr,
    messages: [{ role: "user", content: "Reply with OK only." }],
    // Some gateway-routed models reject ultra-tiny budgets during smoke tests.
    max_tokens: 16,
    stream: false,
  };
}

export function shouldProbeComboTestReachability(statusCode: number) {
  return SOFT_REACHABILITY_STATUSES.has(Number(statusCode));
}

type ProbeDeps = {
  getModelInfo?: typeof getModelInfo;
  getProviderCredentials?: typeof getProviderCredentials;
  validateProviderApiKey?: typeof validateProviderApiKey;
};

export async function probeComboModelReachability(modelStr: string, deps: ProbeDeps = {}) {
  const resolveModel = deps.getModelInfo || getModelInfo;
  const loadCredentials = deps.getProviderCredentials || getProviderCredentials;
  const validateKey = deps.validateProviderApiKey || validateProviderApiKey;

  const modelInfo = await resolveModel(modelStr);
  if (!modelInfo?.provider) {
    return { reachable: false, reason: "unresolved_model" };
  }

  const credentials = await loadCredentials(
    modelInfo.provider,
    null,
    null,
    modelInfo.model || modelStr
  );
  if (!credentials || credentials.allRateLimited) {
    return { reachable: false, reason: "credentials_unavailable" };
  }

  const apiKey = credentials.apiKey || credentials.accessToken;
  if (typeof apiKey !== "string" || apiKey.trim().length === 0) {
    return { reachable: false, reason: "missing_auth_material" };
  }

  const providerSpecificData =
    credentials.providerSpecificData && typeof credentials.providerSpecificData === "object"
      ? { ...credentials.providerSpecificData }
      : {};

  if (!providerSpecificData.validationModelId && modelInfo.model) {
    providerSpecificData.validationModelId = modelInfo.model;
  }

  const validation = await validateKey({
    provider: modelInfo.provider,
    apiKey,
    providerSpecificData,
  });

  return {
    reachable: Boolean(validation?.valid),
    provider: modelInfo.provider,
    model: modelInfo.model || null,
    method: validation?.method || null,
    warning: validation?.warning || null,
  };
}

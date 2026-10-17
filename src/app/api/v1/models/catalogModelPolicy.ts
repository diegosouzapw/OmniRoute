import { getRegisteredEndpointAdapterStatuses } from "@/lib/providerModels/endpointAdapterAvailability";
import { normalizeModelSupportedEndpoints } from "@/shared/constants/modelSupportedEndpoints";
import { getModelEndpointDecision } from "@omniroute/open-sse/services/modelEndpointPolicy";
import { isModelSelectable } from "@omniroute/open-sse/services/modelLifecycle";

type CatalogModelPolicyInput = {
  id: string;
  supportedEndpoints?: readonly string[];
  endpointCapabilitySource?: string;
};

export function isUnifiedChatSourceModelSelectable(
  provider: string,
  model: CatalogModelPolicyInput
): boolean {
  if (!isModelSelectable(provider, model.id)) return false;
  if (getModelEndpointDecision(provider, model.id, model.supportedEndpoints).reason ===
      "provider-policy") return false;

  // A discovered tag is a capability statement, not evidence of an executable
  // provider handler. Do not advertise known-unrunnable models as working in
  // /v1/models. Legacy and defaulted tags preserve the existing fallback.
  if (["declared", "inferred", "operator"].includes(model.endpointCapabilitySource || "") &&
      model.supportedEndpoints?.length) {
    const adapters = getRegisteredEndpointAdapterStatuses(provider);
    const declared = normalizeModelSupportedEndpoints(model.supportedEndpoints);
    if (declared.every((endpoint) => adapters[endpoint] === "unavailable")) {
      return false;
    }
  }
  return true;
}

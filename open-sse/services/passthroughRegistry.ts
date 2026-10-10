import { getPassthroughProviders } from "../config/providerRegistry.ts";
import { getProviderById } from "../../src/shared/constants/providers";

/**
 * True when the canonical provider id declares passthroughModels in the open-sse registry or in
 * the shared provider registry (#11071: 40 providers are only in the latter).
 */
export function isRegistryPassthroughProvider(canonicalId: string): boolean {
  return (
    getPassthroughProviders().has(canonicalId) ||
    getProviderById(canonicalId)?.passthroughModels === true
  );
}

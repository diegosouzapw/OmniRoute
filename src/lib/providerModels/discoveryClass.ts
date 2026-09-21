import { getRegistryEntry } from "@omniroute/open-sse/config/providerRegistry";
import { providerUsesCuratedModelsOnly } from "@/lib/providers/modelListingCapability";
import { HARDCODED_MODELS_CONFIG_IDS } from "./hardcodedModelsConfigIds.ts";

export type DiscoveryClass = "account-live" | "openai-compat" | "static-only";

export const ACCOUNT_LIVE_PROVIDER_IDS = [
  "claude",
  "codex",
  "github",
  "ghe-copilot",
  "agy",
  "antigravity",
  "gemini",
  "cursor",
  "cu",
  "grok-cli",
] as const;

const ACCOUNT_LIVE = new Set<string>(ACCOUNT_LIVE_PROVIDER_IDS);

export function getDiscoveryClass(providerId: string): DiscoveryClass {
  const id = providerId.trim().toLowerCase();
  if (!id) return "static-only";
  if (providerUsesCuratedModelsOnly(id)) return "static-only";
  if (ACCOUNT_LIVE.has(id)) return "account-live";
  if (HARDCODED_MODELS_CONFIG_IDS.has(id) || Boolean(getRegistryEntry(id)?.modelsUrl)) {
    return "openai-compat";
  }
  return "static-only";
}

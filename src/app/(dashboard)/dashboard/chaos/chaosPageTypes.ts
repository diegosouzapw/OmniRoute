import type { ChaosProviderOverride } from "./components/ChaosProviderOverridesPanel";

export interface ChaosProviderInfo {
  id: string;
  name: string;
  provider: string;
  defaultModel: string | null;
}

export interface ChaosPageConfig {
  enabled: boolean;
  defaultMode: "parallel" | "collaborative";
  providerOverrides: ChaosProviderOverride[];
  systemPrompt?: string;
  timeoutMs: number;
  maxTokens: number;
}

export const DEFAULT_CHAOS_PAGE_CONFIG: ChaosPageConfig = {
  enabled: false,
  defaultMode: "parallel",
  providerOverrides: [],
  systemPrompt: "",
  timeoutMs: 120_000,
  maxTokens: 4096,
};

export type ChaosPageMessage = { type: "success" | "error"; text: string } | null;

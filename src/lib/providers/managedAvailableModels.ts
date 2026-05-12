import { getModelsByProviderId } from "@/shared/constants/models";
import { isClaudeCodeCompatibleProvider } from "@/shared/constants/providers";

type ManagedAvailableModel = {
  id?: string;
  name?: string;
  contextLength?: number;
};

export function getCompatibleFallbackModels(
  providerId: string,
  fallbackModels: ManagedAvailableModel[] = []
): ManagedAvailableModel[] | undefined {
  if (providerId === "openrouter") return fallbackModels;
  if (isClaudeCodeCompatibleProvider(providerId)) return getModelsByProviderId("claude");
  return undefined;
}

export function compatibleProviderSupportsModelImport(providerId: string): boolean {
  return !isClaudeCodeCompatibleProvider(providerId);
}

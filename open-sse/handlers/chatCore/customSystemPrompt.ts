import { injectCustomSystemPrompt } from "../../services/systemPrompt.ts";
import { getCachedSettings } from "@/lib/db/readCache";

export interface CustomSystemPromptInput {
  body: Record<string, unknown>;
  cachedSettings?: { customSystemPromptEnabled?: boolean; customSystemPrompt?: unknown } | null;
  log?: { debug?: (...args: unknown[]) => void };
}

export async function applyCustomSystemPrompt(input: CustomSystemPromptInput) {
  const settings = input.cachedSettings ?? (await getCachedSettings());
  if (
    settings.customSystemPromptEnabled === true &&
    typeof settings.customSystemPrompt === "string" &&
    settings.customSystemPrompt
  ) {
    input.log?.debug?.("CUSTOMSP", "custom system prompt injected");
    return injectCustomSystemPrompt(input.body, settings.customSystemPrompt);
  }
  return input.body;
}

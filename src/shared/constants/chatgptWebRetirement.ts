export const RETIRED_COMMON_CHATGPT_WEB_PROVIDER_IDS: ReadonlySet<string> = new Set(["cgpt-web"]);

export const CHATGPT_WEB_RETIRED_ERROR_CODE = "PROVIDER_RETIRED";
export const CHATGPT_WEB_RETIRED_MESSAGE = "Provider is retired and unavailable.";

export type ChatGptWebRetirementError = Error & {
  code: typeof CHATGPT_WEB_RETIRED_ERROR_CODE;
  status: 410;
};

export function isCommonChatGptWebRetiredProviderId(providerId: unknown): providerId is string {
  return (
    typeof providerId === "string" &&
    RETIRED_COMMON_CHATGPT_WEB_PROVIDER_IDS.has(providerId.trim().toLowerCase())
  );
}

export function assertCommonChatGptWebProviderAvailable(providerId: unknown): void {
  if (!isCommonChatGptWebRetiredProviderId(providerId)) return;

  const error = new Error(CHATGPT_WEB_RETIRED_MESSAGE) as ChatGptWebRetirementError;
  error.code = CHATGPT_WEB_RETIRED_ERROR_CODE;
  error.status = 410;
  throw error;
}

export function assertCommonChatGptWebModelAvailable(modelId: unknown): void {
  if (typeof modelId !== "string") return;
  const normalizedModelId = modelId.trim();
  assertCommonChatGptWebProviderAvailable(normalizedModelId);

  const slash = normalizedModelId.indexOf("/");
  if (slash <= 0) return;
  assertCommonChatGptWebProviderAvailable(normalizedModelId.slice(0, slash));
}

export function isCommonChatGptWebRetirementError(
  error: unknown
): error is ChatGptWebRetirementError {
  if (!(error instanceof Error)) return false;
  const typed = error as Error & { code?: unknown; status?: unknown };
  return typed.code === CHATGPT_WEB_RETIRED_ERROR_CODE && typed.status === 410;
}

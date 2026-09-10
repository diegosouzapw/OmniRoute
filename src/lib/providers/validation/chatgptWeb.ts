import { normalizeChatGptWebStorageState } from "@omniroute/open-sse/utils/chatgptWebExecutorAdapter.ts";

export type ChatGptWebValidationResult = {
  valid: boolean;
  error: string | null;
  unsupported: false;
};

/** Validate the encrypted-at-rest browser storage-state credential without echoing it. */
export function validateChatGptWebProvider({
  apiKey,
}: {
  apiKey?: unknown;
}): ChatGptWebValidationResult {
  if (typeof apiKey !== "string" || !apiKey.trim()) {
    return {
      valid: false,
      error: "ChatGPT Web browser storage state JSON is required",
      unsupported: false,
    };
  }

  try {
    const state = normalizeChatGptWebStorageState(JSON.parse(apiKey) as unknown);
    if (state.cookies.length === 0) {
      return {
        valid: false,
        error: "ChatGPT Web browser storage state must contain first-party cookies",
        unsupported: false,
      };
    }
    return { valid: true, error: null, unsupported: false };
  } catch {
    return {
      valid: false,
      error: "ChatGPT Web browser storage state JSON is invalid or contains foreign origins",
      unsupported: false,
    };
  }
}

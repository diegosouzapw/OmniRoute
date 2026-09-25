import {
  chatGptWebStorageStateFromCookieHeader,
  normalizeChatGptWebStorageState,
} from "@omniroute/open-sse/utils/chatgptWebExecutorAdapter.ts";

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
      error: "ChatGPT Web storage-state JSON or Cookie header is required",
      unsupported: false,
    };
  }

  try {
    const parsed = JSON.parse(apiKey) as unknown;
    const state = normalizeChatGptWebStorageState(parsed);
    if (state.cookies.length === 0) {
      return {
        valid: false,
        error: "ChatGPT Web browser storage state must contain first-party cookies",
        unsupported: false,
      };
    }
    return { valid: true, error: null, unsupported: false };
  } catch (error) {
    if (error instanceof SyntaxError) {
      try {
        const state = chatGptWebStorageStateFromCookieHeader(apiKey);
        return state.cookies.length > 0
          ? { valid: true, error: null, unsupported: false }
          : {
              valid: false,
              error: "ChatGPT Web Cookie header must contain cookies",
              unsupported: false,
            };
      } catch {
        return {
          valid: false,
          error: "ChatGPT Web storage state JSON or Cookie header is invalid",
          unsupported: false,
        };
      }
    }
    return {
      valid: false,
      error: "ChatGPT Web storage state JSON is invalid or contains foreign origins",
      unsupported: false,
    };
  }
}

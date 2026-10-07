import { errorResponse } from "@omniroute/open-sse/utils/error.ts";

import {
  assertCommonChatGptWebProviderAvailable,
  CHATGPT_WEB_RETIRED_ERROR_CODE,
  CHATGPT_WEB_RETIRED_MESSAGE,
  isCommonChatGptWebRetiredProviderId,
  isCommonChatGptWebRetirementError,
} from "@/shared/constants/chatgptWebRetirement";

export function commonChatGptWebRetirementResponse(): Response {
  return errorResponse(410, CHATGPT_WEB_RETIRED_MESSAGE, {
    type: "provider_error",
    code: CHATGPT_WEB_RETIRED_ERROR_CODE,
  });
}

export function rejectRetiredCommonChatGptWebProvider(providerId: unknown): Response | null {
  return isCommonChatGptWebRetiredProviderId(providerId)
    ? commonChatGptWebRetirementResponse()
    : null;
}

export function assertProviderAvailable(providerId: unknown): void {
  assertCommonChatGptWebProviderAvailable(providerId);
}

export function responseForError(error: unknown): Response | null {
  return isCommonChatGptWebRetirementError(error) ? commonChatGptWebRetirementResponse() : null;
}

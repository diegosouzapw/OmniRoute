import { HTTP_STATUS } from "@omniroute/open-sse/config/constants.ts";
import {
  errorResponse,
  modelCooldownResponse,
  unavailableResponse,
} from "@omniroute/open-sse/utils/error.ts";
import * as log from "../utils/logger";

type CredentialCooldownState = {
  modelNotSupported?: boolean;
  lastError?: string;
  lastErrorCode?: number | string;
  cooldownModel?: string;
  cooldownScope?: string;
  retryAfterHuman?: string;
  retryAfter?: string;
  connectionsCount?: number;
};

/** Preserve the existing cooldown diagnostics, with a specific learned-rejection response. */
export function credentialCooldownResponse(
  credentials: CredentialCooldownState,
  provider: string,
  model: string,
  lastError: string | null,
  lastStatus: number | null
) {
  if (credentials.modelNotSupported === true) {
    return errorResponse(400, "The requested model is not supported.", {
      code: "model_not_supported",
      type: "invalid_request_error",
    });
  }
  const errorMsg = lastError || credentials.lastError || "Unavailable";
  const status = lastStatus || Number(credentials.lastErrorCode) || HTTP_STATUS.SERVICE_UNAVAILABLE;
  const cooldownModel =
    typeof credentials.cooldownModel === "string" && credentials.cooldownModel.trim().length > 0
      ? credentials.cooldownModel.trim()
      : model;

  if (credentials.cooldownScope === "model" && Number(status) === HTTP_STATUS.RATE_LIMITED) {
    log.warn(
      "CHAT",
      `[${provider}/${cooldownModel}] all credentials cooling down${
        credentials.retryAfterHuman ? ` (${credentials.retryAfterHuman})` : ""
      }`
    );
    return modelCooldownResponse({
      model: cooldownModel,
      retryAfter: credentials.retryAfter,
      retryAfterAt: typeof credentials.retryAfter === "string" ? credentials.retryAfter : null,
      credentialsCoolingCount:
        typeof credentials.connectionsCount === "number" ? credentials.connectionsCount : null,
    });
  }

  log.warn("CHAT", `[${provider}/${model}] ${errorMsg} (${credentials.retryAfterHuman})`);
  return unavailableResponse(
    status,
    `[${provider}/${model}] ${errorMsg}`,
    credentials.retryAfter,
    credentials.retryAfterHuman
  );
}

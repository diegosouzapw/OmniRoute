import { TYPESAFE_MODELS_URL } from "@/lib/providers/typesafe";

import { buildBearerHeaders } from "./headers";
import { toValidationErrorResult, validationRead } from "./transport";

/** Validate a TypeSafe credential without consuming inference tokens. */
export async function validateTypeSafeProvider({
  apiKey,
  providerSpecificData = {},
  fetchImpl = validationRead,
}: {
  apiKey: string;
  providerSpecificData?: Record<string, unknown>;
  fetchImpl?: typeof validationRead;
}) {
  try {
    const response = await fetchImpl(TYPESAFE_MODELS_URL, {
      method: "GET",
      headers: buildBearerHeaders(apiKey, providerSpecificData),
    });

    if (response.ok) {
      return {
        valid: true,
        error: null,
        method: "typesafe_models",
        testedEndpoint: `GET ${TYPESAFE_MODELS_URL}`,
      };
    }

    if (response.status === 401 || response.status === 403) {
      return {
        valid: false,
        error: `Invalid API key (GET ${TYPESAFE_MODELS_URL})`,
        method: "typesafe_models",
        testedEndpoint: `GET ${TYPESAFE_MODELS_URL}`,
      };
    }

    if (response.status === 429 || response.status === 529) {
      return {
        valid: true,
        error: null,
        warning: `TypeSafe validation was rate limited (${response.status})`,
        method: "typesafe_models",
        testedEndpoint: `GET ${TYPESAFE_MODELS_URL}`,
      };
    }

    if (response.status >= 500) {
      return {
        valid: false,
        error: `TypeSafe is unavailable (${response.status})`,
        method: "typesafe_models",
        testedEndpoint: `GET ${TYPESAFE_MODELS_URL}`,
      };
    }

    return {
      valid: false,
      error: `TypeSafe validation failed (${response.status})`,
      method: "typesafe_models",
      testedEndpoint: `GET ${TYPESAFE_MODELS_URL}`,
    };
  } catch (error) {
    return toValidationErrorResult(error);
  }
}

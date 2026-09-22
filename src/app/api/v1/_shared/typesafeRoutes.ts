import {
  handleSystemOneProxy,
  handleTypeSafeModelsProxy,
  typeSafeErrorResponse,
  type TypeSafeCredentials,
} from "@omniroute/open-sse/handlers/systemone.ts";
import {
  clearRecoveredProviderState,
  getProviderCredentialsWithQuotaPreflight,
} from "@/sse/services/auth";
import { enforceApiKeyPolicy } from "@/shared/utils/apiKeyPolicy";
import { resolveModelAliasWithSeedFallback } from "@/lib/modelAliasResolver";
import { v1SystemOneSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import {
  isAllRateLimitedCredentials,
  rateLimitedProviderResponse,
} from "@/app/api/v1/_shared/rateLimit";
import {
  TYPESAFE_PROVIDER_ID,
  isTypesafeJevModelId,
  stripTypesafeModelPrefix,
  toTypesafePublicModelId,
} from "@/lib/providers/typesafe";
import { CORS_HEADERS } from "@omniroute/open-sse/utils/cors.ts";

const TYPESAFE_CLIENT_HEADER_NAMES = [
  "x-typesafe-sdk",
  "x-typesafe-runtime",
  "x-typesafe-retry-count",
] as const;

function typeSafeClientHeaders(request: Request): Record<string, string> {
  const headers: Record<string, string> = {};
  for (const name of TYPESAFE_CLIENT_HEADER_NAMES) {
    const value = request.headers.get(name);
    if (value) headers[name] = value;
  }
  return headers;
}

export function typeSafeOptions(): Response {
  return new Response(null, {
    headers: {
      ...CORS_HEADERS,
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "*",
    },
  });
}

function rateLimitedResponse(credentials: {
  allRateLimited: true;
  retryAfter?: string | number | Date | null;
  retryAfterHuman?: string;
}): Response {
  const standard = rateLimitedProviderResponse(TYPESAFE_PROVIDER_ID, credentials);
  return new Response(
    JSON.stringify({
      detail: {
        error_type: "rate_limit_error",
        message: "All configured TypeSafe credentials are temporarily rate limited",
      },
    }),
    { status: 429, headers: standard.headers }
  );
}

function validationResponse(details: Array<{ field: string; message: string }>): Response {
  return Response.json(
    {
      detail: details.map((detail) => ({
        type: "value_error",
        loc: ["body", ...detail.field.split(".").filter(Boolean)],
        msg: detail.message,
      })),
    },
    {
      status: 422,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
    }
  );
}

export async function typeSafeSystemOnePost(request: Request): Promise<Response> {
  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return typeSafeErrorResponse(400, "api_usage_error", "Invalid JSON body");
  }

  const validation = validateBody(v1SystemOneSchema, rawBody);
  if (isValidationFailure(validation)) {
    return validationResponse(validation.error.details);
  }

  const body = { ...validation.data } as Record<string, unknown>;
  const requestedModel = body.model as string;
  const aliasTarget = await resolveModelAliasWithSeedFallback(requestedModel).catch(
    () => requestedModel
  );
  const resolvedModel = typeof aliasTarget === "string" ? aliasTarget : requestedModel;
  if (!isTypesafeJevModelId(resolvedModel)) {
    return typeSafeErrorResponse(
      400,
      "api_usage_error",
      `Unknown TypeSafe model: ${stripTypesafeModelPrefix(resolvedModel)}`
    );
  }

  const upstreamModel = stripTypesafeModelPrefix(resolvedModel);
  const publicModel = toTypesafePublicModelId(upstreamModel);
  const policy = await enforceApiKeyPolicy(request, publicModel);
  if (policy.rejection) return policy.rejection;

  const credentials = (await getProviderCredentialsWithQuotaPreflight(
    TYPESAFE_PROVIDER_ID,
    null,
    null,
    upstreamModel
  )) as TypeSafeCredentials | null;
  if (!credentials || credentials.allExpired) {
    return typeSafeErrorResponse(
      401,
      "authentication_error",
      "No TypeSafe provider credential is configured"
    );
  }
  if (isAllRateLimitedCredentials(credentials)) return rateLimitedResponse(credentials);

  body.model = upstreamModel;
  const response = await handleSystemOneProxy({
    body,
    credentials,
    provider: TYPESAFE_PROVIDER_ID,
    requestedModel,
    signal: request.signal,
    forwardedHeaders: typeSafeClientHeaders(request),
    apiKeyId: policy.apiKeyInfo?.id || null,
    apiKeyName: policy.apiKeyInfo?.name || null,
  });
  if (response.ok) await clearRecoveredProviderState(credentials);
  return response;
}

export async function typeSafeModelsGet(request: Request): Promise<Response> {
  const policy = await enforceApiKeyPolicy(request, "typesafe/jev-latest");
  if (policy.rejection) return policy.rejection;

  const credentials = (await getProviderCredentialsWithQuotaPreflight(
    TYPESAFE_PROVIDER_ID
  )) as TypeSafeCredentials | null;
  if (!credentials || credentials.allExpired) {
    return typeSafeErrorResponse(
      401,
      "authentication_error",
      "No TypeSafe provider credential is configured"
    );
  }
  if (isAllRateLimitedCredentials(credentials)) return rateLimitedResponse(credentials);

  const response = await handleTypeSafeModelsProxy({
    credentials,
    provider: TYPESAFE_PROVIDER_ID,
    signal: request.signal,
    forwardedHeaders: typeSafeClientHeaders(request),
    apiKeyId: policy.apiKeyInfo?.id || null,
    apiKeyName: policy.apiKeyInfo?.name || null,
  });
  if (response.ok) await clearRecoveredProviderState(credentials);
  return response;
}

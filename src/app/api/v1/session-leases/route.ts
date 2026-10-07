import { z } from "zod";

import { isRuntimeProviderRetirementError } from "@/shared/constants/providerRetirement";
import { isCommonChatGptWebRetirementError } from "@/shared/constants/chatgptWebRetirement";
import { enforceApiKeyPolicy } from "@/shared/utils/apiKeyPolicy";
import { CORS_HEADERS, handleCorsOptions } from "@/shared/utils/cors";
import {
  getExclusiveConnectionLeaseStatus,
  releaseExclusiveConnectionLease,
  renewExclusiveConnectionLease,
} from "@/lib/db/exclusiveConnectionLeases";
import { getProviderDisplayName } from "@/lib/display/names";
import {
  extractApiKey,
  getProviderCredentialsWithQuotaPreflight,
  isValidApiKey,
} from "@/sse/services/auth";
import type { ExclusiveLeaseSelectionResult } from "@/sse/services/auth";
import {
  buildManagedLeaseSelectionErrorResponse,
  isExclusiveLeaseManagedKey,
  LeaseContextError,
  parseLeaseOwnerHeader,
  validateExclusiveLeaseKeyConfiguration,
} from "@/sse/services/leaseContext";
import { getModelInfo } from "@/sse/services/model";
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";

const action = <T extends string>(name: T, shape: z.ZodRawShape) =>
  z.object({ action: z.literal(name), ...shape });
const generation = z.number().int().positive().safe();
const actionSchema = z.discriminatedUnion("action", [
  action("acquire", { model: z.string().trim().min(1).max(512) }),
  action("status", { generation }),
  action("renew", { generation }),
  z.object({
    action: z.literal("release"),
    generation,
    reason: z.enum(["OWNER_EXIT", "CLIENT_CANCELLED"]).optional(),
  }),
]);

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
  });

function error(status: number, code: string, message: string): Response {
  return json(status, buildErrorBody(status, message, null, { type: "lease_error", code }));
}

const lifecycle = (lease: Record<string, unknown>) => {
  const { state, generation, acquiredAt, renewedAt, expiresAt } = lease;
  return { state, generation, acquiredAt, renewedAt, expiresAt };
};

export const OPTIONS = async (): Promise<Response> => handleCorsOptions();

export async function POST(request: Request): Promise<Response> {
  const apiKey = extractApiKey(request);
  if (!apiKey) return error(401, "LEASE_AUTHENTICATION_REQUIRED", "Authentication required");
  if (!(await isValidApiKey(apiKey))) return error(401, "LEASE_API_KEY_INVALID", "Invalid API key");
  const contentType = request.headers.get("content-type")?.toLowerCase().split(";", 1)[0].trim();
  if (contentType !== "application/json") {
    return error(415, "LEASE_CONTENT_TYPE_REQUIRED", "Content-Type must be application/json");
  }

  const parsed = actionSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return error(400, "LEASE_ACTION_INVALID", "Invalid lease lifecycle action");

  let acquisitionModelInfo: Awaited<ReturnType<typeof getModelInfo>> | null = null;
  if (parsed.data.action === "acquire") {
    try {
      acquisitionModelInfo = await getModelInfo(parsed.data.model);
    } catch (cause) {
      if (isCommonChatGptWebRetirementError(cause)) {
        return error(cause.status, cause.code, cause.message);
      }
      return error(503, "LEASE_SERVICE_UNAVAILABLE", "Lease service unavailable");
    }
  }

  const policy = await enforceApiKeyPolicy(
    request,
    parsed.data.action === "acquire" ? parsed.data.model : null
  );
  if (policy.rejection) return policy.rejection;
  if (!policy.apiKeyInfo || !isExclusiveLeaseManagedKey(policy.apiKeyInfo))
    return error(403, "LEASE_SCOPE_REQUIRED", "The lease:exclusive scope is required");

  try {
    validateExclusiveLeaseKeyConfiguration(policy.apiKeyInfo);
    const leaseOwnerId = parseLeaseOwnerHeader(request.headers);
    if (parsed.data.action !== "acquire") {
      const input = {
        leaseOwnerId,
        generation: parsed.data.generation,
        apiKeyId: policy.apiKeyInfo.id,
      };
      if (parsed.data.action === "status") {
        const status = getExclusiveConnectionLeaseStatus(input);
        return status
          ? json(200, {
              ...lifecycle(status.lease),
              connection: {
                displayName: status.connectionName,
                provider: getProviderDisplayName(status.provider),
              },
            })
          : error(409, "LEASE_FENCE_STALE", "The lease generation is stale");
      }
      const result =
        parsed.data.action === "renew"
          ? renewExclusiveConnectionLease(input)
          : releaseExclusiveConnectionLease({ ...input, reason: parsed.data.reason });
      return result.kind !== "STALE"
        ? json(200, lifecycle(result.lease))
        : error(409, "LEASE_FENCE_STALE", "The lease generation is stale");
    }

    const modelInfo = acquisitionModelInfo!;
    if (!modelInfo.provider) return error(400, "LEASE_MODEL_INVALID", "The model is unavailable");
    const selection = await getProviderCredentialsWithQuotaPreflight(
      modelInfo.provider,
      null,
      policy.apiKeyInfo.allowedConnections ?? [],
      modelInfo.model || parsed.data.model,
      {
        lease: {
          apiKeyId: policy.apiKeyInfo.id,
          context: { leaseOwnerId, generation: 1 },
          mode: "acquire",
        },
        materializeCredentials: false,
        reserveOAuthSession: false,
      }
    );
    if (!selection) {
      return error(
        409,
        "LEASE_NO_ELIGIBLE_CONNECTION",
        "No eligible connection satisfies the managed key policy"
      );
    }
    const failure = buildManagedLeaseSelectionErrorResponse(selection);
    if (failure) {
      for (const [name, value] of Object.entries(CORS_HEADERS)) failure.headers.set(name, value);
      return failure;
    }
    if (
      ("allRateLimited" in selection && selection.allRateLimited) ||
      ("allExpired" in selection && selection.allExpired)
    ) {
      return error(
        429,
        "LEASE_ELIGIBILITY_UNAVAILABLE",
        "Eligible connections are unavailable under current routing policy"
      );
    }
    const result = selection as ExclusiveLeaseSelectionResult;
    return json(200, lifecycle(result.exclusiveLease));
  } catch (cause) {
    if (isRuntimeProviderRetirementError(cause) || isCommonChatGptWebRetirementError(cause)) {
      return error(cause.status, cause.code, cause.message);
    }
    if (cause instanceof LeaseContextError) return error(cause.status, cause.code, cause.message);
    return error(503, "LEASE_SERVICE_UNAVAILABLE", "Lease service unavailable");
  }
}

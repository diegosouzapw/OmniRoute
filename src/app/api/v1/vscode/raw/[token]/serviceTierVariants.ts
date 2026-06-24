import { normalizeServiceTierId, type ServiceTierId } from "@/shared/utils/serviceTierLabels";
import { resolveFamilyFirstPublishedModelId } from "@/app/api/v1/vscode/raw/[token]/familyFirstModelIds";

const SERVICE_TIER_VARIANT_PATTERN = /__tier_(priority|flex)$/i;

export function parseVscodeServiceTierVariantModelId(modelId: string | null | undefined): {
  baseModelId: string;
  serviceTier?: ServiceTierId;
} {
  const rawModelId = typeof modelId === "string" ? modelId.trim() : "";
  if (!rawModelId) {
    return { baseModelId: "" };
  }

  const match = rawModelId.match(SERVICE_TIER_VARIANT_PATTERN);
  if (!match) {
    return { baseModelId: rawModelId };
  }

  const baseModelId = rawModelId.replace(SERVICE_TIER_VARIANT_PATTERN, "");
  const serviceTier = normalizeServiceTierId(match[1]);
  return serviceTier === "standard" ? { baseModelId } : { baseModelId, serviceTier };
}

export function stripVscodeServiceTierVariantModelId(modelId: string | null | undefined): string {
  return parseVscodeServiceTierVariantModelId(modelId).baseModelId;
}

export function resolveVscodeServiceTierRequest(
  body: Record<string, unknown>
): Record<string, unknown> {
  const rawModelId = typeof body.model === "string" ? body.model.trim() : "";
  if (!rawModelId) {
    return body;
  }

  const resolvedModelId = resolveFamilyFirstPublishedModelId(rawModelId);

  const { baseModelId, serviceTier } = parseVscodeServiceTierVariantModelId(resolvedModelId);
  if (!serviceTier) {
    if (resolvedModelId === rawModelId) {
      return body;
    }

    return {
      ...body,
      model: resolvedModelId,
    };
  }

  return {
    ...body,
    model: baseModelId,
    ...(body.service_tier === undefined ? { service_tier: serviceTier } : {}),
  };
}

export async function rewriteVscodeServiceTierRequest(request: Request): Promise<Request> {
  if (request.method !== "POST") {
    return request;
  }

  const body = await request
    .clone()
    .json()
    .catch(() => null);
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return request;
  }

  const rewrittenBody = resolveVscodeServiceTierRequest(body as Record<string, unknown>);
  if (rewrittenBody === body) {
    return request;
  }

  const headers = new Headers(request.headers);
  headers.delete("content-length");

  return new Request(request.url, {
    method: request.method,
    headers,
    body: JSON.stringify(rewrittenBody),
  });
}

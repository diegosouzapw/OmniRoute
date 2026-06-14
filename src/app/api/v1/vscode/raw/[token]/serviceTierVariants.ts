import { CODEX_FAST_TIER_DEFAULT_SUPPORTED_MODELS } from "@/lib/providers/codexFastTier";
import { normalizeServiceTierId, type ServiceTierId } from "@/shared/utils/serviceTierLabels";
import { resolveFamilyFirstPublishedModelId } from "@/app/api/v1/vscode/raw/[token]/familyFirstModelIds";

const SERVICE_TIER_VARIANT_PATTERN = /__tier_(priority|flex)$/i;
const SUPPORTED_VSCODE_SERVICE_TIERS: readonly ServiceTierId[] = ["priority", "flex"];

export type VscodeServiceTierModelLike = {
  id?: string;
  name?: string;
  root?: string;
  owned_by?: string;
};

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

export function isVscodeServiceTierVariantModelId(modelId: string | null | undefined): boolean {
  return Boolean(parseVscodeServiceTierVariantModelId(modelId).serviceTier);
}

export function getVscodeServiceTierVariantModelId(
  baseModelId: string,
  serviceTier: ServiceTierId
): string {
  if (serviceTier === "standard") {
    return baseModelId;
  }
  return `${baseModelId}__tier_${serviceTier}`;
}

function getRawModelId(model: VscodeServiceTierModelLike): string {
  return (model.id || model.name || model.root || "").trim();
}

function getModelProvider(model: VscodeServiceTierModelLike, baseModelId: string): string {
  const owner = typeof model.owned_by === "string" ? model.owned_by.trim().toLowerCase() : "";
  if (owner) {
    return owner;
  }
  const prefix = baseModelId.split("/")[0]?.trim().toLowerCase() || "";
  return prefix;
}

function supportsCodexServiceTierModel(baseModelId: string): boolean {
  const normalizedModel = (baseModelId.split("/").pop() || baseModelId).trim().toLowerCase();
  if (!normalizedModel) {
    return false;
  }

  return CODEX_FAST_TIER_DEFAULT_SUPPORTED_MODELS.some((candidate) => {
    const normalizedCandidate = candidate.trim().toLowerCase();
    return normalizedModel === normalizedCandidate || normalizedModel.startsWith(normalizedCandidate);
  });
}

export function supportsVscodeServiceTierVariants(model: VscodeServiceTierModelLike): boolean {
  const rawModelId = getRawModelId(model);
  if (!rawModelId) {
    return false;
  }

  const baseModelId = stripVscodeServiceTierVariantModelId(rawModelId);
  const provider = getModelProvider(model, baseModelId);
  if (provider !== "codex" && provider !== "cx") {
    return false;
  }

  return supportsCodexServiceTierModel(baseModelId);
}

function cloneModelIdentifiers<T extends VscodeServiceTierModelLike>(
  model: T,
  modelId: string
): T {
  return {
    ...model,
    ...(model.id ? { id: modelId } : {}),
    ...(model.name ? { name: modelId } : {}),
    ...(model.root ? { root: modelId } : {}),
  };
}

export function expandVscodeServiceTierModels<T extends VscodeServiceTierModelLike>(models: T[]): T[] {
  const expanded: T[] = [];

  for (const model of models) {
    const rawModelId = getRawModelId(model);
    if (!rawModelId) {
      expanded.push(model);
      continue;
    }

    const baseModelId = stripVscodeServiceTierVariantModelId(rawModelId);
    const baseModel = rawModelId === baseModelId ? model : cloneModelIdentifiers(model, baseModelId);
    expanded.push(baseModel as T);

    if (!supportsVscodeServiceTierVariants(model)) {
      continue;
    }

    for (const serviceTier of SUPPORTED_VSCODE_SERVICE_TIERS) {
      expanded.push(cloneModelIdentifiers(baseModel as T, getVscodeServiceTierVariantModelId(baseModelId, serviceTier)));
    }
  }

  return expanded;
}

export function getVscodeServiceTierVariantSuffix(serviceTier: ServiceTierId | undefined): string {
  if (serviceTier === "priority") {
    return "Fast";
  }
  if (serviceTier === "flex") {
    return "Flex";
  }
  return "Default";
}

export function resolveVscodeServiceTierRequest(body: Record<string, unknown>): Record<string, unknown> {
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

  const body = await request.clone().json().catch(() => null);
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

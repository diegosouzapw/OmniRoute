const FAMILY_FIRST_MODEL_PATTERN =
  /^((?:gpt-[a-z0-9._-]+|claude[a-z0-9._-]*))(?:__provider_([a-z0-9-]+))(?:__tier_(priority|flex))?$/i;
const TIER_SUFFIX_PATTERN = /(__tier_(?:priority|flex))$/i;

function normalizeFamily(value: string | null | undefined) {
  return typeof value === "string" ? value.trim() : "";
}

function splitActualModelId(modelId: string) {
  const trimmedModelId = modelId.trim();
  const slashIndex = trimmedModelId.indexOf("/");
  if (slashIndex <= 0 || slashIndex === trimmedModelId.length - 1) {
    return null;
  }

  return {
    providerPrefix: trimmedModelId.slice(0, slashIndex),
    providerModelId: trimmedModelId.slice(slashIndex + 1),
  };
}

function extractTierSuffix(modelId: string) {
  const match = modelId.match(TIER_SUFFIX_PATTERN);
  return match?.[1] || "";
}

function stripTierSuffix(modelId: string) {
  return modelId.replace(TIER_SUFFIX_PATTERN, "");
}

function isFamilyFirstEligibleFamily(family: string) {
  const normalized = family.toLowerCase();
  return normalized.startsWith("gpt-") || normalized.startsWith("claude");
}

export function getFamilyFirstPublishedModelId(
  actualModelId: string,
  family: string | null | undefined
) {
  const normalizedFamily = normalizeFamily(family);
  if (!normalizedFamily || !isFamilyFirstEligibleFamily(normalizedFamily)) {
    return actualModelId;
  }

  const parts = splitActualModelId(actualModelId);
  if (!parts) {
    return actualModelId;
  }

  const tierSuffix = extractTierSuffix(parts.providerModelId);
  const providerModelBase = stripTierSuffix(parts.providerModelId);
  if (providerModelBase !== normalizedFamily) {
    return actualModelId;
  }

  return `${normalizedFamily}__provider_${parts.providerPrefix}${tierSuffix}`;
}

export function resolveFamilyFirstPublishedModelId(modelId: string | null | undefined) {
  const trimmedModelId = typeof modelId === "string" ? modelId.trim() : "";
  if (!trimmedModelId) {
    return trimmedModelId;
  }

  const match = trimmedModelId.match(FAMILY_FIRST_MODEL_PATTERN);
  if (!match) {
    return trimmedModelId;
  }

  const [, family, providerPrefix, serviceTier] = match;
  const tierSuffix = serviceTier ? `__tier_${serviceTier.toLowerCase()}` : "";
  return `${providerPrefix}/${family}${tierSuffix}`;
}

export function getFamilyFirstModelCandidates(
  actualModelId: string,
  family: string | null | undefined
) {
  const normalizedFamily = normalizeFamily(family);
  const candidates = new Set<string>([actualModelId]);
  const publishedModelId = getFamilyFirstPublishedModelId(actualModelId, normalizedFamily);
  if (publishedModelId !== actualModelId) {
    candidates.add(publishedModelId);
  }

  if (normalizedFamily && isFamilyFirstEligibleFamily(normalizedFamily)) {
    const tierSuffix = extractTierSuffix(actualModelId);
    candidates.add(`${normalizedFamily}${tierSuffix}`);
  }

  return [...candidates];
}

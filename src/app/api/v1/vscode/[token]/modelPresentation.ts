import { parseModel } from "@omniroute/open-sse/services/model";
import {
  getCanonicalModelMetadata,
  type CanonicalModelMetadata,
} from "@/lib/modelMetadataRegistry";
import {
  getVscodeServiceTierVariantSuffix,
  parseVscodeServiceTierVariantModelId,
  supportsVscodeServiceTierVariants,
} from "@/app/api/v1/vscode/[token]/serviceTierVariants";
import { getReasoningVariantBaseModelId } from "@/app/api/v1/vscode/[token]/reasoningMetadata";
import { resolveFamilyFirstPublishedModelId } from "@/app/api/v1/vscode/[token]/familyFirstModelIds";
type VscodeCatalogModel = {
  id?: string;
  name?: string;
  root?: string;
  owned_by?: string;
};

const PROVIDER_NAME_OVERRIDES: Record<string, string> = {
  codex: "Codex",
  cx: "Codex",
  github: "GitHub",
  gh: "GitHub",
  gemini: "Gemini",
};

function tokenize(value: string) {
  return value
    .toLowerCase()
    .split(/[^a-z0-9]+/i)
    .map((part) => part.trim())
    .filter((part) => part.length >= 4);
}

function getProviderPrefix(metadata: CanonicalModelMetadata | null) {
  const providerKey = metadata?.providerAlias || metadata?.provider || "";
  if (providerKey && PROVIDER_NAME_OVERRIDES[providerKey]) {
    return PROVIDER_NAME_OVERRIDES[providerKey];
  }

  const providerLabel = metadata?.providerLabel?.trim() || null;
  if (!providerLabel) {
    return null;
  }
  if (/codex/i.test(providerLabel)) {
    return "Codex";
  }
  if (/github/i.test(providerLabel)) {
    return "GitHub";
  }
  if (/gemini/i.test(providerLabel)) {
    return "Gemini";
  }

  return providerLabel;
}

function normalizeDisplayNameBranding(displayName: string) {
  return displayName
    .replace(/^OpenAI\s+Codex\b/i, "Codex")
    .replace(/^GitHub\s+Copilot\b/i, "GitHub")
    .trim();
}

function stripLeadingProviderPrefix(displayName: string, providerPrefix: string | null) {
  if (!providerPrefix) {
    return displayName;
  }

  const escapedProviderPrefix = providerPrefix.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return displayName.replace(new RegExp(`^${escapedProviderPrefix}\\s+`, "i"), "").trim();
}

function looksLikeTechnicalModelName(value: string) {
  return /\/|__provider_|__tier_|^[a-z0-9-]+\/[a-z0-9._-]+$/i.test(value);
}

function humanizeModelIdentifier(modelId: string) {
  const identifier = (modelId.split("/").pop() || modelId).trim();
  if (!identifier) {
    return identifier;
  }

  return identifier
    .split(/[-_]+/)
    .filter(Boolean)
    .map((part) => {
      if (/^gpt$/i.test(part)) return "GPT";
      if (/^[0-9]+(?:\.[0-9]+)*$/.test(part)) return part;
      if (/^[a-z][0-9]$/i.test(part)) return part.toUpperCase();
      return part.charAt(0).toUpperCase() + part.slice(1);
    })
    .join(" ");
}

function resolveFriendlyBaseDisplayName(
  rawModelId: string,
  metadata: CanonicalModelMetadata | null,
  fallbackValue: string
) {
  const normalizedFallback = normalizeDisplayNameBranding(fallbackValue.trim());
  if (normalizedFallback && !looksLikeTechnicalModelName(normalizedFallback)) {
    return normalizedFallback;
  }

  const normalizedModelId = resolveFamilyFirstPublishedModelId(rawModelId);
  const parsedTierModel = parseVscodeServiceTierVariantModelId(normalizedModelId);
  const canonicalBaseModelId = getReasoningVariantBaseModelId(parsedTierModel.baseModelId);
  const parsed = parseModel(canonicalBaseModelId, "");
  const providerModelId =
    parsed.model ||
    (canonicalBaseModelId.includes("/")
      ? canonicalBaseModelId.split("/").slice(1).join("/")
      : canonicalBaseModelId) ||
    fallbackValue;

  return humanizeModelIdentifier(providerModelId);
}

function prefixDisplayName(displayName: string, providerPrefix: string | null) {
  const normalizedProviderPrefix = providerPrefix?.trim() || null;
  const normalizedDisplayName = normalizeDisplayNameBranding(displayName);

  if (!normalizedProviderPrefix) return normalizedDisplayName;

  const providerTokens = tokenize(normalizedProviderPrefix);
  if (providerTokens.length === 0) return normalizedDisplayName;

  const displayNameLower = normalizedDisplayName.toLowerCase();
  if (providerTokens.some((token) => displayNameLower.includes(token))) {
    return normalizedDisplayName;
  }

  return `${normalizedProviderPrefix} ${stripLeadingProviderPrefix(normalizedDisplayName, normalizedProviderPrefix)}`.trim();
}

export function resolveVscodeModelMetadata(model: VscodeCatalogModel) {
  const rawModelId = model.id || model.root || model.name || "";
  const normalizedModelId = resolveFamilyFirstPublishedModelId(rawModelId);
  const parsedTierModel = parseVscodeServiceTierVariantModelId(normalizedModelId);
  const canonicalBaseModelId = getReasoningVariantBaseModelId(parsedTierModel.baseModelId);
  const parsed = parseModel(canonicalBaseModelId, "");
  const provider = parsed.provider || model.owned_by || undefined;
  const providerModel =
    parsed.model ||
    (canonicalBaseModelId.includes("/")
      ? canonicalBaseModelId.split("/").slice(1).join("/")
      : canonicalBaseModelId) ||
    model.root ||
    model.id ||
    model.name ||
    undefined;

  return providerModel && provider
    ? getCanonicalModelMetadata({ provider, model: providerModel })
    : providerModel
      ? getCanonicalModelMetadata({ model: providerModel })
      : null;
}

export function getVscodeModelDisplayName(model: VscodeCatalogModel) {
  const rawModelId = model.id || model.root || model.name || "";
  const { serviceTier } = parseVscodeServiceTierVariantModelId(rawModelId);
  const metadata = resolveVscodeModelMetadata(model);
  const displayName = metadata?.displayName || model.name || model.id || model.root || "unknown";
  const prefixedDisplayName = prefixDisplayName(displayName, getProviderPrefix(metadata));
  const shouldShowTierSuffix = Boolean(serviceTier) || supportsVscodeServiceTierVariants(model);
  return shouldShowTierSuffix
    ? `${prefixedDisplayName} (${getVscodeServiceTierVariantSuffix(serviceTier)})`
    : prefixedDisplayName;
}

export function getVscodeModelGroupingKey(model: VscodeCatalogModel) {
  const metadata = resolveVscodeModelMetadata(model);
  return metadata?.qualifiedId || metadata?.model || model.id || model.name || model.root || "";
}

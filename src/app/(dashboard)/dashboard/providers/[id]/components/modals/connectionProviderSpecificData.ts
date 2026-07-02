import { parseExcludedModelsInput, parseRoutingTagsInput } from "../../providerPageHelpers";
import {
  assignCcCompatibleRequestDefaults,
  mergeCcCompatibleRequestDefaults,
} from "./ccCompatibleRequestDefaults";
import {
  assignQuotaScrapingProviderData,
  type QuotaScrapingFieldValues,
} from "./QuotaScrapingFields";

type FormData = QuotaScrapingFieldValues & {
  accountId: string;
  apiRegion: string;
  ccCompatibleContext1m: boolean;
  ccCompatibleRedactThinking: boolean;
  ccCompatibleSummarizeThinking: boolean;
  consoleApiKey: string;
  customUserAgent: string;
  cx: string;
  excludedModels: string;
  importFreeModelsOnly: boolean;
  passthroughModels: boolean;
  region: string;
  routingTags: string;
  tag?: string;
  validationModelId?: string;
};
type ProviderSpecificData = Record<string, unknown>;

export function buildAddProviderSpecificData(options: {
  provider?: string;
  formData: FormData;
  openRouterPreset: { applyTo: (target: ProviderSpecificData) => void };
  showFreeModelsToggle: boolean;
  isGooglePse: boolean;
  usesBaseUrl: boolean;
  validatedBaseUrl: string | null;
  showsRegion: boolean;
  defaultRegion: string;
  isGlm: boolean;
  isCloudflare: boolean;
  isCcCompatible?: boolean;
}) {
  const {
    provider,
    formData,
    openRouterPreset,
    showFreeModelsToggle,
    isGooglePse,
    usesBaseUrl,
    validatedBaseUrl,
    showsRegion,
    defaultRegion,
    isGlm,
    isCloudflare,
    isCcCompatible,
  } = options;
  const data: ProviderSpecificData = {};
  if (formData.customUserAgent.trim()) data.customUserAgent = formData.customUserAgent.trim();
  openRouterPreset.applyTo(data);
  if (formData.routingTags.trim()) data.tags = parseRoutingTagsInput(formData.routingTags);
  if (formData.excludedModels.trim()) {
    data.excludedModels = parseExcludedModelsInput(formData.excludedModels);
  }
  if (formData.passthroughModels) data.passthroughModels = true;
  if (showFreeModelsToggle && formData.importFreeModelsOnly) data.importFreeModelsOnly = true;
  if (provider === "bailian-coding-plan" && formData.consoleApiKey.trim()) {
    data.consoleApiKey = formData.consoleApiKey.trim();
  }
  assignQuotaScrapingProviderData(provider, formData, data);
  if (isGooglePse && formData.cx.trim()) data.cx = formData.cx.trim();
  if (usesBaseUrl) data.baseUrl = validatedBaseUrl;
  else if (showsRegion) data.region = formData.region.trim() || defaultRegion;
  else if (isGlm) data.apiRegion = formData.apiRegion;
  else if (isCloudflare && formData.accountId.trim()) data.accountId = formData.accountId.trim();
  if (isCcCompatible) assignCcCompatibleRequestDefaults(data, formData);
  return Object.keys(data).length > 0 ? data : undefined;
}

export function assignEditApiKeyProviderSpecificData(options: {
  provider: string;
  formData: FormData;
  target: ProviderSpecificData;
  extraApiKeys: string[];
  openRouterPreset: { getPatch: () => ProviderSpecificData };
  usesBaseUrl: boolean;
  validatedBaseUrl: string | null;
  showsRegion: boolean;
  defaultRegion: string;
  isGlm: boolean;
  isCloudflare: boolean;
  supportsGoogleProjectId: boolean;
  trimmedCloudCodeProjectId: string;
  isGooglePse: boolean;
  isCcCompatible: boolean;
}) {
  const o = options;
  Object.assign(o.target, {
    extraApiKeys: o.extraApiKeys.filter((key) => key.trim().length > 0),
    tag: o.formData.tag.trim() || undefined,
    tags: parseRoutingTagsInput(o.formData.routingTags),
    excludedModels: parseExcludedModelsInput(o.formData.excludedModels),
    customUserAgent: o.formData.customUserAgent.trim(),
    ...o.openRouterPreset.getPatch(),
    ...(o.formData.passthroughModels ? { passthroughModels: true } : {}),
  });
  if (o.provider === "bailian-coding-plan") {
    o.target.consoleApiKey = o.formData.consoleApiKey.trim() || undefined;
  }
  assignQuotaScrapingProviderData(o.provider, o.formData, o.target);
  if (o.formData.validationModelId) o.target.validationModelId = o.formData.validationModelId;
  if (o.isGooglePse) o.target.cx = o.formData.cx.trim() || undefined;
  if (o.usesBaseUrl) o.target.baseUrl = o.validatedBaseUrl;
  else if (o.showsRegion) o.target.region = o.formData.region.trim() || o.defaultRegion;
  else if (o.isGlm) o.target.apiRegion = o.formData.apiRegion;
  else if (o.isCloudflare && o.formData.accountId.trim()) {
    o.target.accountId = o.formData.accountId.trim();
  }
  if (o.supportsGoogleProjectId) o.target.projectId = o.trimmedCloudCodeProjectId || null;
  if (o.isCcCompatible) {
    o.target.requestDefaults = mergeCcCompatibleRequestDefaults(
      o.target.requestDefaults,
      o.formData
    );
  }
}

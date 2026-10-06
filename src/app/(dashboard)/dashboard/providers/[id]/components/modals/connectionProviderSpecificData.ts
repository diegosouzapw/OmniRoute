import { parseExcludedModelsInput, parseRoutingTagsInput } from "../../providerInputParsers";
import {
  assignCcCompatibleRequestDefaults,
  mergeCcCompatibleRequestDefaults,
} from "./ccCompatibleRequestDefaults";
import { applyM365Tier, isM365TierCapableProvider, type M365TierValue } from "./m365Tier";
import {
  assignQuotaScrapingProviderData,
  type QuotaScrapingFieldValues,
} from "./QuotaScrapingFields";
import {
  assignGlmTeamQuotaProviderData,
  type GlmTeamQuotaFieldValues,
} from "./glmTeamQuotaProviderData";

type FormData = QuotaScrapingFieldValues &
  GlmTeamQuotaFieldValues & {
    accountId: string;
    apiRegion: string;
    awsAccessKeyId: string;
    awsSessionToken: string;
    ccCompatibleContext1m: boolean;
    ccCompatibleRedactThinking: boolean;
    ccCompatibleSummarizeThinking: boolean;
    consoleApiKey: string;
    customUserAgent: string;
    cx: string;
    excludedModels: string;
    importFreeModelsOnly: boolean;
    m365Tier?: M365TierValue;
    newApiAggregatorBalance: boolean;
    newApiUserId: string;
    passthroughModels: boolean;
    quotaPerUnit: string;
    region: string;
    routingTags: string;
    tag?: string;
    validationModelId?: string;
    tunnelId: string;
    connectorName: string;
    runtimeKey?: string;
  };
type ProviderSpecificData = Record<string, unknown>;

// bailian-coding-plan reuses consoleApiKey as its console token; agentrouter (#6850)
// reuses the same generic field for its New-API System Access Token, paired with
// newApiUserId (the New-Api-User header value). See agentrouterQuotaFetcher.ts.
const CONSOLE_API_KEY_PROVIDERS = new Set(["bailian-coding-plan", "agentrouter"]);

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
  if (CONSOLE_API_KEY_PROVIDERS.has(provider ?? "") && formData.consoleApiKey.trim()) {
    data.consoleApiKey = formData.consoleApiKey.trim();
  }
  if (provider === "agentrouter" && formData.newApiUserId.trim()) {
    data.newApiUserId = formData.newApiUserId.trim();
  }
  assignQuotaScrapingProviderData(provider, formData, data);
  if (isGooglePse && formData.cx.trim()) data.cx = formData.cx.trim();
  if (provider === "aws-polly") {
    data.accessKeyId = formData.awsAccessKeyId.trim() || undefined;
    data.region = formData.region.trim() || "us-east-1";
    data.sessionToken = formData.awsSessionToken.trim() || undefined;
  } else if (usesBaseUrl) data.baseUrl = validatedBaseUrl;
  if (showsRegion) data.region = formData.region?.trim() || defaultRegion;
  else if (isGlm) {
    data.apiRegion = formData.apiRegion;
    assignGlmTeamQuotaProviderData(isGlm, formData, data);
  } else if (isCloudflare && formData.accountId.trim()) data.accountId = formData.accountId.trim();
  if (isCcCompatible) assignCcCompatibleRequestDefaults(data, formData);
  // #9415 — New-API / One-API / Sub2API aggregator balance detection
  if (formData.newApiAggregatorBalance) {
    data.newApiAggregatorBalance = true;
    if (formData.consoleApiKey.trim()) data.consoleApiKey = formData.consoleApiKey.trim();
    if (formData.newApiUserId.trim()) data.newApiUserId = formData.newApiUserId.trim();
    const parsedQuotaPerUnit = parseInt(formData.quotaPerUnit, 10);
    if (Number.isFinite(parsedQuotaPerUnit) && parsedQuotaPerUnit > 0) {
      data.quotaPerUnit = parsedQuotaPerUnit;
    }
  }
  if (provider === "chatgpt-web-codex") {
    if (formData.tunnelId.trim()) data.tunnelId = formData.tunnelId.trim();
    if (formData.connectorName.trim()) data.connectorName = formData.connectorName.trim();
  }
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
  isAntigravityFamily: boolean;
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
  if (CONSOLE_API_KEY_PROVIDERS.has(o.provider)) {
    o.target.consoleApiKey = o.formData.consoleApiKey.trim() || undefined;
  }
  if (o.provider === "agentrouter") {
    o.target.newApiUserId = o.formData.newApiUserId.trim() || undefined;
  }
  assignQuotaScrapingProviderData(o.provider, o.formData, o.target);
  if (o.formData.validationModelId) o.target.validationModelId = o.formData.validationModelId;
  if (o.isGooglePse) o.target.cx = o.formData.cx.trim() || undefined;
  if (o.provider === "aws-polly") {
    o.target.accessKeyId = o.formData.awsAccessKeyId.trim() || undefined;
    o.target.region = o.formData.region.trim() || "us-east-1";
    o.target.sessionToken = o.formData.awsSessionToken.trim() || undefined;
  } else if (o.usesBaseUrl) o.target.baseUrl = o.validatedBaseUrl;
  if (o.showsRegion) o.target.region = o.formData.region?.trim() || o.defaultRegion;
  else if (o.isGlm) {
    o.target.apiRegion = o.formData.apiRegion;
    assignGlmTeamQuotaProviderData(o.isGlm, o.formData, o.target);
  } else if (o.isCloudflare && o.formData.accountId.trim()) {
    o.target.accountId = o.formData.accountId.trim();
  }
  if (o.isAntigravityFamily) o.target.projectId = o.trimmedCloudCodeProjectId || null;
  if (isM365TierCapableProvider(o.provider)) applyM365Tier(o.target, o.formData.m365Tier ?? "");
  if (o.isCcCompatible) {
    o.target.requestDefaults = mergeCcCompatibleRequestDefaults(
      o.target.requestDefaults,
      o.formData
    );
  }
  // #9415 — New-API / One-API / Sub2API aggregator balance detection
  if (o.formData.newApiAggregatorBalance) {
    o.target.newApiAggregatorBalance = true;
    o.target.consoleApiKey = o.formData.consoleApiKey.trim() || undefined;
    o.target.newApiUserId = o.formData.newApiUserId.trim() || undefined;
    const parsedQuotaPerUnit = parseInt(o.formData.quotaPerUnit, 10);
    if (Number.isFinite(parsedQuotaPerUnit) && parsedQuotaPerUnit > 0) {
      o.target.quotaPerUnit = parsedQuotaPerUnit;
    } else {
      o.target.quotaPerUnit = undefined;
    }
  } else {
    o.target.newApiAggregatorBalance = undefined;
    o.target.quotaPerUnit = undefined;
  }
  if (o.provider === "chatgpt-web-codex") {
    o.target.tunnelId = o.formData.tunnelId.trim() || undefined;
    o.target.connectorName = o.formData.connectorName.trim() || undefined;
  }
}

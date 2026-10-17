import { CHATGPT_WEB_CODEX_CONNECTOR_NAME } from "@/shared/constants/chatgptWebCodex";
import { defaultValidationModelIdForProvider } from "../../providerPageHelpers";
import { computeConnectionDefaultName } from "./computeConnectionDefaultName";
import { EMPTY_QUOTA_SCRAPING_FIELDS } from "./QuotaScrapingFields";
import { EMPTY_GLM_TEAM_QUOTA_FIELDS } from "./GlmTeamQuotaFields";

export interface AddApiKeyInitialFormContext {
  provider?: string;
  existingConnectionNames: string[];
  initialBaseUrl?: string;
  defaultBaseUrl: string;
  showsRegion: boolean;
  defaultRegion: string;
}

/**
 * Fresh form state for the Add API key modal. Used both as the initial state and
 * on every open, so a reopened modal never shows the credentials of a previous
 * add. The default name is recomputed from the live connection names each time
 * so a second key does not reuse an existing name (#6499, #11033, #15006).
 */
export function createInitialAddApiKeyFormData({
  provider,
  existingConnectionNames,
  initialBaseUrl,
  defaultBaseUrl,
  showsRegion,
  defaultRegion,
}: AddApiKeyInitialFormContext) {
  return {
    name: computeConnectionDefaultName(existingConnectionNames),
    apiKey: "",
    tokenSecret: "", // #5446 — Modal Token Secret (joined with apiKey as id:secret)
    defaultModel: "",
    priority: 1,
    baseUrl: initialBaseUrl || defaultBaseUrl,
    cx: "",
    region: showsRegion ? defaultRegion : "",
    awsAccessKeyId: "",
    awsSessionToken: "",
    apiRegion: "international",
    validationModelId: defaultValidationModelIdForProvider(provider), // #5446 item 4 — Modal probe model pre-fill
    routingTags: "",
    excludedModels: "",
    customUserAgent: "",
    huggingfaceBillTo: "",
    accountId: "",
    consoleApiKey: "",
    newApiUserId: "",
    newApiAggregatorBalance: false,
    quotaPerUnit: "",
    ...EMPTY_GLM_TEAM_QUOTA_FIELDS,
    ...EMPTY_QUOTA_SCRAPING_FIELDS,
    ccCompatibleContext1m: false,
    ccCompatibleRedactThinking: false,
    ccCompatibleSummarizeThinking: false,
    passthroughModels: false,
    importFreeModelsOnly: false,
    commandCodeZdrEnabled: false,
    tunnelId: "",
    runtimeKey: "",
    connectorName: CHATGPT_WEB_CODEX_CONNECTOR_NAME,
  };
}

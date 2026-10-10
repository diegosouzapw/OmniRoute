/**
 * Atlas Cloud (https://www.atlascloud.ai) — OpenAI-compatible aggregator gateway.
 * Extracted from the frozen gateways hub so that file stays at the release-tip ceiling.
 */
export const APIKEY_PROVIDERS_ATLASCLOUD = {
  atlascloud: {
    id: "atlascloud",
    serviceKinds: ["llm"],
    alias: "atlascloud",
    name: "Atlas Cloud",
    icon: "hub",
    color: "#7036F0",
    textIcon: "AC",
    passthroughModels: true,
    website: "https://www.atlascloud.ai",
    // Paid per token from the account balance, so no Free badge.
    hasFree: false,
    apiHint:
      "Create an API key at https://console.atlascloud.ai/api-keys, then use https://api.atlascloud.ai/v1 as the OpenAI-compatible base URL. Model ids are vendor-prefixed (for example deepseek-ai/deepseek-v4-flash or zai-org/glm-5.3). This entry covers the chat models; image and video generation use a separate Atlas Cloud API.",
  },
} as const;

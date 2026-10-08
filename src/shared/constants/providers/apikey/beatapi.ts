/**
 * BeatAPI (https://beatapi.io) — OpenAI-compatible aggregator gateway.
 * Extracted from the frozen gateways hub so that file stays at the release-tip ceiling.
 */
export const APIKEY_PROVIDERS_BEATAPI = {
  beatapi: {
    id: "beatapi",
    serviceKinds: ["llm"],
    alias: "beatapi",
    name: "BeatAPI",
    icon: "hub",
    color: "#2563EB",
    textIcon: "BA",
    passthroughModels: true,
    website: "https://beatapi.io",
    authHint: "Create an API key at https://beatapi.io/dashboard/apikeys, then paste it here.",
    apiHint:
      "OpenAI-compatible base URL: https://api.beatapi.io/v1. Available models depend on your account; check the live model list before selecting one.",
  },
};

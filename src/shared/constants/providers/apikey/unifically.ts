/**
 * Unifically API-key catalog entry. Kept out of gateways.ts so that frozen file
 * does not grow past its 1544-line ceiling (#14182).
 */
export const unificallyGateway = {
  unifically: {
    id: "unifically",
    serviceKinds: ["llm"],
    alias: "unifically",
    name: "Unifically",
    icon: "hub",
    color: "#10B981",
    textIcon: "UNI",
    passthroughModels: true,
    website: "https://unifically.com",
    // New accounts get a small one-time starting balance, not a recurring free
    // tier, so no Free badge.
    hasFree: false,
    // Only the chat models are wired here. The image, video and audio models in
    // the same catalog run through an async task API (POST /v1/tasks), which
    // the default executor does not speak.
    apiHint:
      "Create a Unifically API key at https://unifically.com/api-keys, then use https://api.unifically.com/v1 as the OpenAI-compatible base URL. Pay per use, no subscription. Chat models only through this entry; the media models in the same catalog use a separate async task API.",
  },
} as const;

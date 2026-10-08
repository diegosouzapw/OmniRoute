/**
 * Gondola API-key catalog entry. Kept out of gateways.ts so that frozen file
 * does not grow past its line ceiling (#15554).
 */
export const gondolaGateway = {
  gondola: {
    id: "gondola",
    serviceKinds: ["llm"],
    alias: "gondola",
    name: "Gondola",
    icon: "sailing",
    color: "#C9A96A",
    textIcon: "GD",
    passthroughModels: true,
    website: "https://gondola-ai.com",
    // Prepaid, not a free tier. Requests draw down a USDC balance, so the
    // picker must not show a "Free" badge.
    hasFree: false,
    freeNote: "No free allowance. Credit is prepaid in USDC on Base and billed per request.",
    apiHint:
      "Top up with USDC on Base and create a key at https://gondola-ai.com/keys, then use https://api.gondola-ai.com/v1 as the OpenAI-compatible base URL.",
  },
} as const;

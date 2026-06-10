export const OMNIROUTE_RESPONSE_HEADERS = {
  cache: "X-OmniRoute-Cache",
  cacheHit: "X-OmniRoute-Cache-Hit",
  fallbackAttempts: "X-OmniRoute-Fallback-Attempts",
  latencyMs: "X-OmniRoute-Latency-Ms",
  model: "X-OmniRoute-Model",
  progress: "X-OmniRoute-Progress",
  provider: "X-OmniRoute-Provider",
  responseCost: "X-OmniRoute-Response-Cost",
  tokensIn: "X-OmniRoute-Tokens-In",
  tokensOut: "X-OmniRoute-Tokens-Out",
} as const;

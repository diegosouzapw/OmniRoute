/**
 * onomeo API-key catalog entry. Kept out of gateways.ts so that frozen file
 * does not grow past its 1544-line ceiling (#14297).
 */
export const onomeoGateway = {
  onomeo: {
    id: "onomeo",
    serviceKinds: ["llm"],
    alias: "onomeo",
    name: "onomeo",
    icon: "router",
    color: "#C2410C",
    textIcon: "ONO",
    passthroughModels: true,
    website: "https://onomeo.com",
    // Since 2026-10-06 there are no site credits or daily check-in: about 30 free models
    // are metered by calls (per account and per key, inside a site-wide pool shared by all
    // accounts); large models are paid from a USD balance.
    hasFree: true,
    freeNote:
      "Sign in (email code, Google or GitHub, no card). About 30 free models are metered by calls: 30 calls per 5 hours per account and 12 requests/min per key, within a site-wide pool shared by all accounts. Claude, GPT and other large models are paid from a USD balance at per-model prices; during the beta an account can spend at most $0.50/day on them. Optional top-up from $5 (balance never expires, no auto-renewal) raises the free-model limit to 90 calls per 5 hours for 35 days.",
    // onomeo routes to third-party upstreams; some may train on prompts, and each
    // model page on onomeo.com says which.
    apiHint:
      "Create an API key on the onomeo dashboard, then use https://onomeo.com/v1 as the OpenAI-compatible base URL. Models are served by third-party upstreams, some of which may train on prompts; each model page on onomeo.com states this. onomeo is in public beta: not every feature is guaranteed to work, and feedback is welcome at https://onomeo.com/feedback.",
  },
} as const;

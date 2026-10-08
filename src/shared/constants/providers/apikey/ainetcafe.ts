/**
 * ainetcafe API-key catalog entry. Kept out of gateways.ts so that frozen file
 * does not grow past its 1544-line ceiling (#13862).
 */
export const ainetcafeGateway = {
  ainetcafe: {
    id: "ainetcafe",
    serviceKinds: ["llm"],
    alias: "ainetcafe",
    name: "ainetcafe",
    icon: "bolt",
    color: "#32FEA5",
    textIcon: "AIN",
    passthroughModels: true,
    website: "https://ainetcafe.com/k3/",
    // New accounts receive a small sign-up credit ($2 at the time of writing)
    // that is spendable on inference; amount and eligibility are set by
    // ainetcafe, not OmniRoute. Inference is otherwise billed per token.
    hasFree: true,
    freeNote:
      "Sign-up credit toward available models; amount and eligibility are set by ainetcafe, not OmniRoute.",
    apiHint:
      "Create an API key in the ainetcafe console (Token Management), then use https://microquickjs.com/v1 as the OpenAI-compatible base URL. Kimi K3 is served as model ID Kimi-K3.",
  },
} as const;

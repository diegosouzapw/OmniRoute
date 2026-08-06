/**
 * Audited free-tier gateway entries kept separate from the legacy gateway catalog
 * so the file-size ratchet remains modular.
 */
export const APIKEY_PROVIDERS_AUDITED_FREE = {
  "zylo-api": {
    id: "zylo-api",
    alias: "zylo",
    name: "Zylo API",
    icon: "hub",
    color: "#2563EB",
    textIcon: "ZY",
    passthroughModels: true,
    website: "https://zyloai.net",
    hasFree: true,
    freeNote:
      "Basic plan: 10 RPM, 7,200 requests/day and 200,000 tokens/day; limited to Basic text models.",
    apiHint:
      "Create a free Zylo API key at https://zyloai.net, then use https://api.zyloai.net/v1 as the OpenAI-compatible base URL.",
  },
  unorouter: {
    id: "unorouter",
    alias: "unorouter",
    name: "UnoRouter",
    icon: "router",
    color: "#7C3AED",
    textIcon: "UR",
    passthroughModels: true,
    website: "https://unorouter.com",
    hasFree: true,
    freeNote:
      "Models with the :free suffix do not debit balance; limit is 1 request/minute per free model per user.",
    apiHint:
      "Create an UnoRouter token, then use https://api.unorouter.com/v1 as the OpenAI-compatible base URL.",
  },
  fastrouter: {
    id: "fastrouter",
    alias: "fastrouter",
    name: "FastRouter",
    icon: "speed",
    color: "#F97316",
    textIcon: "FR",
    passthroughModels: true,
    website: "https://fastrouter.ai",
    hasFree: true,
    freeNote:
      "Models with the :free suffix allow 10 requests/day per organization and model; availability may change.",
    apiHint:
      "Create a FastRouter API key, then use https://api.fastrouter.ai/api/v1 as the OpenAI-compatible base URL.",
  },
  anyapi: {
    id: "anyapi",
    alias: "anyapi",
    name: "AnyAPI AI",
    icon: "hub",
    color: "#0EA5E9",
    textIcon: "AA",
    passthroughModels: true,
    website: "https://anyapi.ai",
    hasFree: true,
    freeNote:
      "Free plan: 100,000 ANY Tokens/day and 100 RPM for eligible Free/Basic models; no credit card required.",
    apiHint:
      "Create and verify an AnyAPI account, then use https://api.anyapi.ai/v1 as the OpenAI-compatible base URL.",
  },
  electronhub: {
    id: "electronhub",
    alias: "electronhub",
    name: "Electron Hub",
    icon: "hub",
    color: "#22C55E",
    textIcon: "EH",
    passthroughModels: true,
    website: "https://www.electronhub.ai",
    hasFree: true,
    freeNote:
      "Free plan: 5 RPM, $0.25 weekly credits and 10 Neutrinos/day for :free models; family budgets also apply.",
    apiHint:
      "Create a free API key at https://app.electronhub.ai, then use https://api.electronhub.ai/v1 as the OpenAI-compatible base URL.",
  },
  llmgateway: {
    id: "llmgateway",
    alias: "llmgateway",
    name: "LLM Gateway",
    icon: "router",
    color: "#6366F1",
    textIcon: "LG",
    passthroughModels: true,
    website: "https://llmgateway.io",
    hasFree: true,
    freeNote:
      "Hosted Free plan: free-priced models are limited to 5 requests per 10 minutes when the account has no credits.",
    apiHint:
      "Create an LLM Gateway API key, then use https://api.llmgateway.io/v1 as the OpenAI-compatible base URL.",
  },
  "llm-kiwi": {
    id: "llm-kiwi",
    alias: "llmkiwi",
    name: "LLM.Kiwi",
    icon: "hub",
    color: "#84CC16",
    textIcon: "LK",
    passthroughModels: true,
    website: "https://llm.kiwi",
    hasFree: true,
    freeNote:
      "Free plan exposes auto and hrLLM; the published 40 requests/hour limit applies to hrLLM.",
    apiHint:
      "Create a free LLM.Kiwi key, then use https://api.llm.kiwi/v1 as the OpenAI-compatible base URL.",
  },
  literouter: {
    id: "literouter",
    alias: "literouter",
    name: "LiteRouter",
    icon: "router",
    color: "#2563EB",
    textIcon: "LR",
    passthroughModels: true,
    website: "https://literouter.com",
    hasFree: true,
    freeNote:
      "Free model variants use the :free suffix; daily credit limits vary by model and free input is capped at 5,000 tokens.",
    apiHint:
      "Create a LiteRouter API key, then use https://api.literouter.com/v1 as the OpenAI-compatible base URL.",
  },
  "mnn-ai": {
    id: "mnn-ai",
    alias: "mnn-ai",
    name: "MNN AI",
    icon: "hub",
    color: "#0F766E",
    textIcon: "MNN",
    passthroughModels: true,
    website: "https://mnnai.ru",
    hasFree: true,
    freeNote: "Free plan: $1 monthly credits, 10 RPM and access only to models marked Free.",
    apiHint:
      "Create an MNN AI API key, then use the primary https://api.mnnai.ru/v1 OpenAI-compatible endpoint. Review jurisdiction, privacy and regional data-transfer requirements before use.",
  },
  "meganova-ai": {
    id: "meganova-ai",
    alias: "meganova-ai",
    name: "MegaNova AI",
    icon: "router",
    color: "#7C3AED",
    textIcon: "MN",
    passthroughModels: true,
    website: "https://meganova.ai",
    hasFree: true,
    freeNote:
      "Free signup without a card. Published Tier 1 per-model quotas total 550 requests/day; they are not a shared global pool, and paid overage can apply if enabled.",
    apiHint:
      "Create a MegaNova API key, then use https://api.meganova.ai/v1 as the OpenAI-compatible base URL.",
  },
  mixlayer: {
    id: "mixlayer",
    alias: "mixlayer",
    name: "Mixlayer",
    icon: "router",
    color: "#0EA5E9",
    textIcon: "MX",
    passthroughModels: true,
    website: "https://www.mixlayer.com",
    hasFree: true,
    freeNote:
      "The qwen/qwen3.5-4b-free model is free for prototyping and rate-limited; no fixed public RPM or daily quota is confirmed.",
    apiHint:
      "Create a Mixlayer API key, then use https://models.mixlayer.ai/v1 as the OpenAI-compatible base URL.",
  },
  speka: {
    id: "speka",
    alias: "speka",
    name: "Speka AI",
    icon: "router",
    color: "#DB2777",
    textIcon: "SP",
    passthroughModels: true,
    website: "https://speka.me",
    hasFree: true,
    freeNote:
      "Free plan: $1 monthly usage, 10 RPM, one API key and access to open models and the playground; no card required.",
    apiHint:
      "Create a Speka API key, then use https://speka.me/v1 as the OpenAI-compatible base URL. Confirm current model availability and overage settings before use.",
  },
  tokenreply: {
    id: "tokenreply",
    alias: "tokenreply",
    name: "TokenReply",
    icon: "router",
    color: "#3B82F6",
    textIcon: "TR",
    passthroughModels: true,
    website: "https://www.tokenreply.com",
    hasFree: true,
    freeNote:
      "Free-tagged models have model- and campaign-specific daily limits; no fixed global free quota is published.",
    apiHint:
      "Create a TokenReply token, then use https://api.tokenreply.com/v1 as the OpenAI-compatible base URL and confirm the selected model's current limit.",
  },
  "yolo-auto": {
    id: "yolo-auto",
    alias: "yolo-auto",
    name: "Yolo-Auto",
    icon: "auto_awesome",
    color: "#F59E0B",
    textIcon: "YA",
    passthroughModels: true,
    website: "https://yolo-auto.com",
    hasFree: true,
    freeNote:
      "Free API access is request-limited and intended for testing; no numeric daily quota is published and free access is not promised indefinitely.",
    apiHint:
      "Create a yolo_ API key, then use https://yolo-auto.com/v1 as the OpenAI-compatible base URL.",
  },
  dxnt: {
    id: "dxnt",
    alias: "dxnt",
    name: "DXNT / DX Token",
    icon: "hub",
    color: "#111827",
    textIcon: "DX",
    passthroughModels: true,
    website: "https://www.dxnt.com",
    hasFree: true,
    freeNote:
      "Free accounts are documented at 100 calls/day; the quota may increase through invitations and can vary by account.",
    apiHint:
      "Create a DXNT API key, then use https://www.dxnt.com/v1 as the OpenAI-compatible base URL.",
  },
  "cloudcode-one": {
    id: "cloudcode-one",
    alias: "cloudcode-one",
    name: "CloudCode.ONE",
    icon: "router",
    color: "#6366F1",
    textIcon: "CC",
    passthroughModels: true,
    website: "https://cloudcode.one",
    hasFree: true,
    freeNote:
      "Published free models include glm-4.7-flash and glm-4.6v-flash; no numeric quota is published, and key creation may require credit or a coupon.",
    apiHint:
      "Create a CloudCode.ONE key, then use https://api.cloudcode.one/v1 as the OpenAI-compatible base URL. Key issuance may require credit or a coupon.",
  },
  ofoxai: {
    id: "ofoxai",
    alias: "ofoxai",
    name: "OfoxAI",
    icon: "router",
    color: "#0F766E",
    textIcon: "OF",
    passthroughModels: true,
    website: "https://ofox.ai",
    hasFree: true,
    freeNote:
      "The current catalog advertises 10+ free models without a public numeric quota; review upstream provenance, retention and training terms before production use.",
    apiHint:
      "Create an OfoxAI Bearer key, then use https://api.ofox.ai/v1 as the OpenAI-compatible base URL. This integration covers the OpenAI surface only.",
  },
  zerolimitai: {
    id: "zerolimitai",
    alias: "zerolimitai",
    name: "ZeroLimitAI",
    icon: "router",
    color: "#475569",
    textIcon: "ZL",
    passthroughModels: true,
    website: "https://www.zerolimitai.com",
    hasFree: true,
    freeNote:
      "Temporary free trial is advertised, but official pages conflict between 3 and 7 days; a 100-calls/day claim is not treated as permanent.",
    apiHint:
      "Create a ZeroLimitAI Bearer token, then use https://www.zerolimitai.com/api/v1 as the OpenAI-compatible base URL.",
  },
  chatanywhere: {
    id: "chatanywhere",
    alias: "chatanywhere",
    name: "ChatAnywhere",
    icon: "router",
    color: "#2563EB",
    textIcon: "CA",
    passthroughModels: true,
    website: "https://chatanywhere.tech",
    hasFree: true,
    freeNote:
      "Personal, educational or research use only: public documentation cites 10,000 points/day and 200 requests/day per IP/key; do not use for commercial traffic.",
    apiHint:
      "Create a ChatAnywhere key linked to GitHub, then use https://api.chatanywhere.org/v1 outside China. Review the non-commercial terms before enabling it.",
  },
  helyxai: {
    id: "helyxai",
    alias: "helyxai",
    name: "Helyx AI",
    icon: "hub",
    color: "#7C3AED",
    textIcon: "HX",
    passthroughModels: true,
    website: "https://helyxai.space",
    hasFree: true,
    freeNote:
      "Operational Free plan documents 100,000 tokens/day; the site's separate 2M+ marketing claim conflicts and is not treated as a quota guarantee.",
    apiHint:
      "Create a Helyx AI Bearer key, then use https://helyxai.space/v1 as the OpenAI-compatible base URL. Review terms and data retention first.",
  },
  auriko: {
    id: "auriko",
    alias: "auriko",
    name: "Auriko",
    icon: "hub",
    color: "#0891B2",
    textIcon: "AU",
    passthroughModels: true,
    website: "https://www.auriko.ai",
    hasFree: true,
    freeNote:
      "Free plan publishes 1,000 Platform RPM and 10,000 BYOK RPM. Platform inference still passes through provider cost; this is not a free-token pool or unlimited free inference.",
    apiHint:
      "Create an Auriko key with the ak_ prefix, then use https://api.auriko.ai/v1 as the OpenAI-compatible base URL. BYOK and platform credits have different cost semantics.",
  },
  "poixe-ai": {
    id: "poixe-ai",
    alias: "poixe-ai",
    name: "Poixe AI",
    icon: "router",
    color: "#EA580C",
    textIcon: "PX",
    passthroughModels: true,
    website: "https://poixe.com",
    hasFree: true,
    freeNote:
      "Current public free limits are small and model-group specific: 2 RPM/5 RPD for large-cup models and 20 RPM/50 RPD for small-cup models.",
    apiHint:
      "Create a Poixe Bearer key, then use https://api.poixe.com/v1 as the OpenAI-compatible base URL. Treat free model provenance and regional availability as experimental.",
  },
  "naga-ai": {
    id: "naga-ai",
    alias: "naga-ai",
    name: "Naga AI",
    icon: "router",
    color: "#059669",
    textIcon: "NA",
    passthroughModels: true,
    website: "https://naga.ac",
    hasFree: true,
    freeNote:
      "Models marked :free are publicly listed, but no numeric quota is confirmed. Naga's policy warns that free-tier prompts and outputs may be collected or used for training.",
    apiHint:
      "Create a Naga AI Bearer key, then use https://api.naga.ac/v1 as the OpenAI-compatible base URL. Never send sensitive data to the free tier without accepting its training policy.",
  },
  "chat-oripe": {
    id: "chat-oripe",
    alias: "chat-oripe",
    name: "Chat Oripe",
    icon: "router",
    color: "#64748B",
    textIcon: "CO",
    passthroughModels: true,
    website: "https://api.oriper.com",
    hasFree: true,
    freeNote:
      "Official metadata advertises 2M tokens/month, but the public site and documentation were blocked during audit; treat the quota and brand mapping as unconfirmed.",
    apiHint:
      "Use https://api.oriper.com/v1 only after confirming the provider's current documentation, terms and key issuance. No quota is guaranteed by this catalog.",
  },
  freeinference: {
    id: "freeinference",
    alias: "freeinference",
    name: "FreeInference",
    icon: "science",
    color: "#8B5CF6",
    textIcon: "FI",
    passthroughModels: true,
    website: "https://freeinference.org",
    hasFree: true,
    freeNote:
      "Free research access without a card; non-Harvard applicants require manual approval and no numeric quota is publicly guaranteed.",
    apiHint:
      "Apply for a FreeInference key, then use https://freeinference.org/v1 as the OpenAI-compatible base URL. Terms allow prompt/response logging and possible publication of anonymized research data; never send sensitive or production data.",
  },
  "free-ai": {
    id: "free-ai",
    alias: "free-ai",
    name: "Free.ai",
    icon: "hub",
    color: "#16A34A",
    textIcon: "FA",
    passthroughModels: true,
    website: "https://free.ai",
    hasFree: true,
    freeNote:
      "30,000 tokens/day cover self-hosted models after email verification. Usage beyond the pool can bill at raw cost, and premium external models are paid.",
    apiHint:
      "Create an sk-free- key, then use the nonstandard but OpenAI-shaped https://api.free.ai/v1/chat/ endpoint. Select a self-hosted zero-price model to stay within the free pool.",
  },
  "void-ai": {
    id: "void-ai",
    alias: "void-ai",
    name: "Void AI",
    icon: "science",
    color: "#111827",
    textIcon: "VA",
    passthroughModels: true,
    website: "https://voidai.app",
    hasFree: true,
    freeNote:
      "The public model catalog marks some models with a free plan requirement, but access is conditional and no numeric quota is confirmed.",
    apiHint:
      "Use https://api.voidai.app/v1 only after confirming authentication, account eligibility and terms. Treat this integration as experimental until the blocked documentation becomes public.",
  },
  helixmind: {
    id: "helixmind",
    alias: "helixmind",
    name: "HelixMind",
    icon: "hub",
    color: "#4F46E5",
    textIcon: "HM",
    passthroughModels: true,
    website: "https://helixmind.online",
    hasFree: false,
    freeNote:
      "Previously circulated 3 RPM/50 RPD and no-card claims were not confirmed during the 2026-08-02 audit; current quota and billing require account verification.",
    apiHint:
      "Create a helix- key and use https://helixmind.online/v1. OpenAI requests use Bearer authentication; the Anthropic-compatible messages endpoint accepts x-api-key.",
  },
};

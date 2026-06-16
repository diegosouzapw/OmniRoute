import type { RegistryEntry } from "../../../shared.ts";

export const perplexity_webProvider: RegistryEntry = {
  id: "perplexity-web",
  alias: "pplx-web",
  format: "openai",
  executor: "perplexity-web",
  baseUrl: "https://www.perplexity.ai/rest/sse/perplexity_ask",
  authType: "apikey",
  authHeader: "cookie",
  models: [
    { id: "pplx-auto", name: "Perplexity Auto (Free)" },
    { id: "pplx-sonar", name: "Perplexity Sonar" },
    { id: "pplx-gpt", name: "GPT-5.5 (via Perplexity)" },
    { id: "pplx-gemini", name: "Gemini 3.1 Pro (via Perplexity)" },
    { id: "pplx-sonnet", name: "Claude Sonnet 4.6 (via Perplexity)" },
    { id: "pplx-opus", name: "Claude Opus 4.7 (via Perplexity)" },
    { id: "pplx-kimi", name: "Kimi K2.6 (via Perplexity)" },
    { id: "pplx-nemotron", name: "Nemotron 3 Super (via Perplexity)" },
  ],
};

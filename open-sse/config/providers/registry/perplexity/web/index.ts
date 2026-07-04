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
    { id: "pplx-auto", name: "Perplexity Best" },
    { id: "pplx-sonar", name: "Sonar 2 (via Perplexity)" },
    { id: "pplx-gpt-5.4", name: "GPT-5.4 (via Perplexity)" },
    { id: "pplx-gpt", name: "GPT-5.5 (via Perplexity)" },
    { id: "pplx-gemini", name: "Gemini 3.1 Pro (via Perplexity)" },
    { id: "pplx-sonnet", name: "Claude Sonnet 5.0 (via Perplexity)" },
    { id: "pplx-opus", name: "Claude Opus 4.8 (via Perplexity)" },
    { id: "pplx-glm", name: "GLM-5.2 (via Perplexity)" },
    { id: "pplx-kimi", name: "Kimi K2.6 (via Perplexity)" },
    { id: "pplx-nemotron", name: "Nemotron 3 Ultra (via Perplexity)" },
  ],
};

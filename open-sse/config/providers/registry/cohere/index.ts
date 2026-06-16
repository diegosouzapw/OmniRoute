import type { RegistryEntry } from "../../shared.ts";

export const cohereProvider: RegistryEntry = {
  id: "cohere",
  alias: "cohere",
  format: "openai",
  executor: "default",
  // Issue #2360: Cohere's native /v2/chat endpoint returns the upstream
  // proprietary shape ({ message: { content: [{type:"text", text:...}] } })
  // which the combo test validator (extractComboTestResponseText) does not
  // know how to read, surfacing as "Provider returned HTTP 200 but no text
  // content." Cohere also publishes an OpenAI-compatible compatibility
  // layer at /compatibility/v1 that returns the canonical
  // { choices: [{ message: { content: "..." } }] } shape, so we route
  // through it instead of needing a Cohere-specific response translator.
  baseUrl: "https://api.cohere.com/compatibility/v1/chat/completions",
  modelsUrl: "https://api.cohere.com/compatibility/v1/models",
  authType: "apikey",
  authHeader: "bearer",
  models: [
    { id: "command-a-reasoning-08-2025", name: "Command A Reasoning (Aug 2025)" },
    { id: "command-a-vision-07-2025", name: "Command A Vision (Jul 2025)" },
    { id: "command-a-03-2025", name: "Command A (Mar 2025)" },
    { id: "command-r7b-12-2024", name: "Command R7B (Dec 2024)" },
    { id: "command-r-plus-08-2024", name: "Command R Plus (Aug 2024)" },
    { id: "command-r-08-2024", name: "Command R (Aug 2024)" },
  ],
};

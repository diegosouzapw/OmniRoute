import type { RegistryEntry } from "../../shared.ts";
import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

/**
 * AI Horde — crowdsourced inference from volunteer GPU workers (aihorde.net),
 * reached through its OpenAI-compatible facade at oai.aihorde.net.
 *
 * Keyless: the literal `0000000000` is AI Horde's documented anonymous key, so
 * it is wired through `anonymousApiKey` (the same hook Kilo uses, #4019). A real
 * account key still works and buys higher queue priority via kudos.
 *
 * Three things make it unlike every other OpenAI-compatible provider:
 *  - Requests sit in a shared volunteer queue, so latency is minutes, not
 *    seconds — hence the 120s timeout instead of the default.
 *  - No tool calling: the workers run raw text-completion backends.
 *  - Throughput is NOT a quota. It depends on how many workers are online, so
 *    the free catalog registers it as `recurring-uncapped` (never summed into
 *    the token headline) rather than inventing an RPM/RPD figure.
 *
 * Model list changes as workers come and go, so the live catalog is fetched via
 * passthrough; the entries below are the ones that have carried steady worker
 * threads and only serve as a fallback when discovery fails.
 */
export const aihordeProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "aihorde",
  baseUrl: "https://oai.aihorde.net/v1/chat/completions",
  modelsUrl: "https://oai.aihorde.net/v1/models",
  passthroughModels: true,
  anonymousApiKey: "0000000000",
  timeoutMs: 120_000,
  models: [
    {
      id: "aphrodite/TheDrummer/Cydonia-24B-v4.3",
      name: "Cydonia 24B (AI Horde)",
      contextLength: 32768,
      toolCalling: false,
      unsupportedParams: ["tools", "tool_choice", "parallel_tool_calls"],
    },
    {
      id: "aphrodite/TheDrummer/Skyfall-31B-v4.2",
      name: "Skyfall 31B (AI Horde)",
      contextLength: 32768,
      toolCalling: false,
      unsupportedParams: ["tools", "tool_choice", "parallel_tool_calls"],
    },
    {
      id: "google/gemma-4-31b",
      name: "Gemma 4 31B (AI Horde)",
      contextLength: 32768,
      toolCalling: false,
      unsupportedParams: ["tools", "tool_choice", "parallel_tool_calls"],
    },
  ],
});

import type { RegistryEntry } from "../../shared.ts";
import { getAnthropicCompatHeaders } from "../../shared.ts";

/**
 * TabiToken — NewAPI-based Claude gateway (https://tabitoken.com).
 *
 * The catalog below is not hand-written: TabiToken leaves the NewAPI pricing endpoint
 * public (`/api/status` reports `pricing.requireAuth: false`), so `GET /api/pricing`
 * lists every model together with the protocols it accepts. All four entries report
 * `supported_endpoint_types: ["anthropic","openai"]`, which is why only those two
 * protocols are declared here — the host also routes `/v1/responses` and the Gemini
 * `/v1beta` path, but no model on this gateway is reachable through them.
 *
 * Claude-first (`/v1/messages` + `x-api-key`) because the whole catalog is Claude and
 * that avoids a translation hop for Claude-native clients; `passthroughModels` keeps
 * models added upstream usable before this list catches up.
 *
 * No static fingerprint headers. TabiToken fronts Cloudflare, and the only User-Agent
 * it rejects is the literal `curl/*` default — a browser UA is answered with
 * "Access denied: abusive or non-compliant use is prohibited", while sending no UA
 * (the fetch default) reaches the token layer normally. So, unlike agentrouter, this
 * entry needs neither a static nor a dynamic wire image.
 *
 * `headers` carries only `Anthropic-Version`, and it has to live on the entry rather
 * than come from the executor: `default.ts` defaults that header solely for provider
 * ids prefixed `anthropic-compatible-` (buildHeaders, the `startsWith` branch), so a
 * plain `format: "claude"` entry would POST `/v1/messages` without it. Six sibling
 * third-party Claude entries (wafer, zai, xiaomi-mimo, xiaomi-mimo-token-plan,
 * bailian-coding-plan, deepseek) set it for exactly this reason. Entry-level headers
 * are merged for every format (base.ts::buildHeadersPreamble), so the OpenAI alternate
 * below also sends it — a documented no-op on `/chat/completions` (see the same note in
 * executors/github.ts).
 */
export const tabitokenProvider: RegistryEntry = {
  id: "tabitoken",
  alias: "tabitoken",
  format: "claude",
  executor: "default",
  baseUrl: "https://tabitoken.com/v1/messages",
  modelsUrl: "https://tabitoken.com/v1/models",
  authType: "apikey",
  authHeader: "x-api-key",
  headers: getAnthropicCompatHeaders(),
  alternateFormats: [
    {
      format: "openai",
      baseUrl: "https://tabitoken.com/v1/chat/completions",
      authHeader: "bearer",
      label: "OpenAI-compatible",
    },
  ],
  models: [
    {
      id: "claude-opus-5",
      name: "Claude Opus 5",
      supportsReasoning: true,
      supportedThinkingEfforts: ["low", "medium", "high", "xhigh", "max"],
    },
    { id: "claude-opus-5-thinking", name: "Claude Opus 5 (Thinking)" },
    { id: "claude-opus-4-8", name: "Claude Opus 4.8" },
    { id: "claude-opus-4-8-thinking", name: "Claude Opus 4.8 (Thinking)" },
  ],
  passthroughModels: true,
};

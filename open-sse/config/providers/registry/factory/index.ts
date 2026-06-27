import type { RegistryEntry } from "../../shared.ts";

// Factory AI ("Factory Droids") — the hosted subscription gateway behind the
// local `droid` CLI. OmniRoute already integrates Droid as a CLI tool at
// `src/app/api/cli-tools/droid-settings/route.ts` (see PR #4682); this entry
// adds the same backend as a first-class routing provider so users with a paid
// Factory Droids subscription can proxy traffic through OmniRoute.
//
// Auth surface (per https://github.com/Factory-AI/droid-sdk-typescript): the
// upstream SDK reads its API key from a `FACTORY_API_KEY` env var and falls
// back to stored CLI credentials only when omitted. OmniRoute does NOT read
// that env var — like every gateway since v3.8.0, the key is supplied from the
// Dashboard connection credential. Factory has not (yet)
// published a public OAuth/refresh-token endpoint, so this entry ships with
// `authType: "apikey"`. An OAuth variant can be layered in later by adding
// `src/lib/oauth/providers/factory.ts` and switching `authType` here once
// Factory exposes token endpoints — the auth type toggle is the only change
// required (registry lookups are by-id and the executor is the same).
export const factoryProvider: RegistryEntry = {
  id: "factory",
  alias: "factory",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.factory.ai/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  // `auto` is Factory's routing sentinel: the gateway picks the best model
  // for the prompt (mirrors Droid's `auto` preset). Concrete model IDs can
  // be added here once Factory publishes a stable public model list; the
  // `passthroughModels` flag in the gateways catalog lets `GET /v1/models`
  // reflect whatever Factory's `/v1/models` returns live.
  models: [{ id: "auto", name: "Factory Auto (best model)" }],
};

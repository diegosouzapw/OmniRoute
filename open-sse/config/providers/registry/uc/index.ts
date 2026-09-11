import type { RegistryEntry } from "../../shared.ts";
import { UC_REGISTRY_MODELS } from "../../../../executors/uc/catalog.ts";

/**
 * UC (uncensored.com) — the UC consumer app's un-metered "persona" subscription
 * chat as an OpenAI-compatible provider. A WebSocket web-app port (like
 * muse-spark-web): there is no public API on this path, so the executor mints a
 * short-lived Clerk `__session` JWT from a durable `__client` cookie and drives
 * the persona socket `wss://internal-6.pubyar.com/ws/{uid}?token={jwt}`.
 *
 * authType `none`: the persona path uses NO API key. The durable credential
 * (`__client` cookie + Clerk session id + account uid + cookie jar) is minted by
 * OmniRoute's own browserless email-code login and stored in
 * providerSpecificData; the executor reads it from there and mints per-connect
 * tokens, so there is no bearer/api-key on the connection.
 *
 * The metered OpenAI-compatible Developer API (uc-direct) is a SEPARATE provider.
 */
export const ucProvider: RegistryEntry = {
  id: "uc",
  alias: "ucn",
  format: "openai",
  executor: "uc",
  baseUrl: "https://internal-6.pubyar.com",
  authType: "none",
  authHeader: "none",
  defaultContextLength: 128000,
  models: UC_REGISTRY_MODELS,
};

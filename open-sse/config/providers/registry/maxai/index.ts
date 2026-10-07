import type { RegistryEntry } from "../../shared.ts";
import { MAXAI_REGISTRY_MODELS } from "../../../../executors/maxai/catalog.ts";

/**
 * MaxAI — the MaxAI web app (chat.maxai.co / api.maxai.me) as an OpenAI-compatible
 * provider. A signed web-app port (like zai-web): each request carries a
 * per-request `X-Authorization` signature + a Bearer access token minted by the
 * browser-mint flow. Runs over residential egress with a Firefox TLS fingerprint.
 *
 * authType `apikey`/authHeader `bearer`: the OpenAI-style access token is stored
 * on the connection and replayed as `Authorization: Bearer`; the device id +
 * user id ride in providerSpecificData and are folded into the signature. The
 * token is refreshed out-of-band by the browser-mint (the `/oauth` refresh
 * endpoint is deep-TLS-gated), so there is no central token-refresh case.
 */
export const maxaiProvider: RegistryEntry = {
  id: "maxai",
  alias: "mx",
  format: "openai",
  executor: "maxai",
  baseUrl: "https://api.maxai.me",
  authType: "apikey",
  authHeader: "bearer",
  defaultContextLength: 128000,
  models: MAXAI_REGISTRY_MODELS,
};

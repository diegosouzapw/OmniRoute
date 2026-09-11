import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

/**
 * SeekAi (https://seekai.cc) — QuantumNous New-API gateway.
 * Live-verified 2026-09-02: GET /api/status → system_name=SeekAi,
 * version=v1.0.0-rc.25, quota_display_type=USD. GET /v1/models is
 * API-key gated (401 Invalid token without a key). Catalog is dynamic;
 * no static seed. Referral/aff query params stay out of this entry
 * (no-hardcoded-referral-codes).
 */
export const seekaiProvider = buildOpenAiCompatibleRegistryEntry({
  id: "seekai",
  alias: "ska",
  baseUrl: "https://seekai.cc/v1/chat/completions",
  modelsUrl: "https://seekai.cc/v1/models",
  models: [],
  passthroughModels: true,
});

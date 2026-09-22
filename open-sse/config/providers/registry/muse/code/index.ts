import type { RegistryEntry, RegistryModel } from "../../../shared.ts";
import { resolvePublicCred } from "../../../shared.ts";

/**
 * Meta Muse Code OAuth catalog.
 *
 * Muse Spark models are served over the OpenAI Responses API
 * (`targetFormat: "openai-responses"`), same as the API-key `muse-code`
 * preset. Window/max-output mirror the published OpenCode catalog
 * (1048576 / 131072).
 */
export const MUSE_CODE_MODELS: RegistryModel[] = [
  {
    id: "muse-spark-1.1",
    name: "Muse Spark 1.1",
    supportsReasoning: true,
    targetFormat: "openai-responses",
    contextLength: 1048576,
    maxOutputTokens: 131072,
  },
  {
    id: "muse-spark-1.2",
    name: "Muse Spark 1.2",
    supportsReasoning: true,
    targetFormat: "openai-responses",
    contextLength: 1048576,
    maxOutputTokens: 131072,
  },
  {
    id: "muse-spark-1.2-contributor",
    name: "Muse Spark 1.2 Contributor",
    supportsReasoning: true,
    targetFormat: "openai-responses",
    contextLength: 1048576,
    maxOutputTokens: 131072,
  },
  {
    id: "muse-spark-1.3",
    name: "Muse Spark 1.3",
    supportsReasoning: true,
    targetFormat: "openai-responses",
    contextLength: 1048576,
    maxOutputTokens: 131072,
  },
  {
    id: "muse-spark-1.3-contributor",
    name: "Muse Spark 1.3 Contributor",
    supportsReasoning: true,
    targetFormat: "openai-responses",
    contextLength: 1048576,
    maxOutputTokens: 131072,
  },
];

export const MUSE_CODE_SHARED = {
  format: "openai",
  executor: "default",
  baseUrl: "https://api.meta.ai/v1/responses",
  authHeader: "bearer",
  defaultContextLength: 1048576,
  models: MUSE_CODE_MODELS,
};

export const muse_code_oauthProvider: RegistryEntry = {
  id: "muse-code-oauth",
  alias: "mco",
  ...MUSE_CODE_SHARED,
  authType: "oauth",
  oauth: {
    clientIdEnv: "MUSE_CODE_OAUTH_CLIENT_ID",
    clientIdDefault: resolvePublicCred("muse_id"),
    tokenUrl: "https://auth.meta.com/oidc/device/token/",
    refreshUrl: "https://auth.meta.com/oidc/device/token/",
    authUrl: "https://auth.meta.com/oidc/device/authorization/",
  },
};

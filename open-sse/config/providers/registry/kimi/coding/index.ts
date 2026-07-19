import { ANTHROPIC_VERSION_HEADER } from "../../../../anthropicHeaders.ts";
import type { RegistryEntry, RegistryModel } from "../../../shared.ts";
import { resolvePublicCred } from "../../../shared.ts";
import { KIMI_CODING_ANTHROPIC_URL } from "./runtime.ts";

export const KIMI_CODING_MODELS: RegistryModel[] = [
  {
    id: "k3",
    name: "Kimi K3",
    contextLength: 1048576,
    supportsReasoning: true,
  },
  {
    id: "kimi-for-coding",
    name: "Kimi K2.7 Code",
    contextLength: 262144,
    supportsReasoning: true,
  },
  {
    id: "kimi-for-coding-highspeed",
    name: "Kimi K2.7 Code (High Speed)",
    contextLength: 262144,
    supportsReasoning: true,
  },
];

export const KIMI_CODING_SHARED = {
  format: "claude",
  executor: "default",
  baseUrl: KIMI_CODING_ANTHROPIC_URL,
  authHeader: "x-api-key",
  defaultContextLength: 262144,
  headers: {
    "Anthropic-Version": ANTHROPIC_VERSION_HEADER,
  },
  models: KIMI_CODING_MODELS,
};

export const kimi_codingProvider: RegistryEntry = {
  id: "kimi-coding",
  alias: "kmc",
  ...KIMI_CODING_SHARED,
  authType: "oauth",
  oauth: {
    clientIdEnv: "KIMI_CODING_OAUTH_CLIENT_ID",
    clientIdDefault: resolvePublicCred("kimi_id"),
    tokenUrl: "https://auth.kimi.com/api/oauth/token",
    refreshUrl: "https://auth.kimi.com/api/oauth/token",
    authUrl: "https://auth.kimi.com/api/oauth/device_authorization",
  },
};

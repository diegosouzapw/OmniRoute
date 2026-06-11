import type { RegistryEntry } from "../../../shared.ts";
import {
  KIMI_CODING_SHARED,
  resolvePublicCred
} from "../../../shared.ts";

export const kimi_codingProvider: RegistryEntry = {
  id: "kimi-coding",
  alias: "kmc",
  ...KIMI_CODING_SHARED,
  urlSuffix: "?beta=true",
  authType: "oauth",
  oauth: {
    clientIdEnv: "KIMI_CODING_OAUTH_CLIENT_ID",
    clientIdDefault: resolvePublicCred("kimi_id"),
    tokenUrl: "https://auth.kimi.com/api/oauth/token",
    refreshUrl: "https://auth.kimi.com/api/oauth/token",
    authUrl: "https://auth.kimi.com/api/oauth/device_authorization",
  },
};

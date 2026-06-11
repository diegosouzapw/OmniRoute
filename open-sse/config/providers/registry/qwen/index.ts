import type { RegistryEntry } from "../../shared.ts";
import {
  getQwenOauthHeaders,
  resolvePublicCred
} from "../../shared.ts";

export const qwenProvider: RegistryEntry = {
  id: "qwen",
  alias: "qw",
  format: "openai",
  executor: "default",
  baseUrl: "https://chat.qwen.ai/api/v1/services/aigc/text-generation/generation",
  authType: "oauth",
  authHeader: "bearer",
  headers: getQwenOauthHeaders(),
  oauth: {
    clientIdEnv: "QWEN_OAUTH_CLIENT_ID",
    clientIdDefault: resolvePublicCred("qwen_id"),
    tokenUrl: "https://chat.qwen.ai/api/v1/oauth2/token",
    authUrl: "https://chat.qwen.ai/api/v1/oauth2/device/code",
  },
  models: [
    { id: "qwen3-coder-plus", name: "Qwen3 Coder Plus" },
    { id: "qwen3-coder-flash", name: "Qwen3 Coder Flash" },
    { id: "vision-model", name: "Qwen3 Vision Model" },
    { id: "coder-model", name: "Qwen3.6 (Coder Model)" },
  ],
};

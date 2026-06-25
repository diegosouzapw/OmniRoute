import type { RegistryEntry } from "../../shared.ts";

export const grok_cliProvider: RegistryEntry = {
  id: "grok-cli",
  alias: "gc",
  format: "openai",
  executor: "grok-cli",
  baseUrl: "https://cli-chat-proxy.grok.com/v1/chat/completions",
  authType: "oauth",
  authHeader: "bearer",
  passthroughModels: true,
  models: [
    { id: "grok-build", name: "Grok Build", contextLength: 128000 },
    { id: "grok-composer-2.5-fast", name: "Grok Composer 2.5 Fast", contextLength: 128000 },
  ],
  oauth: {
    clientIdEnv: "GROK_OAUTH_CLIENT_ID",
    clientIdDefault: "b1a00492-073a-47ea-816f-4c329264a828",
    tokenUrl: "https://auth.x.ai/oauth/token",
  },
};

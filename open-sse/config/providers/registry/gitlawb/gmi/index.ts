import type { RegistryEntry } from "../../../shared.ts";
import {
  CHAT_OPENAI_COMPAT_MODELS
} from "../../../shared.ts";

export const gitlawb_gmiProvider: RegistryEntry = {
  id: "gitlawb-gmi",
  alias: "glb-gmi",
  format: "openai",
  executor: "default",
  baseUrl: "https://opengateway.gitlawb.com/v1/gmi-cloud",
  authType: "apikey",
  authHeader: "bearer",
  headers: {
    "User-Agent": "OpenClaude/1.0 (linux; x86_64)",
    "X-Title": "OpenClaude CLI",
    "HTTP-Referer": "https://github.com/Gitlawb/openclaude",
  },
  passthroughModels: true,
  models: CHAT_OPENAI_COMPAT_MODELS["gitlawb-gmi"],
};

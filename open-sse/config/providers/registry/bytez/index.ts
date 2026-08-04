import type { RegistryEntry } from "../../shared.ts";
import { CHAT_OPENAI_COMPAT_MODELS } from "../../shared.ts";

export const bytezProvider: RegistryEntry = {
  id: "bytez",
  alias: "bytez",
  format: "openai",
  executor: "default",
  // #5422: full OpenAI-compat chat URL. The bare `…/models/v2` base made the validation
  // probe hit `…/models/v2/chat/completions` → 404 ("endpoint not supported"). Bytez is
  // OpenAI-compatible at `…/models/v2/openai/v1`; store the full chat path (like
  // friendliai/novita) so chat resolves once an account has catalog models.
  baseUrl: "https://api.bytez.com/models/v2/openai/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  models: CHAT_OPENAI_COMPAT_MODELS.bytez,
};

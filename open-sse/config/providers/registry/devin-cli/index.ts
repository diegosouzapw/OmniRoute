import type { RegistryEntry } from "../../shared.ts";
import { DEVIN_MODEL_CATALOG } from "../devin/catalog.ts";

export const devin_cliProvider: RegistryEntry = {
  id: "devin-cli",
  alias: "dv",
  format: "openai",
  executor: "devin-cli",
  baseUrl: "devin://acp/stdio",
  authType: "oauth",
  authHeader: "Authorization",
  authPrefix: "Bearer ",
  defaultContextLength: 200000,
  // This ACP transport runs Devin's summarizer agent and flattens the request
  // to plain text; it cannot return client-owned tool calls. Keep it out of
  // tool-required combo routes. Use devin-cli-agentic (alias: dva) for tools.
  models: DEVIN_MODEL_CATALOG.map((model) => ({ ...model, toolCalling: false })),
};

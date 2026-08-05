import type { RegistryEntry } from "../../shared.ts";
import { DEVIN_MODEL_CATALOG } from "../devin/catalog.ts";

export const devin_cli_agenticProvider: RegistryEntry = {
  id: "devin-cli-agentic",
  alias: "dva",
  format: "claude",
  executor: "devin-cli-agentic",
  baseUrl: "devin://acp/stdio",
  // Authentication is owned exclusively by the official Devin CLI inside its
  // isolated volume. OmniRoute must not import or persist a host credential.
  authType: "none",
  authHeader: "none",
  defaultContextLength: 200000,
  models: DEVIN_MODEL_CATALOG.map((model) => ({
    ...model,
    toolCalling: true,
    supportsReasoning: false,
    supportsVision: false,
  })),
};

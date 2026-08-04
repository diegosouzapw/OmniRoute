import type { RegistryEntry } from "../../shared.ts";

export const copilot_m365_webProvider: RegistryEntry = {
  id: "copilot-m365-web",
  alias: "m365copilot",
  format: "openai",
  executor: "copilot-m365-web",
  baseUrl: "wss://substrate.office.com/m365Copilot/Chathub",
  authType: "apikey",
  authHeader: "cookie",
  models: [
    { id: "copilot-m365", name: "Microsoft 365 Copilot (BizChat)", toolCalling: false },
    { id: "copilot-m365-claude-opus", name: "Microsoft 365 Copilot — Claude Opus", toolCalling: false },
    {
      id: "copilot-m365-gpt-5-6-reasoning",
      name: "Microsoft 365 Copilot — GPT 5.6 Reasoning",
      toolCalling: false,
    },
    { id: "copilot-m365-gpt-5-5-chat", name: "Microsoft 365 Copilot — GPT 5.5 Chat", toolCalling: false },
  ],
};

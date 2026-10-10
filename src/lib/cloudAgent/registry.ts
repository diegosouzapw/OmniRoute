import type { CloudAgentBase } from "./baseAgent.ts";
import { JulesAgent } from "./agents/jules.ts";
import { DevinAgent } from "./agents/devin.ts";
import { CodexCloudAgent } from "./agents/codex.ts";
import { CursorCloudAgent } from "./agents/cursor.ts";

const AGENTS: Record<string, CloudAgentBase> = {
  jules: new JulesAgent(),
  devin: new DevinAgent(),
  "codex-cloud": new CodexCloudAgent(),
  // #4227: Cursor Background/Cloud Agents via the official REST API (API-key based,
  // no IDE-OAuth ban risk). Distinct provider id from the OAuth chat provider `cursor`.
  "cursor-cloud": new CursorCloudAgent(),
};

export function getAgent(providerId: string): CloudAgentBase | null {
  return Object.hasOwn(AGENTS, providerId) ? AGENTS[providerId] : null;
}

export function getAvailableAgents(): string[] {
  return Object.keys(AGENTS);
}

export function isCloudAgentProvider(providerId: string): boolean {
  return Object.hasOwn(AGENTS, providerId);
}

export { JulesAgent, DevinAgent, CodexCloudAgent, CursorCloudAgent };
export type { CloudAgentBase } from "./baseAgent.ts";

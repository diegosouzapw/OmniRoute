import type { CloudAgentBase } from "./baseAgent.ts";
import { JulesAgent } from "./agents/jules.ts";
import { DevinAgent } from "./agents/devin.ts";
import { CodexCloudAgent } from "./agents/codex.ts";

const AGENTS: Record<string, CloudAgentBase> = {
  jules: new JulesAgent(),
  devin: new DevinAgent(),
  "codex-cloud": new CodexCloudAgent(),
};

export function getAgent(providerId: string): CloudAgentBase | null {
  return AGENTS[providerId] || null;
}

export function getAvailableAgents(): string[] {
  return Object.keys(AGENTS);
}

export function isCloudAgentProvider(providerId: string): boolean {
  return providerId in AGENTS;
}

export { JulesAgent, DevinAgent, CodexCloudAgent };
export type { CloudAgentBase } from "./baseAgent.ts";

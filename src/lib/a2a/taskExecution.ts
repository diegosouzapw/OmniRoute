/**
 * A2A Skill Handler Registry and Execution
 */

import { A2ATask } from "./taskManager";

export interface A2ASkillResult {
  artifacts: Array<{ type: string; content: string }>;
  metadata?: Record<string, unknown>;
}

export type A2ASkillHandler = (task: A2ATask) => Promise<A2ASkillResult>;

export const A2A_SKILL_HANDLERS: Record<string, A2ASkillHandler> = {
  "smart-routing": async (task) => {
    const skillModule = await import("./skills/smartRouting");
    return skillModule.executeSmartRouting(task);
  },

  "quota-management": async (task) => {
    const skillModule = await import("./skills/quotaManagement");
    return skillModule.executeQuotaManagement(task);
  },

  "provider-discovery": async (task) => {
    const skillModule = await import("./skills/providerDiscovery");
    return skillModule.executeProviderDiscovery(task);
  },

  "cost-analysis": async (task) => {
    const skillModule = await import("./skills/costAnalysis");
    return skillModule.executeCostAnalysis(task);
  },

  "health-report": async (task) => {
    const skillModule = await import("./skills/healthReport");
    return skillModule.executeHealthReport(task);
  },

  "agent-dispatch": async (task) => {
    const skillModule = await import("./skills/agentDispatch");
    return skillModule.executeAgentDispatch(task);
  },
};

/**
 * Execute an A2A skill task with state management
 */
export async function executeA2ATaskWithState(
  taskManager: any,
  task: A2ATask,
  handler: A2ASkillHandler
): Promise<A2ASkillResult> {
  try {
    const result = await handler(task);
    taskManager.updateTask(task.id, "completed", result.artifacts);
    return result;
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    taskManager.updateTask(task.id, "failed", [{ type: "error", content: message }], message);
    throw err;
  }
}

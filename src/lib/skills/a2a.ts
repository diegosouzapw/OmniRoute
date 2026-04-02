export const a2aMemorySkill = {
  name: "memory_aware_routing",
  version: "1.0.0",
  description: "A2A skill for memory-aware request routing",
  schema: {
    input: {
      type: "object",
      properties: {
        task: { type: "string" },
        contextRequired: { type: "boolean" },
      },
      required: ["task"],
    },
    output: {
      type: "object",
      properties: {
        recommendedProvider: { type: "string" },
        reason: { type: "string" },
      },
    },
  },
  handler: async (input: any, context: any) => {
    const { task, contextRequired = false } = input;
    return {
      recommendedProvider: "auto",
      reason: "Memory-aware routing requires memories to be loaded",
      contextUsed: contextRequired,
    };
  },
};

export function registerA2ASkill(registry: any): void {
  registry.registerHandler("memory_aware_routing", a2aMemorySkill.handler);
}

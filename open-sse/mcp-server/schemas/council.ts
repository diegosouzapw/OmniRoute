import { z } from "zod";
import type { McpToolDefinition } from "./toolDefinition.ts";

export const councilInput = z.object({
  prompt: z
    .string()
    .min(1)
    .describe("The question or task for the council to deliberate on."),
  models: z
    .array(z.string().min(1))
    .max(40)
    .optional()
    .describe(
      "Explicit panel of model IDs. Omit (or leave empty) to auto-use every connected, healthy model."
    ),
  judgeModel: z
    .string()
    .min(1)
    .optional()
    .describe(
      "Model that synthesizes the debate into the final answer. Defaults to the first panel model."
    ),
  debateRounds: z
    .number()
    .int()
    .min(1)
    .max(10)
    .optional()
    .describe(
      "Total rounds including the initial fan-out (1 = single fan-out like Fusion; 2 = one rebuttal round). Default 2."
    ),
  consensusThreshold: z
    .number()
    .min(0)
    .max(2)
    .optional()
    .describe(
      "Stop early when the panel converges past this agreement level (0-1). Set above 1 to always run every round. Default 0.85."
    ),
});

export const councilOutput = z.object({
  answer: z.string().describe("The synthesized final answer."),
  judge: z.string().describe("The model that produced the synthesis."),
  rounds: z.number().describe("Number of debate rounds actually run."),
  panel: z.array(z.string()).describe("The panel model IDs that participated."),
  totalAnswers: z.number().describe("Total panel answers collected across all rounds."),
  consensusStoppedEarly: z
    .boolean()
    .describe("True if the debate ended early because the panel converged."),
});

export const councilTool: McpToolDefinition<typeof councilInput, typeof councilOutput> = {
  name: "omniroute_council",
  description:
    "Convenes a multi-model AI council: every connected model (or an explicit panel) independently answers, then debates and rebuts across rounds, and a judge synthesizes one authoritative answer. Use for hard questions where a single model is not enough.",
  inputSchema: councilInput,
  outputSchema: councilOutput,
  scopes: ["execute:completions"],
  auditLevel: "full",
  phase: 2,
  sourceEndpoints: ["/api/v1/council"],
};

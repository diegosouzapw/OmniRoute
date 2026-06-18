/**
 * A2A Routing Decision Logger
 */

export interface RoutingDecision {
  taskType: string;
  comboId: string;
  providerSelected: string;
  modelUsed: string;
  score: number;
  factors: string[];
  fallbacksTriggered: string[];
  success: boolean;
  latencyMs: number;
  cost: number;
}

export function logRoutingDecision(decision: RoutingDecision): void {
  // Log to console in development
  if (process.env.NODE_ENV === "development") {
    console.log("[A2A ROUTING]", JSON.stringify(decision, null, 2));
  }
  // TODO: Write to database audit table for production
}

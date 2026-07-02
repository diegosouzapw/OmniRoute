/**
 * A2A Routing Decision Logger
 */

import { saveRoutingDecision } from "@/lib/db/routingDecisions";
import { getActiveSpanContext } from "./otelContext";

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
  /** W3C 16-byte trace id, hex-encoded (32 hex chars). Auto-hydrated from OTel context when absent. */
  traceId?: string;
  /** W3C 8-byte span id, hex-encoded (16 hex chars). Auto-hydrated from OTel context when absent. */
  spanId?: string;
  /** Internal: allow db module to populate id without breaking the RoutingDecision shape. */
  id?: string;
}

export function logRoutingDecision(decision: RoutingDecision): void {
  // Log to console in development
  if (process.env.NODE_ENV === "development") {
    console.log("[A2A ROUTING]", JSON.stringify(decision, null, 2));
  }

  // Hydrate OTel trace context when the caller didn't supply it
  const hydratedDecision: RoutingDecision = { ...decision };
  if (!hydratedDecision.traceId || !hydratedDecision.spanId) {
    const ctx = getActiveSpanContext();
    if (ctx) {
      hydratedDecision.traceId = hydratedDecision.traceId ?? ctx.traceId;
      hydratedDecision.spanId = hydratedDecision.spanId ?? ctx.spanId;
    }
  }

  // Fire-and-forget: persist to DB; never throw into the caller
  try {
    saveRoutingDecision(hydratedDecision);
  } catch {
    // Intentional: DB errors must not surface to the caller
  }
}

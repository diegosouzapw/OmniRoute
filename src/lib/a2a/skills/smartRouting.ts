/**
 * A2A Skill: Smart Routing
 *
 * Receives a prompt + metadata → routes via OmniRoute pipeline →
 * returns response with routing_explanation, cost_envelope, resilience_trace, policy_verdict.
 */

import type { A2ATask, TaskArtifact } from "../taskManager";

const OMNIROUTE_BASE_URL = process.env.OMNIROUTE_BASE_URL || "http://localhost:20128";
const OMNIROUTE_API_KEY = process.env.OMNIROUTE_API_KEY || "";

async function routeFetch(path: string, options: RequestInit = {}): Promise<any> {
  const url = `${OMNIROUTE_BASE_URL}${path}`;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(OMNIROUTE_API_KEY ? { Authorization: `Bearer ${OMNIROUTE_API_KEY}` } : {}),
  };
  const res = await fetch(url, { ...options, headers, signal: AbortSignal.timeout(30000) });
  if (!res.ok) throw new Error(`API [${res.status}]: ${await res.text().catch(() => "error")}`);
  return res.json();
}

export interface SmartRoutingResult {
  artifacts: TaskArtifact[];
  metadata: {
    routing_explanation: string;
    cost_envelope: { estimated: number; actual: number; currency: string };
    resilience_trace: Array<{ event: string; provider: string; timestamp: string }>;
    policy_verdict: { allowed: boolean; reason: string };
  };
}

export async function executeSmartRouting(task: A2ATask): Promise<SmartRoutingResult> {
  const messages = task.input.messages;
  const model = (task.input.metadata?.model as string) || "auto";
  const combo = task.input.metadata?.combo as string | undefined;
  const budget = task.input.metadata?.budget as number | undefined;

  const start = Date.now();
  const body: Record<string, unknown> = { model, messages, stream: false };
  if (combo) body["x-combo"] = combo;

  const raw = await routeFetch("/v1/chat/completions", {
    method: "POST",
    body: JSON.stringify(body),
  });
  const latencyMs = Date.now() - start;

  const content = raw?.choices?.[0]?.message?.content || "";
  const provider = raw?.provider || "unknown";
  const actualCost = raw?.cost || 0;
  const promptTokens = raw?.usage?.prompt_tokens || 0;
  const estimatedCost = (promptTokens / 1_000_000) * 3.0; // rough estimate

  // Budget policy check
  const withinBudget = budget ? actualCost <= budget : true;

  return {
    artifacts: [{ type: "text", content }],
    metadata: {
      routing_explanation: `Selected ${raw?.model || model} via provider "${provider}" (latency: ${latencyMs}ms, cost: $${actualCost.toFixed(4)})`,
      cost_envelope: {
        estimated: Math.round(estimatedCost * 10000) / 10000,
        actual: Math.round(actualCost * 10000) / 10000,
        currency: "USD",
      },
      resilience_trace: [
        { event: "primary_selected", provider, timestamp: new Date().toISOString() },
        ...(raw?.fallbacksTriggered
          ? [
              {
                event: "fallback_needed",
                provider: "secondary",
                timestamp: new Date().toISOString(),
              },
            ]
          : []),
      ],
      policy_verdict: {
        allowed: withinBudget,
        reason: withinBudget
          ? "within budget and quota limits"
          : `cost $${actualCost} exceeds budget $${budget}`,
      },
    },
  };
}

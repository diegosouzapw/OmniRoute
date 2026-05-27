/**
 * POST /api/playground/simulate-route
 *
 * Simulates combo routing without executing the actual request.
 * Returns which targets would be tried, in which order, and with what expected outcome.
 */

import { NextResponse } from "next/server";
import { z } from "zod";
import { getCombos } from "@/lib/db/combos";
import { getProviderConnections } from "@/lib/db/providers";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";

interface SimulateRequest {
  /** Combo ID to simulate */
  comboId?: string;
  /** Combo config inline (mutually exclusive with comboId) */
  combo?: {
    name: string;
    strategy: string;
    targets: Array<{ provider: string; model: string; weight?: number }>;
  };
  /** Estimated prompt tokens */
  promptTokens?: number;
  /** Task type hint */
  taskType?: string;
}

interface TargetSimulation {
  provider: string;
  model: string;
  strategy: string;
  rank: number;
  estimatedCost: number;
  estimatedLatencyMs: number;
  status: "available" | "no_quota" | "degraded" | "error" | "unknown";
  maxTokens?: number;
  contextWindow?: number;
}

interface SimulateResponse {
  comboId?: string;
  comboName: string;
  strategy: string;
  targets: TargetSimulation[];
  totalEstimatedCost: number;
  totalEstimatedLatencyMs: number;
  warnings: string[];
  errors: string[];
}

const simulateRequestSchema = z
  .object({
    comboId: z.string().trim().min(1).optional(),
    combo: z
      .object({
        name: z.string().trim().min(1),
        strategy: z.string().trim().min(1),
        targets: z
          .array(
            z.object({
              provider: z.string().trim().min(1),
              model: z.string().trim().min(1),
              weight: z.number().optional(),
            })
          )
          .min(1),
      })
      .optional(),
    promptTokens: z.number().int().positive().optional(),
    taskType: z.string().optional(),
  })
  .refine((value) => Boolean(value.comboId) !== Boolean(value.combo), {
    message: "Exactly one of comboId or combo is required",
  });

function estimateCost(model: string, promptTokens: number): number {
  // Rough cost estimates per model family
  const modelLower = model.toLowerCase();
  const rate = modelLower.includes("sonnet")
    ? 3
    : modelLower.includes("haiku")
      ? 0.25
      : modelLower.includes("opus")
        ? 15
        : modelLower.includes("gpt-4")
          ? 10
          : modelLower.includes("gpt-3.5")
            ? 0.5
            : modelLower.includes("gemini")
              ? 0.15
              : modelLower.includes("claude")
                ? 3
                : modelLower.includes("deepseek")
                  ? 0.5
                  : modelLower.includes("mistral")
                    ? 0.6
                    : modelLower.includes("llama")
                      ? 0.3
                      : modelLower.includes("qwen")
                        ? 0.4
                        : 1;
  return (rate * promptTokens) / 1_000_000;
}

function estimateLatency(model: string): number {
  const modelLower = model.toLowerCase();
  if (modelLower.includes("haiku")) return 800;
  if (modelLower.includes("sonnet")) return 1500;
  if (modelLower.includes("opus")) return 4000;
  if (modelLower.includes("gpt-4")) return 2000;
  if (modelLower.includes("gpt-3.5")) return 500;
  if (modelLower.includes("gemini")) return 1200;
  if (modelLower.includes("deepseek")) return 3000;
  if (modelLower.includes("mistral")) return 1000;
  if (modelLower.includes("llama")) return 2500;
  if (modelLower.includes("qwen")) return 1800;
  if (modelLower.includes("claude")) return 1500;
  return 2000;
}

function estimateContextWindow(model: string): number {
  const modelLower = model.toLowerCase();
  if (modelLower.includes("128k") || modelLower.includes("128")) return 128000;
  if (modelLower.includes("200k") || modelLower.includes("200")) return 200000;
  if (modelLower.includes("1m") || modelLower.includes("1m")) return 1000000;
  if (modelLower.includes("2m") || modelLower.includes("2m")) return 2000000;
  return 128000;
}

export async function POST(request: Request) {
  try {
    const rawBody = await request.json();
    const validation = validateBody(simulateRequestSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }
    const body: SimulateRequest = validation.data;
    const warnings: string[] = [];
    const errors: string[] = [];
    let comboInfo: {
      name: string;
      strategy: string;
      targets: Array<{ provider: string; model: string; weight?: number }>;
    } | null = null;

    // Resolve combo
    if (body.comboId) {
      const combos = (await getCombos()) as any[];
      const combo = combos.find((c) => c.id === body.comboId || c.name === body.comboId);
      if (!combo) {
        errors.push(`Combo "${body.comboId}" not found.`);
        return NextResponse.json({ error: "Combo not found" }, { status: 404 });
      }
      const targets = typeof combo.targets === "string" ? JSON.parse(combo.targets) : combo.targets;
      comboInfo = { name: combo.name, strategy: combo.strategy, targets };
    } else if (body.combo) {
      comboInfo = body.combo;
    } else {
      errors.push("Either comboId or combo config is required.");
      return NextResponse.json({ error: "Missing combo configuration" }, { status: 400 });
    }

    const promptTokens = body.promptTokens || 500;
    const targets: TargetSimulation[] = [];
    let totalCost = 0;
    let totalLatency = 0;

    // Get provider connections for status
    const connections = (await getProviderConnections({})) as any[];

    for (let i = 0; i < comboInfo.targets.length; i++) {
      const t = comboInfo.targets[i];
      const conn = connections.find(
        (c: any) => c.id === t.provider || c.name === t.provider || c.displayName === t.provider
      );
      const cost = estimateCost(t.model, promptTokens);
      const latency = estimateLatency(t.model);
      totalCost += cost;
      totalLatency += latency;

      // Determine provider status
      let status: TargetSimulation["status"] = "available";
      if (!conn) {
        status = "unknown";
        warnings.push(`Provider "${t.provider}" not configured — will likely fail.`);
      } else if (!conn.isActive) {
        status = "error";
        warnings.push(`Provider "${t.provider}" is inactive.`);
      }

      targets.push({
        provider: t.provider,
        model: t.model,
        strategy: comboInfo.strategy,
        rank: i + 1,
        estimatedCost: cost,
        estimatedLatencyMs: latency,
        status,
        contextWindow: estimateContextWindow(t.model),
      });
    }

    // Add strategy-specific warnings
    if (comboInfo.strategy === "priority" && targets.length > 1) {
      warnings.push("Priority strategy: targets after rank 1 only used if earlier targets fail.");
    }

    // Build response
    const response: SimulateResponse = {
      comboId: body.comboId,
      comboName: comboInfo.name,
      strategy: comboInfo.strategy,
      targets,
      totalEstimatedCost: totalCost,
      totalEstimatedLatencyMs: totalLatency,
      warnings,
      errors,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: `Simulation error: ${message}` }, { status: 500 });
  }
}

/**
 * Auto-Combo REST API — `/api/combos/auto`
 *
 * POST   — Create auto-combo
 * GET    — List all auto-combos
 *
 * Note: Auto-combo state is managed in-memory by the engine module.
 * The open-sse/services/autoCombo module is outside Next.js src/,
 * so we use a lightweight in-memory store here that mirrors the engine API.
 */

import { NextRequest, NextResponse } from "next/server";
import { createAutoComboSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";

// ── In-memory auto-combo store (mirrors open-sse/services/autoCombo/engine.ts) ──

interface ScoringWeights {
  quota: number;
  health: number;
  costInv: number;
  latencyInv: number;
  taskFit: number;
  stability: number;
}

const DEFAULT_WEIGHTS: ScoringWeights = {
  quota: 0.2,
  health: 0.25,
  costInv: 0.2,
  latencyInv: 0.15,
  taskFit: 0.1,
  stability: 0.1,
};

interface AutoComboConfig {
  id: string;
  name: string;
  type: "auto";
  candidatePool: string[];
  weights: ScoringWeights;
  modePack?: string;
  budgetCap?: number;
  explorationRate: number;
}

const autoCombos = new Map<string, AutoComboConfig>();

export async function POST(req: NextRequest) {
  let rawBody: unknown;
  try {
    rawBody = await req.json();
  } catch {
    return NextResponse.json(
      {
        error: {
          message: "Invalid request",
          details: [{ field: "body", message: "Invalid JSON body" }],
        },
      },
      { status: 400 }
    );
  }

  try {
    const validation = validateBody(createAutoComboSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }
    const { id, name, candidatePool, weights, modePack, budgetCap, explorationRate } =
      validation.data;

    const config: AutoComboConfig = {
      id,
      name,
      type: "auto",
      candidatePool,
      weights: weights ?? DEFAULT_WEIGHTS,
      modePack,
      budgetCap,
      explorationRate,
    };
    autoCombos.set(id, config);

    return NextResponse.json(config, { status: 201 });
  } catch (err) {
    console.log("Error creating auto-combo:", err);
    return NextResponse.json({ error: "Failed to create auto-combo" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ combos: [...autoCombos.values()] });
}

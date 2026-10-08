/**
 * API Route: /api/intelligence/overrides
 *
 * POST — Set a user_override fitness entry for a model × task category.
 * DELETE — Remove a user_override fitness entry for a model × task category.
 *
 * Management-authed. All inputs validated with Zod. Errors route through
 * sanitizeErrorMessage() — no raw stack traces in the response body.
 */

import { NextRequest, NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import {
  intelligenceOverrideRequestSchema,
} from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";
import {
  setUserFitnessOverrideEntry,
  deleteUserFitnessOverrideEntry,
} from "@/lib/db/modelIntelligence";

function normalizeModel(model: string): string {
  return model.trim().toLowerCase();
}

function normalizeCategory(category: string): string {
  return category.trim().toLowerCase();
}

export async function POST(request: NextRequest) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  let rawBody: unknown;
  try {
    rawBody = await request.json();
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
    const validation = validateBody(intelligenceOverrideRequestSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }
    const { model, category, score } = validation.data;
    const normalizedModel = normalizeModel(model);
    const normalizedCategory = normalizeCategory(category);
    const clampedScore = Math.max(0, Math.min(1, score));

    setUserFitnessOverrideEntry(normalizedModel, normalizedCategory, clampedScore);

    const { invalidateFitnessCache } = await import(
      "@/open-sse/services/autoCombo/taskFitness"
    );
    invalidateFitnessCache();

    console.info(
      `[intelligence] user_override set: model=${normalizedModel} category=${normalizedCategory} score=${clampedScore}`
    );

    return NextResponse.json(
      {
        success: true,
        entry: {
          model: normalizedModel,
          category: normalizedCategory,
          score: clampedScore,
          source: "user_override",
          expiresAt: null,
        },
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: sanitizeErrorMessage(err) },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  const url = new URL(request.url);
  let model = url.searchParams.get("model");
  let category = url.searchParams.get("category");

  if (model === null || category === null) {
    try {
      const body = (await request.json()) as { model?: string; category?: string };
      if (typeof body.model === "string") model = body.model;
      if (typeof body.category === "string") category = body.category;
    } catch {
      // No JSON body — fall through to 400 below
    }
  }

  if (model === null || category === null || model === "" || category === "") {
    return NextResponse.json(
      {
        error: {
          message: "Invalid request",
          details: [
            { field: "model", message: "model is required (query param or JSON body)" },
            { field: "category", message: "category is required (query param or JSON body)" },
          ],
        },
      },
      { status: 400 }
    );
  }

  try {
    const normalizedModel = normalizeModel(model);
    const normalizedCategory = normalizeCategory(category);
    const deleted = deleteUserFitnessOverrideEntry(normalizedModel, normalizedCategory);

    const { invalidateFitnessCache } = await import(
      "@/open-sse/services/autoCombo/taskFitness"
    );
    invalidateFitnessCache();

    console.info(
      `[intelligence] user_override delete: model=${normalizedModel} category=${normalizedCategory} deleted=${deleted}`
    );

    return NextResponse.json({ success: true, deleted }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: sanitizeErrorMessage(err) },
      { status: 500 }
    );
  }
}
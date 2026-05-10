import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Assessor } from "@/domain/assessment/assessor";
import { Categorizer } from "@/domain/assessment/categorizer";
import { SelfHealer } from "@/domain/assessment/selfHealer";
import {
  type AssessmentScope,
  type AssessmentTrigger,
  type ModelCategory,
} from "@/domain/assessment/types";
import { validateBody } from "@/shared/validation/helpers";

const assessor = new Assessor(
  process.env.OMNIROUTe_API_KEY ?? process.env.API_KEY ?? "",
  process.env.OMNIROUTe_BASE_URL ?? "http://localhost:20128/v1"
);

const categorizer = new Categorizer();
const healer = new SelfHealer();

const modelCategories = new Set<ModelCategory>([
  "coding",
  "reasoning",
  "reasoning_deep",
  "chat",
  "fast",
  "vision",
  "tool_call",
  "structured_output",
]);

const assessmentScopeSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("all") }),
  z.object({ type: z.literal("provider"), providerId: z.string().min(1) }),
  z.object({ type: z.literal("model"), modelId: z.string().min(1) }),
]);

const assessmentPostSchema = z.object({
  scope: assessmentScopeSchema.optional().default({ type: "all" }),
  trigger: z
    .enum(["scheduled", "on_demand", "on_provider_change", "on_error", "startup"])
    .optional()
    .default("on_demand"),
});

type ModelListItem = { id: string };

function isModelCategory(value: string): value is ModelCategory {
  return modelCategories.has(value as ModelCategory);
}

function isModelListItem(value: unknown): value is ModelListItem {
  return (
    !!value &&
    typeof value === "object" &&
    "id" in value &&
    typeof (value as { id?: unknown }).id === "string"
  );
}

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.json();
    const validation = validateBody(assessmentPostSchema, rawBody);
    if (!validation.success) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const scope: AssessmentScope = validation.data.scope;
    const trigger: AssessmentTrigger = validation.data.trigger;

    let models: Array<{ providerId: string; modelId: string }>;

    if (scope.type === "provider") {
      models = await getModelsForProvider(scope.providerId);
    } else if (scope.type === "model") {
      models = [{ providerId: scope.modelId.split("/")[0], modelId: scope.modelId.split("/")[1] }];
    } else {
      models = await getAllModels();
    }

    const run = await assessor.runAssessment(models, trigger);

    for (const assessment of assessor.getAllAssessments()) {
      categorizer.assignCategoriesAndFitness(assessment);
    }

    return NextResponse.json({
      run_id: run.id,
      status: "completed",
      models_tested: run.modelsTested,
      models_passed: run.modelsPassed,
      models_failed: run.modelsFailed,
      models_rate_limited: run.modelsRateLimited,
      duration_ms: run.durationMs,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const action = url.searchParams.get("action");

  if (action === "results") {
    const status = url.searchParams.get("status");
    const provider = url.searchParams.get("provider");
    const category = url.searchParams.get("category");

    let results = assessor.getAllAssessments();
    if (status) results = results.filter((a) => a.status === status);
    if (provider) results = results.filter((a) => a.providerId === provider);
    if (category && isModelCategory(category)) {
      results = results.filter((a) => a.categories.includes(category));
    }

    return NextResponse.json({ models: results });
  }

  if (action === "combo-health") {
    return NextResponse.json({ combos: [], message: "Combo health requires DB access" });
  }

  if (action === "working") {
    return NextResponse.json({ models: assessor.getWorkingModels() });
  }

  return NextResponse.json({
    endpoints: {
      "GET ?action=results": "Get assessment results (filter: status, provider, category)",
      "GET ?action=combo-health": "Get combo health status",
      "GET ?action=working": "Get working models only",
      "POST { scope, trigger }": "Run assessment",
    },
  });
}

async function getAllModels(): Promise<Array<{ providerId: string; modelId: string }>> {
  try {
    const resp = await fetch("http://localhost:20128/v1/models", {
      headers: {
        Authorization: `Bearer ${process.env.OMNIROUTe_API_KEY ?? process.env.API_KEY ?? ""}`,
      },
    });
    const data = (await resp.json()) as { data?: unknown };
    const models = Array.isArray(data.data) ? data.data : [];
    return models
      .filter(isModelListItem)
      .filter((model) => model.id.startsWith("auto/"))
      .map((model) => ({ providerId: "auto", modelId: model.id.replace("auto/", "") }));
  } catch {
    return [];
  }
}

async function getModelsForProvider(
  providerId: string
): Promise<Array<{ providerId: string; modelId: string }>> {
  void providerId;
  return getAllModels();
}

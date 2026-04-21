import { NextResponse } from "next/server";
import { getSuite, listSuites, runSuite } from "@/lib/evals/evalRunner";
import { evalRunSuiteSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { evalsDb } from "@/lib/localDb";

export async function GET() {
  try {
    const suites = listSuites();
    return NextResponse.json(suites);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  let rawBody;
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
    const validation = validateBody(evalRunSuiteSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }
    const { suiteId, outputs, targetId = "unknown", targetType = "model" } = validation.data;
    const suite = getSuite(suiteId);
    if (!suite) {
      return NextResponse.json({ error: `Suite not found: ${suiteId}` }, { status: 404 });
    }

    const result = runSuite(suiteId, outputs);
    evalsDb.upsertEvalSuite({
      id: suite.id,
      name: suite.name,
      description: suite.description || "",
    });

    let avgLatency = 0;
    if (result.results && result.results.length > 0) {
      const totalLat = result.results.reduce((sum, r: any) => sum + (r.durationMs || 0), 0);
      avgLatency = Math.round(totalLat / result.results.length);
    }

    const runId = evalsDb.saveEvalResult(
      suiteId,
      targetId,
      targetType as any,
      result.summary.passRate,
      avgLatency,
      result
    );

    return NextResponse.json({ ...result, runId });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { evalsDb } from "@/lib/localDb";
import { createComparisonScorecard } from "@/lib/evals/evalRunner";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { runIdA, runIdB } = body;

    if (!runIdA || !runIdB) {
      return NextResponse.json({ error: "Missing run IDs" }, { status: 400 });
    }

    const rows = evalsDb.getEvalRunsByIds([runIdA, runIdB]);

    if (rows.length !== 2) {
      return NextResponse.json({ error: "One or more runs not found" }, { status: 404 });
    }

    const [runA, runB] = rows;

    if (runA.suiteId !== runB.suiteId) {
      return NextResponse.json(
        { error: "Compare mode requires runs from the same suite" },
        { status: 400 }
      );
    }

    const parsedA = JSON.parse(runA.rawResults);
    const parsedB = JSON.parse(runB.rawResults);

    const scorecard = createComparisonScorecard(parsedA, parsedB, {
      avgLatencyA: runA.avgLatency,
      avgLatencyB: runB.avgLatency,
    });

    return NextResponse.json({
      scorecard,
      meta: {
        suiteId: runA.suiteId,
        targetA: runA.targetId,
        targetB: runB.targetId,
        targetTypeA: runA.targetType,
        targetTypeB: runB.targetType,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

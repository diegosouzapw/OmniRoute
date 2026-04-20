import { NextResponse } from "next/server";
import { evalsDb } from "@/lib/localDb";
import { createScorecard } from "@/lib/evals/evalRunner";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { runIdA, runIdB } = body;

    if (!runIdA || !runIdB) {
      return NextResponse.json({ error: "Missing run IDs" }, { status: 400 });
    }

    const db = require("@/lib/db/core").getDbInstance();
    const stmt = db.prepare("SELECT * FROM eval_results WHERE id IN (?, ?)");
    const rows = stmt.all(runIdA, runIdB);

    if (rows.length !== 2) {
      return NextResponse.json({ error: "One or more runs not found" }, { status: 404 });
    }

    const runA = rows.find((r) => r.id === runIdA);
    const runB = rows.find((r) => r.id === runIdB);

    const parsedA = JSON.parse(runA.raw_results);
    const parsedB = JSON.parse(runB.raw_results);

    const scorecard = createScorecard(parsedA, parsedB);

    return NextResponse.json({
      scorecard,
      meta: { targetA: runA.target_id, targetB: runB.target_id },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

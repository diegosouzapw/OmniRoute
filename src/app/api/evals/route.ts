import { NextResponse } from "next/server";
import { listSuites, runSuite } from "@/lib/evals/evalRunner";

export async function GET() {
  try {
    const suites = listSuites();
    return NextResponse.json(suites);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { suiteId, outputs } = await request.json();
    if (!suiteId || !outputs) {
      return NextResponse.json(
        { error: "suiteId and outputs (Record<caseId, actualOutput>) are required" },
        { status: 400 }
      );
    }
    const result = runSuite(suiteId, outputs);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

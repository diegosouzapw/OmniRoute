import { NextResponse } from "next/server";
import { getCostSummary, setBudget, checkBudget } from "@/domain/costRules";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const apiKeyId = searchParams.get("apiKeyId");
    if (!apiKeyId) {
      return NextResponse.json({ error: "apiKeyId query param is required" }, { status: 400 });
    }
    const summary = getCostSummary(apiKeyId);
    const budgetCheck = checkBudget(apiKeyId);
    return NextResponse.json({ ...summary, budgetCheck });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { apiKeyId, dailyLimitUsd, monthlyLimitUsd, warningThreshold } = await request.json();
    if (!apiKeyId || !dailyLimitUsd) {
      return NextResponse.json({ error: "apiKeyId and dailyLimitUsd are required" }, { status: 400 });
    }
    setBudget(apiKeyId, { dailyLimitUsd, monthlyLimitUsd, warningThreshold });
    return NextResponse.json({ success: true, apiKeyId, dailyLimitUsd });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

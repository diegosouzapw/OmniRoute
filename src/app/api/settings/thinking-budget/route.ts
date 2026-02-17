import { NextResponse } from "next/server";
import { getSettings, updateSettings } from "@/lib/localDb";
import {
  setThinkingBudgetConfig,
  getThinkingBudgetConfig,
  ThinkingMode,
} from "@omniroute/open-sse/services/thinkingBudget.ts";

export async function GET() {
  try {
    const config = getThinkingBudgetConfig();
    return NextResponse.json(config);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();

    // Validate mode
    const validModes = Object.values(ThinkingMode);
    if (body.mode && !validModes.includes(body.mode)) {
      return NextResponse.json(
        { error: `Invalid mode. Must be one of: ${validModes.join(", ")}` },
        { status: 400 }
      );
    }

    // Validate customBudget
    if (body.customBudget !== undefined) {
      const budget = parseInt(body.customBudget, 10);
      if (isNaN(budget) || budget < 0 || budget > 131072) {
        return NextResponse.json(
          { error: "customBudget must be between 0 and 131072" },
          { status: 400 }
        );
      }
      body.customBudget = budget;
    }

    // Validate effortLevel
    const validEfforts = ["none", "low", "medium", "high"];
    if (body.effortLevel && !validEfforts.includes(body.effortLevel)) {
      return NextResponse.json(
        { error: `Invalid effortLevel. Must be one of: ${validEfforts.join(", ")}` },
        { status: 400 }
      );
    }

    // Apply config in-memory
    setThinkingBudgetConfig(body);

    // Persist to settings DB
    await updateSettings({ thinkingBudget: body });

    return NextResponse.json(getThinkingBudgetConfig());
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import {
  getAllComboMetrics,
  getComboMetrics,
  resetComboMetrics,
  resetAllComboMetrics,
} from "@omniroute/open-sse/services/comboMetrics.js";

// GET /api/combos/metrics - Get per-combo metrics
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const comboName = searchParams.get("combo");

    if (comboName) {
      const metrics = getComboMetrics(comboName);
      if (!metrics) {
        return NextResponse.json({ metrics: null, message: "No metrics for this combo yet" });
      }
      return NextResponse.json({ metrics });
    }

    const allMetrics = getAllComboMetrics();
    return NextResponse.json({ metrics: allMetrics });
  } catch (error) {
    console.log("Error fetching combo metrics:", error);
    return NextResponse.json({ error: "Failed to fetch combo metrics" }, { status: 500 });
  }
}

// DELETE /api/combos/metrics - Reset metrics
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const comboName = searchParams.get("combo");

    if (comboName) {
      resetComboMetrics(comboName);
      return NextResponse.json({ success: true, message: `Metrics reset for ${comboName}` });
    }

    resetAllComboMetrics();
    return NextResponse.json({ success: true, message: "All combo metrics reset" });
  } catch (error) {
    console.log("Error resetting combo metrics:", error);
    return NextResponse.json({ error: "Failed to reset combo metrics" }, { status: 500 });
  }
}

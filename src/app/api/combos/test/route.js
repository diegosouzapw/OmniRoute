import { NextResponse } from "next/server";
import { getComboByName } from "@/lib/localDb";

/**
 * POST /api/combos/test - Quick test a combo
 * Sends a minimal request through each model in the combo to verify availability
 */
export async function POST(request) {
  try {
    const { comboName } = await request.json();

    if (!comboName) {
      return NextResponse.json({ error: "comboName is required" }, { status: 400 });
    }

    const combo = await getComboByName(comboName);
    if (!combo) {
      return NextResponse.json({ error: "Combo not found" }, { status: 404 });
    }

    const models = (combo.models || []).map((m) => (typeof m === "string" ? m : m.model));

    if (models.length === 0) {
      return NextResponse.json({ error: "Combo has no models" }, { status: 400 });
    }

    const results = [];
    let resolvedBy = null;

    // Test each model sequentially
    for (const modelStr of models) {
      const startTime = Date.now();
      try {
        // Send a minimal chat request to the internal SSE handler
        const testBody = {
          model: modelStr,
          messages: [{ role: "user", content: "Hi" }],
          max_tokens: 5,
          stream: false,
        };

        const internalUrl = `${getBaseUrl(request)}/v1/chat/completions`;
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 15000); // 15s timeout

        const res = await fetch(internalUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(testBody),
          signal: controller.signal,
        });

        clearTimeout(timeout);
        const latencyMs = Date.now() - startTime;

        if (res.ok) {
          results.push({ model: modelStr, status: "ok", latencyMs });
          if (!resolvedBy) resolvedBy = modelStr;
          // For test, we can stop after first success (like a real combo would)
          // But let's test all models to show full health
        } else {
          let errorMsg = "";
          try {
            const errBody = await res.json();
            errorMsg = errBody?.error?.message || errBody?.error || res.statusText;
          } catch {
            errorMsg = res.statusText;
          }
          results.push({
            model: modelStr,
            status: "error",
            statusCode: res.status,
            error: errorMsg,
            latencyMs,
          });
        }
      } catch (error) {
        const latencyMs = Date.now() - startTime;
        results.push({
          model: modelStr,
          status: "error",
          error: error.name === "AbortError" ? "Timeout (15s)" : error.message,
          latencyMs,
        });
      }
    }

    return NextResponse.json({
      comboName,
      strategy: combo.strategy || "priority",
      resolvedBy,
      results,
      testedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.log("Error testing combo:", error);
    return NextResponse.json({ error: "Failed to test combo" }, { status: 500 });
  }
}

/**
 * Get the base URL for internal requests
 */
function getBaseUrl(request) {
  const url = new URL(request.url);
  return `${url.protocol}//${url.host}`;
}

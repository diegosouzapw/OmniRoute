import { NextResponse } from "next/server";
import { buildComboTestRequestBody, extractComboTestResponseText } from "@/lib/combos/testHealth";
import { getComboByName } from "@/lib/localDb";
import { testComboSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";

/**
 * POST /api/combos/test - Quick test a combo
 * Sends a real chat completion request through each model in the combo
 * and only reports success when the model returns usable text content.
 */
export async function POST(request) {
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
    const validation = validateBody(testComboSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }
    const { comboName } = validation.data;

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
        // Send a minimal but real chat request through the same internal
        // endpoint an external OpenAI-compatible client would use.
        const testBody = buildComboTestRequestBody(modelStr);

        const internalUrl = `${getBaseUrl(request)}/v1/chat/completions`;
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 20000);

        let res;
        try {
          res = await fetch(internalUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              // Internal dashboard tests still use the normal /v1 pipeline but
              // bypass REQUIRE_API_KEY so admins can test with local session auth.
              "X-Internal-Test": "combo-health-check",
            },
            body: JSON.stringify(testBody),
            signal: controller.signal,
          });
        } finally {
          clearTimeout(timeout);
        }

        const latencyMs = Date.now() - startTime;

        if (res.ok) {
          let responseBody = null;
          try {
            responseBody = await res.json();
          } catch {
            responseBody = null;
          }

          const responseText = extractComboTestResponseText(responseBody);
          if (!responseText) {
            results.push({
              model: modelStr,
              status: "error",
              statusCode: res.status,
              error: "Provider returned HTTP 200 but no text content.",
              latencyMs,
            });
            continue;
          }

          results.push({ model: modelStr, status: "ok", latencyMs, responseText });
          if (!resolvedBy) resolvedBy = modelStr;
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
          error: error.name === "AbortError" ? "Timeout (20s)" : error.message,
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
 * Get the base URL for internal requests (VPS-safe: respects reverse proxy headers)
 */
function getBaseUrl(request) {
  const fwdHost = request.headers.get("x-forwarded-host");
  const fwdProto = request.headers.get("x-forwarded-proto") || "https";
  if (fwdHost) return `${fwdProto}://${fwdHost}`;
  const url = new URL(request.url);
  return `${url.protocol}//${url.host}`;
}

import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { buildComboTestRequestBody, extractComboTestResponseText } from "@/lib/combos/testHealth";
import { getApiKeys, getComboByName, getCombos } from "@/lib/localDb";
import { getRuntimePorts } from "@/lib/runtime/ports";
import { resolveNestedComboTargets } from "@omniroute/open-sse/services/combo.ts";
import { testComboSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

async function getInternalApiKey(): Promise<string | null> {
  try {
    const keys = await getApiKeys();
    const active = (
      keys as Array<{ key: string; isActive?: boolean; revokedAt?: string | null }>
    ).find((k) => k.key && k.isActive !== false && !k.revokedAt);
    return active?.key ?? null;
  } catch {
    return null;
  }
}

function buildComboTestResult(target, partial = {}) {
  return {
    model: target.modelStr,
    provider: target.provider,
    stepId: target.stepId,
    executionKey: target.executionKey,
    connectionId: target.connectionId,
    label: target.label,
    ...partial,
  };
}

async function testComboTarget(target, baseInternalUrl, internalApiKey: string | null) {
  const startTime = Date.now();
  try {
    const isEmbedding =
      target.modelStr.toLowerCase().includes("embedding") ||
      target.modelStr.toLowerCase().includes("bge-") ||
      target.modelStr.toLowerCase().includes("text-embed");
    const internalUrl = `${baseInternalUrl}/v1/${isEmbedding ? "embeddings" : "chat/completions"}`;
    const testBody = buildComboTestRequestBody(target.modelStr, isEmbedding);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);

    let res;
    try {
      res = await fetch(internalUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(internalApiKey ? { Authorization: `Bearer ${internalApiKey}` } : {}),
          "X-Internal-Test": "combo-health-check",
          // Force a fresh execution path so combo tests cannot be satisfied by
          // OmniRoute's semantic cache or other request reuse layers.
          "X-OmniRoute-No-Cache": "true",
          ...(target.connectionId ? { "X-OmniRoute-Connection": target.connectionId } : {}),
          "X-Request-Id": `combo-test-${randomUUID()}`,
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
        return buildComboTestResult(target, {
          status: "error",
          statusCode: res.status,
          error: "Provider returned HTTP 200 but no text content.",
          latencyMs,
        });
      }

      return buildComboTestResult(target, { status: "ok", latencyMs, responseText });
    }

    let errorMsg = "";
    try {
      const errBody = await res.json();
      errorMsg = errBody?.error?.message || errBody?.error || res.statusText;
    } catch {
      errorMsg = res.statusText;
    }

    return buildComboTestResult(target, {
      status: "error",
      statusCode: res.status,
      error: errorMsg,
      latencyMs,
    });
  } catch (error) {
    const latencyMs = Date.now() - startTime;
    return buildComboTestResult(target, {
      status: "error",
      error: error.name === "AbortError" ? "Timeout (20s)" : error.message,
      latencyMs,
    });
  }
}

/**
 * POST /api/combos/test - Quick test a combo
 * Sends a real chat completion request through each model in the combo
 * and only reports success when the model returns usable text content.
 */
export async function POST(request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

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

    const allCombos = await getCombos();
    const targets = resolveNestedComboTargets(combo, allCombos);

    if (targets.length === 0) {
      return NextResponse.json({ error: "Combo has no models" }, { status: 400 });
    }

    const baseInternalUrl = getInternalBaseUrl();
    const internalApiKey = await getInternalApiKey();
    const results = await Promise.all(
      targets.map((target) => testComboTarget(target, baseInternalUrl, internalApiKey))
    );
    const resolvedResult = results.find((result) => result.status === "ok") || null;
    const resolvedBy = resolvedResult?.model || null;

    return NextResponse.json({
      comboName,
      strategy: combo.strategy || "priority",
      resolvedBy,
      resolvedByExecutionKey: resolvedResult?.executionKey || null,
      resolvedByTarget: resolvedResult
        ? {
            model: resolvedResult.model,
            provider: resolvedResult.provider,
            stepId: resolvedResult.stepId,
            executionKey: resolvedResult.executionKey,
            connectionId: resolvedResult.connectionId,
            label: resolvedResult.label,
          }
        : null,
      results,
      testedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.log("Error testing combo:", error);
    return NextResponse.json({ error: "Failed to test combo" }, { status: 500 });
  }
}

function getInternalBaseUrl(): string {
  const { apiPort } = getRuntimePorts();
  return `http://127.0.0.1:${apiPort}`;
}

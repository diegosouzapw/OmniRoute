/**
 * Per-API-Key Token Limits — CRUD Route
 *
 * Management-class endpoint for listing, creating/updating, and deleting
 * token-limit budgets attached to an API key (model / provider / global scope).
 * Auth and CORS are enforced centrally by the global authz pipeline
 * (src/proxy.ts → runAuthzPipeline); this file intentionally adds neither.
 *
 * @route /api/usage/token-limits
 */

import { NextResponse } from "next/server";
import { setTokenLimitSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { buildErrorBody, sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";
import {
  listTokenLimits,
  upsertTokenLimit,
  deleteTokenLimit,
  getWindowUsage,
  resetWindowIfElapsed,
} from "@/lib/localDb";
import type { TokenLimit } from "@/lib/db/tokenLimits";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const apiKeyId = searchParams.get("apiKeyId");
    if (!apiKeyId) {
      return NextResponse.json(buildErrorBody(400, "apiKeyId query param is required"), {
        status: 400,
      });
    }
    const limits = listTokenLimits(apiKeyId).map((limit: TokenLimit) => {
      const usage = getWindowUsage(limit);
      const window = resetWindowIfElapsed(limit);
      return {
        ...limit,
        tokensUsed: usage,
        windowStart: window.windowStart,
        periodStartAt: window.periodStartAt,
        nextResetAt: window.nextResetAt,
        remaining: Math.max(0, limit.tokenLimit - usage),
      };
    });
    return NextResponse.json({ apiKeyId, limits });
  } catch (error) {
    console.error("Error listing token limits:", error);
    return NextResponse.json(buildErrorBody(500, sanitizeErrorMessage(error)), { status: 500 });
  }
}

export async function POST(request: Request) {
  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json(buildErrorBody(400, "Invalid JSON body"), { status: 400 });
  }

  try {
    const validation = validateBody(setTokenLimitSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }
    const { id, apiKeyId, scopeType, scopeValue, tokenLimit, resetInterval, resetTime, enabled } =
      validation.data;
    const limit = upsertTokenLimit({
      id,
      apiKeyId,
      scopeType,
      scopeValue,
      tokenLimit,
      resetInterval,
      resetTime,
      enabled,
    });
    return NextResponse.json({ success: true, limit });
  } catch (error) {
    console.error("Error setting token limit:", error);
    return NextResponse.json(buildErrorBody(500, sanitizeErrorMessage(error)), { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json(buildErrorBody(400, "id query param is required"), { status: 400 });
  }
  try {
    const deleted = deleteTokenLimit(id);
    return NextResponse.json({ success: deleted }, { status: deleted ? 200 : 404 });
  } catch (error) {
    console.error("Error deleting token limit:", error);
    return NextResponse.json(buildErrorBody(500, sanitizeErrorMessage(error)), { status: 500 });
  }
}

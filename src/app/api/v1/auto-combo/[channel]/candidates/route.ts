/**
 * GET /api/v1/auto-combo/[channel]/candidates — #7819 Level 1: read-only
 * candidate pool + live reachability for one `auto/*` channel, decorated
 * with this API key's exclusion state (#7819 Level 2).
 *
 * `channel` is the suffix after "auto/" (e.g. "best-coding", "coding:free",
 * "glm") or the literal "auto" for the base channel.
 */
import { NextResponse } from "next/server";
import { z } from "zod";
import { CORS_HEADERS, handleCorsOptions } from "@/shared/utils/cors";
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";
import { getApiKeyRequestScope } from "@/app/api/v1/_helpers/apiKeyScope";
import {
  getAutoComboCandidates,
  isUnknownAutoChannelError,
} from "@omniroute/open-sse/handlers/autoComboCandidates.ts";

const channelParamSchema = z
  .string()
  .min(1)
  .max(128)
  .regex(/^[a-zA-Z0-9:_-]+$/, "channel must be a simple auto/* suffix");

export async function OPTIONS() {
  return handleCorsOptions();
}

export async function GET(request: Request, { params }: { params: Promise<{ channel: string }> }) {
  const scope = await getApiKeyRequestScope(request);
  if (scope.rejection) return scope.rejection;

  // #13881 folds a revoked/expired/banned key into `{ apiKeyId: null }`, which is
  // the right fail-closed shape for owner-scoped records. Here `null` is the
  // OPPOSITE: it is the anonymous scope, and `getAutoComboCandidates()` then
  // applies no per-key exclusions at all, so an invalid key would receive a
  // wider pool than a valid one. A presented key that did not validate is
  // therefore refused, exactly like `resolveListScope()` does for list reads.
  // Session auth is left alone, so an operator's dashboard request is unaffected
  // even when it carries a stale bearer header (the precedence question is #14333
  // LEDGER-21, deliberately not settled here).
  if (!scope.isSessionAuth && scope.apiKey && !scope.apiKeyId) {
    return NextResponse.json(buildErrorBody(401, "Invalid API key"), {
      status: 401,
      headers: CORS_HEADERS,
    });
  }

  const { channel: rawChannel } = await params;
  const parsedChannel = channelParamSchema.safeParse(rawChannel);
  if (!parsedChannel.success) {
    return NextResponse.json(buildErrorBody(400, "Invalid auto channel"), {
      status: 400,
      headers: CORS_HEADERS,
    });
  }

  try {
    const result = await getAutoComboCandidates(parsedChannel.data, scope.apiKeyId);
    return NextResponse.json(result, { headers: CORS_HEADERS });
  } catch (err) {
    if (isUnknownAutoChannelError(err)) {
      return NextResponse.json(buildErrorBody(404, "Unknown auto channel"), {
        status: 404,
        headers: CORS_HEADERS,
      });
    }
    return NextResponse.json(
      buildErrorBody(500, err instanceof Error ? err.message : "Failed to list candidates"),
      { status: 500, headers: CORS_HEADERS }
    );
  }
}

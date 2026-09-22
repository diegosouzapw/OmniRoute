import { CORS_HEADERS, handleCorsOptions } from "@/shared/utils/cors";
import { createBatch, listBatches, countBatches } from "@/lib/db/batches";
import { getFile } from "@/lib/db/files";
import { v1BatchCreateSchema } from "@/shared/validation/schemas";
import { NextResponse } from "next/server";
import {
  getApiKeyRequestScope,
  canAccessOwnedRecord,
  resolveListScope,
  resolveEffectiveApiKeyId,
} from "@/app/api/v1/_helpers/apiKeyScope";
import { enforceApiKeyPolicy } from "@/shared/utils/apiKeyPolicy";
import { formatBatchResponse } from "./formatBatchResponse";
import { parseBatchListLimit } from "./parseListLimit";
import { buildErrorBody, sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

export async function OPTIONS() {
  return handleCorsOptions();
}

export async function POST(request: Request) {
  const scope = await getApiKeyRequestScope(request);
  if (scope.rejection) return scope.rejection;

  // Fail closed on an unresolvable OR invalid credential — the same 401 fold
  // `getApiKeyRequestScope` already applies (`apiKeyId: null` for a
  // revoked/expired/banned/deactivated/unresolvable key, #13881) — so the
  // per-key policy check below never has to special-case that status itself.
  if (scope.apiKey && !scope.apiKeyId) {
    return NextResponse.json(buildErrorBody(401, "Invalid API key"), {
      status: 401,
      headers: CORS_HEADERS,
    });
  }

  // per-key operator policy (endpoint allowlist, schedule, usage cap, rate
  // limit) — LEDGER-2 of the omni-code-sec 2026-09-21 run / #14481. Called
  // UNCONDITIONALLY, exactly like batches/delete-completed/route.ts: a bare
  // `x-api-key`/`x-goog-api-key` credential (no anthropic-version, non-Claude
  // UA) is accepted by the CLIENT_API auth layer but ignored by
  // getApiKeyRequestScope's extractApiKey() (scope.apiKeyId stays null for
  // it) — enforceApiKeyPolicy resolves it independently via
  // extractUngatedClientApiKey() (GHSA-2phc-xp22-9f56), so gating this call
  // on scope.apiKeyId let that transport skip the endpoint allowlist,
  // schedule, usage cap, rate limit and key quota entirely (round-2 PoC
  // against e543b64). A keyless caller (session/anonymous) is a no-op here.
  const policy = await enforceApiKeyPolicy(request, null);
  if (policy.rejection) return policy.rejection;

  // A key resolved only via the ungated x-api-key/x-goog-api-key transport
  // never sets scope.apiKeyId (see the comment above) — fall back to the id
  // enforceApiKeyPolicy() independently resolved, so the batch is not
  // attributed to nobody, and its ownership check below still recognizes the
  // key's own input file (LEDGER-27, omni-code-sec round 3).
  const effectiveApiKeyId = resolveEffectiveApiKeyId(scope, policy.apiKeyInfo);

  try {
    const body = await request.json();
    const validation = v1BatchCreateSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          error: {
            message: validation.error.message,
            type: "invalid_request_error",
          },
        },
        { status: 400, headers: CORS_HEADERS }
      );
    }
    const validated = validation.data;

    // The batch runs LLM requests over the input file's content, so the caller
    // must be allowed to READ that file: own key, or the operator's session. A
    // null-owner input file is denied to a foreign key and to an anonymous
    // caller alike (GHSA-2jm2-mpx8-6523).
    const inputFile = getFile(validated.input_file_id);
    if (
      !inputFile ||
      !canAccessOwnedRecord({ ...scope, apiKeyId: effectiveApiKeyId }, inputFile.apiKeyId)
    ) {
      return NextResponse.json(
        { error: { message: "Input file not found", type: "invalid_request_error" } },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    const batch = createBatch({
      endpoint: validated.endpoint as any,
      completionWindow: validated.completion_window,
      inputFileId: validated.input_file_id,
      metadata: validated.metadata,
      apiKeyId: effectiveApiKeyId,
      outputExpiresAfterSeconds: validated.output_expires_after?.seconds || null,
      outputExpiresAfterAnchor: validated.output_expires_after?.anchor || null,
    });

    return NextResponse.json(formatBatchResponse(batch), { headers: CORS_HEADERS });
  } catch (error) {
    console.error("[BATCHES] Create failed:", error);
    return NextResponse.json(
      {
        error: {
          // Hard Rule #12: never forward a raw Error message to the client —
          // DB-layer errors can carry file paths, SQL fragments or internal
          // identifiers (#14089).
          message:
            sanitizeErrorMessage(error instanceof Error ? error.message : "Create failed") ||
            "Create failed",
          type: "invalid_request_error",
        },
      },
      { status: 400, headers: CORS_HEADERS }
    );
  }
}

export async function GET(request: Request) {
  const scope = await getApiKeyRequestScope(request);
  if (scope.rejection) return scope.rejection;

  // Fail closed on an unresolvable OR invalid credential — the same 401 fold
  // `getApiKeyRequestScope` already applies (`apiKeyId: null` for a
  // revoked/expired/banned/deactivated/unresolvable key, #13881) — so the
  // per-key policy check below never has to special-case that status itself.
  if (scope.apiKey && !scope.apiKeyId) {
    return NextResponse.json(buildErrorBody(401, "Invalid API key"), {
      status: 401,
      headers: CORS_HEADERS,
    });
  }

  // per-key operator policy (endpoint allowlist, schedule, usage cap, rate
  // limit) — LEDGER-2 of the omni-code-sec 2026-09-21 run / #14481. Called
  // UNCONDITIONALLY, exactly like batches/delete-completed/route.ts: a bare
  // `x-api-key`/`x-goog-api-key` credential (no anthropic-version, non-Claude
  // UA) is accepted by the CLIENT_API auth layer but ignored by
  // getApiKeyRequestScope's extractApiKey() (scope.apiKeyId stays null for
  // it) — enforceApiKeyPolicy resolves it independently via
  // extractUngatedClientApiKey() (GHSA-2phc-xp22-9f56), so gating this call
  // on scope.apiKeyId let that transport skip the endpoint allowlist,
  // schedule, usage cap, rate limit and key quota entirely (round-2 PoC
  // against e543b64). A keyless caller (session/anonymous) is a no-op here.
  const policy = await enforceApiKeyPolicy(request, null);
  if (policy.rejection) return policy.rejection;

  // Key → own batches only; dashboard session without a key → instance-wide;
  // anonymous / unresolvable bearer → 401. `listBatches`/`countBatches` read an
  // absent owner as "every tenant", so the widening must be an explicit
  // decision here, never a fallback (GHSA-m3hp-hq9g-fpmv).
  const listScope = resolveListScope(scope);
  if (listScope.mode === "rejected") return listScope.response;
  const ownerFilter = listScope.mode === "api_key" ? listScope.apiKeyId : undefined;

  const url = new URL(request.url);
  const parsedLimit = parseBatchListLimit(url.searchParams.get("limit"));
  if (!parsedLimit.ok) {
    return NextResponse.json(
      { error: { message: parsedLimit.message, type: "invalid_request_error" } },
      { status: 400, headers: CORS_HEADERS }
    );
  }
  const limit = parsedLimit.limit;
  const after = url.searchParams.get("after") || undefined;

  const batches = listBatches(ownerFilter, limit + 1, after);
  const hasMore = batches.length > limit;
  const data = hasMore ? batches.slice(0, limit) : batches;

  const formattedData = data.map((b) => formatBatchResponse(b));

  const totalCount = countBatches(ownerFilter);

  return NextResponse.json(
    {
      object: "list",
      data: formattedData,
      first_id: formattedData.length > 0 ? formattedData[0].id : null,
      last_id: formattedData.length > 0 ? formattedData.at(-1).id : null,
      has_more: hasMore,
      total_count: totalCount,
    },
    { headers: CORS_HEADERS }
  );
}

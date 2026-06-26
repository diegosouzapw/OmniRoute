/**
 * Combo API error helper (T-22.b).
 *
 * Standardizes the 400/404/409 response shape for `/api/combos/*` routes.
 * Every failure surfaces a stable machine-readable `code` token (from
 * `src/shared/constants/errorCodes.ts`), a human-readable `message`, an
 * optional `details` payload, and the current `requestId` for log
 * correlation. The prior shape returned `{ error: <string|object> }` with
 * no `code` field, which forced clients to string-match English error
 * messages. See `plans/2026-06-23-omniroute-v3.8.34-deep-audit.md` (Bug #3).
 *
 * Usage:
 *   return comboErrorResponse("COMBO_002", 400, { issues: validation.issues });
 *   return comboErrorResponse("COMBO_005", 400, { reason: "cycle-detected" });
 *
 * The response is a plain `Response` (not `NextResponse.json`) so it can
 * be used from both Next.js route handlers and server-side callers. The
 * `x-request-id` header is also attached for downstream log correlation.
 */

import { ERROR_CODES } from "@/shared/constants/errorCodes";
import {
  attachRequestIdToResponse,
  getRequestId,
} from "@/shared/utils/requestId";

export type ComboErrorCode =
  | "COMBO_001" // request body is not valid JSON
  | "COMBO_002" // zod schema failure
  | "COMBO_003" // composite tier config invalid
  | "COMBO_004" // name collision
  | "COMBO_005" // DAG cycle / depth overflow
  | "COMBO_006" // managed by Quota Share (409)
  | "COMBO_007" // not found (404)
  | "VALID_001" // generic invalid body
  | "VALID_002" // missing required field
  | "INTERNAL_001"; // fallback

export interface ComboErrorBody {
  error: {
    code: ComboErrorCode;
    message: string;
    category: string;
    details?: unknown;
    requestId?: string;
  };
}

export function buildComboErrorBody(
  code: ComboErrorCode,
  details?: unknown
): ComboErrorBody {
  const def = ERROR_CODES[code] ?? ERROR_CODES.INTERNAL_001;
  const requestId = getRequestId();
  return {
    error: {
      code: def.code as ComboErrorCode,
      message: def.message,
      category: def.category,
      ...(details !== undefined ? { details } : {}),
      ...(requestId ? { requestId } : {}),
    },
  };
}

export function comboErrorResponse(
  code: ComboErrorCode,
  status?: number,
  details?: unknown,
  request?: Request
): Response {
  const def = ERROR_CODES[code] ?? ERROR_CODES.INTERNAL_001;
  const httpStatus = status ?? def.httpStatus;
  const body = buildComboErrorBody(code, details);
  const response = Response.json(body, { status: httpStatus });
  // Attach x-request-id header for downstream consumers. If a request is
  // passed, prefer to derive its id (works outside withRequestId scope);
  // otherwise the response body already carries requestId when available.
  return request ? attachRequestIdToResponse(request, response) : response;
}

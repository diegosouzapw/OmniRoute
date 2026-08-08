// Validates the `limit` query param for `GET /v1/batches`. The list endpoint previously
// passed `Number.parseInt(limit)` straight to the SQLite `LIMIT ?` bind with no validation,
// so `?limit=abc` threw an unhandled "datatype mismatch" (→ 500), `?limit=-1|0` produced an
// incoherent `has_more:true` empty page, and a large `?limit` read the whole table.
//
// This mirrors the OpenAI Batches list contract (integer, 1–100, default 20) and the repo's
// own query-param bounds (see `max_results` in src/shared/validation/schemas/apiV1.ts:
// `z.coerce.number().int().min(1).max(100)`). Kept dependency-free so it is unit-testable
// in isolation; swap in the Zod schema if the maintainer prefers.

export const DEFAULT_BATCH_LIST_LIMIT = 20;
export const MAX_BATCH_LIST_LIMIT = 100;

export type ParsedListLimit =
  | { ok: true; limit: number }
  | { ok: false; message: string };

export function parseBatchListLimit(raw: string | null): ParsedListLimit {
  if (raw === null || raw === "") {
    return { ok: true, limit: DEFAULT_BATCH_LIST_LIMIT };
  }
  const n = Number(raw);
  if (!Number.isInteger(n) || n < 1 || n > MAX_BATCH_LIST_LIMIT) {
    return {
      ok: false,
      message: `'limit' must be an integer between 1 and ${MAX_BATCH_LIST_LIMIT}`,
    };
  }
  return { ok: true, limit: n };
}

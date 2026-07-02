import { NextResponse } from "next/server";
import { z } from "zod";
import { normalizeCodexImportRecord, flattenCodexImportPayload } from "@/lib/oauth/services/codexImport";
import { createProviderConnection } from "@/models";
import { isAuthRequired, isAuthenticated } from "@/shared/utils/apiAuth";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";

/**
 * POST /api/oauth/codex/import
 *
 * Bulk-import Codex (OpenAI) accounts from JSON payloads produced by the Codex
 * CLI or common token-export tools. Each item may be a flat export
 * (`access_token`, `refresh_token`, …) or the CLI's nested `auth.json` shape.
 *
 * Body: `{ accounts: object | object[] }`
 *
 * Returns a per-record summary so partial successes are surfaced to the UI.
 *
 * Ported from decolua/9router#1257 (beaaan).
 */

const bodySchema = z.object({
  accounts: z.union([z.record(z.unknown()), z.array(z.unknown())], {
    errorMap: () => ({ message: "accounts must be an object or an array of objects" }),
  }),
});

async function requireAuth(request: Request): Promise<NextResponse | null> {
  if (!(await isAuthRequired(request))) return null;
  if (await isAuthenticated(request)) return null;
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function POST(request: Request) {
  const authResponse = await requireAuth(request);
  if (authResponse) return authResponse;

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid or empty JSON body" },
      { status: 400 },
    );
  }

  const parsed = bodySchema.safeParse(rawBody);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.errors[0]?.message ?? "Invalid request body" },
      { status: 400 },
    );
  }

  const flat = flattenCodexImportPayload(parsed.data.accounts);
  if (!flat.ok) {
    return NextResponse.json({ error: flat.error }, { status: 400 });
  }
  if (flat.records.length === 0) {
    return NextResponse.json(
      { error: "No accounts found in payload" },
      { status: 400 },
    );
  }

  const results: Array<
    | { index: number; ok: true; connectionId: string; email: string }
    | { index: number; ok: false; error: string }
  > = [];
  let imported = 0;
  let failed = 0;

  for (let i = 0; i < flat.records.length; i++) {
    const norm = normalizeCodexImportRecord(flat.records[i]);
    if (!norm.ok) {
      failed += 1;
      results.push({ index: i, ok: false, error: norm.error });
      continue;
    }
    try {
      const conn = await createProviderConnection(norm.payload as Record<string, unknown>);
      imported += 1;
      results.push({
        index: i,
        ok: true,
        connectionId: String(conn.id),
        email: String(conn.email ?? norm.payload.email),
      });
    } catch (error) {
      failed += 1;
      results.push({
        index: i,
        ok: false,
        error: sanitizeErrorMessage(error instanceof Error ? error.message : String(error)),
      });
    }
  }

  return NextResponse.json({
    success: failed === 0,
    imported,
    failed,
    total: flat.records.length,
    results,
  });
}

import { NextResponse } from "next/server";
import { z } from "zod";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { issueRegisteredKey, checkQuota, listRegisteredKeys } from "@/lib/db/registeredKeys";

// ─── Validation ───────────────────────────────────────────────────────────────

const issueKeySchema = z.object({
  name: z.string().min(1).max(120),
  provider: z.string().max(80).optional().default(""),
  accountId: z.string().max(120).optional().default(""),
  idempotencyKey: z.string().max(256).optional(),
  expiresAt: z.string().datetime({ offset: true }).optional(),
  dailyBudget: z.number().int().positive().optional(),
  hourlyBudget: z.number().int().positive().optional(),
});

// ─── GET /api/v1/registered-keys ─────────────────────────────────────────────

/**
 * List registered keys (masked — no raw key material returned after creation).
 * Optional query params: ?provider=&accountId=
 */
export async function GET(request: Request) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: { message: "Authentication required" } }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const provider = searchParams.get("provider") ?? undefined;
  const accountId = searchParams.get("accountId") ?? undefined;

  try {
    const keys = listRegisteredKeys({ provider, accountId });
    return NextResponse.json({ keys, total: keys.length });
  } catch (err) {
    console.error("[registered-keys] GET failed:", err);
    return NextResponse.json({ error: "Failed to list registered keys" }, { status: 500 });
  }
}

// ─── POST /api/v1/registered-keys ────────────────────────────────────────────

/**
 * Issue a new registered key.
 *
 * Checks provider + account quotas before issuing.
 * Returns the raw key ONCE — it is never stored in plain text.
 * Subsequent fetches will only return the masked prefix.
 */
export async function POST(request: Request) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: { message: "Authentication required" } }, { status: 401 });
  }

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const validation = validateBody(issueKeySchema, rawBody);
  if (isValidationFailure(validation)) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const { provider, accountId } = validation.data;

  // ── Quota check ──
  try {
    const quota = checkQuota(provider, accountId);
    if (!quota.allowed) {
      return NextResponse.json(
        { error: quota.errorMessage, errorCode: quota.errorCode },
        { status: 429 }
      );
    }
  } catch (err) {
    console.error("[registered-keys] quota check failed:", err);
    return NextResponse.json({ error: "Quota check failed" }, { status: 500 });
  }

  // ── Issue ──
  try {
    const result = issueRegisteredKey(validation.data);

    if ("idempotencyConflict" in result) {
      return NextResponse.json(
        {
          error: "Idempotency key already used",
          errorCode: "IDEMPOTENCY_CONFLICT",
          existing: result.existing,
        },
        { status: 409 }
      );
    }

    const { rawKey, ...keyMeta } = result;
    return NextResponse.json(
      {
        key: rawKey, // ← shown ONCE only
        keyId: keyMeta.id,
        keyPrefix: keyMeta.keyPrefix,
        name: keyMeta.name,
        provider: keyMeta.provider,
        accountId: keyMeta.accountId,
        expiresAt: keyMeta.expiresAt,
        createdAt: keyMeta.createdAt,
        warning: "Store this key securely — it will not be shown again.",
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("[registered-keys] issue failed:", err);
    return NextResponse.json({ error: "Failed to issue key" }, { status: 500 });
  }
}

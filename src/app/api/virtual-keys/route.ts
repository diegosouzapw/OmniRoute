/**
 * REST: /api/virtual-keys
 *
 * B5 of v8.1 Bifrost track (ADR-031). Endpoints:
 *   - POST /api/virtual-keys          → mint a new key (returns rawKey ONCE)
 *   - GET  /api/virtual-keys?tenantId=…  → list keys (optionally filtered)
 *
 * Auth: requireManagementAuth (same as the legacy /api/keys CRUD; the
 * "keys:write" scope check is enforced in the A2A skill and at the
 * BFF/proxy edge, not here — this is an admin-only management surface).
 */
import { NextResponse } from "next/server";
import { z } from "zod";
import {
  mintVirtualKey,
  listVirtualKeysForTenant,
  listAllVirtualKeys,
} from "@/lib/db/virtualKeys";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import * as log from "@/sse/utils/logger";

function asString(value: unknown): string | null {
  return typeof value === "string" && value.length > 0 ? value : null;
}

function asStringArrayOrUndefined(value: unknown): string[] | undefined {
  if (value === undefined || value === null) return undefined;
  if (!Array.isArray(value)) return undefined;
  const filtered = value.filter((v): v is string => typeof v === "string");
  return filtered.length > 0 ? filtered : undefined;
}

const virtualKeyBodySchema = z.object({
  tenantId: z.string().min(1).optional(),
  tenant_id: z.string().min(1).optional(),
  label: z.string().optional(),
  allowedModels: z.array(z.string()).optional(),
  allowed_models: z.array(z.string()).optional(),
  maxCostUsd: z.number().finite().nonnegative().nullable().optional(),
  max_cost_usd: z.number().finite().nonnegative().nullable().optional(),
  maxRpd: z.number().int().nonnegative().nullable().optional(),
  max_rpd: z.number().int().nonnegative().nullable().optional(),
  expiresAt: z.string().nullable().optional(),
  expires_at: z.string().nullable().optional(),
}).refine((body) => Boolean(body.tenantId ?? body.tenant_id), {
  message: "tenantId is required",
  path: ["tenantId"],
});

// GET /api/virtual-keys?tenantId=X
export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const url = new URL(request.url);
    const tenantId = url.searchParams.get("tenantId");
    const keys = tenantId ? listVirtualKeysForTenant(tenantId) : listAllVirtualKeys();
    // NOTE: never expose the hash. The raw key is also never returned by
    // list / get; only mint (POST) returns it, and only on creation.
    return NextResponse.json({
      keys,
      total: keys.length,
    });
  } catch (error) {
    log.error("virtual-keys", "Error listing virtual keys", error);
    return NextResponse.json({ error: "Failed to list virtual keys" }, { status: 500 });
  }
}

// POST /api/virtual-keys
//
// Body:
//   {
//     tenantId:      string  (required)
//     label?:        string
//     allowedModels?: string[]
//     maxCostUsd?:   number | null
//     maxRpd?:       number | null
//     expiresAt?:    string  (ISO 8601) | null
//   }
//
// Response (201):
//   {
//     key:        VirtualKey  (no hash, no raw key on subsequent reads)
//     rawKey:     string      (shown ONCE — caller must surface to user)
//   }
export async function POST(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!rawBody || typeof rawBody !== "object") {
    return NextResponse.json({ error: "Body must be a JSON object" }, { status: 400 });
  }
  const parsedBody = virtualKeyBodySchema.safeParse(rawBody);
  if (!parsedBody.success) {
    return NextResponse.json({ error: "Invalid virtual key request body" }, { status: 400 });
  }
  const body = parsedBody.data;

  const tenantId = asString(body["tenantId"] ?? body["tenant_id"]);
  if (!tenantId) {
    return NextResponse.json(
      { error: "tenantId is required" },
      { status: 400 },
    );
  }

  // Validate expiresAt if provided
  const expiresAtRaw = asString(body["expiresAt"] ?? body["expires_at"]);
  let expiresAt: string | null = null;
  if (expiresAtRaw) {
    const parsed = new Date(expiresAtRaw);
    if (Number.isNaN(parsed.getTime())) {
      return NextResponse.json(
        { error: "expiresAt must be a valid ISO 8601 timestamp" },
        { status: 400 },
      );
    }
    expiresAt = parsed.toISOString();
  }

  // Validate numeric caps
  const maxCostUsdRaw = body["maxCostUsd"] ?? body["max_cost_usd"];
  let maxCostUsd: number | null = null;
  if (maxCostUsdRaw !== undefined && maxCostUsdRaw !== null) {
    if (typeof maxCostUsdRaw !== "number" || !Number.isFinite(maxCostUsdRaw) || maxCostUsdRaw < 0) {
      return NextResponse.json(
        { error: "maxCostUsd must be a non-negative number" },
        { status: 400 },
      );
    }
    maxCostUsd = maxCostUsdRaw;
  }

  const maxRpdRaw = body["maxRpd"] ?? body["max_rpd"];
  let maxRpd: number | null = null;
  if (maxRpdRaw !== undefined && maxRpdRaw !== null) {
    if (
      typeof maxRpdRaw !== "number" ||
      !Number.isInteger(maxRpdRaw) ||
      maxRpdRaw < 0
    ) {
      return NextResponse.json(
        { error: "maxRpd must be a non-negative integer" },
        { status: 400 },
      );
    }
    maxRpd = maxRpdRaw;
  }

  const allowedModels = asStringArrayOrUndefined(body["allowedModels"] ?? body["allowed_models"]);
  const label = asString(body["label"]) ?? "";

  try {
    const minted = mintVirtualKey(tenantId, {
      label,
      allowedModels: allowedModels ?? null,
      maxCostUsd,
      maxRpd,
      expiresAt,
    });

    // Surface the rawKey once. The caller MUST display this to the user —
    // it is unrecoverable from the stored hash.
    const { rawKey, ...meta } = minted;
    return NextResponse.json(
      {
        key: meta,
        rawKey,
      },
      { status: 201 },
    );
  } catch (error) {
    log.error("virtual-keys", "Error minting virtual key", error);
    return NextResponse.json({ error: "Failed to mint virtual key" }, { status: 500 });
  }
}

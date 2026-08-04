import { NextResponse } from "next/server";
import { z } from "zod";
import { loadTierConfig, saveTierConfig } from "@/lib/db/tierConfig";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { setTierConfig } from "@omniroute/open-sse/services/tierResolver";
import { buildErrorBody } from "@omniroute/open-sse/utils/error";

/**
 * Settings route for a single provider's routing-tier override (#7818).
 *
 * `classifyTier()` (`open-sse/services/tierResolver.ts`) already honors
 * `TierConfig.providerOverrides` — an array of `{ provider, tier }` keyed by the
 * provider **id string** — but nothing exposed it through the API/UI for any
 * provider, built-in or custom. This route is that missing surface: it reads
 * and writes a single entry in that same array through the existing
 * `tier_config` table (`loadTierConfig()`/`saveTierConfig()`), and busts the
 * in-process routing cache via `setTierConfig()` so a change takes effect on
 * the very next request without a restart.
 */

const tierOverridePutSchema = z.object({
  provider: z.string().min(1),
  tier: z.enum(["free", "cheap", "premium"]).nullable(),
});

export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  return NextResponse.json(loadTierConfig());
}

export async function PUT(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  const rawBody = await request.json().catch(() => null);
  const parsed = tierOverridePutSchema.safeParse(rawBody);
  if (!parsed.success) {
    return NextResponse.json(buildErrorBody(400, "Invalid tier override payload"), {
      status: 400,
    });
  }

  const { provider, tier } = parsed.data;
  const config = loadTierConfig();
  const nextOverrides = config.providerOverrides.filter(
    (o) => o.provider.toLowerCase() !== provider.toLowerCase()
  );
  if (tier !== null) {
    nextOverrides.push({ provider, tier });
  }
  const nextConfig = { ...config, providerOverrides: nextOverrides };

  saveTierConfig(nextConfig);
  setTierConfig(nextConfig); // bust the in-process routing cache immediately

  return NextResponse.json(nextConfig);
}

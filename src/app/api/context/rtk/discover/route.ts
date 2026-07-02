import { NextResponse } from "next/server";
import {
  discoverRepeatedNoise,
  listRtkCommandSamples,
} from "@omniroute/open-sse/services/compression/engines/rtk";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

/** Parse a positive `limit` query param, clamped to [1, 2000]; default 500. */
function parseLimit(value: string | null): number {
  const n = Number(value);
  if (!Number.isFinite(n) || n <= 0) return 500;
  return Math.min(2000, Math.floor(n));
}

/**
 * GET /api/context/rtk/discover — mine the opt-in RTK raw-output sample store for
 * recurring noise lines and return them as ranked candidates the operator can review
 * and turn into strip/collapse filters. Read-only; suggestions only.
 */
export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  const limit = parseLimit(new URL(request.url).searchParams.get("limit"));
  const samples = listRtkCommandSamples({ limit });
  const candidates = discoverRepeatedNoise(samples);

  return NextResponse.json({ sampleCount: samples.length, candidates });
}

import { NextResponse } from "next/server";
import { z } from "zod";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { rankCandidates } from "@/lib/routing/adaptiveRouting";

const candidateSchema = z.object({
  providerId: z.string().min(1),
  modelId: z.string().min(1),
  capabilityScore: z.number().min(0).max(1),
  allocation: z.enum(["allow", "warn", "deny"]),
  healthScore: z.number().min(0).max(1),
  circuit: z.enum(["closed", "open", "half_open"]),
  quota: z.enum(["healthy", "approaching_limit", "exhausted", "unavailable", "unknown"]),
  latencyMs: z.number().nonnegative().optional(),
  errorRate: z.number().min(0).max(1).optional(),
  modelPreference: z.number().min(0).max(1).optional(),
  costPreference: z.number().min(0).max(1).optional(),
});

const requestSchema = z.object({ candidates: z.array(candidateSchema).min(1).max(100) });

/** Deterministic routing preview. It never calls an upstream provider. */
export async function POST(request: Request): Promise<Response> {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  const parsed = requestSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: parsed.error.message }, { status: 400 });

  const result = rankCandidates(parsed.data);
  return NextResponse.json({
    request: { candidateCount: parsed.data.candidates.length },
    ...result,
    selected: result.selected?.providerId ?? null,
    liveRequestExecuted: false,
  });
}

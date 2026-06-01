import { NextResponse } from "next/server";
import pino from "pino";
import { z } from "zod";

import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";

import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { buildProviderHealthMatrix } from "@/lib/monitoring/providerHealthMatrix";

const logger = pino({ name: "provider-health-matrix-api" });

const healthMatrixQuerySchema = z.object({
  provider: z.string().trim().min(1).nullable(),
  range: z.enum(["1h", "24h", "7d", "30d"]).nullable(),
  includeHealthy: z
    .enum(["true", "false", "1", "0"])
    .nullable()
    .transform((value) => (value === null ? true : value === "true" || value === "1")),
});

export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const url = new URL(request.url);
    const parsedQuery = healthMatrixQuerySchema.safeParse({
      provider: url.searchParams.get("provider"),
      range: url.searchParams.get("range"),
      includeHealthy: url.searchParams.get("includeHealthy"),
    });

    if (!parsedQuery.success) {
      return NextResponse.json(buildErrorBody(400, "Invalid provider health matrix query"), {
        status: 400,
      });
    }

    const report = await buildProviderHealthMatrix({
      provider: parsedQuery.data.provider,
      range: parsedQuery.data.range,
      includeHealthy: parsedQuery.data.includeHealthy,
    });
    return NextResponse.json(report);
  } catch (error) {
    logger.error({ err: error }, "Failed to build provider health matrix");
    return NextResponse.json(buildErrorBody(500, "Failed to build provider health matrix"), {
      status: 500,
    });
  }
}

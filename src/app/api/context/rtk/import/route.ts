import { NextResponse } from "next/server";
import { z } from "zod";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { buildErrorBody } from "@omniroute/open-sse/utils/error";
import { loadRtkFilters } from "@omniroute/open-sse/services/compression/engines/rtk/filterLoader";
import {
  installGlobalRtkTomlV1,
  parseRtkTomlV1,
  RTK_TOML_MAX_BYTES,
  RtkTomlCompatibilityError,
  type RtkTomlCompatibilityResult,
} from "@omniroute/open-sse/services/compression/engines/rtk/tomlCompatibility";

const RequestSchema = z
  .object({
    action: z.enum(["validate", "install"]),
    content: z.string().min(1).max(RTK_TOML_MAX_BYTES),
    overwrite: z.boolean().optional(),
  })
  .strict();

function responseBody(
  result: RtkTomlCompatibilityResult & {
    installedPath?: string;
    backupCreated?: boolean;
  }
) {
  return {
    schemaVersion: result.schemaVersion,
    sha256: result.sha256,
    passed: result.passed,
    filters: result.filters.map((filter) => ({
      id: filter.id,
      description: filter.description,
      category: filter.category,
      commandPatterns: filter.commandPatterns,
      testCount: filter.tests.length,
    })),
    outcomes: result.outcomes,
    filtersWithoutTests: result.filtersWithoutTests,
    warnings: result.warnings,
    installedPath: result.installedPath,
    backupCreated: result.backupCreated,
  };
}

export async function POST(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(buildErrorBody(400, "Invalid JSON body"), { status: 400 });
  }
  const parsed = RequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(buildErrorBody(400, "Invalid RTK TOML import request"), {
      status: 400,
    });
  }

  try {
    const result =
      parsed.data.action === "install"
        ? installGlobalRtkTomlV1(parsed.data.content, { overwrite: parsed.data.overwrite })
        : parseRtkTomlV1(parsed.data.content);
    if (parsed.data.action === "install") {
      loadRtkFilters({ refresh: true });
    }
    return NextResponse.json(responseBody(result));
  } catch (error) {
    if (error instanceof RtkTomlCompatibilityError) {
      return NextResponse.json(buildErrorBody(400, error.publicMessage), { status: 400 });
    }
    return NextResponse.json(buildErrorBody(500, "Failed to process RTK TOML filter import"), {
      status: 500,
    });
  }
}

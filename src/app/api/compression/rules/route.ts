import { NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { getCavemanRuleMetadata } from "@omniroute/open-sse/services/compression/cavemanRules";

export async function GET(req: Request) {
  const authError = await requireManagementAuth(req);
  if (authError) return authError;

  return NextResponse.json({
    rules: getCavemanRuleMetadata(),
  });
}

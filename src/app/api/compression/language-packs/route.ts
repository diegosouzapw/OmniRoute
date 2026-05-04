import { NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import {
  listCavemanRulePacks,
  listSupportedCompressionLanguages,
} from "@omniroute/open-sse/services/compression";

export async function GET(req: Request) {
  const authError = await requireManagementAuth(req);
  if (authError) return authError;

  return NextResponse.json({
    languages: listSupportedCompressionLanguages(),
    packs: listCavemanRulePacks(),
  });
}

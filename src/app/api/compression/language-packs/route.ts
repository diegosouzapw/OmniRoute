import { NextResponse } from "next/server";
import { enforceApiKeyPolicy } from "@/shared/utils/apiKeyPolicy";
import {
  listCavemanRulePacks,
  listSupportedCompressionLanguages,
} from "@omniroute/open-sse/services/compression";

export async function GET(req: Request) {
  const policy = await enforceApiKeyPolicy(req, "settings");
  if (policy.rejection) return policy.rejection;

  return NextResponse.json({
    languages: listSupportedCompressionLanguages(),
    packs: listCavemanRulePacks(),
  });
}

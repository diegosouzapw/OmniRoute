import { NextResponse } from "next/server";
import { listProjectsForApiKey } from "@/lib/db/omnicontextProjects";
import { requireOmniContextApiKeyId } from "../_auth";

export async function GET(request: Request) {
  const auth = await requireOmniContextApiKeyId(request);
  if (auth instanceof Response) return auth;
  return NextResponse.json({
    object: "list",
    data: listProjectsForApiKey(auth.apiKeyId),
  });
}

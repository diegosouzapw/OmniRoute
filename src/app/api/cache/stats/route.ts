import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import { clearMemoryCache, getMemoryCacheStats } from "@/lib/semanticCache";
import { isAuthenticated, isCacheScopedKey } from "@/shared/utils/apiAuth";
import { CACHE_READ_SCOPE, CACHE_WRITE_SCOPE } from "@/shared/constants/managementScopes";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";

export async function GET(req: NextRequest) {
  if (!(await isAuthenticated(req)) && !(await isCacheScopedKey(req, CACHE_READ_SCOPE))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    return NextResponse.json(getMemoryCacheStats());
  } catch (error) {
    return NextResponse.json({ error: sanitizeErrorMessage(error) }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!(await isAuthenticated(req)) && !(await isCacheScopedKey(req, CACHE_WRITE_SCOPE))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    clearMemoryCache();
    return NextResponse.json({ success: true, message: "Cache cleared" });
  } catch (error) {
    return NextResponse.json({ error: sanitizeErrorMessage(error) }, { status: 500 });
  }
}

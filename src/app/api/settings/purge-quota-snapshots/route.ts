import { NextResponse } from "next/server";
import { purgeQuotaSnapshots } from "@/lib/db/cleanup";
import { isAuthenticated } from "@/shared/utils/apiAuth";

export async function POST(request: Request) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const result = await purgeQuotaSnapshots();
    return NextResponse.json({
      deleted: result.deleted,
      errors: result.errors,
    });
  } catch (err: unknown) {
    const error = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error }, { status: 500 });
  }
}

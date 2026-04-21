import { NextResponse } from "next/server";
import { isAuthRequired, isAuthenticated } from "@/shared/utils/apiAuth";
import { readZedLocalSession } from "@/lib/oauth/services/zedLocal";

export async function GET(request: Request) {
  if (await isAuthRequired()) {
    if (!(await isAuthenticated(request))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  if (process.platform !== "darwin") {
    return NextResponse.json({
      found: false,
      error:
        "Zed auto-import currently works only on macOS because the desktop token is stored in Keychain.",
    });
  }

  try {
    const session = await readZedLocalSession();
    if (!session) {
      return NextResponse.json({
        found: false,
        error: "No Zed desktop credentials found in Keychain.",
      });
    }

    return NextResponse.json({
      found: true,
      source: "macOS Keychain",
      accessToken: session.accessToken,
      userId: session.userId,
    });
  } catch (error) {
    return NextResponse.json({
      found: false,
      error: error instanceof Error ? error.message : String(error),
    });
  }
}

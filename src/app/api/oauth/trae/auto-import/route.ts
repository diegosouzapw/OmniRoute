import { NextResponse } from "next/server";
import { isAuthRequired, isAuthenticated } from "@/shared/utils/apiAuth";
import { discoverTraeChatBaseUrl, readTraeStoredSession } from "@/lib/oauth/services/traeLocal";

export async function GET(request: Request) {
  if (await isAuthRequired()) {
    if (!(await isAuthenticated(request))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  try {
    const { storagePath, session } = await readTraeStoredSession();
    const discoveredBaseUrl = await discoverTraeChatBaseUrl();

    return NextResponse.json({
      found: true,
      source: storagePath,
      accessToken: session.accessToken,
      refreshToken: session.refreshToken,
      loginHost: session.loginHost,
      baseUrl: discoveredBaseUrl?.baseUrl,
      email: session.email,
      userId: session.userId,
      nickname: session.nickname,
      note: discoveredBaseUrl
        ? `Verified chat base URL detected from ${discoveredBaseUrl.source}.`
        : "Chat base URL still needs manual confirmation because OmniRoute could not find a verified Trae completions endpoint in local logs.",
    });
  } catch (error) {
    return NextResponse.json({
      found: false,
      error: error instanceof Error ? error.message : String(error),
    });
  }
}

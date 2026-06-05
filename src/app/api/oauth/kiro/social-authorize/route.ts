import { NextResponse } from "next/server";
import { isAuthRequired, isAuthenticated } from "@/shared/utils/apiAuth";
import { KIRO_CONFIG } from "@/lib/oauth/constants/oauth";

/**
 * GET /api/oauth/kiro/social-authorize
 * Initiate Google/GitHub social login via device flow.
 * Returns a verification URL for the user to open in their browser.
 */
export async function GET(request) {
  if ((await isAuthRequired(request)) && !(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const provider = searchParams.get("provider");

    if (!provider || !["google", "github"].includes(provider)) {
      return NextResponse.json(
        { error: "Invalid provider. Use 'google' or 'github'" },
        { status: 400 }
      );
    }

    const loginProvider = provider === "google" ? "Google" : "Github";

    const response = await fetch(KIRO_CONFIG.socialDeviceAuthorizeUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clientId: KIRO_CONFIG.socialClientId,
        loginProvider,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      return NextResponse.json({ error: `Device authorization failed: ${error}` }, { status: 502 });
    }

    const data = await response.json();

    return NextResponse.json({
      authUrl: data.verificationUriComplete,
      deviceCode: data.deviceCode,
      userCode: data.userCode,
      expiresIn: Math.floor((data.expiresInMilliseconds || 300000) / 1000),
      interval: Math.floor((data.intervalInMilliseconds || 5000) / 1000),
      provider,
    });
  } catch (error) {
    console.error("Kiro social authorize error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

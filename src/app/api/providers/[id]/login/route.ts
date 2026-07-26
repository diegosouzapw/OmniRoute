/**
 * POST /api/providers/[id]/login
 *
 * Web-cookie provider login endpoint. Launches a Playwright browser,
 * navigates to the provider's login page, polls for session tokens,
 * and persists extracted credentials to the provider connection.
 */

import { NextRequest, NextResponse } from "next/server";
import { getCachedProviderConnectionById, updateProviderConnection } from "@/lib/localDb";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";

// ─── POST: Start login flow ────────────────────────────────────────────────

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  const auth = await requireManagementAuth(req);
  if (auth) return auth;

  const { id } = await params;
  const provider = await getCachedProviderConnectionById(id);
  if (!provider) {
    return NextResponse.json({ success: false, error: "Provider not found" }, { status: 404 });
  }

  const body = await req.json().catch(() => ({}));
  const timeout = typeof body.timeout === "number" ? body.timeout : undefined;

  // Adobe Firefly uses a persistent off-screen Chrome profile (Forter/Arkose need a real
  // browser). Sign in once in a visible window; the profile then keeps the session fresh
  // with no token/cookie to paste. This is NOT the generic cookie-scrape login path.
  if (String(provider.provider || "") === "adobe-firefly") {
    try {
      const { loginAdobeFireflyViaChrome } = await import(
        "@omniroute/open-sse/services/adobeFireflyChromeRuntime.ts"
      );
      const cookieHint = typeof provider.api_key === "string" ? provider.api_key : undefined;
      // Default freshSession=true so "Add Account" can sign into a different Adobe identity
      // instead of silently reusing the previous SSO in the managed Chrome profile.
      const freshSession =
        typeof (body as { freshSession?: unknown }).freshSession === "boolean"
          ? Boolean((body as { freshSession?: boolean }).freshSession)
          : true;
      const result = await loginAdobeFireflyViaChrome({
        cookie: cookieHint,
        waitForLoginMs: timeout,
        freshSession,
      });
      if (result.success) {
        // Persist JWT + Cookie (multi-line) so generate works immediately. sessionStorage JWT
        // dies when Chrome closes; the cookie jar + IMS SSO in the profile cover refresh/warm.
        const accessToken = String(result.accessToken || "").trim();
        const cookie = String(result.cookie || "").trim();
        const credential =
          accessToken && cookie
            ? `${accessToken}\n${cookie}`
            : accessToken || cookie || JSON.stringify({
                mode: "browser-profile",
                account: result.account || "",
                signedInAt: Date.now(),
              });
        const marker = {
          mode: "browser-profile",
          account: result.account || "",
          signedInAt: Date.now(),
          arpSessionId: result.arpSessionId || "",
        };
        try {
          await updateProviderConnection(id, {
            api_key: credential,
            provider_specific_data: {
              ...marker,
              cookie: credential,
              access_token: accessToken || undefined,
            },
          });
        } catch {
          /* non-fatal — return credentials to the host app either way */
        }
        return NextResponse.json({
          success: true,
          account: result.account,
          accessToken: accessToken || undefined,
          cookie: cookie || undefined,
          arpSessionId: result.arpSessionId || undefined,
          credential,
          persisted: true,
        });
      }
      return NextResponse.json(
        {
          success: false,
          error:
            "Sign-in did not complete. Open the browser window that appeared, log into your Adobe " +
            "account, and keep it open until this finishes.",
        },
        { status: 400 }
      );
    } catch (err) {
      const msg = sanitizeErrorMessage(err instanceof Error ? err.message : err);
      return NextResponse.json(
        { success: false, error: `Adobe Firefly sign-in error: ${msg}` },
        { status: 500 }
      );
    }
  }

  try {
    // Dynamic import — InAppLoginService depends on Playwright (heavy)
    const { inAppLoginService } = await import(
      "@omniroute/open-sse/services/inAppLoginService.ts"
    );

    const result = await inAppLoginService.startLogin(id, { timeout });

    // Persist credentials if extraction succeeded
    if (result.success && result.credentials) {
      try {
        const credentialsStr = JSON.stringify(result.credentials);
        await updateProviderConnection(id, {
          api_key: credentialsStr,
          provider_specific_data: result.credentials,
        });

        return NextResponse.json({
          success: true,
          credentials: result.credentials,
          persisted: true,
        });
      } catch (err) {
        // Hard Rule #12: never put raw err.message/stack in a response body.
        const msg = sanitizeErrorMessage(err instanceof Error ? err.message : err);
        return NextResponse.json(
          { success: false, error: `Extracted but failed to persist: ${msg}` },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(result, {
      status: result.success ? 200 : 400,
    });
  } catch (err) {
    // Hard Rule #12: never put raw err.message/stack in a response body.
    const msg = sanitizeErrorMessage(err instanceof Error ? err.message : err);
    return NextResponse.json(
      { success: false, error: `Login endpoint error: ${msg}` },
      { status: 500 }
    );
  }
}

/**
 * POST /api/providers/[id]/login
 *
 * Web-cookie provider login endpoint. Launches a browser,
 * navigates to the provider's login page, polls for session tokens,
 * and persists extracted credentials to the provider connection.
 */

import { NextRequest, NextResponse } from "next/server";
import { getCachedProviderConnectionById, updateProviderConnection } from "@/lib/localDb";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";

const ADOBE_FIREFLY_SLUGS = new Set(["adobe-firefly", "firefly"]);

/** Resolve the provider slug (e.g. "claude-web", "adobe-firefly") from the connection row. */
function resolveProviderSlug(connection: Record<string, unknown> | null): string {
  const raw = connection?.provider;
  if (typeof raw === "string" && raw.trim()) return raw.trim();
  return "";
}

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
  const providerSlug = resolveProviderSlug(provider as Record<string, unknown>);

  try {
    // Adobe Firefly is special: the IMS JWT is only ever in the Authorization
    // header of firefly-3p.ff.adobe.io XHRs (never cookies/localStorage), so
    // the generic cookie-extraction service cannot capture it. Use a dedicated
    // Playwright service that intercepts that request instead.
    if (ADOBE_FIREFLY_SLUGS.has(providerSlug)) {
      const { startAdobeFireflyBrowserLogin } =
        await import("@omniroute/open-sse/services/adobeFireflyBrowserLogin.ts");
      const fireflyResult = await startAdobeFireflyBrowserLogin(timeout);

      if (fireflyResult.success && fireflyResult.credentials) {
        const credentials = fireflyResult.credentials;
        try {
          // Store the JWT in apiKey (where resolveAdobeAccessToken looks first)
          // and the cookie + access_token in providerSpecificData (camelCase —
          // updateProviderConnection ignores snake_case keys).
          const providerSpecificData: Record<string, string> = {};
          if (credentials.accessToken) {
            providerSpecificData.access_token = credentials.accessToken;
          }
          if (credentials.cookie) {
            providerSpecificData.cookie = credentials.cookie;
          }

          await updateProviderConnection(id, {
            apiKey: credentials.accessToken || "",
            providerSpecificData,
          });

          return NextResponse.json({
            success: true,
            accessToken: credentials.accessToken || "",
            cookie: credentials.cookie || "",
            account: fireflyResult.account || "",
            credentials: providerSpecificData,
            persisted: true,
          });
        } catch (err) {
          const msg = sanitizeErrorMessage(err instanceof Error ? err.message : err);
          return NextResponse.json(
            { success: false, error: `Extracted but failed to persist: ${msg}` },
            { status: 500 }
          );
        }
      }

      return NextResponse.json(
        { success: false, error: fireflyResult.error || "Adobe Firefly sign-in failed" },
        { status: 400 }
      );
    }

    // Generic web-cookie path: pass the provider SLUG (not the DB id) so
    // TOKEN_EXTRACTION_CONFIGS can find the extraction config.
    // Bug: the previous code passed `id` (connection UUID), so the lookup always
    // missed and returned "No extraction config" without launching a browser.
    const { inAppLoginService } = await import("@omniroute/open-sse/services/inAppLoginService.ts");

    const result = await inAppLoginService.startLogin(providerSlug || id, { timeout });

    // Persist credentials if extraction succeeded
    if (result.success && result.credentials) {
      try {
        const credentialsStr = JSON.stringify(result.credentials);
        await updateProviderConnection(id, {
          apiKey: credentialsStr,
          providerSpecificData: result.credentials,
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

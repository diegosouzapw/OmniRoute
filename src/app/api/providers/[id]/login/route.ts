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

// тФАтФАтФА POST: Start login flow тФАтФАтФАтФАтФАтФАтФАтФАтФАтФАтФАтФАтФАтФАтФАтФАтФАтФАтФАтФАтФАтФАтФАтФАтФАтФАтФАтФАтФАтФАтФАтФАтФАтФАтФАтФАтФАтФАтФАтФАтФАтФАтФАтФАтФАтФАтФАтФА

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

  const body = (await req.json().catch(() => ({}))) as {
    timeout?: unknown;
    freshSession?: unknown;
  };
  const timeout = typeof body.timeout === "number" ? body.timeout : undefined;
  const providerSlug = resolveProviderSlug(provider as Record<string, unknown>);

  // Firefly JWTs exist only on firefly-3p Authorization headers. Use one packaged-safe CDP
  // flow, isolate state by connection, and never fall through to a second browser.
  if (ADOBE_FIREFLY_SLUGS.has(providerSlug)) {
    try {
      const { startAdobeFireflyBrowserLogin } =
        await import("@omniroute/open-sse/services/adobeFireflyBrowserLogin.ts");
      const result = await startAdobeFireflyBrowserLogin(timeout, {
        sessionKey: id,
        freshSession: typeof body.freshSession === "boolean" ? body.freshSession : true,
      });
      const accessToken = String(result.credentials?.accessToken || "").trim();
      const cookie = String(result.credentials?.cookie || "").trim();
      if (result.success && accessToken) {
        const credential =
          accessToken && cookie ? `${accessToken}\n${cookie}` : accessToken || cookie;
        const marker = {
          mode: "browser-profile",
          account: result.account || "",
          signedInAt: Date.now(),
          arpSessionId: result.arpSessionId || "",
        };
        try {
          await updateProviderConnection(id, {
            apiKey: credential,
            providerSpecificData: {
              ...marker,
              cookie: cookie || credential,
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
          credentials: {
            access_token: accessToken || undefined,
            cookie: cookie || undefined,
          },
          via: "pure-cdp",
          persisted: true,
        });
      }
      return NextResponse.json(
        {
          success: false,
          error: result.error || "Adobe Firefly sign-in did not capture an authenticated IMS JWT.",
        },
        { status: 400 }
      );
    } catch (err) {
      const msg = sanitizeErrorMessage(err instanceof Error ? err.message : err);
      return NextResponse.json({ success: false, error: msg }, { status: 400 });
    }
  }

  try {
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

import { NextResponse } from "next/server";
import { jwtVerify, SignJWT } from "jose";
import { generateRequestId } from "./shared/utils/requestId";
import { checkBodySize, getBodySizeLimit } from "./shared/middleware/bodySizeGuard";
import { isDraining } from "./lib/gracefulShutdown";
import { isPublicApiRoute } from "./shared/constants/publicApiRoutes";

const E2E_MODE = process.env.NEXT_PUBLIC_OMNIROUTE_E2E_MODE === "1";

let apiAuthModulePromise: Promise<typeof import("./shared/utils/apiAuth")> | null = null;
let settingsModulePromise: Promise<typeof import("./lib/db/settings")> | null = null;
let modelSyncModulePromise: Promise<typeof import("./shared/services/modelSyncScheduler")> | null =
  null;

function getJwtSecret(): Uint8Array {
  return new TextEncoder().encode(process.env.JWT_SECRET || "");
}

async function getApiAuthModule() {
  if (!apiAuthModulePromise) {
    apiAuthModulePromise = import("./shared/utils/apiAuth");
  }
  return apiAuthModulePromise;
}

async function getSettingsModule() {
  if (!settingsModulePromise) {
    settingsModulePromise = import("./lib/db/settings");
  }
  return settingsModulePromise;
}

async function getModelSyncModule() {
  if (!modelSyncModulePromise) {
    modelSyncModulePromise = import("./shared/services/modelSyncScheduler");
  }
  return modelSyncModulePromise;
}

export async function proxy(request: any) {
  const { pathname } = request.nextUrl;
  const isDashboardRoute = pathname.startsWith("/dashboard") || pathname.startsWith("/adm");
  const isOnboardingRoute =
    pathname.startsWith("/dashboard/onboarding") || pathname.startsWith("/adm/onboarding");

  const requestId = generateRequestId();
  const response = NextResponse.next();
  response.headers.set("X-Request-Id", requestId);

  if (isDraining() && pathname.startsWith("/api/")) {
    return NextResponse.json(
      {
        error: {
          code: "SERVICE_UNAVAILABLE",
          message: "Server is shutting down",
          correlation_id: requestId,
        },
      },
      { status: 503 }
    );
  }

  if (pathname.startsWith("/api/") && request.method !== "GET" && request.method !== "OPTIONS") {
    const bodySizeRejection = checkBodySize(request, getBodySizeLimit(pathname));
    if (bodySizeRejection) {
      return bodySizeRejection;
    }
  }

  if (E2E_MODE) {
    if (isDashboardRoute) {
      return response;
    }
    if (pathname.startsWith("/api/") && !pathname.startsWith("/api/v1/")) {
      return response;
    }
  }

  if (pathname.startsWith("/api/") && !pathname.startsWith("/api/v1/")) {
    if (isPublicApiRoute(pathname, request.method)) {
      return response;
    }

    const { isModelSyncInternalRequest } = await getModelSyncModule();
    if (
      isModelSyncInternalRequest(request) &&
      /^\/api\/providers\/[^/]+\/(sync-models|models)$/.test(pathname)
    ) {
      return response;
    }

    const { isAuthRequired, verifyAuth } = await getApiAuthModule();
    const authRequired = await isAuthRequired();
    if (!authRequired) {
      return response;
    }

    const authError = await verifyAuth(request);
    if (authError) {
      const status = authError === "Invalid management token" ? 403 : 401;
      return NextResponse.json(
        {
          error: {
            code: "AUTH_001",
            message: authError,
            correlation_id: requestId,
          },
        },
        { status }
      );
    }
  }

  if (isDashboardRoute) {
    if (isOnboardingRoute) {
      return response;
    }

    try {
      const { getSettings } = await getSettingsModule();
      const settings = await getSettings();

      if (settings.requireLogin === false) {
        return response;
      }

      if (!settings.setupComplete && !settings.password && !process.env.INITIAL_PASSWORD) {
        return response;
      }
    } catch (err: any) {
      console.error("[Middleware] settings_error: Settings read failed:", err?.message, {
        path: pathname,
        requestId,
      });
    }

    const token = request.cookies.get("auth_token")?.value;

    if (token) {
      try {
        const { payload } = await jwtVerify(token, getJwtSecret());
        const exp = payload.exp as number;
        const now = Math.floor(Date.now() / 1000);
        const refreshWindow = 7 * 24 * 60 * 60;

        if (exp && exp - now < refreshWindow) {
          try {
            const freshToken = await new SignJWT({ authenticated: true })
              .setProtectedHeader({ alg: "HS256" })
              .setExpirationTime("30d")
              .sign(getJwtSecret());

            const fwdProto = (request.headers.get("x-forwarded-proto") || "")
              .split(",")[0]
              .trim()
              .toLowerCase();
            const isHttps = fwdProto === "https" || request.nextUrl?.protocol === "https:";
            const useSecure = process.env.AUTH_COOKIE_SECURE === "true" || isHttps;

            response.cookies.set("auth_token", freshToken, {
              httpOnly: true,
              secure: useSecure,
              sameSite: "lax",
              path: "/",
            });
            console.log(
              `[Middleware] JWT auto-refreshed for ${pathname} (was expiring in ${Math.round((exp - now) / 3600)}h)`
            );
          } catch (refreshErr: any) {
            console.error("[Middleware] JWT auto-refresh failed:", refreshErr?.message);
          }
        }

        return response;
      } catch (err: any) {
        console.error("[Middleware] auth_error: JWT verification failed:", err?.message, {
          path: pathname,
          tokenPresent: true,
          requestId,
        });
        const redirectResponse = NextResponse.redirect(new URL("/login", request.url));
        redirectResponse.cookies.delete("auth_token");
        return redirectResponse;
      }
    }

    return NextResponse.redirect(new URL("/login", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/", "/adm/:path*", "/dashboard/:path*", "/api/:path*"],
};

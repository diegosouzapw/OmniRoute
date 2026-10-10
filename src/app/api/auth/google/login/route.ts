import { NextResponse } from "next/server";
import { getCachedSettings } from "@/lib/db/readCache";
import { cookies } from "next/headers";
import { errorResponse } from "@omniroute/open-sse/utils/error";
import {
  generateOAuthState,
  getGoogleOAuthConfig,
  getRequestOrigin,
  isRequestSecure,
} from "@/lib/auth/socialOAuth";

export const googleLoginInternals = {
  getCookieStore: cookies,
};

/**
 * GET /api/auth/google/login
 * Starts Google OAuth 2.0 login flow for the OmniRoute dashboard.
 */
export async function GET(request: Request) {
  const settings = await getCachedSettings();
  const config = getGoogleOAuthConfig(settings);

  if (!config.enabled || !config.clientId || !config.clientSecret) {
    return errorResponse(
      400,
      "Google OAuth is not configured. Set AUTH_GOOGLE_CLIENT_ID, AUTH_GOOGLE_CLIENT_SECRET and a non-empty AUTH_ALLOWED_EMAILS (or the matching settings)."
    );
  }

  const origin = getRequestOrigin(request);
  const redirectUri = `${origin}${config.redirectPath}`;

  const state = generateOAuthState();

  const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("client_id", config.clientId);
  authUrl.searchParams.set("redirect_uri", redirectUri);
  authUrl.searchParams.set("scope", "openid email profile");
  authUrl.searchParams.set("state", state);
  authUrl.searchParams.set("prompt", "select_account");

  const useSecureCookie = isRequestSecure(request);

  const res = NextResponse.redirect(authUrl.toString());
  res.cookies.set("google_oauth_state", state, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 10,
    secure: useSecureCookie,
  });

  return res;
}

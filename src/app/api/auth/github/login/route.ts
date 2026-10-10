import { NextResponse } from "next/server";
import { getCachedSettings } from "@/lib/db/readCache";
import { cookies } from "next/headers";
import { errorResponse } from "@omniroute/open-sse/utils/error";
import {
  generateOAuthState,
  getGitHubOAuthConfig,
  getRequestOrigin,
  isRequestSecure,
} from "@/lib/auth/socialOAuth";

export const githubLoginInternals = {
  getCookieStore: cookies,
};

/**
 * GET /api/auth/github/login
 * Starts GitHub OAuth login flow for the OmniRoute dashboard.
 */
export async function GET(request: Request) {
  const settings = await getCachedSettings();
  const config = getGitHubOAuthConfig(settings);

  if (!config.enabled || !config.clientId || !config.clientSecret) {
    return errorResponse(
      400,
      "GitHub OAuth is not configured. Set AUTH_GITHUB_CLIENT_ID, AUTH_GITHUB_CLIENT_SECRET and a non-empty AUTH_ALLOWED_EMAILS (or the matching settings)."
    );
  }

  const origin = getRequestOrigin(request);
  const redirectUri = `${origin}${config.redirectPath}`;

  const state = generateOAuthState();

  const authUrl = new URL("https://github.com/login/oauth/authorize");
  authUrl.searchParams.set("client_id", config.clientId);
  authUrl.searchParams.set("redirect_uri", redirectUri);
  authUrl.searchParams.set("scope", "read:user user:email");
  authUrl.searchParams.set("state", state);

  const useSecureCookie = isRequestSecure(request);

  const res = NextResponse.redirect(authUrl.toString());
  res.cookies.set("github_oauth_state", state, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 10,
    secure: useSecureCookie,
  });

  return res;
}

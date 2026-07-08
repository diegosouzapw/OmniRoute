import { ZED_HOSTED_CONFIG } from "../constants/oauth";
import {
  createZedNativeAuthData,
  parseZedCallbackPayload,
  decryptZedAccessToken,
  fetchZedAuthenticatedUser,
  resolveZedOrganizationId,
} from "@omniroute/open-sse/shared/zedAuth.ts";

/**
 * Zed Hosted Models OAuth provider.
 *
 * flowType "authorization_code" (mirrors `cline`'s non-PKCE authorization_code
 * shape), but with a twist: `buildAuthUrl` returns `{ authUrl, codeVerifier }`
 * instead of a bare string — `codeVerifier` here carries the *RSA private key
 * verifier* (see zedAuth.ts::encodeZedPrivateKeyVerifier), reusing the
 * existing PKCE `codeVerifier` plumbing (generateAuthData → OAuthModal →
 * /exchange) as the transport for the keypair, since Zed's own flow has no
 * client_id/secret or authorization code to exchange — only a private key
 * needed to decrypt whatever access token the browser callback carries.
 *
 * `code` at exchange time is the pasted native-app callback URL/query string
 * (`http://127.0.0.1:<port>/?user_id=...&access_token=...`) — Zed always
 * redirects to loopback + native_app_port, ignoring any `redirect_uri` we'd
 * send, so `redirectUri` here is unused by exchangeToken (kept only to
 * satisfy OAuthModal's generic "session must have a redirectUri" guard).
 */
export const zedHosted = {
  config: ZED_HOSTED_CONFIG,
  flowType: "authorization_code",
  buildAuthUrl: (config: typeof ZED_HOSTED_CONFIG) => {
    const authData = createZedNativeAuthData(config);
    return {
      authUrl: authData.authUrl,
      codeVerifier: authData.privateKeyVerifier,
      redirectUri: `http://127.0.0.1:${authData.nativeAppPort}/`,
    };
  },
  exchangeToken: async (
    config: typeof ZED_HOSTED_CONFIG,
    code: string,
    _redirectUri: string,
    codeVerifier: string
  ) => {
    const { userId, encryptedAccessToken } = parseZedCallbackPayload(code);
    const accessToken = decryptZedAccessToken(encryptedAccessToken, codeVerifier);

    const credentials = { accessToken, providerSpecificData: { userId } };
    let email: string | undefined;
    let name: string | undefined;
    let organizationId = "";
    try {
      const userInfo = await fetchZedAuthenticatedUser(credentials, { config });
      email = userInfo?.email || userInfo?.github_login;
      name = userInfo?.name || userInfo?.github_login;
      organizationId = resolveZedOrganizationId(credentials, userInfo);
    } catch {
      // Non-fatal — the account still works without a resolved email/org;
      // fetchZedLlmToken will resolve the organization lazily on first use.
    }

    return {
      access_token: accessToken,
      user_id: userId,
      email,
      name,
      organization_id: organizationId,
    };
  },
  mapTokens: (tokens: {
    access_token: string;
    user_id: string;
    email?: string;
    name?: string;
    organization_id?: string;
  }) => ({
    accessToken: tokens.access_token,
    // Zed's native-app access tokens are long-lived; no refresh flow is
    // exposed by the aggregator, so no expiresIn/refreshToken here.
    name: tokens.name || tokens.email || null,
    email: tokens.email,
    providerSpecificData: {
      userId: tokens.user_id,
      organizationId: tokens.organization_id || undefined,
    },
  }),
};

export default zedHosted;

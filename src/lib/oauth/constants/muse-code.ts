import { resolvePublicCred } from "@omniroute/open-sse/utils/publicCreds.ts";

// Meta Muse Code ships this OAuth client id in its public device-login flow.
// Resolved via the central public-credential helper (Hard Rule #11) so the
// value is never a string literal in source.
export const MUSE_CODE_CONFIG = {
  clientId:
    process.env.META_MUSE_OAUTH_CLIENT_ID?.trim() ||
    resolvePublicCred("muse_id", "META_MUSE_OAUTH_CLIENT_ID"),
  deviceAuthorizationUrl: "https://auth.meta.com/oidc/device/authorization/",
  deviceTokenUrl: "https://auth.meta.com/oidc/device/token/",
};

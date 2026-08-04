/**
 * #3861 / #8688 — GitLab Duo needs an operator-registered OAuth application.
 * Same copy is used for:
 * - catalog `authHint` (pre-connect guidance)
 * - OAuthModal setup step (before auto-start)
 * - authorize-route error when `GITLAB_DUO_OAUTH_CLIENT_ID` is unset
 */
export const GITLAB_DUO_OAUTH_APPLICATIONS_URL = "https://gitlab.com/-/profile/applications";

export const GITLAB_DUO_OAUTH_DEFAULT_REDIRECT_URI = "http://localhost:20128/callback";

export const GITLAB_DUO_OAUTH_SCOPES = "ai_features read_user";

export const GITLAB_DUO_OAUTH_SETUP_MESSAGE =
  "GitLab Duo OAuth is not configured. Register an OAuth application at " +
  `${GITLAB_DUO_OAUTH_APPLICATIONS_URL} with redirect URI ` +
  `${GITLAB_DUO_OAUTH_DEFAULT_REDIRECT_URI} and scopes "${GITLAB_DUO_OAUTH_SCOPES}", then set ` +
  "GITLAB_DUO_OAUTH_CLIENT_ID (and optionally GITLAB_DUO_OAUTH_CLIENT_SECRET) and restart.";

import type { RegistryEntry } from "../../shared.ts";
import { buildGitLabOAuthEndpoints, GITLAB_DUO_DEFAULT_BASE_URL } from "../../shared.ts";

export const gitlab_duoProvider: RegistryEntry = {
  id: "gitlab-duo",
  alias: "gld",
  format: "openai",
  executor: "gitlab",
  // baseUrl is dynamic: resolved at request time from providerSpecificData.baseUrl
  // by GitlabExecutor.buildUrl() via buildGitLabOAuthEndpoints().
  // The default here keeps the PROVIDERS map non-null so refreshAccessToken()
  // can look up this provider.
  baseUrl: buildGitLabOAuthEndpoints(GITLAB_DUO_DEFAULT_BASE_URL).publicCompletionsUrl,
  authType: "oauth",
  authHeader: "bearer",
  defaultContextLength: 128000,
  oauth: {
    clientIdEnv: "GITLAB_DUO_OAUTH_CLIENT_ID",
    clientIdDefault: process.env.GITLAB_OAUTH_CLIENT_ID || "",
    clientSecretEnv: "GITLAB_DUO_OAUTH_CLIENT_SECRET",
    clientSecretDefault: process.env.GITLAB_OAUTH_CLIENT_SECRET || "",
    tokenUrl: buildGitLabOAuthEndpoints(GITLAB_DUO_DEFAULT_BASE_URL).tokenUrl,
    authUrl: buildGitLabOAuthEndpoints(GITLAB_DUO_DEFAULT_BASE_URL).authorizeUrl,
  },
  models: [
    { id: "claude-sonnet-4-6", name: "Claude Sonnet 4.6 (GitLab Duo)" },
    { id: "claude-haiku-4-5", name: "Claude Haiku 4.5 (GitLab Duo)" },
  ],
};

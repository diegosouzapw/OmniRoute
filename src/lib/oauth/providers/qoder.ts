/**
 * Qoder AI - Personal Access Token (PAT) import provider.
 *
 * Qoder is a separate product from iflow. Authentication uses a PAT
 * generated at https://qoder.com/settings, valid for up to 1 year.
 * No OAuth flow is needed — users paste their PAT directly.
 */
export const qoder = {
  config: {},
  flowType: "import_token",
  mapTokens: (tokens: { apiKey?: string; accessToken?: string }) => ({
    apiKey: tokens.apiKey || tokens.accessToken || "",
    accessToken: null,
    refreshToken: null,
    expiresIn: 365 * 24 * 60 * 60, // PAT lasts up to 1 year
  }),
};

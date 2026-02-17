/**
 * OAuth CLI Configuration
 *
 * Provides server credentials for OAuth CLI services to communicate
 * with the running OmniRoute server when saving tokens.
 */

interface ServerCredentials {
  server: string;
  token: string;
  userId: string;
}

/**
 * Get server credentials from environment variables.
 * Used by OAuth CLI services to save tokens to the running server.
 */
export function getServerCredentials(): ServerCredentials {
  return {
    server: process.env.OMNIROUTE_SERVER || process.env.SERVER_URL || "http://localhost:20128",
    token: process.env.OMNIROUTE_TOKEN || process.env.CLI_TOKEN || "",
    userId: process.env.OMNIROUTE_USER_ID || process.env.CLI_USER_ID || "cli",
  };
}

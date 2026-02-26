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

function getDefaultApiServer() {
  const basePort = Number.parseInt(process.env.OMNIROUTE_PORT || process.env.PORT || "20128", 10);
  const fallbackPort = Number.isFinite(basePort) ? basePort : 20128;
  const apiPort = Number.parseInt(process.env.API_PORT || String(fallbackPort), 10);
  const effectivePort = Number.isFinite(apiPort) ? apiPort : fallbackPort;
  return `http://localhost:${effectivePort}`;
}

/**
 * Get server credentials from environment variables.
 * Used by OAuth CLI services to save tokens to the running server.
 */
export function getServerCredentials(): ServerCredentials {
  return {
    server: process.env.OMNIROUTE_SERVER || process.env.SERVER_URL || getDefaultApiServer(),
    token: process.env.OMNIROUTE_TOKEN || process.env.CLI_TOKEN || "",
    userId: process.env.OMNIROUTE_USER_ID || process.env.CLI_USER_ID || "cli",
  };
}

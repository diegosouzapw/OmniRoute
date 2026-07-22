import { isLoopbackHost } from "@/server/authz/routeGuard";

export type RemoteOAuthHint =
  | { remoteHost: false }
  | { remoteHost: true; tunnelCommand: string; message: string };

/**
 * #7523: The PKCE callback server binds the SERVER's loopback (localhost:PORT).
 * If the operator drives the OAuth flow from a different machine (OmniRoute on
 * a remote host/VPS), the provider redirects the browser to the operator's OWN
 * localhost:PORT, not the server's — the confirmation screen hangs forever.
 * When the request's Host is non-loopback, return the reverse-tunnel hint so
 * the UI can show it instead of a silent hang.
 *
 * The Host header is spoofable, so this drives only a UI hint, never an
 * auth/security decision.
 */
export function buildRemoteOAuthHint(hostHeader: string | null, port: number): RemoteOAuthHint {
  if (hostHeader == null || isLoopbackHost(hostHeader)) {
    return { remoteHost: false };
  }
  return {
    remoteHost: true,
    tunnelCommand: `ssh -L ${port}:127.0.0.1:${port} <user>@<omniroute-host>`,
    message:
      `OmniRoute appears to be running on a remote host (${hostHeader}). ` +
      `The OAuth callback returns to localhost:${port} on THIS machine, not the server, ` +
      `so the login will hang. Open a reverse tunnel first (see tunnelCommand), then retry — ` +
      `or use the token import flow instead.`,
  };
}

/**
 * Shared bits for the two loopback-mismatch hints surfaced by OAuthModal.
 *
 * Both families break for the same underlying reason — the dashboard is reached at a
 * LAN address, so the `localhost`/`127.0.0.1` the provider redirects to belongs to the
 * machine running the browser rather than to the OmniRoute server — but they differ in
 * which ports are involved and in what the remedy is:
 *
 * - `pkceLoopbackWarning.ts` (codex / xai-oauth / grok-cli): a FIXED foreign port
 *   registered with the upstream OAuth app, so the dashboard port AND that port must
 *   both be forwarded.
 * - `googleLoopbackHint.ts` (antigravity / agy): the callback rides the dashboard port
 *   itself, so one forward suffices — and Google's firstparty consent hangs instead of
 *   redirecting, which is why a local login helper exists at all.
 */

export type LoopbackLocation = {
  /** `window.location.hostname` — the LAN address the dashboard was reached at. */
  hostname: string;
  /** `window.location.port` — empty string on the protocol's default port. */
  port: string;
  /** `window.location.protocol` — used only to resolve an empty port. */
  protocol?: string;
};

/** Resolve the dashboard port, filling in the protocol default when the URL omits it. */
export function resolveDashboardPort(location: LoopbackLocation): string {
  if (location.port) return location.port;
  return location.protocol === "https:" ? "443" : "80";
}

/**
 * Build an `ssh -L` local-forward command with the detected host already filled in, so
 * only `<user>` is left for the operator. Duplicate ports collapse to a single flag.
 */
export function buildSshLocalForward(ports: string[], hostname: string): string {
  const unique = [...new Set(ports)];
  return `ssh ${unique.map((p) => `-L ${p}:127.0.0.1:${p}`).join(" ")} <user>@${hostname}`;
}

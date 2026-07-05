const stripTrailingSlash = (s: string | null | undefined) => (s || "").replace(/\/+$/, "");

export function matchKnownEndpoint(
  currentUrl: string | null | undefined,
  opts: { tunnelPublicUrl?: string; tailscaleUrl?: string; cloudUrl?: string } = {}
) {
  if (!currentUrl) return false;
  const url = stripTrailingSlash(currentUrl);
  const { tunnelPublicUrl, tailscaleUrl, cloudUrl } = opts;
  if (/localhost|127\.0\.0\.1|0\.0\.0\.0/.test(url)) return true;
  if (tunnelPublicUrl && url.startsWith(stripTrailingSlash(tunnelPublicUrl))) return true;
  if (tailscaleUrl && url.startsWith(stripTrailingSlash(tailscaleUrl))) return true;
  if (cloudUrl && url.startsWith(stripTrailingSlash(cloudUrl))) return true;
  return false;
}

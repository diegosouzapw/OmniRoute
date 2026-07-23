/**
 * Whether a configured Anthropic `baseUrl` targets the official `api.anthropic.com` host.
 *
 * Uses exact hostname equality (parsed via `new URL`) instead of a substring `.includes`,
 * so a look-alike upstream such as `https://api.anthropic.com.evil.test` or
 * `https://evil.test/?x=api.anthropic.com` is correctly treated as third-party
 * (CodeQL `js/incomplete-url-substring-sanitization`). An empty baseUrl means the default
 * official endpoint; a scheme-less host (e.g. `api.anthropic.com/v1`) is parsed with an
 * assumed `https://`; an unparseable baseUrl is treated as third-party (safer default —
 * the Bearer fallback is then emitted).
 */
export function isOfficialAnthropicBaseUrl(baseUrl: string): boolean {
  if (!baseUrl) return true;
  let host: string | null = null;
  try {
    host = new URL(baseUrl).hostname;
  } catch {
    try {
      host = new URL(`https://${baseUrl}`).hostname;
    } catch {
      return false;
    }
  }
  return host === "api.anthropic.com";
}

/**
 * Whether a request comes from the OpenCode client: it sends `x-opencode-*` headers and an
 * `opencode/…` user-agent. Session headers alone do not say it — other clients send
 * `x-session-id`, `session_id` or `x-claude-code-session-id` too.
 *
 * Leaf module: no imports, so the request handler and the OpenCode executor share it.
 */
const isOpencodeUserAgent = (value: unknown) =>
  typeof value === "string" && value.toLowerCase().includes("opencode");

function headerEntries(headers: Headers | Record<string, unknown> | null | undefined) {
  const entries: Array<[string, unknown]> = [];
  if (headers instanceof Headers) headers.forEach((value, key) => entries.push([key, value]));
  else if (headers && typeof headers === "object") entries.push(...Object.entries(headers));
  return entries;
}

export function isOpencodeClient(
  headers: Headers | Record<string, unknown> | null | undefined,
  userAgent?: string | null
): boolean {
  if (isOpencodeUserAgent(userAgent)) return true;
  return headerEntries(headers).some(([key, value]) => {
    const name = key.toLowerCase();
    return name.startsWith("x-opencode-") || (name === "user-agent" && isOpencodeUserAgent(value));
  });
}

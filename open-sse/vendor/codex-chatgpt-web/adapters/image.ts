/* Adapted from miuuyy/codex-chatgpt-web commit 09877fa21ffdbf20979623ef501046fc02a750d7 (MIT). */
/**
 * Parse a `data:<media-type>;base64,<data>` URL into the file payload Playwright attaches to the
 * ChatGPT composer. Returns null for remote URLs; the browser bridge refuses those explicitly.
 */
export function parseDataUrl(url: string): { mediaType: string; base64: string } | null {
  const m = url.match(/^data:([^;,]+);base64,(.*)$/s);
  if (!m) return null;
  return { mediaType: m[1], base64: m[2] };
}

/**
 * buildCurl — generate a cURL command string for playground copy-paste.
 *
 * Escapes single quotes inside any string value so the generated command is
 * safe to run in a POSIX shell.  The API key is intentionally included in
 * the output (the caller controls whether to show/hide it in the UI).
 */

export interface CurlOptions {
  /** Full URL, e.g. http://localhost:20128/api/v1/embeddings */
  endpoint: string;
  /** HTTP method (default: POST) */
  method?: string;
  /** Record of header name → value pairs */
  headers: Record<string, string>;
  /** Request body object — serialised to JSON */
  body: Record<string, unknown>;
}

/**
 * Escape a string for safe embedding inside single-quoted shell literals.
 * Single quotes cannot appear inside a single-quoted string; we end the quote,
 * insert an escaped single-quote, then reopen the string.
 */
function escSq(s: string): string {
  return s.replace(/'/g, "'\\''");
}

/**
 * Build a multi-line cURL command string.
 *
 * @example
 * buildCurl({
 *   endpoint: "http://localhost:20128/api/v1/embeddings",
 *   headers: { Authorization: "Bearer sk-123", "Content-Type": "application/json" },
 *   body: { model: "text-embedding-3-small", input: "Hello world" },
 * })
 * // => "curl -s -X POST \\\n  ..."
 */
export function buildCurl({ endpoint, method = "POST", headers, body }: CurlOptions): string {
  const lines: string[] = [`curl -s -X ${method} \\`];

  for (const [name, value] of Object.entries(headers)) {
    lines.push(`  -H '${escSq(name)}: ${escSq(value)}' \\`);
  }

  const bodyJson = JSON.stringify(body, null, 2);
  // Each line of the JSON body needs to be embedded in a single-quoted string.
  // We serialise the whole JSON as a compact single-line string to keep the
  // cURL command readable without requiring complex multi-line quoting.
  const compactJson = JSON.stringify(body);
  lines.push(`  -d '${escSq(compactJson)}' \\`);
  lines.push(`  '${escSq(endpoint)}'`);

  // Remove trailing backslash from last non-URL line
  const last = lines.length - 1;
  lines[last - 1] = lines[last - 1].replace(/ \\$/, "");

  return lines.join("\n");
}

// Re-export compact JSON for test assertions
export { escSq };

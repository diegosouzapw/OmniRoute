/**
 * Build the final non-streaming JSON response body once and publish an accurate
 * Content-Length for downstream HTTP clients and buffering proxies.
 */
export function buildNonStreamingJsonResponse(
  body: unknown,
  headers: Record<string, string>
): Response {
  const payload = JSON.stringify(body);
  return new Response(payload, {
    headers: {
      ...headers,
      "Content-Length": String(Buffer.byteLength(payload)),
    },
  });
}

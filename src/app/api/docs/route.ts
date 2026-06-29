/**
 * GET /api/docs — Rendered API reference (Redoc UI).
 *
 * Serves an HTML page that loads Redoc from a CDN and points it at
 * `/openapi.yaml` (the same canonical spec maintained at
 * `docs/openapi.yaml` in the repo). The CDN dependency is documented in
 * `docs/architecture/standalone-renderer-strategy.md`; if the deployment
 * is air-gapped, mirror the Redoc assets under `public/vendor/redoc/`
 * and update the <script src> below.
 *
 * Auth: PUBLIC tier. Anyone can read the API surface.
 *
 * Implementation note: we intentionally inline a minimal HTML shell
 * (no React, no client bundle) so this route stays cheap to render
 * even under cold-start conditions. Redoc itself is loaded from
 * `https://cdn.redocly.com/redoc/latest/bundles/redoc.standalone.js`
 * which is the SOTA choice for standalone OpenAPI renderers.
 */
export const dynamic = "force-static";

const REDOC_HTML = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>OmniRoute API Reference</title>
    <meta name="description" content="Redoc-rendered OpenAPI 3.0 spec for the OmniRoute v1 API." />
    <link rel="icon" href="/favicon.ico" />
    <style>
      body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
      #redoc-container { min-height: 100vh; }
      .or-fallback { padding: 24px; max-width: 800px; margin: 64px auto; line-height: 1.6; color: #1a1a1a; }
      .or-fallback h1 { font-size: 24px; margin-bottom: 12px; }
      .or-fallback a { color: #0066cc; }
      .or-fallback code { background: #f4f4f4; padding: 2px 6px; border-radius: 3px; font-size: 13px; }
    </style>
  </head>
  <body>
    <noscript>
      <div class="or-fallback">
        <h1>JavaScript required</h1>
        <p>Redoc needs JavaScript to render the OpenAPI spec. The raw spec is also
          <a href="/openapi.yaml">available as YAML</a>.</p>
      </div>
    </noscript>
    <div id="redoc-container"></div>
    <script src="https://cdn.redocly.com/redoc/latest/bundles/redoc.standalone.js"></script>
    <script>
      // Redoc 2.x global API. Falls back gracefully if the CDN is blocked.
      if (typeof Redoc !== "undefined") {
        Redoc.init(
          "/openapi.yaml",
          {
            scrollYOffset: 0,
            hideDownloadButton: false,
            expandResponses: "200,201",
            jsonSampleExpandLevel: 2,
            pathInMiddlePanel: true,
            requiredPropsFirst: true,
            sortPropsAlphabetically: false,
            theme: {
              colors: { primary: { main: "#0066cc" } },
              typography: { fontSize: "15px", fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" },
            },
          },
          document.getElementById("redoc-container")
        );
      } else {
        document.getElementById("redoc-container").innerHTML =
          '<div class="or-fallback"><h1>Redoc CDN unreachable</h1>' +
          '<p>The Redoc bundle at <code>cdn.redocly.com</code> did not load. The raw spec is still ' +
          '<a href="/openapi.yaml">available as YAML</a>, and you can render it locally with any ' +
          'OpenAPI viewer (e.g. <code>npx @redocly/cli preview-docs docs/openapi.yaml</code>).</p></div>';
      }
    </script>
  </body>
</html>
`;

export function GET() {
  return new Response(REDOC_HTML, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=300, s-maxage=300",
      "X-Robots-Tag": "noindex",
    },
  });
}

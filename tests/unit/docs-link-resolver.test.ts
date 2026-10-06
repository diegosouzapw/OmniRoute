import { test } from "node:test";
import assert from "node:assert/strict";
import {
  resolveDocHref,
  normalizeDocsMarkdownLinks,
  GITHUB_REPO_BLOB_URL,
} from "../../src/lib/docsLinkResolver.js";

test("resolveDocHref: rewrites relative doc-to-doc links to extensionless Fumadocs paths", () => {
  assert.equal(
    resolveDocHref("../routing/AUTO-COMBO.md", "architecture/ARCHITECTURE.md"),
    "/docs/routing/AUTO-COMBO"
  );
  assert.equal(
    resolveDocHref("./RESILIENCE_GUIDE.md", "architecture/ARCHITECTURE.md"),
    "/docs/architecture/RESILIENCE_GUIDE"
  );
  assert.equal(
    resolveDocHref("getting-started/QUICK-START.md", "architecture/ARCHITECTURE.md"),
    "/docs/getting-started/QUICK-START"
  );
});

test("resolveDocHref: preserves hash fragments in rewritten doc paths", () => {
  assert.equal(
    resolveDocHref("../routing/AUTO-COMBO.md#14-factors", "architecture/ARCHITECTURE.md"),
    "/docs/routing/AUTO-COMBO#14-factors"
  );
  assert.equal(
    resolveDocHref("./RESILIENCE_GUIDE.md#circuit-breaker", "architecture/ARCHITECTURE.md"),
    "/docs/architecture/RESILIENCE_GUIDE#circuit-breaker"
  );
});

test("resolveDocHref: normalizes root-level /docs/... and docs/... links", () => {
  assert.equal(
    resolveDocHref("/docs/frameworks/MCP-SERVER.md", "architecture/ARCHITECTURE.md"),
    "/docs/frameworks/MCP-SERVER"
  );
  assert.equal(
    resolveDocHref("docs/frameworks/MCP-SERVER.md#canonical-tools", "architecture/ARCHITECTURE.md"),
    "/docs/frameworks/MCP-SERVER#canonical-tools"
  );
});

test("resolveDocHref: rewrites links escaping docs/ to GitHub repo blob URLs", () => {
  assert.equal(
    resolveDocHref("../../src/lib/db/core.ts", "architecture/ARCHITECTURE.md"),
    `${GITHUB_REPO_BLOB_URL}/src/lib/db/core.ts`
  );
  assert.equal(
    resolveDocHref("../../package.json", "architecture/ARCHITECTURE.md"),
    `${GITHUB_REPO_BLOB_URL}/package.json`
  );
  assert.equal(
    resolveDocHref("../../README.md", "architecture/ARCHITECTURE.md"),
    `${GITHUB_REPO_BLOB_URL}/README.md`
  );
});

test("resolveDocHref: leaves external URLs and pure anchor links untouched", () => {
  assert.equal(
    resolveDocHref("https://github.com/diegosouzapw/OmniRoute", "architecture/ARCHITECTURE.md"),
    "https://github.com/diegosouzapw/OmniRoute"
  );
  assert.equal(
    resolveDocHref("http://localhost:20128/v1", "architecture/ARCHITECTURE.md"),
    "http://localhost:20128/v1"
  );
  assert.equal(
    resolveDocHref("mailto:support@example.com", "architecture/ARCHITECTURE.md"),
    "mailto:support@example.com"
  );
  assert.equal(
    resolveDocHref("#pipeline", "architecture/ARCHITECTURE.md"),
    "#pipeline"
  );
  assert.equal(
    resolveDocHref("", "architecture/ARCHITECTURE.md"),
    ""
  );
});

test("normalizeDocsMarkdownLinks: rewrites inline, reference, and HTML links in markdown", () => {
  const md = `
# Sample Docs

See the [Auto Combo](../routing/AUTO-COMBO.md) guide or [Resilience Docs](./RESILIENCE_GUIDE.md#layers).
Check [DB Implementation](../../src/lib/db/core.ts) for details.
Reference: [External][1] and [Internal Reference][2].
Pure anchor: [Jump to top](#top).
HTML link: <a href="../routing/AUTO-COMBO.md#scoring">Scoring</a>.

[1]: https://example.com "Example"
[2]: ../frameworks/MCP-SERVER.md "MCP"
`;

  const out = normalizeDocsMarkdownLinks(md, "architecture/ARCHITECTURE.md");

  assert.ok(out.includes("[Auto Combo](/docs/routing/AUTO-COMBO)"));
  assert.ok(out.includes("[Resilience Docs](/docs/architecture/RESILIENCE_GUIDE#layers)"));
  assert.ok(out.includes(`[DB Implementation](${GITHUB_REPO_BLOB_URL}/src/lib/db/core.ts)`));
  assert.ok(out.includes("[Jump to top](#top)"));
  assert.ok(out.includes('<a href="/docs/routing/AUTO-COMBO#scoring">Scoring</a>'));
  assert.ok(out.includes('[2]: /docs/frameworks/MCP-SERVER "MCP"'));
  assert.ok(out.includes('[1]: https://example.com "Example"'));
});

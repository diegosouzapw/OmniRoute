// Unit tests for the pure helpers in scripts/docs/sync-wiki.mjs (the GitHub wiki sync).
import { test } from "node:test";
import assert from "node:assert/strict";

import {
  normKey,
  toWikiName,
  toWikiContent,
  rewriteWikiLinks,
  syncHomeCounts,
  parseWikiPage,
  WIKI_BANNER,
  NEW_PAGE_EXCLUDE,
  GITHUB_REPO_URL,
  GITHUB_RAW_URL,
} from "../../scripts/docs/sync-wiki.mjs";

test("normKey: case/separator-insensitive fuzzy key (matches docs basename to curated wiki name)", () => {
  // The wiki names are hand-curated and not deterministic — normKey is what lets us
  // match e.g. FLY_IO_DEPLOYMENT_GUIDE.md to the existing "Fly-io-Deployment-Guide" page.
  assert.equal(normKey("FLY_IO_DEPLOYMENT_GUIDE.md"), normKey("Fly-io-Deployment-Guide"));
  assert.equal(normKey("API_REFERENCE"), normKey("API-Reference"));
  assert.equal(normKey("A2A-SERVER.md"), "a2aserver");
});

test("toWikiName: acronym-aware Title-Case-dashed name for NEW pages", () => {
  assert.equal(toWikiName("SUPPLY_CHAIN.md"), "Supply-Chain");
  assert.equal(toWikiName("API_REFERENCE"), "API-Reference");
  assert.equal(toWikiName("QUOTA_SHARE"), "Quota-Share");
  assert.equal(toWikiName("ACP"), "ACP");
});

test("toWikiContent: strips YAML frontmatter and prepends the language banner", () => {
  const doc = '---\ntitle: "X"\nversion: 3.8.2\n---\n\n# Heading\n\nBody text.\n';
  const out = toWikiContent(doc);
  assert.ok(out.startsWith(WIKI_BANNER), "must start with the wiki language banner");
  assert.ok(!out.includes("version: 3.8.2"), "frontmatter must be removed");
  assert.ok(out.includes("# Heading"), "content body must be preserved");
  assert.ok(out.endsWith("Body text.\n"), "trailing newline normalized");
});

test("toWikiContent: a document without frontmatter is kept intact (plus banner)", () => {
  const doc = "# No Frontmatter\n\nHello.\n";
  const out = toWikiContent(doc);
  assert.equal(out, WIKI_BANNER + "# No Frontmatter\n\nHello.\n");
});

test("rewriteWikiLinks: converts relative doc links to curated wiki page names", () => {
  const wikiKeyMap = new Map([
    ["autocombo", "Auto-Combo"],
    ["resilienceguide", "Resilience-Guide"],
    ["mcpserver", "MCP-Server"],
  ]);

  const md = `
# Architecture

See [Auto-Combo](../routing/AUTO-COMBO.md) and [Resilience](./RESILIENCE_GUIDE.md).
With anchor: [14 Factors](../routing/AUTO-COMBO.md#14-factors).
Ref style: [MCP][mcp-ref]
HTML: <a href="../routing/AUTO-COMBO.md#strategies">Strategies</a>

[mcp-ref]: ../frameworks/MCP-SERVER.md "MCP Tools"
`;

  const out = rewriteWikiLinks(md, {
    srcFile: "docs/architecture/ARCHITECTURE.md",
    wikiKeyMap,
  });

  assert.ok(out.includes("[Auto-Combo](Auto-Combo)"));
  assert.ok(out.includes("[Resilience](Resilience-Guide)"));
  assert.ok(out.includes("[14 Factors](Auto-Combo#14-factors)"));
  assert.ok(out.includes('[mcp-ref]: MCP-Server "MCP Tools"'));
  assert.ok(out.includes('<a href="Auto-Combo#strategies">Strategies</a>'));
});

test("rewriteWikiLinks: converts repo code and root markdown links to GitHub blob URLs", () => {
  const md = `
Refer to [DB Core](../../src/lib/db/core.ts) and [README](../README.md).
Check [Package config](../../package.json) and [Auth Guard](../../src/server/authz/routeGuard.ts).
`;

  const out = rewriteWikiLinks(md, {
    srcFile: "docs/architecture/ARCHITECTURE.md",
  });

  assert.ok(out.includes(`[DB Core](${GITHUB_REPO_URL}/blob/main/src/lib/db/core.ts)`));
  assert.ok(out.includes(`[README](${GITHUB_REPO_URL}/blob/main/docs/README.md)`));
  assert.ok(out.includes(`[Package config](${GITHUB_REPO_URL}/blob/main/package.json)`));
  assert.ok(out.includes(`[Auth Guard](${GITHUB_REPO_URL}/blob/main/src/server/authz/routeGuard.ts)`));
});

test("rewriteWikiLinks: rewrites image links to GitHub raw content URLs", () => {
  const md = `![Architecture Overview](../diagrams/exported/resilience-3layers.svg "Diagram")`;
  const out = rewriteWikiLinks(md, {
    srcFile: "docs/architecture/ARCHITECTURE.md",
  });
  assert.equal(
    out,
    `![Architecture Overview](${GITHUB_RAW_URL}/docs/diagrams/exported/resilience-3layers.svg "Diagram")`
  );
});

test("rewriteWikiLinks: preserves pure anchor links and external URLs", () => {
  const md = `[Top](#top) and [Website](https://example.com) and [Email](mailto:test@example.com)`;
  const out = rewriteWikiLinks(md, {
    srcFile: "docs/architecture/ARCHITECTURE.md",
  });
  assert.equal(out, md);
});

test("rewriteWikiLinks: prepends locale prefix for localized wiki pages", () => {
  const wikiKeyMap = new Map([["autocombo", "Auto-Combo"]]);
  const md = `[Auto-Combo](../routing/AUTO-COMBO.md#scoring)`;
  const out = rewriteWikiLinks(md, {
    srcFile: "docs/i18n/pt-BR/routing/AUTO-COMBO.md",
    wikiKeyMap,
    locale: "pt-BR",
  });
  // U+2010 HYPHEN
  assert.equal(out, "[Auto-Combo](pt-BR\u2010Auto-Combo#scoring)");
});

test("syncHomeCounts: rewrites the cover-page provider/strategy counts", () => {
  const home = "Connect every AI tool to 177 providers.\n**177 AI Providers** · **14 Routing Strategies**\n";
  const out = syncHomeCounts(home, { providers: 226, strategies: 15, mcpTools: null, locales: 42 });
  assert.ok(out.includes("226 providers"));
  assert.ok(out.includes("**226 AI Providers**"));
  assert.ok(out.includes("**15 Routing Strategies**"));
  assert.ok(!out.includes("177"));
});

test("syncHomeCounts: leaves text untouched when a count is null (best-effort MCP)", () => {
  const home = "| **MCP Server** | 87 tools |\n";
  const out = syncHomeCounts(home, { providers: null, strategies: null, mcpTools: null, locales: null });
  assert.equal(out, home);
});

test("parseWikiPage: splits the locale prefix (U+2010) from the page name", () => {
  assert.deepEqual(parseWikiPage("Architecture"), { locale: null, name: "Architecture" });
  // U+2010 HYPHEN separator used by the localized mirrors (e.g. "pt-BR‐Architecture").
  assert.deepEqual(parseWikiPage("pt-BR‐Architecture"), { locale: "pt-BR", name: "Architecture" });
  assert.deepEqual(parseWikiPage("phi‐API-Reference"), { locale: "phi", name: "API-Reference" });
});

test("NEW_PAGE_EXCLUDE: internal reports/plans never become public wiki pages", () => {
  assert.ok(NEW_PAGE_EXCLUDE.has("DOCUMENTATION_AUDIT_REPORT"));
  assert.ok(NEW_PAGE_EXCLUDE.has("README"));
  assert.ok(!NEW_PAGE_EXCLUDE.has("SUPPLY_CHAIN"));
});

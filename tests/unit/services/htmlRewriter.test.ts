/**
 * Unit tests for src/lib/services/htmlRewriter.ts
 *
 * Tests HTML rewriting for the embedded-service reverse proxy:
 *   - <base href> injection
 *   - Path-absolute URL rewriting in <a>, <link>, <script>, <img>, <form>, <iframe>, <source>
 *   - Non-rewrite cases: external URLs, protocol-relative, mailto:, javascript:
 *   - Edge cases: HTML without <head>, empty href, multi-URL srcset
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { rewriteHtml } from "../../../src/lib/services/htmlRewriter.ts";

const PREFIX = "/dashboard/providers/services/9router/embed";

// Helper: assert string contains substring
function assertContains(haystack: string, needle: string, msg?: string): void {
  assert.ok(
    haystack.includes(needle),
    msg ?? `Expected output to contain: ${JSON.stringify(needle)}\nActual: ${haystack}`
  );
}

function assertNotContains(haystack: string, needle: string, msg?: string): void {
  assert.ok(
    !haystack.includes(needle),
    msg ?? `Expected output NOT to contain: ${JSON.stringify(needle)}\nActual: ${haystack}`
  );
}

// ─── base tag injection ───────────────────────────────────────────────────────

describe("rewriteHtml — <base> injection", () => {
  it("inserts <base href> as first child of <head>", () => {
    const input = "<html><head></head><body></body></html>";
    const out = rewriteHtml(input, PREFIX);
    assertContains(out, `<base href="${PREFIX}/">`);
  });

  it("inserts <base href> before other head children", () => {
    const input = "<html><head><title>T</title></head><body></body></html>";
    const out = rewriteHtml(input, PREFIX);
    const baseIdx = out.indexOf("<base ");
    const titleIdx = out.indexOf("<title>");
    assert.ok(
      baseIdx < titleIdx,
      `<base> should appear before <title>; base=${baseIdx}, title=${titleIdx}`
    );
  });

  it("strips trailing slash from prefix before forming base href", () => {
    const out = rewriteHtml("<html><head></head><body></body></html>", `${PREFIX}/`);
    assertContains(out, `<base href="${PREFIX}/">`);
    // Should not have double slash
    assertNotContains(out, `<base href="${PREFIX}//">`);
  });

  it("handles HTML without <head> by creating one", () => {
    const out = rewriteHtml("<html><body><p>hello</p></body></html>", PREFIX);
    assertContains(out, `<base href="${PREFIX}/">`);
  });

  it("updates existing <base> href instead of inserting a second one", () => {
    const input = '<html><head><base href="/old/"></head><body></body></html>';
    const out = rewriteHtml(input, PREFIX);
    assertContains(out, `<base href="${PREFIX}/">`);
    assertNotContains(out, 'href="/old/"');
    // Exactly one <base tag
    const matches = out.match(/<base /g);
    assert.equal(matches?.length ?? 0, 1, "should have exactly one <base> element");
  });
});

// ─── link rewriting ───────────────────────────────────────────────────────────

describe("rewriteHtml — <a href> rewriting", () => {
  it("rewrites path-absolute <a href> to prefixed URL", () => {
    const input = '<html><head></head><body><a href="/foo">link</a></body></html>';
    const out = rewriteHtml(input, PREFIX);
    assertContains(out, `href="${PREFIX}/foo"`);
  });

  it("does NOT rewrite https:// external URL", () => {
    const input = '<html><head></head><body><a href="https://example.com/foo">x</a></body></html>';
    const out = rewriteHtml(input, PREFIX);
    assertContains(out, 'href="https://example.com/foo"');
  });

  it("does NOT rewrite http:// external URL", () => {
    const input = '<html><head></head><body><a href="http://external.com">x</a></body></html>';
    const out = rewriteHtml(input, PREFIX);
    assertContains(out, 'href="http://external.com"');
  });

  it("does NOT rewrite protocol-relative URL (//cdn)", () => {
    const input = '<html><head></head><body><a href="//cdn.example.com/x">x</a></body></html>';
    const out = rewriteHtml(input, PREFIX);
    assertContains(out, 'href="//cdn.example.com/x"');
  });

  it("does NOT rewrite mailto: URL", () => {
    const input =
      '<html><head></head><body><a href="mailto:admin@example.com">email</a></body></html>';
    const out = rewriteHtml(input, PREFIX);
    assertContains(out, 'href="mailto:admin@example.com"');
  });

  it("does NOT rewrite javascript: URL", () => {
    const input = '<html><head></head><body><a href="javascript:void(0)">x</a></body></html>';
    const out = rewriteHtml(input, PREFIX);
    assertContains(out, 'href="javascript:void(0)"');
  });

  it("does NOT rewrite relative URL (no leading slash)", () => {
    const input = '<html><head></head><body><a href="relative/path">x</a></body></html>';
    const out = rewriteHtml(input, PREFIX);
    assertContains(out, 'href="relative/path"');
  });

  it("does NOT rewrite anchor-only href", () => {
    const input = '<html><head></head><body><a href="#section">x</a></body></html>';
    const out = rewriteHtml(input, PREFIX);
    assertContains(out, 'href="#section"');
  });
});

// ─── other element rewriting ──────────────────────────────────────────────────

describe("rewriteHtml — other element attributes", () => {
  it("rewrites <link href='/stylesheet.css'>", () => {
    const input =
      '<html><head><link rel="stylesheet" href="/styles.css"></head><body></body></html>';
    const out = rewriteHtml(input, PREFIX);
    assertContains(out, `href="${PREFIX}/styles.css"`);
  });

  it("rewrites <script src='/app.js'>", () => {
    const input = '<html><head></head><body><script src="/app.js"></script></body></html>';
    const out = rewriteHtml(input, PREFIX);
    assertContains(out, `src="${PREFIX}/app.js"`);
  });

  it("rewrites <img src='/logo.png'>", () => {
    const input = '<html><head></head><body><img src="/logo.png"></body></html>';
    const out = rewriteHtml(input, PREFIX);
    assertContains(out, `src="${PREFIX}/logo.png"`);
  });

  it("rewrites <form action='/submit'>", () => {
    const input =
      '<html><head></head><body><form action="/submit"><button>Go</button></form></body></html>';
    const out = rewriteHtml(input, PREFIX);
    assertContains(out, `action="${PREFIX}/submit"`);
  });

  it("rewrites <iframe src='/frame'>", () => {
    const input = '<html><head></head><body><iframe src="/frame"></iframe></body></html>';
    const out = rewriteHtml(input, PREFIX);
    assertContains(out, `src="${PREFIX}/frame"`);
  });

  it("rewrites <source src='/video.mp4'>", () => {
    const input = '<html><head></head><body><source src="/video.mp4"></body></html>';
    const out = rewriteHtml(input, PREFIX);
    assertContains(out, `src="${PREFIX}/video.mp4"`);
  });

  it("does NOT rewrite img srcset with commas (multi-URL — v1 limitation)", () => {
    const input =
      '<html><head></head><body><img srcset="/img.png 1x, /img@2x.png 2x"></body></html>';
    const out = rewriteHtml(input, PREFIX);
    // Original srcset must be preserved unchanged
    assertContains(out, 'srcset="/img.png 1x, /img@2x.png 2x"');
  });
});

// ─── non-anchor markup preservation ──────────────────────────────────────────

describe("rewriteHtml — preserves non-affected markup", () => {
  it("preserves text content inside elements", () => {
    const input = "<html><head></head><body><p>Hello World</p></body></html>";
    const out = rewriteHtml(input, PREFIX);
    assertContains(out, "Hello World");
  });

  it("preserves existing non-rewritten attributes", () => {
    const input =
      '<html><head></head><body><a href="/foo" class="nav" id="link1">x</a></body></html>';
    const out = rewriteHtml(input, PREFIX);
    assertContains(out, 'class="nav"');
    assertContains(out, 'id="link1"');
  });

  it("preserves data attributes unchanged", () => {
    const input =
      '<html><head></head><body><div data-url="/foo" data-val="bar"></div></body></html>';
    const out = rewriteHtml(input, PREFIX);
    // data-url is not in REWRITABLE_ATTRS — stays as-is
    assertContains(out, 'data-url="/foo"');
  });

  it("preserves empty href unchanged", () => {
    const input = '<html><head></head><body><a href="">empty</a></body></html>';
    const out = rewriteHtml(input, PREFIX);
    assertContains(out, 'href=""');
  });
});

// ─── edge cases ───────────────────────────────────────────────────────────────

describe("rewriteHtml — edge cases", () => {
  it("handles empty HTML string gracefully", () => {
    const out = rewriteHtml("", PREFIX);
    assertContains(out, `<base href="${PREFIX}/">`);
  });

  it("handles HTML fragment (no <html> tag) — parse5 auto-completes tree", () => {
    const out = rewriteHtml('<a href="/foo">link</a>', PREFIX);
    assertContains(out, `<base href="${PREFIX}/">`);
    assertContains(out, `href="${PREFIX}/foo"`);
  });

  it("multiple path-absolute URLs in same document are all rewritten", () => {
    const input = [
      "<html><head>",
      '<link href="/a.css">',
      "</head><body>",
      '<a href="/page1">1</a>',
      '<a href="/page2">2</a>',
      '<script src="/app.js"></script>',
      "</body></html>",
    ].join("");
    const out = rewriteHtml(input, PREFIX);
    assertContains(out, `href="${PREFIX}/a.css"`);
    assertContains(out, `href="${PREFIX}/page1"`);
    assertContains(out, `href="${PREFIX}/page2"`);
    assertContains(out, `src="${PREFIX}/app.js"`);
  });
});

import test from "node:test";
import assert from "node:assert/strict";
import {
  extractHeadings,
  renderMarkdown,
  getDocItemBySlug,
  getAllDocSlugsFlat,
  getPrevNextSlugs,
} from "../../src/app/docs/[slug]/page";
import { docsNavigation } from "../../src/app/docs/lib/docsNavigation";
import { SEARCH_INDEX } from "../../src/app/docs/lib/searchIndex";

// ──────────────────────────────────────────────
// docsNavigation structure
// ──────────────────────────────────────────────

test("docsNavigation has expected sections", () => {
  assert.deepEqual(
    docsNavigation.map((section) => section.title),
    [
      "Getting Started",
      "Features",
      "API & Protocols",
      "Deployment",
      "Operations",
      "Development",
      "Other",
    ]
  );
});

test("every section has title and items", () => {
  for (const section of docsNavigation) {
    assert.ok(section.title, "section must have a title");
    assert.ok(Array.isArray(section.items), "section.items must be an array");
    assert.ok(section.items.length > 0, "section must have at least one item");
  }
});

test("every doc item has slug, title, fileName", () => {
  for (const section of docsNavigation) {
    for (const item of section.items) {
      assert.ok(item.slug, "item must have a slug");
      assert.ok(item.title, "item must have a title");
      assert.ok(item.fileName, "item must have a fileName");
    }
  }
});

// ──────────────────────────────────────────────
// getDocItemBySlug
// ──────────────────────────────────────────────

test("getDocItemBySlug returns section title and item for known slug", () => {
  const result = getDocItemBySlug("setup-guide");
  assert.ok(result, "setup-guide should be found");
  assert.equal(result.item.slug, "setup-guide");
  assert.equal(result.sectionTitle, "Getting Started");
});

test("getDocItemBySlug returns null for unknown slug", () => {
  const result = getDocItemBySlug("nonexistent-page");
  assert.equal(result, null);
});

test("getDocItemBySlug finds items in all sections", () => {
  const sectionTitles = docsNavigation.map((s) => s.title);
  for (const section of docsNavigation) {
    const firstItem = section.items[0];
    const result = getDocItemBySlug(firstItem.slug);
    assert.ok(result, `should find ${firstItem.slug}`);
    assert.ok(sectionTitles.includes(result.sectionTitle));
  }
});

// ──────────────────────────────────────────────
// getAllDocSlugsFlat
// ──────────────────────────────────────────────

test("getAllDocSlugsFlat returns all slugs from all sections", () => {
  const slugs = getAllDocSlugsFlat();
  const totalItems = docsNavigation.reduce((sum, s) => sum + s.items.length, 0);
  assert.equal(slugs.length, totalItems);
});

test("getAllDocSlugsFlat includes setup-guide as first slug", () => {
  const slugs = getAllDocSlugsFlat();
  assert.ok(slugs.includes("setup-guide"));
});

// ──────────────────────────────────────────────
// getPrevNextSlugs
// ──────────────────────────────────────────────

test("getPrevNextSlugs returns null prev for first slug", () => {
  const slugs = getAllDocSlugsFlat();
  const firstSlug = slugs[0];
  const { prev } = getPrevNextSlugs(firstSlug);
  assert.equal(prev, null);
});

test("getPrevNextSlugs returns null next for last slug", () => {
  const slugs = getAllDocSlugsFlat();
  const lastSlug = slugs[slugs.length - 1];
  const { next } = getPrevNextSlugs(lastSlug);
  assert.equal(next, null);
});

test("getPrevNextSlugs returns correct prev and next for middle slug", () => {
  const slugs = getAllDocSlugsFlat();
  const middleIdx = Math.floor(slugs.length / 2);
  const middleSlug = slugs[middleIdx];
  const { prev, next } = getPrevNextSlugs(middleSlug);
  assert.equal(prev, slugs[middleIdx - 1]);
  assert.equal(next, slugs[middleIdx + 1]);
});

// ──────────────────────────────────────────────
// extractHeadings
// ──────────────────────────────────────────────

test("extractHeadings extracts h2, h3, h4 headings", () => {
  const md = `## First Section\nSome text\n### Subsection\nMore text\n#### Details\nEnd`;
  const headings = extractHeadings(md);
  assert.equal(headings.length, 3);
  assert.equal(headings[0].text, "First Section");
  assert.equal(headings[0].level, 2);
  assert.equal(headings[1].text, "Subsection");
  assert.equal(headings[1].level, 3);
  assert.equal(headings[2].text, "Details");
  assert.equal(headings[2].level, 4);
});

test("extractHeadings generates valid id from heading text", () => {
  const md = `## Getting Started Guide\n### API Reference\n#### Step 1: Install`;
  const headings = extractHeadings(md);
  assert.equal(headings[0].id, "getting-started-guide");
  assert.equal(headings[1].id, "api-reference");
  assert.equal(headings[2].id, "step-1-install");
});

test("extractHeadings returns empty array for content without headings", () => {
  const md = "Just some text without any headings";
  const headings = extractHeadings(md);
  assert.equal(headings.length, 0);
});

test("extractHeadings strips bold and code from heading text", () => {
  const md = "## **Bold** Heading\n### \`Code\` Heading";
  const headings = extractHeadings(md);
  assert.equal(headings[0].text, "Bold Heading");
  assert.equal(headings[1].text, "Code Heading");
});

// ──────────────────────────────────────────────
// renderMarkdown
// ──────────────────────────────────────────────

test("renderMarkdown converts headings to HTML", () => {
  const html = renderMarkdown("# Title\n## Section\n### Subsection\n#### Details");
  assert.ok(html.includes("<h1"), "h1 tag");
  assert.ok(html.includes("Title"), "h1 text");
  assert.ok(html.includes("<h2"), "h2 tag");
  assert.ok(html.includes("Section"), "h2 text");
  assert.ok(html.includes("<h3"), "h3 tag");
  assert.ok(html.includes("<h4"), "h4 tag");
});

test("renderMarkdown sanitizes XSS content", () => {
  const html = renderMarkdown('<script>alert("xss")</script>');
  assert.ok(!html.includes("<script"), "script tags should be sanitized");
});

test("renderMarkdown converts code blocks", () => {
  const html = renderMarkdown("```js\nconst x = 1;\n```");
  assert.ok(html.includes("<pre"), "pre tag");
  assert.ok(html.includes('<pre class="bg-bg-subtle'), "pre tag");
  assert.ok(html.includes("language-js"), "language class");
});

test("renderMarkdown converts inline code", () => {
  const html = renderMarkdown("Use `npm install` to install");
  assert.ok(html.includes("<code"), "inline code tag");
  assert.ok(html.includes('<code class="bg-bg-subtle'), "inline code tag");
});

test("renderMarkdown converts bold text", () => {
  const html = renderMarkdown("This is **bold** text");
  assert.ok(html.includes("<strong>bold</strong>"));
});

test("renderMarkdown converts italic text", () => {
  const html = renderMarkdown("This is *italic* text");
  assert.ok(html.includes("<em>italic</em>"));
});

test("renderMarkdown converts links", () => {
  const html = renderMarkdown("[OmniRoute](https://omniroute.online)");
  assert.ok(html.includes('href="https://omniroute.online"'));
  assert.ok(html.includes("OmniRoute</a>"));
  assert.ok(html.includes('<a class="text-primary hover:underline"'));
});

test("renderMarkdown converts unordered lists", () => {
  const html = renderMarkdown("- Item 1\n- Item 2");
  assert.ok(html.includes("<ul"));
  assert.ok(html.includes("<li"));
  assert.ok(html.includes('class="mb-1"'));
});

test("renderMarkdown converts ordered lists", () => {
  const html = renderMarkdown("1. First\n2. Second");
  assert.ok(html.includes("<ol"), "ol tag");
  assert.ok(html.includes("<li"), "li tag");
  assert.ok(html.includes('class="mb-1"'), "li class");
});

test("renderMarkdown converts blockquotes", () => {
  const html = renderMarkdown("> This is a quote");
  assert.ok(html.includes("<blockquote"));
  assert.ok(html.includes("border-l-4"));
});

test("renderMarkdown converts horizontal rules", () => {
  const html = renderMarkdown("---");
  assert.ok(html.includes("<hr"));
  assert.ok(html.includes('<hr class="border-border'));
});

// ──────────────────────────────────────────────
// SEARCH_INDEX
// ──────────────────────────────────────────────

test("SEARCH_INDEX has entries for all doc slugs", () => {
  const navSlugs = getAllDocSlugsFlat();
  // searchIndex and nav slugs should have significant overlap
  const indexSlugs = SEARCH_INDEX.map((item) => item.slug);
  for (const slug of navSlugs) {
    assert.ok(indexSlugs.includes(slug), `SEARCH_INDEX missing slug: ${slug}`);
  }
});

test("SEARCH_INDEX entries have required fields", () => {
  for (const item of SEARCH_INDEX) {
    assert.ok(item.slug, "item must have slug");
    assert.ok(item.title, "item must have title");
    assert.ok(item.fileName, "item must have fileName");
    assert.ok(item.section, "item must have section");
    assert.ok(typeof item.content === "string", "item must have content string");
    assert.ok(Array.isArray(item.headings), "item must have headings array");
  }
});

test("SEARCH_INDEX entries have non-empty content", () => {
  for (const item of SEARCH_INDEX) {
    assert.ok(item.content.length > 0, `${item.slug} should have content`);
  }
});

// ──────────────────────────────────────────────
// Mermaid extraction
// ──────────────────────────────────────────────

test("extractMermaidCharts extracts mermaid blocks from content", async () => {
  const { extractMermaidCharts } = await import("../../src/app/docs/[slug]/page");
  const content =
    "## Diagram\n\n```mermaid\ngraph TD\n    A-->B\n```\n\nSome text\n\n```mermaid\nsequenceDiagram\n    Alice->>Bob: Hi\n```";
  const charts = extractMermaidCharts(content);
  assert.equal(charts.length, 2);
  assert.ok(charts[0].includes("graph TD"));
  assert.ok(charts[1].includes("Alice->>Bob"));
});

test("extractMermaidCharts returns empty array when no mermaid blocks", async () => {
  const { extractMermaidCharts } = await import("../../src/app/docs/[slug]/page");
  const content = "## Heading\n\nSome text with ```js\ncode\n```";
  const charts = extractMermaidCharts(content);
  assert.equal(charts.length, 0);
});

// ──────────────────────────────────────────────
// Mermaid rendering in markdown
// ──────────────────────────────────────────────

test("renderMarkdown converts mermaid code blocks to fallback divs", () => {
  const markdown = "```mermaid\ngraph TD\n    A-->B\n```";
  const html = renderMarkdown(markdown);
  assert.ok(
    html.includes("mermaid-diagram-fallback"),
    "Should contain mermaid-diagram-fallback class"
  );
  assert.ok(html.includes("data-mermaid"), "Should contain data-mermaid attribute");
});

// ──────────────────────────────────────────────
// Analytics component
// ──────────────────────────────────────────────

test("DocsPageAnalytics is importable", async () => {
  const mod = await import("../../src/app/docs/components/DocsPageAnalytics");
  assert.ok(mod.DocsPageAnalytics, "DocsPageAnalytics should be exported");
  assert.ok(typeof mod.getPopularPages === "function", "getPopularPages should be exported");
});

// ──────────────────────────────────────────────
// What's New and Migration Guide
// ──────────────────────────────────────────────

test("WhatsNewSection is importable", async () => {
  const mod = await import("../../src/app/docs/components/WhatsNewSection");
  assert.ok(mod.WhatsNewSection, "WhatsNewSection should be exported");
  assert.ok(mod.MigrationGuideBanner, "MigrationGuideBanner should be exported");
});

// ──────────────────────────────────────────────
// i18n locale system
// ──────────────────────────────────────────────

test("DocsI18n is importable", async () => {
  const mod = await import("../../src/app/docs/components/DocsI18n");
  assert.ok(mod.useLocalizedSectionTitle, "useLocalizedSectionTitle should be exported");
  assert.ok(mod.getAvailableLocales, "getAvailableLocales should be exported");
  assert.ok(mod.LOCALE_NAMES, "LOCALE_NAMES should be exported");
  assert.equal(mod.LOCALE_NAMES.en, "English");
  assert.equal(mod.LOCALE_NAMES["zh-CN"], "简体中文");
});

test("getAvailableLocales returns 10 locales", async () => {
  const { getAvailableLocales } = await import("../../src/app/docs/components/DocsI18n");
  const locales = getAvailableLocales();
  assert.equal(locales.length, 10);
  assert.ok(locales.includes("en"));
  assert.ok(locales.includes("pt-BR"));
  assert.ok(locales.includes("zh-CN"));
});

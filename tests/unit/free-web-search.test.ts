import { test } from "node:test";
import assert from "node:assert/strict";

import { parseDuckDuckGoLite } from "../../open-sse/services/freeWebSearch.ts";

// Real DuckDuckGo lite shape (captured from lite.duckduckgo.com/lite/):
// double-quoted href BEFORE single-quoted class='result-link', direct URLs,
// <b> highlight tags inside titles/snippets, link[i] aligns with snippet[i].
const REAL_LITE_HTML = `
<table>
  <tr>
    <td valign="top">1.&nbsp;</td>
    <td>
      <a rel="nofollow" href="https://platform.claude.com/docs/en/api/overview" class='result-link'>API overview - <b>Claude</b> API Docs - Anthropic</a>
    </td>
  </tr>
  <tr>
    <td>&nbsp;&nbsp;&nbsp;</td>
    <td class='result-snippet'><b>Claude</b> <b>API</b> Documentation. New to Claude?</td>
  </tr>
  <tr>
    <td valign="top">2.&nbsp;</td>
    <td>
      <a rel="nofollow" href="https://www.anthropic.com/api" class='result-link'>Claude Platform | Claude - Anthropic</a>
    </td>
  </tr>
  <tr>
    <td>&nbsp;&nbsp;&nbsp;</td>
    <td class='result-snippet'>Build with the most capable models.</td>
  </tr>
</table>`;

test("parseDuckDuckGoLite extracts aligned title/url/snippet from real lite HTML", () => {
  const results = parseDuckDuckGoLite(REAL_LITE_HTML);
  assert.equal(results.length, 2);

  assert.equal(results[0].url, "https://platform.claude.com/docs/en/api/overview");
  assert.equal(results[0].title, "API overview - Claude API Docs - Anthropic");
  assert.ok(results[0].snippet.includes("Claude API Documentation"));

  assert.equal(results[1].url, "https://www.anthropic.com/api");
  assert.equal(results[1].title, "Claude Platform | Claude - Anthropic");
  assert.ok(results[1].snippet.includes("most capable models"));
});

test("parseDuckDuckGoLite strips <b> highlight tags and collapses whitespace", () => {
  const results = parseDuckDuckGoLite(REAL_LITE_HTML);
  assert.doesNotMatch(results[0].title, /<b>|<\/b>/);
  assert.doesNotMatch(results[0].snippet, /<b>|<\/b>/);
});

test("parseDuckDuckGoLite decodes a uddg redirect href (defensive)", () => {
  const html = `<a rel="nofollow" href="//duckduckgo.com/l/?uddg=https%3A%2F%2Fexample.com%2Fa%3Fb%3D1&rut=x" class='result-link'>Example</a>
    <td class='result-snippet'>snippet</td>`;
  const results = parseDuckDuckGoLite(html);
  assert.equal(results[0].url, "https://example.com/a?b=1");
});

test("parseDuckDuckGoLite upgrades protocol-relative hrefs to https", () => {
  const html = `<a href="//example.org/path" class='result-link'>Proto rel</a>
    <td class='result-snippet'>s</td>`;
  const results = parseDuckDuckGoLite(html);
  assert.equal(results[0].url, "https://example.org/path");
});

test("parseDuckDuckGoLite returns [] when there are no result links", () => {
  assert.deepEqual(parseDuckDuckGoLite("<html><body>no results</body></html>"), []);
  assert.deepEqual(parseDuckDuckGoLite(""), []);
});

test("parseDuckDuckGoLite drops non-http(s) result URLs (javascript:/data:/file:)", () => {
  const html = `<a href="javascript:alert(1)" class='result-link'>XSS</a>
    <td class='result-snippet'>bad</td>
    <a href="https://ok.example.com" class='result-link'>Safe</a>
    <td class='result-snippet'>good</td>`;
  const results = parseDuckDuckGoLite(html);
  assert.equal(results.length, 1, "the javascript: link must be discarded");
  assert.equal(results[0].url, "https://ok.example.com");
  assert.doesNotMatch(JSON.stringify(results), /javascript:/);
});

test("parseDuckDuckGoLite is bounded on adversarial HTML (no catastrophic backtracking)", () => {
  // Many unclosed result-link anchors + a huge filler tail must return promptly.
  const pathological =
    `<a href="https://x.com" class='result-link'>`.repeat(2000) + "x".repeat(2_000_000);
  const start = Date.now();
  const results = parseDuckDuckGoLite(pathological);
  assert.ok(Date.now() - start < 1000, "must not hang on adversarial HTML");
  assert.ok(Array.isArray(results));
});

test("parseDuckDuckGoLite tolerates a missing snippet (empty string, not crash)", () => {
  const html = `<a href="https://x.com" class='result-link'>Only a link</a>`;
  const results = parseDuckDuckGoLite(html);
  assert.equal(results.length, 1);
  assert.equal(results[0].snippet, "");
});

test("parseDuckDuckGoLite does not double-unescape entities (CodeQL js/double-escaping)", () => {
  // A snippet whose author literally wrote "5 &lt; 10" reaches us HTML-escaped as
  // "5 &amp;lt; 10". Correct single-level decoding must yield the literal "5 &lt; 10",
  // NOT collapse it into a real "<" ("5 < 10") by unescaping &amp; before &lt;.
  const html = `<a href="https://e.com" class='result-link'>T</a>
    <td class='result-snippet'>5 &amp;lt; 10</td>`;
  const [r] = parseDuckDuckGoLite(html);
  assert.equal(r.snippet, "5 &lt; 10");
  assert.doesNotMatch(r.snippet, /5 < 10/, "must not double-unescape &amp;lt; into a real '<'");
});

test("parseDuckDuckGoLite never emits a live <script> from entity-encoded markup (CodeQL js/incomplete-multi-character-sanitization)", () => {
  // Entity-encoded markup must not be decoded into a live "<script>" tag AFTER tag
  // stripping — the result is surfaced to the LLM/client as a search snippet.
  const html = `<a href="https://e.com" class='result-link'>safe &lt;script&gt;x&lt;/script&gt; title</a>
    <td class='result-snippet'>ok &lt;script&gt;alert(1)&lt;/script&gt; done</td>`;
  const [r] = parseDuckDuckGoLite(html);
  assert.doesNotMatch(r.title, /<script/i, "title must not carry a live <script tag");
  assert.doesNotMatch(r.snippet, /<script/i, "snippet must not carry a live <script tag");
  assert.ok(r.title.includes("safe"), "benign title text is preserved");
  assert.ok(r.snippet.includes("alert(1)"), "benign snippet text is preserved");
});

test("parseDuckDuckGoLite drops an unclosed entity-encoded tag start (no '<script' leak)", () => {
  // "&lt;script" with no closing ">" decodes to "<script"; that partial tag must not
  // survive into the output.
  const html = `<a href="https://e.com" class='result-link'>safe title</a>
    <td class='result-snippet'>tail &lt;script foo bar</td>`;
  const [r] = parseDuckDuckGoLite(html);
  assert.doesNotMatch(r.snippet, /<script/i);
  assert.ok(r.snippet.startsWith("tail"));
});

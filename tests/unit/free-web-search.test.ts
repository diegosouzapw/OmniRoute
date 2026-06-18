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

test("parseDuckDuckGoLite tolerates a missing snippet (empty string, not crash)", () => {
  const html = `<a href="https://x.com" class='result-link'>Only a link</a>`;
  const results = parseDuckDuckGoLite(html);
  assert.equal(results.length, 1);
  assert.equal(results[0].snippet, "");
});

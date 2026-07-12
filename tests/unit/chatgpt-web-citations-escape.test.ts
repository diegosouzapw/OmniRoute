// ChatGPT-web citation link-text escaping (CodeQL js/incomplete-sanitization,
// PR #6569 release-blocker).
//
// `markdownLinkText()` builds the `[text]` half of a Markdown link from an
// untrusted citation label. It escaped `[` and `]` but NOT the backslash
// itself, so a label ending in (or containing) a backslash produced a broken
// link: e.g. `[Path C:\](url)` — the trailing `\` escapes the closing `]`,
// consuming the link's bracket. The escape character must be escaped first.

import test from "node:test";
import assert from "node:assert/strict";

const { cleanChatGptText } = await import(
  "../../open-sse/executors/chatgpt-web/citations.ts"
);

const S = ""; // marker start
const SEP = ""; // marker separator
const E = ""; // marker end

// Build a raw `url` citation marker:  url  <label>  <url> 
const urlMarker = (label: string, url: string) => `${S}url${SEP}${label}${SEP}${url}${E}`;

test("markdownLinkText escapes a trailing backslash in the citation label", () => {
  // Label ends in a backslash — without escaping, `[Path C:\](url)` breaks the link.
  const text = `See ${urlMarker("Path C:\\", "https://example.com/docs")} here`;
  const out = cleanChatGptText(text);
  assert.equal(out, "See [Path C:\\\\](https://example.com/docs) here");
  // The backslash must be doubled (escaped), never left bare before the `]`.
  assert.doesNotMatch(out, /[^\\]\\\]/);
});

test("markdownLinkText escapes a backslash preceding a bracket (no bracket leak)", () => {
  const text = urlMarker("a\\[b", "https://example.com");
  const out = cleanChatGptText(text);
  // `\` → `\\`, then `[` → `\[` : label renders as literal `a\[b`.
  assert.equal(out, "[a\\\\\\[b](https://example.com)");
});

test("bracket-only labels keep their existing escaping (regression guard)", () => {
  const text = urlMarker("a[b]c", "https://example.com");
  const out = cleanChatGptText(text);
  assert.equal(out, "[a\\[b\\]c](https://example.com)");
});

test("plain labels with no metacharacters pass through unchanged", () => {
  const text = urlMarker("Plain Title", "https://example.com");
  const out = cleanChatGptText(text);
  assert.equal(out, "[Plain Title](https://example.com)");
});

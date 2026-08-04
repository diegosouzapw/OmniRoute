import test from "node:test";
import assert from "node:assert/strict";
import { sanitizeDocsHtml } from "../../../src/lib/docsSanitizer.ts";

test("sanitizeDocsHtml removes dangerous tags and attributes", () => {
  const malicious = '<script>alert("xss")</script><img src="x" onerror="alert(1)"> <a href="javascript:alert(1)">link</a> <div onclick="evil()">content</div>';
  const sanitized = sanitizeDocsHtml(malicious);

  assert.ok(!sanitized.includes("<script>"), "Should remove <script>");
  assert.ok(!sanitized.includes("onerror"), "Should remove onerror");
  assert.ok(!sanitized.includes("onclick"), "Should remove onclick");
  assert.ok(!sanitized.includes("javascript:"), "Should remove javascript: URLs");
  assert.ok(sanitized.includes("<a>link</a>") || sanitized.includes("<a >link</a>") || sanitized.includes("link"), "Should keep safe content");
});

test("sanitizeDocsHtml allows safe tags and attributes", () => {
  const safe = '<h1>Title</h1><p>Paragraph with <strong>bold</strong> and <em>italic</em>.</p><ul><li>Item</li></ul><pre><code>code</code></pre>';
  const sanitized = sanitizeDocsHtml(safe);

  assert.ok(sanitized.includes("<h1>Title</h1>"), "Should allow <h1>");
  assert.ok(sanitized.includes("<p>"), "Should allow <p>");
  assert.ok(sanitized.includes("<strong>"), "Should allow <strong>");
  assert.ok(sanitized.includes("<ul>"), "Should allow <ul>");
  assert.ok(sanitized.includes("<li>"), "Should allow <li>");
  assert.ok(sanitized.includes("<pre>"), "Should allow <pre>");
  assert.ok(sanitized.includes("<code>"), "Should allow <code>");
});

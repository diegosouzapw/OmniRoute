import test from "node:test";
import assert from "node:assert/strict";

// #5486 — GitLab Duo's OAuth setup error embeds a registration URL
// (https://gitlab.com/-/profile/applications) but the OAuth error step rendered
// it as dead red text. linkifyText splits the message so the URL becomes a
// clickable <a> while the surrounding instructions stay plain text.
const { linkifyText } = await import("../../src/shared/utils/linkify.ts");

test("#5486 linkifies the GitLab Duo applications URL in the setup error", () => {
  const msg =
    "GitLab Duo OAuth is not configured. Register an OAuth application at " +
    "https://gitlab.com/-/profile/applications with redirect URI " +
    "http://localhost:20128/callback and scopes then restart.";
  const segs = linkifyText(msg);
  const links = segs.filter((s) => s.href);
  assert.equal(links.length, 2, "both URLs must become links");
  assert.equal(links[0].href, "https://gitlab.com/-/profile/applications");
  assert.equal(links[1].href, "http://localhost:20128/callback");
  // Reassembling the segment texts must reproduce the original message verbatim.
  assert.equal(segs.map((s) => s.text).join(""), msg);
});

test("#5486 trailing sentence punctuation is peeled out of the URL", () => {
  const segs = linkifyText("See https://gitlab.com/-/profile/applications.");
  const link = segs.find((s) => s.href);
  assert.equal(link?.href, "https://gitlab.com/-/profile/applications", "period not part of href");
  assert.equal(segs[segs.length - 1].text, ".", "period kept as trailing text");
});

test("#5486 plain text with no URL is a single text segment", () => {
  assert.deepEqual(linkifyText("no links here"), [{ text: "no links here" }]);
  assert.deepEqual(linkifyText(""), []);
  assert.deepEqual(linkifyText(null as unknown as string), []);
});

test("#5486 (hardening) only ever exposes http(s) hrefs — no javascript:/data: scheme", () => {
  // The matcher requires an http(s):// prefix AND safeHttpHref validates the scheme, so a
  // javascript:/data: "URL" embedded in text never becomes a clickable href — it stays
  // plain text. Regression guard for the CodeQL js/xss + url-redirection sink on the <a href>.
  const segs = linkifyText(
    "run javascript:alert(document.cookie) or data:text/html,alert(1) " +
      "but https://safe.example.com/ok is fine"
  );
  const hrefs = segs.filter((s) => s.href).map((s) => s.href as string);
  assert.deepEqual(hrefs, ["https://safe.example.com/ok"], "only the http(s) URL is a link");
  for (const h of hrefs) {
    assert.ok(/^https?:\/\//.test(h), `href must be http(s): ${h}`);
  }
});

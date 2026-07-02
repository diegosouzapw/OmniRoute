import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { isOfficialAnthropicBaseUrl } from "../../open-sse/utils/anthropicHost.ts";

// CodeQL #674 (js/incomplete-url-substring-sanitization): the official-Anthropic check
// must use exact hostname equality, not a substring `.includes("api.anthropic.com")`, so a
// look-alike upstream cannot impersonate the official endpoint and suppress the Bearer
// fallback intended for third-party gateways.

test("official endpoints are recognized (empty / scheme / scheme-less / path)", () => {
  assert.equal(isOfficialAnthropicBaseUrl(""), true, "empty baseUrl = default official");
  assert.equal(isOfficialAnthropicBaseUrl("https://api.anthropic.com"), true);
  assert.equal(isOfficialAnthropicBaseUrl("https://api.anthropic.com/v1"), true);
  assert.equal(isOfficialAnthropicBaseUrl("https://api.anthropic.com/"), true);
  // scheme-less host (operator may omit the protocol) is parsed with an assumed https://
  assert.equal(isOfficialAnthropicBaseUrl("api.anthropic.com"), true);
  assert.equal(isOfficialAnthropicBaseUrl("api.anthropic.com/v1"), true);
});

test("look-alike / third-party hosts are NOT treated as official", () => {
  // The exact strings the old substring check would have wrongly accepted:
  assert.equal(isOfficialAnthropicBaseUrl("https://api.anthropic.com.evil.test"), false);
  assert.equal(isOfficialAnthropicBaseUrl("https://api.anthropic.com.evil.test/v1"), false);
  assert.equal(isOfficialAnthropicBaseUrl("https://evil.test/?x=api.anthropic.com"), false);
  assert.equal(isOfficialAnthropicBaseUrl("https://evil.test/api.anthropic.com"), false);
  assert.equal(isOfficialAnthropicBaseUrl("https://my-gateway.test/anthropic"), false);
  // a genuinely different host
  assert.equal(isOfficialAnthropicBaseUrl("https://openrouter.ai/api"), false);
});

test("unparseable baseUrl falls back to third-party (Bearer emitted)", () => {
  assert.equal(isOfficialAnthropicBaseUrl("http://"), false);
  assert.equal(isOfficialAnthropicBaseUrl(":::"), false);
});

test("source no longer uses substring .includes for the official-host check", () => {
  const here = path.dirname(fileURLToPath(import.meta.url));
  const src = fs.readFileSync(
    path.join(here, "../../open-sse/executors/default.ts"),
    "utf8"
  );
  assert.equal(
    src.includes('.includes("api.anthropic.com")'),
    false,
    "default.ts must not substring-match the official Anthropic host (CodeQL #674)"
  );
});

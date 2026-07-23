import test from "node:test";
import assert from "node:assert/strict";

import {
  isClaudeCodeCompatible,
  buildProviderUrl,
  buildProviderHeaders,
} from "../../open-sse/services/provider.ts";
import { isClaudeCodeCompatibleProvider } from "../../open-sse/services/claudeCodeCompatible.ts";
import {
  CC_WIRE_IMAGE_BUILTINS,
  usesCcWireImage,
} from "../../open-sse/services/ccWireImageBuiltins.ts";
import { CLAUDE_CODE_COMPATIBLE_USER_AGENT } from "../../open-sse/services/claudeCodeCompatible.ts";
import { CLAUDE_CLI_USER_AGENT } from "../../open-sse/config/anthropicHeaders.ts";
import { applyFingerprint } from "../../open-sse/config/cliFingerprints.ts";

// Regression guard for #6056 — the built-in `agentrouter` provider must route
// through the DYNAMIC Claude-Code wire image (fingerprint headers + `?beta=true`
// chat path) while KEEPING its own registry baseUrl + x-api-key auth.

test("agentrouter is registered in the CC-wire-image built-in allow-set", () => {
  assert.ok(CC_WIRE_IMAGE_BUILTINS.has("agentrouter"));
  assert.equal(usesCcWireImage("agentrouter"), true);
  assert.equal(usesCcWireImage("claude"), false);
  assert.equal(usesCcWireImage(null), false);
});

test("(a) both CC predicates return true for agentrouter", () => {
  assert.equal(isClaudeCodeCompatible("agentrouter"), true);
  assert.equal(isClaudeCodeCompatibleProvider("agentrouter"), true);
});

test("(a) predicates are unaffected for non-allow-set providers", () => {
  // Official Claude OAuth provider must NOT be treated as CC-compatible.
  assert.equal(isClaudeCodeCompatible("claude"), false);
  assert.equal(isClaudeCodeCompatibleProvider("claude"), false);
  // Genuine CC-family providers still match via the prefix.
  assert.equal(isClaudeCodeCompatible("anthropic-compatible-cc-foo"), true);
  assert.equal(isClaudeCodeCompatibleProvider("anthropic-compatible-cc-foo"), true);
});

test("(b) agentrouter outbound headers carry the dynamic CC wire image", () => {
  const headers = buildProviderHeaders("agentrouter", { apiKey: "sk-agentrouter" }, true);

  // CC wire image markers (not the static getClaudeCliHeaders() shape).
  assert.equal(headers["User-Agent"], CLAUDE_CODE_COMPATIBLE_USER_AGENT);
  assert.notEqual(headers["User-Agent"], CLAUDE_CLI_USER_AGENT);
  assert.equal(headers["x-app"], "cli");
  assert.equal(headers["anthropic-dangerous-direct-browser-access"], "true");
  assert.ok(headers["anthropic-beta"], "expected the CC anthropic-beta header");
  assert.ok(headers["X-Stainless-Package-Version"], "expected CC X-Stainless anchors");
});

test("(b) applyFingerprint selects the claude-code-compatible fingerprint for agentrouter", () => {
  const { headers } = applyFingerprint(
    "agentrouter",
    buildProviderHeaders("agentrouter", { apiKey: "sk-agentrouter" }, true),
    { model: "claude-opus-4-6", messages: [] }
  );
  // Fingerprint reordering keeps the CC wire image + the preserved x-api-key auth.
  assert.equal(headers["x-api-key"], "sk-agentrouter");
  assert.equal(headers["User-Agent"], CLAUDE_CODE_COMPATIBLE_USER_AGENT);
});

test("(c) CRUX: agentrouter keeps its OWN x-api-key auth (NOT CC Bearer)", () => {
  const headers = buildProviderHeaders("agentrouter", { apiKey: "sk-agentrouter" }, true);
  assert.equal(headers["x-api-key"], "sk-agentrouter");
  assert.equal(headers["Authorization"], undefined);
});

test("(c) CRUX: agentrouter keeps its OWN registry baseUrl + ?beta=true", () => {
  const url = buildProviderUrl("agentrouter", "claude-opus-4-6", true);
  assert.equal(url, "https://agentrouter.org/v1/messages?beta=true");
  // NOT the CC-family anthropic default baseUrl.
  assert.ok(!url.includes("api.anthropic.com"));
});

test("(c) real CC-family provider still uses the CC default baseUrl + Bearer auth", () => {
  // The wire-image guard must NOT leak into genuine anthropic-compatible-cc-* providers.
  const headers = buildProviderHeaders(
    "anthropic-compatible-cc-foo",
    { apiKey: "sk-foo" },
    true
  );
  assert.equal(headers["Authorization"], "Bearer sk-foo");
  assert.equal(headers["x-api-key"], undefined);

  const url = buildProviderUrl("anthropic-compatible-cc-foo", "claude-sonnet-4-6", true);
  assert.ok(url.includes("api.anthropic.com"));
});

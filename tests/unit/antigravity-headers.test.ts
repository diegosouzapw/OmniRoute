import assert from "node:assert/strict";
import test from "node:test";

import {
  antigravityCliUserAgent,
  antigravityIdeNodeUserAgent,
  antigravityIdeUserAgent,
  getAntigravityContentHeaders,
  getAntigravityIdeNodeHeaders,
  getAntigravityLoadCodeAssistMetadata,
  getAntigravityOAuthUserAgent,
} from "../../open-sse/services/antigravityHeaders.ts";
import {
  clearAntigravityVersionCaches,
  seedAntigravityCliVersionCache,
  seedAntigravityIdeVersionCache,
} from "../../open-sse/services/antigravityVersion.ts";

test.afterEach(() => {
  clearAntigravityVersionCaches();
});

test("official IDE, IDE Node, and CLI User-Agent grammars match the native darwin/arm64 client", () => {
  assert.equal(antigravityIdeUserAgent("2.1.1"), "antigravity/ide/2.1.1 darwin/arm64");
  assert.equal(
    antigravityIdeNodeUserAgent("2.1.1"),
    "antigravity/2.1.1 darwin/arm64 google-api-nodejs-client/10.3.0"
  );
  assert.equal(
    antigravityCliUserAgent("1.1.1"),
    "antigravity/cli/1.1.1 (aidev_client; os_type=darwin; arch=arm64; auth_method=consumer)"
  );
});

test("User-Agent OS/arch token stays pinned to darwin/arm64 regardless of host (fingerprint fidelity)", () => {
  // The upstream Antigravity backend expects the native macOS build, so OmniRoute presents
  // that fingerprint no matter which platform it actually runs on (#8098 protocol fidelity).
  // The CLI builder's second argument is authMethod, not platform — the OS/arch token is
  // never host-derived, preserving the IDE/CLI User-Agent split (#8013).
  assert.match(antigravityIdeUserAgent("2.1.1"), / darwin\/arm64$/);
  assert.match(antigravityIdeNodeUserAgent("2.1.1"), / darwin\/arm64 /);
  assert.equal(
    antigravityCliUserAgent("1.1.1", "oauth"),
    "antigravity/cli/1.1.1 (aidev_client; os_type=darwin; arch=arm64; auth_method=oauth)"
  );
});

test("IDE and CLI content headers use independent cached versions", () => {
  seedAntigravityIdeVersionCache("2.2.0");
  seedAntigravityCliVersionCache("1.2.0");

  const ideHeaders = new Headers(getAntigravityContentHeaders("ide", "ide-token"));
  const cliHeaders = new Headers(getAntigravityContentHeaders("cli", "cli-token"));

  assert.match(ideHeaders.get("User-Agent") ?? "", /^antigravity\/ide\/2\.2\.0 /);
  assert.match(cliHeaders.get("User-Agent") ?? "", /^antigravity\/cli\/1\.2\.0 /);
  assert.equal(ideHeaders.get("Authorization"), "Bearer ide-token");
  assert.equal(cliHeaders.get("Authorization"), "Bearer cli-token");

  for (const headers of [ideHeaders, cliHeaders]) {
    for (const absent of [
      "x-client-name",
      "x-client-version",
      "x-machine-id",
      "x-vscode-sessionid",
      "X-Goog-Api-Client",
      "Client-Metadata",
    ]) {
      assert.equal(headers.get(absent), null, `${absent} must be absent from content headers`);
    }
  }
});

test("IDE Node OAuth and onboarding headers use the captured Google Node identity", () => {
  seedAntigravityIdeVersionCache("2.1.1");
  const headers = new Headers(getAntigravityIdeNodeHeaders("token"));

  assert.match(
    headers.get("User-Agent") ?? "",
    /^antigravity\/2\.1\.1 [^ ]+\/[^ ]+ google-api-nodejs-client\/10\.3\.0$/
  );
  assert.equal(headers.get("X-Goog-Api-Client"), "gl-node/22.21.1");
  assert.equal(headers.get("Authorization"), "Bearer token");
  assert.equal(headers.get("Client-Metadata"), null);
});

test("OAuth User-Agent selection keeps IDE and CLI identities independent", () => {
  seedAntigravityIdeVersionCache("2.2.0");
  seedAntigravityCliVersionCache("1.2.0");

  assert.match(
    getAntigravityOAuthUserAgent("ide"),
    /^antigravity\/2\.2\.0 [^ ]+\/[^ ]+ google-api-nodejs-client\/10\.3\.0$/
  );
  assert.match(getAntigravityOAuthUserAgent("cli"), /^antigravity\/cli\/1\.2\.0 /);
});

test("loadCodeAssist body metadata remains ideType only", () => {
  assert.deepEqual(getAntigravityLoadCodeAssistMetadata(), { ideType: "ANTIGRAVITY" });
  assert.equal("platform" in getAntigravityLoadCodeAssistMetadata(), false);
  assert.equal("pluginType" in getAntigravityLoadCodeAssistMetadata(), false);
});

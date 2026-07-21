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

test("official IDE, IDE Node, and CLI User-Agent grammars match sanitized captures", () => {
  assert.equal(
    antigravityIdeUserAgent("2.1.1", "darwin", "arm64"),
    "antigravity/ide/2.1.1 darwin/arm64"
  );
  assert.equal(
    antigravityIdeNodeUserAgent("2.1.1", "darwin", "arm64"),
    "antigravity/2.1.1 darwin/arm64 google-api-nodejs-client/10.3.0"
  );
  assert.equal(
    antigravityCliUserAgent("1.1.1", "darwin", "arm64"),
    "antigravity/cli/1.1.1 (aidev_client; os_type=darwin; arch=arm64; auth_method=consumer)"
  );
});

test("User-Agent builders normalize Windows and x64 like official client metadata", () => {
  assert.equal(
    antigravityIdeUserAgent("2.1.1", "win32", "x64"),
    "antigravity/ide/2.1.1 windows/amd64"
  );
  assert.equal(
    antigravityCliUserAgent("1.1.1", "win32", "x64"),
    "antigravity/cli/1.1.1 (aidev_client; os_type=windows; arch=amd64; auth_method=consumer)"
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

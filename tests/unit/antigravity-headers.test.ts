import assert from "node:assert/strict";
import test from "node:test";

import {
  antigravityCliUserAgent,
  getAntigravityContentHeaders,
  getAntigravityLoadCodeAssistMetadata,
} from "../../open-sse/services/antigravityHeaders.ts";
import {
  clearAntigravityVersionCaches,
  seedAntigravityCliVersionCache,
} from "../../open-sse/services/antigravityVersion.ts";

test.afterEach(() => {
  clearAntigravityVersionCaches();
});

test("official CLI User-Agent grammar matches the native darwin/arm64 client", () => {
  assert.equal(
    antigravityCliUserAgent("1.2.0"),
    "antigravity/cli/1.2.0 (aidev_client; os_type=darwin; arch=arm64; auth_method=consumer)"
  );
});

test("User-Agent OS/arch token stays pinned to darwin/arm64 regardless of host (fingerprint fidelity)", () => {
  // The upstream Antigravity backend expects the native macOS runtime, so OmniRoute
  // presents that fingerprint no matter which platform it actually runs on (#8098
  // protocol fidelity). The second builder argument is authMethod, not platform.
  assert.equal(
    antigravityCliUserAgent("1.2.0", "oauth"),
    "antigravity/cli/1.2.0 (aidev_client; os_type=darwin; arch=arm64; auth_method=oauth)"
  );
});

test("CLI content headers use the cached version and carry the bearer token", () => {
  seedAntigravityCliVersionCache("1.2.0");

  const headers = new Headers(getAntigravityContentHeaders("cli-token"));

  assert.match(headers.get("User-Agent") ?? "", /^antigravity\/cli\/1\.2\.0 /);
  assert.equal(headers.get("Authorization"), "Bearer cli-token");

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
});

test("loadCodeAssist body metadata sends numeric protobuf-JSON enums, not a bare ideType string", () => {
  // Google's backend 403s loadCodeAssist/onboardUser when ideType is sent as
  // the string "ANTIGRAVITY" with platform/pluginType omitted — verified via
  // a live side-by-side against 9router (same account, same host) using the
  // full enum shape below, which succeeded. See antigravityHeaders.ts for
  // the full incident note.
  const metadata = getAntigravityLoadCodeAssistMetadata();
  assert.deepEqual(metadata, { ideType: 9, platform: metadata.platform, pluginType: 2 });
  assert.equal(typeof metadata.platform, "number");
});

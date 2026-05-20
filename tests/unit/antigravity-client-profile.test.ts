import { test } from "node:test";
import assert from "node:assert/strict";

import {
  applyAntigravityClientProfileHeaders,
  antigravityHarnessUserAgent,
  getAntigravityClientProfile,
  normalizeAntigravityClientProfile,
} from "../../open-sse/services/antigravityClientProfile.ts";
import {
  seedAntigravityVersionCache,
  clearAntigravityVersionCache,
} from "../../open-sse/services/antigravityVersion.ts";

test.afterEach(() => {
  clearAntigravityVersionCache();
});

test("normalizeAntigravityClientProfile maps cli/sdk aliases to harness", () => {
  assert.equal(normalizeAntigravityClientProfile("cli"), "harness");
  assert.equal(normalizeAntigravityClientProfile("SDK"), "harness");
  assert.equal(normalizeAntigravityClientProfile("ide"), "ide");
  assert.equal(normalizeAntigravityClientProfile(undefined), "ide");
});

test("getAntigravityClientProfile reads providerSpecificData.clientProfile per connection", () => {
  assert.equal(
    getAntigravityClientProfile({
      providerSpecificData: { clientProfile: "harness" },
    }),
    "harness"
  );
  assert.equal(getAntigravityClientProfile({ providerSpecificData: {} }), "ide");
});

test("applyAntigravityClientProfileHeaders uses IDE fingerprint by default", () => {
  seedAntigravityVersionCache("4.2.0");
  const headers: Record<string, string> = {
    Authorization: "Bearer token",
    "Content-Type": "application/json",
  };

  applyAntigravityClientProfileHeaders(
    headers,
    { connectionId: "conn-1", providerSpecificData: {} },
    { project: "project-1" }
  );

  assert.match(headers["User-Agent"], /^Antigravity\/4\.2\.0 /);
  assert.equal(headers["x-client-name"], "antigravity");
  assert.equal(headers["x-client-version"], "4.2.0");
  assert.equal(typeof headers["x-machine-id"], "string");
  assert.equal(typeof headers["x-vscode-sessionid"], "string");
  assert.equal(headers["x-goog-user-project"], "project-1");
  assert.equal(headers["X-Goog-Api-Client"], undefined);
});

test("applyAntigravityClientProfileHeaders uses harness fingerprint when configured", () => {
  seedAntigravityVersionCache("4.2.0");
  const headers: Record<string, string> = {
    Authorization: "Bearer token",
    "Content-Type": "application/json",
    "x-client-name": "antigravity",
    "x-vscode-sessionid": "old-session",
  };

  applyAntigravityClientProfileHeaders(
    headers,
    { connectionId: "conn-2", providerSpecificData: { clientProfile: "harness" } },
    { project: "project-2" }
  );

  assert.equal(headers["User-Agent"], antigravityHarnessUserAgent("4.2.0"));
  assert.equal(headers["X-Goog-Api-Client"], undefined);
  assert.equal(headers["x-client-name"], undefined);
  assert.equal(headers["x-vscode-sessionid"], undefined);
  assert.equal(headers["x-goog-user-project"], "project-2");
});

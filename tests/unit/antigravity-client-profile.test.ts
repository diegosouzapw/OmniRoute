import { test } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";

import { normalizeAntigravityClientProfile } from "../../src/shared/constants/antigravityClientProfile.ts";
import {
  applyAntigravityClientProfileHeaders,
  antigravityHarnessUserAgent,
  getAntigravityClientProfile,
} from "../../open-sse/services/antigravityClientProfile.ts";
import { antigravityUserAgent } from "../../open-sse/services/antigravityHeaders.ts";
import { deriveAntigravityMachineId } from "../../open-sse/services/antigravityIdentity.ts";
import {
  seedAntigravityVersionCache,
  clearAntigravityVersionCache,
} from "../../open-sse/services/antigravityVersion.ts";

const require = createRequire(import.meta.url);
const { machineIdSync } = require("node-machine-id") as {
  machineIdSync: (original?: boolean) => string;
};

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

test("antigravityUserAgent matches Antigravity Manager platform fingerprints", () => {
  assert.equal(
    antigravityUserAgent("4.2.0", "darwin"),
    "Antigravity/4.2.0 (Macintosh; Intel Mac OS X 10_15_7) Chrome/132.0.6834.160 Electron/39.2.3"
  );
  assert.equal(
    antigravityUserAgent("4.2.0", "win32"),
    "Antigravity/4.2.0 (Windows NT 10.0; Win64; x64) Chrome/132.0.6834.160 Electron/39.2.3"
  );
  assert.equal(
    antigravityUserAgent("4.2.0", "linux"),
    "Antigravity/4.2.0 (X11; Linux x86_64) Chrome/132.0.6834.160 Electron/39.2.3"
  );
});

test("deriveAntigravityMachineId uses the raw system machine id like Antigravity Manager", () => {
  assert.equal(deriveAntigravityMachineId(), machineIdSync(true));
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

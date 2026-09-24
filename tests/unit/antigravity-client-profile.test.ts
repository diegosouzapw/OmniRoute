import assert from "node:assert/strict";
import test from "node:test";

import {
  normalizeAntigravityClientProfile,
  type AntigravityClientProfile,
} from "../../src/shared/constants/antigravityClientProfile.ts";
import { validateProviderSpecificData } from "../../src/shared/validation/providerSpecificData.ts";
import {
  applyAntigravityClientProfileHeaders,
  getAntigravityClientProfile,
} from "../../open-sse/services/antigravityClientProfile.ts";
import { getAntigravityEnvelopeUserAgent } from "../../open-sse/services/antigravityIdentity.ts";
import {
  clearAntigravityVersionCaches,
  seedAntigravityCliVersionCache,
} from "../../open-sse/services/antigravityVersion.ts";

test.afterEach(() => {
  clearAntigravityVersionCaches();
});

test("normalizeAntigravityClientProfile maps every legacy value to CLI", () => {
  assert.equal(normalizeAntigravityClientProfile("cli"), "cli");
  assert.equal(normalizeAntigravityClientProfile("CLI"), "cli");
  assert.equal(normalizeAntigravityClientProfile("ide"), "cli");
  assert.equal(normalizeAntigravityClientProfile(undefined), "cli");
  assert.equal(normalizeAntigravityClientProfile(null), "cli");
  assert.equal(normalizeAntigravityClientProfile("harness"), "cli");
  assert.equal(normalizeAntigravityClientProfile("sdk"), "cli");
  assert.equal(normalizeAntigravityClientProfile(""), "cli");
  assert.equal(normalizeAntigravityClientProfile(42), "cli");
});

function validateClientProfile(value: unknown): string[] {
  const messages: string[] = [];
  const ctx = {
    addIssue: (issue: { message: string }) => messages.push(issue.message),
  } as unknown as Parameters<typeof validateProviderSpecificData>[1];

  validateProviderSpecificData({ clientProfile: value }, ctx);
  return messages;
}

test("provider-specific validation accepts the current and legacy Antigravity profiles", () => {
  assert.deepEqual(validateClientProfile("ide"), []);
  assert.deepEqual(validateClientProfile("cli"), []);
  assert.deepEqual(validateClientProfile("CLI"), []);
  assert.deepEqual(validateClientProfile(undefined), []);
  assert.deepEqual(validateClientProfile(null), []);

  for (const invalid of ["harness", "sdk", "", 42]) {
    assert.deepEqual(validateClientProfile(invalid), [
      "providerSpecificData.clientProfile must be ide or cli",
    ]);
  }
});

test("getAntigravityClientProfile always resolves to the consolidated CLI identity", () => {
  assert.equal(
    getAntigravityClientProfile({ providerSpecificData: { clientProfile: "cli" } }),
    "cli"
  );
  assert.equal(getAntigravityClientProfile({ providerSpecificData: {} }), "cli");
  assert.equal(
    getAntigravityClientProfile({ providerSpecificData: { clientProfile: "ide" } }),
    "cli"
  );
  assert.equal(
    getAntigravityClientProfile({ providerSpecificData: { clientProfile: "harness" } }),
    "cli"
  );
});

function assertIdentityHeadersAbsent(headers: Record<string, string>): void {
  const normalized = new Headers(headers);
  for (const name of [
    "x-client-name",
    "x-client-version",
    "x-machine-id",
    "x-vscode-sessionid",
    "X-Goog-Api-Client",
    "Client-Metadata",
  ]) {
    assert.equal(normalized.get(name), null, `${name} must be removed`);
  }
}

function applyProfile(profile: AntigravityClientProfile): Record<string, string> {
  const headers: Record<string, string> = {
    Authorization: "Bearer token",
    "Content-Type": "application/json",
    "X-Client-Name": "legacy-name",
    "x-client-version": "4.2.0",
    "X-Machine-Id": "legacy-machine",
    "x-vscode-sessionid": "legacy-session",
    "X-Goog-Api-Client": "legacy-api-client",
    "client-metadata": "legacy-metadata",
  };

  applyAntigravityClientProfileHeaders(
    headers,
    { connectionId: `connection-${profile}`, providerSpecificData: { clientProfile: profile } },
    { project: "project-1" }
  );
  return headers;
}

test("content header application emits the CLI identity and strips fake headers", () => {
  seedAntigravityCliVersionCache("1.2.0");

  const cliHeaders = applyProfile("cli");

  assert.match(
    cliHeaders["User-Agent"],
    /^antigravity\/cli\/1\.2\.0 \(aidev_client; os_type=.+; arch=.+; auth_method=consumer\)$/
  );
  assertIdentityHeadersAbsent(cliHeaders);
  assert.equal(cliHeaders["x-goog-user-project"], "project-1");
});

test("public request envelopes never infer the internal jetski identity from email", () => {
  assert.equal(getAntigravityEnvelopeUserAgent({ email: "user@gmail.com" }), "antigravity");
  assert.equal(getAntigravityEnvelopeUserAgent({ email: "user@company.example" }), "antigravity");
  assert.equal(getAntigravityEnvelopeUserAgent(null), "antigravity");
});

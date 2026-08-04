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
  seedAntigravityIdeVersionCache,
} from "../../open-sse/services/antigravityVersion.ts";

test.afterEach(() => {
  clearAntigravityVersionCaches();
});

test("normalizeAntigravityClientProfile maps persisted legacy profiles to CLI", () => {
  assert.equal(normalizeAntigravityClientProfile("cli"), "cli");
  assert.equal(normalizeAntigravityClientProfile("CLI"), "cli");
  assert.equal(normalizeAntigravityClientProfile("ide"), "ide");
  assert.equal(normalizeAntigravityClientProfile(undefined), "ide");
  assert.equal(normalizeAntigravityClientProfile(null), "ide");
  assert.equal(normalizeAntigravityClientProfile("harness"), "cli");
  assert.equal(normalizeAntigravityClientProfile("sdk"), "cli");
  assert.equal(normalizeAntigravityClientProfile(""), "ide");
  assert.equal(normalizeAntigravityClientProfile(42), "ide");
});

function validateClientProfile(value: unknown): string[] {
  const messages: string[] = [];
  const ctx = {
    addIssue: (issue: { message: string }) => messages.push(issue.message),
  } as unknown as Parameters<typeof validateProviderSpecificData>[1];

  validateProviderSpecificData({ clientProfile: value }, ctx);
  return messages;
}

test("provider-specific validation rejects legacy Antigravity client profiles", () => {
  assert.deepEqual(validateClientProfile("ide"), []);
  assert.deepEqual(validateClientProfile("CLI"), []);
  assert.deepEqual(validateClientProfile(undefined), []);
  assert.deepEqual(validateClientProfile(null), []);

  for (const invalid of ["harness", "sdk", "", 42]) {
    assert.deepEqual(validateClientProfile(invalid), [
      "providerSpecificData.clientProfile must be ide or cli",
    ]);
  }
});

test("getAntigravityClientProfile preserves legacy CLI identity for persisted values", () => {
  assert.equal(
    getAntigravityClientProfile({ providerSpecificData: { clientProfile: "cli" } }),
    "cli"
  );
  assert.equal(getAntigravityClientProfile({ providerSpecificData: {} }), "ide");
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

test("content header application emits IDE and CLI identities and strips fake headers", () => {
  seedAntigravityIdeVersionCache("2.1.1");
  seedAntigravityCliVersionCache("1.1.1");

  const ideHeaders = applyProfile("ide");
  const cliHeaders = applyProfile("cli");

  assert.match(ideHeaders["User-Agent"], /^antigravity\/ide\/2\.1\.1 /);
  assert.match(ideHeaders["User-Agent"], / darwin\/arm64$| windows\/amd64$| linux\/[^ ]+$/);
  assert.match(
    cliHeaders["User-Agent"],
    /^antigravity\/cli\/1\.1\.1 \(aidev_client; os_type=.+; arch=.+; auth_method=consumer\)$/
  );
  assertIdentityHeadersAbsent(ideHeaders);
  assertIdentityHeadersAbsent(cliHeaders);
  assert.equal(ideHeaders["x-goog-user-project"], "project-1");
  assert.equal(cliHeaders["x-goog-user-project"], "project-1");
});

test("public request envelopes never infer the internal jetski identity from email", () => {
  assert.equal(getAntigravityEnvelopeUserAgent({ email: "user@gmail.com" }), "antigravity");
  assert.equal(getAntigravityEnvelopeUserAgent({ email: "user@company.example" }), "antigravity");
  assert.equal(getAntigravityEnvelopeUserAgent(null), "antigravity");
});

import test from "node:test";
import assert from "node:assert/strict";

import { isPublicApiRoute } from "../../src/shared/constants/publicApiRoutes.ts";

test("isPublicApiRoute allows public management prefixes", () => {
  assert.equal(isPublicApiRoute("/api/auth/login"), true);
  assert.equal(isPublicApiRoute("/api/v1/chat/completions"), true);
  assert.equal(isPublicApiRoute("/api/oauth/cursor/callback"), true);
});

test("isPublicApiRoute allows readonly bootstrap route only for safe methods", () => {
  assert.equal(isPublicApiRoute("/api/settings/require-login", "GET"), true);
  assert.equal(isPublicApiRoute("/api/settings/require-login", "HEAD"), true);
  assert.equal(isPublicApiRoute("/api/settings/require-login", "OPTIONS"), true);
  assert.equal(isPublicApiRoute("/api/settings/require-login", "POST"), false);
});

test("isPublicApiRoute rejects non-public management routes", () => {
  assert.equal(isPublicApiRoute("/api/settings"), false);
  assert.equal(isPublicApiRoute("/api/providers"), false);
});

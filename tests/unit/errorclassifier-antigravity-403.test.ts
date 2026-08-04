import test from "node:test";
import assert from "node:assert/strict";
import {
  classifyProviderError,
  PROVIDER_ERROR_TYPES,
} from "../../open-sse/services/errorClassifier.ts";

// A Cloud Code / Antigravity (Gemini Code Assist) 403 is almost always a
// RECOVERABLE project-config problem — the Cloud AI Companion API not enabled on
// the project, a stale project, or PERMISSION_DENIED — NOT an account ban.
// It must classify as PROJECT_ROUTE_ERROR so the account stays usable once the
// project is fixed, instead of being disabled for ~a year like a real ban.

test("403 'has not been used in project' (antigravity) -> PROJECT_ROUTE_ERROR", () => {
  const body = {
    error: {
      code: 403,
      status: "PERMISSION_DENIED",
      message:
        "Cloud AI Companion API has not been used in project 123 before or it is disabled.",
    },
  };
  assert.equal(
    classifyProviderError(403, body, "antigravity"),
    PROVIDER_ERROR_TYPES.PROJECT_ROUTE_ERROR,
  );
});

test("403 SERVICE_DISABLED / PERMISSION_DENIED (gemini-cli) -> PROJECT_ROUTE_ERROR", () => {
  const body = { error: { status: "PERMISSION_DENIED", details: [{ reason: "SERVICE_DISABLED" }] } };
  assert.equal(
    classifyProviderError(403, body, "gemini-cli"),
    PROVIDER_ERROR_TYPES.PROJECT_ROUTE_ERROR,
  );
});

test("403 on a cloud-code provider with a bare body -> still recoverable PROJECT_ROUTE_ERROR", () => {
  assert.equal(
    classifyProviderError(403, "forbidden", "antigravity-cloudcode"),
    PROVIDER_ERROR_TYPES.PROJECT_ROUTE_ERROR,
  );
});

test("403 real ban signal -> still ACCOUNT_DEACTIVATED (ban detection preserved)", () => {
  const body = "This service has been disabled in this account for violation of policy.";
  assert.equal(
    classifyProviderError(403, body, "antigravity"),
    PROVIDER_ERROR_TYPES.ACCOUNT_DEACTIVATED,
  );
});

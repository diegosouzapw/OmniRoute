import test from "node:test";
import assert from "node:assert/strict";
import {
  classifyProviderError,
  PROVIDER_ERROR_TYPES,
} from "../../open-sse/services/errorClassifier.ts";

// #11809 (follow-up to #10725) — a Kiro/Amazon Q IdC account whose Identity Center
// lives outside the Q Developer profile regions is stored without a profileArn, so
// CodeWhisperer answers 403 "User is not authorized to make this call". That is a
// RECOVERABLE configuration issue (the same token succeeds once the profile ARN is
// discovered, and the account keeps working in Kiro IDE) — not a ban. Before the fix
// it fell through to FORBIDDEN, which markAccountUnavailable turns into the terminal
// "banned" state (is_active=0) and required a full re-auth on every authentication.

const KIRO_MISSING_ARN_403 = {
  message: "User is not authorized to make this call",
};

test("#11809: kiro 403 'User is not authorized to make this call' -> PROJECT_ROUTE_ERROR, not FORBIDDEN", () => {
  assert.equal(
    classifyProviderError(403, KIRO_MISSING_ARN_403, "kiro"),
    PROVIDER_ERROR_TYPES.PROJECT_ROUTE_ERROR,
  );
});

test("#11809: amazon-q shares the Kiro executor/credentials -> same recoverable classification", () => {
  assert.equal(
    classifyProviderError(403, KIRO_MISSING_ARN_403, "amazon-q"),
    PROVIDER_ERROR_TYPES.PROJECT_ROUTE_ERROR,
  );
});

test("#11809: the message is matched inside a raw CodeWhisperer error body too", () => {
  const body =
    '{"__type":"AccessDeniedException","message":"User is not authorized to make this call."}';
  assert.equal(
    classifyProviderError(403, body, "kiro"),
    PROVIDER_ERROR_TYPES.PROJECT_ROUTE_ERROR,
  );
});

test("control: an unrelated kiro 403 still bans (FORBIDDEN) — carve-out is message-scoped", () => {
  assert.equal(classifyProviderError(403, "Forbidden", "kiro"), PROVIDER_ERROR_TYPES.FORBIDDEN);
});

test("control: the same message on a non-Kiro oauth provider keeps FORBIDDEN — carve-out is provider-scoped", () => {
  assert.equal(
    classifyProviderError(403, KIRO_MISSING_ARN_403, "claude"),
    PROVIDER_ERROR_TYPES.FORBIDDEN,
  );
});

test("control: a real Kiro ban signal still classifies as ACCOUNT_DEACTIVATED", () => {
  assert.equal(
    classifyProviderError(403, "your account has been suspended", "kiro"),
    PROVIDER_ERROR_TYPES.ACCOUNT_DEACTIVATED,
  );
});

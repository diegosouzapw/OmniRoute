import assert from "node:assert/strict";
import { describe, it, beforeEach, after } from "node:test";

import { DASHBOARD_CSRF_HEADER } from "@/shared/constants/dashboardCsrf";
import { issueDashboardCsrfToken, validateDashboardCsrfToken } from "@/server/authz/csrf";

const ORIGINAL_JWT_SECRET = process.env.JWT_SECRET;

beforeEach(() => {
  process.env.JWT_SECRET = "csrf-test-secret";
});

after(() => {
  if (ORIGINAL_JWT_SECRET === undefined) delete process.env.JWT_SECRET;
  else process.env.JWT_SECRET = ORIGINAL_JWT_SECRET;
});

function request(path: string, cookie = "auth_token=session-a", token?: string): Request {
  return new Request(`http://127.0.0.1:20128${path}`, {
    method: "POST",
    headers: {
      cookie,
      ...(token ? { [DASHBOARD_CSRF_HEADER]: token } : {}),
    },
  });
}

describe("dashboard CSRF tokens", () => {
  it("accepts a valid token for dashboard management mutation paths", () => {
    const issued = issueDashboardCsrfToken(request("/api/auth/csrf"), 1_000);

    assert.ok(issued);
    assert.equal(
      validateDashboardCsrfToken(request("/api/models/test", undefined, issued.token), 1_000),
      true
    );
    assert.equal(
      validateDashboardCsrfToken(request("/api/models/test-all", undefined, issued.token), 1_000),
      true
    );
    assert.equal(
      validateDashboardCsrfToken(request("/api/combos/test", undefined, issued.token), 1_000),
      true
    );
    assert.equal(
      validateDashboardCsrfToken(request("/api/keys", undefined, issued.token), 1_000),
      true
    );
    assert.equal(
      validateDashboardCsrfToken(request("/api/settings", undefined, issued.token), 1_000),
      true
    );
  });

  it("binds tokens to the dashboard auth cookie", () => {
    const issued = issueDashboardCsrfToken(
      request("/api/auth/csrf", "auth_token=session-a"),
      1_000
    );

    assert.ok(issued);
    assert.equal(
      validateDashboardCsrfToken(
        request("/api/models/test", "auth_token=session-b", issued.token),
        1_000
      ),
      false
    );
  });

  it("rejects expired and tampered tokens", () => {
    const issued = issueDashboardCsrfToken(request("/api/auth/csrf"), 1_000);

    assert.ok(issued);
    assert.equal(
      validateDashboardCsrfToken(request("/api/models/test", undefined, issued.token), 700_000),
      false
    );
    assert.equal(
      validateDashboardCsrfToken(request("/api/models/test", undefined, `${issued.token}x`), 1_000),
      false
    );
  });
});

import assert from "node:assert/strict";
import test from "node:test";
import {
  __test_resetCredentialHealthCache,
  getCredentialHealth,
  getCredentialHealthSummary,
  isCredentialHealthy,
  setCredentialHealth,
} from "../../src/lib/credentialHealth/cache.ts";
import { checkCredentialGate } from "../../open-sse/services/credentialGate.ts";

const AUTH_FAILURES = [
  "upstream_auth_error",
  "auth_missing",
  "token_expired",
  "reauth_required",
  "account_deactivated",
  "auth_required",
];
const INCONCLUSIVE_FAILURES = [
  "network_error",
  "upstream_unavailable",
  "upstream_rate_limited",
  "token_refresh_failed",
  "upstream_ambiguous_auth_or_quota",
  "provider_error",
  "runtime_error",
  "validation_error",
  "unsupported",
  "unknown",
  "",
  undefined,
];

test.afterEach(() => __test_resetCredentialHealthCache());

test(
  "transient and inconclusive probes do not establish invalid credentials",
  { timeout: 2000 },
  () => {
    for (const type of INCONCLUSIVE_FAILURES) {
      setCredentialHealth("synthetic", "codex", "error", "Probe timed out", type, "upstream");
      assert.equal(isCredentialHealthy("synthetic"), undefined, String(type));
      assert.notEqual(checkCredentialGate("synthetic", "codex", "codex/model").allowed, false);
      assert.equal(getCredentialHealth("synthetic")?.status, "error");
    }
    assert.equal(getCredentialHealthSummary().failed, 1);
  }
);

test(
  "explicit authentication diagnoses still reject credential dispatch",
  { timeout: 2000 },
  () => {
    for (const type of AUTH_FAILURES) {
      setCredentialHealth("synthetic", "codex", "error", "Credential rejected", type, "upstream");
      assert.equal(isCredentialHealthy("synthetic"), false, type);
      assert.equal(checkCredentialGate("synthetic", "codex", "codex/model").allowed, false);
    }
  }
);

test(
  "successful validation immediately replaces a negative credential verdict",
  { timeout: 2000 },
  () => {
    setCredentialHealth(
      "synthetic",
      "codex",
      "error",
      "Credential rejected",
      "upstream_auth_error"
    );
    setCredentialHealth("other", "codex", "error", "Missing credential", "auth_missing");
    assert.equal(isCredentialHealthy("synthetic"), false);
    setCredentialHealth("synthetic", "codex", "active");
    assert.equal(checkCredentialGate("synthetic", "codex", "codex/model").allowed, true);
    assert.equal(getCredentialHealth("synthetic")?.lastError, undefined);
    assert.equal(getCredentialHealth("synthetic")?.lastErrorType, undefined);
    assert.equal(getCredentialHealth("synthetic")?.consecutiveFailures, 0);
    assert.equal(isCredentialHealthy("other"), false);
  }
);

test(
  "positive, unknown and exact five-minute expiry semantics remain unchanged",
  { timeout: 2000 },
  () => {
    const originalNow = Date.now;
    let now = 1_000_000;
    Date.now = () => now;
    try {
      assert.equal(isCredentialHealthy("missing"), undefined);
      setCredentialHealth("unknown", "codex", "unknown");
      assert.equal(isCredentialHealthy("unknown"), undefined);
      setCredentialHealth("synthetic", "codex", "error", "Rejected", "upstream_auth_error");
      now += 300_000;
      assert.equal(isCredentialHealthy("synthetic"), false);
      now += 1;
      assert.equal(isCredentialHealthy("synthetic"), undefined);
      setCredentialHealth("synthetic", "codex", "active");
      assert.equal(isCredentialHealthy("synthetic"), true);
    } finally {
      Date.now = originalNow;
    }
  }
);

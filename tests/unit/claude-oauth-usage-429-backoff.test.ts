import { describe, it, beforeEach } from "node:test";
import { strict as assert } from "node:assert";

import {
  OAUTH_USAGE_429_COOLDOWN_MS,
  _resetClaudeOauthUsageCooldown,
  isClaudeOauthUsageCoolingDown,
  markClaudeOauthUsage429,
} from "../../open-sse/services/claudeUsageCooldown.ts";

describe("claude OAuth usage 429 backoff", () => {
  beforeEach(() => {
    _resetClaudeOauthUsageCooldown();
  });

  it("starts uncooled for any token", () => {
    assert.equal(isClaudeOauthUsageCoolingDown("tok-a"), false);
    assert.equal(isClaudeOauthUsageCoolingDown(undefined), false);
  });

  it("treats a single 429 as entering cooldown for that token only", () => {
    const t0 = 1_000_000;
    markClaudeOauthUsage429("tok-a", t0);
    assert.equal(isClaudeOauthUsageCoolingDown("tok-a", t0 + 1), true);
    // A different token is unaffected — cooldown is per-token, not global.
    assert.equal(isClaudeOauthUsageCoolingDown("tok-b", t0 + 1), false);
  });

  it("repeated 429s on the same token do NOT spam: stays cooling once entered", () => {
    const t0 = 2_000_000;
    markClaudeOauthUsage429("tok-a", t0);
    // Simulate the scheduler hitting 429 again 10s, 30s, 60s later
    for (const dt of [10_000, 30_000, 60_000]) {
      markClaudeOauthUsage429("tok-a", t0 + dt);
      assert.equal(
        isClaudeOauthUsageCoolingDown("tok-a", t0 + dt),
        true,
        `still cooling at +${dt}ms`
      );
    }
  });

  it("cooldown expires after OAUTH_USAGE_429_COOLDOWN_MS and the token becomes eligible again", () => {
    const t0 = 3_000_000;
    markClaudeOauthUsage429("tok-a", t0);
    assert.equal(
      isClaudeOauthUsageCoolingDown("tok-a", t0 + OAUTH_USAGE_429_COOLDOWN_MS - 1),
      true
    );
    assert.equal(
      isClaudeOauthUsageCoolingDown("tok-a", t0 + OAUTH_USAGE_429_COOLDOWN_MS + 1),
      false,
      "should be eligible again after cooldown window"
    );
  });

  it("undefined/missing access token is a no-op (does not poison the map)", () => {
    const t0 = 4_000_000;
    markClaudeOauthUsage429(undefined, t0);
    assert.equal(isClaudeOauthUsageCoolingDown(undefined, t0 + 1), false);
  });

  it("cooldown defaults to 3 minutes (matches upstream OAUTH_429_COOLDOWN_MS)", () => {
    assert.equal(OAUTH_USAGE_429_COOLDOWN_MS, 180_000);
  });
});

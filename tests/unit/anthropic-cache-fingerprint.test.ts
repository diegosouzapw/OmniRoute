import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { CLAUDE_CODE_CLIENT_BILLING_VERSION } from "../../src/shared/constants/claudeCodeClient.ts";

describe("Anthropic billing header fingerprint (#1638)", () => {
  it("uses the immutable build revision captured from the signed CLI", () => {
    assert.equal(CLAUDE_CODE_CLIENT_BILLING_VERSION, "2.1.219.250");
  });
});

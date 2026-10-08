import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  containsStrongCredentialToken,
  redactSensitiveErrorText,
} from "../../open-sse/utils/errorSanitization.ts";

function elapsedMs(run: () => void): number {
  const start = process.hrtime.bigint();
  run();
  return Number(process.hrtime.bigint() - start) / 1e6;
}

describe("strong credential token scan", () => {
  it("containsStrongCredentialToken_LongAlphanumericRunWithoutKey_ScansInLinearTime", () => {
    const run = "a".repeat(200_000);

    let found = true;
    const ms = elapsedMs(() => {
      found = containsStrongCredentialToken(run);
    });

    assert.equal(found, false);
    assert.ok(ms < 500, `scan took ${ms.toFixed(1)}ms for a 200k alphanumeric run`);
  });

  it("containsStrongCredentialToken_KeyGluedToAlphanumericPrefix_IsDetected", () => {
    assert.equal(containsStrongCredentialToken("projsk-AbCdEfGhIjKl"), true);
    assert.equal(containsStrongCredentialToken("(abcsk_AbCdEfGh12)"), true);
  });

  it("redactSensitiveErrorText_KeyGluedToAlphanumericPrefix_RedactsPrefixAndKey", () => {
    const out = redactSensitiveErrorText("rejected xyzsk-AbCdEfGhIjKlMn for this project");

    assert.equal(out, "rejected [REDACTED] for this project");
  });

  it("containsStrongCredentialToken_PrefixShorterThanThreeCharacters_IsNotAGluedKey", () => {
    assert.equal(containsStrongCredentialToken("ab-xsk-AbCdEfGhIjKl"), false);
  });
});

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  maskEmail,
  maskEmailLikeValue,
  pickDisplayValue,
  pickMaskedDisplayValue,
} from "../../src/shared/utils/maskEmail.ts";

describe("maskEmail", () => {
  it("masks standard email correctly", () => {
    assert.equal(maskEmail("diego.souza@gmail.com"), "die********@******com");
  });

  it("masks email with short username (exactly visibleChars)", () => {
    // username "ab" has length 2 = visibleChars, so returns as-is
    assert.equal(maskEmail("ab@gmail.com"), "ab@gmail.com");
  });

  it("masks email with longer username", () => {
    const result = maskEmail("hello@example.com");
    assert.equal(result, "hel**@********com");
  });

  it("returns empty string for null", () => {
    assert.equal(maskEmail(null), "");
  });

  it("returns empty string for undefined", () => {
    assert.equal(maskEmail(undefined), "");
  });

  it("returns empty string for empty string", () => {
    assert.equal(maskEmail(""), "");
  });

  it("returns original if no @ symbol", () => {
    assert.equal(maskEmail("notanemail"), "notanemail");
  });

  it("handles multi-part TLDs correctly", () => {
    assert.equal(maskEmail("diego.souza@outlook.com.br"), "die********@***********.br");
    assert.equal(maskEmail("evelyn@outlook.com.br"), "eve***@***********.br");
  });

  it("handles single-char domain name", () => {
    assert.equal(maskEmail("user@x.com"), "use*@**com");
  });

  it("allows customizing visibleChars", () => {
    const result = maskEmail("hello@example.com", 3);
    assert.ok(result.startsWith("hel"), `Expected to start with 'hel', got: ${result}`);
  });

  it("masks email-like values stored in generic labels", () => {
    assert.equal(maskEmailLikeValue("person@example.com"), "per***@********com");
    assert.equal(maskEmailLikeValue("Work Account"), "Work Account");
  });

  it("picks the first non-empty masked display value", () => {
    assert.equal(
      pickMaskedDisplayValue(["", "person@example.com", "fallback"], "fallback"),
      "per***@********com"
    );
    assert.equal(pickMaskedDisplayValue([null, "Workspace"], "fallback"), "Workspace");
  });

  it("respects the global visibility toggle when picking display values", () => {
    assert.equal(
      pickDisplayValue(["person@example.com", "Workspace"], false, "fallback"),
      "per***@********com"
    );
    assert.equal(
      pickDisplayValue(["person@example.com", "Workspace"], true, "fallback"),
      "person@example.com"
    );
    assert.equal(pickDisplayValue([null, "Workspace"], false, "fallback"), "Workspace");
  });
});

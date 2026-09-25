import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { classify429FromError } from "../../src/shared/utils/classify429.ts";

describe("classify429FromError - CLIProxyAPI model cooldown", () => {
  it("classifies CLIProxyAPI model_cooldown as quota_exhausted", () => {
    const error = {
      status: 429,
      message: "All credentials for model claude-opus-5 are cooling down",
    };
    const kind = classify429FromError(error);
    assert.equal(kind, "quota_exhausted");
  });

  it("classifies structured CLIProxyAPI error payload with code model_cooldown", () => {
    const error = {
      status: 429,
      error: {
        code: "model_cooldown",
        message: "All credentials for model claude-opus-5 are cooling down",
      },
    };
    const kind = classify429FromError(error);
    assert.equal(kind, "quota_exhausted");
  });
});

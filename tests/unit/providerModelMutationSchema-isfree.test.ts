import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { providerModelMutationSchema } from "../../src/shared/validation/schemas/provider.ts";

describe("providerModelMutationSchema isFree", () => {
  it("isFree:true accepted", () => {
    assert.equal(
      providerModelMutationSchema.safeParse({ provider: "p", modelId: "m", isFree: true }).success,
      true
    );
  });
  it("old payload without isFree still valid", () => {
    assert.equal(
      providerModelMutationSchema.safeParse({ provider: "p", modelId: "m" }).success,
      true
    );
  });
  it('rejects isFree:0 and isFree:"yes"', () => {
    assert.equal(
      providerModelMutationSchema.safeParse({ provider: "p", modelId: "m", isFree: 0 }).success,
      false
    );
    assert.equal(
      providerModelMutationSchema.safeParse({ provider: "p", modelId: "m", isFree: "yes" }).success,
      false
    );
  });
  it("nullable true/false/null accepted", () => {
    assert.equal(
      providerModelMutationSchema.safeParse({ provider: "p", modelId: "m", isFree: null }).success,
      true
    );
    assert.equal(
      providerModelMutationSchema.safeParse({ provider: "p", modelId: "m", isFree: false }).success,
      true
    );
  });
});

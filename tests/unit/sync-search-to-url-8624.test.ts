import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { syncSearchToUrl } from "../../src/app/(dashboard)/dashboard/providers/providerPageUtils.ts";

describe("syncSearchToUrl (#8624)", () => {
  it("does not throw when window is undefined (SSR environment)", () => {
    assert.doesNotThrow(() => {
      syncSearchToUrl("openai");
    });
  });
});

import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  registerDbStateResetter,
  resetAllDbModuleState,
} from "../../src/lib/db/stateReset.ts";

describe("stateReset", () => {
  it("registerDbStateResetter adds a resetter that gets called on resetAllDbModuleState", () => {
    let called = false;
    registerDbStateResetter(() => {
      called = true;
    });
    resetAllDbModuleState();
    assert.equal(called, true, "registered resetter should be invoked");
  });

  it("resetAllDbModuleState calls all registered resetters", () => {
    const calls: number[] = [];
    registerDbStateResetter(() => calls.push(1));
    registerDbStateResetter(() => calls.push(2));
    registerDbStateResetter(() => calls.push(3));
    resetAllDbModuleState();
    assert.equal(calls.length, 3, "all 3 resetters should be called");
  });

  it("resetAllDbModuleState does not throw when a resetter throws", () => {
    registerDbStateResetter(() => {
      throw new Error("boom");
    });
    let secondCalled = false;
    registerDbStateResetter(() => {
      secondCalled = true;
    });
    // Should not throw
    resetAllDbModuleState();
    assert.equal(secondCalled, true, "second resetter should still be called");
  });

  it("duplicate function references are deduplicated by Set", () => {
    let count = 0;
    const fn = () => {
      count++;
    };
    registerDbStateResetter(fn);
    registerDbStateResetter(fn); // same ref
    resetAllDbModuleState();
    assert.equal(count, 1, "duplicate ref should only be called once");
  });
});

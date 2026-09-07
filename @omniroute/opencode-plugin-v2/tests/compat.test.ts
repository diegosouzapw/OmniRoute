import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { assertContext } from "../src/compat.js";

function validContext() {
  return {
    options: { baseURL: "https://gw.example.com" },
    catalog: { transform: async () => {} },
    integration: { transform: async () => {} },
  };
}

describe("assertContext", () => {
  it("throws on non-object ctx", () => {
    assert.throws(() => assertContext(null), /\[omniroute-v2\] contract breach/);
  });
  it("throws when catalog.transform is missing", () => {
    const ctx = { ...validContext(), catalog: {} };
    assert.throws(() => assertContext(ctx), /\[omniroute-v2\] contract breach/);
  });
  it("serves a catalog on a host that has no integration domain", () => {
    // The integration domain carries the credential flow, not the catalog.
    // Refusing to load without it would deny the whole plugin to a host that
    // simply does not implement that surface yet.
    assert.doesNotThrow(() => assertContext({ catalog: { transform: () => {} }, options: {} }));
  });
  it("throws when options is not an object", () => {
    const ctx = { ...validContext(), options: undefined };
    assert.throws(() => assertContext(ctx), /\[omniroute-v2\] contract breach/);
  });
  it("passes for a valid context", () => {
    assert.doesNotThrow(() => assertContext(validContext()));
  });
});

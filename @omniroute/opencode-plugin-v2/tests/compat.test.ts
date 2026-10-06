import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { assertContext } from "../src/compat.js";

function validContext() {
  return {
    options: { baseURL: "https://gw.example.com" },
    provider: { transform: async () => {}, reload: async () => {} },
    model: { transform: async () => {}, reload: async () => {} },
    integration: { transform: async () => {} },
  };
}

describe("assertContext", () => {
  it("throws on non-object ctx", () => {
    assert.throws(() => assertContext(null), /\[omniroute-v2\] contract breach/);
  });
  it("throws when provider.transform is missing", () => {
    const ctx = { ...validContext(), provider: {} };
    assert.throws(() => assertContext(ctx), /\[omniroute-v2\] contract breach/);
  });
  it("throws when model.transform is missing", () => {
    const ctx = { ...validContext(), model: {} };
    assert.throws(() => assertContext(ctx), /\[omniroute-v2\] contract breach/);
  });
  it("serves a catalog on a host that has no integration domain", () => {
    // The integration domain carries the credential flow, not the catalog.
    // Refusing to load without it would deny the whole plugin to a host that
    // simply does not implement that surface yet.
    assert.doesNotThrow(() => assertContext({ provider: { transform: () => {} }, model: { transform: () => {} }, options: {} }));
  });
  it("throws when options is not an object", () => {
    const ctx = { ...validContext(), options: undefined };
    assert.throws(() => assertContext(ctx), /\[omniroute-v2\] contract breach/);
  });
  it("passes for a valid context", () => {
    assert.doesNotThrow(() => assertContext(validContext()));
  });
});

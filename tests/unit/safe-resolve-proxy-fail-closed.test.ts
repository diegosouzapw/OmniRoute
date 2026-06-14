import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { decideProxyResolutionFailure } from "../../src/sse/handlers/chatHelpers";

describe("decideProxyResolutionFailure", () => {
  it("rethrows (fail-closed) by default", () => {
    const err = new Error("boom");
    assert.throws(() => decideProxyResolutionFailure(err, { PROXY_FAIL_OPEN: undefined }), /boom/);
  });
  it("returns null (fail-open) only when PROXY_FAIL_OPEN=true", () => {
    const err = new Error("boom");
    assert.equal(decideProxyResolutionFailure(err, { PROXY_FAIL_OPEN: "true" }), null);
  });
});

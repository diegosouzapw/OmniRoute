import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { buildSocksFamilySocketOptions } from "../../open-sse/utils/socksConnectorWithFamily.ts";

describe("socksConnectorWithFamily", () => {
  it("returns family:6 + autoSelectFamily:false for ipv6", () => {
    assert.deepEqual(buildSocksFamilySocketOptions(6), { family: 6, autoSelectFamily: false });
  });
  it("returns family:4 + autoSelectFamily:false for ipv4", () => {
    assert.deepEqual(buildSocksFamilySocketOptions(4), { family: 4, autoSelectFamily: false });
  });
  it("returns an empty object for auto (no pin)", () => {
    assert.deepEqual(buildSocksFamilySocketOptions(null), {});
  });
});

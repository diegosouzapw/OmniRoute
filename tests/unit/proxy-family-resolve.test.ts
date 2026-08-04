import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { assertHostnameSupportsFamily } from "../../open-sse/utils/proxyFamilyResolve.ts";

const lookup = (recs: Array<{ address: string; family: number }>) => async () => recs;

describe("assertHostnameSupportsFamily", () => {
  it("passes when an AAAA record exists for ipv6", async () => {
    await assertHostnameSupportsFamily("proxy.example.com", 6, lookup([{ address: "2001:db8::1", family: 6 }]));
  });
  it("throws fail-closed when no AAAA exists for ipv6", async () => {
    await assert.rejects(
      assertHostnameSupportsFamily("proxy.example.com", 6, lookup([{ address: "203.0.113.7", family: 4 }])),
      /no IPv6/i
    );
  });
  it("throws fail-closed on DNS failure", async () => {
    await assert.rejects(
      assertHostnameSupportsFamily("proxy.example.com", 6, async () => { throw new Error("ENOTFOUND"); }),
      /resolution/i
    );
  });
  it("is a no-op for IP literals", async () => {
    await assertHostnameSupportsFamily("[2001:db8::1]", 6, async () => { throw new Error("should not be called"); });
  });
});

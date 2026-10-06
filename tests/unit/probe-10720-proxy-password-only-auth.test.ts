import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { proxyConfigToUrl } from "../../open-sse/utils/proxyDispatcher.ts";

describe("#10720 — proxyConfigToUrl drops password-only auth (no username)", () => {
  it("keeps a password-only credential in the built proxy URL", () => {
    const url = proxyConfigToUrl({
      type: "http",
      host: "127.0.0.1",
      port: 20130,
      username: "",
      password: "s3cret",
    });
    assert.ok(url.includes(":s3cret@"), `expected password in URL, got: ${url}`);
  });

  it("still builds a normal username:password URL", () => {
    const url = proxyConfigToUrl({
      type: "http",
      host: "127.0.0.1",
      port: 20130,
      username: "user",
      password: "s3cret",
    });
    assert.ok(url.includes("user:s3cret@"), `expected user:pass in URL, got: ${url}`);
  });

  it("builds no auth segment when neither username nor password is set", () => {
    const url = proxyConfigToUrl({
      type: "http",
      host: "127.0.0.1",
      port: 20130,
    });
    assert.ok(!url.includes("@"), `expected no auth segment, got: ${url}`);
  });
});

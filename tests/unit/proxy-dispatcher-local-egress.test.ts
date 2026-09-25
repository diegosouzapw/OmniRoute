/**
 * #14315 — stale keep-alive burst on local egress (host.docker.internal / *.internal / *.local).
 *
 * Docker Desktop's NAT silently drops idle keep-alive sockets to local-egress hostnames well
 * inside undici's default keepAliveMaxTimeout window, and the IPv6 route to
 * host.docker.internal is dead inside the container, so the default Happy-Eyeballs
 * autoSelectFamilyAttemptTimeout is pure latency on every healthy request. proxyDispatcher.ts
 * branches its dispatcher options by hostname (isLocalEgressHostname()) and routes local-egress
 * traffic through a parallel LOCAL_* dispatcher cache so it can't share stale/shortened sockets
 * with the cloud-upstream pool, and proxyFetch.ts clears that pool on PROXY_UNREACHABLE for a
 * local-egress hostname so the next request rebuilds with fresh sockets.
 *
 * None of this had test coverage before this file — see the #14315 review.
 */
import { describe, it, afterEach } from "node:test";
import assert from "node:assert/strict";

import {
  isLocalEgressHostname,
  getDefaultDispatcher,
  getRetryDispatcher,
  clearDispatcherCache,
  __getDispatcherOptionsForTest,
} from "../../open-sse/utils/proxyDispatcher.ts";
import {
  getLocalDefaultCachedDispatcher,
  getLocalRetryCachedDispatcher,
  getDefaultCachedDispatcher,
  getRetryCachedDispatcher,
} from "../../open-sse/utils/proxyDispatcherCache.ts";
import { proxyFetch } from "../../open-sse/utils/proxyFetch.ts";

afterEach(() => clearDispatcherCache());

describe("isLocalEgressHostname() boundary cases (#14315)", () => {
  it("matches host.docker.internal", () => {
    assert.equal(isLocalEgressHostname("host.docker.internal"), true);
  });
  it("matches a bare *.local mDNS hostname", () => {
    assert.equal(isLocalEgressHostname("mymachine.local"), true);
  });
  it("matches a *.internal suffix that is not host.docker.internal too", () => {
    assert.equal(isLocalEgressHostname("gateway.internal"), true);
  });
  it("matches the host:port form (port stripped before testing)", () => {
    assert.equal(isLocalEgressHostname("host.docker.internal:8080"), true);
  });
  it("strips IPv6 brackets before testing without throwing, and correctly stays false for a bare IPv6 literal (not a *.internal/*.local name)", () => {
    assert.equal(isLocalEgressHostname("[fe80::1]:8080"), false);
    assert.equal(isLocalEgressHostname("[::1]"), false);
  });
  it("still matches a *.internal name even when given alongside IPv6-bracket-shaped input elsewhere in the same URL.host string", () => {
    // The host.docker.internal form itself never carries brackets — this guards the
    // bracket-stripping regexes (^\[ / \]$) against corrupting an ordinary hostname
    // that happens to contain no brackets at all.
    assert.equal(isLocalEgressHostname("host.docker.internal"), true);
  });
  it("does NOT false-positive on a plain RFC1918 IP literal", () => {
    assert.equal(isLocalEgressHostname("192.168.65.254"), false);
  });
  it("does NOT false-positive on an arbitrary .internal.example.com subdomain", () => {
    // Only a hostname that literally ENDS in `.internal` or `.local` should match —
    // an "internal" label in the middle of a cloud domain must not.
    assert.equal(isLocalEgressHostname("foo.internal.example.com"), false);
  });
  it("does NOT match an ordinary cloud upstream hostname", () => {
    assert.equal(isLocalEgressHostname("api.openai.com"), false);
  });
  it("returns false for null/undefined/empty", () => {
    assert.equal(isLocalEgressHostname(undefined), false);
    assert.equal(isLocalEgressHostname(null), false);
    assert.equal(isLocalEgressHostname(""), false);
  });
});

describe("getDispatcherOptions() shortens timeouts on the local-egress path (#14315)", () => {
  it("caps keepAliveMaxTimeout at 1s for a local-egress hostname", () => {
    const localOptions = __getDispatcherOptionsForTest("host.docker.internal");
    assert.equal(localOptions.keepAliveMaxTimeout, 1000);
  });
  it("shortens autoSelectFamilyAttemptTimeout to 200ms for a local-egress hostname", () => {
    const localOptions = __getDispatcherOptionsForTest("host.docker.internal");
    assert.equal(localOptions.connect.autoSelectFamilyAttemptTimeout, 200);
  });
  it("leaves a cloud-upstream hostname on the default (longer) timeouts", () => {
    const cloudOptions = __getDispatcherOptionsForTest("api.openai.com");
    assert.notEqual(cloudOptions.keepAliveMaxTimeout, 1000);
    assert.equal(cloudOptions.connect.autoSelectFamilyAttemptTimeout, 1000);
  });
  it("also shortens options when no hostname is supplied to the local branch (regression guard: undefined must fall through to non-local)", () => {
    const noHostnameOptions = __getDispatcherOptionsForTest(undefined);
    assert.equal(noHostnameOptions.connect.autoSelectFamilyAttemptTimeout, 1000);
  });
});

describe("getDefaultDispatcher()/getRetryDispatcher() cache routing (#14315)", () => {
  it("routes a local-egress hostname to the LOCAL_DEFAULT cache slot, not the shared DEFAULT slot", () => {
    assert.equal(getLocalDefaultCachedDispatcher(), undefined);
    assert.equal(getDefaultCachedDispatcher(), undefined);

    const dispatcher = getDefaultDispatcher("host.docker.internal");

    assert.equal(getLocalDefaultCachedDispatcher(), dispatcher);
    assert.equal(getDefaultCachedDispatcher(), undefined, "cloud DEFAULT slot must stay empty");
  });
  it("routes a cloud hostname to the shared DEFAULT cache slot, not LOCAL_DEFAULT", () => {
    const dispatcher = getDefaultDispatcher("api.openai.com");

    assert.equal(getDefaultCachedDispatcher(), dispatcher);
    assert.equal(getLocalDefaultCachedDispatcher(), undefined, "local slot must stay empty");
  });
  it("reuses the SAME cached instance across repeated calls for the same local-egress hostname", () => {
    const first = getDefaultDispatcher("host.docker.internal");
    const second = getDefaultDispatcher("host.docker.internal");
    assert.equal(first, second);
  });
  it("routes the retry dispatcher for a local-egress hostname to LOCAL_RETRY, not the shared retry slot", () => {
    assert.equal(getLocalRetryCachedDispatcher(), undefined);
    assert.equal(getRetryCachedDispatcher(), undefined);

    const dispatcher = getRetryDispatcher("host.docker.internal");

    assert.equal(getLocalRetryCachedDispatcher(), dispatcher);
    assert.equal(getRetryCachedDispatcher(), undefined, "cloud retry slot must stay empty");
  });
  it("routes the retry dispatcher for a cloud hostname to the shared retry slot, not LOCAL_RETRY", () => {
    const dispatcher = getRetryDispatcher("api.openai.com");

    assert.equal(getRetryCachedDispatcher(), dispatcher);
    assert.equal(getLocalRetryCachedDispatcher(), undefined, "local retry slot must stay empty");
  });
  it("the local-egress default and retry dispatchers are DIFFERENT instances (no accidental sharing)", () => {
    const defaultDispatcher = getDefaultDispatcher("host.docker.internal");
    const retryDispatcher = getRetryDispatcher("host.docker.internal");
    assert.notEqual(defaultDispatcher, retryDispatcher);
  });
});

describe("clearDispatcherCache() empties both local slots (#14315)", () => {
  it("clears LOCAL_DEFAULT and LOCAL_RETRY alongside the existing cloud slots", () => {
    getDefaultDispatcher("host.docker.internal");
    getRetryDispatcher("host.docker.internal");
    getDefaultDispatcher("api.openai.com");
    getRetryDispatcher("api.openai.com");

    assert.notEqual(getLocalDefaultCachedDispatcher(), undefined);
    assert.notEqual(getLocalRetryCachedDispatcher(), undefined);
    assert.notEqual(getDefaultCachedDispatcher(), undefined);
    assert.notEqual(getRetryCachedDispatcher(), undefined);

    clearDispatcherCache();

    assert.equal(getLocalDefaultCachedDispatcher(), undefined, "LOCAL_DEFAULT must be cleared");
    assert.equal(getLocalRetryCachedDispatcher(), undefined, "LOCAL_RETRY must be cleared");
    assert.equal(getDefaultCachedDispatcher(), undefined, "DEFAULT must still be cleared");
    assert.equal(getRetryCachedDispatcher(), undefined, "RETRY must still be cleared");
  });
});

describe("proxyFetch PROXY_UNREACHABLE on local-egress hostname clears the dispatcher pool (#14315)", () => {
  // Shaped exactly like a real undici connect failure: a `TypeError: fetch failed`
  // wrapping the underlying socket error in `.cause` (undici does NOT put the raw
  // code directly on the top-level error). `tagProxyUnreachable()` overwrites the
  // top-level `.code` to "PROXY_UNREACHABLE" the FIRST time it sees this error, so
  // proxyFetch's later local-egress `isProxyUnreachableError()` re-check can only
  // still recognize it via `.cause.code` — a bare top-level `.code` (like the
  // #4252 retry test uses) would silently defeat that later check.
  function connectionRefused(): Error {
    const cause = new Error("connect ECONNREFUSED") as Error & { code?: string };
    cause.code = "ECONNREFUSED";
    const err = new Error("fetch failed") as Error & { cause?: Error };
    err.cause = cause;
    return err;
  }

  it("clears the dispatcher cache when a local-egress hostname hits PROXY_UNREACHABLE", async () => {
    // Pre-populate the pool so we can observe it being torn down.
    getDefaultDispatcher("host.docker.internal");
    assert.notEqual(getLocalDefaultCachedDispatcher(), undefined, "precondition: pool populated");

    let undiciCalls = 0;
    let nativeCalls = 0;
    const mockUndici = async (): Promise<Response> => {
      undiciCalls++;
      // Both attempts fail — the connection to host.docker.internal is refused
      // (Docker Desktop dropped the stale socket and the fresh retry can't connect either).
      throw connectionRefused();
    };
    const mockNative = async (): Promise<Response> => {
      nativeCalls++;
      return new Response("native-ok", { status: 200 });
    };

    const res = await proxyFetch(
      "http://host.docker.internal:2375/v1/models",
      { method: "POST" },
      { undiciFetch: mockUndici, nativeFetch: mockNative }
    );

    assert.equal(undiciCalls, 2, "both the initial attempt and the fresh-socket retry must fire");
    assert.equal(nativeCalls, 1, "native fallback must fire after undici is exhausted");
    assert.equal(await res.text(), "native-ok");
    assert.equal(
      getLocalDefaultCachedDispatcher(),
      undefined,
      "the local-egress dispatcher pool must be torn down on PROXY_UNREACHABLE"
    );
  });

  it("does NOT clear the dispatcher cache when a cloud-upstream hostname hits PROXY_UNREACHABLE", async () => {
    // Pre-populate the LOCAL pool too, to prove the cloud-path failure never touches it.
    getDefaultDispatcher("host.docker.internal");
    const cloudDispatcherBefore = getDefaultDispatcher("api.example.com");
    assert.notEqual(getDefaultCachedDispatcher(), undefined, "precondition: cloud pool populated");
    assert.notEqual(
      getLocalDefaultCachedDispatcher(),
      undefined,
      "precondition: local pool populated"
    );

    let undiciCalls = 0;
    let nativeCalls = 0;
    const mockUndici = async (): Promise<Response> => {
      undiciCalls++;
      throw connectionRefused();
    };
    const mockNative = async (): Promise<Response> => {
      nativeCalls++;
      return new Response("native-ok", { status: 200 });
    };

    const res = await proxyFetch(
      "https://api.example.com/v1/models",
      { method: "POST" },
      { undiciFetch: mockUndici, nativeFetch: mockNative }
    );

    assert.equal(undiciCalls, 2);
    assert.equal(nativeCalls, 1);
    assert.equal(await res.text(), "native-ok");
    assert.equal(
      getDefaultCachedDispatcher(),
      cloudDispatcherBefore,
      "the cloud-upstream dispatcher pool must survive its own PROXY_UNREACHABLE"
    );
    assert.notEqual(
      getLocalDefaultCachedDispatcher(),
      undefined,
      "a cloud-hostname failure must NOT tear down the unrelated local-egress pool"
    );
  });
});

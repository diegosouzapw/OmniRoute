import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { describe, it, beforeEach, after } from "node:test";

import { PEER_IP_HEADER } from "@/server/authz/headers";
import {
  getPublicOriginCandidates,
  resolvePublicOrigin,
  trustsForwardedHeaders,
  validateBrowserMutationOrigin,
} from "@/server/origin/publicOrigin";

const ORIGINAL_ENV = {
  OMNIROUTE_PUBLIC_BASE_URL: process.env.OMNIROUTE_PUBLIC_BASE_URL,
  NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  OMNIROUTE_TRUST_PROXY: process.env.OMNIROUTE_TRUST_PROXY,
  OMNIROUTE_PEER_STAMP_TOKEN: process.env.OMNIROUTE_PEER_STAMP_TOKEN,
};

function restoreEnv() {
  for (const [key, value] of Object.entries(ORIGINAL_ENV)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
}

function clearPublicOriginEnv() {
  delete process.env.OMNIROUTE_PUBLIC_BASE_URL;
  delete process.env.NEXT_PUBLIC_BASE_URL;
  delete process.env.NEXT_PUBLIC_APP_URL;
  delete process.env.OMNIROUTE_TRUST_PROXY;
  delete process.env.OMNIROUTE_PEER_STAMP_TOKEN;
}

function stampedPeer(ip: string): Record<string, string> {
  const token = randomUUID();
  process.env.OMNIROUTE_PEER_STAMP_TOKEN = token;
  return { [PEER_IP_HEADER]: `${token}|${ip}` };
}

beforeEach(() => {
  clearPublicOriginEnv();
});

after(() => {
  restoreEnv();
});

describe("public origin resolution", () => {
  it("uses configured public base URLs before the internal request URL", () => {
    process.env.NEXT_PUBLIC_BASE_URL = "https://gateway.example.test/app/";
    const request = new Request("http://omniroute:20128/api/providers/health-autopilot/actions");

    assert.deepEqual(resolvePublicOrigin(request), {
      origin: "https://gateway.example.test",
      source: "configured",
    });
    assert.equal(
      validateBrowserMutationOrigin(
        new Request(request.url, {
          method: "POST",
          headers: { origin: "https://gateway.example.test" },
        })
      ).ok,
      true
    );
  });

  it("preserves configured source priority when it equals the request URL", () => {
    process.env.NEXT_PUBLIC_BASE_URL = "http://omniroute:20128/app";
    const request = new Request("http://omniroute:20128/api/providers/health-autopilot/actions");

    assert.deepEqual(resolvePublicOrigin(request), {
      origin: "http://omniroute:20128",
      source: "configured",
    });
  });

  it("accepts all configured public origins while resolving the highest-priority one", () => {
    process.env.OMNIROUTE_PUBLIC_BASE_URL = "https://assets.example.test/images";
    process.env.NEXT_PUBLIC_BASE_URL = "https://gateway.example.test/app";
    const request = new Request("http://omniroute:20128/api/providers/health-autopilot/actions", {
      headers: { origin: "https://gateway.example.test" },
    });

    assert.deepEqual(resolvePublicOrigin(request), {
      origin: "https://assets.example.test",
      source: "configured",
    });
    assert.deepEqual(
      getPublicOriginCandidates(request).filter((candidate) => candidate.source === "configured"),
      [
        { origin: "https://assets.example.test", source: "configured" },
        { origin: "https://gateway.example.test", source: "configured" },
      ]
    );
    assert.equal(validateBrowserMutationOrigin(request).ok, true);
  });

  it("keeps the internal request URL as an accepted candidate", () => {
    const request = new Request("http://omniroute:20128/api/providers/health-autopilot/actions");

    assert.deepEqual(getPublicOriginCandidates(request), [
      { origin: "http://omniroute:20128", source: "request-url" },
    ]);
  });

  it("does not trust spoofed forwarded headers by default", () => {
    const request = new Request("http://omniroute:20128/api/providers/health-autopilot/actions", {
      headers: {
        origin: "https://attacker.example",
        "x-forwarded-host": "attacker.example",
        "x-forwarded-proto": "https",
      },
    });

    assert.equal(trustsForwardedHeaders(request), false);
    assert.equal(validateBrowserMutationOrigin(request).ok, false);
  });

  it("fails closed for unknown proxy trust mode values", () => {
    process.env.OMNIROUTE_TRUST_PROXY = "flase";
    const request = new Request("http://omniroute:20128/api/providers/health-autopilot/actions", {
      headers: {
        ...stampedPeer("127.0.0.1"),
        origin: "https://gateway.example.test",
        "x-forwarded-host": "gateway.example.test",
        "x-forwarded-proto": "https",
      },
    });

    assert.equal(trustsForwardedHeaders(request), false);
    assert.equal(validateBrowserMutationOrigin(request).ok, false);
  });

  it("can trust forwarded headers from a token-stamped loopback proxy when explicitly enabled", () => {
    process.env.OMNIROUTE_TRUST_PROXY = "true";
    const request = new Request("http://omniroute:20128/api/providers/health-autopilot/actions", {
      headers: {
        ...stampedPeer("127.0.0.1"),
        origin: "https://gateway.example.test",
        "x-forwarded-host": "gateway.example.test",
        "x-forwarded-proto": "https",
      },
    });

    assert.equal(trustsForwardedHeaders(request), true);
    assert.equal(validateBrowserMutationOrigin(request).ok, true);
  });

  it("does not allow trusted forwarded headers to widen a configured public origin", () => {
    process.env.NEXT_PUBLIC_BASE_URL = "https://gateway.example.test";
    process.env.OMNIROUTE_TRUST_PROXY = "true";
    const request = new Request("http://omniroute:20128/api/providers/health-autopilot/actions", {
      headers: {
        ...stampedPeer("127.0.0.1"),
        origin: "https://evil.example.test",
        "x-forwarded-host": "evil.example.test",
        "x-forwarded-proto": "https",
      },
    });

    assert.equal(
      getPublicOriginCandidates(request).some(
        (candidate) => candidate.origin === "https://evil.example.test"
      ),
      false
    );
    assert.equal(validateBrowserMutationOrigin(request).ok, false);
  });

  it("does not derive trusted forwarded origin from the raw host header", () => {
    process.env.OMNIROUTE_TRUST_PROXY = "true";
    const request = new Request("http://omniroute:20128/api/providers/health-autopilot/actions", {
      headers: {
        ...stampedPeer("127.0.0.1"),
        host: "gateway.example.test",
        origin: "https://gateway.example.test",
        "x-forwarded-proto": "https",
      },
    });

    assert.equal(
      getPublicOriginCandidates(request).some(
        (candidate) => candidate.source === "trusted-forwarded"
      ),
      false
    );
    assert.equal(validateBrowserMutationOrigin(request).ok, false);
  });

  it("rejects malformed forwarded origins even when proxy trust is enabled", () => {
    process.env.OMNIROUTE_TRUST_PROXY = "true";
    const request = new Request("http://omniroute:20128/api/providers/health-autopilot/actions", {
      headers: {
        ...stampedPeer("127.0.0.1"),
        origin: "https://gateway.example.test",
        "x-forwarded-host": "gateway.example.test/evil",
        "x-forwarded-proto": "https",
      },
    });

    assert.equal(validateBrowserMutationOrigin(request).ok, false);
  });

  it("rejects cross-site fetch metadata before origin candidate matching", () => {
    process.env.NEXT_PUBLIC_BASE_URL = "https://gateway.example.test";
    const request = new Request("http://omniroute:20128/api/providers/health-autopilot/actions", {
      headers: {
        origin: "https://gateway.example.test",
        "sec-fetch-site": "cross-site",
      },
    });

    assert.deepEqual(validateBrowserMutationOrigin(request), {
      ok: false,
      reason: "cross-site-fetch-metadata",
    });
  });
});

describe("direct LAN/loopback host origin (#5340)", () => {
  it("accepts a direct LAN-IP host even when a localhost public base URL is configured", () => {
    process.env.NEXT_PUBLIC_BASE_URL = "http://localhost:20128";
    const request = new Request("http://omniroute:20128/api/keys", {
      method: "POST",
      headers: {
        ...stampedPeer("192.168.0.50"),
        host: "192.168.0.15:20128",
        origin: "http://192.168.0.15:20128",
        "sec-fetch-site": "same-origin",
      },
    });

    assert.equal(
      getPublicOriginCandidates(request).some(
        (candidate) => candidate.origin === "http://192.168.0.15:20128"
      ),
      true
    );
    assert.equal(validateBrowserMutationOrigin(request).ok, true);
  });

  it("accepts a direct loopback-IP host with no configured public origin", () => {
    const request = new Request("http://omniroute:20128/api/keys", {
      method: "POST",
      headers: {
        ...stampedPeer("127.0.0.1"),
        host: "127.0.0.1:20128",
        origin: "http://127.0.0.1:20128",
      },
    });

    assert.equal(validateBrowserMutationOrigin(request).ok, true);
  });

  it("rejects a DNS-rebinding domain host even when the peer is loopback", () => {
    // evil.example rebinds to a loopback socket; the Host header carries the
    // attacker domain, which classifies as remote → no trusted candidate.
    const request = new Request("http://omniroute:20128/api/keys", {
      method: "POST",
      headers: {
        ...stampedPeer("127.0.0.1"),
        host: "evil.example:20128",
        origin: "http://evil.example:20128",
        "sec-fetch-site": "same-origin",
      },
    });

    assert.equal(
      getPublicOriginCandidates(request).some(
        (candidate) => candidate.origin === "http://evil.example:20128"
      ),
      false
    );
    assert.equal(validateBrowserMutationOrigin(request).ok, false);
  });

  it("does not widen the origin for a remote peer even when the Host is a LAN IP", () => {
    const request = new Request("http://omniroute:20128/api/keys", {
      method: "POST",
      headers: {
        ...stampedPeer("203.0.113.7"),
        host: "192.168.0.15:20128",
        origin: "http://192.168.0.15:20128",
        "sec-fetch-site": "same-origin",
      },
    });

    assert.equal(validateBrowserMutationOrigin(request).ok, false);
  });

  it("does not trust the Host header when the peer stamp is absent", () => {
    const request = new Request("http://omniroute:20128/api/keys", {
      method: "POST",
      headers: {
        host: "192.168.0.15:20128",
        origin: "http://192.168.0.15:20128",
        "sec-fetch-site": "same-origin",
      },
    });

    assert.equal(validateBrowserMutationOrigin(request).ok, false);
  });

  it("pins the protocol to the connection — a mismatched https origin is rejected", () => {
    const request = new Request("http://omniroute:20128/api/keys", {
      method: "POST",
      headers: {
        ...stampedPeer("192.168.0.50"),
        host: "192.168.0.15:20128",
        origin: "https://192.168.0.15:20128",
        "sec-fetch-site": "same-origin",
      },
    });

    assert.equal(validateBrowserMutationOrigin(request).ok, false);
  });
});

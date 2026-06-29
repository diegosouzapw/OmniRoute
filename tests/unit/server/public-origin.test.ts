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

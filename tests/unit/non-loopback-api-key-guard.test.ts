import test from "node:test";
import assert from "node:assert/strict";

import { warnIfNonLoopbackWithoutApiKey } from "@/lib/startup/nonLoopbackApiKeyGuard";

// #12568: docker-compose can bind the app's ports to a non-loopback interface
// while REQUIRE_API_KEY still defaults to false, exposing the anonymous /v1
// proxy to the LAN/WAN. This guard warns (never blocks) when that combination
// is detected at server startup.

function withEnv<T>(vars: Record<string, string | undefined>, fn: () => T): T {
  const prev: Record<string, string | undefined> = {};
  for (const key of Object.keys(vars)) {
    prev[key] = process.env[key];
    const value = vars[key];
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
  try {
    return fn();
  } finally {
    for (const key of Object.keys(prev)) {
      const value = prev[key];
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
}

function captureWarn(fn: () => void): string[] {
  const messages: string[] = [];
  const original = console.warn;
  console.warn = (...args: unknown[]) => {
    messages.push(args.map(String).join(" "));
  };
  try {
    fn();
  } finally {
    console.warn = original;
  }
  return messages;
}

test("warns when bound to 0.0.0.0 with REQUIRE_API_KEY unset (default false)", () => {
  withEnv({ REQUIRE_API_KEY: undefined }, () => {
    const messages = captureWarn(() => warnIfNonLoopbackWithoutApiKey("Test server", "0.0.0.0"));
    assert.equal(messages.length, 1);
    assert.match(messages[0], /non-loopback host "0\.0\.0\.0"/);
    assert.match(messages[0], /REQUIRE_API_KEY/);
  });
});

test("warns when bound to a LAN IP with REQUIRE_API_KEY=false", () => {
  withEnv({ REQUIRE_API_KEY: "false" }, () => {
    const messages = captureWarn(() => warnIfNonLoopbackWithoutApiKey("Test server", "192.168.1.5"));
    assert.equal(messages.length, 1);
  });
});

test("stays silent when bound to loopback regardless of REQUIRE_API_KEY", () => {
  withEnv({ REQUIRE_API_KEY: "false" }, () => {
    const messages = captureWarn(() => warnIfNonLoopbackWithoutApiKey("Test server", "127.0.0.1"));
    assert.equal(messages.length, 0);
  });
  withEnv({ REQUIRE_API_KEY: "false" }, () => {
    const messages = captureWarn(() => warnIfNonLoopbackWithoutApiKey("Test server", "::1"));
    assert.equal(messages.length, 0);
  });
});

test("stays silent when bound to 0.0.0.0 with REQUIRE_API_KEY=true", () => {
  withEnv({ REQUIRE_API_KEY: "true" }, () => {
    const messages = captureWarn(() => warnIfNonLoopbackWithoutApiKey("Test server", "0.0.0.0"));
    assert.equal(messages.length, 0);
  });
});

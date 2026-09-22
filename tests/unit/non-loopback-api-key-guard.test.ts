import test from "node:test";
import assert from "node:assert/strict";

import { warnIfNonLoopbackWithoutApiKey } from "@/lib/startup/nonLoopbackApiKeyGuard";

// #12568: docker-compose can bind the app's ports to a non-loopback interface
// while the effective REQUIRE_API_KEY flag is false, exposing the anonymous
// /v1 proxy to the LAN/WAN. The effective value is supplied after DB init so
// persisted overrides take precedence over process.env.

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

test("blank env with effective REQUIRE_API_KEY=true stays silent", () => {
  withEnv({ REQUIRE_API_KEY: undefined }, () => {
    const messages = captureWarn(() =>
      warnIfNonLoopbackWithoutApiKey("Test server", "0.0.0.0", true)
    );
    assert.deepEqual(messages, []);
  });
});

test("env true with effective REQUIRE_API_KEY=false warns once", () => {
  withEnv({ REQUIRE_API_KEY: "true" }, () => {
    const messages = captureWarn(() =>
      warnIfNonLoopbackWithoutApiKey("Test server", "192.168.1.5", false)
    );
    assert.equal(messages.length, 1);
    assert.match(messages[0], /non-loopback host "192\.168\.1\.5"/);
    assert.match(messages[0], /REQUIRE_API_KEY/);
  });
});

test("loopback stays silent when effective REQUIRE_API_KEY=false", () => {
  assert.deepEqual(
    captureWarn(() => warnIfNonLoopbackWithoutApiKey("Test server", "127.0.0.1", false)),
    []
  );
  assert.deepEqual(
    captureWarn(() => warnIfNonLoopbackWithoutApiKey("Test server", "::1", false)),
    []
  );
});

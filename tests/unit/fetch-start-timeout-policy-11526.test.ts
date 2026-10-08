import { test } from "node:test";
import assert from "node:assert/strict";
import {
  DEFAULT_FETCH_START_TIMEOUT_CAP_MS,
  resolveFetchStartTimeout,
} from "../../open-sse/utils/fetchStartTimeoutPolicy.ts";

test("#15504 the streaming fetch-start cap is configurable without changing its default", () => {
  assert.deepEqual(resolveFetchStartTimeout({ baseTimeoutMs: 12_000_000, stream: true, env: {} }), {
    timeoutMs: DEFAULT_FETCH_START_TIMEOUT_CAP_MS,
    baseTimeoutMs: 12_000_000,
    capped: true,
  });
  assert.deepEqual(
    resolveFetchStartTimeout({
      baseTimeoutMs: 12_000_000,
      stream: true,
      env: { OMNIROUTE_FETCH_START_TIMEOUT_CAP_MS: "12000000" },
    }),
    { timeoutMs: 12_000_000, baseTimeoutMs: 12_000_000, capped: false }
  );
  assert.deepEqual(
    resolveFetchStartTimeout({
      baseTimeoutMs: 12_000_000,
      stream: true,
      env: { OMNIROUTE_FETCH_START_TIMEOUT_CAP_MS: "600000" },
    }),
    { timeoutMs: 600_000, baseTimeoutMs: 12_000_000, capped: true }
  );
  assert.deepEqual(
    resolveFetchStartTimeout({
      baseTimeoutMs: 12_000_000,
      stream: true,
      env: { OMNIROUTE_FETCH_START_TIMEOUT_CAP_MS: "45000" },
    }),
    { timeoutMs: 45_000, baseTimeoutMs: 12_000_000, capped: true }
  );
  assert.deepEqual(
    resolveFetchStartTimeout({
      baseTimeoutMs: 12_000_000,
      stream: true,
      env: { OMNIROUTE_FETCH_START_TIMEOUT_CAP_MS: "0" },
    }),
    { timeoutMs: 12_000_000, baseTimeoutMs: 12_000_000, capped: false }
  );
  assert.deepEqual(
    resolveFetchStartTimeout({
      baseTimeoutMs: 12_000_000,
      stream: false,
      env: { OMNIROUTE_FETCH_START_TIMEOUT_CAP_MS: "45000" },
    }),
    { timeoutMs: 12_000_000, baseTimeoutMs: 12_000_000, capped: false }
  );
  assert.deepEqual(
    resolveFetchStartTimeout({
      baseTimeoutMs: 40_000,
      stream: true,
      env: { OMNIROUTE_FETCH_START_TIMEOUT_CAP_MS: "45000" },
    }),
    { timeoutMs: 40_000, baseTimeoutMs: 40_000, capped: false }
  );
});

test("#15504 the production path reads the operator cap from process.env", () => {
  const key = "OMNIROUTE_FETCH_START_TIMEOUT_CAP_MS";
  const previous = process.env[key];
  try {
    process.env[key] = "12000000";
    assert.deepEqual(resolveFetchStartTimeout({ baseTimeoutMs: 12_000_000, stream: true }), {
      timeoutMs: 12_000_000,
      baseTimeoutMs: 12_000_000,
      capped: false,
    });
  } finally {
    if (previous === undefined) delete process.env[key];
    else process.env[key] = previous;
  }
});

test("#15504 an explicit provider cap keeps precedence over the environment default", () => {
  assert.deepEqual(
    resolveFetchStartTimeout({
      baseTimeoutMs: 12_000_000,
      stream: true,
      capMs: 180_000,
      env: { OMNIROUTE_FETCH_START_TIMEOUT_CAP_MS: "600000" },
    }),
    { timeoutMs: 180_000, baseTimeoutMs: 12_000_000, capped: true }
  );
  assert.deepEqual(
    resolveFetchStartTimeout({
      baseTimeoutMs: 12_000_000,
      stream: true,
      capMs: 0,
      env: { OMNIROUTE_FETCH_START_TIMEOUT_CAP_MS: "600000" },
    }),
    { timeoutMs: 12_000_000, baseTimeoutMs: 12_000_000, capped: false }
  );
});

test("#15504 an invalid environment cap warns and keeps the safe default", () => {
  const previousWarn = console.warn;
  const warnings: string[] = [];
  console.warn = (message?: unknown) => warnings.push(String(message));
  try {
    assert.deepEqual(
      resolveFetchStartTimeout({
        baseTimeoutMs: 12_000_000,
        stream: true,
        env: { OMNIROUTE_FETCH_START_TIMEOUT_CAP_MS: "-1" },
      }),
      {
        timeoutMs: DEFAULT_FETCH_START_TIMEOUT_CAP_MS,
        baseTimeoutMs: 12_000_000,
        capped: true,
      }
    );
    assert.match(warnings[0] ?? "", /OMNIROUTE_FETCH_START_TIMEOUT_CAP_MS/);
  } finally {
    console.warn = previousWarn;
  }
});

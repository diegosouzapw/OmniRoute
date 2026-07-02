import test from "node:test";
import assert from "node:assert/strict";
import { augmentDockerLocalhostHint } from "../../src/app/api/provider-nodes/validate/route.ts";
import { SafeOutboundFetchError } from "../../src/shared/network/safeOutboundFetch.ts";
import { resetDbInstance } from "../../src/lib/db/core.ts";

test.after(() => {
  resetDbInstance();
});

function networkError(causeCode: string): SafeOutboundFetchError {
  const err = new SafeOutboundFetchError("fetch failed", {
    code: "NETWORK_ERROR",
    url: "http://localhost:11434/models",
    method: "GET",
    attempts: 1,
    isRetryable: true,
    cause: { code: causeCode },
  });
  return err;
}

function timeoutError(): SafeOutboundFetchError {
  return new SafeOutboundFetchError("The operation timed out", {
    code: "TIMEOUT",
    url: "http://localhost:11434/models",
    method: "GET",
    attempts: 1,
    isRetryable: true,
    timeoutMs: 10000,
  });
}

const FALLBACK = "Validation failed";

test("ECONNREFUSED against localhost surfaces a Docker host-IP hint", () => {
  const message = augmentDockerLocalhostHint(
    networkError("ECONNREFUSED"),
    "http://localhost:11434",
    FALLBACK
  );
  assert.match(message, /Connection refused/);
  assert.match(message, /Docker/);
  assert.match(message, /host\.docker\.internal/);
  assert.notEqual(message, FALLBACK);
});

test("ECONNREFUSED against 127.0.0.1 surfaces the Docker hint", () => {
  const message = augmentDockerLocalhostHint(
    networkError("ECONNREFUSED"),
    "http://127.0.0.1:11434/v1",
    FALLBACK
  );
  assert.match(message, /Connection refused/);
  assert.match(message, /Docker/);
});

test("TIMEOUT against localhost surfaces a Docker timeout hint", () => {
  const message = augmentDockerLocalhostHint(timeoutError(), "https://localhost:8080", FALLBACK);
  assert.match(message, /Connection timeout/);
  assert.match(message, /Docker/);
  assert.match(message, /host\.docker\.internal/);
});

test("connection error against a NON-localhost host keeps the original message", () => {
  const message = augmentDockerLocalhostHint(
    networkError("ECONNREFUSED"),
    "http://192.168.1.50:11434",
    FALLBACK
  );
  assert.equal(message, FALLBACK);
});

test("a localhost-substring host that is not actually localhost is not hinted", () => {
  const message = augmentDockerLocalhostHint(
    networkError("ECONNREFUSED"),
    "http://localhost.evil.example.com:11434",
    FALLBACK
  );
  assert.equal(message, FALLBACK);
});

test("a non-connection error against localhost keeps the original message", () => {
  const message = augmentDockerLocalhostHint(
    networkError("CERT_HAS_EXPIRED"),
    "http://localhost:11434",
    FALLBACK
  );
  assert.equal(message, FALLBACK);
});

test("a missing base URL keeps the original message", () => {
  const message = augmentDockerLocalhostHint(networkError("ECONNREFUSED"), undefined, FALLBACK);
  assert.equal(message, FALLBACK);
});

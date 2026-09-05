import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import {
  getInternalServiceAuthHeaders,
  INTERNAL_SERVICE_AUTH_HEADER,
  isInternalServiceRequest,
  isTrustedLoopbackInternalServiceRequest,
} from "../../../src/lib/api/internalServiceAuth.ts";
import { AUTHZ_HEADER_PEER_LOCALITY } from "../../../src/server/authz/headers.ts";

const originalInline = process.env.OMNIROUTE_INTERNAL_SERVICE_TOKEN;
const originalFile = process.env.OMNIROUTE_INTERNAL_SERVICE_TOKEN_FILE;

test.afterEach(() => {
  if (originalInline === undefined) delete process.env.OMNIROUTE_INTERNAL_SERVICE_TOKEN;
  else process.env.OMNIROUTE_INTERNAL_SERVICE_TOKEN = originalInline;
  if (originalFile === undefined) delete process.env.OMNIROUTE_INTERNAL_SERVICE_TOKEN_FILE;
  else process.env.OMNIROUTE_INTERNAL_SERVICE_TOKEN_FILE = originalFile;
});

test("internal service auth is disabled when no token is configured", () => {
  delete process.env.OMNIROUTE_INTERNAL_SERVICE_TOKEN;
  delete process.env.OMNIROUTE_INTERNAL_SERVICE_TOKEN_FILE;
  assert.deepEqual(getInternalServiceAuthHeaders(), {});
  assert.equal(isInternalServiceRequest(new Request("http://localhost")), false);
});

test("internal service auth preserves a separate constant-time token channel", () => {
  process.env.OMNIROUTE_INTERNAL_SERVICE_TOKEN = "test-internal-token-0123456789";
  delete process.env.OMNIROUTE_INTERNAL_SERVICE_TOKEN_FILE;
  const headers = new Headers({
    ...getInternalServiceAuthHeaders(),
    [AUTHZ_HEADER_PEER_LOCALITY]: "loopback",
  });
  const request = new Request("http://localhost", { headers });
  assert.equal(headers.get(INTERNAL_SERVICE_AUTH_HEADER), "test-internal-token-0123456789");
  assert.equal(isInternalServiceRequest(request), true);
  assert.equal(isTrustedLoopbackInternalServiceRequest(request), true);

  const remote = new Request("https://example.test", {
    headers: {
      [INTERNAL_SERVICE_AUTH_HEADER]: "test-internal-token-0123456789",
      [AUTHZ_HEADER_PEER_LOCALITY]: "remote",
    },
  });
  assert.equal(isTrustedLoopbackInternalServiceRequest(remote), false);
});

test("internal service token file is read without exposing it to process env", () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "omr-internal-auth-"));
  const tokenFile = path.join(directory, "token");
  try {
    fs.writeFileSync(tokenFile, "file-backed-token-0123456789\n", { mode: 0o600 });
    delete process.env.OMNIROUTE_INTERNAL_SERVICE_TOKEN;
    process.env.OMNIROUTE_INTERNAL_SERVICE_TOKEN_FILE = tokenFile;
    assert.deepEqual(getInternalServiceAuthHeaders(), {
      [INTERNAL_SERVICE_AUTH_HEADER]: "file-backed-token-0123456789",
    });
  } finally {
    fs.rmSync(directory, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

/**
 * Integration tests: Traffic Inspector error sanitization
 *
 * Verifies that all error responses do NOT include stack traces or raw
 * file paths (Hard Rule #12).
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { randomUUID } from "node:crypto";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-ti-errsanitize-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { globalTrafficBuffer } = await import("../../src/mitm/inspector/buffer.ts");

const requestsRoute = await import(
  "../../src/app/api/tools/traffic-inspector/requests/route.ts"
);
const requestDetailRoute = await import(
  "../../src/app/api/tools/traffic-inspector/requests/[id]/route.ts"
);
const annotationRoute = await import(
  "../../src/app/api/tools/traffic-inspector/requests/[id]/annotation/route.ts"
);
const hostsRoute = await import(
  "../../src/app/api/tools/traffic-inspector/hosts/route.ts"
);
const hostDetailRoute = await import(
  "../../src/app/api/tools/traffic-inspector/hosts/[host]/route.ts"
);
const sessionsRoute = await import(
  "../../src/app/api/tools/traffic-inspector/sessions/route.ts"
);
const sessionDetailRoute = await import(
  "../../src/app/api/tools/traffic-inspector/sessions/[id]/route.ts"
);
const ingestRoute = await import(
  "../../src/app/api/tools/traffic-inspector/internal/ingest/route.ts"
);
const httpProxyRoute = await import(
  "../../src/app/api/tools/traffic-inspector/capture-modes/http-proxy/route.ts"
);
const systemProxyRoute = await import(
  "../../src/app/api/tools/traffic-inspector/capture-modes/system-proxy/route.ts"
);
const tlsInterceptRoute = await import(
  "../../src/app/api/tools/traffic-inspector/capture-modes/tls-intercept/route.ts"
);

function noStackTrace(msg: string, label: string): void {
  assert.ok(
    !msg.includes("at /"),
    `${label}: error message must not contain stack trace (found "at /")`
  );
  assert.ok(
    !msg.includes(".ts:"),
    `${label}: error message must not include TS file paths`
  );
}

async function getErrorMessage(res: Response): Promise<string> {
  const body = await res.json() as { error: { message: string } };
  return body.error?.message ?? "";
}

test.beforeEach(() => {
  globalTrafficBuffer.clear();
});

test.after(() => {
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("requests: invalid profile param does not leak stack", async () => {
  const req = new Request(
    "http://localhost/api/tools/traffic-inspector/requests?profile=BAD"
  );
  const res = await requestsRoute.GET(req);
  assert.equal(res.status, 400);
  noStackTrace(await getErrorMessage(res), "GET /requests");
});

test("requests/[id]: unknown id does not leak stack", async () => {
  const res = await requestDetailRoute.GET(
    new Request("http://localhost/"),
    { params: Promise.resolve({ id: randomUUID() }) }
  );
  assert.equal(res.status, 404);
  noStackTrace(await getErrorMessage(res), "GET /requests/[id]");
});

test("annotation: invalid body does not leak stack", async () => {
  const entry = {
    id: randomUUID(),
    source: "agent-bridge" as const,
    timestamp: new Date().toISOString(),
    method: "POST",
    host: "api.openai.com",
    path: "/v1/chat/completions",
    requestHeaders: {},
    requestBody: null,
    requestSize: 0,
    responseHeaders: {},
    responseBody: null,
    responseSize: 0,
    status: 200 as const,
  };
  globalTrafficBuffer.push(entry);

  const req = new Request("http://localhost/", {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ annotation: 12345 }), // wrong type
  });
  const res = await annotationRoute.PUT(req, {
    params: Promise.resolve({ id: entry.id }),
  });
  assert.equal(res.status, 400);
  noStackTrace(await getErrorMessage(res), "PUT annotation");
});

test("hosts: invalid body does not leak stack", async () => {
  const req = new Request("http://localhost/api/tools/traffic-inspector/hosts", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: "bad json!}",
  });
  const res = await hostsRoute.POST(req);
  assert.equal(res.status, 400);
  noStackTrace(await getErrorMessage(res), "POST /hosts");
});

test("hosts/[host] PATCH: invalid body does not leak stack", async () => {
  const res = await hostDetailRoute.PATCH(
    new Request("http://localhost/", {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: "bad json!",
    }),
    { params: Promise.resolve({ host: "foo.com" }) }
  );
  assert.equal(res.status, 400);
  noStackTrace(await getErrorMessage(res), "PATCH /hosts/[host]");
});

test("sessions: 404 does not leak stack", async () => {
  const res = await sessionDetailRoute.GET(
    new Request("http://localhost/"),
    { params: Promise.resolve({ id: randomUUID() }) }
  );
  assert.equal(res.status, 404);
  noStackTrace(await getErrorMessage(res), "GET /sessions/[id]");
});

test("ingest: 403 does not leak stack", async () => {
  const req = new Request(
    "http://localhost/api/tools/traffic-inspector/internal/ingest",
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: "Bearer wrong-token",
      },
      body: JSON.stringify({}),
    }
  );
  const res = await ingestRoute.POST(req);
  assert.equal(res.status, 403);
  noStackTrace(await getErrorMessage(res), "POST /internal/ingest (403)");
});

test("http-proxy: invalid action does not leak stack", async () => {
  const req = new Request(
    "http://localhost/api/tools/traffic-inspector/capture-modes/http-proxy",
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ action: "invalid" }),
    }
  );
  const res = await httpProxyRoute.POST(req);
  assert.equal(res.status, 400);
  noStackTrace(await getErrorMessage(res), "POST /capture-modes/http-proxy");
});

test("system-proxy: invalid body does not leak stack", async () => {
  const req = new Request(
    "http://localhost/api/tools/traffic-inspector/capture-modes/system-proxy",
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ action: "bad-action" }),
    }
  );
  const res = await systemProxyRoute.POST(req);
  assert.equal(res.status, 400);
  noStackTrace(await getErrorMessage(res), "POST /capture-modes/system-proxy");
});

test("tls-intercept: missing enabled field does not leak stack", async () => {
  const req = new Request(
    "http://localhost/api/tools/traffic-inspector/capture-modes/tls-intercept",
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ enabled: "not-a-boolean" }),
    }
  );
  const res = await tlsInterceptRoute.POST(req);
  assert.equal(res.status, 400);
  noStackTrace(await getErrorMessage(res), "POST /capture-modes/tls-intercept");
});

import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { pathToFileURL } from "node:url";

const originalEnv = {
  NEXT_PUBLIC_OMNIROUTE_E2E_MODE: process.env.NEXT_PUBLIC_OMNIROUTE_E2E_MODE,
};

function restoreEnv() {
  for (const [key, value] of Object.entries(originalEnv)) {
    if (value === undefined) {
      delete process.env[key];
    } else {
      process.env[key] = value;
    }
  }
}

async function importFresh(modulePath) {
  const url = pathToFileURL(path.resolve(modulePath)).href;
  return import(`${url}?test=${Date.now()}-${Math.random().toString(16).slice(2)}`);
}

function makeRequest(pathname) {
  return {
    nextUrl: {
      pathname,
      protocol: "http:",
    },
    method: "GET",
    cookies: {
      get() {
        return undefined;
      },
    },
    headers: new Headers(),
    url: `http://localhost:20128${pathname}`,
  };
}

test.beforeEach(() => {
  restoreEnv();
});

test.afterEach(() => {
  restoreEnv();
});

test.after(() => {
  restoreEnv();
});

test("proxy bypasses dashboard auth in Playwright e2e mode", async () => {
  process.env.NEXT_PUBLIC_OMNIROUTE_E2E_MODE = "1";

  const { proxy } = await importFresh("src/proxy.ts");
  const response = await proxy(makeRequest("/dashboard/combos"));

  assert.equal(response.status, 200);
  assert.equal(response.headers.get("location"), null);
  assert.ok(response.headers.get("x-request-id"));
});

test("proxy bypasses management API auth in Playwright e2e mode", async () => {
  process.env.NEXT_PUBLIC_OMNIROUTE_E2E_MODE = "1";

  const { proxy } = await importFresh("src/proxy.ts");
  const response = await proxy(makeRequest("/api/combos"));

  assert.equal(response.status, 200);
  assert.equal(response.headers.get("location"), null);
  assert.ok(response.headers.get("x-request-id"));
});

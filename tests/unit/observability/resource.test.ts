/**
 * Tests for resource attributes (PR-005).
 *
 * Coverage:
 *  - detectEnvironment() reads DEPLOYMENT_ENVIRONMENT, NODE_ENV, CI, Electron.
 *  - parseResourceAttributes() handles comma-separated key=value pairs.
 *  - serviceResource() caches its result + merges env-provided attrs last.
 *  - resetServiceResourceForTests() busts the cache.
 */

import { test } from "node:test";
import assert from "node:assert/strict";

import {
  detectEnvironment,
  parseResourceAttributes,
  serviceResource,
  resetServiceResourceForTests,
} from "@/lib/observability/resource";

function withCleanEnv<T>(fn: () => T): T {
  const prev = { ...process.env };
  delete process.env.DEPLOYMENT_ENVIRONMENT;
  delete process.env.NODE_ENV;
  delete process.env.CI;
  delete process.env.OMNIROUTE_ELECTRON;
  delete process.env.OTEL_SERVICE_NAME;
  delete process.env.OMNIROUTE_SERVICE_NAME;
  delete process.env.OTEL_RESOURCE_ATTRIBUTES;
  delete process.env.OMNIROUTE_DISABLE_HOSTNAME;
  resetServiceResourceForTests();
  try {
    return fn();
  } finally {
    process.env = prev;
    resetServiceResourceForTests();
  }
}

test("resource: detectEnvironment prefers DEPLOYMENT_ENVIRONMENT", () => {
  withCleanEnv(() => {
    process.env.DEPLOYMENT_ENVIRONMENT = "production";
    assert.equal(detectEnvironment(), "production");

    process.env.DEPLOYMENT_ENVIRONMENT = "staging";
    assert.equal(detectEnvironment(), "staging");

    process.env.DEPLOYMENT_ENVIRONMENT = "Prod"; // case-insensitive
    assert.equal(detectEnvironment(), "production");
  });
});

test("resource: detectEnvironment falls back to NODE_ENV", () => {
  withCleanEnv(() => {
    process.env.NODE_ENV = "production";
    assert.equal(detectEnvironment(), "production");

    process.env.NODE_ENV = "development";
    assert.equal(detectEnvironment(), "development");

    process.env.NODE_ENV = "test";
    assert.equal(detectEnvironment(), "test");
  });
});

test("resource: detectEnvironment recognizes CI markers", () => {
  withCleanEnv(() => {
    process.env.CI = "true";
    assert.equal(detectEnvironment(), "ci");
  });
});

test("resource: detectEnvironment recognizes Electron", () => {
  withCleanEnv(() => {
    process.env.OMNIROUTE_ELECTRON = "1";
    assert.equal(detectEnvironment(), "electron");
  });
});

test("resource: parseResourceAttributes handles empty input", () => {
  assert.deepEqual(parseResourceAttributes(undefined), {});
  assert.deepEqual(parseResourceAttributes(""), {});
});

test("resource: parseResourceAttributes parses key=value pairs", () => {
  const out = parseResourceAttributes("service.namespace=omniroute,deployment.region=us-east-1");
  assert.deepEqual(out, {
    "service.namespace": "omniroute",
    "deployment.region": "us-east-1",
  });
});

test("resource: parseResourceAttributes parses key=value pairs and tolerates empty values", () => {
  // OTel spec allows empty values; we keep them rather than dropping on the
  // floor so that operators can intentionally clear an attribute by setting
  // it to "" (e.g. service.namespace=).
  const out = parseResourceAttributes("good=1,no-equals,bad=,=missing-key,ok=2");
  assert.deepEqual(out, { good: "1", bad: "", ok: "2" });
});

test("resource: serviceResource includes SDK + service identity", () => {
  withCleanEnv(() => {
    process.env.OTEL_SERVICE_NAME = "my-custom-svc";
    const r = serviceResource();
    assert.equal(r["service.name"], "my-custom-svc");
    assert.equal(r["telemetry.sdk.name"], "omniroute-otel");
    assert.equal(r["telemetry.sdk.language"], "typescript");
    assert.equal(r["deployment.environment"], "unknown");
    assert.equal(r["process.pid"], process.pid);
    assert.equal(r["process.runtime.name"], "nodejs");
    assert.ok(r["process.runtime.version"]);
  });
});

test("resource: serviceResource defaults service.name to omniroute", () => {
  withCleanEnv(() => {
    const r = serviceResource();
    assert.equal(r["service.name"], "omniroute");
  });
});

test("resource: serviceResource merges OTEL_RESOURCE_ATTRIBUTES (env wins last)", () => {
  withCleanEnv(() => {
    process.env.OTEL_SERVICE_NAME = "base-svc";
    process.env.OTEL_RESOURCE_ATTRIBUTES = "service.name=override-svc,deployment.region=us-west-2";
    const r = serviceResource();
    assert.equal(r["service.name"], "override-svc");
    assert.equal(r["deployment.region"], "us-west-2");
  });
});

test("resource: serviceResource caches its result", () => {
  withCleanEnv(() => {
    const r1 = serviceResource();
    process.env.OTEL_SERVICE_NAME = "changed-after-cache";
    const r2 = serviceResource();
    assert.strictEqual(r1, r2, "second call should return the cached object");
    assert.equal(r2["service.name"], "omniroute");
  });
});

test("resource: resetServiceResourceForTests busts the cache", () => {
  withCleanEnv(() => {
    process.env.OTEL_SERVICE_NAME = "first";
    const r1 = serviceResource();
    assert.equal(r1["service.name"], "first");

    resetServiceResourceForTests();
    process.env.OTEL_SERVICE_NAME = "second";
    const r2 = serviceResource();
    assert.equal(r2["service.name"], "second");
    assert.notStrictEqual(r1, r2);
  });
});

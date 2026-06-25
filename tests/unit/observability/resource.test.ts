/**
 * resource.test.ts — Unit tests for src/lib/observability/resource.ts
 *
 * Covers:
 *  - Default resource contains the OTel semconv fields
 *  - Env-var overrides apply
 *  - Attribute overrides (per-call) apply and merge later-wins
 *  - ResourceImpl.merge() combines two resources, later wins
 *  - getString() returns string, number, boolean coercion; fallback on miss
 *  - Immutable: mutating returned attributes does not change the resource
 *  - serializeResource sorts keys deterministically
 *  - Hostname / arch / runtime version are detected
 *  - Override can change service.name
 *  - Empty overrides object returns a resource
 *  - merge() of an invalid object returns the original
 */

import test from "node:test";
import assert from "node:assert/strict";

import { createDefaultResource, serializeResource } from "@/lib/observability/resource";

test("createDefaultResource returns a Resource with the standard semconv fields", () => {
  const resource = createDefaultResource();
  assert.equal(resource.getString("service.name"), "omniroute");
  assert.equal(resource.getString("service.namespace"), "omniroute");
  assert.equal(resource.getString("service.version"), "0.0.0");
  assert.equal(resource.getString("deployment.environment"), "development");
  assert.equal(resource.getString("process.runtime.name"), "nodejs");
  assert.ok(resource.getString("host.arch").length > 0, "host.arch should be populated");
  assert.ok(resource.getString("host.name").length > 0, "host.name should be populated");
});

test("env vars override defaults (OMNIROUTE_SERVICE_NAME / OMNIROUTE_DEPLOYMENT_ENV)", () => {
  const prevName = process.env.OMNIROUTE_SERVICE_NAME;
  const prevEnv = process.env.OMNIROUTE_DEPLOYMENT_ENV;
  process.env.OMNIROUTE_SERVICE_NAME = "omniroute-test";
  process.env.OMNIROUTE_DEPLOYMENT_ENV = "ci";
  try {
    const resource = createDefaultResource();
    assert.equal(resource.getString("service.name"), "omniroute-test");
    assert.equal(resource.getString("deployment.environment"), "ci");
  } finally {
    if (prevName === undefined) delete process.env.OMNIROUTE_SERVICE_NAME;
    else process.env.OMNIROUTE_SERVICE_NAME = prevName;
    if (prevEnv === undefined) delete process.env.OMNIROUTE_DEPLOYMENT_ENV;
    else process.env.OMNIROUTE_DEPLOYMENT_ENV = prevEnv;
  }
});

test("explicit overrides take precedence over env defaults", () => {
  const resource = createDefaultResource({ "service.name": "override-service", "custom.tag": "abc" });
  assert.equal(resource.getString("service.name"), "override-service");
  assert.equal(resource.getString("custom.tag"), "abc");
});

test("null / undefined override values are dropped (later wins policy)", () => {
  const resource = createDefaultResource({ "service.name": undefined as never });
  // service.name should still be the default
  assert.equal(resource.getString("service.name"), "omniroute");
});

test("resource attributes are frozen — mutation does not affect the resource", () => {
  const resource = createDefaultResource();
  const attrs = resource.attributes;
  assert.equal(Object.isFrozen(attrs), true, "attributes should be frozen");
});

test("merge() combines two resources — later wins for conflicting keys", () => {
  const a = createDefaultResource({ "service.name": "a", "tag.a": "1" });
  const b = createDefaultResource({ "service.name": "b", "tag.b": "2" });
  const merged = a.merge(b);
  assert.equal(merged.getString("service.name"), "b", "later (b) should win");
  assert.equal(merged.getString("tag.a"), "1", "a-only attribute kept");
  assert.equal(merged.getString("tag.b"), "2", "b-only attribute added");
});

test("merge() with a non-object returns the original resource (no throw)", () => {
  const a = createDefaultResource();
  const merged = a.merge(null as never);
  assert.equal(merged.getString("service.name"), a.getString("service.name"));
});

test("getString() coerces numbers and booleans to string", () => {
  const resource = createDefaultResource({ "some.number": 42, "some.bool": true });
  assert.equal(resource.getString("some.number"), "42");
  assert.equal(resource.getString("some.bool"), "true");
});

test("getString() returns the fallback when the attribute is missing", () => {
  const resource = createDefaultResource();
  assert.equal(resource.getString("nope", "missing!"), "missing!");
});

test("serializeResource() returns keys in sorted order", () => {
  const resource = createDefaultResource({ "z.last": "z", "a.first": "a" });
  const serialized = serializeResource(resource);
  const keys = Object.keys(serialized);
  const sorted = [...keys].sort();
  assert.deepEqual(keys, sorted, "keys should be sorted");
});

test("host.arch / process.runtime.version reflect process metadata", () => {
  const resource = createDefaultResource();
  assert.equal(resource.getString("host.arch"), process.arch);
  assert.equal(resource.getString("process.runtime.version"), process.version);
});
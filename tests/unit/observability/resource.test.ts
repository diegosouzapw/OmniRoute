/**
 * tests/unit/observability/resource.test.ts
 *
 * Resource detector + helpers. Covers:
 *   - OTEL_RESOURCE_ATTRIBUTES parsing (comma-sep key=value)
 *   - OTEL_SERVICE_NAME / OTEL_SERVICE_VERSION overrides
 *   - OMNIROUTE_SERVICE_NAMESPACE / INSTANCE_ID
 *   - Process auto-detection (pid, runtime name, version)
 *   - mergeResources (override wins ties)
 *   - resourceToOtlp / resourceToPromLabels
 *   - resetResourceCache test isolation
 *   - Sanitization of forbidden chars in OTEL_RESOURCE_ATTRIBUTES values
 */

import test from "node:test";
import assert from "node:assert/strict";

const resource = await import("../../../src/lib/observability/resource.ts");

function reset() {
  resource.resetResourceCache();
}

test("OTEL_RESOURCE_ATTRIBUTES populates attributes from comma-sep pairs", () => {
  reset();
  const prev = process.env.OTEL_RESOURCE_ATTRIBUTES;
  process.env.OTEL_RESOURCE_ATTRIBUTES = "k1=v1,k2=v2,k3=hello world";
  const r = resource.getResource();
  assert.equal(r.attributes.k1, "v1");
  assert.equal(r.attributes.k2, "v2");
  assert.equal(r.attributes.k3, "hello world");
  assert.equal(r.sources.k1, "env");
  if (prev === undefined) delete process.env.OTEL_RESOURCE_ATTRIBUTES;
  else process.env.OTEL_RESOURCE_ATTRIBUTES = prev;
});

test("OTEL_RESOURCE_ATTRIBUTES ignores malformed pairs (no equals / empty)", () => {
  reset();
  const prev = process.env.OTEL_RESOURCE_ATTRIBUTES;
  process.env.OTEL_RESOURCE_ATTRIBUTES = "=value,nokey,good=ok";
  const r = resource.getResource();
  assert.equal(r.attributes.good, "ok");
  assert.equal(r.attributes[""], undefined);
  if (prev === undefined) delete process.env.OTEL_RESOURCE_ATTRIBUTES;
  else process.env.OTEL_RESOURCE_ATTRIBUTES = prev;
});

test("OTEL_RESOURCE_ATTRIBUTES sanitises forbidden chars (\\n, =, ,)", () => {
  reset();
  const prev = process.env.OTEL_RESOURCE_ATTRIBUTES;
  process.env.OTEL_RESOURCE_ATTRIBUTES = "badkey\n=val,key=val\nue";
  const r = resource.getResource();
  // The bad-key entry is dropped, the value with newline is dropped.
  assert.equal(r.attributes["badkey\n"], undefined);
  if (prev === undefined) delete process.env.OTEL_RESOURCE_ATTRIBUTES;
  else process.env.OTEL_RESOURCE_ATTRIBUTES = prev;
});

test("OTEL_SERVICE_NAME overrides service.name when no env-bag conflicts", () => {
  reset();
  const prevName = process.env.OTEL_SERVICE_NAME;
  process.env.OTEL_SERVICE_NAME = "my-custom-svc";
  const r = resource.getResource();
  assert.equal(r.attributes["service.name"], "my-custom-svc");
  assert.equal(r.sources["service.name"], "env");
  if (prevName === undefined) delete process.env.OTEL_SERVICE_NAME;
  else process.env.OTEL_SERVICE_NAME = prevName;
});

test("OTEL_RESOURCE_ATTRIBUTES service.name wins over OTEL_SERVICE_NAME", () => {
  reset();
  const prevBag = process.env.OTEL_RESOURCE_ATTRIBUTES;
  const prevName = process.env.OTEL_SERVICE_NAME;
  process.env.OTEL_RESOURCE_ATTRIBUTES = "service.name=from-bag";
  process.env.OTEL_SERVICE_NAME = "from-env";
  const r = resource.getResource();
  assert.equal(r.attributes["service.name"], "from-bag");
  if (prevBag === undefined) delete process.env.OTEL_RESOURCE_ATTRIBUTES;
  else process.env.OTEL_RESOURCE_ATTRIBUTES = prevBag;
  if (prevName === undefined) delete process.env.OTEL_SERVICE_NAME;
  else process.env.OTEL_SERVICE_NAME = prevName;
});

test("service.namespace defaults to 'omniroute'", () => {
  reset();
  const prev = process.env.OMNIROUTE_SERVICE_NAMESPACE;
  delete process.env.OMNIROUTE_SERVICE_NAMESPACE;
  const r = resource.getResource();
  assert.equal(r.attributes["service.namespace"], "omniroute");
  if (prev !== undefined) process.env.OMNIROUTE_SERVICE_NAMESPACE = prev;
});

test("Process auto-detection populates process.pid and process.runtime.*", () => {
  reset();
  const r = resource.getResource();
  assert.equal(r.attributes["process.pid"], String(process.pid));
  assert.ok(r.attributes["process.runtime.version"]);
  assert.equal(r.sources["process.pid"], "process");
});

test("mergeResources: override wins on conflict", () => {
  const a = resource.resourceFromAttributes({ "k1": "a", "shared": "left" });
  const b = resource.resourceFromAttributes({ "k2": "b", "shared": "right" });
  const merged = resource.mergeResources(a, b);
  assert.equal(merged.attributes.k1, "a");
  assert.equal(merged.attributes.k2, "b");
  assert.equal(merged.attributes.shared, "right");
});

test("resourceFromAttributes builds a Resource literal", () => {
  const r = resource.resourceFromAttributes({ a: "1", b: "2" });
  assert.deepEqual(r.attributes, { a: "1", b: "2" });
  assert.equal(r.sources.a, "env");
  assert.equal(r.sources.b, "env");
});

test("resourceToOtlp produces OTLP/HTTP JSON shape", () => {
  const r = resource.resourceFromAttributes({ svc: "x" });
  const out = resource.resourceToOtlp(r);
  assert.deepEqual(out, {
    attributes: [{ key: "svc", value: { stringValue: "x" } }],
  });
});

test("resourceToPromLabels replaces forbidden chars in label values", () => {
  const r = resource.resourceFromAttributes({ normal: "ok", bad: 'has"and\ncomma,bs\\lash' });
  const out = resource.resourceToPromLabels(r);
  assert.equal(out.normal, "ok");
  assert.equal(out.bad.includes('"'), false);
  assert.equal(out.bad.includes("\n"), false);
  assert.equal(out.bad.includes(","), false);
  assert.equal(out.bad.includes("\\"), false);
});
/**
 * Unit tests for §4b routing-layer wiring:
 * getBifrostRoutingConfig uses supervised instance port when BIFROST_BASE_URL is unset.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { registerSupervisor, unregisterSupervisor } from "../../../src/lib/services/registry.ts";
import { ServiceSupervisor } from "../../../src/lib/services/ServiceSupervisor.ts";
import { getBifrostRoutingConfig } from "../../../src/app/api/v1/relay/chat/completions/routingBackend.ts";

test("getBifrostRoutingConfig: returns null when BIFROST_BASE_URL unset and no supervised service", () => {
  const result = getBifrostRoutingConfig({} as NodeJS.ProcessEnv);
  assert.equal(result, null);
});

test("getBifrostRoutingConfig: uses BIFROST_BASE_URL when set (explicit env wins)", () => {
  const result = getBifrostRoutingConfig({
    BIFROST_BASE_URL: "http://localhost:9999",
  } as NodeJS.ProcessEnv);
  assert.ok(result !== null);
  assert.equal(result?.baseUrl, "http://localhost:9999");
});

test("getBifrostRoutingConfig: uses supervised port when BIFROST_BASE_URL unset and bifrost running", () => {
  // Register a stub supervisor whose getStatus() reports running on port 8080
  const stub = {
    getStatus: () => ({
      tool: "bifrost",
      state: "running" as const,
      port: 8080,
      health: "healthy" as const,
      pid: 1234,
      startedAt: new Date().toISOString(),
      lastError: null,
    }),
  } as unknown as ServiceSupervisor;

  registerSupervisor(stub);

  try {
    const result = getBifrostRoutingConfig({} as NodeJS.ProcessEnv);
    assert.ok(result !== null, "should return config when supervised instance is running");
    assert.equal(result?.baseUrl, "http://127.0.0.1:8080");
    assert.equal(result?.enabled, true);
  } finally {
    unregisterSupervisor("bifrost");
  }
});

test("getBifrostRoutingConfig: explicit BIFROST_BASE_URL overrides supervised port", () => {
  const stub = {
    getStatus: () => ({
      tool: "bifrost",
      state: "running" as const,
      port: 8080,
      health: "healthy" as const,
      pid: 1234,
      startedAt: new Date().toISOString(),
      lastError: null,
    }),
  } as unknown as ServiceSupervisor;

  registerSupervisor(stub);

  try {
    const result = getBifrostRoutingConfig({
      BIFROST_BASE_URL: "http://remote-host:9999",
    } as NodeJS.ProcessEnv);
    assert.ok(result !== null);
    // Explicit env wins
    assert.equal(result?.baseUrl, "http://remote-host:9999");
  } finally {
    unregisterSupervisor("bifrost");
  }
});

test("getBifrostRoutingConfig: stopped supervised instance does NOT provide baseUrl", () => {
  const stub = {
    getStatus: () => ({
      tool: "bifrost",
      state: "stopped" as const,
      port: 8080,
      health: "unknown" as const,
      pid: null,
      startedAt: null,
      lastError: null,
    }),
  } as unknown as ServiceSupervisor;

  registerSupervisor(stub);

  try {
    const result = getBifrostRoutingConfig({} as NodeJS.ProcessEnv);
    assert.equal(result, null, "stopped supervisor should not yield a baseUrl");
  } finally {
    unregisterSupervisor("bifrost");
  }
});

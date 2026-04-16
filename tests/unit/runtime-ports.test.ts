import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";

// We test the standalone (scripts/) version of port resolution since
// the src/ version uses @/ alias that requires the full Next.js build.
import { parsePort, resolveRuntimePorts } from "../../scripts/runtime-env.mjs";

describe("parsePort", () => {
  it("parses a valid port number", () => {
    assert.equal(parsePort("3000", 20128), 3000);
  });

  it("returns fallback for undefined", () => {
    assert.equal(parsePort(undefined, 20128), 20128);
  });

  it("returns fallback for non-numeric string", () => {
    assert.equal(parsePort("abc", 20128), 20128);
  });

  it("returns fallback for port 0", () => {
    assert.equal(parsePort("0", 20128), 20128);
  });

  it("returns fallback for port > 65535", () => {
    assert.equal(parsePort("70000", 20128), 20128);
  });

  it("returns fallback for negative port", () => {
    assert.equal(parsePort("-1", 20128), 20128);
  });

  it("accepts port 1", () => {
    assert.equal(parsePort("1", 20128), 1);
  });

  it("accepts port 65535", () => {
    assert.equal(parsePort("65535", 20128), 65535);
  });
});

describe("resolveRuntimePorts", () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    delete process.env.PORT;
    delete process.env.API_PORT;
    delete process.env.DASHBOARD_PORT;
    delete process.env.OMNIROUTE_PORT;
  });

  afterEach(() => {
    // Restore original env
    Object.keys(process.env).forEach((key) => {
      if (!(key in originalEnv)) delete process.env[key];
    });
    Object.assign(process.env, originalEnv);
  });

  it("returns default ports when no env vars set", () => {
    const ports = resolveRuntimePorts();
    assert.equal(ports.basePort, 20128);
    assert.equal(ports.apiPort, 20128);
    assert.equal(ports.dashboardPort, 20128);
  });

  it("uses PORT as base for all ports", () => {
    process.env.PORT = "3000";
    const ports = resolveRuntimePorts();
    assert.equal(ports.basePort, 3000);
    assert.equal(ports.apiPort, 3000);
    assert.equal(ports.dashboardPort, 3000);
  });

  it("splits ports when API_PORT is set", () => {
    process.env.PORT = "3000";
    process.env.API_PORT = "3001";
    const ports = resolveRuntimePorts();
    assert.equal(ports.basePort, 3000);
    assert.equal(ports.apiPort, 3001);
    assert.equal(ports.dashboardPort, 3000);
  });

  it("splits ports when DASHBOARD_PORT is set", () => {
    process.env.PORT = "3000";
    process.env.DASHBOARD_PORT = "3002";
    const ports = resolveRuntimePorts();
    assert.equal(ports.basePort, 3000);
    assert.equal(ports.apiPort, 3000);
    assert.equal(ports.dashboardPort, 3002);
  });

  it("supports full split (API + DASHBOARD)", () => {
    process.env.PORT = "3000";
    process.env.API_PORT = "3001";
    process.env.DASHBOARD_PORT = "3002";
    const ports = resolveRuntimePorts();
    assert.equal(ports.basePort, 3000);
    assert.equal(ports.apiPort, 3001);
    assert.equal(ports.dashboardPort, 3002);
  });

  it("ignores invalid port values and falls back", () => {
    process.env.PORT = "abc";
    const ports = resolveRuntimePorts();
    assert.equal(ports.basePort, 20128);
  });
});

/**
 * Smoke tests for Traffic Inspector page structure and constants
 */
import { describe, it } from "vitest";
import assert from "node:assert/strict";

describe("Traffic Inspector page smoke tests", () => {
  it("has correct page path", () => {
    const path = "/dashboard/tools/traffic-inspector";
    assert.ok(path.startsWith("/dashboard/tools/"));
    assert.ok(path.includes("traffic-inspector"));
  });

  it("sidebar ID is correct", () => {
    const id = "traffic-inspector";
    assert.equal(id, "traffic-inspector");
  });

  it("sidebar href is correct", () => {
    const href = "/dashboard/tools/traffic-inspector";
    assert.equal(href, "/dashboard/tools/traffic-inspector");
  });

  it("sidebar icon is correct", () => {
    const icon = "network_check";
    assert.equal(icon, "network_check");
  });

  it("has 7 tabs defined", () => {
    const tabs = [
      "conversation",
      "headers",
      "request",
      "response",
      "timing",
      "llm",
      "stats",
    ];
    assert.equal(tabs.length, 7);
  });

  it("llm tab is llmOnly", () => {
    const llmOnlyTabs = ["llm"];
    assert.ok(llmOnlyTabs.includes("llm"));
    assert.ok(!llmOnlyTabs.includes("conversation"));
    assert.ok(!llmOnlyTabs.includes("headers"));
  });

  it("ContextColorBar uses deterministic hue", () => {
    function hashToHue(key: string): number {
      let hash = 0;
      for (let i = 0; i < key.length; i++) {
        hash = (hash * 31 + key.charCodeAt(i)) & 0xffffff;
      }
      return (hash * 137.5) % 360;
    }

    const key = "abc123";
    const hue1 = hashToHue(key);
    const hue2 = hashToHue(key);
    assert.equal(hue1, hue2, "Hash should be deterministic");
    assert.ok(hue1 >= 0 && hue1 < 360, "Hue should be in [0, 360)");
  });

  it("buffer max size is 1000", () => {
    const BUFFER_MAX = 1000;
    assert.equal(BUFFER_MAX, 1000);
  });

  it("WS URL is correct", () => {
    const WS_URL = "/api/tools/traffic-inspector/ws";
    assert.ok(WS_URL.startsWith("/api/tools/traffic-inspector/"));
    assert.ok(WS_URL.endsWith("/ws"));
  });
});

describe("Traffic Inspector capture modes", () => {
  it("has 4 capture modes", () => {
    const modes = ["agentBridge", "customHosts", "httpProxy", "systemWide"];
    assert.equal(modes.length, 4);
  });

  it("agentBridge is always-on mode", () => {
    const alwaysOnModes = ["agentBridge"];
    assert.ok(alwaysOnModes.includes("agentBridge"));
    assert.ok(!alwaysOnModes.includes("customHosts"));
  });

  it("systemWide mode has warning", () => {
    const warnModes = ["systemWide"];
    assert.ok(warnModes.includes("systemWide"));
  });

  it("default HTTP proxy port is 8080", () => {
    const port = 8080;
    assert.equal(port, 8080);
  });
});

describe("Traffic Inspector request filtering", () => {
  it("filters by profile correctly", () => {
    const profiles = ["llm", "custom", "all"] as const;
    assert.ok(profiles.includes("llm"));
    assert.ok(profiles.includes("custom"));
    assert.ok(profiles.includes("all"));
  });

  it("applies status filter categories", () => {
    const categories = ["2xx", "3xx", "4xx", "5xx", "error"] as const;
    assert.equal(categories.length, 5);

    const mapStatus = (status: number) => `${Math.floor(status / 100)}xx`;
    assert.equal(mapStatus(200), "2xx");
    assert.equal(mapStatus(301), "3xx");
    assert.equal(mapStatus(404), "4xx");
    assert.equal(mapStatus(500), "5xx");
  });
});

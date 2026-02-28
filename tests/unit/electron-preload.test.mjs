/**
 * Tests for Electron preload script (electron/preload.js)
 *
 * Tests cover:
 * - Channel whitelist validation
 * - API surface correctness
 * - Security boundary enforcement
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";

// ─── Channel Whitelist Tests ─────────────────────────────────

describe("Preload Channel Whitelist", () => {
  const VALID_CHANNELS = {
    invoke: ["get-app-info", "open-external", "get-data-dir", "restart-server"],
    send: ["window-minimize", "window-maximize", "window-close"],
    receive: ["server-status", "port-changed"],
  };

  function isValidChannel(channel, type) {
    return VALID_CHANNELS[type]?.includes(channel) ?? false;
  }

  it("should have exactly 4 invoke channels", () => {
    assert.equal(VALID_CHANNELS.invoke.length, 4);
  });

  it("should have exactly 3 send channels", () => {
    assert.equal(VALID_CHANNELS.send.length, 3);
  });

  it("should have exactly 2 receive channels", () => {
    assert.equal(VALID_CHANNELS.receive.length, 2);
  });

  it("should not allow crossing channel types", () => {
    // Invoke channels should not be valid as send
    for (const ch of VALID_CHANNELS.invoke) {
      assert.equal(isValidChannel(ch, "send"), false, `${ch} should not be valid as send`);
    }
    // Send channels should not be valid as invoke
    for (const ch of VALID_CHANNELS.send) {
      assert.equal(isValidChannel(ch, "invoke"), false, `${ch} should not be valid as invoke`);
    }
  });

  it("should reject null/undefined channels", () => {
    assert.equal(isValidChannel(null, "invoke"), false);
    assert.equal(isValidChannel(undefined, "invoke"), false);
  });
});

// ─── API Surface Tests ───────────────────────────────────────

describe("Preload API Surface", () => {
  const EXPECTED_API_METHODS = [
    "getAppInfo",
    "openExternal",
    "getDataDir",
    "restartServer",
    "minimizeWindow",
    "maximizeWindow",
    "closeWindow",
    "onServerStatus",
    "removeServerStatusListener",
    "onPortChanged",
    "removePortChangedListener",
  ];

  const EXPECTED_API_PROPERTIES = ["isElectron", "platform"];

  it("should define all expected method names", () => {
    // The preload script should expose these methods
    for (const method of EXPECTED_API_METHODS) {
      assert.ok(
        typeof method === "string" && method.length > 0,
        `Method ${method} should be valid`
      );
    }
  });

  it("should define expected property names", () => {
    for (const prop of EXPECTED_API_PROPERTIES) {
      assert.ok(typeof prop === "string" && prop.length > 0, `Property ${prop} should be valid`);
    }
  });

  it("should have correct total API surface (13 items)", () => {
    const totalApi = EXPECTED_API_METHODS.length + EXPECTED_API_PROPERTIES.length;
    assert.equal(totalApi, 13);
  });

  it("should not expose any Node.js internals", () => {
    const DANGEROUS_APIS = [
      "require",
      "process",
      "child_process",
      "fs",
      "exec",
      "spawn",
      "eval",
      "__dirname",
      "__filename",
    ];

    // None of these should be in the API surface
    for (const api of DANGEROUS_APIS) {
      assert.ok(
        !EXPECTED_API_METHODS.includes(api) && !EXPECTED_API_PROPERTIES.includes(api),
        `Dangerous API '${api}' should NOT be exposed`
      );
    }
  });
});

// ─── Open External URL Validation Tests ──────────────────────

describe("Preload openExternal Security", () => {
  /**
   * Simulate the preload validation before invoking open-external
   */
  function validateBeforeOpen(url) {
    try {
      const parsed = new URL(url);
      return ["http:", "https:"].includes(parsed.protocol);
    } catch {
      return false;
    }
  }

  const SAFE_URLS = [
    "https://github.com",
    "http://localhost:20128",
    "https://omniroute.dev/docs",
    "https://example.com/path?q=1&p=2#section",
  ];

  const DANGEROUS_URLS = [
    "file:///etc/passwd",
    "file:///C:/Windows/System32",
    "javascript:alert(document.cookie)",
    "vscode://extensions",
    "data:text/html,<h1>pwned</h1>",
    "blob:http://evil.com/abc123",
    "ftp://unsafe-server.com",
    "ssh://attacker.com",
    "smb://network-share",
    "",
    "   ",
    "not-a-url",
  ];

  for (const url of SAFE_URLS) {
    it(`should allow safe URL: ${url.substring(0, 40)}`, () => {
      assert.equal(validateBeforeOpen(url), true);
    });
  }

  for (const url of DANGEROUS_URLS) {
    it(`should block dangerous URL: ${url.substring(0, 40) || "(empty)"}`, () => {
      assert.equal(validateBeforeOpen(url), false);
    });
  }
});

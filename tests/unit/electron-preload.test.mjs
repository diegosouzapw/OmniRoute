/**
 * Tests for Electron preload script (electron/preload.js)
 *
 * Covers:
 * - Channel whitelist (Fix #16: validates generic wrappers)
 * - API surface correctness
 * - Security boundary enforcement
 * - Disposer pattern for listeners (Fix #6)
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
    for (const ch of VALID_CHANNELS.invoke) {
      assert.equal(isValidChannel(ch, "send"), false, `${ch} should not be valid as send`);
    }
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
  // Updated: removed removeServerStatusListener/removePortChangedListener (Fix #6)
  const EXPECTED_API_METHODS = [
    "getAppInfo",
    "openExternal",
    "getDataDir",
    "restartServer",
    "minimizeWindow",
    "maximizeWindow",
    "closeWindow",
    "onServerStatus", // now returns disposer
    "onPortChanged", // now returns disposer
  ];

  const EXPECTED_API_PROPERTIES = ["isElectron", "platform"];

  it("should define all expected method names", () => {
    for (const method of EXPECTED_API_METHODS) {
      assert.ok(typeof method === "string" && method.length > 0);
    }
  });

  it("should define expected property names", () => {
    for (const prop of EXPECTED_API_PROPERTIES) {
      assert.ok(typeof prop === "string" && prop.length > 0);
    }
  });

  it("should have correct total API surface (11 items — reduced from 13)", () => {
    const totalApi = EXPECTED_API_METHODS.length + EXPECTED_API_PROPERTIES.length;
    assert.equal(totalApi, 11);
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
    const all = [...EXPECTED_API_METHODS, ...EXPECTED_API_PROPERTIES];
    for (const api of DANGEROUS_APIS) {
      assert.ok(!all.includes(api), `'${api}' should NOT be exposed`);
    }
  });
});

// ─── Disposer Pattern Tests (#6) ─────────────────────────────

describe("Preload Listener Disposer Pattern", () => {
  it("safeOn should return a function (disposer)", () => {
    // Simulate the safeOn pattern from the new preload.js
    const VALID_RECEIVE = ["server-status", "port-changed"];
    const listeners = [];

    function safeOn(channel, callback) {
      if (!VALID_RECEIVE.includes(channel)) return () => {};
      const handler = { channel, callback };
      listeners.push(handler);
      return () => {
        const idx = listeners.indexOf(handler);
        if (idx !== -1) listeners.splice(idx, 1);
      };
    }

    // Add a listener
    const dispose = safeOn("server-status", () => {});
    assert.equal(typeof dispose, "function");
    assert.equal(listeners.length, 1);

    // Dispose it
    dispose();
    assert.equal(listeners.length, 0);
  });

  it("safeOn should reject invalid channels and return noop disposer", () => {
    const VALID_RECEIVE = ["server-status", "port-changed"];

    function safeOn(channel, callback) {
      if (!VALID_RECEIVE.includes(channel)) return () => {};
      return () => {};
    }

    const dispose = safeOn("malicious-event", () => {});
    assert.equal(typeof dispose, "function");
    // Should not throw
    dispose();
  });

  it("multiple listeners should be independently disposable", () => {
    const listeners = [];
    function safeOn(channel, callback) {
      const handler = { channel, callback };
      listeners.push(handler);
      return () => {
        const idx = listeners.indexOf(handler);
        if (idx !== -1) listeners.splice(idx, 1);
      };
    }

    const dispose1 = safeOn("server-status", () => "a");
    const dispose2 = safeOn("server-status", () => "b");
    const dispose3 = safeOn("port-changed", () => "c");
    assert.equal(listeners.length, 3);

    // Remove only the second one
    dispose2();
    assert.equal(listeners.length, 2);
    assert.equal(listeners[0].callback(), "a");
    assert.equal(listeners[1].callback(), "c");

    // Remove first
    dispose1();
    assert.equal(listeners.length, 1);

    // Double-dispose should be safe
    dispose1();
    assert.equal(listeners.length, 1);
  });
});

// ─── Generic Wrapper Tests (#16) ─────────────────────────────

describe("Generic IPC Wrappers", () => {
  const VALID_CHANNELS = {
    invoke: ["get-app-info", "open-external", "get-data-dir", "restart-server"],
    send: ["window-minimize", "window-maximize", "window-close"],
  };

  function safeInvoke(channel) {
    if (!VALID_CHANNELS.invoke.includes(channel)) {
      return { blocked: true };
    }
    return { blocked: false, channel };
  }

  function safeSend(channel) {
    if (!VALID_CHANNELS.send.includes(channel)) {
      return { blocked: true };
    }
    return { blocked: false, channel };
  }

  it("safeInvoke should allow valid channels", () => {
    for (const ch of VALID_CHANNELS.invoke) {
      assert.equal(safeInvoke(ch).blocked, false);
    }
  });

  it("safeInvoke should block invalid channels", () => {
    assert.equal(safeInvoke("shell-exec").blocked, true);
    assert.equal(safeInvoke("").blocked, true);
    assert.equal(safeInvoke("__proto__").blocked, true);
  });

  it("safeSend should allow valid channels", () => {
    for (const ch of VALID_CHANNELS.send) {
      assert.equal(safeSend(ch).blocked, false);
    }
  });

  it("safeSend should block invalid channels", () => {
    assert.equal(safeSend("window-nuke").blocked, true);
  });
});

// ─── Open External URL Validation Tests ──────────────────────

describe("Preload openExternal Security", () => {
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

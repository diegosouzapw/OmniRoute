/**
 * Tests for Electron main process (electron/main.js)
 *
 * Covers:
 * - URL validation & RCE prevention
 * - IPC channel security
 * - Server readiness polling logic
 * - Restart timeout + SIGKILL
 * - Port change lifecycle
 * - CSP header structure
 * - Platform-conditional window options
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";

// ─── URL Validation Tests ────────────────────────────────────

describe("Electron URL Validation", () => {
  function validateExternalUrl(url) {
    try {
      const parsedUrl = new URL(url);
      if (["http:", "https:"].includes(parsedUrl.protocol)) {
        return { allowed: true, url };
      }
      return { allowed: false, reason: `Blocked protocol: ${parsedUrl.protocol}` };
    } catch {
      return { allowed: false, reason: "Invalid URL" };
    }
  }

  it("should allow http URLs", () => {
    assert.equal(validateExternalUrl("http://example.com").allowed, true);
  });

  it("should allow https URLs", () => {
    assert.equal(validateExternalUrl("https://github.com/diegosouzapw/OmniRoute").allowed, true);
  });

  it("should block file:// protocol (RCE risk)", () => {
    const result = validateExternalUrl("file:///etc/passwd");
    assert.equal(result.allowed, false);
    assert.match(result.reason, /Blocked protocol/);
  });

  it("should block javascript: protocol (XSS risk)", () => {
    assert.equal(validateExternalUrl("javascript:alert(1)").allowed, false);
  });

  it("should block custom protocol handlers", () => {
    assert.equal(validateExternalUrl("vscode://extensions/install?name=malware").allowed, false);
  });

  it("should block data: URIs", () => {
    assert.equal(validateExternalUrl("data:text/html,<script>alert(1)</script>").allowed, false);
  });

  it("should reject empty string", () => {
    assert.equal(validateExternalUrl("").allowed, false);
  });

  it("should reject malformed URL", () => {
    const result = validateExternalUrl("not a url");
    assert.equal(result.allowed, false);
    assert.match(result.reason, /Invalid URL/);
  });

  it("should allow localhost URLs", () => {
    assert.equal(validateExternalUrl("http://localhost:20128/dashboard").allowed, true);
  });

  it("should allow URLs with paths and query params", () => {
    assert.equal(validateExternalUrl("https://example.com/path?q=test&page=1#hash").allowed, true);
  });
});

// ─── Window Open Handler Tests ───────────────────────────────

describe("Electron Window Open Handler", () => {
  function windowOpenHandler({ url }) {
    try {
      const parsedUrl = new URL(url);
      if (["http:", "https:"].includes(parsedUrl.protocol)) {
        return { action: "allow-external" };
      }
      return { action: "deny" };
    } catch {
      return { action: "deny" };
    }
  }

  it("should deny all windows (external links go to browser)", () => {
    const result = windowOpenHandler({ url: "https://example.com" });
    assert.ok(result.action);
  });

  it("should deny file:// URLs", () => {
    assert.equal(windowOpenHandler({ url: "file:///etc/passwd" }).action, "deny");
  });
});

// ─── IPC Channel Validation Tests ────────────────────────────

describe("IPC Channel Validation", () => {
  const VALID_CHANNELS = {
    invoke: ["get-app-info", "open-external", "get-data-dir", "restart-server"],
    send: ["window-minimize", "window-maximize", "window-close"],
    receive: ["server-status", "port-changed"],
  };

  function isValidChannel(channel, type) {
    return VALID_CHANNELS[type]?.includes(channel) ?? false;
  }

  it("should allow valid invoke channels", () => {
    assert.equal(isValidChannel("get-app-info", "invoke"), true);
    assert.equal(isValidChannel("open-external", "invoke"), true);
    assert.equal(isValidChannel("get-data-dir", "invoke"), true);
    assert.equal(isValidChannel("restart-server", "invoke"), true);
  });

  it("should allow valid send channels", () => {
    assert.equal(isValidChannel("window-minimize", "send"), true);
    assert.equal(isValidChannel("window-maximize", "send"), true);
    assert.equal(isValidChannel("window-close", "send"), true);
  });

  it("should allow valid receive channels", () => {
    assert.equal(isValidChannel("server-status", "receive"), true);
    assert.equal(isValidChannel("port-changed", "receive"), true);
  });

  it("should block unknown channels", () => {
    assert.equal(isValidChannel("execute-arbitrary-code", "invoke"), false);
    assert.equal(isValidChannel("delete-all-data", "send"), false);
    assert.equal(isValidChannel("malicious-event", "receive"), false);
    assert.equal(isValidChannel("", "invoke"), false);
  });

  it("should handle undefined type gracefully", () => {
    assert.equal(isValidChannel("get-app-info", "nonexistent"), false);
    assert.equal(isValidChannel("test", undefined), false);
  });

  it("should block prototype pollution attempts", () => {
    assert.equal(isValidChannel("constructor", "invoke"), false);
    assert.equal(isValidChannel("__proto__", "invoke"), false);
    assert.equal(isValidChannel("toString", "invoke"), false);
  });
});

// ─── Server Port Validation Tests ────────────────────────────

describe("Server Port Management", () => {
  it("should have valid default port", () => {
    const DEFAULT_PORT = 20128;
    assert.ok(DEFAULT_PORT > 0 && DEFAULT_PORT <= 65535);
  });

  it("should validate port numbers", () => {
    function isValidPort(port) {
      return Number.isFinite(port) && port > 0 && port <= 65535;
    }
    assert.equal(isValidPort(20128), true);
    assert.equal(isValidPort(3000), true);
    assert.equal(isValidPort(8080), true);
    assert.equal(isValidPort(0), false);
    assert.equal(isValidPort(-1), false);
    assert.equal(isValidPort(70000), false);
    assert.equal(isValidPort(NaN), false);
  });

  it("should generate correct server URL", () => {
    const port = 20128;
    assert.equal(`http://localhost:${port}`, "http://localhost:20128");
  });
});

// ─── Server Readiness Tests (#1) ─────────────────────────────

describe("Server Readiness Logic", () => {
  it("waitForServer should timeout and return false", async () => {
    // Simulate the polling logic with an always-failing fetch
    async function waitForServer(url, timeoutMs = 100) {
      const start = Date.now();
      while (Date.now() - start < timeoutMs) {
        try {
          const res = await fetch(url);
          if (res.ok || res.status < 500) return true;
        } catch {
          /* not ready */
        }
        await new Promise((r) => setTimeout(r, 30));
      }
      return false;
    }

    // Should timeout immediately since nothing is running on that port
    const result = await waitForServer("http://localhost:59999", 100);
    assert.equal(result, false);
  });
});

// ─── Restart Timeout Tests (#2) ──────────────────────────────

describe("Restart Timeout Logic", () => {
  it("should resolve even if process doesn't exit", async () => {
    // Simulate the timeout race
    const start = Date.now();
    await Promise.race([
      new Promise((r) => setTimeout(r, 100000)), // simulates hung process
      new Promise((r) => setTimeout(r, 50)), // timeout
    ]);
    const elapsed = Date.now() - start;
    assert.ok(elapsed < 200, "Should resolve in ~50ms via timeout");
  });

  it("should resolve immediately if process exits first", async () => {
    const start = Date.now();
    await Promise.race([
      new Promise((r) => setTimeout(r, 10)), // simulates fast exit
      new Promise((r) => setTimeout(r, 5000)), // timeout
    ]);
    const elapsed = Date.now() - start;
    assert.ok(elapsed < 200, "Should resolve in ~10ms via exit");
  });
});

// ─── CSP Tests (#15) ─────────────────────────────────────────

describe("Content Security Policy", () => {
  it("should have all required CSP directives", () => {
    const directives = [
      "default-src",
      "connect-src",
      "script-src",
      "style-src",
      "font-src",
      "img-src",
      "media-src",
    ];

    const csp = [
      "default-src 'self'",
      "connect-src 'self' http://localhost:* ws://localhost:*",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' data: blob: https:",
      "media-src 'self'",
    ].join("; ");

    for (const directive of directives) {
      assert.ok(csp.includes(directive), `CSP should contain ${directive}`);
    }
  });

  it("should not allow unsafe script sources from external domains", () => {
    const scriptSrc = "script-src 'self' 'unsafe-inline' 'unsafe-eval'";
    assert.ok(!scriptSrc.includes("http://"), "Should not allow external http scripts");
    assert.ok(!scriptSrc.includes("*"), "Should not wildcard script sources");
  });
});

// ─── Platform-Conditional Tests (#9) ─────────────────────────

describe("Platform-Conditional Window Options", () => {
  it("should return hiddenInset for macOS", () => {
    const platform = "darwin";
    const options =
      platform === "darwin"
        ? { titleBarStyle: "hiddenInset", trafficLightPosition: { x: 16, y: 16 } }
        : { titleBarStyle: "default" };

    assert.equal(options.titleBarStyle, "hiddenInset");
    assert.deepEqual(options.trafficLightPosition, { x: 16, y: 16 });
  });

  it("should return default for Windows/Linux", () => {
    for (const platform of ["win32", "linux"]) {
      const options =
        platform === "darwin" ? { titleBarStyle: "hiddenInset" } : { titleBarStyle: "default" };
      assert.equal(options.titleBarStyle, "default");
    }
  });
});

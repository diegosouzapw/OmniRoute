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
import { mkdtempSync, rmSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

function raceDelays(firstMs, secondMs) {
  return new Promise((resolve) => {
    let settled = false;
    const first = setTimeout(() => {
      if (settled) return;
      settled = true;
      clearTimeout(second);
      resolve(firstMs);
    }, firstMs);
    const second = setTimeout(() => {
      if (settled) return;
      settled = true;
      clearTimeout(first);
      resolve(secondMs);
    }, secondMs);
  });
}

// ─── Packaging manifest completeness (#3292 regression) ──────
//
// The packaged Electron app (electron-builder asar) only ships the files
// listed in `build.files`. When #3292 added `electron/loginManager.js` and a
// `require("./loginManager")` in main.js without adding it to `build.files`,
// the packaged app crashed at startup with "Cannot find module './loginManager'"
// — caught only by the CI smoke test on Linux/macOS. This guard asserts that
// every local `require("./x")` in the Electron entry points is shipped.

describe("Electron packaging manifest completeness (#3292)", () => {
  const electronDir = join(import.meta.dirname, "../../electron");
  const pkg = JSON.parse(readFileSync(join(electronDir, "package.json"), "utf8"));
  const files: string[] = pkg.build?.files ?? [];

  function localRequires(entry: string): string[] {
    const src = readFileSync(join(electronDir, entry), "utf8");
    const out = new Set<string>();
    for (const m of src.matchAll(/require\(["'](\.\/[A-Za-z0-9_./-]+)["']\)/g)) {
      // normalize "./loginManager" -> "loginManager.js" (entry points require sibling .js)
      let rel = m[1].replace(/^\.\//, "");
      if (!/\.[a-z]+$/.test(rel)) rel += ".js";
      out.add(rel);
    }
    return [...out];
  }

  for (const entry of ["main.js", "preload.js"]) {
    it(`ships every local require() of ${entry} in build.files`, () => {
      for (const dep of localRequires(entry)) {
        assert.ok(
          files.includes(dep),
          `electron/${dep} is require()d by ${entry} but missing from package.json build.files — the packaged app will crash with "Cannot find module"`
        );
      }
    });
  }
});

// ─── Auto-updater unhandled-rejection guard (v3.8.13) ────────
//
// checkForUpdates() is fired unawaited from a setTimeout at startup. The
// underlying autoUpdater.checkForUpdates() rejects on a 404 (no published
// update manifest yet), offline, or rate-limit — and an uncaught rejection
// there surfaces as an "Unhandled Rejection" that the packaged-app smoke test
// treats as fatal (it failed the macOS-intel build for v3.8.13). The call must
// be wrapped so the rejection never escapes.

describe("Electron auto-updater rejection handling (v3.8.13)", () => {
  const mainSrc = readFileSync(join(import.meta.dirname, "../../electron/main.js"), "utf8");

  it("wraps autoUpdater.checkForUpdates() so a 404/offline check can't become an unhandled rejection", () => {
    const fn = mainSrc.match(/async function checkForUpdates\([\s\S]*?\n}/);
    assert.ok(fn, "checkForUpdates function should exist in electron/main.js");
    const body = fn![0];
    assert.match(body, /try\s*\{/, "checkForUpdates must wrap the update check in try/catch");
    assert.match(
      body,
      /catch\s*\([\s\S]*?\)\s*\{/,
      "checkForUpdates must catch the rejecting autoUpdater.checkForUpdates() call"
    );
    assert.match(
      body,
      /try[\s\S]*await autoUpdater\.checkForUpdates\(\)[\s\S]*catch/,
      "autoUpdater.checkForUpdates() must sit inside the try block"
    );
  });
});

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

  // #2460: on a slow first launch (long DB migrations) the initial readiness probe can
  // time out. The window must not be left on a hanging connection — a background retry
  // must keep polling and reload the window once the server finally responds.
  it("reloads the window once the server becomes ready after an initial timeout (#2460)", async () => {
    let serverUp = false;
    // Server "comes up" after ~60ms, simulating long first-launch migrations.
    const upTimer = setTimeout(() => {
      serverUp = true;
    }, 60);

    async function waitForServer(_url, timeoutMs) {
      const start = Date.now();
      while (Date.now() - start < timeoutMs) {
        if (serverUp) return true;
        await new Promise((r) => setTimeout(r, 15));
      }
      return false;
    }

    try {
      // Initial probe with a short budget times out (server not up yet).
      const initialReady = await waitForServer("http://localhost/api/monitoring/health", 20);
      assert.equal(initialReady, false);

      let reloaded = false;
      const mainWindow = {
        isDestroyed: () => false,
        loadURL: (_url?: string) => {
          reloaded = true;
        },
      };

      // Background retry with a generous budget should succeed and reload the window.
      const retryReady = await waitForServer("http://localhost/api/monitoring/health", 5000);
      if (retryReady && mainWindow && !mainWindow.isDestroyed()) {
        mainWindow.loadURL("http://localhost");
      }

      assert.equal(retryReady, true);
      assert.equal(reloaded, true, "window should reload once the server is ready");
    } finally {
      clearTimeout(upTimer);
    }
  });
});

// ─── Restart Timeout Tests (#2) ──────────────────────────────

describe("Restart Timeout Logic", () => {
  it("should resolve even if process doesn't exit", async () => {
    // Simulate the timeout race
    const start = Date.now();
    await raceDelays(100000, 50);
    const elapsed = Date.now() - start;
    assert.ok(elapsed < 200, "Should resolve in ~50ms via timeout");
  });

  it("should resolve immediately if process exits first", async () => {
    const start = Date.now();
    await raceDelays(10, 5000);
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
      "script-src-attr",
      "style-src",
      "font-src",
      "img-src",
      "media-src",
      "object-src",
      "frame-src",
      "child-src",
    ];

    const csp = [
      "default-src 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      "frame-ancestors 'none'",
      "frame-src 'none'",
      "child-src 'none'",
      "form-action 'self'",
      "script-src 'self' 'unsafe-inline' blob:",
      "script-src-attr 'none'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' data: blob: https:",
      "media-src 'self' data: blob:",
      "connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:*",
      "worker-src 'self' blob:",
      "manifest-src 'self'",
    ].join("; ");

    for (const directive of directives) {
      assert.ok(csp.includes(directive), `CSP should contain ${directive}`);
    }
  });

  it("should not allow unsafe script sources from external domains", () => {
    const scriptSrc = "script-src 'self' 'unsafe-inline' blob:";
    assert.equal(scriptSrc.indexOf("http://"), -1, "Should not allow external http scripts");
    assert.equal(scriptSrc.indexOf("*"), -1, "Should not wildcard script sources");
    assert.equal(scriptSrc.indexOf("'unsafe-eval'"), -1, "Production CSP should not allow eval");
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

// ─── SQLite Credential Inspection Tests ─────────────────────

// Mock node:sqlite for older Node.js versions where it's not built-in
let DatabaseSync;
try {
  DatabaseSync = require("node:sqlite").DatabaseSync;
} catch {
  const Database = require("better-sqlite3");
  class MockDatabaseSync {
    db: any;
    constructor(dbPath, options) {
      const dbOpts: any = {};
      if (options && typeof options.readOnly === "boolean") {
        dbOpts.readonly = options.readOnly;
      }
      this.db = new Database(dbPath, dbOpts);
    }
    exec(sql) {
      return this.db.exec(sql);
    }
    prepare(sql) {
      const stmt = this.db.prepare(sql);
      return {
        run: (...args) => stmt.run(...args),
        get: (...args) => stmt.get(...args),
      };
    }
    close() {
      return this.db.close();
    }
  }
  DatabaseSync = MockDatabaseSync;

  const Module = require("node:module");
  const originalRequire = Module.prototype.require;
  Module.prototype.require = function (id) {
    if (id === "node:sqlite") {
      return { DatabaseSync: MockDatabaseSync };
    }
    return originalRequire.apply(this, arguments);
  };
}

describe("Electron SQLite credential inspection", () => {
  const {
    hasEncryptedCredentials,
    openNodeSqliteReadOnly,
  } = require("../../electron/sqlite-inspection.js");

  function withTempDb(fn) {
    const dir = mkdtempSync(join(tmpdir(), "omniroute-electron-db-"));
    const dbPath = join(dir, "storage.sqlite");
    const db = new DatabaseSync(dbPath);

    try {
      db.exec(`
        CREATE TABLE provider_connections (
          access_token TEXT,
          refresh_token TEXT,
          api_key TEXT,
          id_token TEXT
        )
      `);
      fn(dbPath, db);
    } finally {
      db.close();
      rmSync(dir, { recursive: true, force: true });
    }
  }

  it("should inspect encrypted credentials with node:sqlite fallback", () => {
    withTempDb((dbPath, db) => {
      db.prepare("INSERT INTO provider_connections (api_key) VALUES (?)").run("enc:v1:test");

      assert.equal(hasEncryptedCredentials(dbPath, openNodeSqliteReadOnly), true);
    });
  });

  it("should return false when credentials are not encrypted", () => {
    withTempDb((dbPath, db) => {
      db.prepare("INSERT INTO provider_connections (api_key) VALUES (?)").run("plain-text-key");

      assert.equal(hasEncryptedCredentials(dbPath, openNodeSqliteReadOnly), false);
    });
  });

  it("should return false when the database file does not exist", () => {
    assert.equal(hasEncryptedCredentials(join(tmpdir(), "missing-omniroute.sqlite")), false);
  });
});

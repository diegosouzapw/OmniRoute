/**
 * Tests for Electron Remote Server Mode
 *
 * Covers:
 * - resolveRemoteServerUrl precedence (env > persisted prefs > null)
 * - URL validation (only http/https accepted, trailing slash stripped)
 * - Corrupt/partial prefs file handled gracefully (falls back to local server)
 * - remoteServerPreferences read/write round-trip
 * - main.js wiring: startNextServer() short-circuits in remote mode, tray
 *   menu exposes the toggle, packaging manifest ships the new files
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync, readFileSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const {
  resolveRemoteServerUrl,
  isValidHttpUrl,
} = require("../../electron/lib/resolveRemoteServerUrl");
const {
  readPreferences,
  writeRemoteServerUrl,
  writeCloseBehavior,
} = require("../../electron/lib/remoteServerPreferences");

function withTempDir(fn: (dir: string) => void) {
  const dir = mkdtempSync(join(tmpdir(), "omniroute-remote-server-"));
  try {
    fn(dir);
  } finally {
    rmSync(dir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
}

describe("resolveRemoteServerUrl precedence", () => {
  it("returns null when neither env var nor prefs file are set", () => {
    withTempDir((dir) => {
      const prefsPath = join(dir, "electron-preferences.json");
      const result = resolveRemoteServerUrl({ env: {}, prefsPath });
      assert.equal(result, null);
    });
  });

  it("prefers OMNIROUTE_REMOTE_URL env var over the persisted prefs file", () => {
    withTempDir((dir) => {
      const prefsPath = join(dir, "electron-preferences.json");
      writeRemoteServerUrl(prefsPath, "http://from-prefs:20128");

      const result = resolveRemoteServerUrl({
        env: { OMNIROUTE_REMOTE_URL: "http://from-env:20128" },
        prefsPath,
      });
      assert.equal(result, "http://from-env:20128");
    });
  });

  it("falls back to the persisted prefs file when no env var is set", () => {
    withTempDir((dir) => {
      const prefsPath = join(dir, "electron-preferences.json");
      writeRemoteServerUrl(prefsPath, "http://localhost:20128");

      const result = resolveRemoteServerUrl({ env: {}, prefsPath });
      assert.equal(result, "http://localhost:20128");
    });
  });

  it("strips a trailing slash from the resolved URL", () => {
    withTempDir((dir) => {
      const prefsPath = join(dir, "electron-preferences.json");
      const result = resolveRemoteServerUrl({
        env: { OMNIROUTE_REMOTE_URL: "http://localhost:20128/" },
        prefsPath,
      });
      assert.equal(result, "http://localhost:20128");
    });
  });

  it("rejects a non-http(s) URL (e.g. file:// or javascript:) and returns null", () => {
    withTempDir((dir) => {
      const prefsPath = join(dir, "electron-preferences.json");
      for (const bad of ["file:///etc/passwd", "javascript:alert(1)", "not a url", ""]) {
        const result = resolveRemoteServerUrl({ env: { OMNIROUTE_REMOTE_URL: bad }, prefsPath });
        assert.equal(result, null, `expected null for ${JSON.stringify(bad)}`);
      }
    });
  });

  it("ignores a corrupt prefs file and falls back to null rather than throwing", () => {
    withTempDir((dir) => {
      const prefsPath = join(dir, "electron-preferences.json");
      require("node:fs").writeFileSync(prefsPath, "{ not valid json", "utf8");

      const result = resolveRemoteServerUrl({ env: {}, prefsPath });
      assert.equal(result, null);
    });
  });

  it("treats a missing prefs file as absent rather than throwing", () => {
    withTempDir((dir) => {
      const prefsPath = join(dir, "does-not-exist.json");
      assert.doesNotThrow(() => resolveRemoteServerUrl({ env: {}, prefsPath }));
    });
  });
});

describe("isValidHttpUrl", () => {
  it("accepts http and https", () => {
    assert.equal(isValidHttpUrl("http://localhost:20128"), true);
    assert.equal(isValidHttpUrl("https://omniroute.example.com"), true);
  });

  it("rejects other protocols and invalid strings", () => {
    assert.equal(isValidHttpUrl("ftp://example.com"), false);
    assert.equal(isValidHttpUrl("file:///etc/passwd"), false);
    assert.equal(isValidHttpUrl("javascript:alert(1)"), false);
    assert.equal(isValidHttpUrl("not a url"), false);
  });
});

describe("remoteServerPreferences read/write", () => {
  it("round-trips a URL through write then read", () => {
    withTempDir((dir) => {
      const prefsPath = join(dir, "electron-preferences.json");
      writeRemoteServerUrl(prefsPath, "http://localhost:20128");
      assert.deepEqual(readPreferences(prefsPath), {
        remoteServerUrl: "http://localhost:20128",
        closeBehavior: "keep-loaded",
      });
    });
  });

  it("clearing with null removes the preference", () => {
    withTempDir((dir) => {
      const prefsPath = join(dir, "electron-preferences.json");
      writeRemoteServerUrl(prefsPath, "http://localhost:20128");
      writeRemoteServerUrl(prefsPath, null);
      assert.deepEqual(readPreferences(prefsPath), {
        remoteServerUrl: null,
        closeBehavior: "keep-loaded",
      });
    });
  });

  it("creates the parent directory if it does not exist yet", () => {
    withTempDir((dir) => {
      const prefsPath = join(dir, "nested", "deep", "electron-preferences.json");
      assert.doesNotThrow(() => writeRemoteServerUrl(prefsPath, "http://localhost:20128"));
      assert.equal(existsSync(prefsPath), true);
      assert.deepEqual(readPreferences(prefsPath), {
        remoteServerUrl: "http://localhost:20128",
        closeBehavior: "keep-loaded",
      });
    });
  });

  it("reading a nonexistent prefs file returns remoteServerUrl: null", () => {
    withTempDir((dir) => {
      const prefsPath = join(dir, "electron-preferences.json");
      assert.deepEqual(readPreferences(prefsPath), {
        remoteServerUrl: null,
        closeBehavior: "keep-loaded",
      });
    });
  });

  it("persists close behavior without discarding the remote server URL", () => {
    withTempDir((dir) => {
      const prefsPath = join(dir, "electron-preferences.json");
      writeRemoteServerUrl(prefsPath, "https://omniroute.example.com");
      writeCloseBehavior(prefsPath, "unload");
      assert.deepEqual(readPreferences(prefsPath), {
        remoteServerUrl: "https://omniroute.example.com",
        closeBehavior: "unload",
      });
    });
  });
});

// ─── main.js wiring (static-analysis style, matching the repo's existing
// convention for asserting structure without importing the Electron binary) ───

describe("Electron main.js Remote Server Mode wiring", () => {
  const mainSrc = readFileSync(join(import.meta.dirname, "../../electron/main.js"), "utf8");

  it("startNextServer() short-circuits before the isDev branch when remoteServerUrl is set", () => {
    const fn = mainSrc.match(/function startNextServer\(\)[\s\S]*?\n}/);
    assert.ok(fn, "startNextServer function should exist in electron/main.js");
    const body = fn![0];
    const remoteIdx = body.indexOf("if (remoteServerUrl)");
    const devIdx = body.indexOf("if (isDev)");
    assert.ok(remoteIdx !== -1, "startNextServer must check remoteServerUrl");
    assert.ok(devIdx !== -1, "startNextServer must still check isDev");
    assert.ok(remoteIdx < devIdx, "the remoteServerUrl check must come before the isDev check");
  });

  it("getServerUrl() prefers remoteServerUrl over the local port", () => {
    assert.match(
      mainSrc,
      /const getServerUrl = \(\) => remoteServerUrl \|\| `http:\/\/localhost:\$\{serverPort\}`;/
    );
  });

  it("exposes a tray menu entry to configure or clear the remote server", () => {
    assert.match(mainSrc, /label: "Remote Server"/);
    assert.match(mainSrc, /Connect to Remote Server/);
    assert.match(mainSrc, /Disconnect \(use Local Server\)/);
  });

  it("the remote-server prompt window uses contextIsolation and disables nodeIntegration", () => {
    const fn = mainSrc.match(/function showRemoteServerPrompt\(\)[\s\S]*?\n}/);
    assert.ok(fn, "showRemoteServerPrompt function should exist");
    const body = fn![0];
    assert.match(body, /contextIsolation:\s*true/);
    assert.match(body, /nodeIntegration:\s*false/);
  });

  // setRemoteServerUrl() is the runtime, UI-driven path (tray prompt / IPC) for
  // applying an operator-supplied URL — distinct from resolveRemoteServerUrl()'s
  // startup precedence, which is already covered above. A URL typed into the
  // "Connect to Remote Server…" prompt must go through the same isValidHttpUrl
  // guard (only http/https accepted) *before* any server-lifecycle mutation, so
  // an arbitrary/malicious string (file://, javascript:, garbage) can never reach
  // stopNextServer()/startNextServer() or get persisted to prefs. Exercised via
  // static analysis (matching this file's convention) since setRemoteServerUrl
  // requires the full Electron main process to invoke directly.
  it("setRemoteServerUrl() validates via isValidHttpUrl and rejects before mutating server state", () => {
    const fn = mainSrc.match(/async function setRemoteServerUrl\(nextUrl\)[\s\S]*?\n}/);
    assert.ok(fn, "setRemoteServerUrl function should exist in electron/main.js");
    const body = fn![0];

    const validationIdx = body.indexOf("isValidHttpUrl(normalized)");
    const stopServerIdx = body.indexOf("stopNextServer()");
    assert.ok(validationIdx !== -1, "setRemoteServerUrl must validate via isValidHttpUrl");
    assert.ok(
      stopServerIdx !== -1,
      "setRemoteServerUrl must stop the running server when switching modes"
    );
    assert.ok(
      validationIdx < stopServerIdx,
      "URL validation must run before any server-lifecycle mutation"
    );

    const rejectBranch = body.slice(validationIdx, stopServerIdx);
    assert.match(
      rejectBranch,
      /return;/,
      "an invalid URL must short-circuit setRemoteServerUrl instead of falling through"
    );
    assert.match(
      rejectBranch,
      /console\.warn/,
      "an invalid URL should be logged so operators can see it was rejected"
    );
  });
});

describe("Electron packaging manifest includes Remote Server Mode files", () => {
  const pkg = JSON.parse(
    readFileSync(join(import.meta.dirname, "../../electron/package.json"), "utf8")
  );
  const files: string[] = pkg.build?.files ?? [];

  for (const expected of [
    "lib/resolveRemoteServerUrl.js",
    "lib/remoteServerPreferences.js",
    "lib/windowClosePolicy.js",
    "remoteServerPromptPreload.js",
    "remoteServerPromptRenderer.js",
    "assets/remoteServerPrompt.html",
  ]) {
    it(`ships ${expected} in package.json build.files`, () => {
      assert.ok(files.includes(expected), `${expected} is missing from build.files`);
    });
  }
});

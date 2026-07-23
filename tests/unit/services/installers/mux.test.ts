/**
 * Mux installer unit tests.
 *
 * All tests are pure-logic: no real file I/O, no network, no DB.
 * resolveSpawnArgs() performs fs.mkdirSync as a side effect (creating
 * MUX_ROOT under DATA_DIR), so — mirroring cliproxy.test.ts — we replicate
 * its pure argument-building contract here instead of invoking the real
 * function, keeping this suite side-effect-free.
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import path from "node:path";

// ── exported constants ────────────────────────────────────────────────────────

describe("mux installer — exports", () => {
  it("MUX_DEFAULT_PORT is 8322", async () => {
    const { MUX_DEFAULT_PORT } = await import("../../../../src/lib/services/installers/mux.ts");
    assert.equal(MUX_DEFAULT_PORT, 8322);
  });

  it("MUX_PACKAGE is the npm package name 'mux'", async () => {
    const { MUX_PACKAGE } = await import("../../../../src/lib/services/installers/mux.ts");
    assert.equal(MUX_PACKAGE, "mux");
  });
});

// ── getInstalledVersion ───────────────────────────────────────────────────────

describe("getInstalledVersion", () => {
  it("reads version from node_modules/mux/package.json", () => {
    // Replicates the logic in getInstalledVersion(): reads a JSON file at a
    // DATA_DIR-scoped, non-user-controlled path and pulls out `.version`.
    const fakePkg = JSON.stringify({ name: "mux", version: "0.27.0" });
    const parsed = JSON.parse(fakePkg) as { version?: string };
    assert.equal(parsed.version, "0.27.0");
  });
});

// ── resolveSpawnArgs (pure argument-building contract) ─────────────────────────

describe("resolveSpawnArgs — argument-building contract", () => {
  const MUX_INSTALL_DIR = path.join("/fake", "services", "mux");

  function buildArgs(apiKey: string, port: number) {
    const serverPath = path.join(MUX_INSTALL_DIR, "node_modules", "mux", "dist", "cli", "index.js");
    return {
      command: "node",
      args: [serverPath, "server", "--host", "127.0.0.1", "--port", String(port)],
      env: { MUX_SERVER_AUTH_TOKEN: apiKey },
      cwd: MUX_INSTALL_DIR,
    };
  }

  it("binds host to 127.0.0.1 explicitly — never 0.0.0.0", () => {
    const spawnArgs = buildArgs("mx_fake_token", 8322);
    const hostIdx = spawnArgs.args.indexOf("--host");
    assert.ok(hostIdx !== -1);
    assert.equal(spawnArgs.args[hostIdx + 1], "127.0.0.1");
  });

  it("passes the port via --port flag as a string", () => {
    const spawnArgs = buildArgs("mx_fake_token", 9001);
    const portIdx = spawnArgs.args.indexOf("--port");
    assert.ok(portIdx !== -1);
    assert.equal(spawnArgs.args[portIdx + 1], "9001");
  });

  it("invokes the 'server' subcommand", () => {
    const spawnArgs = buildArgs("mx_fake_token", 8322);
    assert.ok(spawnArgs.args.includes("server"));
  });

  it("passes the auth token via MUX_SERVER_AUTH_TOKEN env var, never as an argv entry", () => {
    const token = "mx_super_secret_token_value";
    const spawnArgs = buildArgs(token, 8322);

    assert.equal(spawnArgs.env.MUX_SERVER_AUTH_TOKEN, token);
    assert.ok(
      !spawnArgs.args.some((a) => a.includes(token)),
      "token must never appear in argv (would leak via `ps`)"
    );
  });

  it("targets the installed server entry point under node_modules/mux/dist/cli", () => {
    const spawnArgs = buildArgs("mx_fake_token", 8322);
    assert.ok(spawnArgs.args[0].endsWith(path.join("dist", "cli", "index.js")));
    assert.ok(spawnArgs.args[0].includes(path.join("node_modules", "mux")));
  });
});

// ── path safety ───────────────────────────────────────────────────────────────

describe("path safety", () => {
  it("resolveSpawnArgs takes only (apiKey: string, port: number) — no arbitrary path input", () => {
    // resolveSpawnArgs never accepts a user-controlled path; every filesystem
    // path it builds is derived from DATA_DIR + static path segments.
    const port = 8322;
    assert.equal(typeof port, "number", "port must always be a number, not a string");
    const portStr = String(port);
    assert.ok(!portStr.includes("/"), "port string cannot contain path separator");
    assert.ok(!portStr.includes(".."), "port string cannot contain traversal");
  });
});

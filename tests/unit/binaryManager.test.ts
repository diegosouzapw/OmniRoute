import { describe, it, afterEach, after, mock } from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import fs from "node:fs";
import os from "node:os";

const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-binmgr-test-"));
const originalDataDir = process.env.DATA_DIR;
process.env.DATA_DIR = tmpDir;

afterEach(() => {
  const binDir = path.join(tmpDir, "bin");
  try {
    if (fs.existsSync(binDir))
      fs.rmSync(binDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  } catch {}
});

after(() => {
  process.env.DATA_DIR = originalDataDir;
  if (fs.existsSync(tmpDir))
    fs.rmSync(tmpDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

describe("binaryManager", () => {
  let mod;
  it("should load module", async () => {
    mod = await import("../../src/lib/versionManager/binaryManager.ts");
    assert.ok(mod.getAssetName);
    assert.ok(mod.getTargetPlatform);
    assert.ok(mod.downloadRelease);
    assert.ok(mod.installVersion);
    assert.ok(mod.getCurrentBinaryPath);
    assert.ok(mod.getInstalledVersions);
    assert.ok(mod.rollbackVersion);
    assert.ok(mod.removeVersion);
  });

  describe("getAssetName", () => {
    it("should return .tar.gz for linux", () => {
      assert.equal(mod.getAssetName("linux", "amd64"), "CLIProxyAPI_{version}_linux_amd64.tar.gz");
    });

    it("should return .tar.gz for darwin", () => {
      assert.equal(
        mod.getAssetName("darwin", "arm64"),
        "CLIProxyAPI_{version}_darwin_arm64.tar.gz"
      );
    });

    it("should return .zip for windows", () => {
      assert.equal(mod.getAssetName("windows", "amd64"), "CLIProxyAPI_{version}_windows_amd64.zip");
    });

    it("should return .tar.gz for freebsd", () => {
      assert.equal(
        mod.getAssetName("freebsd", "amd64"),
        "CLIProxyAPI_{version}_freebsd_amd64.tar.gz"
      );
    });
  });

  describe("getTargetPlatform", () => {
    it("should return current platform", () => {
      const { platform, arch } = mod.getTargetPlatform();
      assert.ok(["linux", "darwin", "windows"].includes(platform));
      assert.ok(["amd64", "arm64"].includes(arch));
    });

    it("should read platform/arch at runtime from os (anti build-folding guard) (#10244)", () => {
      // Regression guard for #10244/#10293: detectPlatform/detectArch must read
      // os.platform()/os.arch() at call time, NOT the build-machine foldable
      // process.platform/process.arch constants. Turbopack `next build` running
      // on Linux constant-folds `process.platform` and prunes every Windows/arm64
      // branch from the published npm artifact. Simulate a Windows arm64 host via
      // the runtime os.* functions; the Windows/arm64 branch must be reachable.
      const platformMock = mock.method(os, "platform", () => "win32");
      const archMock = mock.method(os, "arch", () => "arm64");
      try {
        assert.deepEqual(mod.getTargetPlatform(), { platform: "windows", arch: "arm64" });
        assert.equal(mod.getAssetName(), "CLIProxyAPI_{version}_windows_arm64.zip");
      } finally {
        platformMock.mock.restore();
        archMock.mock.restore();
      }
    });
  });

  describe("getCurrentBinaryPath", () => {
    it("should return null when no symlink", async () => {
      assert.equal(await mod.getCurrentBinaryPath(tmpDir), null);
    });

    it("should return null when symlink target missing", async () => {
      const binDir = path.join(tmpDir, "bin");
      fs.mkdirSync(binDir, { recursive: true });
      fs.symlinkSync("/nonexistent/binary", path.join(binDir, "cliproxyapi"));
      assert.equal(await mod.getCurrentBinaryPath(tmpDir), null);
    });

    it("should return real path when valid symlink", async () => {
      const binDir = path.join(tmpDir, "bin");
      fs.mkdirSync(binDir, { recursive: true });
      const real = path.join(binDir, "cliproxyapi-1.0.0", "cli-proxy-api");
      fs.mkdirSync(path.dirname(real), { recursive: true });
      fs.writeFileSync(real, "bin");
      fs.symlinkSync(real, path.join(binDir, "cliproxyapi"));
      const result = await mod.getCurrentBinaryPath(tmpDir);
      assert.ok(result.includes("cliproxyapi-1.0.0"));
    });
  });

  describe("getInstalledVersions", () => {
    it("should return empty when no versions", async () => {
      assert.deepEqual(await mod.getInstalledVersions(tmpDir), []);
    });

    it("should list version directories", async () => {
      const binDir = path.join(tmpDir, "bin");
      fs.mkdirSync(path.join(binDir, "cliproxyapi-1.0.0"), { recursive: true });
      fs.mkdirSync(path.join(binDir, "cliproxyapi-2.0.0"), { recursive: true });
      fs.mkdirSync(path.join(binDir, "other-dir"), { recursive: true });
      fs.writeFileSync(path.join(binDir, "file.txt"), "data");
      const versions = await mod.getInstalledVersions(tmpDir);
      assert.equal(versions.length, 2);
      assert.ok(versions.includes("1.0.0"));
      assert.ok(versions.includes("2.0.0"));
    });
  });

  describe("rollbackVersion", () => {
    it("should return null when < 2 versions", async () => {
      const binDir = path.join(tmpDir, "bin");
      fs.mkdirSync(path.join(binDir, "cliproxyapi-1.0.0"), { recursive: true });
      assert.equal(await mod.rollbackVersion(tmpDir), null);
    });

    it("should return null when no versions", async () => {
      assert.equal(await mod.rollbackVersion(tmpDir), null);
    });

    it("should rollback to previous version (sorted desc)", async () => {
      const binDir = path.join(tmpDir, "bin");
      for (const ver of ["1.0.0", "2.0.0"]) {
        const vDir = path.join(binDir, `cliproxyapi-${ver}`);
        fs.mkdirSync(vDir, { recursive: true });
        fs.writeFileSync(path.join(vDir, "cli-proxy-api"), `bin-${ver}`);
      }
      fs.symlinkSync(
        path.join(binDir, "cliproxyapi-2.0.0", "cli-proxy-api"),
        path.join(binDir, "cliproxyapi")
      );
      const result = await mod.rollbackVersion(tmpDir);
      // Previous = second highest = 1.0.0
      assert.equal(result, "1.0.0");
      if (process.platform === "win32") {
        assert.equal(fs.readFileSync(path.join(binDir, "cliproxyapi"), "utf8"), "bin-1.0.0");
      } else {
        const real = fs.realpathSync(path.join(binDir, "cliproxyapi"));
        assert.ok(real.includes("1.0.0"));
      }
    });

    it("should use the runtime Windows path for extraction, install, and rollback", async () => {
      const binDir = path.join(tmpDir, "bin");
      const fakePowerShellDir = path.join(tmpDir, "fake-powershell");
      const extractedDir = path.join(binDir, "cliproxyapi-1.0.0");
      const commandLog = path.join(tmpDir, "powershell-command.txt");
      const originalPath = process.env.PATH;
      const originalFetch = globalThis.fetch;

      fs.mkdirSync(fakePowerShellDir, { recursive: true });
      fs.writeFileSync(
        path.join(fakePowerShellDir, "powershell"),
        '#!/bin/sh\nprintf \'%s\\n\' "$@" > "$OMNI_TEST_COMMAND_LOG"\n' +
          'mkdir -p "$OMNI_TEST_EXTRACT_DIR"\nprintf \'installed-binary\' > "$OMNI_TEST_EXTRACT_DIR/cli-proxy-api"\n'
      );
      fs.chmodSync(path.join(fakePowerShellDir, "powershell"), 0o755);
      process.env.PATH = `${fakePowerShellDir}:${originalPath || ""}`;
      process.env.OMNI_TEST_COMMAND_LOG = commandLog;
      process.env.OMNI_TEST_EXTRACT_DIR = extractedDir;

      globalThis.fetch = async (input: string | URL | Request) => {
        const url = String(input);
        if (url.includes("/releases/tags/")) {
          return new Response(
            JSON.stringify({
              tag_name: "v1.0.0",
              published_at: "2026-01-01T00:00:00Z",
              assets: [
                {
                  name: "CLIProxyAPI_1.0.0_windows_amd64.zip",
                  browser_download_url: "https://example.test/cliproxy.zip",
                  size: 3,
                },
              ],
            }),
            { status: 200, headers: { "content-type": "application/json" } }
          );
        }
        if (url.endsWith("checksums.txt")) return new Response("", { status: 404 });
        return new Response("zip", { status: 200 });
      };

      const platformMock = mock.method(os, "platform", () => "win32");
      const archMock = mock.method(os, "arch", () => "x64");
      try {
        const installedPath = await mod.installVersion("1.0.0", tmpDir);
        assert.equal(fs.readFileSync(installedPath, "utf8"), "installed-binary");
        assert.equal(fs.lstatSync(installedPath).isSymbolicLink(), false);

        const command = fs.readFileSync(commandLog, "utf8");
        assert.match(command, /Expand-Archive -LiteralPath/);
        assert.doesNotMatch(command, /unzip/);

        const previousDir = path.join(binDir, "cliproxyapi-0.9.0");
        fs.mkdirSync(previousDir, { recursive: true });
        fs.writeFileSync(path.join(previousDir, "cli-proxy-api"), "rollback-binary");
        assert.equal(await mod.rollbackVersion(tmpDir), "0.9.0");
        assert.equal(fs.readFileSync(installedPath, "utf8"), "rollback-binary");
        assert.equal(fs.lstatSync(installedPath).isSymbolicLink(), false);
      } finally {
        platformMock.mock.restore();
        archMock.mock.restore();
        globalThis.fetch = originalFetch;
        process.env.PATH = originalPath;
        delete process.env.OMNI_TEST_COMMAND_LOG;
        delete process.env.OMNI_TEST_EXTRACT_DIR;
      }
    });

    it("writes the Windows rollback artifact at the CLIProxy spawn path", async () => {
      const originalPlatformDescriptor = Object.getOwnPropertyDescriptor(process, "platform");
      Object.defineProperty(process, "platform", { value: "win32", configurable: true });

      try {
        const binDir = path.join(tmpDir, "bin");
        for (const ver of ["1.0.0", "2.0.0"]) {
          const versionDir = path.join(binDir, `cliproxyapi-${ver}`);
          fs.mkdirSync(versionDir, { recursive: true });
          fs.writeFileSync(path.join(versionDir, "cli-proxy-api"), `bin-${ver}`);
        }

        assert.equal(await mod.rollbackVersion(tmpDir), "1.0.0");
        const { resolveSpawnArgs } = await import("../../src/lib/services/installers/cliproxy.ts");
        const spawn = resolveSpawnArgs(8317);

        assert.equal(spawn.command, path.join(binDir, "cliproxyapi.exe"));
        assert.equal(fs.existsSync(spawn.command), true);
        assert.equal(await mod.getCurrentBinaryPath(tmpDir), spawn.command);
      } finally {
        if (originalPlatformDescriptor) {
          Object.defineProperty(process, "platform", originalPlatformDescriptor);
        }
      }
    });
  });

  describe("downloadRelease platform parameter threading (#10244/#10293)", () => {
    it("uses an explicitly-passed Windows target without reading os.platform() at all", async () => {
      // Closing-fix regression guard: unlike the os.platform()/os.arch() mock-based
      // tests above (which prove the single top-level detection reaches the right
      // place, but would still pass even if extractZip re-read os.platform() itself
      // since the mock is global), this test proves the actual PARAMETER THREADING:
      // downloadRelease() is called with an explicit `target` and os.platform()/
      // os.arch() are NOT mocked at all — the real test host is Linux/darwin/etc.
      // If downloadRelease or extractZip ever regressed to independently re-reading
      // os.platform() instead of using the threaded `platform` value, this would
      // resolve to the host's real (non-Windows) platform, `unzip` would run against
      // a fake zip body, and the test would fail.
      const binDir = path.join(tmpDir, "bin-param-thread");
      const extractedDir = path.join(binDir, "cliproxyapi-1.0.0");
      const fakePowerShellDir = path.join(tmpDir, "fake-powershell-param-thread");
      const commandLog = path.join(tmpDir, "powershell-command-param-thread.txt");
      const originalPath = process.env.PATH;
      const originalFetch = globalThis.fetch;

      fs.mkdirSync(fakePowerShellDir, { recursive: true });
      fs.writeFileSync(
        path.join(fakePowerShellDir, "powershell"),
        '#!/bin/sh\nprintf \'%s\\n\' "$@" > "$OMNI_TEST_COMMAND_LOG_PT"\n' +
          'mkdir -p "$OMNI_TEST_EXTRACT_DIR_PT"\nprintf \'installed-binary\' > "$OMNI_TEST_EXTRACT_DIR_PT/cli-proxy-api"\n'
      );
      fs.chmodSync(path.join(fakePowerShellDir, "powershell"), 0o755);
      process.env.PATH = `${fakePowerShellDir}:${originalPath || ""}`;
      process.env.OMNI_TEST_COMMAND_LOG_PT = commandLog;
      process.env.OMNI_TEST_EXTRACT_DIR_PT = extractedDir;

      globalThis.fetch = async (input: string | URL | Request) => {
        const url = String(input);
        if (url.includes("/releases/tags/")) {
          return new Response(
            JSON.stringify({
              tag_name: "v1.0.0",
              published_at: "2026-01-01T00:00:00Z",
              assets: [
                {
                  name: "CLIProxyAPI_1.0.0_windows_amd64.zip",
                  browser_download_url: "https://example.test/cliproxy.zip",
                  size: 3,
                },
              ],
            }),
            { status: 200, headers: { "content-type": "application/json" } }
          );
        }
        if (url.endsWith("checksums.txt")) return new Response("", { status: 404 });
        return new Response("zip", { status: 200 });
      };

      try {
        const binary = await mod.downloadRelease("1.0.0", binDir, undefined, {
          platform: "windows",
          arch: "amd64",
        });
        assert.equal(fs.readFileSync(binary, "utf8"), "installed-binary");

        const command = fs.readFileSync(commandLog, "utf8");
        assert.match(command, /Expand-Archive -LiteralPath/);
        assert.doesNotMatch(command, /unzip/);
      } finally {
        globalThis.fetch = originalFetch;
        process.env.PATH = originalPath;
        delete process.env.OMNI_TEST_COMMAND_LOG_PT;
        delete process.env.OMNI_TEST_EXTRACT_DIR_PT;
      }
    });
  });

  describe("removeVersion", () => {
    it("should remove version directory", async () => {
      const binDir = path.join(tmpDir, "bin");
      const vDir = path.join(binDir, "cliproxyapi-1.0.0");
      fs.mkdirSync(vDir, { recursive: true });
      fs.writeFileSync(path.join(vDir, "f.txt"), "d");
      assert.equal(await mod.removeVersion("1.0.0", tmpDir), true);
      assert.equal(fs.existsSync(vDir), false);
    });

    it("should return true even for non-existent version (rm force)", async () => {
      // fs.rm with { force: true } succeeds even if path doesn't exist
      const result = await mod.removeVersion("999.0.0", tmpDir);
      assert.equal(result, true);
    });
  });
});

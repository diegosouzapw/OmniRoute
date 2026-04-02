import { describe, it, afterEach, after } from "node:test";
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
    if (fs.existsSync(binDir)) fs.rmSync(binDir, { recursive: true, force: true });
  } catch {}
});

after(() => {
  process.env.DATA_DIR = originalDataDir;
  if (fs.existsSync(tmpDir)) fs.rmSync(tmpDir, { recursive: true, force: true });
});

describe("binaryManager", () => {
  let mod;
  it("should load module", async () => {
    mod = await import("../../src/lib/versionManager/binaryManager.ts");
    assert.ok(mod.getAssetName);
    assert.ok(mod.getTargetPlatform);
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
      const real = fs.realpathSync(path.join(binDir, "cliproxyapi"));
      assert.ok(real.includes("1.0.0"));
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

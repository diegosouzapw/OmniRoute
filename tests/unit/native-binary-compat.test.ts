import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

import {
  detectNativeBinaryTarget,
  isNativeBinaryCompatible,
} from "../../scripts/native-binary-compat.mjs";

function makeElfBinary(machine) {
  const buffer = Buffer.alloc(64);
  buffer[0] = 0x7f;
  buffer[1] = 0x45;
  buffer[2] = 0x4c;
  buffer[3] = 0x46;
  buffer[4] = 2;
  buffer[5] = 1;
  buffer.writeUInt16LE(machine, 18);
  return buffer;
}

function makeMachBinary(cpuType) {
  const buffer = Buffer.alloc(32);
  buffer.writeUInt32BE(0xcffaedfe, 0);
  buffer.writeUInt32LE(cpuType, 4);
  return buffer;
}

function makePeBinary(machine) {
  const buffer = Buffer.alloc(160);
  buffer[0] = 0x4d;
  buffer[1] = 0x5a;
  buffer.writeUInt32LE(0x80, 0x3c);
  buffer.write("PE\0\0", 0x80, "ascii");
  buffer.writeUInt16LE(machine, 0x84);
  return buffer;
}

describe("detectNativeBinaryTarget", () => {
  it("detects linux x64 ELF binaries", () => {
    assert.deepEqual(detectNativeBinaryTarget(makeElfBinary(62)), {
      platform: "linux",
      architectures: ["x64"],
    });
  });

  it("detects darwin arm64 Mach-O binaries", () => {
    assert.deepEqual(detectNativeBinaryTarget(makeMachBinary(0x0100000c)), {
      platform: "darwin",
      architectures: ["arm64"],
    });
  });

  it("detects win32 x64 PE binaries", () => {
    assert.deepEqual(detectNativeBinaryTarget(makePeBinary(0x8664)), {
      platform: "win32",
      architectures: ["x64"],
    });
  });
});

describe("isNativeBinaryCompatible", () => {
  function withTempBinary(buffer, callback) {
    const dir = mkdtempSync(join(tmpdir(), "omniroute-native-"));
    const file = join(dir, "better_sqlite3.node");
    writeFileSync(file, buffer);

    try {
      callback(file);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  }

  it("accepts linux-x64 binaries when the target matches and dlopen succeeds", () => {
    withTempBinary(makeElfBinary(62), (binaryPath) => {
      assert.equal(
        isNativeBinaryCompatible(binaryPath, {
          runtimePlatform: "linux",
          runtimeArch: "x64",
          dlopen() {},
        }),
        true
      );
    });
  });

  it("rejects linux-x64 binaries when dlopen fails on the same platform", () => {
    withTempBinary(makeElfBinary(62), (binaryPath) => {
      assert.equal(
        isNativeBinaryCompatible(binaryPath, {
          runtimePlatform: "linux",
          runtimeArch: "x64",
          dlopen() {
            throw new Error("abi mismatch");
          },
        }),
        false
      );
    });
  });

  it("rejects macOS false positives for bundled linux binaries", () => {
    withTempBinary(makeElfBinary(62), (binaryPath) => {
      assert.equal(
        isNativeBinaryCompatible(binaryPath, {
          runtimePlatform: "darwin",
          runtimeArch: "arm64",
          dlopen() {},
        }),
        false
      );
    });
  });

  it("rejects Windows false positives for bundled linux binaries", () => {
    withTempBinary(makeElfBinary(62), (binaryPath) => {
      assert.equal(
        isNativeBinaryCompatible(binaryPath, {
          runtimePlatform: "win32",
          runtimeArch: "x64",
          dlopen() {},
        }),
        false
      );
    });
  });

  it("accepts copied darwin binaries after postinstall replacement", () => {
    withTempBinary(makeMachBinary(0x0100000c), (binaryPath) => {
      assert.equal(
        isNativeBinaryCompatible(binaryPath, {
          runtimePlatform: "darwin",
          runtimeArch: "arm64",
          dlopen() {},
        }),
        true
      );
    });
  });
});

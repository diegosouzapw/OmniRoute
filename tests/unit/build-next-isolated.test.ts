import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import fsSync from "node:fs";
import os from "node:os";
import path from "node:path";

const { movePath, resolveNextBuildEnv } = await import("../../scripts/build-next-isolated.mjs");

async function withTempDir(fn) {
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "omniroute-build-next-isolated-"));

  try {
    await fn(tempDir);
  } finally {
    await fs.rm(tempDir, { recursive: true, force: true });
  }
}

test("movePath falls back to copy/remove when rename raises EXDEV", async () => {
  await withTempDir(async (tempDir) => {
    const sourceDir = path.join(tempDir, "app");
    const destinationDir = path.join(tempDir, ".app-build-backup");
    const nestedFile = path.join(sourceDir, "nested", "file.txt");

    await fs.mkdir(path.dirname(nestedFile), { recursive: true });
    await fs.writeFile(nestedFile, "legacy payload");

    let copyCalled = false;
    let removeCalled = false;
    const warnings = [];
    const originalWarn = console.warn;
    console.warn = (message) => warnings.push(String(message));

    try {
      await movePath(sourceDir, destinationDir, {
        rename: async () => {
          const error = new Error("cross-device link not permitted");
          error.code = "EXDEV";
          throw error;
        },
        cp: async (...args) => {
          copyCalled = true;
          return fs.cp(...args);
        },
        rm: async (...args) => {
          removeCalled = true;
          return fs.rm(...args);
        },
      });
    } finally {
      console.warn = originalWarn;
    }

    assert.equal(copyCalled, true);
    assert.equal(removeCalled, true);
    assert.equal(fsSync.existsSync(sourceDir), false);
    assert.equal(
      await fs.readFile(path.join(destinationDir, "nested", "file.txt"), "utf8"),
      "legacy payload"
    );
    assert.match(warnings[0] ?? "", /EXDEV while moving/);
  });
});

test("movePath rethrows non-EXDEV rename failures", async () => {
  await withTempDir(async (tempDir) => {
    const sourceDir = path.join(tempDir, "app");
    const destinationDir = path.join(tempDir, ".app-build-backup");

    await fs.mkdir(sourceDir, { recursive: true });

    await assert.rejects(
      movePath(sourceDir, destinationDir, {
        rename: async () => {
          const error = new Error("permission denied");
          error.code = "EACCES";
          throw error;
        },
        cp: async () => {
          throw new Error("copy fallback should not run");
        },
        rm: async () => {
          throw new Error("remove fallback should not run");
        },
      }),
      (error) => error?.code === "EACCES"
    );
  });
});

test("resolveNextBuildEnv forces stable build worker mode unless already provided", () => {
  const defaultEnv = resolveNextBuildEnv({ NODE_ENV: "test" });
  assert.equal(defaultEnv.NEXT_PRIVATE_BUILD_WORKER, "0");
  assert.equal(defaultEnv.NODE_ENV, "test");

  const preservedEnv = resolveNextBuildEnv({
    NODE_ENV: "production",
    NEXT_PRIVATE_BUILD_WORKER: "1",
  });
  assert.equal(preservedEnv.NEXT_PRIVATE_BUILD_WORKER, "1");
  assert.equal(preservedEnv.NODE_ENV, "production");
});

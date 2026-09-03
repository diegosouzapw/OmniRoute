import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import fsSync from "node:fs";
import os from "node:os";
import path from "node:path";
import {
  getTransientBuildPaths,
  movePath,
  pruneStandaloneArtifacts,
  resolveNextBuildEnv,
  syncStandaloneExtraModules,
  syncStandaloneNativeAssets,
} from "../../../scripts/build/build-next-isolated.mjs";

async function withTempDir(fn) {
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "omniroute-build-next-isolated-"));

  try {
    await fn(tempDir);
  } finally {
    await fs.rm(tempDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
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
          const error = Object.assign(new Error("permission denied"), { code: "EACCES" });
          throw error;
        },
        cp: async () => {
          throw new Error("copy fallback should not run");
        },
        rm: async () => {
          throw new Error("remove fallback should not run");
        },
      }),
      (error) => error instanceof Error && "code" in error && error.code === "EACCES"
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

// Escalated bug (WhatsApp BR, cmqiuhd7600): a local `npm run build` stalls/OOMs
// during the webpack production pass ("Compiling instrumentation" bundles the whole
// server graph). #4076/#4104 raised the heap only in the Docker builder stage; the
// local/native path (build-next-isolated.mjs → resolveNextBuildEnv) was left on V8's
// default ~2 GB ceiling, so memory-constrained npm-global installs hit the same OOM.
test("resolveNextBuildEnv raises the Node heap for memory-constrained local builds", () => {
  const env = resolveNextBuildEnv({ NODE_ENV: "production" });
  const match = (env.NODE_OPTIONS ?? "").match(/--max-old-space-size=(\d+)/);
  assert.ok(
    match,
    "local build must set NODE_OPTIONS --max-old-space-size to avoid the webpack-pass OOM"
  );
  assert.ok(
    Number(match[1]) >= 4096,
    `build heap default must be >= 4096 MB (the V8 default ~2 GB OOMed); got ${match[1]}`
  );
});

test("resolveNextBuildEnv does not clobber an existing --max-old-space-size (Docker)", () => {
  const env = resolveNextBuildEnv({ NODE_OPTIONS: "--max-old-space-size=8192" });
  const occurrences = (env.NODE_OPTIONS.match(/--max-old-space-size=/g) || []).length;
  assert.equal(occurrences, 1, "must not duplicate the heap flag when one is already set");
  assert.match(env.NODE_OPTIONS, /--max-old-space-size=8192/);
});

test("resolveNextBuildEnv honors the OMNIROUTE_BUILD_MEMORY_MB override", () => {
  const env = resolveNextBuildEnv({ OMNIROUTE_BUILD_MEMORY_MB: "6144" });
  assert.match(env.NODE_OPTIONS, /--max-old-space-size=6144/);
});

test("getTransientBuildPaths leaves _tasks in place by default", () => {
  const paths = getTransientBuildPaths("/repo", {});

  // Layer 1 deleted the root-level `app/` move-out hack, so the only default
  // transient path left is the Wine prefix. ("legacy app snapshot" is gone.)
  assert.deepEqual(
    paths.map((entry) => entry.label),
    ["local Wine prefix"]
  );
  assert.equal(
    paths.some((entry) => path.basename(entry.sourcePath) === "_tasks"),
    false
  );
});

test("getTransientBuildPaths only moves _tasks when explicitly enabled", () => {
  const paths = getTransientBuildPaths("/repo", { OMNIROUTE_BUILD_MOVE_TASKS: "1" });

  assert.equal(
    paths.some((entry) => path.basename(entry.sourcePath) === "_tasks"),
    true
  );
});

test("pruneStandaloneArtifacts removes traced _tasks from standalone output", async () => {
  await withTempDir(async (tempDir) => {
    // Layer 1 moved the Next distDir default to .build/next.
    const tracedTaskFile = path.join(tempDir, ".build", "next", "standalone", "_tasks", "plan.md");
    await fs.mkdir(path.dirname(tracedTaskFile), { recursive: true });
    await fs.writeFile(tracedTaskFile, "transient planning artifact");

    await pruneStandaloneArtifacts(tempDir);

    assert.equal(
      fsSync.existsSync(path.join(tempDir, ".build", "next", "standalone", "_tasks")),
      false
    );
  });
});

test("syncStandaloneExtraModules copies the complete wreq-js runtime", async () => {
  await withTempDir(async (tempDir) => {
    const sourcePackage = path.join(tempDir, "node_modules", "wreq-js");
    const destinationPackage = path.join(
      tempDir,
      ".build",
      "next",
      "standalone",
      "node_modules",
      "wreq-js"
    );
    const logs: string[] = [];
    const logger: Console = Object.assign(Object.create(console), {
      log: (message: unknown) => logs.push(String(message)),
    });

    await fs.mkdir(path.join(sourcePackage, "dist"), { recursive: true });
    await fs.mkdir(path.join(sourcePackage, "rust"), { recursive: true });
    await fs.writeFile(path.join(sourcePackage, "package.json"), '{"name":"wreq-js"}');
    await fs.writeFile(path.join(sourcePackage, "dist", "wreq-js.cjs"), "exports.fetch = () => {}");
    await fs.writeFile(
      path.join(sourcePackage, "rust", "wreq-js.linux-x64-gnu.node"),
      "native module bytes"
    );

    const changed = await syncStandaloneExtraModules(tempDir, fs, logger);

    assert.equal(changed, true);
    assert.equal(
      await fs.readFile(path.join(destinationPackage, "package.json"), "utf8"),
      '{"name":"wreq-js"}'
    );
    assert.equal(
      await fs.readFile(path.join(destinationPackage, "dist", "wreq-js.cjs"), "utf8"),
      "exports.fetch = () => {}"
    );
    assert.equal(
      await fs.readFile(
        path.join(destinationPackage, "rust", "wreq-js.linux-x64-gnu.node"),
        "utf8"
      ),
      "native module bytes"
    );
    assert.match(logs[0] ?? "", /wreq-js TLS runtime/);
  });
});

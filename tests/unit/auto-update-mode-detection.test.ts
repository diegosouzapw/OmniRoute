import test from "node:test";
import assert from "node:assert/strict";

const { resolveAutoUpdateMode, isUnderNodeModules, resolveRuntimeModuleDir, getAutoUpdateConfig } =
  await import("../../src/lib/system/autoUpdate.ts");

test("non-npm modes pass through untouched (operator choice wins)", () => {
  assert.equal(
    resolveAutoUpdateMode("source", { isGitRepo: false, currentDir: "/x" }),
    "source"
  );
  assert.equal(
    resolveAutoUpdateMode("docker-compose", {
      isGitRepo: true,
      currentDir: "/x/node_modules/y",
    }),
    "docker-compose"
  );
});

test("npm + git repo → source (a source checkout self-updates via git)", () => {
  assert.equal(
    resolveAutoUpdateMode("npm", {
      isGitRepo: true,
      currentDir: "/home/me/omniroute/dist/lib/system",
    }),
    "source"
  );
});

test("npm + global install under node_modules → npm", () => {
  assert.equal(
    resolveAutoUpdateMode("npm", {
      isGitRepo: false,
      currentDir: "/usr/lib/node_modules/omniroute/dist/lib/system",
    }),
    "npm"
  );
});

test("npm + no git + not under node_modules → source (downloaded build/zip)", () => {
  assert.equal(
    resolveAutoUpdateMode("npm", {
      isGitRepo: false,
      currentDir: "/opt/omniroute/dist/lib/system",
    }),
    "source"
  );
});

test("Bug1: a substring-only node_modules path is not treated as an install", () => {
  // The old heuristic (`currentDir.includes("node_modules")`) returned "npm" for this path,
  // misclassifying it as a global install. The segment match treats it as source.
  assert.equal(isUnderNodeModules("/opt/my-node_modules-backup/dist"), false);
  assert.equal(
    resolveAutoUpdateMode("npm", {
      isGitRepo: false,
      currentDir: "/opt/my-node_modules-backup/dist",
    }),
    "source"
  );
});

test("isUnderNodeModules matches real segments on both path separators", () => {
  assert.equal(isUnderNodeModules("/usr/lib/node_modules/omniroute"), true);
  assert.equal(isUnderNodeModules("C:\\Users\\me\\node_modules\\omniroute"), true);
  assert.equal(isUnderNodeModules("/usr/lib/node_modules"), true); // trailing segment
  assert.equal(isUnderNodeModules("/opt/app/dist"), false);
  assert.equal(isUnderNodeModules("/opt/mynode_modulesbar/dist"), false);
});

// Turbopack freezes `__dirname` in the Next.js server bundle to a virtual path that does not exist
// on disk. Before the fix, `currentDir` was that literal, so every global npm install was detected
// as "source" and the dashboard showed "Not a git repository. Download source or use npm install -g."
const BUNDLED_DIRNAME = "/ROOT/src/lib/system";
const nothingExists = () => false;

test("bundled build: virtual __dirname + entry inside a global npm install → npm", () => {
  for (const entry of [
    "C:\\Users\\me\\AppData\\Roaming\\npm\\node_modules\\omniroute\\dist\\server-ws.mjs",
    "/usr/lib/node_modules/omniroute/bin/omniroute.mjs",
    "/home/me/.local/share/pnpm/global/5/.pnpm/omniroute@3.8.50/node_modules/omniroute/dist/server-ws.mjs",
  ]) {
    const currentDir = resolveRuntimeModuleDir(BUNDLED_DIRNAME, [entry], nothingExists);
    assert.equal(resolveAutoUpdateMode("npm", { isGitRepo: false, currentDir }), "npm", entry);
  }
});

test("bundled build from a source checkout (entry is node_modules/next) stays source", () => {
  const currentDir = resolveRuntimeModuleDir(
    BUNDLED_DIRNAME,
    ["/home/me/OmniRoute/node_modules/next/dist/bin/next"],
    nothingExists
  );
  assert.equal(currentDir, BUNDLED_DIRNAME);
  assert.equal(resolveAutoUpdateMode("npm", { isGitRepo: false, currentDir }), "source");
});

test("a real on-disk __dirname still wins over the entry script (unbundled runs unchanged)", () => {
  const real = "/opt/omniroute/dist/lib/system";
  assert.equal(
    resolveRuntimeModuleDir(
      real,
      ["/usr/lib/node_modules/omniroute/bin/omniroute.mjs"],
      (p) => p === real
    ),
    real
  );
});

test("no usable entry script keeps the compiled dir (previous behavior)", () => {
  assert.equal(
    resolveRuntimeModuleDir(BUNDLED_DIRNAME, [undefined], nothingExists),
    BUNDLED_DIRNAME
  );
  assert.equal(
    resolveRuntimeModuleDir(BUNDLED_DIRNAME, ["/opt/my-omniroute-backup/server.js"], nothingExists),
    BUNDLED_DIRNAME
  );
  // No compiled dir at all must not borrow the cwd: "" never sits under node_modules.
  assert.equal(resolveRuntimeModuleDir(undefined, [undefined], nothingExists), "");
});

test("under pm2, argv[1] is pm2's container; pm_exec_path points at the package", () => {
  const currentDir = resolveRuntimeModuleDir(
    BUNDLED_DIRNAME,
    [
      "/usr/lib/node_modules/pm2/lib/ProcessContainerFork.js",
      "/usr/lib/node_modules/omniroute/bin/omniroute.mjs",
    ],
    nothingExists
  );
  assert.equal(currentDir, "/usr/lib/node_modules/omniroute/bin");
});

test("getAutoUpdateConfig wires the runtime probe: bundled global install → npm", () => {
  const probe = {
    compiledDir: BUNDLED_DIRNAME,
    entryScripts: ["/usr/lib/node_modules/omniroute/dist/server-ws.mjs"],
    exists: nothingExists,
  };
  assert.equal(getAutoUpdateConfig({}, probe).mode, "npm");
  assert.equal(
    getAutoUpdateConfig({}, { ...probe, entryScripts: ["/opt/app/server.js"] }).mode,
    "source"
  );
  assert.equal(getAutoUpdateConfig({ AUTO_UPDATE_MODE: "source" }, probe).mode, "source");
});

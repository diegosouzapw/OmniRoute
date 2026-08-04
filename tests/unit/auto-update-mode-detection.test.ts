import test from "node:test";
import assert from "node:assert/strict";

const { resolveAutoUpdateMode, isUnderNodeModules } = await import(
  "../../src/lib/system/autoUpdate.ts"
);

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

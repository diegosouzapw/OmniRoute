import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import {
  collectWorkspaceVersions,
  resolvePackageJsonWorkspaceProtocols,
  hasWorkspaceProtocol,
  findPackageJsonFiles,
} from "../../../scripts/build/resolveWorkspaceProtocols.ts";

function tmpDir(prefix: string): string {
  return fs.mkdtempSync(path.join(os.tmpdir(), prefix));
}

function writeJson(filePath: string, data: unknown): void {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

function readJson(filePath: string): Record<string, unknown> {
  return JSON.parse(fs.readFileSync(filePath, "utf8")) as Record<string, unknown>;
}

test("resolvePackageJsonWorkspaceProtocols replaces workspace:*, workspace:^, workspace:~", () => {
  const versions = new Map([
    ["@omniroute/open-sse", "3.8.51"],
    ["@omniroute/shared", "1.2.3"],
  ]);

  const resolved = resolvePackageJsonWorkspaceProtocols(
    {
      name: "omniroute",
      version: "3.8.51",
      dependencies: {
        "@omniroute/open-sse": "workspace:^",
        "@omniroute/shared": "workspace:*",
        lodash: "^4.17.0",
      },
      devDependencies: {
        "@omniroute/open-sse": "workspace:~",
      },
      peerDependencies: {
        "@omniroute/shared": "workspace:1.2.3",
      },
      optionalDependencies: {
        "@omniroute/open-sse": "workspace:>=3.0.0",
      },
    },
    versions
  );

  assert.equal((resolved.dependencies as Record<string, string>)["@omniroute/open-sse"], "^3.8.51");
  assert.equal((resolved.dependencies as Record<string, string>)["@omniroute/shared"], "1.2.3");
  assert.equal((resolved.dependencies as Record<string, string>).lodash, "^4.17.0");
  assert.equal(
    (resolved.devDependencies as Record<string, string>)["@omniroute/open-sse"],
    "~3.8.51"
  );
  assert.equal((resolved.peerDependencies as Record<string, string>)["@omniroute/shared"], "1.2.3");
  assert.equal(
    (resolved.optionalDependencies as Record<string, string>)["@omniroute/open-sse"],
    ">=3.0.0"
  );
});

test("resolvePackageJsonWorkspaceProtocols leaves non-workspace specs untouched", () => {
  const resolved = resolvePackageJsonWorkspaceProtocols(
    {
      name: "x",
      dependencies: {
        a: "^1.0.0",
        b: "file:../b",
        c: "npm:alias@1.0.0",
      },
    },
    new Map()
  );

  assert.equal((resolved.dependencies as Record<string, string>).a, "^1.0.0");
  assert.equal((resolved.dependencies as Record<string, string>).b, "file:../b");
  assert.equal((resolved.dependencies as Record<string, string>).c, "npm:alias@1.0.0");
  assert.equal(hasWorkspaceProtocol(resolved), false);
});

test("resolvePackageJsonWorkspaceProtocols throws for unresolvable workspace protocol", () => {
  assert.throws(
    () =>
      resolvePackageJsonWorkspaceProtocols(
        {
          name: "x",
          dependencies: {
            "@missing/pkg": "workspace:^",
          },
        },
        new Map()
      ),
    /Cannot resolve workspace protocol/
  );
});

test("collectWorkspaceVersions reads npm workspaces and pnpm-workspace.yaml", () => {
  const root = tmpDir("workspace-versions-");

  writeJson(path.join(root, "package.json"), {
    name: "root",
    version: "0.0.0",
    workspaces: ["packages/*", "open-sse"],
  });

  fs.mkdirSync(path.join(root, "packages", "a"), { recursive: true });
  writeJson(path.join(root, "packages", "a", "package.json"), {
    name: "@scope/a",
    version: "1.0.0",
  });

  fs.mkdirSync(path.join(root, "open-sse"), { recursive: true });
  writeJson(path.join(root, "open-sse", "package.json"), {
    name: "@scope/open-sse",
    version: "2.0.0",
  });

  // pnpm-workspace.yaml adds an extra directory not in npm workspaces.
  fs.mkdirSync(path.join(root, "packages", "b"), { recursive: true });
  writeJson(path.join(root, "packages", "b", "package.json"), {
    name: "@scope/b",
    version: "3.0.0",
  });
  fs.writeFileSync(path.join(root, "pnpm-workspace.yaml"), "packages:\n  - 'packages/*'\n");

  const versions = collectWorkspaceVersions(root);
  assert.equal(versions.get("@scope/a"), "1.0.0");
  assert.equal(versions.get("@scope/open-sse"), "2.0.0");
  assert.equal(versions.get("@scope/b"), "3.0.0");
});

test("findPackageJsonFiles skips node_modules and respects maxDepth", () => {
  const root = tmpDir("pkg-json-files-");
  fs.mkdirSync(path.join(root, "a"), { recursive: true });
  writeJson(path.join(root, "a", "package.json"), {});
  fs.mkdirSync(path.join(root, "node_modules", "x"), { recursive: true });
  writeJson(path.join(root, "node_modules", "x", "package.json"), {});

  const files = findPackageJsonFiles(root);
  assert.equal(files.length, 1);
  assert.ok(files[0].endsWith(path.join("a", "package.json")));

  // Build a deep tree and confirm maxDepth bounds the walk.
  const deep = tmpDir("pkg-json-deep-");
  let current = deep;
  for (let i = 0; i < 12; i += 1) {
    current = path.join(current, `level${i}`);
    fs.mkdirSync(current, { recursive: true });
  }
  writeJson(path.join(current, "package.json"), {});
  assert.equal(findPackageJsonFiles(deep, 10).length, 0);
  assert.equal(findPackageJsonFiles(deep, 12).length, 1);
});

test("collectWorkspaceVersions parses pnpm-workspace.yaml with js-yaml", () => {
  const root = tmpDir("pnpm-yaml-");

  writeJson(path.join(root, "package.json"), { name: "root", version: "0.0.0" });

  // Flow-style array, nested quotes, comments inside the packages list, and an
  // unrelated top-level key before packages are all valid YAML that the old line
  // scanner could not handle.
  fs.writeFileSync(
    path.join(root, "pnpm-workspace.yaml"),
    "preferWorkspacePackages: true\n" +
      "packages:\n" +
      '  - "packages/*"\n' +
      "  - 'apps/*'\n" +
      "  # comment inside the list\n" +
      "  - open-sse\n"
  );

  fs.mkdirSync(path.join(root, "packages", "a"), { recursive: true });
  writeJson(path.join(root, "packages", "a", "package.json"), {
    name: "@scope/a",
    version: "1.0.0",
  });

  fs.mkdirSync(path.join(root, "apps", "web"), { recursive: true });
  writeJson(path.join(root, "apps", "web", "package.json"), {
    name: "@scope/web",
    version: "2.0.0",
  });

  fs.mkdirSync(path.join(root, "open-sse"), { recursive: true });
  writeJson(path.join(root, "open-sse", "package.json"), {
    name: "@scope/open-sse",
    version: "3.0.0",
  });

  const versions = collectWorkspaceVersions(root);
  assert.equal(versions.get("@scope/a"), "1.0.0");
  assert.equal(versions.get("@scope/web"), "2.0.0");
  assert.equal(versions.get("@scope/open-sse"), "3.0.0");
});

test("prepublish Step 11 fixture resolves workspace: protocols in dist package.json files", () => {
  const root = tmpDir("prepublish-step11-");
  const distDir = path.join(root, "dist");

  // Workspace member source files contain a workspace: specifier (simulating the
  // monorepo source). They must NOT be mutated by the publish step.
  fs.mkdirSync(path.join(root, "packages", "shared"), { recursive: true });
  const sourcePkgPath = path.join(root, "packages", "shared", "package.json");
  writeJson(sourcePkgPath, {
    name: "@scope/shared",
    version: "1.2.3",
    dependencies: {
      "@scope/other": "workspace:*",
    },
  });

  fs.mkdirSync(path.join(root, "packages", "other"), { recursive: true });
  writeJson(path.join(root, "packages", "other", "package.json"), {
    name: "@scope/other",
    version: "4.5.6",
  });

  writeJson(path.join(root, "package.json"), {
    name: "root",
    version: "0.0.0",
    workspaces: ["packages/*"],
  });

  // The staged dist/ package.json contains workspace: specifiers that leaked
  // into the publish artifact and must be rewritten to concrete versions.
  fs.mkdirSync(distDir, { recursive: true });
  const distPkgPath = path.join(distDir, "package.json");
  writeJson(distPkgPath, {
    name: "omniroute",
    version: "3.8.51",
    dependencies: {
      "@scope/shared": "workspace:^",
      "@scope/other": "workspace:*",
      lodash: "^4.17.0",
    },
  });

  // This is the same logic prepublish.ts Step 11 runs, scoped to the fixture.
  const workspaceVersions = collectWorkspaceVersions(root);
  const publishablePackageJsonPaths = findPackageJsonFiles(distDir).filter((filePath) =>
    fs.existsSync(filePath)
  );

  for (const pkgJsonPath of publishablePackageJsonPaths) {
    const pkg = readJson(pkgJsonPath);
    if (!hasWorkspaceProtocol(pkg)) continue;
    const resolved = resolvePackageJsonWorkspaceProtocols(pkg, workspaceVersions);
    fs.writeFileSync(pkgJsonPath, JSON.stringify(resolved, null, 2) + "\n");
  }

  // dist/package.json must have concrete versions.
  const distPkg = readJson(distPkgPath);
  assert.equal((distPkg.dependencies as Record<string, string>)["@scope/shared"], "^1.2.3");
  assert.equal((distPkg.dependencies as Record<string, string>)["@scope/other"], "4.5.6");
  assert.equal((distPkg.dependencies as Record<string, string>).lodash, "^4.17.0");
  assert.equal(hasWorkspaceProtocol(distPkg), false);

  // Source package.json must remain untouched.
  const sourcePkg = readJson(sourcePkgPath);
  assert.equal((sourcePkg.dependencies as Record<string, string>)["@scope/other"], "workspace:*");
});

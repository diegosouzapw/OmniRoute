import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const THIS_FILE = fileURLToPath(import.meta.url);
const TESTS_DIR = path.dirname(THIS_FILE);
const REPO_ROOT = path.resolve(TESTS_DIR, "../..");
const CLI_TOOLS_DIR = path.join(REPO_ROOT, "src", "app", "api", "cli-tools");

function listCliToolRouteFiles(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...listCliToolRouteFiles(fullPath));
      continue;
    }
    if (entry.isFile() && entry.name === "route.ts") {
      files.push(fullPath);
    }
  }

  return files;
}
test("all cli-tools route handlers require the shared management auth guard", () => {
  const routeFiles = listCliToolRouteFiles(CLI_TOOLS_DIR)
    .map((fullPath) => path.relative(REPO_ROOT, fullPath).replace(/\\/g, "/"))
    .sort();

  assert.ok(routeFiles.length > 0, "expected at least one cli-tools route");

  for (const relPath of routeFiles) {
    const fullPath = path.join(REPO_ROOT, relPath);
    const content = fs.readFileSync(fullPath, "utf8");
    const handlerCount = (content.match(/export async function (GET|POST|PUT|DELETE)\(/g) || [])
      .length;
    const authCount = (
      content.match(/const authError = await requireCliToolsAuth\(request\);/g) || []
    ).length;
    const returnCount = (content.match(/if \(authError\) return authError;/g) || []).length;

    assert.ok(handlerCount > 0, `${relPath} should export at least one route handler`);
    assert.ok(
      content.includes('from "@/lib/api/requireCliToolsAuth"'),
      `${relPath} should import requireCliToolsAuth`
    );
    assert.equal(
      authCount,
      handlerCount,
      `${relPath} should guard every exported handler before host access`
    );
    assert.equal(
      returnCount,
      handlerCount,
      `${relPath} should return the auth error from every exported handler`
    );
  }
});

test("cli-tools auth helper delegates to management auth", () => {
  const helperPath = path.join(REPO_ROOT, "src/lib/api/requireCliToolsAuth.ts");
  const content = fs.readFileSync(helperPath, "utf8");

  assert.ok(
    content.includes('from "@/lib/api/requireManagementAuth"'),
    "requireCliToolsAuth should reuse the shared management auth helper"
  );
  assert.ok(
    content.includes("return requireManagementAuth(request);"),
    "requireCliToolsAuth should delegate directly to requireManagementAuth"
  );
});

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const ROOT = join(import.meta.dirname, "..", "..");
const workflow = readFileSync(join(ROOT, ".github", "workflows", "electron-release.yml"), "utf8");

test("Electron release relies on setup-node's npm cache instead of caching node_modules", () => {
  assert.doesNotMatch(workflow, /path:\s*node_modules/);
  assert.match(workflow, /uses:\s*actions\/setup-node@[^\n]+[\s\S]*?cache:\s*npm/);
});

test("Electron release installs both dependency trees deterministically", () => {
  assert.match(workflow, /- name: Install dependencies\s+run: npm ci/);
  assert.match(
    workflow,
    /- name: Install Electron dependencies\s+working-directory: electron\s+run: npm ci --no-audit --no-fund/
  );
  assert.doesNotMatch(workflow, /run:\s*npm install --no-audit --no-fund/);
});

test("Electron release retains packaged-app smoke coverage", () => {
  assert.match(workflow, /- name: Smoke packaged Electron app\s+if: matrix\.platform != 'linux'/);
  assert.match(
    workflow,
    /- name: Smoke packaged Electron app \(Linux\)\s+if: matrix\.platform == 'linux'/
  );
});

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const dockerfile = fs.readFileSync(path.join(repoRoot, "Dockerfile"), "utf-8");
const entrypoint = fs.readFileSync(path.join(repoRoot, "scripts/check-permissions.sh"), "utf-8");

/** Line indices bounding a named stage: its FROM up to the next FROM. */
function stageRange(name: string): { start: number; end: number } {
  const lines = dockerfile.split("\n");
  const start = lines.findIndex((l) =>
    new RegExp(`^FROM\\s+\\S+\\s+AS\\s+${name}\\b`, "i").test(l.trim())
  );
  assert.ok(start >= 0, `Dockerfile must declare a \`${name}\` stage`);
  const after = lines.slice(start + 1).findIndex((l) => /^FROM\s+/i.test(l.trim()));
  return { start, end: after === -1 ? lines.length : start + 1 + after };
}

test("runner-cli stage installs Playwright Chromium and xvfb for last-stage / Easypanel builds", () => {
  const lines = dockerfile.split("\n");
  const { start, end } = stageRange("runner-cli");
  const stage = lines.slice(start, end).join("\n");

  assert.match(stage, /playwright-core/, "runner-cli must copy playwright-core from builder");
  assert.match(stage, /playwright\b/, "runner-cli must copy playwright from builder");
  assert.match(
    stage,
    /ENV PLAYWRIGHT_BROWSERS_PATH=\/home\/node\/\.cache\/ms-playwright/,
    "runner-cli must set PLAYWRIGHT_BROWSERS_PATH so non-root runtime can read the browser binary"
  );
  assert.match(stage, /\bxvfb\b/, "runner-cli must install xvfb via apt");
  assert.match(
    stage,
    /node node_modules\/playwright\/cli\.js install chromium --with-deps/,
    "runner-cli must run playwright chromium install --with-deps"
  );
});

test("runner-web stage installs xvfb alongside Playwright Chromium", () => {
  const lines = dockerfile.split("\n");
  const { start, end } = stageRange("runner-web");
  const stage = lines.slice(start, end).join("\n");

  assert.match(stage, /\bxvfb\b/, "runner-web must install xvfb so headed Chromium runs on displayless hosts");
});

test("entrypoint auto-starts Xvfb and exports DISPLAY when Xvfb exists", () => {
  assert.match(entrypoint, /command -v Xvfb/);
  assert.match(entrypoint, /export DISPLAY="\$\{DISPLAY:-:99\}"/);
  assert.match(entrypoint, /Xvfb "\$DISPLAY"/);
  assert.match(entrypoint, /mkdir -p \/tmp\/\.X11-unix/);
  assert.match(entrypoint, /chmod 1777 \/tmp\/\.X11-unix/);
});

test("Hard Rule #13: DISPLAY logic in entrypoint does not pass runtime paths into sed/awk", () => {
  assert.doesNotMatch(entrypoint, /sed.*DISPLAY/);
  assert.doesNotMatch(entrypoint, /awk.*DISPLAY/);
});

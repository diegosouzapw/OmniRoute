/**
 * leftover banner must stay session-only: no localStorage/sessionStorage.
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const bannerPath = path.join(
  repoRoot,
  "src/app/(dashboard)/dashboard/providers/components/DeprecatedProviderBanner.tsx"
);
const pagePath = path.join(repoRoot, "src/app/(dashboard)/dashboard/providers/page.tsx");

test("banner file exists and never persists dismiss in web storage", () => {
  assert.ok(fs.existsSync(bannerPath), "DeprecatedProviderBanner.tsx must exist");
  const source = fs.readFileSync(bannerPath, "utf8");
  assert.equal(source.includes("localStorage"), false);
  assert.equal(source.includes("sessionStorage"), false);
  assert.equal(source.includes("../../providerPageHelpers"), false);
  assert.match(source, /fetch\(\s*"\/api\/providers\/deprecated"/);
  assert.match(source, /method:\s*"POST"/);
  assert.match(source, /credentials:\s*"same-origin"/);
});

test("providers page mounts the leftover banner", () => {
  const source = fs.readFileSync(pagePath, "utf8");
  assert.match(source, /DeprecatedProviderBanner/);
});

test("providers page stays frozen at 2025 lines", () => {
  const lines = fs.readFileSync(pagePath, "utf8").split("\n").length;
  assert.equal(lines, 2025);
});

test("purge surfaces notify.error when POST is not ok", () => {
  const source = fs.readFileSync(bannerPath, "utf8");
  assert.match(source, /useNotificationStore/);
  assert.match(source, /notify\.error\(/);
  const purgeIdx = source.indexOf("async function purge");
  assert.ok(purgeIdx >= 0, "purge helper must exist");
  const purgeBody = source.slice(purgeIdx);
  const okIdx = purgeBody.indexOf("if (res.ok)");
  const errIdx = purgeBody.indexOf("notify.error(");
  assert.ok(okIdx >= 0, "purge must branch on res.ok");
  assert.ok(errIdx > okIdx, "failed POST must notify after the ok branch");
});

test("purge surfaces notify.success when POST is ok", () => {
  const source = fs.readFileSync(bannerPath, "utf8");
  const purgeIdx = source.indexOf("async function purge");
  assert.ok(purgeIdx >= 0, "purge helper must exist");
  const purgeBody = source.slice(purgeIdx);
  const okIdx = purgeBody.indexOf("if (res.ok)");
  const successIdx = purgeBody.indexOf("notify.success(");
  assert.ok(okIdx >= 0, "purge must branch on res.ok");
  assert.ok(successIdx > okIdx, "successful POST must notify.success in the ok branch");
});

test("banner leftover type comes from the classifier module", () => {
  const source = fs.readFileSync(bannerPath, "utf8");
  assert.match(source, /DeprecatedProviderLeftoverGroup/);
  assert.match(
    source,
    /from\s+["']@\/lib\/providers\/deprecatedProviderCleanup["']/
  );
  assert.equal(source.includes("type LeftoverGroup = {"), false);
});

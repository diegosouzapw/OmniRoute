/**
 * #13298 source guard: every consumer of the `auth_token` cookie must verify it
 * through verifyDashboardSessionToken (which requires `authenticated: true`).
 * A bare jose `jwtVerify` (called or aliased) in one of these files re-opens the
 * forgeable-session hole (Cursor CLI tokens share JWT_SECRET).
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "../..");
const VERIFIERS = [
  "src/shared/utils/apiAuth.ts",
  "src/server/authz/pipeline.ts",
  "src/lib/ws/handshake.ts",
  "src/server/ws/liveServer.ts",
  "src/app/api/settings/require-login/route.ts",
  "src/app/api/auth/status/route.ts",
];

const ALLOWED_JWT_VERIFY_FILES = [
  "src/shared/utils/dashboardSessionToken.ts",
  "src/app/api/auth/oidc/callback/route.ts",
];

for (const rel of VERIFIERS) {
  test(`${rel} verifies auth_token only through verifyDashboardSessionToken`, () => {
    const src = fs.readFileSync(path.join(ROOT, rel), "utf8");
    assert.match(src, /verifyDashboardSessionToken\s*\(/, "must call the shared verifier");
    assert.doesNotMatch(src, /\bjwtVerify\b/, "any bare jwtVerify is the #13298 regression");
  });
}

test("the helper itself is the only src file that calls jwtVerify on the dashboard cookie", () => {
  const helper = fs.readFileSync(
    path.join(ROOT, "src/shared/utils/dashboardSessionToken.ts"),
    "utf8"
  );
  assert.match(helper, /\bjwtVerify\s*\(/);
  assert.match(helper, /=== true/);
});

test("only allowlisted files call jwtVerify from jose", () => {
  const srcDir = path.join(ROOT, "src");
  const allTsFiles = findTsFiles(srcDir);
  for (const file of allTsFiles) {
    const rel = path.relative(ROOT, file).replace(/\\/g, "/");
    if (ALLOWED_JWT_VERIFY_FILES.includes(rel)) continue;
    const src = fs.readFileSync(file, "utf8");
    if (/\bjwtVerify\s*\(/.test(src)) {
      assert.fail(`${rel} calls jwtVerify but is not in ALLOWED_JWT_VERIFY_FILES`);
    }
  }
});

function findTsFiles(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let files: string[] = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(findTsFiles(full));
    } else if (entry.name.endsWith(".ts")) {
      files.push(full);
    }
  }
  return files;
}

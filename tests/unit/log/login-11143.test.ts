import assert from "node:assert/strict";
import { test } from "node:test";
import fs from "node:fs";
import path from "node:path";

test("login page performs full window.location navigation after authentication to avoid cookie race", () => {
  const loginPagePath = path.resolve(process.cwd(), "src/app/login/page.tsx");
  const content = fs.readFileSync(loginPagePath, "utf8");

  // Ensure router.push("/dashboard") is replaced with window.location.href
  assert.equal(
    content.includes('router.push("/dashboard")'),
    false,
    "LoginPage should not use router.push('/dashboard') after login"
  );
  assert.equal(
    content.includes('window.location.href = "/dashboard"'),
    true,
    "LoginPage must perform full window.location navigation after login"
  );
});

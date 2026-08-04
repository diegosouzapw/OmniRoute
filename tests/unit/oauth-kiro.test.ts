/**
 * Kiro IDE OAuth Configuration — Lockdown Tests
 *
 * Ensures the Kiro device-code social-login flow reads its CLI identifier and
 * AWS auth-service URLs from `KIRO_CONFIG` instead of inline literals. The
 * strings (`"kiro-cli"` and `https://prod.us-east-1.auth.desktop.kiro.dev/...`)
 * used to live duplicated across `social-authorize/route.ts` and
 * `social-exchange/route.ts`. Centralising them avoids drift if AWS ever
 * publishes a per-customer client id and matches the
 * `CLAUDE_CONFIG`/`CODEX_CONFIG` pattern that allows operators to override
 * via `process.env.KIRO_OAUTH_CLIENT_ID` (Hard Rule #11 spirit — operators
 * can pin a custom id without patching source).
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { KIRO_CONFIG } from "../../src/lib/oauth/constants/oauth";

test("KIRO_CONFIG exposes the social-flow client id and device-code URLs", () => {
  assert.equal(typeof KIRO_CONFIG.socialClientId, "string");
  assert.ok(KIRO_CONFIG.socialClientId.length > 0, "socialClientId must be non-empty");
  assert.ok(
    KIRO_CONFIG.socialDeviceAuthorizeUrl.startsWith("https://"),
    "socialDeviceAuthorizeUrl must use HTTPS"
  );
  assert.ok(
    KIRO_CONFIG.socialDevicePollUrl.startsWith("https://"),
    "socialDevicePollUrl must use HTTPS"
  );
  assert.ok(
    KIRO_CONFIG.socialDeviceAuthorizeUrl.endsWith("/oauth/device/authorization"),
    "socialDeviceAuthorizeUrl must point at the AWS Kiro device authorize endpoint"
  );
  assert.ok(
    KIRO_CONFIG.socialDevicePollUrl.endsWith("/oauth/device/poll"),
    "socialDevicePollUrl must point at the AWS Kiro device poll endpoint"
  );
});

test("KIRO_CONFIG.socialClientId default matches the public CLI identifier 'kiro-cli'", () => {
  // We only assert the default when no env override is set, so CI can pin a
  // custom id via KIRO_OAUTH_CLIENT_ID without breaking this test.
  if (!process.env.KIRO_OAUTH_CLIENT_ID) {
    assert.equal(KIRO_CONFIG.socialClientId, "kiro-cli");
  }
});

test("auth schemas keep the supported Kiro import schema exported", async () => {
  const { kiroImportSchema } = await import("../../src/shared/validation/schemas/auth.ts");
  assert.equal(typeof kiroImportSchema.safeParse, "function");
});

test("Kiro social-flow routes do not duplicate the AWS auth URL or 'kiro-cli' literal", () => {
  // Catches future refactors that copy a hard-coded URL/identifier back into
  // either route. The string "kiro-cli" may still appear as an env-var name
  // in comments, so we grep for the specific *literal* shapes we replaced.
  const routePaths = [
    "src/app/api/oauth/kiro/social-authorize/route.ts",
    "src/app/api/oauth/kiro/social-exchange/route.ts",
  ];
  for (const routePath of routePaths) {
    const content = fs.readFileSync(routePath, "utf8");
    assert.ok(
      content.includes('from "@/lib/oauth/constants/oauth"'),
      `${routePath} must import KIRO_CONFIG from @/lib/oauth/constants/oauth`
    );
    assert.ok(
      content.includes("KIRO_CONFIG.socialClientId"),
      `${routePath} must reference KIRO_CONFIG.socialClientId instead of the "kiro-cli" literal`
    );
    assert.ok(
      !/['"]kiro-cli['"]/.test(content),
      `${routePath} must NOT inline the "kiro-cli" literal — use KIRO_CONFIG.socialClientId`
    );
    assert.ok(
      !/['"]https:\/\/prod\.us-east-1\.auth\.desktop\.kiro\.dev/.test(content),
      `${routePath} must NOT inline the Kiro auth service URL — use KIRO_CONFIG.socialDeviceAuthorizeUrl / socialDevicePollUrl`
    );
  }
});

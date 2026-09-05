import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

// Regression guard for #10348/#10539: the AUTH log line in the SSE chat
// handler ("Using <provider> account: <prefix>...") must redact the account
// prefix by default. Redaction MUST be governed by a narrow, dedicated
// feature flag (AUTH_LOG_INCLUDE_ACCOUNT_ID) — NOT by the broad `debugMode`
// setting. `debugMode` is a general dashboard-visibility toggle unrelated to
// log privacy (its own default has flipped independently more than once,
// see #10372/#10312); deriving log redaction from it means any future,
// unrelated change to debugMode's default silently changes whether account
// prefixes leak into logs. The narrow flag keeps the two concerns separate.

// Isolate DB state so the resolution chain (DB override > env > default)
// reads a clean store and we exercise the definition default, not a leaked
// override from another test file.
const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-test-auth-log-account-id-"));
process.env.DATA_DIR = tmpDir;

const { FEATURE_FLAG_DEFINITIONS } = await import(
  "../../../src/shared/constants/featureFlagDefinitions.ts"
);

test("AUTH_LOG_INCLUDE_ACCOUNT_ID feature flag defaults to OFF, independent of debugMode", async (t) => {
  const def = (key: string) => FEATURE_FLAG_DEFINITIONS.find((d) => d.key === key);

  await t.test("AUTH_LOG_INCLUDE_ACCOUNT_ID definition exists", () => {
    assert.ok(
      def("AUTH_LOG_INCLUDE_ACCOUNT_ID"),
      "AUTH_LOG_INCLUDE_ACCOUNT_ID definition must exist in FEATURE_FLAG_DEFINITIONS"
    );
  });

  await t.test("AUTH_LOG_INCLUDE_ACCOUNT_ID default value is 'false'", () => {
    assert.strictEqual(
      def("AUTH_LOG_INCLUDE_ACCOUNT_ID")!.defaultValue,
      "false",
      "AUTH_LOG_INCLUDE_ACCOUNT_ID must default OFF — account prefixes are redacted by default"
    );
  });

  await t.test("AUTH_LOG_INCLUDE_ACCOUNT_ID category is 'security'", () => {
    assert.strictEqual(def("AUTH_LOG_INCLUDE_ACCOUNT_ID")!.category, "security");
  });

  await t.test("AUTH_LOG_INCLUDE_ACCOUNT_ID type is 'boolean'", () => {
    assert.strictEqual(def("AUTH_LOG_INCLUDE_ACCOUNT_ID")!.type, "boolean");
  });

  await t.test("effective runtime resolution is OFF with no override", async () => {
    delete process.env.AUTH_LOG_INCLUDE_ACCOUNT_ID;
    const { clearAllFeatureFlagOverrides } = await import("@/lib/db/featureFlags");
    clearAllFeatureFlagOverrides();

    const { isFeatureFlagEnabled } = await import("@/shared/utils/featureFlags");
    assert.strictEqual(isFeatureFlagEnabled("AUTH_LOG_INCLUDE_ACCOUNT_ID"), false);
  });

  await t.test("explicit env override enables it", async () => {
    process.env.AUTH_LOG_INCLUDE_ACCOUNT_ID = "true";
    try {
      const { isFeatureFlagEnabled } = await import("@/shared/utils/featureFlags");
      assert.strictEqual(isFeatureFlagEnabled("AUTH_LOG_INCLUDE_ACCOUNT_ID"), true);
    } finally {
      delete process.env.AUTH_LOG_INCLUDE_ACCOUNT_ID;
    }
  });
});

test("chat.ts AUTH account log line is gated on the narrow flag, not on debugMode", () => {
  const here = dirname(fileURLToPath(import.meta.url));
  const chatHandlerPath = resolve(here, "../../../src/sse/handlers/chat.ts");
  const src = fs.readFileSync(chatHandlerPath, "utf8");

  assert.match(
    src,
    /Using \$\{provider\} account: \$\{includeAccountId \? accountId : "\*\*\*"\}/,
    "chat.ts must redact the account prefix behind a boolean gate variable"
  );

  assert.match(
    src,
    /isFeatureFlagEnabled\("AUTH_LOG_INCLUDE_ACCOUNT_ID"\)/,
    "chat.ts must resolve the redaction gate via the narrow AUTH_LOG_INCLUDE_ACCOUNT_ID flag"
  );

  // The old, broad debugMode-derived gate must be gone from this call site.
  assert.doesNotMatch(
    src,
    /debugMode === true[\s\S]{0,80}Using \$\{provider\} account/,
    "the AUTH account log line must not be gated on the broad debugMode setting"
  );
});

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

test("Codex apply-local auth route requires management authentication before local writes", () => {
  const content = fs.readFileSync(
    "src/app/api/providers/[id]/codex-auth/apply-local/route.ts",
    "utf8"
  );

  assert.ok(content.includes('from "@/lib/api/requireManagementAuth"'));
  assert.ok(content.includes("const authError = await requireManagementAuth(request);"));
  assert.ok(content.includes("if (authError) return authError;"));
  assert.ok(
    content.indexOf("requireManagementAuth(request)") <
      content.indexOf("ensureCliConfigWriteAllowed()")
  );
});

test("admin concurrency route requires management authentication before read or reset", () => {
  const content = fs.readFileSync("src/app/api/admin/concurrency/route.ts", "utf8");

  assert.ok(content.includes('from "@/lib/api/requireManagementAuth"'));
  assert.ok(content.includes("const authError = await requireManagementAuth(request);"));
  assert.ok(content.includes("if (authError) return authError;"));
  assert.ok(
    content.indexOf("requireManagementAuth(request)") < content.indexOf("getAllRateLimitStatus()")
  );
  assert.ok(
    content.indexOf("requireManagementAuth(request)") < content.indexOf("resetAllSemaphores()")
  );
});

test("compression analytics route requires management authentication before returning metrics", () => {
  const content = fs.readFileSync("src/app/api/analytics/compression/route.ts", "utf8");

  assert.ok(content.includes('from "@/lib/api/requireManagementAuth"'));
  assert.ok(!content.includes("enforceApiKeyPolicy"));
  assert.ok(content.includes("const authError = await requireManagementAuth(req);"));
  assert.ok(content.includes("if (authError) return authError;"));
  assert.ok(
    content.indexOf("requireManagementAuth(req)") <
      content.indexOf("getCompressionAnalyticsSummary(")
  );
});

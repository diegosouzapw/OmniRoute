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

test("administrative pricing and routing routes require management authentication", () => {
  const routePaths = [
    "src/app/api/pricing/route.ts",
    "src/app/api/pricing/sync/route.ts",
    "src/app/api/model-combo-mappings/route.ts",
    "src/app/api/model-combo-mappings/[id]/route.ts",
  ];

  for (const routePath of routePaths) {
    const content = fs.readFileSync(routePath, "utf8");
    assert.ok(content.includes('from "@/lib/api/requireManagementAuth"'), routePath);
    assert.ok(
      content.includes("const authError = await requireManagementAuth(request);"),
      routePath
    );
    assert.ok(content.includes("if (authError) return authError;"), routePath);
  }
});

test("memory management routes require management authentication", () => {
  const routePaths = ["src/app/api/memory/route.ts", "src/app/api/memory/[id]/route.ts"];

  for (const routePath of routePaths) {
    const content = fs.readFileSync(routePath, "utf8");
    assert.ok(content.includes('from "@/lib/api/requireManagementAuth"'), routePath);
    assert.ok(
      content.includes("const authError = await requireManagementAuth(request);"),
      routePath
    );
    assert.ok(content.includes("if (authError) return authError;"), routePath);
  }
});

test("provider validation routes require management authentication before reading credentials", () => {
  const routePaths = [
    "src/app/api/provider-nodes/validate/route.ts",
    "src/app/api/providers/validate/route.ts",
  ];

  for (const routePath of routePaths) {
    const content = fs.readFileSync(routePath, "utf8");
    assert.ok(content.includes('from "@/lib/api/requireManagementAuth"'), routePath);
    assert.ok(
      content.includes("const authError = await requireManagementAuth(request);"),
      routePath
    );
    assert.ok(content.includes("if (authError) return authError;"), routePath);
    assert.ok(
      content.indexOf("requireManagementAuth(request)") < content.indexOf("request.json()"),
      `${routePath} should authenticate before parsing submitted provider credentials`
    );
  }
});

test("usage analytics and request log routes require management authentication", () => {
  const routePaths = [
    "src/app/api/usage/analytics/route.ts",
    "src/app/api/usage/history/route.ts",
    "src/app/api/usage/request-logs/route.ts",
    "src/app/api/usage/logs/route.ts",
  ];

  for (const routePath of routePaths) {
    const content = fs.readFileSync(routePath, "utf8");
    assert.ok(content.includes('from "@/lib/api/requireManagementAuth"'), routePath);
    assert.ok(
      content.includes("const authError = await requireManagementAuth(request);"),
      routePath
    );
    assert.ok(content.includes("if (authError) return authError;"), routePath);
  }
});

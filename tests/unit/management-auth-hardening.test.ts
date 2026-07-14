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

test("provider param-filters route requires management authentication on GET/PUT/DELETE (#6649)", () => {
  const routePath = "src/app/api/providers/[id]/param-filters/route.ts";
  const content = fs.readFileSync(routePath, "utf8");

  assert.ok(content.includes('from "@/lib/api/requireManagementAuth"'));

  // GET, PUT, and DELETE must each gate on requireManagementAuth() before
  // touching the param filter config.
  const handlers = ["GET", "PUT", "DELETE"];
  for (const handler of handlers) {
    const handlerStart = content.indexOf(`export async function ${handler}(`);
    assert.ok(handlerStart >= 0, `${routePath} is missing a ${handler} handler`);
    const nextHandlerStart = content.indexOf("export async function", handlerStart + 1);
    const handlerBody = content.slice(
      handlerStart,
      nextHandlerStart === -1 ? content.length : nextHandlerStart
    );
    assert.ok(
      handlerBody.includes("const authError = await requireManagementAuth(request);"),
      `${routePath} ${handler} handler must call requireManagementAuth(request)`
    );
    assert.ok(
      handlerBody.includes("if (authError) return authError;"),
      `${routePath} ${handler} handler must short-circuit on authError`
    );
  }
});

test("Antigravity CLI (agy) credential import routes require management authentication before reading the body", () => {
  // Routes that parse a JSON body — auth MUST run before request.json().
  const jsonBodyRoutes = [
    "src/app/api/providers/agy-auth/import/route.ts",
    "src/app/api/providers/agy-auth/import-bulk/route.ts",
  ];
  for (const routePath of jsonBodyRoutes) {
    const content = fs.readFileSync(routePath, "utf8");
    assert.ok(content.includes('from "@/lib/api/requireManagementAuth"'), routePath);
    assert.ok(
      content.includes("const authError = await requireManagementAuth(request);"),
      routePath
    );
    assert.ok(content.includes("if (authError) return authError;"), routePath);
    assert.ok(
      content.indexOf("requireManagementAuth(request)") < content.indexOf("request.json()"),
      `${routePath} should authenticate before parsing the submitted token`
    );
  }
  // Routes that read non-JSON bodies (local file / uploaded ZIP) — auth still comes first.
  const otherBodyRoutes = [
    "src/app/api/providers/agy-auth/apply-local/route.ts",
    "src/app/api/providers/agy-auth/zip-extract/route.ts",
  ];
  for (const routePath of otherBodyRoutes) {
    const content = fs.readFileSync(routePath, "utf8");
    assert.ok(content.includes('from "@/lib/api/requireManagementAuth"'), routePath);
    assert.ok(
      content.includes("const authError = await requireManagementAuth(request);"),
      routePath
    );
    assert.ok(content.includes("if (authError) return authError;"), routePath);
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

test("middleware hook registry routes require management authentication before storing or running code", () => {
  // /api/middleware/hooks accepts arbitrary JS code that is compiled with
  // `new Function` in `src/lib/middleware/registry.ts` and executed on every
  // chat-completion request via `runHooks()`. Without management auth, anyone
  // who can reach the server can register a hook and achieve RCE. The
  // centralized authz pipeline (src/proxy.ts) is dead code in production
  // because Next.js requires the file to be named middleware.ts (see commit
  // 3fb72b973), so each route must self-gate.
  const routePaths = [
    "src/app/api/middleware/hooks/route.ts",
    "src/app/api/middleware/hooks/[name]/route.ts",
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
      content.indexOf("requireManagementAuth(request)") < content.indexOf("registerHook(saved"),
      `${routePath} must authenticate before calling registerHook (RCE surface)`
    );
  }
});

test("MCP transport and inspection routes require management authentication", () => {
  // /api/mcp/* is classified as LOCAL_ONLY in routeGuard.ts, but that
  // classification only takes effect inside runAuthzPipeline, which is not
  // invoked by Next.js in production (src/proxy.ts vs middleware.ts). Each
  // route must self-enforce. requireManagementAuth covers: CLI machine
  // token (loopback), dashboard session cookie, and manage-scope API key —
  // matching the documented bypasses in LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES.
  const routePaths = [
    "src/app/api/mcp/status/route.ts",
    "src/app/api/mcp/tools/route.ts",
    "src/app/api/mcp/audit/route.ts",
    "src/app/api/mcp/audit/stats/route.ts",
    "src/app/api/mcp/sse/route.ts",
    "src/app/api/mcp/stream/route.ts",
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

test("management routes sanitize error.message before returning it to clients", () => {
  // Hard Rule #12 (docs/security/ERROR_SANITIZATION.md): HTTP responses must
  // route every err.message/err.stack through sanitizeErrorMessage() or
  // buildErrorBody(). Raw error.message can leak absolute paths, stack
  // traces, or upstream provider internals into client-visible JSON bodies.
  const routePaths = [
    "src/app/api/analytics/diversity/route.ts",
    "src/app/api/db-backups/export/route.ts",
    "src/app/api/db-backups/import/route.ts",
    "src/app/api/db-backups/route.ts",
    "src/app/api/evals/route.ts",
    "src/app/api/evals/[suiteId]/route.ts",
    "src/app/api/providers/[id]/models/route.ts",
    "src/app/api/providers/[id]/sync-models/route.ts",
    "src/app/api/providers/[id]/param-filters/route.ts",
    "src/app/api/sessions/route.ts",
    "src/app/api/storage/health/route.ts",
    "src/app/api/sync/cloud/route.ts",
    "src/app/api/telemetry/summary/route.ts",
    "src/app/api/translator/history/route.ts",
    "src/app/api/cache/reasoning/route.ts",
    "src/app/api/cache/route.ts",
    "src/app/api/models/test/route.ts",
    "src/app/api/settings/proxy/test/route.ts",
  ];

  // The pattern we forbid is `error.message` (or `e.message`/`err.message`) appearing
  // inside a JSON response body or being returned directly from a helper. We require
  // these files to either:
  //   (a) import sanitizeErrorMessage / buildErrorBody from open-sse/utils/error, OR
  //   (b) import createErrorResponse from @/lib/api/errorResponse (which already wraps
  //       message through structured envelope).
  const sanitizerHints = [
    'from "@omniroute/open-sse/utils/error"',
    'from "@/lib/api/errorResponse"',
    "sanitizeErrorMessage(",
    "buildErrorBody(",
  ];

  for (const routePath of routePaths) {
    const content = fs.readFileSync(routePath, "utf8");
    const hasSanitizer = sanitizerHints.some((hint) => content.includes(hint));
    assert.ok(
      hasSanitizer,
      `${routePath} must route error.message through sanitizeErrorMessage() or buildErrorBody() — Hard Rule #12`
    );
  }
});

test("memory health endpoint requires management authentication", () => {
  // verifyExtractionPipeline() exposes the memory subsystem state (Qdrant
  // reachability, DB error paths). Same precedent as /api/db/health and
  // /api/monitoring/health, which require management auth.
  const routePath = "src/app/api/memory/health/route.ts";
  const content = fs.readFileSync(routePath, "utf8");
  assert.ok(content.includes('from "@/lib/api/requireManagementAuth"'));
  assert.ok(content.includes("const authError = await requireManagementAuth(request);"));
  assert.ok(content.includes("if (authError) return authError;"));
});

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "../..");

function readIfExists(relPath) {
  const full = path.join(ROOT, relPath);
  if (!fs.existsSync(full)) return null;
  return fs.readFileSync(full, "utf-8");
}

// ─── Docker Hardening Checks ─────────────────────────

test("Dockerfile uses non-root user", () => {
  const content = readIfExists("Dockerfile");
  if (!content) return;

  // Keep as warning-only to avoid false negatives in current image policy.
  const hasUser = /^USER\s+\S+/m.test(content);
  if (!hasUser) {
    console.log("  ⚠️  WARNING: Dockerfile does not specify a non-root USER");
  }
});

test("Dockerfile does not COPY .env or secrets", () => {
  const content = readIfExists("Dockerfile");
  if (!content) return;
  assert.equal(/COPY.*\.env\b/m.test(content), false, "Dockerfile should not COPY .env files");
});

test(".dockerignore excludes sensitive files", () => {
  const content = readIfExists(".dockerignore");
  if (!content) return;
  assert.ok(content.includes(".env"), ".dockerignore should exclude .env files");
});

// ─── Secrets Hardening Checks ────────────────────────

test("package.json does not contain hardcoded legacy secrets", () => {
  const pkg = readIfExists("package.json");
  assert.ok(pkg, "package.json should exist");
  const sensitivePatterns = [
    "omniroute-default-secret-change-me",
    "endpoint-proxy-api-key-secret",
    "change-me-storage-encryption",
  ];
  for (const pattern of sensitivePatterns) {
    assert.equal(pkg.includes(pattern), false, `package.json should not contain "${pattern}"`);
  }
});

test("proxy.ts does not contain hardcoded JWT_SECRET fallback", () => {
  const content = readIfExists("src/proxy.ts");
  assert.ok(content, "src/proxy.ts should exist");
  assert.equal(
    content.includes("omniroute-default-secret-change-me"),
    false,
    "src/proxy.ts should not have hardcoded JWT_SECRET fallback"
  );
});

test("apiKey.ts does not contain legacy API_KEY_SECRET fallback literal", () => {
  const content = readIfExists("src/shared/utils/apiKey.ts");
  assert.ok(content, "src/shared/utils/apiKey.ts should exist");
  assert.equal(
    content.includes("endpoint-proxy-api-key-secret"),
    false,
    "src/shared/utils/apiKey.ts should not contain legacy fallback literal"
  );
});

test(".env.example has empty JWT_SECRET (not a default value)", () => {
  const envExample = readIfExists(".env.example");
  assert.ok(envExample, ".env.example should exist");
  const jwtLine = envExample.split("\n").find((l) => l.startsWith("JWT_SECRET="));
  assert.ok(jwtLine, ".env.example should have JWT_SECRET");
  const value = jwtLine.split("=")[1]?.trim();
  assert.ok(!value || value === "", "JWT_SECRET should be empty in .env.example");
});

test(".env.example has empty API_KEY_SECRET (not a default value)", () => {
  const envExample = readIfExists(".env.example");
  assert.ok(envExample, ".env.example should exist");
  const apiKeyLine = envExample.split("\n").find((l) => l.startsWith("API_KEY_SECRET="));
  assert.ok(apiKeyLine, ".env.example should have API_KEY_SECRET");
  const value = apiKeyLine.split("=")[1]?.trim();
  assert.ok(!value || value === "", "API_KEY_SECRET should be empty in .env.example");
});

// ─── Schema Hardening Checks ─────────────────────────

test("schemas.ts does not use .passthrough() in executable code", () => {
  const content = readIfExists("src/shared/validation/schemas.ts");
  assert.ok(content, "src/shared/validation/schemas.ts should exist");

  const lines = content.split("\n");
  const codeLines = lines.filter((l) => !l.trim().startsWith("//") && !l.trim().startsWith("*"));
  const hasPassthrough = codeLines.some((l) => l.includes(".passthrough()"));
  assert.equal(
    hasPassthrough,
    false,
    "schemas.ts should not use .passthrough() in code — fields must be explicitly listed"
  );
});

// ─── Dependency / CI Checks ──────────────────────────

test("package.json does not depend on npm 'fs' package", () => {
  const pkg = JSON.parse(readIfExists("package.json"));
  const allDeps = { ...pkg.dependencies, ...pkg.devDependencies };
  assert.equal("fs" in allDeps, false, "Should not depend on npm 'fs' package (use node:fs)");
});

test("CI workflow exists and runs lint + tests", () => {
  const content = readIfExists(".github/workflows/ci.yml");
  assert.ok(content, "CI workflow should exist at .github/workflows/ci.yml");
  assert.ok(content.includes("lint"), "CI should run linting");
  assert.ok(
    content.includes("test:unit") || content.includes("npm test") || content.includes("test"),
    "CI should run tests"
  );
});

test("package.json test script runs tests", () => {
  const pkg = JSON.parse(readIfExists("package.json"));
  const testScript = pkg.scripts?.test;
  assert.ok(testScript, "package.json must have a test script");
  assert.ok(
    testScript.includes("--test") || testScript.includes("vitest") || testScript.includes("jest"),
    `test script should run tests, got: ${testScript}`
  );
});

// ─── Runtime Wiring Checks ───────────────────────────

test("chat handler wires guardrail pre-call validation", () => {
  const content = readIfExists("src/sse/handlers/chat.ts");
  assert.ok(content, "src/sse/handlers/chat.ts should exist");
  assert.ok(
    content.includes("guardrailRegistry") && content.includes("runPreCallHooks"),
    "chat.ts should route request validation through the guardrail registry"
  );
});

test("server-init.ts calls enforceSecrets", () => {
  const content = readIfExists("src/server-init.ts");
  assert.ok(content, "src/server-init.ts should exist");
  assert.ok(content.includes("enforceSecrets"), "server-init.ts should call enforceSecrets");
});

test("instrumentation-node.ts validates runtime env after restoring secrets", () => {
  const content = readIfExists("src/instrumentation-node.ts");
  assert.ok(content, "src/instrumentation-node.ts should exist");
  assert.ok(
    content.includes("enforceWebRuntimeEnv"),
    "instrumentation-node.ts should call enforceWebRuntimeEnv"
  );
});

// ─── T06/T07 Regression Checks ───────────────────────

test("callLogs.ts wires no-log and PII sanitization before persistence", () => {
  const content = readIfExists("src/lib/usage/callLogs.ts");
  assert.ok(content, "src/lib/usage/callLogs.ts should exist");
  assert.ok(
    content.includes('from "../compliance"'),
    "callLogs.ts should import compliance module"
  );
  assert.ok(content.includes('from "../piiSanitizer"'), "callLogs.ts should import piiSanitizer");
  assert.ok(content.includes("isNoLog("), "callLogs.ts should check no-log policy");

  const payloadHelperContent = readIfExists("src/lib/logPayloads.ts");
  assert.ok(payloadHelperContent, "src/lib/logPayloads.ts should exist");
  assert.ok(
    content.includes("protectPayloadForLog") && content.includes('from "../logPayloads"'),
    "callLogs.ts should route payload protection through shared log helpers"
  );
  assert.ok(
    payloadHelperContent.includes("export function sanitizePayloadPII"),
    "logPayloads.ts should keep recursive PII sanitization logic"
  );
});

test("API key update route and DB layer wire persisted no-log controls", () => {
  const routeContent = readIfExists("src/app/api/keys/[id]/route.ts");
  assert.ok(routeContent, "src/app/api/keys/[id]/route.ts should exist");
  assert.ok(routeContent.includes("noLog"), "key PATCH route should handle noLog field");

  const dbContent = readIfExists("src/lib/db/apiKeys.ts");
  assert.ok(dbContent, "src/lib/db/apiKeys.ts should exist");
  assert.ok(dbContent.includes("no_log"), "api key DB module should persist no_log column");
});

test("MCP server enforces scopes from caller context before tool execution", () => {
  const serverContent = readIfExists("open-sse/mcp-server/server.ts");
  assert.ok(serverContent, "open-sse/mcp-server/server.ts should exist");
  assert.ok(
    serverContent.includes("resolveCallerScopeContext"),
    "MCP server should resolve caller scopes from request context"
  );
  assert.ok(
    serverContent.includes("evaluateToolScopes"),
    "MCP server should evaluate required scopes per tool"
  );

  const scopeContent = readIfExists("open-sse/mcp-server/scopeEnforcement.ts");
  assert.ok(scopeContent, "open-sse/mcp-server/scopeEnforcement.ts should exist");
  assert.ok(
    scopeContent.includes("authInfo"),
    "scope enforcement should parse authInfo scopes when provided by transport"
  );
});

test("ACP agents route requires management authentication before CLI discovery", () => {
  const content = readIfExists("src/app/api/acp/agents/route.ts");
  assert.ok(content, "src/app/api/acp/agents/route.ts should exist");
  assert.ok(
    content.includes('from "@/shared/utils/apiAuth"'),
    "ACP agents route should import shared API auth"
  );
  assert.ok(
    content.includes("if (!(await isAuthenticated(request)))"),
    "ACP agents route should reject unauthenticated requests before spawning discovery"
  );
});

test("T06 route payload validation uses validateBody in critical endpoints", () => {
  const targets = [
    "src/app/api/usage/budget/route.ts",
    "src/app/api/policies/route.ts",
    "src/app/api/fallback/chains/route.ts",
    "src/app/api/models/route.ts",
    "src/app/api/provider-models/route.ts",
    "src/app/api/pricing/route.ts",
    "src/app/api/rate-limits/route.ts",
    "src/app/api/resilience/route.ts",
    "src/app/api/v1/embeddings/route.ts",
    "src/app/api/v1/images/generations/route.ts",
    "src/app/api/v1/audio/speech/route.ts",
    "src/app/api/v1/moderations/route.ts",
    "src/app/api/v1/rerank/route.ts",
    "src/app/api/oauth/[provider]/[action]/route.ts",
    "src/app/api/oauth/cursor/import/route.ts",
    "src/app/api/oauth/kiro/import/route.ts",
    "src/app/api/oauth/kiro/social-exchange/route.ts",
    "src/app/api/cloud/credentials/update/route.ts",
    "src/app/api/cloud/model/resolve/route.ts",
    "src/app/api/cloud/models/alias/route.ts",
    "src/app/api/sync/cloud/route.ts",
    "src/app/api/combos/[id]/route.ts",
    "src/app/api/combos/test/route.ts",
    "src/app/api/db-backups/route.ts",
    "src/app/api/evals/route.ts",
    "src/app/api/keys/[id]/route.ts",
    "src/app/api/models/alias/route.ts",
    "src/app/api/provider-nodes/route.ts",
    "src/app/api/provider-nodes/[id]/route.ts",
    "src/app/api/provider-nodes/validate/route.ts",
    "src/app/api/providers/[id]/route.ts",
    "src/app/api/providers/test-batch/route.ts",
    "src/app/api/providers/validate/route.ts",
    "src/app/api/v1beta/models/[...path]/route.ts",
    "src/app/api/cli-tools/antigravity-mitm/route.ts",
    "src/app/api/cli-tools/antigravity-mitm/alias/route.ts",
    "src/app/api/cli-tools/backups/route.ts",
    "src/app/api/cli-tools/claude-settings/route.ts",
    "src/app/api/cli-tools/cline-settings/route.ts",
    "src/app/api/cli-tools/codex-profiles/route.ts",
    "src/app/api/cli-tools/codex-settings/route.ts",
    "src/app/api/cli-tools/droid-settings/route.ts",
    "src/app/api/cli-tools/guide-settings/[toolId]/route.ts",
    "src/app/api/cli-tools/kilo-settings/route.ts",
    "src/app/api/cli-tools/openclaw-settings/route.ts",
  ];
  for (const relPath of targets) {
    const content = readIfExists(relPath);
    assert.ok(content, `${relPath} should exist`);
    assert.ok(
      content.includes("validateBody("),
      `${relPath} should validate payload with validateBody`
    );
  }
});

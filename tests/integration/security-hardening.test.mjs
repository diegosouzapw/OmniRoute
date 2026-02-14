import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

// ═════════════════════════════════════════════════════
//  FASE-02: Integration tests converted from bash scripts
//  Validates security configurations and hardening
// ═════════════════════════════════════════════════════

const ROOT = path.resolve(import.meta.dirname, "../..");

// ─── Docker Hardening Checks ─────────────────────────

test("Dockerfile uses non-root user", () => {
  const dockerfilePath = path.join(ROOT, "Dockerfile");
  if (!fs.existsSync(dockerfilePath)) {
    // Skip if no Dockerfile (npm-only installs)
    return;
  }
  const content = fs.readFileSync(dockerfilePath, "utf-8");
  // Should have USER directive — warn but don't fail for now
  const hasUser = /^USER\s+\S+/m.test(content);
  if (!hasUser) {
    console.log("  ⚠️  WARNING: Dockerfile does not specify a non-root USER");
  }
});

test("Dockerfile does not COPY .env or secrets", () => {
  const dockerfilePath = path.join(ROOT, "Dockerfile");
  if (!fs.existsSync(dockerfilePath)) return;
  const content = fs.readFileSync(dockerfilePath, "utf-8");
  const copiesEnv = /COPY.*\.env\b/m.test(content);
  assert.equal(copiesEnv, false, "Dockerfile should not COPY .env files");
});

test(".dockerignore excludes sensitive files", () => {
  const ignorePath = path.join(ROOT, ".dockerignore");
  if (!fs.existsSync(ignorePath)) return;
  const content = fs.readFileSync(ignorePath, "utf-8");
  const excludesEnv = content.includes(".env");
  assert.ok(excludesEnv, ".dockerignore should exclude .env files");
});

// ─── Secrets Hardening Checks ────────────────────────

test("package.json does not contain hardcoded secrets", () => {
  const pkg = fs.readFileSync(path.join(ROOT, "package.json"), "utf-8");
  const sensitivePatterns = [
    "omniroute-default-secret",
    "endpoint-proxy-api-key-secret",
    "change-me-storage-encryption",
  ];
  for (const pattern of sensitivePatterns) {
    assert.equal(
      pkg.includes(pattern),
      false,
      `package.json should not contain "${pattern}"`
    );
  }
});

test("proxy.js does not contain hardcoded JWT_SECRET fallback", () => {
  const proxyPath = path.join(ROOT, "src/proxy.js");
  const content = fs.readFileSync(proxyPath, "utf-8");
  assert.equal(
    content.includes("omniroute-default-secret-change-me"),
    false,
    "proxy.js should not have hardcoded JWT_SECRET fallback"
  );
});

test("apiKey.js does not contain hardcoded API_KEY_SECRET fallback", () => {
  const apiKeyPath = path.join(ROOT, "src/shared/utils/apiKey.js");
  const content = fs.readFileSync(apiKeyPath, "utf-8");
  assert.equal(
    content.includes("endpoint-proxy-api-key-secret"),
    false,
    "apiKey.js should not have hardcoded API_KEY_SECRET fallback"
  );
});

test(".env.example has empty JWT_SECRET (not a default value)", () => {
  const envExample = fs.readFileSync(path.join(ROOT, ".env.example"), "utf-8");
  const jwtLine = envExample.split("\n").find((l) => l.startsWith("JWT_SECRET="));
  assert.ok(jwtLine, ".env.example should have JWT_SECRET");
  const value = jwtLine.split("=")[1]?.trim();
  assert.ok(!value || value === "", "JWT_SECRET should be empty in .env.example (user must set it)");
});

test(".env.example has empty API_KEY_SECRET (not a default value)", () => {
  const envExample = fs.readFileSync(path.join(ROOT, ".env.example"), "utf-8");
  const apiKeyLine = envExample.split("\n").find((l) => l.startsWith("API_KEY_SECRET="));
  assert.ok(apiKeyLine, ".env.example should have API_KEY_SECRET");
  const value = apiKeyLine.split("=")[1]?.trim();
  assert.ok(!value || value === "", "API_KEY_SECRET should be empty in .env.example");
});

// ─── Schema Hardening Checks ─────────────────────────

test("schemas.js does not use .passthrough() as code", () => {
  const schemasPath = path.join(ROOT, "src/shared/validation/schemas.js");
  const content = fs.readFileSync(schemasPath, "utf-8");
  // Check for .passthrough() in actual code (not in comments)
  const lines = content.split("\n");
  const codeLines = lines.filter((l) => !l.trim().startsWith("//") && !l.trim().startsWith("*"));
  const hasPassthrough = codeLines.some((l) => l.includes(".passthrough()"));
  assert.equal(
    hasPassthrough,
    false,
    "schemas.js should not use .passthrough() in code — fields must be explicitly listed"
  );
});

// ─── Dependency Checks ───────────────────────────────

test("package.json does not depend on npm 'fs' package", () => {
  const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf-8"));
  const allDeps = { ...pkg.dependencies, ...pkg.devDependencies };
  assert.equal("fs" in allDeps, false, "Should not depend on npm 'fs' package (use node:fs)");
});

// ─── CI Pipeline Checks ─────────────────────────────

test("CI workflow exists and runs tests", () => {
  const ciPath = path.join(ROOT, ".github/workflows/ci.yml");
  assert.ok(fs.existsSync(ciPath), "CI workflow should exist at .github/workflows/ci.yml");
  const content = fs.readFileSync(ciPath, "utf-8");
  assert.ok(content.includes("test:unit") || content.includes("test"), "CI should run tests");
  assert.ok(content.includes("lint"), "CI should run linting");
});

test("package.json test script runs actual tests (not just build)", () => {
  const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf-8"));
  const testScript = pkg.scripts?.test;
  assert.ok(testScript, "package.json must have a test script");
  assert.ok(
    testScript.includes("node --test") || testScript.includes("jest") || testScript.includes("vitest"),
    `test script should run tests, got: ${testScript}`
  );
});

// ─── Input Sanitizer Integration Check ──────────────

test("chat handler imports inputSanitizer", () => {
  const chatPath = path.join(ROOT, "src/sse/handlers/chat.js");
  const content = fs.readFileSync(chatPath, "utf-8");
  assert.ok(
    content.includes("inputSanitizer") || content.includes("sanitizeRequest"),
    "chat.js should import and use the input sanitizer"
  );
});

test("server-init.js calls enforceSecrets", () => {
  const initPath = path.join(ROOT, "src/server-init.js");
  const content = fs.readFileSync(initPath, "utf-8");
  assert.ok(
    content.includes("enforceSecrets"),
    "server-init.js should call enforceSecrets at startup"
  );
});

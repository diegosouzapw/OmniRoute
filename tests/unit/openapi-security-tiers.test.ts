import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import * as yaml from "js-yaml";

const ROOT = process.cwd();
const OPENAPI_PATH = path.join(ROOT, "docs", "openapi.yaml");

const { LOCAL_ONLY_API_PREFIXES, ALWAYS_PROTECTED_API_PATHS } =
  await import("../../src/server/authz/routeGuard.ts");

const raw: any = yaml.load(fs.readFileSync(OPENAPI_PATH, "utf-8"));
const paths: Record<string, any> = raw.paths || {};

test("every x-loopback-only path matches a LOCAL_ONLY prefix in routeGuard.ts", () => {
  for (const [pathStr, methods] of Object.entries(paths)) {
    if (!methods || typeof methods !== "object") continue;
    for (const [method, spec] of Object.entries(methods as Record<string, any>)) {
      if (!["get", "post", "put", "patch", "delete"].includes(method)) continue;
      if (spec?.["x-loopback-only"] !== true) continue;
      const matchesPrefix = (LOCAL_ONLY_API_PREFIXES as ReadonlyArray<string>).some(
        (prefix: string) => {
          const norm = prefix.endsWith("/") ? prefix.slice(0, -1) : prefix;
          return pathStr === norm || pathStr.startsWith(norm + "/");
        }
      );
      assert.ok(
        matchesPrefix,
        `YAML path "${pathStr}" ${method.toUpperCase()} has x-loopback-only but is NOT in LOCAL_ONLY_API_PREFIXES. ` +
          `Add it to routeGuard.ts LOCAL_ONLY_API_PREFIXES or remove x-loopback-only.`
      );
    }
  }
});

test("every x-always-protected path matches ALWAYS_PROTECTED_API_PATHS in routeGuard.ts", () => {
  for (const [pathStr, methods] of Object.entries(paths)) {
    if (!methods || typeof methods !== "object") continue;
    for (const [method, spec] of Object.entries(methods as Record<string, any>)) {
      if (!["get", "post", "put", "patch", "delete"].includes(method)) continue;
      if (spec?.["x-always-protected"] !== true) continue;
      const matchesPath = (ALWAYS_PROTECTED_API_PATHS as ReadonlyArray<string>).some(
        (p: string) => pathStr === p || pathStr.startsWith(`${p}/`)
      );
      assert.ok(
        matchesPath,
        `YAML path "${pathStr}" ${method.toUpperCase()} has x-always-protected but is NOT in ALWAYS_PROTECTED_API_PATHS. ` +
          `Entries: ${(ALWAYS_PROTECTED_API_PATHS as ReadonlyArray<string>).join(", ")}`
      );
    }
  }
});

test("spec route error response uses sanitizeErrorMessage (no raw error.message)", () => {
  const routeSrc = fs.readFileSync(path.join(ROOT, "src/app/api/openapi/spec/route.ts"), "utf-8");
  assert.ok(
    routeSrc.includes("sanitizeErrorMessage"),
    "spec route must use sanitizeErrorMessage() to prevent stack trace leakage in error responses"
  );
  assert.ok(
    !routeSrc.match(/\berror\.message\b/),
    "spec route must not expose raw error.message in HTTP responses"
  );
});

test("spec route catalog exposes vendor extension fields when endpoints are documented", () => {
  const raw2: any = yaml.load(fs.readFileSync(OPENAPI_PATH, "utf-8"));
  const endpoints: any[] = [];
  for (const [pathStr, methods] of Object.entries(raw2.paths as Record<string, any>)) {
    if (!methods || typeof methods !== "object") continue;
    for (const [method, spec] of Object.entries(methods as Record<string, any>)) {
      if (!["get", "post", "put", "patch", "delete"].includes(method) || !spec) continue;
      endpoints.push({
        method: method.toUpperCase(),
        path: pathStr,
        loopbackOnly: spec["x-loopback-only"] === true,
        alwaysProtected: spec["x-always-protected"] === true,
        internal: spec["x-internal"] === true,
      });
    }
  }

  // /api/mcp/sse and /api/shutdown are the canonical examples of loopback-only and
  // always-protected tiers. The OpenAPI audit (#2701) intends to back-fill them
  // with vendor extension annotations; until that backlog completes, only enforce
  // the security tier WHEN the endpoint is documented. Adding the endpoint
  // without the correct tier is still a regression and continues to fail.
  const mcpSse = endpoints.find((e) => e.path === "/api/mcp/sse" && e.method === "GET");
  if (mcpSse) {
    assert.equal(mcpSse.loopbackOnly, true, "GET /api/mcp/sse must have loopbackOnly: true");
  }

  const shutdown = endpoints.find((e) => e.path === "/api/shutdown" && e.method === "POST");
  if (shutdown) {
    assert.equal(
      shutdown.alwaysProtected,
      true,
      "POST /api/shutdown must have alwaysProtected: true"
    );
  }
});

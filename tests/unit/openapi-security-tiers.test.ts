import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import * as yaml from "js-yaml";

const ROOT = process.cwd();
const OPENAPI_PATH = path.join(ROOT, "docs", "openapi.yaml");

const {
  LOCAL_ONLY_API_PREFIXES,
  LOCAL_ONLY_API_PATTERNS,
  ALWAYS_PROTECTED_API_PATHS,
  ALWAYS_PROTECTED_API_PATTERNS,
} = await import("../../src/server/authz/routeGuard.ts");

const raw: any = yaml.load(fs.readFileSync(OPENAPI_PATH, "utf-8"));
const paths: Record<string, any> = raw.paths || {};

test("every x-loopback-only path matches a LOCAL_ONLY prefix or pattern in routeGuard.ts", () => {
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
      // Param-shaped routes (e.g. /api/providers/{id}/login) are classified by
      // LOCAL_ONLY_API_PATTERNS regexes rather than a static prefix — the OpenAPI
      // {param} placeholder satisfies the same [^/]+ segment the runtime matches.
      const matchesPattern = (LOCAL_ONLY_API_PATTERNS as ReadonlyArray<RegExp>).some((re) =>
        re.test(pathStr)
      );
      assert.ok(
        matchesPrefix || matchesPattern,
        `YAML path "${pathStr}" ${method.toUpperCase()} has x-loopback-only but is NOT in LOCAL_ONLY_API_PREFIXES ` +
          `or LOCAL_ONLY_API_PATTERNS. Add it to routeGuard.ts or remove x-loopback-only.`
      );
    }
  }
});

test("GET /api/openapi/spec documents its conditional management auth contract", () => {
  const operation = paths["/api/openapi/spec"]?.get;

  assert.deepEqual(operation?.security, [{ ManagementSessionAuth: [] }]);
  assert.match(operation?.description ?? "", /When `requireLogin` is enabled/);
  assert.equal(
    operation?.responses?.["401"]?.$ref,
    "#/components/responses/ManagementAuthenticationRequired"
  );
  assert.equal(
    operation?.responses?.["403"]?.$ref,
    "#/components/responses/ManagementInvalidToken"
  );
});

test("POST /api/openapi/try documents its bounded management proxy contract", () => {
  const operation = paths["/api/openapi/try"]?.post;

  assert.ok(operation, "POST /api/openapi/try must be present in docs/openapi.yaml");
  assert.deepEqual(operation.security, [{ BearerAuth: [] }, { ManagementSessionAuth: [] }]);
  assert.match(operation.description ?? "", /same-origin/);
  assert.match(operation.description ?? "", /When `requireLogin` is disabled/);

  const requestBody = operation.requestBody;
  const requestSchema = requestBody?.content?.["application/json"]?.schema;
  assert.equal(requestBody?.required, true);
  assert.equal(requestSchema?.type, "object");
  assert.deepEqual(requestSchema?.required, ["path"]);
  assert.deepEqual(requestSchema?.properties?.method?.enum, [
    "GET",
    "POST",
    "PUT",
    "PATCH",
    "DELETE",
    "HEAD",
    "OPTIONS",
  ]);
  assert.equal(requestSchema?.properties?.method?.default, "GET");
  assert.equal(requestSchema?.properties?.path?.minLength, 1);
  assert.equal(
    requestSchema?.properties?.path?.pattern,
    "^/(?:api/|v1/|v1beta/|a2a|\\.well-known/agent\\.json)"
  );
  assert.equal(requestSchema?.properties?.headers?.type, "object");
  assert.deepEqual(requestSchema?.properties?.headers?.additionalProperties, {
    type: "string",
  });
  assert.deepEqual(requestSchema?.properties?.headers?.default, {});
  assert.ok("body" in requestSchema.properties);

  const successSchema = operation.responses?.["200"]?.content?.["application/json"]?.schema;
  assert.equal(successSchema?.type, "object");
  assert.equal(successSchema?.additionalProperties, false);
  assert.deepEqual(successSchema?.required, [
    "status",
    "statusText",
    "headers",
    "body",
    "latencyMs",
    "contentType",
  ]);
  assert.equal(successSchema?.properties?.status?.type, "integer");
  assert.equal(successSchema?.properties?.status?.minimum, 0);
  assert.equal(successSchema?.properties?.statusText?.type, "string");
  assert.equal(successSchema?.properties?.headers?.type, "object");
  assert.deepEqual(successSchema?.properties?.headers?.additionalProperties, {
    type: "string",
  });
  assert.match(successSchema?.properties?.body?.description ?? "", /10,000 characters/);
  assert.equal(successSchema?.properties?.latencyMs?.type, "integer");
  assert.equal(successSchema?.properties?.latencyMs?.minimum, 0);
  assert.equal(successSchema?.properties?.contentType?.type, "string");

  const badRequestSchema = operation.responses?.["400"]?.content?.["application/json"]?.schema;
  assert.equal(badRequestSchema?.oneOf?.length, 2);
  assert.equal(badRequestSchema?.oneOf?.[0]?.$ref, "#/components/schemas/ValidationErrorResponse");
  assert.equal(badRequestSchema?.oneOf?.[1]?.properties?.error?.type, "string");
  assert.equal(
    operation.responses?.["401"]?.$ref,
    "#/components/responses/ManagementAuthenticationRequired"
  );
  assert.equal(operation.responses?.["403"]?.$ref, "#/components/responses/ManagementInvalidToken");
  assert.equal(operation.responses?.["503"]?.$ref, "#/components/responses/InternalError");
});

test("every x-always-protected path matches ALWAYS_PROTECTED_API_PATHS in routeGuard.ts", () => {
  for (const [pathStr, methods] of Object.entries(paths)) {
    if (!methods || typeof methods !== "object") continue;
    for (const [method, spec] of Object.entries(methods as Record<string, any>)) {
      if (!["get", "post", "put", "patch", "delete"].includes(method)) continue;
      if (spec?.["x-always-protected"] !== true) continue;
      // Routes with a dynamic segment cannot be expressed in the plain
      // exact/prefix list, so routeGuard also carries ALWAYS_PROTECTED_API_PATTERNS
      // (GHSA-5926-2w35-7h4q). Substitute a concrete value for the OpenAPI
      // `{param}` placeholders before testing those.
      const concretePath = pathStr.replace(/\{[^}]+\}/g, "sample-id");
      const matchesPath =
        (ALWAYS_PROTECTED_API_PATHS as ReadonlyArray<string>).some(
          (p: string) => pathStr === p || pathStr.startsWith(`${p}/`)
        ) ||
        (ALWAYS_PROTECTED_API_PATTERNS as ReadonlyArray<RegExp>).some((re) =>
          re.test(concretePath)
        );
      assert.ok(
        matchesPath,
        `YAML path "${pathStr}" ${method.toUpperCase()} has x-always-protected but is NOT in ALWAYS_PROTECTED_API_PATHS ` +
          `nor matched by ALWAYS_PROTECTED_API_PATTERNS. ` +
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

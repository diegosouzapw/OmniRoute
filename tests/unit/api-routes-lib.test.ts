/**
 * Shared API route collector — locks path normalization used by openapi + docs gates.
 */
import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import {
  collectApiRouteFiles,
  collectApiRouteUrlPaths,
  toApiUrlPath,
} from "../../scripts/check/lib/apiRoutes.mjs";

test("toApiUrlPath maps [id] and [...slug] to OpenAPI-style braces", () => {
  const apiRoot = path.join("C:", "repo", "src", "app", "api");
  assert.equal(
    toApiUrlPath(path.join(apiRoot, "providers", "[id]", "models"), apiRoot).replace(/\\/g, "/"),
    "/api/providers/{id}/models"
  );
  assert.equal(
    toApiUrlPath(path.join(apiRoot, "files", "[...path]"), apiRoot).replace(/\\/g, "/"),
    "/api/files/{path}"
  );
});

test("live repo has route files and matching URL paths", () => {
  const files = collectApiRouteFiles();
  const urls = collectApiRouteUrlPaths();
  assert.ok(files.size > 50, `expected many route files, got ${files.size}`);
  assert.ok(urls.length > 50, `expected many url paths, got ${urls.length}`);
  assert.equal(files.size, urls.length, "each route file should yield one URL path");
  assert.ok([...files].every((f) => f.startsWith("src/app/api/") && /route\.tsx?$/.test(f)));
  assert.ok(urls.every((u) => u.startsWith("/api")));
});

import { test } from "node:test";
import assert from "node:assert";
import {
  normalizeParams,
  findSpecPathsWithoutRoute,
} from "../../scripts/check/check-openapi-routes.mjs";

test("normalizeParams collapses any {param} name to {}", () => {
  assert.equal(normalizeParams("/api/providers/{providerId}/models"), "/api/providers/{}/models");
});

test("documented path with a real route is not flagged", () => {
  assert.deepEqual(findSpecPathsWithoutRoute(["/api/usage"], ["/api/usage"]), []);
});

test("param name mismatch still matches (param-insensitive)", () => {
  assert.deepEqual(
    findSpecPathsWithoutRoute(["/api/providers/{id}"], ["/api/providers/{providerId}"]),
    []
  );
});

test("flags a documented path that has no real route (invented endpoint)", () => {
  assert.deepEqual(findSpecPathsWithoutRoute(["/api/ghost", "/api/usage"], ["/api/usage"]), [
    "/api/ghost",
  ]);
});

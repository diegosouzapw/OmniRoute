import { test } from "node:test";
import assert from "node:assert";
import { resolveApiPathToRoute } from "../../scripts/check/check-fetch-targets.mjs";

test("matches a static route file", () => {
  const files = new Set(["src/app/api/usage/route.ts"]);
  assert.equal(resolveApiPathToRoute("/api/usage", files), true);
});

test("matches a dynamic [param] segment", () => {
  const files = new Set(["src/app/api/providers/[id]/models/route.ts"]);
  assert.equal(resolveApiPathToRoute("/api/providers/abc-123/models", files), true);
});

test("rejects a hallucinated route", () => {
  const files = new Set(["src/app/api/usage/route.ts"]);
  assert.equal(resolveApiPathToRoute("/api/providers/refresh", files), false);
});

test("does not match when segment counts differ", () => {
  const files = new Set(["src/app/api/providers/[id]/route.ts"]);
  assert.equal(resolveApiPathToRoute("/api/providers/abc/models", files), false);
});

test("strips query string before resolving", () => {
  const files = new Set(["src/app/api/usage/route.ts"]);
  assert.equal(resolveApiPathToRoute("/api/usage?range=7d", files), true);
});

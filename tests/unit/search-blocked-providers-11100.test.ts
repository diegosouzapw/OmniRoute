import test from "node:test";
import assert from "node:assert/strict";
import { getAllSearchProviders } from "../../open-sse/config/searchRegistry.ts";

test("getAllSearchProviders filters out blocked providers", () => {
  const all = getAllSearchProviders();
  assert.ok(all.some((p) => p.id === "serper-search"));

  const filtered = getAllSearchProviders(["serper-search"]);
  assert.equal(filtered.some((p) => p.id === "serper-search"), false);
});

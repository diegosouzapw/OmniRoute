import { describe, it, after } from "node:test";
import assert from "node:assert/strict";
import { getDbInstance, resetDbInstance } from "../../src/lib/db/core";

describe("migration 099 proxy family column", () => {
  after(() => resetDbInstance());
  it("adds a family column defaulting to 'auto' on proxy_registry", () => {
    const db = getDbInstance();
    const cols = db.prepare("PRAGMA table_info(proxy_registry)").all() as Array<{ name: string }>;
    assert.ok(cols.some((c) => c.name === "family"), "proxy_registry.family must exist");
  });
  it("adds a family column on upstream_proxy_config", () => {
    const db = getDbInstance();
    const cols = db.prepare("PRAGMA table_info(upstream_proxy_config)").all() as Array<{ name: string }>;
    assert.ok(cols.some((c) => c.name === "family"), "upstream_proxy_config.family must exist");
  });
});

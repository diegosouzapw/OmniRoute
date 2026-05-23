import { describe, it } from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";

describe("i18n pt-BR integrity", () => {
  it("should be a valid JSON file", () => {
    const ptPath = path.resolve("src/i18n/messages/pt-BR.json");
    const content = fs.readFileSync(ptPath, "utf8");
    const json = JSON.parse(content);
    assert.strictEqual(typeof json, "object");
    assert.ok(json.common);
    assert.ok(json.settings);
  });

  it("should contain critical keys for the dashboard", () => {
    const ptPath = path.resolve("src/i18n/messages/pt-BR.json");
    const json = JSON.parse(fs.readFileSync(ptPath, "utf8"));

    // Critical keys we refactored
    assert.ok(json.settings.routingAntigravitySignatureDesc);
    assert.ok(json.agents.howToUseStep1);
    assert.ok(json.cache.loadingCacheAria);
    assert.ok(json.analytics.usageAnalyticsTitle);
  });
});

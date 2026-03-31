import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { getSettings, updateSettings } from "../../src/lib/db/settings.ts";

describe("Settings API - debugMode and hiddenSidebarItems", () => {
  describe("debugMode", () => {
    test("updateSettings with debugMode=true succeeds", async () => {
      const result = await updateSettings({ debugMode: true });
      assert.ok(result, "updateSettings should return truthy result");

      const settings = await getSettings();
      assert.strictEqual(settings.debugMode, true, "debugMode should be true");
    });

    test("updateSettings with debugMode=false succeeds", async () => {
      const result = await updateSettings({ debugMode: false });
      assert.ok(result, "updateSettings should return truthy result");

      const settings = await getSettings();
      assert.strictEqual(settings.debugMode, false, "debugMode should be false");
    });
  });

  describe("hiddenSidebarItems", () => {
    test("updateSettings with hiddenSidebarItems=['translator'] succeeds", async () => {
      const result = await updateSettings({ hiddenSidebarItems: ["translator"] });
      assert.ok(result, "updateSettings should return truthy result");

      const settings = await getSettings();
      assert.deepStrictEqual(
        settings.hiddenSidebarItems,
        ["translator"],
        "hiddenSidebarItems should contain translator"
      );
    });

    test("updateSettings with empty hiddenSidebarItems succeeds", async () => {
      const result = await updateSettings({ hiddenSidebarItems: [] });
      assert.ok(result, "updateSettings should return truthy result");

      const settings = await getSettings();
      assert.deepStrictEqual(
        settings.hiddenSidebarItems,
        [],
        "hiddenSidebarItems should be empty array"
      );
    });
  });

  describe("combined updates", () => {
    test("updateSettings with both debugMode and hiddenSidebarItems succeeds", async () => {
      const result = await updateSettings({
        debugMode: true,
        hiddenSidebarItems: ["translator"],
      });
      assert.ok(result, "updateSettings should return truthy result");

      const settings = await getSettings();
      assert.strictEqual(settings.debugMode, true, "debugMode should be true");
      assert.deepStrictEqual(
        settings.hiddenSidebarItems,
        ["translator"],
        "hiddenSidebarItems should be updated"
      );
    });
  });
});

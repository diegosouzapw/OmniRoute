import { test } from "node:test";
import assert from "node:assert/strict";
import { isAutoStartEnabled } from "../../../bin/cli/tray/autostart.ts";

test("isAutoStartEnabled does not throw and returns boolean", async () => {
  const result = await isAutoStartEnabled();
  assert.equal(typeof result, "boolean");
});

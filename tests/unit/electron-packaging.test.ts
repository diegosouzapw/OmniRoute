import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const ROOT = join(import.meta.dirname, "..", "..");

test("electron build copies standalone runtime dependencies into resources/app/node_modules", () => {
  const electronPackage = JSON.parse(readFileSync(join(ROOT, "electron", "package.json"), "utf8"));

  const extraResources = electronPackage.build?.extraResources;
  assert.ok(Array.isArray(extraResources), "electron build.extraResources must be an array");

  assert.deepEqual(
    extraResources.find(
      (resource) =>
        resource?.from === "../.next/electron-standalone/node_modules" &&
        resource?.to === "app/node_modules"
    ),
    {
      from: "../.next/electron-standalone/node_modules",
      to: "app/node_modules",
      filter: ["**/*"],
    }
  );
});

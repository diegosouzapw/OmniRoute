import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const source = readFileSync(resolve("src/instrumentation-node.ts"), "utf8");

test("registerNodejs warms model catalog cache at startup", () => {
  assert.ok(
    source.includes('import("@/app/api/v1/models/catalog")'),
    "instrumentation-node.ts should lazy-import the catalog module"
  );
  assert.ok(
    source.includes("getUnifiedModelsResponse"),
    "instrumentation-node.ts should call getUnifiedModelsResponse for warmup"
  );
  assert.ok(
    source.includes("[STARTUP] Model catalog cache warmed"),
    "instrumentation-node.ts should log successful warmup"
  );
});

test("warmup failure is non-fatal", () => {
  assert.ok(source.includes("non-fatal"), "warmup failure should be non-fatal");
});

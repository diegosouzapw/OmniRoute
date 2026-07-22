import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = join(__dirname, "..", "..");

const src = readFileSync(join(repoRoot, "src/shared/validation/compressionConfigSchemas.ts"), "utf-8");
const ui = readFileSync(join(repoRoot, "src/shared/components/compression/EngineConfigPage.tsx"), "utf-8");
const engine = readFileSync(join(repoRoot, "open-sse/services/compression/strategySelector.ts"), "utf-8");

test("#8056: headroom is in SETTINGS_SUBOBJECT", () => {
  assert.match(ui, /headroom:\s*"headroom"/, "headroom must be in SETTINGS_SUBOBJECT map");
});

test("#8056: headroomConfigSchema exists with minRows", () => {
  assert.match(src, /headroomConfigSchema/, "headroomConfigSchema must be exported");
  assert.match(src, /minRows.*z\.number\(\)\.int\(\)\.min\(2\)/, "minRows field must be validated");
});

test("#8056: headroom added to compressionSettingsUpdateSchema", () => {
  assert.match(src, /headroom:\s*headroomConfigSchema\.optional\(\)/, "headroom must be in update schema");
});

test("#8056: buildStepOptions injects headroom config from store", () => {
  assert.match(engine, /headroomConfig/, "buildStepOptions must read headroom config");
  assert.match(engine, /step\.engine === "headroom"/, "must check for headroom engine id");
});

test("#8056: stale comment about structural engines removed", () => {
  assert.doesNotMatch(
    ui,
    /Structural engines.*have no sub-object yet/,
    "stale comment about structural engines must be removed"
  );
});

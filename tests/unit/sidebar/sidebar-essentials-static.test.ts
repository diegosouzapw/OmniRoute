import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");

test("essentials preset is registered in sidebar visibility types and presets", () => {
  const types = fs.readFileSync(
    path.join(repoRoot, "src/shared/constants/sidebarVisibility/types.ts"),
    "utf8"
  );
  const visibility = fs.readFileSync(
    path.join(repoRoot, "src/shared/constants/sidebarVisibility.ts"),
    "utf8"
  );
  const schema = fs.readFileSync(
    path.join(repoRoot, "src/shared/validation/settingsSchemas.ts"),
    "utf8"
  );

  assert.match(types, /"essentials"/);
  assert.match(visibility, /id:\s*"essentials"/);
  assert.match(visibility, /ESSENTIALS_ADVANCED_TOOL_IDS/);
  assert.match(schema, /"essentials"/);
});

test("command palette keeps essentials advanced tools searchable", () => {
  const source = fs.readFileSync(
    path.join(repoRoot, "src/shared/components/CommandPalette.tsx"),
    "utf8"
  );
  assert.match(source, /ESSENTIALS_ADVANCED_TOOL_IDS/);
  assert.match(source, /activePreset === "essentials"/);
});

test("essentials i18n keys exist in en.json", () => {
  const en = JSON.parse(
    fs.readFileSync(path.join(repoRoot, "src/i18n/messages/en.json"), "utf8")
  ) as { settings: Record<string, string> };
  assert.equal(en.settings.presetEssentials, "Essentials");
  assert.match(en.settings.presetEssentialsDesc, /Beginner path/i);
  assert.match(en.settings.presetEssentialsDesc, /searchable/i);
});

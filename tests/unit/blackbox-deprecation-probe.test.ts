import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const blackboxRegistryPath = join(
  __dirname,
  "../../open-sse/config/providers/registry/blackbox/index.ts",
);
const blackboxMetaPath = join(
  __dirname,
  "../../src/shared/constants/providers/apikey/frontier-labs.ts",
);

test("probe: blackbox runtime registry still points at api.blackbox.ai (bug present)", () => {
  const src = readFileSync(blackboxRegistryPath, "utf8");
  assert.match(src, /api\.blackbox\.ai\/v1\/chat\/completions/);
  assert.match(src, /api\.blackbox\.ai\/v1\/models/);
});

test("guard: blackbox metadata is marked deprecated because api.blackbox.ai is dead", () => {
  const meta = readFileSync(blackboxMetaPath, "utf8");
  const block = meta.split(/\n\s*blackbox:\s*\{/)[1]?.split(/\n\s*\w+:\s*\{/)[0] ?? "";
  assert.ok(block.includes("deprecated: true"));
  assert.ok(block.includes('riskNoticeVariant: "deprecated"'));
  assert.ok(block.includes("deprecationReason"));
});
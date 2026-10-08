import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

test("imageRegistryData.ts is client-safe (no server-only / featureFlags / db imports)", () => {
  const filePath = path.join(REPO_ROOT, "open-sse/config/imageRegistryData.ts");
  assert.ok(fs.existsSync(filePath), "imageRegistryData.ts must exist");

  const source = fs.readFileSync(filePath, "utf8");

  // Must not import server-only DB or featureFlag utilities (#10692)
  assert.ok(
    !source.includes("@/shared/utils/featureFlags"),
    "imageRegistryData.ts must not import featureFlags"
  );
  assert.ok(!source.includes("@/lib/db"), "imageRegistryData.ts must not import db modules");
  assert.ok(!source.includes("node:fs"), "imageRegistryData.ts must not import node:fs");
  assert.ok(!source.includes("node:net"), "imageRegistryData.ts must not import node:net");
});

test("imageRegistry.ts re-exports IMAGE_PROVIDERS from imageRegistryData.ts", async () => {
  const { IMAGE_PROVIDERS: fromData } = await import("../../open-sse/config/imageRegistryData.ts");
  const { IMAGE_PROVIDERS: fromRegistry } = await import("../../open-sse/config/imageRegistry.ts");

  assert.equal(fromRegistry, fromData, "re-exported IMAGE_PROVIDERS must match identical instance");
  assert.ok(Object.keys(fromData).length > 20, "IMAGE_PROVIDERS must contain registered providers");
});

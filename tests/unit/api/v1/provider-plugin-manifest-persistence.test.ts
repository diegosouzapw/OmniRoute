/**
 * Manifest injection must follow 9router providerExpose from DB state.
 */

import assert from "node:assert/strict";
import { beforeEach, describe, it } from "node:test";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-provider-manifest-exposure-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.NODE_ENV = "test";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../../../src/lib/db/core.ts");
const { getServiceRow, upsertVersionManagerTool, updateVersionManagerTool } = await import(
  "../../../../src/lib/db/versionManager.ts"
);

const { generateProviderPluginManifest } =
  await import("@omniroute/open-sse/config/providerPluginManifestRegistry.ts");
const { injectServiceModelsIntoManifest } =
  await import("../../../../src/app/api/v1/provider-plugin-manifest/route.ts");

function resetDb() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

describe("provider plugin manifest DB-driven exposure", () => {
  beforeEach(() => {
    resetDb();
  });

  it("injects live models when 9router row is missing providerExpose", async () => {
    const manifest = generateProviderPluginManifest();
    const result = await injectServiceModelsIntoManifest(manifest, () => [{ id: "a-model" }]);

    const provider = result.providers.find((entry) => entry.id === "9router");
    assert.ok(provider);
    assert.equal(provider?.models.some((model) => model.id === "9router/a-model"), true);
  });

  it("injects live models when 9router providerExpose is true", async () => {
    await upsertVersionManagerTool({ tool: "9router", status: "stopped" });
    await updateVersionManagerTool("9router", { providerExpose: true });

    const manifest = generateProviderPluginManifest();
    const result = await injectServiceModelsIntoManifest(manifest, () => [{ id: "a-model" }]);

    const row = await getServiceRow("9router");
    assert.equal(row?.providerExpose, true);

    const provider = result.providers.find((entry) => entry.id === "9router");
    assert.ok(provider);
    assert.equal(provider?.models.some((model) => model.id === "9router/a-model"), true);
  });

  it("skips live models when 9router providerExpose is false", async () => {
    await upsertVersionManagerTool({ tool: "9router", status: "stopped" });
    await updateVersionManagerTool("9router", { providerExpose: false });

    const manifest = generateProviderPluginManifest();
    const result = await injectServiceModelsIntoManifest(manifest, () => [{ id: "a-model" }]);

    const row = await getServiceRow("9router");
    assert.equal(row?.providerExpose, false);

    const provider = result.providers.find((entry) => entry.id === "9router");
    assert.ok(provider);
    assert.equal(provider?.models.some((model) => model.id === "9router/a-model"), false);
  });

  it("injects cliproxyapi models when cliproxy row is missing providerExpose", async () => {
    const manifest = generateProviderPluginManifest();
    const result = await injectServiceModelsIntoManifest(manifest, () => [{ id: "b-model" }]);

    const provider = result.providers.find((entry) => entry.id === "cliproxyapi");
    assert.ok(provider);
    assert.equal(provider?.models.some((model) => model.id === "cliproxyapi/b-model"), true);
  });

  it("injects cliproxyapi models when cliproxy providerExpose is true", async () => {
    await upsertVersionManagerTool({ tool: "cliproxy", status: "stopped" });
    await updateVersionManagerTool("cliproxy", { providerExpose: true });

    const manifest = generateProviderPluginManifest();
    const result = await injectServiceModelsIntoManifest(manifest, () => [{ id: "b-model" }]);

    const row = await getServiceRow("cliproxy");
    assert.equal(row?.providerExpose, true);

    const provider = result.providers.find((entry) => entry.id === "cliproxyapi");
    assert.ok(provider);
    assert.equal(provider?.models.some((model) => model.id === "cliproxyapi/b-model"), true);
  });

  it("skips cliproxyapi models when cliproxy providerExpose is false", async () => {
    await upsertVersionManagerTool({ tool: "cliproxy", status: "stopped" });
    await updateVersionManagerTool("cliproxy", { providerExpose: false });

    const manifest = generateProviderPluginManifest();
    const result = await injectServiceModelsIntoManifest(manifest, () => [{ id: "b-model" }]);

    const row = await getServiceRow("cliproxy");
    assert.equal(row?.providerExpose, false);

    const provider = result.providers.find((entry) => entry.id === "cliproxyapi");
    assert.ok(provider);
    assert.equal(provider?.models.some((model) => model.id === "cliproxyapi/b-model"), false);
  });
});

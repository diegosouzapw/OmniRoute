import { describe, it } from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

/**
 * Regression guard for #13168: the OpenCode config generator used to emit
 * the raw catalog model id as the display name, so `auto/chat` stayed
 * `auto/chat` and provider-prefixed catalog labels duplicated the provider
 * name. `buildModelEntry()`'s name precedence (highest to lowest) is:
 *   1. an existing custom name already set by the user in opencode.json
 *   2. a readable label for `auto/*` ids (OmniRoute's own virtual routing ids)
 *   3. the catalog's `display_name` (falling back to `name`), with a leading
 *      `owned_by/` prefix stripped once
 *   4. the raw catalog/model id, when nothing else is known
 */
describe("opencode config generator — catalog display-name precedence (#13168)", () => {
  function makeCatalogResponse(models: unknown[]): unknown {
    return { object: "list", data: models };
  }

  function stubFetchOnce(body: unknown, status = 200) {
    const original = globalThis.fetch;
    // @ts-ignore — globalThis.fetch signature is compatible for our purposes
    globalThis.fetch = (async () => {
      return new Response(JSON.stringify(body), {
        status,
        headers: { "content-type": "application/json" },
      });
    }) as typeof fetch;
    return {
      restore: () => {
        globalThis.fetch = original;
      },
    };
  }

  function writeTempConfig(config: unknown): string {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "opencode-config-13168-"));
    const file = path.join(dir, "opencode.json");
    fs.writeFileSync(file, JSON.stringify(config), "utf8");
    return file;
  }

  it("1. an existing custom name wins over any catalog name", async () => {
    const configPath = writeTempConfig({
      provider: {
        omniroute: {
          models: {
            "vendor/model-a": { name: "My Custom Label" },
          },
        },
      },
    });
    const stub = stubFetchOnce(
      makeCatalogResponse([
        { id: "vendor/model-a", owned_by: "vendor", display_name: "Ignored Catalog Name" },
      ])
    );
    try {
      const { generateOpencodeConfig } =
        await import("../../src/lib/cli-helper/config-generator/opencode.ts");
      const out = await generateOpencodeConfig({
        baseUrl: "http://localhost:20128",
        apiKey: "sk-test",
        configPath,
      });
      const cfg = JSON.parse(out);
      assert.strictEqual(cfg.provider.omniroute.models["vendor/model-a"].name, "My Custom Label");
    } finally {
      stub.restore();
      fs.rmSync(path.dirname(configPath), { recursive: true, force: true });
    }
  });

  it("2. catalog display_name is preferred over the raw id and native name, stripping the owned_by prefix", async () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "opencode-config-13168-"));
    const configPath = path.join(tmpDir, "missing.json");
    const stub = stubFetchOnce(
      makeCatalogResponse([
        {
          id: "vendor/model-b",
          owned_by: "vendor",
          display_name: "vendor/Pretty Name",
          name: "raw-native-name",
        },
      ])
    );
    try {
      const { generateOpencodeConfig } =
        await import("../../src/lib/cli-helper/config-generator/opencode.ts");
      const out = await generateOpencodeConfig({
        baseUrl: "http://localhost:20128",
        apiKey: "sk-test",
        configPath,
      });
      const cfg = JSON.parse(out);
      assert.strictEqual(cfg.provider.omniroute.models["vendor/model-b"].name, "Pretty Name");
    } finally {
      stub.restore();
      fs.rmSync(tmpDir, { recursive: true, force: true });
    }
  });

  it("3. catalog native `name` is used when display_name is absent", async () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "opencode-config-13168-"));
    const configPath = path.join(tmpDir, "missing.json");
    const stub = stubFetchOnce(
      makeCatalogResponse([
        { id: "vendor/model-c", owned_by: "vendor", name: "vendor/Native Label" },
      ])
    );
    try {
      const { generateOpencodeConfig } =
        await import("../../src/lib/cli-helper/config-generator/opencode.ts");
      const out = await generateOpencodeConfig({
        baseUrl: "http://localhost:20128",
        apiKey: "sk-test",
        configPath,
      });
      const cfg = JSON.parse(out);
      assert.strictEqual(cfg.provider.omniroute.models["vendor/model-c"].name, "Native Label");
    } finally {
      stub.restore();
      fs.rmSync(tmpDir, { recursive: true, force: true });
    }
  });

  it("4. `auto/*` ids fall back to a readable label when no catalog metadata names them", async () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "opencode-config-13168-"));
    const configPath = path.join(tmpDir, "missing.json");
    const stub = stubFetchOnce(makeCatalogResponse([{ id: "auto/chat-turbo" }]));
    try {
      const { generateOpencodeConfig } =
        await import("../../src/lib/cli-helper/config-generator/opencode.ts");
      const out = await generateOpencodeConfig({
        baseUrl: "http://localhost:20128",
        apiKey: "sk-test",
        configPath,
      });
      const cfg = JSON.parse(out);
      assert.strictEqual(cfg.provider.omniroute.models["auto/chat-turbo"].name, "Auto Chat Turbo");
    } finally {
      stub.restore();
      fs.rmSync(tmpDir, { recursive: true, force: true });
    }
  });

  it("5. raw catalog model id is used when neither custom name, display_name, name, nor auto/* apply", async () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "opencode-config-13168-"));
    const configPath = path.join(tmpDir, "missing.json");
    const stub = stubFetchOnce(makeCatalogResponse([{ id: "custom-vendor/raw-model-id" }]));
    try {
      const { generateOpencodeConfig } =
        await import("../../src/lib/cli-helper/config-generator/opencode.ts");
      const out = await generateOpencodeConfig({
        baseUrl: "http://localhost:20128",
        apiKey: "sk-test",
        configPath,
      });
      const cfg = JSON.parse(out);
      assert.strictEqual(
        cfg.provider.omniroute.models["custom-vendor/raw-model-id"].name,
        "custom-vendor/raw-model-id"
      );
    } finally {
      stub.restore();
      fs.rmSync(tmpDir, { recursive: true, force: true });
    }
  });
});

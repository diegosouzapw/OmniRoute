import { describe, it, after } from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { parse } from "smol-toml";

import {
  generateWhyCodesConfig,
  mergeWhyCodesConfig,
  ensureWhyCodesV1BaseUrl,
  redactWhyCodesApiKey,
  WHYCODES_PROVIDER_ID,
} from "../../../src/lib/cli-helper/config-generator/whycodes.ts";
import {
  getWhyCodesHome,
  getWhyCodesConfigPath,
} from "../../../src/lib/cli-helper/config-generator/whycodesHome.ts";
import { generateConfig } from "../../../src/lib/cli-helper/config-generator/index.ts";

const tmpDirs: string[] = [];
function tempDir(): string {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-whycodes-gen-"));
  tmpDirs.push(dir);
  return dir;
}

after(() => {
  for (const dir of tmpDirs) {
    try {
      fs.rmSync(dir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    } catch {
      // best-effort cleanup
    }
  }
});

describe("WhyCodes config generator", () => {
  it("normalizes the base URL to include /v1", () => {
    assert.equal(ensureWhyCodesV1BaseUrl("http://localhost:20128"), "http://localhost:20128/v1");
    assert.equal(
      ensureWhyCodesV1BaseUrl("http://localhost:20128/v1/"),
      "http://localhost:20128/v1"
    );
  });

  it("writes providers.omniroute + default_model and keeps the API key out of redacted output", () => {
    const home = tempDir();
    const configPath = path.join(home, "config.toml");
    const content = generateWhyCodesConfig({
      baseUrl: "http://localhost:20128",
      apiKey: "sk_live_secret_value",
      model: "glm/glm-5.2",
      configPath,
    });
    const parsed = parse(content) as {
      providers: Record<string, { name?: string; base_url?: string; api_key?: string }>;
      default_model: { provider_id?: string; model_id?: string };
    };
    assert.equal(parsed.providers[WHYCODES_PROVIDER_ID].base_url, "http://localhost:20128/v1");
    assert.equal(parsed.providers[WHYCODES_PROVIDER_ID].api_key, "sk_live_secret_value");
    assert.equal(parsed.default_model.provider_id, "omniroute");
    assert.equal(parsed.default_model.model_id, "glm/glm-5.2");
    assert.equal(redactWhyCodesApiKey(content).includes("sk_live_secret_value"), false);
  });

  it("merges without clobbering unrelated keys", () => {
    const merged = mergeWhyCodesConfig(
      { tui: { theme: "nord" }, providers: { openai: { name: "openai" } } },
      { baseUrl: "http://x:20128/v1", apiKey: "sk-x", model: "m" }
    );
    assert.equal((merged.tui as { theme: string }).theme, "nord");
    assert.ok((merged.providers as Record<string, unknown>).openai);
    assert.ok((merged.providers as Record<string, unknown>).omniroute);
  });

  it("refuses to overwrite invalid existing TOML", () => {
    const home = tempDir();
    const configPath = path.join(home, "config.toml");
    fs.writeFileSync(configPath, "[[[broken", "utf8");
    assert.throws(
      () =>
        generateWhyCodesConfig({
          baseUrl: "http://localhost:20128/v1",
          apiKey: "sk-x",
          configPath,
        }),
      /not valid TOML/
    );
  });

  it("generateConfig('whycodes') uses WHYCODES_HOME", async () => {
    const home = tempDir();
    const previous = process.env.WHYCODES_HOME;
    process.env.WHYCODES_HOME = home;
    try {
      const result = await generateConfig("whycodes", {
        baseUrl: "http://localhost:20128",
        apiKey: "sk-x",
        model: "glm/glm-5.2",
      });
      assert.equal(result.success, true);
      assert.equal(result.configPath, path.join(home, "config.toml"));
      assert.ok(result.content?.includes("[providers.omniroute]"));
    } finally {
      if (previous === undefined) delete process.env.WHYCODES_HOME;
      else process.env.WHYCODES_HOME = previous;
    }
  });
});

describe("WhyCodes home resolver", () => {
  it("prefers WHYCODES_HOME over platform dirs", () => {
    assert.equal(getWhyCodesHome({ WHYCODES_HOME: "/tmp/wc" }, "/home/op", "linux"), "/tmp/wc");
    assert.equal(
      getWhyCodesConfigPath({ WHYCODES_HOME: "/tmp/wc" }, "/home/op", "linux"),
      path.join("/tmp/wc", "config.toml")
    );
  });

  it("uses the Windows roaming project dir when WHYCODES_HOME is unset", () => {
    const resolved = getWhyCodesHome(
      { APPDATA: "C:\\Users\\op\\AppData\\Roaming" },
      "C:\\Users\\op",
      "win32"
    );
    assert.ok(resolved.toLowerCase().includes("whycorporation"));
    assert.ok(resolved.toLowerCase().includes("whycodes"));
  });
});

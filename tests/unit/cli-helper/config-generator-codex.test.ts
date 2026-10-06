import { describe, it, after } from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { parse } from "smol-toml";

import {
  generateCodexConfig,
  findLegacyCodexYaml,
} from "../../../src/lib/cli-helper/config-generator/codex.ts";
import { generateConfig } from "../../../src/lib/cli-helper/config-generator/index.ts";

interface ParsedCodexToml {
  model?: string;
  model_provider?: string;
  tool_output_token_limit?: number;
  model_providers: Record<
    string,
    { name?: string; base_url?: string; env_key?: string; requires_openai_auth?: boolean }
  >;
}

const tmpDirs: string[] = [];
function tempCodexHome(): string {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-codex-gen-"));
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

describe("config-generator codex (TOML)", () => {
  it("generates modern TOML with env_key auth and never embeds the API key", async () => {
    const home = tempCodexHome();
    const content = await generateCodexConfig({
      baseUrl: "http://localhost:20128/",
      apiKey: "sk_live_secret_value",
      model: "glm/glm-5.2",
      configPath: path.join(home, "config.toml"),
    });

    assert.ok(!content.includes("sk_live_secret_value"), "API key must not be written");
    const parsed = parse(content) as unknown as ParsedCodexToml;
    assert.strictEqual(parsed.model, "glm/glm-5.2");
    assert.strictEqual(parsed.model_provider, "omniroute");
    assert.strictEqual(parsed.model_providers.omniroute.base_url, "http://localhost:20128/v1");
    assert.strictEqual(parsed.model_providers.omniroute.env_key, "OMNIROUTE_API_KEY");
    assert.strictEqual(parsed.model_providers.omniroute.requires_openai_auth, false);
  });

  it("normalizes a baseUrl that already ends in /v1", async () => {
    const home = tempCodexHome();
    const content = await generateCodexConfig({
      baseUrl: "https://relay.example.test/v1",
      apiKey: "sk-test",
      configPath: path.join(home, "config.toml"),
    });
    const parsed = parse(content) as unknown as ParsedCodexToml;
    assert.strictEqual(parsed.model_providers.omniroute.base_url, "https://relay.example.test/v1");
    assert.ok(!("model" in parsed), "model key is omitted when no model is chosen");
  });

  it("merges conservatively with an existing config.toml, preserving operator keys", async () => {
    const home = tempCodexHome();
    const configPath = path.join(home, "config.toml");
    fs.writeFileSync(
      configPath,
      [
        'model = "old/model"',
        "tool_output_token_limit = 32768",
        "",
        "[model_providers.other]",
        'name = "Other"',
        'base_url = "https://other.example/v1"',
      ].join("\n"),
      "utf-8"
    );

    const content = await generateCodexConfig({
      baseUrl: "http://localhost:20128",
      apiKey: "sk-test",
      model: "glm/glm-5.2",
      configPath,
    });
    const parsed = parse(content) as unknown as ParsedCodexToml;
    assert.strictEqual(parsed.tool_output_token_limit, 32768, "unrelated key preserved");
    assert.strictEqual(parsed.model_providers.other.name, "Other", "other provider preserved");
    assert.strictEqual(parsed.model, "glm/glm-5.2", "model updated");
    assert.strictEqual(parsed.model_provider, "omniroute");
    assert.ok(parsed.model_providers.omniroute, "omniroute provider added");
  });

  it("refuses to overwrite an existing config.toml that is not valid TOML", async () => {
    const home = tempCodexHome();
    const configPath = path.join(home, "config.toml");
    fs.writeFileSync(configPath, "this is { not [ valid toml =", "utf-8");

    await assert.rejects(
      () =>
        generateCodexConfig({
          baseUrl: "http://localhost:20128",
          apiKey: "sk-test",
          configPath,
        }),
      /not valid TOML/
    );
    assert.strictEqual(
      fs.readFileSync(configPath, "utf-8"),
      "this is { not [ valid toml =",
      "invalid file left untouched"
    );
  });

  it("detects a leftover legacy config.yaml for migration messaging", () => {
    const home = tempCodexHome();
    assert.strictEqual(findLegacyCodexYaml(home), null, "absent yaml → no migration");
    fs.writeFileSync(path.join(home, "config.yaml"), "openai:\n  base_url: x\n", "utf-8");
    assert.strictEqual(findLegacyCodexYaml(home), path.join(home, "config.yaml"));
  });

  it("generateConfig(codex) targets ~/.codex/config.toml (not the legacy yaml)", async () => {
    const result = await generateConfig("codex", {
      baseUrl: "http://localhost:20128",
      apiKey: "sk-test",
    });
    // Success depends on the operator's real ~/.codex/config.toml being valid;
    // the path contract is what must hold either way.
    assert.ok(result.configPath.endsWith(path.join(".codex", "config.toml")));
    if (result.success) {
      assert.ok(String(result.content).includes("[model_providers.omniroute]"));
      assert.ok(!String(result.content).includes("sk-test"));
    }
  });
});

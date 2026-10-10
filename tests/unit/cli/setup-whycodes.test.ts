import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import {
  defaultConfigPath,
  readWhyCodesProviderBaseUrl,
  resolveWhyCodesTarget,
  buildWhyCodesToml,
  buildWhyCodesCliRecipe,
} from "../../../bin/cli/commands/setup-whycodes.mjs";

test("resolveWhyCodesTarget appends /v1 (WhyCodes posts /chat/completions)", () => {
  assert.equal(
    resolveWhyCodesTarget({ remote: "http://vps:20128" }).baseUrl,
    "http://vps:20128/v1"
  );
  assert.equal(
    resolveWhyCodesTarget({ remote: "http://vps:20128/v1/" }).baseUrl,
    "http://vps:20128/v1"
  );
});

test("resolveWhyCodesTarget: explicit --api-key wins", () => {
  assert.equal(resolveWhyCodesTarget({ remote: "http://x:20128", apiKey: "sk-x" }).apiKey, "sk-x");
});

test("buildWhyCodesToml writes providers.omniroute + default_model without the live key", () => {
  const toml = buildWhyCodesToml({
    baseUrl: "http://localhost:20128/v1",
    model: "glm/glm-5.2",
  });
  assert.match(toml, /\[providers\.omniroute\]/);
  assert.match(toml, /base_url = "http:\/\/localhost:20128\/v1"/);
  assert.match(toml, /api_key = "\$OMNIROUTE_API_KEY"/);
  assert.match(toml, /\[default_model\]/);
  assert.match(toml, /provider_id = "omniroute"/);
  assert.match(toml, /model_id = "glm\/glm-5.2"/);
  assert.equal(toml.includes("sk-"), false);
});

test("buildWhyCodesCliRecipe never prints the API key value", () => {
  const r = buildWhyCodesCliRecipe({
    baseUrl: "http://localhost:20128/v1",
    model: "glm/glm-5.2",
  });
  assert.match(r, /whycodes provider add omniroute --api-key "\$OMNIROUTE_API_KEY"/);
  assert.match(r, /whycodes model default omniroute glm\/glm-5.2/);
  assert.equal(r.includes("sk-"), false);
});

test("defaultConfigPath follows WhyCodes >= 0.6.5: $WHYCODES_HOME, else ~/.whycodes", () => {
  const saved = {
    WHYCODES_HOME: process.env.WHYCODES_HOME,
    HOME: process.env.HOME,
    USERPROFILE: process.env.USERPROFILE,
  };
  try {
    process.env.WHYCODES_HOME = path.join("custom", "wc");
    assert.equal(defaultConfigPath(), path.join("custom", "wc", "config.toml"));

    delete process.env.WHYCODES_HOME;
    process.env.HOME = path.join("home", "op");
    assert.equal(defaultConfigPath(), path.join("home", "op", ".whycodes", "config.toml"));

    process.env.HOME = "";
    process.env.USERPROFILE = path.join("Users", "op");
    assert.equal(defaultConfigPath(), path.join("Users", "op", ".whycodes", "config.toml"));
  } finally {
    for (const [key, value] of Object.entries(saved)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
});

test("readWhyCodesProviderBaseUrl reports the omniroute provider that `run whycodes` needs", async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-whycodes-read-"));
  const configPath = path.join(dir, "config.toml");
  try {
    assert.equal(await readWhyCodesProviderBaseUrl(configPath), null, "missing file");

    fs.writeFileSync(configPath, '[providers.other]\nname = "other"\n');
    assert.equal(await readWhyCodesProviderBaseUrl(configPath), null, "no omniroute provider");

    fs.writeFileSync(configPath, "[providers.omniroute\n");
    assert.equal(await readWhyCodesProviderBaseUrl(configPath), null, "invalid TOML");

    fs.writeFileSync(
      configPath,
      '[providers.omniroute]\nname = "omniroute"\nbase_url = "http://vps:20128/v1"\n'
    );
    assert.equal(await readWhyCodesProviderBaseUrl(configPath), "http://vps:20128/v1");

    fs.writeFileSync(configPath, '[providers.omniroute]\nname = "omniroute"\n');
    assert.equal(await readWhyCodesProviderBaseUrl(configPath), "", "provider without base_url");
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

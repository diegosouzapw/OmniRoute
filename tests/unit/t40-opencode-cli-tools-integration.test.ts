import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";

const { CLI_TOOLS } = await import("../../src/shared/constants/cliTools.ts");
const { resolveOpencodeConfigPath } = await import("../../src/shared/services/cliRuntime.ts");
const { buildOpenCodeProviderConfig, buildOpenCodeConfigDocument, mergeOpenCodeConfig } =
  await import("../../src/shared/services/opencodeConfig.ts");

test("T40: OpenCode card documents config paths and --variant usage", () => {
  const opencode = CLI_TOOLS.opencode;
  assert.ok(opencode, "OpenCode tool card must exist");
  assert.equal(opencode.modelSelectionMode, "multiple");
  assert.equal(opencode.hideComboModels, true);
  assert.equal(opencode.previewConfigMode, "opencode");

  const notesText = (opencode.notes || [])
    .map((note) => note?.text || "")
    .join(" ")
    .toLowerCase();

  assert.match(notesText, /\.config\/opencode\/opencode\.json/);
  assert.match(notesText, /%appdata%/);
  assert.match(notesText, /--variant/);
});

test("T40: OpenCode config path resolves per-platform", () => {
  const linuxWithXdg = resolveOpencodeConfigPath(
    "linux",
    { XDG_CONFIG_HOME: "/tmp/xdg-config-home" },
    "/home/dev"
  );
  assert.equal(linuxWithXdg, path.join("/tmp/xdg-config-home", "opencode", "opencode.json"));

  const linuxDefault = resolveOpencodeConfigPath("linux", {}, "/home/dev");
  assert.equal(linuxDefault, path.join("/home/dev", ".config", "opencode", "opencode.json"));

  const windowsPath = resolveOpencodeConfigPath(
    "win32",
    { APPDATA: "C:\\Users\\dev\\AppData\\Roaming" },
    "C:\\Users\\dev"
  );
  assert.equal(
    windowsPath,
    path.join("C:\\Users\\dev\\AppData\\Roaming", "opencode", "opencode.json")
  );
});

test("T40: OpenCode config generator includes endpoint and selected API key", () => {
  const providerConfig = buildOpenCodeProviderConfig({
    baseUrl: "http://localhost:20128/v1/",
    apiKey: "sk_test_opencode",
    model: "claude-sonnet-4-5-thinking",
  });
  assert.equal(providerConfig.options.baseURL, "http://localhost:20128/v1");
  assert.equal(providerConfig.options.apiKey, "sk_test_opencode");
  assert.ok(providerConfig.models["claude-sonnet-4-5-thinking"]);

  const mergedConfig = mergeOpenCodeConfig(
    { provider: { custom: { name: "Custom Provider" } } },
    {
      baseUrl: "http://localhost:20128/v1",
      apiKey: "sk_test_opencode",
      model: "claude-sonnet-4-5-thinking",
    }
  );
  assert.ok(mergedConfig.provider.custom);
  assert.equal(mergedConfig.provider.omniroute.options.baseURL, "http://localhost:20128/v1");
  assert.equal(mergedConfig.provider.omniroute.options.apiKey, "sk_test_opencode");
});

test("T40: OpenCode config document uses current provider schema", () => {
  const configDocument = buildOpenCodeConfigDocument({
    baseUrl: "http://localhost:20128/v1/",
    apiKey: "sk_test_opencode",
    models: ["cc/claude-sonnet-4-20250514", "gg/gemini-2.5-pro"],
  });

  assert.equal(configDocument.$schema, "https://opencode.ai/config.json");
  assert.ok(configDocument.provider.omniroute);
  assert.equal(configDocument.provider.omniroute.npm, "@ai-sdk/openai-compatible");
  assert.equal(configDocument.provider.omniroute.options.baseURL, "http://localhost:20128/v1");
  assert.equal(configDocument.provider.omniroute.options.apiKey, "sk_test_opencode");
  assert.deepEqual(Object.keys(configDocument.provider.omniroute.models), [
    "cc/claude-sonnet-4-20250514",
    "gg/gemini-2.5-pro",
  ]);
  assert.equal(configDocument.providers, undefined);
});

test("T40: OpenCode explicit multi-model selection overrides fallback defaults", () => {
  const providerConfig = buildOpenCodeProviderConfig({
    baseUrl: "http://localhost:20128/v1/",
    apiKey: "sk_test_opencode",
    models: ["custom/provider-a", "custom/provider-b"],
  });

  assert.deepEqual(Object.keys(providerConfig.models), ["custom/provider-a", "custom/provider-b"]);
  assert.equal(providerConfig.models["claude-sonnet-4-5-thinking"], undefined);
});

test("T40: Windsurf card documents current official limitations honestly", () => {
  const windsurf = CLI_TOOLS.windsurf;
  assert.ok(windsurf, "Windsurf tool card must exist");
  assert.equal(windsurf.configType, "guide");

  const notesText = (windsurf.notes || [])
    .map((note) => note?.text || "")
    .join(" ")
    .toLowerCase();

  assert.match(notesText, /byok/);
  assert.match(notesText, /custom openai-compatible provider/);
});

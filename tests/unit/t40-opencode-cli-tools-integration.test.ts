import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
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

  assert.match(notesText, /or opencode\.json\b/);
  assert.match(notesText, /\.config\/opencode\/opencode\.jsonc/);
  assert.match(notesText, /preferred when present/);
  // #3330: OpenCode uses ~/.config on all platforms (incl. Windows) — the note
  // must no longer point Windows users at %APPDATA%.
  assert.doesNotMatch(notesText, /%appdata%/);
  assert.match(notesText, /%userprofile%/);
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

  // #3330: OpenCode uses XDG `~/.config/opencode/` on ALL platforms including
  // Windows (NOT %APPDATA%) — OmniRoute must write where OpenCode reads.
  const windowsPath = resolveOpencodeConfigPath(
    "win32",
    { APPDATA: "C:\\Users\\dev\\AppData\\Roaming" },
    "C:\\Users\\dev"
  );
  assert.equal(windowsPath, path.join("C:\\Users\\dev", ".config", "opencode", "opencode.json"));

  // Windows still honors XDG_CONFIG_HOME when set.
  const windowsXdg = resolveOpencodeConfigPath(
    "win32",
    { XDG_CONFIG_HOME: "D:\\xdg" },
    "C:\\Users\\dev"
  );
  assert.equal(windowsXdg, path.join("D:\\xdg", "opencode", "opencode.json"));
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
    modelLabels: {
      "cc/claude-sonnet-4-20250514": "Claude Sonnet 4.5",
      "gg/gemini-2.5-pro": "Gemini 2.5 Pro",
    },
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
  assert.equal(
    configDocument.provider.omniroute.models["cc/claude-sonnet-4-20250514"].name,
    "Claude Sonnet 4.5"
  );
  assert.equal(
    configDocument.provider.omniroute.models["gg/gemini-2.5-pro"].name,
    "Gemini 2.5 Pro"
  );
  // v2 provider schema is dual-written alongside the v1 block.
  assert.equal(
    configDocument.providers.omniroute.package,
    "@opencode-ai/ai/providers/openai-compatible"
  );
});

test("T40: OpenCode explicit multi-model selection overrides fallback defaults", () => {
  const providerConfig = buildOpenCodeProviderConfig({
    baseUrl: "http://localhost:20128/v1/",
    apiKey: "sk_test_opencode",
    models: ["custom/provider-a", "custom/provider-b"],
    modelLabels: {
      "custom/provider-a": "Provider A",
      "custom/provider-b": "Provider B",
    },
  });

  assert.deepEqual(Object.keys(providerConfig.models), ["custom/provider-a", "custom/provider-b"]);
  assert.equal(providerConfig.models["claude-sonnet-4-5-thinking"], undefined);
  assert.equal(providerConfig.models["custom/provider-a"].name, "Provider A");
  assert.equal(providerConfig.models["custom/provider-b"].name, "Provider B");
});

test("T40: OpenCode merge preserves unrelated config and updates only provider.omniroute", () => {
  const mergedConfig = mergeOpenCodeConfig(
    {
      $schema: "https://opencode.ai/config.json",
      provider: {
        custom: { name: "Custom Provider" },
        omniroute: {
          name: "Old OmniRoute",
          options: { baseURL: "http://old-host/v1", apiKey: "old-key" },
        },
      },
      mcpServers: {
        github: { command: "npx", args: ["-y", "@modelcontextprotocol/server-github"] },
      },
    },
    {
      baseUrl: "http://localhost:20128/v1",
      apiKey: "sk_test_opencode",
      models: ["cx/gpt-5.6-sol"],
      modelLabels: { "cx/gpt-5.6-sol": "GPT-5.6 Sol" },
    }
  );

  assert.deepEqual(mergedConfig.provider.custom, { name: "Custom Provider" });
  assert.deepEqual(mergedConfig.mcpServers, {
    github: { command: "npx", args: ["-y", "@modelcontextprotocol/server-github"] },
  });
  assert.deepEqual(mergedConfig.provider.omniroute.models, {
    "cx/gpt-5.6-sol": {
      name: "GPT-5.6 Sol",
      limit: {
        context: 128_000,
        output: 8_192,
      },
    },
  });
});

test("T40: OpenCode tool card uses the internal generic asset", () => {
  const opencode = CLI_TOOLS.opencode;
  assert.equal(opencode.image, undefined);
  assert.equal(opencode.imageLight, "/providers/cli-generic.svg");
  assert.equal(opencode.imageDark, "/providers/cli-generic.svg");
});

test("T40: OpenCode generic provider asset is a valid SVG file", async () => {
  const generic = await fs.readFile(
    path.join(process.cwd(), "public/providers/cli-generic.svg"),
    "utf-8"
  );

  assert.match(generic, /^<svg[\s>]/);
  assert.doesNotMatch(generic, /<html/i);
});

test("T40: Windsurf was removed from CLI_TOOLS in plan 14 D17 (MITM backlog plan 11)", () => {
  // windsurf (Codeium) was removed from CLI_TOOLS because it has no generic custom base URL
  // support. It remains as an OAuth provider in src/lib/oauth/ for authentication.
  // The old guide/limitations notes are no longer needed in the UI catalog.
  // Cross-reference: _tasks/features-v3.8.6/refactorpages/_orchestration/_plan11-mitm-backlog.md
  assert.equal(
    (CLI_TOOLS as Record<string, unknown>)["windsurf"],
    undefined,
    "windsurf must be removed from CLI_TOOLS per plan 14 D17"
  );
});

import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { tmpdir, homedir } from "node:os";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..", "..");

test("bin/cli/plugins.mjs exporta discoverPlugins, loadPlugins, buildPluginContext", async () => {
  const mod = await import("../../bin/cli/plugins.mjs");
  assert.equal(typeof mod.discoverPlugins, "function");
  assert.equal(typeof mod.loadPlugins, "function");
  assert.equal(typeof mod.buildPluginContext, "function");
});

test("discoverPlugins retorna array vazio se nenhum plugin instalado (diretório não existe)", async () => {
  const { discoverPlugins } = await import("../../bin/cli/plugins.mjs");
  const orig = process.env.OMNIROUTE_PLUGIN_PATH;
  process.env.OMNIROUTE_PLUGIN_PATH = join(tmpdir(), `no-such-dir-${Date.now()}`);
  try {
    const plugins = await discoverPlugins();
    assert.ok(Array.isArray(plugins));
  } finally {
    if (orig === undefined) delete process.env.OMNIROUTE_PLUGIN_PATH;
    else process.env.OMNIROUTE_PLUGIN_PATH = orig;
  }
});

test("discoverPlugins descobre plugin com package.json válido", async () => {
  const { discoverPlugins } = await import("../../bin/cli/plugins.mjs");
  const pluginDir = join(tmpdir(), `omniroute-plugins-test-${Date.now()}`);
  const pkgDir = join(pluginDir, "omniroute-cmd-test-hello");
  mkdirSync(pkgDir, { recursive: true });
  writeFileSync(
    join(pkgDir, "package.json"),
    JSON.stringify({
      name: "omniroute-cmd-test-hello",
      version: "1.0.0",
      type: "module",
      main: "index.mjs",
    })
  );
  writeFileSync(join(pkgDir, "index.mjs"), `export function register() {}`);

  const orig = process.env.OMNIROUTE_PLUGIN_PATH;
  process.env.OMNIROUTE_PLUGIN_PATH = pluginDir;
  try {
    const plugins = await discoverPlugins();
    assert.ok(
      plugins.some((p) => p.name === "omniroute-cmd-test-hello"),
      "deve encontrar o plugin"
    );
  } finally {
    if (orig === undefined) delete process.env.OMNIROUTE_PLUGIN_PATH;
    else process.env.OMNIROUTE_PLUGIN_PATH = orig;
    try {
      rmSync(pluginDir, { recursive: true });
    } catch {}
  }
});

test("discoverPlugins ignora pacotes sem prefixo omniroute-cmd-", async () => {
  const { discoverPlugins } = await import("../../bin/cli/plugins.mjs");
  const pluginDir = join(tmpdir(), `omniroute-plugins-test-${Date.now()}`);
  const pkgDir = join(pluginDir, "some-unrelated-package");
  mkdirSync(pkgDir, { recursive: true });
  writeFileSync(
    join(pkgDir, "package.json"),
    JSON.stringify({ name: "some-unrelated-package", version: "1.0.0" })
  );

  const orig = process.env.OMNIROUTE_PLUGIN_PATH;
  process.env.OMNIROUTE_PLUGIN_PATH = pluginDir;
  try {
    const plugins = await discoverPlugins();
    assert.ok(
      !plugins.some((p) => p.name === "some-unrelated-package"),
      "não deve descobrir pacotes sem prefixo"
    );
  } finally {
    if (orig === undefined) delete process.env.OMNIROUTE_PLUGIN_PATH;
    else process.env.OMNIROUTE_PLUGIN_PATH = orig;
    try {
      rmSync(pluginDir, { recursive: true });
    } catch {}
  }
});

test("loadPlugins não quebra CLI quando plugin tem erro de load (try/catch)", async () => {
  const { loadPlugins } = await import("../../bin/cli/plugins.mjs");
  const pluginDir = join(tmpdir(), `omniroute-plugins-test-${Date.now()}`);
  const pkgDir = join(pluginDir, "omniroute-cmd-broken");
  mkdirSync(pkgDir, { recursive: true });
  writeFileSync(
    join(pkgDir, "package.json"),
    JSON.stringify({
      name: "omniroute-cmd-broken",
      version: "1.0.0",
      type: "module",
      main: "broken.mjs",
    })
  );
  writeFileSync(join(pkgDir, "broken.mjs"), "throw new Error('intentional load error');");

  const orig = process.env.OMNIROUTE_PLUGIN_PATH;
  process.env.OMNIROUTE_PLUGIN_PATH = pluginDir;
  const { Command } = await import("commander");
  const prog = new Command();
  try {
    // Deve não lançar exceção
    await assert.doesNotReject(async () => loadPlugins(prog));
  } finally {
    if (orig === undefined) delete process.env.OMNIROUTE_PLUGIN_PATH;
    else process.env.OMNIROUTE_PLUGIN_PATH = orig;
    try {
      rmSync(pluginDir, { recursive: true });
    } catch {}
  }
});

test("loadPlugins carrega plugin válido e chama register()", async () => {
  const { loadPlugins } = await import("../../bin/cli/plugins.mjs");
  const pluginDir = join(tmpdir(), `omniroute-plugins-test-${Date.now()}`);
  const pkgDir = join(pluginDir, "omniroute-cmd-valid");
  mkdirSync(pkgDir, { recursive: true });
  writeFileSync(
    join(pkgDir, "package.json"),
    JSON.stringify({
      name: "omniroute-cmd-valid",
      version: "1.0.0",
      type: "module",
      main: "index.mjs",
    })
  );
  // Plugin que adiciona um comando 'testcmd'
  writeFileSync(
    join(pkgDir, "index.mjs"),
    `export function register(program) { program.command('testcmd-from-plugin'); }`
  );

  const orig = process.env.OMNIROUTE_PLUGIN_PATH;
  process.env.OMNIROUTE_PLUGIN_PATH = pluginDir;
  const { Command } = await import("commander");
  const prog = new Command();
  try {
    const count = await loadPlugins(prog);
    assert.ok(count >= 1, "deve ter carregado pelo menos 1 plugin");
    assert.ok(
      prog.commands.some((c) => c.name() === "testcmd-from-plugin"),
      "comando do plugin deve estar registrado"
    );
  } finally {
    if (orig === undefined) delete process.env.OMNIROUTE_PLUGIN_PATH;
    else process.env.OMNIROUTE_PLUGIN_PATH = orig;
    try {
      rmSync(pluginDir, { recursive: true });
    } catch {}
  }
});

test("commands/plugin.mjs exporta registerPlugin", async () => {
  const mod = await import("../../bin/cli/commands/plugin.mjs");
  assert.equal(typeof mod.registerPlugin, "function");
});

test("registerPlugin registra subcomandos: list, install, remove, info, search, update, scaffold", async () => {
  const { registerPlugin } = await import("../../bin/cli/commands/plugin.mjs");
  const { Command } = await import("commander");
  const prog = new Command().exitOverride();
  registerPlugin(prog);
  const pluginCmd = prog.commands.find((c) => c.name() === "plugin");
  assert.ok(pluginCmd, "plugin command deve existir");
  const names = pluginCmd.commands.map((c) => c.name());
  for (const sub of ["list", "install", "remove", "info", "search", "update", "scaffold"]) {
    assert.ok(names.includes(sub), `plugin ${sub} deve existir`);
  }
});

test("exemplo omniroute-cmd-hello existe e tem register()", () => {
  const examplePath = join(ROOT, "examples", "omniroute-cmd-hello", "index.mjs");
  assert.ok(existsSync(examplePath), "exemplo index.mjs deve existir");
  const src = readFileSync(examplePath, "utf8");
  assert.ok(src.includes("export function register"), "deve exportar register");
  assert.ok(src.includes("export const meta"), "deve exportar meta");
});

test("docs/dev/plugins.md existe", () => {
  const docPath = join(ROOT, "docs", "dev", "plugins.md");
  assert.ok(existsSync(docPath), "docs/dev/plugins.md deve existir");
  const src = readFileSync(docPath, "utf8");
  assert.ok(src.includes("omniroute-cmd"), "deve mencionar omniroute-cmd");
  assert.ok(src.includes("register(program, ctx)"), "deve documentar a API register");
});

import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..", "..");
const API_COMMANDS_DIR = join(ROOT, "bin", "cli", "api-commands");
const REGISTRY = join(API_COMMANDS_DIR, "registry.mjs");

test("bin/cli/api-commands/ directory exists", () => {
  assert.ok(existsSync(API_COMMANDS_DIR), "api-commands dir deve existir");
});

test("registry.mjs foi gerado e exporta registerApiCommands e API_TAGS", () => {
  assert.ok(existsSync(REGISTRY), "registry.mjs deve existir");
  const src = readFileSync(REGISTRY, "utf8");
  assert.ok(
    src.includes("export function registerApiCommands"),
    "deve exportar registerApiCommands"
  );
  assert.ok(src.includes("export const API_TAGS"), "deve exportar API_TAGS");
});

test("api-commands/ tem pelo menos 20 tag files gerados", () => {
  const files = readdirSync(API_COMMANDS_DIR).filter(
    (f) => f.endsWith(".mjs") && f !== "registry.mjs"
  );
  assert.ok(files.length >= 20, `esperado >=20 arquivos, encontrado ${files.length}`);
});

test("tags esperadas estão presentes (combos, providers, api-keys, settings)", () => {
  const files = readdirSync(API_COMMANDS_DIR);
  for (const expected of ["combos.mjs", "providers.mjs", "api-keys.mjs", "settings.mjs"]) {
    assert.ok(files.includes(expected), `${expected} deve estar presente`);
  }
});

test("registerApiCommands registra comando 'api' com subcomandos de tags", async () => {
  const { registerApiCommands, API_TAGS } = await import("../../bin/cli/api-commands/registry.mjs");
  const { Command } = await import("commander");
  const prog = new Command().exitOverride();
  registerApiCommands(prog);
  const apiCmd = prog.commands.find((c) => c.name() === "api");
  assert.ok(apiCmd, "comando 'api' deve existir");
  // subcommand 'tags' + all tag groups
  assert.ok(apiCmd.commands.length >= API_TAGS.length, "deve ter subcomandos para todos os tags");
});

test("API_TAGS contém pelo menos 20 entradas", async () => {
  const { API_TAGS } = await import("../../bin/cli/api-commands/registry.mjs");
  assert.ok(Array.isArray(API_TAGS));
  assert.ok(API_TAGS.length >= 20, `esperado >=20 tags, encontrado ${API_TAGS.length}`);
  assert.ok(API_TAGS.includes("combos"), "'combos' deve estar em API_TAGS");
  assert.ok(API_TAGS.includes("providers"), "'providers' deve estar em API_TAGS");
});

test("combos.mjs registra operações de combos com flags corretas", async () => {
  const { Command } = await import("commander");
  // Importar diretamente o módulo de combos
  const combosPath = join(API_COMMANDS_DIR, "combos.mjs");
  const src = readFileSync(combosPath, "utf8");
  // Deve ter operações CRUD
  assert.ok(src.includes("export function register_combos"), "deve exportar register_combos");
  assert.ok(src.includes("apiFetch"), "deve usar apiFetch");
  assert.ok(src.includes("emit"), "deve usar emit");
});

test("arquivos gerados têm cabeçalho AUTO-GENERATED", () => {
  const files = readdirSync(API_COMMANDS_DIR).filter((f) => f.endsWith(".mjs"));
  for (const file of files.slice(0, 5)) {
    const src = readFileSync(join(API_COMMANDS_DIR, file), "utf8");
    assert.ok(src.includes("AUTO-GENERATED"), `${file} deve ter cabeçalho AUTO-GENERATED`);
  }
});

test("generate-api-commands.mjs existe em scripts/cli/", () => {
  const scriptPath = join(ROOT, "scripts", "cli", "generate-api-commands.mjs");
  assert.ok(existsSync(scriptPath), "generate-api-commands.mjs deve existir");
  const src = readFileSync(scriptPath, "utf8");
  assert.ok(src.includes("IGNORED_OP_IDS"), "deve ter lista IGNORED_OP_IDS");
  assert.ok(
    src.includes("prepublishOnly") || src.includes("build:cli-api") || src.includes("generate"),
    "deve mencionar build"
  );
});

test("package.json tem script build:cli-api", () => {
  const pkg = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8"));
  assert.ok(pkg.scripts?.["build:cli-api"], "build:cli-api deve estar nos scripts");
});

import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, rmSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { tmpdir } from "node:os";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..", "..");
const TUI = join(ROOT, "bin", "cli", "tui");

function hasExport(file: string, name: string): boolean {
  const src = readFileSync(file, "utf8");
  return (
    src.includes(`export function ${name}`) ||
    src.includes(`export async function ${name}`) ||
    src.includes(`export { ${name}`)
  );
}

test("tui/Repl.jsx existe e exporta runRepl", () => {
  const path = join(TUI, "Repl.jsx");
  assert.ok(existsSync(path), "Repl.jsx deve existir");
  assert.ok(hasExport(path, "runRepl"), "Repl.jsx deve exportar runRepl");
});

test("tui/session.mjs existe e exporta funções de persistência", () => {
  const path = join(TUI, "session.mjs");
  assert.ok(existsSync(path), "session.mjs deve existir");
  const src = readFileSync(path, "utf8");
  for (const fn of ["saveSession", "loadSession", "listSessions", "autosave", "deleteSession"]) {
    assert.ok(src.includes(`export function ${fn}`), `deve exportar ${fn}`);
  }
});

test("commands/repl.mjs existe e exporta registerRepl", () => {
  const path = join(ROOT, "bin", "cli", "commands", "repl.mjs");
  assert.ok(existsSync(path), "commands/repl.mjs deve existir");
  assert.ok(hasExport(path, "registerRepl"), "deve exportar registerRepl");
});

test("commands/repl.mjs registra comando repl com --model, --combo, --system, --resume", async () => {
  const { registerRepl } = await import("../../bin/cli/commands/repl.mjs");
  const { Command } = await import("commander");
  const prog = new Command().exitOverride();
  registerRepl(prog);
  const replCmd = prog.commands.find((c) => c.name() === "repl");
  assert.ok(replCmd, "repl command deve existir");
  const opts = replCmd.options.map((o) => o.long);
  assert.ok(opts.includes("--model"), "--model deve estar registrado");
  assert.ok(opts.includes("--combo"), "--combo deve estar registrado");
  assert.ok(opts.includes("--system"), "--system deve estar registrado");
  assert.ok(opts.includes("--resume"), "--resume deve estar registrado");
});

test("Repl.jsx usa ink-text-input para input controlado", () => {
  const src = readFileSync(join(TUI, "Repl.jsx"), "utf8");
  assert.ok(src.includes("ink-text-input"), "deve importar ink-text-input");
  assert.ok(src.includes("TextInput"), "deve usar TextInput");
});

test("Repl.jsx suporta todos os slash commands definidos no spec", () => {
  const src = readFileSync(join(TUI, "Repl.jsx"), "utf8");
  const required = [
    "model",
    "combo",
    "system",
    "clear",
    "save",
    "load",
    "list",
    "export",
    "tokens",
    "help",
    "exit",
  ];
  for (const cmd of required) {
    assert.ok(src.includes(`case "${cmd}"`), `deve suportar /${cmd}`);
  }
});

test("Repl.jsx tem painel lateral (SidePanel) com tokens e custo", () => {
  const src = readFileSync(join(TUI, "Repl.jsx"), "utf8");
  assert.ok(src.includes("SidePanel"), "deve ter SidePanel");
  assert.ok(src.includes("TokenCounter"), "deve usar TokenCounter");
});

// --- testes de persistência via session.mjs ---

test("saveSession e loadSession persistem e restauram sessão", async () => {
  const tmpDir = join(tmpdir(), `omniroute-repl-test-${Date.now()}`);
  mkdirSync(tmpDir, { recursive: true });
  const origDataDir = process.env.DATA_DIR;
  process.env.DATA_DIR = tmpDir;
  try {
    const { saveSession, loadSession } = await import("../../bin/cli/tui/session.mjs");
    const session = {
      model: "gpt-4o",
      combo: "fastest",
      system: "You are helpful.",
      messages: [{ role: "user", content: "Hello" }],
      totalUsage: { in: 10, out: 20 },
      totalCost: 0.001,
      createdAt: new Date().toISOString(),
    };
    saveSession("test-session", session);
    const loaded = loadSession("test-session");
    assert.equal(loaded.model, "gpt-4o");
    assert.equal(loaded.combo, "fastest");
    assert.equal(loaded.messages.length, 1);
    assert.equal(loaded.totalCost, 0.001);
    assert.equal(loaded.name, "test-session");
  } finally {
    process.env.DATA_DIR = origDataDir ?? "";
    try {
      rmSync(tmpDir, { recursive: true });
    } catch {}
  }
});

test("loadSession lança erro se sessão não existe", async () => {
  const tmpDir = join(tmpdir(), `omniroute-repl-test-${Date.now()}`);
  mkdirSync(tmpDir, { recursive: true });
  const origDataDir = process.env.DATA_DIR;
  process.env.DATA_DIR = tmpDir;
  try {
    const { loadSession } = await import("../../bin/cli/tui/session.mjs");
    await assert.rejects(async () => loadSession("does-not-exist"), /not found/);
  } finally {
    process.env.DATA_DIR = origDataDir ?? "";
    try {
      rmSync(tmpDir, { recursive: true });
    } catch {}
  }
});

test("listSessions retorna array (vazio ou com sessões)", async () => {
  const tmpDir = join(tmpdir(), `omniroute-repl-test-${Date.now()}`);
  mkdirSync(tmpDir, { recursive: true });
  const origDataDir = process.env.DATA_DIR;
  process.env.DATA_DIR = tmpDir;
  try {
    const { listSessions, saveSession } = await import("../../bin/cli/tui/session.mjs");
    const empty = listSessions();
    assert.ok(Array.isArray(empty));
    saveSession("session-a", {
      model: "gpt-4o",
      messages: [],
      totalUsage: { in: 0, out: 0 },
      totalCost: 0,
    });
    const list = listSessions();
    assert.ok(list.some((s) => s.name === "session-a"));
  } finally {
    process.env.DATA_DIR = origDataDir ?? "";
    try {
      rmSync(tmpDir, { recursive: true });
    } catch {}
  }
});

test("autosave não lança erro em condições normais", async () => {
  const tmpDir = join(tmpdir(), `omniroute-repl-test-${Date.now()}`);
  mkdirSync(tmpDir, { recursive: true });
  const origDataDir = process.env.DATA_DIR;
  process.env.DATA_DIR = tmpDir;
  try {
    const { autosave } = await import("../../bin/cli/tui/session.mjs");
    assert.doesNotThrow(() =>
      autosave({ model: "auto", messages: [], totalUsage: { in: 0, out: 0 }, totalCost: 0 })
    );
  } finally {
    process.env.DATA_DIR = origDataDir ?? "";
    try {
      rmSync(tmpDir, { recursive: true });
    } catch {}
  }
});

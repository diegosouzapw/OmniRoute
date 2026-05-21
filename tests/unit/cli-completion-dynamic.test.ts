import test from "node:test";
import assert from "node:assert/strict";

test("completion.mjs pode ser importado sem erro", async () => {
  const mod = await import("../../bin/cli/commands/completion.mjs");
  assert.equal(typeof mod.registerCompletion, "function");
  assert.equal(typeof mod.runCompletionCommand, "function");
});

test("runCompletionCommand bash retorna 0 e string não-vazia", async () => {
  const chunks: string[] = [];
  const orig = process.stdout.write.bind(process.stdout);
  (process.stdout as any).write = (c: string | Uint8Array) => {
    chunks.push(typeof c === "string" ? c : c.toString());
    return true;
  };
  try {
    const { runCompletionCommand } = await import("../../bin/cli/commands/completion.mjs");
    const code = await runCompletionCommand("bash");
    assert.equal(code, 0);
  } finally {
    (process.stdout as any).write = orig;
  }
  const out = chunks.join("");
  assert.ok(out.includes("omniroute"), "bash script should mention omniroute");
  assert.ok(out.includes("_omniroute"), "bash script should define _omniroute function");
});

test("runCompletionCommand zsh contém compdef", async () => {
  const chunks: string[] = [];
  const orig = process.stdout.write.bind(process.stdout);
  (process.stdout as any).write = (c: string | Uint8Array) => {
    chunks.push(typeof c === "string" ? c : c.toString());
    return true;
  };
  try {
    const { runCompletionCommand } = await import("../../bin/cli/commands/completion.mjs");
    const code = await runCompletionCommand("zsh");
    assert.equal(code, 0);
  } finally {
    (process.stdout as any).write = orig;
  }
  const out = chunks.join("");
  assert.ok(out.includes("compdef"), "zsh script should contain compdef");
});

test("runCompletionCommand fish retorna 0", async () => {
  const chunks: string[] = [];
  const orig = process.stdout.write.bind(process.stdout);
  (process.stdout as any).write = (c: string | Uint8Array) => {
    chunks.push(typeof c === "string" ? c : c.toString());
    return true;
  };
  try {
    const { runCompletionCommand } = await import("../../bin/cli/commands/completion.mjs");
    const code = await runCompletionCommand("fish");
    assert.equal(code, 0);
  } finally {
    (process.stdout as any).write = orig;
  }
  const out = chunks.join("");
  assert.ok(out.includes("omniroute"), "fish script should mention omniroute");
});

test("runCompletionCommand shell inválido retorna 1", async () => {
  const orig = process.stderr.write.bind(process.stderr);
  (process.stderr as any).write = () => true;
  try {
    const { runCompletionCommand } = await import("../../bin/cli/commands/completion.mjs");
    const code = await runCompletionCommand("powershell" as any);
    assert.equal(code, 1);
  } finally {
    (process.stderr as any).write = orig;
  }
});

test("completion scripts incluem combos/providers/models no cache dinamicamente", async () => {
  const { runCompletionCommand } = await import("../../bin/cli/commands/completion.mjs");
  const chunks: string[] = [];
  const orig = process.stdout.write.bind(process.stdout);
  (process.stdout as any).write = (c: string | Uint8Array) => {
    chunks.push(typeof c === "string" ? c : c.toString());
    return true;
  };
  try {
    await runCompletionCommand("zsh");
  } finally {
    (process.stdout as any).write = orig;
  }
  const out = chunks.join("");
  assert.ok(
    out.includes("completion-cache.json") || out.includes("omniroute_get_cache"),
    "should reference cache"
  );
});

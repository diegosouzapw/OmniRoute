import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import test from "node:test";
import { Command } from "commander";
import { registerCompletion, runCompletionCommand } from "../../../bin/cli/commands/completion.mjs";
import { registerModels } from "../../../bin/cli/commands/models.mjs";
import { registerModelValidation } from "../../../bin/cli/commands/model-validation.mjs";

function registeredProgram() {
  const program = new Command();
  registerCompletion(program);
  registerModels(program);
  registerModelValidation(program);
  return program;
}

async function completion(shell: string) {
  const chunks: string[] = [];
  const original = process.stdout.write;
  process.stdout.write = ((chunk: string | Uint8Array) => {
    chunks.push(String(chunk));
    return true;
  }) as typeof process.stdout.write;
  try {
    assert.equal(await runCompletionCommand(shell, registeredProgram()), 0);
  } finally {
    process.stdout.write = original;
  }
  return chunks.join("");
}

test(
  "Bash actually completes models test-add, including after sibling command integration",
  {
    skip: process.platform === "win32",
  },
  async () => {
    const script = await completion("bash");
    const output = execFileSync("/bin/bash", ["--noprofile", "--norc"], {
      input:
        script +
        '\nCOMP_WORDS=(omniroute models te)\nCOMP_CWORD=2\n_omniroute\nprintf "%s\\n" "${COMPREPLY[@]}"\n',
      encoding: "utf8",
      timeout: 5000,
      env: { PATH: "/usr/bin:/bin" },
    });
    assert.equal(output.trim(), "test-add");
  }
);

test("the first Zsh models branch exposes test-add rather than shadowing it", async () => {
  const script = await completion("zsh");
  const first = script.match(/^\s*models\)\s+_arguments '1:subcommand:\(([^)]+)\)'/m);
  assert.ok(first, "a model subcommand branch must exist");
  assert.ok(first[1].split(" ").includes("test-add"), "the reachable branch must expose test-add");
});

for (const shell of ["bash", "zsh", "fish"]) {
  test(`${shell} has one models branch with exactly the registered subcommands`, async () => {
    const script = await completion(shell);
    const pattern =
      shell === "bash"
        ? /^\s*models\).*compgen -W "([^"]*)"/gm
        : shell === "zsh"
          ? /^\s*models\).*_arguments '1:subcommand:\(([^)]*)\)'/gm
          : /^complete .*__fish_seen_subcommand_from models' -a '([^']*)'/gm;
    const branches = [...script.matchAll(pattern)];
    assert.equal(branches.length, 1);
    const expected = registeredProgram()
      .commands.find((command) => command.name() === "models")!
      .commands.map((command) => command.name());
    assert.deepEqual(branches[0][1].split(" "), expected);
  });
}

test("Commander printing resolves models registered after completion", async () => {
  const chunks: string[] = [];
  const original = process.stdout.write;
  process.stdout.write = ((chunk: string | Uint8Array) => {
    chunks.push(String(chunk));
    return true;
  }) as typeof process.stdout.write;
  try {
    await registeredProgram().parseAsync(["completion", "bash"], { from: "user" });
  } finally {
    process.stdout.write = original;
  }
  assert.match(chunks.join(""), /test-add/);
});

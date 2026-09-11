/**
 * Commander stores a negated option such as `--no-history` as `history === false`; it never
 * sets `noHistory`. `chat --no-history`, `contexts export --no-secrets` and
 * `serve --no-recovery` read the `noX` name, so each flag was accepted and did nothing:
 * the prompt was still written to cli-history.jsonl, and the export still carried the
 * access tokens and API keys. These tests drive the real Commander parser instead of
 * hand-building an options object Commander never produces.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { Command } from "commander";

const FAKE_RESPONSE = {
  id: "chatcmpl-abc",
  model: "claude-sonnet-4-6",
  choices: [{ message: { role: "assistant", content: "Hello!" } }],
  usage: { prompt_tokens: 5, completion_tokens: 10, total_tokens: 15 },
};

async function withDataDir(prefix: string, fn: (dir: string) => Promise<void>) {
  const dir = mkdtempSync(join(tmpdir(), prefix));
  const prevDataDir = process.env.DATA_DIR;
  const prevKeychain = process.env.OMNIROUTE_KEYCHAIN_DISABLED;
  process.env.DATA_DIR = dir;
  process.env.OMNIROUTE_KEYCHAIN_DISABLED = "1";
  try {
    await fn(dir);
  } finally {
    if (prevDataDir === undefined) delete process.env.DATA_DIR;
    else process.env.DATA_DIR = prevDataDir;
    if (prevKeychain === undefined) delete process.env.OMNIROUTE_KEYCHAIN_DISABLED;
    else process.env.OMNIROUTE_KEYCHAIN_DISABLED = prevKeychain;
    rmSync(dir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
}

async function quietly(fn: () => Promise<unknown>) {
  const out = process.stdout.write.bind(process.stdout);
  const err = process.stderr.write.bind(process.stderr);
  process.stdout.write = () => true;
  process.stderr.write = () => true;
  try {
    await fn();
  } finally {
    process.stdout.write = out;
    process.stderr.write = err;
  }
}

async function runChat(args: string[]) {
  const origFetch = globalThis.fetch;
  globalThis.fetch = (() =>
    Promise.resolve(
      new Response(JSON.stringify(FAKE_RESPONSE), {
        status: 200,
        headers: { "content-type": "application/json" },
      })
    )) as typeof fetch;
  try {
    const { registerChat } = await import("../../bin/cli/commands/chat.mjs");
    const program = new Command().exitOverride();
    registerChat(program);
    await quietly(() => program.parseAsync(["chat", ...args], { from: "user" }));
  } finally {
    globalThis.fetch = origFetch;
  }
}

test("chat --no-history does not write cli-history.jsonl", async () => {
  await withDataDir("chat-no-history-", async (dir) => {
    await runChat(["secret prompt", "--no-history"]);
    assert.equal(existsSync(join(dir, "cli-history.jsonl")), false);
  });
});

test("chat without --no-history still records the exchange", async () => {
  await withDataDir("chat-history-", async (dir) => {
    await runChat(["keep this"]);
    const line = JSON.parse(readFileSync(join(dir, "cli-history.jsonl"), "utf8").trim());
    assert.equal(line.prompt, "keep this");
  });
});

async function exportContexts(dir: string, args: string[]) {
  const { saveContexts } = await import("../../bin/cli/contexts.mjs");
  saveContexts({
    currentContext: "remote",
    contexts: {
      remote: {
        baseUrl: "https://omniroute.example",
        accessToken: "oma_SECRET_TOKEN",
        apiKey: "sk-SECRET-KEY",
      },
    },
  });
  const { registerContexts } = await import("../../bin/cli/commands/contexts.mjs");
  const program = new Command().exitOverride();
  registerContexts(program);
  const outFile = join(dir, "export.json");
  await quietly(() =>
    program.parseAsync(["contexts", "export", "--out", outFile, ...args], { from: "user" })
  );
  return readFileSync(outFile, "utf8");
}

test("contexts export --no-secrets leaves the token and API key out", async () => {
  await withDataDir("ctx-no-secrets-", async (dir) => {
    const json = await exportContexts(dir, ["--no-secrets"]);
    assert.doesNotMatch(json, /oma_SECRET_TOKEN|sk-SECRET-KEY/);
    assert.equal(JSON.parse(json).contexts.remote.baseUrl, "https://omniroute.example");
  });
});

test("contexts export without --no-secrets keeps the full config", async () => {
  await withDataDir("ctx-secrets-", async (dir) => {
    const json = await exportContexts(dir, []);
    assert.match(json, /sk-SECRET-KEY/);
  });
});

test("serve --no-recovery reaches runServe as recovery === false", async () => {
  const { registerServe } = await import("../../bin/cli/commands/serve.mjs");
  const program = new Command().exitOverride();
  registerServe(program);
  let parsed: Record<string, unknown> | undefined;
  program.commands
    .find((cmd) => cmd.name() === "serve")!
    .action((opts: Record<string, unknown>) => {
      parsed = opts;
    });

  await program.parseAsync(["serve", "--no-recovery"], { from: "user" });

  assert.equal(parsed?.recovery, false);
  assert.equal(parsed?.noRecovery, undefined);

  const fs = await import("node:fs");
  const path = await import("node:path");
  const source = fs.readFileSync(
    path.resolve(import.meta.dirname, "../../bin/cli/commands/serve.mjs"),
    "utf-8"
  );
  assert.match(source, /if \(opts\.recovery === false[^)]*\) \{\s*return runWithoutRecovery\(/);
});

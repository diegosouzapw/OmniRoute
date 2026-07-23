/**
 * AuggieExecutor unit tests.
 *
 * Rather than mocking node:child_process (fragile under ESM without
 * --experimental-vm-modules — see tests/unit/dns-config-generic.test.ts for the
 * same tradeoff), these tests point `AUGGIE_BIN` at small real, disposable shell
 * scripts that stand in for the `auggie` CLI. No live `auggie` binary is required
 * or touched — CI never needs the real Augment CLI installed.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const { AuggieExecutor, buildAuggiePrompt, resolveAuggieBin, resolveAuggieModel } =
  await import("@omniroute/open-sse/executors/auggie");

const TMP_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-auggie-test-"));

/** Write an executable shell script and return its absolute path. */
function writeFakeBin(name: string, script: string): string {
  const p = path.join(TMP_DIR, name);
  fs.writeFileSync(p, `#!/bin/sh\n${script}\n`, { mode: 0o755 });
  return p;
}

async function readSseEvents(response: Response): Promise<Record<string, unknown>[]> {
  const text = await response.text();
  const events: Record<string, unknown>[] = [];
  for (const line of text.split("\n")) {
    if (!line.startsWith("data: ")) continue;
    const payload = line.slice("data: ".length).trim();
    if (payload === "[DONE]") continue;
    events.push(JSON.parse(payload));
  }
  return events;
}

test.after(() => {
  fs.rmSync(TMP_DIR, { recursive: true, force: true });
});

// ─── buildAuggiePrompt ────────────────────────────────────────────────────

test("buildAuggiePrompt flattens system/user/assistant turns with role tags", () => {
  const prompt = buildAuggiePrompt([
    { role: "system", content: "Be terse." },
    { role: "user", content: "hi" },
    { role: "assistant", content: "hello" },
    { role: "user", content: "how are you?" },
  ]);
  assert.equal(
    prompt,
    "[System]\nBe terse.\n\n[User]\nhi\n\n[Assistant]\nhello\n\n[User]\nhow are you?"
  );
});

test("buildAuggiePrompt flattens array-shaped content blocks and skips empty turns", () => {
  const prompt = buildAuggiePrompt([
    {
      role: "user",
      content: [
        { type: "text", text: "part1 " },
        { type: "text", text: "part2" },
      ],
    },
    { role: "user", content: "" },
    { role: "user", content: [] },
  ]);
  assert.equal(prompt, "[User]\npart1 part2");
});

test("buildAuggiePrompt returns a placeholder for an empty conversation", () => {
  assert.equal(buildAuggiePrompt([]), "(empty)");
});

// ─── resolveAuggieBin ─────────────────────────────────────────────────────

test("resolveAuggieBin honors AUGGIE_BIN env override", () => {
  const prev = process.env.AUGGIE_BIN;
  try {
    process.env.AUGGIE_BIN = "/custom/path/to/auggie";
    assert.equal(resolveAuggieBin(), "/custom/path/to/auggie");
  } finally {
    if (prev === undefined) delete process.env.AUGGIE_BIN;
    else process.env.AUGGIE_BIN = prev;
  }
});

// ─── execute(): ENOENT → CLI not found ─────────────────────────────────────

test("execute() surfaces a sanitized 'CLI not found' error on ENOENT (streaming)", async () => {
  const prevBin = process.env.AUGGIE_BIN;
  process.env.AUGGIE_BIN = path.join(TMP_DIR, "does-not-exist-binary");
  try {
    const executor = new AuggieExecutor();
    const { response } = await executor.execute({
      model: "sonnet4.6",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: true,
      credentials: {} as never,
    });
    assert.equal(response.headers.get("Content-Type"), "text/event-stream");
    const events = await readSseEvents(response);
    const errorEvent = events.find((e) => (e as any).error);
    assert.ok(errorEvent, "expected an error SSE event");
    const message = String((errorEvent as any).error.message);
    // The configured bin path is intentionally included (actionable for the
    // operator) — sanitizeErrorMessage only strips stack-trace-shaped source
    // paths (`*.ts`/`*.js` + line:col), not arbitrary CLI binary paths.
    assert.match(message, /Auggie CLI not found/);
    assert.equal(message.includes("\n"), false, "message must not contain a stack trace");
  } finally {
    if (prevBin === undefined) delete process.env.AUGGIE_BIN;
    else process.env.AUGGIE_BIN = prevBin;
  }
});

test("execute() surfaces a sanitized 'CLI not found' error on ENOENT (non-streaming)", async () => {
  const prevBin = process.env.AUGGIE_BIN;
  process.env.AUGGIE_BIN = path.join(TMP_DIR, "does-not-exist-binary-2");
  try {
    const executor = new AuggieExecutor();
    const { response } = await executor.execute({
      model: "sonnet4.6",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: {} as never,
    });
    assert.equal(response.headers.get("Content-Type"), "application/json");
    assert.equal(response.status, 502);
    const body = await response.json();
    assert.match(String(body.error.message), /Auggie CLI not found/);
  } finally {
    if (prevBin === undefined) delete process.env.AUGGIE_BIN;
    else process.env.AUGGIE_BIN = prevBin;
  }
});

// ─── execute(): non-zero exit → sanitized error ────────────────────────────

test("execute() surfaces a sanitized error when the CLI exits non-zero (streaming)", async () => {
  const bin = writeFakeBin(
    "fake-auggie-fail.sh",
    'echo "boom at /home/attacker/secret.ts:42" 1>&2\nexit 3'
  );
  const prevBin = process.env.AUGGIE_BIN;
  process.env.AUGGIE_BIN = bin;
  try {
    const executor = new AuggieExecutor();
    const { response } = await executor.execute({
      model: "sonnet4.6",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: true,
      credentials: {} as never,
    });
    const events = await readSseEvents(response);
    const errorEvent = events.find((e) => (e as any).error);
    assert.ok(errorEvent, "expected an error SSE event");
    const message = String((errorEvent as any).error.message);
    assert.match(message, /exited with code 3/);
    assert.equal(message.includes("/home/attacker/secret.ts"), false, "path must be sanitized");
  } finally {
    if (prevBin === undefined) delete process.env.AUGGIE_BIN;
    else process.env.AUGGIE_BIN = prevBin;
  }
});

test("execute() surfaces a sanitized error when the CLI exits non-zero (non-streaming)", async () => {
  const bin = writeFakeBin("fake-auggie-fail2.sh", "exit 1");
  const prevBin = process.env.AUGGIE_BIN;
  process.env.AUGGIE_BIN = bin;
  try {
    const executor = new AuggieExecutor();
    const { response } = await executor.execute({
      model: "sonnet4.6",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: {} as never,
    });
    assert.equal(response.status, 502);
    const body = await response.json();
    assert.match(String(body.error.message), /exited with code 1/);
  } finally {
    if (prevBin === undefined) delete process.env.AUGGIE_BIN;
    else process.env.AUGGIE_BIN = prevBin;
  }
});

// ─── execute(): stream vs non-stream shape ─────────────────────────────────

test("execute() with stream=true returns SSE deltas + [DONE]", async () => {
  const bin = writeFakeBin("fake-auggie-echo.sh", 'printf "hello world"');
  const prevBin = process.env.AUGGIE_BIN;
  process.env.AUGGIE_BIN = bin;
  try {
    const executor = new AuggieExecutor();
    const { response } = await executor.execute({
      model: "sonnet4.6",
      body: { messages: [{ role: "user", content: "say hi" }] },
      stream: true,
      credentials: {} as never,
    });
    assert.equal(response.headers.get("Content-Type"), "text/event-stream");
    const events = await readSseEvents(response);
    // First chunk announces the assistant role.
    assert.equal((events[0] as any).choices[0].delta.role, "assistant");
    // Content is streamed as delta chunks that concatenate to the full text.
    const contentDeltas = events
      .map((e) => (e as any).choices?.[0]?.delta?.content)
      .filter((c) => typeof c === "string");
    assert.equal(contentDeltas.join(""), "hello world");
    // Final chunk signals completion.
    const last = events[events.length - 1] as any;
    assert.equal(last.choices[0].finish_reason, "stop");
  } finally {
    if (prevBin === undefined) delete process.env.AUGGIE_BIN;
    else process.env.AUGGIE_BIN = prevBin;
  }
});

test("execute() with stream=false returns a single chat.completion JSON body", async () => {
  const bin = writeFakeBin("fake-auggie-echo2.sh", 'printf "hello world"');
  const prevBin = process.env.AUGGIE_BIN;
  process.env.AUGGIE_BIN = bin;
  try {
    const executor = new AuggieExecutor();
    const { response } = await executor.execute({
      model: "sonnet4.6",
      body: { messages: [{ role: "user", content: "say hi" }] },
      stream: false,
      credentials: {} as never,
    });
    assert.equal(response.headers.get("Content-Type"), "application/json");
    assert.equal(response.status, 200);
    const body = await response.json();
    assert.equal(body.object, "chat.completion");
    assert.equal(body.choices[0].message.role, "assistant");
    assert.equal(body.choices[0].message.content, "hello world");
    assert.equal(body.choices[0].finish_reason, "stop");
    assert.ok(body.usage);
  } finally {
    if (prevBin === undefined) delete process.env.AUGGIE_BIN;
    else process.env.AUGGIE_BIN = prevBin;
  }
});

// ─── resolveAuggieModel ─────────────────────────────────────────────────────

test("resolveAuggieModel defaults to a real allowlisted model when unset", () => {
  const result = resolveAuggieModel(undefined);
  assert.equal(result.ok, true);
  if (result.ok) assert.equal(typeof result.model, "string");
});

test("resolveAuggieModel accepts a known registry model id verbatim", () => {
  const result = resolveAuggieModel("haiku4.5");
  assert.deepEqual(result, { ok: true, model: "haiku4.5" });
});

// ─── resolveAuggieModel: pre-v0.32.0 alias back-compat (#7032) ────────────
// The v0.32.0 registry rename dropped ~10 old model IDs outright. Saved combos
// created before the rename still reference those old IDs, so resolveAuggieModel
// must transparently map each one to its v0.32.0 replacement instead of erroring
// with "Unknown Auggie model".

test("resolveAuggieModel resolves a pre-v0.32.0 saved model id via the alias map (#7032)", () => {
  const result = resolveAuggieModel("claude-sonnet-4.6");
  assert.deepEqual(result, { ok: true, model: "sonnet4.6" });
});

test("resolveAuggieModel resolves every pre-v0.32.0 alias to an allowlisted v0.32.0 id (#7032)", () => {
  const OLD_TO_NEW: Record<string, string> = {
    "claude-sonnet-4.6": "sonnet4.6",
    "claude-sonnet-4.6-thinking": "sonnet4.6",
    "claude-opus-4.6": "opus4.6",
    "claude-haiku-4.5": "haiku4.5",
    "gemini-3.1-pro": "gemini-3.1-pro-preview",
    "gemini-3.0-flash": "gemini-3.1-pro-preview",
    "gpt-5.5-high": "gpt5.5",
    "gpt-5.5-medium": "gpt5.5",
    "gpt-5.4-high": "gpt5.4",
    "gpt-5.4-medium": "gpt5.4",
  };
  for (const [oldId, newId] of Object.entries(OLD_TO_NEW)) {
    assert.deepEqual(
      resolveAuggieModel(oldId),
      { ok: true, model: newId },
      `${oldId} should resolve to ${newId}`
    );
  }
});

// ─── execute(): model allowlist (argument-injection defense) ──────────────

test("execute() rejects a model not in the registry allowlist and never spawns", async () => {
  const marker = path.join(TMP_DIR, "spawned-unknown-model.marker");
  const bin = writeFakeBin("fake-auggie-unknown.sh", `touch "${marker}"\nprintf "hi"`);
  const prevBin = process.env.AUGGIE_BIN;
  process.env.AUGGIE_BIN = bin;
  try {
    const executor = new AuggieExecutor();
    const { response } = await executor.execute({
      model: "totally-not-a-real-model",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: {} as never,
    });
    assert.equal(response.status, 400);
    const body = await response.json();
    assert.match(String(body.error.message), /Unknown Auggie model/);
    assert.equal(fs.existsSync(marker), false, "subprocess must never be spawned");
  } finally {
    if (prevBin === undefined) delete process.env.AUGGIE_BIN;
    else process.env.AUGGIE_BIN = prevBin;
  }
});

test("execute() rejects a model starting with '-' (flag smuggling) and never spawns (streaming)", async () => {
  const marker = path.join(TMP_DIR, "spawned-flag-smuggle.marker");
  const bin = writeFakeBin("fake-auggie-flag.sh", `touch "${marker}"\nprintf "hi"`);
  const prevBin = process.env.AUGGIE_BIN;
  process.env.AUGGIE_BIN = bin;
  try {
    const executor = new AuggieExecutor();
    const { response } = await executor.execute({
      model: "-rf",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: true,
      credentials: {} as never,
    });
    assert.equal(response.headers.get("Content-Type"), "text/event-stream");
    const events = await readSseEvents(response);
    const errorEvent = events.find((e) => (e as any).error);
    assert.ok(errorEvent, "expected an error SSE event");
    assert.match(String((errorEvent as any).error.message), /must not start with "-"/);
    assert.equal(fs.existsSync(marker), false, "subprocess must never be spawned");
  } finally {
    if (prevBin === undefined) delete process.env.AUGGIE_BIN;
    else process.env.AUGGIE_BIN = prevBin;
  }
});

test("execute() spawns with a valid allowlisted model, no shell, and a '--' argv separator", async () => {
  const argvFile = path.join(TMP_DIR, "captured-argv.txt");
  const bin = writeFakeBin(
    "fake-auggie-argv.sh",
    `for a in "$@"; do printf '%s\\n' "$a" >> "${argvFile}"; done\nprintf "ok"`
  );
  const prevBin = process.env.AUGGIE_BIN;
  process.env.AUGGIE_BIN = bin;
  try {
    const executor = new AuggieExecutor();
    const { response } = await executor.execute({
      model: "opus4.6",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: {} as never,
    });
    assert.equal(response.status, 200);
    const body = await response.json();
    assert.equal(body.choices[0].message.content, "ok");
    const argv = fs.readFileSync(argvFile, "utf8").trim().split("\n");
    assert.deepEqual(argv, ["--print", "--quiet", "--model", "opus4.6", "--"]);
  } finally {
    if (prevBin === undefined) delete process.env.AUGGIE_BIN;
    else process.env.AUGGIE_BIN = prevBin;
    fs.rmSync(argvFile, { force: true });
  }
});

// ─── execute(): abort kills the subprocess promptly ────────────────────────

test("execute() aborts a long-running CLI process instead of hanging (streaming)", async () => {
  // Sleeps far longer than the test timeout unless killed on abort.
  const bin = writeFakeBin("fake-auggie-sleep.sh", "sleep 30");
  const prevBin = process.env.AUGGIE_BIN;
  process.env.AUGGIE_BIN = bin;
  try {
    const executor = new AuggieExecutor();
    const controller = new AbortController();
    const { response } = await executor.execute({
      model: "sonnet4.6",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: true,
      credentials: {} as never,
      signal: controller.signal,
    });
    // Give the child process a beat to spawn, then abort.
    await new Promise((resolve) => setTimeout(resolve, 100));
    controller.abort();

    // Reading the stream must resolve promptly (i.e. the stream closes) rather
    // than hanging for the full 30s sleep.
    const start = Date.now();
    await response.text();
    const elapsed = Date.now() - start;
    assert.ok(elapsed < 5000, `expected abort to close the stream quickly, took ${elapsed}ms`);
  } finally {
    if (prevBin === undefined) delete process.env.AUGGIE_BIN;
    else process.env.AUGGIE_BIN = prevBin;
  }
});

// ─── refreshCredentials() is a no-op ────────────────────────────────────────

test("refreshCredentials() is a no-op (auggie has no OmniRoute-managed credentials)", async () => {
  const executor = new AuggieExecutor();
  const result = await executor.refreshCredentials({} as never);
  assert.equal(result, null);
});

test("buildUrl/buildHeaders/transformRequest match the CLI-passthrough shape", () => {
  const executor = new AuggieExecutor();
  assert.equal(executor.buildUrl(), "auggie://cli/stdio");
  assert.deepEqual(executor.buildHeaders(), {});
  assert.equal(executor.transformRequest(), null);
});

// ─── initAuggieModels / resolveAuggieModel auto-fetch ────────────────────

test("initAuggieModels discovers models from `auggie model list` output", async () => {
  const { initAuggieModels, resolveAuggieModel, __resetAuggieModels } =
    await import("@omniroute/open-sse/executors/auggie");
  __resetAuggieModels(); // wipe stale cache from previous tests
  const bin = writeFakeBin(
    "fake-auggie-list.sh",
    `printf '[new-model-alpha]\\nignored\\n[new-model-beta]'`
  );
  const prevBin = process.env.AUGGIE_BIN;
  process.env.AUGGIE_BIN = bin;
  try {
    await initAuggieModels();
    const r = resolveAuggieModel("new-model-alpha");
    assert.deepEqual(r, { ok: true, model: "new-model-alpha" });
  } finally {
    if (prevBin === undefined) delete process.env.AUGGIE_BIN;
    else process.env.AUGGIE_BIN = prevBin;
    __resetAuggieModels(); // restore for subsequent tests
  }
});

test("execute() spawns a model discovered via auto-fetch", async () => {
  const { __resetAuggieModels } = await import("@omniroute/open-sse/executors/auggie");
  __resetAuggieModels();
  const bin = writeFakeBin(
    "fake-auggie-autofetch.sh",
    [
      `case "$*" in`,
      `  *model\\ list*)`,
      `    printf '[auto-discovered-model]'`,
      `    exit 0`,
      `    ;;`,
      `  *)`,
      `    printf 'auto-ok'`,
      `    ;;`,
      `esac`,
    ].join("\n")
  );
  const prevBin = process.env.AUGGIE_BIN;
  process.env.AUGGIE_BIN = bin;
  try {
    const executor = new AuggieExecutor();
    const { response } = await executor.execute({
      model: "auto-discovered-model",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: {} as never,
    });
    assert.equal(response.status, 200);
    const body = await response.json();
    assert.equal(body.choices[0].message.content, "auto-ok");
  } finally {
    if (prevBin === undefined) delete process.env.AUGGIE_BIN;
    else process.env.AUGGIE_BIN = prevBin;
    __resetAuggieModels();
  }
});

test("initAuggieModels failure does not block execute() for a known model", async () => {
  const { __resetAuggieModels } = await import("@omniroute/open-sse/executors/auggie");
  __resetAuggieModels();
  const bin = writeFakeBin(
    "fake-auggie-crash.sh",
    [
      `case "$*" in`,
      `  *model\\ list*)`,
      `    exit 1  # crash on model list so init fails`,
      `    ;;`,
      `  *)`,
      `    printf 'known-model-ok'`,
      `    ;;`,
      `esac`,
    ].join("\n")
  );
  const prevBin = process.env.AUGGIE_BIN;
  process.env.AUGGIE_BIN = bin;
  try {
    const executor = new AuggieExecutor();
    const { response } = await executor.execute({
      model: "haiku4.5", // static-registry model, should work regardless
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: {} as never,
    });
    assert.equal(response.status, 200);
    const body = await response.json();
    assert.equal(body.choices[0].message.content, "known-model-ok");
  } finally {
    if (prevBin === undefined) delete process.env.AUGGIE_BIN;
    else process.env.AUGGIE_BIN = prevBin;
    __resetAuggieModels();
  }
});

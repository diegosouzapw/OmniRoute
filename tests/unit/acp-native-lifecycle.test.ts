import test, { afterEach } from "node:test";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import { AcpManager } from "../../src/lib/acp/manager.ts";
import { setCustomAgents } from "../../src/lib/acp/registry.ts";

const fixture = fileURLToPath(new URL("../fixtures/cli/acp-agent.mjs", import.meta.url));
const managers: AcpManager[] = [];

function setup(mode = "normal") {
  setCustomAgents([
    {
      id: "native-probe",
      name: "Native probe",
      binary: process.execPath,
      versionCommand: "--version",
      providerAlias: "fixture",
      spawnArgs: [fixture],
      protocol: "stdio",
      backendMode: "acp",
    },
  ]);
  const manager = new AcpManager();
  managers.push(manager);
  const session = manager.spawn("native-probe", {
    env: { ACP_TEST_MODE: mode, ACP_EXPLICIT_VALUE: "intentional" },
  });
  return { manager, session };
}

afterEach(() => {
  for (const manager of managers.splice(0)) manager.killAll();
  setCustomAgents([]);
});

async function waitUntil(check: () => boolean) {
  for (let i = 0; i < 200; i++) {
    if (check()) return;
    await new Promise((resolve) => setTimeout(resolve, 25));
  }
  assert.ok(check(), "condition did not settle");
}

test("native ACP completes initialize, session/new and session/prompt", async () => {
  const { manager, session } = setup();
  assert.equal(await manager.sendPrompt(session.id, "hello", 5000), "fixture answer");
  assert.equal(manager.sendInput(session.id, "arbitrary wire data"), false);
});

test("ACP launch rejects caller binary and argv injection", () => {
  const { manager } = setup();
  assert.throws(
    () =>
      Reflect.apply(manager.spawn, manager, [
        "native-probe",
        { binary: process.execPath, args: ["-e", "0"] },
      ]),
    /spawn options/
  );
  assert.throws(
    () => Reflect.apply(manager.spawn, manager, ["native-probe", process.execPath]),
    /spawn options/
  );
});

test("native launch excludes parent secrets but accepts explicit values", async () => {
  const previous = process.env.ACP_PARENT_SECRET;
  process.env.ACP_PARENT_SECRET = "not-a-real-secret";
  try {
    const { manager, session } = setup("env");
    assert.deepEqual(JSON.parse(await manager.sendPrompt(session.id, "env", 5000)), {
      inherited: false,
      explicit: "intentional",
    });
  } finally {
    if (previous === undefined) delete process.env.ACP_PARENT_SECRET;
    else process.env.ACP_PARENT_SECRET = previous;
  }
});

test("native initialization failure removes and terminates the process", async () => {
  const { manager, session } = setup("init-fail");
  await assert.rejects(manager.sendPrompt(session.id, "hello", 5000));
  await waitUntil(() => !session.alive);
  assert.equal(manager.getSession(session.id), undefined);
});

test("native timeout covers initialization and closes the process", async () => {
  const { manager, session } = setup("init-hang");
  await assert.rejects(manager.sendPrompt(session.id, "hello", 100), /ACP timeout after 100ms/);
  await waitUntil(() => !session.alive);
  assert.equal(manager.getSession(session.id), undefined);
});

test("native timeout still applies after receiving output and sends cancellation", async () => {
  const { manager, session } = setup("prompt-hang");
  // Establish the transport before starting a short prompt deadline.
  await session.nativeReady;
  await assert.rejects(manager.sendPrompt(session.id, "hello", 300), /ACP timeout after 300ms/);
  await waitUntil(() => !session.alive);
  assert.match(session.stderrBuffer, /cancel-received/);
  assert.equal(manager.getSession(session.id), undefined);
});

test("native prompt rejects concurrent turns instead of mixing output", async () => {
  const { manager, session } = setup("prompt-hang");
  const first = manager.sendPrompt(session.id, "first", 1000);
  const firstRejected = assert.rejects(first);
  await assert.rejects(
    manager.sendPrompt(session.id, "second", 1000),
    /already has an active prompt/
  );
  manager.kill(session.id);
  await firstRejected;
});

test("killing during initialize rejects pending work without leaking a session", async () => {
  const { manager, session } = setup("init-hang");
  const pending = assert.rejects(manager.sendPrompt(session.id, "hello", 5000));
  manager.kill(session.id);
  await pending;
  await waitUntil(() => !session.alive);
  assert.equal(manager.getSession(session.id), undefined);
});

test("native text output retains the tail within the existing 1 MiB cap", async () => {
  const { manager, session } = setup("text-flood");
  const output = await manager.sendPrompt(session.id, "hello", 5000);
  assert.ok(output.length <= 1_048_576);
  assert.ok(output.endsWith("FINAL-MARKER"));
});

test("native unterminated JSON frame is bounded and tears down the process", async () => {
  const { manager, session } = setup("frame-flood");
  await session.nativeReady;
  await assert.rejects(manager.sendPrompt(session.id, "hello", 20_000), (error: Error) => {
    assert.doesNotMatch(
      error.message,
      /ACP timeout/,
      "frame limit, not the prompt timer, must terminate transport"
    );
    return true;
  });
  await waitUntil(() => !session.alive);
  assert.equal(manager.getSession(session.id), undefined);
});

test("native process exit rejects rather than returning partial output", async () => {
  const { manager, session } = setup("exit");
  await assert.rejects(manager.sendPrompt(session.id, "hello", 5000));
  await waitUntil(() => !session.alive);
  assert.equal(manager.getSession(session.id), undefined);
});

test("native permission requests are denied without executing agent tools", async () => {
  const { manager, session } = setup("permission");
  assert.equal(await manager.sendPrompt(session.id, "hello", 5000), "cancelled");
});

test("unsupported ACP protocol version fails closed", async () => {
  const { manager, session } = setup("bad-version");
  await assert.rejects(
    manager.sendPrompt(session.id, "hello", 5000),
    /protocol version is unsupported/
  );
  await waitUntil(() => !session.alive);
  assert.equal(manager.getSession(session.id), undefined);
});

test("a missing executable does not emit an unhandled EventEmitter error", async () => {
  setCustomAgents([
    {
      id: "missing-probe",
      name: "Missing probe",
      binary: "/nonexistent/acp-test-probe",
      versionCommand: "--version",
      providerAlias: "fixture",
      spawnArgs: [],
      protocol: "stdio",
      backendMode: "acp",
    },
  ]);
  const manager = new AcpManager();
  managers.push(manager);
  const session = manager.spawn("missing-probe");
  await assert.rejects(manager.sendPrompt(session.id, "hello", 5000));
  await waitUntil(() => !session.alive);
  assert.equal(manager.getSession(session.id), undefined);
});

import test from "node:test";
import assert from "node:assert/strict";

const { AcpManager } = await import("../../src/lib/acp/manager.ts");
const { setCustomAgents } = await import("../../src/lib/acp/registry.ts");

// A registered agent whose binary is just node running a script that stays quiet,
// so sendPrompt() reliably hits its timeout instead of resolving on data/exit.
const AGENT_ID = "acp-leak-probe";
setCustomAgents([
  {
    id: AGENT_ID,
    name: "ACP leak probe",
    binary: process.execPath,
    description: "test-only agent",
  },
]);

function spawnIdleSession(manager) {
  // Keeps stdin open and never writes to stdout: the prompt can only time out.
  return manager.spawn(AGENT_ID, process.execPath, [
    "-e",
    "process.stdin.resume(); setTimeout(() => {}, 60_000);",
  ]);
}

test("sendPrompt timeout does not leak listeners on the manager (#13095)", async () => {
  const manager = new AcpManager();
  const session = spawnIdleSession(manager);

  try {
    const before = {
      stdout: manager.listenerCount("stdout"),
      exit: manager.listenerCount("exit"),
    };

    // Each of these must reject on the timeout path.
    for (let i = 0; i < 12; i++) {
      await assert.rejects(
        () => manager.sendPrompt(session.id, "ping", 15),
        /ACP timeout after 15ms/,
        `attempt ${i + 1} should time out`
      );
    }

    // The timeout branch has to tear down both listeners it registered. Before the
    // fix these grew by one per timed-out prompt and were never released, which
    // matters because `acpManager` is a module-level singleton.
    assert.equal(
      manager.listenerCount("stdout"),
      before.stdout,
      "stdout listeners must return to the pre-prompt count"
    );
    assert.equal(
      manager.listenerCount("exit"),
      before.exit,
      "exit listeners must return to the pre-prompt count"
    );
  } finally {
    manager.killAll();
  }
});

test("sendPrompt timeout clears its idle timer so the process can settle (#13095)", async () => {
  const manager = new AcpManager();
  const session = spawnIdleSession(manager);

  try {
    await assert.rejects(
      () => manager.sendPrompt(session.id, "ping", 15),
      /ACP timeout after 15ms/
    );

    // A leaked idle timer keeps a 2s handle (and the captured session) alive after
    // the promise already rejected. Nothing should be pending on the manager.
    assert.equal(manager.listenerCount("stdout"), 0);
    assert.equal(manager.listenerCount("exit"), 0);
  } finally {
    manager.killAll();
  }
});

test("exited sessions are removed from the session map (#13095)", async () => {
  const manager = new AcpManager();
  // Exits immediately on its own; nothing calls kill() for it.
  const session = manager.spawn(AGENT_ID, process.execPath, ["-e", "process.exit(0)"]);

  await new Promise((resolve) => {
    manager.on("exit", ({ sessionId }) => {
      if (sessionId === session.id) resolve();
    });
  });
  // Let the exit handler finish its bookkeeping.
  await new Promise((resolve) => setTimeout(resolve, 50));

  assert.equal(
    manager.getSession(session.id),
    undefined,
    "a session that exited on its own must not stay in the map"
  );
});

import test from "node:test";
import assert from "node:assert/strict";

const { AcpManager } = await import("../../src/lib/acp/manager.ts");
const { setCustomAgents } = await import("../../src/lib/acp/registry.ts");

const AGENT_ID = "buffer-cap-probe";
const CAP = 1_048_576;

/**
 * Spawn a node process that writes `bytes` of stdout (or stderr) and stays alive,
 * so the buffers can be inspected while the session is still running.
 */
function makeAgent(stream: "stdout" | "stderr", bytes: number) {
  setCustomAgents([
    {
      id: AGENT_ID,
      name: "Buffer cap probe",
      binary: process.execPath,
      acpSpawnable: true,
    },
  ]);
  const script = `
    const chunk = "x".repeat(64 * 1024);
    let written = 0;
    const target = ${bytes};
    while (written < target) {
      process.${stream}.write(chunk);
      written += chunk.length;
    }
    setInterval(() => {}, 1000);
  `;
  return ["-e", script];
}

async function waitForOutput(session: { stdoutBuffer: string; stderrBuffer: string }) {
  // Give the child time to flush everything it intends to write.
  for (let i = 0; i < 60; i++) {
    await new Promise((r) => setTimeout(r, 50));
    if (session.stdoutBuffer.length > CAP / 2 || session.stderrBuffer.length > CAP / 2) break;
  }
  await new Promise((r) => setTimeout(r, 300));
}

test("stdout buffer stays bounded when an agent floods it (#13095)", async () => {
  const mgr = new AcpManager();
  const session = mgr.spawn(AGENT_ID, process.execPath, makeAgent("stdout", 4 * CAP));
  try {
    await waitForOutput(session);
    assert.ok(
      session.stdoutBuffer.length > 0,
      "precondition: the probe agent must have written something"
    );
    assert.ok(
      session.stdoutBuffer.length <= CAP,
      `stdoutBuffer grew to ${session.stdoutBuffer.length} chars, above the ${CAP} cap`
    );
  } finally {
    mgr.kill(session.id);
  }
});

test("stderr buffer stays bounded when an agent floods it (#13095)", async () => {
  const mgr = new AcpManager();
  const session = mgr.spawn(AGENT_ID, process.execPath, makeAgent("stderr", 4 * CAP));
  try {
    await waitForOutput(session);
    assert.ok(
      session.stderrBuffer.length > 0,
      "precondition: the probe agent must have written something"
    );
    assert.ok(
      session.stderrBuffer.length <= CAP,
      `stderrBuffer grew to ${session.stderrBuffer.length} chars, above the ${CAP} cap`
    );
  } finally {
    mgr.kill(session.id);
  }
});

test("truncation keeps the most recent output, not the oldest (#13095)", async () => {
  setCustomAgents([
    {
      id: AGENT_ID,
      name: "Buffer cap probe",
      binary: process.execPath,
      acpSpawnable: true,
    },
  ]);
  const script = `
    const chunk = "x".repeat(64 * 1024);
    let written = 0;
    while (written < ${2 * CAP}) { process.stdout.write(chunk); written += chunk.length; }
    process.stdout.write("FINAL-MARKER");
    setInterval(() => {}, 1000);
  `;
  const mgr = new AcpManager();
  const session = mgr.spawn(AGENT_ID, process.execPath, ["-e", script]);
  try {
    await waitForOutput(session);
    // The tail is the part callers use: sendPrompt resolves with stdout, and
    // stderr is read for diagnostics after a failure.
    assert.ok(
      session.stdoutBuffer.endsWith("FINAL-MARKER"),
      "the newest output must survive truncation"
    );
    assert.ok(session.stdoutBuffer.length <= CAP, "buffer must still respect the cap");
  } finally {
    mgr.kill(session.id);
  }
});

test("stderr is reset between prompts so diagnostics are per-prompt (#13095)", async () => {
  setCustomAgents([
    {
      id: AGENT_ID,
      name: "Buffer cap probe",
      binary: process.execPath,
      acpSpawnable: true,
    },
  ]);
  // Echoes stdin back on stdout, and writes a fixed line to stderr per prompt.
  const script = `
    process.stdin.on("data", (d) => {
      process.stderr.write("warn:" + d.toString().trim() + "\\n");
      process.stdout.write("ok\\n");
    });
    setInterval(() => {}, 1000);
  `;
  const mgr = new AcpManager();
  const session = mgr.spawn(AGENT_ID, process.execPath, ["-e", script]);
  try {
    await mgr.sendPrompt(session.id, "first", 6000);
    await mgr.sendPrompt(session.id, "second", 6000);
    assert.ok(
      !session.stderrBuffer.includes("warn:first"),
      `stderr from an earlier prompt leaked into the next one: ${JSON.stringify(session.stderrBuffer)}`
    );
    assert.ok(session.stderrBuffer.includes("warn:second"), "current prompt's stderr must be kept");
  } finally {
    mgr.kill(session.id);
  }
});

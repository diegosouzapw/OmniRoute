import test from "node:test";
import assert from "node:assert/strict";

const { resolveVersionProbe, shouldUseShellForVersionProbe } =
  await import("../../../src/lib/acp/registry.ts");
const { getAgentById } = await import("../../../src/lib/acp/registry.ts");

test("resolveVersionProbe parses quoted binary paths without shell semantics", () => {
  const probe = resolveVersionProbe(
    "/tmp/My Custom Agent",
    '"/tmp/My Custom Agent" --version',
    true
  );

  assert.deepEqual(probe, {
    command: "/tmp/My Custom Agent",
    args: ["--version"],
  });
});

test("resolveVersionProbe rejects custom version commands that switch binaries", () => {
  const probe = resolveVersionProbe("/tmp/custom-agent", 'bash -lc "id"', true);
  assert.equal(probe, null);
});

test("resolveVersionProbe rejects shell metacharacters in version commands", () => {
  const probe = resolveVersionProbe(
    "/tmp/custom-agent",
    "/tmp/custom-agent --version; touch /tmp/pwned",
    true
  );
  assert.equal(probe, null);
});

// Regression guard — GHSA-jphr-2gw7-xrwp / GHSA-hf57-cqmx-p4gr (ACP custom-agent
// RCE). A client-registered custom agent controls both `binary` and
// `versionCommand`; the binary-match check alone still admits an eval-style
// argument on a matching interpreter, which reaches execFileSync as arbitrary
// code execution (no shell metacharacter required). A version *probe* only ever
// needs a version flag, so untrusted probes must reject non-version arguments.
test("resolveVersionProbe rejects interpreter eval arguments on a matching binary", () => {
  assert.equal(resolveVersionProbe("node", 'node -e "process.exit(1)"', true), null);
  assert.equal(resolveVersionProbe("node", "node --eval 1", true), null);
  assert.equal(resolveVersionProbe("python3", 'python3 -c "import os"', true), null);
  assert.equal(resolveVersionProbe("ruby", 'ruby -e "puts 1"', true), null);
  // Any extra argument beyond a single version flag is refused for a probe.
  assert.equal(resolveVersionProbe("node", "node --version --eval 1", true), null);
});

test("resolveVersionProbe still accepts legitimate version flags for custom agents", () => {
  assert.deepEqual(resolveVersionProbe("node", "node --version", true), {
    command: "node",
    args: ["--version"],
  });
  assert.deepEqual(resolveVersionProbe("my-agent", "my-agent -v", true), {
    command: "my-agent",
    args: ["-v"],
  });
  assert.deepEqual(resolveVersionProbe("my-agent", "my-agent version", true), {
    command: "my-agent",
    args: ["version"],
  });
  // Bare binary with no arguments is a valid probe too.
  assert.deepEqual(resolveVersionProbe("my-agent", "my-agent", true), {
    command: "my-agent",
    args: [],
  });
});

test("shouldUseShellForVersionProbe preserves Windows npm wrapper detection", () => {
  assert.equal(shouldUseShellForVersionProbe("codex", "win32"), true);
  assert.equal(
    shouldUseShellForVersionProbe("C:\\Users\\dev\\AppData\\Roaming\\npm\\codex.cmd", "win32"),
    true
  );
  assert.equal(shouldUseShellForVersionProbe("C:\\Tools\\claude.exe", "win32"), false);
  assert.equal(shouldUseShellForVersionProbe("codex", "linux"), false);
});

test("Qwen Code is registered with its upstream ACP mode", () => {
  const qwen = getAgentById("qwen");
  assert.ok(qwen);
  assert.deepEqual(qwen.spawnArgs, ["--acp"]);
  assert.equal(qwen.providerAlias, "qwen-code");
  assert.equal(qwen.protocol, "stdio");
});

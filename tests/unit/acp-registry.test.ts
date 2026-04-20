import test from "node:test";
import assert from "node:assert/strict";

const { resolveVersionProbe, shouldUseShellForVersionProbe } =
  await import("../../src/lib/acp/registry.ts");

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

test("shouldUseShellForVersionProbe preserves Windows npm wrapper detection", () => {
  assert.equal(shouldUseShellForVersionProbe("codex", "win32"), true);
  assert.equal(
    shouldUseShellForVersionProbe("C:\\Users\\dev\\AppData\\Roaming\\npm\\qwen.cmd", "win32"),
    true
  );
  assert.equal(shouldUseShellForVersionProbe("C:\\Tools\\claude.exe", "win32"), false);
  assert.equal(shouldUseShellForVersionProbe("codex", "linux"), false);
});

/**
 * Regression test for issue #8466: AgentBridge diagnostics `dnsConfigured`
 * was hard-wired to the Antigravity host regex (src/mitm/manager.ts) instead
 * of being computed per-agent via `resolveHostsForAgent(agentId)`
 * (src/mitm/dns/dnsConfig.ts).
 *
 * We mock fs.readFileSync so the real /etc/hosts is never touched, then
 * exercise getMitmStatus() -- the exact function named in the issue -- with
 * hosts-file contents representing each failure direction, plus the
 * diagnose route to prove the agentId query param is threaded through.
 */
import { test, mock, afterEach } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

afterEach(() => {
  mock.restoreAll();
});

test("FALSE NEGATIVE: Claude Code host correctly spoofed, no Antigravity host present -> dnsConfigured should be true when checked for claude-code", async () => {
  const realReadFileSync = fs.readFileSync.bind(fs);
  mock.method(fs, "readFileSync", (p: string, enc?: BufferEncoding) => {
    if (p === "/etc/hosts") {
      // Claude Code target hosts = ["api.anthropic.com"] (src/mitm/targets/claudeCode.ts).
      // The user correctly spoofed it. No Antigravity host present at all.
      return "127.0.0.1 localhost\n127.0.0.1 api.anthropic.com\n::1 api.anthropic.com\n";
    }
    return realReadFileSync(p, enc);
  });

  const { getMitmStatus } = await import("../../src/mitm/manager.ts?probe=8466-negative");
  const status = await getMitmStatus("claude-code");

  assert.equal(
    status.dnsConfigured,
    true,
    "dnsConfigured must be true when the agent being diagnosed (Claude Code) has its own host spoofed"
  );
});

test("FALSE POSITIVE: only a leftover Antigravity host is present, Claude Code host is missing -> dnsConfigured should be false when checked for claude-code", async () => {
  const realReadFileSync = fs.readFileSync.bind(fs);
  mock.method(fs, "readFileSync", (p: string, enc?: BufferEncoding) => {
    if (p === "/etc/hosts") {
      // Leftover Antigravity entry from a previous setup. Claude Code's host
      // (api.anthropic.com) is NOT present.
      return "127.0.0.1 localhost\n127.0.0.1 daily-cloudcode-pa.googleapis.com\n";
    }
    return realReadFileSync(p, enc);
  });

  const { getMitmStatus } = await import("../../src/mitm/manager.ts?probe=8466-positive");
  const status = await getMitmStatus("claude-code");

  assert.equal(
    status.dnsConfigured,
    false,
    "dnsConfigured must be false when the agent being diagnosed (Claude Code) has no host spoofed, even if a leftover Antigravity host is present"
  );
});

test("no-agentId call sites keep legacy Antigravity-only behavior unchanged", async () => {
  const realReadFileSync = fs.readFileSync.bind(fs);
  mock.method(fs, "readFileSync", (p: string, enc?: BufferEncoding) => {
    if (p === "/etc/hosts") {
      // Claude Code host spoofed, but NO Antigravity host present. A caller
      // that omits agentId (state/route.ts, server/route.ts, settings/mitm,
      // cli-tools/antigravity-mitm) must still evaluate the legacy
      // Antigravity-only regex, so this should remain false.
      return "127.0.0.1 localhost\n127.0.0.1 api.anthropic.com\n::1 api.anthropic.com\n";
    }
    return realReadFileSync(p, enc);
  });

  const { getMitmStatus } = await import("../../src/mitm/manager.ts?probe=8466-legacy");
  const status = await getMitmStatus();

  assert.equal(
    status.dnsConfigured,
    false,
    "callers that omit agentId must keep the legacy Antigravity-only check"
  );
});

test("diagnose route: threads ?agentId= query param through to getMitmStatus", async () => {
  const realReadFileSync = fs.readFileSync.bind(fs);
  mock.method(fs, "readFileSync", (p: string, enc?: BufferEncoding) => {
    if (p === "/etc/hosts") {
      return "127.0.0.1 localhost\n127.0.0.1 api.anthropic.com\n::1 api.anthropic.com\n";
    }
    return realReadFileSync(p, enc);
  });

  const { GET } = await import(
    "../../src/app/api/tools/agent-bridge/diagnose/route.ts?probe=8466-route"
  );
  const res = await GET(
    new Request("http://localhost/api/tools/agent-bridge/diagnose?agentId=claude-code")
  );
  const body = (await res.json()) as {
    checks: Array<{ name: string; ok: boolean }>;
  };
  const dnsCheck = body.checks.find((c) => c.name === "dns-configured");

  assert.ok(dnsCheck, "expected a dns-configured check in the diagnostics report");
  assert.equal(
    dnsCheck?.ok,
    true,
    "diagnose route must pass agentId through to getMitmStatus so dns-configured reflects the diagnosed agent's hosts"
  );
});

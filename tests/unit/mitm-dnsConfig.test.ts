/**
 * Unit tests: OMNIROUTE_SKIP_DNS_WRITE guard on addDNSEntries / removeDNSEntries.
 *
 * A loader hook replaces child_process.spawn with a mock that records calls
 * instead of executing real sudo. The mock is process-wide but only replaces
 * spawn — execFile/execFileSync remain real (used by isSudoAvailable which
 * is harmless).
 *
 * The isolateDataDir.ts setup (loaded via --import) sets
 * OMNIROUTE_SKIP_DNS_WRITE=1 by default, so the guard tests are inherently
 * safe. The "proceeds" tests temporarily clear the guard and rely on the
 * spawn mock to prevent real sudo.
 *
 * removeDNSEntries "proceeds" tests use a sentinel host (__dns_guard_test__).
 * When the host is present in /etc/hosts (injected by _run_dns_guard_test.sh
 * before the test), the full exec path is exercised and spawn calls are
 * asserted. When absent, the function returns early at the presentHosts check
 * and we verify zero spawn calls — still proving the guard did not block.
 * This makes the test self-contained regardless of /etc/hosts content.
 */

import fs from "node:fs";
import { register } from "node:module";
import test from "node:test";
import assert from "node:assert/strict";

// Register loader hook — must happen before any dnsConfig.ts import.
register(new URL("../_cp_mock_hook.mts", import.meta.url).href, import.meta.url);

// The mock module's spawn call log.
const { spawnCalls, resetSpawnCalls } = await import("../_cp_mock_module.mts");

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

let importCounter = 0;

/** Sentinel hostname for removeDNSEntries exec-path tests. */
const RM_TEST_HOST = "__dns_guard_test__";

/** True when RM_TEST_HOST has IPv4+IPv6 entries in /etc/hosts. */
let hostIsPresent = false;
try {
  const hostsContent = fs.readFileSync("/etc/hosts", "utf8");
  const lines = hostsContent.split(/\r?\n/);
  hostIsPresent = [`127.0.0.1 ${RM_TEST_HOST}`, `::1 ${RM_TEST_HOST}`].every(
    (entry) => {
      const [ip, host] = entry.split(/\s+/);
      return lines.some((line) => {
        const parts = line.trim().split(/\s+/).filter(Boolean);
        return parts.length >= 2 && parts[0] === ip && parts.includes(host);
      });
    },
  );
} catch {
  // /etc/hosts not readable — treat as absent.
}

/**
 * Assert the spawn that writes /etc/hosts.
 *
 * `resolveSudoSpawn()` (src/mitm/systemCommands.ts) deliberately drops the
 * `sudo -S` prefix when the process is already root, when `sudo` is not
 * installed (slim containers) or under `OMNIROUTE_NO_SUDO` (#6122) — so the
 * spawned command is `sudo` for an unprivileged user and the bare underlying
 * binary otherwise. Hardcoding `sudo` made this test fail whenever the suite
 * ran as root. Assert the *effective* invocation instead: the write always
 * goes through `tee -a <hosts file>`, elevated or not.
 */
function assertHostsWriteSpawn(call: { command: string; args: string[] }): void {
  if (process.platform === "win32") {
    assert.equal(call.command, "powershell.exe", "should invoke powershell.exe");
    return;
  }
  const argv = [call.command, ...call.args];
  assert.ok(argv.includes("tee"), `should write hosts via tee (got: ${argv.join(" ")})`);
  assert.ok(argv.includes("-a"), `tee should append, not truncate (got: ${argv.join(" ")})`);
  if (call.command === "sudo") {
    assert.ok(call.args.includes("-S"), "sudo should use -S flag for password stdin");
  } else {
    assert.equal(call.command, "tee", `unelevated write should invoke tee directly (got ${call.command})`);
  }
}

function guardEnv(value: string | undefined): () => void {
  const prev = process.env.OMNIROUTE_SKIP_DNS_WRITE;
  if (value === undefined) {
    delete process.env.OMNIROUTE_SKIP_DNS_WRITE;
  } else {
    process.env.OMNIROUTE_SKIP_DNS_WRITE = value;
  }
  return () => {
    if (prev === undefined) delete process.env.OMNIROUTE_SKIP_DNS_WRITE;
    else process.env.OMNIROUTE_SKIP_DNS_WRITE = prev;
  };
}

// Unique import URL per test to bypass ESM module cache.
async function importDnsConfig() {
  return import(`../../src/mitm/dns/dnsConfig.ts?t=${++importCounter}`);
}

// ---------------------------------------------------------------------------
// addDNSEntries guard
// ---------------------------------------------------------------------------

test("addDNSEntries: returns early when OMNIROUTE_SKIP_DNS_WRITE=1", async () => {
  resetSpawnCalls();
  const { addDNSEntries } = await importDnsConfig();
  const restore = guardEnv("1");
  try {
    await addDNSEntries(["test-host.example.com"], "fake-pw");
    assert.equal(spawnCalls.length, 0, "spawn should NOT be called when guard is active");
  } finally {
    restore();
  }
});

test("addDNSEntries: proceeds when env var is unset", async () => {
  resetSpawnCalls();
  const { addDNSEntries } = await importDnsConfig();
  const restore = guardEnv(undefined);
  try {
    await addDNSEntries(["__test_add_unset__.example.com"], "fake-pw");
    assert.ok(spawnCalls.length > 0, "spawn should be called when guard is off");
    assertHostsWriteSpawn(spawnCalls[0]);
  } finally {
    restore();
  }
});

test("addDNSEntries: proceeds when OMNIROUTE_SKIP_DNS_WRITE=0", async () => {
  resetSpawnCalls();
  const { addDNSEntries } = await importDnsConfig();
  const restore = guardEnv("0");
  try {
    await addDNSEntries(["__test_add_0__.example.com"], "fake-pw");
    assert.ok(spawnCalls.length > 0, "spawn should be called for value '0'");
    assertHostsWriteSpawn(spawnCalls[0]);
  } finally {
    restore();
  }
});

test("addDNSEntries: guard does NOT trigger for value 'true'", async () => {
  resetSpawnCalls();
  const { addDNSEntries } = await importDnsConfig();
  const restore = guardEnv("true");
  try {
    await addDNSEntries(["__test_add_true__.example.com"], "fake-pw");
    assert.ok(spawnCalls.length > 0, "spawn should be called for value 'true'");
    assertHostsWriteSpawn(spawnCalls[0]);
  } finally {
    restore();
  }
});

// ---------------------------------------------------------------------------
// removeDNSEntries guard
// ---------------------------------------------------------------------------

test("removeDNSEntries: returns early when OMNIROUTE_SKIP_DNS_WRITE=1", async () => {
  resetSpawnCalls();
  const { removeDNSEntries } = await importDnsConfig();
  const restore = guardEnv("1");
  try {
    await removeDNSEntries([RM_TEST_HOST], "fake-pw");
    assert.equal(spawnCalls.length, 0, "spawn should NOT be called when guard is active");
  } finally {
    restore();
  }
});

test("removeDNSEntries: proceeds when env var is unset", async () => {
  resetSpawnCalls();
  const { removeDNSEntries } = await importDnsConfig();
  const restore = guardEnv(undefined);
  try {
    await removeDNSEntries([RM_TEST_HOST], "fake-pw");
    if (hostIsPresent) {
      // Full exec path: host present → execFileWithPassword → mock spawn.
      assert.ok(spawnCalls.length > 0, "spawn called for present host");
    } else {
      // Host absent → presentHosts empty → early return, no spawn.
      assert.equal(spawnCalls.length, 0, "no spawn for absent host");
    }
  } finally {
    restore();
  }
});

test("removeDNSEntries: proceeds when OMNIROUTE_SKIP_DNS_WRITE=0", async () => {
  resetSpawnCalls();
  const { removeDNSEntries } = await importDnsConfig();
  const restore = guardEnv("0");
  try {
    await removeDNSEntries([RM_TEST_HOST], "fake-pw");
    if (hostIsPresent) {
      assert.ok(spawnCalls.length > 0, "spawn called for present host");
    } else {
      assert.equal(spawnCalls.length, 0, "no spawn for absent host");
    }
  } finally {
    restore();
  }
});

test("removeDNSEntries: guard does NOT trigger for value 'true'", async () => {
  resetSpawnCalls();
  const { removeDNSEntries } = await importDnsConfig();
  const restore = guardEnv("true");
  try {
    await removeDNSEntries([RM_TEST_HOST], "fake-pw");
    if (hostIsPresent) {
      assert.ok(spawnCalls.length > 0, "spawn called for present host");
    } else {
      assert.equal(spawnCalls.length, 0, "no spawn for absent host");
    }
  } finally {
    restore();
  }
});

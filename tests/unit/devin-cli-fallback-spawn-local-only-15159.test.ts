// #15159 S-01 (residual gap): the devin cloud-agent CLI fallback spawns a child
// process, and it was reachable from a REMOTE management route that is not
// loopback-gated.
//
// The chain:
//   POST /api/providers/{id}/test        (remote-reachable management route)
//     -> testSingleConnection()
//     -> testApiKeyConnection()
//     -> validateProviderApiKey({ provider: "devin", … })
//     -> validateDevinCloudAgentProvider()
//     -> validateDevinCliKeyFallback()   ← spawn(bin, ["acp","--agent-type","summarizer"])
//
// PR #15242 gated POST /api/providers/{id}/login, /refresh-cursor, /validate,
// /import and /bulk. It did NOT gate /api/providers/{id}/test, which reaches the
// same spawn through the same validator — so a leaked JWT via tunnel could still
// trigger process spawning, which Hard Rules #15 and #17 forbid.
//
// The fix threads an `allowLocalSpawn` flag down from the route (derived from the
// trusted peer-locality header, exactly like the existing `allowLocalRuntimeProbe`
// option) so the CLI fallback is skipped for non-loopback callers.
//
// ── How "did a spawn happen?" is observed ─────────────────────────────────
// A marker file written by the spawned process. There is no module mocking and no
// assertion on mock-call bookkeeping: if the marker exists, a real child process
// ran on this machine.
//
// The fake CLI is node itself. The production spawn is
// `spawn(bin, ["acp", "--agent-type", "summarizer"])`, so pointing CLI_DEVIN_BIN at
// process.execPath and dropping an extensionless `acp` file in the working directory
// makes node run that file as the "CLI". This is deliberately cross-platform: a
// `#!/bin/sh` fixture (and a `.cmd` one) cannot be spawned directly on Windows —
// `.cmd` needs `shell:true`, and the repo's own devin validator suite has a test
// that silently depends on a POSIX shell and cannot pass there.
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { validateProviderApiKey } from "../../src/lib/providers/validation.ts";

const MARKER_ENV = "OMNIROUTE_TEST_DEVIN_SPAWN_MARKER";

/**
 * Installs a fake Devin CLI: CLI_DEVIN_BIN points at node, and an extensionless
 * `acp` file in a temp cwd records the spawn by touching $OMNIROUTE_TEST_DEVIN_SPAWN_MARKER.
 * Returns a restore() that must run in a finally block.
 */
function installMarkerDevinCli(): { marker: string; restore: () => void } {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-devin-cli-"));
  const marker = path.join(tmp, "spawned.marker");
  // `process.exit(0)` == a CLI that accepts any key, so the 401 branch reports valid.
  fs.writeFileSync(
    path.join(tmp, "acp"),
    `require("node:fs").writeFileSync(process.env.${MARKER_ENV} || "", "spawned");process.exit(0);`,
    "utf8"
  );

  const originalBin = process.env.CLI_DEVIN_BIN;
  const originalMarker = process.env[MARKER_ENV];
  const originalCwd = process.cwd();

  process.env.CLI_DEVIN_BIN = process.execPath;
  process.env[MARKER_ENV] = marker;
  // spawn() inherits the process cwd, so the child resolves `acp` from here.
  process.chdir(tmp);

  return {
    marker,
    restore: () => {
      process.chdir(originalCwd);
      if (originalBin === undefined) delete process.env.CLI_DEVIN_BIN;
      else process.env.CLI_DEVIN_BIN = originalBin;
      if (originalMarker === undefined) delete process.env[MARKER_ENV];
      else process.env[MARKER_ENV] = originalMarker;
      fs.rmSync(tmp, { recursive: true, force: true });
    },
  };
}

/** Runs the real validator against a 401 HTTP probe — the branch that falls through to the CLI. */
async function probeDevinValidation(
  extra: Record<string, unknown> = {}
): Promise<{ valid: boolean; error: string | null }> {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async () => new Response("{}", { status: 401 })) as unknown as typeof fetch;
  try {
    return await validateProviderApiKey({
      provider: "devin",
      apiKey: "apk_user_cli_format_key",
      ...extra,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);
  } finally {
    globalThis.fetch = originalFetch;
  }
}

// ─── SANITY first: the marker really does detect a spawn ──────────────────
// Without this case every assertion below could pass while the flag is ignored
// entirely, because the fixture might simply never run. This is what makes the
// negative test non-vacuous.

test("S-01 sanity: the fixture detects a real spawn when local spawning is allowed", async () => {
  const { marker, restore } = installMarkerDevinCli();
  try {
    const result = await probeDevinValidation({ allowLocalSpawn: true });
    assert.equal(
      fs.existsSync(marker),
      true,
      "the fake CLI must actually run — otherwise the negative assertion below proves nothing"
    );
    assert.equal(result.valid, true);
  } finally {
    restore();
  }
});

// ─── RED: a non-loopback caller must not be able to spawn the CLI ─────────

test("S-01: validateProviderApiKey does not spawn the Devin CLI when allowLocalSpawn is false", async () => {
  const { marker, restore } = installMarkerDevinCli();
  try {
    const result = await probeDevinValidation({ allowLocalSpawn: false });
    assert.equal(
      fs.existsSync(marker),
      false,
      "the Devin CLI must NOT be spawned for a non-loopback caller (Hard Rules #15/#17)"
    );
    assert.equal(result.valid, false);
  } finally {
    restore();
  }
});

// ─── The default must stay permissive for internal, non-route callers ─────
// The credential-health scheduler and the VNC harvest path call the validator
// directly. Neither is tunnel-reachable (VNC is already loopback-gated), so
// flipping the default to deny would break legitimate background validation.

test("S-01: allowLocalSpawn defaults to permissive for direct (non-route) callers", async () => {
  const { marker, restore } = installMarkerDevinCli();
  try {
    await probeDevinValidation();
    assert.equal(
      fs.existsSync(marker),
      true,
      "omitting allowLocalSpawn must keep the existing permissive behaviour (scheduler + VNC harvest)"
    );
  } finally {
    restore();
  }
});

// ─── Every remote-reachable route must pass the flag ───────────────────────
// Source-level guard: the three management routes that reach the validator must
// derive the flag from the trusted peer-locality header, so a future route that
// reaches the same spawn cannot forget it.

test("S-01: the three test routes derive allowLocalSpawn from peer locality", async () => {
  const base = new URL("../../src/app/api/providers/", import.meta.url);
  const read = async (rel: string) => fs.promises.readFile(new URL(rel, base), "utf8");

  const sources: Array<[string, string]> = [
    ["[id]/test", await read("[id]/test/route.ts")],
    ["providers (create)", await read("route.ts")],
    ["test-batch", await read("test-batch/route.ts")],
  ];

  // Accepts both call shapes present in these routes: an inline
  // `allowLocalSpawn: getRequestPeerLocality(request) !== "remote"` property and a
  // local const bound to that same expression (test-batch uses the latter, matching
  // its existing allowLocalRuntimeProbe style). What matters is that the value is
  // derived from the trusted peer-locality header, not from anything caller-supplied.
  const derivedFromLocality =
    /allowLocalSpawn:\s*getRequestPeerLocality\(request\)\s*!==\s*"remote"/;
  const boundFromLocality =
    /const allowLocalSpawn = getRequestPeerLocality\(request\)\s*!==\s*"remote"/;

  for (const [name, source] of sources) {
    assert.ok(
      derivedFromLocality.test(source) || boundFromLocality.test(source),
      `${name} must derive allowLocalSpawn from the trusted peer-locality header`
    );
  }

  // The flag must actually reach testSingleConnection in every route, or deriving
  // it is pointless. Skip the `async function testSingleConnection(` DECLARATION in
  // [id]/test by requiring the call to be preceded by `await`, `void` or `[` — the
  // last covers test-batch, which calls it bare inside `Promise.race([ … ])`. Bounded
  // window rather than `[^)]*`, which cannot cross the `)` in
  // `testSingleConnection(id, validationModelId, { … })`.
  for (const [name, source] of sources) {
    const callMatch = /(?:await\s+|void\s+|\[\s*)testSingleConnection\(/g;
    let sawCall = false;
    let m: RegExpExecArray | null;
    while ((m = callMatch.exec(source)) !== null) {
      sawCall = true;
      const window = source.slice(m.index, m.index + 400);
      assert.match(
        window,
        /allowLocalSpawn/,
        `${name} must pass allowLocalSpawn into testSingleConnection`
      );
    }
    assert.ok(sawCall, `${name} must call testSingleConnection`);
  }
});

// ─── The loopback-locked spawn-capable list must not claim this route ──────
// Guard against someone "fixing" the residual gap by blanket-locking
// /api/providers/{id}/test in LOCAL_ONLY_API_PATTERNS, which would break remote
// dashboards that legitimately test connections.

test("S-01: /api/providers/{id}/test is NOT blanket-locked as LOCAL_ONLY", async () => {
  const { isLocalOnlyPath } = await import("../../src/server/authz/routeGuard.ts");
  assert.equal(
    isLocalOnlyPath("/api/providers/abc-123/test"),
    false,
    "connection testing must stay remote-reachable — the spawn is gated at its call site instead"
  );
});

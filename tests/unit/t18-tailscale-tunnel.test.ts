import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { deriveTailscalePhase } from "../../src/lib/tunnel/tunnelManager.ts";
import {
  clearTailscalePid,
  clearTunnelState,
  generateShortId,
  loadTailscalePid,
  loadTunnelState,
  saveTailscalePid,
  updateTunnelState,
} from "../../src/lib/tunnel/tunnelState.ts";

const originalDataDir = process.env.DATA_DIR;
const tempDirs = new Set<string>();

test.afterEach(async () => {
  clearTailscalePid();
  clearTunnelState();

  if (originalDataDir === undefined) {
    delete process.env.DATA_DIR;
  } else {
    process.env.DATA_DIR = originalDataDir;
  }

  for (const tempDir of tempDirs) {
    await fs.rm(tempDir, { recursive: true, force: true });
  }
  tempDirs.clear();
});

test("T18: deriveTailscalePhase follows the expected status progression", () => {
  assert.equal(
    deriveTailscalePhase({
      supported: false,
      installed: false,
      daemonRunning: false,
      loggedIn: false,
      running: false,
    }),
    "unsupported"
  );

  assert.equal(
    deriveTailscalePhase({
      supported: true,
      installed: false,
      daemonRunning: false,
      loggedIn: false,
      running: false,
    }),
    "not_installed"
  );

  assert.equal(
    deriveTailscalePhase({
      supported: true,
      installed: true,
      daemonRunning: false,
      loggedIn: false,
      running: false,
    }),
    "needs_daemon"
  );

  assert.equal(
    deriveTailscalePhase({
      supported: true,
      installed: true,
      daemonRunning: true,
      loggedIn: false,
      running: false,
    }),
    "needs_login"
  );

  assert.equal(
    deriveTailscalePhase({
      supported: true,
      installed: true,
      daemonRunning: true,
      loggedIn: true,
      running: false,
    }),
    "stopped"
  );

  assert.equal(
    deriveTailscalePhase({
      supported: true,
      installed: true,
      daemonRunning: true,
      loggedIn: true,
      running: true,
    }),
    "running"
  );

  assert.equal(
    deriveTailscalePhase({
      supported: true,
      installed: true,
      daemonRunning: true,
      loggedIn: true,
      running: false,
      lastError: "boom",
    }),
    "error"
  );
});

test("T18: tunnelState persists short id, funnel URL, and tailscaled pid under DATA_DIR", async () => {
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "omniroute-tailscale-"));
  tempDirs.add(tempDir);
  process.env.DATA_DIR = tempDir;

  const shortId = generateShortId();
  assert.equal(shortId.length, 6);
  assert.match(shortId, /^[abcdefghijklmnpqrstuvwxyz23456789]{6}$/);

  updateTunnelState({
    shortId,
    tailscaleUrl: "https://omniroute-demo.tail123.ts.net",
  });

  const savedState = loadTunnelState();
  assert.equal(savedState?.shortId, shortId);
  assert.equal(savedState?.tailscaleUrl, "https://omniroute-demo.tail123.ts.net");
  assert.equal(typeof savedState?.updatedAt, "string");

  saveTailscalePid(4242);
  assert.equal(loadTailscalePid(), 4242);

  clearTailscalePid();
  assert.equal(loadTailscalePid(), null);

  clearTunnelState();
  assert.equal(loadTunnelState(), null);
});

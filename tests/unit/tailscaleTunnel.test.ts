import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = await fs.mkdtemp(path.join(os.tmpdir(), "omniroute-tailscale-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const tailscaleTunnel = await import("../../src/lib/tailscaleTunnel.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const dbCore = await import("../../src/lib/db/core.ts");
const mitmManager = await import("../../src/mitm/manager.ts");

const originalEnv = {
  tailscaleBin: process.env.TAILSCALE_BIN,
  tailscaledBin: process.env.TAILSCALED_BIN,
  statusJson: process.env.TAILSCALE_TEST_STATUS_JSON,
  funnelStatusJson: process.env.TAILSCALE_TEST_FUNNEL_STATUS_JSON,
  funnelOutput: process.env.TAILSCALE_TEST_FUNNEL_OUTPUT,
  funnelExitCode: process.env.TAILSCALE_TEST_FUNNEL_EXIT_CODE,
  loginOutput: process.env.TAILSCALE_TEST_LOGIN_OUTPUT,
  loginExitCode: process.env.TAILSCALE_TEST_LOGIN_EXIT_CODE,
};

async function createFakeTailscaleBinary() {
  const fakePath = path.join(TEST_DATA_DIR, "fake-tailscale.sh");
  await fs.writeFile(
    fakePath,
    `#!/usr/bin/env bash
args="$*"
if [[ "$args" == *"funnel status --json"* ]]; then
  if [[ -n "$TAILSCALE_TEST_FUNNEL_STATUS_JSON" ]]; then
    printf '%s' "$TAILSCALE_TEST_FUNNEL_STATUS_JSON"
    exit 0
  fi
  exit 1
fi
if [[ "$args" == *"status --json"* ]]; then
  if [[ -n "$TAILSCALE_TEST_STATUS_JSON" ]]; then
    printf '%s' "$TAILSCALE_TEST_STATUS_JSON"
    exit 0
  fi
  exit 1
fi
if [[ "$args" == *"funnel --bg reset"* ]]; then
  exit 0
fi
if [[ "$args" == *"funnel --bg "* ]]; then
  if [[ -n "$TAILSCALE_TEST_FUNNEL_OUTPUT" ]]; then
    printf '%s' "$TAILSCALE_TEST_FUNNEL_OUTPUT"
  fi
  exit "\${TAILSCALE_TEST_FUNNEL_EXIT_CODE:-0}"
fi
if [[ "$args" == *"up --accept-routes"* ]]; then
  if [[ -n "$TAILSCALE_TEST_LOGIN_OUTPUT" ]]; then
    printf '%s' "$TAILSCALE_TEST_LOGIN_OUTPUT"
  fi
  exit "\${TAILSCALE_TEST_LOGIN_EXIT_CODE:-0}"
fi
exit 1
`,
    "utf8"
  );
  await fs.chmod(fakePath, 0o755);
  return fakePath;
}

function resetTailscaleTestEnv(fakeBinaryPath: string) {
  process.env.TAILSCALE_BIN = fakeBinaryPath;
  process.env.TAILSCALED_BIN = fakeBinaryPath;
  delete process.env.TAILSCALE_TEST_STATUS_JSON;
  delete process.env.TAILSCALE_TEST_FUNNEL_STATUS_JSON;
  delete process.env.TAILSCALE_TEST_FUNNEL_OUTPUT;
  delete process.env.TAILSCALE_TEST_FUNNEL_EXIT_CODE;
  delete process.env.TAILSCALE_TEST_LOGIN_OUTPUT;
  delete process.env.TAILSCALE_TEST_LOGIN_EXIT_CODE;
}

test.beforeEach(async () => {
  const fakeBinaryPath = await createFakeTailscaleBinary();
  resetTailscaleTestEnv(fakeBinaryPath);
  mitmManager.clearCachedPassword();
  dbCore.resetDbInstance();
  await fs.rm(TEST_DATA_DIR, { recursive: true, force: true });
  await fs.mkdir(TEST_DATA_DIR, { recursive: true });
  const recreatedBinaryPath = await createFakeTailscaleBinary();
  resetTailscaleTestEnv(recreatedBinaryPath);
});

test.after(async () => {
  dbCore.resetDbInstance();
  mitmManager.clearCachedPassword();
  if (originalEnv.tailscaleBin === undefined) delete process.env.TAILSCALE_BIN;
  else process.env.TAILSCALE_BIN = originalEnv.tailscaleBin;
  if (originalEnv.tailscaledBin === undefined) delete process.env.TAILSCALED_BIN;
  else process.env.TAILSCALED_BIN = originalEnv.tailscaledBin;
  if (originalEnv.statusJson === undefined) delete process.env.TAILSCALE_TEST_STATUS_JSON;
  else process.env.TAILSCALE_TEST_STATUS_JSON = originalEnv.statusJson;
  if (originalEnv.funnelStatusJson === undefined)
    delete process.env.TAILSCALE_TEST_FUNNEL_STATUS_JSON;
  else process.env.TAILSCALE_TEST_FUNNEL_STATUS_JSON = originalEnv.funnelStatusJson;
  if (originalEnv.funnelOutput === undefined) delete process.env.TAILSCALE_TEST_FUNNEL_OUTPUT;
  else process.env.TAILSCALE_TEST_FUNNEL_OUTPUT = originalEnv.funnelOutput;
  if (originalEnv.funnelExitCode === undefined) delete process.env.TAILSCALE_TEST_FUNNEL_EXIT_CODE;
  else process.env.TAILSCALE_TEST_FUNNEL_EXIT_CODE = originalEnv.funnelExitCode;
  if (originalEnv.loginOutput === undefined) delete process.env.TAILSCALE_TEST_LOGIN_OUTPUT;
  else process.env.TAILSCALE_TEST_LOGIN_OUTPUT = originalEnv.loginOutput;
  if (originalEnv.loginExitCode === undefined) delete process.env.TAILSCALE_TEST_LOGIN_EXIT_CODE;
  else process.env.TAILSCALE_TEST_LOGIN_EXIT_CODE = originalEnv.loginExitCode;
  await fs.rm(TEST_DATA_DIR, { recursive: true, force: true });
});

test("extractTailscaleAuthUrl and extractTailscaleEnableUrl parse login URLs", () => {
  assert.equal(
    tailscaleTunnel.extractTailscaleAuthUrl(
      "To authenticate, visit https://login.tailscale.com/a/demo-token in your browser."
    ),
    "https://login.tailscale.com/a/demo-token"
  );
  assert.equal(
    tailscaleTunnel.extractTailscaleEnableUrl(
      "Funnel is not enabled yet. Open https://login.tailscale.com/f/funnel-demo to continue."
    ),
    "https://login.tailscale.com/f/funnel-demo"
  );
});

test("getTailscaleUrlFromStatusPayload normalizes DNS names into HTTPS URLs", () => {
  assert.equal(
    tailscaleTunnel.getTailscaleUrlFromStatusPayload({
      Self: { DNSName: "omniroute-demo.tail123.ts.net." },
    }),
    "https://omniroute-demo.tail123.ts.net"
  );
});

test("getTailscaleTunnelStatus reflects a logged-in running funnel", async () => {
  process.env.TAILSCALE_TEST_STATUS_JSON = JSON.stringify({
    BackendState: "Running",
    Self: { DNSName: "omniroute-demo.tail123.ts.net." },
  });
  process.env.TAILSCALE_TEST_FUNNEL_STATUS_JSON = JSON.stringify({
    AllowFunnel: {
      "443": true,
    },
  });

  const status = await tailscaleTunnel.getTailscaleTunnelStatus();

  assert.equal(status.installed, true);
  assert.equal(status.loggedIn, true);
  assert.equal(status.running, true);
  assert.equal(status.phase, "running");
  assert.equal(status.tunnelUrl, "https://omniroute-demo.tail123.ts.net");
  assert.equal(status.apiUrl, "https://omniroute-demo.tail123.ts.net/v1");
});

test("enableTailscaleTunnel returns an auth URL when login is still required", async () => {
  process.env.TAILSCALE_TEST_STATUS_JSON = JSON.stringify({
    BackendState: "NeedsLogin",
    Self: { DNSName: "omniroute-demo.tail123.ts.net." },
  });
  process.env.TAILSCALE_TEST_LOGIN_OUTPUT =
    "Authenticate at https://login.tailscale.com/a/login-token";

  const result = await tailscaleTunnel.enableTailscaleTunnel();

  assert.equal(result.success, false);
  assert.equal("needsLogin" in result, true);
  if ("needsLogin" in result) {
    assert.equal(result.authUrl, "https://login.tailscale.com/a/login-token");
  }
});

test("enableTailscaleTunnel returns the funnel enable URL when the tailnet has Funnel disabled", async () => {
  process.env.TAILSCALE_TEST_STATUS_JSON = JSON.stringify({
    BackendState: "Running",
    Self: { DNSName: "omniroute-demo.tail123.ts.net." },
  });
  process.env.TAILSCALE_TEST_FUNNEL_OUTPUT =
    "Funnel is not enabled. Continue at https://login.tailscale.com/f/funnel-token";

  const result = await tailscaleTunnel.enableTailscaleTunnel();

  assert.equal(result.success, false);
  assert.equal("funnelNotEnabled" in result, true);
  if ("funnelNotEnabled" in result) {
    assert.equal(result.enableUrl, "https://login.tailscale.com/f/funnel-token");
  }
});

test("enableTailscaleTunnel stores the funnel URL and disableTailscaleTunnel clears it", async () => {
  process.env.TAILSCALE_TEST_STATUS_JSON = JSON.stringify({
    BackendState: "Running",
    Self: { DNSName: "omniroute-demo.tail123.ts.net." },
  });
  process.env.TAILSCALE_TEST_FUNNEL_STATUS_JSON = JSON.stringify({
    AllowFunnel: {
      "443": true,
    },
  });
  process.env.TAILSCALE_TEST_FUNNEL_OUTPUT = "Available at https://omniroute-demo.tail123.ts.net";

  const enabled = await tailscaleTunnel.enableTailscaleTunnel();
  const settingsAfterEnable = await settingsDb.getSettings();

  assert.equal(enabled.success, true);
  if (enabled.success) {
    assert.equal(enabled.tunnelUrl, "https://omniroute-demo.tail123.ts.net");
  }
  assert.equal(settingsAfterEnable.tailscaleEnabled, true);
  assert.equal(settingsAfterEnable.tailscaleUrl, "https://omniroute-demo.tail123.ts.net");

  const disabled = await tailscaleTunnel.disableTailscaleTunnel();
  const settingsAfterDisable = await settingsDb.getSettings();

  assert.equal(disabled.success, true);
  assert.equal(settingsAfterDisable.tailscaleEnabled, false);
  assert.equal(settingsAfterDisable.tailscaleUrl, "");
});

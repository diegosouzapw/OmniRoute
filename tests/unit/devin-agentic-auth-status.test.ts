import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import {
  clearDevinAgenticAuthStatusCache,
  getDevinAgenticAuthStatus,
  parseDevinAuthStatus,
} from "../../src/lib/providers/devinAgenticAuthStatus.ts";

const root = path.join(os.tmpdir(), ".sandbox", "devin-auth-status-tests");
fs.mkdirSync(root, { recursive: true });

test("Devin auth status parser distinguishes authenticated and logged-out output", () => {
  assert.equal(
    parseDevinAuthStatus("Logged in (via Devin).\nUser: private@example.test"),
    "authenticated"
  );
  assert.equal(
    parseDevinAuthStatus("Not logged in.\nRun devin auth login."),
    "unauthenticated"
  );
  assert.equal(parseDevinAuthStatus("CLI failed to start"), "unavailable");
});

test("Devin auth status runs in its isolated home and returns no account details", async () => {
  clearDevinAgenticAuthStatusCache();
  const home = fs.mkdtempSync(path.join(root, "home-"));
  const fakeCli = path.join(root, `fake-devin-${process.pid}.sh`);
  fs.writeFileSync(
    fakeCli,
    "#!/bin/sh\nprintf 'Logged in (via Devin).\\nUser: private@example.test\\n'\n",
    { mode: 0o700 }
  );

  try {
    const status = await getDevinAgenticAuthStatus(
      {
        PATH: process.env.PATH,
        DEVIN_AGENTIC_HOME: home,
        CLI_DEVIN_AGENTIC_BIN: fakeCli,
      },
      Date.now() + 20_000
    );
    assert.equal(status, "authenticated");
  } finally {
    clearDevinAgenticAuthStatusCache();
    fs.rmSync(home, { recursive: true, force: true });
    fs.rmSync(fakeCli, { force: true });
  }
});

test("Devin auth status reports unavailable when the isolated home is missing", async () => {
  clearDevinAgenticAuthStatusCache();
  assert.equal(await getDevinAgenticAuthStatus({ PATH: process.env.PATH }), "unavailable");
  clearDevinAgenticAuthStatusCache();
});

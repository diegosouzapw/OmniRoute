/**
 * Regression guard: the unit suite must never launch a real browser.
 *
 * The Adobe Firefly session warm (adobeFireflySession.ts::shouldWarm) spawns the SYSTEM
 * browser with --remote-debugging-port whenever a test reaches it without a valid user
 * JWT — which any mocked-fetch test does by construction. Per-call-site
 * `allowBrowserRefresh: false` / `tryBrowser: false` is NOT enough: the warm is also
 * reachable indirectly via client/handler paths, so the guard must be global.
 */
import { test } from "node:test";
import assert from "node:assert";
import { spawnSync } from "node:child_process";
import { adobeFireflyBrowserEnabled } from "../../open-sse/services/adobeFireflySession.ts";

test("test setup disables Adobe Firefly browser warm", () => {
  assert.equal(
    process.env.ADOBE_FIREFLY_BROWSER_REFRESH,
    "0",
    "tests/_setup/isolateDataDir.ts must set ADOBE_FIREFLY_BROWSER_REFRESH=0 so the suite " +
      "never launches the system Chrome at firefly.adobe.com"
  );
  assert.equal(
    adobeFireflyBrowserEnabled(),
    false,
    "adobeFireflyBrowserEnabled() must be false under the test setup"
  );
});

/**
 * Behavioral check of the ||= semantics, in a fresh process (this test's own env was
 * already written by the setup, so the guard can't be re-observed in-process):
 *   - with the var unset, the setup fills in "0" (browser disabled by default);
 *   - with the var preset to "1", the setup leaves it alone — a browser-path
 *     integration test can still opt back in.
 */
function runSetupWithEnv(value: string | undefined): string {
  const env = { ...process.env } as Record<string, string | undefined>;
  if (value === undefined) delete env.ADOBE_FIREFLY_BROWSER_REFRESH;
  else env.ADOBE_FIREFLY_BROWSER_REFRESH = value;
  const res = spawnSync(
    process.execPath,
    [
      "--import", "tsx/esm",
      "--import", "./tests/_setup/isolateDataDir.ts",
      "-e", "process.stdout.write(String(process.env.ADOBE_FIREFLY_BROWSER_REFRESH))",
    ],
    { env, encoding: "utf8" }
  );
  assert.equal(res.status, 0, `setup subprocess failed: ${res.stderr}`);
  return res.stdout;
}

test("setup disables the browser by default but preserves an explicit opt-in", () => {
  assert.equal(runSetupWithEnv(undefined), "0", "unset must become 0 (browser off)");
  assert.equal(runSetupWithEnv("1"), "1", "preset 1 must survive (integration tests can opt in)");
});

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
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
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

test("isolateDataDir sets the browser guard with ||= so integration tests can opt in", () => {
  const setupPath = join(
    dirname(fileURLToPath(import.meta.url)),
    "..",
    "_setup",
    "isolateDataDir.ts"
  );
  const source = readFileSync(setupPath, "utf8");
  assert.match(
    source,
    /process\.env\.ADOBE_FIREFLY_BROWSER_REFRESH \|\|= "0";/,
    "the guard must use ||= (not =) so a browser-path integration test can still opt back in"
  );
});

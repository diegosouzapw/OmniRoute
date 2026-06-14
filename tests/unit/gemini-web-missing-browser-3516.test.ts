import test from "node:test";
import assert from "node:assert/strict";
import { isMissingBrowserExecutable } from "../../open-sse/executors/gemini-web.ts";

// Regression for #3516: when the Playwright Chromium binary isn't installed, chromium.launch()
// throws "browserType.launch: Executable doesn't exist at ...". gemini-web returned that as a
// generic 500, which accountFallback treats as a retryable upstream error → the account is
// marked unavailable and the request loops/trips the provider breaker. A missing browser is a
// host/config problem, not a transient upstream fault — it must be classified so the executor
// can surface an actionable error and use the connection-cooldown hint instead of the 500 loop.

test("#3516 detects the Playwright missing-executable launch error", () => {
  const msg =
    "browserType.launch: Executable doesn't exist at /home/node/.cache/ms-playwright/" +
    "chromium_headless_shell-1223/chrome-linux/headless_shell\n" +
    "╔════════════════════════════════════════════════════════════╗\n" +
    "║ Looks like Playwright Test or Playwright was just installed  ║";
  assert.equal(isMissingBrowserExecutable(msg), true);
});

test("#3516 detects the 'npx playwright install' guidance variant", () => {
  assert.equal(isMissingBrowserExecutable("Please run the following command: npx playwright install"), true);
});

test("#3516 does NOT classify a normal upstream/network error as missing-executable", () => {
  assert.equal(isMissingBrowserExecutable("No response from Gemini"), false);
  assert.equal(isMissingBrowserExecutable("fetch failed: ECONNRESET"), false);
  assert.equal(isMissingBrowserExecutable(""), false);
});

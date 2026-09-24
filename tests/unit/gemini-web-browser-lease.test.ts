import test from "node:test";
import assert from "node:assert/strict";
import {
  acquireGeminiBrowser,
  releaseGeminiBrowser,
  resetGeminiBrowserLeaseForTests,
  type GeminiBrowser,
} from "../../open-sse/executors/gemini-web/browserLease.ts";

function fakeBrowser(): GeminiBrowser {
  return {
    close: async () => undefined,
    newContext: async () => ({}),
    isConnected: () => true,
  };
}

test("#13382 one Chromium launch serves two requests", async () => {
  await resetGeminiBrowserLeaseForTests();
  let launches = 0;
  const browser = fakeBrowser();
  const launch = async () => {
    launches += 1;
    return browser;
  };
  const first = await acquireGeminiBrowser(launch);
  const second = await acquireGeminiBrowser(launch);
  assert.equal(launches, 1);
  assert.equal(first, second);
  await releaseGeminiBrowser(first);
  await releaseGeminiBrowser(second);
  await resetGeminiBrowserLeaseForTests();
});

test("#13382 a replaced launch function does not reuse the previous browser", async () => {
  await resetGeminiBrowserLeaseForTests();
  let launches = 0;
  const launchA = async () => {
    launches += 1;
    return fakeBrowser();
  };
  const launchB = async () => {
    launches += 1;
    return fakeBrowser();
  };
  const first = await acquireGeminiBrowser(launchA);
  await releaseGeminiBrowser(first);
  await acquireGeminiBrowser(launchB);
  assert.equal(launches, 2);
  await resetGeminiBrowserLeaseForTests();
});

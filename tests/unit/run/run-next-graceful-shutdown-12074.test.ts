import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const runNextSource = readFileSync(join(process.cwd(), "scripts/dev/run-next.mjs"), "utf8");

test("the custom Next runner owns exit and awaits application cleanup before closing Next", () => {
  const ownerRegistration = runNextSource.indexOf(
    "globalThis.__omnirouteCustomServerOwnsShutdown = true"
  );
  const prepareCall = runNextSource.indexOf("await prepareWithHeal()");
  assert.ok(ownerRegistration >= 0, "custom server shutdown ownership must be registered");
  assert.ok(
    ownerRegistration < prepareCall,
    "shutdown ownership must exist before instrumentation"
  );

  const serverClose = runNextSource.indexOf("server.close(resolve)");
  const applicationCleanup = runNextSource.indexOf(
    "await globalThis.__omnirouteRequestShutdown?.(signal)"
  );
  const nextClose = runNextSource.indexOf("await nextApp.close()", applicationCleanup);
  const processExit = runNextSource.indexOf("process.exit(0)", nextClose);

  assert.ok(serverClose < applicationCleanup, "stop accepting requests before application cleanup");
  assert.ok(applicationCleanup < nextClose, "application cleanup must finish before Next closes");
  assert.ok(nextClose < processExit, "process exit must remain the final shutdown action");
});

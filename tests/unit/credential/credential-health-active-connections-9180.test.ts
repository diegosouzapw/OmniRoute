import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const schedulerSource = fs.readFileSync(
  new URL("../../../src/lib/credentialHealth/scheduler.ts", import.meta.url),
  "utf8"
);

function getSweepConnectionSelection(): string {
  const start = schedulerSource.indexOf("export async function sweep(): Promise<void>");
  assert.notEqual(start, -1, "credential-health sweep must exist");

  const end = schedulerSource.indexOf(
    "\n    if (connections.length === 0) return;",
    start
  );
  assert.notEqual(end, -1, "credential-health connection-selection block must exist");

  return schedulerSource.slice(start, end);
}

test("#9180 credential-health sweep queries active connections only", () => {
  const selection = getSweepConnectionSelection();

  assert.match(
    selection,
    /getProviderConnections\(\{\s*isActive:\s*true\s*\}\)/,
    "the scheduler must request only active provider connections"
  );

  assert.doesNotMatch(
    selection,
    /getProviderConnections\(\{\s*\}\)/,
    "the scheduler must not load disabled connections through an unfiltered query"
  );
});

test("#9180 active-only selection retains API-key and OAuth scope", () => {
  const selection = getSweepConnectionSelection();

  assert.match(
    selection,
    /conn\.authType === "apikey"/,
    "API-key connections must remain eligible"
  );

  assert.match(
    selection,
    /conn\.authType === "oauth"/,
    "OAuth connections must remain eligible"
  );
});

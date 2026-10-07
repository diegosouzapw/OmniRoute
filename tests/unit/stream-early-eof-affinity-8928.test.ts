import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const chatSource = fs.readFileSync(
  new URL("../../src/sse/handlers/chat.ts", import.meta.url),
  "utf8"
);

function getNonAntigravityStreamFailureBranch(): string {
  // Locate the branch by what it TESTS, not by how it is formatted: #12906 added
  // `|| result.errorCode === "empty_response"` to the same condition and Prettier
  // rewrapped it, which a literal marker could not survive. What must not regress
  // is that a non-Antigravity stream failure still reaches the eviction below.
  const branchRe =
    /if \(\s*\([\s\S]{0,400}?stream_early_eof[\s\S]{0,240}?\)\s*&&\s*!isAntigravityStreamReadinessFailure\s*\)\s*\{/;
  const match = branchRe.exec(chatSource);
  assert.ok(match, "non-Antigravity stream-failure branch must exist");

  const start = match.index;
  const end = chatSource.indexOf("\n      if (isAntigravityStreamReadinessFailure)", start);
  assert.notEqual(end, -1, "stream-failure branch end marker must exist");

  return chatSource.slice(start, end);
}

test("terminal STREAM_EARLY_EOF evicts affinity after the bounded retry (#8928)", () => {
  const branch = getNonAntigravityStreamFailureBranch();

  const retryContinue = branch.indexOf("continue;");
  const eviction = branch.indexOf("evictSessionAccountAffinityForConnection(");
  const terminalReturn = branch.indexOf("return withSelectedConnectionHeader(");

  assert.ok(retryContinue >= 0, "the existing bounded retry must remain");
  assert.ok(eviction > retryContinue, "eviction must happen only after retry is exhausted");
  assert.ok(terminalReturn > eviction, "eviction must happen before the terminal 502 is returned");
});

test("early-EOF eviction recognizes both typed error signals (#8928)", () => {
  const branch = getNonAntigravityStreamFailureBranch();

  assert.match(
    branch,
    /result\.errorCode === "STREAM_EARLY_EOF"/,
    "the canonical STREAM_EARLY_EOF code must trigger eviction"
  );
  assert.match(
    branch,
    /result\.errorType === "stream_early_eof"/,
    "the typed stream_early_eof fallback must trigger eviction"
  );
});

test("early-EOF eviction is session-key and connection guarded (#8928)", () => {
  const branch = getNonAntigravityStreamFailureBranch();

  assert.match(
    branch,
    /isTerminalStreamEarlyEof && runtimeOptions\.sessionAffinityKey/,
    "eviction must run only for terminal early EOF with an affinity key"
  );

  assert.match(
    branch,
    /evictSessionAccountAffinityForConnection\(\s*runtimeOptions\.sessionAffinityKey,\s*provider,\s*credentials\.connectionId\s*\)/s,
    "the connection-matched helper must protect a pin that moved elsewhere"
  );

  assert.doesNotMatch(
    branch,
    /deleteSessionAccountAffinity\(/,
    "the terminal branch must not perform an unguarded affinity deletion"
  );
});

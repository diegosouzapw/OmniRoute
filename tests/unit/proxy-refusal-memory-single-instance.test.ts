/**
 * Two copies of the refusal store share one process-wide state.
 *
 * The server bundle holds several copies of this store (one per module
 * graph): transport failures recorded through one copy were invisible to
 * the readers of another. All mutable state lives on `globalThis` so
 * every copy reads and writes the same store.
 */
import test from "node:test";
import assert from "node:assert/strict";

const copyA = await import("../../open-sse/utils/proxyRefusalMemory.ts?copy=a");
const copyB = await import("../../open-sse/utils/proxyRefusalMemory.ts?copy=b");

const KEY = "http://user@host.example:8080";
const DEST = "target.example";
const OTHER = "http://user@other.example:8080";

function resetBoth(): void {
  copyA.__resetProxyRefusalMemoryForTesting();
  copyB.__resetProxyRefusalMemoryForTesting();
  copyA.__resetTransportEvidenceForTesting();
  copyB.__resetTransportEvidenceForTesting();
  copyA.__resetSlowOverrunsForTesting();
  copyB.__resetSlowOverrunsForTesting();
}

test.beforeEach(() => {
  resetBoth();
});

test.afterEach(() => {
  resetBoth();
});

test("witness: distinct module instances under distinct import URLs", () => {
  assert.notEqual(copyA.noteProxyRefusal, copyB.noteProxyRefusal);
});

test("set-aside written through one copy is visible through the other", () => {
  const now = 1_000_000;
  const periodMs = copyA.noteProxyRefusal(KEY, "transport", now);
  assert.ok(typeof periodMs === "number");
  assert.equal(copyB.isProxyAvoided(KEY, now), true);
});

test("transport cross-evidence recorded through either copy reads from both", () => {
  const now = 2_000_000;
  copyA.recordTransportFailure(KEY, DEST, now);
  copyB.recordTransportFailure(KEY, DEST, now + 1);
  copyA.recordTransportFailure(KEY, DEST, now + 2);
  copyB.recordTransportSuccess(DEST, OTHER, now + 3);
  assert.equal(copyA.hasTransportCrossEvidence(KEY, DEST, now + 4), true);
  assert.equal(copyB.hasTransportCrossEvidence(KEY, DEST, now + 4), true);
});

test("slow-overrun evidence recorded through one copy reads through the other", () => {
  const now = 3_000_000;
  copyA.recordSlowOverrun(KEY, now);
  copyA.recordSlowOverrun(KEY, now + 1);
  copyA.recordSlowOverrun(KEY, now + 2);
  assert.equal(copyB.hasSlowOverrunEvidence(KEY, now + 3), true);
});

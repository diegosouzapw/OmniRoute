// Characterization of the services/usage.ts opencode split (god-file decomposition): the
// OpenCode / OpenCode Zen triple-window fetcher (getOpencodeUsage) moved into
// services/usage/opencode.ts so usage.ts stays a thin dispatcher. Behavior-preserving move —
// this locks the export surface and the no-key fail-open message; the window-shaping edges are
// exercised via fetchOpencodeQuota stubs in opencode-quota-fetcher tests.
import { test } from "node:test";
import assert from "node:assert/strict";

const O = await import("../../open-sse/services/usage/opencode.ts");

test("module exposes getOpencodeUsage", () => {
  assert.equal(typeof O.getOpencodeUsage, "function");
});

test("getOpencodeUsage returns a no-api-key message when the key is missing", async () => {
  const r = (await O.getOpencodeUsage("conn", "")) as { message?: string };
  assert.match(r.message ?? "", /OpenCode API key not available/);
});

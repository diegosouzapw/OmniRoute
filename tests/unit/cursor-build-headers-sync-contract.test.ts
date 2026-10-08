import test from "node:test";
import assert from "node:assert/strict";

// BaseExecutor.buildHeaders is synchronous and base-class paths (e.g. the
// probe in BaseExecutor) use its return value directly. CursorExecutor made it
// async when the CLI client version became refreshable (ef3b71c6), which broke
// the override contract (TS2416) and would hand a Promise to any caller that
// does not await. The version lookup never blocks (cache / pin, scrape runs in
// the background), so the override must stay synchronous.

const { CursorExecutor } = await import("../../open-sse/executors/cursor.ts");
const { getCursorAgentCliVersion, getCursorAgentCliVersionSync } =
  await import("../../open-sse/utils/cursorAgentCliVersion.ts");

test("CursorExecutor.buildHeaders returns a plain header object, not a Promise", () => {
  const headers = new CursorExecutor("cursor").buildHeaders({
    accessToken: "tok-123",
    providerSpecificData: {},
  } as never);
  assert.ok(!(headers instanceof Promise), "buildHeaders must stay synchronous");
  assert.equal(typeof headers, "object");
  assert.match(String((headers as Record<string, string>)["x-cursor-client-version"]), /\S/);
  assert.match(
    String((headers as Record<string, string>)["authorization"] ?? ""),
    /Bearer tok-123/i
  );
});

test("the sync and async client-version lookups agree", async () => {
  assert.equal(getCursorAgentCliVersionSync(), await getCursorAgentCliVersion());
});

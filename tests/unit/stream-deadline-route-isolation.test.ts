import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const ROUTES = [
  "src/app/api/v1/chat/completions/route.ts",
  "src/app/api/v1/responses/route.ts",
  "src/app/api/v1/messages/route.ts",
];

test("slow-stream deadline stays inside the streaming branch", () => {
  for (const relativePath of ROUTES) {
    const source = fs.readFileSync(path.join(process.cwd(), relativePath), "utf8");
    const streamBranch = source.indexOf("if (wantsStreaming)");
    const deadlineCreate = source.indexOf("createStreamDeadlineSignal(");

    assert.ok(streamBranch >= 0, `${relativePath}: missing streaming branch`);
    assert.ok(
      deadlineCreate > streamBranch,
      `${relativePath}: deadline must be created after stream detection`
    );
    assert.equal(
      source.includes("withDeadlineSignal("),
      false,
      `${relativePath}: route must not rebuild the framework Request for the stream deadline`
    );
  }
});

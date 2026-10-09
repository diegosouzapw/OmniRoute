import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import url from "node:url";

const here = path.dirname(url.fileURLToPath(import.meta.url));
const serverPath = path.resolve(here, "../../src/mitm/server.cjs");
const src = fs.readFileSync(serverPath, "utf-8");

test("PR #13920: captureToInspector() must run before the isChatRequest early-return, so non-chat passthroughs (telemetry, gRPC-web service paths, /extensions-control) still reach Traffic Inspector", () => {
  const fnMatch = src.match(/async function startMitmServer\(\)[\s\S]*?\n\}\n/);
  assert.ok(fnMatch, "startMitmServer() must exist in server.cjs");
  const fnBody = fnMatch[0];

  const captureIdx = fnBody.indexOf("captureToInspector({");
  assert.notEqual(
    captureIdx,
    -1,
    "captureToInspector(...) call must exist inside startMitmServer()"
  );

  const chatCheckIdx = fnBody.indexOf("if (!isChatRequest)");
  assert.notEqual(
    chatCheckIdx,
    -1,
    "the isChatRequest early-return check must exist inside startMitmServer()"
  );

  assert.ok(
    captureIdx < chatCheckIdx,
    "captureToInspector(...) must be called BEFORE the `if (!isChatRequest)` early-return " +
      "(issue #8656 / PR #13920) — otherwise non-chat-matched traffic (agent telemetry, " +
      "gRPC-web service paths like aiserver.v1.GrokBotService/*, /extensions-control, etc.) " +
      "exits via passthrough before ever being captured, and silently disappears from the " +
      "Traffic Inspector."
  );
});

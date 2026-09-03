import test, { after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const routeSource = fs.readFileSync("src/app/api/v1/responses/route.ts", "utf8");
const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-responses-route-test-"));
process.env.DATA_DIR = dataDir;
process.env.REQUIRE_API_KEY = "false";
after(() => fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 }));

test("Responses route wires dual-cadence neutral keepalives", () => {
  assert.match(
    routeSource,
    /startupFrame:\s*OPENAI_RESPONSES_IN_PROGRESS_FRAME/,
    "the immediate frame must not create a synthetic reasoning item"
  );
  assert.match(
    routeSource,
    /applicationKeepalive:\s*\{[\s\S]*frame:\s*OPENAI_RESPONSES_IN_PROGRESS_FRAME,[\s\S]*intervalMs:\s*SSE_HEARTBEAT_INTERVAL_MS/,
    "parser-visible events must use the configured mid-stream heartbeat cadence"
  );
  assert.doesNotMatch(
    routeSource,
    /keepaliveFrame:\s*OPENAI_RESPONSES_IN_PROGRESS_FRAME/,
    "frequent transport ticks must not all become application events"
  );
  assert.doesNotMatch(routeSource, /RESPONSES_STARTUP_THINKING_FRAME/);
});

test("Responses route applies heavyweight admission through the SSE lifecycle", () => {
  assert.match(routeSource, /admitChatRequest\(request,/);
  assert.match(routeSource, /admitChatStructure\(parsedBody, admission\.lease,/);
  assert.match(routeSource, /releaseChatAdmissionAfterHandler\(/);
  assert.match(routeSource, /releaseChatAdmissionWhenDone\(/);
});

test("Responses route rejects malformed JSON and releases raw-body admission", async () => {
  const [{ POST }, admission] = await Promise.all([
    import("../../../src/app/api/v1/responses/route.ts"),
    import("../../../src/shared/middleware/chatBodyAdmission.ts"),
  ]);
  const malformed = `{"input":"${"x".repeat(admission.CHAT_LARGE_BODY_BYTES)}`;
  assert.equal(admission.perConnectionAdmissionController.activeHeavy, 0);

  const response = await POST(
    new Request("http://localhost/v1/responses", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "content-length": String(Buffer.byteLength(malformed)),
      },
      body: malformed,
    })
  );

  assert.equal(response.status, 400);
  assert.match(response.headers.get("content-type") || "", /application\/json/);
  const body = await response.text();
  assert.match(body, /invalid_request_error/);
  assert.doesNotMatch(body, /Body is unusable|stack|node:internal/);
  assert.equal(admission.perConnectionAdmissionController.activeHeavy, 0);
});

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// #7847: /v1/chat/completions already threads its parsed body into handleChat, so cloning
// the Request before parsing tees and retains an unused serialized-body branch. These tests
// pin the memory-sensitive contract: consume the original body once without cloning it.
// #7853 moved the single materialization into admitChatRequest()'s bounded byte reader —
// the ORIGINAL request must now see zero json() calls and zero clone() calls; the one
// parse happens on the admission-rebuilt request over the already-buffered bytes.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-chat-parse-once-7847-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const chatRoute = await import("../../src/app/api/v1/chat/completions/route.ts");
const { resolveChatRequestBody } = await import("../../src/sse/handlers/requestBody.ts");

function makeCountingRequest(body: string) {
  const request = new Request("http://localhost/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  });

  let jsonCalls = 0;
  let cloneCalls = 0;
  const originalJson = request.json.bind(request);
  const originalClone = request.clone.bind(request);

  Object.defineProperties(request, {
    json: {
      value: async () => {
        jsonCalls++;
        return originalJson();
      },
    },
    clone: {
      value: () => {
        cloneCalls++;
        return originalClone();
      },
    },
  });

  return {
    request,
    jsonCalls: () => jsonCalls,
    cloneCalls: () => cloneCalls,
  };
}

function validBody(stream: boolean) {
  return JSON.stringify({
    model: "openai/gpt-4.1",
    messages: [{ role: "user", content: "Reply with OK only." }],
    stream,
  });
}

test("#7847 non-streaming requests parse the original body once without cloning", async () => {
  const counting = makeCountingRequest(validBody(false));

  await chatRoute.POST(counting.request);

  assert.equal(
    counting.jsonCalls(),
    0,
    "admission ingests the body via its bounded reader — the original must never be json()-parsed"
  );
  assert.equal(counting.cloneCalls(), 0, "the request body stream must not be teed");
});

test("#7847 streaming requests parse the original body once without cloning", async () => {
  const counting = makeCountingRequest(validBody(true));

  const response = await chatRoute.POST(counting.request);
  await response.text();

  assert.equal(
    counting.jsonCalls(),
    0,
    "admission ingests the body once; keepalive reuses the parsed object, never the original"
  );
  assert.equal(counting.cloneCalls(), 0, "streaming must not retain an unread body branch");
});

test("#7847 malformed JSON still returns 400 after the original body is consumed", async () => {
  const counting = makeCountingRequest('{"model":');

  const response = await chatRoute.POST(counting.request);

  assert.equal(response.status, 400);
  assert.equal(counting.cloneCalls(), 0, "invalid JSON must not require cloning the body stream");
});

test("#7847 downstream body resolution preserves the parsed object's identity", async () => {
  const parsedBody = {
    model: "openai/gpt-4.1",
    messages: [{ role: "user", content: "identity sentinel" }],
  };
  let downstreamJsonCalls = 0;

  const resolved = await resolveChatRequestBody(
    {
      json: async () => {
        downstreamJsonCalls++;
        return { unexpected: true };
      },
    },
    parsedBody
  );

  assert.equal(resolved, parsedBody, "downstream must reuse the exact parsed object");
  assert.equal(downstreamJsonCalls, 0, "downstream must not parse or materialize another body");
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

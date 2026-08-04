import test from "node:test";
import assert from "node:assert/strict";

import { getKieCallbackUrl, getKieTaskId } from "../../open-sse/utils/kieTask.ts";

// getKieTaskId replaces the expression `createData?.data?.taskId || createData?.taskId`
// that image/video/music generation each duplicated. Every arm below is one the three
// handlers could hit, since `createTask()` returns whatever the KIE upstream sent.

test("getKieTaskId reads the nested data.taskId first", () => {
  assert.equal(getKieTaskId({ data: { taskId: "abc123" } }), "abc123");
});

test("getKieTaskId falls back to a top-level taskId", () => {
  assert.equal(getKieTaskId({ taskId: "top-level" }), "top-level");
});

test("getKieTaskId prefers the nested id when both are present", () => {
  assert.equal(getKieTaskId({ taskId: "top", data: { taskId: "nested" } }), "nested");
});

test("getKieTaskId coerces a non-string id, as the pollTask callers did with String()", () => {
  assert.equal(getKieTaskId({ data: { taskId: 42 } }), "42");
});

test("getKieTaskId ignores a non-object data envelope and still checks the top level", () => {
  // KIE has returned `data` as a string, an array and null on error responses.
  assert.equal(getKieTaskId({ data: "not-an-object", taskId: "fallback" }), "fallback");
  assert.equal(getKieTaskId({ data: ["nope"], taskId: "fallback" }), "fallback");
  assert.equal(getKieTaskId({ data: null, taskId: "fallback" }), "fallback");
  assert.equal(getKieTaskId({ data: "not-an-object" }), null);
});

test("getKieTaskId returns null when no id is present, keeping the handlers' 502 branch", () => {
  assert.equal(getKieTaskId({}), null);
  assert.equal(getKieTaskId({ data: {} }), null);
  assert.equal(getKieTaskId({ msg: "createTask failed" }), null);
});

test("getKieTaskId treats falsy ids as absent, matching the previous `!taskId` guard", () => {
  assert.equal(getKieTaskId({ data: { taskId: "" } }), null);
  assert.equal(getKieTaskId({ data: { taskId: 0 } }), null);
});

test("getKieTaskId tolerates a non-object response", () => {
  assert.equal(getKieTaskId(null), null);
  assert.equal(getKieTaskId(undefined), null);
  assert.equal(getKieTaskId("boom"), null);
});

test("getKieCallbackUrl accepts all three casings the handlers forward", () => {
  assert.equal(getKieCallbackUrl({ callBackUrl: "https://a.test/cb" }), "https://a.test/cb");
  assert.equal(getKieCallbackUrl({ callback_url: "https://b.test/cb" }), "https://b.test/cb");
  assert.equal(getKieCallbackUrl({ callbackUrl: "https://c.test/cb" }), "https://c.test/cb");
});

test("getKieCallbackUrl falls back for blank, absent and non-object bodies", () => {
  const previous = process.env.KIE_CALLBACK_URL;
  process.env.KIE_CALLBACK_URL = "https://configured.test/api/kie/callback";
  try {
    const configured = "https://configured.test/api/kie/callback";
    assert.equal(getKieCallbackUrl({ callBackUrl: "   " }), configured);
    assert.equal(getKieCallbackUrl({}), configured);
    assert.equal(getKieCallbackUrl(), configured);
    // The music handler passes an untyped request body straight through.
    assert.equal(getKieCallbackUrl({ prompt: "a song" }), configured);
    assert.equal(getKieCallbackUrl(null), configured);
    assert.equal(getKieCallbackUrl("not-an-object"), configured);
  } finally {
    if (previous === undefined) delete process.env.KIE_CALLBACK_URL;
    else process.env.KIE_CALLBACK_URL = previous;
  }
});

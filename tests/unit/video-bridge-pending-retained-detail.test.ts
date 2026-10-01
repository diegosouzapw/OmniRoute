import assert from "node:assert/strict";
import test from "node:test";

import { createPreparedRequestLogger } from "../../open-sse/utils/providerRequestLogging.ts";
import {
  clearCompletedDetails,
  getCompletedDetails,
} from "../../src/lib/usage/completedRequestDetails.ts";
import {
  finalizePendingScope,
  initialPendingBody,
  updatePendingScope,
} from "../../src/lib/usage/pendingRequestScope.ts";
import {
  clearPendingRequests,
  getPendingById,
  trackPendingRequest,
} from "../../src/lib/usage/usageHistory.ts";

const SECRET = "video-pending-private-sentinel";

test.afterEach(() => {
  clearPendingRequests();
  clearCompletedDetails();
});

test("initial provider preview omits observed video without changing the live body", () => {
  const liveBody = { messages: [{ content: SECRET }] };
  const retained = initialPendingBody(liveBody, "video-model", true);
  assert.equal(JSON.stringify(retained).includes(SECRET), false);
  assert.equal(liveBody.messages[0].content, SECRET);
  assert.deepEqual(initialPendingBody(liveBody, "video-model", false), {
    ...liveBody,
    model: "video-model",
  });
});

test("observed video omits provider and response payloads from pending and completed details", () => {
  const id = trackPendingRequest("video-model", "provider", "conn-video", true);
  assert.ok(id);
  const scope = {
    id,
    model: "video-model",
    provider: "provider",
    connectionId: "conn-video",
    videoTranscriptSensitive: true,
  };

  updatePendingScope(scope, {
    providerRequest: { messages: [{ content: SECRET }] },
    providerResponse: { output: SECRET },
    clientResponse: { output: SECRET },
    providerUrl: `https://example.com/${SECRET}`,
    error: SECRET,
    errorCode: SECRET,
    status: 502,
    stage: "provider_response_started",
  });

  const pending = getPendingById().get(id);
  assert.ok(pending);
  assert.equal(JSON.stringify(pending).includes(SECRET), false);
  assert.equal(pending.status, 502);

  finalizePendingScope(scope, {
    providerResponse: { output: SECRET },
    clientResponse: { output: SECRET },
    error: SECRET,
    status: 502,
  });
  const completed = getCompletedDetails().get(id);
  assert.ok(completed);
  assert.equal(JSON.stringify(completed).includes(SECRET), false);
  assert.equal(completed.status, 502);
});

test("prepared provider request keeps live body while pending detail omits observed video", () => {
  const id = trackPendingRequest("video-model", "provider", "conn-capture", true);
  assert.ok(id);
  const scope = {
    id,
    model: "video-model",
    provider: "provider",
    connectionId: "conn-capture",
    videoTranscriptSensitive: true,
  };
  const capture = createPreparedRequestLogger({ logTargetRequest() {} }, scope);
  const liveBody = { messages: [{ content: SECRET }] };
  capture.capture({
    url: "https://example.com/v1/chat/completions",
    headers: {},
    body: liveBody,
    bodyString: JSON.stringify(liveBody),
  });

  assert.equal(capture.body(null), liveBody, "provider dispatch must keep the original body");
  const pending = getPendingById().get(id);
  assert.ok(pending);
  assert.equal(JSON.stringify(pending).includes(SECRET), false);
});

test("sensitive completion keeps omission markers when no response preview was supplied", () => {
  const id = trackPendingRequest("video-model", "provider", "conn-no-response", true);
  assert.ok(id);
  const scope = {
    id,
    model: "video-model",
    provider: "provider",
    connectionId: "conn-no-response",
    videoTranscriptSensitive: true,
  };
  finalizePendingScope(scope, { status: 204 });
  const completed = getCompletedDetails().get(id);
  assert.ok(completed);
  assert.deepEqual(completed.providerResponse, { _omniroute_omitted: "video-transcript" });
  assert.deepEqual(completed.clientResponse, { _omniroute_omitted: "video-transcript" });
});

test("ordinary non-video pending details retain their existing payloads", () => {
  const id = trackPendingRequest("plain-model", "provider", "conn-plain", true);
  assert.ok(id);
  const scope = { id, model: "plain-model", provider: "provider", connectionId: "conn-plain" };
  updatePendingScope(scope, { providerRequest: { messages: [{ content: SECRET }] } });
  assert.equal(JSON.stringify(getPendingById().get(id)).includes(SECRET), true);
});

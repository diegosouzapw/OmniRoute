import test from "node:test";
import assert from "node:assert/strict";

import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

// Regression guard: the OmniRoute-native previous_response_id virtualization
// in chat.ts (see src/lib/db/responsesContinuationStore.ts) used to run
// unconditionally for every OpenAI-Responses-source request, before target
// selection and before applyResponsesPreviousResponseIdPolicy (chatCore.ts)
// ever got a chance to enforce responsesPreviousResponseIdMode. That made
// mode="preserve" -- the explicit, connection-independent contract for "let
// the upstream resolve previous_response_id natively" -- a no-op: the field
// was already deleted and replaced with a reconstructed `input` before the
// policy ever ran, hard-rejecting any previous_response_id that OmniRoute's
// own call-log store never captured, instead of forwarding it upstream like
// a real Codex/ChatGPT-store-enabled connection expects.

const harness = await createChatPipelineHarness("chat-prev-resp-id-preserve");
const { buildRequest, handleChat, resetStorage, settingsDb } = harness;

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  await harness.cleanup();
});

async function postResponses(
  previousResponseId: string,
  model = "nonexistent-provider/nonexistent-model"
) {
  const response = await handleChat(
    buildRequest({
      url: "http://localhost/v1/responses",
      body: {
        model,
        stream: false,
        previous_response_id: previousResponseId,
        input: [{ type: "message", role: "user", content: "continue" }],
      },
    })
  );
  const payload = (await response.json()) as { error?: { code?: string; message?: string } };
  return { status: response.status, payload };
}

test("mode=auto (default): unknown previous_response_id is virtualized and fails closed with previous_response_not_found", async () => {
  const { status, payload } = await postResponses("resp_never_seen_by_omniroute");
  assert.equal(status, 400);
  assert.equal(payload.error?.code, "previous_response_not_found");
});

test("mode=auto: ChatGPT Web Codex defers previous_response_id resolution to its executor", async () => {
  const { status, payload } = await postResponses(
    "resp_owned_by_chatgpt_web_codex",
    "chatgpt-web-codex/instant"
  );

  assert.notEqual(payload.error?.code, "previous_response_not_found");
  assert.ok(
    status === 401 || status === 404,
    `expected provider routing after deferring continuation resolution, got ${status}`
  );
});

test("mode=preserve: previous_response_id is left untouched, request proceeds to normal routing instead of local virtualization", async () => {
  await settingsDb.updateSettings({ responsesPreviousResponseIdMode: "preserve" });

  const { status, payload } = await postResponses("resp_never_seen_by_omniroute");

  // Virtualization is skipped entirely: the id is not looked up against
  // OmniRoute's own store, so this must NOT be the virtualization's
  // previous_response_not_found rejection. It falls through to ordinary
  // model routing, which 404s for an unknown model or 401 if that path
  // now authenticates before catalog lookup.
  assert.notEqual(payload.error?.code, "previous_response_not_found");
  assert.ok(
    status === 404 || status === 401,
    `expected routing 404/401 after skipping virtualization, got ${status}`
  );
});

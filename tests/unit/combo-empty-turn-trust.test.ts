/** The combo uses internal execution identity, never provider/client headers. */
import test from "node:test";
import assert from "node:assert/strict";
import { isTrustedEmptyTurn } from "../../open-sse/services/combo/emptyTurnTrust.ts";
import {
  markEmptyTurnExecution,
  inheritEmptyTurnPolicy,
} from "../../open-sse/utils/emptyTurnPolicy.ts";

const credentials = { connectionId: "selected", apiKey: "synthetic-key" };
const claude =
  'data: {"type":"message_delta","delta":{"stop_reason":"end_turn"}}\n\ndata: {"type":"message_stop"}\n\n';
const openai = 'data: {"choices":[{"delta":{},"finish_reason":"stop"}]}\n\ndata: [DONE]\n\n';
function executed(
  url = "https://api.anthropic.com/v1/messages",
  payload = claude,
  creds = credentials
) {
  return markEmptyTurnExecution(
    new Response(payload, { headers: { "content-type": "text/event-stream" } }),
    url,
    creds
  );
}
async function allowed(response: Response) {
  const permission = await isTrustedEmptyTurn(null, response);
  await response.text();
  return permission();
}

test("origin alone is not terminal proof; permission observes the native bytes later", async () => {
  const response = executed();
  const permission = await isTrustedEmptyTurn("anthropic", response);
  assert.equal(permission(), false);
  await response.text();
  assert.equal(permission(), true);
});
test("a rebuilt response inherits the actual attempt, including unresolved aliases", async () => {
  const response = executed();
  const rebuilt = inheritEmptyTurnPolicy(response, new Response(response.body));
  assert.equal(await allowed(rebuilt), true);
});
test("a planned/provider header alone cannot grant permission", async () => {
  const response = new Response(claude, {
    headers: { "X-OmniRoute-Selected-Connection-Id": "selected" },
  });
  const permission = await isTrustedEmptyTurn("anthropic", response, "selected");
  await response.text();
  assert.equal(permission(), false);
});
test("a custom endpoint does not inherit the official Anthropic policy", async () => {
  assert.equal(await allowed(executed("https://gateway.example.com/v1/messages")), false);
});
test("missing selected credentials cannot grant permission", async () => {
  assert.equal(
    await allowed(executed(undefined, undefined, { connectionId: "", apiKey: "synthetic-key" })),
    false
  );
});
test("OpenAI ordinary stop is trusted only on the executed native endpoint", async () => {
  assert.equal(await allowed(executed("https://api.openai.com/v1/chat/completions", openai)), true);
  assert.equal(
    await allowed(executed("https://unknown.example/v1/chat/completions", openai)),
    false
  );
});
test("a native error takes priority over a normal stop", async () => {
  assert.equal(
    await allowed(
      executed(undefined, claude + 'data: {"type":"error","error":{"type":"overloaded_error"}}\n\n')
    ),
    false
  );
});
test("native EOF and DONE alone never establish normal termination", async () => {
  assert.equal(await allowed(executed(undefined, 'data: {"type":"message_start"}\n\n')), false);
  assert.equal(
    await allowed(executed("https://api.openai.com/v1/chat/completions", "data: [DONE]\n\n")),
    false
  );
});
test("Azure hostname, protocol and URL credentials are checked exactly", async () => {
  const complete =
    'data: {"type":"response.completed","response":{"status":"completed","output":[]}}\n\n';
  for (const url of [
    "http://fixture.openai.azure.com/openai/v1/responses",
    "https://fixture.openai.azure.com.attacker.invalid/openai/v1/responses",
    "https://user:secret@fixture.openai.azure.com/openai/v1/responses",
    "https://fixture.openai.azure.com:444/openai/v1/responses",
  ]) {
    assert.equal(await allowed(executed(url, complete)), false);
  }
});
test("reasoning/tool partial JSON cannot acquire terminal proof from its origin", async () => {
  for (const message of [
    { reasoning_content: "partial" },
    { tool_calls: [{ id: "partial", function: { name: "f", arguments: "{" } }] },
  ]) {
    const response = markEmptyTurnExecution(
      Response.json({ choices: [{ message, finish_reason: null }] }),
      "https://api.openai.com/v1/chat/completions",
      credentials
    );
    assert.equal(await allowed(response), false);
  }
});

import assert from "node:assert/strict";
import test from "node:test";
import {
  clientSuppliedOpencodeSession,
  forwardOpencodeClientHeaders,
} from "../../open-sse/utils/opencodeHeaders.ts";
import { OpencodeExecutor } from "../../open-sse/executors/opencode.ts";

const defaults = { userAgent: "opencode/1.18.31", client: "desktop", project: "global" };
const body = { model: "big-pickle", messages: [{ role: "user", content: "same prompt" }] };

function session(headers: Record<string, string>) {
  const output: Record<string, string> = {};
  forwardOpencodeClientHeaders(output, headers, {
    synthesizeRequestId: true,
    cliDefaults: defaults,
    sessionBody: body,
  });
  return output["x-opencode-session"];
}

for (const header of ["session_id", "thread_id", "x-claude-code-session-id"]) {
  test(`${header} separates conversations with identical prompts`, () => {
    assert.notEqual(
      session({ [header]: "conversation-a" }),
      session({ [header]: "conversation-b" })
    );
    assert.equal(session({ [header]: "conversation-a" }), session({ [header]: "conversation-a" }));
    assert.equal(clientSuppliedOpencodeSession({ [header]: "conversation-a" }), "conversation-a");
  });
}

test("explicit OpenCode session wins over native aliases", () => {
  assert.equal(
    session({ "x-opencode-session": "explicit", thread_id: "other" }),
    session({ "x-opencode-session": "explicit" })
  );
});

test("executor carries Claude metadata identity to upstream and tool cache", () => {
  const executor = new OpencodeExecutor("opencode-go");
  const build = (id: string) =>
    executor.buildHeaders(
      null,
      true,
      null,
      body.model,
      {},
      {
        ...body,
        metadata: { user_id: JSON.stringify({ session_id: id }) },
      }
    );
  assert.notEqual(
    build("conversation-a")["x-opencode-session"],
    build("conversation-b")["x-opencode-session"]
  );
  assert.equal(executor._clientSession, "conversation-b");
});

test("native aliases never add OpenCode headers to a generic forwarding call", () => {
  const output: Record<string, string> = {};
  forwardOpencodeClientHeaders(output, { thread_id: "conversation-a" });
  assert.equal(output["x-opencode-session"], undefined);
});

test("untrusted native IDs reject controls and excessive length", () => {
  for (const id of ["bad\nheader", "bad\u0000header", "x".repeat(257)]) {
    assert.equal(clientSuppliedOpencodeSession({ thread_id: id }), undefined);
  }
});

test("native fallback preserves raw identity and an existing request when CLI synthesis is off", () => {
  const output: Record<string, string> = {};
  forwardOpencodeClientHeaders(
    output,
    { thread_id: "native-conversation", "x-opencode-request": "existing-request" },
    { synthesizeRequestId: true }
  );
  assert.equal(output["x-opencode-session"], "native-conversation");
  assert.equal(output["x-opencode-request"], "existing-request");
});

test("an existing outbound session bypasses fallback request synthesis", () => {
  const output = { "x-opencode-session": "existing-session" } as Record<string, string>;
  forwardOpencodeClientHeaders(
    output,
    { thread_id: "native-conversation" },
    {
      synthesizeRequestId: true,
    }
  );
  assert.deepEqual(output, { "x-opencode-session": "existing-session" });
});

test("invalid body identity does not synthesize a request without CLI defaults", () => {
  const output: Record<string, string> = {};
  forwardOpencodeClientHeaders(
    output,
    {},
    {
      synthesizeRequestId: true,
      sessionBody: { metadata: { session_id: "bad\nidentity" } },
    }
  );
  assert.deepEqual(output, {});
});

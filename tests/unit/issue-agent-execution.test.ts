import test from "node:test";
import assert from "node:assert/strict";

import {
  executeRecordedTriageChatCompletion,
  RecordedTriageTimeoutError,
} from "../../src/lib/issueAgent/execution.ts";
import { createRecordedTriageRun } from "../../src/lib/issueAgent/recordedTriage.ts";

test("recorded triage invokes the normal chat-completions seam with configured routing", async () => {
  const run = createRecordedTriageRun({
    issueUrl: "https://github.com/KooshaPari/OmniRoute/issues/5980",
    recordedContext: {
      title: "Execute issue-agent runs through OmniRoute routing",
      body: "Use the configured provider and model.",
    },
  });
  let received: Request | undefined;

  const response = await executeRecordedTriageChatCompletion(
    {
      run,
      model: "gpt-4.1-mini",
      provider: "openai",
      routingPolicy: "quality",
      timeoutMs: 5_000,
    },
    async (request) => {
      received = request;
      return new Response(JSON.stringify({ id: "chatcmpl-issue-agent" }), {
        headers: { "Content-Type": "application/json" },
      });
    }
  );

  assert.equal(received?.url, "http://localhost/api/v1/chat/completions");
  assert.equal(received?.method, "POST");
  assert.equal(received?.headers.get("X-OmniRoute-Mode"), "quality");
  assert.ok(received?.signal, "the chat request must carry the timeout AbortSignal");

  const body = (await received!.json()) as Record<string, unknown>;
  assert.equal(body.model, "openai/gpt-4.1-mini");
  assert.equal(body.stream, false);
  assert.equal(body.temperature, 0);
  assert.equal(body.max_tokens, 1200);
  assert.equal(response.status, 200);
  assert.deepEqual(response.body, { id: "chatcmpl-issue-agent" });
  assert.match(JSON.stringify(body.messages), /#5980/);
});

test("recorded triage reports an aborted chat invocation as a timeout", async () => {
  const run = createRecordedTriageRun({
    issueUrl: "https://github.com/KooshaPari/OmniRoute/issues/5980",
  });

  await assert.rejects(
    () =>
      executeRecordedTriageChatCompletion({ run, timeoutMs: 1 }, async (request) => {
        await new Promise<void>((_resolve, reject) => {
          request.signal.addEventListener("abort", () => {
            reject(Object.assign(new Error("aborted"), { name: "AbortError" }));
          });
        });
        return new Response();
      }),
    (error: unknown) =>
      error instanceof RecordedTriageTimeoutError &&
      error.message === "Issue Agent triage timed out after 1ms"
  );
});

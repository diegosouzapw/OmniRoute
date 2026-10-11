import test from "node:test";
import assert from "node:assert/strict";

import { KiroExecutor } from "../../open-sse/executors/kiro.ts";

// #15621 — amazon-q / kiro with authMethod "builder-id" (no profileArn): the branded
// runtime.us-east-1.kiro.dev gateway answers 400 {"message":"Improperly formed request.",
// "reason":"REQUEST_BODY_INVALID"} (path-style GenerateAssistantResponse is deprecated there),
// and the executor must still reach the CodeWhisperer host that serves Builder ID accounts.

function gatewayRejection() {
  return new Response(
    JSON.stringify({ message: "Improperly formed request.", reason: "REQUEST_BODY_INVALID" }),
    { status: 400, headers: { "Content-Type": "application/json" } }
  );
}

for (const providerId of ["kiro", "amazon-q"]) {
  test(`${providerId} builder-id reaches CodeWhisperer when the branded gateway 400s "Improperly formed request"`, async () => {
    const executor = new KiroExecutor(providerId);
    const originalFetch = globalThis.fetch;
    const calledUrls: string[] = [];
    executor.transformEventStreamToSSE = () =>
      new Response("data: [DONE]\n\n", {
        status: 200,
        headers: { "Content-Type": "text/event-stream" },
      });
    globalThis.fetch = (async (url: string) => {
      calledUrls.push(String(url));
      if (String(url).includes("runtime.us-east-1.kiro.dev")) return gatewayRejection();
      return new Response("ok", { status: 200 });
    }) as typeof fetch;
    try {
      const result = await executor.execute({
        model: "claude-sonnet-4.5",
        body: { conversationState: {} },
        stream: true,
        credentials: {
          accessToken: "tok",
          providerSpecificData: { authMethod: "builder-id", region: "us-east-1" },
        },
      } as never);
      assert.ok(
        calledUrls.some((u) => /codewhisperer\.us-east-1\.amazonaws\.com/.test(u)),
        `CodeWhisperer host never tried; calls=${JSON.stringify(calledUrls)}`
      );
      assert.equal(result.response.status, 200);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });
}

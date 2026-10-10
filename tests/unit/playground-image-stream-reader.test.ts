import test from "node:test";
import assert from "node:assert/strict";

import {
  PLAYGROUND_IMAGE_RESULT_EVENT,
  restorePlaygroundImageResponse,
} from "../../src/shared/utils/playgroundImageStream.ts";

function streamResponse(chunks: string[], onCancel?: () => void): Response {
  const encoder = new TextEncoder();
  let index = 0;
  return new Response(
    new ReadableStream<Uint8Array>({
      pull(controller) {
        if (index < chunks.length) controller.enqueue(encoder.encode(chunks[index++]));
        else controller.close();
      },
      cancel() {
        onCancel?.();
      },
    }),
    { headers: { "content-type": "text/event-stream; charset=utf-8" } }
  );
}

test("Playground image reader leaves ordinary JSON responses unchanged", async () => {
  const response = new Response('{"data":[]}', {
    status: 200,
    headers: { "content-type": "application/json" },
  });

  assert.equal(await restorePlaygroundImageResponse(response), response);
});

test("Playground image reader restores a fragmented terminal response", async () => {
  const body = JSON.stringify({
    error: { message: "provider rejected the image", type: "provider_error" },
  });
  const data = JSON.stringify({
    status: 422,
    body,
    headers: { "content-type": "application/json" },
  });
  const response = streamResponse([
    ": keepalive\n\n",
    "event: playground.image.",
    `result\ndata: ${data.slice(0, 19)}`,
    `${data.slice(19)}\n`,
    "\n",
  ]);

  const restored = await restorePlaygroundImageResponse(response);
  assert.equal(restored.status, 422);
  assert.equal(restored.headers.get("content-type"), "application/json");
  assert.equal(await restored.text(), body);
});

test("Playground image reader rejects EOF without a terminal result", async () => {
  const response = streamResponse([": keepalive\n\n", "event: heartbeat\ndata: {}\n\n"]);

  await assert.rejects(
    restorePlaygroundImageResponse(response),
    /ended before playground\.image\.result/
  );
});

test("Playground image reader rejects an invalid terminal status", async () => {
  const response = streamResponse([
    `event: ${PLAYGROUND_IMAGE_RESULT_EVENT}\ndata: ${JSON.stringify({ status: 199, body: "" })}\n\n`,
  ]);

  await assert.rejects(restorePlaygroundImageResponse(response), /invalid result/);
});

test("aborting the Playground image reader cancels its response body", async () => {
  let cancelled = false;
  const response = new Response(
    new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(new TextEncoder().encode(": keepalive\n\n"));
      },
      cancel() {
        cancelled = true;
      },
    }),
    { headers: { "content-type": "text/event-stream" } }
  );
  const controller = new AbortController();
  const pending = restorePlaygroundImageResponse(response, controller.signal);
  controller.abort();

  await assert.rejects(pending, (error: unknown) => {
    assert.equal((error as { name?: unknown }).name, "AbortError");
    return true;
  });
  assert.equal(cancelled, true);
});

test("Playground image reader cancels unread stream tail after the terminal frame", async () => {
  let cancelled = false;
  const payload = JSON.stringify({ status: 200, body: '{"data":[]}' });
  const response = new Response(
    new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(
          new TextEncoder().encode(`event: ${PLAYGROUND_IMAGE_RESULT_EVENT}\ndata: ${payload}\n\n`)
        );
      },
      cancel() {
        cancelled = true;
      },
    }),
    { headers: { "content-type": "text/event-stream" } }
  );

  const restored = await restorePlaygroundImageResponse(response);
  assert.equal(restored.status, 200);
  assert.equal(cancelled, true);
});

test("Playground image reader restores an empty bodyless response", async () => {
  const payload = JSON.stringify({ status: 204, body: "" });
  const response = streamResponse([
    `event: ${PLAYGROUND_IMAGE_RESULT_EVENT}\ndata: ${payload}\n\n`,
  ]);

  const restored = await restorePlaygroundImageResponse(response);
  assert.equal(restored.status, 204);
  assert.equal(await restored.text(), "");
});

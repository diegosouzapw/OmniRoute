import test from "node:test";
import assert from "node:assert/strict";

const API_KEY = process.env.OMNIROUTE_API_KEY;
const BASE_URL = process.env.OMNIROUTE_URL || "http://localhost:20128";
const MODEL = "default";

const skip = !API_KEY ? "OMNIROUTE_API_KEY not set — skipping live test" : undefined;

// Simple SSE reader (compatible with streamed chat completions)
async function readSSEStream(response: Response, onChunk?: (chunk: string) => void) {
  const reader = response.body!.getReader();
  const decoder = new TextDecoder();

  let buffer = "";
  let fullContent = "";
  let finishReason = "unknown";
  let totalTokens = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() || "";
    for (const line of lines) {
      if (!line.startsWith("data: ")) continue;
      const data = line.slice(6).trim();
      if (data === "[DONE]") continue;
      try {
        const parsed = JSON.parse(data) as Record<string, unknown>;
        const choice = ((parsed?.choices ?? []) as Array<Record<string, unknown>>)[0];
        if (choice) {
          const delta = choice.delta as Record<string, unknown> | undefined;
          if (delta?.content) {
            let chunk = delta.content as string;
            fullContent += chunk;
            onChunk?.(chunk);
          }
          if (choice.finish_reason) finishReason = choice.finish_reason as string;
        }
        const usage = parsed.usage as Record<string, number> | undefined;
        if (usage) {
          totalTokens =
            usage.total_tokens ?? (usage.prompt_tokens ?? 0) + (usage.completion_tokens ?? 0);
        }
      } catch {
        // ignore malformed
      }
    }
  }

  return { fullContent, finishReason, totalTokens };
}

test("live request returns streamChunks", { skip }, async () => {
  console.log(
    "[TEST] BASE_URL=",
    BASE_URL,
    "OMNIROUTE_URL=",
    process.env.OMNIROUTE_URL,
    "API_KEY set=",
    !!API_KEY
  );

  const messages = [
    { role: "system", content: "Execute the user prompt and provide a detailed explanation." },
    { role: "user", content: "Ackermann(4,3) step by step" },
  ];

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 60_000);

  try {
    const completionsResponse = await fetch(`${BASE_URL}/v1/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({ model: MODEL, messages, stream: true, max_tokens: 512 }),
      signal: controller.signal,
    });

    assert.equal(
      completionsResponse.status,
      200,
      `expected 200 from chat/completions, got ${completionsResponse.status}`
    );

    const requestId = completionsResponse.headers.get("x-omniroute-request-id");
    assert.ok(requestId, "expected x-omniroute-request-id header in response");

    let streamFinished = false;

    let streamPromise = readSSEStream(completionsResponse).finally(() => {
      streamFinished = true;
    });

    const postPollStart = Date.now();
    const postPollTimeout = 60_000;

    let sawLogChunksWhileStreaming = false;

    while (Date.now() - postPollStart < postPollTimeout) {
      try {
        const activeRequestResponse = await fetch(
          `${BASE_URL}/api/logs/${encodeURIComponent(requestId!)}`,
          {
            headers: { Authorization: `Bearer ${API_KEY}` },
            cache: "no-store",
          }
        );
        if (activeRequestResponse.ok) {
          let activeRequest = await activeRequestResponse.json();
          if (
            activeRequest.active &&
            Array.isArray(activeRequest.pipelinePayloads.streamChunks.provider) &&
            activeRequest.pipelinePayloads.streamChunks.provider.length > 0
          ) {
            console.log("Stream chunks:", activeRequest.pipelinePayloads.streamChunks.provider);
            sawLogChunksWhileStreaming = true;
            break;
          }
        }
      } catch (e) {
        // ignore
      }

      if (streamFinished) {
        break;
      }

      await new Promise((r) => setTimeout(r, 250));
    }

    assert.ok(sawLogChunksWhileStreaming, "streamChunks never appeared while request was active");

    await streamPromise;
    const logDetailResponse = await fetch(
      `${BASE_URL}/api/logs/${encodeURIComponent(requestId!)}`,
      {
        headers: { Authorization: `Bearer ${API_KEY}` },
        cache: "no-store",
      }
    );
    assert.ok(logDetailResponse.ok, `failed to fetch log detail: ${logDetailResponse.status}`);
    let finishedRequest = await logDetailResponse.json();

    assert.equal(finishedRequest.id, requestId, "log detail id should match request id");
    assert.equal(
      finishedRequest.active,
      false,
      "request should be marked as inactive after completion"
    );

    assert.ok(Array.isArray(finishedRequest.pipelinePayloads.streamChunks.provider));
    assert.ok(Array.isArray(finishedRequest.pipelinePayloads.streamChunks.client));

    assert.ok(finishedRequest.pipelinePayloads.streamChunks.provider.length > 0);
    assert.ok(finishedRequest.pipelinePayloads.streamChunks.client.length > 0);
  } finally {
    clearTimeout(timeout);
  }
});

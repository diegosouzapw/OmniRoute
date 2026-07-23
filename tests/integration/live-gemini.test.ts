import test from "node:test";
import assert from "node:assert/strict";

import { ensureTestEnvironment, MODEL, BASE_URL, API_KEY } from "./liveGeminiShared.ts";

const DIRECT_MODEL = process.env.TEST_GEMINI_DIRECT_MODEL || "gemini/gemini-2.0-flash";

const skip = !API_KEY ? "OMNIROUTE_API_KEY not set — skipping live test" : undefined;

test.before(async () => {
  await ensureTestEnvironment();
});

async function readSSEStream(response: Response): Promise<{
  fullContent: string;
  finishReason: string;
  model: string;
  totalTokens: number;
}> {
  const reader = response.body!.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let fullContent = "";
  let finishReason = "unknown";
  let model = "";
  let totalTokens = 0;
  let chunkCount = 0;
  let sampleLines: string[] = [];

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() || "";

    for (const line of lines) {
      if (!line.startsWith("data: ")) continue;
      chunkCount++;
      const data = line.slice(6).trim();
      if (data === "[DONE]") continue;

      try {
        const parsed = JSON.parse(data) as Record<string, unknown>;
        const choice = ((parsed.choices ?? []) as Array<Record<string, unknown>>)[0];
        if (choice) {
          const delta = choice.delta as Record<string, unknown> | undefined;
          if (delta?.content) {
            fullContent += delta.content as string;
          } else if (delta?.reasoning_content) {
            fullContent += delta.reasoning_content as string;
          }
          if (choice.finish_reason) finishReason = choice.finish_reason as string;
        }
        if (!model) {
          if (parsed.model) {
            model = parsed.model as string;
          } else if (choice?.model) {
            model = choice.model as string;
          }
        }
        const usage = parsed.usage as Record<string, number> | undefined;
        if (usage) {
          totalTokens =
            usage.total_tokens ?? (usage.prompt_tokens ?? 0) + (usage.completion_tokens ?? 0);
        }
      } catch {
        // skip malformed chunks
      }

      if (sampleLines.length < 3) {
        sampleLines.push(data.slice(0, 200));
      }
    }
  }

  console.log(
    `[SSE] total raw chunks: ${chunkCount}, content length: ${fullContent.length}, finish: ${finishReason}, model: ${model}, tokens: ${totalTokens}`
  );
  if (sampleLines.length > 0) {
    console.log(`[SSE] sample lines: ${JSON.stringify(sampleLines)}`);
  }

  return { fullContent, finishReason, model, totalTokens };
}

test("live Gemini — single hello-world request via combo 'default'", { skip }, async (t) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 120_000);

  try {
    console.log(`[TEST] Sending request with model=${MODEL} to ${BASE_URL}/v1/chat/completions`);
    const response = await fetch(`${BASE_URL}/v1/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [{ role: "user", content: "Say 'Hello world' and nothing else." }],
        stream: true,
        max_tokens: 50,
        temperature: 0,
      }),
      signal: controller.signal,
    });
    clearTimeout(timeout);

    console.log(`[TEST] Response status: ${response.status}`);
    if (!response.ok) {
      const body = await response.text().catch(() => "unknown");
      console.log(`[TEST] Response body: ${body}`);
    }

    assert.equal(response.status, 200, "Expected HTTP 200 from combo request");

    const { fullContent, finishReason, model, totalTokens } = await readSSEStream(response);

    assert.ok(fullContent.length > 0, "response should have content");
    assert.ok(
      finishReason === "stop" || finishReason === "length",
      `expected stop/length finish, got ${finishReason}`
    );
    assert.ok(totalTokens > 0, `should have non-zero token count, got ${totalTokens}`);
    assert.ok(
      model.toLowerCase().includes("gemini") || model.toLowerCase().includes("gemma"),
      `response model "${model}" should be a Gemini/Gemma model`
    );
    console.log(
      `[TEST] OK: model=${model}, finish=${finishReason}, tokens=${totalTokens}, content=${fullContent.length} chars`
    );
  } catch (err) {
    clearTimeout(timeout);
    throw err;
  }
});

test("live Gemini — direct model request (skip combo)", { skip }, async (t) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 120_000);

  try {
    console.log(`[TEST] Direct model request with model=${DIRECT_MODEL}`);
    const response = await fetch(`${BASE_URL}/v1/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: DIRECT_MODEL,
        messages: [{ role: "user", content: "Say 'Hello world' and nothing else." }],
        stream: true,
        max_tokens: 50,
        temperature: 0,
      }),
      signal: controller.signal,
    });
    clearTimeout(timeout);

    console.log(`[TEST] Direct response status: ${response.status}`);
    if (!response.ok) {
      const body = await response.text().catch(() => "unknown");
      console.log(`[TEST] Direct response body: ${body}`);
    }

    assert.equal(response.status, 200, "Expected HTTP 200 for direct model");

    const { fullContent, finishReason, model, totalTokens } = await readSSEStream(response);

    assert.ok(fullContent.length > 0, "response should have content");
    assert.ok(
      finishReason === "stop" || finishReason === "length",
      `expected stop/length finish, got ${finishReason}`
    );
    assert.ok(totalTokens > 0, `should have non-zero token count, got ${totalTokens}`);
    assert.ok(
      model.toLowerCase().includes("gemini") || model.toLowerCase().includes("gemma"),
      `response model "${model}" should be a Gemini/Gemma model`
    );
    console.log(`[TEST] Direct OK: model=${model}, finish=${finishReason}, tokens=${totalTokens}`);
  } catch (err) {
    clearTimeout(timeout);
    throw err;
  }
});

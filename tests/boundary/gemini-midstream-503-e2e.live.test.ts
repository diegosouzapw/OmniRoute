/**
 * E2E boundary test: Responses API mid-stream 503 error handling.
 *
 * Sends a streaming Responses API request through a Gemini provider and
 * verifies that if the upstream errors mid-stream, the `response.completed`
 * event carries `status: "failed"` with an error object, rather than
 * silently emitting `status: "completed"` or aborting without a terminal event.
 */
import test from "node:test";
import assert from "node:assert/strict";

const OMNIROUTE_URL = `${process.env.OMNIROUTE_URL}/v1`;
const AUTH = `Bearer ${process.env.OMNIROUTE_API_KEY || ""}`;

const skip = !(process.env.OMNIROUTE_API_KEY && process.env.OMNIROUTE_URL)
  ? "OMNIROUTE_API_KEY or OMNIROUTE_URL not set — skipping live boundary test"
  : undefined;

interface SseEvent {
  event: string | null;
  data: Record<string, unknown> | null;
}

async function fetchStream(
  url: string,
  body: Record<string, unknown>
): Promise<{ events: SseEvent[]; status: number }> {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: AUTH,
    },
    body: JSON.stringify(body),
  });

  const status = response.status;
  if (!response.ok) {
    return { events: [], status };
  }

  const reader = response.body!.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  const events: SseEvent[] = [];

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    const lines = buffer.split("\n");
    buffer = lines.pop() || "";
    let currentEvent: string | null = null;

    for (const line of lines) {
      if (line.startsWith("event: ")) {
        currentEvent = line.slice(7);
      } else if (line.startsWith("data: ")) {
        const dataStr = line.slice(6);
        try {
          events.push({ event: currentEvent, data: JSON.parse(dataStr) });
        } catch {
          events.push({ event: currentEvent, data: null });
        }
      }
    }
  }

  return { events, status };
}

test(
  "Responses API streaming with Gemini handles mid-stream 503 gracefully",
  { skip },
  async () => {
    // Send a short prompt through a Gemini model via Responses API (streaming).
    // If Gemini hits a mid-stream 503 (which is non-deterministic), the fix
    // ensures response.completed carries status="failed" and an error object.
    // If the request succeeds normally, we verify the standard completion shape.
    const { events, status } = await fetchStream(`${OMNIROUTE_URL}/responses`, {
      model: "gemini/gemini-2.0-flash",
      input: "Say 'hello' and nothing else.",
      stream: true,
      max_output_tokens: 50,
      temperature: 0,
    });

    // Even on error we should get a 200 with SSE events (mid-stream error).
    assert.equal(status, 200, "should get HTTP 200 with SSE stream");

    // Find the response.completed event
    const completedEvent = events.find((e) => e.event === "response.completed");
    assert.ok(completedEvent, "should emit response.completed event");
    assert.ok(completedEvent.data, "response.completed should have data");

    const response = completedEvent.data as Record<string, unknown>;
    const respObj = response.response as Record<string, unknown> | undefined;

    assert.ok(respObj, "response.completed.data.response should exist");

    const respStatus = respObj.status as string;
    const respError = respObj.error;

    if (respStatus === "failed") {
      // Mid-stream error path — the fix under test
      assert.ok(respError, "failed response should have error object");
      const err = respError as Record<string, unknown>;
      assert.ok(
        typeof err.code === "string" || typeof err.code === "number",
        "error should have code"
      );
      assert.ok(
        typeof err.message === "string" && err.message.length > 0,
        "error should have message"
      );
      console.log(`[PASS] Mid-stream 503 detected: code=${err.code}, message="${err.message}"`);
    } else {
      // Normal success path — verify the standard shape
      assert.equal(respStatus, "completed", "normal response should have status=completed");
      assert.equal(respError, null, "normal response should have error=null");
      assert.ok(Array.isArray(respObj.output), "response should have output array");
      console.log("[PASS] Normal completion (no mid-stream error)");
    }

    console.log(`Total SSE events received: ${events.length}`);
  }
);

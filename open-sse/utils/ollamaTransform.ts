import { CORS_HEADERS } from "./cors.ts";
import { getReadableReasoningValue } from "./reasoningFields.ts";

type PendingToolCall = {
  id?: string;
  function: {
    name: string;
    arguments: string;
  };
};

// Transform OpenAI SSE stream to Ollama JSON lines format
export function transformToOllama(response, model) {
  // Only successful SSE responses belong to the NDJSON transformer. Preserve errors,
  // bodyless responses, and successful JSON responses without losing status/body/headers.
  const contentType = String(response.headers?.get?.("content-type") || "").toLowerCase();
  if (!response.ok || !response.body || !contentType.includes("text/event-stream")) return response;

  let buffer = "";
  let pendingToolCalls: Record<number, PendingToolCall> = {};
  const completedToolCalls: PendingToolCall[] = [];
  // Persistent decoder with { stream: true } carries pending bytes between chunks, so a
  // multi-byte UTF-8 sequence split across network chunks is not corrupted into U+FFFD.
  const decoder = new TextDecoder();

  const transform = new TransformStream(
    {
      transform(chunk, controller) {
        const text = decoder.decode(chunk, { stream: true });
        buffer += text;
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (!line.startsWith("data:")) continue;
          const data = line.slice(5).trim();

          if (data === "[DONE]") {
            const ollamaEnd =
              JSON.stringify({ model, message: { role: "assistant", content: "" }, done: true }) +
              "\n";
            controller.enqueue(new TextEncoder().encode(ollamaEnd));
            return;
          }

          try {
            const parsed = JSON.parse(data);
            const delta = parsed.choices?.[0]?.delta || {};
            const content = delta.content || "";
            const thinking = getReadableReasoningValue(delta);
            const toolCalls = delta.tool_calls;

            if (toolCalls) {
              for (const tc of toolCalls) {
                const idx = tc.index;

                const toolCallId = tc.id != null ? String(tc.id) : tc.id;

                // T37: Prevent merging tool_calls on same index if ID changes
                if (
                  pendingToolCalls[idx] &&
                  toolCallId &&
                  pendingToolCalls[idx].id !== toolCallId
                ) {
                  completedToolCalls.push(pendingToolCalls[idx]);
                  delete pendingToolCalls[idx];
                }

                if (!pendingToolCalls[idx]) {
                  pendingToolCalls[idx] = {
                    id: toolCallId,
                    function: { name: "", arguments: "" },
                  };
                }
                if (tc.function?.name) pendingToolCalls[idx].function.name += tc.function.name;
                if (tc.function?.arguments)
                  pendingToolCalls[idx].function.arguments += tc.function.arguments;
              }
            }

            if (thinking) {
              const ollama =
                JSON.stringify({
                  model,
                  message: { role: "assistant", content: "", thinking },
                  done: false,
                }) + "\n";
              controller.enqueue(new TextEncoder().encode(ollama));
            }

            if (content) {
              const ollama =
                JSON.stringify({ model, message: { role: "assistant", content }, done: false }) +
                "\n";
              controller.enqueue(new TextEncoder().encode(ollama));
            }

            const finishReason = parsed.choices?.[0]?.finish_reason;
            if (finishReason === "tool_calls" || finishReason === "stop") {
              const toolCallsArr = [...completedToolCalls, ...Object.values(pendingToolCalls)];
              if (toolCallsArr.length > 0) {
                const formattedCalls = toolCallsArr.map((tc) => ({
                  function: {
                    name: tc.function.name,
                    arguments: JSON.parse(tc.function.arguments || "{}"),
                  },
                }));
                const ollama =
                  JSON.stringify({
                    model,
                    message: { role: "assistant", content: "", tool_calls: formattedCalls },
                    done: true,
                  }) + "\n";
                controller.enqueue(new TextEncoder().encode(ollama));
                pendingToolCalls = {};
              } else if (finishReason === "stop") {
                const ollamaEnd =
                  JSON.stringify({
                    model,
                    message: { role: "assistant", content: "" },
                    done: true,
                  }) + "\n";
                controller.enqueue(new TextEncoder().encode(ollamaEnd));
              }
            }
          } catch (e) {
            // Silently ignore parse errors
          }
        }
      },
      flush(controller) {
        const ollamaEnd =
          JSON.stringify({ model, message: { role: "assistant", content: "" }, done: true }) + "\n";
        controller.enqueue(new TextEncoder().encode(ollamaEnd));
      },
    },
    { highWaterMark: 16384 },
    { highWaterMark: 16384 }
  );

  return new Response(response.body.pipeThrough(transform), {
    headers: {
      "Content-Type": "application/x-ndjson",
    },
  });
}

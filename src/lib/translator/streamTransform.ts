import { createResponsesApiTransformStream } from "@omniroute/open-sse/transformer/responsesTransformer.ts";

export async function transformChatCompletionSseToResponses(rawSse: string): Promise<string> {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const inputStream = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(encoder.encode(rawSse));
      controller.close();
    },
  });

  const outputStream = inputStream.pipeThrough(createResponsesApiTransformStream());
  const reader = outputStream.getReader();

  let output = "";

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    output += decoder.decode(value, { stream: true });
  }

  output += decoder.decode();
  return output;
}

export function mockSSEStream(chunks: string[]) {
  const encoder = new TextEncoder();
  return new ReadableStream({
    start(controller) {
      for (const chunk of chunks) {
        controller.enqueue(encoder.encode(chunk));
      }
      controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      controller.close();
    },
  });
}

export function mockJSONLStream(lines: string[]) {
  const encoder = new TextEncoder();
  return new ReadableStream({
    start(controller) {
      for (const line of lines) {
        controller.enqueue(encoder.encode(line + "\n"));
      }
      controller.close();
    },
  });
}

export const HUGGINGCHAT_ROOT_ID = "00000000-0000-4000-8000-000000000001";

export function mockHuggingChatConversationDetail(rootId = HUGGINGCHAT_ROOT_ID) {
  return new Response(
    JSON.stringify({
      json: {
        rootMessageId: rootId,
        messages: [{ id: rootId, from: "system" }],
      },
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}

export function mockFetchCapture(status = 200, responseBody?: ReadableStream | string) {
  const original = globalThis.fetch;
  let capturedUrl: string | null = null;
  let capturedHeaders: Record<string, string> = {};
  let capturedBody: string | null = null;

  const body =
    typeof responseBody === "string"
      ? new ReadableStream({
          start(controller) {
            controller.enqueue(new TextEncoder().encode(responseBody));
            controller.close();
          },
        })
      : responseBody;

  globalThis.fetch = async (url: any, opts: any) => {
    capturedUrl = String(url);
    capturedHeaders = opts?.headers || {};
    capturedBody = opts?.body || null;
    return new Response(body || "", {
      status,
      headers: { "Content-Type": "text/event-stream; charset=utf-8" },
    });
  };

  return {
    restore: () => {
      globalThis.fetch = original;
    },
    get url() {
      return capturedUrl;
    },
    get headers() {
      return capturedHeaders;
    },
    get body() {
      return capturedBody;
    },
  };
}

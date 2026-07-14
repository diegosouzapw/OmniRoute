class NonJsonChatResponseError extends Error {
  readonly status: number;

  constructor(response: Response, text: string) {
    const contentType = response.headers.get("content-type") || "unknown";
    const bodyPreview = text.replace(/\s+/g, " ").trim().slice(0, 500);
    super(
      `Chat endpoint returned non-JSON response (HTTP ${response.status}, ${contentType}): ${bodyPreview}`
    );
    this.name = "NonJsonChatResponseError";
    this.status = response.status;
  }
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function postChat(baseUrl: string, model: string, content: string) {
  const response = await fetch(`${baseUrl}/api/v1/chat/completions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model,
      stream: false,
      messages: [{ role: "user", content }],
    }),
    signal: AbortSignal.timeout(20_000),
  });
  const text = await response.text();
  let json: unknown = {};
  if (text) {
    try {
      json = JSON.parse(text);
    } catch {
      throw new NonJsonChatResponseError(response, text);
    }
  }
  return { response, json };
}

export async function warmUpChatRoute(baseUrl: string, model: string, content: string) {
  const maxAttempts = 3;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      const result = await postChat(baseUrl, model, content);
      if (result.response.status < 500 || attempt === maxAttempts) return result;
    } catch (error) {
      if (!(error instanceof NonJsonChatResponseError) || attempt === maxAttempts) throw error;
    }

    await sleep(attempt * 500);
  }

  throw new Error("Chat route warm-up exhausted without a response");
}

// Kiro runtime probe — falls back to a generateAssistantResponse call when an API key
// cannot list profiles. Extracted from validation.ts (god-file decomposition) — top-level
// function with no dispatcher-state captures; behavior is byte-identical to the original
// inline def.
export async function validateKiroApiKeyRuntimeProbe({
  apiKey,
  region,
  profileArn,
}: {
  apiKey: string;
  region: string;
  profileArn?: string | null;
}) {
  const endpoint =
    region === "us-east-1"
      ? "https://codewhisperer.us-east-1.amazonaws.com/generateAssistantResponse"
      : `https://q.${region}.amazonaws.com/generateAssistantResponse`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15_000);
  try {
    const body = {
      ...(profileArn ? { profileArn } : {}),
      conversationState: {
        chatTriggerType: "MANUAL",
        conversationId: crypto.randomUUID(),
        currentMessage: {
          userInputMessage: {
            content: "ping",
            modelId: "auto",
            origin: "AI_EDITOR",
          },
        },
        history: [],
      },
      inferenceConfig: {
        maxTokens: 1,
      },
    };

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        tokentype: "API_KEY",
        "Content-Type": "application/x-amz-json-1.0",
        "X-Amz-Target": "AmazonCodeWhispererStreamingService.GenerateAssistantResponse",
        Accept: "application/vnd.amazon.eventstream",
        "Amz-Sdk-Request": "attempt=1; max=3",
        "Amz-Sdk-Invocation-Id": crypto.randomUUID(),
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    await res.body?.cancel().catch(() => undefined);

    if (res.ok) {
      return { valid: true, error: null, method: "kiro_generate_assistant_response" };
    }
    if (res.status === 401 || res.status === 403) {
      return { valid: false, error: "Invalid Kiro API key or AWS region" };
    }
    if (res.status === 400 || res.status === 422 || res.status === 429) {
      return { valid: true, error: null, method: `kiro_generate_assistant_response_${res.status}` };
    }
    return { valid: false, error: `Kiro validation failed: ${res.status}` };
  } finally {
    clearTimeout(timeout);
  }
}

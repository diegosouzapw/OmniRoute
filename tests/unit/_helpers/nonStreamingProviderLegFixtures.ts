/**
 * Shared fixtures for the non-streaming provider leg suites.
 *
 * Extracted from non-streaming-provider-leg.test.ts when the diagnostic-handoff tests
 * pushed it past the 1200-line test cap: the two suites exercise the same seam, so the
 * builders live here rather than being copied into the sibling file.
 */
import {
  type ChatCoreExecutorResult,
  type ProviderLegInput,
} from "../../../open-sse/handlers/chatCore/nonStreamingProviderLeg.ts";

export function makeResponse(
  body: string | object,
  status = 200,
  headers: Record<string, string> = {}
): Response {
  const text = typeof body === "string" ? body : JSON.stringify(body);
  return {
    ok: status >= 200 && status < 300,
    status,
    statusText: status === 200 ? "OK" : "Error",
    headers: new Headers({ "content-type": "application/json", ...headers }),
    text: async () => text,
    clone() {
      return { ...this, text: async () => text } as unknown as Response;
    },
    body: null,
  } as unknown as Response;
}

export function makeExecutorResult(
  responseBody: unknown,
  status = 200,
  headers: Record<string, string> = {}
): ChatCoreExecutorResult {
  return {
    response: makeResponse(responseBody, status, headers),
    url: "https://api.openai.com/v1/chat/completions",
    headers: {},
    transformedBody: responseBody,
  };
}

export function baseInput(overrides: Partial<ProviderLegInput> = {}): ProviderLegInput {
  return {
    phase: "initial",
    sourceBody: {
      model: "gpt-4o",
      messages: [{ role: "user", content: "hi" }],
    },
    expectedConnectionId: undefined,
    allowAccountRotation: true,
    allowModelFallback: true,
    executeProviderRequest: async () =>
      makeExecutorResult({
        id: "chatcmpl-test",
        choices: [{ message: { role: "assistant", content: "Hello!" }, finish_reason: "stop" }],
        usage: { prompt_tokens: 10, completion_tokens: 5, total_tokens: 15 },
      }),
    setRequestWireState: () => {},
    provider: "openai",
    model: "gpt-4o",
    connectionId: "conn-test",
    ...overrides,
  };
}

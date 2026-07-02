// tests/integration/_comboRoutingHarness.ts
// Recording-fetch helper for combo routing-decision tests.
// Wraps the chat pipeline harness so each strategy test can assert WHICH
// provider/model was dispatched, in what order, without writing a fetch mock.

import { createChatPipelineHarness } from "./_chatPipelineHarness.ts";

// Map an upstream request URL to the provider id it targets. Mirrors the URL
// shapes asserted in combo-routing-e2e.test.ts. Extend as providers are added.
export function providerFromUrl(url: string): string {
  if (url.includes("?beta=true")) return "claude";
  if (url.endsWith("generateContent") || url.includes(":generateContent")) return "gemini";
  if (url.includes("/chat/completions")) return "openai";
  return "unknown";
}

export type DispatchCall = {
  index: number;
  provider: string;
  url: string;
  authorization: string | undefined;
  model: string | undefined;
};

// A scripted response decides, per call index or provider, whether the upstream
// call succeeds or returns a failure status. Default: every call succeeds (200).
export type ResponseScript = (call: DispatchCall) => Response | undefined;

export async function createComboRoutingHarness(prefix: string) {
  const base = await createChatPipelineHarness(prefix);

  // Records every upstream call in dispatch order.
  const calls: DispatchCall[] = [];

  function readModel(init: any): string | undefined {
    try {
      const body = typeof init?.body === "string" ? JSON.parse(init.body) : init?.body;
      return body?.model;
    } catch {
      return undefined;
    }
  }

  // Install a recording fetch. `script` may return a Response to override the
  // default success (e.g. a 503 to force failover); returning undefined uses the
  // provider's default success response.
  function installRecordingFetch(script: ResponseScript = () => undefined) {
    calls.length = 0;
    globalThis.fetch = async (url: any, init: any = {}) => {
      const u = String(url);
      const provider = providerFromUrl(u);
      const headers = base.toPlainHeaders(init.headers);
      const call: DispatchCall = {
        index: calls.length,
        provider,
        url: u,
        authorization: headers.authorization,
        model: readModel(init),
      };
      calls.push(call);
      const override = script(call);
      if (override) return override;
      if (provider === "claude") return base.buildClaudeResponse("ok");
      if (provider === "gemini") return base.buildGeminiResponse("ok");
      return base.buildOpenAIResponse("ok");
    };
  }

  // Convenience: a failure Response with a given status.
  function failure(status: number, message = "scripted failure"): Response {
    return new Response(JSON.stringify({ error: { message } }), {
      status,
      headers: { "Content-Type": "application/json" },
    });
  }

  return {
    ...base,
    calls,
    installRecordingFetch,
    failure,
    providersSeen: () => calls.map((c) => c.provider),
    authKeysSeen: () => calls.map((c) => c.authorization),
  };
}

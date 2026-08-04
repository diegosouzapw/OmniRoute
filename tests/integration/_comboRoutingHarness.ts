// tests/integration/_comboRoutingHarness.ts
// Recording-fetch helper for combo routing-decision tests.
// Wraps the chat pipeline harness so each strategy test can assert WHICH
// provider/model was dispatched, in what order, without writing a fetch mock.

import { createChatPipelineHarness } from "./_chatPipelineHarness.ts";

// Map an upstream request URL to the provider id it targets.
//
// Classification is by HOST, not by path shape. Path shapes are ambiguous in
// both directions now that the catalog has hundreds of providers:
//   - `/chat/completions` is served by dozens of OpenAI-compatible upstreams
//     (e.g. https://opencode.ai/zen/v1/chat/completions), so matching on it
//     mislabelled other providers as "openai";
//   - OpenAI itself dispatches the GPT-5.6 family to `/v1/responses`, so its
//     own calls stopped matching and came back "unknown".
// The host is what actually identifies the upstream, so we key on that.
//
// Unrecognised hosts return `host:<hostname>` rather than a bare "unknown", so
// an unexpected dispatch names itself in the assertion message instead of
// forcing a debugging round-trip.
const PROVIDER_BY_HOST: Record<string, string> = {
  "api.openai.com": "openai",
  "api.anthropic.com": "claude",
  "generativelanguage.googleapis.com": "gemini",
  "chatgpt.com": "codex",
  "auth.openai.com": "codex",
};

export function providerFromUrl(url: string): string {
  let host: string;
  try {
    host = new URL(url).hostname;
  } catch {
    return "unknown";
  }
  return PROVIDER_BY_HOST[host] ?? `host:${host}`;
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

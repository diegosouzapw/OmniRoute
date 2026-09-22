import test from "node:test";
import assert from "node:assert/strict";

import { stripInternalBodyFields } from "../../open-sse/config/cliFingerprints.ts";
import { SKIP_UNIVERSAL_HANDOFF_FLAG } from "../../open-sse/services/contextHandoff.ts";

// Live 400 on the claude/claude-opus-5 hop of best-reasoning-paid:
//   [400]: _omnirouteSkipContextRelay: Extra inputs are not permitted
//
// contextHandoff.ts stamps `_omnirouteSkipContextRelay` / `_omnirouteInternalRequest`
// onto the internal summary body so the context-relay injection in chat.ts skips
// its own request. Those keys are consumed by routing BEFORE dispatch and must
// never reach an upstream. stripInternalBodyFields() was a hand-maintained
// allowlist of 5 unrelated markers, so the handoff markers leaked into the
// serialized upstream payload and strict Anthropic-compatible gateways rejected
// the whole request. Every `_omniroute*` marker is internal by construction, so
// the strip is prefix-based, not per-key.

test("stripInternalBodyFields removes the context-handoff markers", () => {
  const body: Record<string, unknown> = {
    model: "claude-opus-5",
    messages: [{ role: "user", content: "hi" }],
    max_tokens: 64,
    _omnirouteSkipContextRelay: true,
    _omnirouteInternalRequest: "context-handoff",
  };

  stripInternalBodyFields(body);

  assert.equal(body._omnirouteSkipContextRelay, undefined);
  assert.equal(body._omnirouteInternalRequest, undefined);
  assert.ok(!("_omnirouteSkipContextRelay" in body));
  assert.ok(!("_omnirouteInternalRequest" in body));
  // Real payload must survive.
  assert.equal(body.model, "claude-opus-5");
  assert.equal(body.max_tokens, 64);
  assert.ok(Array.isArray(body.messages));
});

test("stripInternalBodyFields removes the universal-handoff markers", () => {
  const body: Record<string, unknown> = {
    model: "claude-opus-5",
    messages: [{ role: "user", content: "hi" }],
    _omnirouteSkipContextRelay: true,
    _omnirouteInternalRequest: "universal-handoff",
    [SKIP_UNIVERSAL_HANDOFF_FLAG]: true,
  };

  stripInternalBodyFields(body);

  assert.equal(body[SKIP_UNIVERSAL_HANDOFF_FLAG], undefined);
  assert.equal(body._omnirouteInternalRequest, undefined);
});

test("stripInternalBodyFields strips every _omniroute* marker by prefix", () => {
  // Guards the whole class: any future internal `_omniroute*` marker is stripped
  // without editing an allowlist, so it cannot become the next upstream 400.
  const body: Record<string, unknown> = {
    model: "m",
    _omnirouteReasoningRouteTrace: { decision: "x" },
    _omnirouteReasoningRule: { rule: "y" },
    _omnirouteResponsesStore: "auto",
    _omnirouteCopilotReasoningSummary: "summarized",
    _omnirouteSomeFutureMarkerNotYetWritten: true,
  };

  stripInternalBodyFields(body);

  for (const key of Object.keys(body)) {
    assert.ok(!key.startsWith("_omniroute"), `leaked internal marker: ${key}`);
  }
  assert.equal(body.model, "m");
});

test("stripInternalBodyFields keeps the pre-existing non-_omniroute markers stripped", () => {
  const body: Record<string, unknown> = {
    model: "m",
    _claudeCodeRequiresLowercaseToolNames: true,
    _nativeCodexPassthrough: true,
    _nativeXaiResponsesPassthrough: true,
    _nativeOpenAICompatibleResponsesPassthrough: true,
  };

  stripInternalBodyFields(body);

  assert.deepEqual(Object.keys(body), ["model"]);
});

test("stripInternalBodyFields leaves client fields with a leading underscore alone", () => {
  // Only omniroute-owned prefixes are internal. A client field that merely
  // starts with `_` is part of the caller's payload and must pass through.
  const body: Record<string, unknown> = {
    model: "m",
    _id: "caller-owned",
    _meta: { trace: 1 },
  };

  stripInternalBodyFields(body);

  assert.equal(body._id, "caller-owned");
  assert.deepEqual(body._meta, { trace: 1 });
});

test("stripInternalBodyFields tolerates non-object input", () => {
  assert.equal(stripInternalBodyFields(null), null);
  assert.equal(stripInternalBodyFields(undefined), undefined);
  assert.equal(stripInternalBodyFields("str"), "str");
  const arr = [1, 2];
  assert.equal(stripInternalBodyFields(arr), arr);
});

// End-to-end guard at the real boundary: the helper above is only correct if the
// dispatch path actually calls it. This drives DefaultExecutor.execute() with a
// stubbed fetch and asserts the SERIALIZED upstream body -- the exact bytes that
// produced the live 400 -- carries no internal markers.
test("DefaultExecutor.execute never serializes _omniroute* markers into the upstream body", async () => {
  const { DefaultExecutor } = await import("../../open-sse/executors/default.ts");

  const originalFetch = globalThis.fetch;
  const sentBodies: string[] = [];
  globalThis.fetch = (async (_url: unknown, init: { body?: unknown } = {}) => {
    if (typeof init.body === "string") sentBodies.push(init.body);
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }) as typeof globalThis.fetch;

  try {
    const executor = new DefaultExecutor("anthropic-compatible-cc-test");
    await executor.execute({
      model: "claude-opus-5",
      body: {
        model: "claude-opus-5",
        messages: [{ role: "user", content: "hi" }],
        max_tokens: 1,
        _omnirouteSkipContextRelay: true,
        _omnirouteInternalRequest: "context-handoff",
      },
      stream: false,
      credentials: {
        apiKey: "test-key",
        // #13452/#13798: `*-compatible-*` nodes must carry an explicit baseUrl or
        // buildUrl() throws rather than silently defaulting to the real Anthropic
        // API. The stubbed fetch below intercepts this URL; nothing leaves the box.
        providerSpecificData: {
          ccSessionId: "session-1",
          baseUrl: "http://127.0.0.1:1/v1",
        },
      },
      extendedContext: false,
    } as never);
  } finally {
    globalThis.fetch = originalFetch;
  }

  assert.ok(sentBodies.length > 0, "executor must have dispatched a request");
  for (const raw of sentBodies) {
    assert.ok(
      !raw.includes("_omniroute"),
      `internal marker leaked into serialized upstream body: ${raw.slice(0, 300)}`
    );
    // The real payload must still be there -- proving the assertion above is not
    // passing because the body was emptied.
    assert.ok(raw.includes("claude-opus-5"), "real payload must survive the strip");
  }
});

// Cross-layer production regression: universal-handoff itself must reach the common
// executor egress boundary before serialization. Its internal control markers are
// deliberately present while the dispatcher runs, but must be absent from fetch.
test("universal-handoff dispatch never serializes _omniroute markers upstream", async () => {
  const { maybeGenerateUniversalHandoff, DEFAULT_UNIVERSAL_HANDOFF_CONFIG } =
    await import("../../open-sse/services/contextHandoff.ts");
  const { prepareUpstreamBody } = await import("../../open-sse/handlers/chatCore/upstreamBody.ts");

  const sentBodies: string[] = [];

  let resolveDispatch: (() => void) | undefined;
  const dispatched = new Promise<void>((resolve) => {
    resolveDispatch = resolve;
  });

  maybeGenerateUniversalHandoff({
    sessionId: "universal-handoff-marker-leak",
    comboName: "universal-handoff-marker-leak",
    messages: [{ role: "user", content: "Retain this context." }],
    prevModel: "anthropic/claude-opus-5",
    currModel: "anthropic/claude-sonnet-5",
    universalConfig: {
      ...DEFAULT_UNIVERSAL_HANDOFF_CONFIG,
      enabled: true,
      handoffModel: "anthropic/claude-sonnet-5",
    },
    handleSingleModel: async (body, model) => {
      // Model a custom executor that serializes its payload itself instead of
      // inheriting BaseExecutor's serializer. The shared boundary must remove
      // the markers before such an executor receives its body.
      const prepared = await prepareUpstreamBody({
        translatedBody: body,
        modelToCall: model,
        provider: "custom-provider",
        targetFormat: "openai",
        credentials: {},
      });
      sentBodies.push(JSON.stringify(prepared));
      resolveDispatch?.();
      return new Response(
        JSON.stringify({
          choices: [
            {
              message: {
                content: JSON.stringify({
                  summary: "A valid handoff summary.",
                  keyDecisions: [],
                  taskProgress: "",
                  activeEntities: [],
                }),
              },
            },
          ],
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    },
  });

  await dispatched;

  assert.ok(sentBodies.length > 0, "universal handoff must dispatch an upstream request");
  for (const raw of sentBodies) {
    const payload = JSON.parse(raw) as Record<string, unknown>;
    for (const key of Object.keys(payload)) {
      assert.ok(!key.startsWith("_omniroute"), `internal marker leaked upstream: ${key}`);
    }
    assert.equal(payload.model, "anthropic/claude-sonnet-5");
    assert.ok(Array.isArray(payload.messages), "the summary request must retain its messages");
  }
});

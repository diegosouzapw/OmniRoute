// Capability enforcement for the Gemini Web executor (#9356).
//
// Reported: gemini-web silently ACCEPTS `reasoning_effort` and
// `tool_choice: "required"` and answers with ordinary prose — HTTP 200, no
// `reasoning_content`, `tool_calls: []`, `finish_reason: "stop"`. An
// AgentChakra/OpenClaw agent then believes its reasoning and tool requirements
// were honored when they were not.
//
// Why neither can be implemented for THIS provider: gemini-web is not an API
// client. It launches Playwright, types a single flat prompt string into the
// gemini.google.com `.ql-editor` contenteditable, presses Enter, and captures
// the first `StreamGenerate` response off the page. There is no request payload
// to carry a thinking budget, and no function-calling channel to force — the
// tools support it does have is the prompt-emulation shim (`webTools.ts`, #7286),
// which ASKS the model to emit `<tool>{...}</tool>` and cannot GUARANTEE it.
//
// So this suite pins the issue's option (b) for both controls: reject the
// requests we cannot honor, and keep honoring the ones we can. The line drawn:
//
//   reasoning_effort  none | minimal        → allowed (gemini-web not thinking
//                                             IS compliance with "spend little")
//                     low | medium | high…  → 400, a positive request to think
//   tool_choice       absent | auto | none  → allowed (emulation path, #7286)
//                     required | any | {fn} → 400, a guarantee we cannot make
//
// The guard must run BEFORE Playwright launches, so every executor assertion
// here completes without a browser.

import test from "node:test";
import assert from "node:assert/strict";

const { GeminiWebExecutor } = await import("../../../open-sse/executors/gemini-web.ts");
const { checkGeminiWebUnsupportedControls, GEMINI_WEB_UNSUPPORTED_CONTROL_CODE } =
  await import("../../../open-sse/executors/gemini-web/capabilities.ts");
const { gemini_webProvider } =
  await import("../../../open-sse/config/providers/registry/gemini/web/index.ts");
const { supportsReasoning, supportsToolCalling } =
  await import("../../../src/lib/modelCapabilities.ts");
const { providerSupportsEmulatedToolCalling } =
  await import("../../../open-sse/services/combo/comboStructure.ts");

const GET_WEATHER_TOOL = {
  type: "function",
  function: {
    name: "get_weather",
    description: "Get the current weather for a city",
    parameters: { type: "object", properties: { city: { type: "string" } }, required: ["city"] },
  },
};

interface ErrorBodyLike {
  error: { message: string; type: string; code: string };
}

/**
 * Run the executor with valid-looking credentials. Every case in this suite is
 * expected to short-circuit on the capability guard, so Playwright is never
 * reached — a test that hangs here means the guard did not fire.
 */
async function run(body: Record<string, unknown>) {
  return new GeminiWebExecutor().execute({
    model: "gemini-3.6-flash",
    body: { messages: [{ role: "user", content: "hi" }], stream: false, ...body },
    stream: false,
    credentials: { apiKey: "__Secure-1PSID=test-cookie" },
    signal: AbortSignal.timeout(10_000),
    log: null,
  });
}

// ─── Pure checker: reasoning_effort ─────────────────────────────────────────

test("#9356 reasoning_effort low/medium/high/xhigh are rejected as unsupported", () => {
  for (const effort of ["low", "medium", "high", "xhigh"]) {
    const violation = checkGeminiWebUnsupportedControls({ reasoning_effort: effort });
    assert.equal(
      violation?.param,
      "reasoning_effort",
      `reasoning_effort="${effort}" asks gemini-web to think harder, which a typed browser ` +
        `prompt cannot express — it must be rejected, not silently dropped`
    );
    assert.match(violation!.message, /reasoning_effort/);
  }
});

test("#9356 reasoning_effort none/minimal and absent stay allowed", () => {
  assert.equal(checkGeminiWebUnsupportedControls({}), null);
  assert.equal(checkGeminiWebUnsupportedControls({ reasoning_effort: null }), null);
  assert.equal(checkGeminiWebUnsupportedControls({ reasoning_effort: "none" }), null);
  assert.equal(
    checkGeminiWebUnsupportedControls({ reasoning_effort: "minimal" }),
    null,
    '"minimal" means spend as little reasoning as possible — a non-thinking provider ' +
      "already satisfies it, so rejecting it would be gratuitous"
  );
  assert.equal(checkGeminiWebUnsupportedControls({ reasoning_effort: "  NONE  " }), null);
});

// ─── Pure checker: tool_choice ──────────────────────────────────────────────

test("#9356 tool_choice required/any is rejected as unsupported", () => {
  for (const choice of ["required", "any"]) {
    const violation = checkGeminiWebUnsupportedControls({
      tools: [GET_WEATHER_TOOL],
      tool_choice: choice,
    });
    assert.equal(
      violation?.param,
      "tool_choice",
      `tool_choice="${choice}" is a guarantee the prompt-emulation shim cannot make`
    );
    assert.match(violation!.message, /tool_choice/);
  }
});

test("#9356 a forced-function tool_choice object is rejected as unsupported", () => {
  const violation = checkGeminiWebUnsupportedControls({
    tools: [GET_WEATHER_TOOL],
    tool_choice: { type: "function", function: { name: "get_weather" } },
  });
  assert.equal(violation?.param, "tool_choice");

  // Anthropic-style forcing, which the translators also emit.
  assert.equal(
    checkGeminiWebUnsupportedControls({
      tools: [GET_WEATHER_TOOL],
      tool_choice: { type: "any" },
    })?.param,
    "tool_choice"
  );
});

test("#9356 tool_choice auto/none and absent keep the #7286 emulation path open", () => {
  assert.equal(checkGeminiWebUnsupportedControls({ tools: [GET_WEATHER_TOOL] }), null);
  assert.equal(
    checkGeminiWebUnsupportedControls({ tools: [GET_WEATHER_TOOL], tool_choice: "auto" }),
    null
  );
  assert.equal(
    checkGeminiWebUnsupportedControls({ tools: [GET_WEATHER_TOOL], tool_choice: "none" }),
    null
  );
});

test("#9356 forcing is rejected on its own terms, even with no tools[] array", () => {
  // An agent that sets tool_choice without tools is already malformed, but the
  // point stands: never report success for a forcing contract we ignore.
  assert.equal(
    checkGeminiWebUnsupportedControls({ tool_choice: "required" })?.param,
    "tool_choice"
  );
});

// ─── Executor wiring ────────────────────────────────────────────────────────

test("#9356 executor returns 400 for reasoning_effort=high before launching a browser", async () => {
  const result = await run({ reasoning_effort: "high" });

  assert.equal(result.response.status, 400);
  const body = (await result.response.json()) as ErrorBodyLike;
  assert.equal(body.error.code, GEMINI_WEB_UNSUPPORTED_CONTROL_CODE);
  assert.match(body.error.message, /reasoning_effort/);
  assert.equal(
    body.error.message.includes("at /"),
    false,
    "error bodies must stay sanitized — no stack traces"
  );
});

test("#9356 executor returns 400 for tool_choice=required before launching a browser", async () => {
  const result = await run({ tools: [GET_WEATHER_TOOL], tool_choice: "required" });

  assert.equal(result.response.status, 400);
  const body = (await result.response.json()) as ErrorBodyLike;
  assert.equal(body.error.code, GEMINI_WEB_UNSUPPORTED_CONTROL_CODE);
  assert.match(body.error.message, /tool_choice/);
});

test("#9356 the capability guard runs ahead of the credential check", async () => {
  // A request that is BOTH uncredentialed and incompatible must report the
  // incompatibility: adding a cookie would not make it work.
  const result = await new GeminiWebExecutor().execute({
    model: "gemini-3.6-flash",
    body: { messages: [{ role: "user", content: "hi" }], reasoning_effort: "high" },
    stream: false,
    credentials: {},
    signal: AbortSignal.timeout(10_000),
    log: null,
  });

  assert.equal(result.response.status, 400);
  const body = (await result.response.json()) as ErrorBodyLike;
  assert.equal(body.error.code, GEMINI_WEB_UNSUPPORTED_CONTROL_CODE);
});

test("#9356 a supported request still falls through the guard untouched", async () => {
  // tool_choice:"auto" + tools[] is the #7286 emulation contract. It must NOT
  // be blocked — reaching the (missing) credential check proves the guard let
  // it pass, without needing a browser to prove it.
  const result = await new GeminiWebExecutor().execute({
    model: "gemini-3.6-flash",
    body: {
      messages: [{ role: "user", content: "hi" }],
      tools: [GET_WEATHER_TOOL],
      tool_choice: "auto",
    },
    stream: false,
    credentials: {},
    signal: AbortSignal.timeout(10_000),
    log: null,
  });

  assert.equal(result.response.status, 401, "should reach the cookie check, not the guard");
});

// ─── Catalog metadata ───────────────────────────────────────────────────────

test("#9356 registry advertises no native tool calling and no reasoning for gemini-web", () => {
  assert.ok(gemini_webProvider.models.length > 0);
  for (const model of gemini_webProvider.models) {
    assert.equal(
      model.toolCalling,
      false,
      `${model.id} must not advertise native tool calling — /v1/models feeds agent routers`
    );
    assert.equal(
      model.supportsReasoning,
      false,
      `${model.id} must advertise reasoning:false so agent routers stop selecting it for ` +
        "reasoning work (the executor has no thinking control to drive)"
    );
  }
});

test("#9356 resolved capabilities — not just the raw registry — report no reasoning/tools", () => {
  // The registry literal is only the input; `getResolvedModelCapabilities` is what
  // the catalog, the combo compatibility filter and the thinking-budget translator
  // actually read. Assert the resolved view so a downstream default cannot quietly
  // re-advertise a capability the executor does not have.
  for (const model of gemini_webProvider.models) {
    const input = { provider: "gemini-web", model: model.id };
    assert.equal(supportsReasoning(input), false, `${model.id} resolved reasoning must be false`);
    assert.equal(
      supportsToolCalling(input),
      false,
      `${model.id} resolved NATIVE tool calling must be false — prompt emulation is advertised ` +
        'separately as toolCalling:"emulated" on the provider constant'
    );
  }
});

test("#9356 the provider still advertises emulated tool calling, so #7286 combos keep routing", () => {
  // Guard against over-correcting: dropping the emulation advertisement here would
  // make filterTargetsByRequestCompatibility fail these targets closed and break
  // emulation-only combos (#5240 / #8488).
  assert.equal(providerSupportsEmulatedToolCalling("gemini-web"), true);
  assert.equal(providerSupportsEmulatedToolCalling("gweb"), true);
});

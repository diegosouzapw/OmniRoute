// Regression test for the per-provider system transforms gap.
//
// `systemTransforms.providers.<key>` has always accepted any provider key
// ("generic per-provider DSL covering native claude, anthropic-compatible-cc-*
// bridge, and any other provider key"), but only the Claude-native
// (executors/base.ts) and CC-bridge (services/claudeCodeCompatible.ts) wire
// paths ever applied it, and the executor itself only read/wrote the Claude
// `system` field. A pipeline configured for an OpenAI-shaped provider such as
// `kiro` was therefore inert: the config saved, the UI showed it, and no
// request ever had it applied.
//
// This test asserts the fixed behaviour:
//  - non-Claude provider keys get the pipeline applied from chatCore, on the
//    client-shaped body, BEFORE translation (so the translators carry it);
//  - the OpenAI `messages[]` system carrier is read and written instead of a
//    `body.system` field those translators ignore;
//  - `claude` / `anthropic-compatible-cc-*` stay skipped, because their own
//    executors already apply the same config (no double application);
//  - Claude-shaped bodies keep writing `body.system` exactly as before.
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const {
  applyProviderSystemTransforms,
  isSystemTransformsHandledDownstream,
  PROVIDER_CLAUDE,
  PROVIDER_CC_BRIDGE,
} = await import("../../open-sse/services/systemTransforms.ts");

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, "..", "..");

const RULE_KEY = "tool-calling-rule:";
const TOOL_RULE = `${RULE_KEY} emit standard function calls only`;
const APPEND_OP = {
  kind: "append_system_block",
  text: TOOL_RULE,
  // `idempotencyKey` is matched as a text prefix by the op, so the block text
  // must start with it for repeat passes to be no-ops.
  idempotencyKey: RULE_KEY,
};

/** Provider-scoped config: an enabled pipeline for `kiro`, plus a claude entry
 *  that must stay untouched by the generic entry point. */
function config(providers) {
  return {
    providers: Object.assign(
      {
        kiro: { enabled: true, pipeline: [APPEND_OP] },
        claude: { enabled: true, pipeline: [APPEND_OP] },
        "anthropic-compatible-cc": { enabled: true, pipeline: [APPEND_OP] },
      },
      providers || {}
    ),
  };
}

function openAiKiroBody() {
  return {
    model: "claude-opus-5.5",
    messages: [
      { role: "system", content: "You are a helpful agent." },
      { role: "user", content: "hello" },
    ],
  };
}

// ────────────────────────────────────────────────────────────────────────────
// Provider scope
// ────────────────────────────────────────────────────────────────────────────

test("kiro: a per-provider pipeline reaches an OpenAI-shaped client body", () => {
  const body = openAiKiroBody();
  const result = applyProviderSystemTransforms("kiro", body, config());

  assert.deepEqual(result.appliedOpKinds, ["append_system_block"]);
  assert.match(String(body.messages[0].content), /You are a helpful agent\./);
  assert.match(String(body.messages[0].content), /emit standard function calls only/);
  // The carrier is messages[]: no stray Claude-shaped `system` field is created.
  assert.equal(body.system, undefined);
  assert.equal(body.messages.length, 2, "no extra system message is inserted");
});

test("kiro: the pipeline is idempotent across repeated passes", () => {
  const body = openAiKiroBody();
  applyProviderSystemTransforms("kiro", body, config());
  applyProviderSystemTransforms("kiro", body, config());
  const content = String(body.messages[0].content);
  assert.equal(content.split(TOOL_RULE).length - 1, 1, "block appended exactly once");
});

test("claude is skipped — its executor applies the same config downstream", () => {
  assert.equal(isSystemTransformsHandledDownstream(PROVIDER_CLAUDE), true);
  const body = openAiKiroBody();
  const result = applyProviderSystemTransforms(PROVIDER_CLAUDE, body, config());
  assert.deepEqual(result.appliedOpKinds, []);
  assert.equal(String(body.messages[0].content), "You are a helpful agent.");
});

test("anthropic-compatible-cc-* providers are skipped (shared bridge config)", () => {
  assert.equal(isSystemTransformsHandledDownstream(PROVIDER_CC_BRIDGE), true);
  assert.equal(isSystemTransformsHandledDownstream(`${PROVIDER_CC_BRIDGE}-7f3a`), true);
  const body = openAiKiroBody();
  const result = applyProviderSystemTransforms(`${PROVIDER_CC_BRIDGE}-7f3a`, body, config());
  assert.deepEqual(result.appliedOpKinds, []);
});

test("a provider with no configured pipeline is a no-op", () => {
  const body = openAiKiroBody();
  const result = applyProviderSystemTransforms("antigravity", body, config());
  assert.deepEqual(result.appliedOpKinds, []);
  assert.equal(String(body.messages[0].content), "You are a helpful agent.");
});

test("a disabled pipeline is a no-op", () => {
  const body = openAiKiroBody();
  const result = applyProviderSystemTransforms(
    "kiro",
    body,
    config({ kiro: { enabled: false, pipeline: [APPEND_OP] } })
  );
  assert.deepEqual(result.appliedOpKinds, []);
  assert.equal(String(body.messages[0].content), "You are a helpful agent.");
});

// ────────────────────────────────────────────────────────────────────────────
// OpenAI carrier handling
// ────────────────────────────────────────────────────────────────────────────

test("a client body without a system message gets one created at the front", () => {
  const body = { messages: [{ role: "user", content: "hello" }] };
  const result = applyProviderSystemTransforms("kiro", body, config());
  assert.deepEqual(result.appliedOpKinds, ["append_system_block"]);
  assert.equal(body.messages.length, 2);
  assert.equal(body.messages[0].role, "system");
  assert.equal(body.messages[0].content, TOOL_RULE);
  assert.equal(body.messages[1].role, "user");
});

test("a text-part array carrier is read and rewritten as text", () => {
  const body = {
    messages: [
      { role: "system", content: [{ type: "text", text: "You are a helpful agent." }] },
      { role: "user", content: "hello" },
    ],
  };
  applyProviderSystemTransforms("kiro", body, config());
  assert.equal(body.messages[0].content, `You are a helpful agent.\n\n${TOOL_RULE}`);
});

test("a non-text carrier is left untouched rather than silently losing content", () => {
  const body = {
    messages: [
      { role: "system", content: [{ type: "image_url", image_url: { url: "x" } }] },
      { role: "user", content: "hello" },
    ],
  };
  const result = applyProviderSystemTransforms("kiro", body, config());
  assert.deepEqual(result.appliedOpKinds, []);
  assert.deepEqual(body.messages[0].content, [{ type: "image_url", image_url: { url: "x" } }]);
});

test("Claude-shaped bodies keep writing the top-level `system` field", () => {
  const body = {
    system: "You are a helpful agent.",
    messages: [{ role: "user", content: "hello" }],
  };
  const result = applyProviderSystemTransforms(
    "minimax",
    body,
    config({
      minimax: { enabled: true, pipeline: [APPEND_OP] },
    })
  );
  assert.deepEqual(result.appliedOpKinds, ["append_system_block"]);
  assert.ok(Array.isArray(body.system), "system is normalised to a block array");
  const text = body.system.map((b) => b.text).join("\n\n");
  assert.match(text, /You are a helpful agent\./);
  assert.match(text, /emit standard function calls only/);
});

// ────────────────────────────────────────────────────────────────────────────
// Wiring — chatCore must call the generic entry point before translation
// ────────────────────────────────────────────────────────────────────────────

test("chatCore applies the per-provider pipeline on the pre-translation body", () => {
  const chatCore = readFileSync(join(repoRoot, "open-sse/handlers/chatCore.ts"), "utf8");
  assert.match(
    chatCore,
    /import \{ applyProviderSystemTransforms \} from "\.\.\/services\/systemTransforms\.ts";/,
    "chatCore must import the generic entry point"
  );
  assert.match(
    chatCore,
    /applyProviderSystemTransforms\(\s*provider,/,
    "chatCore must pass the resolved provider key"
  );

  const callSite = chatCore.indexOf("applyProviderSystemTransforms(");
  const translateCall = chatCore.indexOf("translatedBody = translateRequest(", callSite);
  assert.ok(callSite > -1 && translateCall > callSite, "call site must precede translateRequest");
});

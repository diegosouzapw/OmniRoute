// Regression test for #8350 — Hermes (NousResearch/hermes-agent) system-prompt
// signals reach Anthropic's native Claude OAuth path untouched, tripping
// `[400] Third-party apps now draw from extra usage, not plan limits.`
//
// Mirrors the "OpenWebUI fixture" / "Pi documentation" style tests in
// tests/unit/system-transforms.test.ts. Fixture text matches the real
// identity + doc-link paragraphs injected by
// NousResearch/hermes-agent/agent/prompt_builder.py (verified via WebFetch
// against the upstream repo during triage).
import test from "node:test";
import assert from "node:assert/strict";

const { applySystemTransformPipeline, DEFAULT_SYSTEM_TRANSFORMS_CONFIG, PROVIDER_CLAUDE } =
  await import("../../open-sse/services/systemTransforms.ts");

test("Hermes fixture: claude provider drops Hermes identity + doc-link paragraphs (#8350)", () => {
  const body = {
    system: [
      {
        type: "text",
        text: [
          "You are Hermes Agent, an intelligent AI assistant created by Nous Research.",
          "Guidelines:\n- Be concise.",
          "For more information, see the documentation at https://hermes-agent.nousresearch.com/docs.",
        ].join("\n\n"),
      },
    ],
    messages: [{ role: "user", content: "hi" }],
  };
  const result = applySystemTransformPipeline(
    PROVIDER_CLAUDE,
    body,
    DEFAULT_SYSTEM_TRANSFORMS_CONFIG
  );
  const out = (body.system as Array<{ text: string }>)[0].text;

  assert.ok(
    !out.includes("You are Hermes Agent"),
    "Hermes identity paragraph should be dropped by the default claude pipeline"
  );
  assert.ok(
    !out.includes("hermes-agent.nousresearch.com"),
    "Hermes doc-link paragraph should be dropped by the default claude pipeline"
  );
  // Unrelated legitimate content survives untouched.
  assert.ok(out.includes("Guidelines:"));
  assert.ok(out.includes("Be concise."));
  assert.ok(result.appliedOpKinds.includes("drop_paragraph_if_contains"));
  // No billing header injected on the native OAuth path (native code handles that).
  assert.ok(!result.appliedOpKinds.includes("inject_billing_header"));
});

test("non-Hermes system prompt passes through byte-identical through the claude pipeline (no drive-by regression)", () => {
  const body = {
    system: [
      {
        type: "text",
        text: "You are a helpful operator-configured assistant. Follow company policy X and always answer in English.",
      },
    ],
    messages: [{ role: "user", content: "hi" }],
  };
  const before = JSON.stringify(body);
  applySystemTransformPipeline(PROVIDER_CLAUDE, body, DEFAULT_SYSTEM_TRANSFORMS_CONFIG);
  assert.equal(
    JSON.stringify(body),
    before,
    "a normal operator system prompt with no third-party-agent anchors must pass through untouched"
  );
});

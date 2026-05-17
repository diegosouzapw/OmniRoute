import test from "node:test";
import assert from "node:assert/strict";

const {
  DEFAULT_CC_BRIDGE_PIPELINE,
  DEFAULT_CC_BRIDGE_TRANSFORMS_CONFIG,
  DEFAULT_CLAUDE_CODE_VERSION,
  CLAUDE_AGENT_SDK_IDENTITY,
  DEFAULT_PARAGRAPH_REMOVAL_ANCHORS,
  DEFAULT_IDENTITY_PREFIXES,
  DEFAULT_TEXT_REPLACEMENTS,
  applyCcBridgeTransformPipeline,
  buildBillingHeaderValue,
  computeCchSha256FirstUser,
  computeExMachinaVersionSuffix,
  computeDaystampVersionSuffix,
  extractFirstUserMessageText,
  setCcBridgeTransformsConfig,
  getCcBridgeTransformsConfig,
  resetCcBridgeTransformsConfig,
} = await import("../../open-sse/services/ccBridgeTransforms.ts");

type TransformOp = Parameters<typeof applyCcBridgeTransformPipeline>[1] extends infer C
  ? C extends { pipeline: infer P }
    ? P extends Array<infer T>
      ? T
      : never
    : never
  : never;

function bodyWithSystem(systemBlocks: Array<{ type: string; text: string }>, userText = "hi") {
  return {
    model: "claude-opus-4-7",
    messages: [{ role: "user", content: [{ type: "text", text: userText }] }],
    system: systemBlocks,
  };
}

function runPipeline(body: any, ops: any[]) {
  return applyCcBridgeTransformPipeline(body, { enabled: true, pipeline: ops });
}

test.beforeEach(() => {
  resetCcBridgeTransformsConfig();
});

// ── Defaults sanity ─────────────────────────────────────────────────────────

test("DEFAULT_CC_BRIDGE_PIPELINE places billing header at [0] and identity at [1] in output", () => {
  const result = runPipeline(
    bodyWithSystem([{ type: "text", text: "body" }], "user prompt"),
    DEFAULT_CC_BRIDGE_PIPELINE
  );
  const blocks = result.body.system as any[];
  assert.ok(blocks[0].text.startsWith("x-anthropic-billing-header:"));
  assert.equal(blocks[1].text, CLAUDE_AGENT_SDK_IDENTITY);
});

test("DEFAULT_CC_BRIDGE_TRANSFORMS_CONFIG is enabled", () => {
  assert.equal(DEFAULT_CC_BRIDGE_TRANSFORMS_CONFIG.enabled, true);
});

test("DEFAULT_PARAGRAPH_REMOVAL_ANCHORS includes ex-machina v1.7.5 anchors", () => {
  assert.ok(DEFAULT_PARAGRAPH_REMOVAL_ANCHORS.includes("github.com/anomalyco/opencode"));
  assert.ok(DEFAULT_PARAGRAPH_REMOVAL_ANCHORS.includes("opencode.ai/docs"));
});

test("DEFAULT_IDENTITY_PREFIXES strips OpenCode identity", () => {
  assert.ok(DEFAULT_IDENTITY_PREFIXES.includes("You are OpenCode"));
});

test("DEFAULT_TEXT_REPLACEMENTS includes v1.7.5 phrase fix", () => {
  const phrase = "Here is some useful information about the environment you are running in:";
  const rule = DEFAULT_TEXT_REPLACEMENTS.find((r) => r.match === phrase);
  assert.ok(rule, "expected phrase replacement");
  assert.equal(rule!.replacement, "Environment context you are running in:");
});

// ── Op: drop_paragraph_if_contains ─────────────────────────────────────────

test("drop_paragraph_if_contains removes matching paragraphs only", () => {
  const text = [
    "Intro paragraph here.",
    "See github.com/anomalyco/opencode for details.",
    "Final paragraph survives.",
  ].join("\n\n");
  const result = runPipeline(bodyWithSystem([{ type: "text", text }]), [
    { kind: "drop_paragraph_if_contains", needles: ["github.com/anomalyco/opencode"] },
  ]);
  const out = (result.body.system as any[])[0].text as string;
  assert.ok(out.includes("Intro paragraph"));
  assert.ok(out.includes("Final paragraph"));
  assert.ok(!out.includes("anomalyco"));
});

test("drop_paragraph_if_contains with empty needles is a no-op", () => {
  const text = "Stays put.";
  const result = runPipeline(bodyWithSystem([{ type: "text", text }]), [
    { kind: "drop_paragraph_if_contains", needles: [] },
  ]);
  assert.equal((result.body.system as any[])[0].text, text);
});

// ── Op: drop_paragraph_if_starts_with ──────────────────────────────────────

test("drop_paragraph_if_starts_with drops identity-prefixed paragraphs", () => {
  const text = ["You are OpenCode, a helper.", "Real content."].join("\n\n");
  const result = runPipeline(bodyWithSystem([{ type: "text", text }]), [
    { kind: "drop_paragraph_if_starts_with", prefixes: ["You are OpenCode"] },
  ]);
  const out = (result.body.system as any[])[0].text as string;
  assert.ok(!out.includes("You are OpenCode"));
  assert.ok(out.includes("Real content"));
});

// ── Op: replace_text ───────────────────────────────────────────────────────

test("replace_text replaces v1.7.5 phrase exactly once by default", () => {
  const phrase = "Here is some useful information about the environment you are running in:";
  const text = `Prefix. ${phrase} body.`;
  const result = runPipeline(bodyWithSystem([{ type: "text", text }]), [
    {
      kind: "replace_text",
      match: phrase,
      replacement: "Environment context you are running in:",
    },
  ]);
  const out = (result.body.system as any[])[0].text as string;
  assert.ok(out.includes("Environment context you are running in:"));
  assert.ok(!out.includes("Here is some useful information"));
});

test("replace_text allOccurrences=true replaces every hit", () => {
  const text = "X X X";
  const result = runPipeline(bodyWithSystem([{ type: "text", text }]), [
    { kind: "replace_text", match: "X", replacement: "Y", allOccurrences: true },
  ]);
  assert.equal((result.body.system as any[])[0].text, "Y Y Y");
});

// ── Op: replace_regex ──────────────────────────────────────────────────────

test("replace_regex handles flags and patterns", () => {
  const text = "foo bar foo BAR";
  const result = runPipeline(bodyWithSystem([{ type: "text", text }]), [
    { kind: "replace_regex", pattern: "foo", flags: "gi", replacement: "baz" },
  ]);
  assert.equal((result.body.system as any[])[0].text, "baz bar baz BAR");
});

test("replace_regex invalid pattern is a no-op", () => {
  const text = "stays.";
  const result = runPipeline(bodyWithSystem([{ type: "text", text }]), [
    { kind: "replace_regex", pattern: "[invalid(", replacement: "X" },
  ]);
  assert.equal((result.body.system as any[])[0].text, text);
});

// ── Op: drop_block_if_contains ─────────────────────────────────────────────

test("drop_block_if_contains drops entire matching blocks", () => {
  const body = bodyWithSystem([
    { type: "text", text: "block A keep" },
    { type: "text", text: "block B drop github.com/anomalyco/opencode" },
    { type: "text", text: "block C keep" },
  ]);
  const result = runPipeline(body, [
    { kind: "drop_block_if_contains", needles: ["github.com/anomalyco/opencode"] },
  ]);
  const blocks = result.body.system as any[];
  assert.equal(blocks.length, 2);
  assert.equal(blocks[0].text, "block A keep");
  assert.equal(blocks[1].text, "block C keep");
});

// ── Op: prepend_system_block ───────────────────────────────────────────────

test("prepend_system_block adds identity at position [0]", () => {
  const result = runPipeline(bodyWithSystem([{ type: "text", text: "body" }]), [
    { kind: "prepend_system_block", text: CLAUDE_AGENT_SDK_IDENTITY },
  ]);
  const blocks = result.body.system as any[];
  assert.equal(blocks[0].text, CLAUDE_AGENT_SDK_IDENTITY);
  assert.equal(blocks[1].text, "body");
});

test("prepend_system_block is idempotent when first block already matches", () => {
  const body = bodyWithSystem([
    { type: "text", text: CLAUDE_AGENT_SDK_IDENTITY },
    { type: "text", text: "body" },
  ]);
  const result = runPipeline(body, [
    { kind: "prepend_system_block", text: CLAUDE_AGENT_SDK_IDENTITY },
  ]);
  const blocks = result.body.system as any[];
  assert.equal(blocks.length, 2);
  assert.equal(blocks[0].text, CLAUDE_AGENT_SDK_IDENTITY);
});

// ── Op: append_system_block ────────────────────────────────────────────────

test("append_system_block adds to end and stays idempotent", () => {
  const body = bodyWithSystem([{ type: "text", text: "body" }]);
  const op = { kind: "append_system_block", text: "trailer" } as const;
  let result = runPipeline(body, [op]);
  result = runPipeline(result.body, [op]);
  const blocks = result.body.system as any[];
  assert.equal(blocks.length, 2);
  assert.equal(blocks[1].text, "trailer");
});

// ── Op: inject_billing_header ──────────────────────────────────────────────

test("inject_billing_header builds ex-machina sdk-cli header at [0]", () => {
  const body = bodyWithSystem([{ type: "text", text: "body" }], "user prompt here");
  const result = runPipeline(body, [
    {
      kind: "inject_billing_header",
      entrypoint: "sdk-cli",
      versionFormat: "ex-machina",
      cchAlgo: "sha256-first-user",
    },
  ]);
  const blocks = result.body.system as any[];
  assert.equal(blocks[0].type, "text");
  assert.match(
    blocks[0].text,
    /^x-anthropic-billing-header: cc_version=\d+\.\d+\.\d+\.[0-9a-f]{3}; cc_entrypoint=sdk-cli; cch=[0-9a-f]{5};$/
  );
});

test("inject_billing_header is idempotent — replaces existing header in place", () => {
  const body = bodyWithSystem([{ type: "text", text: "body" }], "p1");
  const op = {
    kind: "inject_billing_header",
    entrypoint: "sdk-cli",
    versionFormat: "ex-machina",
    cchAlgo: "sha256-first-user",
  } as const;
  const first = runPipeline(body, [op]);
  const second = runPipeline(first.body, [op]);
  const blocks = second.body.system as any[];
  const headerCount = blocks.filter(
    (b: any) => typeof b.text === "string" && b.text.startsWith("x-anthropic-billing-header:")
  ).length;
  assert.equal(headerCount, 1);
});

test("inject_billing_header skips when no user message present", () => {
  const result = applyCcBridgeTransformPipeline(
    { messages: [], system: [{ type: "text", text: "body" }] } as any,
    {
      enabled: true,
      pipeline: [
        {
          kind: "inject_billing_header",
          entrypoint: "sdk-cli",
          versionFormat: "ex-machina",
          cchAlgo: "sha256-first-user",
        },
      ],
    }
  );
  const blocks = result.body.system as any[];
  assert.equal(blocks[0].text, "body");
});

test("inject_billing_header xxhash64-body uses 00000 placeholder", () => {
  const result = runPipeline(bodyWithSystem([{ type: "text", text: "body" }], "user"), [
    {
      kind: "inject_billing_header",
      entrypoint: "cli",
      versionFormat: "omniroute-daystamp",
      cchAlgo: "xxhash64-body",
    },
  ]);
  const blocks = result.body.system as any[];
  assert.match(blocks[0].text, /cch=00000;$/);
  assert.match(blocks[0].text, /cc_entrypoint=cli;/);
});

// ── Algorithm primitives ───────────────────────────────────────────────────

test("extractFirstUserMessageText handles string and block content", () => {
  assert.equal(extractFirstUserMessageText([{ role: "user", content: "hello" }] as any), "hello");
  assert.equal(
    extractFirstUserMessageText([
      { role: "system", content: "ignore" } as any,
      { role: "user", content: [{ type: "text", text: "world" }] as any },
    ]),
    "world"
  );
  assert.equal(extractFirstUserMessageText([] as any), "");
});

test("computeCchSha256FirstUser yields 5-hex digest", () => {
  const hex = computeCchSha256FirstUser("hello");
  assert.match(hex, /^[0-9a-f]{5}$/);
});

test("computeExMachinaVersionSuffix yields 3-hex digest", () => {
  const hex = computeExMachinaVersionSuffix(
    "the quick brown fox jumps",
    DEFAULT_CLAUDE_CODE_VERSION
  );
  assert.match(hex, /^[0-9a-f]{3}$/);
});

test("computeDaystampVersionSuffix yields 3-hex digest", () => {
  const hex = computeDaystampVersionSuffix(
    DEFAULT_CLAUDE_CODE_VERSION,
    new Date("2026-05-15T00:00:00Z")
  );
  assert.match(hex, /^[0-9a-f]{3}$/);
});

test("buildBillingHeaderValue produces the expected ex-machina format", () => {
  const value = buildBillingHeaderValue([{ role: "user", content: "hello" }] as any, {
    entrypoint: "sdk-cli",
    versionFormat: "ex-machina",
    cchAlgo: "sha256-first-user",
  });
  assert.match(
    value,
    /^x-anthropic-billing-header: cc_version=2\.1\.137\.[0-9a-f]{3}; cc_entrypoint=sdk-cli; cch=[0-9a-f]{5};$/
  );
});

// ── Disabled config short-circuits ─────────────────────────────────────────

test("applyCcBridgeTransformPipeline does nothing when config.enabled=false", () => {
  const body = bodyWithSystem([{ type: "text", text: "body" }]);
  const result = applyCcBridgeTransformPipeline(body, {
    enabled: false,
    pipeline: DEFAULT_CC_BRIDGE_PIPELINE,
  });
  assert.equal(result.appliedOpKinds.length, 0);
  assert.equal((result.body.system as any[])[0].text, "body");
});

// ── Singleton config getters/setters ───────────────────────────────────────

test("setCcBridgeTransformsConfig swaps the runtime config; reset restores defaults", () => {
  setCcBridgeTransformsConfig({ enabled: false, pipeline: [] });
  assert.equal(getCcBridgeTransformsConfig().enabled, false);
  resetCcBridgeTransformsConfig();
  assert.equal(getCcBridgeTransformsConfig().enabled, true);
});

// ── Pipeline ordering ──────────────────────────────────────────────────────

test("pipeline ordering is preserved — replace runs before drop", () => {
  const body = bodyWithSystem([{ type: "text", text: "X" }]);
  const result = runPipeline(body, [
    { kind: "replace_text", match: "X", replacement: "github.com/anomalyco/opencode" },
    { kind: "drop_paragraph_if_contains", needles: ["github.com/anomalyco/opencode"] },
  ]);
  const blocks = result.body.system as any[];
  assert.equal(blocks.length, 0);
});

// ── End-to-end: T4-200 fixture layout ──────────────────────────────────────

test("DEFAULT_CC_BRIDGE_PIPELINE produces T4-200 fixture shape on verbatim OpenCode prompt", () => {
  // Verbatim phrase from issue #2260 — the v1.7.5 trigger.
  const fingerprintPhrase =
    "Here is some useful information about the environment you are running in:";
  const openCodePrompt = [
    "You are OpenCode, a coding assistant.",
    "See github.com/anomalyco/opencode for details.",
    fingerprintPhrase,
    "Working directory: /home/dev",
    "If OpenCode honestly cannot find the answer, say so.",
  ].join("\n\n");

  const body = {
    model: "claude-opus-4-7",
    messages: [{ role: "user", content: [{ type: "text", text: "Say OK." }] }],
    system: [
      { type: "text", text: openCodePrompt },
      { type: "text", text: "Memory protocol block." },
      { type: "text", text: "Browser MCP block." },
    ],
  };

  const result = applyCcBridgeTransformPipeline(body as any, {
    enabled: true,
    pipeline: DEFAULT_CC_BRIDGE_PIPELINE,
  });
  const blocks = result.body.system as any[];

  // Layout: [billing][identity][sanitized][memory][browser]
  assert.equal(blocks.length, 5, "expected 5 system blocks");
  assert.ok(blocks[0].text.startsWith("x-anthropic-billing-header:"));
  assert.equal(blocks[1].text, CLAUDE_AGENT_SDK_IDENTITY);

  const sanitized = blocks[2].text as string;
  assert.ok(!sanitized.includes("You are OpenCode"), "identity paragraph should be dropped");
  assert.ok(
    !sanitized.includes("github.com/anomalyco/opencode"),
    "anchor paragraph should be dropped"
  );
  assert.ok(!sanitized.includes(fingerprintPhrase), "v1.7.5 phrase should be replaced");
  assert.ok(
    sanitized.includes("Environment context you are running in:"),
    "replacement phrase should be present"
  );
  assert.ok(
    sanitized.includes("Working directory: /home/dev"),
    "non-fingerprint content preserved"
  );

  assert.equal(blocks[3].text, "Memory protocol block.");
  assert.equal(blocks[4].text, "Browser MCP block.");

  // Pipeline reports every op ran.
  assert.equal(result.appliedOpKinds.length, DEFAULT_CC_BRIDGE_PIPELINE.length);
});

// ── String system field normalization ──────────────────────────────────────

test("string system field is normalized to a single text block before transforms", () => {
  const body = {
    model: "claude-opus-4-7",
    messages: [{ role: "user", content: "hi" }],
    system: "raw string system",
  };
  const result = runPipeline(body as any, [{ kind: "prepend_system_block", text: "PREFIX" }]);
  const blocks = result.body.system as any[];
  assert.equal(blocks[0].text, "PREFIX");
  assert.equal(blocks[1].text, "raw string system");
});

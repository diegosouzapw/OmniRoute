import test from "node:test";
import assert from "node:assert/strict";

const {
  applySystemTransformPipeline,
  applyTransformPipeline,
  setSystemTransformsConfig,
  resetSystemTransformsConfig,
  getSystemTransformsConfig,
  DEFAULT_SYSTEM_TRANSFORMS_CONFIG,
  DEFAULT_CLAUDE_PIPELINE,
  DEFAULT_CC_BRIDGE_PROVIDER_PIPELINE,
  DEFAULT_OBFUSCATE_WORDS,
  OPENWEBUI_PARAGRAPH_ANCHORS,
  OPENWEBUI_IDENTITY_PREFIXES,
  PROVIDER_CLAUDE,
  PROVIDER_CC_BRIDGE,
} = await import("../../open-sse/services/systemTransforms.ts");

const ZWJ = "\u200d";

// ────────────────────────────────────────────────────────────────────────────
// Defaults
// ────────────────────────────────────────────────────────────────────────────

test("defaults: PROVIDER_CLAUDE and PROVIDER_CC_BRIDGE keys are present", () => {
  assert.equal(PROVIDER_CLAUDE, "claude");
  assert.equal(PROVIDER_CC_BRIDGE, "anthropic-compatible-cc");
  assert.ok(DEFAULT_SYSTEM_TRANSFORMS_CONFIG.providers[PROVIDER_CLAUDE]);
  assert.ok(DEFAULT_SYSTEM_TRANSFORMS_CONFIG.providers[PROVIDER_CC_BRIDGE]);
});

test("defaults: claude pipeline omits inject_billing_header", () => {
  const kinds = DEFAULT_CLAUDE_PIPELINE.map((op: { kind: string }) => op.kind);
  assert.ok(!kinds.includes("inject_billing_header"));
  // It does include obfuscate_words and paragraph drops.
  assert.ok(kinds.includes("obfuscate_words"));
  assert.ok(kinds.includes("drop_paragraph_if_contains"));
});

test("defaults: CC bridge provider pipeline keeps inject_billing_header", () => {
  const kinds = DEFAULT_CC_BRIDGE_PROVIDER_PIPELINE.map((op: { kind: string }) => op.kind);
  assert.ok(kinds.includes("inject_billing_header"));
  assert.ok(kinds.includes("prepend_system_block"));
  // And layers Open WebUI obfuscation on top.
  assert.ok(kinds.includes("obfuscate_words"));
});

test("defaults: obfuscate_words list includes legacy + OpenWebUI words", () => {
  assert.ok(DEFAULT_OBFUSCATE_WORDS.includes("opencode"));
  assert.ok(DEFAULT_OBFUSCATE_WORDS.includes("cline"));
  assert.ok(DEFAULT_OBFUSCATE_WORDS.includes("openwebui"));
  assert.ok(DEFAULT_OBFUSCATE_WORDS.includes("open-webui"));
});

test("defaults: OpenWebUI anchors include canonical URLs", () => {
  assert.ok(OPENWEBUI_PARAGRAPH_ANCHORS.includes("github.com/open-webui/open-webui"));
  assert.ok(OPENWEBUI_PARAGRAPH_ANCHORS.includes("openwebui.com"));
  assert.ok(OPENWEBUI_IDENTITY_PREFIXES.includes("You are Open WebUI"));
});

// ────────────────────────────────────────────────────────────────────────────
// obfuscate_words op
// ────────────────────────────────────────────────────────────────────────────

test("obfuscate_words inserts ZWJ in system text blocks", () => {
  const body = {
    system: [{ type: "text", text: "Built on opencode framework." }],
    messages: [{ role: "user", content: "hi" }],
  };
  applyTransformPipeline(body, [
    { kind: "obfuscate_words", words: ["opencode"], targets: ["system"] },
  ]);
  const text = (body.system[0] as { text: string }).text;
  assert.ok(text.includes(`o${ZWJ}pencode`));
  assert.ok(!text.includes(" opencode ") || text.includes(`o${ZWJ}pencode`));
});

test("obfuscate_words handles string system field", () => {
  const body = {
    system: "I work with opencode daily.",
    messages: [{ role: "user", content: "hi" }],
  };
  applyTransformPipeline(body, [{ kind: "obfuscate_words", words: ["opencode"] }]);
  assert.ok((body.system as string).includes(`o${ZWJ}pencode`));
});

test("obfuscate_words respects targets — messages only", () => {
  const body = {
    system: [{ type: "text", text: "opencode is here" }],
    messages: [{ role: "user", content: "opencode rocks" }],
    tools: [{ description: "opencode tool" }],
  };
  applyTransformPipeline(body, [
    { kind: "obfuscate_words", words: ["opencode"], targets: ["messages"] },
  ]);
  // System untouched
  assert.equal((body.system[0] as { text: string }).text, "opencode is here");
  // Messages obfuscated
  assert.ok((body.messages[0].content as string).includes(`o${ZWJ}pencode`));
  // Tools untouched
  assert.equal((body.tools[0] as { description: string }).description, "opencode tool");
});

test("obfuscate_words walks tool descriptions (description + function.description)", () => {
  const body = {
    system: [],
    messages: [{ role: "user", content: "hi" }],
    tools: [{ description: "uses opencode" }, { function: { description: "uses open-webui" } }],
  };
  applyTransformPipeline(body, [
    { kind: "obfuscate_words", words: ["opencode", "open-webui"], targets: ["tools"] },
  ]);
  assert.ok((body.tools[0] as { description: string }).description.includes(`o${ZWJ}pencode`));
  assert.ok(
    (body.tools[1] as { function: { description: string } }).function.description.includes(
      `o${ZWJ}pen-webui`
    )
  );
});

test("obfuscate_words is case-insensitive and applies to all targets by default", () => {
  const body = {
    system: [{ type: "text", text: "OpenCode is great" }],
    messages: [{ role: "user", content: "I love OPENCODE" }],
  };
  applyTransformPipeline(body, [{ kind: "obfuscate_words", words: ["opencode"] }]);
  const sys = (body.system[0] as { text: string }).text;
  const msg = body.messages[0].content as string;
  assert.ok(sys.includes(`O${ZWJ}penCode`));
  assert.ok(msg.includes(`O${ZWJ}PENCODE`));
});

test("obfuscate_words with empty list is a no-op", () => {
  const body = {
    system: [{ type: "text", text: "opencode" }],
    messages: [{ role: "user", content: "hi" }],
  };
  applyTransformPipeline(body, [{ kind: "obfuscate_words", words: [] }]);
  assert.equal((body.system[0] as { text: string }).text, "opencode");
});

// ────────────────────────────────────────────────────────────────────────────
// Pipeline ordering: drop paragraph then obfuscate what survives
// ────────────────────────────────────────────────────────────────────────────

test("pipeline ordering: drop_paragraph_if_contains runs before obfuscate_words", () => {
  const body = {
    system: [
      {
        type: "text",
        text: "See github.com/open-webui/open-webui\n\nI use openwebui for chat.\n\nAlso try opencode.",
      },
    ],
    messages: [{ role: "user", content: "hi" }],
  };
  applyTransformPipeline(body, [
    {
      kind: "drop_paragraph_if_contains",
      needles: ["github.com/open-webui/open-webui"],
    },
    { kind: "obfuscate_words", words: ["openwebui", "opencode"], targets: ["system"] },
  ]);
  const out = (body.system[0] as { text: string }).text;
  assert.ok(!out.includes("github.com/open-webui/open-webui"));
  assert.ok(out.includes(`o${ZWJ}penwebui`));
  assert.ok(out.includes(`o${ZWJ}pencode`));
});

// ────────────────────────────────────────────────────────────────────────────
// Per-provider routing
// ────────────────────────────────────────────────────────────────────────────

test("applySystemTransformPipeline: provider not configured → no-op", () => {
  const body = {
    system: [{ type: "text", text: "opencode" }],
    messages: [{ role: "user", content: "hi" }],
  };
  const before = JSON.stringify(body);
  const result = applySystemTransformPipeline("gemini", body, {
    providers: { gemini: { enabled: false, pipeline: [] } },
  });
  assert.equal(result.appliedOpKinds.length, 0);
  assert.equal(JSON.stringify(body), before);
});

test("applySystemTransformPipeline: claude provider runs its default pipeline", () => {
  // Two paragraphs: first contains the OpenWebUI anchor (drop target),
  // second contains a survivable opencode reference (ZWJ target).
  const body = {
    system: [
      {
        type: "text",
        text: "See docs at github.com/open-webui/open-webui\n\nI am opencode helper.",
      },
    ],
    messages: [{ role: "user", content: "hi" }],
  };
  // Enable the claude provider explicitly for this test (default is opt-in/disabled).
  const cfg = {
    providers: {
      ...DEFAULT_SYSTEM_TRANSFORMS_CONFIG.providers,
      [PROVIDER_CLAUDE]: {
        enabled: true,
        pipeline: DEFAULT_SYSTEM_TRANSFORMS_CONFIG.providers[PROVIDER_CLAUDE].pipeline,
      },
    },
  };
  const result = applySystemTransformPipeline(PROVIDER_CLAUDE, body, cfg);
  const blocks = body.system as Array<{ text: string }>;
  assert.ok(blocks.length >= 1);
  const out = blocks[0].text;
  // Open WebUI anchor paragraph dropped
  assert.ok(!out.includes("github.com/open-webui/open-webui"));
  // ZWJ inserted on opencode
  assert.ok(out.includes(`o${ZWJ}pencode`));
  // No billing header injected (native does that)
  assert.ok(!result.appliedOpKinds.includes("inject_billing_header"));
});

test("applySystemTransformPipeline: anthropic-compatible-cc-* falls back to PROVIDER_CC_BRIDGE config", () => {
  const body = {
    system: [{ type: "text", text: "I am OpenCode\n\nThird-party agent" }],
    messages: [{ role: "user", content: "hello world" }],
  };
  const result = applySystemTransformPipeline(
    "anthropic-compatible-cc-claude-opus-4-7",
    body,
    DEFAULT_SYSTEM_TRANSFORMS_CONFIG
  );
  // Full CC bridge pipeline ran → billing header injected at [0]
  assert.ok(result.appliedOpKinds.includes("inject_billing_header"));
  const blocks = body.system as Array<{ text: string }>;
  assert.ok(blocks[0].text.startsWith("x-anthropic-billing-header:"));
});

// ────────────────────────────────────────────────────────────────────────────
// OpenWebUI fixture — the headline bug from issue #2260 comment 4459544580
// ────────────────────────────────────────────────────────────────────────────

test("OpenWebUI fixture: claude provider drops anchor + obfuscates 'openwebui' word", () => {
  const body = {
    system: [
      {
        type: "text",
        text: "You are Open WebUI assistant.\n\nDocumentation at github.com/open-webui/open-webui.\n\nThis agent uses openwebui to render messages.",
      },
    ],
    messages: [{ role: "user", content: "Tell me about open-webui" }],
  };
  // Enable the claude provider explicitly for this test (default is opt-in/disabled).
  const cfg = {
    providers: {
      ...DEFAULT_SYSTEM_TRANSFORMS_CONFIG.providers,
      [PROVIDER_CLAUDE]: {
        enabled: true,
        pipeline: DEFAULT_SYSTEM_TRANSFORMS_CONFIG.providers[PROVIDER_CLAUDE].pipeline,
      },
    },
  };
  applySystemTransformPipeline(PROVIDER_CLAUDE, body, cfg);
  const sysText = (body.system[0] as { text: string }).text;
  // "You are Open WebUI" identity paragraph dropped
  assert.ok(!sysText.includes("You are Open WebUI assistant"));
  // github.com/open-webui/open-webui anchor paragraph dropped
  assert.ok(!sysText.includes("github.com/open-webui/open-webui"));
  // remaining word "openwebui" ZWJ-obfuscated
  assert.ok(sysText.includes(`o${ZWJ}penwebui`));
  // Messages also obfuscated by default targets
  assert.ok((body.messages[0].content as string).includes(`o${ZWJ}pen-webui`));
});

// ────────────────────────────────────────────────────────────────────────────
// Disabled provider → pass-through
// ────────────────────────────────────────────────────────────────────────────

test("provider with enabled=false is a pass-through (opt-in posture)", () => {
  const body = {
    system: [{ type: "text", text: "opencode here" }],
    messages: [{ role: "user", content: "hi" }],
  };
  const before = JSON.stringify(body);
  const result = applySystemTransformPipeline(PROVIDER_CLAUDE, body, {
    providers: {
      [PROVIDER_CLAUDE]: { enabled: false, pipeline: DEFAULT_CLAUDE_PIPELINE },
    },
  });
  assert.equal(result.appliedOpKinds.length, 0);
  assert.equal(JSON.stringify(body), before);
});

// ────────────────────────────────────────────────────────────────────────────
// Legacy migration shim
// ────────────────────────────────────────────────────────────────────────────

test("setSystemTransformsConfig migrates legacy { enabled, pipeline } into providers[CC_BRIDGE]", () => {
  setSystemTransformsConfig({
    enabled: true,
    pipeline: [
      {
        kind: "replace_text",
        match: "legacy-key-marker",
        replacement: "rewritten",
        allOccurrences: true,
      },
    ],
  });
  const cfg = getSystemTransformsConfig();
  const cc = cfg.providers[PROVIDER_CC_BRIDGE];
  assert.ok(cc);
  assert.equal(cc.enabled, true);
  // The custom pipeline is now under the CC bridge provider
  const hasMarker = cc.pipeline.some(
    (op: { kind: string; match?: string }) =>
      op.kind === "replace_text" && op.match === "legacy-key-marker"
  );
  assert.ok(hasMarker);
  // Other providers still come from defaults (claude pipeline preserved)
  assert.ok(cfg.providers[PROVIDER_CLAUDE]);
  resetSystemTransformsConfig();
});

test("setSystemTransformsConfig accepts per-provider shape and merges defaults for unset providers", () => {
  setSystemTransformsConfig({
    providers: {
      gemini: {
        enabled: true,
        pipeline: [{ kind: "obfuscate_words", words: ["gemini-cli"] }],
      },
    },
  });
  const cfg = getSystemTransformsConfig();
  assert.ok(cfg.providers.gemini);
  assert.equal(cfg.providers.gemini.enabled, true);
  // Defaults still present for unset providers (no regression for claude/cc).
  assert.ok(cfg.providers[PROVIDER_CLAUDE]);
  assert.ok(cfg.providers[PROVIDER_CC_BRIDGE]);
  resetSystemTransformsConfig();
});

test("setSystemTransformsConfig(null) resets to defaults", () => {
  setSystemTransformsConfig({
    providers: { custom: { enabled: true, pipeline: [] } },
  });
  setSystemTransformsConfig(null);
  const cfg = getSystemTransformsConfig();
  // Defaults restored — `custom` key dropped.
  assert.ok(!cfg.providers.custom);
  assert.ok(cfg.providers[PROVIDER_CLAUDE]);
  assert.ok(cfg.providers[PROVIDER_CC_BRIDGE]);
  resetSystemTransformsConfig();
});

// ────────────────────────────────────────────────────────────────────────────
// Idempotency
// ────────────────────────────────────────────────────────────────────────────

test("idempotency: obfuscate_words running twice does not double-ZWJ", () => {
  const body = {
    system: [{ type: "text", text: "opencode here" }],
    messages: [{ role: "user", content: "hi" }],
  };
  applyTransformPipeline(body, [
    { kind: "obfuscate_words", words: ["opencode"], targets: ["system"] },
  ]);
  const once = (body.system[0] as { text: string }).text;
  applyTransformPipeline(body, [
    { kind: "obfuscate_words", words: ["opencode"], targets: ["system"] },
  ]);
  const twice = (body.system[0] as { text: string }).text;
  // Second pass cannot find "opencode" — the ZWJ broke it — so no further change.
  assert.equal(once, twice);
});

test("idempotency: full claude pipeline running twice does not duplicate blocks", () => {
  const body = {
    system: [
      {
        type: "text",
        text: "You are Open WebUI helper.\n\nopenwebui is the platform.",
      },
    ],
    messages: [{ role: "user", content: "hi" }],
  };
  applySystemTransformPipeline(PROVIDER_CLAUDE, body, DEFAULT_SYSTEM_TRANSFORMS_CONFIG);
  const onceLen = (body.system as Array<unknown>).length;
  applySystemTransformPipeline(PROVIDER_CLAUDE, body, DEFAULT_SYSTEM_TRANSFORMS_CONFIG);
  const twiceLen = (body.system as Array<unknown>).length;
  assert.equal(onceLen, twiceLen);
});

// ────────────────────────────────────────────────────────────────────────────
// UI ↔ server defaults parity
// ────────────────────────────────────────────────────────────────────────────
//
// The Settings UI keeps a hand-maintained mirror of DEFAULT_SYSTEM_TRANSFORMS_CONFIG
// in src/app/(dashboard)/dashboard/settings/components/RoutingTab.tsx so it can
// render + reset to defaults without a server roundtrip. The snapshot below is
// the contract between server and UI — if it drifts, both must be updated in
// the same commit.

const UI_DEFAULTS_SNAPSHOT = {
  providers: {
    claude: {
      enabled: false,
      pipeline: [
        {
          kind: "drop_paragraph_if_contains",
          needles: ["github.com/open-webui/open-webui", "openwebui.com", "docs.openwebui.com"],
        },
        {
          kind: "drop_paragraph_if_starts_with",
          prefixes: ["You are Open WebUI"],
        },
        {
          kind: "obfuscate_words",
          words: [
            "opencode",
            "open-code",
            "cline",
            "roo-cline",
            "roo_cline",
            "cursor",
            "windsurf",
            "aider",
            "continue.dev",
            "copilot",
            "avante",
            "codecompanion",
            "openwebui",
            "open-webui",
          ],
          targets: ["system", "messages", "tools"],
        },
      ],
    },
    "anthropic-compatible-cc": {
      enabled: true,
      pipeline: [
        {
          kind: "drop_paragraph_if_contains",
          needles: ["github.com/open-webui/open-webui", "openwebui.com", "docs.openwebui.com"],
        },
        {
          kind: "drop_paragraph_if_starts_with",
          prefixes: ["You are Open WebUI"],
        },
        {
          kind: "obfuscate_words",
          words: ["openwebui", "open-webui"],
          targets: ["system", "messages", "tools"],
        },
        {
          kind: "drop_paragraph_if_contains",
          needles: [
            "github.com/anomalyco/opencode",
            "opencode.ai/docs",
            "github.com/cline/cline",
            "github.com/getcursor/cursor",
            "continue.dev",
          ],
        },
        {
          kind: "drop_paragraph_if_starts_with",
          prefixes: ["You are OpenCode"],
        },
        {
          kind: "replace_text",
          match: "if OpenCode honestly",
          replacement: "if the assistant honestly",
          allOccurrences: true,
        },
        {
          kind: "replace_text",
          match: "Here is some useful information about the environment you are running in:",
          replacement: "Environment context you are running in:",
          allOccurrences: true,
        },
        {
          kind: "prepend_system_block",
          text: "You are a Claude agent, built on Anthropic's Claude Agent SDK.",
          idempotencyKey: "claude-agent-sdk-identity",
        },
        {
          kind: "inject_billing_header",
          entrypoint: "sdk-cli",
          versionFormat: "ex-machina",
          cchAlgo: "sha256-first-user",
        },
      ],
    },
  },
};

test("defaults parity: DEFAULT_SYSTEM_TRANSFORMS_CONFIG matches the UI mirror snapshot", () => {
  assert.deepEqual(
    JSON.parse(JSON.stringify(DEFAULT_SYSTEM_TRANSFORMS_CONFIG)),
    UI_DEFAULTS_SNAPSHOT,
    "Server DEFAULT_SYSTEM_TRANSFORMS_CONFIG drifted from the UI mirror in " +
      "src/app/(dashboard)/dashboard/settings/components/RoutingTab.tsx " +
      "(DEFAULT_SYSTEM_TRANSFORMS_CLIENT). Update both in the same commit."
  );
});

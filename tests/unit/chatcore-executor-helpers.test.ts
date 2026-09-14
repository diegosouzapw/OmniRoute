import test from "node:test";
import assert from "node:assert/strict";

import {
  resolveAccountSemaphoreKey,
  resolveAccountSemaphoreAccountKey,
  resolveAccountSemaphoreMaxConcurrency,
  buildClaudePromptCacheLogMeta,
} from "../../open-sse/handlers/chatCore/executorHelpers.ts";
import { FORMATS } from "../../open-sse/translator/formats.ts";

test("resolveAccountSemaphoreAccountKey prefers an explicit non-blank connectionId", () => {
  assert.equal(resolveAccountSemaphoreAccountKey("conn-1", { id: "ignored" }), "conn-1");
});

test("resolveAccountSemaphoreAccountKey falls back through credential candidates in order", () => {
  // blank connectionId -> first non-blank candidate (connectionId field) wins
  assert.equal(
    resolveAccountSemaphoreAccountKey("  ", { connectionId: "cred-conn", id: "id-x" }),
    "cred-conn"
  );
  // candidate order: connectionId, id, email, name, displayName
  assert.equal(resolveAccountSemaphoreAccountKey(null, { id: "  id-x  " }), "id-x");
  assert.equal(resolveAccountSemaphoreAccountKey(null, { email: "a@b.co" }), "a@b.co");
  assert.equal(resolveAccountSemaphoreAccountKey(null, { name: "the-name" }), "the-name");
  assert.equal(resolveAccountSemaphoreAccountKey(null, { displayName: "Disp" }), "Disp");
});

test("resolveAccountSemaphoreAccountKey returns null when nothing usable is present", () => {
  assert.equal(resolveAccountSemaphoreAccountKey(null, null), null);
  assert.equal(resolveAccountSemaphoreAccountKey(undefined, undefined), null);
  assert.equal(resolveAccountSemaphoreAccountKey("", {}), null);
  // non-string / blank candidates are all rejected
  assert.equal(
    resolveAccountSemaphoreAccountKey("", { id: 123, email: "   " } as unknown as Record<
      string,
      unknown
    >),
    null
  );
});

test("resolveAccountSemaphoreMaxConcurrency parses finite numbers and numeric strings", () => {
  // number passthrough
  assert.equal(resolveAccountSemaphoreMaxConcurrency({ maxConcurrent: 4 }), 4);
  assert.equal(resolveAccountSemaphoreMaxConcurrency({ maxConcurrent: 0 }), 0);
  assert.equal(resolveAccountSemaphoreMaxConcurrency({ maxConcurrent: -2 }), -2);
  // numeric string is coerced
  assert.equal(resolveAccountSemaphoreMaxConcurrency({ maxConcurrent: "8" }), 8);
  assert.equal(resolveAccountSemaphoreMaxConcurrency({ maxConcurrent: " 3.5 " }), 3.5);
});

test("resolveAccountSemaphoreMaxConcurrency falls back to the fair-use default when unset/invalid", () => {
  // Unset or unusable connection values must NOT mean "uncapped" (that let a
  // single fan-out open unbounded upstream sockets). Default is 8; explicit
  // 0/negative still opts out (isBypassed treats <=0 as no gate).
  const prev = process.env.OMNIROUTE_DEFAULT_ACCOUNT_CONCURRENCY;
  delete process.env.OMNIROUTE_DEFAULT_ACCOUNT_CONCURRENCY;
  try {
    assert.equal(resolveAccountSemaphoreMaxConcurrency({}), 8);
    assert.equal(resolveAccountSemaphoreMaxConcurrency(null), 8);
    assert.equal(resolveAccountSemaphoreMaxConcurrency({ maxConcurrent: Infinity }), 8);
    assert.equal(resolveAccountSemaphoreMaxConcurrency({ maxConcurrent: NaN }), 8);
    assert.equal(resolveAccountSemaphoreMaxConcurrency({ maxConcurrent: "abc" }), 8);
    assert.equal(resolveAccountSemaphoreMaxConcurrency({ maxConcurrent: "" }), 8);
    assert.equal(resolveAccountSemaphoreMaxConcurrency({ maxConcurrent: "   " }), 8);
    assert.equal(
      resolveAccountSemaphoreMaxConcurrency({ maxConcurrent: true } as unknown as Record<
        string,
        unknown
      >),
      8
    );
    // explicit values (including the 0 opt-out) still win over the default
    assert.equal(resolveAccountSemaphoreMaxConcurrency({ maxConcurrent: 4 }), 4);
    assert.equal(resolveAccountSemaphoreMaxConcurrency({ maxConcurrent: 0 }), 0);
  } finally {
    if (prev === undefined) delete process.env.OMNIROUTE_DEFAULT_ACCOUNT_CONCURRENCY;
    else process.env.OMNIROUTE_DEFAULT_ACCOUNT_CONCURRENCY = prev;
  }
});

test("resolveAccountSemaphoreMaxConcurrency honors OMNIROUTE_DEFAULT_ACCOUNT_CONCURRENCY", () => {
  const prev = process.env.OMNIROUTE_DEFAULT_ACCOUNT_CONCURRENCY;
  try {
    process.env.OMNIROUTE_DEFAULT_ACCOUNT_CONCURRENCY = "16";
    assert.equal(resolveAccountSemaphoreMaxConcurrency({}), 16);
    assert.equal(resolveAccountSemaphoreMaxConcurrency({ maxConcurrent: 4 }), 4);
    // unusable env values fall back to the built-in default, never uncapped
    process.env.OMNIROUTE_DEFAULT_ACCOUNT_CONCURRENCY = "abc";
    assert.equal(resolveAccountSemaphoreMaxConcurrency({}), 8);
    process.env.OMNIROUTE_DEFAULT_ACCOUNT_CONCURRENCY = "0";
    assert.equal(resolveAccountSemaphoreMaxConcurrency({}), 8);
    process.env.OMNIROUTE_DEFAULT_ACCOUNT_CONCURRENCY = "-3";
    assert.equal(resolveAccountSemaphoreMaxConcurrency({}), 8);
  } finally {
    if (prev === undefined) delete process.env.OMNIROUTE_DEFAULT_ACCOUNT_CONCURRENCY;
    else process.env.OMNIROUTE_DEFAULT_ACCOUNT_CONCURRENCY = prev;
  }
});

test("resolveAccountSemaphoreKey builds provider:accountKey when both resolve", () => {
  assert.equal(
    resolveAccountSemaphoreKey({
      provider: "openai",
      model: "gpt-4o",
      connectionId: "conn-9",
      credentials: null,
    }),
    "openai:conn-9"
  );
  // accountKey can come from credentials when connectionId is blank
  assert.equal(
    resolveAccountSemaphoreKey({
      provider: "anthropic",
      model: "claude",
      connectionId: null,
      credentials: { email: "user@x.io" },
    }),
    "anthropic:user@x.io"
  );
});

test("resolveAccountSemaphoreKey returns null without a provider or account key", () => {
  // no account key resolvable
  assert.equal(
    resolveAccountSemaphoreKey({
      provider: "openai",
      model: "m",
      connectionId: null,
      credentials: null,
    }),
    null
  );
  // account key resolves but provider missing
  assert.equal(
    resolveAccountSemaphoreKey({
      provider: null,
      model: "m",
      connectionId: "conn",
      credentials: null,
    }),
    null
  );
  assert.equal(
    resolveAccountSemaphoreKey({
      provider: "",
      model: "m",
      connectionId: "conn",
      credentials: null,
    }),
    null
  );
});

test("buildClaudePromptCacheLogMeta returns null for non-Claude format or non-object body", () => {
  assert.equal(buildClaudePromptCacheLogMeta(FORMATS.OPENAI, { system: [] }, null), null);
  assert.equal(buildClaudePromptCacheLogMeta(FORMATS.CLAUDE, null, null), null);
  assert.equal(
    buildClaudePromptCacheLogMeta(FORMATS.CLAUDE, "x" as unknown as Record<string, unknown>, null),
    null
  );
});

test("buildClaudePromptCacheLogMeta returns null when there are no breakpoints and no beta header", () => {
  const body = {
    system: [{ text: "plain system, no cache_control" }],
    tools: [{ name: "t1" }],
    messages: [{ role: "user", content: [{ type: "text", text: "hi" }] }],
  };
  assert.equal(buildClaudePromptCacheLogMeta(FORMATS.CLAUDE, body, null), null);
});

test("buildClaudePromptCacheLogMeta counts cache_control breakpoints across system/tools/messages", () => {
  const body = {
    system: [
      { text: "billing", cache_control: { type: "ephemeral", ttl: "5m" } },
      // billing header lines are skipped entirely
      { text: "x-anthropic-billing-header: abc", cache_control: { type: "ephemeral" } },
    ],
    tools: [{ name: "lookup", cache_control: { type: "ephemeral" } }],
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "q", cache_control: { type: "ephemeral" } },
          { type: "text", text: "no cache here" },
        ],
      },
    ],
  };
  const meta = buildClaudePromptCacheLogMeta(FORMATS.CLAUDE, body, null);
  assert.ok(meta);
  // 1 system (the billing-header one is skipped) + 1 tool + 1 message = 3
  assert.equal(meta.totalBreakpoints, 3);
  assert.equal(meta.applied, true);
  assert.equal(meta.systemBreakpoints.length, 1);
  assert.equal(meta.systemBreakpoints[0].ttl, "5m");
  assert.equal(meta.systemBreakpoints[0].index, 0);
  assert.equal(meta.toolBreakpoints.length, 1);
  assert.equal(meta.toolBreakpoints[0].name, "lookup");
  assert.equal(meta.messageBreakpoints.length, 1);
  assert.equal(meta.messageBreakpoints[0].role, "user");
  assert.equal(meta.messageBreakpoints[0].blockType, "text");
  // default type when cache_control.type missing/blank is "ephemeral"
  assert.equal(meta.messageBreakpoints[0].type, "ephemeral");
});

test("buildClaudePromptCacheLogMeta surfaces the Anthropic-Beta header even with zero breakpoints", () => {
  const body = { system: [{ text: "plain" }] };
  // provider header present -> meta returned, applied=false (no breakpoints)
  const fromProvider = buildClaudePromptCacheLogMeta(FORMATS.CLAUDE, body, {
    "anthropic-beta": "prompt-caching-2024-07-31",
  });
  assert.ok(fromProvider);
  assert.equal(fromProvider.applied, false);
  assert.equal(fromProvider.totalBreakpoints, 0);
  assert.equal(fromProvider.anthropicBeta, "prompt-caching-2024-07-31");

  // falls back to client headers when provider header absent
  const fromClient = buildClaudePromptCacheLogMeta(
    FORMATS.CLAUDE,
    body,
    null,
    new Headers({ "Anthropic-Beta": "client-beta" })
  );
  assert.ok(fromClient);
  assert.equal(fromClient.anthropicBeta, "client-beta");
});

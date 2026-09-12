import { test } from "node:test";
import assert from "node:assert/strict";
import {
  applyOutputStyles,
  OUTPUT_STYLE_MARKER,
  resolveOutputStyleLanguage,
  type OutputStyleSelectionEntry,
} from "../../../open-sse/services/compression/outputStyles/apply.ts";

const sel = (...entries: Array<[string, "lite" | "full" | "ultra"]>): OutputStyleSelectionEntry[] =>
  entries.map(([id, level]) => ({ id, level }));

test("injects a system instruction with the unified marker", () => {
  const r = applyOutputStyles(
    { messages: [{ role: "user", content: "Summarize this API response." }] },
    sel(["terse-prose", "full"])
  );
  assert.equal(r.applied, true);
  assert.equal(r.body.messages?.at(-1)?.role, "system");
  assert.match(String(r.body.messages?.at(-1)?.content), new RegExp(escapeRe(OUTPUT_STYLE_MARKER)));
  assert.match(String(r.body.messages?.at(-1)?.content), /Respond terse/);
  assert.deepEqual(r.appliedStyles, [{ id: "terse-prose", level: "full" }]);
});

test("combines two styles in catalog order with a single shared boundary", () => {
  const r = applyOutputStyles(
    { messages: [{ role: "user", content: "Refactor this module." }] },
    sel(["less-code", "full"], ["terse-prose", "full"]) // requested out of order
  );
  const text = String(r.body.messages?.at(-1)?.content);
  // catalog order is terse-prose before less-code
  const proseAt = text.indexOf("Respond terse");
  const codeAt = text.indexOf("lazy senior dev");
  assert.ok(proseAt >= 0 && codeAt >= 0 && proseAt < codeAt, "catalog order");
  // SHARED_BOUNDARIES appears exactly once (appended once, not per style)
  const boundaryCount = (text.match(/Resume terse style after\./g) ?? []).length;
  assert.equal(boundaryCount, 1);
  assert.deepEqual(
    r.appliedStyles?.map((s) => s.id),
    ["terse-prose", "less-code"]
  );
});

test("appends to an existing system prompt", () => {
  const r = applyOutputStyles(
    {
      messages: [
        { role: "system", content: "Follow tenant policy." },
        { role: "user", content: "Summarize logs." },
      ],
    },
    sel(["terse-prose", "lite"])
  );
  assert.match(String(r.body.messages?.[0]?.content), /Follow tenant policy/);
  assert.match(String(r.body.messages?.[0]?.content), /Drop filler/);
});

test("idempotent: re-applying is a no-op", () => {
  const body = { messages: [{ role: "user", content: "Summarize logs." }] };
  const once = applyOutputStyles(body, sel(["terse-prose", "full"])).body;
  const twice = applyOutputStyles(once, sel(["terse-prose", "full"]));
  assert.equal(twice.applied, false);
  assert.equal(twice.skippedReason, "already_applied");
  const markerCount = (
    String(twice.body.messages?.at(-1)?.content).match(
      new RegExp(escapeRe(OUTPUT_STYLE_MARKER), "g")
    ) ?? []
  ).length;
  assert.equal(markerCount, 1);
});

test("content bypass is all-or-nothing across every selected style", () => {
  const r = applyOutputStyles(
    { messages: [{ role: "user", content: "Explain this security vulnerability in detail." }] },
    sel(["terse-prose", "full"], ["less-code", "full"])
  );
  assert.equal(r.applied, false);
  assert.equal(r.skippedReason, "security_warning");
  assert.equal(r.body.messages?.at(-1)?.role, "user"); // untouched
});

test("no styles selected → body untouched", () => {
  const body = { messages: [{ role: "user", content: "Tell me a joke." }] };
  const r = applyOutputStyles(body, []);
  assert.equal(r.applied, false);
  assert.equal(r.skippedReason, "no_styles");
  assert.equal(r.body.messages?.at(-1)?.content, "Tell me a joke.");
});

test("unknown style id is skipped, never throws", () => {
  const r = applyOutputStyles(
    { messages: [{ role: "user", content: "hi" }] },
    sel(["__nope__", "full"], ["terse-prose", "full"])
  );
  assert.equal(r.applied, true);
  assert.deepEqual(
    r.appliedStyles?.map((s) => s.id),
    ["terse-prose"]
  );
});

test("locale gate: terse-cjk only honored under zh", () => {
  const enOnly = applyOutputStyles(
    { messages: [{ role: "user", content: "hi" }] },
    sel(["terse-cjk", "full"]),
    "en"
  );
  assert.equal(enOnly.applied, false);
  assert.equal(enOnly.skippedReason, "no_styles");

  const zh = applyOutputStyles(
    { messages: [{ role: "user", content: "hi" }] },
    sel(["terse-cjk", "full"]),
    "zh"
  );
  assert.equal(zh.applied, true);
  assert.match(String(zh.body.messages?.at(-1)?.content), /文言/);
});

test("determinism: same (selection, language) yields byte-identical injected text", () => {
  const make = () =>
    applyOutputStyles(
      { messages: [{ role: "user", content: "do a thing" }] },
      sel(["terse-prose", "full"], ["less-code", "lite"])
    ).body.messages?.at(-1)?.content;
  assert.equal(make(), make());
});

test("Responses input (no messages) uses instructions field", () => {
  const r = applyOutputStyles(
    { input: [{ type: "message", role: "user", content: "Summarize logs." }] },
    sel(["terse-prose", "full"])
  );
  assert.equal(r.applied, true);
  assert.match(String(r.body.instructions), new RegExp(escapeRe(OUTPUT_STYLE_MARKER)));
  assert.ok(!("messages" in r.body));
});

test("terse-prose localizes per language (back-compat with the legacy caveman packs)", () => {
  // Regression guard: the legacy caveman output mode localized to en/pt-BR/ja/id; the
  // migrated terse-prose style must inject the SAME localized text, not fall back to English.
  const ptBR = applyOutputStyles(
    { messages: [{ role: "user", content: "Resuma os logs." }] },
    sel(["terse-prose", "lite"]),
    "pt-BR"
  );
  assert.match(String(ptBR.body.messages?.at(-1)?.content), /Responda conciso/);
  assert.doesNotMatch(String(ptBR.body.messages?.at(-1)?.content), /Respond concise/);

  const en = applyOutputStyles(
    { messages: [{ role: "user", content: "Summarize logs." }] },
    sel(["terse-prose", "lite"]),
    "en"
  );
  assert.match(String(en.body.messages?.at(-1)?.content), /Respond concise/);
});

function escapeRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

test("resolveOutputStyleLanguage: en when language support is disabled", () => {
  const body = { messages: [{ role: "user", content: "preciso de ajuda com o arquivo" }] };
  assert.equal(resolveOutputStyleLanguage(undefined, body), "en");
  assert.equal(
    resolveOutputStyleLanguage({ enabled: false, defaultLanguage: "pt-BR" }, body),
    "en"
  );
});

test("resolveOutputStyleLanguage: defaultLanguage when enabled without autoDetect", () => {
  const body = { messages: [{ role: "user", content: "hello there" }] };
  assert.equal(
    resolveOutputStyleLanguage({ enabled: true, autoDetect: false, defaultLanguage: "ru" }, body),
    "ru"
  );
});

test("resolveOutputStyleLanguage: detects the last user message language when autoDetect is on", () => {
  const de = {
    messages: [
      { role: "user", content: "ich habe eine datei mit einem fehler, kannst du bitte helfen" },
    ],
  };
  const ru = { messages: [{ role: "user", content: "мне нужно исправить ошибку в этом файле" }] };
  assert.equal(
    resolveOutputStyleLanguage({ enabled: true, autoDetect: true, defaultLanguage: "en" }, de),
    "de"
  );
  assert.equal(
    resolveOutputStyleLanguage({ enabled: true, autoDetect: true, defaultLanguage: "en" }, ru),
    "ru"
  );
});

test("resolveOutputStyleLanguage: falls back to defaultLanguage when there is no user text", () => {
  assert.equal(
    resolveOutputStyleLanguage(
      { enabled: true, autoDetect: true, defaultLanguage: "ja" },
      { messages: [] }
    ),
    "ja"
  );
});

test("resolveOutputStyleLanguage: samples array content parts for detection", () => {
  const body = {
    messages: [
      {
        role: "user",
        content: [{ type: "text", text: "necesito ayuda con este archivo, gracias" }],
      },
    ],
  };
  assert.equal(
    resolveOutputStyleLanguage({ enabled: true, autoDetect: true, defaultLanguage: "en" }, body),
    "es"
  );
});

test("Anthropic shape: merges into a top-level string system instead of messages[0]", () => {
  const r = applyOutputStyles(
    {
      system: "You are Claude Code.",
      messages: [{ role: "user", content: "Summarize this API response." }],
    },
    sel(["terse-prose", "full"])
  );
  assert.equal(r.applied, true);
  assert.match(String(r.body.system), /You are Claude Code\./);
  assert.match(String(r.body.system), new RegExp(escapeRe(OUTPUT_STYLE_MARKER)));
  assert.equal(r.body.messages?.length, 1);
  assert.equal(r.body.messages?.[0]?.role, "user");
});

test("Anthropic shape: appends a text block to a block-array system", () => {
  const baseBlock = {
    type: "text",
    text: "You are Claude Code.",
    cache_control: { type: "ephemeral" },
  };
  const r = applyOutputStyles(
    { system: [baseBlock], messages: [{ role: "user", content: "hi" }] },
    sel(["terse-prose", "full"])
  );
  assert.equal(r.applied, true);
  const blocks = r.body.system as Array<{ type?: string; text?: string }>;
  assert.equal(blocks.length, 2);
  assert.deepEqual(blocks[0], baseBlock);
  assert.equal(blocks[1]?.type, "text");
  assert.match(String(blocks[1]?.text), new RegExp(escapeRe(OUTPUT_STYLE_MARKER)));
  assert.equal(r.body.messages?.[0]?.role, "user");
});

test("Anthropic shape: idempotent when the marker lives in the top-level system", () => {
  const once = applyOutputStyles(
    { system: "You are Claude Code.", messages: [{ role: "user", content: "hi" }] },
    sel(["terse-prose", "full"])
  ).body;
  const twice = applyOutputStyles(once, sel(["terse-prose", "full"]));
  assert.equal(twice.applied, false);
  assert.equal(twice.skippedReason, "already_applied");
  const markerCount = (
    String(twice.body.system).match(new RegExp(escapeRe(OUTPUT_STYLE_MARKER), "g")) ?? []
  ).length;
  assert.equal(markerCount, 1);

  const onceArr = applyOutputStyles(
    { system: [{ type: "text", text: "base" }], messages: [{ role: "user", content: "hi" }] },
    sel(["terse-prose", "full"])
  ).body;
  const twiceArr = applyOutputStyles(onceArr, sel(["terse-prose", "full"]));
  assert.equal(twiceArr.applied, false);
  assert.equal((twiceArr.body.system as unknown[]).length, 2);
});

test("never introduces a system message at messages[0]", () => {
  const shapes = [
    { system: "top", messages: [{ role: "user", content: "hi" }] },
    { messages: [{ role: "user", content: "hi" }] },
    {
      messages: [
        { role: "user", content: "hi" },
        { role: "assistant", content: "hello" },
        { role: "user", content: "again" },
      ],
    },
  ];
  for (const body of shapes) {
    const r = applyOutputStyles(body, sel(["terse-prose", "full"]));
    assert.equal(r.applied, true);
    assert.notEqual(r.body.messages?.[0]?.role, "system");
  }
});

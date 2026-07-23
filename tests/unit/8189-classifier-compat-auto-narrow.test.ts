/**
 * Regression test for #8189 — "auto" claudeClassifierCompat mode was over-broad.
 *
 * shouldDefaultAllowClassifier() previously treated `stop_sequences` containing the
 * literal token `</block>` as sufficient PROOF of a Claude Code classifier request in
 * "auto" mode, with no correlation to the classifier's system-prompt marker. Any
 * unrelated Claude-format (/v1/messages) request that merely happened to set
 * stop_sequences=["</block>"] (e.g. an app generating markup with a stop token) was
 * silently short-circuited with a synthetic ALLOW response — WITHOUT ever calling the
 * configured provider.
 *
 * Fix: in "auto" mode, the SECURITY_MONITOR_MARKER system-prompt text is now a
 * necessary condition. `stop_sequences` alone is no longer sufficient.
 */

import test from "node:test";
import assert from "node:assert/strict";
import { shouldDefaultAllowClassifier } from "../../open-sse/handlers/chatCore/claudeClassifierCompat.ts";
import { FORMATS } from "../../open-sse/translator/formats.ts";

test("issue #8189: 'auto' mode fires on stop_sequences alone, with NO security-monitor marker present — over-broad trigger", () => {
  const body = {
    model: "aug/claude-sonnet-4.6",
    max_tokens: 20,
    stop_sequences: ["</block>"],
    system: "You are a helpful assistant that writes CMS page templates.",
    messages: [{ role: "user", content: "Write a <block>...</block> template" }],
  };
  const result = shouldDefaultAllowClassifier(FORMATS.CLAUDE, body, "auto");
  assert.equal(
    result,
    false,
    "auto mode must not short-circuit a request that merely happens to set stop_sequences=['</block>'] for unrelated reasons and carries no security-monitor marker"
  );
});

test("issue #8189: 'auto' mode still short-circuits when the security-monitor marker is present, even without stop_sequences", () => {
  const body = {
    system: [
      {
        type: "text",
        text: "You are a security monitor for autonomous AI coding agents. Evaluate the following action.",
      },
    ],
    stop_sequences: [],
    messages: [{ role: "user", content: "<transcript>Bash rm -rf /</transcript>" }],
  };
  assert.equal(
    shouldDefaultAllowClassifier(FORMATS.CLAUDE, body, "auto"),
    true,
    "marker-present must still short-circuit even without stop_sequences"
  );
});

test("issue #8189: 'always' mode is unaffected — every Claude-format request still short-circuits (operator opted in)", () => {
  const body = {
    system: "You are a helpful assistant that writes CMS page templates.",
    stop_sequences: ["</block>"],
    messages: [{ role: "user", content: "hello" }],
  };
  assert.equal(
    shouldDefaultAllowClassifier(FORMATS.CLAUDE, body, "always"),
    true,
    "mode='always' must short-circuit every Claude-format request regardless of signal shape"
  );
});

test("issue #8189: 'off' mode (shipped default) never short-circuits", () => {
  const body = {
    system: [
      { type: "text", text: "You are a security monitor for autonomous AI coding agents." },
    ],
    stop_sequences: ["</block>"],
  };
  assert.equal(shouldDefaultAllowClassifier(FORMATS.CLAUDE, body, "off"), false);
  assert.equal(shouldDefaultAllowClassifier(FORMATS.CLAUDE, body, undefined), false);
});

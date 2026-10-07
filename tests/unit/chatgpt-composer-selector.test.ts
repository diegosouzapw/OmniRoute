import test from "node:test";
import assert from "node:assert/strict";
import { JSDOM } from "jsdom";
import { CHATGPT_COMPOSER_SELECTOR } from "../../open-sse/vendor/codex-chatgpt-web/chatgpt-session.ts";

test("composer selector matches current ProseMirror and legacy editors", () => {
  const dom = new JSDOM(`
    <div id="current" contenteditable="true" role="textbox" class="ProseMirror" aria-label="Ask ChatGPT"></div>
    <textarea id="prompt-textarea"></textarea>
    <div id="legacy" contenteditable="true" data-lexical-editor="true"></div>
    <div id="readonly" role="textbox" class="ProseMirror"></div>
  `);
  try {
    const matches = [...dom.window.document.querySelectorAll(CHATGPT_COMPOSER_SELECTOR)];
    assert.deepEqual(
      matches.map((element) => element.id),
      ["current", "prompt-textarea", "legacy"]
    );
  } finally {
    dom.window.close();
  }
});

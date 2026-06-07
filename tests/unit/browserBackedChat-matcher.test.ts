import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { chatUrlMatcher } from "../../open-sse/services/browserBackedChat.ts";

describe("chatUrlMatcher", () => {
  it("matches exact URL", () => {
    assert.equal(
      chatUrlMatcher(
        "https://claude.ai/api/org/chat_conv/abc/completion",
        "claude.ai",
        "https://claude.ai/api/org/chat_conv/abc/completion"
      ),
      true
    );
  });

  it("matches with dynamic conversation id", () => {
    assert.equal(
      chatUrlMatcher(
        "https://claude.ai/api/organizations/o1/chat_conversations/2ae3a64b-7e38-4e80-9d0d-5717dc425a4b/completion",
        "claude.ai",
        "https://claude.ai/api/organizations/o1/chat_conversations/PLACEHOLDER/completion"
      ),
      true
    );
  });

  it("matches DDG chat URL exactly", () => {
    assert.equal(
      chatUrlMatcher(
        "https://duck.ai/duckchat/v1/chat",
        "duck.ai",
        "https://duck.ai/duckchat/v1/chat"
      ),
      true
    );
  });

  it("rejects when domain differs", () => {
    assert.equal(
      chatUrlMatcher("https://attacker.com/api/x", "claude.ai", "https://claude.ai/api/x"),
      false
    );
  });

  it("rejects when path length differs", () => {
    assert.equal(
      chatUrlMatcher(
        "https://claude.ai/api/chat/x",
        "claude.ai",
        "https://claude.ai/api/chat/x/y/z"
      ),
      false
    );
  });

  it("rejects when more than one segment differs", () => {
    assert.equal(
      chatUrlMatcher("https://claude.ai/api/A/B/C/D", "claude.ai", "https://claude.ai/api/A/X/Y/D"),
      false
    );
  });

  it("rejects when subdomain is a prefix but not the configured matchDomain", () => {
    assert.equal(
      chatUrlMatcher(
        "https://claude.ai.attacker.com/api/x",
        "claude.ai",
        "https://claude.ai/api/x"
      ),
      false
    );
  });
});

import test from "node:test";
import assert from "node:assert/strict";
import { semanticCacheConversation } from "../../open-sse/handlers/chatCore/semanticCacheConversation.ts";
import { injectOmniJev } from "../../open-sse/services/autoCombo/omniJev.ts";

test("cache material includes enrichment in every wire format", () => {
  for (const body of [
    { messages: [{ role: "user", content: "hi" }] },
    { messages: [{ role: "user", content: "hi" }], system: "client" },
    { input: "hi", instructions: "client" },
    { contents: [{ role: "user", parts: [{ text: "hi" }] }] },
  ]) {
    const local = injectOmniJev(body, { version: 1, source: "methodology", task: "chat" });
    const api = injectOmniJev(body, {
      version: 1,
      source: "jev-api",
      task: "coding",
      complexity: "high",
    });
    assert.notDeepEqual(semanticCacheConversation(body), semanticCacheConversation(local));
    assert.notDeepEqual(semanticCacheConversation(local), semanticCacheConversation(api));
    assert.match(JSON.stringify(semanticCacheConversation(local)), /OmniJev/);
  }
});

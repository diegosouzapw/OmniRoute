import assert from "node:assert/strict";
import test from "node:test";

import { chatgpt_webProvider } from "../../open-sse/config/providers/registry/chatgpt-web/index.ts";
import { ChatGptWebExecutor } from "../../open-sse/executors/chatgpt-web.ts";
import { REGISTRY, getRegistryEntry } from "../../open-sse/config/providerRegistry.ts";
import { hasSpecializedExecutor } from "../../open-sse/executors/index.ts";
import { validateChatGptWebProvider } from "../../src/lib/providers/validation/chatgptWeb.ts";
import { validateWebCookieProvider } from "../../src/lib/providers/validation/webCookie.ts";
import { AI_PROVIDERS, WEB_COOKIE_PROVIDERS } from "../../src/shared/constants/providers.ts";
import {
  assertCommonChatGptWebProviderAvailable,
  isCommonChatGptWebRetiredProviderId,
} from "../../src/shared/constants/chatgptWebRetirement.ts";

const MODEL_IDS = [
  "gpt-5-6",
  "gpt-5-6-thinking",
  "gpt-5-6-pro",
  "gpt-5.6-luna-free",
  "gpt-5.6-luna-free-thinking",
  "gpt-5-5-instant",
  "gpt-5-5-thinking",
  "gpt-5-5-pro",
];

test("registers only the clean-room ChatGPT Web routes observed in the first-party UI", () => {
  assert.equal(chatgpt_webProvider.id, "chatgpt-web");
  assert.deepEqual(
    chatgpt_webProvider.models.map((model) => model.id),
    MODEL_IDS
  );
  assert.equal(REGISTRY["chatgpt-web"], chatgpt_webProvider);
  assert.equal(getRegistryEntry("chatgpt-web"), chatgpt_webProvider);
  assert.equal(WEB_COOKIE_PROVIDERS["chatgpt-web"].toolCalling, "none");
  assert.equal(AI_PROVIDERS["chatgpt-web"].id, "chatgpt-web");
  assert.equal(hasSpecializedExecutor("chatgpt-web"), true);
});

test("restores the canonical id without reviving the provenance-tainted legacy alias", () => {
  assert.equal(isCommonChatGptWebRetiredProviderId("chatgpt-web"), false);
  assert.doesNotThrow(() => assertCommonChatGptWebProviderAvailable("chatgpt-web"));
  assert.equal(isCommonChatGptWebRetiredProviderId("cgpt-web"), true);
  assert.throws(() => assertCommonChatGptWebProviderAvailable("cgpt-web"), {
    code: "PROVIDER_RETIRED",
  });
});

test("validates encrypted-at-rest storage-state input without echoing secrets", async () => {
  const storageState = JSON.stringify({
    cookies: [
      {
        name: "session",
        value: "do-not-echo",
        domain: ".chatgpt.com",
        path: "/",
        expires: -1,
        httpOnly: true,
        secure: true,
        sameSite: "Lax",
      },
    ],
    origins: [],
  });
  assert.deepEqual(await validateChatGptWebProvider({ apiKey: storageState }), {
    valid: true,
    error: null,
    unsupported: false,
  });
  assert.deepEqual(
    await validateWebCookieProvider({ provider: "chatgpt-web", apiKey: storageState }),
    { valid: true, error: null, unsupported: false }
  );
  const invalid = await validateChatGptWebProvider({
    apiKey: JSON.stringify({
      cookies: [
        {
          name: "session",
          value: "do-not-echo",
          domain: ".example.com",
          path: "/",
          expires: -1,
          httpOnly: true,
          secure: true,
          sameSite: "Lax",
        },
      ],
      origins: [],
    }),
  });
  assert.equal(invalid.valid, false);
  assert.equal(JSON.stringify(invalid).includes("do-not-echo"), false);
});

test("specialized executor delegates to the clean-room browser adapter", async () => {
  const executor = new ChatGptWebExecutor({
    createSession: async () => ({
      url: () => "https://chatgpt.com/?temporary-chat=true",
      start: async () => async () => {},
      submitPrompt: async () => {},
    }),
    runTurn: async () => ({
      conversationId: "private-conversation",
      turnExchangeId: "private-turn",
      text: "CLEANROOM_PROVIDER_OK",
      status: "finished_successfully",
      endTurn: true,
    }),
    id: () => "chatcmpl-provider",
    now: () => 123_000,
  });
  const response = await executor.execute({
    model: "gpt-5-6",
    body: { messages: [{ role: "user", content: "hello" }] },
    stream: false,
    credentials: {
      connectionId: "connection",
      apiKey: JSON.stringify({ cookies: [], origins: [] }),
    },
  });
  assert.ok(response instanceof Response);
  const body = await response.json();
  assert.equal(body.choices[0].message.content, "CLEANROOM_PROVIDER_OK");
  assert.equal(JSON.stringify(body).includes("private-conversation"), false);
});

test("surfaces an exhausted Free image quota as 429 for sibling-account fallback", async () => {
  const executor = new ChatGptWebExecutor({
    createSession: async () => ({
      url: () => "https://chatgpt.com/?temporary-chat=true",
      start: async () => async () => {},
      submitPrompt: async () => {},
    }),
    runTurn: async () => {
      throw new Error("You've reached your image upload limit");
    },
  });

  const response = await executor.execute({
    model: "gpt-5.6-luna-free",
    body: { messages: [{ role: "user", content: "image" }] },
    stream: false,
    credentials: {
      connectionId: "free-connection",
      apiKey: JSON.stringify({ cookies: [], origins: [] }),
    },
  });

  assert.equal(response.response.status, 429);
  assert.match(await response.response.text(), /image upload limit/);
});

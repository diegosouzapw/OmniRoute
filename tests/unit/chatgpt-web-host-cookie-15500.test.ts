import test from "node:test";
import assert from "node:assert/strict";

import {
  chatGptWebStorageStateFromCookieHeader,
  normalizeChatGptWebStorageState,
} from "../../open-sse/utils/chatgptWebExecutorAdapter.ts";
import { collectChatGptWebFirstPartyAssetCandidates } from "../../open-sse/utils/chatgptWebFirstParty.ts";

test("#15500 asset discovery accepts /unauth-mweb/ asset and script paths", () => {
  const urls = [
    "https://chatgpt.com/unauth-mweb/assets/octane-home-client-C3rAUYep.js",
    "https://chatgpt.com/unauth-mweb/scripts/declarative-partial-updates-7aad3eb74d16.js",
  ];
  assert.deepEqual(collectChatGptWebFirstPartyAssetCandidates(urls, []), urls);
});

test("#15500 imported storage state: __Host- cookies must be host-only (no leading dot)", () => {
  const input = {
    cookies: [
      {
        name: "__Host-next-auth.csrf-token",
        value: "abc%7Cdef",
        domain: ".chatgpt.com",
        path: "/",
        expires: -1,
        httpOnly: true,
        secure: true,
        sameSite: "Lax",
      },
      {
        name: "__Secure-next-auth.session-token",
        value: "tok",
        domain: ".chatgpt.com",
        path: "/",
        expires: -1,
        httpOnly: true,
        secure: true,
        sameSite: "Lax",
      },
    ],
    origins: [],
  };
  const state = normalizeChatGptWebStorageState(input);
  assert.equal(state.cookies[0].domain, "chatgpt.com");
  assert.equal(state.cookies[1].domain, ".chatgpt.com");
  assert.equal(input.cookies[0].domain, ".chatgpt.com", "input must not be mutated");
});

test("#15500 cookie-header storage state: __Host- cookies must be host-only", () => {
  const state = chatGptWebStorageStateFromCookieHeader(
    "__Secure-next-auth.session-token=tok; __Host-next-auth.csrf-token=abc%7Cdef"
  );
  const host = state.cookies.find((c) => c.name === "__Host-next-auth.csrf-token");
  const secure = state.cookies.find((c) => c.name === "__Secure-next-auth.session-token");
  assert.equal(host?.domain, "chatgpt.com");
  assert.equal(host?.path, "/");
  assert.equal(host?.secure, true);
  assert.equal(secure?.domain, ".chatgpt.com");
});

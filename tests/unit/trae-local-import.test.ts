import test from "node:test";
import assert from "node:assert/strict";

import {
  extractTraeChatBaseUrlFromLogText,
  extractTraeStoredSession,
} from "../../src/lib/oauth/services/traeLocal.ts";

test("Trae local storage parser extracts auth and routing data from storage.json", () => {
  const session = extractTraeStoredSession({
    "iCubeAuthInfo://icube.cloudide": JSON.stringify({
      accessToken: "trae-access",
      refreshToken: "trae-refresh",
      loginHost: "https://www.trae.ai",
      account: {
        email: "dev@example.com",
        username: "dev-user",
        uid: "user-123",
      },
    }),
    "iCubeServerData://icube.cloudide": JSON.stringify({
      loginHost: "https://www.trae.ai",
      loginRegion: "sg",
    }),
    "iCubeEntitlementInfo://icube.cloudide": JSON.stringify({
      identityStr: "pro",
    }),
    "iCubeAuthInfo://usertag": "tag-123",
  });

  assert.deepEqual(session, {
    accessToken: "trae-access",
    refreshToken: "trae-refresh",
    loginHost: "https://www.trae.ai",
    email: "dev@example.com",
    userId: "user-123",
    nickname: "dev-user",
    authRaw: {
      accessToken: "trae-access",
      refreshToken: "trae-refresh",
      loginHost: "https://www.trae.ai",
      account: {
        email: "dev@example.com",
        username: "dev-user",
        uid: "user-123",
      },
    },
    serverRaw: {
      loginHost: "https://www.trae.ai",
      loginRegion: "sg",
    },
    entitlementRaw: {
      identityStr: "pro",
    },
    usertagRaw: "tag-123",
  });
});

test("Trae local storage parser rejects payloads without access token", () => {
  assert.throws(
    () =>
      extractTraeStoredSession({
        "iCubeAuthInfo://icube.cloudide": JSON.stringify({
          refreshToken: "trae-refresh",
        }),
      }),
    /does not contain an access token/
  );
});

test("Trae log parser extracts verified chat base URLs from completion logs", () => {
  const detected = extractTraeChatBaseUrlFromLogText(`
    [info] POST https://gateway.example.com/trae/v1/chat/completions?trace=1
    [debug] Authorization: Bearer ***
  `);

  assert.equal(detected, "https://gateway.example.com/trae/v1/chat/completions");
});

test("Trae log parser ignores the known public chat URL guesses", () => {
  const detected = extractTraeChatBaseUrlFromLogText(`
    https://api.trae.ai/v1/chat/completions
    https://www.trae.ai/chat/completions
  `);

  assert.equal(detected, "");
});

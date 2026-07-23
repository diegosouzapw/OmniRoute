import test from "node:test";
import assert from "node:assert/strict";

import {
  requestUserCode,
  pollForAuthorization,
  exchangeCodeForTokens,
  runCodexDeviceFlow,
  CodexDeviceFlowError,
} from "@/lib/oauth/codexDeviceFlow";

const USERCODE_URL = "https://auth.openai.com/api/accounts/deviceauth/usercode";
const POLL_URL = "https://auth.openai.com/api/accounts/deviceauth/token";
const TOKEN_URL = "https://auth.openai.com/oauth/token";

function withFetch(handler: (url: string, init?: RequestInit) => Response | Promise<Response>) {
  const original = global.fetch;
  global.fetch = (async (input: RequestInfo | URL, init?: RequestInit) =>
    handler(String(input), init)) as typeof fetch;
  return () => {
    global.fetch = original;
  };
}

test("requestUserCode posts client_id and normalizes interval + verification uri", async () => {
  const calls: Array<{ url: string; body?: string }> = [];
  const restore = withFetch((url, init) => {
    calls.push({ url, body: typeof init?.body === "string" ? init.body : undefined });
    return new Response(
      JSON.stringify({ device_auth_id: "dev-1", user_code: "ABCD-1234", interval: "7" }),
      { status: 200 }
    );
  });

  try {
    const uc = await requestUserCode("app_test");
    assert.equal(calls[0].url, USERCODE_URL);
    assert.deepEqual(JSON.parse(calls[0].body!), { client_id: "app_test" });
    assert.equal(uc.deviceAuthId, "dev-1");
    assert.equal(uc.userCode, "ABCD-1234");
    assert.equal(uc.intervalSec, 7); // string "7" normalized to number
    assert.equal(uc.verificationUri, "https://auth.openai.com/codex/device");
  } finally {
    restore();
  }
});

test("requestUserCode accepts the alternate 'usercode' field", async () => {
  const restore = withFetch(
    () => new Response(JSON.stringify({ device_auth_id: "d", usercode: "X-1", interval: 0 }), {
      status: 200,
    })
  );
  try {
    const uc = await requestUserCode();
    assert.equal(uc.userCode, "X-1");
    assert.equal(uc.intervalSec, 5); // 0 → default
  } finally {
    restore();
  }
});

test("requestUserCode maps 404 to device_disabled (admin gating)", async () => {
  const restore = withFetch(() => new Response("not enabled", { status: 404 }));
  try {
    await assert.rejects(requestUserCode(), (err: unknown) => {
      assert.ok(err instanceof CodexDeviceFlowError);
      assert.equal((err as CodexDeviceFlowError).code, "device_disabled");
      assert.equal((err as CodexDeviceFlowError).status, 404);
      return true;
    });
  } finally {
    restore();
  }
});

test("pollForAuthorization treats 403 as pending then returns code + verifier", async () => {
  let n = 0;
  const restore = withFetch(() => {
    n += 1;
    if (n === 1) return new Response("pending", { status: 403 });
    return new Response(
      JSON.stringify({ authorization_code: "auth-code", code_verifier: "ver-123" }),
      { status: 200 }
    );
  });
  try {
    const out = await pollForAuthorization("dev-1", "ABCD", 0.001);
    assert.equal(n, 2);
    assert.deepEqual(out, { authorizationCode: "auth-code", codeVerifier: "ver-123" });
  } finally {
    restore();
  }
});

test("pollForAuthorization throws timeout when deadline passes", async () => {
  const restore = withFetch(() => new Response("pending", { status: 404 }));
  try {
    await assert.rejects(pollForAuthorization("dev-1", "ABCD", 0.001, { timeoutMs: 5 }), (err) => {
      assert.equal((err as CodexDeviceFlowError).code, "timeout");
      return true;
    });
  } finally {
    restore();
  }
});

test("pollForAuthorization aborts via signal", async () => {
  const restore = withFetch(() => new Response("pending", { status: 403 }));
  const ac = new AbortController();
  ac.abort();
  try {
    await assert.rejects(
      pollForAuthorization("dev-1", "ABCD", 0.001, { signal: ac.signal }),
      (err) => {
        assert.equal((err as CodexDeviceFlowError).code, "aborted");
        return true;
      }
    );
  } finally {
    restore();
  }
});

test("exchangeCodeForTokens posts the authorization_code grant with the server verifier", async () => {
  let body = "";
  const restore = withFetch((url, init) => {
    body = typeof init?.body === "string" ? init.body : "";
    assert.equal(url, TOKEN_URL);
    return new Response(
      JSON.stringify({
        access_token: "at",
        refresh_token: "rt",
        id_token: "it",
        expires_in: 3600,
      }),
      { status: 200 }
    );
  });
  try {
    const tokens = await exchangeCodeForTokens("auth-code", "ver-123", "app_test");
    const params = new URLSearchParams(body);
    assert.equal(params.get("grant_type"), "authorization_code");
    assert.equal(params.get("client_id"), "app_test");
    assert.equal(params.get("code"), "auth-code");
    assert.equal(params.get("code_verifier"), "ver-123");
    assert.equal(params.get("redirect_uri"), "https://auth.openai.com/deviceauth/callback");
    assert.equal(tokens.access_token, "at");
    assert.equal(tokens.expires_in, 3600);
  } finally {
    restore();
  }
});

test("runCodexDeviceFlow drives usercode → poll → exchange and reports the user code", async () => {
  let polls = 0;
  const restore = withFetch((url) => {
    if (url === USERCODE_URL) {
      return new Response(
        JSON.stringify({ device_auth_id: "dev-1", user_code: "WXYZ-9", interval: 0.001 }),
        { status: 200 }
      );
    }
    if (url === POLL_URL) {
      polls += 1;
      if (polls < 2) return new Response("pending", { status: 404 });
      return new Response(
        JSON.stringify({ authorization_code: "auth-code", code_verifier: "ver-123" }),
        { status: 200 }
      );
    }
    if (url === TOKEN_URL) {
      return new Response(
        JSON.stringify({ access_token: "at", refresh_token: "rt", id_token: "it", expires_in: 60 }),
        { status: 200 }
      );
    }
    return new Response("not-found", { status: 404 });
  });

  const seen: string[] = [];
  try {
    const tokens = await runCodexDeviceFlow({ onUserCode: (uc) => seen.push(uc.userCode) });
    assert.deepEqual(seen, ["WXYZ-9"]);
    assert.equal(tokens.access_token, "at");
    assert.equal(tokens.refresh_token, "rt");
    assert.equal(tokens.id_token, "it");
  } finally {
    restore();
  }
});

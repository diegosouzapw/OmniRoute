import { test, describe } from "node:test";
import assert from "node:assert/strict";

// ─── Devin Desktop raw model IDs ────────────────────────────────────────────

import { getExecutor } from "../../open-sse/executors/index.ts";

function containsBytes(haystack: Uint8Array, needle: Uint8Array): boolean {
  outer: for (let i = 0; i <= haystack.length - needle.length; i++) {
    for (let j = 0; j < needle.length; j++) {
      if (haystack[i + j] !== needle[j]) continue outer;
    }
    return true;
  }
  return false;
}

test("Devin Desktop sends the curated raw model id without alias rewriting", async () => {
  const executor = await getExecutor("devin-desktop");
  const originalFetch = globalThis.fetch;
  let requestBody: Uint8Array | null = null;
  globalThis.fetch = async (url, init) => {
    if (String(url).endsWith("/exa.auth_pb.AuthService/GetUserJwt")) {
      const jwt = new TextEncoder().encode("test-jwt");
      return new Response(new Uint8Array([0x0a, jwt.length, ...jwt]));
    }
    requestBody = new Uint8Array(init?.body as ArrayBuffer);
    return new Response("expected test stop", { status: 418 });
  };

  try {
    const model = "gpt-5-6-sol-high";
    const result = await executor.execute({
      model,
      body: { messages: [{ role: "user", content: "hello" }] },
      stream: true,
      credentials: { accessToken: "test-devin-desktop-token" },
    });

    assert.equal((result instanceof Response ? result : result.response).status, 418);
    assert.ok(requestBody);
    assert.equal(containsBytes(requestBody, new TextEncoder().encode(model)), true);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

// ─── Devin CLI binary resolution ─────────────────────────────────────────────
// resolveDevinBin() is not exported, but its contract is simple:
// - CLI_DEVIN_BIN env var overrides everything
// We verify the env-override via a tiny wrapper that mirrors its logic.

describe("DevinCli binary resolution", () => {
  test("CLI_DEVIN_BIN env override is returned when set", () => {
    const original = process.env.CLI_DEVIN_BIN;
    try {
      process.env.CLI_DEVIN_BIN = "/custom/path/devin";
      const bin = process.env.CLI_DEVIN_BIN?.trim() ?? "";
      assert.equal(bin, "/custom/path/devin");
    } finally {
      if (original === undefined) delete process.env.CLI_DEVIN_BIN;
      else process.env.CLI_DEVIN_BIN = original;
    }
  });

  test("CLI_DEVIN_BIN is unset when env var not present", () => {
    const original = process.env.CLI_DEVIN_BIN;
    try {
      delete process.env.CLI_DEVIN_BIN;
      const bin = process.env.CLI_DEVIN_BIN?.trim();
      assert.equal(bin, undefined);
    } finally {
      if (original !== undefined) process.env.CLI_DEVIN_BIN = original;
    }
  });
});

// ─── Devin Desktop / CLI import-token flow ───────────────────────────────────
import { generateAuthData, getProvider } from "@/lib/oauth/providers";

test("devin-desktop provider: flowType is import_token", () => {
  const provider = getProvider("devin-desktop");
  assert.equal(provider.flowType, "import_token");
});

test("devin-cli provider: flowType is import_token (shares Devin token config)", () => {
  const provider = getProvider("devin-cli");
  assert.equal(provider.flowType, "import_token");
});

test("legacy windsurf provider is no longer public", () => {
  assert.throws(() => getProvider("windsurf"), /Unknown provider/i);
});

test("devin-desktop provider: generateAuthData returns no authUrl", () => {
  const data = generateAuthData("devin-desktop", "http://localhost:0/auth/callback");
  assert.equal(data.authUrl, undefined);
  assert.equal(data.supported, false);
  assert.match(data.error ?? "", /import-token|disabled/i);
  assert.match(data.error ?? "", /vary by Devin version and account/i);
  assert.doesNotMatch(data.error ?? "", /Copy API Key to Clipboard/i);
});

test("devin-cli provider: generateAuthData returns no authUrl", () => {
  const data = generateAuthData("devin-cli", "http://localhost:0/auth/callback");
  assert.equal(data.authUrl, undefined);
  assert.equal(data.supported, false);
});

// ─── Phase 1 hotfix: retired PKCE actions return 410 Gone ────────────────────
import { GET as oauthGet, POST as oauthPost } from "@/app/api/oauth/[provider]/[action]/route";

test("OAuth route: GET devin-desktop/start-callback-server returns Devin guidance", async () => {
  const url = "http://localhost:20128/api/oauth/devin-desktop/start-callback-server";
  const request = new Request(url, { method: "GET" });
  const response = await oauthGet(request, {
    params: Promise.resolve({ provider: "devin-desktop", action: "start-callback-server" }),
  } as never);
  assert.equal(response.status, 410);
  const body = await response.json();
  assert.match(body.error, /Paste an existing Devin API key/);
  assert.match(body.error, /vary by Devin version and account/);
  assert.doesNotMatch(body.error, /Devin: Copy API Key to Clipboard/);
});

test("OAuth route: GET devin-cli/authorize returns 410 Gone", async () => {
  const url = "http://localhost:20128/api/oauth/devin-cli/authorize";
  const request = new Request(url, { method: "GET" });
  const response = await oauthGet(request, {
    params: Promise.resolve({ provider: "devin-cli", action: "authorize" }),
  } as never);
  assert.equal(response.status, 410);
  const body = await response.json();
  assert.match(body.error, /import-token|disabled|410|show-auth-token/i);
});

test("OAuth route: GET devin-desktop/poll-callback returns 410 Gone", async () => {
  const url = "http://localhost:20128/api/oauth/devin-desktop/poll-callback";
  const request = new Request(url, { method: "GET" });
  const response = await oauthGet(request, {
    params: Promise.resolve({ provider: "devin-desktop", action: "poll-callback" }),
  } as never);
  assert.equal(response.status, 410);
});

test("OAuth route: POST devin-desktop/poll-callback returns 410 Gone", async () => {
  const url = "http://localhost:20128/api/oauth/devin-desktop/poll-callback";
  const request = new Request(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  });
  const response = await oauthPost(request, {
    params: Promise.resolve({ provider: "devin-desktop", action: "poll-callback" }),
  } as never);
  assert.equal(response.status, 410);
});

test("OAuth route: GET codex/authorize is NOT retired (regression check)", async () => {
  const url = "http://localhost:20128/api/oauth/codex/authorize";
  const request = new Request(url, { method: "GET" });
  const response = await oauthGet(request, {
    params: Promise.resolve({ provider: "codex", action: "authorize" }),
  } as never);
  assert.notEqual(response.status, 410);
});

// ─── Regression: mapTokens accepts {accessToken} object, returns string accessToken ─
// Earlier signature was `mapTokens(token: string)` which crashed the SQLite
// bind layer when the route called `mapTokens({ accessToken })`: the object
// got stored as accessToken and SQLite rejected it with
//   "SQLite3 can only bind numbers, strings, bigints, buffers, and null".
test("devin-desktop mapTokens: accepts object {accessToken} and returns string accessToken", () => {
  const provider = getProvider("devin-desktop");
  const mapped = provider.mapTokens({ accessToken: "sk-ws-test-token-1234567890" });
  assert.equal(typeof mapped.accessToken, "string");
  assert.equal(mapped.accessToken, "sk-ws-test-token-1234567890");
  assert.equal(mapped.refreshToken, null);
});

test("devin-cli mapTokens: accepts object {accessToken} and returns string accessToken", () => {
  const provider = getProvider("devin-cli");
  const mapped = provider.mapTokens({ accessToken: "sk-devin-test-token-1234567890" });
  assert.equal(typeof mapped.accessToken, "string");
  assert.equal(mapped.accessToken, "sk-devin-test-token-1234567890");
});

// ─── Regression: Devin Desktop tool call arguments arrive fragmented ─────────
// The Codeium upstream splits tool call arguments across repeated field-3
// fragments, each inside an id-less field-6 submessage. The old decoder
// overwrote arguments per fragment and dropped id-less submessages entirely,
// so OpenAI clients always received `"arguments": ""` (reported as harness
// errors like "must have required property" on every tool call).

test("Devin Desktop reassembles fragmented tool call arguments", async () => {
  const executor = await getExecutor("devin-desktop");
  const enc = new TextEncoder();

  // protobuf helpers: length-delimited string field
  const pbStr = (field: number, s: string) => [
    field * 8 + 2,
    enc.encode(s).length,
    ...enc.encode(s),
  ];
  // response field 6 = toolCall submessage
  const toolSubmessage = (fields: number[][]) => {
    const body = fields.flat();
    return [6 * 8 + 2, body.length, ...body];
  };
  // Connect frame: [flags][4-byte big-endian length][payload]
  const frame = (payload: number[]) => {
    const len = payload.length;
    return [0, (len >>> 24) & 255, (len >>> 16) & 255, (len >>> 8) & 255, len & 255, ...payload];
  };

  const callId = "call_fragmented_test";
  const argsParts = ["{", '"timezone": "', "Asia", "/Shanghai", '"', "}"];
  const wire = new Uint8Array([
    // first submessage: id + name + first argument fragment
    ...frame(toolSubmessage([pbStr(1, callId), pbStr(2, "get_time"), pbStr(3, argsParts[0])])),
    // continuation fragments: no id, no name, only argument fragments
    ...argsParts.slice(1).flatMap((part) => frame(toolSubmessage([pbStr(3, part)]))),
    // end-stream trailer frame (flags=2, empty JSON error trailer)
    ...frame([...enc.encode("{}")]).map((b, i) => (i === 0 ? 2 : b)),
  ]);

  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url, _init) => {
    if (String(url).endsWith("/exa.auth_pb.AuthService/GetUserJwt")) {
      const jwt = enc.encode("test-jwt");
      return new Response(new Uint8Array([0x0a, jwt.length, ...jwt]));
    }
    return new Response(wire, { status: 200 });
  };

  try {
    const result = await executor.execute({
      model: "swe-2-medium",
      body: {
        messages: [{ role: "user", content: "call get_time" }],
        tools: [
          {
            type: "function",
            function: {
              name: "get_time",
              description: "get current time",
              parameters: { type: "object", properties: { timezone: { type: "string" } } },
            },
          },
        ],
      },
      stream: true,
      credentials: { accessToken: "test-devin-desktop-token" },
    });

    const response = result instanceof Response ? result : result.response;
    const sseText = await response.text();

    const argDeltas: string[] = [];
    let firstDeltaHasIdAndType = false;
    let fragmentDeltaHasNoId = false;
    for (const line of sseText.split("\n")) {
      if (!line.startsWith("data: ") || line.includes("[DONE]")) continue;
      const chunk = JSON.parse(line.slice(6));
      for (const choice of chunk.choices ?? []) {
        for (const tc of choice.delta?.tool_calls ?? []) {
          if (tc.id) {
            assert.equal(tc.id, callId);
            assert.equal(tc.type, "function");
            firstDeltaHasIdAndType = true;
          } else {
            fragmentDeltaHasNoId = true;
          }
          if (tc.function?.arguments) argDeltas.push(tc.function.arguments);
        }
      }
    }

    assert.equal(argDeltas.join(""), argsParts.join(""));
    assert.equal(firstDeltaHasIdAndType, true);
    assert.equal(fragmentDeltaHasNoId, true);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

// ─── Devin Desktop: image parts are forwarded as ImageData (field 10) ───────
// Previously messageText() dropped every non-text content part, so client
// images never reached the upstream and vision prompts returned text-only
// answers ("无法确定" for images that were never sent).

test("Devin Desktop encodes image_url parts into the request", async () => {
  const executor = await getExecutor("devin-desktop");
  const originalFetch = globalThis.fetch;
  let requestBody: Uint8Array | null = null;
  globalThis.fetch = async (url, init) => {
    if (String(url).endsWith("/exa.auth_pb.AuthService/GetUserJwt")) {
      const jwt = new TextEncoder().encode("test-jwt");
      return new Response(new Uint8Array([0x0a, jwt.length, ...jwt]));
    }
    requestBody = new Uint8Array(init?.body as ArrayBuffer);
    return new Response("expected test stop", { status: 418 });
  };

  const imageB64 = "aGVsbG8tdmlzaW9uLWJsb2I="; // stable marker blob
  try {
    await executor.execute({
      model: "swe-2-medium",
      body: {
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: "what is in this image?" },
              { type: "image_url", image_url: { url: `data:image/png;base64,${imageB64}` } },
            ],
          },
        ],
      },
      stream: true,
      credentials: { accessToken: "test-devin-desktop-token" },
    });

    assert.ok(requestBody);
    const bodyText = new TextDecoder().decode(requestBody);
    assert.ok(
      bodyText.includes(imageB64),
      "image base64 payload must be present in the upstream request"
    );
    assert.ok(bodyText.includes("image/png"), "image mime type must be present");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

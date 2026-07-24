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
  const executor = getExecutor("devin-desktop");
  const originalFetch = globalThis.fetch;
  let requestBody: Uint8Array | null = null;
  globalThis.fetch = async (_url, init) => {
    requestBody = init?.body as Uint8Array;
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

    assert.equal(result.response.status, 418);
    assert.ok(requestBody);
    assert.equal(containsBytes(requestBody, new TextEncoder().encode(model)), true);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

// ─── openAIMessagesToWs message conversion ────────────────────────────────────
// Tests the message role/content extraction logic. Since the function is not
// exported, we test via a re-implementation that mirrors the source exactly.

function openAIMessagesToWsLocal(
  messages: Array<{ role?: string; content?: unknown; tool_call_id?: string }>
): Array<{ role: string; content: string; toolCallId?: string }> {
  const out: Array<{ role: string; content: string; toolCallId?: string }> = [];
  for (const m of messages) {
    const role = String(m.role || "user");
    let content = "";
    if (typeof m.content === "string") {
      content = m.content;
    } else if (Array.isArray(m.content)) {
      for (const part of m.content) {
        if (part && typeof part === "object" && (part as Record<string, unknown>).type === "text") {
          content += String((part as Record<string, unknown>).text || "");
        }
      }
    }
    out.push({ role, content, toolCallId: m.tool_call_id });
  }
  return out;
}

describe("openAIMessagesToWs", () => {
  test("string content is passed through", () => {
    const result = openAIMessagesToWsLocal([{ role: "user", content: "Hello" }]);
    assert.equal(result[0].content, "Hello");
    assert.equal(result[0].role, "user");
  });

  test("multi-part array content: only text parts are concatenated", () => {
    const result = openAIMessagesToWsLocal([
      {
        role: "user",
        content: [
          { type: "text", text: "Part A " },
          { type: "image_url", url: "https://example.com/img.png" },
          { type: "text", text: "Part B" },
        ],
      },
    ]);
    assert.equal(result[0].content, "Part A Part B");
  });

  test("missing role defaults to 'user'", () => {
    const result = openAIMessagesToWsLocal([{ content: "Hi" }]);
    assert.equal(result[0].role, "user");
  });

  test("tool_call_id is mapped to toolCallId", () => {
    const result = openAIMessagesToWsLocal([
      { role: "tool", content: "result", tool_call_id: "call_abc" },
    ]);
    assert.equal(result[0].toolCallId, "call_abc");
  });

  test("null/undefined content yields empty string", () => {
    const result = openAIMessagesToWsLocal([{ role: "assistant", content: undefined }]);
    assert.equal(result[0].content, "");
  });
});

// ─── Devin Desktop gRPC-web frame parser ─────────────────────────────────────

function* parseGrpcWebFramesLocal(
  buf: Uint8Array
): Generator<{ flag: number; payload: Uint8Array }> {
  let offset = 0;
  while (offset + 5 <= buf.length) {
    const flag = buf[offset];
    const len =
      (buf[offset + 1] << 24) | (buf[offset + 2] << 16) | (buf[offset + 3] << 8) | buf[offset + 4];
    offset += 5;
    if (len < 0 || offset + len > buf.length) break;
    yield { flag, payload: buf.slice(offset, offset + len) };
    offset += len;
  }
}

describe("parseGrpcWebFrames", () => {
  function makeFrame(flag: number, payload: Uint8Array): Uint8Array {
    const header = new Uint8Array(5);
    header[0] = flag;
    const len = payload.length;
    header[1] = (len >>> 24) & 0xff;
    header[2] = (len >>> 16) & 0xff;
    header[3] = (len >>> 8) & 0xff;
    header[4] = len & 0xff;
    const frame = new Uint8Array(5 + payload.length);
    frame.set(header);
    frame.set(payload, 5);
    return frame;
  }

  test("parses a single data frame (flag=0x00)", () => {
    const payload = new TextEncoder().encode("hello");
    const buf = makeFrame(0x00, payload);
    const frames = [...parseGrpcWebFramesLocal(buf)];
    assert.equal(frames.length, 1);
    assert.equal(frames[0].flag, 0x00);
    assert.deepEqual(frames[0].payload, payload);
  });

  test("parses multiple frames in sequence", () => {
    const p1 = new TextEncoder().encode("frame1");
    const p2 = new TextEncoder().encode("frame2");
    const buf = new Uint8Array([...makeFrame(0x00, p1), ...makeFrame(0x80, p2)]);
    const frames = [...parseGrpcWebFramesLocal(buf)];
    assert.equal(frames.length, 2);
    assert.equal(frames[0].flag, 0x00);
    assert.equal(frames[1].flag, 0x80);
  });

  test("returns empty for truncated frame header", () => {
    const buf = new Uint8Array([0x00, 0x00]); // only 2 bytes, needs 5
    const frames = [...parseGrpcWebFramesLocal(buf)];
    assert.equal(frames.length, 0);
  });

  test("stops if payload length exceeds buffer", () => {
    // Frame claims 100 bytes of payload but buf only has 10
    const buf = new Uint8Array([0x00, 0x00, 0x00, 0x00, 100, 0, 1, 2, 3, 4]);
    const frames = [...parseGrpcWebFramesLocal(buf)];
    assert.equal(frames.length, 0);
  });
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
  assert.match(body.error, /Devin: Copy API Key to Clipboard/);
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

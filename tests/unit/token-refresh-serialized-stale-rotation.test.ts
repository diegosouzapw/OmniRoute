import test from "node:test";
import assert from "node:assert/strict";

const tokenRefresh = await import("../../open-sse/services/tokenRefresh.ts");
const { __resetRefreshSerializerForTest } = await import("../../open-sse/services/refreshSerializer.ts");
const { lookupRotation } = await import("../../open-sse/services/tokenRefresh/rotationMap.ts");

const { getAccessToken } = tokenRefresh;

type LogLevel = "debug" | "info" | "warn" | "error";
type LogEntry = { level: LogLevel; message: unknown };

function createLog() {
  const entries: LogEntry[] = [];
  const push = (level: LogLevel, args: unknown[]) => {
    entries.push({ level, message: args[1] });
  };
  return {
    entries,
    debug: (...args: unknown[]) => push("debug", args),
    info: (...args: unknown[]) => push("info", args),
    warn: (...args: unknown[]) => push("warn", args),
    error: (...args: unknown[]) => push("error", args),
  };
}

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

function bodyToString(body: BodyInit | null | undefined) {
  if (typeof body === "string") return body;
  if (body instanceof URLSearchParams) return body.toString();
  return String(body ?? "");
}

function refreshTokenFromBody(body: BodyInit | null | undefined) {
  return new URLSearchParams(bodyToString(body)).get("refresh_token");
}

async function withMockedFetch<TResult>(fetchImpl: typeof fetch, fn: () => Promise<TResult>) {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = fetchImpl;
  try {
    return await fn();
  } finally {
    globalThis.fetch = originalFetch;
  }
}

function resetRefreshState() {
  tokenRefresh._clearTokenRotationMap();
  __resetRefreshSerializerForTest();
}

test.beforeEach(() => {
  resetRefreshState();
});

test("getAccessToken_Layer1QueuedBehindLayer2_DoesNotPostConsumedClaudeRefreshToken", async () => {
  const previousSpacing = process.env.CODEX_REFRESH_SPACING_MS;
  process.env.CODEX_REFRESH_SPACING_MS = "0";
  const log = createLog();
  const presented: string[] = [];
  let firstPostEntered = false;
  let releaseFirstPost!: () => void;
  const holdFirstPost = new Promise<void>((resolve) => {
    releaseFirstPost = resolve;
  });

  try {
    await withMockedFetch(async (_url, options = {}) => {
      const presentedToken = refreshTokenFromBody(options.body);
      presented.push(presentedToken || "");
      if (presentedToken === "old-rt" && !firstPostEntered) {
        firstPostEntered = true;
        await holdFirstPost;
        return jsonResponse({
          access_token: "new-access",
          refresh_token: "new-rt",
          expires_in: 28800,
        });
      }
      if (presentedToken === "old-rt") {
        return jsonResponse({ error: "invalid_grant", error_description: "refresh_token_reused" }, 400);
      }
      throw new Error(`unexpected refresh_token ${presentedToken}`);
    }, async () => {
      const layer2 = getAccessToken("claude", { refreshToken: "old-rt" }, log);
      await new Promise<void>((resolve, reject) => {
        const started = Date.now();
        const tick = () => {
          if (firstPostEntered) {
            resolve();
            return;
          }
          if (Date.now() - started > 2000) {
            reject(new Error("Layer 2 never reached the Anthropic token endpoint"));
            return;
          }
          setTimeout(tick, 5);
        };
        tick();
      });

      const layer1 = getAccessToken(
        "claude",
        { connectionId: "healthcheck-conn", refreshToken: "old-rt" },
        log
      );
      await new Promise((resolve) => setTimeout(resolve, 30));
      releaseFirstPost();

      const [layer2Result, layer1Result] = await Promise.all([layer2, layer1]);

      assert.deepEqual(presented, ["old-rt"], "the consumed refresh token must be POSTed once");
      assert.equal(layer2Result?.accessToken, "new-access");
      assert.equal(layer2Result?.refreshToken, "new-rt");
      assert.equal(layer1Result?.accessToken, "new-access");
      assert.equal(layer1Result?.refreshToken, "new-rt");
      assert.notEqual(
        (layer1Result as { error?: string } | null)?.error,
        "unrecoverable_refresh_error",
        "Layer 1 must reuse the rotated tokens instead of burning the family"
      );
    });
  } finally {
    if (previousSpacing === undefined) delete process.env.CODEX_REFRESH_SPACING_MS;
    else process.env.CODEX_REFRESH_SPACING_MS = previousSpacing;
    resetRefreshState();
  }
});

test("getAccessToken_Layer2Refresh_RecordsRotationForTheConsumedToken", async () => {
  const log = createLog();

  await withMockedFetch(async () => {
    return jsonResponse({
      access_token: "layer2-access",
      refresh_token: "layer2-new-rt",
      expires_in: 28800,
    });
  }, async () => {
    const result = await getAccessToken("claude", { refreshToken: "layer2-old-rt" }, log);
    assert.equal(result?.refreshToken, "layer2-new-rt");
    const cached = lookupRotation("claude", "layer2-old-rt");
    assert.ok(cached, "Layer 2 must record the rotation so a later stale caller can skip upstream");
    assert.equal(cached.result.refreshToken, "layer2-new-rt");
    assert.equal(cached.result.accessToken, "layer2-access");
  });
});

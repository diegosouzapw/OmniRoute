import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { MuseSparkWebExecutor } from "../../open-sse/executors/muse-spark-web.ts";

// #9502: the WS migration (#7528) requires a separate ecto1:... auth token the
// guidance never mentions, so a cookie-only credential (the documented input)
// always fails with 400 "Missing Authorization".

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..", "..");

const webCookie = readFileSync(
  join(root, "src", "shared", "constants", "providers", "web-cookie.ts"),
  "utf8"
);
const webSessionCredentials = readFileSync(
  join(root, "src", "shared", "providers", "webSessionCredentials.ts"),
  "utf8"
);
const executor = readFileSync(join(root, "open-sse", "executors", "muse-spark-web.ts"), "utf8");

test("#9502: provider authHint mentions the ecto1: WS auth token, not only the ecto_1_sess cookie", () => {
  // Extract the muse-spark-web block from the first `"muse-spark-web": {` (the
  // key declaration, not the `id:` value) up to the next top-level provider key.
  const startIdx = webCookie.indexOf('"muse-spark-web": {');
  assert.ok(startIdx >= 0, "muse-spark-web block not found");
  const museSection = webCookie.slice(startIdx, webCookie.indexOf('"claude-web"', startIdx));
  assert.match(museSection, /ecto1/, "authHint must mention the ecto1: WS auth token");
});

test("#9502: web-session credential spec for muse-spark-web mentions the ecto1: WS auth token", () => {
  const startIdx = webSessionCredentials.indexOf('"muse-spark-web": {');
  assert.ok(startIdx >= 0, "muse-spark-web credential spec not found");
  const museSection = webSessionCredentials.slice(
    startIdx,
    webSessionCredentials.indexOf('"claude-web"', startIdx)
  );
  assert.match(museSection, /ecto1/, "credential spec must mention the ecto1: WS auth token");
});

test("#9502: the Missing Authorization error message guides the user to the ecto1: token", () => {
  assert.ok(
    /Missing Authorization.*ecto1:/.test(executor),
    "missing-auth error must name the ecto1: token"
  );
});

test("#9502: a cookie-only credential (no ecto1: token) is rejected with 400 — the actual user failure", async () => {
  const exec = new MuseSparkWebExecutor();
  const result = await exec.execute({
    model: "muse-spark",
    body: { messages: [{ role: "user", content: "hello" }] },
    stream: false,
    credentials: { apiKey: "ecto_1_sess=4240a308abcdefNVDg0", connectionId: "conn-9502" },
    signal: null,
    log: null,
    upstreamExtraHeaders: undefined,
  } as Parameters<typeof exec.execute>[0]);
  assert.equal(result.response.status, 400, "cookie-only credential is rejected");
  const body = await result.response.json();
  assert.match(body.error.message, /Missing Authorization for Meta AI WebSocket/);
});

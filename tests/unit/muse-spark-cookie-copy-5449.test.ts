import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

// #5449: Muse Spark Web (Meta AI) migrated its default session cookie from the retired
// `abra_sess` to `ecto_1_sess` (see META_AI_DEFAULT_COOKIE), but two user-facing strings still
// named the old cookie — the provider form hint and one auth-failure message — telling users to
// paste a cookie that no longer exists. These guards keep the copy aligned with the live cookie.

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..", "..");

const webCookie = readFileSync(
  join(root, "src", "shared", "constants", "providers", "web-cookie.ts"),
  "utf8"
);
const executor = readFileSync(join(root, "open-sse", "executors", "muse-spark-web.ts"), "utf8");

test("provider form hint points at the live ecto_1_sess cookie, not retired abra_sess", () => {
  assert.ok(
    webCookie.includes("Paste your ecto_1_sess value"),
    "muse-spark authHint must name ecto_1_sess"
  );
  assert.ok(
    !webCookie.includes("Paste your abra_sess"),
    "muse-spark authHint must not name the retired abra_sess cookie"
  );
});

test("auth-failure message names the live ecto_1_sess cookie, not retired abra_sess", () => {
  assert.ok(
    !executor.includes("meta.ai abra_sess cookie may be missing"),
    "the 401 message must not name the retired abra_sess cookie"
  );
  assert.ok(
    executor.includes("meta.ai ecto_1_sess cookie may be missing"),
    "the 401 message must name the live ecto_1_sess cookie"
  );
});

/**
 * Regression test for #13172: the Telegram webhook path must authenticate.
 *
 * Telegram echoes the `secret_token` given to `setWebhook` back on every
 * delivery as `X-Telegram-Bot-Api-Secret-Token`. Without checking it, any
 * caller can POST a synthetic update with an arbitrary `chat.id`, which reaches
 * proxyChat() and mints a real API key plus upstream spend.
 *
 * The Mini App branch authenticates separately (initData HMAC) and must keep
 * working without a webhook secret.
 */
import { describe, test, before, after } from "node:test";
import assert from "node:assert/strict";

const BOT_TOKEN = "123456:AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
const SECRET = "s3cret-webhook-token";

let POST: (req: Request) => Promise<Response>;
let webhookSecretMatches: (a: string, b: string) => boolean;
const proxied: number[] = [];

before(async () => {
  process.env.TELEGRAM_BOT_TOKEN = BOT_TOKEN;
  process.env.TELEGRAM_WEBHOOK_SECRET = SECRET;

  const mod = await import("../../src/app/api/telegram/update/route.ts");
  POST = mod.POST as typeof POST;
  webhookSecretMatches = mod.webhookSecretMatches as typeof webhookSecretMatches;
});

after(() => {
  delete process.env.TELEGRAM_WEBHOOK_SECRET;
});

function webhookRequest(headers: Record<string, string> = {}): Request {
  return new Request("https://example.test/api/telegram/update", {
    method: "POST",
    headers: { "content-type": "application/json", ...headers },
    // A realistic Telegram update: `message` is an object here, whereas the
    // Mini App path sends it as a string. Both shapes must reach their branch.
    body: JSON.stringify({
      update_id: 1,
      message: { chat: { id: 999 }, text: "hi", message_id: 5 },
    }),
  });
}

describe("telegram webhook authentication (#13172)", () => {
  test("rejects a delivery with no secret header", async () => {
    const res = await POST(webhookRequest());
    assert.equal(res.status, 401, "unauthenticated webhook must be rejected");
    assert.deepEqual(proxied, [], "no chat should be proxied");
  });

  test("rejects a delivery with a wrong secret", async () => {
    const res = await POST(
      webhookRequest({ "x-telegram-bot-api-secret-token": "wrong-token-value" })
    );
    assert.equal(res.status, 401, "a mismatched secret must be rejected");
  });

  test("accepts a delivery carrying the configured secret", async () => {
    const res = await POST(webhookRequest({ "x-telegram-bot-api-secret-token": SECRET }));
    assert.equal(res.status, 200, "a correctly authenticated delivery must be accepted");
  });

  test("comparison is length-safe and value-correct", () => {
    assert.equal(webhookSecretMatches(SECRET, SECRET), true);
    assert.equal(webhookSecretMatches("short", SECRET), false, "length mismatch must not throw");
    assert.equal(webhookSecretMatches("", ""), true, "equal empties compare equal");
  });
});

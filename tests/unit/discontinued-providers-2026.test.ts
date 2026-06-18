import { describe, it } from "node:test";
import assert from "node:assert";

// 2026-06-17 free-tier refresh: providers whose free tier is confirmed gone (high confidence,
// no OmniRoute-path nuance) have hasFree flipped to false so the dashboard / onboarding no longer
// advertises a free tier that does not exist. The budget catalog already dropped them.
describe("2026 discontinued free tiers — providers.ts hasFree reconciliation", () => {
  it("APIKEY_PROVIDERS dead tiers no longer advertise a free tier", async () => {
    const { APIKEY_PROVIDERS } = await import("../../src/shared/constants/providers.ts");
    for (const id of ["chutes", "kluster", "glhf", "phind"]) {
      const p = (APIKEY_PROVIDERS as Record<string, { hasFree?: boolean }>)[id];
      assert.ok(p, `${id} should still exist in APIKEY_PROVIDERS (provider not removed, only its free flag)`);
      assert.strictEqual(p.hasFree, false, `${id} should have hasFree:false (discontinued in 2026)`);
    }
  });

  it("WEB_COOKIE_PROVIDERS phind (web/cookie path) no longer advertises a free tier", async () => {
    const { WEB_COOKIE_PROVIDERS } = await import("../../src/shared/constants/providers.ts");
    const p = (WEB_COOKIE_PROVIDERS as Record<string, { hasFree?: boolean }>)["phind"];
    assert.ok(p, "phind should still exist in WEB_COOKIE_PROVIDERS");
    assert.strictEqual(p.hasFree, false, "phind web/cookie should have hasFree:false (phind.com shut down 2026-01)");
  });

  it("intentionally-kept providers still advertise free (guarded / lower-confidence — not flipped)", async () => {
    const { APIKEY_PROVIDERS, NOAUTH_PROVIDERS } = await import("../../src/shared/constants/providers.ts");
    // gitlawb has a dedicated test asserting hasFree:true; aimlapi/theoldllm were medium-confidence in
    // the research (and theoldllm had refuted claims). Left as-is on purpose — flipping risks a
    // qwen-web-style error (OAuth/api tier death vs the path OmniRoute actually uses).
    const apikey = APIKEY_PROVIDERS as Record<string, { hasFree?: boolean }>;
    const noauth = NOAUTH_PROVIDERS as Record<string, { hasFree?: boolean }>;
    assert.strictEqual(apikey["gitlawb"]?.hasFree, true, "gitlawb intentionally kept hasFree:true");
    assert.strictEqual(apikey["aimlapi"]?.hasFree, true, "aimlapi intentionally kept hasFree:true");
    assert.strictEqual(noauth["theoldllm"]?.hasFree, true, "theoldllm intentionally kept hasFree:true");
  });
});
